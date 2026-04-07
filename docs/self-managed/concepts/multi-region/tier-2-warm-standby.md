---
id: tier-2-warm-standby
title: "Tier 2: Warm Standby"
sidebar_label: "Tier 2 — Warm Standby"
description: "Dual-region warm standby for Camunda Self-Managed: reference architecture, exporter configuration, failover runbook, Elasticsearch vs. RDBMS comparison, and upgrade path to Tier 3."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Tier 2 formalizes Camunda's production-proven dual-region configuration — the warm standby architecture that enterprise customers already operate — with published RTO/RPO targets, a certified reference architecture, and a documented failover runbook.

In Tier 2, a full Camunda Orchestration Cluster runs continuously in both a primary and a secondary region. Zeebe replicates its log stream across both regions using the Raft protocol, and secondary storage (Elasticsearch or RDBMS) is populated independently in each region via the Camunda Exporter. Under normal operation, user traffic is routed exclusively to the primary region. On primary-region failure, an operator executes the failover runbook to restore service from the secondary region.

| Property | Value |
|----------|-------|
| **RTO** | ~15 minutes |
| **RPO** | ~5 minutes (secondary storage); 0 for Zeebe primary storage |
| **Failover mode** | Manual, operator-initiated |
| **Standing second region required** | Yes — full Orchestration Cluster running in both regions |
| **Primary compliance fit** | DORA, SR 11-7 (with documented runbook) |

:::note Existing dual-region operators
If you are already running a dual-region Elasticsearch configuration, your setup is now formally documented as Tier 2 with published RTO/RPO targets and this runbook. No infrastructure changes are required. Update your operational documentation to reference these pages as the authoritative Camunda guidance.
:::

## Reference architecture

Tier 2 uses the Camunda dual-region architecture described in the [dual-region concept page](/self-managed/concepts/multi-region/dual-region.md). Both regions run a full Orchestration Cluster. Zeebe uses active-active Raft-based log replication across brokers distributed across both regions. Secondary storage is populated independently in each region by the Camunda Exporter — the two Elasticsearch clusters do not communicate directly; data consistency is maintained at the Zeebe exporter layer.

```
┌──────────────────────────────────────┐       ┌──────────────────────────────────────┐
│ Region 0 — Primary                    │       │ Region 1 — Secondary                  │
│ (serves user traffic)                 │       │ (no user traffic under normal ops)    │
│                                       │       │                                       │
│  ┌─────────────────────────────┐      │       │  ┌─────────────────────────────┐      │
│  │ Orchestration Cluster        │◄────►│       │  │ Orchestration Cluster        │      │
│  │  Zeebe brokers (even IDs)    │ Raft │       │  │  Zeebe brokers (odd IDs)     │      │
│  │  Operate  │  Tasklist        │      │       │  │  Operate  │  Tasklist        │      │
│  │  Admin                       │      │       │  │  Admin                       │      │
│  └──────────────┬──────────────┘      │       │  └──────────────┬──────────────┘      │
│                 │ Camunda Exporter     │       │                 │ Camunda Exporter     │
│                 ▼                     │       │                 ▼                     │
│  ┌──────────────────────────┐         │       │  ┌──────────────────────────┐         │
│  │ Elasticsearch (Region 0)  │         │       │  │ Elasticsearch (Region 1)  │         │
│  └──────────────────────────┘         │       │  └──────────────────────────┘         │
└──────────────────────────────────────┘       └──────────────────────────────────────┘

       ▲ User traffic (primary region only under normal operation)
       └── DNS / load balancer
```

For full architecture details including network requirements and component requirements, see the [dual-region concept page](/self-managed/concepts/multi-region/dual-region.md).

### Component behavior

| Component | Replication mode | User traffic | RPO |
|-----------|-----------------|--------------|-----|
| **Zeebe** | Active-active (Raft across both regions) | Both regions process data | 0 |
| **Admin** | Active-active (embedded in Orchestration Cluster) | Cluster-level identity management | 0 |
| **Operate** | Data replicated; user traffic to primary only | Primary region only | ~5 minutes (see note) |
| **Tasklist** | Data replicated; user traffic to primary only | Primary region only | ~5 minutes (see note) |
| **Elasticsearch** | Independent per-region (populated by Zeebe Exporter) | No direct user traffic | ~5 minutes (see note) |

