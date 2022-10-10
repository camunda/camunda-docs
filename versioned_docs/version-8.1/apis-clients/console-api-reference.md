---
id: console-api-reference
title: Console API clients (REST)
description: "To interact with Camunda Platform 8 programmatically without using the Camunda Platform 8 UI, create Cloud API clients."
---

## Console API (REST)

For all requests, include the access token for Cloud API in the Authorization header: `authorization:Bearer ${TOKEN}`.

:::note
A detailed API description can be found [here](https://console.cloud.camunda.io/customer-api/openapi/docs/#/) via Swagger. With a valid access token, this offers an interactive API experience against your Camunda Platform 8 cluster.
:::

## Cloud API management

To interact with Camunda Platform 8 programmatically without using the Camunda Platform 8 UI, create Cloud API clients in the organization settings under the **Cloud Management API** tab.

Cloud API clients are created for an organization, and therefore can access all Camunda Platform 8 clusters of this organization.

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

Note that the auth service has built-in rate limiting. If too many token requests are executed in a short time, the client is blocked for a certain time. Since the access tokens have a certain validity period, they must be cached on the client side.
