---
id: camunda-api-rest-overview
title: "Overview"
description: "Interact with Camunda 8 clusters. Activate jobs and run user task state operations for Zeebe user tasks."
---

The Camunda 8 REST API is a REST API designed to interact with a Camunda 8 cluster.

:::note
Ensure you [authenticate](./camunda-api-rest-authentication.md) before accessing the Camunda 8 REST API.
:::

## Context paths

### SaaS

Find your **region Id** and **cluster Id** under **Connection information** in your client credentials (revealed when you click on your client under the **API** tab within your cluster).

Example path: `https://${REGION_ID}.zeebe.camunda.io:443/${CLUSTER_ID}/v2/`

### Self-Managed

The context path should match the host and path defined in your Zeebe Gateway [configuration](/self-managed/setup/guides/ingress-setup.md). The path used here is the default.

Example path: `http://localhost:8080/v2/`

## API Explorer

See [the interactive Camunda 8 REST API Explorer][camunda-api-explorer] for specifications, example requests and responses, and code samples of interacting with the Camunda 8 REST API.

### Deployment API

You can change the `maxMessageSize` default value of 4MB in the [Gateway](../../self-managed/zeebe-deployment/configuration/gateway.md#zeebegatewaynetwork) and [Broker](../../self-managed/zeebe-deployment/configuration/broker.md#zeebebrokernetwork) configuration.

If you do change this value, it is recommended that you also configure the [Deploy resources](./specifications/deploy-resources.api.mdx) REST endpoint appropriately. By default, this endpoint allows single file upload and overall data up to 4MB.

You can adjust this configuration via the following properties:

```properties
spring.servlet.multipart.max-file-size=4MB
spring.servlet.multipart.max-request-size=4MB
```

For example, if you increase the `maxMessageSize` to 10MB, increase these property values to 10MB as well.

### Query API

:::warning
Query API endpoints do not currently support [resource authorizations][], and can be used to expand user access to restricted resources. If you use resource permissions, allowing public access to those endpoints is not recommended.
:::

All Query API endpoints contain an `(alpha)` declaration. Those endpoints are not accessible by default in Camunda 8 clusters.

You can enable the [alpha feature][] search endpoints by setting either the configuration property `camunda.rest.query.enabled` to `true`,
or the environment variable `CAMUNDA_REST_QUERY_ENABLED` to `true`.

[camunda-api-explorer]: ./specifications/camunda-8-rest-api.info.mdx
[resource authorizations]: /self-managed/concepts/access-control/resource-authorizations.md
[alpha feature]: /reference/alpha-features.md
