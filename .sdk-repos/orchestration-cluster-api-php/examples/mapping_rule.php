<?php

/**
 * Compilable usage examples for mapping-rule operations.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\CamundaClient;

// region CreateMappingRule
/**
 * Create mapping rule.
 */
function create_mapping_rule(CamundaClient $client, ?\Camunda\Orchestration\Api\Model\MappingRuleCreateRequest $mappingRuleCreateRequest = null): void
{
    $client->createMappingRule($mappingRuleCreateRequest);
}
// endregion CreateMappingRule

// region SearchMappingRule
/**
 * Search mapping rules.
 */
function search_mapping_rule(CamundaClient $client, ?\Camunda\Orchestration\Api\Model\MappingRuleSearchQueryRequest $mappingRuleSearchQueryRequest = null): void
{
    $client->searchMappingRule($mappingRuleSearchQueryRequest);
}
// endregion SearchMappingRule

// region GetMappingRule
/**
 * Get a mapping rule.
 */
function get_mapping_rule(CamundaClient $client, string $mappingRuleId): void
{
    $client->getMappingRule($mappingRuleId);
}
// endregion GetMappingRule

// region UpdateMappingRule
/**
 * Update mapping rule.
 */
function update_mapping_rule(CamundaClient $client, string $mappingRuleId, ?\Camunda\Orchestration\Api\Model\MappingRuleUpdateRequest $mappingRuleUpdateRequest = null): void
{
    $client->updateMappingRule($mappingRuleId, $mappingRuleUpdateRequest);
}
// endregion UpdateMappingRule

// region DeleteMappingRule
/**
 * Delete a mapping rule.
 */
function delete_mapping_rule(CamundaClient $client, string $mappingRuleId): void
{
    $client->deleteMappingRule($mappingRuleId);
}
// endregion DeleteMappingRule