:::note RPO for secondary storage
The ~5-minute RPO applies to data visible in Operate and Tasklist (stored in Elasticsearch or RDBMS). This reflects the Camunda Exporter lag — the time between a Zeebe event and its appearance in secondary storage. Zeebe itself maintains RPO = 0 through synchronous Raft replication.

If you are using Camunda v1 APIs for batch operations or task assignments, some state is **region-specific** and will be lost on primary-region failure. Migrate to the v2 REST API and Tasklist v2 mode to eliminate this category of data loss. See [active-active mode](/self-managed/concepts/multi-region/dual-region.md#active-active).
:::

### Network requirements

- Maximum network round-trip time (RTT) between regions: **≤ 100 ms**
- Required open ports between regions:
  - **9200** — Elasticsearch (cross-region data pushed by Zeebe Exporter)
  - **26500** — Zeebe Gateway (client/worker communication)
  - **26501–26502** — Zeebe broker-to-broker and broker-to-gateway communication
- Kubernetes pod and service CIDRs must not overlap across the two clusters
- AWS EKS: VPC peering and DNS chaining are required — see [Amazon EKS dual-region setup](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md)

## Exporter configuration

The Camunda Exporter writes process data from Zeebe to secondary storage. In a Tier 2 setup, each region's Zeebe brokers export independently to their local Elasticsearch cluster. Do not configure cross-region Elasticsearch endpoints in the exporter.

```yaml
# Helm chart values.yaml — Camunda Exporter (applied in both regions independently)
zeebe:
  env:
    - name: ZEEBE_BROKER_EXPORTERS_CAMUNDAEXPORTER_CLASSNAME
      value: io.camunda.exporter.CamundaExporter
    - name: ZEEBE_BROKER_EXPORTERS_CAMUNDAEXPORTER_ARGS_CONNECT_URL
      value: "http://elasticsearch:9200"  # local-region Elasticsearch endpoint only
```

### Zeebe cluster sizing requirements

Both regions must use compatible Zeebe cluster configurations. The following constraints apply to ensure even partition distribution across regions.

| Parameter | Requirement | Reason |
|-----------|-------------|--------|
| `clusterSize` | Multiple of 2, minimum 4 | Ensures equal broker count in each region |
| `replicationFactor` | 4 | Ensures partitions are replicated across both regions |
| `partitionCount` | Unrestricted | Choose based on workload; see [sizing your environment](/components/best-practices/architecture/sizing-your-environment.md) |

Zeebe assigns even-numbered brokers (0, 2, 4, …) to one region and odd-numbered brokers (1, 3, 5, …) to the other. This round-robin assignment ensures partitions have leaders and followers in both regions, meeting quorum requirements even under region pressure.

## Data flow and consistency behavior

Under normal operation, Zeebe continuously exports events to the local Elasticsearch cluster in each region. The two clusters are independent — there is no direct cross-region Elasticsearch replication.

**Export lag**: There is an inherent delay between a Zeebe event and its appearance in Elasticsearch, typically measured in seconds under normal load. Under sustained high throughput or network pressure, lag can grow.

**Consistency on failover**: When the primary region fails, the secondary region's Elasticsearch cluster reflects Zeebe state up to the point of last successful export — typically within the ~5-minute RPO window. Zeebe's Raft log in the surviving region contains a complete, consistent record of all committed process instances (RPO = 0). Secondary storage state catches up once Zeebe resumes exporting after the failover procedure completes.

## Failover runbook

This runbook describes the manual procedure to restore service after total primary-region loss. It is based on the [dual-region operational procedure](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md) with Tier 2 RTO context added. For full step-by-step instructions including illustrated diagrams, refer to that page.

### Prerequisites

- A healthy dual-region Camunda deployment before the incident.
- `kubectl` access to both region clusters configured (for example, contexts named `primary-region` and `secondary-region`).
- DNS management access to redirect user traffic.
- Familiarity with the [dual-region concept page](/self-managed/concepts/multi-region/dual-region.md), including limitations and recovery implications.

### Before you trigger failover

:::warning
Confirm the primary region is genuinely unavailable before initiating failover. Triggering a failover procedure during a transient network event can cause data inconsistencies. Zeebe can tolerate temporary region connectivity loss without data loss, provided sufficient disk space exists; processing halts during the outage but resumes automatically on reconnection.
:::

### Failover phase — restore service from secondary region

**Target RTO: ~15 minutes**

**Phase 1 — Confirm region loss and quorum state (0–3 minutes)**

1. Confirm primary-region services are unreachable from external health checks.
2. Confirm the secondary region's Zeebe cluster has lost quorum (processing halted due to broker loss in the primary region).

```bash
# Check Zeebe health on the surviving secondary region
kubectl --context secondary-region -n camunda \
  port-forward svc/camunda-zeebe-gateway 9600:9600 &

curl -s http://localhost:9600/actuator/health | jq '.status'
# Expected during quorum loss: "DOWN" or timeout
```

**Phase 2 — Restore Zeebe quorum in the surviving region (< 5 minutes)**

Remove the lost-region brokers from the Raft group and restore quorum with the surviving brokers. Follow the [failover phase procedure](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md#failover-phase) for the exact broker removal API commands.

```bash
# Example: remove lost brokers via the Zeebe Gateway topology API
# {TODO: Engineering — add exact broker removal command with example broker IDs for a clusterSize=4 setup}
```

Wait for Zeebe to confirm quorum is restored:

```bash
curl -s http://localhost:9600/actuator/health | jq '.status'
# Expected: "UP"
```

**Phase 3 — Redirect user traffic to secondary region (< 5 minutes)**

Update DNS or load balancer configuration to route all user traffic to the secondary region.

```bash
# AWS Route 53 example — update alias record to secondary region ALB
aws route53 change-resource-record-sets \
  --hosted-zone-id <ZONE_ID> \
  --change-batch file://failover-dns-changeset.json

# Verify DNS propagation (allow for TTL)
dig <your-camunda-hostname> @8.8.8.8
```

**Phase 4 — Verify service restoration (1–2 minutes)**

```bash
# Zeebe health
curl -s http://localhost:9600/actuator/health | jq '.status'
# Expected: "UP"

# Navigate to the Operate UI at the secondary region URL
# Confirm active process instances are visible
```

**Phase 5 — Address region-specific data loss (if applicable)**

If your deployment uses Camunda v1 APIs:

1. Identify uncompleted batch operations that originated in the primary region.
2. Recreate them in Operate in the secondary region.
3. Reassign any task assignments that were region-specific in Tasklist.

:::tip Eliminate this step
Migrate to the v2 REST API and Tasklist v2 mode to eliminate region-specific data loss entirely. See [active-active mode](/self-managed/concepts/multi-region/dual-region.md#active-active).
:::

### Failback phase — restore dual-region setup

After failover, your deployment runs in a degraded single-region configuration. Follow the [failback phase procedure](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md#failback-phase) to restore a full dual-region setup with a new or repaired primary region.

Expected time: **5 minutes + Elasticsearch restore time** (dependent on data volume and backup type — see [dual-region disaster recovery](/self-managed/concepts/multi-region/dual-region.md#disaster-recovery)).

### RTO summary

| Phase | Expected duration |
|-------|------------------|
| Detection and quorum-loss confirmation | 0–3 minutes |
| Zeebe quorum restoration | < 5 minutes |
| DNS traffic redirect | < 5 minutes (plus TTL propagation) |
| Health verification | 1–2 minutes |
| **Total — failover to functional state** | **~15 minutes** |

:::info
RTO estimates are based on Camunda internal operational tests. Actual times vary depending on your environment, network conditions, operator familiarity, and DNS TTL configuration.
:::

## Elasticsearch vs. RDBMS secondary storage in Tier 2

Tier 2 supports both Elasticsearch and RDBMS as secondary storage backends. Choose the backend that matches your existing infrastructure and operational practices.

| | Elasticsearch | RDBMS (PostgreSQL / Oracle) |
|--|--------------|---------------------------|
| **Maturity in Tier 2** | Production-proven; the original dual-region backend | Supported as of Camunda 8.8 |
| **Optimize support** | Yes | No — use the Elasticsearch path if Optimize is required |
| **Backup coordination** | Zeebe and Elasticsearch must use the same backup ID; coordinated snapshot required | Decoupled — Camunda aligns Zeebe and RDBMS state automatically at restore time |
| **Continuous / scheduled backups** | Not supported | Supported — point-in-time restore available (AWS RDS automated backups, pg_basebackup) |
| **Cross-region replication in Tier 2** | Not required — each region is populated independently by the Zeebe Exporter | {TODO: Engineering — confirm cross-region RDBMS replication behavior in Tier 2 and whether a standby RDBMS instance is required in the secondary region} |
| **Infrastructure** | Separate Elasticsearch clusters in both regions | Managed database service (Amazon RDS, Amazon Aurora) |
| **Upgrade path to Tier 3** | Must migrate to RDBMS secondary storage before upgrading to Tier 3 | Direct upgrade path available |
| **Typical fit** | Organizations already running Elasticsearch on-prem or in AWS | Organizations standardizing on relational databases; BFSI with existing RDS / Aurora investments |

:::note OpenSearch
OpenSearch is **not supported** in dual-region configurations. If you use OpenSearch for single-region deployments, you must use the Elasticsearch path or migrate to an RDBMS backend before configuring Tier 2.
:::

:::note Elasticsearch-to-RDBMS migration within Tier 2
If you want to switch secondary storage from Elasticsearch to RDBMS while remaining on Tier 2 (without upgrading to Tier 3), a migration path exists. {TODO: Engineering — add or link Elasticsearch-to-RDBMS migration guide.}
:::

## Upgrade path to Tier 3

Tier 3 — Active-Active — adds engine-level RDBMS failover detection and automatic reconciliation after region loss, delivering near-zero RTO and RPO for mission-critical workloads. Tier 3 is targeted for General Availability in Camunda 8.10 (October 2026).

Upgrading from Tier 2 requires the following infrastructure and configuration changes:

1. **Switch to RDBMS secondary storage (if not already using it)** — Tier 3 requires a relational database as secondary storage. If you currently use Elasticsearch, migrate to RDBMS first. {TODO: Engineering — add link to Elasticsearch-to-RDBMS migration guide.}

2. **Provision a globally distributed RDBMS** — Configure Amazon Aurora Global Database (PostgreSQL) or Oracle with cross-region replication as the Tier 3 secondary storage target. {TODO: Engineering — add Aurora Global DB provisioning guide and Oracle cross-region replication reference.}

3. **Enable engine-level RDBMS failover detection** — Configure Zeebe to detect RDBMS failover events and trigger automatic reconciliation across the surviving region. {TODO: Engineering — add configuration reference once Tier 3 engine capabilities reach GA in 8.10.}

4. **Validate using the Cluster Restore API** — Run a DR drill using the Cluster Restore API to confirm near-zero RTO behavior before certifying the Tier 3 posture. {TODO: Engineering — add Cluster Restore API documentation link.}

:::info Tier 3 availability
Tier 3 engine capabilities (RDBMS failover detection, automatic reconciliation, ECS broker identity management, and the Cluster Restore API) are tracked in a companion engineering epic and targeted for General Availability in Camunda 8.10 (October 2026). Tier 3 documentation will be published as Early Access ahead of GA.
:::

## Related documentation

- [Multi-region resilience tiers overview](./resilience-tiers.md)
- [Tier 1 — Cold Recovery](./tier-1-cold-recovery.md)
- [Dual-region concept](/self-managed/concepts/multi-region/dual-region.md)
- [Dual-region operational procedure](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md)
- [Amazon EKS dual-region setup](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md)
- [Camunda backup and restore overview](/self-managed/operational-guides/backup-restore/backup-and-restore.md)
