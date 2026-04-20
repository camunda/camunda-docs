# Compilable usage examples for group management operations.
# These examples are type-checked during build to guard against API regressions.
from __future__ import annotations

from camunda_orchestration_sdk import (
    CamundaClient,
    GroupCreateRequest,
    GroupSearchQueryRequest,
    GroupUpdateRequest,
    MappingRuleSearchQueryRequest,
    RoleSearchQueryRequest,
    Unset,
    Username,
)


# region CreateGroup
def create_group_example() -> None:
    client = CamundaClient()

    result = client.create_group(
        data=GroupCreateRequest(group_id="engineering", name="Engineering"),
    )

    print(f"Group: {result.group_id}")
# endregion CreateGroup


# region GetGroup
def get_group_example() -> None:
    client = CamundaClient()

    result = client.get_group(group_id="engineering")

    print(f"Group: {result.name}")
# endregion GetGroup


# region SearchGroups
def search_groups_example() -> None:
    client = CamundaClient()

    result = client.search_groups(
        data=GroupSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for group in result.items:
            print(f"Group: {group.name}")
# endregion SearchGroups


# region UpdateGroup
def update_group_example() -> None:
    client = CamundaClient()

    client.update_group(
        group_id="engineering",
        data=GroupUpdateRequest(name="engineering-team"),
    )
# endregion UpdateGroup


# region DeleteGroup
def delete_group_example() -> None:
    client = CamundaClient()

    client.delete_group(group_id="engineering")
# endregion DeleteGroup


# region AssignUserToGroup
def assign_user_to_group_example(username: Username) -> None:
    client = CamundaClient()

    client.assign_user_to_group(
        group_id="engineering",
        username=username,
    )
# endregion AssignUserToGroup


# region UnassignUserFromGroup
def unassign_user_from_group_example(username: Username) -> None:
    client = CamundaClient()

    client.unassign_user_from_group(
        group_id="engineering",
        username=username,
    )
# endregion UnassignUserFromGroup


# region AssignClientToGroup
def assign_client_to_group_example() -> None:
    client = CamundaClient()

    client.assign_client_to_group(
        group_id="engineering",
        client_id="my-service-account",
    )
# endregion AssignClientToGroup


# region UnassignClientFromGroup
def unassign_client_from_group_example() -> None:
    client = CamundaClient()

    client.unassign_client_from_group(
        group_id="engineering",
        client_id="my-service-account",
    )
# endregion UnassignClientFromGroup


# region AssignMappingRuleToGroup
def assign_mapping_rule_to_group_example() -> None:
    client = CamundaClient()

    client.assign_mapping_rule_to_group(
        group_id="engineering",
        mapping_rule_id="rule-123",
    )
# endregion AssignMappingRuleToGroup


# region UnassignMappingRuleFromGroup
def unassign_mapping_rule_from_group_example() -> None:
    client = CamundaClient()

    client.unassign_mapping_rule_from_group(
        group_id="engineering",
        mapping_rule_id="rule-123",
    )
# endregion UnassignMappingRuleFromGroup


# region SearchUsersForGroup
def search_users_for_group_example() -> None:
    client = CamundaClient()

    result = client.search_users_for_group(
        group_id="engineering",
    )

    if not isinstance(result.items, Unset):
        for user in result.items:
            print(f"User: {user.username}")
# endregion SearchUsersForGroup


# region SearchClientsForGroup
def search_clients_for_group_example() -> None:
    client = CamundaClient()

    result = client.search_clients_for_group(
        group_id="engineering",
    )

    if not isinstance(result.items, Unset):
        for c in result.items:
            print(f"Client: {c.client_id}")
# endregion SearchClientsForGroup


# region SearchRolesForGroup
def search_roles_for_group_example() -> None:
    client = CamundaClient()

    result = client.search_roles_for_group(
        group_id="engineering",
        data=RoleSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for role in result.items:
            print(f"Role: {role.name}")
# endregion SearchRolesForGroup


# region SearchMappingRulesForGroup
def search_mapping_rules_for_group_example() -> None:
    client = CamundaClient()

    result = client.search_mapping_rules_for_group(
        group_id="engineering",
        data=MappingRuleSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for rule in result.items:
            print(f"Mapping rule: {rule.mapping_rule_id}")
# endregion SearchMappingRulesForGroup
