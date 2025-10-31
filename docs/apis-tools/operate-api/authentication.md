---
id: operate-api-authentication
title: Authentication
description: "Authentication requirements for accessing the Operate REST API."
---

:::warning
The Operate REST API is **deprecated**. While it continues to function, new development should use the Orchestration Cluster REST API by referencing the [Orchestration Cluster REST API migration documentation](/apis-tools/migration-manuals/migrate-to-camunda-api.md).
:::

Operate uses the same authentication mechanism as the [Orchestration Cluster REST API](../orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md).

If your environment uses **OIDC-based authentication**, obtain an access token following [Using a token (OIDC/JWT)](../orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md#using-a-token-oidcjwt).

If **no authentication is configured** (for example, for local development), see [No authentication (local development)](../orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md#no-authentication-local-development).

When making requests to Operate, replace the base URL used in examples with your Operate API URL.

Example:

```bash
curl -X GET "$OPERATE_BASE_URL/v1/process-definitions" \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

A successful response returns matching process instances.

## Learn more

- [Identity and access management](/components/concepts/access-control/access-control-overview.md)
- [OIDC setup (Self-Managed)](/self-managed/components/orchestration-cluster/identity/connect-external-identity-provider.md)
- [API client setup (SaaS)](/components/console/manage-clusters/manage-api-clients.md#create-a-client)
