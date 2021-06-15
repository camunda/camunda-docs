---
id: manage-api-clients
title: Manage API clients
---

To be able to interact with Zeebe in the cloud from the outside, every client application must authenticate itself. An OAuth Flow is used for authentication, which is shown below:

![auth-flow](./img/client-auth.png)

The client configuration is shown at the bottom of the cluster detail view. Create a new client and all necessary information is displayed.

With the `Client Id` and `Client Secret`, a client application can request an access token at the authentication URL (steps 1 and 2). The access token is necessary to interact with Zeebe in the cloud (step 3).

Please note:

- Access tokens have a validity period that can be found in the access token. After this time a new access token must be requested.
- The auth service has a built-in rate limiting. If too many token requests are executed in a short time, the client is blocked for a certain time. Since the access tokens have a certain validity period, they must be cached on the client side.

The officially offered client libraries (as well as the node client) have already integrated the auth routine and take care of obtaining and refreshing an access token and make use of a local cache.

import CreateClient from '../../../guides/getting-started/create-client-include.md'

<CreateClient/>
