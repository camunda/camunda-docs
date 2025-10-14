---
id: tasklist-api-rest-overview
title: "Overview"
sidebar_position: 1
description: "Build applications for human-centered processes by querying human tasks, assigning users, and completing tasks with the Tasklist API."
---

:::note
Camunda introduced [Zeebe user tasks](/apis-tools/tasklist-api-rest/migrate-to-zeebe-user-tasks.md) with `8.5` to build more advanced functionalities. If you use Zeebe user tasks with `8.5`, task management endpoints in the Tasklist API will not work.

To manage Zeebe user tasks Camunda has introduced the [Zeebe REST API](/apis-tools/zeebe-api-rest/zeebe-api-rest-overview.md), though you can still query Zeebe user tasks with the Tasklist API.
:::

## Introduction

The Tasklist API is a REST API designed to build task applications for human-centered processes. The API allows you to query user tasks, assign users to these tasks, and complete these tasks.

:::note
Ensure you [authenticate](./tasklist-api-rest-authentication.md) before accessing the Tasklist API.
:::

## Context paths

For SaaS: `https://${REGION}.tasklist.camunda.io:443/${CLUSTER_ID}/v1/`, and for Self-Managed installations: `http://localhost:8080/v1/`.

:::note
Find your region and cluster id under **Connection information** in your client credentials (revealed when you click on your client under the **API** tab within your cluster).

For Self-Managed, the host and port depend on your configuration. The context path mentioned here is the default for the Tasklist component.
:::

### Swagger UI

A detailed API description is also available as a Swagger UI at `https://${base-url}/swagger-ui/index.html`.

For SaaS: `https://${REGION}.tasklist.camunda.io:443/${CLUSTER_ID}/swagger-ui/index.html`, and for Self-Managed installations: [`http://localhost:8080/swagger-ui/index.html`](http://localhost:8080/swagger-ui/index.html).

:::note
Find your region and cluster id under **Connection information** in your client credentials (revealed when you click on your client under the **API** tab within your cluster).
:::

## API in Postman

Work with this API in our [Postman collection](https://www.postman.com/camundateam/workspace/camunda-8-postman/collection/26079299-f0db0193-0557-4acd-8e94-ecdaeffbaa5d?action=share&creator=11465105), and check it out in [GitHub](https://github.com/camunda-community-hub/camunda-8-api-postman-collection).
