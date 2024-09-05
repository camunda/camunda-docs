---
id: tasklist-custom-styling
title: Custom styling
---

This guide focuses on enabling developers to customize the Tasklist user interface to visually align it with their organization's brand identity. Customization allows you to adjust the appearance of various UI elements, such as backgrounds, layers, controls, buttons, and text.

The Tasklist frontend interface is built using the [Carbon Design System](https://carbondesignsystem.com/), a comprehensive [open-source](https://github.com/carbon-design-system/carbon) design system created by IBM. Carbon is designed to ensure consistency, efficiency, and scalability across projects, particularly benefiting developers who need to create or maintain UI components.

**Key benefits of Carbon Design System:**

- **Consistency**: Ensures a consistent look and feel across an application.
- **Scalability**: Facilitates the easy creation of scalable and reusable UI components.
- **Customization**: Provides flexibility for styling customizations to match your visual identity.
- **Accessibility**: Incorporates best practices in accessibility, ensuring an application is usable by all.

## Styling configuration

To customize the user interface, you must override specific Carbon Design System [design tokens](https://carbondesignsystem.com/elements/color/tokens). These tokens control various aspects of the UI's appearance.

### Common design tokens

Below is a list of commonly used design tokens for Tasklist styling:

| Design token name                 | Description                                                  |
| --------------------------------- | ------------------------------------------------------------ |
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

### Customizing Tasklist's appearance

The Tasklist application allows you to customize its colors and visual properties using a `custom.css` file. This file can be found in the distribution archive or within the Docker image at `/usr/local/tasklist/config/custom.css`. By editing this file, you can tailor the appearance of the Tasklist application to match your organization’s visual identity.

#### Recommended steps:

1. **Identify design tokens**: Start by reviewing your brand’s visual guidelines and identifying the design tokens you want to update. These tokens will be modified in the `custom.css` file.

2. **Override the tokens in custom.css**: Once you've identified the tokens, add or modify their values in the `custom.css` file. For example, to change the background color, you would use the following syntax:

```yaml
:root[data-carbon-theme='g10']{ /* Light theme customization */
 --cds-background: #FFFF00;
}


:root[data-carbon-theme='g100']{ /* Dark theme customization */
 --cds-background: #008000;
}
```

3. **Test the custom styles**: Test your custom styles in both light and dark modes to verify that they are applied correctly across all UI components.

4. **Verify visual contrast**: Ensure that the custom styles maintain good visual contrast between elements. This includes verifying that text is easily readable against backgrounds, buttons are distinguishable, and important elements like links and icons stand out properly. Contrast is especially important for accessibility and readability in both light and dark modes.

5. **Iterate based on results**: If necessary, refine your customizations based on the results of your testing. Adjust values in the `custom.css` file to ensure a consistent look and feel throughout the application.

If no custom configurations are applied in the `custom.css` file, the Tasklist application will default to its original visual identity.
