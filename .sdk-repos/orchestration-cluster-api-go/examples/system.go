// System and setup operations: initial admin user, usage metrics, and
// system configuration.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
	openapi "github.com/camunda/orchestration-cluster-api-go/client"
)

func createAdminUserExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region CreateAdminUser
	// One-time setup: create the initial administrator on a fresh cluster.
	result, err := client.CreateAdminUser(ctx, *openapi.NewUserRequest("ChangeMe123!", "admin"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion CreateAdminUser
	return nil
}

func getUsageMetricsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetUsageMetrics
	metrics, err := client.GetUsageMetrics(ctx)
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", metrics)
	// endregion GetUsageMetrics
	return nil
}

func getSystemConfigurationExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetSystemConfiguration
	config, err := client.GetSystemConfiguration(ctx)
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", config)
	// endregion GetSystemConfiguration
	return nil
}
