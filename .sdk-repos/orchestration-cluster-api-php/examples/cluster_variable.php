<?php

/**
 * Compilable usage examples for global and tenant cluster-variable operations.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\CamundaClient;

// region CreateGlobalClusterVariable
/**
 * Create a global-scoped cluster variable.
 */
function create_global_cluster_variable(CamundaClient $client, \Camunda\Orchestration\Api\Model\CreateClusterVariableRequest $createClusterVariableRequest): void
{
    $client->createGlobalClusterVariable($createClusterVariableRequest);
}
// endregion CreateGlobalClusterVariable

// region GetGlobalClusterVariable
/**
 * Get a global-scoped cluster variable.
 */
function get_global_cluster_variable(CamundaClient $client, string $name): void
{
    $client->getGlobalClusterVariable($name);
}
// endregion GetGlobalClusterVariable

// region UpdateGlobalClusterVariable
/**
 * Update a global-scoped cluster variable.
 */
function update_global_cluster_variable(CamundaClient $client, string $name, \Camunda\Orchestration\Api\Model\UpdateClusterVariableRequest $updateClusterVariableRequest): void
{
    $client->updateGlobalClusterVariable($name, $updateClusterVariableRequest);
}
// endregion UpdateGlobalClusterVariable

// region DeleteGlobalClusterVariable
/**
 * Delete a global-scoped cluster variable.
 */
function delete_global_cluster_variable(CamundaClient $client, string $name): void
{
    $client->deleteGlobalClusterVariable($name);
}
// endregion DeleteGlobalClusterVariable

// region SearchClusterVariables
/**
 * searchClusterVariables.
 */
function search_cluster_variables(CamundaClient $client, ?bool $truncateValues = null, ?\Camunda\Orchestration\Api\Model\ClusterVariableSearchQueryRequest $clusterVariableSearchQueryRequest = null): void
{
    $client->searchClusterVariables($truncateValues, $clusterVariableSearchQueryRequest);
}
// endregion SearchClusterVariables

// region CreateTenantClusterVariable
/**
 * Create a tenant-scoped cluster variable.
 */
function create_tenant_cluster_variable(CamundaClient $client, string $tenantId, \Camunda\Orchestration\Api\Model\CreateClusterVariableRequest $createClusterVariableRequest): void
{
    $client->createTenantClusterVariable($tenantId, $createClusterVariableRequest);
}
// endregion CreateTenantClusterVariable

// region GetTenantClusterVariable
/**
 * Get a tenant-scoped cluster variable.
 */
function get_tenant_cluster_variable(CamundaClient $client, string $tenantId, string $name): void
{
    $client->getTenantClusterVariable($tenantId, $name);
}
// endregion GetTenantClusterVariable

// region UpdateTenantClusterVariable
/**
 * Update a tenant-scoped cluster variable.
 */
function update_tenant_cluster_variable(CamundaClient $client, string $tenantId, string $name, \Camunda\Orchestration\Api\Model\UpdateClusterVariableRequest $updateClusterVariableRequest): void
{
    $client->updateTenantClusterVariable($tenantId, $name, $updateClusterVariableRequest);
}
// endregion UpdateTenantClusterVariable

// region DeleteTenantClusterVariable
/**
 * Delete a tenant-scoped cluster variable.
 */
function delete_tenant_cluster_variable(CamundaClient $client, string $tenantId, string $name): void
{
    $client->deleteTenantClusterVariable($tenantId, $name);
}
// endregion DeleteTenantClusterVariable
