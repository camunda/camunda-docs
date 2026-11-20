<?php

/**
 * Compilable usage examples for agent-definition operations.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\CamundaClient;

// region GetAgentDefinition
/**
 * Get agent definition.
 */
function get_agent_definition(CamundaClient $client, string $agentDefinitionKey): void
{
    $client->getAgentDefinition($agentDefinitionKey);
}
// endregion GetAgentDefinition

// region SearchAgentDefinitions
/**
 * Search agent definitions.
 */
function search_agent_definitions(CamundaClient $client, ?\Camunda\Orchestration\Api\Model\AgentDefinitionSearchQuery $agentDefinitionSearchQuery = null): void
{
    $client->searchAgentDefinitions($agentDefinitionSearchQuery);
}
// endregion SearchAgentDefinitions
