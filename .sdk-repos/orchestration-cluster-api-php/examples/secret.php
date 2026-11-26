<?php

/**
 * Compilable usage examples for secret resolution operations.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\CamundaClient;

// region ResolveSecrets
/**
 * Resolve secrets.
 */
function resolve_secrets(CamundaClient $client, \Camunda\Orchestration\Api\Model\SecretResolveRequest $secretResolveRequest): void
{
    $client->resolveSecrets($secretResolveRequest);
}
// endregion ResolveSecrets

// region ListSecrets
/**
 * List secret references.
 */
function list_secrets(CamundaClient $client): void
{
    $client->listSecrets();
}
// endregion ListSecrets
