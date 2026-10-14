// Compilable usage examples for incident operations.
// These examples are type-checked during build to guard against API regressions.
using Camunda.Orchestration.Sdk;

public static class IncidentExamples
{
    #region GetIncident
    // <GetIncident>
    public static async Task GetIncidentExample(IncidentKey incidentKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetIncidentAsync(incidentKey);
        Console.WriteLine($"Incident: {result.IncidentKey}");
    }
    // </GetIncident>
    #endregion GetIncident

    #region ResolveIncident

    // <ResolveIncident>
    public static async Task ResolveIncidentExample(IncidentKey incidentKey)
    {
        using var client = CamundaClient.Create();

        await client.ResolveIncidentAsync(
            incidentKey,
            new IncidentResolutionRequest());
    }
    // </ResolveIncident>
    #endregion ResolveIncident

    #region SearchIncidents

    // <SearchIncidents>
    public static async Task SearchIncidentsExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchIncidentsAsync(new IncidentSearchQuery());

        foreach (var incident in result.Items)
        {
            Console.WriteLine($"Incident: {incident.IncidentKey}");
        }
    }
    // </SearchIncidents>
    #endregion SearchIncidents
}
