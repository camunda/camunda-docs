---
id: 8110-release-notes
title: "8.11 Release notes"
sidebar_label: Release notes
description: "Release notes for new features included in the 8.11 minor release, including alpha feature releases."
keywords: ["8.11 release notes", "release notes for 8.11", "release notes"]
page_rank: 90
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## 8.11.0-alpha2

| Release date    | Changelog(s)                                                                                                                                                                                 |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 8 December 2026 | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.11.0-alpha2)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.11.0-alpha2)</li></ul> |

### Orchestration Cluster

#### Resolve secrets from environment variables

<!-- https://github.com/camunda/camunda/issues/67203, https://github.com/camunda/camunda/issues/67220, https://github.com/camunda/camunda/issues/67221 -->

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Orchestration Cluster">Orchestration Cluster</span></div>

Centralized secret resolution adds an environment variable store that resolves `camunda.secrets.<name>` references from environment variables carrying a mandatory prefix. Use it for local, CI, and lightweight setups, and for Helm installations that pass Kubernetes Secrets in as environment variables, without running an external vault.

The store reads the environment once at startup, so changing a value requires a restart. A missing, malformed, or reserved prefix such as `CAMUNDA_` or `ZEEBE_` refuses startup with a message naming the setting.

Camunda 8 Run supports the store through `C8RUN_SECRETS_MODE=env` and `C8RUN_SECRETS_ENV_PREFIX`, with a separate variable prefix for each Physical Tenant.

<ul>
  <li><span class="link-arrow">[Environment variable store configuration](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#environment-variable-store)</span></li>
  <li><span class="link-arrow">[Use secrets from environment variables in Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run/configuration.md#use-secrets-from-environment-variables)</span></li>
  <li><span class="link-arrow">[Secret resolution](/components/concepts/secret-resolution.md)</span></li>
</ul>

## 8.11.0-alpha1

| Release date     | Changelog(s)                                                                                                                                                                                 |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 10 November 2026 | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.11.0-alpha1)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.11.0-alpha1)</li></ul> |

### APIs & tools

#### Read the engine clock and add time without pinning it

<!-- https://github.com/camunda/camunda/issues/57863, https://github.com/camunda/camunda/pull/66061, https://github.com/camunda/camunda/issues/57864, https://github.com/camunda/camunda/pull/66462 -->

<div class="release"><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Orchestration Cluster">Orchestration Cluster</span></div>

Use two new Orchestration Cluster REST API endpoints to read and move the engine clock without stopping it.

| Endpoint             | Description                                                                                                       | Required permission  | Java client                             |
| :------------------- | :---------------------------------------------------------------------------------------------------------------- | :------------------- | :-------------------------------------- |
| `GET /v2/clock`      | Returns the current time of the engine clock. If the clock is pinned, it returns the pinned time.                 | `READ` on `SYSTEM`   | `newClockGetRequest()`                  |
| `POST /v2/clock/add` | Moves the clock forward or backward by an ISO 8601 duration, such as `PT1H` or `-PT1H`, and returns the new time. | `UPDATE` on `SYSTEM` | `newAddClockCommand().offset(Duration)` |

Both endpoints return the time as an ISO 8601 date-time, for example `{ "timestamp": "2025-01-01T12:00:00.000Z" }`.

Unlike pinning, adding time keeps the clock running from the new time, so job timeouts and retry backoffs still run out in tests. If the clock is pinned, it stays pinned and moves to the pinned time plus the offset. To remove the added time, reset the clock with `POST /v2/clock/reset`.

<ul>
  <li><span class="link-arrow">[Get internal clock](/apis-tools/orchestration-cluster-api-rest/specifications/get-clock.api.mdx)</span></li>
  <li><span class="link-arrow">[Add time to internal clock](/apis-tools/orchestration-cluster-api-rest/specifications/add-clock.api.mdx)</span></li>
</ul>

### Hub

#### Configurable session idle timeout

