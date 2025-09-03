---
id: orchestration-cluster-api-rest-swagger
title: "Try with Swagger"
description: "Explore and test the Orchestration Cluster REST API endpoints interactively with Swagger UI."
---

The Orchestration Cluster REST API is documented using the [OpenAPI specification](https://github.com/camunda/camunda/blob/main/zeebe/gateway-protocol/src/main/proto/rest-api.yaml). You can explore, test, and interact with all API endpoints directly using [Swagger UI](https://swagger.io/tools/swagger-ui/) - an interactive documentation interface.

**Use Swagger UI to:**

- Explore available endpoints - Browse all REST API operations with detailed parameter descriptions
- Test API calls interactively - Execute real API requests directly from your browser
- Understand request/response formats - See example payloads and response schemas
- Authenticate and authorise - Test with your actual credentials in a secure environment

Swagger UI is particularly useful for API discovery, development, and testing workflows before integrating the API into your applications.

## Prerequisites

Before using Swagger UI, ensure you have:

- **A running Camunda 8 Orchestration Cluster:** SaaS or Self-Managed
- **Appropriate [access permissions](../../components/concepts/access-control/authorizations.md)** (if authentication is enabled)

## Accessing Swagger UI

### SaaS

For SaaS clusters, Swagger UI is accessible through your cluster's dedicated endpoint.

1. In the Camunda Console, go to your cluster
2. In **Cluster Details**, find your **Region ID** and **Cluster ID**
3. Use this URL format: `https://${REGION_ID}.zeebe.camunda.io/${CLUSTER_ID}/swagger-ui/index.html`

**Example:**  
If your Region ID is `bru-2` and Cluster ID is `abc123-def456-ghi789`, your Swagger UI URL would be:
`https://bru-2.zeebe.camunda.io/abc123-def456-ghi789/swagger-ui/index.html`

### Self-Managed

For Self-Managed deployments, Swagger UI is available at your configured Zeebe Gateway endpoint.

**Default setup:**
`http://localhost:8080/swagger-ui/index.html`

**Custom configuration:**
Use the host and path defined in your Zeebe Gateway [configuration](/self-managed/installation-methods/helm/configure/ingress-setup.md), then append `/swagger-ui/index.html`.

**Example with custom domain:**
`https://your-zeebe-gateway.company.com/swagger-ui/index.html`

## Authentication in Swagger UI

Swagger UI supports the same authentication methods as the REST API. Choose the method that matches your deployment:

### Automatic authentication

- **Session-based authentication**: If you're already logged into Camunda (for example, through Operate), Swagger UI automatically authenticates you using your session cookie

### Manual authentication

Click the **Authorize** button in Swagger UI to manually configure authentication:

#### Bearer Token (Recommended for production)

1. Click **Authorize** in Swagger UI
2. In the **Bearer** section, enter your JWT access token
3. Click **Authorize** to apply

**To obtain a Bearer token:**

- **SaaS**: Follow the [OIDC Access Token Authentication guide](./orchestration-cluster-api-rest-authentication.md#oidc-access-token-authentication-using-client-credentials) for SaaS
- **Self-Managed**: Follow the [OIDC Access Token Authentication guide](./orchestration-cluster-api-rest-authentication.md#oidc-access-token-authentication-using-client-credentials) for Self-Managed

#### Basic Authentication

1. Click **Authorize** in Swagger UI
2. In the **Basic** section, enter your username and password
3. Click **Authorize** to apply

**Note:** Basic Authentication is only available for Self-Managed deployments and is not recommended for production.

For detailed authentication setup instructions, see the [Authentication guide](./orchestration-cluster-api-rest-authentication.md).

## Using Swagger UI effectively

### Making your first API call

1. **Test connectivity**: Try the `GET /topology` endpoint to verify your connection and authentication
2. **Explore endpoints**: Browse the available operations organized by category (processes, user tasks, variables, etc.)
3. **Try sample requests**: Click "Try it out" on any endpoint to see the request form
4. **Execute requests**: Fill in parameters and click "Execute" to see real responses

### Understanding the interface

- **Endpoints are grouped by resource type** - Find process-related operations under "Process Instances", task operations under "User Tasks", etc.
- **Required parameters are marked** - Look for the red asterisk (\*) next to required fields
- **Example values are provided** - Use the "Example Value" links to populate request bodies quickly
- **Response schemas are documented** - Expand the response sections to understand the data structure

### Testing workflows

Use Swagger UI to test complete workflows:

1. **Deploy a process** - Use `POST /deployments` to upload a BPMN file
2. **Start a process instance** - Use `POST /process-instances` with your process definition
3. **Query and manage** - Use search endpoints to find and interact with your data
4. **Complete tasks** - Use `POST /user-tasks/{userTaskKey}/completion` to progress workflows

## Managing Swagger UI availability

### SaaS

Control Swagger UI access through the Camunda Console:

1. Navigate to your cluster in the Camunda Console
2. Go to **Cluster Settings**
3. Toggle **Enable Swagger** on or off
4. Changes apply automatically to your orchestration cluster

### Self-Managed

Configure Swagger UI availability using environment variables:

**Enable Swagger UI (default):**

```bash
CAMUNDA_REST_SWAGGER_ENABLED=true
```

**Disable Swagger UI:**

```bash
CAMUNDA_REST_SWAGGER_ENABLED=false
```

**Alternative property format:**

```yaml
camunda:
  rest:
    swagger:
      enabled: true
```

**Security consideration:** In production environments, consider disabling Swagger UI and using it only in development environments.

## Next steps

After exploring the API with Swagger UI:

- **Build production integrations** using the [Java client](/apis-tools/java-client/getting-started.md) or [Spring SDK](/apis-tools/spring-zeebe-sdk/getting-started.md)
- **Review the complete API reference** in the [Overview](./orchestration-cluster-api-rest-overview.md)
- **Set up proper authentication** following the [Authentication guide](./orchestration-cluster-api-rest-authentication.md)
- **Learn advanced querying** with [Data Fetching and Search](./orchestration-cluster-api-rest-data-fetching.md)
- **Download the OpenAPI specification** for [custom client generation](https://github.com/camunda/camunda/blob/main/zeebe/gateway-protocol/src/main/proto/rest-api.yaml)

**Need help?** Try the [Getting Started Tutorial](/guides/getting-started-example.md) for a complete workflow walkthrough, or browse the [Postman collection](https://www.postman.com/camundateam/camunda-8-postman/collection/apl78x9/camunda-8-api-rest) for additional examples.
