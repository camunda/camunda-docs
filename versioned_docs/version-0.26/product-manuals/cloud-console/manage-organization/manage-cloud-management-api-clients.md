---
id: manage-cloud-management-api-clients
title: Manage cloud management API clients
---

To interact with Camunda Cloud programmatically, without using the Camunda Cloud UI, you can create Cloud Management API clients.

Cloud Management API clients are created for an organization, and can access all Zeebe clusters of this organization.

You can manage clients in the organization settings under the tab `Cloud Management API`.

A client can have one or multiple of the following permissions:

- **Get clusters** - retrieve information of all clusters of the organization
- **Create clusters** - create a cluster for the organization
- **Delete clusters** - delete a cluster of the organization
- **Get Zeebe clients** - retrieve all Zeebe clients of the organization
- **Create Zeebe clients** - create a Zeebe client for a cluster of the organization
- **Delete Zeebe clients** - delete a Zeebe client of a cluster owned by the organization

After a Cloud Management API client is created, the `Client Secret` is only shown once! You can also download a script that requests an access roken with your credentials.

To retrieve an access token for the Cloud Management API client:

```bash
curl --header "Content-Type: application/json" \
    --request POST \
    --data '{"grant_type":"client_credentials", "audience":"api.cloud.camunda.io", "client_id":"XXX", "client_secret":"YYY"}' \
    https://login.cloud.camunda.io/oauth/token
```

:::note Please note

- Access tokens have a validity period that can be found in the access token. After this time a new access token must be requested.
- The auth service has built-in rate limiting. If too many token requests are executed in a short time, the client is blocked for a certain time. Since the access tokens have a certain validity period, they must be cached on the client side.

:::
