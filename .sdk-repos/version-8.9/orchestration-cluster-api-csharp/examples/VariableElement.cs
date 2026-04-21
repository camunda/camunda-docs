// Compilable usage examples for variable and element instance operations.
// These examples are type-checked during build to guard against API regressions.
using Camunda.Orchestration.Sdk;

public static class VariableElementExamples
{
    #region GetVariable
    // <GetVariable>
    public static async Task GetVariableExample(VariableKey variableKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetVariableAsync(variableKey);
        Console.WriteLine($"Variable: {result.Name} = {result.Value}");
    }
    // </GetVariable>
    #endregion GetVariable

    #region SearchVariables

    // <SearchVariables>
    public static async Task SearchVariablesExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchVariablesAsync(new SearchVariablesRequest());

        foreach (var variable in result.Items)
        {
            Console.WriteLine($"Variable: {variable.Name}");
        }
    }
    // </SearchVariables>
    #endregion SearchVariables

    #region GetElementInstance

    // <GetElementInstance>
    public static async Task GetElementInstanceExample(ElementInstanceKey elementInstanceKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetElementInstanceAsync(
            elementInstanceKey);

        Console.WriteLine($"Element: {result.ElementId}");
    }
    // </GetElementInstance>
    #endregion GetElementInstance

    #region SearchElementInstances

    // <SearchElementInstances>
    public static async Task SearchElementInstancesExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchElementInstancesAsync(
            new ElementInstanceSearchQuery());

        foreach (var ei in result.Items)
        {
            Console.WriteLine($"Element instance: {ei.ElementInstanceKey}");
        }
    }
    // </SearchElementInstances>
    #endregion SearchElementInstances

    #region SearchElementInstanceIncidents

    // <SearchElementInstanceIncidents>
    public static async Task SearchElementInstanceIncidentsExample(ElementInstanceKey elementInstanceKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchElementInstanceIncidentsAsync(
            elementInstanceKey,
            new IncidentSearchQuery());

        foreach (var incident in result.Items)
        {
            Console.WriteLine($"Incident: {incident.IncidentKey}");
        }
    }
    // </SearchElementInstanceIncidents>
    #endregion SearchElementInstanceIncidents

    #region CreateElementInstanceVariables

    // <CreateElementInstanceVariables>
    public static async Task CreateElementInstanceVariablesExample(ElementInstanceKey elementInstanceKey)
    {
        using var client = CamundaClient.Create();

        await client.CreateElementInstanceVariablesAsync(
            elementInstanceKey,
            new SetVariableRequest());
    }
    // </CreateElementInstanceVariables>
    #endregion CreateElementInstanceVariables

    #region ActivateAdHocSubProcessActivities

    // <ActivateAdHocSubProcessActivities>
    public static async Task ActivateAdHocSubProcessActivitiesExample(ElementInstanceKey elementInstanceKey)
    {
        using var client = CamundaClient.Create();

        await client.ActivateAdHocSubProcessActivitiesAsync(
            elementInstanceKey,
            new AdHocSubProcessActivateActivitiesInstruction());
    }
    // </ActivateAdHocSubProcessActivities>
    #endregion ActivateAdHocSubProcessActivities
}
