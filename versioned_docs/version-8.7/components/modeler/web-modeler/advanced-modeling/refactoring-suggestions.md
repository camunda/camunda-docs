---
id: refactoring-suggestions
title: Refactoring suggestions
description: Use the new refactoring suggestions feature to improve your BPMN diagrams.
---

<span class="badge badge--cloud">Camunda 8 only</span>
<span class="badge badge--alpha">Alpha</span>

:::note
Refactoring suggestions are an alpha feature. To use this feature, enable the [context pad](/components/modeler/web-modeler/context-pad.md) and [AI-powered features](https://camunda.com/blog/2024/02/camunda-docs-ai-developer-experience-new-level/) through the [alpha features](/components/console/manage-organization/enable-alpha-features.md) menu.
:::

The refactoring suggestions feature helps you improve your BPMN diagrams by providing suggestions for refactoring your diagrams based on best practices and common patterns. You can access the refactoring suggestions by clicking on the AI **Show suggestions** icon in the context pad:

![show suggestions icon in the context pad](./img/refactoring-suggestions-1.png)

Since this is an alpha feature, only blank elements with names will lead to suggestions. If there are suggestions available, you will see a list of them. Click on a suggestion to apply it to your diagram:

![suggestion to apply a Slack outbound Connector template](./img/refactoring-suggestions-2.png)

If there are no suggestions available, a message will indicate this:

![No refactoring suggestions available](./img/refactoring-suggestions-3.png)

You can experiment with generating suggestions by editing the name of the element. Try:

- Adding or subtracting words -- for example, changing “Create issue” to “Create GitHub issue”.
- Changing words to synonyms -- for example, “message” to “email”.
