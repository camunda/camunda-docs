---
id: orchestration-cluster-api-rest-swagger
title: "Try with Swagger"
description: "Review and try the REST API endpoints with Swagger UI."
---

The Orchestration Cluster REST API is documented using the [OpenAPI specification](https://github.com/camunda/camunda/blob/main/zeebe/gateway-protocol/src/main/proto/rest-api.yaml).  
You can review and try the REST API endpoints directly with [Swagger UI](https://swagger.io/tools/swagger-ui/).

## Authentication

The REST API supports multiple authentication methods:

- If you're [logged in to Camunda](./orchestration-cluster-api-rest-authentication.md) (for example, through Operate), Swagger UI automatically authenticates you with a session cookie.
- You can also authenticate manually in Swagger UI using the **Authorize** button:
  - **Bearer token**: Provide a JWT token.
  - **Basic authentication**: Provide username and password credentials (for Self-Managed deployments).

## Accessing Swagger UI

### SaaS

Swagger UI can be accessed from a running orchestration cluster.

1. In the Camunda Console, go to your cluster.
2. In **Cluster Details**, find your **Region ID** and **Cluster ID**.
3. Use the following URL pattern as your `${BASE_URL}`:  
   `https://${REGION_ID}.zeebe.camunda.io/${CLUSTER_ID}/`
4. Append the suffix: `/swagger-ui/index.html`

**Example:**  
`https://${REGION_ID}.zeebe.camunda.io/${CLUSTER_ID}/swagger-ui/index.html`

### Self-Managed

Use the host and path defined in your Zeebe Gateway [configuration](../../self-managed/installation-methods/helm/configure/ingress-setup.md).

- Default `${BASE_URL}`: `http://localhost:8080/`
- Append the suffix: `/swagger-ui/index.html`

**Example:**  
`http://localhost:8080/swagger-ui/index.html`

## Enabling or disabling Swagger UI

By default, Swagger UI is enabled for both SaaS and Self-Managed deployments.

### SaaS

You can enable or disable Swagger through the Camunda Console:

1. Navigate to your cluster in the Camunda Console.
2. Go to **Cluster Settings**.
3. Toggle **Enable Swagger** on or off.
4. Changes are applied automatically to your orchestration cluster.

### Self-Managed

In Self-Managed deployments, Swagger UI is controlled with the environment variable:

- `camunda.rest.swagger.enabled` or
- `CAMUNDA_REST_SWAGGER_ENABLED`
