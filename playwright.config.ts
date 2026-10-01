import { defineConfig } from "@playwright/test";

// Quality checks (web-studio-playbook phase 12): every page at 5 screen sizes against a production build.
// Locally: `npm run build` then `npm run test:qa`. In CI the same runs on every push (.github/workflows/checks.yml).
const port = 3101;

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: { baseURL: `http://127.0.0.1:${port}`, browserName: "chromium" },
  webServer: {
    command: `npx next start -p ${port} -H 127.0.0.1`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [
    { name: "phone-small", use: { viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true } },
    { name: "phone", use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
    { name: "tablet", use: { viewport: { width: 768, height: 1024 }, hasTouch: true } },
    { name: "laptop", use: { viewport: { width: 1280, height: 800 } } },
    { name: "desktop", use: { viewport: { width: 1920, height: 1080 } } },
  ],
});
