<?php

/**
 * Compilable usage examples for element-instance operations.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\CamundaClient;
use Camunda\Orchestration\Semantic\ElementInstanceKey;

// region SearchElementInstanceWaitStates
/**
 * Search element instance wait states.
 */
function search_element_instance_wait_states(CamundaClient $client, ?\Camunda\Orchestration\Api\Model\ElementInstanceWaitStateQuery $elementInstanceWaitStateQuery = null): void
{
    $client->searchElementInstanceWaitStates($elementInstanceWaitStateQuery);
}
// endregion SearchElementInstanceWaitStates

// region SearchElementInstances
/**
 * Search element instances.
 */
function search_element_instances(CamundaClient $client, ?\Camunda\Orchestration\Api\Model\ElementInstanceSearchQuery $elementInstanceSearchQuery = null): void
{
    $client->searchElementInstances($elementInstanceSearchQuery);
}
// endregion SearchElementInstances

// region GetElementInstance
/**
 * Get element instance.
 */
function get_element_instance(CamundaClient $client, ElementInstanceKey $elementInstanceKey): void
{
    $client->getElementInstance((string) $elementInstanceKey);
}
// endregion GetElementInstance

// region SearchElementInstanceIncidents
/**
 * Search for incidents of a specific element instance.
 */
function search_element_instance_incidents(CamundaClient $client, ElementInstanceKey $elementInstanceKey, \Camunda\Orchestration\Api\Model\IncidentSearchQuery $incidentSearchQuery): void
{
    $client->searchElementInstanceIncidents((string) $elementInstanceKey, $incidentSearchQuery);
}
// endregion SearchElementInstanceIncidents

// region CreateElementInstanceVariables
/**
 * Update element instance variables.
 */
function create_element_instance_variables(CamundaClient $client, ElementInstanceKey $elementInstanceKey, \Camunda\Orchestration\Api\Model\SetVariableRequest $setVariableRequest): void
{
    $client->createElementInstanceVariables((string) $elementInstanceKey, $setVariableRequest);
}
// endregion CreateElementInstanceVariables
