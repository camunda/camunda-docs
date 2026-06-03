# Compilable usage examples for role management operations.
# These examples are type-checked during build to guard against API regressions.
from __future__ import annotations

from camunda_orchestration_sdk import (
    CamundaClient,
    MappingRuleSearchQueryRequest,
    RoleCreateRequest,
    RoleGroupSearchQueryRequest,
    RoleSearchQueryRequest,
    RoleUpdateRequest,
    Unset,
    Username,
)


# region CreateRole
def create_role_example() -> None:
    client = CamundaClient()

    result = client.create_role(
        data=RoleCreateRequest(role_id="developer", name="Developer"),
    )

    print(f"Role: {result.role_id}")
# endregion CreateRole


# region GetRole
def get_role_example() -> None:
    client = CamundaClient()

    result = client.get_role(role_id="developer")

    print(f"Role: {result.name}")
# endregion GetRole


# region SearchRoles
def search_roles_example() -> None:
    client = CamundaClient()

    result = client.search_roles(
        data=RoleSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for role in result.items:
            print(f"Role: {role.name}")
# endregion SearchRoles


# region UpdateRole
def update_role_example() -> None:
    client = CamundaClient()

    client.update_role(
        role_id="developer",
        data=RoleUpdateRequest(name="senior-developer"),
    )
# endregion UpdateRole


# region DeleteRole
def delete_role_example() -> None:
    client = CamundaClient()

    client.delete_role(role_id="developer")
# endregion DeleteRole


# region AssignRoleToUser
def assign_role_to_user_example(username: Username) -> None:
    client = CamundaClient()

    client.assign_role_to_user(
        role_id="developer",
        username=username,
    )
# endregion AssignRoleToUser


# region UnassignRoleFromUser
def unassign_role_from_user_example(username: Username) -> None:
    client = CamundaClient()

    client.unassign_role_from_user(
        role_id="developer",
        username=username,
    )
# endregion UnassignRoleFromUser


# region AssignRoleToGroup
def assign_role_to_group_example() -> None:
    client = CamundaClient()

    client.assign_role_to_group(
        role_id="developer",
        group_id="engineering",
    )
# endregion AssignRoleToGroup


# region UnassignRoleFromGroup
def unassign_role_from_group_example() -> None:
    client = CamundaClient()

    client.unassign_role_from_group(
        role_id="developer",
        group_id="engineering",
    )
# endregion UnassignRoleFromGroup


# region AssignRoleToClient
def assign_role_to_client_example() -> None:
    client = CamundaClient()

    client.assign_role_to_client(
        role_id="developer",
        client_id="my-service-account",
    )
# endregion AssignRoleToClient


# region UnassignRoleFromClient
def unassign_role_from_client_example() -> None:
    client = CamundaClient()

    client.unassign_role_from_client(
        role_id="developer",
        client_id="my-service-account",
    )
# endregion UnassignRoleFromClient


# region AssignRoleToMappingRule
def assign_role_to_mapping_rule_example() -> None:
    client = CamundaClient()

    client.assign_role_to_mapping_rule(
        role_id="developer",
        mapping_rule_id="rule-123",
    )
# endregion AssignRoleToMappingRule


# region UnassignRoleFromMappingRule
def unassign_role_from_mapping_rule_example() -> None:
    client = CamundaClient()

    client.unassign_role_from_mapping_rule(
        role_id="developer",
        mapping_rule_id="rule-123",
    )
# endregion UnassignRoleFromMappingRule


# region SearchUsersForRole
def search_users_for_role_example() -> None:
    client = CamundaClient()

    result = client.search_users_for_role(
        role_id="developer",
    )

    if not isinstance(result.items, Unset):
        for user in result.items:
            print(f"User: {user.username}")
# endregion SearchUsersForRole


# region SearchGroupsForRole
def search_groups_for_role_example() -> None:
    client = CamundaClient()

    result = client.search_groups_for_role(
        role_id="developer",
        data=RoleGroupSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for group in result.items:
            print(f"Group: {group.group_id}")
# endregion SearchGroupsForRole


# region SearchClientsForRole
def search_clients_for_role_example() -> None:
    client = CamundaClient()

    result = client.search_clients_for_role(
        role_id="developer",
    )

    if not isinstance(result.items, Unset):
        for c in result.items:
            print(f"Client: {c.client_id}")
# endregion SearchClientsForRole


# region SearchMappingRulesForRole
def search_mapping_rules_for_role_example() -> None:
    client = CamundaClient()

    result = client.search_mapping_rules_for_role(
        role_id="developer",
        data=MappingRuleSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for rule in result.items:
            print(f"Mapping rule: {rule.mapping_rule_id}")
# endregion SearchMappingRulesForRole
