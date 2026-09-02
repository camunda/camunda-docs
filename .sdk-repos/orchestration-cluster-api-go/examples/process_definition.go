// Process definition operations: search, read, XML, forms, and statistics.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
	openapi "github.com/camunda/orchestration-cluster-api-go/client"
)

func searchProcessDefinitionsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchProcessDefinitions
	result, err := client.SearchProcessDefinitions(ctx, *openapi.NewProcessDefinitionSearchQuery())
	if err != nil {
		return err
	}
	for _, d := range result.GetItems() {
		fmt.Printf("%v\n", d)
	}
	// endregion SearchProcessDefinitions
	return nil
}

func getProcessDefinitionExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetProcessDefinition
	def, err := client.GetProcessDefinition(ctx, openapi.MustProcessDefinitionKey("2251799813685330"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", def)
	// endregion GetProcessDefinition
	return nil
}

func getProcessDefinitionXMLExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetProcessDefinitionXML
	xml, err := client.GetProcessDefinitionXML(ctx, openapi.MustProcessDefinitionKey("2251799813685330"))
	if err != nil {
		return err
	}
	fmt.Println(xml)
	// endregion GetProcessDefinitionXML
	return nil
}

func getStartProcessFormExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetStartProcessForm
	form, err := client.GetStartProcessForm(ctx, openapi.MustProcessDefinitionKey("2251799813685330"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", form)
	// endregion GetStartProcessForm
	return nil
}

func getProcessDefinitionStatisticsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetProcessDefinitionStatistics
	result, err := client.GetProcessDefinitionStatistics(ctx,
		openapi.MustProcessDefinitionKey("2251799813685330"),
		*openapi.NewProcessDefinitionElementStatisticsQuery())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion GetProcessDefinitionStatistics
	return nil
}

func searchProcessDefinitionVariableNamesExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchProcessDefinitionVariableNames
	result, err := client.SearchProcessDefinitionVariableNames(ctx,
		openapi.MustProcessDefinitionKey("2251799813685330"),
		*openapi.NewProcessDefinitionVariableNameSearchQuery())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion SearchProcessDefinitionVariableNames
	return nil
}

func getProcessDefinitionInstanceStatisticsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetProcessDefinitionInstanceStatistics
	result, err := client.GetProcessDefinitionInstanceStatistics(ctx,
		*openapi.NewProcessDefinitionInstanceStatisticsQuery())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion GetProcessDefinitionInstanceStatistics
	return nil
}

func getProcessDefinitionInstanceVersionStatisticsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetProcessDefinitionInstanceVersionStatistics
	query := openapi.NewProcessDefinitionInstanceVersionStatisticsQuery(
		*openapi.NewProcessDefinitionInstanceVersionStatisticsFilter("order-process"))

	result, err := client.GetProcessDefinitionInstanceVersionStatistics(ctx, *query)
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion GetProcessDefinitionInstanceVersionStatistics
	return nil
}

func getProcessDefinitionMessageSubscriptionStatisticsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetProcessDefinitionMessageSubscriptionStatistics
	result, err := client.GetProcessDefinitionMessageSubscriptionStatistics(ctx,
		*openapi.NewProcessDefinitionMessageSubscriptionStatisticsQuery())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion GetProcessDefinitionMessageSubscriptionStatistics
	return nil
}
