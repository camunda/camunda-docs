<?php

/**
 * Compilable usage examples for FEEL and conditional evaluation operations.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\CamundaClient;

// region EvaluateConditionals
/**
 * Evaluate root level conditional start events.
 */
function evaluate_conditionals(CamundaClient $client, \Camunda\Orchestration\Api\Model\ConditionalEvaluationInstruction $conditionalEvaluationInstruction): void
{
    $client->evaluateConditionals($conditionalEvaluationInstruction);
}
// endregion EvaluateConditionals

// region EvaluateExpression
/**
 * Evaluate an expression.
 */
function evaluate_expression(CamundaClient $client, \Camunda\Orchestration\Api\Model\ExpressionEvaluationRequest $expressionEvaluationRequest): void
{
    $client->evaluateExpression($expressionEvaluationRequest);
}
// endregion EvaluateExpression
