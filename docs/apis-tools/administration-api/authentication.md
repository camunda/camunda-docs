---
id: authentication
title: Authentication
slug: /apis-tools/administration-api/authentication
sidebar_position: 2
description: "Learn about access tokens and client credentials and scopes to get started with the Administration API."
---

To access the API endpoint, you need an access token. Your client must send a header in each request:

`Authorization: Bearer <Token>`

For example, send a request using _curl_:

```shell
curl -X POST -H -H :accept: application/json" -H "Authorization: Bearer <TOKEN>" -d '' http://api.cloud.camunda.io/clusters
```

For all requests, include the access token in the authorization header: `authorization:Bearer ${TOKEN}`.

## Client credentials and scopes

To interact with Camunda 8 programmatically without using the Camunda 8 Console, create client credentials in the organization settings under the **Administration API** tab.

Client credentials are created for an organization, and therefore can access all Camunda 8 clusters of this organization.

Scopes define the access for client credentials. A client can have one or multiple of the following permissions:

![createConsoleApiClient](../../components/console/manage-organization/img/create-console-api-client.png)

A client can have one or multiple permissions from the following groups:

- **Cluster**: [Manage your clusters](/components/console/manage-clusters/create-cluster.md).
- **Zeebe Client**: [Manage API clients](/components/console/manage-clusters/manage-api-clients.md) for your cluster.
- **Web Modeler API**: Interact with the [Web Modeler API](/apis-tools/web-modeler-api/index.md).
- **IP allowlist**: Configure [IP allowlist](/components/console/manage-clusters/manage-ip-allowlists.md) rules.
- **Connector Secrets**: [Manage secrets](/components/console/manage-clusters/manage-secrets.md) of your clusters.
- **Members**: [Manage members](/components/console/manage-organization/manage-users.md) of your organization.
- **Backups**: Manage [backups](/components/concepts/backups.md) of your Camunda 8 clusters (only available to Enterprise customers).

The full API description can be found [here](https://console.cloud.camunda.io/customer-api/openapi/docs/#/).

:::note
After client credentials are created, the `Client Secret` is only shown once. Save this `Client Secret` somewhere safe.
:::

## Access token

Once you have your client credentials, you can retrieve an access token using the following command:

```bash
curl --header "Content-Type: application/json" \
    --request POST \
    --data '{"grant_type":"client_credentials", "audience":"api.cloud.camunda.io", "client_id":"XXX", "client_secret":"YYY"}' \
    https://login.cloud.camunda.io/oauth/token
```

:::note
Access tokens have a validity period found in the access token. After this time, a new access token must be requested.
:::

## Rate limiting

The OAuth service rate limits about one request per second for all clients with the same source IP address.

:::note
All token requests count toward the rate limit, whether they are successful or not. If any client is running with an expired or invalid API key, that client will continually make token requests. That client will therefore exceed the rate limit for that IP address, and may block valid token requests from completing.
:::

The officially offered [client libraries](/apis-tools/working-with-apis-tools.md) (as well as the Node.js and Spring clients) have already integrated with the auth routine, handle obtaining and refreshing an access token, and make use of a local cache.

If too many token requests are executed from the same source IP address in a short time, all token requests from that source IP address are blocked for a certain time. Since the access tokens have a 24-hour validity period, they must be cached on the client side, reused while still valid, and refreshed via a new token request once the validity period has expired.

When the rate limit is triggered, the client will receive an HTTP 429 response. Note the following workarounds:

- Cache the token as it is still valid for 24 hours. The official SDKs already do this by default.
- Keep the SDK up to date. We have noted issues in older versions of the Java SDK which did not correctly cache the token.
- Given the rate limit applies to clients with the same source IP address, be mindful of:
  - Unexpected clients running within your infrastructure.
  - Updating all clients to use a current API key if you delete an API key and create a new one.
