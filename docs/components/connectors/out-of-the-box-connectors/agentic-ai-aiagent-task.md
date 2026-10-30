---
id: agentic-ai-aiagent-task
sidebar_label: AI Agent Task
title: AI Agent Task connector
description: AI agent connector implementation based on service tasks.
---

import ConfigurationSystemPrompt from './agentic-ai/aiagent/configuration/\_system-prompt.md';
import ConfigurationUserPrompt from './agentic-ai/aiagent/configuration/\_user-prompt.md';
import ConfigurationToolsTask from './agentic-ai/aiagent/configuration/\_tools-task.md';
import ConfigurationMemoryTask from './agentic-ai/aiagent/configuration/\_memory-task.md';
import ConfigurationLimits from './agentic-ai/aiagent/configuration/\_limits.md';
import ConfigurationResponse from './agentic-ai/aiagent/configuration/\_response.md';
import ConfigurationOutputMappingTask from './agentic-ai/aiagent/configuration/\_output-mapping-task.md';
import ConfigurationErrorHandling from './agentic-ai/aiagent/configuration/\_error-handling.md';
import ConfigurationRetries from './agentic-ai/aiagent/configuration/\_retries.md';
import ConfigurationExecutionListeners from './agentic-ai/aiagent/configuration/\_execution-listeners.md';
import AgentTaskImg from '../img/ai-agent-task-simple.png';
import AgentTaskLoopImg from '../img/ai-agent-task-loop.png';
import AgentTaskFollowUpImg from '../img/ai-agent-task-follow-up.png';
import AgentTaskLoopAdvancedImg from '../img/ai-agent-task-loop-advanced.png';

Implement an AI agent using an AI Agent connector applied to a service task, paired with an optional ad-hoc sub-process to provide tools usable by the AI.

## About this implementation

This is the original AI Agent connector implementation. It relies on a BPMN [service task](../../../components/modeler/bpmn/service-tasks/service-tasks.md) in combination with a multi-instance ad-hoc sub-process. Unlike the [AI Agent Sub-process](./agentic-ai-aiagent-subprocess.md) implementation, you must model the [agent loop](/reference/glossary.md#agent-loop) explicitly in the BPMN diagram, leading to a more complex configuration.

This implementation is best suited for:

- Simple, one-shot tasks using the AI Agent connector as a generic LLM connector without any tool calling.
- Advanced use cases where you want to model the agent loop explicitly, for example to pre-process or post-process tool calls for approval or auditing.

:::info
The [example integration](agentic-ai-aiagent-task-example.md) page outlines how to model an agentic AI process using the AI Agent Task implementation.
:::

### Example models

A very simple example of using the AI Agent Task connector for a non-agentic task is as follows:

<img src={AgentTaskImg} alt="Simple AI Agent Task" class="img-500"/>

You can make the connector agentic by adding a multi-instance ad-hoc sub-process and gateways to create an agent loop. The connector can then call tools until it reaches its goal or a configured limit. The multi-instance ad-hoc sub-process acts as a toolbox:

<img src={AgentTaskLoopImg} alt="AI Agent Task with tool calling loop" class="img-800"/>

You can also add a response follow-up outside the agent loop. When the AI agent completes its task and does not request any tool calls, a task (such as a user task or another LLM acting as a judge) can verify its response, and the process can loop back to the AI agent if required.

This allows you to create a [human-in-the-loop (HITL)](/reference/glossary.md#human-in-the-loop-hitl) process, for example a chat where the user can ask follow-up questions:

<img src={AgentTaskFollowUpImg} alt="AI Agent Task with response follow-up" class="img-800"/>

If you need more control over the agent loop, you can model pre-processing and post-processing of tool calls with additional tasks, such as approval or tool call auditing.

<img src={AgentTaskLoopAdvancedImg} alt="AI Agent Task with agent loop pre-/post-processing" class="img-600"/>

## Configuration

### Model provider

Select the LLM model **Provider** and **Model**. See [model providers](./agentic-ai-aiagent-model-providers.md) for supported providers and configuration details.

<ConfigurationSystemPrompt />
<ConfigurationUserPrompt />
<ConfigurationToolsTask />
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
