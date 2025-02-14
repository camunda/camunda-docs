---
id: zeebe-api-rest-overview
title: "Overview"
description: "Interact with Zeebe clusters. Run user task state operations for Zeebe user tasks."
---

## Introduction

The Zeebe REST API is a REST API designed to interact with the Zeebe process automation engine.

:::note
Ensure you [authenticate](./zeebe-api-rest-authentication.md) before accessing the Zeebe REST API.
:::

## Context paths

### SaaS

Find your **region Id** and **cluster Id** under **Connection information** in your client credentials (revealed when you click on your client under the **API** tab within your cluster).

Example path: `https://${REGION}.zeebe.camunda.io:443/${CLUSTER_ID}/v1/`

### Self-Managed

The context path should match the host and path defined in your Zeebe Gateway [configuration](/self-managed/setup/guides/ingress-setup.md). The path used here is the default.

Example path: `http://localhost:8080/v1/`

## API Explorer

See [the interactive Zeebe REST API Explorer][zeebe-api-explorer] for specifications, example requests and responses, and code samples of interacting with the Tasklist REST API.

[zeebe-api-explorer]: ./specifications/zeebe-rest-api.info.mdx
