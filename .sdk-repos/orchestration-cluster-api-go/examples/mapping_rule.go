// Mapping rule operations: map IdP claims to Camunda identities.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
)

func createMappingRuleExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region CreateMappingRule
	// Map the IdP claim `groups=auditors` to a Camunda mapping-rule identity.
	result, err := client.CreateMappingRule(ctx,
		*camunda.NewMappingRuleCreateRequest("groups", "auditors", "SSO Auditors", "sso-auditors"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion CreateMappingRule
	return nil
}

func searchMappingRuleExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchMappingRule
	result, err := client.SearchMappingRule(ctx, *camunda.NewMappingRuleSearchQueryRequest())
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
		*camunda.NewMappingRuleUpdateRequest("groups", "senior-auditors", "SSO Senior Auditors"))
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
