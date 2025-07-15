---
id: orchestration-cluster-api-rest-overview
title: "Overview"
description: "Interact with Camunda 8 clusters. Activate jobs and run user task state operations for Camunda user tasks."
---

The Orchestration Cluster API is a REST API designed to interact with a Camunda 8 cluster.

:::info Public API
This API is part of the Camunda 8 [public API](/reference/public-api.md) and is covered by our SemVer stability guarantees (except for alpha endpoints). Breaking changes will not be introduced in minor or patch releases.
:::

:::note
Ensure you [authenticate](./orchestration-cluster-api-rest-authentication.md) before accessing the Orchestration Cluster API.
:::

:::note
The Orchestration Cluster API only supports user tasks managed by Camunda (formerly known as [Zeebe user tasks](../migration-manuals/migrate-to-camunda-user-tasks.md), which may still appear as such in your XML content).
:::

## Context paths

### SaaS

Find your **region Id** and **cluster Id** under **Connection information** in your client credentials (revealed when you click on your client under the **API** tab within your cluster).

Example path: `https://${REGION_ID}.zeebe.camunda.io:443/${CLUSTER_ID}/v2/`

### Self-Managed

The context path should match the host and path defined in your Zeebe Gateway [configuration](/self-managed/installation-methods/helm/configure/ingress-setup.md). The path used here is the default.

Example path: `http://localhost:8080/v2/`

## API Explorer

See [the interactive Orchestration Cluster API Explorer][camunda-api-explorer] for specifications, example requests and responses, and code samples of interacting with the Orchestration Cluster API.

## Request and file sizes

You can change the `maxMessageSize` default value of 4MB in the [Gateway](/self-managed/components/orchestration-cluster/zeebe/configuration/gateway.md#zeebegatewaynetwork) and [Broker](/self-managed/components/orchestration-cluster/zeebe/configuration/broker.md#zeebebrokernetwork) configuration.

If you do change this value, it is recommended that you also configure the [Deploy resources](./specifications/create-deployment.api.mdx) REST endpoint appropriately. By default, this endpoint allows single file upload and overall data up to 4MB.

You can adjust this configuration via the following properties:

```properties
spring.servlet.multipart.max-file-size=4MB
spring.servlet.multipart.max-request-size=4MB
```

For example, if you increase the `maxMessageSize` to 10MB, increase these property values to 10MB as well.

[camunda-api-explorer]: ./specifications/camunda-8-rest-api.info.mdx

## Naming conventions

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

## Versioning

Camunda uses the term “major version number” from [semantic versioning](https://semver.org/), but does not follow semantic versioning for the Orchestration Cluster API outright. Instead, Camunda provides updates to the API in place and only increments the version number for a major, breaking change.

:::note
New attributes and endpoints are not considered breaking changes.
:::

The Orchestration Cluster API version does not match the product version (8.x.x). An API’s version is rather defined by the API version number (e.g., `v2`) and the product version, for example, `POST /v2/user-tasks/search` in Camunda 8.8.0.

Camunda does API versioning rather than endpoint versioning. For example, the version changes for all endpoints if there is a breaking change in at least one endpoint. Multiple versions of an Orchestration Cluster API can exist in one product version to support a migration period, for example, `POST /v2/user-tasks/search` and `POST /v3/user-tasks/search` in Camunda 8.x.x.

## HTTP status codes & error handling

Handling errors is consistent across all endpoints, using well-known HTTP status codes and clear descriptions. This includes the information about errors and the use of a problem details object.

Camunda follows the proposed standard from [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) for problem details. The problem object contains at least the following members:

- Type
- Status
- Title
- Detail
- Instance

Camunda uses the following error codes and descriptions across our Orchestration Cluster API:

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

## Date values

Date values in the Orchestration Cluster API follow the [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) notation. This includes all requests and responses. The endpoints validate requests and transform responses accordingly.

## Variables

Variables in the Orchestration Cluster API are proper JSON objects, where the `key` defines the variable name and the `value` specifies the variable value. The endpoints validate requests and transform responses accordingly.

In search requests, filtering by variables works as documented in [search requests](./orchestration-cluster-api-rest-data-fetching.md#search-requests).
