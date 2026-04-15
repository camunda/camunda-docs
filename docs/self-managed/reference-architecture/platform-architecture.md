---
id: platform-architecture
title: "Platform architecture"
sidebar_label: "Platform architecture"
description: "A component-level view of Camunda 8.8+ showing how the Orchestration Cluster, Management Cluster, clients, connectors, identity providers, and storage systems connect at runtime."
---

This page describes the runtime architecture of Camunda 8.8+: what the major components are, how they communicate, and which external systems they depend on.

![Camunda 8.8+ platform architecture](./img/architecture-8.8-plus.jpg)

## Two-cluster model

Camunda 8 separates concerns into two independently deployable clusters:

| Cluster | Purpose |
|---|---|
| [Orchestration Cluster](#orchestration-cluster) | Process execution, task management, monitoring, and authorization. |
| [Management Cluster](#management-cluster) | Process design (Web Modeler) and multi-cluster administration (Console). |

The clusters communicate via the Camunda API and share an [identity provider](#identity-provider) for authentication, but they are deployed and scaled independently.

---

## Orchestration Cluster

The Orchestration Cluster is the runtime core of Camunda 8. Since 8.8 it ships as a single deployable artifact containing:

- **Zeebe** — distributed workflow and decision engine.
- **Operate** — process monitoring and incident management UI.
- **Tasklist** — user task assignment and completion UI.
- **Identity** — embedded authorization service for all cluster APIs and UIs.

### Frontends

Operate, Tasklist, and the Identity management UI are served from within the Orchestration Cluster. They read data from [secondary storage](#secondary-storage) (eventually consistent) and send write commands through the Camunda API.

### Camunda API

The Camunda API is the single external entry point into the Orchestration Cluster. It provides:

- **REST API** (`/v2`) — queries, searches, and state-changing commands over HTTP/JSON.
- **gRPC API** — high-throughput job activation and bidirectional streaming for job workers.

Both transports are protected by an **authentication layer** that supports OIDC tokens (from the configured [identity provider](#identity-provider)) and BASIC credentials.

### Primary storage — partitions

State inside the Orchestration Cluster is managed in one or more **partitions**. Each partition contains:

- **RAFT** — consensus protocol that replicates the event log across partition replicas and persists snapshots to local disk. Ensures durability and fault tolerance without an external database.
- **Processing Engine** — single-threaded, event-sourced state machine that executes BPMN processes and DMN decisions. Contains the DMN engine, FEEL expression engine, and authorization enforcement logic.
- **Exporter** — reads the event log and writes indexed records to [secondary storage](#secondary-storage). The Camunda Exporter (Elasticsearch/OpenSearch path) and RDBMS Exporter (SQL path) both run here.

### Management API

The Management API exposes cluster-level operational endpoints:

- **Rebalance** — redistribute partition leadership across brokers.
- **Backup** — initiate and manage backups written to [object storage](#object-storage).
- **Scaling** — add or remove brokers and rebalance partitions dynamically.

---

## Management Cluster

The Management Cluster provides tooling for process designers and platform administrators. It is intentionally separate from the Orchestration Cluster to allow independent scaling and multi-cluster management:

- **Console** — monitors and manages Orchestration Cluster deployments.
- **Web Modeler** — browser-based BPMN/DMN editor. Deploys process models directly to any connected Orchestration Cluster.
- **Identity backend** — standalone identity service for Management Cluster components. Distinct from the embedded Identity inside the Orchestration Cluster.

The Management Cluster persists its own data in **PostgreSQL** (Web Modeler state, identity records).

:::note Identity separation
The Management Cluster uses its own Identity deployment (previously called Management Identity). This is separate from and incompatible with the embedded Identity in the Orchestration Cluster. Optimize and Web Modeler connect to the Management Cluster Identity; Operate and Tasklist connect to the Orchestration Cluster Identity.
:::

---

## Clients

Client libraries embed in application code to interact with the Orchestration Cluster via the Camunda API:

| Client | Language | Job worker support |
|---|---|---|
| [Java SDK](/apis-tools/java-client/index.md) | Java | Yes (job push and pull) |
| Node.js SDK | JavaScript / TypeScript | Yes (job push and pull) |
| Go client | Go | Yes (job push and pull) |
| Community clients | Python, .NET, Rust, others | Varies |

**Job workers** are the primary pattern for executing business logic: the worker polls or receives pushed jobs, runs application logic, then completes or fails the job. Workers and the Orchestration Cluster scale independently.

For the full API reference, see [APIs and tools](/apis-tools/working-with-apis-tools.md).

---

## Connectors

Connectors are pre-built integration components that run alongside the Orchestration Cluster and connect processes to external systems without custom code:

- **Outbound Connectors** — trigger actions in external systems (HTTP, Kafka, AWS services, Slack, and hundreds more via Camunda Marketplace).
- **Inbound Connectors** — receive events from external systems and correlate them into running processes.

Connectors interact with the Orchestration Cluster through the Camunda API, the same path as any other client.

See [Introduction to Connectors](/components/connectors/introduction.md).

---

## Identity provider

Both clusters delegate authentication to an external **OIDC/OAuth2 identity provider**:

- **Keycloak** — the default bundled provider for self-managed deployments.
- **Auth0** and other OIDC-compatible providers — supported for both clusters.

The embedded Identity component in the Orchestration Cluster acts as the **authorization enforcement layer** (defining what authenticated users may do), while the external provider handles **token issuance and validation**.

---

## Secondary storage

Exporters write all indexed data from the Orchestration Cluster to a secondary storage backend. Operate, Tasklist, and the REST Query API read exclusively from this store (eventually consistent):

| Backend | Notes |
|---|---|
| **Elasticsearch** | Default for most deployments. Supports ILM for automated data lifecycle management. |
| **OpenSearch** | Alternative to Elasticsearch. Supports ISM policies. |
| **RDBMS** (PostgreSQL, MySQL, MariaDB, …) | SQL-based deployments, enabled via the RDBMS Exporter. |

Only one backend is active per Orchestration Cluster. Optimize can share the same Elasticsearch or OpenSearch instance.

---

## Object storage

Cluster backups are written to object storage, decoupled from the cluster itself:

- **Amazon S3** (and S3-compatible stores such as MinIO).
- **Azure Blob Storage**.

Backups are initiated via the [Management API](#management-api) and stored independently of primary and secondary storage.

---

## Optimize

Optimize is an analytics component deployed separately from the Orchestration Cluster. It reads historical execution data from the shared secondary storage (Elasticsearch or OpenSearch) to produce reports, dashboards, and KPI alerts.

Optimize connects to the **Management Cluster Identity** for authentication and has its own frontend, backend, and importer process.

See [Optimize](/components/optimize/what-is-optimize.md).
