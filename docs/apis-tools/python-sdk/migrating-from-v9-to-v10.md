---
id: migrating-from-v9-to-v10
title: Migrating from v9 to v10
sidebar_label: Migrating from v9 to v10
sidebar_position: 5
mdx:
  format: md
---

# Migrating from v9 to v10

v10 tracks Camunda 8.10. The 8.10 OpenAPI spec promotes several identifier and name fields from plain strings to **semantic types**. The SDK enforces them at construction time, so any v9 code that passes a plain `str` to these methods will need to wrap the value with the corresponding brand.

## New branded types

| Brand                 | Used for                   |
| --------------------- | -------------------------- |
| `RoleId`              | Role identifiers           |
| `GroupId`             | Group identifiers          |
| `ClientId`            | OAuth client identifiers   |
| `MappingRuleId`       | Mapping-rule identifiers   |
| `ClusterVariableName` | Cluster variable names     |
| `AgentInstanceKey`    | Agent-instance system keys |

## Migration

<!-- snippet-source: examples/readme.py | regions: V9ToV10Migration -->

```python
from camunda_orchestration_sdk import CamundaClient, GroupId, RoleId

with CamundaClient() as client:
    # v9 — plain strings were accepted:
    # client.assign_role_to_group(role_id="developer", group_id="engineering")

    # v10 — wrap with the branded type constructor at the boundary
    client.assign_role_to_group(
        role_id=RoleId("developer"),
        group_id=GroupId("engineering"),
    )
```

The brand constructors are subclasses of `str`, so the wrapped values remain valid where a `str` is expected (f-strings, logging, JSON serialisation). The wrap exists to enforce the upstream pattern and length constraints once, at the boundary, so a malformed identifier fails fast with `ValueError` instead of producing an HTTP 400 from the cluster.

## Deprecated model class renames

26 model classes were renamed in v10 to match upstream conventions. The old names continue to work with a deprecation warning and will be removed in v11. No action is required to upgrade — but updating imports is recommended.

| Old name (deprecated)                    | New name                                      |
| ---------------------------------------- | --------------------------------------------- |
| `CreateMappingRuleResponse201`           | `MappingRuleCreateResult`                     |
| `GetUserResponse200`                     | `UserResult`                                  |
| `SearchClientsForGroupData`              | `GroupClientSearchQueryRequest`               |
| `SearchClientsForGroupResponse200`       | `GroupClientSearchResult`                     |
| `SearchClientsForRoleData`               | `RoleClientSearchQueryRequest`                |
| `SearchClientsForRoleResponse200`        | `RoleClientSearchResult`                      |
| `SearchClientsForTenantData`             | `TenantClientSearchQueryRequest`              |
| `SearchClientsForTenantResponse200`      | `TenantClientSearchResult`                    |
| `SearchMappingRuleResponse200`           | `MappingRuleSearchQueryResult`                |
| `SearchMappingRulesForGroupResponse200`  | `GroupMappingRuleSearchResult`                |
| `SearchMappingRulesForRoleResponse200`   | `RoleMappingRuleSearchResult`                 |
| `SearchMappingRulesForTenantResponse200` | `TenantMappingRuleSearchResult`               |
| `SearchRolesForGroupResponse200`         | `GroupRoleSearchResult`                       |
| `SearchRolesForTenantResponse200`        | `TenantRoleSearchResult`                      |
| `SearchUserTaskEffectiveVariablesData`   | `UserTaskEffectiveVariableSearchQueryRequest` |
| `SearchUserTaskVariablesData`            | `UserTaskVariableSearchQueryRequest`          |
| `SearchUsersForGroupData`                | `GroupUserSearchQueryRequest`                 |
| `SearchUsersForGroupResponse200`         | `GroupUserSearchResult`                       |
| `SearchUsersForRoleData`                 | `RoleUserSearchQueryRequest`                  |
| `SearchUsersForRoleResponse200`          | `RoleUserSearchResult`                        |
| `SearchUsersForTenantData`               | `TenantUserSearchQueryRequest`                |
| `SearchUsersForTenantResponse200`        | `TenantUserSearchResult`                      |
| `SearchUsersResponse200`                 | `UserSearchResult`                            |
| `SearchVariablesData`                    | `VariableSearchQuery`                         |
| `UpdateMappingRuleResponse200`           | `MappingRuleUpdateResult`                     |
| `UpdateUserResponse200`                  | `UserUpdateResult`                            |

The following 3 request body classes were removed entirely (the upstream operations no longer take a request body). These cannot be aliased and are a hard break:

- `CancelProcessInstanceData`
- `DeleteDecisionInstanceData`
- `DeleteProcessInstanceData`

## What does NOT change

- The wire format is unchanged — all values are still strings on the wire.
- No method signatures changed name or arity.
- Branded values are assignable anywhere a `str` is expected, so existing string-handling code continues to work.
- Existing valid v9 values continue to satisfy the new constraints (the patterns are permissive supersets of typical identifiers).

See [`semantic_types.py`](https://github.com/camunda/orchestration-cluster-api-python/blob/main/generated/camunda_orchestration_sdk/semantic_types.py) for the canonical list of brands and their constraints.
