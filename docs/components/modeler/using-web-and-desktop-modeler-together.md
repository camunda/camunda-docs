---
id: using-web-and-desktop-modeler-together
title: Using Camunda Hub and Desktop Modeler together
description: "Understand the implications of using Camunda Hub and Desktop Modeler for modeling process diagrams."
---

[Camunda Hub](/components/hub/workspace/modeler/index.md) and [Desktop Modeler](/components/modeler/desktop-modeler/index.md) are both tools for designing [BPMN](/components/modeler/bpmn/bpmn.md) diagrams, but they serve different purposes and shine in different scenarios.

Camunda Hub is great for collaborative, cloud-based process modeling. It allows teams to work together in real-time, manage versions, and store models centrally. It's especially useful when working in distributed teams or when you need tight integration with a remotely hosted Camunda 8 cluster — whether it's Camunda SaaS or your own self-managed environment.

Desktop Modeler, on the other hand, is ideal for local development, technical modeling, and full offline control. Among other features, it supports advanced customization, scripting, and deployment to local Camunda 8 runtimes (like Camunda 8 Run), making it a go-to tool for developers working on executable processes.

Using both tools together allows you to combine the best of both worlds:

- Start collaboratively in Camunda Hub, capturing business requirements and designing high-level processes with stakeholders.
- Then switch to Desktop Modeler for more technical refinement, such as adding execution details, scripts, or testing locally.

This workflow bridges the gap between business users and developers, ensuring smooth handoffs and better alignment across the team.

When using [Git sync](/components/hub/workspace/manage-projects/git-sync.md) to keep your project in sync between a Camunda Hub workspace and your local environment, there are a few considerations to ensure both modelers interpret the project (and its `.process-application` file) consistently.

## Projects and process applications

| Desktop Modeler                                                                            | Camunda Hub                                                                                                                                          |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| A process application is represented as a folder containing a `.process-application` file. | A project (called "process application" before Camunda 8.10) [contains process files](/components/hub/workspace/manage-projects/manage-projects.md). |

:::tip
Camunda recommends always including a `.process-application` file in your projects. This ensures consistent behavior across both Camunda Hub and Desktop Modeler with minimal adjustments.
:::

## Element templates

Element templates are discovered differently in each tool. The following sections outline the key differences.

### Templates per file

| Desktop Modeler                                       | Camunda Hub                          |
| ----------------------------------------------------- | ------------------------------------ |
| Can load multiple templates defined in a single file. | Only supports one template per file. |

To maintain compatibility, avoid defining multiple templates in a single file.

### Shared element templates

| Desktop Modeler                                                                                                                                    | Camunda Hub                                                                                                                                                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Templates can be installed as [global templates](/components/modeler/desktop-modeler/element-templates/configuring-templates.md#global-templates). | Templates are published to the [organization](/components/connectors/manage-connector-templates.md#manage-published-connector-templates) or the [catalog](/components/hub/organization/manage-catalog/getting-started.md) for reuse across workspaces. |

Camunda recommends storing shared templates in a separate repository:

- **Desktop Modeler**: Copy templates manually into your global directory.
- **Camunda Hub**: Use a [CI/CD pipeline](/components/best-practices/cicd-guidelines/element-templates-at-scale.md) to sync templates with your repository via the [Camunda Hub API](/apis-tools/hub-api-saas/overview.md).

### Project element templates

| Desktop Modeler                                                                                                                                                                               | Camunda Hub                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| [Local element templates](/components/modeler/desktop-modeler/element-templates/configuring-templates.md#local-templates) are loaded from the `.camunda/element-templates` folder if present. | Loads templates from a single folder. |

:::note

- If starting in **Desktop Modeler**, use a single folder for your process application. This makes project templates available in both modelers without extra work.
- If starting in **Camunda Hub**, after cloning the repository manually create an empty JSON object `{}` in a file named `.process-application` in the root directory of your project/repository so Desktop Modeler can correctly recognize the project.
  :::

### Handling multiple template versions

| Desktop Modeler                                                                                                                                                                                                                                                                                                                | Camunda Hub                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Detects versions based on separate files. To support multiple versions, maintain different files with distinct names (e.g., `element-template-v1.json`, `element-template-v2.json`). Otherwise, templates may appear as [missing](/components/modeler/desktop-modeler/element-templates/using-templates.md#missing-templates). | Supports evolving a single template file. Simply update the file and [publish](/components/connectors/manage-connector-templates.md#manage-published-connector-templates) new [versions](/components/modeler/element-templates/defining-templates.md#template-versioning). |

:::warning

- Desktop Modeler can have multiple templates defined in a single file, which is good practice when defining multiple versions of the same template.
- Camunda Hub only supports defining one template per file, as storing template versions in a file is not needed (Camunda Hub automatically tracks version history).

:::

## Frequently asked questions

### Do I really need a `.process-application` file if I’m only using Camunda Hub?

No. A `.process-application` file is only required if you plan to open the project in Desktop Modeler. Camunda Hub does not require it, but adding the file makes the project compatible across both tools.

### Can I use the same element template repository for both modelers?

Yes. Camunda recommends maintaining a dedicated version control repository for element templates. Desktop Modeler users can copy templates into their global directory, while Camunda Hub users can stay in sync through a CI/CD pipeline and the [Camunda Hub API](/apis-tools/hub-api-saas/overview.md).

### How should I manage multiple versions of the same element template?

In Desktop Modeler, each version of the element template must be present. Versions can be stored in a single file as a list of element templates or in separate files (for example, `element-template-v1.json` and `element-template-v2.json`). Otherwise, the template will appear as [missing](/components/modeler/desktop-modeler/element-templates/using-templates.md#missing-templates). Camunda Hub, however, supports [versioning](/components/modeler/element-templates/defining-templates.md#template-versioning) in a single file and allows you to [publish](/components/connectors/manage-connector-templates.md#manage-published-connector-templates) new versions directly.

When referencing a dependency such as a form we recommend using a `versionTag` as your [binding type](/components/best-practices/modeling/choosing-the-resource-binding-type.md#supported-binding-types), as this option ensures that the right version of the target resource is always used.
