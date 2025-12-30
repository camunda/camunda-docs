---
id: zeebe-api-rest-authentication
title: "Authentication"
description: "Learn about Authentication including key features, configuration, and implementation details. This guide provides detailed information for your deployment."
---

:::warning
The Zeebe REST API is **deprecated**. While it continues to function, new development should use the Orchestration Cluster REST API by referencing the [Orchestration Cluster REST API migration documentation](/apis-tools/migration-manuals/migrate-to-camunda-api.md).
:::

The Zeebe REST API uses the same authentication mechanism as the [Orchestration Cluster REST API](../orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md).

If your environment uses **OIDC-based authentication**, obtain an access token following [Using a token (OIDC/JWT)](../orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md#using-a-token-oidcjwt).

If **no authentication is configured** (for example, for local development), see [No authentication (local development)](../orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md#no-authentication-local-development).

When making requests to Zeebe, replace the base URL used in examples with your Zeebe API URL.

Example:

```bash
curl -X POST "$ZEEBE_BASE_URL/v1/process-instances" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"bpmnProcessId": "order-process", "variables": {"orderId": "12345"}}'
```

#### Token expiration

Access tokens expire according to the `expires_in` property of a successful authentication response. After this duration, in seconds, you must request a new access token.
