# Compilable usage examples for tenant management operations.
# These examples are type-checked during build to guard against API regressions.
from __future__ import annotations

from camunda_orchestration_sdk import (
    CamundaClient,
    MappingRuleSearchQueryRequest,
    RoleSearchQueryRequest,
    TenantCreateRequest,
    TenantGroupSearchQueryRequest,
    TenantId,
    TenantSearchQueryRequest,
    TenantUpdateRequest,
    Unset,
    Username,
)


# region CreateTenant
def create_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    result = client.create_tenant(
        data=TenantCreateRequest(
            tenant_id=tenant_id,
            name="Acme Corporation",
        ),
    )

    print(f"Tenant: {result.tenant_id}")
# endregion CreateTenant


# region GetTenant
def get_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    result = client.get_tenant(tenant_id=tenant_id)

    print(f"Tenant: {result.name}")
# endregion GetTenant


# region SearchTenants
def search_tenants_example() -> None:
    client = CamundaClient()

    result = client.search_tenants(
        data=TenantSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for tenant in result.items:
            print(f"Tenant: {tenant.name}")
# endregion SearchTenants


# region UpdateTenant
def update_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    client.update_tenant(
        tenant_id=tenant_id,
        data=TenantUpdateRequest(name="Acme Corp International"),
    )
# endregion UpdateTenant


# region DeleteTenant
def delete_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    client.delete_tenant(tenant_id=tenant_id)
# endregion DeleteTenant


# region AssignUserToTenant
def assign_user_to_tenant_example(tenant_id: TenantId, username: Username) -> None:
    client = CamundaClient()

    client.assign_user_to_tenant(
        tenant_id=tenant_id,
        username=username,
    )
# endregion AssignUserToTenant


# region UnassignUserFromTenant
def unassign_user_from_tenant_example(tenant_id: TenantId, username: Username) -> None:
    client = CamundaClient()

    client.unassign_user_from_tenant(
        tenant_id=tenant_id,
        username=username,
    )
# endregion UnassignUserFromTenant


# region AssignGroupToTenant
def assign_group_to_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    client.assign_group_to_tenant(
        tenant_id=tenant_id,
        group_id="engineering",
    )
# endregion AssignGroupToTenant


# region UnassignGroupFromTenant
def unassign_group_from_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    client.unassign_group_from_tenant(
        tenant_id=tenant_id,
        group_id="engineering",
    )
# endregion UnassignGroupFromTenant


# region AssignRoleToTenant
def assign_role_to_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    client.assign_role_to_tenant(
        tenant_id=tenant_id,
        role_id="developer",
    )
# endregion AssignRoleToTenant


# region UnassignRoleFromTenant
def unassign_role_from_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    client.unassign_role_from_tenant(
        tenant_id=tenant_id,
        role_id="developer",
    )
# endregion UnassignRoleFromTenant


# region AssignClientToTenant
def assign_client_to_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    client.assign_client_to_tenant(
        tenant_id=tenant_id,
        client_id="my-service-account",
    )
# endregion AssignClientToTenant


# region UnassignClientFromTenant
def unassign_client_from_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    client.unassign_client_from_tenant(
        tenant_id=tenant_id,
        client_id="my-service-account",
    )
# endregion UnassignClientFromTenant


# region AssignMappingRuleToTenant
def assign_mapping_rule_to_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    client.assign_mapping_rule_to_tenant(
        tenant_id=tenant_id,
        mapping_rule_id="rule-123",
    )
# endregion AssignMappingRuleToTenant


# region UnassignMappingRuleFromTenant
def unassign_mapping_rule_from_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    client.unassign_mapping_rule_from_tenant(
        tenant_id=tenant_id,
        mapping_rule_id="rule-123",
    )
# endregion UnassignMappingRuleFromTenant


# region SearchUsersForTenant
def search_users_for_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    result = client.search_users_for_tenant(
        tenant_id=tenant_id,
    )

    if not isinstance(result.items, Unset):
        for user in result.items:
            print(f"User: {user.username}")
# endregion SearchUsersForTenant


# region SearchClientsForTenant
def search_clients_for_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    result = client.search_clients_for_tenant(
        tenant_id=tenant_id,
    )

    if not isinstance(result.items, Unset):
        for c in result.items:
            print(f"Client: {c.client_id}")
# endregion SearchClientsForTenant


# region SearchGroupIdsForTenant
def search_group_ids_for_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    result = client.search_group_ids_for_tenant(
        tenant_id=tenant_id,
        data=TenantGroupSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for group in result.items:
            print(f"Group: {group.group_id}")
# endregion SearchGroupIdsForTenant


# region SearchRolesForTenant
def search_roles_for_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    result = client.search_roles_for_tenant(
        tenant_id=tenant_id,
        data=RoleSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for role in result.items:
            print(f"Role: {role.name}")
# endregion SearchRolesForTenant


# region SearchMappingRulesForTenant
def search_mapping_rules_for_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    result = client.search_mapping_rules_for_tenant(
        tenant_id=tenant_id,
        data=MappingRuleSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for rule in result.items:
            print(f"Mapping rule: {rule.mapping_rule_id}")
# endregion SearchMappingRulesForTenant
