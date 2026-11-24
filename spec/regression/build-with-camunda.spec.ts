import { test, expect } from "@playwright/test";

test("guided setup is primary and manual downloads stay optional", async ({
  page,
  context,
}) => {
  await page.goto("/build-with-camunda/", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("heading", { name: "Free SaaS trial", exact: true })
  ).toBeVisible();

  const setup = page.locator("#self-managed");
  await expect(setup.getByRole("heading", { level: 3 })).toHaveText([
    "Install the Camunda CLI",
    "Run guided setup",
    "Explore your process",
  ]);
  await context.grantPermissions(["clipboard-read", "clipboard-write"], {
    origin: new URL(page.url()).origin,
  });

  const commands = ["npm install -g @camunda8/cli", "c8ctl setup"];
  const terminals = setup.locator("pre:visible");
  await expect(terminals).toHaveCount(commands.length);
  for (const [index, command] of commands.entries()) {
    const terminal = terminals.nth(index);
    await expect(terminal).toHaveText(`$ ${command}`);
    await terminal
      .locator("..")
      .getByRole("button", { name: "Copy code to clipboard", exact: true })
      .click();
    await expect
      .poll(() => page.evaluate(() => navigator.clipboard.readText()))
      .toBe(command);
  }

  const manual = setup.locator("details");
  await expect(manual).toHaveJSProperty("open", false);
  const examples = manual.getByRole("link", {
    name: /Download the example projects/,
  });
  await expect(examples).toBeHidden();
  await manual.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(examples).toBeVisible();
  await expect(
    manual.locator('a[href*="/release/camunda/c8run/"]').first()
  ).toBeVisible();
  await expect(
    manual.locator('a[href*="/release/camunda-modeler/"]').first()
  ).toBeVisible();
  await expect(page.locator('a[href*="getting-started-bundle"]')).toHaveCount(
    0
  );
});

test("retained references are collapsed and keyboard-accessible on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/build-with-camunda/", { waitUntil: "domcontentloaded" });

  const sections = [
    ["cli-reference", "Manage Camunda from your terminal"],
    ["ai-tools", "Train your AI agents on Camunda"],
    ["other-local-deployments", "More ways to run Camunda locally"],
    ["production-deployments", "Production deployment options"],
    ["downloads", "Camunda downloads"],
  ];
  for (const [id, title] of sections) {
    const section = page.locator(`details#${id}`);
    const summary = section.locator("summary");
    const content = section.locator(":scope > div");
    await expect(summary).toHaveText(title);
    await expect(section).toHaveJSProperty("open", false);
    await expect(content).toBeHidden();
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(content).toBeVisible();
    await expect(content).toContainText(/setup/i);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth
      )
    ).toBe(true);
    await summary.press("Enter");
    await expect(content).toBeHidden();
  }
});
