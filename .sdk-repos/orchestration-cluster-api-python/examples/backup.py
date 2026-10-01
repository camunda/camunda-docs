# Compilable usage examples for runtime backup operations.
# These examples are type-checked during build to guard against API regressions.
from __future__ import annotations

from camunda_orchestration_sdk import (
    CamundaClient,
    TakeHistoryBackupRequest,
    TakeRuntimeBackupRequest,
)

# TakeHistoryBackupRequest is re-used by the cluster-admin variants as well.


# region TakeRuntimeBackup
def take_runtime_backup_example(backup_id: int) -> None:
    client = CamundaClient()

    # `backup_id` is optional: leave it unset when continuous backups or a
    # backup/checkpoint schedule is enabled and an id is generated for you.
    # Here it is supplied explicitly, which is what a one-off manual backup does.
    result = client.take_runtime_backup(
        data=TakeRuntimeBackupRequest(
            backup_id=backup_id,
        )
    )

    print(f"Scheduled backup {result.backup_id}")
# endregion TakeRuntimeBackup


# region ListRuntimeBackups
def list_runtime_backups_example() -> None:
    client = CamundaClient()

    # `prefix` is a backup id prefix followed by a single `*` wildcard.
    result = client.list_runtime_backups(prefix="17567*")

    for backup in result:
        print(f"Runtime backup: {backup}")
# endregion ListRuntimeBackups


# region GetRuntimeBackup
def get_runtime_backup_example(backup_id: int) -> None:
    client = CamundaClient()

    result = client.get_runtime_backup(backup_id=backup_id)

    print(f"Backup {result.backup_id} is {result.state.value}")

    for partition in result.details:
        print(f"  partition {partition.partition_id}: {partition.state.value}")
# endregion GetRuntimeBackup


# region DeleteRuntimeBackup
def delete_runtime_backup_example(backup_id: int) -> None:
    client = CamundaClient()

    client.delete_runtime_backup(backup_id=backup_id)
# endregion DeleteRuntimeBackup


# region GetRuntimeBackupState
def get_runtime_backup_state_example() -> None:
    client = CamundaClient()

    result = client.get_runtime_backup_state()

    for checkpoint in result.checkpoint_states:
        print(
            f"Partition {checkpoint.partition_id} checkpoint {checkpoint.checkpoint_id}"
            f" at position {checkpoint.checkpoint_position}"
        )

    for backup_range in result.ranges:
        print(
            f"Partition {backup_range.partition_id} range:"
            f" {backup_range.start} - {backup_range.end}"
        )
# endregion GetRuntimeBackupState


# region SyncRuntimeBackupState
def sync_runtime_backup_state_example() -> None:
    client = CamundaClient()

    # Force-writes the checkpoint and backup metadata of every partition to the
    # backup store, independent of any backup being taken or confirmed.
    result = client.sync_runtime_backup_state()

    print(f"Synced {len(result.backup_states)} partition backup states")
# endregion SyncRuntimeBackupState


# region DeleteRuntimeBackupState
def delete_runtime_backup_state_example() -> None:
    client = CamundaClient()

    # Clears all checkpoint info, backup info, checkpoint metadata, and backup
    # ranges of every partition. Used when switching backup stores.
    client.delete_runtime_backup_state()
# endregion DeleteRuntimeBackupState


# region TakeHistoryBackup
def take_history_backup_example(backup_id: int) -> None:
    client = CamundaClient()

    # Backups are logically ordered by id, so each successive backup must use a
    # higher id than the previous one.
    result = client.take_history_backup(
        data=TakeHistoryBackupRequest(
            backup_id=backup_id,
        )
    )

    print(f"Scheduled history backup {result.backup_id}")

    for snapshot in result.scheduled_snapshots:
        print(f"  {snapshot}")
# endregion TakeHistoryBackup


# region ListHistoryBackups
def list_history_backups_example() -> None:
    client = CamundaClient()

    # `prefix` is a backup id prefix followed by a single `*` wildcard.
    result = client.list_history_backups(prefix="17567*")

    for backup in result:
        print(f"History backup: {backup}")
# endregion ListHistoryBackups


# region GetHistoryBackup
def get_history_backup_example(backup_id: int) -> None:
    client = CamundaClient()

    result = client.get_history_backup(backup_id=backup_id)

    # The aggregated state is derived from the state of every expected snapshot.
    print(f"History backup {result.backup_id} is {result.state.value}")
# endregion GetHistoryBackup


# region DeleteHistoryBackup
def delete_history_backup_example(backup_id: int) -> None:
    client = CamundaClient()

    client.delete_history_backup(backup_id=backup_id)
# endregion DeleteHistoryBackup


# region TakeRuntimeBackupAsClusterAdmin
def take_runtime_backup_as_cluster_admin_example(backup_id: int) -> None:
    client = CamundaClient()

    # Requires the cluster-admin security chain. Triggers the backup on every
    # physical tenant; the backup id must be higher than any previously used id.
    # Use `physical_tenant_id` to target a single physical tenant instead.
    result = client.take_runtime_backup_as_cluster_admin(
        data=TakeRuntimeBackupRequest(
            backup_id=backup_id,
        )
    )

    for tenant in result.physical_tenants:
        print(f"  physical tenant {tenant.physical_tenant_id}: backup {tenant.backup_id}")
# endregion TakeRuntimeBackupAsClusterAdmin


# region ListRuntimeBackupsAsClusterAdmin
def list_runtime_backups_as_cluster_admin_example() -> None:
    client = CamundaClient()

    # Lists backups across every physical tenant. Pass `physical_tenant_id` to
    # restrict to one tenant. `prefix` filters to backup ids starting with the
    # given value (end with a `*` wildcard, e.g. "17567*").
    backups = client.list_runtime_backups_as_cluster_admin(prefix="17567*")

    for backup in backups:
        print(f"Runtime backup: {backup}")
