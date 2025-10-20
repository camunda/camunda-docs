---
id: tasklist-api-rest-authentication
title: Authentication
sidebar_position: 2
description: "Authenticate API requests to the Tasklist REST API."
---

All Tasklist REST API requests require authentication. To authenticate, generate a [JSON Web Token (JWT)](https://jwt.io/introduction/) or use Basic Auth if your environment allows.

See [Identity and access management](/components/concepts/access-control/access-control-overview.md) for a full overview of authentication vs. authorization.

## Using Basic Auth

Basic authentication uses a username and password. Include credentials in each request:

```shell
curl --user username:password \
   --request POST ${CAMUNDA_TASKLIST_BASE_URL}/v1/tasks/search \
   --header 'Content-Type: application/json' \
   --data-raw '{}'
```

:::note
Basic Auth is typically used only for local development or Self-Managed Helm deployments. It is not recommended for production SaaS environments.
:::

## Using a token (OIDC/JWT)

If your environment uses OIDC-based authentication, include the token in the `Authorization` header:

```shell
curl --request POST ${CAMUNDA_TASKLIST_BASE_URL}/v1/tasks/search \
   --header "Authorization: Bearer ${TOKEN}" \
   --header 'Content-Type: application/json' \
   --data-raw '{}'
```

A successful response returns matching task objects.

## Learn more

- [Identity and access management](/components/concepts/access-control/access-control-overview.md)
- [OIDC setup (Self-Managed)](/self-managed/components/orchestration-cluster/identity/connect-external-identity-provider.md)
- [API client setup (SaaS)](/components/console/manage-clusters/manage-api-clients.md#create-a-client)
