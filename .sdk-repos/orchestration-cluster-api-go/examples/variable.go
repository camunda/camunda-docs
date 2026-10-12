// Variable operations: search and read process/element variables.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
)

func searchVariablesExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchVariables
	result, err := client.SearchVariables(ctx, *camunda.NewVariableSearchQuery())
	if err != nil {
		return err
	}
	for _, v := range result.GetItems() {
		fmt.Printf("%v\n", v)
	}
	// endregion SearchVariables
	return nil
}

func getVariableExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetVariable
	variable, err := client.GetVariable(ctx, camunda.MustVariableKey("2251799813685390"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", variable)
	// endregion GetVariable
	return nil
}
