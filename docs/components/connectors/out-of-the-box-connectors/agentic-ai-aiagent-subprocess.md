---
id: agentic-ai-aiagent-subprocess
sidebar_label: AI Agent Sub-process
title: AI Agent Sub-process connector
description: AI agent connector implementation based on ad-hoc sub-processes.
---

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
import AgentProcessImg from '../img/ai-agent-subprocess.png';

Implement an AI agent using an ad-hoc sub-process with an applied AI Agent connector template.

## About this implementation

This connector implementation creates an implicit feedback loop for tool calls and agent responses, using the [job worker implementation type](../../../components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md#job-worker-implementation) of an [ad-hoc sub-process](../../../components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md).

:::info

- For more information and usage examples, see [AI Agent Sub-process](./agentic-ai-aiagent.md#ai-agent-sub-process).
- The [example integration](agentic-ai-aiagent-subprocess-example.md) outlines how to model an agentic AI process using the AI Agent Sub-process implementation.

:::

<img src={AgentProcessImg} alt="AI Agent Sub-process" class="img-700"/>

## Configuration

### Model provider

Select and configure the LLM model **Provider** and **Model** you want to use, from the following supported providers:

- Anthropic (directly, or through AWS Bedrock Mantle)
- AWS Bedrock Converse
- OpenAI (directly, through Microsoft Foundry/Azure, or through a custom OpenAI-compatible endpoint)
- Google Gemini (directly, or through Google Vertex AI)
- Custom implementation (Self-Managed/Hybrid only)

See [Model Providers](./agentic-ai-aiagent-model-providers.md) for the full configuration fields for each provider.

<ConfigurationSystemPrompt />
<ConfigurationUserPrompt />
<ConfigurationMemoryProcess />
<ConfigurationLimits />
<ConfigurationEventHandling />
<ConfigurationResponse type="process" />
<ConfigurationOutputMappingProcess />
<ConfigurationErrorHandling type="process" />
<ConfigurationRetries />
<ConfigurationExecutionListeners />
