---
id: using-web-and-desktop-modeler-together
title: Using Web and Desktop Modeler together
description: "Understand the implications of using Web Modeler and Desktop Modeler for modeling process diagrams."
---

[Web Modeler](/components/modeler/web-modeler/launch-web-modeler.md) and [Desktop Modeler](/components/modeler/desktop-modeler/index.md) are both tools for designing [BPMN](/components/modeler/bpmn/bpmn.md) diagrams, but they serve different purposes and shine in different scenarios.

Web Modeler is great for collaborative, cloud-based process modeling. It allows teams to work together in real-time, manage versions, and store models centrally. It's especially useful when working in distributed teams or when you need tight integration with a remotely hosted Camunda 8 cluster — whether it's Camunda SaaS or your own self-managed environment.

Desktop Modeler, on the other hand, is ideal for local development, technical modeling, and full offline control. Among other features, it supports advanced customization, scripting, and deployment to local Camunda 8 runtimes (like Camunda 8 Run), making it a go-to tool for developers working on executable processes.

Using both tools together allows you to combine the best of both worlds:

- Start collaboratively in Web Modeler, capturing business requirements and designing high-level processes with stakeholders.
- Then switch to Desktop Modeler for more technical refinement, such as adding execution details, scripts, or testing locally.

This workflow bridges the gap between business users and developers, ensuring smooth handoffs and better alignment across the team.

When using [Git sync](/components/modeler/web-modeler/git-sync.md) to keep your project in sync between Web Modeler and your local environment, there are a few considerations to ensure both modelers work together transparently.

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

Camunda recommends storing shared templates in a separate repository:

- **Desktop Modeler**: Copy templates manually into your global directory.
- **Web Modeler**: Use a [CI/CD pipeline](/components/best-practices/cicd-guidelines/element-templates-at-scale.md) to sync templates with your repository via the [Web Modeler API](/apis-tools/web-modeler-api/index.md).

### Project element templates

| Desktop Modeler                                                                                                                                                                               | Web Modeler                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [Local element templates](/components/modeler/desktop-modeler/element-templates/configuring-templates.md#local-templates) are loaded from the `.camunda/element-templates` folder if present. | Processes templates from a single folder. <br></br>If working with a project (not a process application), templates must first be published. |

:::note

- If starting in **Desktop Modeler**, use a single folder for your process application. This makes project templates available in both modelers without extra work.
- If starting in **Web Modeler**, after cloning the repository manually create an empty JSON object `{}` in a file named `.process-application` so Desktop Modeler can correctly recognize the project.
  :::

### Handling multiple template versions

| Desktop Modeler                                                                                                                                                                                                                                                                                                                | Web Modeler                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Detects versions based on separate files. To support multiple versions, maintain different files with distinct names (e.g., `element-template-v1.json`, `element-template-v2.json`). Otherwise, templates may appear as [missing](/components/modeler/desktop-modeler/element-templates/using-templates.md#missing-templates). | Supports evolving a single template file. Simply update the file and [publish](/components/connectors/manage-connector-templates.md#manage-published-connector-templates) new [versions](/components/modeler/element-templates/defining-templates.md#template-versioning). |

:::warning
If you rely on Desktop Modeler, you must create separate files for each template version. Web Modeler alone does not have this limitation.
:::

## Frequently asked questions

### Do I really need a `.process-application` file if I’m only using Web Modeler?

No. A `.process-application` file is only required if you plan to open the project in Desktop Modeler. Web Modeler does not require it, but adding the file makes the project compatible across both tools.

### Can I use the same element template repository for both modelers?

Yes. Camunda recommends maintaining a dedicated version control repository for element templates. Desktop Modeler users can copy templates into their global directory, while Web Modeler users can stay in sync through a CI/CD pipeline and the [Web Modeler API](/apis-tools/web-modeler-api/index.md).

### How should I manage multiple versions of the same element template?

In Desktop Modeler, each version of the element template must be present. Versions can be stored in a single file as a list of element templates or in separate files (for example, `element-template-v1.json` and `element-template-v2.json`). Otherwise, the template will appear as [missing](/components/modeler/desktop-modeler/element-templates/using-templates.md#missing-templates). Web Modeler, however, supports [versioning](/components/modeler/element-templates/defining-templates.md#template-versioning) in a single file and allows you to [publish](/components/connectors/manage-connector-templates.md#manage-published-connector-templates) new versions directly.

When referencing a dependency such as a form we recommend using a `versionTag` as your [binding type](/components/best-practices/modeling/choosing-the-resource-binding-type.md#supported-binding-types), as this option ensures that the right version of the target resource is always used.
