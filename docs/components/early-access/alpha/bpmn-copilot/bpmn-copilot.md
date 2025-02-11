---
id: bpmn-copilot
title: BPMN Copilot
sidebar_label: Get started
description: "Using AI, users can now chat with the BPMN Copilot for assistance generating new and functional BPMN process diagrams in Web Modeler based on a process description."
---

<span class="badge badge--cloud">Camunda 8 SaaS only</span>

:::note Terms of use
By using this tool, you agree to Camunda's use of the anonymized input and output data and anonymized feedback to improve it.

While your latest BPMN diagram will be saved in your account, Camunda does not save your prompts and the resulting BPMN diagrams.
:::

Using AI, users can now chat with the BPMN Copilot for assistance generating new BPMN process diagrams in [Web Modeler](/components/modeler/web-modeler/launch-web-modeler.md) based on a process description.

## Get started

:::warning
Creating a BPMN process diagram with the BPMN Copilot will overwrite existing work.
:::

To use the BPMN Copilot in Web Modeler, take the following steps:

1. If you have not yet already, [opt in](/components/console/manage-organization/enable-alpha-features.md#enable-ai-powered-features) to use this feature.
2. Log in to [Web Modeler](/components/modeler/web-modeler/launch-web-modeler.md).
3. Click **New project > Create new > BPMN diagram**. The Camunda Copilot chat window will open.

![bpmn copilot chat window](./img/bpmn-copilot-chat.png)

4. In the chat box, enter your prompt. This prompt should be a simple, clear, and concise request describing the BPMN diagram you would like to generate. For example, "Generate a mortgage loan process diagram". Note that more complex requests may take longer to process.
5. Wait for your diagram to generate; this takes about 50 seconds. Once complete, the Copilot will then respond with an outline of the process it created.

:::note

Timeouts may occur at this step if your query is too complex.

:::

### Limitations

- The BPMN Copilot does not officially support modifying existing diagrams (including diagrams with implementation details).
- The BPMN Copilot does not support pools, lanes, and collaborations.
