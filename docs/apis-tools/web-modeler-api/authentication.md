---
id: index
title: Authentication
sidebar_position: 2
description: "Web Modeler API is a REST API and provides access to Web Modeler data. Requests and responses are in JSON notation."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

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
2. [Add permissions to this application](/self-managed/identity/user-guide/additional-features/incorporate-applications.md) for **Web Modeler API**.
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
   curl -o - 'http://localhost:8070/api/v1/info' -H 'Authorization: Bearer eyJhb...'
   ```

3. You will get something like the following:
   ```json
   {
     "version": "v1",
     "authorizedOrganization": "12345678-ABCD-DCBA-ABCD-123456789ABC",
     "createPermission": true,
     "readPermission": true,
     "updatePermission": true,
     "deletePermission": false
   }
   ```
