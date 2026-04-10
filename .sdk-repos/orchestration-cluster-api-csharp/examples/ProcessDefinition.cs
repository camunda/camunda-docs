// Compilable usage examples for process definition operations.
// These examples are type-checked during build to guard against API regressions.
using Camunda.Orchestration.Sdk;

public static class ProcessDefinitionExamples
{
    #region GetProcessDefinition
    // <GetProcessDefinition>
    public static async Task GetProcessDefinitionExample(ProcessDefinitionKey processDefinitionKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetProcessDefinitionAsync(
            processDefinitionKey);

        Console.WriteLine($"Process definition: {result.Name}");
    }
    // </GetProcessDefinition>
    #endregion GetProcessDefinition

    #region GetProcessDefinitionXml

    // <GetProcessDefinitionXml>
    public static async Task GetProcessDefinitionXmlExample(ProcessDefinitionKey processDefinitionKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetProcessDefinitionXmlAsync(
            processDefinitionKey);

        Console.WriteLine($"XML: {result}");
    }
    // </GetProcessDefinitionXml>
    #endregion GetProcessDefinitionXml

    #region SearchProcessDefinitions

    // <SearchProcessDefinitions>
    public static async Task SearchProcessDefinitionsExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchProcessDefinitionsAsync(
            new ProcessDefinitionSearchQuery());

        foreach (var pd in result.Items)
        {
            Console.WriteLine($"Process definition: {pd.Name}");
        }
    }
    // </SearchProcessDefinitions>
    #endregion SearchProcessDefinitions

    #region GetProcessDefinitionStatistics

    // <GetProcessDefinitionStatistics>
    public static async Task GetProcessDefinitionStatisticsExample(ProcessDefinitionKey processDefinitionKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetProcessDefinitionStatisticsAsync(
            processDefinitionKey,
            new ProcessDefinitionElementStatisticsQuery());

        foreach (var stat in result.Items)
        {
            Console.WriteLine($"Element: {stat.ElementId}");
        }
    }
    // </GetProcessDefinitionStatistics>
    #endregion GetProcessDefinitionStatistics

    #region GetProcessDefinitionInstanceStatistics

    // <GetProcessDefinitionInstanceStatistics>
    public static async Task GetProcessDefinitionInstanceStatisticsExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.GetProcessDefinitionInstanceStatisticsAsync(
            new ProcessDefinitionInstanceStatisticsQuery());

        foreach (var stat in result.Items)
        {
            Console.WriteLine($"Definition: {stat.ProcessDefinitionId}");
        }
    }
    // </GetProcessDefinitionInstanceStatistics>
    #endregion GetProcessDefinitionInstanceStatistics

    #region GetProcessDefinitionInstanceVersionStatistics

    // <GetProcessDefinitionInstanceVersionStatistics>
    public static async Task GetProcessDefinitionInstanceVersionStatisticsExample(ProcessDefinitionId processDefinitionId)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetProcessDefinitionInstanceVersionStatisticsAsync(
            new ProcessDefinitionInstanceVersionStatisticsQuery
            {
                Filter = new ProcessDefinitionInstanceVersionStatisticsFilter
                {
                    ProcessDefinitionId = processDefinitionId,
                },
            });

        foreach (var stat in result.Items)
        {
            Console.WriteLine($"Version: {stat.ProcessDefinitionVersion}");
        }
    }
    // </GetProcessDefinitionInstanceVersionStatistics>
    #endregion GetProcessDefinitionInstanceVersionStatistics

    #region GetProcessDefinitionMessageSubscriptionStatistics

    // <GetProcessDefinitionMessageSubscriptionStatistics>
    public static async Task GetProcessDefinitionMessageSubscriptionStatisticsExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.GetProcessDefinitionMessageSubscriptionStatisticsAsync(
            new ProcessDefinitionMessageSubscriptionStatisticsQuery());

        foreach (var stat in result.Items)
        {
            Console.WriteLine($"Message subscriptions: {stat.ActiveSubscriptions}");
        }
    }
    // </GetProcessDefinitionMessageSubscriptionStatistics>
    #endregion GetProcessDefinitionMessageSubscriptionStatistics

    #region GetStartProcessForm

    // <GetStartProcessForm>
    public static async Task GetStartProcessFormExample(ProcessDefinitionKey processDefinitionKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetStartProcessFormAsync(
            processDefinitionKey);

        Console.WriteLine($"Form: {result.FormKey}");
    }
    // </GetStartProcessForm>
    #endregion GetStartProcessForm
}
