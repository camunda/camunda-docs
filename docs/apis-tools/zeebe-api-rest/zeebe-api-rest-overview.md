---
id: zeebe-api-rest-overview
title: "Overview"
description: "Interact with Zeebe clusters. Run user task state operations for Zeebe user tasks."
---

:::warning
The Zeebe REST API is **deprecated**. While it continues to function, new development should use the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md). See the [migration guide](/apis-tools/migration-manuals/migrate-to-camunda-api.md) for details.
:::

## Introduction

The Zeebe REST API is a REST API designed to interact with the Zeebe workflow engine.

:::note
Ensure you [authenticate](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md) before accessing the Zeebe REST API.
:::

## Context paths

### SaaS

Find your **region Id** and **cluster Id** under **Connection information** in your client credentials (revealed when you click on your client under the **API** tab within your cluster).

Example path: `https://${REGION}.api.camunda.io:443/${CLUSTER_ID}/v1/`

### Self-Managed

Use the host and path defined for your [Zeebe Gateway](/reference/glossary.md#zeebe-gateway). For Ingress and routing details, see the [configuration guide](/self-managed/deployment/helm/configure/ingress/ingress-setup.md). The path used here is the default.

Example path: `http://localhost:8080/v1/`

## API Explorer

See [the interactive Zeebe REST API Explorer][zeebe-api-explorer] for specifications, example requests and responses, and code samples of interacting with the Tasklist REST API.

[zeebe-api-explorer]: ./specifications/zeebe-rest-api.info.mdx
