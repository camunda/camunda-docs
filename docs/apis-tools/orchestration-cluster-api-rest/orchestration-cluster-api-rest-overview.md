---
id: orchestration-cluster-api-rest-overview
title: "Overview"
description: "Interact with Camunda 8 clusters programmatically. Start processes, complete user tasks, and manage process instances at scale."
---

import ApiGrid from './react-components/\_api-card';
import { apiExplorationCards } from './react-components/\_api-card-data';

The Orchestration Cluster REST API lets you interact programmatically with process orchestration capabilities in Camunda 8. You can use it to start, manage, and query process instances. It also lets you complete user tasks, resolve incidents, and manage variables, at scale and with confidence.

**You can use this API to**

- **Build process-driven applications** – Create applications that orchestrate business processes and integrate with your existing systems.
- **Integrate user tasks into custom UIs** – Build custom task management interfaces that connect to Camunda's user task engine.
- **Start and monitor processes from external systems** – Trigger process instances and track their progress from any application or service.

## Key features

This API is designed to make it easy to [find resources](./orchestration-cluster-api-rest-data-fetching.md#advanced-search-filters) with a consistent experience, while ensuring all endpoints are secure with [authentication](./orchestration-cluster-api-rest-authentication.md) and fine-grained [resource authorization](/components/identity/authorization.md).

**Key capabilities include**

- **Full process lifecycle management** – Deploy, start, and monitor BPMN processes
- **User task operations** – Assign, complete, and manage human tasks
- **Variable management** – Read and update process variables
- **Incident resolution** – Handle and resolve process incidents
- **Advanced search and filtering** – Query process data with powerful search capabilities

This API is part of the Camunda 8 [public API](/reference/public-api.md) and is covered by our SemVer stability guarantees (except for clearly marked alpha endpoints). You can rely on backward compatibility for production use.

To learn more about the Orchestration Cluster, see [What is the Orchestration Cluster?](/components/orchestration-cluster.md).

Ready to get started? Follow the steps below to make your first API call.

## Getting started

This section helps you get up and running in minutes. To begin using the Orchestration Cluster REST API, you'll need the following:

### Prerequisites

- **A Camunda 8 Orchestration Cluster**
  - For local development, use [C8 Run](/self-managed/quickstart/developer-quickstart/c8run.md) or [Docker Compose](/self-managed/quickstart/developer-quickstart/docker-compose.md), which expose the API without requiring credentials or tokens by default.
  - For production or advanced development, use [Helm/Kubernetes](/self-managed/installation-methods/helm/install.md) or [manual installation](/self-managed/installation-methods/manual/install.md).

- **A client to send API requests**
  - Quick testing: Use the [Swagger](../orchestration-cluster-api-rest-swagger) interface
  - Programmatic access: Use the [Java client](/apis-tools/java-client/getting-started.md) or [Spring SDK](/apis-tools/spring-zeebe-sdk/getting-started.md)
  - Custom client: [Download the OpenAPI spec](https://github.com/camunda/camunda/blob/main/zeebe/gateway-protocol/src/main/proto/rest-api.yaml) to generate your own client
  - Universal client: [Postman collection](https://www.postman.com/camundateam/camunda-8-postman/collection/apl78x9/camunda-8-api-rest)

### Authentication

Authentication for the Orchestration Cluster REST API depends on your environment and how you deploy Camunda 8. Authenticate your Client requests based on your setup.

**Supported authentication methods**

- No authentication – For local development only
- Basic authentication – Username/password for simple setups
- OIDC access tokens – OAuth2/OIDC for production environments

**Quick reference**

- See the [authentication support matrix](./orchestration-cluster-api-rest-authentication.md#authentication-support-matrix) for details on supported methods by deployment type
- For production security, OIDC with X.509 client certificates is supported in self-managed environments. See [OIDC with X.509](./orchestration-cluster-api-rest-authentication.md#oidc-with-x509-client-certificates)
- If you're using the Java or Spring clients, token management is handled automatically. See [client authentication configuration](../spring-zeebe-sdk/getting-started.md#configuring-the-camunda-8-connection)

For detailed authentication setup, follow the step-by-step guide in [Authentication](./orchestration-cluster-api-rest-authentication.md) based on your deployment type.

### Test your connection

Once you're set up, verify your connection works by making your first API call:

**Using curl:**

```bash
curl ${BASE_URL}/topology
```

**Using Postman**  
Try the [get cluster topology](https://www.postman.com/camundateam/camunda-8-postman/request/en495q6/get-cluster-typology) request or browse the full collection.

This request returns information about your cluster topology, confirming that your setup is working correctly.

### Try your first workflow

If you're just getting started with process automation, try this simple workflow:

1. **Model a process** – Create a simple BPMN process with a user task using [Camunda Modeler](https://camunda.com/download/modeler/)
2. **Deploy the process** – Use [`POST /deployments`](./specifications/create-deployment.api.mdx) to deploy your BPMN file
3. **Start a process instance** – Use [`POST /process-instances`](./specifications/create-process-instance.api.mdx) to create a new process instance
4. **Complete a user task** – Use [`POST /user-tasks/{userTaskKey}/completion`](./specifications/complete-user-task.api.mdx) to complete the task

For a complete walkthrough with code examples, see our [Getting Started Tutorial](/guides/getting-started-example.md).

### Explore the API

<ApiGrid items={apiExplorationCards} />

## API reference

This section covers the technical details and conventions you need to understand when working with the Orchestration Cluster REST API.

### Base URLs

#### SaaS

In the Camunda Console, go to your cluster, and in the **Cluster Details**, find your **Region Id** and **Cluster Id**. Use this pattern as your `${BASE_URL}`:
`https://${REGION_ID}.zeebe.camunda.io/${CLUSTER_ID}/v2/`

#### Self-Managed

Use the host and path defined in your Zeebe Gateway [configuration](/self-managed/installation-methods/helm/configure/ingress-setup.md). If you're using the default setup, the `${BASE_URL}` is: `http://localhost:8080/v2/`

### Versioning

Camunda uses semantic versioning (SemVer) to ensure API changes are predictable and compatible. This helps you upgrade safely without unexpected breaking changes.

The API version is determined by the API version number (`v2`) and the product version—for example, `POST /v2/user-tasks/search` in Camunda 8.8.0.

Camunda versions the entire API rather than individual endpoints. If a breaking change occurs in any endpoint, the entire API is versioned. During migration periods, multiple API versions may coexist—for example, both `v2` and `v3` versions of `/user-tasks/search` may be available in the same release.

:::note
Adding new endpoints or attributes to existing responses is **not** considered a breaking change.
:::

### Request size limits

The default maximum request size for deployment-related requests (such as `POST /v2/deployments`) is 4MB.

### Naming conventions

Naming across the Orchestration Cluster REST API is simple, intuitive, and consistent to reduce friction when working with multiple endpoints.

The conventions include:

- **Nouns over verbs** – e.g., `assignment` instead of `assign`
- **Plural terms** for top-level resources – e.g., `user-tasks`
- **Kebab-case** for multiple words in path parameters – e.g., `user-tasks`
- **camelCase** for multiple words in query parameters – e.g., `userTaskKey`

These conventions are illustrated in the following endpoint example:

`POST /user-tasks/{userTaskKey}/assignment`

For IDs or similar short 2- or 3-letter words or acronyms, Camunda only capitalizes the first letter. If standalone, all letters are lowercase.

| Term | Usage                                      |
| ---- | ------------------------------------------ |
| ID   | `id` (standalone) or `processDefinitionId` |
| URL  | `url` (standalone) or `externalUrl`        |
| UUID | `uuid` (standalone) or `clusterUuid`       |

Identifiers follow a naming convention for parameters and data attributes alike:

- Unique technical identifiers are suffixed with **key**, for example, `userTaskKey`, `processInstanceKey`, or `userKey`. These are usually numeric values.
- Other identifiers, such as those copied from the BPMN XML, are typically suffixed with **id**, for example, `processDefinitionId`.
- Key and id fields contain the entity as a prefix, for example, `userTaskKey` or `processDefinitionId`. This applies when referencing other resources like `formKey` in the user task entity and the respective entities themselves like `userTaskKey` in the user task entity.
- The full entity name is used as the prefix to avoid confusion, for example, `processDefinitionKey` instead of `processKey`, which could be interpreted as a process instance or process definition.
- Other entity attributes do not have a prefix to avoid clutter, such as `version` in the process definition entity. However, references to other resources require a prefix, like `processDefinitionVersion` in the process instance entity.

### HTTP status codes & error handling

The Orchestration Cluster REST API uses standard HTTP status codes and returns error responses following the [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) format. Each error response includes the following fields:

- `type`: A URI identifier for the error type
- `status`: The HTTP status code (e.g., 400, 404)
- `title`: A short, human-readable summary of the error
- `detail`: A detailed explanation of the issue
- `instance`: A URI reference identifying the specific occurrence of the problem

#### Common error codes

| Error code | Meaning                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200        | OK                                                                                                                                                                                                                                                                                                                                                                                                        |
| 204        | No content                                                                                                                                                                                                                                                                                                                                                                                                |
| 400        | Bad request. Generic error with further description in the problem detail.                                                                                                                                                                                                                                                                                                                                |
| 401        | Unauthorized. The client is not authenticated. Retry with a modified authorization header.                                                                                                                                                                                                                                                                                                                |
| 403        | Forbidden. The client has insufficient permissions for the request.                                                                                                                                                                                                                                                                                                                                       |
| 404        | Not found                                                                                                                                                                                                                                                                                                                                                                                                 |
| 409        | Conflict. The request attempts to modify a resource that is not in the correct state.                                                                                                                                                                                                                                                                                                                     |
| 412        | Precondition failed. The client should check the cluster status.                                                                                                                                                                                                                                                                                                                                          |
| 500        | Internal server error. Generic error with further description in the problem detail.                                                                                                                                                                                                                                                                                                                      |
| 503        | The service is currently unavailable. This may happen when the system signals backpressure to prevent the server's compute resources from being exhausted, avoiding more severe failures. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism [here](../../components/zeebe/technical-concepts/internal-processing.md) |

### Date formats

Date values in the Orchestration Cluster REST API follow the [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) notation. This applies to all requests and responses. The endpoints validate requests and transform responses accordingly.

### Variables

Variables in the Orchestration Cluster REST API are JSON objects, where `key` defines the variable name and `value` specifies the variable value.

For full details on variable filtering and structure, see [search requests](orchestration-cluster-api-rest-data-fetching.md#variables).

## What's next?

Now that you're familiar with the Orchestration Cluster REST API, here are some useful next steps:

- [Build a job worker using the Spring SDK](../spring-zeebe-sdk/getting-started.md)
- [Test your process definitions using Camunda Process Test](../testing/getting-started.md)
- [Migrate from v1 component REST APIs to the v2 Orchestration Cluster REST API](../migration-manuals/migrate-to-camunda-api.md)
- [Download the OpenAPI spec](https://github.com/camunda/camunda/blob/main/zeebe/gateway-protocol/src/main/proto/rest-api.yaml) to generate a client or explore the raw schema
