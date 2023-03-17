---
id: api
title: API access
description: "Details on accessing the API (beta) of Web Modeler Self-Managed. Learn more about OpenAPI documentation, authentication, and JWT tokens."
---

:::caution Beta Offering
Web Modeler Self-Managed API is currently offered as a [beta release](../../../../reference/early-access#beta)
with limited availability for enterprise customers only. It is not recommended for production use and there is no maintenance service guaranteed.

Special [terms and conditions](https://camunda.com/legal/terms/camunda-platform/camunda-platform-8-self-managed/) apply.

While in beta, the API may introduce breaking changes without prior notice.

However, we encourage you to provide feedback via your designated support channel or the [Camunda Forum](https://forum.camunda.io/).
:::

Web Modeler provides a [REST API](../../../../apis-tools/web-modeler-api/) at `/api/*`. Clients can access this API by passing a JWT access token in an authorization header `Authorization: Bearer <JWT>`.

## OpenAPI documentation

A detailed API description is available as [OpenAPI](https://www.openapis.org/) specification at [http://localhost:8070/swagger-ui.html](http://localhost:8070/swagger-ui.html).

## Authentication

To authenticate for the API, generate a JWT token and pass it in each request; guidance on this is provided in the following sections.

### Obtain JWT token

**Example:**

1. [Add an M2M application in Identity](../../../identity/user-guide/adding-an-application/).
2. [Add permissions to this application](../../../identity/user-guide/assigning-a-permission-to-an-application/) for **Web Modeler API (beta)**.
3. [Generate a token](../../../identity/user-guide/generating-m2m-tokens/) to access the REST API. You will need the `client_id` and `client_secret` from the Identity application you created.
   ```shell
   curl --location --request POST 'http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token' \
   --header 'Content-Type: application/x-www-form-urlencoded' \
   --data-urlencode 'client_id=<client id>' \
   --data-urlencode 'client_secret=<client_secret>' \
   --data-urlencode 'grant_type=client_credentials'
   ```
4. You will get something like the following:
   ```json
   {
     "access_token": "eyJhbG...",
     "expires_in": 300,
     "refresh_expires_in": 0,
     "token_type": "Bearer",
     "not-before-policy": 0
   }
   ```

### Use JWT token

1. Take the **access_token** value from the response object and store it as your token.
2. Send the token as an authorization header in each request. In this case, call the info endpoint to validate the token.
   ```shell
   curl -o - 'http://localhost:8070/api/beta/info' -H 'Authorization: Bearer eyJhb...'
   ```
3. You will get something like the following:
   ```json
   {
     "version": "beta",
     "authorizedOrganization": "00000000-0000-0000-0000-000000000000",
     "createPermission": true,
     "readPermission": true,
     "updatePermission": true,
     "deletePermission": false
   }
   ```