<!-- https://github.com/camunda/camunda-security-library/issues/597, https://github.com/camunda/camunda-security-library/issues/692, https://github.com/camunda/camunda/issues/60021, https://github.com/camunda/camunda/issues/60196, https://github.com/camunda/camunda/issues/60201, https://github.com/camunda/camunda/issues/60208, https://github.com/camunda/camunda-cloud-management-apps/issues/9658, https://github.com/camunda/camunda-cloud-management-apps/issues/9732, https://github.com/camunda/camunda-cloud-management-apps/issues/10097. The customer-facing "Cluster defaults" tab is behind the console.orgClusterDefaults flag, which was dev-only when it merged. -->

<div class="release"><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Console">Hub Console</span></div>

Camunda now supports configurable session idle timeout for SaaS and Self-Managed.

- Administrators can set an organization-wide default idle timeout and override it per cluster and connected IdP.
- Camunda automatically ends a user's session if it goes idle beyond the configured period, measured by keyboard and mouse inactivity rather than background application traffic. You can configure your organization's idle timeout policy in Hub Console.

This addresses a known compliance gap (such as PCI DSS 4.0 Requirement 8.2.8), and gives security and compliance administrators a verifiable, enforced control to reference in an audit.

##### Cluster configuration

- **Idle timeout**: Set `camunda.security.session.max-inactive-interval` to configure the idle timeout. The default is `30m` (30 minutes).
- **Timeout based on user activity**: If you set `camunda.security.session.heartbeat.enabled=true`, only keyboard and mouse activity in the browser keeps a session alive. Background polling no longer keeps a session alive. The Orchestration Cluster web application, Operate, Tasklist, and Admin all send this heartbeat.
- **Re-login after a timeout on SaaS**: Camunda sends the timeout to Auth0 as `max_age`, so an expired session asks the user to log in again instead of being silently renewed.

<p class="link-arrow">[Property reference](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#camundasecuritysession)</p>

##### Console (SaaS)

- **Per cluster**: Set the idle timeout and heartbeat in Hub cluster settings. Applies to clusters on 8.10.0-alpha5 or later.
- **Organization default**: Set a default idle timeout for new clusters. The default applies only when you create a cluster. Existing clusters keep their own value, which you can still edit.

<p class="link-arrow">[View Console](/components/hub/organization/console.md)</p>

### Modeler

#### Camunda Design System in Desktop Modeler

<!-- https://github.com/camunda/product-hub/issues/3873 -->

<div class="release"><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Desktop Modeler">Desktop Modeler</span></div>

Desktop Modeler now uses the Camunda Design System. The application UI, the BPMN, DMN, and form editors, the properties panel, and side panels such as the variables outline and task testing all use Camunda Design System components and style.

Desktop Modeler no longer ships Carbon or its previous global styles. If your plugin relies on Carbon components, classes, or styles, replace them with Camunda Design System components and tokens, or remove them.

<ul>
  <li><span class="link-arrow">[Camunda Design System on GitHub](https://camunda.github.io/design-system/?path=/docs/introduction--docs)</span></li>
  <li><span class="link-arrow">[Camunda Design System Design Tokens on GitHub](https://camunda.github.io/design-system/?path=/docs/design-tokens--docs)</span></li>
</ul>

### Orchestration Cluster

#### Evenly distributed record indices in Elasticsearch and OpenSearch

<!-- https://github.com/camunda/camunda/issues/54601, https://github.com/camunda/camunda/pull/56522 -->

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Zeebe">Zeebe</span></div>

The Elasticsearch and OpenSearch exporters now spread Zeebe records more evenly across index shards. The `zeebe-record-job` and `zeebe-record-process-instance` indices default to `5` shards, up from `3`. The `zeebe-record-user-task` index defaults to `1` shard, down from `3`. With a three-partition cluster, the records of each partition land on a separate shard instead of two partitions sharing one shard.

Only newly created dated indices use the new defaults. An existing index keeps the shard count it was created with. If you set `number-of-shards`, it still overrides the template defaults for all indices.

<ul>
  <li><span class="link-arrow">[Elasticsearch exporter configuration](/self-managed/components/orchestration-cluster/zeebe/exporters/elasticsearch-exporter.md#configuration)</span></li>
  <li><span class="link-arrow">[OpenSearch exporter configuration](/self-managed/components/orchestration-cluster/zeebe/exporters/opensearch-exporter.md#configuration)</span></li>
</ul>
