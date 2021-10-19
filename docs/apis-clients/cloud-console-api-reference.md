---
id: cloud-console-api-reference
title: Console API (REST)
---

For all requests, include the access token for Cloud API in the Authorization header: `authorization:Bearer ${TOKEN}` (see [Cloud Console API clients](cloud-console-api-clients.md))

## Clusters

### Get all clusters

`GET https://api.cloud.camunda.io/clusters/`

Returns detailed data on all clusters of the organization.

### Get cluster

`GET https://api.cloud.camunda.io/clusters/${uuid}`

Returns detailed data of one cluster.

### Get cluster creation parameters

`GET https://api.cloud.camunda.io/clusters/parameters`

Returns all options available to create a cluster.

### Delete cluster

`DELETE https://api.cloud.camunda.io/clusters/${uuid}`

### Create cluster

`POST https://api.cloud.camunda.io/clusters/`

With the following JSON payload:

```json
{
  "name": string, // Name of the Cluster
  "channelId": string, // Software Channel for further upgrades, check Get creation parameters
  "generationId": string, // Software Generation, check Get creation parameters
  "regionId": string, // Region to host the cluster, check Get creation parameters
  "planTypeId": string // Hardware Plan of the cluster, check Get creation parameters
}
```

## Zeebe clients

### Get all Zeebe clients

`GET https://api.cloud.camunda.io/clusters/${clusterUuid}/clients/`

List all Zeebe clients.

### Get Zeebe client details

`GET https://api.cloud.camunda.io/clusters/${clusterUuid}/clients/${clientId}`

Returns data needed to connect to a cluster.

### Delete Zeebe client

`DELETE https://api.cloud.camunda.io/clusters/${clusterUuid}/clients/${clientId}`

Delete a Zeebe client.

### Create Zeebe client

`POST https://api.cloud.camunda.io/clusters/${clusterUuid}/clients/`

With the following JSON payload:

```json
{
  "clientName": string // Name of the ZeebeClient
}
```

This returns:

```json
{
  "name": string,
  "clientId": string,
  "clientSecret": string
}
```

Be aware the `clientSecret` is only returned on creation. `GET Client` calls do not return the `clientSecret`.
