import { test, expect } from "@playwright/test";

test("homepage has title and links to intro page", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Camunda 8 Docs \| Camunda 8 Docs/);
  await expect(page.locator("h1.hero__title")).toHaveText("Camunda 8 Docs");
});