# endregion ListRuntimeBackupsAsClusterAdmin


# region GetRuntimeBackupAsClusterAdmin
def get_runtime_backup_as_cluster_admin_example(backup_id: int) -> None:
    client = CamundaClient()

    # Returns what each physical tenant reports for the given backup id.
    # A tenant reporting `DOES_NOT_EXIST` is a successful observation, not an error.
    result = client.get_runtime_backup_as_cluster_admin(backup_id=backup_id)

    print(f"Cluster runtime backup {result.backup_id} is {result.state.value}")

    for tenant in result.physical_tenants:
        print(f"  physical tenant {tenant.physical_tenant_id}: {tenant.state.value}")
# endregion GetRuntimeBackupAsClusterAdmin


# region DeleteRuntimeBackupAsClusterAdmin
def delete_runtime_backup_as_cluster_admin_example(backup_id: int) -> None:
    client = CamundaClient()

    # Deletes the backup from every physical tenant. A tenant that does not hold
    # it already counts as deleted, so this is idempotent when all tenants are
    # reachable. Use `physical_tenant_id` to narrow to a single tenant.
    client.delete_runtime_backup_as_cluster_admin(backup_id=backup_id)
# endregion DeleteRuntimeBackupAsClusterAdmin


# region GetRuntimeBackupStateAsClusterAdmin
def get_runtime_backup_state_as_cluster_admin_example() -> None:
    client = CamundaClient()

    # Reports the checkpoint and backup state of every partition of every
    # physical tenant. Use `physical_tenant_id` to narrow to a single tenant.
    result = client.get_runtime_backup_state_as_cluster_admin()

    for tenant in result.physical_tenants:
        print(f"Physical tenant {tenant.physical_tenant_id}:")
        for checkpoint in tenant.state.checkpoint_states:
            print(
                f"  partition {checkpoint.partition_id} checkpoint"
                f" {checkpoint.checkpoint_id}"
            )
# endregion GetRuntimeBackupStateAsClusterAdmin


# region SyncRuntimeBackupStateAsClusterAdmin
def sync_runtime_backup_state_as_cluster_admin_example() -> None:
    client = CamundaClient()

    # Force-writes the checkpoint and backup metadata of every partition of
    # every physical tenant to the backup store, independent of any backup being
    # taken or confirmed. Use `physical_tenant_id` to narrow to a single tenant.
    result = client.sync_runtime_backup_state_as_cluster_admin()

    print(f"Synced {len(result.physical_tenants)} physical tenant backup states")
# endregion SyncRuntimeBackupStateAsClusterAdmin


# region DeleteRuntimeBackupStateAsClusterAdmin
def delete_runtime_backup_state_as_cluster_admin_example() -> None:
    client = CamundaClient()

    # Clears all checkpoint info, backup info, checkpoint metadata, and backup
    # ranges of every partition of every physical tenant. Used when switching
    # backup stores. Use `physical_tenant_id` to narrow to a single tenant.
    client.delete_runtime_backup_state_as_cluster_admin()
# endregion DeleteRuntimeBackupStateAsClusterAdmin


# region TakeHistoryBackupAsClusterAdmin
def take_history_backup_as_cluster_admin_example(backup_id: int) -> None:
    client = CamundaClient()

    # Requires the cluster-admin security chain. Triggers the backup on every
    # physical tenant; the backup id must be higher than any previously used id.
    # Use `physical_tenant_id` to target a single physical tenant instead.
    result = client.take_history_backup_as_cluster_admin(
        data=TakeHistoryBackupRequest(
            backup_id=backup_id,
        )
    )

    print(f"Scheduled history backup {result.backup_id}")

    for tenant in result.physical_tenants:
        print(f"  physical tenant {tenant.physical_tenant_id}: scheduled")
# endregion TakeHistoryBackupAsClusterAdmin


# region ListHistoryBackupsAsClusterAdmin
def list_history_backups_as_cluster_admin_example() -> None:
    client = CamundaClient()

    # Lists backups across every physical tenant. Pass `physical_tenant_id` to
    # restrict to one tenant. `prefix` filters to backup ids starting with the
    # given value (end with a `*` wildcard, e.g. "17567*").
    backups = client.list_history_backups_as_cluster_admin(prefix="17567*")

    for backup in backups:
        print(f"History backup: {backup}")
# endregion ListHistoryBackupsAsClusterAdmin


# region GetHistoryBackupAsClusterAdmin
def get_history_backup_as_cluster_admin_example(backup_id: int) -> None:
    client = CamundaClient()

    # Returns what each physical tenant reports for the given backup id.
    # A tenant reporting `NOT_FOUND` is a successful observation, not an error.
    result = client.get_history_backup_as_cluster_admin(backup_id=backup_id)

    print(f"Cluster history backup {result.backup_id}")

    for tenant in result.physical_tenants:
        print(f"  physical tenant {tenant.physical_tenant_id}: {tenant.state.value}")
# endregion GetHistoryBackupAsClusterAdmin


# region DeleteHistoryBackupAsClusterAdmin
def delete_history_backup_as_cluster_admin_example(backup_id: int) -> None:
    client = CamundaClient()

    # Deletes the backup from every physical tenant. A tenant that does not hold
    # it already counts as deleted, so this is idempotent when all tenants are
    # reachable. Use `physical_tenant_id` to narrow to a single tenant.
    client.delete_history_backup_as_cluster_admin(backup_id=backup_id)
# endregion DeleteHistoryBackupAsClusterAdmin
