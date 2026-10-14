<?php

/**
 * Compilable usage examples for role and role-assignment operations.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\CamundaClient;

// region CreateRole
/**
 * Create role.
 */
function create_role(CamundaClient $client, ?\Camunda\Orchestration\Api\Model\RoleCreateRequest $roleCreateRequest = null): void
{
    $client->createRole($roleCreateRequest);
}
// endregion CreateRole

// region SearchRoles
/**
 * Search roles.
 */
function search_roles(CamundaClient $client, ?\Camunda\Orchestration\Api\Model\RoleSearchQueryRequest $roleSearchQueryRequest = null): void
{
    $client->searchRoles($roleSearchQueryRequest);
}
// endregion SearchRoles

// region GetRole
/**
 * Get role.
 */
function get_role(CamundaClient $client, string $roleId): void
{
    $client->getRole($roleId);
}
// endregion GetRole

// region UpdateRole
/**
 * Update role.
 */
function update_role(CamundaClient $client, string $roleId, \Camunda\Orchestration\Api\Model\RoleUpdateRequest $roleUpdateRequest): void
{
    $client->updateRole($roleId, $roleUpdateRequest);
}
// endregion UpdateRole

// region DeleteRole
/**
 * Delete role.
 */
function delete_role(CamundaClient $client, string $roleId): void
{
    $client->deleteRole($roleId);
}
// endregion DeleteRole

// region SearchClientsForRole
/**
 * Search role clients.
 */
function search_clients_for_role(CamundaClient $client, string $roleId, ?\Camunda\Orchestration\Api\Model\RoleClientSearchQueryRequest $roleClientSearchQueryRequest = null): void
{
    $client->searchClientsForRole($roleId, $roleClientSearchQueryRequest);
}
// endregion SearchClientsForRole

// region AssignRoleToClient
/**
 * Assign a role to a client.
 */
function assign_role_to_client(CamundaClient $client, string $roleId, string $clientId): void
{
    $client->assignRoleToClient($roleId, $clientId);
}
// endregion AssignRoleToClient

// region UnassignRoleFromClient
/**
 * Unassign a role from a client.
 */
function unassign_role_from_client(CamundaClient $client, string $roleId, string $clientId): void
{
    $client->unassignRoleFromClient($roleId, $clientId);
}
// endregion UnassignRoleFromClient

// region SearchGroupsForRole
/**
 * Search role groups.
 */
function search_groups_for_role(CamundaClient $client, string $roleId, ?\Camunda\Orchestration\Api\Model\RoleGroupSearchQueryRequest $roleGroupSearchQueryRequest = null): void
{
    $client->searchGroupsForRole($roleId, $roleGroupSearchQueryRequest);
}
// endregion SearchGroupsForRole

// region AssignRoleToGroup
/**
 * Assign a role to a group.
 */
function assign_role_to_group(CamundaClient $client, string $roleId, string $groupId): void
{
    $client->assignRoleToGroup($roleId, $groupId);
}
// endregion AssignRoleToGroup

// region UnassignRoleFromGroup
/**
 * Unassign a role from a group.
 */
function unassign_role_from_group(CamundaClient $client, string $roleId, string $groupId): void
{
    $client->unassignRoleFromGroup($roleId, $groupId);
}
// endregion UnassignRoleFromGroup

// region SearchMappingRulesForRole
/**
 * Search role mapping rules.
 */
function search_mapping_rules_for_role(CamundaClient $client, string $roleId, ?\Camunda\Orchestration\Api\Model\MappingRuleSearchQueryRequest $mappingRuleSearchQueryRequest = null): void
{
    $client->searchMappingRulesForRole($roleId, $mappingRuleSearchQueryRequest);
}
// endregion SearchMappingRulesForRole

// region AssignRoleToMappingRule
/**
 * Assign a role to a mapping rule.
 */
function assign_role_to_mapping_rule(CamundaClient $client, string $roleId, string $mappingRuleId): void
{
    $client->assignRoleToMappingRule($roleId, $mappingRuleId);
}
// endregion AssignRoleToMappingRule

// region UnassignRoleFromMappingRule
/**
 * Unassign a role from a mapping rule.
 */
function unassign_role_from_mapping_rule(CamundaClient $client, string $roleId, string $mappingRuleId): void
{
    $client->unassignRoleFromMappingRule($roleId, $mappingRuleId);
}
// endregion UnassignRoleFromMappingRule

// region SearchUsersForRole
/**
 * Search role users.
 */
function search_users_for_role(CamundaClient $client, string $roleId, ?\Camunda\Orchestration\Api\Model\RoleUserSearchQueryRequest $roleUserSearchQueryRequest = null): void
{
    $client->searchUsersForRole($roleId, $roleUserSearchQueryRequest);
}
// endregion SearchUsersForRole

// region AssignRoleToUser
/**
 * Assign a role to a user.
 */
function assign_role_to_user(CamundaClient $client, string $roleId, string $username): void
{
    $client->assignRoleToUser($roleId, $username);
}
// endregion AssignRoleToUser

// region UnassignRoleFromUser
/**
 * Unassign a role from a user.
 */
function unassign_role_from_user(CamundaClient $client, string $roleId, string $username): void
{
    $client->unassignRoleFromUser($roleId, $username);
}
// endregion UnassignRoleFromUser
