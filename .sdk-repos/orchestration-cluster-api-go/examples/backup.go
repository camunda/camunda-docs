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

func takeHistoryBackupAsClusterAdminExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region TakeHistoryBackupAsClusterAdmin
	// Takes a history backup for every physical tenant in the cluster simultaneously.
	result, err := client.TakeHistoryBackupAsClusterAdmin(ctx, *openapi.NewTakeHistoryBackupRequest(42))
	if err != nil {
		return err
	}
	fmt.Printf("cluster history backup %d across %d tenant(s)\n", result.GetBackupId(), len(result.GetPhysicalTenants()))
	// endregion TakeHistoryBackupAsClusterAdmin
	return nil
}

func listHistoryBackupsAsClusterAdminExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region ListHistoryBackupsAsClusterAdmin
	// Lists history backups across all physical tenants in the cluster.
	backups, err := client.ListHistoryBackupsAsClusterAdmin(ctx)
	if err != nil {
		return err
	}
	for _, backup := range backups {
		fmt.Printf("cluster history backup %d: %d tenant(s)\n", backup.GetBackupId(), len(backup.GetPhysicalTenants()))
	}
	// endregion ListHistoryBackupsAsClusterAdmin
	return nil
}

func getHistoryBackupAsClusterAdminExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetHistoryBackupAsClusterAdmin
	backup, err := client.GetHistoryBackupAsClusterAdmin(ctx, 42)
	if err != nil {
		return err
	}
	for _, tenant := range backup.GetPhysicalTenants() {
		fmt.Printf("tenant %s: state=%v\n", tenant.GetPhysicalTenantId(), tenant.GetState())
	}
	// endregion GetHistoryBackupAsClusterAdmin
	return nil
}

func deleteHistoryBackupAsClusterAdminExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region DeleteHistoryBackupAsClusterAdmin
	if err := client.DeleteHistoryBackupAsClusterAdmin(ctx, 42); err != nil {
		return err
	}
	// endregion DeleteHistoryBackupAsClusterAdmin
	return nil
}

func takeRuntimeBackupAsClusterAdminExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region TakeRuntimeBackupAsClusterAdmin
	// Takes a runtime backup across every physical tenant in the cluster simultaneously.
	// Pass SetBackupId to use an explicit backup ID; omit it to let the cluster
	// generate one automatically (generated-id mode). Do not mix modes: sending a
	// backup ID when the cluster is configured for generated IDs will be rejected.
	req := openapi.NewTakeRuntimeBackupRequest()
	req.SetBackupId(42)

	result, err := client.TakeRuntimeBackupAsClusterAdmin(ctx, *req)
	if err != nil {
		return err
	}
	for _, tenant := range result.GetPhysicalTenants() {
		fmt.Printf("%v\n", tenant)
	}
	// endregion TakeRuntimeBackupAsClusterAdmin
	return nil
}

func listRuntimeBackupsAsClusterAdminExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region ListRuntimeBackupsAsClusterAdmin
	// Lists runtime backups across all physical tenants in the cluster.
	backups, err := client.ListRuntimeBackupsAsClusterAdmin(ctx)
	if err != nil {
		return err
	}
	for _, backup := range backups {
		fmt.Printf("cluster runtime backup %d: state=%v, %d tenant(s)\n",
			backup.GetBackupId(), backup.GetState(), len(backup.GetPhysicalTenants()))
	}
	// endregion ListRuntimeBackupsAsClusterAdmin
	return nil
}

func getRuntimeBackupStateAsClusterAdminExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetRuntimeBackupStateAsClusterAdmin
	// Returns the runtime backup state for every physical tenant in the cluster.
	state, err := client.GetRuntimeBackupStateAsClusterAdmin(ctx)
	if err != nil {
		return err
	}
	for _, tenant := range state.GetPhysicalTenants() {
		fmt.Printf("%v\n", tenant)
	}
	// endregion GetRuntimeBackupStateAsClusterAdmin
	return nil
}

func deleteRuntimeBackupStateAsClusterAdminExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region DeleteRuntimeBackupStateAsClusterAdmin
	// Clears the persisted runtime backup state across all physical tenants.
	if err := client.DeleteRuntimeBackupStateAsClusterAdmin(ctx); err != nil {
		return err
	}
	// endregion DeleteRuntimeBackupStateAsClusterAdmin
	return nil
}

func syncRuntimeBackupStateAsClusterAdminExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SyncRuntimeBackupStateAsClusterAdmin
	// Force-writes the current checkpoint/backup metadata to each physical tenant's
	// backup store and returns the updated state. Use this to repair stale or missing
	// state entries without triggering a new backup.
	state, err := client.SyncRuntimeBackupStateAsClusterAdmin(ctx)
	if err != nil {
		return err
	}
	for _, tenant := range state.GetPhysicalTenants() {
		fmt.Printf("%v\n", tenant)
	}
	// endregion SyncRuntimeBackupStateAsClusterAdmin
	return nil
}

func getRuntimeBackupAsClusterAdminExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetRuntimeBackupAsClusterAdmin
	backup, err := client.GetRuntimeBackupAsClusterAdmin(ctx, 42)
	if err != nil {
		return err
	}
	fmt.Printf("cluster runtime backup %d: state=%v\n", backup.GetBackupId(), backup.GetState())
	for _, tenant := range backup.GetPhysicalTenants() {
		fmt.Printf("  tenant %v\n", tenant)
	}
	// endregion GetRuntimeBackupAsClusterAdmin
	return nil
}

func deleteRuntimeBackupAsClusterAdminExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region DeleteRuntimeBackupAsClusterAdmin
	// Deletes the runtime backup with the given id from all physical tenants.
	if err := client.DeleteRuntimeBackupAsClusterAdmin(ctx, 42); err != nil {
		return err
	}
	// endregion DeleteRuntimeBackupAsClusterAdmin
	return nil
}
