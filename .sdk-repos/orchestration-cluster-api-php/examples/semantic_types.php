<?php

/**
 * Compilable usage examples showcasing the semantic value-object type system.
 *
 * Every identifier in the API surface is a distinct, self-validating value object,
 * so mixing up (for example) a process-definition id and a tenant id is a
 * compile-time / static-analysis error rather than a runtime bug.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\Api\Model\ProcessInstanceCreationInstructionById;
use Camunda\Orchestration\Semantic\ProcessDefinitionId;
use Camunda\Orchestration\Semantic\ProcessInstanceKey;
use Camunda\Orchestration\Semantic\TenantId;

// region ConstructAndValidate
function construct_and_validate(): void
{
    // Constructing validates the value against its documented format.
    $definitionId = new ProcessDefinitionId('order-process');
    $tenantId = TenantId::of('acme');

    echo $definitionId->value(), "\n";       // 'order-process'
    echo (string) $tenantId, "\n";           // 'acme' — Stringable
    echo json_encode($definitionId), "\n";   // '"order-process"' — JsonSerializable
}
// endregion ConstructAndValidate

// region TypeSafety
function type_safety(): ProcessInstanceCreationInstructionById
{
    // The setter only accepts a ProcessDefinitionId — passing a TenantId,
    // a ProcessInstanceKey, or a bare string is rejected by static analysis.
    return (new ProcessInstanceCreationInstructionById())
        ->setProcessDefinitionId(new ProcessDefinitionId('order-process'));
}
// endregion TypeSafety

// region Equality
function equality(ProcessInstanceKey $a, ProcessInstanceKey $b): bool
{
    // Value objects compare by value, not identity.
    return $a->equals($b);
}
// endregion Equality
