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

For SaaS: `https://${REGION}.zeebe.camunda.io:443/${CLUSTER_ID}/v1/`, and for Self-Managed installations: `http://localhost:8080/v1/`.

:::note
Find your region and cluster id under **Connection information** in your client credentials (revealed when you click on your client under the **API** tab within your cluster).

For Self-Managed, the host and port depend on your configuration. The context path mentioned here is the default for the Zeebe component.
:::

## API Explorer

See [the interactive Zeebe REST API Explorer][zeebe-api-explorer] for specifications, example requests and responses, and code samples of interacting with the Tasklist REST API.

[zeebe-api-explorer]: ./specifications/zeebe-rest-api.info.mdx
