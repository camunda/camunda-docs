---
id: orchestration-cluster-api-rest-overview
title: "Overview"
description: "Interact with Camunda 8 clusters. Activate jobs and run user task state operations for Camunda user tasks."
---

## Welcome to the Camunda Orchestration Cluster API
The Orchestration Cluster API lets you interact programmatically with process orchestration capabilities in Camunda 8. You can use it to start, manage, and query process instances. It also lets you complete user tasks, resolve incidents, and manage variables - at scale and with confidence.

You can use this API to:
* Build process-driven applications
* Integrate Camunda's User Tasks into custom task UIs 
* Start and monitor processes from external systems

This API is designed to make it easy to [find resources](./orchestration-cluster-api-rest-data-fetching.md#advanced-search-filters) with a consistent experience while ensuring all endpoints are secure with [authentication](./orchestration-cluster-api-rest-authentication.md) and fine-grained [resource authorization](/components/identity/authorization.md). 

We're commited to delivering high performance and reliability with our APIs. This API is part of the Camunda 8 [public API](/reference/public-api.md) and is covered by our SemVer stability guarantees (except for clearly marked alpha endpoints).

To learn more about orchestration clusters themselves, see [What is an Orchestration Cluster?](/components/orchestration-cluster.md)

Ready to dive in? See **Get started** below to make your first API call.

## Get started
To begin using the Orchestration Cluster API, you'll need the following:

### Prerequisites

* **A Camunda 8 Orchestration Cluster**
  * For quick local development, we recommend using [C8Run](/self-managed/quickstart/developer-quickstart/c8run.md). It exposes the API without requiring credentials or tokens.
* **An Access Token** (for secured clusters)
  * Follow the steps in [Authentication](./orchestration-cluster-api-rest-authentication.md) to obtain a valid JWT access token.
* **A Client to make API requests**
  * Use the [Postman Collection](https://www.postman.com/camundateam/camunda-8-postman/collection/apl78x9/camunda-8-api-rest) for quick testing, or interact programmatically using the [Java Client](/java-client/index.md) or [Spring SDK](/spring-zeebe-sdk/getting-started.md).

Once you’re set up, we recommend trying your first call using [Postman](https://www.postman.com/camundateam/camunda-8-postman/request/en495q6/get-cluster-typology) or curl: [Get cluster topology](./specifications/get-topology.api.mdx).

### Explore the API

Visit the [interactive Orchestration Cluster API Explorer][camunda-api-explorer] to:
* Browse available endpoints 
* See request and response examples 
* Check code samples

If you're just getting started, try these next steps:
* Model a process definition with a user task and deploy using Modeler
* Start a process: [`POST /process-instances`](./specifications/create-process-instance.api.mdx)
* Completing a user task: [`POST /user-tasks/:userTaskKey/completion`](./specifications/complete-user-task.api.mdx)

or check [this complete e2e guide](/guides/getting-started-example.md) to implement process automation solutions using Java and Spring Clients. 

## Authorize your requests

When authentication is enabled, all API requests must include a valid access token to ensure secure access to your orchestration cluster.

To learn how to authenticate, follow the step-by-step guide in [Authentication](./orchestration-cluster-api-rest-authentication.md) based on your setup (SaaS or Self-Managed).

Once you’ve obtained a token, include it in each API request like this:

```shell
curl --header "Authorization: Bearer ${TOKEN}" \
     ${BASE_URL}/topology
```
Replace the `${BASE_URL}` based on the address of your cluster. See the [Context paths](#context-paths) below.

### Context paths

#### SaaS
In the Camunda Console, go to your cluster, and in the Cluster Details find your **Region Id** and **Cluster Id**. Use this pattern as your `${BASE_URL}`:
`https://${REGION_ID}.zeebe.camunda.io:443/${CLUSTER_ID}/v2/`

#### Self-Managed

Use the host and path defined in your Zeebe Gateway [configuration](/self-managed/installation-methods/helm/configure/ingress-setup.md). If you’re using the default setup the `${BASE_URL}` is: `http://localhost:8080/v2/`

## Versioning

The API version is defined by the API version number (`v2`) and the product version, for example, `POST /v2/user-tasks/search` in Camunda 8.8.0.

Camunda does API versioning rather than endpoint versioning. For example, the version changes for all endpoints if there is a breaking change in at least one endpoint. Multiple versions of an Orchestration Cluster API can exist in one product version to support a migration period, for example, `POST /v2/user-tasks/search` and `POST /v3/user-tasks/search` in Camunda 8.x.x.

:::note
New attributes and endpoints are not considered breaking changes.
:::

## Request and file sizes

You can change the `maxMessageSize` default value of 4MB in the [Gateway](/self-managed/zeebe-deployment/configuration/gateway.md#zeebegatewaynetwork) and [Broker](../../self-managed/zeebe-deployment/configuration/broker.md#zeebebrokernetwork) configuration.

If you do change this value, it is recommended that you also configure the [Deploy resources](./specifications/create-deployment.api.mdx) REST endpoint appropriately. By default, this endpoint allows single file upload and overall data up to 4MB.

You can adjust this configuration via the following properties:

```properties
spring.servlet.multipart.max-file-size=4MB
spring.servlet.multipart.max-request-size=4MB
```

For example, if you increase the `maxMessageSize` to 10MB, increase these property values to 10MB as well.

Additionally, if you're uploading multiple files as part of a multipart request, note that Tomcat limits the number of parts per request using the `server.tomcat.max-part-count` property. By default, this is set to 50 in the orchestration API. You can increase the limit to allow more files by setting the property in your configuration:

```properties
server.tomcat.max-part-count=100
```

Or by using the equivalent environment variable:

```properties
SERVER_TOMCAT_MAX_PART_COUNT=100
```

Tomcat also enforces a separate limit on the total number of request parameters via the `server.tomcat.max-parameter-count` property. Since each file upload typically counts as both a part and a parameter, the lower of these two limits will determine how many files can be uploaded.

For the latest defaults and detailed behavior, refer to the [Tomcat documentation](https://tomcat.apache.org/), as these values may change between versions.

[camunda-api-explorer]: ./specifications/orchestration-cluster-rest-api.info.mdx

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

In search requests, filtering by variables works as documented in [search requests](orchestration-cluster-api-rest-data-fetching.md#search-requests).
