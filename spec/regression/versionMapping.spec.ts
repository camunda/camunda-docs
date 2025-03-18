import { test, expect } from "@playwright/test";

test("main docs cross-link to optimize docs", async ({ page }) => {
  await page.goto("/docs/reference/release-policy/");

  await expect(page).toHaveTitle(/Release policy \| Camunda 8 Docs/);

  // This is a link known to cross over to $optimize$.
  await page
    .getByRole("article")
    .getByRole("link", { name: "Optimize" })
    .click();

  // The `$optimize$` should be transformed to `optimize` in the target URL.
  await expect(page.url()).toContain("/optimize/components/what-is-optimize/");
});

test("optimize docs cross-link to main docs", async ({ page }) => {
  await page.goto("/optimize/components/what-is-optimize/");

  await expect(page).toHaveTitle(/What is Optimize\? \| Camunda 8 Docs/);

  // This is a link known to cross over to $docs$.
  await page
    .getByRole("article")
    .getByRole("link", { name: "Modeler" })
    .click();

  // The `$docs$` should be transformed to `docs` in the target URL.
  await expect(page.url()).toContain("/docs/components/modeler/about-modeler/");
});
