---
id: index
title: Web Modeler API (REST, beta)
description: "Web Modeler API (beta) is a REST API and provides access to Web Modeler data. Requests and responses are in JSON notation."
---

:::caution Beta Offering
The Web Modeler API is currently offered as a [beta feature](../../reference/early-access#beta). It is not recommended for production use and there is no maintenance service guaranteed.

While in beta, the API may introduce breaking changes without prior notice.

We encourage you to provide feedback via your designated support channel or the [Camunda Forum](https://forum.camunda.io/).
:::

Web Modeler provides a REST API at `/api/*`. Clients can access this API by passing a JWT access token in an authorization header `Authorization: Bearer <JWT>`.

## OpenAPI documentation

A detailed API description is available as [OpenAPI](https://www.openapis.org/) specification at [https://modeler.cloud.camunda.io/swagger-ui/index.html](https://modeler.cloud.camunda.io/swagger-ui/index.html)
for SaaS and at [http://localhost:8070/swagger-ui.html](http://localhost:8070/swagger-ui.html) for Self-Managed
installations.

## Authentication

To authenticate for the API, generate a JWT token and pass it in each request; guidance on this is provided in the following sections.

### Authentication in the cloud

1. Create client credentials by clicking **Console > Manage (Organization) > Console API > Create New Credentials**.
2. Add permissions to this client for **Web Modeler API (beta)**.
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

### Authentication for Self-Managed cluster

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

## Use JWT token

1. Take the **access_token** value from the response object and store it as your token.
2. Send the token as an authorization header in each request. In this case, call the info endpoint to validate the token.

   To use the JWT token in the cloud, use the following command:

   ```shell
   curl -o - 'https://modeler.cloud.camunda.io/api/beta/info' -H 'Authorization: Bearer eyJhb...'
   ```

   When using a Self-Managed installation, you can use the following command instead:

   ```shell
   curl -o - 'http://localhost:8070/api/beta/info' -H 'Authorization: Bearer eyJhb...'
   ```

3. You will get something like the following:
   ```json
   {
     "version": "beta",
     "authorizedOrganization": "12345678-ABCD-DCBA-ABCD-123456789ABC",
     "createPermission": true,
     "readPermission": true,
     "updatePermission": true,
     "deletePermission": false
   }
   ```

### Limitations of Beta Version

When using Web Modeler API beta:

- You will not receive a warning when deleting a file, a folder, or a project. This is important, because deletion cannot be undone.
- You will not receive a warning about breaking call activity links or business rule task links when moving files or folders to another project.
  Breaking these links is considered harmless. The broken links can be manually removed or restored in Web Modeler. This operation is also
  reversible - simply move the files or folders back to their original location.
- You will not immediately see a new project you created via the API. This is because the project has no collaborators. To remedy this, the
  org owner can activate [super-user mode](../../components/modeler/web-modeler/collaboration/#super-user-mode) and assign collaborators.

## FAQ

### What is the difference between _simplePath_ and _canonicalPath_?

In Web Modeler you can have multiple files with the same name, multiple folders with the same name, and even multiple projects with the same name. Internally, duplicate names are disambiguated by unique ids.

The API gives you access to the names, as well as the ids. For example, when requesting a file you will get the following information:

- **simplePath** contains the human-readable path. This path may be ambiguous or may have ambiguous elements (e.g. folders) in it.
- **canonicalPath** contains the unique path. It is a list of **PathElementDto** objects which contain the id and the name of the element.

Internally, the ids are what matters. You can rename files or move files between folders and projects and the id will stay the same.
