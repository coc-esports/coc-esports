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

      const broken = [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && visible(i)).map((i) => i.currentSrc || i.src);

      return {
        overflow: document.documentElement.scrollWidth - innerWidth,
        h1: document.querySelectorAll("h1").length,
        small,
        tiny: [...tiny],
        broken,
      };
    });

    expect.soft(report.overflow, "page scrolls sideways").toBeLessThanOrEqual(0);
    expect.soft(report.h1, "exactly one h1").toBe(1);
    expect.soft(report.small, "tap targets under 44px").toEqual([]);
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
