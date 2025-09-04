---
id: mapping-rules
title: "Mapping rules"
sidebar_label: "Mapping rules"
description: "Map authentication entities from your Identity Provider (IdP) to Camunda-specific entities using mapping rules."
---

Mapping rules are used to dynamically manage access control by [connecting your Identity Provider](connect-to-identity-provider.md) and mapping claims from a JWT access token to Identity entities in Camunda 8.

## Support for mapping rules in SaaS and Self-Managed

In **Camunda 8 SaaS**, mapping rules are not configurable. They are automatically applied based on your organization's setup.

In **Camunda 8 Self-Managed**, you may need to configure mapping rules in two components:

- **Orchestration Cluster Identity**: Manage permissions within an [orchestration cluster](../../orchestration-cluster.md). Use mapping rules to assign users to [user groups](../../identity/group.md) and [roles](../../identity/role.md), grant [authorizations](../../identity/authorization.md), and associate them with specific [tenants](/self-managed/components/orchestration-cluster/identity/manage-tenants.md).
  - Mapping rules are available for Orchestration Cluster Identity only when using [OIDC-based authentication](/self-managed/components/orchestration-cluster/identity/connect-external-identity-provider.md). They do not apply to other authentication methods, such as basic authentication.

- **Management Identity**: Manage access to components like [Web Modeler](/self-managed/components/modeler/web-modeler/overview.md), [Console](/self-managed/components/console/overview.md), and [Optimize](/self-managed/components/optimize/overview.md). Mapping rules in [Management Identity](/self-managed/components/management-identity/what-is-identity.md) assign users to roles and tenants, granting access to those components. To learn more, see the [guide on managing mapping rules in Management Identity](/self-managed/components/management-identity/mapping-rules.md).

## How to use mapping rules

:::info
To use mapping rules, you must be familiar with the structure of the JWT access tokens that your OIDC provider issues to clients.
:::

A mapping rule has the following properties:

- **Claim name**: The name of a (nested) claim or a [JSONPath expression](https://www.rfc-editor.org/rfc/rfc9535).
- **Claim value**: The expected value of the claim. The mapping rule takes effect only if this value is present in a JWT access token.

Using a mapping rule is a two-step process:

1. **Create the mapping rule** – Define how Camunda identifies a match between a JWT claim and the rule.
2. **Assign the mapping rule** – Apply it to a group, role, authorization, or tenant.

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

To make any user a member of the `admin` role when their `isAdmin` claim is set to `true`, first define a mapping rule as follows:

- **Claim name**: `isAdmin`
- **Claim value**: `true`

Then, assign the mapping rule to the `admin` role.

To make any member of the organizational group `acct` a member of the Orchestration Cluster group `accounting`, define a mapping rule as follows:

- **Claim name**: `orggroups`
- **Claim value**: `acct`

Then, assign the mapping rule to the `accounting` group.

:::note
In this case, the mapping rule matches against an array of objects. Depending on the JWT structure, a claim value is matched using `equals` or `in` semantics.
:::

## References

For more details on configuring mapping rules in a Self-Managed environment, see:

- [Manage mapping rules in Orchestration Cluster Identity](../../identity/mapping-rules/manage-mapping-rules.md)
- [Manage mapping rules in Management Identity](/self-managed/components/management-identity/mapping-rules.md)
- [Manage mapping rules via API](/apis-tools/orchestration-cluster-api-rest/specifications/create-mapping-rule.api.mdx)
