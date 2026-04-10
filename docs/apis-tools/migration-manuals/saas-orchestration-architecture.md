---
id: saas-orchestration-architecture
title: "SaaS orchestration architecture"
description: "Learn about the new streamlined SaaS orchestration architecture in Camunda 8.9."
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## About

Camunda 8.9 introduces a streamlined SaaS orchestration architecture. The runtime for Operate, Tasklist, Identity (Admin), and the Zeebe REST API is unified into a single orchestration service. Zeebe brokers continue to run separately and execute workflows as before.

This is a topology change in SaaS only and does not affect Self-Managed deployments.

What's new:

- [Unified API domain for Orchestration Clusters](#unified-api-domain-for-orchestration-clusters). Legacy hostnames are deprecated but will remain available throughout 8.9 and are scheduled for removal in 8.10.
- [Client credentials for new clusters use unified API URLs.](#client-credentials-and-legacy-hostnames)
- [Cluster Metrics endpoint: `service` labels have changed on Orchestration Cluster metrics.](#service-label-changes)

What didn't change:

- The same UIs for Operate, Tasklist, and Admin/Identity and the REST API remain available as before.
- The Zeebe gRPC endpoint is unchanged.

## Unified API domain for Orchestration Clusters

Camunda 8.9 introduces a unified API domain for Orchestration Clusters. All services are now accessible under a single base URL:

| Service             | Unified URL (8.9)                                            |
| :------------------ | :----------------------------------------------------------- |
| Base / REST API     | `https://<region>.api.<camunda-domain>/<clusterId>`          |
| Operate UI          | `https://<region>.api.<camunda-domain>/<clusterId>/operate`  |
| Tasklist UI         | `https://<region>.api.<camunda-domain>/<clusterId>/tasklist` |
| Admin (Identity) UI | `https://<region>.api.<camunda-domain>/<clusterId>/admin`    |

Legacy hostnames (`*.zeebe.<camunda-domain>`, `*.operate.<camunda-domain>`, `*.tasklist.<camunda-domain>`, and `*.identity.<camunda-domain>`) continue to work in 8.9 and are internally routed to the unified service, but are deprecated and scheduled for removal in 8.10.

After the 8.10 release, only the Zeebe gRPC endpoint and the unified `*.api.*` endpoints will remain.

### Deprecation

Legacy hostnames are deprecated as of 8.9 and will be removed in 8.10. Migrate any hard-coded URLs for Operate, Tasklist, or Identity to the new unified `*.api.*` URLs during the 8.9 lifecycle to ensure readiness before the 8.10 release.

## Client credentials and legacy hostnames

Existing client credentials downloaded from Console for pre-8.9 clusters may reference legacy hostnames. Because those hostnames remain available in 8.9, existing credentials continue to work after a cluster is upgraded to 8.9. No immediate action is required.

### Recommended action

For long-lived automation and CI/CD systems, Camunda recommends updating credentials to use the new unified `*.api.*` URLs and corresponding token audience values before 8.10. You have two options:

- **Update existing credentials manually:** Edit the hostnames and token audience values in your existing credential configuration to reference the new unified URLs.
- **Create new credentials:** Create a fresh set of client credentials in Camunda Console, which will be generated with the unified API URLs and correct audience values by default.

## Service label changes

<span className="badge badge--breaking-change">Breaking change</span>

Due to the streamlined orchestration architecture introduced in 8.9, metrics previously emitted by the individual Operate, Tasklist, and Identity services are now emitted by the unified orchestration service. As a result, the `service` label on affected metrics will change to reflect the new source service.

This applies to Camunda 8 SaaS clusters using the [Cluster Metrics endpoint](/components/saas/monitoring/cluster-metrics-endpoint/set-up-cluster-metrics-endpoint.md).

### Impact

Monitoring dashboards, alerting rules, or queries that filter or group by the `service` label on Orchestration Cluster metrics may stop matching expected values after upgrading to 8.9, as some metrics will now be emitted by a different source service.

### Action required

After your cluster is upgraded to 8.9, review your dashboards and alerting rules and verify which `service` label values your metrics return. Update any Prometheus queries or alert definitions that no longer match.

## Upgrade behavior and expected downtime

When a Camunda 8 SaaS Orchestration Cluster is upgraded from 8.8 to 8.9:

1. The existing Operate and Tasklist components are shut down.
2. The unified orchestration service starts in their place.
3. Endpoint routing is updated so legacy hostnames continue to resolve while the new `*.api.*` endpoints become active.

### Impact during upgrade

- **Web UIs and REST API:** You should expect a short interruption while the old services are removed and the unified service becomes ready.
- **Workflow execution (Zeebe brokers):** Designed to remain running throughout the upgrade. The primary impact is limited to UI and API availability, not to engine execution state.

To upgrade, initiate the cluster upgrade to 8.9 from Camunda Console. No additional steps are required beyond the URL and credential recommendations above.
