<?php

/**
 * Compilable usage examples for runtime and history backup operations.
 *
 * Backup deletion, restoration, and cluster-admin methods change durable cluster state.
 * Run them only against the intended cluster after reviewing the requested backup ID.
 */

declare(strict_types=1);

namespace Camunda\Orchestration\Examples;

use Camunda\Orchestration\CamundaClient;

// region TakeRuntimeBackup
/**
 * Take a runtime backup.
 */
function take_runtime_backup(CamundaClient $client, ?\Camunda\Orchestration\Api\Model\TakeRuntimeBackupRequest $takeRuntimeBackupRequest = null): void
{
    $client->takeRuntimeBackup($takeRuntimeBackupRequest);
}
// endregion TakeRuntimeBackup

// region ListRuntimeBackups
/**
 * List runtime backups.
 */
function list_runtime_backups(CamundaClient $client, ?string $prefix = null): void
{
    $client->listRuntimeBackups($prefix);
}
// endregion ListRuntimeBackups

// region GetRuntimeBackup
/**
 * Get a runtime backup.
 */
function get_runtime_backup(CamundaClient $client, int $backupId): void
{
    $client->getRuntimeBackup($backupId);
}
// endregion GetRuntimeBackup

// region DeleteRuntimeBackup
/**
 * Delete a runtime backup.
 */
function delete_runtime_backup(CamundaClient $client, int $backupId): void
{
    $client->deleteRuntimeBackup($backupId);
}
// endregion DeleteRuntimeBackup

// region GetRuntimeBackupState
/**
 * Get runtime backup state.
 */
function get_runtime_backup_state(CamundaClient $client): void
{
    $client->getRuntimeBackupState();
}
// endregion GetRuntimeBackupState

// region SyncRuntimeBackupState
/**
 * Sync runtime backup state.
 */
function sync_runtime_backup_state(CamundaClient $client): void
{
    $client->syncRuntimeBackupState();
}
// endregion SyncRuntimeBackupState

// region DeleteRuntimeBackupState
/**
 * Delete runtime backup state.
 */
function delete_runtime_backup_state(CamundaClient $client): void
{
    $client->deleteRuntimeBackupState();
}
// endregion DeleteRuntimeBackupState

// region TakeHistoryBackup
/**
 * Take a history backup.
 */
function take_history_backup(CamundaClient $client, \Camunda\Orchestration\Api\Model\TakeHistoryBackupRequest $takeHistoryBackupRequest): void
{
    $client->takeHistoryBackup($takeHistoryBackupRequest);
}
// endregion TakeHistoryBackup

// region ListHistoryBackups
/**
 * List history backups.
 */
function list_history_backups(CamundaClient $client, ?string $prefix = null, ?bool $verbose = true): void
{
    $client->listHistoryBackups($prefix, $verbose);
}
// endregion ListHistoryBackups

// region GetHistoryBackup
/**
 * Get a history backup.
 */
function get_history_backup(CamundaClient $client, int $backupId): void
{
    $client->getHistoryBackup($backupId);
}
// endregion GetHistoryBackup

// region DeleteHistoryBackup
/**
 * Delete a history backup.
 */
function delete_history_backup(CamundaClient $client, int $backupId): void
{
    $client->deleteHistoryBackup($backupId);
}
// endregion DeleteHistoryBackup

// region TakeHistoryBackupAsClusterAdmin
/**
 * Take a cluster history backup.
 * @param array<string, mixed> $variables
 */
function take_history_backup_as_cluster_admin(CamundaClient $client, \Camunda\Orchestration\Api\Model\TakeHistoryBackupRequest $takeHistoryBackupRequest, ?string $physicalTenantId = null, ?int $hostIndex = null, array $variables = []): void
{
    $client->takeHistoryBackupAsClusterAdmin($takeHistoryBackupRequest, $physicalTenantId, $hostIndex, $variables);
}
// endregion TakeHistoryBackupAsClusterAdmin

// region ListHistoryBackupsAsClusterAdmin
/**
 * List cluster history backups.
 * @param array<string, mixed> $variables
 */
function list_history_backups_as_cluster_admin(CamundaClient $client, ?string $physicalTenantId = null, ?string $prefix = null, ?bool $verbose = true, ?int $hostIndex = null, array $variables = []): void
{
    $client->listHistoryBackupsAsClusterAdmin($physicalTenantId, $prefix, $verbose, $hostIndex, $variables);
}
// endregion ListHistoryBackupsAsClusterAdmin

// region GetHistoryBackupAsClusterAdmin
/**
 * Get a cluster history backup.
 * @param array<string, mixed> $variables
 */
