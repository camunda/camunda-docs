---
id: modelers-interoperability
title: Modelers interoperability
description: "Understand the implications of using Web Modeler and Desktop Modeler for modeling process diagrams."
---

If your team uses both [Web Modeler](/components/modeler/web-modeler/launch-web-modeler.md) and [Desktop Modeler](/components/modeler/desktop-modeler/index.md) to develop [process applications](/components/concepts/process-applications.md) with [GitSync](/components/modeler/web-modeler/git-sync.md), there are a few considerations to ensure both modelers work together transparently.

## Process applications

| Desktop Modeler                                                                            | Web Modeler                                                                                                       |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| A process application is represented as a folder containing a `.process-application` file. | A process application is represented as a [type folder](/components/modeler/web-modeler/process-applications.md). |

Using a single folder structure to represent process applications makes it easier to work across both tools.

:::tip
Camunda recommends always structuring your projects as process applications. This ensures consistent behavior across both Web Modeler and Desktop Modeler with minimal adjustments.
:::

## Element templates

Element templates are discovered differently in each tool. The following sections outline the key differences.

### Templates per file

| Desktop Modeler                                       | Web Modeler                          |
| ----------------------------------------------------- | ------------------------------------ |
| Can load multiple templates defined in a single file. | Only supports one template per file. |

To maintain compatibility, avoid defining multiple templates in a single file.

### Shared element templates

| Desktop Modeler                                                                                                                                    | Web Modeler                                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Templates can be installed as [global templates](/components/modeler/desktop-modeler/element-templates/configuring-templates.md#global-templates). | Templates are [published to the organization](/components/connectors/manage-connector-templates.md#manage-published-connector-templates) for reuse across projects. |

Camunda recommends storing shared templates in a separate VCS repository:

- **Desktop Modeler**: Copy templates manually into your global directory.
- **Web Modeler**: Use a CI/CD pipeline to sync templates with your repository via the [Web Modeler API](/apis-tools/web-modeler-api/index.md).

### Project element templates

| Desktop Modeler                                                                                                                                                                                 | Web Modeler                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Discovers templates from multiple directories if a `.process-application` file exists. <br>If no `.process-application` file exists, only templates in `.camunda/element-templates` are loaded. | Processes templates from a single folder. <br>If working with a project (not a process application), templates must first be published. |

:::note

- If starting in **Desktop Modeler**, use a single folder for your process application. This makes project templates available in both modelers without extra work.
- If starting in **Web Modeler**, manually create a `.process-application` file after cloning the repository so Desktop Modeler can correctly recognize the project.
  :::

### Handling multiple template versions

| Desktop Modeler                                                                                                                                                                                                                                                                                                                | Web Modeler                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Detects versions based on separate files. To support multiple versions, maintain different files with distinct names (e.g., `element-template-v1.json`, `element-template-v2.json`). Otherwise, templates may appear as [missing](/components/modeler/desktop-modeler/element-templates/using-templates.md#missing-templates). | Supports evolving a single template file. Simply update the file and [publish](/components/connectors/manage-connector-templates.md#manage-published-connector-templates) new versions. |

:::warning
If you rely on Desktop Modeler, you must create separate files for each template version. Web Modeler alone does not have this limitation.
:::
