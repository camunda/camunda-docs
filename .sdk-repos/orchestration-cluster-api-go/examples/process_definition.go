// Process definition operations: search, read, XML, forms, statistics, and suspension.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go/v11"
)

func searchProcessDefinitionsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchProcessDefinitions
	result, err := client.SearchProcessDefinitions(ctx, *camunda.NewProcessDefinitionSearchQuery())
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
	def, err := client.GetProcessDefinition(ctx, camunda.MustProcessDefinitionKey("2251799813685330"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", def)
	// endregion GetProcessDefinition
	return nil
}

func getProcessDefinitionXMLExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetProcessDefinitionXML
	xml, err := client.GetProcessDefinitionXML(ctx, camunda.MustProcessDefinitionKey("2251799813685330"))
	if err != nil {
		return err
	}
	fmt.Println(xml)
	// endregion GetProcessDefinitionXML
	return nil
}

func getStartProcessFormExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetStartProcessForm
	form, err := client.GetStartProcessForm(ctx, camunda.MustProcessDefinitionKey("2251799813685330"))
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
		camunda.MustProcessDefinitionKey("2251799813685330"),
		*camunda.NewProcessDefinitionElementStatisticsQuery())
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
		camunda.MustProcessDefinitionKey("2251799813685330"),
		*camunda.NewProcessDefinitionVariableNameSearchQuery())
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
		*camunda.NewProcessDefinitionInstanceStatisticsQuery())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion GetProcessDefinitionInstanceStatistics
	return nil
}

func getProcessDefinitionInstanceVersionStatisticsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetProcessDefinitionInstanceVersionStatistics
	query := camunda.NewProcessDefinitionInstanceVersionStatisticsQuery(
		*camunda.NewProcessDefinitionInstanceVersionStatisticsFilter("order-process"))

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
		*camunda.NewProcessDefinitionMessageSubscriptionStatisticsQuery())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion GetProcessDefinitionMessageSubscriptionStatistics
	return nil
}

func suspendProcessDefinitionsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SuspendProcessDefinitions
	// ProcessDefinitionSuspensionInstruction is a union; suspend every version
	// of a process definition id, including its running process instances.
	byID := camunda.NewProcessDefinitionSuspensionInstructionById("order-process")
	byID.SetIncludeProcessInstances(true)

	result, err := client.SuspendProcessDefinitions(ctx,
		camunda.ProcessDefinitionSuspensionInstructionByIdAsProcessDefinitionSuspensionInstruction(byID))
	if err != nil {
		return err
	}
	if key, ok := result.GetBatchOperationKeyOk(); ok && key != nil {
		fmt.Printf("Batch operation: %s\n", *key)
	}
	// endregion SuspendProcessDefinitions
	return nil
}

func resumeProcessDefinitionsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region ResumeProcessDefinitions
	// ProcessDefinitionResumptionInstruction is a union; resume one version by key.
	byKey := camunda.NewProcessDefinitionResumptionInstructionByKey(
		camunda.MustProcessDefinitionKey("2251799813685330"))

	result, err := client.ResumeProcessDefinitions(ctx,
		camunda.ProcessDefinitionResumptionInstructionByKeyAsProcessDefinitionResumptionInstruction(byKey))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion ResumeProcessDefinitions
	return nil
}
