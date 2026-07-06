// Compilable usage examples for admin, system, and statistics operations.
// These examples are type-checked during build to guard against API regressions.
using Camunda.Orchestration.Sdk;

public static class AdminExamples
{
    #region GetGlobalClusterVariable
    // <GetGlobalClusterVariable>
    public static async Task GetGlobalClusterVariableExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.GetGlobalClusterVariableAsync("my-variable");
        Console.WriteLine($"Variable: {result.Name} = {result.Value}");
    }
    // </GetGlobalClusterVariable>
    #endregion GetGlobalClusterVariable

    #region CreateGlobalClusterVariable

    // <CreateGlobalClusterVariable>
    public static async Task CreateGlobalClusterVariableExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.CreateGlobalClusterVariableAsync(
            new CreateClusterVariableRequest
            {
                Name = "my-variable",
                Value = "my-value",
            });

        Console.WriteLine($"Created variable: {result.Name}");
    }
    // </CreateGlobalClusterVariable>
    #endregion CreateGlobalClusterVariable

    #region UpdateGlobalClusterVariable

    // <UpdateGlobalClusterVariable>
    public static async Task UpdateGlobalClusterVariableExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.UpdateGlobalClusterVariableAsync(
            "my-variable",
            new UpdateClusterVariableRequest
            {
                Value = "updated-value",
            });

        Console.WriteLine($"Updated variable: {result.Name}");
    }
    // </UpdateGlobalClusterVariable>
    #endregion UpdateGlobalClusterVariable

    #region DeleteGlobalClusterVariable

    // <DeleteGlobalClusterVariable>
    public static async Task DeleteGlobalClusterVariableExample()
    {
        using var client = CamundaClient.Create();

        await client.DeleteGlobalClusterVariableAsync("my-variable");
    }
    // </DeleteGlobalClusterVariable>
    #endregion DeleteGlobalClusterVariable

    #region GetTenantClusterVariable

    // <GetTenantClusterVariable>
    public static async Task GetTenantClusterVariableExample(TenantId tenantId)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetTenantClusterVariableAsync(
            tenantId,
            "my-variable");

        Console.WriteLine($"Variable: {result.Name} = {result.Value}");
    }
    // </GetTenantClusterVariable>
    #endregion GetTenantClusterVariable

    #region CreateTenantClusterVariable

    // <CreateTenantClusterVariable>
    public static async Task CreateTenantClusterVariableExample(TenantId tenantId)
    {
        using var client = CamundaClient.Create();

        var result = await client.CreateTenantClusterVariableAsync(
            tenantId,
            new CreateClusterVariableRequest
            {
                Name = "my-variable",
                Value = "tenant-value",
            });

        Console.WriteLine($"Created variable: {result.Name}");
    }
    // </CreateTenantClusterVariable>
    #endregion CreateTenantClusterVariable

    #region UpdateTenantClusterVariable

    // <UpdateTenantClusterVariable>
    public static async Task UpdateTenantClusterVariableExample(TenantId tenantId)
    {
        using var client = CamundaClient.Create();

        var result = await client.UpdateTenantClusterVariableAsync(
            tenantId,
            "my-variable",
            new UpdateClusterVariableRequest
            {
                Value = "updated-tenant-value",
            });

        Console.WriteLine($"Updated variable: {result.Name}");
    }
    // </UpdateTenantClusterVariable>
    #endregion UpdateTenantClusterVariable

    #region DeleteTenantClusterVariable

    // <DeleteTenantClusterVariable>
    public static async Task DeleteTenantClusterVariableExample(TenantId tenantId)
    {
        using var client = CamundaClient.Create();

        await client.DeleteTenantClusterVariableAsync(
            tenantId,
            "my-variable");
    }
    // </DeleteTenantClusterVariable>
    #endregion DeleteTenantClusterVariable

    #region SearchClusterVariables

    // <SearchClusterVariables>
    public static async Task SearchClusterVariablesExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchClusterVariablesAsync(
            new ClusterVariableSearchQueryRequest());

        foreach (var variable in result.Items)
        {
            Console.WriteLine($"Variable: {variable.Name}");
        }
    }
    // </SearchClusterVariables>
    #endregion SearchClusterVariables

    #region CreateGlobalTaskListener

    // <CreateGlobalTaskListener>
    public static async Task CreateGlobalTaskListenerExample(GlobalListenerId id)
    {
        using var client = CamundaClient.Create();

        var result = await client.CreateGlobalTaskListenerAsync(
            new CreateGlobalTaskListenerRequest
            {
                EventTypes = new List<GlobalTaskListenerEventTypeEnum> { GlobalTaskListenerEventTypeEnum.Completing },
                Id = id,
            });

        Console.WriteLine($"Task listener: {result.Id}");
    }
    // </CreateGlobalTaskListener>
    #endregion CreateGlobalTaskListener

    #region GetGlobalTaskListener

    // <GetGlobalTaskListener>
    public static async Task GetGlobalTaskListenerExample(GlobalListenerId globalListenerId)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetGlobalTaskListenerAsync(
            globalListenerId);

        Console.WriteLine($"Task listener: {result.EventTypes}");
    }
    // </GetGlobalTaskListener>
    #endregion GetGlobalTaskListener

    #region UpdateGlobalTaskListener

    // <UpdateGlobalTaskListener>
    public static async Task UpdateGlobalTaskListenerExample(GlobalListenerId globalListenerId)
    {
        using var client = CamundaClient.Create();

        var result = await client.UpdateGlobalTaskListenerAsync(
            globalListenerId,
            new UpdateGlobalTaskListenerRequest
            {
                EventTypes = new List<GlobalTaskListenerEventTypeEnum> { GlobalTaskListenerEventTypeEnum.Completing },
                Type = "updated-task-listener",
            });

        Console.WriteLine($"Updated listener: {result.Id}");
    }
    // </UpdateGlobalTaskListener>
    #endregion UpdateGlobalTaskListener

    #region DeleteGlobalTaskListener

    // <DeleteGlobalTaskListener>
    public static async Task DeleteGlobalTaskListenerExample(GlobalListenerId globalListenerId)
    {
        using var client = CamundaClient.Create();

        await client.DeleteGlobalTaskListenerAsync(
            globalListenerId);
    }
    // </DeleteGlobalTaskListener>
    #endregion DeleteGlobalTaskListener

    #region SearchGlobalTaskListeners

    // <SearchGlobalTaskListeners>
    public static async Task SearchGlobalTaskListenersExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchGlobalTaskListenersAsync(
            new GlobalTaskListenerSearchQueryRequest());

        foreach (var listener in result.Items)
        {
            Console.WriteLine($"Listener: {listener.Id}");
        }
    }
    // </SearchGlobalTaskListeners>
    #endregion SearchGlobalTaskListeners

    #region GetLicense

    // <GetLicense>
    public static async Task GetLicenseExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.GetLicenseAsync();
        Console.WriteLine($"License type: {result.LicenseType}");
    }
    // </GetLicense>
    #endregion GetLicense

    #region GetSystemConfiguration

    // <GetSystemConfiguration>
    public static async Task GetSystemConfigurationExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.GetSystemConfigurationAsync();
        Console.WriteLine($"System config: {result}");
    }
    // </GetSystemConfiguration>
    #endregion GetSystemConfiguration

    #region GetStatus

    // <GetStatus>
    public static async Task GetStatusExample()
    {
        using var client = CamundaClient.Create();

        await client.GetStatusAsync();
        Console.WriteLine("Cluster is healthy");
    }
    // </GetStatus>
    #endregion GetStatus

    #region PinClock

    // <PinClock>
    public static async Task PinClockExample()
    {
        using var client = CamundaClient.Create();

        await client.PinClockAsync(new ClockPinRequest
        {
            Timestamp = 1700000000000,
        });
    }
    // </PinClock>
    #endregion PinClock

    #region ResetClock

    // <ResetClock>
    public static async Task ResetClockExample()
    {
        using var client = CamundaClient.Create();

        await client.ResetClockAsync();
    }
    // </ResetClock>
    #endregion ResetClock

    #region EvaluateConditionals

    // <EvaluateConditionals>
    public static async Task EvaluateConditionalsExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.EvaluateConditionalsAsync(
            new ConditionalEvaluationInstruction());

        Console.WriteLine($"Result: {result}");
    }
    // </EvaluateConditionals>
    #endregion EvaluateConditionals

    #region EvaluateExpression

    // <EvaluateExpression>
    public static async Task EvaluateExpressionExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.EvaluateExpressionAsync(
            new ExpressionEvaluationRequest
            {
                Expression = "= 1 + 2",
            });

        Console.WriteLine($"Result: {result.Result}");
    }
    // </EvaluateExpression>
    #endregion EvaluateExpression

    #region GetResource

    // <GetResource>
    public static async Task GetResourceExample(ResourceKey resourceKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetResourceAsync(resourceKey);
        Console.WriteLine($"Resource: {result.ResourceName}");
    }
    // </GetResource>
    #endregion GetResource

    #region GetResourceContent

    // <GetResourceContent>
    public static async Task GetResourceContentExample(ResourceKey resourceKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetResourceContentAsync(resourceKey);
        Console.WriteLine($"Content: {result}");
    }
    // </GetResourceContent>
    #endregion GetResourceContent

    #region GetUsageMetrics

    // <GetUsageMetrics>
    public static async Task GetUsageMetricsExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.GetUsageMetricsAsync(
            startTime: new DateTimeOffset(2024, 1, 1, 0, 0, 0, TimeSpan.Zero),
            endTime: new DateTimeOffset(2024, 12, 31, 23, 59, 59, TimeSpan.Zero));

        Console.WriteLine($"Metrics: {result}");
    }
    // </GetUsageMetrics>
    #endregion GetUsageMetrics

    #region GetAuditLog

    // <GetAuditLog>
    public static async Task GetAuditLogExample(AuditLogKey auditLogKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetAuditLogAsync(auditLogKey);
        Console.WriteLine($"Audit log: {result.AuditLogKey}");
    }
    // </GetAuditLog>
    #endregion GetAuditLog

    #region SearchAuditLogs

    // <SearchAuditLogs>
    public static async Task SearchAuditLogsExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchAuditLogsAsync(
            new AuditLogSearchQueryRequest());

        foreach (var log in result.Items)
        {
            Console.WriteLine($"Audit log: {log.AuditLogKey}");
        }
    }
    // </SearchAuditLogs>
    #endregion SearchAuditLogs

    #region GetProcessInstanceStatisticsByError

    // <GetProcessInstanceStatisticsByError>
    public static async Task GetProcessInstanceStatisticsByErrorExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.GetProcessInstanceStatisticsByErrorAsync(
            new IncidentProcessInstanceStatisticsByErrorQuery());

        foreach (var stat in result.Items)
        {
            Console.WriteLine($"Error: {stat.ErrorMessage}");
        }
    }
    // </GetProcessInstanceStatisticsByError>
    #endregion GetProcessInstanceStatisticsByError

    #region GetProcessInstanceStatisticsByDefinition

    // <GetProcessInstanceStatisticsByDefinition>
    public static async Task GetProcessInstanceStatisticsByDefinitionExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.GetProcessInstanceStatisticsByDefinitionAsync(
            new IncidentProcessInstanceStatisticsByDefinitionQuery());

        foreach (var stat in result.Items)
        {
            Console.WriteLine($"Definition: {stat.ProcessDefinitionKey}");
        }
    }
    // </GetProcessInstanceStatisticsByDefinition>
    #endregion GetProcessInstanceStatisticsByDefinition

    #region GetJobErrorStatistics

    // <GetJobErrorStatistics>
    public static async Task GetJobErrorStatisticsExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.GetJobErrorStatisticsAsync(
            new JobErrorStatisticsQuery());

        foreach (var stat in result.Items)
        {
            Console.WriteLine($"Error: {stat.ErrorCode}");
        }
    }
    // </GetJobErrorStatistics>
    #endregion GetJobErrorStatistics

    #region GetJobTimeSeriesStatistics

    // <GetJobTimeSeriesStatistics>
    public static async Task GetJobTimeSeriesStatisticsExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.GetJobTimeSeriesStatisticsAsync(
            new JobTimeSeriesStatisticsQuery());

        foreach (var stat in result.Items)
        {
            Console.WriteLine($"Time series: {stat}");
        }
    }
    // </GetJobTimeSeriesStatistics>
    #endregion GetJobTimeSeriesStatistics

    #region GetJobTypeStatistics

    // <GetJobTypeStatistics>
    public static async Task GetJobTypeStatisticsExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.GetJobTypeStatisticsAsync(
            new JobTypeStatisticsQuery());

        foreach (var stat in result.Items)
        {
            Console.WriteLine($"Job type: {stat.JobType}");
        }
    }
    // </GetJobTypeStatistics>
    #endregion GetJobTypeStatistics

    #region GetJobWorkerStatistics

    // <GetJobWorkerStatistics>
    public static async Task GetJobWorkerStatisticsExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.GetJobWorkerStatisticsAsync(
            new JobWorkerStatisticsQuery());

        foreach (var stat in result.Items)
        {
            Console.WriteLine($"Worker: {stat.Worker}");
        }
    }
    // </GetJobWorkerStatistics>
    #endregion GetJobWorkerStatistics

    #region GetGlobalJobStatistics

    // <GetGlobalJobStatistics>
    public static async Task GetGlobalJobStatisticsExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.GetGlobalJobStatisticsAsync(
            from: new DateTimeOffset(2024, 1, 1, 0, 0, 0, TimeSpan.Zero),
            to: new DateTimeOffset(2024, 12, 31, 23, 59, 59, TimeSpan.Zero));

        Console.WriteLine($"Global job stats: {result}");
    }
    // </GetGlobalJobStatistics>
    #endregion GetGlobalJobStatistics
}
