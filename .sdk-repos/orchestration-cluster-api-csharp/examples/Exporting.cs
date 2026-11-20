// Compilable usage examples for exporting operations.
// These examples are type-checked during build to guard against API regressions.
using Camunda.Orchestration.Sdk;

public static class ExportingExamples
{
    #region PauseExporting
    // <PauseExporting>
    public static async Task PauseExportingExample()
    {
        using var client = CamundaClient.Create();

        // With `soft: true` exporting keeps running but its position is not committed,
        // so the log is still not compacted — use it when exporting must keep
        // progressing, for example while a backup is taken.
        await client.PauseExportingAsync(soft: true);
    }
    // </PauseExporting>
    #endregion PauseExporting

    #region ResumeExporting

    // <ResumeExporting>
    public static async Task ResumeExportingExample()
    {
        using var client = CamundaClient.Create();

        await client.ResumeExportingAsync();
    }
    // </ResumeExporting>
    #endregion ResumeExporting

    #region GetExportingStatus
    // <GetExportingStatus>
    public static async Task GetExportingStatusExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.GetExportingStatusAsync();
        Console.WriteLine($"Status: {result.Status}");
    }
    // </GetExportingStatus>
    #endregion GetExportingStatus

    #region GetClusterExportingStatus
    // <GetClusterExportingStatus>
    public static async Task GetClusterExportingStatusExample()
    {
        using var client = CamundaClient.Create();

        // Returns the aggregated exporting status across all physical tenants in the cluster.
        var result = await client.GetClusterExportingStatusAsync();
        Console.WriteLine($"Cluster exporting status: {result.Status}");
    }
    // </GetClusterExportingStatus>
    #endregion GetClusterExportingStatus

    #region PauseClusterExporting
    // <PauseClusterExporting>
    public static async Task PauseClusterExportingExample()
    {
        using var client = CamundaClient.Create();

        // With `soft: true` exporting keeps running but its position is not committed,
        // so the log is still not compacted — use it when exporting must keep
        // progressing across all physical tenants, for example while a cluster backup is taken.
        await client.PauseClusterExportingAsync(soft: true);
    }
    // </PauseClusterExporting>
    #endregion PauseClusterExporting

    #region ResumeClusterExporting
    // <ResumeClusterExporting>
    public static async Task ResumeClusterExportingExample()
    {
        using var client = CamundaClient.Create();

        await client.ResumeClusterExportingAsync();
    }
    // </ResumeClusterExporting>
    #endregion ResumeClusterExporting
}
