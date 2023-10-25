import { test, expect } from "@playwright/test";

test("main docs cross-link to optimize docs", async ({ page }) => {
  await page.goto("/docs/components/");

  await expect(page).toHaveTitle(/Overview Components \| Camunda 8 Docs/);

  // This is a link known to cross over to $optimize$.
  await page
    .getByRole("article")
    .getByRole("link", { name: "Optimize" })
    .click();

  // The `$optimize$` should be transformed to `optimize` in the target URL.
  await expect(page.url()).toContain("/optimize/components/what-is-optimize/");
});

test("optimize docs cross-link to main docs", async ({ page }) => {
  await page.goto(
    "/optimize/apis-tools/optimize-api/optimize-api-authorization/"
  );

  await expect(page).toHaveTitle(/Authorization \| Camunda 8 Docs/);

  // This is a link known to cross over to $docs$.
  await page.getByRole("link", { name: "building your own client" }).click();

  // The `$docs$` should be transformed to `docs` in the target URL.
  await expect(page.url()).toContain("/docs/apis-tools/build-your-own-client/");
});
