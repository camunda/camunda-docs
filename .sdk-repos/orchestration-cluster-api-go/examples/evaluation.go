// Expression and conditional evaluation.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
	openapi "github.com/camunda/orchestration-cluster-api-go/client"
)

func evaluateExpressionExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region EvaluateExpression
	// Evaluate a FEEL expression against a set of variables.
	req := openapi.NewExpressionEvaluationRequest("a + b")
	req.SetVariables(map[string]any{"a": 2, "b": 3})

	result, err := client.EvaluateExpression(ctx, *req)
	if err != nil {
		return err
	}
	fmt.Printf("result: %v\n", result.GetResult())
	// endregion EvaluateExpression
	return nil
}

func evaluateConditionalsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region EvaluateConditionals
	// Evaluate which conditional start events match the given variables.
	req := openapi.NewConditionalEvaluationInstruction(map[string]any{"temperature": 42})

	result, err := client.EvaluateConditionals(ctx, *req)
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion EvaluateConditionals
	return nil
}
