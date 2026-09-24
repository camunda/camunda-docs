// Cluster variable operations: global and tenant-scoped CRUD plus search.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
	openapi "github.com/camunda/orchestration-cluster-api-go/client"
)

func createGlobalClusterVariableExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region CreateGlobalClusterVariable
	result, err := client.CreateGlobalClusterVariable(ctx,
		*openapi.NewCreateClusterVariableRequest("region", map[string]any{"value": "eu-1"}))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion CreateGlobalClusterVariable
	return nil
}

func getGlobalClusterVariableExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetGlobalClusterVariable
	result, err := client.GetGlobalClusterVariable(ctx, "region")
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion GetGlobalClusterVariable
	return nil
}

func updateGlobalClusterVariableExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region UpdateGlobalClusterVariable
	result, err := client.UpdateGlobalClusterVariable(ctx, "region",
		*openapi.NewUpdateClusterVariableRequest(map[string]any{"value": "eu-2"}))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion UpdateGlobalClusterVariable
	return nil
}

func deleteGlobalClusterVariableExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region DeleteGlobalClusterVariable
	return client.DeleteGlobalClusterVariable(ctx, "region")
	// endregion DeleteGlobalClusterVariable
}

func searchClusterVariablesExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchClusterVariables
	result, err := client.SearchClusterVariables(ctx, *openapi.NewClusterVariableSearchQueryRequest())
	if err != nil {
		return err
	}
	for _, v := range result.GetItems() {
		fmt.Printf("%v\n", v)
	}
	// endregion SearchClusterVariables
	return nil
}

func createTenantClusterVariableExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region CreateTenantClusterVariable
	result, err := client.CreateTenantClusterVariable(ctx, "tenant-a",
		*openapi.NewCreateClusterVariableRequest("region", map[string]any{"value": "eu-1"}))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion CreateTenantClusterVariable
	return nil
}

func getTenantClusterVariableExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetTenantClusterVariable
	result, err := client.GetTenantClusterVariable(ctx, "tenant-a", "region")
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion GetTenantClusterVariable
	return nil
}

func updateTenantClusterVariableExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region UpdateTenantClusterVariable
	result, err := client.UpdateTenantClusterVariable(ctx, "tenant-a", "region",
		*openapi.NewUpdateClusterVariableRequest(map[string]any{"value": "eu-2"}))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion UpdateTenantClusterVariable
	return nil
}

func deleteTenantClusterVariableExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region DeleteTenantClusterVariable
	return client.DeleteTenantClusterVariable(ctx, "tenant-a", "region")
	// endregion DeleteTenantClusterVariable
}
