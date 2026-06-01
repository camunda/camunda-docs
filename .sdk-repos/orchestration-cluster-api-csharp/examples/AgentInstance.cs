// Compilable usage examples for agent instance operations.
// These examples are type-checked during build to guard against API regressions.
using Camunda.Orchestration.Sdk;

public static class AgentInstanceExamples
{
    #region GetAgentInstance
    // <GetAgentInstance>
    public static async Task GetAgentInstanceExample(AgentInstanceKey agentInstanceKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetAgentInstanceAsync(agentInstanceKey);
        Console.WriteLine($"Agent instance: {result.AgentInstanceKey}, status: {result.Status}");
    }
    // </GetAgentInstance>
    #endregion GetAgentInstance

    #region SearchAgentInstances

    // <SearchAgentInstances>
    public static async Task SearchAgentInstancesExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchAgentInstancesAsync(new AgentInstanceSearchQuery());

        foreach (var instance in result.Items)
        {
            Console.WriteLine($"Agent instance: {instance.AgentInstanceKey}, status: {instance.Status}");
        }
    }
    // </SearchAgentInstances>
    #endregion SearchAgentInstances

    #region CreateAgentInstance

    // <CreateAgentInstance>
    public static async Task CreateAgentInstanceExample(ElementInstanceKey elementInstanceKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.CreateAgentInstanceAsync(new AgentInstanceCreationRequest
        {
            ElementInstanceKey = elementInstanceKey,
            Definition = new AgentInstanceDefinition
            {
                Model = "gpt-4o",
                Provider = "openai",
                SystemPrompt = "You are a helpful assistant.",
            },
        });

        Console.WriteLine($"Created agent instance: {result.AgentInstanceKey}");
    }
    // </CreateAgentInstance>
    #endregion CreateAgentInstance

    #region UpdateAgentInstance

    // <UpdateAgentInstance>
    public static async Task UpdateAgentInstanceExample(AgentInstanceKey agentInstanceKey)
    {
        using var client = CamundaClient.Create();

        await client.UpdateAgentInstanceAsync(
            agentInstanceKey,
            new AgentInstanceUpdateRequest
            {
                Status = AgentInstanceStatusEnum.THINKING,
                Metrics = new AgentInstanceMetricsDelta
                {
                    InputTokens = 150,
                    OutputTokens = 50,
                    ModelCalls = 1,
                },
            });

        Console.WriteLine($"Updated agent instance: {agentInstanceKey}");
    }
    // </UpdateAgentInstance>
    #endregion UpdateAgentInstance
}
