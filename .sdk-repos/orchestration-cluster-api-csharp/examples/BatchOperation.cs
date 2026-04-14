// Compilable usage examples for batch operation management.
// These examples are type-checked during build to guard against API regressions.
using Camunda.Orchestration.Sdk;

public static class BatchOperationExamples
{
    #region GetBatchOperation
    // <GetBatchOperation>
    public static async Task GetBatchOperationExample(BatchOperationKey batchOperationKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetBatchOperationAsync(
            batchOperationKey);

        Console.WriteLine($"Batch operation: {result.BatchOperationKey}");
    }
    // </GetBatchOperation>
    #endregion GetBatchOperation

    #region SearchBatchOperations

    // <SearchBatchOperations>
    public static async Task SearchBatchOperationsExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchBatchOperationsAsync(
            new BatchOperationSearchQuery());

        foreach (var op in result.Items)
        {
            Console.WriteLine($"Batch operation: {op.BatchOperationKey}");
        }
    }
    // </SearchBatchOperations>
    #endregion SearchBatchOperations

    #region SearchBatchOperationItems

    // <SearchBatchOperationItems>
    public static async Task SearchBatchOperationItemsExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchBatchOperationItemsAsync(
            new BatchOperationItemSearchQuery());

        foreach (var item in result.Items)
        {
            Console.WriteLine($"Item: {item.ItemKey}");
        }
    }
    // </SearchBatchOperationItems>
    #endregion SearchBatchOperationItems

    #region CancelBatchOperation

    // <CancelBatchOperation>
    public static async Task CancelBatchOperationExample(BatchOperationKey batchOperationKey)
    {
        using var client = CamundaClient.Create();

        await client.CancelBatchOperationAsync(batchOperationKey);
    }
    // </CancelBatchOperation>
    #endregion CancelBatchOperation

    #region SuspendBatchOperation

    // <SuspendBatchOperation>
    public static async Task SuspendBatchOperationExample(BatchOperationKey batchOperationKey)
    {
        using var client = CamundaClient.Create();

        await client.SuspendBatchOperationAsync(batchOperationKey);
    }
    // </SuspendBatchOperation>
    #endregion SuspendBatchOperation

    #region ResumeBatchOperation

    // <ResumeBatchOperation>
    public static async Task ResumeBatchOperationExample(BatchOperationKey batchOperationKey)
    {
        using var client = CamundaClient.Create();

        await client.ResumeBatchOperationAsync(batchOperationKey);
    }
    // </ResumeBatchOperation>
    #endregion ResumeBatchOperation

    #region CancelProcessInstancesBatchOperation

    // <CancelProcessInstancesBatchOperation>
    public static async Task CancelProcessInstancesBatchOperationExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.CancelProcessInstancesBatchOperationAsync(
            new ProcessInstanceCancellationBatchOperationRequest());

        Console.WriteLine($"Batch operation key: {result.BatchOperationKey}");
    }
    // </CancelProcessInstancesBatchOperation>
    #endregion CancelProcessInstancesBatchOperation

    #region DeleteProcessInstancesBatchOperation

    // <DeleteProcessInstancesBatchOperation>
    public static async Task DeleteProcessInstancesBatchOperationExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.DeleteProcessInstancesBatchOperationAsync(
            new ProcessInstanceDeletionBatchOperationRequest());

        Console.WriteLine($"Batch operation key: {result.BatchOperationKey}");
    }
    // </DeleteProcessInstancesBatchOperation>
    #endregion DeleteProcessInstancesBatchOperation

    #region MigrateProcessInstancesBatchOperation

    // <MigrateProcessInstancesBatchOperation>
    public static async Task MigrateProcessInstancesBatchOperationExample(ProcessDefinitionKey targetProcessDefinitionKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.MigrateProcessInstancesBatchOperationAsync(
            new ProcessInstanceMigrationBatchOperationRequest
            {
                Filter = new ProcessInstanceFilter(),
                MigrationPlan = new ProcessInstanceMigrationBatchOperationPlan
                {
                    TargetProcessDefinitionKey = targetProcessDefinitionKey,
                },
            });

        Console.WriteLine($"Batch operation key: {result.BatchOperationKey}");
    }
    // </MigrateProcessInstancesBatchOperation>
    #endregion MigrateProcessInstancesBatchOperation

    #region ModifyProcessInstancesBatchOperation

    // <ModifyProcessInstancesBatchOperation>
    public static async Task ModifyProcessInstancesBatchOperationExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.ModifyProcessInstancesBatchOperationAsync(
            new ProcessInstanceModificationBatchOperationRequest());

        Console.WriteLine($"Batch operation key: {result.BatchOperationKey}");
    }
    // </ModifyProcessInstancesBatchOperation>
    #endregion ModifyProcessInstancesBatchOperation

    #region ResolveIncidentsBatchOperation

    // <ResolveIncidentsBatchOperation>
    public static async Task ResolveIncidentsBatchOperationExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.ResolveIncidentsBatchOperationAsync(
            new ProcessInstanceIncidentResolutionBatchOperationRequest());

        Console.WriteLine($"Batch operation key: {result.BatchOperationKey}");
    }
    // </ResolveIncidentsBatchOperation>
    #endregion ResolveIncidentsBatchOperation

    #region DeleteDecisionInstancesBatchOperation

    // <DeleteDecisionInstancesBatchOperation>
    public static async Task DeleteDecisionInstancesBatchOperationExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.DeleteDecisionInstancesBatchOperationAsync(
            new DecisionInstanceDeletionBatchOperationRequest());

        Console.WriteLine($"Batch operation key: {result.BatchOperationKey}");
    }
    // </DeleteDecisionInstancesBatchOperation>
    #endregion DeleteDecisionInstancesBatchOperation
}
