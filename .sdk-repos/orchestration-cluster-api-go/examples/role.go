// Role operations: CRUD plus membership assignment (users, groups, clients,
// mapping rules).
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
	openapi "github.com/camunda/orchestration-cluster-api-go/client"
)

func createRoleExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region CreateRole
	result, err := client.CreateRole(ctx, *openapi.NewRoleCreateRequest("auditor", "Auditor"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion CreateRole
	return nil
}

func searchRolesExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchRoles
	result, err := client.SearchRoles(ctx, *openapi.NewRoleSearchQueryRequest())
	if err != nil {
		return err
	}
	for _, r := range result.GetItems() {
		fmt.Printf("%v\n", r)
	}
	// endregion SearchRoles
	return nil
}

func getRoleExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetRole
	role, err := client.GetRole(ctx, "auditor")
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", role)
	// endregion GetRole
	return nil
}

func updateRoleExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region UpdateRole
	result, err := client.UpdateRole(ctx, "auditor", *openapi.NewRoleUpdateRequest("Senior Auditor"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion UpdateRole
	return nil
}

func deleteRoleExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region DeleteRole
	return client.DeleteRole(ctx, "auditor")
	// endregion DeleteRole
}

func searchUsersForRoleExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchUsersForRole
	result, err := client.SearchUsersForRole(ctx, "auditor", *openapi.NewRoleUserSearchQueryRequest())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion SearchUsersForRole
	return nil
}

func assignRoleToUserExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region AssignRoleToUser
	return client.AssignRoleToUser(ctx, "auditor", "alice")
	// endregion AssignRoleToUser
}

func unassignRoleFromUserExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region UnassignRoleFromUser
	return client.UnassignRoleFromUser(ctx, "auditor", "alice")
	// endregion UnassignRoleFromUser
}

func searchGroupsForRoleExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchGroupsForRole
	result, err := client.SearchGroupsForRole(ctx, "auditor", *openapi.NewRoleGroupSearchQueryRequest())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion SearchGroupsForRole
	return nil
}

func assignRoleToGroupExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region AssignRoleToGroup
	return client.AssignRoleToGroup(ctx, "auditor", "finance")
	// endregion AssignRoleToGroup
}

func unassignRoleFromGroupExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region UnassignRoleFromGroup
	return client.UnassignRoleFromGroup(ctx, "auditor", "finance")
	// endregion UnassignRoleFromGroup
}

func searchClientsForRoleExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchClientsForRole
	result, err := client.SearchClientsForRole(ctx, "auditor", *openapi.NewRoleClientSearchQueryRequest())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion SearchClientsForRole
	return nil
}

func assignRoleToClientExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region AssignRoleToClient
	return client.AssignRoleToClient(ctx, "auditor", "reporting-service")
	// endregion AssignRoleToClient
}

func unassignRoleFromClientExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region UnassignRoleFromClient
	return client.UnassignRoleFromClient(ctx, "auditor", "reporting-service")
	// endregion UnassignRoleFromClient
}

func searchMappingRulesForRoleExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchMappingRulesForRole
	result, err := client.SearchMappingRulesForRole(ctx, "auditor", *openapi.NewMappingRuleSearchQueryRequest())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion SearchMappingRulesForRole
	return nil
}

func assignRoleToMappingRuleExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region AssignRoleToMappingRule
	return client.AssignRoleToMappingRule(ctx, "auditor", "sso-auditors")
	// endregion AssignRoleToMappingRule
}

func unassignRoleFromMappingRuleExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region UnassignRoleFromMappingRule
	return client.UnassignRoleFromMappingRule(ctx, "auditor", "sso-auditors")
	// endregion UnassignRoleFromMappingRule
}
