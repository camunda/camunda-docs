---
id: 8110-announcements
title: "8.11 Release announcements"
sidebar_label: Release announcements
description: "Supported environment changes, breaking changes, and deprecations in Camunda 8.11."
toc_max_heading_level: 3
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## APIs & tools

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Batch process instance operations now narrow and validate the `state` filter {#batch-operation-state-filter}

Starting with 8.11, the batch operations to modify, migrate, resolve incidents, suspend, resume, and cancel process instances narrow your `state` filter with the state the operation requires, and validate it.

Previously, the API documentation described the `state` filter as "ignored and overridden". This didn't match the actual behavior, which differed by operation.

| Operation                                                                                                                | Required state           | Previous behavior                             |
| :----------------------------------------------------------------------------------------------------------------------- | :----------------------- | :-------------------------------------------- |
| [Modify](/apis-tools/orchestration-cluster-api-rest/specifications/modify-process-instances-batch-operation.api.mdx)     | `ACTIVE`                 | Combined your filter with the required state. |
| [Migrate](/apis-tools/orchestration-cluster-api-rest/specifications/migrate-process-instances-batch-operation.api.mdx)   | `ACTIVE`                 | Combined your filter with the required state. |
| [Resolve incidents](/apis-tools/orchestration-cluster-api-rest/specifications/resolve-incidents-batch-operation.api.mdx) | `ACTIVE`                 | Combined your filter with the required state. |
| [Suspend](/apis-tools/orchestration-cluster-api-rest/specifications/suspend-process-instances-batch-operation.api.mdx)   | `ACTIVE`                 | Replaced your filter with the required state. |
| [Resume](/apis-tools/orchestration-cluster-api-rest/specifications/resume-process-instances-batch-operation.api.mdx)     | `SUSPENDED`              | Replaced your filter with the required state. |
| [Cancel](/apis-tools/orchestration-cluster-api-rest/specifications/cancel-process-instances-batch-operation.api.mdx)     | `ACTIVE` and `SUSPENDED` | Combined your filter with the required state. |

The following rules apply to all six operations:

- A top-level `state` filter that uses `$eq` or `$in` with a state outside the required states is rejected with `400 Bad Request`. Modify, migrate, and resolve incidents previously accepted such a filter and created an empty batch. Suspend and resume previously discarded the filter. Cancel already rejected it.
- States inside `$or` branches aren't validated. A branch that conflicts with the required state matches no instances. Cancel previously rejected invalid states in `$or` branches.
- The `$neq`, `$exists`, and `$like` operators on a top-level `state` are applied as given.

The following changes apply to the `parentProcessInstanceKey` filter:

- Suspend and resume now apply the filter as given. Previously, they discarded it and could act on instances outside your filter.
- Cancel now narrows the filter to root instances instead of replacing it. A filter that matches only child instances selects no instances and doesn't return an error.

**Action:** Remove a conflicting top-level `state` filter from your batch requests, or move it into an `$or` branch. If your integration relied on suspend or resume discarding your `parentProcessInstanceKey` filter, review the filter, because it now limits the batch.

</div>
</div>

## Data

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### MariaDB connections use TLS by default {#mariadb-tls-by-default}

Starting with Camunda 8.11, Camunda bundles version 4 of the MariaDB JDBC driver (`org.mariadb.jdbc:mariadb-java-client`). This driver connects with TLS by default and verifies the server certificate. The driver bundled with earlier versions connected without TLS unless you enabled it in the JDBC URL.

This affects deployments that use MariaDB as secondary storage:

- If your MariaDB server doesn't have TLS enabled, for example MariaDB 10.11 with default settings, Camunda fails at startup with `Trying to connect with ssl, but ssl not enabled in the server`.
- If your MariaDB server uses a certificate the driver can't verify, such as a self-signed certificate, Camunda fails at startup with `Self signed certificates. Either set sslMode=trust, use password with a MitM-Proof authentication plugin or provide server certificate to client`.

MariaDB 11.4 and later enable TLS by default with a generated certificate that the driver verifies when it connects with a password. A default installation of these versions isn't affected.

**Action:** Before you upgrade to 8.11, check how Camunda connects to MariaDB:

- We recommend enabling TLS on your MariaDB server. If the server uses a self-signed certificate or one from a private certificate authority, set `serverSslCert` in the JDBC URL to that certificate, for example `jdbc:mariadb://hostname:3306/camunda?serverSslCert=/path/to/ca-cert.pem`.
- To keep connecting without TLS, add `sslMode=disable` to the JDBC URL, for example `jdbc:mariadb://hostname:3306/camunda?sslMode=disable`.

For more information, see [TLS/SSL configuration](/self-managed/deployment/helm/configure/database/rdbms-troubleshooting.md#tlsssl-configuration).

</div>
</div>

## Deployment

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Grafana dashboards use the v2 dashboard schema and require Grafana 13 or later {#grafana-dashboards-v2-schema}

Starting with Camunda 8.11, the Grafana dashboards published in [`monitor/grafana`](https://github.com/camunda/camunda/tree/main/monitor/grafana) of the `camunda/camunda` repository use the new [v2 dashboard schema](https://grafana.com/whats-new/2025-04-11-new-dashboards-schema/). Camunda 8.10 is the last release that provides the dashboards in the classic format, which [Camunda deprecated in 8.10](/reference/announcements-release-notes/8100/8100-announcements.md#classic-grafana-dashboard-format-deprecated). The classic dashboards of 8.10 and earlier releases continue to work with your Grafana instance.

The dashboards of 8.11 require Grafana 13 or later. Earlier Grafana versions cannot import the v2 dashboard schema.

**Action:** Before you move to the dashboards of 8.11, upgrade your Grafana instance to version 13 or later. To keep using the dashboards in the classic format, import them from the `stable/8.10` branch or from the branch of the release you run.

</div>
</div>
