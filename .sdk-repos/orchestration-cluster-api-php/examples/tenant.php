<?php

/**
 * Compilable usage examples for tenant and tenant-assignment operations.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\CamundaClient;

// region CreateTenant
/**
 * Create tenant.
 */
function create_tenant(CamundaClient $client, \Camunda\Orchestration\Api\Model\TenantCreateRequest $tenantCreateRequest): void
{
    $client->createTenant($tenantCreateRequest);
}
// endregion CreateTenant

// region SearchTenants
/**
 * Search tenants.
 */
function search_tenants(CamundaClient $client, ?\Camunda\Orchestration\Api\Model\TenantSearchQueryRequest $tenantSearchQueryRequest = null): void
{
    $client->searchTenants($tenantSearchQueryRequest);
}
// endregion SearchTenants

// region GetTenant
/**
 * Get tenant.
 */
function get_tenant(CamundaClient $client, string $tenantId): void
{
    $client->getTenant($tenantId);
}
// endregion GetTenant

// region UpdateTenant
/**
 * Update tenant.
 */
function update_tenant(CamundaClient $client, string $tenantId, \Camunda\Orchestration\Api\Model\TenantUpdateRequest $tenantUpdateRequest): void
{
    $client->updateTenant($tenantId, $tenantUpdateRequest);
}
// endregion UpdateTenant

// region DeleteTenant
/**
 * Delete tenant.
 */
function delete_tenant(CamundaClient $client, string $tenantId): void
{
    $client->deleteTenant($tenantId);
}
// endregion DeleteTenant

// region SearchClientsForTenant
/**
 * Search clients for tenant.
 */
function search_clients_for_tenant(CamundaClient $client, string $tenantId, ?\Camunda\Orchestration\Api\Model\TenantClientSearchQueryRequest $tenantClientSearchQueryRequest = null): void
{
    $client->searchClientsForTenant($tenantId, $tenantClientSearchQueryRequest);
}
// endregion SearchClientsForTenant

// region AssignClientToTenant
/**
 * Assign a client to a tenant.
 */
function assign_client_to_tenant(CamundaClient $client, string $tenantId, string $clientId): void
{
    $client->assignClientToTenant($tenantId, $clientId);
}
// endregion AssignClientToTenant

// region UnassignClientFromTenant
/**
 * Unassign a client from a tenant.
 */
function unassign_client_from_tenant(CamundaClient $client, string $tenantId, string $clientId): void
{
    $client->unassignClientFromTenant($tenantId, $clientId);
}
// endregion UnassignClientFromTenant

// region SearchGroupIdsForTenant
/**
 * Search groups for tenant.
 */
function search_group_ids_for_tenant(CamundaClient $client, string $tenantId, ?\Camunda\Orchestration\Api\Model\TenantGroupSearchQueryRequest $tenantGroupSearchQueryRequest = null): void
{
    $client->searchGroupIdsForTenant($tenantId, $tenantGroupSearchQueryRequest);
}
// endregion SearchGroupIdsForTenant

// region AssignGroupToTenant
/**
 * Assign a group to a tenant.
 */
function assign_group_to_tenant(CamundaClient $client, string $tenantId, string $groupId): void
{
    $client->assignGroupToTenant($tenantId, $groupId);
}
// endregion AssignGroupToTenant

// region UnassignGroupFromTenant
/**
 * Unassign a group from a tenant.
 */
function unassign_group_from_tenant(CamundaClient $client, string $tenantId, string $groupId): void
{
    $client->unassignGroupFromTenant($tenantId, $groupId);
}
// endregion UnassignGroupFromTenant

// region SearchMappingRulesForTenant
/**
 * Search mapping rules for tenant.
 */
function search_mapping_rules_for_tenant(CamundaClient $client, string $tenantId, ?\Camunda\Orchestration\Api\Model\MappingRuleSearchQueryRequest $mappingRuleSearchQueryRequest = null): void
{
    $client->searchMappingRulesForTenant($tenantId, $mappingRuleSearchQueryRequest);
}
// endregion SearchMappingRulesForTenant

// region AssignMappingRuleToTenant
/**
 * Assign a mapping rule to a tenant.
 */
function assign_mapping_rule_to_tenant(CamundaClient $client, string $tenantId, string $mappingRuleId): void
{
    $client->assignMappingRuleToTenant($tenantId, $mappingRuleId);
}
// endregion AssignMappingRuleToTenant

// region UnassignMappingRuleFromTenant
/**
 * Unassign a mapping rule from a tenant.
 */
function unassign_mapping_rule_from_tenant(CamundaClient $client, string $tenantId, string $mappingRuleId): void
{
    $client->unassignMappingRuleFromTenant($tenantId, $mappingRuleId);
}
// endregion UnassignMappingRuleFromTenant

// region SearchRolesForTenant
/**
 * Search roles for tenant.
 */
function search_roles_for_tenant(CamundaClient $client, string $tenantId, ?\Camunda\Orchestration\Api\Model\RoleSearchQueryRequest $roleSearchQueryRequest = null): void
{
    $client->searchRolesForTenant($tenantId, $roleSearchQueryRequest);
}
// endregion SearchRolesForTenant

// region AssignRoleToTenant
/**
 * Assign a role to a tenant.
 */
function assign_role_to_tenant(CamundaClient $client, string $tenantId, string $roleId): void
{
    $client->assignRoleToTenant($tenantId, $roleId);
}
// endregion AssignRoleToTenant

// region UnassignRoleFromTenant
/**
 * Unassign a role from a tenant.
 */
function unassign_role_from_tenant(CamundaClient $client, string $tenantId, string $roleId): void
{
    $client->unassignRoleFromTenant($tenantId, $roleId);
}
// endregion UnassignRoleFromTenant

// region SearchUsersForTenant
/**
 * Search users for tenant.
 */
function search_users_for_tenant(CamundaClient $client, string $tenantId, ?\Camunda\Orchestration\Api\Model\TenantUserSearchQueryRequest $tenantUserSearchQueryRequest = null): void
{
    $client->searchUsersForTenant($tenantId, $tenantUserSearchQueryRequest);
}
// endregion SearchUsersForTenant

// region AssignUserToTenant
/**
 * Assign a user to a tenant.
 */
function assign_user_to_tenant(CamundaClient $client, string $tenantId, string $username): void
{
    $client->assignUserToTenant($tenantId, $username);
}
// endregion AssignUserToTenant

// region UnassignUserFromTenant
/**
 * Unassign a user from a tenant.
 */
function unassign_user_from_tenant(CamundaClient $client, string $tenantId, string $username): void
{
    $client->unassignUserFromTenant($tenantId, $username);
}
// endregion UnassignUserFromTenant
