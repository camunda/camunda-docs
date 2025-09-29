---
id: agentic-ai-aiagent-process
sidebar_label: AI Agent Process
title: AI Agent Process connector
description: AI agent connector implementation based on ad-hoc sub-processes.
---

import ConfigurationModelProvider from './agentic-ai/aiagent/configuration/\_model-provider.md';
import ConfigurationModel from './agentic-ai/aiagent/configuration/\_model.md';
import ConfigurationSystemPrompt from './agentic-ai/aiagent/configuration/\_system-prompt.md';
import ConfigurationUserPrompt from './agentic-ai/aiagent/configuration/\_user-prompt.md';
import ConfigurationTools from './agentic-ai/aiagent/configuration/\_tools.md';
import ConfigurationMemoryProcess from './agentic-ai/aiagent/configuration/\_memory-process.md';
import ConfigurationLimits from './agentic-ai/aiagent/configuration/\_limits.md';
import ConfigurationEventHandling from './agentic-ai/aiagent/configuration/\_event-handling.md';
import ConfigurationResponse from './agentic-ai/aiagent/configuration/\_response.md';
import ConfigurationOutputMappingProcess from './agentic-ai/aiagent/configuration/\_output-mapping-process.md';
import ConfigurationErrorHandling from './agentic-ai/aiagent/configuration/\_error-handling.md';
import ConfigurationRetries from './agentic-ai/aiagent/configuration/\_retries.md';
import ConfigurationExecutionListeners from './agentic-ai/aiagent/configuration/\_execution-listeners.md';

![AI Agent Process](../img/ai-agent-process.png)

## Configuration

<ConfigurationModelProvider />
<ConfigurationModel />
<ConfigurationSystemPrompt />
<ConfigurationUserPrompt />
<ConfigurationMemoryProcess />
<ConfigurationLimits />
<ConfigurationEventHandling />
<ConfigurationResponse type="process" />
<ConfigurationOutputMappingProcess />
<ConfigurationErrorHandling />
<ConfigurationRetries />
<ConfigurationExecutionListeners />

## Event handling

With an **AI Agent Process**, an event handled as part of an [event subprocess](../../../components/modeler/bpmn/event-subprocesses/event-subprocesses.md) will directly trigger an execution of the underlying job worker which can either interrupt ongoing tool calls or wait for all tool calls to complete before handling the event. See [event handling](#event-handling) for more details.

To provide additional data to the LLM from a handled event, create a `toolCallResult` variable from the event handling flow. The content of this variable will be added to the LLM API call as a user message following any tool call results.

## Limitations
