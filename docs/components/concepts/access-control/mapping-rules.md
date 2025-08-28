---
id: mapping-rules
title: "Mapping rules"
sidebar_label: "Mapping rules"
description: "Map authentication entities from your Identity provider to Camunda-specific entities using mapping rules."
---

Mapping rules are used to dynamically manage access control in Camunda by [connecting your Identity Provider](connect-to-identity-provider.md) and assigning claims from a JWT access token to [Orchestration Cluster Identity](../../identity/identity-introduction.md) entities.

In **Camunda 8 SaaS**, these assignments are automatically resolved based on your organization's setup.

In **Camunda 8 Self-Managed**, you can define mapping rules to assign users to [user groups](../../identity/group.md) and [roles](../../identity/role.md), grant [authorizations](../../identity/authorization.md), and associate them with specific [clients](../../identity/client.md) or [tenants](/self-managed/components/orchestration-cluster/identity/manage-tenants.md).

:::note
Mapping rules are available for Camunda 8 Self-Managed with [OIDC-based authentication](/self-managed/installation-methods/helm/configure/connect-to-an-oidc-provider.md). They do not apply to other authentication methods, such as basic authentication.
:::

A mapping rule has the following properties:

- **Claim name**: Either the name of a (nested) claim or a [JSONPath expression](https://www.rfc-editor.org/rfc/rfc9535).
- **Claim value**: The expected value of the claim. The mapping rule takes effect only if this value is matched in a JWT access token.

Using a mapping rule is a two-step process:

1. **Create the mapping rule** – This tells the Orchestration Cluster how to identify a match.
2. **Assign the mapping rule** – Apply it to a group, role, authorization, client or tenant.

:::info
To use mapping rules, you must be familiar with the structure of the JWT access tokens that your OIDC provider issues to the Orchestration Cluster clients.
:::

Assume the following payload of an access token issued by your Identity Provider (IdP):

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "isAdmin": true,
  "orggroups": ["acct", "finance"],
  "iat": 1516239022
}
```

To make any user a member of the `admin` role when they have the `isAdmin` claim set to `true`, first define a mapping rule as follows:

- **Claim name**: `isAdmin`
- **Claim value**: `true`

Then, assign the mapping rule to the `admin` role.

To make any member of the organizational group `acct` a member of the Orchestration Cluster group `accounting`, define a mapping rule as follows:

- **Claim name**: `orggroups`
- **Claim value**: `acct`

Then, assign the mapping rule to the `accounting` group.  
Note that in this case, the mapping rule is matching against an array of objects. Based on the JWT structure, a mapping rule claim value is matched using `equals` or `in` semantics.

To learn more about how to configure mapping rules via the UI, see the Identity guide on [managing mapping rules](/self-managed/components/management-identity/mapping-rules.md).  
To learn how to create mapping rules via API, see the [mapping rules API reference](/apis-tools/orchestration-cluster-api-rest/specifications/create-mapping-rule.api.mdx).
