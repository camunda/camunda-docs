<?php

/**
 * Compilable usage examples for deployed resource operations.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\CamundaClient;
use Camunda\Orchestration\Semantic\ResourceKey;

// region SearchResources
/**
 * Search resources.
 */
function search_resources(CamundaClient $client, ?\Camunda\Orchestration\Api\Model\ResourceSearchQuery $resourceSearchQuery = null): void
{
    $client->searchResources($resourceSearchQuery);
}
// endregion SearchResources

// region GetResource
/**
 * Get resource.
 */
function get_resource(CamundaClient $client, ResourceKey $resourceKey): void
{
    $client->getResource($resourceKey);
}
// endregion GetResource

// region GetResourceContent
/**
 * Get RPA resource content (deprecated).
 */
function get_resource_content(CamundaClient $client, ResourceKey $resourceKey): void
{
    $client->getResourceContent($resourceKey);
}
// endregion GetResourceContent

// region GetResourceContentBinary
/**
 * Get resource content as binary.
 */
function get_resource_content_binary(CamundaClient $client, ResourceKey $resourceKey): void
{
    $client->getResourceContentBinary($resourceKey);
}
// endregion GetResourceContentBinary

// region DeleteResource
/**
 * Delete resource.
 */
function delete_resource(CamundaClient $client, ResourceKey $resourceKey, ?\Camunda\Orchestration\Api\Model\DeleteResourceRequest $deleteResourceRequest = null): void
{
    $client->deleteResource($resourceKey, $deleteResourceRequest);
}
// endregion DeleteResource
