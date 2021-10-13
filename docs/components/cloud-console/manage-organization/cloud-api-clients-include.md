---
---

To interact with Camunda Cloud programmatically without using the Camunda Cloud UI, you can create Cloud Management API clients.

You can manage clients in the organization management under the **Cloud Management API** tab.

A client can have one or multiple of the following permissions:

- **Get clusters**: Retrieve information of all clusters of the organization.
- **Create clusters**: Create a cluster for the organization.
- **Delete clusters**: Delete a cluster for the organization.
- **Get Zeebe clients**: Retrieve all Zeebe clients of the organization.
- **Create Zeebe clients**: Create a Zeebe client for a cluster of the organization.
- **Delete Zeebe clients**: Delete a Zeebe client of a cluster owned by the organization.

:::note
After a Cloud Management API client is created, the `Client Secret` is only shown once! You can also download a script that requests an access token with your credentials.
:::

To retrieve an access token for the Cloud Management API client, execute the following command:

```bash
curl --header "Content-Type: application/json" \
    --request POST \
    --data '{"grant_type":"client_credentials", "audience":"api.cloud.camunda.io", "client_id":"XXX", "client_secret":"YYY"}' \
    https://login.cloud.camunda.io/oauth/token
```

:::note
Access tokens have a validity period that can be found in the access token. Afterwards, a new access token must be requested.
:::

:::note
The auth service has built-in rate limiting. If too many token requests are executed in a short time, the client is blocked for a certain time. Since the access tokens have a certain validity period, they must be cached on the client side.
:::
