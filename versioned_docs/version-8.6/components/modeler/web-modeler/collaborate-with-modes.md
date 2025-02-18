---
id: collaborate-with-modes
title: Collaborate with modes
description: "Dedicated modes are ways for business and IT professionals to collaborate effectively."
---

<span class="badge badge--cloud">Camunda 8 only</span>

Collaboration between business and IT professionals can be challenging, which is why we introduced three modes in BPMN diagrams that help users with different technical backgrounds to collaborate effectively: **design**, **implement**, and **play**.

The **Design** mode view is tailored to business users, and the **Implement** and **Play** mode views are tailored to developers.

:::note
**Play** mode is an alpha feature that is being progressively rolled out. Review the [Play documentation](/components/modeler/web-modeler/play-your-process.md) for details.
:::

Business users can now focus on modeling, sharing, and collaborating, while developers can work on implementation and debugging with ease.

When accessing a BPMN diagram for the [first time](/components/modeler/web-modeler/model-your-first-diagram.md), the **Design** mode is the first selected option. To switch between modes, you can select one of the tabs on the left side of the screen, above the diagram; any further selection is remembered and kept for the next sessions.

![modes tab navigation](img/mode-tab-navigation.png)

:::note
When a process template is selected, the default mode is **Implement**.
:::

### Modes and roles

- **Project Admin** and **Editors** can access all modes.
- **Commenters** can access all modes, but with read-only permission. This role can be assigned to stakeholders who need to see the implementation properties without the ability to modify them.
  ![read only properties](img/read-only-properties.png)
- **Viewers** can access only the **Design** mode with read-only permission,

Read more about the [different roles and how to assign them](components/modeler/web-modeler/collaboration.md#access-rights-and-permissions).
