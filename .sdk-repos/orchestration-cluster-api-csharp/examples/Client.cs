// Compilable usage examples for client construction and topology.
// These examples are type-checked during build to guard against API regressions.
using Camunda.Orchestration.Sdk;

public static class ClientExamples
{
    #region CreateClient
    // <CreateClient>
    public static async Task CreateClientExample()
    {
        using var client = CamundaClient.Create();

        var topology = await client.GetTopologyAsync();
        Console.WriteLine($"Cluster size: {topology.ClusterSize}");
    }
    // </CreateClient>
    #endregion CreateClient

    #region GetTopology

    // <GetTopology>
    public static async Task GetTopologyExample()
    {
        using var client = CamundaClient.Create();

        var topology = await client.GetTopologyAsync();
        Console.WriteLine($"Cluster size: {topology.ClusterSize}");
    }
    // </GetTopology>
    #endregion GetTopology

    #region ChangeClusterMode

    // <ChangeClusterMode>
    public static async Task ChangeClusterModeExample()
    {
        using var client = CamundaClient.Create();

        // Pass dryRun: true to validate the request and inspect the resulting plan
        // without applying it. Omit it (or set it to false) to trigger the transition.
        var change = await client.ChangeClusterModeAsync("RECOVERING", dryRun: true);

        Console.WriteLine($"Cluster change {change.ChangeId}:");
        foreach (var operation in change.PlannedChanges)
        {
            var suffix = operation.Mode is null ? "" : $" -> {operation.Mode}";
            Console.WriteLine($"  {operation.Operation}{suffix}");
        }
    }
    // </ChangeClusterMode>
    #endregion ChangeClusterMode
}
