// Compilable usage examples for process instance operations.
// These examples are type-checked during build to guard against API regressions.
using Camunda.Orchestration.Sdk;

public static class ProcessInstanceExamples
{
    #region CreateProcessInstanceById
    // <CreateProcessInstanceById>
    public static async Task CreateProcessInstanceByIdExample(ProcessDefinitionId processDefinitionId)
    {
        using var client = CamundaClient.Create();

        var result = await client.CreateProcessInstanceAsync(new ProcessInstanceCreationInstructionById
        {
            ProcessDefinitionId = processDefinitionId,
        });

        Console.WriteLine($"Process instance key: {result.ProcessInstanceKey}");
    }
    // </CreateProcessInstanceById>
    #endregion CreateProcessInstanceById

    #region CreateProcessInstanceByKey

    // <CreateProcessInstanceByKey>
    public static async Task CreateProcessInstanceByKeyExample(ProcessDefinitionKey processDefinitionKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.CreateProcessInstanceAsync(new ProcessInstanceCreationInstructionByKey
        {
            ProcessDefinitionKey = processDefinitionKey,
        });

        Console.WriteLine($"Process instance key: {result.ProcessInstanceKey}");
    }
    // </CreateProcessInstanceByKey>
    #endregion CreateProcessInstanceByKey

    #region GetProcessInstance

    // <GetProcessInstance>
    public static async Task GetProcessInstanceExample(ProcessInstanceKey processInstanceKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetProcessInstanceAsync(processInstanceKey);
        Console.WriteLine($"Process instance: {result.ProcessDefinitionId}");
    }
    // </GetProcessInstance>
    #endregion GetProcessInstance

    #region SearchProcessInstances

    // <SearchProcessInstances>
    public static async Task SearchProcessInstancesExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchProcessInstancesAsync(new ProcessInstanceSearchQuery());

        foreach (var instance in result.Items)
        {
            Console.WriteLine($"Process instance: {instance.ProcessInstanceKey}");
        }
    }
    // </SearchProcessInstances>
    #endregion SearchProcessInstances

    #region CancelProcessInstance

    // <CancelProcessInstance>
    public static async Task CancelProcessInstanceExample(ProcessInstanceKey processInstanceKey)
    {
        using var client = CamundaClient.Create();

        await client.CancelProcessInstanceAsync(
            processInstanceKey,
            new CancelProcessInstanceRequest());
    }
    // </CancelProcessInstance>
    #endregion CancelProcessInstance

    #region DeleteProcessInstance

    // <DeleteProcessInstance>
    public static async Task DeleteProcessInstanceExample(ProcessInstanceKey processInstanceKey)
    {
        using var client = CamundaClient.Create();

        await client.DeleteProcessInstanceAsync(
            processInstanceKey,
            new DeleteProcessInstanceRequest());
    }
    // </DeleteProcessInstance>
    #endregion DeleteProcessInstance

    #region MigrateProcessInstance

    // <MigrateProcessInstance>
    public static async Task MigrateProcessInstanceExample(ProcessInstanceKey processInstanceKey, ProcessDefinitionKey targetProcessDefinitionKey)
    {
        using var client = CamundaClient.Create();

        await client.MigrateProcessInstanceAsync(
            processInstanceKey,
            new ProcessInstanceMigrationInstruction
            {
                TargetProcessDefinitionKey = targetProcessDefinitionKey,
            });
    }
    // </MigrateProcessInstance>
    #endregion MigrateProcessInstance

    #region ModifyProcessInstance

    // <ModifyProcessInstance>
    public static async Task ModifyProcessInstanceExample(ProcessInstanceKey processInstanceKey)
    {
        using var client = CamundaClient.Create();

        await client.ModifyProcessInstanceAsync(
            processInstanceKey,
            new ProcessInstanceModificationInstruction());
    }
    // </ModifyProcessInstance>
    #endregion ModifyProcessInstance

    #region GetProcessInstanceStatistics

    // <GetProcessInstanceStatistics>
    public static async Task GetProcessInstanceStatisticsExample(ProcessInstanceKey processInstanceKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetProcessInstanceStatisticsAsync(
            processInstanceKey);

        foreach (var stat in result.Items)
        {
            Console.WriteLine($"Element: {stat.ElementId}");
        }
    }
    // </GetProcessInstanceStatistics>
    #endregion GetProcessInstanceStatistics

    #region GetProcessInstanceSequenceFlows

    // <GetProcessInstanceSequenceFlows>
    public static async Task GetProcessInstanceSequenceFlowsExample(ProcessInstanceKey processInstanceKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetProcessInstanceSequenceFlowsAsync(
            processInstanceKey);

        foreach (var flow in result.Items)
        {
            Console.WriteLine($"Sequence flow: {flow}");
        }
    }
    // </GetProcessInstanceSequenceFlows>
    #endregion GetProcessInstanceSequenceFlows

    #region GetProcessInstanceCallHierarchy

    // <GetProcessInstanceCallHierarchy>
    public static async Task GetProcessInstanceCallHierarchyExample(ProcessInstanceKey processInstanceKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetProcessInstanceCallHierarchyAsync(
            processInstanceKey);

        Console.WriteLine($"Call hierarchy: {result}");
    }
    // </GetProcessInstanceCallHierarchy>
    #endregion GetProcessInstanceCallHierarchy

    #region SearchProcessInstanceIncidents

    // <SearchProcessInstanceIncidents>
    public static async Task SearchProcessInstanceIncidentsExample(ProcessInstanceKey processInstanceKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchProcessInstanceIncidentsAsync(
            processInstanceKey,
            new IncidentSearchQuery());

        foreach (var incident in result.Items)
        {
            Console.WriteLine($"Incident: {incident.IncidentKey}");
        }
    }
    // </SearchProcessInstanceIncidents>
    #endregion SearchProcessInstanceIncidents

    #region ResolveProcessInstanceIncidents

    // <ResolveProcessInstanceIncidents>
    public static async Task ResolveProcessInstanceIncidentsExample(ProcessInstanceKey processInstanceKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.ResolveProcessInstanceIncidentsAsync(
            processInstanceKey);

        Console.WriteLine($"Batch operation key: {result.BatchOperationKey}");
    }
    // </ResolveProcessInstanceIncidents>
    #endregion ResolveProcessInstanceIncidents
}
