// Element instance operations: search, read, incidents, wait states, and
// variable creation.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
	openapi "github.com/camunda/orchestration-cluster-api-go/client"
)

func searchElementInstancesExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchElementInstances
	result, err := client.SearchElementInstances(ctx, *openapi.NewElementInstanceSearchQuery())
	if err != nil {
		return err
	}
	for _, e := range result.GetItems() {
		fmt.Printf("%v\n", e)
	}
	// endregion SearchElementInstances
	return nil
}

func getElementInstanceExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetElementInstance
	element, err := client.GetElementInstance(ctx, openapi.MustElementInstanceKey("2251799813685360"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", element)
	// endregion GetElementInstance
	return nil
}

func searchElementInstanceIncidentsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchElementInstanceIncidents
	result, err := client.SearchElementInstanceIncidents(ctx,
		openapi.MustElementInstanceKey("2251799813685360"),
		*openapi.NewIncidentSearchQuery())
	if err != nil {
		return err
	}
	for _, inc := range result.GetItems() {
		fmt.Printf("%v\n", inc)
	}
	// endregion SearchElementInstanceIncidents
	return nil
}

func searchElementInstanceWaitStatesExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchElementInstanceWaitStates
	result, err := client.SearchElementInstanceWaitStates(ctx, *openapi.NewElementInstanceWaitStateQuery())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion SearchElementInstanceWaitStates
	return nil
}

func createElementInstanceVariablesExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region CreateElementInstanceVariables
	// Set local variables on a specific element instance scope.
	req := openapi.NewSetVariableRequest(map[string]any{"approved": true})

	return client.CreateElementInstanceVariables(ctx, openapi.MustElementInstanceKey("2251799813685360"), *req)
	// endregion CreateElementInstanceVariables
}
