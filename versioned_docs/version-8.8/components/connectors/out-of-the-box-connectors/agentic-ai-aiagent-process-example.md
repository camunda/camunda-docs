---
id: agentic-ai-aiagent-process-example
sidebar_label: Example integration
title: Example AI Agent Process connector integration
description: Example integration using the AI Agent Process connector to implement a feedback loop for user interactions and tool calls with an LLM.
---

import AgentProcessImg from '../img/ai-agent-process.png';

This worked example demonstrates how to use the [AI Agent Process connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-process.md) applied to an [ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) to model AI Agent [tools and response interaction feedback loops](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md#feedback-loop-use-cases).

## Create an AI Agent element

As the **AI Agent Process** implementation implicitly creates a tools feedback loop, you only need to add an ad-hoc sub-process with an applied AI Agent connector template to the process.

:::info
For more information on how to model the tools available to the AI agent, see [tool definitions](./agentic-ai-aiagent-tool-definitions.md).
:::

<img src={AgentProcessImg} alt="AI Agent Process" class="img-700"/>

After adding the element, open the properties panel to configure the connection to your model provider, and modify the system and user prompts as required.

## Example response interaction feedback loop {#response-loop}

Similar to the tools feedback loop, another feedback loop acting on the agent response can be added by re-entering the AI Agent connector with new information. You must model your user prompt so that it adds the follow-up data instead of the initial request.

For example, your **User Prompt** field could contain the following FEEL expression to make sure it acts upon follow-up input:

```feel
=if (is defined(followUpInput)) then followUpInput else initialUserInput
```

With the **AI Agent Process** implementation, the user feedback needs to be modeled to loop back to the AI Agent ad-hoc sub-process:

![AI Agent Process with user feedback loop](../img/ai-agent-process-user-feedback-loop.png)

:::note
How you model this type of feedback loop greatly depends on your specific use case.

- The example feedback loop expects a simple feedback action based on a user task, but this could also interact with other process flows or another agent process.
- Instead of the user task, you could also use another LLM connector to verify the response of the AI Agent. For an example of this pattern, see the [fraud detection example](https://github.com/camunda/connectors/tree/main/connectors/agentic-ai/examples/ai-agent/ad-hoc-sub-process/fraud-detection).
  :::

## Additional resources

- The connectors repository contains a set of [ready-made examples](https://github.com/camunda/connectors/tree/main/connectors/agentic-ai/examples/ai-agent/ad-hoc-sub-process) using the AI Agent Process connector.
