---
id: manage-cloud-management-api-clients
title: Manage Cloud Management API Clients
---

To interact with Camunda Cloud programmatically, without using the Camunda Cloud frontend, you can create Cloud Management API Clients.

Cloud Management API Clients are created for an Organization, and can access all Zeebe Clusters of this Organization.

You can manage clients in the organization settings under the tab Cloud Management API.

A Client can have one or multiple of the following permissions:

- Get Clusters (Retrieve information of all Clusters of the Organization)
- Create Clusters (Create a cluster for the Organization)
- Delete Clusters (Delete a cluster of the Organization)
- Get Zeebe Clients (Retieve all Zeebe Clients of the Organization)
- Create Zeebe Clients (Create a Zeebe Client for a Cluster of the Organization)
- Delete Zeebe Clients (Delete a Zeebe Client of a Cluster owned by the Organization)

After a Cloud Management API Client is created, the Client Secret is only shown once! You can also download a script that requests an Access Token with your credentials.

To retrieve an access token for the Cloud Management API Client:

```bash
curl --header "Content-Type: application/json" \
    --request POST \
    --data '{"grant_type":"client_credentials", "audience":"api.cloud.camunda.io", "client_id":"XXX", "client_secret":"YYY"}' \
    https://login.cloud.camunda.io/oauth/token
```

:::note Please note

- Access tokens have a validity period that can be found in the access token. After this time a new Access Token must be requested.
- The Auth Service has a built-in rate limiting. If too many token requests are executed in a short time, the client is blocked for a certain time. Since the access tokens have a certain validity period, they must be cached on the client side.
  :::
