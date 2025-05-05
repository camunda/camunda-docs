---
id: authentication
title: "Authentication"
sidebar_label: "Authentication"
description: "Learn how Identity authenticates users or clients via log-in screen or M2M tokens."
---

Based on your [configuration](/self-managed/identity/configuration/identity-configuration-overview.md), Users and Applications interacting with Camunda 8 will authentication via the respective IdP, either by using a log-in page or by using [M2M tokens](#m2m-machine-to-machine-authentication).

## Log-in page authentication

Identity will show the log-in page by the respective IdP to your users.

## M2M (machine-to-machine) authentication

### Prerequisites

- A running [Identity](/self-managed/identity/what-is-identity.md) service
- An [application](/self-managed/identity/application-user-group-role-management/applications.md) for your service
- The client ID of your application
- The client secret of your application
- A REST client of your choice

### Generate token

In our example, the Keycloak instance that supports Identity can be found via `http://localhost:18080`.
This may be different for you, so adjust the host name (and port if required) as appropriate.

To request a token, use the following cURL command replacing the placeholders with your applications
details:

```
curl --location --request POST 'http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id=[CLIENT_ID]' \
--data-urlencode 'client_secret=[CLIENT_SECRET]' \
--data-urlencode 'grant_type=client_credentials'
```
