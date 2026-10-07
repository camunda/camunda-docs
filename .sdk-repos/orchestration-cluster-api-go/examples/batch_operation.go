// Batch operation lifecycle: search, read, and control (cancel/resume/suspend).
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
)

func searchBatchOperationsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchBatchOperations
	result, err := client.SearchBatchOperations(ctx, *camunda.NewBatchOperationSearchQuery())
	if err != nil {
		return err
	}
	for _, op := range result.GetItems() {
		fmt.Printf("%v\n", op)
	}
	// endregion SearchBatchOperations
	return nil
}

func searchBatchOperationItemsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchBatchOperationItems
	result, err := client.SearchBatchOperationItems(ctx, *camunda.NewBatchOperationItemSearchQuery())
	if err != nil {
		return err
	}
	for _, item := range result.GetItems() {
		fmt.Printf("%v\n", item)
	}
	// endregion SearchBatchOperationItems
	return nil
}

func getBatchOperationExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetBatchOperation
	op, err := client.GetBatchOperation(ctx, "2251799813685290")
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", op)
	// endregion GetBatchOperation
	return nil
}

func cancelBatchOperationExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region CancelBatchOperation
	return client.CancelBatchOperation(ctx, "2251799813685290")
	// endregion CancelBatchOperation
}

func suspendBatchOperationExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SuspendBatchOperation
	return client.SuspendBatchOperation(ctx, "2251799813685290")
	// endregion SuspendBatchOperation
}

func resumeBatchOperationExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region ResumeBatchOperation
	return client.ResumeBatchOperation(ctx, "2251799813685290")
	// endregion ResumeBatchOperation
}
