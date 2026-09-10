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
    public static async Task CreateAgentInstanceExample(
        ElementInstanceKey elementInstanceKey,
        JobKey jobKey,
        string jobLease)
    {
        using var client = CamundaClient.Create();

        // The agent's model, provider, system prompt and limits are supplied as a
        // CONFIGURATION history item; a create request must open the conversation
        // with at least one such item.
        var result = await client.CreateAgentInstanceAsync(new AgentInstanceCreationRequest
        {
            ElementInstanceKey = elementInstanceKey,
            JobKey = jobKey,
            JobLease = jobLease,
            History = new List<AgentInstanceHistoryItem>
            {
                new AgentInstanceHistoryItem
                {
                    HistoryItemId = HistoryItemId.AssumeExists("configuration-1"),
                    LoopIteration = LoopIterationId.AssumeExists(1),
                    Role = AgentInstanceHistoryRoleEnum.CONFIGURATION,
                    ProducedAt = DateTimeOffset.UtcNow,
                    Content = new List<AgentInstanceMessageContent>(),
                    Model = "gpt-4o",
                    Provider = "openai",
                    SystemPrompt = new List<AgentInstanceMessageContent>
                    {
                        new AgentInstanceTextContent { Text = "You are a helpful assistant." },
                    },
                    Limits = new AgentInstanceLimits
                    {
                        MaxModelCalls = 20,
                        MaxToolCalls = 20,
                        MaxTokens = 100_000,
                    },
                },
            },
        });

        Console.WriteLine($"Created agent instance: {result.AgentInstanceKey}");
    }
    // </CreateAgentInstance>
    #endregion CreateAgentInstance

    #region UpdateAgentInstance

    // <UpdateAgentInstance>
    public static async Task UpdateAgentInstanceExample(
        AgentInstanceKey agentInstanceKey,
        ElementInstanceKey elementInstanceKey,
        JobKey jobKey,
        string jobLease)
    {
        using var client = CamundaClient.Create();

        // Conversation turns are appended through the same history batch used at
        // creation time; per-item metrics describe the model call that produced them.
        await client.UpdateAgentInstanceAsync(
            agentInstanceKey,
            new AgentInstanceUpdateRequest
            {
                ElementInstanceKey = elementInstanceKey,
                JobKey = jobKey,
                JobLease = jobLease,
                Status = AgentInstanceUpdateStatusEnum.THINKING,
                History = new List<AgentInstanceHistoryItem>
                {
                    new AgentInstanceHistoryItem
                    {
                        HistoryItemId = HistoryItemId.AssumeExists("assistant-1"),
                        LoopIteration = LoopIterationId.AssumeExists(1),
                        Role = AgentInstanceHistoryRoleEnum.ASSISTANT,
                        ProducedAt = DateTimeOffset.UtcNow,
                        Content = new List<AgentInstanceMessageContent>
                        {
                            new AgentInstanceTextContent { Text = "How can I help you today?" },
                        },
                        Metrics = new AgentInstanceHistoryItemMetricsRequest
                        {
                            InputTokens = 150,
                            OutputTokens = 50,
                            DurationMs = 1_200,
                        },
                    },
                },
            });

        Console.WriteLine($"Updated agent instance: {agentInstanceKey}");
    }
    // </UpdateAgentInstance>
    #endregion UpdateAgentInstance

    #region SearchAgentInstanceHistory

    // <SearchAgentInstanceHistory>
    public static async Task SearchAgentInstanceHistoryExample(AgentInstanceKey agentInstanceKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchAgentInstanceHistoryAsync(
            agentInstanceKey,
            new AgentInstanceHistorySearchQuery
            {
                Sort = new List<AgentInstanceHistorySearchQuerySortRequest>
                {
                    new AgentInstanceHistorySearchQuerySortRequest
                    {
                        Field = AgentInstanceHistorySearchQuerySortRequestField.ProducedAt,
                        Order = SortOrderEnum.ASC,
                    },
                },
                Page = new LimitPagination { Limit = 20 },
            });

        foreach (var item in result.Items)
        {
            Console.WriteLine($"{item.HistoryItemKey} ({item.Role})");
        }
    }
    // </SearchAgentInstanceHistory>
    #endregion SearchAgentInstanceHistory
}
