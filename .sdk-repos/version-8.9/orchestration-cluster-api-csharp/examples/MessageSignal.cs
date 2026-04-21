// Compilable usage examples for message and signal operations.
// These examples are type-checked during build to guard against API regressions.
using Camunda.Orchestration.Sdk;

public static class MessageSignalExamples
{
    #region CorrelateMessage
    // <CorrelateMessage>
    public static async Task CorrelateMessageExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.CorrelateMessageAsync(new MessageCorrelationRequest
        {
            Name = "paymentReceived",
            CorrelationKey = "order-123",
        });

        Console.WriteLine($"Message key: {result.MessageKey}");
    }
    // </CorrelateMessage>
    #endregion CorrelateMessage

    #region PublishMessage

    // <PublishMessage>
    public static async Task PublishMessageExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.PublishMessageAsync(new MessagePublicationRequest
        {
            Name = "paymentReceived",
            CorrelationKey = "order-123",
            TimeToLive = 60000,
        });

        Console.WriteLine($"Message key: {result.MessageKey}");
    }
    // </PublishMessage>
    #endregion PublishMessage

    #region BroadcastSignal

    // <BroadcastSignal>
    public static async Task BroadcastSignalExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.BroadcastSignalAsync(new SignalBroadcastRequest
        {
            SignalName = "orderCancelled",
        });

        Console.WriteLine($"Signal key: {result.SignalKey}");
    }
    // </BroadcastSignal>
    #endregion BroadcastSignal

    #region SearchMessageSubscriptions

    // <SearchMessageSubscriptions>
    public static async Task SearchMessageSubscriptionsExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchMessageSubscriptionsAsync(
            new MessageSubscriptionSearchQuery());

        foreach (var sub in result.Items)
        {
            Console.WriteLine($"Subscription: {sub.MessageName}");
        }
    }
    // </SearchMessageSubscriptions>
    #endregion SearchMessageSubscriptions

    #region SearchCorrelatedMessageSubscriptions

    // <SearchCorrelatedMessageSubscriptions>
    public static async Task SearchCorrelatedMessageSubscriptionsExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchCorrelatedMessageSubscriptionsAsync(
            new CorrelatedMessageSubscriptionSearchQuery());

        foreach (var sub in result.Items)
        {
            Console.WriteLine($"Correlated subscription: {sub.MessageName}");
        }
    }
    // </SearchCorrelatedMessageSubscriptions>
    #endregion SearchCorrelatedMessageSubscriptions
}
