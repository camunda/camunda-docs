<?php

/**
 * Compilable usage examples for authorization operations.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\CamundaClient;

// region CreateAuthorization
/**
 * Create authorization.
 */
function create_authorization(CamundaClient $client, \Camunda\Orchestration\Api\Model\AuthorizationIdBasedRequest|\Camunda\Orchestration\Api\Model\AuthorizationPropertyBasedRequest $authorizationRequest): void
{
    $client->createAuthorization($authorizationRequest);
}
// endregion CreateAuthorization

// region SearchAuthorizations
/**
 * Search authorizations.
 */
function search_authorizations(CamundaClient $client, ?\Camunda\Orchestration\Api\Model\AuthorizationSearchQuery $authorizationSearchQuery = null): void
{
    $client->searchAuthorizations($authorizationSearchQuery);
}
// endregion SearchAuthorizations

// region SearchOwnAuthorizations
/**
 * Search own authorizations.
 */
function search_own_authorizations(CamundaClient $client, ?\Camunda\Orchestration\Api\Model\AuthorizationSearchQuery $authorizationSearchQuery = null): void
{
    $client->searchOwnAuthorizations($authorizationSearchQuery);
}
// endregion SearchOwnAuthorizations

// region GetAuthorization
/**
 * Get authorization.
 */
function get_authorization(CamundaClient $client, string $authorizationKey): void
{
    $client->getAuthorization($authorizationKey);
}
// endregion GetAuthorization

// region UpdateAuthorization
/**
 * Update authorization.
 */
function update_authorization(CamundaClient $client, string $authorizationKey, \Camunda\Orchestration\Api\Model\AuthorizationIdBasedRequest|\Camunda\Orchestration\Api\Model\AuthorizationPropertyBasedRequest $authorizationRequest): void
{
    $client->updateAuthorization($authorizationKey, $authorizationRequest);
}
// endregion UpdateAuthorization

// region DeleteAuthorization
/**
 * Delete authorization.
 */
function delete_authorization(CamundaClient $client, string $authorizationKey): void
{
    $client->deleteAuthorization($authorizationKey);
}
// endregion DeleteAuthorization
