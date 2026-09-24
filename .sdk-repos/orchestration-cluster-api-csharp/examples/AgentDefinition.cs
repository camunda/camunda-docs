// Compilable usage examples for agent definition operations.
// These examples are type-checked during build to guard against API regressions.
using Camunda.Orchestration.Sdk;

public static class AgentDefinitionExamples
{
    #region GetAgentDefinition
    // <GetAgentDefinition>
    public static async Task GetAgentDefinitionExample(AgentDefinitionKey agentDefinitionKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetAgentDefinitionAsync(agentDefinitionKey);
        Console.WriteLine($"Agent definition: {result.AgentDefinitionKey}, name: {result.Name}, type: {result.AgentType}");
    }
    // </GetAgentDefinition>
    #endregion GetAgentDefinition

    #region SearchAgentDefinitions

    // <SearchAgentDefinitions>
    public static async Task SearchAgentDefinitionsExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchAgentDefinitionsAsync(new AgentDefinitionSearchQuery
        {
            Filter = new AgentDefinitionFilter
            {
                AgentType = AgentDefinitionTypeEnum.AIAGENTTASK,
            },
            Page = new LimitPagination
            {
                Limit = 50,
            },
        });

        foreach (var def in result.Items)
        {
            Console.WriteLine($"Agent definition: {def.AgentDefinitionKey}, name: {def.Name}, type: {def.AgentType}");
        }
    }
    // </SearchAgentDefinitions>
    #endregion SearchAgentDefinitions
}
