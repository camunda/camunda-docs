<?php

/**
 * Compilable usage examples for batch-operation management.
 *
 * Batch requests can affect many process instances; start from a narrowly scoped filter.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\CamundaClient;

// region SearchBatchOperationItems
/**
 * Search batch operation items.
 */
function search_batch_operation_items(CamundaClient $client, ?\Camunda\Orchestration\Api\Model\BatchOperationItemSearchQuery $batchOperationItemSearchQuery = null): void
{
    $client->searchBatchOperationItems($batchOperationItemSearchQuery);
}
// endregion SearchBatchOperationItems

// region SearchBatchOperations
/**
 * Search batch operations.
 */
function search_batch_operations(CamundaClient $client, ?\Camunda\Orchestration\Api\Model\BatchOperationSearchQuery $batchOperationSearchQuery = null): void
{
    $client->searchBatchOperations($batchOperationSearchQuery);
}
// endregion SearchBatchOperations

// region GetBatchOperation
/**
 * Get batch operation.
 */
function get_batch_operation(CamundaClient $client, string $batchOperationKey): void
{
    $client->getBatchOperation($batchOperationKey);
}
// endregion GetBatchOperation

// region CancelBatchOperation
/**
 * Cancel Batch operation.
 */
function cancel_batch_operation(CamundaClient $client, string $batchOperationKey): void
{
    $client->cancelBatchOperation($batchOperationKey);
}
// endregion CancelBatchOperation

// region ResumeBatchOperation
/**
 * Resume Batch operation.
 */
function resume_batch_operation(CamundaClient $client, string $batchOperationKey): void
{
    $client->resumeBatchOperation($batchOperationKey);
}
// endregion ResumeBatchOperation

// region SuspendBatchOperation
/**
 * Suspend Batch operation.
 */
function suspend_batch_operation(CamundaClient $client, string $batchOperationKey): void
{
    $client->suspendBatchOperation($batchOperationKey);
}
// endregion SuspendBatchOperation
