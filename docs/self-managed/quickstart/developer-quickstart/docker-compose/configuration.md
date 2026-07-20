---
title: Configure Docker Compose environments
sidebar_label: Configuration
description: Choose the Docker Compose file that matches your local setup, access components, and review authentication defaults.
---

Use this page to choose the Docker Compose file that matches your local setup, find component URLs, and review authentication defaults.

## Choose a Docker Compose configuration

Camunda provides three Docker Compose configurations in the [Camunda Distributions repository](https://github.com/camunda/camunda-distributions):

| Configuration file                | Description                                                                                                                                                                                                                                                                          |
| :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yaml`             | Default lightweight configuration. Includes the Orchestration Cluster and Connectors, and uses H2 secondary storage by default. Use this for most local development scenarios.                                                                                                       |
| `docker-compose-full.yaml`        | Full configuration. Includes the Orchestration Cluster, Connectors, Optimize, Console, Management Identity, Keycloak, PostgreSQL, and Web Modeler. Requires an external Elasticsearch instance for Optimize. Use this when you need management components or browser-based modeling. |
| `docker-compose-web-modeler.yaml` | Standalone Web Modeler configuration. Runs only Web Modeler and its dependencies. For deployment details, see [deploy with Web Modeler](./connectors-and-modeling.md#deploy-with-web-modeler).                                                                                       |

To start a specific configuration, run one of the following commands:

- Default lightweight configuration:

  ```shell
  docker compose up -d
  ```

- Full configuration:

  ```shell
  docker compose -f docker-compose-full.yaml up -d
  ```

- Standalone Web Modeler:

  ```shell
  docker compose -f docker-compose-web-modeler.yaml up -d
  ```

:::note
The Orchestration Cluster uses file-based H2 secondary storage by default. The PostgreSQL containers in the full configuration store Management Identity and Web Modeler data, not Orchestration Cluster data. The full configuration still requires Elasticsearch for Optimize.

To select another Orchestration Cluster backend, see [configure secondary storage with Docker Compose](./secondary-storage.md).
:::

## Access components

Once the containers are running, you can access the components in your browser.

Use the following default credentials for web interfaces:

- **Username:** `demo`
- **Password:** `demo`

### Orchestration Cluster

The Orchestration Cluster is the core of Camunda 8 and provides process automation capabilities.

| Component                      | URL                                                              | Description                                                                                                                                                                                                |
| :----------------------------- | :--------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Operate                        | [http://localhost:8080/operate](http://localhost:8080/operate)   | Monitor and troubleshoot process instances. See [Introduction to Operate](/components/operate/operate-introduction.md) and [Process instance creation](/components/concepts/process-instance-creation.md). |
| Tasklist                       | [http://localhost:8080/tasklist](http://localhost:8080/tasklist) | Complete user tasks in running process instances. See [User tasks](/components/modeler/bpmn/user-tasks/user-tasks.md).                                                                                     |
| Orchestration Cluster Admin    | [http://localhost:8080/admin](http://localhost:8080/admin)       | Manage users and permissions in the lightweight configuration.                                                                                                                                             |
| Orchestration Cluster REST API | `http://localhost:8080/v2`                                       | REST API for process automation.                                                                                                                                                                           |
| Orchestration Cluster gRPC API | `localhost:26500`                                                | gRPC API for high-performance process automation.                                                                                                                                                          |

### Management and modeling components

The following components are available in the full configuration only:

| Component           | URL                                            | Description                                                                                                                                                                   |
| :------------------ | :--------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Console             | [http://localhost:8087](http://localhost:8087) | [Manage clusters](/components/hub/organization/manage-clusters/manage-cluster.md) and component configurations.                                                               |
| Optimize            | [http://localhost:8083](http://localhost:8083) | [Analyze and improve](/components/optimize/what-is-optimize.md) process performance.                                                                                          |
| Management Identity | [http://localhost:8084](http://localhost:8084) | [Manage users](/self-managed/components/management-identity/overview.md) for Console, Optimize, and Web Modeler.                                                              |
| Web Modeler         | [http://localhost:8070](http://localhost:8070) | Model [BPMN](/components/modeler/bpmn/bpmn.md) processes, [DMN](/components/modeler/dmn/dmn.md) decisions, and [forms](/components/modeler/forms/camunda-forms-reference.md). |

### External dependencies

| Component     | Configuration | URL                                                          | Description                                                                                                                                                         |
| :------------ | :------------ | :----------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Elasticsearch | Full          | Configured in `.env`                                         | External instance required by Optimize. Camunda 8.10 Docker Compose does not start Elasticsearch.                                                                   |
| Keycloak      | Full          | [http://localhost:18080/auth/](http://localhost:18080/auth/) | OIDC provider for Management Identity. The lightweight configuration uses the embedded Orchestration Cluster Admin instead. Access Keycloak with `admin` / `admin`. |
| PostgreSQL    | Full          | `localhost:5432`                                             | Database for Management Identity and Web Modeler. This database is separate from Orchestration Cluster secondary storage.                                           |

## Authentication

:::note
By default, the lightweight configuration uses [Basic authentication for the Orchestration Cluster](/self-managed/concepts/authentication/authentication-to-orchestration-cluster.md#basic-authentication). The full configuration uses Keycloak for [Management Identity authentication](/self-managed/concepts/authentication/authentication-to-management-components.md).
:::

### Lightweight configuration

- **Web UI:** Log in to Operate and Tasklist with `demo` / `demo`.
- **APIs:** REST and gRPC APIs are publicly accessible by default.

### Full configuration

- **Web UI:** Log in to Operate, Tasklist, Console, Optimize, and Web Modeler with `demo` / `demo`.
- **APIs:** REST and gRPC APIs require OAuth with the following settings:
  - **Client ID:** `orchestration`
  - **Client secret:** `secret`
  - **OAuth URL:** `http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token`
  - **Audience:** `orchestration-api`

For details, see [Orchestration Cluster REST API authentication](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md).

## Enable multi-tenancy

[Multi-tenancy](/components/concepts/multi-tenancy.md) requires an authenticated API. How you enable it depends on the configuration you run.

### Lightweight configuration

Create a `docker-compose.override.yaml` next to the compose file that protects the API and switches on the tenancy checks:

```yaml
services:
  orchestration:
    environment:
      CAMUNDA_SECURITY_AUTHENTICATION_UNPROTECTEDAPI: "false"
      CAMUNDA_SECURITY_MULTITENANCY_CHECKSENABLED: "true"
      CAMUNDA_SECURITY_MULTITENANCY_APIENABLED: "true"
  connectors:
    environment:
      CAMUNDA_CLIENT_AUTH_METHOD: basic
      CAMUNDA_CLIENT_AUTH_USERNAME: demo
      CAMUNDA_CLIENT_AUTH_PASSWORD: demo
```

Start the stack with `docker compose up -d` and manage tenants through the [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/specifications/create-tenant.api.mdx) or the Orchestration Cluster Admin UI at [http://localhost:8080/admin](http://localhost:8080/admin):

```bash
# Create a tenant
curl -u demo:demo -X POST http://localhost:8080/v2/tenants \
  -H 'Content-Type: application/json' -d '{"tenantId": "tenant-a", "name": "Tenant A"}'
# Assign the demo user to it
curl -u demo:demo -X PUT http://localhost:8080/v2/tenants/tenant-a/users/demo
```

With the API protected, clients must authenticate with Basic authentication (`camunda.client.auth.method=basic` plus username and password in the Camunda client SDKs).

### Full configuration

The full configuration already protects the API through Keycloak, so only the tenancy checks need to be switched on. Add the following to `.env`:

```bash
CAMUNDA_SECURITY_MULTITENANCY_CHECKSENABLED=true
CAMUNDA_SECURITY_MULTITENANCY_APIENABLED=true
```

Start the stack with `docker compose -f docker-compose-full.yaml up -d` and manage tenants through the [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/specifications/create-tenant.api.mdx) with an OAuth token, or the Orchestration Cluster Admin UI at [http://localhost:8080/admin](http://localhost:8080/admin):

```bash
TOKEN=$(curl -s -X POST 'http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token' \
  -d 'grant_type=client_credentials' -d 'client_id=orchestration' -d 'client_secret=secret' | jq -r .access_token)
# Create a tenant
curl -X POST http://localhost:8080/v2/tenants -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' -d '{"tenantId": "tenant-a", "name": "Tenant A"}'
# Assign the demo user to it
curl -X PUT http://localhost:8080/v2/tenants/tenant-a/users/demo -H "Authorization: Bearer $TOKEN"
```

## Next steps

- Review [install and start with Docker Compose](./install-start.md).
- Review [configure secondary storage with Docker Compose](./secondary-storage.md).
- Review [use connectors and deploy processes with Docker Compose](./connectors-and-modeling.md).
