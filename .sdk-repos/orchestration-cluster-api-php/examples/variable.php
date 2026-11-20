<?php

/**
 * Compilable usage examples for process-variable operations.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\CamundaClient;
use Camunda\Orchestration\Semantic\VariableKey;

// region SearchVariables
/**
 * Search variables.
 */
function search_variables(CamundaClient $client, ?bool $truncateValues = null, ?\Camunda\Orchestration\Api\Model\VariableSearchQuery $variableSearchQuery = null): void
{
    $client->searchVariables($truncateValues, $variableSearchQuery);
}
// endregion SearchVariables

// region GetVariable
/**
 * Get variable.
 */
function get_variable(CamundaClient $client, VariableKey $variableKey): void
{
    $client->getVariable((string) $variableKey);
}
// endregion GetVariable
