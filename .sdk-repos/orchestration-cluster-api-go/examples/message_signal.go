// Message and signal operations: correlate/publish messages and broadcast signals.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
	openapi "github.com/camunda/orchestration-cluster-api-go/client"
)

func correlateMessageExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region CorrelateMessage
	req := openapi.NewMessageCorrelationRequest("order-confirmed")
	req.SetCorrelationKey("order-42")
	req.SetVariables(map[string]any{"confirmedBy": "payment-service"})

	result, err := client.CorrelateMessage(ctx, *req)
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion CorrelateMessage
	return nil
}

func publishMessageExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region PublishMessage
	req := openapi.NewMessagePublicationRequest("order-confirmed")
	req.SetCorrelationKey("order-42")
	req.SetVariables(map[string]any{"confirmedBy": "payment-service"})

	result, err := client.PublishMessage(ctx, *req)
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion PublishMessage
	return nil
}

func broadcastSignalExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region BroadcastSignal
	req := openapi.NewSignalBroadcastRequest("cancel-all-orders")
	req.SetVariables(map[string]any{"reason": "maintenance"})

	result, err := client.BroadcastSignal(ctx, *req)
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion BroadcastSignal
	return nil
}

func searchMessageSubscriptionsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchMessageSubscriptions
	result, err := client.SearchMessageSubscriptions(ctx, *openapi.NewMessageSubscriptionSearchQuery())
	if err != nil {
		return err
	}
	for _, s := range result.GetItems() {
		fmt.Printf("%v\n", s)
	}
	// endregion SearchMessageSubscriptions
	return nil
}

func searchCorrelatedMessageSubscriptionsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchCorrelatedMessageSubscriptions
	result, err := client.SearchCorrelatedMessageSubscriptions(ctx,
		*openapi.NewCorrelatedMessageSubscriptionSearchQuery())
	if err != nil {
		return err
	}
	for _, s := range result.GetItems() {
		fmt.Printf("%v\n", s)
	}
	// endregion SearchCorrelatedMessageSubscriptions
	return nil
}
