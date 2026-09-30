// Process instance operations: create (by id/key), search, read, cancel, delete,
// migrate, modify, incident resolution, statistics, and batch operations.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
)

func createProcessInstanceByIdExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region CreateProcessInstanceById
	byID := camunda.NewProcessInstanceCreationInstructionById(camunda.ProcessDefinitionId("order-process"))
	byID.SetVariables(map[string]any{"orderId": "order-42"})

	result, err := client.CreateProcessInstance(ctx,
		camunda.ProcessInstanceCreationInstructionByIdAsProcessInstanceCreationInstruction(byID))
	if err != nil {
		return err
	}
	fmt.Printf("started instance %v\n", result.GetProcessInstanceKey())
	// endregion CreateProcessInstanceById
	return nil
}

func createProcessInstanceByKeyExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region CreateProcessInstanceByKey
	// Use a specific process definition version by its key.
	byKey := camunda.NewProcessInstanceCreationInstructionByKey(camunda.ProcessDefinitionKey("2251799813685330"))
	byKey.SetVariables(map[string]any{"orderId": "order-42"})

	result, err := client.CreateProcessInstance(ctx,
		camunda.ProcessInstanceCreationInstructionByKeyAsProcessInstanceCreationInstruction(byKey))
	if err != nil {
		return err
	}
	fmt.Printf("started instance %v\n", result.GetProcessInstanceKey())
	// endregion CreateProcessInstanceByKey
	return nil
}

func searchProcessInstancesExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchProcessInstances
	result, err := client.SearchProcessInstances(ctx, *camunda.NewProcessInstanceSearchQuery())
	if err != nil {
		return err
	}
	for _, pi := range result.GetItems() {
		fmt.Printf("%v: %v\n", pi.GetProcessInstanceKey(), pi.GetState())
	}
	// endregion SearchProcessInstances
	return nil
}

func getProcessInstanceExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetProcessInstance
	instance, err := client.GetProcessInstance(ctx, camunda.MustProcessInstanceKey("2251799813685340"))
	if err != nil {
		return err
	}
	fmt.Printf("state=%v definition=%q\n", instance.GetState(), instance.GetProcessDefinitionId())
	// endregion GetProcessInstance
	return nil
}

func cancelProcessInstanceExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region CancelProcessInstance
	return client.CancelProcessInstance(ctx,
		camunda.MustProcessInstanceKey("2251799813685340"),
		*camunda.NewCancelProcessInstanceRequest())
	// endregion CancelProcessInstance
}

func deleteProcessInstanceExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region DeleteProcessInstance
	return client.DeleteProcessInstance(ctx,
		camunda.MustProcessInstanceKey("2251799813685340"),
		*camunda.NewDeleteProcessInstanceRequest())
	// endregion DeleteProcessInstance
}

func getProcessInstanceCallHierarchyExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetProcessInstanceCallHierarchy
	hierarchy, err := client.GetProcessInstanceCallHierarchy(ctx, camunda.MustProcessInstanceKey("2251799813685340"))
	if err != nil {
		return err
	}
	for _, entry := range hierarchy {
		fmt.Printf("%v\n", entry)
	}
	// endregion GetProcessInstanceCallHierarchy
	return nil
}

func getProcessInstanceSequenceFlowsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetProcessInstanceSequenceFlows
	result, err := client.GetProcessInstanceSequenceFlows(ctx, camunda.MustProcessInstanceKey("2251799813685340"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion GetProcessInstanceSequenceFlows
	return nil
}

func getProcessInstanceStatisticsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetProcessInstanceStatistics
	result, err := client.GetProcessInstanceStatistics(ctx, camunda.MustProcessInstanceKey("2251799813685340"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion GetProcessInstanceStatistics
	return nil
}

func getProcessInstanceWaitStateStatisticsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetProcessInstanceWaitStateStatistics
	result, err := client.GetProcessInstanceWaitStateStatistics(ctx, camunda.MustProcessInstanceKey("2251799813685340"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion GetProcessInstanceWaitStateStatistics
	return nil
}

func resolveProcessInstanceIncidentsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region ResolveProcessInstanceIncidents
	result, err := client.ResolveProcessInstanceIncidents(ctx, camunda.MustProcessInstanceKey("2251799813685340"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion ResolveProcessInstanceIncidents
	return nil
}

func searchProcessInstanceIncidentsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchProcessInstanceIncidents
	result, err := client.SearchProcessInstanceIncidents(ctx,
		camunda.MustProcessInstanceKey("2251799813685340"),
		*camunda.NewIncidentSearchQuery())
	if err != nil {
		return err
	}
	for _, inc := range result.GetItems() {
		fmt.Printf("%v\n", inc)
	}
	// endregion SearchProcessInstanceIncidents
	return nil
}

func migrateProcessInstanceExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region MigrateProcessInstance
	instruction := camunda.NewProcessInstanceMigrationInstruction(
		camunda.ProcessDefinitionKey("2251799813685399"),
		[]camunda.MigrateProcessInstanceMappingInstruction{
			*camunda.NewMigrateProcessInstanceMappingInstruction("review", "review-v2"),
		})

	return client.MigrateProcessInstance(ctx, camunda.MustProcessInstanceKey("2251799813685340"), *instruction)
	// endregion MigrateProcessInstance
}

func modifyProcessInstanceExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region ModifyProcessInstance
	return client.ModifyProcessInstance(ctx,
		camunda.MustProcessInstanceKey("2251799813685340"),
		*camunda.NewProcessInstanceModificationInstruction())
	// endregion ModifyProcessInstance
}

func cancelProcessInstancesBatchOperationExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region CancelProcessInstancesBatchOperation
	// Cancel every instance matching a filter in a single batch operation.
	req := camunda.NewProcessInstanceCancellationBatchOperationRequest(*camunda.NewProcessInstanceFilter())

	result, err := client.CancelProcessInstancesBatchOperation(ctx, *req)
	if err != nil {
		return err
	}
	fmt.Printf("created batch operation %v\n", result.GetBatchOperationKey())
	// endregion CancelProcessInstancesBatchOperation
	return nil
}

func deleteProcessInstancesBatchOperationExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region DeleteProcessInstancesBatchOperation
	req := camunda.NewProcessInstanceDeletionBatchOperationRequest(*camunda.NewProcessInstanceFilter())

	result, err := client.DeleteProcessInstancesBatchOperation(ctx, *req)
	if err != nil {
		return err
	}
	fmt.Printf("created batch operation %v\n", result.GetBatchOperationKey())
	// endregion DeleteProcessInstancesBatchOperation
	return nil
}

func resolveIncidentsBatchOperationExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region ResolveIncidentsBatchOperation
	req := camunda.NewProcessInstanceIncidentResolutionBatchOperationRequest(*camunda.NewProcessInstanceFilter())

	result, err := client.ResolveIncidentsBatchOperation(ctx, *req)
	if err != nil {
		return err
	}
	fmt.Printf("created batch operation %v\n", result.GetBatchOperationKey())
	// endregion ResolveIncidentsBatchOperation
	return nil
}

func migrateProcessInstancesBatchOperationExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region MigrateProcessInstancesBatchOperation
	plan := camunda.NewProcessInstanceMigrationBatchOperationPlan(
		camunda.ProcessDefinitionKey("2251799813685399"),
		[]camunda.MigrateProcessInstanceMappingInstruction{
			*camunda.NewMigrateProcessInstanceMappingInstruction("review", "review-v2"),
		})
	req := camunda.NewProcessInstanceMigrationBatchOperationRequest(*camunda.NewProcessInstanceFilter(), *plan)

	result, err := client.MigrateProcessInstancesBatchOperation(ctx, *req)
	if err != nil {
		return err
	}
	fmt.Printf("created batch operation %v\n", result.GetBatchOperationKey())
	// endregion MigrateProcessInstancesBatchOperation
	return nil
}

func modifyProcessInstancesBatchOperationExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region ModifyProcessInstancesBatchOperation
	req := camunda.NewProcessInstanceModificationBatchOperationRequest(
		*camunda.NewProcessInstanceFilter(),
		[]camunda.ProcessInstanceModificationMoveBatchOperationInstruction{
			*camunda.NewProcessInstanceModificationMoveBatchOperationInstruction("review", "approve"),
		})

	result, err := client.ModifyProcessInstancesBatchOperation(ctx, *req)
	if err != nil {
		return err
	}
	fmt.Printf("created batch operation %v\n", result.GetBatchOperationKey())
	// endregion ModifyProcessInstancesBatchOperation
	return nil
}

func suspendProcessInstanceExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SuspendProcessInstance
	return client.SuspendProcessInstance(ctx,
		camunda.MustProcessInstanceKey("2251799813685340"),
		*camunda.NewSuspendProcessInstanceRequest())
	// endregion SuspendProcessInstance
}

func resumeProcessInstanceExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region ResumeProcessInstance
	return client.ResumeProcessInstance(ctx,
		camunda.MustProcessInstanceKey("2251799813685340"),
		*camunda.NewResumeProcessInstanceRequest())
	// endregion ResumeProcessInstance
}

func assignProcessInstanceBusinessIdExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region AssignProcessInstanceBusinessId
	return client.AssignProcessInstanceBusinessId(ctx,
		camunda.MustProcessInstanceKey("2251799813685340"),
		*camunda.NewProcessInstanceBusinessIdAssignmentInstruction("order-42"))
	// endregion AssignProcessInstanceBusinessId
}

func suspendProcessInstancesBatchOperationExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SuspendProcessInstancesBatchOperation
	// Suspend every instance matching a filter in a single batch operation.
	req := camunda.NewProcessInstanceSuspensionBatchOperationRequest(*camunda.NewProcessInstanceFilter())

	result, err := client.SuspendProcessInstancesBatchOperation(ctx, *req)
	if err != nil {
		return err
	}
	fmt.Printf("created batch operation %v\n", result.GetBatchOperationKey())
	// endregion SuspendProcessInstancesBatchOperation
	return nil
}

func resumeProcessInstancesBatchOperationExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region ResumeProcessInstancesBatchOperation
	// Resume every previously-suspended instance matching a filter.
	req := camunda.NewProcessInstanceResumptionBatchOperationRequest(*camunda.NewProcessInstanceFilter())

	result, err := client.ResumeProcessInstancesBatchOperation(ctx, *req)
	if err != nil {
		return err
	}
	fmt.Printf("created batch operation %v\n", result.GetBatchOperationKey())
	// endregion ResumeProcessInstancesBatchOperation
	return nil
}
