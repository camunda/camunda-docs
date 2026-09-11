---
id: delete-process-definition-data
title: "Delete process definition data"
description: "The REST API to delete a process definition's analytics data from Optimize."
---

With the process definition data deletion API, you can delete all Optimize analytics data associated with a specific process definition, identified by its numeric process definition key.

## Functionality

This endpoint deletes Optimize's own data (process instances and the process definition) for the given process definition key. If this is the last remaining version of the process for its tenant, it also clears any cached process definition BPMN XML from reports that reference it.
It does not delete the process definition from the cluster. To remove a process definition from the cluster, use the [Delete resource](/apis-tools/orchestration-cluster-api-rest/specifications/delete-resource.api.mdx) endpoint.
It also does not delete the underlying Elasticsearch or OpenSearch indices.
The request is processed asynchronously. The deletion is queued until a background job performs the actual data deletion.

## Configuration

In Self-Managed, enable the job registry dispatcher so queued deletion requests get processed. See [Process definition data deletion](/self-managed/components/optimize/configuration/process-definition-deletion.md) for the required configuration.

## Usage notes

Deleting a process definition's data does not automatically update reports, dashboards, or alerts that reference it.
Aside from clearing any cached process definition BPMN XML on a report, these entities are left as-is.
Manually update or remove any reports, dashboards, or alerts that reference a deleted process definition.

## Method & HTTP target resource

DELETE `/api/public/process-definition/{processDefinitionKey}`

Where `processDefinitionKey` is the numeric key of the process definition whose Optimize data you want to delete.

## Request headers

The following request headers have to be provided with every delete request:

| Header        | Constraints | Value                                                  |
| ------------- | ----------- | ------------------------------------------------------ |
| Authorization | REQUIRED    | See [authentication](./optimize-api-authentication.md) |

## Path parameters

| Parameter              | Constraints | Value                                                         |
| ---------------------- | ----------- | ------------------------------------------------------------- |
| `processDefinitionKey` | REQUIRED    | The numeric key of the process definition to delete data for. |

## Query parameters

No query parameters available.

## Request body

No request body is required.

## Result

No response body. A `202` response confirms the deletion request was accepted and queued.

## Response codes

Possible HTTP response status codes:

| Code | Description                                                                                                              |
| ---- | ------------------------------------------------------------------------------------------------------------------------ |
| 202  | Request accepted. The deletion has been queued for asynchronous processing.                                              |
| 400  | The provided `processDefinitionKey` is not numeric.                                                                      |
| 401  | Authentication credentials are incorrect or missing. See [authentication](./optimize-api-authentication.md) for details. |
| 404  | No process definition was found for the provided `processDefinitionKey`.                                                 |
| 409  | A deletion request for this `processDefinitionKey` is already queued.                                                    |

## Example

### Delete a process definition's data

Deleting the Optimize data for the process definition with the key `2251799813685247`:

DELETE `/api/public/process-definition/2251799813685247`

#### Request header

`Authorization: Bearer mySecret`

#### Response

Status 202.
