---
id: multi-region-concept
title: "Resilience and multi-region topologies"
sidebar_label: "Resilience concepts"
description: "Choose a Camunda deployment topology by the failure domain you need to survive, then understand how traffic, state, and recovery behave."
---

Choose a Camunda deployment topology by the failure domain you need to survive, not by a topology label. This page introduces a small conceptual model for resilience, then maps Camunda's reference implementations onto it.

Topology labels such as "active-active" and "active-passive" collapse several independent concerns into one word. Camunda's dual-region setup, for example, replicates state active-active at the data layer in every supported configuration, while the user-facing traffic model depends on which API generation you use. To reason about resilience clearly, separate the concern into four dimensions:

- **Resilience scope** — the failure domain the deployment must survive.
- **Traffic serving model** — how many locations serve user traffic during normal operation.
- **State coordination model** — how correctness is maintained across locations.
- **Recovery model** — what must happen after a failure.

## Start with failure domains

Choose the smallest failure domain you need to tolerate. Each level builds on the one before it: dual-region is not a substitute for good single-region high availability — it extends it.

| Level                   | Scope                   | Main benefit                        | Main limitation                                       |
| ----------------------- | ----------------------- | ----------------------------------- | ----------------------------------------------------- |
| Single AZ               | Basic deployment        | Lowest complexity                   | A single infrastructure failure can interrupt service |
| Multi-AZ, single region | Production HA baseline  | Survives zone failure in one region | Still depends on one region                           |
| Dual-region             | Cross-region resilience | Reduces single-region dependency    | Higher complexity and explicit failover operations    |

- A **single-AZ** deployment protects only against process-level or node-level failure. Do not treat it as a production baseline. Use it for non-critical or temporary environments.
- A **multi-AZ, single-region** deployment is the standard production baseline. It spreads Camunda across availability zones inside one region so zone loss does not take down the orchestration cluster. Camunda's [reference architecture](/self-managed/reference-architecture/reference-architecture.md#high-availability-ha) recommends at least three brokers across three availability zones for production high availability.
- A **dual-region** deployment extends resilience across two regions but introduces a different operating model. Treat it as a specialized operational model, not just a bigger single-region cluster.

## The four dimensions

After you know the failure domain, classify a deployment along the remaining three dimensions. These dimensions are independent — a deployment can be active-active for state while still serving traffic from a single location.

### Resilience scope

Resilience scope answers: what failure domain must the deployment survive?

| Scope                   | Survives                            | Typical use                            |
| ----------------------- | ----------------------------------- | -------------------------------------- |
| Single AZ               | Nothing beyond node or process loss | Non-critical or temporary environments |
| Multi-AZ, single region | Availability zone failure           | Standard production baseline           |
| Multi-region            | Full regional outage                | Advanced cross-region resilience       |

### Traffic serving model

The traffic serving model answers: from how many locations are users and clients served during normal operation?

| Model                     | Behavior                                                                 |
| ------------------------- | ------------------------------------------------------------------------ |
| Single-serving-location   | One location serves user traffic during normal operation.                |
| Failover-serving-location | One location serves traffic normally; another takes over after failover. |
| Multi-serving-location    | More than one location can serve traffic simultaneously.                 |

For Camunda dual-region, the serving model depends on the API generation. With v2 APIs and Tasklist V2, both regions can serve traffic (multi-serving-location). With v1 APIs, one region serves traffic and the other remains fully operational but does not normally serve user traffic (failover-serving-location).

### State coordination model

The state coordination model answers: how is correctness maintained across locations?

| Model                            | Behavior                                                                                 |
| -------------------------------- | ---------------------------------------------------------------------------------------- |
| Single-location state            | State is kept within one region.                                                         |
| Replicated state                 | State is replicated across locations, but not every location necessarily serves traffic. |
| Coordinated multi-location state | Multiple locations participate in steady-state data processing and consistency.          |

