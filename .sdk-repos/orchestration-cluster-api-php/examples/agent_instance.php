<?php

/**
 * Compilable usage examples for agent-instance operations.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\CamundaClient;

// region CreateAgentInstance
/**
 * Create agent instance.
 */
function create_agent_instance(CamundaClient $client, \Camunda\Orchestration\Api\Model\AgentInstanceCreationRequest $agentInstanceCreationRequest): void
{
    $client->createAgentInstance($agentInstanceCreationRequest);
}
// endregion CreateAgentInstance

// region GetAgentInstance
/**
 * Get agent instance.
 */
function get_agent_instance(CamundaClient $client, string $agentInstanceKey): void
{
    $client->getAgentInstance($agentInstanceKey);
}
// endregion GetAgentInstance

// region UpdateAgentInstance
/**
 * Update agent instance.
 */
function update_agent_instance(CamundaClient $client, string $agentInstanceKey, \Camunda\Orchestration\Api\Model\AgentInstanceUpdateRequest $agentInstanceUpdateRequest): void
{
    $client->updateAgentInstance($agentInstanceKey, $agentInstanceUpdateRequest);
}
// endregion UpdateAgentInstance

// region SearchAgentInstances
/**
 * Search agent instances.
 */
function search_agent_instances(CamundaClient $client, ?\Camunda\Orchestration\Api\Model\AgentInstanceSearchQuery $agentInstanceSearchQuery = null): void
{
    $client->searchAgentInstances($agentInstanceSearchQuery);
}
// endregion SearchAgentInstances

// region SearchAgentInstanceHistory
/**
 * Search agent instance history.
 */
function search_agent_instance_history(CamundaClient $client, string $agentInstanceKey, ?\Camunda\Orchestration\Api\Model\AgentInstanceHistorySearchQuery $agentInstanceHistorySearchQuery = null): void
{
    $client->searchAgentInstanceHistory($agentInstanceKey, $agentInstanceHistorySearchQuery);
}
// endregion SearchAgentInstanceHistory
