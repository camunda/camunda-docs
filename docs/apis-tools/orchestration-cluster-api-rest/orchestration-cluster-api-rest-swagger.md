---
id: orchestration-cluster-api-rest-swagger
title: "Try with Swagger"
description: "Review and try the REST API endpoints with Swagger UI."
---

# Try Orchestration Cluster REST API with Swagger

Orchestration Cluster REST API is documented using the [OpenAPI specifications](https://github.com/camunda/camunda/blob/main/zeebe/gateway-protocol/src/main/proto/rest-api.yaml). You can access it and try the REST API endpoints using [Swagger UI](https://swagger.io/tools/swagger-ui/).

## Authentication

The REST API supports multiple authentication methods. If you're [logged in to Camunda](./orchestration-cluster-api-rest-authentication.md) (e.g., through Operate), you'll be automatically authenticated in Swagger UI using the session cookie.
Alternatively, you can authenticate using the **Authorize** button in Swagger UI with:

- Bearer Token: Provide a JWT bearer token
- Basic Authentication: Use username/password credentials (Self-Managed deployments)

## Accessing Swagger

### SaaS

Swagger UI can be accessed from a running orchestration cluster.

In the Camunda Console, go to your cluster, and in the Cluster Details, find your **Region Id** and **Cluster Id**. Use this pattern as your `${BASE_URL}`: `https://${REGION_ID}.zeebe.camunda.io/${CLUSTER_ID}/`

Append the following suffix to the URL: `/swagger-ui/index.html`

Example path: `https://${REGION_ID}.zeebe.camunda.io/${CLUSTER_ID}/swagger-ui/index.html`

### Self-Managed

Use the host and path defined in your Zeebe Gateway [configuration](../../self-managed/installation-methods/helm/configure/ingress-setup.md). If you're using the default setup, the `${BASE_URL}` is: `http://localhost:8080/`

To access Swagger UI, append the following suffix to the URL: `/swagger-ui/index.html`

Example path: `http://localhost:8080/swagger-ui/index.html`

## Enabling/Disabling Swagger

By default, Swagger UI is enabled for both SaaS and Self-Managed deployments.

### SaaS

For SaaS deployments, Swagger can be controlled through the Camunda Console:

1. Navigate to your cluster in the Camunda Console
2. Go to **Cluster Settings**
3. Toggle the **Enable Swagger** switch to enable or disable Swagger UI
4. The change will be applied to the orchestration cluster automatically

### Self-Managed

Swagger UI can be enabled or disabled using the `camunda.rest.swagger.enabled`/`CAMUNDA_REST_SWAGGER_ENABLED` environment variable on the orchestration cluster.