For Camunda dual-region, both regions actively participate in data processing and replication. The data layer is **active-active with RPO 0** for Operate, Tasklist, and Zeebe in the supported model — regardless of the traffic serving model.

### Recovery model

The recovery model answers: what must happen after a failure?

| Model                            | Behavior                                                                  |
| -------------------------------- | ------------------------------------------------------------------------- |
| Self-healing inside a region     | The platform reschedules workloads automatically; no operator action.     |
| Traffic rerouting only           | Traffic is redirected; no state recovery procedure is required.           |
| Full failover procedure required | An explicit operational procedure must run to restore a functional state. |

This distinction is critical for dual-region. A region loss still causes **quorum loss** in Zeebe and stops processing until the [failover procedure](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md) restores a functional state. Dual-region does not mean "the other region just keeps running."

## Map Camunda reference implementations

### Standard production baseline (multi-AZ, single region)

These guides deliver high availability within one cloud region by spreading Camunda across multiple availability zones. They do not remove dependency on that single region.

| Reference implementation                                                                                          | Resilience scope        | Traffic serving model   | State coordination model | Recovery model                   |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------- | ----------------------- | ------------------------ | -------------------------------- |
| [Amazon EKS single-region](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/amazon-eks.md)         | Multi-AZ, single region | Single-serving-location | Single-location state    | Intra-region HA and rescheduling |
| [ROSA single-region](/self-managed/deployment/helm/cloud-providers/openshift/redhat-openshift.md)                 | Multi-AZ, single region | Single-serving-location | Single-location state    | Intra-region HA and rescheduling |
| [Microsoft AKS single-region](/self-managed/deployment/helm/cloud-providers/azure/microsoft-aks/microsoft-aks.md) | Multi-AZ, single region | Single-serving-location | Single-location state    | Intra-region HA and rescheduling |

### Advanced cross-region resilience (dual-region)

These guides reduce dependency on a single region. They do not mean a region can disappear with no effect: a region loss causes Zeebe quorum loss and interrupts processing until the failover procedure restores a functional state.

| Reference implementation                                                                                 | Resilience scope | Traffic serving model                                                       | State coordination model                                    | Recovery model                                     |
| -------------------------------------------------------------------------------------------------------- | ---------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------- |
| [Amazon EKS dual-region](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md) | Multi-region     | Multi-serving-location with v2 APIs; failover-serving-location with v1 APIs | Coordinated multi-location state, active-active replication | Full failover procedure required after region loss |
| [ROSA dual-region](/self-managed/deployment/helm/cloud-providers/openshift/dual-region.md)               | Multi-region     | Multi-serving-location with v2 APIs; failover-serving-location with v1 APIs | Coordinated multi-location state, active-active replication | Full failover procedure required after region loss |

:::note
Camunda does not currently publish an AKS dual-region reference implementation. A published single-region baseline for a cloud provider does not imply a published dual-region counterpart.
:::

## Choose a reference implementation

1. Decide the failure domain you need to survive using the [resilience ladder](#start-with-failure-domains).
2. For most production environments, start with a multi-AZ, single-region baseline:
   - [Amazon EKS single-region](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/amazon-eks.md)
   - [ROSA single-region](/self-managed/deployment/helm/cloud-providers/openshift/redhat-openshift.md)
   - [Microsoft AKS single-region](/self-managed/deployment/helm/cloud-providers/azure/microsoft-aks/microsoft-aks.md)
3. If you also need resilience to a full regional outage, evaluate dual-region:
   - [Amazon EKS dual-region](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md)
   - [ROSA dual-region](/self-managed/deployment/helm/cloud-providers/openshift/dual-region.md)

## Next steps

- Read the [dual-region concept](/self-managed/concepts/multi-region/dual-region.md) for the detailed architecture, requirements, and limitations.
- Review the [dual-region operational procedure](/self-managed/deployment/helm/operational-tasks/dual-region-ops.md) for failover and failback.
- See the [reference architecture](/self-managed/reference-architecture/reference-architecture.md) for high-availability guidance within a single region.
