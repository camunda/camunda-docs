---
id: authentication
title: "Authentication"
sidebar_label: "Authentication"
description: "Learn how Identity authenticates users or clients via log-in screen or M2M tokens."
---

Depending on your [configuration](/self-managed/identity/configuration/identity-configuration-overview.md), users and applications authenticate with Camunda 8 via the IdP using the [OAuth 2.0 protocol](https://oauth.net/2/), using either a login page or [M2M tokens](#m2m-machine-to-machine-authentication).

## Login page authentication

When a user accesses a Camunda 8 web application, they are shown the login page provided by the configured IdP.

## M2M (machine-to-machine) authentication

Applications can authenticate with Camunda 8 using M2M (machine-to-machine) tokens.

### Prerequisites

The following prerequisites are required for M2M authentication:

| Prerequisite                                                                                 | Description                            |
| :------------------------------------------------------------------------------------------- | :------------------------------------- |
| [Identity](/self-managed/components/management-identity/what-is-identity.md)                 | A running Identity service.            |
| [Application](/self-managed/identity/application-user-group-role-management/applications.md) | An application for your service.       |
| Client ID                                                                                    | The client ID of your application.     |
| Client secret                                                                                | The client secret of your application. |
| REST client                                                                                  | A REST client of your choice.          |

### Generate a token

In the following example, the Keycloak instance that supports Identity can be found via `http://localhost:18080`. This might be different for your Identity configuration, adjust the host name (and port if required) if required.

To request a token, use the following cURL command, replacing the placeholders with your application details:

```
curl --location --request POST 'http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id=[CLIENT_ID]' \
--data-urlencode 'client_secret=[CLIENT_SECRET]' \
--data-urlencode 'grant_type=client_credentials'
```

The following shows an example successful authentication response:

```
{
  "access_token": "<TOKEN>",
  "expires_in": 300,
  "refresh_expires_in": 0,
  "token_type": "Bearer",
  "not-before-policy": 0
}
```

You can use the token to authenticate an application with Camunda components, for example to access Operate REST APIs.
