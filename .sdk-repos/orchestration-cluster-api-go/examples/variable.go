// Variable operations: search and read process/element variables.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go/v11"
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

func searchVariableHistoryExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchVariableHistory
	query := camunda.NewVariableHistoryItemSearchQuery()

	filter := camunda.NewVariableHistoryItemFilter()
	variableName := "orderTotal"
	filter.SetName(camunda.StringAsStringFilterProperty(&variableName))
	query.SetFilter(*filter)

	page := camunda.NewLimitPagination()
	page.SetLimit(20)
	query.SetPage(camunda.LimitPaginationAsSearchQueryPageRequest(page))

	result, err := client.SearchVariableHistory(ctx, *query)
	if err != nil {
		return err
	}
	for _, item := range result.GetItems() {
		fmt.Printf("%s changed to %s at %s\n", item.GetName(), item.GetValue(), item.GetTimestamp())
	}
	// endregion SearchVariableHistory
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
