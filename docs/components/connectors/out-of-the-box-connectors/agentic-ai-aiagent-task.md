---
id: agentic-ai-aiagent-task
sidebar_label: AI Agent Task
title: AI Agent Task connector
description: "Implement an AI agent using an AI Agent connector applied to a service task, paired with an optional ad-hoc sub-process to provide tools usable by the AI."
---

import ConfigurationModelProvider from './agentic-ai/aiagent/configuration/\_model-provider.md';
import ConfigurationModel from './agentic-ai/aiagent/configuration/\_model.md';
import ConfigurationSystemPrompt from './agentic-ai/aiagent/configuration/\_system-prompt.md';
import ConfigurationUserPrompt from './agentic-ai/aiagent/configuration/\_user-prompt.md';
import ConfigurationTools from './agentic-ai/aiagent/configuration/\_tools.md';
import ConfigurationMemoryTask from './agentic-ai/aiagent/configuration/\_memory-task.md';
import ConfigurationLimits from './agentic-ai/aiagent/configuration/\_limits.md';
import ConfigurationResponse from './agentic-ai/aiagent/configuration/\_response.md';
import ConfigurationOutputMappingTask from './agentic-ai/aiagent/configuration/\_output-mapping-task.md';
import ConfigurationErrorHandling from './agentic-ai/aiagent/configuration/\_error-handling.md';
import ConfigurationRetries from './agentic-ai/aiagent/configuration/\_retries.md';
import ConfigurationExecutionListeners from './agentic-ai/aiagent/configuration/\_execution-listeners.md';
import AgentTaskFeedbackImg from '../img/ai-agent-task-feedback-loop.png';

Implement an AI agent using an AI Agent connector applied to a service task, paired with an optional ad-hoc sub-process to provide tools usable by the AI.

:::info

- For more information and usage examples, see [AI Agent Task](./agentic-ai-aiagent.md#ai-agent-task).
- The [example integration](agentic-ai-aiagent-task-example.md) page outlines how to model an agentic AI process using the AI Agent Task implementation.

:::

<img src={AgentTaskFeedbackImg} alt="AI Agent Task with tool calling feedback loop" class="img-800"/>

## Configuration

<ConfigurationModelProvider />
<ConfigurationModel />
<ConfigurationSystemPrompt />
<ConfigurationUserPrompt />
<ConfigurationTools />
<ConfigurationMemoryTask />
<ConfigurationLimits />
<ConfigurationResponse />
<ConfigurationOutputMappingTask />
<ConfigurationErrorHandling type="task" />
<ConfigurationRetries />
<ConfigurationExecutionListeners />

## Limitations

### No event handling support

Unlike the AI Agent Sub-process implementation, the AI Agent Task implementation does not support event handling as part of an [event subprocess](../../../components/modeler/bpmn/event-subprocesses/event-subprocesses.md).

If you want to handle events while the AI agent is working on a task, use the [AI Agent Sub-process](./agentic-ai-aiagent-subprocess.md) implementation instead.

### Process definition not found errors when running the AI Agent for the first time

The AI Agent Task implementation relies on the eventually consistent [Get process definition XML API](../../../apis-tools/orchestration-cluster-api-rest/specifications/get-process-definition-xml.api.mdx) to fetch the BPMN XML source when resolving available tool definitions.

- If you deploy a new or changed process and directly run it after (for example using **Deploy & Run**), the process definition might not be available when the AI Agent attempts to fetch the process definition XML.
- It will retry to fetch the definition several times, but if the definition is still not available after the retries are exhausted, the connector will fail with a "Process definition not found" error and raise an incident.

To avoid this error, wait a few seconds before running a newly deployed new or changed process, to allow the exporter to make the process definition available via the API.
