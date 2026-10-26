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

## 8.11.0-alpha1

| Release date     | Changelog(s)                                                                                                                                                                                 |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 10 November 2026 | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.11.0-alpha1)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.11.0-alpha1)</li></ul> |

### Hub

#### Configurable session idle timeout

<div class="release"><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Console">Hub Console</span></div>

Camunda now supports configurable session idle timeout for SaaS and Self-Managed.

- Administrators can set an organization-wide default idle timeout and override it per cluster and connected IdP.
- Camunda automatically ends the session if a user's session goes idle beyond the configured period, measured by keyboard and mouse inactivity rather than background application traffic.

This closes a known compliance gap (for example, PCI DSS 4.0 Requirement 8.2.8) and gives security and compliance administrators a verifiable, enforced control they can reference to in an audit. You can configure your organization's idle timeout policy in Hub Console.

<!-- https://github.com/camunda/camunda-security-library/issues/597, https://github.com/camunda/camunda-security-library/issues/692, https://github.com/camunda/camunda/issues/60021, https://github.com/camunda/camunda/issues/60196, https://github.com/camunda/camunda/issues/60201, https://github.com/camunda/camunda/issues/60208, https://github.com/camunda/camunda-cloud-management-apps/issues/9658, https://github.com/camunda/camunda-cloud-management-apps/issues/9732, https://github.com/camunda/camunda-cloud-management-apps/issues/10097. The customer-facing "Cluster defaults" tab is behind the console.orgClusterDefaults flag, which was dev-only when it merged. -->

##### Cluster configuration

- **Idle timeout**: Set `camunda.security.session.max-inactive-interval` to configure the idle timeout. The default is `30m`.
- **Timeout based on user activity**: When you set `camunda.security.session.heartbeat.enabled=true`, only keyboard and mouse activity in the browser keeps a session alive. Background polling no longer does. The Orchestration Cluster web application, Operate, Tasklist, and Admin all send this heartbeat.
- **Re-login after a timeout on SaaS**: Camunda sends the timeout to Auth0 as `max_age`, so an expired session asks the user to log in again instead of being silently renewed.

##### Console (SaaS)

- **Per cluster**: Set the idle timeout and the heartbeat setting in the cluster settings in Hub Console. This applies to clusters on 8.10.0-alpha5 or later.
- **Organization default**: Set a default idle timeout for new clusters. The default applies only when you create a cluster. Existing clusters keep their own value, which you can still edit.

### Desktop Modeler

#### Camunda Design System in Desktop Modeler

<!-- https://github.com/camunda/product-hub/issues/3873 -->

<div class="release"><span class="badge badge--medium" title="This feature affects Desktop Modeler">Desktop Modeler</span></div>

Desktop Modeler now uses the Camunda Design System, so it looks consistent with the rest of Camunda 8. The application UI, the BPMN, DMN, and form editors, the properties panel, and shared panels such as the variables outline and task testing all use Camunda Design System components and tokens.

Desktop Modeler no longer ships Carbon styles. If your plugin relies on Carbon classes or styles, update it to use Camunda Design System tokens instead.

<p class="link-arrow">[Migrate plugins to the Camunda Design System](/components/modeler/desktop-modeler/plugins/plugins.md)</p>

### Orchestration Cluster

#### Evenly distributed record indices in Elasticsearch and OpenSearch

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span></div>

<!-- https://github.com/camunda/camunda/issues/54601, https://github.com/camunda/camunda/pull/56522 -->

The Elasticsearch and OpenSearch exporters now spread Zeebe records more evenly across index shards. The `zeebe-record-job` and `zeebe-record-process-instance` indices default to `5` shards, up from `3`. The `zeebe-record-user-task` index defaults to `1` shard, down from `3`. With a three-partition cluster, the records of each partition land on a separate shard instead of two partitions sharing one shard.

Only newly created dated indices use the new defaults. An existing index keeps the shard count it was created with. If you set `number-of-shards`, it still overrides the template defaults for all indices.

- [Elasticsearch exporter configuration](/self-managed/components/orchestration-cluster/zeebe/exporters/elasticsearch-exporter.md#configuration)
- [OpenSearch exporter configuration](/self-managed/components/orchestration-cluster/zeebe/exporters/opensearch-exporter.md#configuration)
