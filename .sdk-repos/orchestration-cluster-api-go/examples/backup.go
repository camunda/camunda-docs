// Backup operations: take, inspect, and delete runtime backups of the physical tenant.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
	openapi "github.com/camunda/orchestration-cluster-api-go/client"
)

func takeRuntimeBackupExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region TakeRuntimeBackup
	req := openapi.NewTakeRuntimeBackupRequest()
	// The id is required here, and must be omitted instead when continuous backups
	// or a backup/checkpoint schedule is enabled for the tenant — the server
	// generates it in that case.
	req.SetBackupId(42)

	result, err := client.TakeRuntimeBackup(ctx, *req)
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion TakeRuntimeBackup
	return nil
}

func listRuntimeBackupsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region ListRuntimeBackups
	backups, err := client.ListRuntimeBackups(ctx)
	if err != nil {
		return err
	}
	for _, backup := range backups {
		fmt.Printf("backup %v is %v\n", backup.GetBackupId(), backup.GetState())
	}
	// endregion ListRuntimeBackups
	return nil
}

func getRuntimeBackupExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetRuntimeBackup
	backup, err := client.GetRuntimeBackup(ctx, 42)
	if err != nil {
		return err
	}
	// Details cover every partition of the physical tenant.
	for _, partition := range backup.GetDetails() {
		fmt.Printf("%v\n", partition)
	}
	// endregion GetRuntimeBackup
	return nil
}

func deleteRuntimeBackupExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region DeleteRuntimeBackup
	if err := client.DeleteRuntimeBackup(ctx, 42); err != nil {
		return err
	}
	// endregion DeleteRuntimeBackup
	return nil
}

func getRuntimeBackupStateExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetRuntimeBackupState
	state, err := client.GetRuntimeBackupState(ctx)
	if err != nil {
		return err
	}
	for _, checkpoint := range state.GetCheckpointStates() {
		fmt.Printf("%v\n", checkpoint)
	}
	// endregion GetRuntimeBackupState
	return nil
}

func syncRuntimeBackupStateExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SyncRuntimeBackupState
	// Re-reads the backup store so the reported state matches what is stored.
	state, err := client.SyncRuntimeBackupState(ctx)
	if err != nil {
		return err
	}
	for _, backup := range state.GetBackupStates() {
		fmt.Printf("%v\n", backup)
	}
	// endregion SyncRuntimeBackupState
	return nil
}

func deleteRuntimeBackupStateExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region DeleteRuntimeBackupState
	if err := client.DeleteRuntimeBackupState(ctx); err != nil {
		return err
	}
	// endregion DeleteRuntimeBackupState
	return nil
}

func takeHistoryBackupExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region TakeHistoryBackup
	result, err := client.TakeHistoryBackup(ctx, *openapi.NewTakeHistoryBackupRequest(42))
	if err != nil {
		return err
	}
	fmt.Printf("backup %d scheduled %d snapshot(s)\n", result.GetBackupId(), len(result.GetScheduledSnapshots()))
	// endregion TakeHistoryBackup
	return nil
}

func listHistoryBackupsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region ListHistoryBackups
	backups, err := client.ListHistoryBackups(ctx)
	if err != nil {
		return err
	}
	for _, backup := range backups {
		fmt.Printf("history backup %d is %v\n", backup.GetBackupId(), backup.GetState())
	}
	// endregion ListHistoryBackups
	return nil
}

func getHistoryBackupExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetHistoryBackup
	backup, err := client.GetHistoryBackup(ctx, 42)
	if err != nil {
		return err
	}
	fmt.Printf("history backup %d state=%v\n", backup.GetBackupId(), backup.GetState())
	for _, snapshot := range backup.GetDetails() {
		fmt.Printf("  snapshot %v\n", snapshot)
	}
	// endregion GetHistoryBackup
	return nil
}

func deleteHistoryBackupExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region DeleteHistoryBackup
	if err := client.DeleteHistoryBackup(ctx, 42); err != nil {
		return err
	}
	// endregion DeleteHistoryBackup
	return nil
}
