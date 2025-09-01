---
id: migrate-from-grpc-to-orchestration-cluster-api
title: Migrate from gRPC to the Orchestration Cluster API
sidebar_label: "gRPC to Orchestration Cluster API"
description: "Migrate from gRPC to the Orchestration Cluster REST API to interact with Camunda 8 clusters, activate jobs, and run user task state operations."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Migrate from gRPC to the Orchestration Cluster REST API.

## About this guide

This guide provides an overview of the process for migrating to the Orchestration Cluster REST API.

The [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) is the official REST API for connecting to Orchestration Cluster, automating processes, and implementing job workers.

## Camunda Java Client

In version 8.8.0, the [Camunda Java Client](/apis-tools/java-client/getting-started.md) changes to use the Orchestration Cluster API as a default cluster communication method.

:::info
Refer to the [Camunda Java Client migration guide](migrate-to-camunda-java-client.md#protocol-and-connection-rest-vs-grpc-selection) for details on how you can continue using gRPC.
:::

## gRPC vs REST mapping reference

The following table provides a mapping reference between gRPC methods and their equivalent REST API endpoints in the Orchestration Cluster API.

:::info
For detailed information on each REST endpoint, see [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).
:::

| gRPC Method Name (Gateway.proto)  | Orchestration Cluster REST API Endpoint                        | Notes                                                                    |
| --------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `ActivateJobs`                    | `POST /v2/jobs/activation`                                     | Batch job activation via long polling (streaming not available in REST). |
| `BroadcastSignal`                 | `POST /v2/signals/broadcast`                                   | Triggers signal events.                                                  |
| `CancelProcessInstance`           | `POST /v2/process-instances/{processInstanceKey}/cancellation` | Cancels a process instance.                                              |
| `CompleteJob`                     | `POST /v2/jobs/{jobKey}/completion`                            | Completes a job.                                                         |
| `CreateProcessInstance`           | `POST /v2/process-instances`                                   | Starts a new process instance.                                           |
| `CreateProcessInstanceWithResult` | `POST /v2/process-instances?awaitCompletion=true`              | Starts a process instance, waits for completion.                         |
| `DeleteResource`                  | `POST /v2/resources/{resourceKey}/deletion`                    | Deletes a resource.                                                      |
| `DeployResource`                  | `POST /v2/deployments`                                         | Deploys BPMN, DMN, or form resources (multipart upload).                 |
| `EvaluateDecision`                | `POST /v2/decisions/evaluation`                                | Evaluates a DMN decision by key or id.                                   |
| `FailJob`                         | `POST /v2/jobs/{jobKey}/failure`                               | Marks a job as failed.                                                   |
| `MigrateProcessInstance`          | `POST /v2/process-instances/{processInstanceKey}/migration`    | Migrates a process instance (phase 1 only).                              |
| `ModifyProcessInstance`           | `POST /v2/process-instances/{processInstanceKey}/modification` | Modifies a running process instance.                                     |
| `PublishMessage`                  | `POST /v2/messages/publication`                                | Publishes a message asynchronously.                                      |
| `ResolveIncident`                 | `POST /v2/incidents/{incidentKey}/resolution`                  | Resolves an incident.                                                    |
| `SetVariables`                    | `PUT /v2/element-instances/{elementInstanceKey}/variables`     | Sets variables (local/global by param).                                  |
| `ThrowError`                      | `POST /v2/jobs/{jobKey}/error`                                 | Throws BPMN error from worker to engine.                                 |
| `Topology`                        | `GET /v2/topology`                                             | Returns cluster info.                                                    |
| `UpdateJobRetries`                | `PATCH /v2/jobs/{jobKey}`                                      | Updates job retries, PATCH can update multiple job properties.           |
| `UpdateJobTimeout`                | `PATCH /v2/jobs/{jobKey}`                                      | Updates job timeout, PATCH can update multiple job properties.           |
