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
}