function get_history_backup_as_cluster_admin(CamundaClient $client, int $backupId, ?string $physicalTenantId = null, ?int $hostIndex = null, array $variables = []): void
{
    $client->getHistoryBackupAsClusterAdmin($backupId, $physicalTenantId, $hostIndex, $variables);
}
// endregion GetHistoryBackupAsClusterAdmin

// region DeleteHistoryBackupAsClusterAdmin
/**
 * Delete a cluster history backup.
 * @param array<string, mixed> $variables
 */
function delete_history_backup_as_cluster_admin(CamundaClient $client, int $backupId, ?string $physicalTenantId = null, ?int $hostIndex = null, array $variables = []): void
{
    $client->deleteHistoryBackupAsClusterAdmin($backupId, $physicalTenantId, $hostIndex, $variables);
}
// endregion DeleteHistoryBackupAsClusterAdmin

// region TakeRuntimeBackupAsClusterAdmin
/**
 * Take a cluster runtime backup.
 * @param array<string, mixed> $variables
 */
function take_runtime_backup_as_cluster_admin(CamundaClient $client, ?string $physicalTenantId = null, ?\Camunda\Orchestration\Api\Model\TakeRuntimeBackupRequest $takeRuntimeBackupRequest = null, ?int $hostIndex = null, array $variables = []): void
{
    $client->takeRuntimeBackupAsClusterAdmin($physicalTenantId, $takeRuntimeBackupRequest, $hostIndex, $variables);
}
// endregion TakeRuntimeBackupAsClusterAdmin

// region ListRuntimeBackupsAsClusterAdmin
/**
 * List cluster runtime backups.
 * @param array<string, mixed> $variables
 */
function list_runtime_backups_as_cluster_admin(CamundaClient $client, ?string $physicalTenantId = null, ?string $prefix = null, ?int $hostIndex = null, array $variables = []): void
{
    $client->listRuntimeBackupsAsClusterAdmin($physicalTenantId, $prefix, $hostIndex, $variables);
}
// endregion ListRuntimeBackupsAsClusterAdmin

// region GetRuntimeBackupStateAsClusterAdmin
/**
 * Get cluster runtime backup state.
 * @param array<string, mixed> $variables
 */
function get_runtime_backup_state_as_cluster_admin(CamundaClient $client, ?string $physicalTenantId = null, ?int $hostIndex = null, array $variables = []): void
{
    $client->getRuntimeBackupStateAsClusterAdmin($physicalTenantId, $hostIndex, $variables);
}
// endregion GetRuntimeBackupStateAsClusterAdmin

// region DeleteRuntimeBackupStateAsClusterAdmin
/**
 * Delete cluster runtime backup state.
 * @param array<string, mixed> $variables
 */
function delete_runtime_backup_state_as_cluster_admin(CamundaClient $client, ?string $physicalTenantId = null, ?int $hostIndex = null, array $variables = []): void
{
    $client->deleteRuntimeBackupStateAsClusterAdmin($physicalTenantId, $hostIndex, $variables);
}
// endregion DeleteRuntimeBackupStateAsClusterAdmin

// region SyncRuntimeBackupStateAsClusterAdmin
/**
 * Sync cluster runtime backup state.
 * @param array<string, mixed> $variables
 */
function sync_runtime_backup_state_as_cluster_admin(CamundaClient $client, ?string $physicalTenantId = null, ?int $hostIndex = null, array $variables = []): void
{
    $client->syncRuntimeBackupStateAsClusterAdmin($physicalTenantId, $hostIndex, $variables);
}
// endregion SyncRuntimeBackupStateAsClusterAdmin

// region GetRuntimeBackupAsClusterAdmin
/**
 * Get a cluster runtime backup.
 * @param array<string, mixed> $variables
 */
function get_runtime_backup_as_cluster_admin(CamundaClient $client, int $backupId, ?string $physicalTenantId = null, ?int $hostIndex = null, array $variables = []): void
{
    $client->getRuntimeBackupAsClusterAdmin($backupId, $physicalTenantId, $hostIndex, $variables);
}
// endregion GetRuntimeBackupAsClusterAdmin

// region DeleteRuntimeBackupAsClusterAdmin
/**
 * Delete a cluster runtime backup.
 * @param array<string, mixed> $variables
 */
function delete_runtime_backup_as_cluster_admin(CamundaClient $client, int $backupId, ?string $physicalTenantId = null, ?int $hostIndex = null, array $variables = []): void
{
    $client->deleteRuntimeBackupAsClusterAdmin($backupId, $physicalTenantId, $hostIndex, $variables);
}
// endregion DeleteRuntimeBackupAsClusterAdmin
