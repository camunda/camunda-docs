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
 *
 * @param array<string, mixed>|null $body
 */
function list_secrets(CamundaClient $client, ?array $body = null): void
{
    $client->listSecrets($body);
}
// endregion ListSecrets
