---
id: unified-api-rest-overview
title: "Overview"
description: "Interact with Camunda 8 clusters. Activate jobs and run user task state operations for Zeebe user tasks."
---

## Introduction

The Unified REST API is a REST API designed to interact with a Camunda 8 cluster.

:::note
Ensure you [authenticate](./unified-api-rest-authentication.md) before accessing the Unified REST API.
:::

## Context paths

For SaaS: `https://${REGION}.zeebe.camunda.io:443/${CLUSTER_ID}/v2/`, and for Self-Managed installations: `http://localhost:8080/v2/`.

:::note
Find your region and cluster id under **Connection information** in your client credentials (revealed when you click on your client under the **API** tab within your cluster).

For Self-Managed, the host and port depend on your configuration. The context path mentioned here is the default for the Zeebe component.
:::

## API Explorer

See [the interactive Unified REST API Explorer][unified-api-explorer] for specifications, example requests and responses, and code samples of interacting with the Unified REST API.

[unified-api-explorer]: ./specifications/unified-rest-api.info.mdx
