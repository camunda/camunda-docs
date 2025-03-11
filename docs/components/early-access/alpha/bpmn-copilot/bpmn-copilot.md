---
id: bpmn-copilot
title: BPMN Copilot
sidebar_label: Get started
description: "Chat with the AI BPMN Copilot for help generating new BPMN process diagrams in Web Modeler based on a process description."
---

import CopilotImg from './img/bpmn-copilot-chat.png';

<span class="badge badge--cloud">Camunda 8 SaaS only</span>

Chat with the AI BPMN Copilot for help generating new BPMN process diagrams in [Web Modeler](/components/modeler/web-modeler/launch-web-modeler.md) based on a process description. You can also ask the BPMN Copilot questions about existing diagrams.

:::note Terms of use
By using this tool, you agree to Camunda's use of the anonymized input and output data and anonymized feedback to improve it.

While your latest BPMN diagram will be saved in your account, Camunda does not save your prompts and the resulting BPMN diagrams.
:::

## Get started

:::warning
Creating a BPMN process diagram with the BPMN Copilot will overwrite existing work.
:::

To use the BPMN Copilot in Web Modeler, take the following steps:

1. If you have not already done so, [opt in](/components/console/manage-organization/enable-alpha-features.md#enable-ai-powered-features) to use this feature.
2. Log in to [Web Modeler](/components/modeler/web-modeler/launch-web-modeler.md).
3. Click **New project > Create new > BPMN diagram** to open the Camunda Copilot chat window.

<img src={CopilotImg} alt="bpmn copilot chat window" width="500px" />

4. In the chat box, enter your prompt. A prompt should be a simple, clear, and concise request. For example, "Generate a mortgage loan process diagram" or "Explain this process". Note that more complex requests may take longer to process.
5. Wait for the BPMN Copilot to respond. This typically takes between 20-50 seconds, depending on the prompt.

:::note
Timeouts can occur during this step if your query is too complex.
:::

### Example explanation prompts

- "Describe this process in plain language"
- "What KPIs would you recommend for this process?"
- "Estimate the median and 95th percentile duration for this process"
- "What does this symbol do?" [after selecting a BPMN element in the process]
- "Give me a list of test cases to ensure this process completes as expected"
- "Summarize this process for a new employee"
- "Give me a prioritized list of recommended improvements to make the 95% of instances complete within 4 hours"

### Example creation prompts

- "Create an absence request diagram"
- "Design a process that uses data objects to drive process logic, showing how data influences process flow and decisions"
- "Model a complex service orchestration process involving multiple service tasks, conditional routing, and parallel execution of tasks"
- "Create a service order management process for a telco company. The process starts with a fraud check. First, calculate price dimensions via a script task, then check if the price dimensions are normal or high with an exclusive gateway. If high, escalate to a fraud investigation subprocess."
- Paste existing text documentation of a process or of process requirements (for example, a Confluence page)
- Paste a process hard-coded in any language (for example, BPEL, Java, COBOL, Python)
- Paste a description of a diagram. Any LLM (like ChatGPT) can generate this description from a screenshot or an image of the diagram.

## Follow-up prompts

The BPMN Copilot can also translate business-focused intent into actionable changes for the diagram it creates. For example:

- "Modify this process to maximize its changes of adhering to a 1 day SLA"
- "Reduce the operating cost of this process"
- "Show me ways to integrate AI into the process"
- "Consider unhappy paths as well"
- "Add error handling"
- "Improve the user experience"

:::note
Requesting specific modifications to one or several sections of the BPMN diagram may impact unrelated sections.
:::

### Limitations

- The BPMN Copilot only supports processes up to approximately 400 KB in size.
- The BPMN Copilot officially supports only modifying diagrams that were created by the BPMN Copilot itself. It does not officially support modifying other existing diagrams (including diagrams with implementation details).
- The BPMN Copilot does not support pools, lanes, and collaborations.
