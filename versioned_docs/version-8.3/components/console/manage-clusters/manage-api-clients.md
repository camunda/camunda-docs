---
id: manage-api-clients
title: Manage API clients
description: "Let's create a client and manage our API clients."
---

To interact with Zeebe in the cloud from the outside, every client application must authenticate itself. An **OAuth Flow** is therefore used for authentication:

![auth-flow](./img/client-auth.png)

The client configuration is shown at the bottom of the cluster detail view. Create a new client and all necessary information is displayed.

For the `Client Id` and `Client Secret`, a client application can request an access token at the authentication URL (steps 1 and 2). The access token is necessary to interact with Zeebe in the cloud (step 3).

:::note
Access tokens have a validity period that can be found in the access token. After this time, a new access token must be requested.
:::

:::note
The auth service has a built-in rate limit. If too many token requests are executed in a short time, the client is blocked for a certain time. Since the access tokens have a certain validity period, they must be cached on the client side.

The officially offered client libraries (as well as the Node.js client) have already integrated with the auth routine, handle obtaining and refreshing an access token, and make use of a local cache.
:::

### Create a client

To create a client, take the following steps:

1. Navigate into the **API** tab.

![cluster-details](img/cluster-detail-clients.png)

1. Click **Create new client** to create a new client and name your client accordingly.

![create-client](img/cluster-details-create-client.png)

1. Ensure you keep the generated client credentials in a safe place. The **client secret** will not be shown again. For your convenience, you can also download the client information to your computer.

![created-client](img/cluster-details-created-client.png)

The downloaded file contains all necessary information to communicate with your Zeebe instance in the future:

- `ZEEBE_ADDRESS`: Address where your cluster can be reached.
- `ZEEBE_CLIENT_ID` and `ZEEBE_CLIENT_SECRET`: Credentials to request a new access token.
- `ZEEBE_AUTHORIZATION_SERVER_URL`: A new token can be requested at this address.
- `ZEEBE_TOKEN_AUDIENCE`: The audience for a Zeebe token request.
- `CAMUNDA_CLUSTER_ID`: The UUID of the cluster.
- `CAMUNDA_CLUSTER_REGION`: The region of the cluster.
- `CAMUNDA_CREDENTIALS_SCOPES`: A comma-separated list of the scopes this credential set is valid for.
- `CAMUNDA_OAUTH_URL`: A new token can be requested at this address using the credentials. Duplicates the earlier Zeebe-focused variable.

Depending on the scopes granted to these client credentials, the following variables may also be present:

- `CAMUNDA_TASKLIST_BASE_URL`: The base URL for the Tasklist API.
- `CAMUNDA_OPTIMIZE_BASE_URL`: The base URL for the Optimize API.
- `CAMUNDA_OPERATE_BASE_URL`: The base URL for the Operate API.
