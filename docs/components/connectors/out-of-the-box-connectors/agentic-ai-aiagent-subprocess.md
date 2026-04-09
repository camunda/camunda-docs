---
id: agentic-ai-aiagent-subprocess
sidebar_label: AI Agent Sub-process
title: AI Agent Sub-process connector
description: AI agent connector implementation based on ad-hoc sub-processes.
---

import MDRef from './generated_reference_partials/agenticai-aiagent-outbound-connector.md';
import AgentProcessImg from '../img/ai-agent-subprocess.png';

Implement an AI agent using an ad-hoc sub-process with an applied AI Agent connector template.

## About this implementation

This connector implementation creates an implicit feedback loop for tool calls and agent responses, using the [job worker implementation type](../../../components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md#job-worker-implementation) of an [ad-hoc sub-process](../../../components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md).

:::info

- For more information and usage examples, see [AI Agent Sub-process](./agentic-ai-aiagent.md#ai-agent-sub-process).
- The [example integration](agentic-ai-aiagent-subprocess-example.md) outlines how to model an agentic AI process using the AI Agent Sub-process implementation.

:::

<img src={AgentProcessImg} alt="AI Agent Sub-process" class="img-700"/>

## Configuration reference

<!-- <AgenticaiAiagentOutboundConnectorReference>

<Before section="provider">
:::note

- Different setup/authentication fields are shown depending on the provider you select.
- Use [connector secrets](/components/console/manage-clusters/manage-secrets.md) to store credentials and avoid exposing sensitive information directly from the process.

:::

#### Timeout handling

The default timeout for model API calls is set to three minutes by the runtime. Self-managed Spring connector runtime instances allow you to override this value by setting the `camunda.connector.agenticai.aiagent.chat-model.api.default-timeout` property in the Spring application properties file.

You can also specify a custom timeout per provider in the **Timeout** field below. This value takes precedence over the default timeout.

All values must be provided in the [ISO-8601 duration format](https://en.wikipedia.org/wiki/ISO_8601#Durations), for example, `PT60S` for a 60-second timeout.

For more details, see the individual provider sections below, especially for any provider-specific limitations.

:::important
The timeout setting must not exceed the job worker timeout; otherwise, the job may be reassigned by the engine while the model call is still in progress.
:::
</Before>

<After section="provider">
    Some content after the section...
</After>

</AgenticaiAiagentOutboundConnectorReference> -->

<MDRef />
