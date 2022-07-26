const { test, expect } = require("@playwright/test");

// const base = "https://docs.camunda.io";
const base = "http://localhost:3000";

test("Home page", async ({ page }) => {
  const url = `${base}/`;
  await page.goto(url);
  await expect(page).toHaveScreenshot();
});

test("Including footer", async ({ page }) => {
  const url = `${base}/docs/reference/`;
  await page.goto(url);
  await expect(page).toHaveScreenshot();
});

test("Including image", async ({ page }) => {
  const url = `${base}/docs/components/concepts/process-instance-creation/`;
  await page.goto(url);
  await expect(page).toHaveScreenshot();
});

test("Including badges", async ({ page }) => {
  const url = `${base}/docs/guides/setting-up-development-project/`;
  await page.goto(url);
  await expect(page).toHaveScreenshot();
});
