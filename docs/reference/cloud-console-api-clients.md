---
id: cloud-console-api-clients
title: Console API clients
---

To interact with Camunda Cloud programmatically without using the Camunda Cloud UI, create Cloud API clients.

Cloud API clients are created for an organization, and therefore can access all Zeebe clusters of this organization.

Create Cloud API clients in the organization management.

A client can have one or multiple of the following permissions:

- **Get Clusters**: Retrieve information of all clusters of the organization.
- **Create Clusters**: Create a cluster for the organization.
- **Delete Clusters**: Delete a cluster of the organization.
- **Get Zeebe Clients**: Retrieve all Zeebe clients of the organization.
- **Create Zeebe Clients**: Create a Zeebe client for a cluster of the organization.
- **Delete Zeebe Clients**: Delete a Zeebe client of a cluster owned by the organization.

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
