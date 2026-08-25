---
id: analytics-exporter
title: "Analytics exporter"
sidebar_label: "Analytics exporter"
description: "Understand how the analytics exporter sends product telemetry to Camunda, how to enable and configure it, and exactly what data it sends."
---

The analytics exporter sends product telemetry from your Orchestration Cluster to a Camunda-operated analytics endpoint over OTLP/HTTP.

Camunda uses this data to verify contractual usage, understand how the product is used, and support your deployment. For what Camunda collects and why across all products, see [Data collection](/reference/data-collection/data-collection.md).

The exporter is **disabled by default**. No data leaves your cluster until you add the exporter to your broker configuration.

:::info
The exporter sends process metadata only. It never sends process variables, payloads, message contents, job variables, incident error messages, or BPMN, DMN, and form resources.
:::

## How it works

The exporter reads records from the Zeebe log stream, keeps a fixed set of event types, converts each one into an OpenTelemetry log record, and pushes it to the configured endpoint in batches.

Three properties are worth understanding before you enable it:

- **It cannot slow down your brokers.** The exporter is fire-and-forget. Records are handed to a background thread and the broker acknowledges the log position immediately. If the queue fills or the endpoint is unreachable, records are dropped rather than back-pressuring the engine.
- **Delivery is best effort.** Records can be dropped if the endpoint is unreachable or a broker restarts, so the data is not guaranteed to be complete. Do not use it for billing, audit, or anything that depends on a complete record. For contractual metric reporting, see [Usage metrics](/reference/data-collection/usage-metrics.md).
- **It runs on the partition leader only.** No additional high-availability setup is required.

## Enable the exporter

Add an `analytics` exporter to your broker configuration. To disable it again, remove the declaration and restart the brokers.

```yaml
camunda:
  data:
    exporters:
      analytics:
        class-name: io.camunda.exporter.analytics.AnalyticsExporter
        args:
          categories:
            - contractual
            - optional
```

The equivalent environment variables:

```sh
CAMUNDA_DATA_EXPORTERS_ANALYTICS_CLASSNAME=io.camunda.exporter.analytics.AnalyticsExporter
CAMUNDA_DATA_EXPORTERS_ANALYTICS_ARGS_CATEGORIES_0=contractual
CAMUNDA_DATA_EXPORTERS_ANALYTICS_ARGS_CATEGORIES_1=optional
```

