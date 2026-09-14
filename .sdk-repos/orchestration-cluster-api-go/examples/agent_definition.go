// Agent definition operations: read and search.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
	openapi "github.com/camunda/orchestration-cluster-api-go/client"
)

func getAgentDefinitionExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetAgentDefinition
	definition, err := client.GetAgentDefinition(ctx, openapi.MustAgentDefinitionKey("2251799813691958"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", definition)
	// endregion GetAgentDefinition
	return nil
}

func searchAgentDefinitionsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchAgentDefinitions
	result, err := client.SearchAgentDefinitions(ctx, *openapi.NewAgentDefinitionSearchQuery())
	if err != nil {
		return err
	}
	for _, d := range result.GetItems() {
		fmt.Printf("%v\n", d)
	}
	// endregion SearchAgentDefinitions
	return nil
}
