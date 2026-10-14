---
id: tasklist-custom-styling
title: Custom styling
description: "Learn how to customize the Tasklist user interface by overriding Camunda design system tokens with your own CSS."
---

You can customize the Tasklist user interface (UI) to visually align it with your organization's brand identity. You can adjust the appearance of various UI elements, such as backgrounds, surfaces, controls, buttons, borders, and text.

The Tasklist UI uses the Camunda design system, which defines colors, borders, and corner radius as CSS custom properties called design tokens. You can override these tokens with your own values.

:::note
In Camunda 8.9 and earlier, Tasklist used the Carbon Design System. Custom styles that override `--cds-*` tokens or use `data-carbon-theme` selectors no longer have any effect. Rewrite them using the tokens and selectors described on this page.
:::

## Customize the Tasklist user interface

To customize the user interface, override specific design tokens in a `custom.css` file. For example, you can override the `--background` token to change the Tasklist UI background color.

Place the `custom.css` file in the `config` directory, which is on the Camunda classpath:

| Installation type    | File location                               |
| :------------------- | :------------------------------------------ |
| Docker image         | `/usr/local/camunda/config/custom.css`      |
| Distribution archive | `camunda-zeebe-<version>/config/custom.css` |

Camunda serves the file at `<context-path>/custom.css` and reads it once at startup. Restart Camunda after you create or change the file.

A typical workflow to customize the Tasklist UI is as follows:

1. **Identify design tokens**: Review your own visual identity guidelines and identify the [design tokens](#common-design-tokens) you want to update.

2. **Override the tokens in custom.css**: Add or modify token values in the `custom.css` file. The syntax for styling is plain CSS. For example, to change the background color, use the following syntax, replacing the `--background` values with your own colors:

   ```css
   /* Light theme customization */
   html .c4-ui {
     --background: #ffff00;
   }

   /* Dark theme customization */
   html .c4-ui.dark,
   html .dark .c4-ui {
     --background: #008000;
   }
   ```

   The `html` prefix makes your selectors more specific than the default token definitions, so your values take precedence regardless of the order in which the stylesheets load.

3. **Test your custom styles**: Test your custom styles in both light and dark modes to verify that they are applied correctly across all Tasklist UI components.

4. **Validate accessibility and visual contrast**: Check that your custom styles maintain good visual contrast between elements. For example, verify that text is easily readable against backgrounds, buttons are distinguishable, and important elements such as links and icons stand out properly. Contrast is especially important for accessibility and readability in both light and dark modes.

5. **Iterate based on results**: If necessary, refine your customizations based on the results of your testing. Adjust values in the `custom.css` file to ensure a consistent look and feel throughout the Tasklist UI.

:::note
If you don't provide a `custom.css` file, or the file contains no custom CSS configuration, the Tasklist UI defaults to its original visual identity.
:::

## Common design tokens

You can override the following commonly used design tokens to customize the Tasklist UI.

Most tokens have separate values for the light and dark themes, so override them in both the light and dark selectors. The `--ring` and `--radius` tokens are only defined once, so an override in the light theme selector applies to both themes.

| Design token                  | Description                                                                        |
| :---------------------------- | :--------------------------------------------------------------------------------- |
| `--background`                | Default background color of the Tasklist UI.                                       |
| `--foreground`                | Primary color for body text.                                                       |
| `--border`                    | Color for dividers and card outlines.                                              |
| `--popover`                   | Background color for floating surfaces, such as popovers, dropdowns, and tooltips. |
| `--popover-foreground`        | Text color on floating surfaces.                                                   |
| `--input`                     | Border color for input fields.                                                     |
| `--input-background`          | Fill color for input fields.                                                       |
| `--ring`                      | Color for the keyboard focus ring. Defaults to `--accent-foreground-subtle`.       |
| `--radius`                    | Base corner radius for components such as buttons, inputs, and cards.              |
| `--primary-action-default`    | Fill color for primary buttons.                                                    |
| `--primary-action-hover`      | Hover state color for primary buttons.                                             |
| `--primary-action-active`     | Active state color for primary buttons.                                            |
| `--primary-action-disabled`   | Color for disabled primary buttons.                                                |
| `--primary-action-foreground` | Text and icon color on primary buttons.                                            |
| `--accent-action-default`     | Fill color for selected or checked controls, such as checkboxes and switches.      |
| `--accent-action-hover`       | Hover state color for accent controls.                                             |
| `--accent-action-foreground`  | Text and icon color on accent controls.                                            |
| `--accent-foreground-subtle`  | Accent color for text and icons.                                                   |
| `--neutral-action-default`    | Fill color for secondary actions.                                                  |
| `--neutral-action-hover`      | Hover state color for secondary actions.                                           |
| `--neutral-background-subtle` | Background color for elevated surfaces, such as containers, panels, and cards.     |
| `--neutral-background-strong` | Background color for stronger fills, such as selected rows and table headers.      |
| `--neutral-foreground-subtle` | Secondary color for less prominent text and icons.                                 |
| `--neutral-foreground-strong` | Color for emphasized text and icons.                                               |
| `--neutral-border-subtle`     | Color for subtle borders.                                                          |
| `--neutral-border-strong`     | Color for stronger borders.                                                        |
