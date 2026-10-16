// Compilable usage examples for decision operations.
// These examples are type-checked during build to guard against API regressions.
using Camunda.Orchestration.Sdk;

public static class DecisionExamples
{
    #region EvaluateDecisionById
    // <EvaluateDecisionById>
    public static async Task EvaluateDecisionByIdExample(DecisionDefinitionId decisionDefinitionId)
    {
        using var client = CamundaClient.Create();

        var result = await client.EvaluateDecisionAsync(new DecisionEvaluationById
        {
            DecisionDefinitionId = decisionDefinitionId,
        });

        Console.WriteLine($"Decision output: {result.Output}");
    }
    // </EvaluateDecisionById>
    #endregion EvaluateDecisionById

    #region EvaluateDecisionByKey

    // <EvaluateDecisionByKey>
    public static async Task EvaluateDecisionByKeyExample(DecisionDefinitionKey decisionDefinitionKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.EvaluateDecisionAsync(new DecisionEvaluationByKey
        {
            DecisionDefinitionKey = decisionDefinitionKey,
        });

        Console.WriteLine($"Decision output: {result.Output}");
    }
    // </EvaluateDecisionByKey>
    #endregion EvaluateDecisionByKey

    #region GetDecisionDefinition

    // <GetDecisionDefinition>
    public static async Task GetDecisionDefinitionExample(DecisionDefinitionKey decisionDefinitionKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetDecisionDefinitionAsync(
            decisionDefinitionKey);

        Console.WriteLine($"Decision definition: {result.Name}");
    }
    // </GetDecisionDefinition>
    #endregion GetDecisionDefinition

    #region GetDecisionDefinitionXml

    // <GetDecisionDefinitionXml>
    public static async Task GetDecisionDefinitionXmlExample(DecisionDefinitionKey decisionDefinitionKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetDecisionDefinitionXmlAsync(
            decisionDefinitionKey);

        Console.WriteLine($"XML: {result}");
    }
    // </GetDecisionDefinitionXml>
    #endregion GetDecisionDefinitionXml

    #region SearchDecisionDefinitions

    // <SearchDecisionDefinitions>
    public static async Task SearchDecisionDefinitionsExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchDecisionDefinitionsAsync(
            new DecisionDefinitionSearchQuery());

        foreach (var dd in result.Items)
        {
            Console.WriteLine($"Decision definition: {dd.Name}");
        }
    }
    // </SearchDecisionDefinitions>
    #endregion SearchDecisionDefinitions

    #region GetDecisionInstance

    // <GetDecisionInstance>
    public static async Task GetDecisionInstanceExample(DecisionEvaluationInstanceKey decisionEvaluationInstanceKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetDecisionInstanceAsync(
            decisionEvaluationInstanceKey);

        Console.WriteLine($"Decision instance: {result.DecisionDefinitionId}");
    }
    // </GetDecisionInstance>
    #endregion GetDecisionInstance

    #region SearchDecisionInstances

    // <SearchDecisionInstances>
    public static async Task SearchDecisionInstancesExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchDecisionInstancesAsync(
            new DecisionInstanceSearchQuery());

        foreach (var di in result.Items)
        {
            Console.WriteLine($"Decision instance: {di.DecisionDefinitionId}");
        }
    }
    // </SearchDecisionInstances>
    #endregion SearchDecisionInstances

    #region DeleteDecisionInstance

    // <DeleteDecisionInstance>
    public static async Task DeleteDecisionInstanceExample(DecisionEvaluationKey decisionEvaluationKey)
    {
        using var client = CamundaClient.Create();

        await client.DeleteDecisionInstanceAsync(
            decisionEvaluationKey,
            new DeleteDecisionInstanceRequest());
    }
    // </DeleteDecisionInstance>
    #endregion DeleteDecisionInstance

    #region GetDecisionRequirements

    // <GetDecisionRequirements>
    public static async Task GetDecisionRequirementsExample(DecisionRequirementsKey decisionRequirementsKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetDecisionRequirementsAsync(
            decisionRequirementsKey);

        Console.WriteLine($"DRD: {result.DecisionRequirementsName}");
    }
    // </GetDecisionRequirements>
    #endregion GetDecisionRequirements

    #region GetDecisionRequirementsXml

    // <GetDecisionRequirementsXml>
    public static async Task GetDecisionRequirementsXmlExample(DecisionRequirementsKey decisionRequirementsKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetDecisionRequirementsXmlAsync(
            decisionRequirementsKey);

        Console.WriteLine($"XML: {result}");
    }
    // </GetDecisionRequirementsXml>
    #endregion GetDecisionRequirementsXml

    #region SearchDecisionRequirements

    // <SearchDecisionRequirements>
    public static async Task SearchDecisionRequirementsExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchDecisionRequirementsAsync(
            new DecisionRequirementsSearchQuery());

        foreach (var drd in result.Items)
        {
            Console.WriteLine($"DRD: {drd.DecisionRequirementsName}");
        }
    }
    // </SearchDecisionRequirements>
    #endregion SearchDecisionRequirements
}
