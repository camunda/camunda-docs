// Recovery operations: change cluster mode and restore from backup.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
	openapi "github.com/camunda/orchestration-cluster-api-go/client"
)

func changeClusterModeExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region ChangeClusterMode
	result, err := client.ChangeClusterMode(ctx)
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion ChangeClusterMode
	return nil
}

func restoreExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region Restore
	result, err := client.Restore(ctx, *openapi.NewRestoreRequest())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion Restore
	return nil
}

func getRestoreStatusExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetRestoreStatus
	// Reports the in-flight restore only — 404 once it has finished.
	status, err := client.GetRestoreStatus(ctx)
	if err != nil {
		return err
	}
	fmt.Printf("restore %s: %s\n", status.GetChangeId(), status.GetStatus())
	for _, broker := range status.GetBrokers() {
		fmt.Printf("%v\n", broker)
	}
	// endregion GetRestoreStatus
	return nil
}

func changeClusterModeAsClusterAdminExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region ChangeClusterModeAsClusterAdmin
	// Changes the cluster mode as a cluster-level admin (cross-tenant authority).
	result, err := client.ChangeClusterModeAsClusterAdmin(ctx, func(r openapi.ApiChangeClusterModeAsClusterAdminRequest) openapi.ApiChangeClusterModeAsClusterAdminRequest {
		return r.Mode(openapi.MODE_RECOVERING)
	})
	if err != nil {
		return err
	}
	fmt.Printf("change %s: %d planned operation group(s)\n", result.GetChangeId(), len(result.GetPlannedChanges()))
	// endregion ChangeClusterModeAsClusterAdmin
	return nil
}

func restoreAsClusterAdminExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region RestoreAsClusterAdmin
	// Triggers a cluster-level restore (cluster-admin authority), restoring from the given backup IDs.
	// backupIds are one per partition, so the placeholder slice below must be extended to
	// match the actual partition count of the target cluster (shown here for a 2-partition cluster).
	restoreRequest := openapi.NewClusterRestoreRequestWithDefaults()
	restoreRequest.SetBackupIds([]int64{1, 2})
	result, err := client.RestoreAsClusterAdmin(ctx, *restoreRequest)
	if err != nil {
		return err
	}
	fmt.Printf("restore change id: %s\n", result.GetChangeId())
	// endregion RestoreAsClusterAdmin
	return nil
}
