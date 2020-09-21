---
id: cloud-console-api-reference
title: Console API Reference (REST)
---

For all requests include the access token for Cloud API into the Authorization header: `authorization:Bearer ${TOKEN}` (see [Cloud Console API Clients](./cloud-console-api-clients.md))

## Clusters

### GET all Clusters

`GET https://api.cloud.camunda.io/clusters/`
Returns detailed Data on all clusters of the Organization

### Get Cluster

`GET https://api.cloud.camunda.io/clusters/${uuid}`
Returns detailed Data of one cluster.

### Get Cluster creation parameters

`GET https://api.cloud.camunda.io/clusters/parameters`
Returns all options available to create a cluster.

### Delete Cluster

`DELETE https://api.cloud.camunda.io/clusters/${uuid}`

### Create Cluster

`POST https://api.cloud.camunda.io/clusters/`
With following JSON payload:

```json
{
  "name": string, // Name of the Cluster
  "channelId": string, // Software Channel for further upgrades, check Get creation parameters
  "generationId": string, // Software Generation, check Get creation parameters
  "regionId": string, // Region to host the cluster, check Get creation parameters
  "planTypeId": string // Hardware Plan of the cluster, check Get creation parameters
}
```

## Zeebe Clients

### Get all Zeebe Clients

`GET https://api.cloud.camunda.io/clusters/${clusterUuid}/clients/`
List all Zeebe Clients

### Get Zeebe Client Details

`GET https://api.cloud.camunda.io/clusters/${clusterUuid}/clients/${clientId}`
Returns the all data needed to connect to a cluster

### Delete Zeebe Client

`DELETE https://api.cloud.camunda.io/clusters/${clusterUuid}/clients/${clientId}`
Delete a Zeebe Client

### Create Zeebe Client

`POST https://api.cloud.camunda.io/clusters/${clusterUuid}/clients/`
With following JSON payload:

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
