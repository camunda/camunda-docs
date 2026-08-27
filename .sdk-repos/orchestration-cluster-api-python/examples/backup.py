# Compilable usage examples for runtime backup operations.
# These examples are type-checked during build to guard against API regressions.
from __future__ import annotations

from camunda_orchestration_sdk import (
    CamundaClient,
    TakeHistoryBackupRequest,
    TakeRuntimeBackupRequest,
)


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
