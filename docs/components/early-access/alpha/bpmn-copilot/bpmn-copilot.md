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

### Example Prompts

- "Create an absence request diagram"
- "Design a process that uses data objects to drive process logic, showing how data influences process flow and decisions"
- "Model a complex service orchestration process involving multiple service tasks, conditional routing, and parallel execution of tasks."
- "Create a service order management process for a telco company. The process starts with a fraud check. First, calculate price dimensions via a script task, then check if the price dimensions are normal or high with an exclusive gateway. If high, escalate to a fraud investigation subprocess."
- Paste existing text documentation of a process (e.g., a Confluence page)
- Paste a process hard-coded in any language (e.g., BPEL, Java, COBOL, Python)
- Paste a description of an diagram. Any LLM (like ChatGPT) can generate this description from a screenshot or an image of the diagram.
## Follow-Up Prompts:
The BPMN Copilot can also translate business-focused intent into actionable changes to the diagram it creates. For example:
- "Modify this process to maximize its changes of adhering to a 1 day SLA"
- "Reduce the operating cost of this process"
- "Show me ways to integrate AI into the process"
- "Consider unhappy paths as well"
- "Add error handling"
- "Improve the user experience"

Note that the BPMN Copilot may not replicate all parts of the diagram exactly between modifications.
### Limitations

- The BPMN Copilot does not officially support modifying existing diagrams (including diagrams with implementation details).
- The BPMN Copilot does not support pools, lanes, and collaborations.
