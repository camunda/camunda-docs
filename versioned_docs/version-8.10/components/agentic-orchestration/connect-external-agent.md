---
id: connect-external-agent
title: Connect an external agent
sidebar_label: Connect an external agent
description: "Connect an agent built with an external framework, such as LangGraph or CrewAI, to Camunda."
keywords:
  [
    "agentic ai",
    "AI agents",
    "external agent",
    "agent instance API",
    "LangGraph",
  ]
---

Connect an agent built with an external framework, such as LangGraph or CrewAI, to Camunda.

## About

An [external agent](/reference/glossary.md#external-agent) runs its [agent loop](/reference/glossary.md#agent-loop) in its own runtime instead of Camunda's engine. Camunda orchestrates when the agent runs as part of the process, but it can only surface what the runtime reports back.

To make an external agent visible:

- **Mark the agent in the model**: add the `zeebe:agentDefinition` extension element to the BPMN element that hosts the agent, so Camunda creates an [agent definition](/components/agentic-orchestration/agent-definitions-and-instances.md#agent-definitions) when you deploy the process.
- **Report the execution**: create an [agent instance](/components/agentic-orchestration/agent-definitions-and-instances.md#agent-instances) and report the agent's state, usage metrics, tools, and conversation history through the [Agent Instance API](/apis-tools/orchestration-cluster-api-rest/specifications/create-agent-instance.api.mdx) while the agent runs.

Camunda tracks an agent instance only for an element that carries an agent definition. Without the marker, the agent still runs, but it stays invisible in Operate and Optimize.

## Prerequisites

- An [Orchestration Cluster](/components/orchestration-cluster.md) running Camunda 8.10 or later.
- An agent runtime that can act as a [job worker](/components/concepts/job-workers.md) and call the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).
- An [authenticated API client](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md) with the `READ_PROCESS_INSTANCE` and `UPDATE_PROCESS_INSTANCE` authorizations on the process definition that contains the agent.

## Step 1: Mark the element as an external agent

Host the external agent on a [service task](/components/modeler/bpmn/service-tasks/service-tasks.md) whose job type your runtime subscribes to, and add the `zeebe:agentDefinition` extension element with `agentType="external"`.

```xml
<bpmn:serviceTask id="research-agent" name="Research agent">
  <bpmn:extensionElements>
    <zeebe:agentDefinition agentType="external" />
    <zeebe:taskDefinition type="research-agent" />
  </bpmn:extensionElements>
</bpmn:serviceTask>
```

When you deploy the process, Camunda creates one agent definition for this element. The agent definition is bound to the process definition version, so redeploy the process after you add or change the marker.

See [mark an element as an agent](/components/agentic-orchestration/agent-definitions-and-instances.md#mark-an-element-as-an-agent) for the other `agentType` values and the properties an agent definition holds.

### Package the setup as a custom element template

Camunda doesn't ship an external agent [element template](/components/modeler/element-templates/about-templates.md), but you can create your own.

:::note Create an element template
This step is optional. The marker and job type added to the BPMN XML in the previous step are enough for Camunda to track the agent.
However, an element template avoids manual XML editing and keeps the configuration consistent when the same external agent is used across multiple processes.
:::

The following template applies to a service task, fixes the job type your runtime subscribes to, and exposes the agent's prompt and result variable as configurable fields:

```json
{
  "$schema": "https://unpkg.com/@camunda/zeebe-element-templates-json-schema/resources/schema.json",
  "name": "Research agent",
  "id": "com.example.agents.research",
  "description": "An external research agent running on LangGraph.",
  "version": 1,
  "engines": {
    "camunda": "^8.10"
  },
  "appliesTo": ["bpmn:Task"],
  "elementType": {
    "value": "bpmn:ServiceTask"
  },
  "properties": [
    {
      "type": "Hidden",
      "value": "research-agent",
      "binding": {
        "type": "zeebe:taskDefinition",
        "property": "type"
      }
    },
    {
      "label": "Prompt",
      "type": "Text",
      "feel": "optional",
      "binding": {
        "type": "zeebe:input",
        "name": "prompt"
      }
    },
    {
      "label": "Result variable",
      "type": "String",
      "binding": {
        "type": "zeebe:output",
        "source": "= response"
      }
    }
  ]
}
```

See [defining templates](/components/modeler/element-templates/defining-templates.md) for the full set of keys, and [template properties](/components/modeler/element-templates/template-properties.md) for the available bindings.

:::note
Element templates configure properties through bindings. If a `zeebe:agentDefinition` binding isn't defined for your template, add the marker to the BPMN XML manually as shown in [step 1](#step-1-mark-the-element-as-an-external-agent), in addition to applying the template.
:::

## Step 2: Activate the job with a lease

Activate the job for the agent element with `withLease` set to `true`. The activation response returns a `leaseToken` alongside the `jobKey` and `elementInstanceKey` you need for every later call.

```bash
curl -L 'http://localhost:8080/v2/jobs/activation' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d '{
  "type": "research-agent",
  "worker": "research-agent-worker",
  "timeout": 300000,
  "maxJobsToActivate": 1,
  "withLease": true
}'
```

A lease is required because the conversation history you report is fenced to a single job activation. Items reported under a superseded lease are discarded instead of committed, so a retried activation can't interleave its history with the previous attempt.

See [activate jobs](/apis-tools/orchestration-cluster-api-rest/specifications/activate-jobs.api.mdx) for the full activation response, and [job leasing](/components/concepts/job-workers.md#job-leasing) for how the lease is enforced, the permanent lease-only caveat, and fleet guidance.

## Step 3: Create the agent instance

Create the agent instance as the first step of handling the job, before your agent makes its first model call. Establish the agent's initial configuration through a `CONFIGURATION` history item included in the same request, and pass the `jobKey` and `jobLease` from the job activation so Camunda can associate the item with this run. The response returns the `agentInstanceKey` that identifies the agent for every later call.

```bash
curl -L 'http://localhost:8080/v2/agent-instances' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d '{
  "elementInstanceKey": "2251799813685254",
  "jobKey": "2251799813685260",
  "jobLease": "eyJhY3RpdmF0aW9uIjoxfQ",
  "history": [
    {
      "historyItemId": "run-7f3a-config",
      "loopIteration": 1,
      "role": "CONFIGURATION",
      "content": [],
      "model": "gpt-4o",
      "provider": "openai",
      "systemPrompt": [
        {
          "contentType": "TEXT",
          "text": "You are a research assistant. Use the available tools to gather sources before answering."
        }
      ],
      "limits": {
        "maxModelCalls": 20,
        "maxToolCalls": 50,
        "maxTokens": 200000
      },
      "producedAt": "2026-08-18T09:13:58.000Z"
    }
  ]
}'
```

| Field                | Required | Description                                                                                                                                                                                                                                            |
| :------------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `elementInstanceKey` | Yes      | The key of the agent element instance, taken from the job activation response. Camunda derives the process instance, element ID, process definition, and tenant from it.                                                                               |
| `jobKey`             | Yes      | The key of the job activation from [step 2](#step-2-activate-the-job-with-a-lease). Required whenever `history` is provided.                                                                                                                           |
| `jobLease`           | Yes      | The lease token from the job activation, the same one used in [step 5](#step-5-report-the-conversation-history).                                                                                                                                       |
| `history`            | Yes      | A batch containing at least one `CONFIGURATION` item that reports `model`, `provider`, and `systemPrompt`; `limits` and `tools` on that item are optional. See [step 5](#step-5-report-the-conversation-history) for the full shape of a history item. |

Report the limits your runtime enforces even though Camunda doesn't enforce them for an external agent. Operate shows model calls against the configured limit, which is what makes limit proximity visible when you [detect off-rail agents](/components/agentic-orchestration/evaluate-agents/detect-off-rail-agents.md).

Only one agent instance can exist per element instance. If the job is retried, the create call returns `409`. Handle a retry by finding the existing agent instance with [search agent instances](/apis-tools/orchestration-cluster-api-rest/specifications/search-agent-instances.api.mdx), filtering on `elementInstanceKeys`, and continuing to report against the key it returns.

## Step 4: Report state transitions

Update the agent instance whenever the agent moves between phases of its loop. Send the update to `PATCH /agent-instances/{agentInstanceKey}`.

```bash
curl -L -X PATCH 'http://localhost:8080/v2/agent-instances/4503599627370496' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d '{
  "elementInstanceKey": "2251799813685254",
  "status": "TOOL_CALLING"
}'
```

| Field                | Required | Description                                                                                                                                                                                                   |
| :------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `elementInstanceKey` | Yes      | The key of the currently active element instance. Camunda validates it against the stored agent instance.                                                                                                     |
| `status`             | No       | The agent's current state: `TOOL_DISCOVERY`, `THINKING`, `TOOL_CALLING`, or `IDLE`. See [agent states](/components/agentic-orchestration/agent-states-and-metrics.md#agent-states) for what each state means. |
| `history`            | No       | A batch of conversation history items to append. Usage metrics, tool updates, and the conversation itself all flow through this field. See [step 5](#step-5-report-the-conversation-history).                 |

Camunda sets the `Initializing` and `Completed` states itself, so your runtime can't set them.

Report the tools once the agent has resolved them, typically while the agent is in `TOOL_DISCOVERY`, through a `CONFIGURATION` history item rather than a dedicated field:

```bash
curl -L -X PATCH 'http://localhost:8080/v2/agent-instances/4503599627370496' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d '{
  "elementInstanceKey": "2251799813685254",
  "jobKey": "2251799813685260",
  "jobLease": "eyJhY3RpdmF0aW9uIjoxfQ",
  "status": "THINKING",
  "history": [
    {
      "historyItemId": "run-7f3a-tools",
      "loopIteration": 1,
      "role": "CONFIGURATION",
      "content": [],
      "tools": [
        {
          "name": "search_papers",
          "description": "Search an academic paper index by topic.",
          "elementId": null
        },
        {
          "name": "summarize_source",
          "description": "Summarize a single source into three bullet points.",
          "elementId": null
        }
      ],
      "producedAt": "2026-08-18T09:14:01.000Z"
    }
  ]
}'
```

Set `elementId` only for a tool that a BPMN element in your process handles. For a tool that lives entirely in your external runtime, leave it `null` so Operate doesn't try to link it to the diagram. Omit `tools` from a later `CONFIGURATION` item to leave the stored list unchanged, or send an empty array to clear it.

## Step 5: Report the conversation history

The conversation history is the decision trail Operate displays for the agent: the prompts it received, the messages the model returned, the tools it selected, and the results those tools produced. Group the items by `loopIteration` so each pass through the agent loop is legible on its own.

Report history items either as a batch on the create or update call, or one at a time with [create agent instance history item](/apis-tools/orchestration-cluster-api-rest/specifications/create-agent-instance-history-item.api.mdx). Batching is the better default, because it keeps every item for a loop iteration in a single request.

```bash
curl -L -X PATCH 'http://localhost:8080/v2/agent-instances/4503599627370496' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d '{
  "elementInstanceKey": "2251799813685254",
  "jobKey": "2251799813685260",
  "jobLease": "eyJhY3RpdmF0aW9uIjoxfQ",
  "status": "TOOL_CALLING",
  "history": [
    {
      "historyItemId": "run-7f3a-iter-1-user",
      "loopIteration": 1,
      "role": "USER",
      "content": [
        {
          "contentType": "TEXT",
          "text": "Summarize the current research on retrieval-augmented generation."
        }
      ],
      "producedAt": "2026-08-18T09:14:02.120Z"
    },
    {
      "historyItemId": "run-7f3a-iter-1-assistant",
      "loopIteration": 1,
      "role": "ASSISTANT",
      "content": [
        {
          "contentType": "TEXT",
          "text": "I need recent sources before answering. Searching the paper index."
        }
      ],
      "toolCalls": [
        {
          "toolCallId": "call_01",
          "toolName": "search_papers",
          "elementId": null,
          "arguments": { "topic": "retrieval-augmented generation", "since": 2024 }
        }
      ],
      "metrics": { "inputTokens": 1840, "outputTokens": 260, "durationMs": 2310 },
      "producedAt": "2026-08-18T09:14:05.480Z"
    }
  ]
}'
```

| Field           | Required | Description                                                                                                                                                                                                                                                                                        |
| :-------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `historyItemId` | Yes      | An identifier you assign to the item. Camunda uses it to recognize a resubmitted item as a duplicate rather than rejecting it, so reuse the same ID when a retried activation resends an item.                                                                                                     |
| `loopIteration` | Yes      | The loop iteration the item belongs to, starting at `1`.                                                                                                                                                                                                                                           |
| `role`          | Yes      | `USER`, `ASSISTANT`, `TOOL_RESULT`, or `CONFIGURATION`.                                                                                                                                                                                                                                            |
| `content`       | Yes      | The content blocks of the item, each typed as `TEXT`, `DOCUMENT`, or `OBJECT`. Use `TEXT` for natural language and `OBJECT` for structured data. An empty array is valid for a `CONFIGURATION` item, whose data lives in the fields below instead.                                                 |
| `toolCalls`     | No       | For an `ASSISTANT` item, the tool calls the model dispatched. For a `TOOL_RESULT` item, a single entry referencing the originating tool call through its `toolCallId`. Omit for a `USER` item.                                                                                                     |
| `metrics`       | No       | The `inputTokens`, `outputTokens`, and `durationMs` of a single model call. Report these on `ASSISTANT` items only. Camunda aggregates them into the agent instance's running totals, so there's no separate counter to increment.                                                                 |
| `model`         | No       | The LLM model identifier. `CONFIGURATION` items only.                                                                                                                                                                                                                                              |
| `provider`      | No       | The LLM provider. `CONFIGURATION` items only.                                                                                                                                                                                                                                                      |
| `systemPrompt`  | No       | The system prompt, as content blocks. `CONFIGURATION` items only. Together with `model` and `provider`, at least one of the `CONFIGURATION` items you send must establish all three. See [step 3](#step-3-create-the-agent-instance). Omit any of the three on a later item to leave it unchanged. |
| `limits`        | No       | The agent's operational limits. `CONFIGURATION` items only; omit to leave the previously reported limits unchanged.                                                                                                                                                                                |
| `tools`         | No       | The complete list of tools available to the agent, replacing any previously reported list. `CONFIGURATION` items only; omit to leave the list unchanged, or send an empty array to clear it.                                                                                                       |
| `producedAt`    | Yes      | The timestamp from your runtime for when the message was produced.                                                                                                                                                                                                                                 |

Whenever you send `history`, also send the `jobKey` and `jobLease` from the job activation. Camunda records each item with a `PENDING` commit status and promotes it to `COMMITTED` when the job completes successfully. If the job fails and a later activation supersedes the lease, the items are marked `DISCARDED` instead.

The response echoes one entry per submitted item, in request order, with the `historyItemKey` Camunda assigned and an `isDuplicate` flag showing whether the item had already been recorded.

## Step 6: Complete the job

Complete the job with the same lease token you activated it with. Completing the job commits the conversation history and moves the process instance on to the next element.

```bash
curl -L 'http://localhost:8080/v2/jobs/2251799813685260/completion' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d '{
  "leaseToken": "eyJhY3RpdmF0aW9uIjoxfQ",
  "variables": {
    "response": "Retrieval-augmented generation research since 2024 focuses on..."
  }
}'
```

If your agent can't finish, [fail the job](/apis-tools/orchestration-cluster-api-rest/specifications/fail-job.api.mdx) or [throw a BPMN error](/apis-tools/orchestration-cluster-api-rest/specifications/throw-job-error.api.mdx) so the process can react to the failure. Both are governed the same way as any other job, so a failing external agent raises an [incident](/components/concepts/incidents.md) you can act on in Operate.

## Step 7: Verify the agent in Operate

Start a process instance and open it in Operate. Select the agent element on the diagram to see the agent instance data you reported: its state, usage metrics, model, system prompt, tools, and conversation history grouped by loop iteration.

See [monitor your AI agents](/components/agentic-orchestration/evaluate-agents/monitor-ai-agents.md) to learn how to inspect and debug AI agents in Operate.
