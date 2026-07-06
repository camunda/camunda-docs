// Compilable usage examples for deployment and resource operations.
// These examples are type-checked during build to guard against API regressions.
using Camunda.Orchestration.Sdk;

public static class DeploymentExamples
{
    #region CreateDeployment
    // <CreateDeployment>
    public static async Task CreateDeploymentExample()
    {
        using var client = CamundaClient.Create();

        var content = new MultipartFormDataContent();
        var fileContent = new ByteArrayContent(File.ReadAllBytes("process.bpmn"));
        content.Add(fileContent, "resources", "process.bpmn");

        var result = await client.CreateDeploymentAsync(content);
        Console.WriteLine($"Deployment key: {result.DeploymentKey}");
    }
    // </CreateDeployment>
    #endregion CreateDeployment

    #region DeleteResource

    // <DeleteResource>
    public static async Task DeleteResourceExample(ResourceKey resourceKey)
    {
        using var client = CamundaClient.Create();

        await client.DeleteResourceAsync(
            resourceKey,
            new DeleteResourceRequest());
    }
    // </DeleteResource>
    #endregion DeleteResource

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

    #region DeployResourcesFromFiles

    // <DeployResourcesFromFiles>
    public static async Task DeployResourcesFromFilesExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.DeployResourcesFromFilesAsync(
            ["process.bpmn", "decision.dmn"]);
        Console.WriteLine($"Deployment key: {result.DeploymentKey}");
    }
    // </DeployResourcesFromFiles>
    #endregion DeployResourcesFromFiles
}
