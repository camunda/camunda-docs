---
id: index
title: Web Modeler API (REST, beta)
description: "Web Modeler API (beta) is a REST API and provides access to Web Modeler data. Requests and responses are in JSON notation."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

:::caution Beta Offering
In Web Modeler 8.2, the Web Modeler API is offered as an [alpha feature](/reference/alpha-features.md).
It is not recommended for production use and there is no maintenance service guaranteed.

Consider upgrading to Web Modeler API `v1` released with Web Modeler 8.3, see [Web Modeler API](#migrating-from-beta-to-v1).
The beta API will be removed in Web Modeler 8.5.
:::

Web Modeler provides a REST API at `/api/*`. Clients can access this API by passing a JWT access token in an authorization header `Authorization: Bearer <JWT>`.

## OpenAPI documentation

A detailed API description is available as [OpenAPI](https://www.openapis.org/) specification at [https://modeler.cloud.camunda.io/swagger-ui/index.html](https://modeler.cloud.camunda.io/swagger-ui/index.html)
for SaaS and at [http://localhost:8070/swagger-ui.html](http://localhost:8070/swagger-ui.html) for Self-Managed
installations.

## Authentication

To authenticate for the API, generate a JWT token depending on your environment and pass it in each request:

<Tabs groupId="authentication" defaultValue="saas" queryString values={
[
{label: 'SaaS', value: 'saas' },
{label: 'Self-Managed', value: 'self-managed' },
]}>

<TabItem value='saas'>

1. Create client credentials by clicking **Console > Manage (Organization) > Console API > Create New Credentials**.
2. Add permissions to this client for **Web Modeler API**.
3. After creating the client, you can download a shell script to obtain a token.
4. When you run it, you will get something like the following:
   ```json
   {
     "access_token": "eyJhbG...",
     "expires_in": 300,
     "refresh_expires_in": 0,
     "token_type": "Bearer",
     "not-before-policy": 0
   }
   ```

</TabItem>

<TabItem value='self-managed'>

1. [Add an M2M application in Identity](/self-managed/identity/user-guide/additional-features/incorporate-applications.md).
2. [Add permissions to this application](/self-managed/identity/user-guide/additional-features/incorporate-applications.md) for **Web Modeler API (beta)**.
3. [Generate a token](/self-managed/identity/user-guide/authorizations/generating-m2m-tokens.md) to access the REST API. You will need the `client_id` and `client_secret` from the Identity application you created.
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

</TabItem>

</Tabs>

## Example usage

1. Take the **access_token** value from the response object and store it as your token.
2. Send the token as an authorization header in each request. In this case, call the Web Modeler endpoint to validate the token.

   To use the JWT token in the cloud, use the following command:

   ```shell
   curl -o - 'https://modeler.cloud.camunda.io/api/v1/info' -H 'Authorization: Bearer eyJhb...'
   ```

   When using a Self-Managed installation, you can use the following command instead:

   ```shell
   curl -o - 'http://localhost:8070/api/beta/info' -H 'Authorization: Bearer eyJhb...'
   ```

   For Self-Managed, the Web Modeler API is currently offered as an [alpha feature](/reference/alpha-features.md).

3. You will get something like the following:
   ```json
   {
     "authorizedOrganization": "12345678-ABCD-DCBA-ABCD-123456789ABC",
     "createPermission": true,
     "readPermission": true,
     "updatePermission": true,
     "deletePermission": false
   }
   ```

## Limitations

When using Web Modeler API:

- You will not receive a warning when deleting a file, a folder, or a project.
  This is important, because deletion cannot be undone.
- You will not receive a warning about breaking call activity links or business rule task links when moving files or folders to another project.
  Breaking these links is considered harmless. The broken links can be manually removed or restored in Web Modeler. This operation is also
  reversible - simply move the files or folders back to their original location.
- In Self-Managed, you will not be able to see a new project you created via the API in the UI.
  This is because the project has no collaborators.

## Rate Limiting

In SaaS, the Web Modeler API uses rate limiting to control traffic.
The limit is 240 requests per minute.
Surpassing this limit will result into a `HTTP 429 Too Many Requests` response.

On Self-Managed instances no limits are enforced.

## FAQ

### What is the difference between _simplePath_ and _canonicalPath_?

In Web Modeler you can have multiple files with the same name, multiple folders with the same name, and even multiple projects with the same name. Internally, duplicate names are disambiguated by unique ids.

The API gives you access to the names, as well as the ids. For example, when requesting a file you will get the following information:

- **simplePath** contains the human-readable path. This path may be ambiguous or may have ambiguous elements (e.g. folders) in it.
- **canonicalPath** contains the unique path. It is a list of **PathElementDto** objects which contain the id and the name of the element.

Internally, the ids are what matters. You can rename files or move files between folders and projects and the id will stay the same.

### How do I migrate from the `beta` API to the `v1` API? {#migrating-from-beta-to-v1}

Web Modeler's stable `v1` API is offered starting from Web Modeler 8.3.
For migration hints, see the [Web Modeler 8.3 API documentation](../../../../docs/apis-tools/web-modeler-api/index.md#migrating-from-beta-to-v1).
