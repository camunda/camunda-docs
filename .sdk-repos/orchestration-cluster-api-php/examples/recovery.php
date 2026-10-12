<?php

/**
 * Compilable usage examples for cluster recovery operations.
 *
 * Recovery actions affect the cluster globally and should be run only by an authorized
 * operator with a verified recovery plan.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\CamundaClient;

// region ChangeClusterMode
/**
 * Change cluster mode.
 */
function change_cluster_mode(CamundaClient $client, \Camunda\Orchestration\Api\Model\Mode $mode, ?bool $dryRun = false): void
{
    $client->changeClusterMode($mode, $dryRun);
}
// endregion ChangeClusterMode

// region Restore
/**
 * Restore from a backup.
 */
function restore(CamundaClient $client, \Camunda\Orchestration\Api\Model\RestoreRequest $restoreRequest, ?bool $dryRun = false): void
{
    $client->restore($restoreRequest, $dryRun);
}
// endregion Restore

// region GetRestoreStatus
/**
 * Get the status of the in-progress restore.
 */
function get_restore_status(CamundaClient $client): void
{
    $client->getRestoreStatus();
}
// endregion GetRestoreStatus

// region ChangeClusterModeAsClusterAdmin
/**
 * Change cluster mode as cluster admin.
 * @param array<string, mixed> $variables
 */
function change_cluster_mode_as_cluster_admin(CamundaClient $client, \Camunda\Orchestration\Api\Model\Mode $mode, ?string $physicalTenantId = null, ?bool $dryRun = false, ?int $hostIndex = null, array $variables = []): void
{
    $client->changeClusterModeAsClusterAdmin($mode, $physicalTenantId, $dryRun, $hostIndex, $variables);
}
// endregion ChangeClusterModeAsClusterAdmin

// region RestoreAsClusterAdmin
/**
 * Restore as cluster admin.
 * @param array<string, mixed> $variables
 */
function restore_as_cluster_admin(CamundaClient $client, \Camunda\Orchestration\Api\Model\ClusterRestoreRequest $clusterRestoreRequest, ?string $physicalTenantId = null, ?bool $dryRun = false, ?int $hostIndex = null, array $variables = []): void
{
    $client->restoreAsClusterAdmin($clusterRestoreRequest, $physicalTenantId, $dryRun, $hostIndex, $variables);
}
// endregion RestoreAsClusterAdmin
