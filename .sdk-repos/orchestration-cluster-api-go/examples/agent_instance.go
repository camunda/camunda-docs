// Agent instance operations: create, read, update, search, and history.
package examples

import (
	"context"
	"fmt"
	"time"

	camunda "github.com/camunda/orchestration-cluster-api-go"
	openapi "github.com/camunda/orchestration-cluster-api-go/client"
)

func createAgentInstanceExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region CreateAgentInstance
	definition := openapi.NewAgentInstanceDefinition("gpt-4o", "openai", "You are a helpful assistant.")
	req := openapi.NewAgentInstanceCreationRequest(openapi.ModelString("2251799813685360"), *definition)

	result, err := client.CreateAgentInstance(ctx, *req)
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion CreateAgentInstance
	return nil
}

func getAgentInstanceExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetAgentInstance
	agent, err := client.GetAgentInstance(ctx, openapi.MustAgentInstanceKey("2251799813685370"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", agent)
	// endregion GetAgentInstance
	return nil
}

func updateAgentInstanceExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region UpdateAgentInstance
	req := openapi.NewAgentInstanceUpdateRequest(openapi.ModelString("2251799813685360"))

	result, err := client.UpdateAgentInstance(ctx, openapi.MustAgentInstanceKey("2251799813685370"), *req)
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion UpdateAgentInstance
	return nil
}

func searchAgentInstancesExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchAgentInstances
	result, err := client.SearchAgentInstances(ctx, *openapi.NewAgentInstanceSearchQuery())
	if err != nil {
		return err
	}
	for _, a := range result.GetItems() {
		fmt.Printf("%v\n", a)
	}
	// endregion SearchAgentInstances
	return nil
}

func createAgentInstanceHistoryItemExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region CreateAgentInstanceHistoryItem
	req := openapi.NewAgentInstanceHistoryItemRequest(
		openapi.ModelString("2251799813685360"), // elementInstanceKey
		openapi.ModelString("2251799813685424"), // jobKey
		"lease-token",
		openapi.AGENTINSTANCEHISTORYROLEENUM_USER,
		nil, // message content
		time.Now(),
	)

	result, err := client.CreateAgentInstanceHistoryItem(ctx,
		openapi.MustAgentInstanceKey("2251799813685370"), *req)
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion CreateAgentInstanceHistoryItem
	return nil
}

func searchAgentInstanceHistoryExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchAgentInstanceHistory
	result, err := client.SearchAgentInstanceHistory(ctx,
		openapi.MustAgentInstanceKey("2251799813685370"),
		*openapi.NewAgentInstanceHistorySearchQuery())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion SearchAgentInstanceHistory
	return nil
}
