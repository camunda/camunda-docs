---
id: cloud-console-api-reference
title: Cloud Console API clients (REST)
description: "To interact with Camunda Cloud programmatically without using the Camunda Cloud UI, create Cloud API clients in the organization settings."
---

## Cloud API management

To interact with Camunda Cloud programmatically without using the Camunda Cloud UI, create Cloud API clients in the organization settings under the **Cloud Management API** tab.

Cloud API clients are created for an organization, and therefore can access all Zeebe clusters of this organization.

A client can have one or multiple of the following permissions:

- **Get clusters**: Retrieve information of all clusters of the organization.
- **Create clusters**: Create a cluster for the organization.
- **Delete clusters**: Delete a cluster of the organization.
- **Get Zeebe clients**: Retrieve all Zeebe clients of the organization.
- **Create Zeebe clients**: Create a Zeebe client for a cluster of the organization.
- **Delete Zeebe clients**: Delete a Zeebe client of a cluster owned by the organization.

:::note
After a Cloud API client is created, the `Client Secret` is only shown once. Save this `Client Secret` somewhere safe.
:::

To retrieve an access token for the Cloud API client:

```bash
curl --header "Content-Type: application/json" \
    --request POST \
    --data '{"grant_type":"client_credentials", "audience":"api.cloud.camunda.io", "client_id":"XXX", "client_secret":"YYY"}' \
    https://login.cloud.camunda.io/oauth/token
```

:::note
Access tokens have a validity period found in the access token. After this time, a new access token must be requested.
:::

:::note
The auth service has built-in rate limiting. If too many token requests are executed in a short time, the client is blocked for a certain time. Since the access tokens have a certain validity period, they must be cached on the client side.
:::

## Console API (REST)

For all requests, include the access token for Cloud API in the Authorization header: `authorization:Bearer ${TOKEN}`.

### Clusters

#### Get all clusters

`GET https://api.cloud.camunda.io/clusters/`

Returns detailed data on all clusters of the organization.

#### Get cluster

`GET https://api.cloud.camunda.io/clusters/${uuid}`

Returns detailed data of one cluster.

#### Get cluster creation parameters

`GET https://api.cloud.camunda.io/clusters/parameters`

Returns all options available to create a cluster.

#### Delete cluster

`DELETE https://api.cloud.camunda.io/clusters/${uuid}`

#### Create cluster

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

### Zeebe clients

#### Get all Zeebe clients

`GET https://api.cloud.camunda.io/clusters/${clusterUuid}/clients/`

List all Zeebe clients.

#### Get Zeebe client details

`GET https://api.cloud.camunda.io/clusters/${clusterUuid}/clients/${clientId}`

Returns data needed to connect to a cluster.

#### Delete Zeebe client

`DELETE https://api.cloud.camunda.io/clusters/${clusterUuid}/clients/${clientId}`

Delete a Zeebe client.

#### Create Zeebe client

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
