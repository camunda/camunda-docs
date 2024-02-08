---
id: generating-m2m-tokens
title: "Generating machine-to-machine tokens"
sidebar_label: "Generating machine-to-machine (M2M) tokens"
description: "In this guide, we'll show you how to generate your own machine-to-machine (M2M) tokens."
---

A **machine-to-machine (M2M)** token is a token requested by one application so it can
communicate with another application acting as itself.

In [Identity](/self-managed/identity/what-is-identity.md), we provide the ability to assign permissions to an application. This allows an application to perform requests to other applications without the need for user intervention. The token generated can then be used to communicate with other applications in Camunda 8 without
the need for user intervention.

In this guide, we'll show you how to generate your own **machine-to-machine (M2M)** tokens.

## Prerequisites

- A running [Identity](/self-managed/identity/what-is-identity.md) service
- An [application](/self-managed/concepts/access-control/applications.md) for your service
- The client ID of your application
- The client secret of your application
- A REST client of your choice

## Generate token

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
