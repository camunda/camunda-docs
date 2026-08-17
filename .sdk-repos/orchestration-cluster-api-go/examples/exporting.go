// Exporting operations: pause and resume export to secondary storage.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
)

func pauseExportingExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region PauseExporting
	// While exporting is paused, reads from secondary storage stop advancing.
	if err := client.PauseExporting(ctx); err != nil {
		return err
	}
	// endregion PauseExporting
	return nil
}

func resumeExportingExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region ResumeExporting
	if err := client.ResumeExporting(ctx); err != nil {
		return err
	}
	// endregion ResumeExporting
	return nil
}

func getExportingStatusExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetExportingStatus
	// Aggregated over every replica of the physical tenant.
	status, err := client.GetExportingStatus(ctx)
	if err != nil {
		return err
	}
	fmt.Printf("exporting status: %s\n", status.GetStatus())
	// endregion GetExportingStatus
	return nil
}
