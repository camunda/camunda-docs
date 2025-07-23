---
id: orchestration-cluster-api-rest-overview
title: "Overview"
description: "Interact with Camunda 8 clusters. Activate jobs and run user task state operations for Camunda user tasks."
---

## Welcome to the Camunda Orchestration Cluster API

The Orchestration Cluster API lets you interact programmatically with process orchestration capabilities in Camunda 8. You can use it to start, manage, and query process instances. It also lets you complete user tasks, resolve incidents, and manage variables, at scale and with confidence.

You can use this API to:

- Build process-driven applications
- Integrate Camunda's User Tasks into custom task UIs
- Start and monitor processes from external systems

This API is designed to make it easy to [find resources](./orchestration-cluster-api-rest-data-fetching.md#advanced-search-filters) with a consistent experience, while ensuring all endpoints are secure with [authentication](./orchestration-cluster-api-rest-authentication.md) and fine-grained [resource authorization](/components/identity/authorization.md).

We're committed to delivering high performance and reliability with our APIs. This API is part of the Camunda 8 [public API](/reference/public-api.md) and is covered by our SemVer stability guarantees (except for clearly marked alpha endpoints).

To learn more about orchestration clusters, see [What is an Orchestration Cluster?](/components/orchestration-cluster.md).

Ready to dive in? Head to **[Getting started](#getting-started)** section below to make your first API call.

## Getting started

This section helps you get up and running in minutes. To begin using the Orchestration Cluster API, you'll need the following:

### Prerequisites

- **A Camunda 8 Orchestration Cluster**
  - For local development, use [C8 Run](/self-managed/quickstart/developer-quickstart/c8run.md) or [Docker Compose](/self-managed/quickstart/developer-quickstart/docker-compose.md). These expose the API without requiring credentials or tokens by default.
  - For production or advanced development, use [Helm/Kubernetes](/self-managed/installation-methods/helm/install.md) or [Manual installation](/self-managed/installation-methods/manual/install.md).
- **Authentication**
  - For local development, authentication is optional. For production or shared environments, authentication is required. See [Authentication](./orchestration-cluster-api-rest-authentication.md) for supported methods and setup instructions.
- **A client to send API requests**
  - Use the [Postman Collection](https://www.postman.com/camundateam/camunda-8-postman/collection/apl78x9/camunda-8-api-rest) for quick testing, or interact programmatically using the [Java Client](/apis-tools/java-client/index.md) or [Spring SDK](/apis-tools/spring-zeebe-sdk/getting-started.md).

Once you’re set up, try your first call using [Postman](https://www.postman.com/camundateam/camunda-8-postman/request/en495q6/get-cluster-typology) or curl: [Get cluster topology](./specifications/get-topology.api.mdx) to confirm your setup is working.

## Explore the API

- Visit the [interactive Orchestration Cluster API Explorer](./specifications/orchestration-cluster-rest-api.info.mdx) to:
  - Browse available endpoints
  - See request and response examples
  - Check code samples
- Prefer code-first? [Download the OpenAPI spec](https://github.com/camunda/camunda/blob/main/zeebe/gateway-protocol/src/main/proto/rest-api.yaml) to generate your own client or inspect the full schema.

If you're just getting started, try these next steps:

- Model a process definition with a user task and deploy using Modeler
- Start a process instance: [`POST /process-instances`](./specifications/create-process-instance.api.mdx)
- Complete a user task: [`POST /user-tasks/:userTaskKey/completion`](./specifications/complete-user-task.api.mdx)
- Or check [this complete e2e guide](/guides/getting-started-example.md) to implement process automation solutions using Java and Spring Clients.

## Authorize your requests

Authentication for the Orchestration Cluster API depends on your environment and how you deploy Camunda 8. Supported authentication methods include No Authentication (for local development), Basic Authentication, OIDC (token-based), and OIDC with X.509 client certificates (for advanced scenarios).

- See the [Authentication support matrix](./orchestration-cluster-api-rest-authentication.md#authentication-support-matrix) for details on which authentication methods are supported for each distribution (C8 Run, Docker Compose, Helm/Kubernetes, SaaS).
- For advanced security, OIDC with X.509 client certificates is supported in Self-Managed environments and handled by the Java client. See [OIDC with X.509](./orchestration-cluster-api-rest-authentication.md#oidc-with-x509-client-certificates).

When authentication is enabled, all API requests must include a valid access token. These tokens are short-lived and must be refreshed periodically depending on your client configuration. If you're using the Java or Spring clients, token handling can be [configured easily](../spring-zeebe-sdk/getting-started.md#configuring-the-camunda-8-connection).

To learn how to authenticate, follow the step-by-step guide in [Authentication](./orchestration-cluster-api-rest-authentication.md) based on your setup (SaaS or Self-Managed).

## Context paths

### SaaS

In the Camunda Console, go to your cluster, and in the Cluster Details, find your **Region Id** and **Cluster Id**. Use this pattern as your `${BASE_URL}`:
`https://${REGION_ID}.zeebe.camunda.io/${CLUSTER_ID}/v2/`

### Self-Managed

Use the host and path defined in your Zeebe Gateway [configuration](/self-managed/installation-methods/helm/configure/ingress-setup.md). If you’re using the default setup, the `${BASE_URL}` is: `http://localhost:8080/v2/`

## Versioning

Camunda uses semantic versioning (SemVer) to ensure that API changes are predictable and compatible. This helps you safely upgrade without unexpected breaking changes.

The API version is defined by the API version number (`v2`) and the product version, for example, `POST /v2/user-tasks/search` in Camunda 8.8.0.

Camunda versions the entire API rather than individual endpoints. If a breaking change occurs in any endpoint, the entire API is versioned. During migration periods, multiple API versions will coexist - for example, both `v2` and `v3` versions of `/user-tasks/search` may be available in the same product release.

:::note
Adding new endpoints or attributes to existing responses is **not** considered a breaking change.
:::

## API structure and conventions

### Request size limits

The default maximum request size for deployment-related requests (such as `POST /v2/deployments`) is 4MB.

### Naming conventions

Naming is simple, intuitive, and consistent across the Orchestration Cluster API to reduce friction when working across multiple endpoints.

The API overall applies the following naming conventions:

- **Nouns** over verbs, for example, `assignment` over `assign`.
- **Plural terms** for top-level resources, for example, `user-tasks`.
- **Kebab-case** for multiple words in path parameters, and a hyphen (-) where a space would exist, for example, `user-tasks`.
- **camelCase** for multiple words in query parameters. Camunda capitalizes the first letter of words after the first. The first letter in the first word is lowercase, for example, `userTaskKey`.

These conventions can be observed in the following endpoint example:

`POST /user-tasks/{userTaskKey}/assignment`

For IDs or similar short 2- or 3-letter words or acronyms, Camunda only capitalizes the first letter. If standalone, all letters are lowercase.

| Term | Usage                                      |
| ---- | ------------------------------------------ |
| ID   | `id` (standalone) or `processDefinitionId` |
| URL  | `url` (standalone) or `externalUrl`        |
| UUID | `uuid` (standalone) or `clusterUuid`       |

Identifiers follow a naming rule in parameters and data attributes alike:

- Unique technical identifiers are suffixed with **key**, for example, `userTaskKey`, `processInstanceKey`, or `userKey`. These are numeric values in most cases.
- Other identifiers, such as copied identifiers from the BPMN XML, may be arbitrarily named but are usually suffixed with **id**, for example, `processDefinitionId`.
- Key and id fields contain the entity as a prefix, for example, `userTaskKey` or `processDefinitionId`. This also applies when referencing other resources like `formKey` in the user task entity and the respective entities themselves like `userTaskKey` in the user task entity.
- The full entity is the prefix to avoid confusion, for example, `processDefinitionKey` instead of `processKey`; the latter could be interpreted as process instance or process definition.
- Other attributes of entities have no prefix to avoid clutter, such as `version` in the process definition entity. However, other resources have to be referenced with a prefix, like `processDefinitionVersion` in the process instance entity.

### HTTP status codes & error handling

The Orchestration Cluster API uses standard HTTP status codes and returns error responses following the [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) format. This format ensures consistency across endpoints and simplifies error parsing and handling.

Each error response includes the following fields:

- `type`: A URI identifier for the error type
- `status`: The HTTP status code (e.g., 400, 404)
- `title`: A short, human-readable summary of the error
- `detail`: A more detailed explanation of the issue
- `instance`: A URI reference identifying the specific occurrence of the problem

#### Common error codes

| Error code | Meaning                                                                                                                                                                    |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 200        | OK                                                                                                                                                                         |
| 204        | No content                                                                                                                                                                 |
| 400        | Bad request. Generic error that contains further description in the problem detail.                                                                                        |
| 401        | Unauthorized. The client is not authenticated yet. The client should try again with a modified authorization header.                                                       |
| 403        | Forbidden. The client has incorrect or insufficient permissions for the request.                                                                                           |
| 404        | Not found                                                                                                                                                                  |
| 409        | Conflict. The request is trying to modify a resource that is currently not in the right state.                                                                             |
| 412        | Precondition failed. The client should check the cluster status.                                                                                                           |
| 429        | Rate limit exceeded. The client exceeds a defined limit of requests, for example, Zeebe signaling backpressure due to more requests than the broker can currently process. |
| 500        | Internal server error. Generic error that contains further description in the problem detail.                                                                              |

### Date formats

Date values in the Orchestration Cluster API follow the [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) notation. This includes all requests and responses. The endpoints validate requests and transform responses accordingly.

### Variables

Variables in the Orchestration Cluster API are JSON objects, where the `key` defines the variable name and the `value` specifies the variable value.

For full details on variable filtering and structure, see [search requests](orchestration-cluster-api-rest-data-fetching.md#variables).

## What's next?

Now that you're familiar with the Orchestration Cluster API, here are some useful next steps:

- [Build a Job worker using the Spring SDK](../spring-zeebe-sdk/getting-started.md)
- [Test your process definitions using Camunda Process Test](../testing/getting-started.md)
- [Migrate from v1 component REST APIs to the v2 Orchestration Cluster API](../migration-manuals/migrate-to-camunda-api.md)
- [Download the OpenAPI spec](https://github.com/camunda/camunda/blob/main/zeebe/gateway-protocol/src/main/proto/rest-api.yaml) to generate a client or explore the raw schema
