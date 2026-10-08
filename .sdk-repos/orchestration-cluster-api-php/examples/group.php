<?php

/**
 * Compilable usage examples for group and group-membership operations.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\CamundaClient;

// region CreateGroup
/**
 * Create group.
 */
function create_group(CamundaClient $client, ?\Camunda\Orchestration\Api\Model\GroupCreateRequest $groupCreateRequest = null): void
{
    $client->createGroup($groupCreateRequest);
}
// endregion CreateGroup

// region SearchGroups
/**
 * Search groups.
 */
function search_groups(CamundaClient $client, ?\Camunda\Orchestration\Api\Model\GroupSearchQueryRequest $groupSearchQueryRequest = null): void
{
    $client->searchGroups($groupSearchQueryRequest);
}
// endregion SearchGroups

// region GetGroup
/**
 * Get group.
 */
function get_group(CamundaClient $client, string $groupId): void
{
    $client->getGroup($groupId);
}
// endregion GetGroup

// region UpdateGroup
/**
 * Update group.
 */
function update_group(CamundaClient $client, string $groupId, \Camunda\Orchestration\Api\Model\GroupUpdateRequest $groupUpdateRequest): void
{
    $client->updateGroup($groupId, $groupUpdateRequest);
}
// endregion UpdateGroup

// region DeleteGroup
/**
 * Delete group.
 */
function delete_group(CamundaClient $client, string $groupId): void
{
    $client->deleteGroup($groupId);
}
// endregion DeleteGroup

// region SearchClientsForGroup
/**
 * Search group clients.
 */
function search_clients_for_group(CamundaClient $client, string $groupId, ?\Camunda\Orchestration\Api\Model\GroupClientSearchQueryRequest $groupClientSearchQueryRequest = null): void
{
    $client->searchClientsForGroup($groupId, $groupClientSearchQueryRequest);
}
// endregion SearchClientsForGroup

// region AssignClientToGroup
/**
 * Assign a client to a group.
 */
function assign_client_to_group(CamundaClient $client, string $groupId, string $clientId): void
{
    $client->assignClientToGroup($groupId, $clientId);
}
// endregion AssignClientToGroup

// region UnassignClientFromGroup
/**
 * Unassign a client from a group.
 */
function unassign_client_from_group(CamundaClient $client, string $groupId, string $clientId): void
{
    $client->unassignClientFromGroup($groupId, $clientId);
}
// endregion UnassignClientFromGroup

// region SearchMappingRulesForGroup
/**
 * Search group mapping rules.
 */
function search_mapping_rules_for_group(CamundaClient $client, string $groupId, ?\Camunda\Orchestration\Api\Model\MappingRuleSearchQueryRequest $mappingRuleSearchQueryRequest = null): void
{
    $client->searchMappingRulesForGroup($groupId, $mappingRuleSearchQueryRequest);
}
// endregion SearchMappingRulesForGroup

// region AssignMappingRuleToGroup
/**
 * Assign a mapping rule to a group.
 */
function assign_mapping_rule_to_group(CamundaClient $client, string $groupId, string $mappingRuleId): void
{
    $client->assignMappingRuleToGroup($groupId, $mappingRuleId);
}
// endregion AssignMappingRuleToGroup

// region UnassignMappingRuleFromGroup
/**
 * Unassign a mapping rule from a group.
 */
function unassign_mapping_rule_from_group(CamundaClient $client, string $groupId, string $mappingRuleId): void
{
    $client->unassignMappingRuleFromGroup($groupId, $mappingRuleId);
}
// endregion UnassignMappingRuleFromGroup

// region SearchRolesForGroup
/**
 * Search group roles.
 */
function search_roles_for_group(CamundaClient $client, string $groupId, ?\Camunda\Orchestration\Api\Model\RoleSearchQueryRequest $roleSearchQueryRequest = null): void
{
    $client->searchRolesForGroup($groupId, $roleSearchQueryRequest);
}
// endregion SearchRolesForGroup

// region SearchUsersForGroup
/**
 * Search group users.
 */
function search_users_for_group(CamundaClient $client, string $groupId, ?\Camunda\Orchestration\Api\Model\GroupUserSearchQueryRequest $groupUserSearchQueryRequest = null): void
{
    $client->searchUsersForGroup($groupId, $groupUserSearchQueryRequest);
}
// endregion SearchUsersForGroup

// region AssignUserToGroup
/**
 * Assign a user to a group.
 */
function assign_user_to_group(CamundaClient $client, string $groupId, string $username): void
{
    $client->assignUserToGroup($groupId, $username);
}
// endregion AssignUserToGroup

// region UnassignUserFromGroup
/**
 * Unassign a user from a group.
 */
function unassign_user_from_group(CamundaClient $client, string $groupId, string $username): void
{
    $client->unassignUserFromGroup($groupId, $username);
}
// endregion UnassignUserFromGroup
