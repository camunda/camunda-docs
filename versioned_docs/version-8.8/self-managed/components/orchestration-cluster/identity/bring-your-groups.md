---
id: bring-your-groups
title: Bring your own groups
description: Use groups from your external OIDC Identity Provider for authorization, role, and tenant assignment in Camunda 8 Self-Managed.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

When Camunda 8 Self-Managed is configured with OpenID Connect (OIDC), the Orchestration Cluster can read a configurable claim from each token and treat its values as Camunda group IDs. This lets you use groups that already exist in your Identity Provider (IdP) as the basis for Camunda's authorization, role, and tenant assignment.

:::note This feature is Self-Managed only.
Bring your own groups is not available in Camunda 8 SaaS.
:::

## When to use this

Use bring your own groups when:

- Your IdP is already the source of truth for user-to-group membership.
- You want a single place to manage group membership for both sign-in and Camunda authorization.
- You need group-based authorization in Camunda but do not want to duplicate group data between your IdP and Camunda.

Do not use it when:

- You need to manage groups through the Orchestration Cluster REST API or Identity UI.
- You need Camunda to list or browse IdP-managed groups.
- You are running Camunda 8 SaaS.

## Prerequisites

- A Self-Managed Camunda 8 deployment running 8.8 or later.
- OIDC authentication configured for the Orchestration Cluster. See [Connect to an external Identity Provider](./connect-external-identity-provider.md).
- An IdP that can include a groups claim in the issued ID or access token. The claim value must be a JSON array of strings, where each string is a group ID.

## Configure the groups claim

Set `camunda.security.authentication.oidc.groups-claim` to the name of the claim that contains the user's groups. The claim value must be a JSON array of strings, where each entry is a group ID.

For nested claims, use a [JSONPath expression](https://www.rfc-editor.org/rfc/rfc9535.html) — the same mechanism used by `username-claim`. For example, `$['camundaorg']['groups']` resolves to the `groups` array inside a nested `camundaorg` object.

<Tabs groupId="optionsType" defaultValue="yaml" queryString values={[{label: 'Application.yaml', value: 'yaml' }, {label: 'Environment variables', value: 'env' }]}>
<TabItem value="yaml">

```yaml
camunda.security.authentication.oidc.groups-claim: <YOUR_GROUPS_CLAIM>
```

</TabItem>
<TabItem value="env">

```
CAMUNDA_SECURITY_AUTHENTICATION_OIDC_GROUPSCLAIM=<YOUR_GROUPS_CLAIM>
```

</TabItem>
</Tabs>

See the [`groupsClaim` configuration reference](../core-settings/configuration/properties.md) for the full property definition. For multi-IdP setups where each provider may use a different claim name, see [Connect multiple Identity Providers](./connect-multiple-identity-providers.md).

## Use IdP groups in Camunda

Once `groups-claim` is set, the group IDs extracted from each token can be used anywhere a Camunda group ID can be used. The group ID in the token and the Camunda-side group ID must match **exactly**: comparisons are case-sensitive and treat group IDs as opaque strings.

### Role assignment

Assign IdP groups to Camunda roles to grant every member of that group the role's permissions on sign-in. See [Assign users, clients, groups, or mapping rules to roles via configuration](./overview.md#assign-users-clients-groups-or-mapping-rules-to-roles-via-configuration).

### Authorizations

Grant authorizations directly to IdP groups to control access to Camunda resources such as process definitions, decisions, or tenants. See [Authorizations](../../../../components/concepts/access-control/authorizations.md).

### Tenant assignment

Add IdP groups to tenants so that every member of that group gains access to the tenant. See [Tenants](../../../../components/identity/tenant.md).

## Limitations and behavior

- **Self-Managed only.** The feature is not available in Camunda 8 SaaS.
- **No group sync or listing.** Groups exist only at the moment a token is evaluated. They are not persisted in Camunda and are not browsable in the Identity UI or the REST API.
- **REST group management is disabled while the claim is set.** When `groups-claim` is set, the `/v2/groups/**` endpoints return HTTP 404. This is a hard switch, not a merge — you cannot manage some groups via REST and others via the claim at the same time.
- **Per-token evaluation.** Group membership is re-read from every token. Changes in your IdP take effect on the next sign-in or token refresh; they do not propagate to already-active sessions.
- **Array shape required.** The claim value must always be a JSON array, even for users who belong to a single group.
- **Clients use the same claim.** Machine-to-machine tokens resolve their groups through the same `groups-claim` configuration as user tokens.

## Troubleshooting

If groups from your IdP are not being applied in Camunda, check the following:

- **The claim is present in the issued token.** Decode an ID or access token for a user who should have the groups and verify the claim appears with the expected array value. Your IdP may require explicit scope or claim-mapping configuration to include it.
- **JSONPath matches the actual structure.** If your groups claim is nested, make sure the JSONPath expression in `groups-claim` resolves to the array itself, not its parent object.
- **Group IDs match exactly.** Camunda matches group IDs as literal strings. A trailing space, different case, or stray prefix will cause Camunda-side assignments to silently miss.

For deeper investigation, see [Debugging authentication](./debugging-authentication.md).
