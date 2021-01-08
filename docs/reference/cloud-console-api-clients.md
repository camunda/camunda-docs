---
id: cloud-console-api-clients
title: Console API clients
---

To interact with Camunda Cloud programmatically, without using the Camunda Cloud UI, you can create Cloud API Clients.

Cloud API clients are created for an organization, an therefore can access all Zeebe clusters of this organization.

You can create Cloud API clients in the organization settings.

A client can have one or multiple of the following permissions:

- **Get Clusters** - retrieve information of all clusters of the organization
- **Create Clusters** - create a cluster for the organization
- **Delete Clusters** - delete a cluster of the organization
- **Get Zeebe Clients** - retieve all Zeebe clients of the organization
- **Create Zeebe Clients** - create a Zeebe client for a cluster of the organization
- **Delete Zeebe Clients** - delete a Zeebe client of a cluster owned by the organization

After a Cloud API client is created, the `Client Secret` is only shown once! Please write it down somewhere save!

To retrieve a access token for the Cloud API client:

```bash
curl --header "Content-Type: application/json" \
    --request POST \
    --data '{"grant_type":"client_credentials", "audience":"api.cloud.camunda.io", "client_id":"XXX", "client_secret":"YYY"}' \
    https://login.cloud.camunda.io/oauth/token
```

Please note:

- Access tokens have a validity period that can be found in the access token. After this time a new access token must be requested.
- The auth service has a built-in rate limiting. If too many token requests are executed in a short time, the client is blocked for a certain time. Since the access tokens have a certain validity period, they must be cached on the client side.
