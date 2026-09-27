// Mapping rule operations: map IdP claims to Camunda identities.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
	openapi "github.com/camunda/orchestration-cluster-api-go/client"
)

func createMappingRuleExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region CreateMappingRule
	// Map the IdP claim `groups=auditors` to a Camunda mapping-rule identity.
	result, err := client.CreateMappingRule(ctx,
		*openapi.NewMappingRuleCreateRequest("groups", "auditors", "SSO Auditors", "sso-auditors"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion CreateMappingRule
	return nil
}

func searchMappingRuleExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchMappingRule
	result, err := client.SearchMappingRule(ctx, *openapi.NewMappingRuleSearchQueryRequest())
	if err != nil {
		return err
	}
	for _, r := range result.GetItems() {
		fmt.Printf("%v\n", r)
	}
	// endregion SearchMappingRule
	return nil
}

func getMappingRuleExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetMappingRule
	rule, err := client.GetMappingRule(ctx, "sso-auditors")
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", rule)
	// endregion GetMappingRule
	return nil
}

func updateMappingRuleExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region UpdateMappingRule
	result, err := client.UpdateMappingRule(ctx, "sso-auditors",
		*openapi.NewMappingRuleUpdateRequest("groups", "senior-auditors", "SSO Senior Auditors"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion UpdateMappingRule
	return nil
}

func deleteMappingRuleExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region DeleteMappingRule
	return client.DeleteMappingRule(ctx, "sso-auditors")
	// endregion DeleteMappingRule
}
