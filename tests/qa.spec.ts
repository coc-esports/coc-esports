import { expect, test } from "@playwright/test";

// Every public page (plus the 404). Add new routes here when they ship.
const pages = [
  "/",
  "/worlds",
  "/schedule",
  "/stages",
  "/stages/june-2026",
  "/stages/lcq-2026",
  "/teams",
  "/teams/zoos-esports",
  "/teams/tribe-gaming",
  "/news",
  "/news/how-worlds-2026-works",
  "/watch",
  "/about",
  "/no-such-page",
];

for (const path of pages) {
  test(`page ${path}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      // The test tool resizing the window aborts page-transition animations; that message is not a site error.
      if (m.type() === "error" && !m.text().includes("404") && !m.text().includes("Viewport size changed")) errors.push(m.text());
    });

    await page.goto(path, { waitUntil: "networkidle" });
    // Scroll through so lazy images load and scroll effects settle.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += innerHeight / 2) {
        scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      scrollTo(0, 0);
    });
    await page.waitForTimeout(400);

    const report = await page.evaluate(() => {
      const visible = (el: Element) => {
        const r = el.getBoundingClientRect();
        const s = getComputedStyle(el);
        return r.width > 1 && r.height > 1 && s.visibility !== "hidden" && s.display !== "none" && !el.closest("[aria-hidden=true], .sr-only, [inert]");
      };
      const label = (el: Element) => `${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 30)}"`;

      // Tap targets ≥ 44 px. Links inside running text are exempt (WCAG 2.5.8 inline exception).
      const small = [...document.querySelectorAll("a, button, [role=button], input, select, summary")]
        .filter(visible)
        .filter((el) => getComputedStyle(el).display !== "inline")
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.height < 44 || r.width < 44;
        })
        .map(label);

      // Text ≥ 12 px.
      const tiny = new Set<string>();
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const el = walker.currentNode.parentElement;
        if (!el || !walker.currentNode.textContent?.trim() || !visible(el)) continue;
        if (parseFloat(getComputedStyle(el).fontSize) < 12) tiny.add(label(el));
      }

      // Every control sits fully on screen (unless it lives in its own sideways-scrolling box, like the bracket).
      const scrollsX = (el: Element) => {
        if (el.closest("[data-scroll-track]")) return true; // pinned sideways timeline (keyboard focus scrolls it into view)
        for (let a = el.parentElement; a; a = a.parentElement) if (/(auto|scroll)/.test(getComputedStyle(a).overflowX)) return true;
        return false;
      };
      const offscreen = [...document.querySelectorAll("a, button, [role=button], input, select, summary")]
        .filter(visible)
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return (r.left < -1 || r.right > innerWidth + 1) && !scrollsX(el);
        })
        .map(label);

      const broken = [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && visible(i)).map((i) => i.currentSrc || i.src);

      return {
        overflow: document.documentElement.scrollWidth - innerWidth,
        h1: document.querySelectorAll("h1").length,
        small,
        offscreen,
        tiny: [...tiny],
        broken,
      };
    });

    expect.soft(report.overflow, "page scrolls sideways").toBeLessThanOrEqual(0);
    expect.soft(report.h1, "exactly one h1").toBe(1);
    expect.soft(report.small, "tap targets under 44px").toEqual([]);
    expect.soft(report.offscreen, "controls pushed off screen").toEqual([]);
    expect.soft(report.tiny, "text under 12px").toEqual([]);
    expect.soft(report.broken, "broken images").toEqual([]);
    expect.soft(errors, "console errors").toEqual([]);
    // The Supercell disclaimer must be visible on every page.
    await expect.soft(page.locator("footer")).toContainText("This material is not official and is not approved by Supercell.");
  });
}

test("security headers and old-URL redirects", async ({ request }) => {
  const res = await request.get("/");
  const h = res.headers();
  for (const name of ["content-security-policy", "strict-transport-security", "x-content-type-options", "referrer-policy", "x-frame-options", "permissions-policy"]) {
    expect.soft(h[name], name).toBeTruthy();
  }
  expect.soft(h["x-powered-by"], "x-powered-by hidden").toBeUndefined();
  const old = await request.get("/leaderboards", { maxRedirects: 0 });
  expect.soft(old.status()).toBeGreaterThanOrEqual(300);
  expect.soft(old.headers()["location"]).toContain("/teams");
});

// "Hide results" on: no winner or qualified team may be readable on the main pages, from the first paint.
const winners = ["ZOOS Esports", "Repotted Gaming", "Vatic"];
for (const path of ["/", "/worlds", "/schedule", "/stages", "/stages/june-2026", "/news", "/teams/zoos-esports"]) {
  test(`hide results ${path}`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("gildra-hide-results", "1"));
    await page.goto(path, { waitUntil: "domcontentloaded" });
    const firstPaint = await page.locator("main").innerText();
    await page.waitForLoadState("networkidle");
    const settled = await page.locator("main").innerText();
    // A team's own page names the team; only its results must be hidden there.
    const names = path.startsWith("/teams/") ? winners.filter((w) => !w.startsWith("ZOOS")) : winners;
    for (const name of names) {
      expect.soft(firstPaint, `"${name}" visible before load`).not.toContain(name);
      expect.soft(settled, `"${name}" visible`).not.toContain(name);
    }
    if (path.startsWith("/teams/")) expect.soft(settled).not.toContain("Golden Ticket · World Finals");
  });
}

// Keyboard: tabbing to the last card of the pinned timeline brings it on screen (desktop only, where it pins).
test("timeline cards come into view on keyboard focus", async ({ page }, info) => {
  test.skip(!["laptop", "desktop"].includes(info.project.name), "the timeline only pins on wide screens");
  await page.goto("/worlds", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const last = page.locator("[data-scroll-track] a").last();
  await last.focus();
  await page.waitForTimeout(1200);
  const box = await last.boundingBox();
  const width = page.viewportSize()!.width;
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1);
});
