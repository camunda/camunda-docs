---
id: bpmn-copilot
title: BPMN copilot
sidebar_label: Get started
description: "Using AI, select users can now chat with the BPMN copilot for assistance generating new and functional BPMN process diagrams in Web Modeler based on a process description."
---

<span class="badge badge--cloud">Camunda 8 SaaS only</span>

:::note Terms of use
By using this tool, you agree to Camunda's use of the anonymized input and output data and anonymized feedback to improve it.
:::

Using AI, select users can now chat with the BPMN copilot for assistance generating new and functional BPMN process diagrams in [Web Modeler](/components/modeler/web-modeler/launch-web-modeler.md) based on a process description.

## Get started

:::warning
Creating a BPMN process diagram with the BPMN copilot will overwrite existing work.
:::

To use the BPMN copilot in Web Modeler, take the following steps:

1. Log in to [Web Modeler](/components/modeler/web-modeler/launch-web-modeler.md).
2. Click **New project > Create new > BPMN diagram**. If you have opted in to test this feature, the Camunda copilot chat window will pop up.

![bpmn copilot chat window](./img/bpmn-copilot-chat.png)

3. In the chat box, enter your prompt. This prompt should be a simple, clear, and concise request describing the BPMN diagram you would like to generate. For example, "Generate a mortgage loan process diagram". For more information, you can also ask questions like "How do I design a process?"
4. Wait for your diagram to generate; this takes about 50 seconds. Once complete, the copilot will then respond with an outline of the process it created.
5. Review the generated diagram. If the diagram is not exact, you can continue chatting with the BPMN copilot by requesting changes or rephrasing your request. For example, "add exceptions". The new diagram will overwrite existing work, but the BPMN copilot will automatically generate a [milestone](/components/modeler/web-modeler/milestones.md) of the previous version, so you can return or revert to it anytime.
