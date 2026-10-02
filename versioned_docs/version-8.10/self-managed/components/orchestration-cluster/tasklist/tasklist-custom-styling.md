---
id: tasklist-custom-styling
title: Custom styling
description: "Learn how to customize the Tasklist user interface by overriding Carbon Design System tokens with your own CSS."
---

You can customize the Tasklist user interface (UI) to visually align it with your organization's brand identity. You can adjust the appearance of various UI elements, such as backgrounds, layers, controls, buttons, and text.

The Tasklist UI uses the [Carbon Design System](https://carbondesignsystem.com/), the comprehensive [open-source](https://github.com/carbon-design-system/carbon) design system created by IBM to ensure consistency, efficiency, and scalability across projects, particularly developers who need to create or maintain UI components.

## Customize the Tasklist user interface

To customize the user interface, you can override specific Carbon Design System [design tokens](https://carbondesignsystem.com/elements/color/tokens) with your own CSS values. These tokens control various aspects of the UI's appearance. For example, you can override the `--cds-background` token to change the Tasklist UI background color.

You can override these tokens in the `custom.css` file located in the distribution archive or within the Docker image at `/usr/local/tasklist/config/custom.css`.

A typical workflow to customize the Tasklist UI is as follows:

1. **Identify design tokens**: Review your own visual identity guidelines and identify the design tokens you want to update. You will modify these tokens in the `custom.css` file.

2. **Override the tokens in custom.css**: Add or modify token values in the `custom.css` file. The syntax for styling is plain CSS. For example, to change the background color use the following syntax, replacing the `--cds-background` token hex values with your own color:

   ```yaml
   :root[data-carbon-theme='g10']{ /* Light theme customization */
   --cds-background: #FFFF00;
   }

   :root[data-carbon-theme='g100']{ /* Dark theme customization */
   --cds-background: #008000;
   }
   ```

3. **Test your custom styles**: Test your custom styles in both light and dark modes to verify that they are applied correctly across all Tasklist UI components.

4. **Validate accessibility and visual contrast**: Check that your custom styles maintain good visual contrast between elements. For example, verify that text is easily readable against backgrounds, buttons are distinguishable, and important elements such as links and icons stand out properly. Contrast is especially important for accessibility and readability in both light and dark modes.

5. **Iterate based on results**: If necessary, refine your customizations based on the results of your testing. Adjust values in the `custom.css` file to ensure a consistent look and feel throughout the Tasklist UI.

:::note
If you do not add any custom CSS configuration in the `custom.css` file, the Tasklist UI defaults to its original visual identity.
:::

## Common design tokens

You can override the following commonly used design tokens to customize the Tasklist UI.

| Design token                      | Description                                                  |
| :-------------------------------- | :----------------------------------------------------------- |
| `--cds-background`                | Default background color of the Tasklist UI.                 |
| `--cds-background-brand`          | Feature background color.                                    |
| `--cds-layer-01`                  | Color for primary layer surfaces like containers and cards.  |
| `--cds-layer-selected-01`         | Selected color for `layer-01`.                               |
| `--cds-text-primary`              | Primary color for text elements.                             |
| `--cds-text-secondary`            | Secondary color for less prominent text and input labels.    |
| `--cds-link-primary`              | Color for primary links.                                     |
| `--cds-link-primary-hover`        | Color for primary links when hovered.                        |
| `--cds-link-secondary`            | Color for secondary links.                                   |
| `--cds-link-inverse`              | Color for links against dark backgrounds.                    |
| `--cds-icon-primary`              | Primary color for icons.                                     |
| `--cds-icon-secondary`            | Secondary color for icons.                                   |
| `--cds-icon-interactive`          | Color for interactive icons.                                 |
| `--cds-button-primary`            | Primary color for buttons.                                   |
| `--cds-button-primary-hover`      | Hover state color for primary buttons.                       |
| `--cds-button-primary-active`     | Active state color for primary buttons.                      |
| `--cds-button-secondary`          | Secondary color for buttons.                                 |
| `--cds-button-secondary-hover`    | Hover state color for secondary buttons.                     |
| `--cds-button-secondary-active`   | Active state color for secondary buttons.                    |
| `--cds-button-tertiary`           | Tertiary color for buttons.                                  |
| `--cds-button-tertiary-hover`     | Hover state color for tertiary buttons.                      |
| `--cds-button-tertiary-active`    | Active state color for tertiary buttons.                     |
| `--cds-button-disabled`           | Color for disabled buttons.                                  |
| `--cds-field-01`                  | Color for default input fields.                              |
| `--cds-focus`                     | Color for elements in focus, such as borders and underlines. |
| `--cds-border-interactive`        | Color for selected and active borders.                       |
| `--cds-border-subtle-00`          | Subtle borders paired with `background`.                     |
| `--cds-border-subtle-01`          | Subtle borders paired with `$layer-01`                       |
| `--cds-border-subtle-selected-01` | Selected color for `$border-subtle-01`                       |
