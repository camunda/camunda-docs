// Decision operations: evaluate, and read decision definitions, instances, and
// requirements (DRDs).
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
	openapi "github.com/camunda/orchestration-cluster-api-go/client"
)

func evaluateDecisionExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region EvaluateDecision
	// DecisionEvaluationInstruction is a union; evaluate by decision id here.
	byID := openapi.NewDecisionEvaluationById("dish-decision")
	byID.SetVariables(map[string]any{"season": "Winter", "guestCount": 4})

	result, err := client.EvaluateDecision(ctx,
		openapi.DecisionEvaluationByIdAsDecisionEvaluationInstruction(byID))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion EvaluateDecision
	return nil
}

func searchDecisionDefinitionsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchDecisionDefinitions
	result, err := client.SearchDecisionDefinitions(ctx, *openapi.NewDecisionDefinitionSearchQuery())
	if err != nil {
		return err
	}
	for _, d := range result.GetItems() {
		fmt.Printf("%v\n", d)
	}
	// endregion SearchDecisionDefinitions
	return nil
}

func getDecisionDefinitionExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetDecisionDefinition
	def, err := client.GetDecisionDefinition(ctx, openapi.MustDecisionDefinitionKey("2251799813685310"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", def)
	// endregion GetDecisionDefinition
	return nil
}

func getDecisionDefinitionXMLExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetDecisionDefinitionXML
	xml, err := client.GetDecisionDefinitionXML(ctx, openapi.MustDecisionDefinitionKey("2251799813685310"))
	if err != nil {
		return err
	}
	fmt.Println(xml)
	// endregion GetDecisionDefinitionXML
	return nil
}

func searchDecisionInstancesExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchDecisionInstances
	result, err := client.SearchDecisionInstances(ctx, *openapi.NewDecisionInstanceSearchQuery())
	if err != nil {
		return err
	}
	for _, d := range result.GetItems() {
		fmt.Printf("%v\n", d)
	}
	// endregion SearchDecisionInstances
	return nil
}

func getDecisionInstanceExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetDecisionInstance
	instance, err := client.GetDecisionInstance(ctx, "2251799813685310-1")
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", instance)
	// endregion GetDecisionInstance
	return nil
}

func deleteDecisionInstanceExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region DeleteDecisionInstance
	return client.DeleteDecisionInstance(ctx,
		openapi.MustDecisionEvaluationKey("2251799813685310"),
		*openapi.NewDeleteDecisionInstanceRequest())
	// endregion DeleteDecisionInstance
}

func deleteDecisionInstancesBatchOperationExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region DeleteDecisionInstancesBatchOperation
	req := openapi.NewDecisionInstanceDeletionBatchOperationRequest(*openapi.NewDecisionInstanceFilter())

	result, err := client.DeleteDecisionInstancesBatchOperation(ctx, *req)
	if err != nil {
		return err
	}
	fmt.Printf("created batch operation %v\n", result.GetBatchOperationKey())
	// endregion DeleteDecisionInstancesBatchOperation
	return nil
}

func searchDecisionRequirementsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchDecisionRequirements
	result, err := client.SearchDecisionRequirements(ctx, *openapi.NewDecisionRequirementsSearchQuery())
	if err != nil {
		return err
	}
	for _, d := range result.GetItems() {
		fmt.Printf("%v\n", d)
	}
	// endregion SearchDecisionRequirements
	return nil
}

func getDecisionRequirementsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetDecisionRequirements
	drd, err := client.GetDecisionRequirements(ctx, openapi.MustDecisionRequirementsKey("2251799813685320"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", drd)
	// endregion GetDecisionRequirements
	return nil
}

func getDecisionRequirementsXMLExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetDecisionRequirementsXML
	xml, err := client.GetDecisionRequirementsXML(ctx, openapi.MustDecisionRequirementsKey("2251799813685320"))
	if err != nil {
		return err
	}
	fmt.Println(xml)
	// endregion GetDecisionRequirementsXML
	return nil
}