No further setup is required. The exporter resolves your [cluster ID](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#cluster) and [license key](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#licensing) from the broker automatically.

### Verify the exporter is running

On broker startup, look for this log line:

```
Analytics exporter configured: endpoint=<endpoint>, clusterId=<cluster-id>, partitionId=<partition-id>
```

## Network requirements

The exporter makes outbound HTTPS requests to the Camunda analytics endpoint:

:::danger BLOCKER - placeholder, do not publish
The analytics endpoint hostname is not confirmed. `stable/8.10` compiles `https://analytics.cloud.camunda.io`, identified as a placeholder on 2026-08-17. camunda/camunda#60355 sets the default to the working Cloud Run URL but is unmerged and not backported to `stable/8.10`. Resolve before merge and delete this admonition.
:::

Allowlist this host in your egress firewall rules on every broker.

:::warning
If the endpoint is unreachable, the exporter fails **silently**. No incident is raised, no error is surfaced to operators, and the brokers continue running normally. Verify connectivity when you enable the exporter; you will not be told if it stops working.
:::

## Choose what is sent

The `categories` option controls which signals are exported:

| Category      | Signals                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contractual` | `camunda.process.instance.activated`, `camunda.user_task.assigned`, `camunda.tenant.created`, `camunda.tenant.deleted`, `camunda.decision.instance.evaluated`                                                                                                                                                                                                                                      |
| `optional`    | `user_task_created`, `camunda.process.definition.created`, `camunda.process.definition.deleted`, `camunda.decision.definition.created`, `camunda.decision.definition.deleted`, `camunda.form.definition.created`, `camunda.form.definition.deleted`, `camunda.process.incident.created`, `camunda.process.incident.resolved`, `camunda.agent.instance.created`, `camunda.agent.instance.completed` |

`contractual` carries the signals behind the metrics in your agreement. `optional` carries product usage. Each signal is described in [What data is sent](#what-data-is-sent).

Both categories are active by default. Narrow the set by removing entries. For example, to send contractual signals only:

```yaml
camunda:
  data:
    exporters:
      analytics:
        class-name: io.camunda.exporter.analytics.AnalyticsExporter
        args:
          categories:
            - contractual
```

An omitted or empty `categories` list enables all categories.

Removing `optional` does not stop the hashed assignee identifier, because `camunda.user_task.assigned` is `contractual`. See [Assignee identifiers](#assignee-identifiers).

The `heartbeat` event and the `camunda.telemetry.export_window` metric are sent whenever the exporter runs, regardless of the categories you select. Camunda uses them to detect data gaps and offline clusters.

## Configuration reference

All options live under `args`. The defaults suit typical Self-Managed deployments and rarely need changing.

| Option               | Type     | Description                                                                                                                                         | Default                                           |
| -------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `endpoint`           | string   | OTLP/HTTP base URL for the analytics endpoint. The path `/v1/logs` is appended automatically.                                                       | see [Network requirements](#network-requirements) |
| `categories`         | list     | Signal categories to export: `contractual`, `optional`. Empty or omitted enables all.                                                               | `[contractual, optional]`                         |
| `push-interval`      | duration | Maximum time between batch pushes, as an [ISO 8601 duration](https://en.wikipedia.org/wiki/ISO_8601#Durations).                                     | `PT5M`                                            |
| `heartbeat-interval` | duration | Interval between heartbeat events carrying static cluster metadata.                                                                                 | `PT10M`                                           |
| `max-queue-size`     | int      | Maximum number of records buffered in memory before new records are dropped.                                                                        | `2048`                                            |
| `max-batch-size`     | int      | Maximum number of records per OTLP request. Must not exceed `max-queue-size`.                                                                       | `512`                                             |
| `sampling-rate`      | double   | Default sampling rate for events, between `0.0` and `1.0`. Individual signals may declare a lower rate; the effective rate is the lower of the two. | `1.0`                                             |

## Authentication

The exporter authenticates using your Camunda 8 Self-Managed license key.

There is nothing extra to configure. The exporter derives everything it needs from the license key already set on the cluster, and computes the credentials itself on startup.

**The raw license key is never transmitted.** The exporter sends a SHA-256 fingerprint of the key in the `x-camunda-fingerprint` header, and uses the key as an HMAC secret to sign each batch. Camunda maps the fingerprint to your organization.

If you rotate your license key, the exporter picks up the new key the next time the broker starts.

## What data is sent

Each signal is an [OpenTelemetry log record](https://opentelemetry.io/docs/specs/semconv/general/events/) identified by its `event.name`.

### Resource attributes

Attached to every record, metric point, and heartbeat:

| Attribute                    | Type   | Description                                                      |
| ---------------------------- | ------ | ---------------------------------------------------------------- |
| `camunda.cluster.id`         | string | Cluster identifier.                                              |
| `camunda.partition.id`       | long   | Partition ID.                                                    |
| `camunda.tenant.physical_id` | string | Physical tenant of the broker instance that produced the signal. |
| `service.name`               | string | Always `camunda-zeebe`.                                          |

### Common event attributes

Set on every event record:

| Attribute                       | Type   | Description                                                           |
| ------------------------------- | ------ | --------------------------------------------------------------------- |
| `event.name`                    | string | Signal identifier.                                                    |
| `camunda.log.position`          | long   | Log stream position. Used for deduplication.                          |
| `camunda.event.sequence_number` | long   | Monotonic per-partition counter, used for ordering and gap detection. |

### Contractual signals

**`camunda.process.instance.activated`** - a root process instance was activated.

| Attribute                           | Type   | Description                |
| ----------------------------------- | ------ | -------------------------- |
| `camunda.process.id`                | string | BPMN process ID.           |
| `camunda.process.version`           | long   | Deployed process version.  |
| `camunda.process.definition_key`    | long   | Process definition key.    |
| `camunda.process.instance_key`      | long   | Process instance key.      |
| `camunda.process.root_instance_key` | long   | Root process instance key. |
| `camunda.tenant.id`                 | string | Tenant ID.                 |

Taken from activation of the root process element, the single point every process instance passes through however it was started: client API, message, timer, signal, or conditional start event. Instances started by a call activity are excluded, so this counts root instances only.

**`camunda.user_task.assigned`** - a user task was assigned to a user.

| Attribute                         | Type   | Description                                                                            |
| --------------------------------- | ------ | -------------------------------------------------------------------------------------- |
| `camunda.user_task.key`           | long   | User task key.                                                                         |
| `camunda.user_task.assignee_hash` | string | SHA-256 hex digest of the assignee. See [Assignee identifiers](#assignee-identifiers). |
| `camunda.process.instance_key`    | long   | Process instance key.                                                                  |
| `camunda.tenant.id`               | string | Tenant ID.                                                                             |

Assignments with an empty assignee produce no event.

**`camunda.tenant.created`** and **`camunda.tenant.deleted`**

| Attribute           | Type   | Description |
| ------------------- | ------ | ----------- |
| `camunda.tenant.id` | string | Tenant ID.  |

The tenant name, description, and associated entity are not exported.

**`camunda.decision.instance.evaluated`** (counter metric) - pre-aggregated count of evaluated decision instances, dimensioned by `camunda.tenant.id`.

Counts evaluation records rather than the decisions inside them: a decision requiring sub-decisions counts once, and failed evaluations are not counted. This matches the counting rule for the decision instance usage metric.

### Optional signals

**`user_task_created`** - a user task was created.

| Attribute                        | Type   | Description                       |
| -------------------------------- | ------ | --------------------------------- |
| `camunda.process.id`             | string | BPMN process ID.                  |
| `camunda.process.definition_key` | long   | Process definition key.           |
| `camunda.process.instance_key`   | long   | Process instance key.             |
| `camunda.element.id`             | string | BPMN element ID of the user task. |
| `camunda.tenant.id`              | string | Tenant ID.                        |

**`camunda.process.incident.created`** and **`camunda.process.incident.resolved`**

| Attribute                        | Type   | Description             |
| -------------------------------- | ------ | ----------------------- |
| `camunda.incident.key`           | long   | Incident key.           |
| `camunda.process.id`             | string | BPMN process ID.        |
| `camunda.process.definition_key` | long   | Process definition key. |
| `camunda.process.instance_key`   | long   | Process instance key.   |
| `camunda.tenant.id`              | string | Tenant ID.              |

Both carry the same attributes, so time to resolution is a join on `camunda.incident.key`.

**The incident error message is not exported**, because it can quote expressions and variable values.

**`camunda.process.definition.created`** and **`camunda.process.definition.deleted`**

| Attribute                        | Type   | Description             |
| -------------------------------- | ------ | ----------------------- |
| `camunda.process.id`             | string | BPMN process ID.        |
| `camunda.process.version`        | long   | Process version.        |
| `camunda.process.definition_key` | long   | Process definition key. |
| `camunda.tenant.id`              | string | Tenant ID.              |

The BPMN resource, resource name, and version tag are not exported.

**`camunda.decision.definition.created`** and **`camunda.decision.definition.deleted`**

| Attribute                  | Type   | Description               |
| -------------------------- | ------ | ------------------------- |
| `camunda.decision.id`      | string | Decision ID from the DMN. |
| `camunda.decision.key`     | long   | Decision key.             |
| `camunda.decision.version` | long   | Decision version.         |
| `camunda.tenant.id`        | string | Tenant ID.                |

The decision name and version tag are not exported.

**`camunda.form.definition.created`** and **`camunda.form.definition.deleted`**

| Attribute              | Type   | Description   |
| ---------------------- | ------ | ------------- |
| `camunda.form.id`      | string | Form ID.      |
| `camunda.form.key`     | long   | Form key.     |
| `camunda.form.version` | long   | Form version. |
| `camunda.tenant.id`    | string | Tenant ID.    |

The form resource, resource name, and version tag are not exported.

**`camunda.agent.instance.created`** and **`camunda.agent.instance.completed`**

| Attribute                           | Type   | Description                                                       |
| ----------------------------------- | ------ | ----------------------------------------------------------------- |
| `camunda.agent.instance_key`        | long   | Agent instance key.                                               |
| `camunda.agent.definition_key`      | long   | Agent definition key.                                             |
| `camunda.agent.status`              | string | Agent instance status, for example `INITIALIZING` or `COMPLETED`. |
| `camunda.process.id`                | string | BPMN process ID.                                                  |
| `camunda.process.definition_key`    | long   | Process definition key.                                           |
| `camunda.process.instance_key`      | long   | Process instance key.                                             |
| `camunda.process.root_instance_key` | long   | Root process instance key.                                        |
| `camunda.tenant.id`                 | string | Tenant ID.                                                        |

Both carry the same attributes, so agent run duration is a join on `camunda.agent.instance_key`.

The agent definition (model, provider, system prompt), its tools, its token counts and other collected metrics, and its configured limits are **not** exported.

### Always-on signals

**`heartbeat`** - periodic liveness signal from the partition leader.

| Attribute                            | Type   | Description                 |
| ------------------------------------ | ------ | --------------------------- |
| `event.name`                         | string | Always `heartbeat`.         |
| `camunda.heartbeat.broker_version`   | string | Broker version.             |
| `camunda.heartbeat.exporter_version` | string | Analytics exporter version. |

**`camunda.telemetry.export_window`** (gauge metric) - accompanies every metrics export, carrying the window total and log position range. Camunda uses it for deduplication and gap detection.

### What is never sent

Regardless of configuration, the exporter never sends:

- Process variables, job variables, or any payload
- Message contents or correlation keys
- Incident error messages
- BPMN, DMN, and form resources, resource names, or version tags
- Tenant names and descriptions
- Agent system prompts, tool definitions, or model configuration
- Raw user names, email addresses, or your license key

## Assignee identifiers

`camunda.user_task.assigned` carries `camunda.user_task.assignee_hash`, a SHA-256 hex digest of the assignee. The raw assignee value is never sent. Camunda uses the digest to count distinct task users for the contractual task-user metric.

Understand what this identifier is:

- It is a **pseudonym, not anonymous data**. The digest is stable, so it identifies one individual consistently across events.
- The hash is **unsalted**, so the same assignee produces the same digest on every cluster.
- It **cannot be disabled independently** in this release. Because the signal is `contractual`, removing `optional` from `categories` does not suppress it. The only way to stop it is to not run the exporter.

For how Camunda treats this data, its lawful basis, and how to raise an objection, see [Data collection](/reference/data-collection/data-collection.md).

## Failure behavior

Under any failure mode, broker throughput is unaffected and records may be dropped without notice. Records are lost when:

- **The in-memory queue is full**, typically because the endpoint is slow or unreachable. New records are dropped without retry.
- **A broker crashes or restarts.** The queue is not persisted.
- **The endpoint returns an error.** The exporter does not retry persistently and does not buffer to disk.

Because every record carries `camunda.cluster.id`, `camunda.partition.id`, and `camunda.log.position`, Camunda deduplicates redelivered records downstream.

## Limitations

- **Analytics-grade only.** No exactly-once delivery, no reconciliation, no gap filling.
- **Fixed signal set.** Individual signals cannot be toggled; only whole categories.
- **No feedback on failure.** A misconfigured endpoint produces no operator-visible error.
