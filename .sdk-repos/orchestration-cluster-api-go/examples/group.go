// Group operations: CRUD plus membership assignment (users, clients, roles,
// mapping rules).
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
)

func createGroupExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region CreateGroup
	result, err := client.CreateGroup(ctx, *camunda.NewGroupCreateRequest("finance", "Finance"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion CreateGroup
	return nil
}

func searchGroupsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchGroups
	result, err := client.SearchGroups(ctx, *camunda.NewGroupSearchQueryRequest())
	if err != nil {
		return err
	}
	for _, g := range result.GetItems() {
		fmt.Printf("%v\n", g)
	}
	// endregion SearchGroups
	return nil
}

func getGroupExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetGroup
	group, err := client.GetGroup(ctx, "finance")
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", group)
	// endregion GetGroup
	return nil
}

func updateGroupExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region UpdateGroup
	result, err := client.UpdateGroup(ctx, "finance", *camunda.NewGroupUpdateRequest("Finance & Accounting"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion UpdateGroup
	return nil
}

func deleteGroupExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region DeleteGroup
	return client.DeleteGroup(ctx, "finance")
	// endregion DeleteGroup
}

func searchUsersForGroupExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchUsersForGroup
	result, err := client.SearchUsersForGroup(ctx, "finance", *camunda.NewGroupUserSearchQueryRequest())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion SearchUsersForGroup
	return nil
}

func assignUserToGroupExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region AssignUserToGroup
	return client.AssignUserToGroup(ctx, "finance", "alice")
	// endregion AssignUserToGroup
}

func unassignUserFromGroupExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region UnassignUserFromGroup
	return client.UnassignUserFromGroup(ctx, "finance", "alice")
	// endregion UnassignUserFromGroup
}

func searchClientsForGroupExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchClientsForGroup
	result, err := client.SearchClientsForGroup(ctx, "finance", *camunda.NewGroupClientSearchQueryRequest())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion SearchClientsForGroup
	return nil
}

func assignClientToGroupExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region AssignClientToGroup
	return client.AssignClientToGroup(ctx, "finance", "reporting-service")
	// endregion AssignClientToGroup
}

func unassignClientFromGroupExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region UnassignClientFromGroup
	return client.UnassignClientFromGroup(ctx, "finance", "reporting-service")
	// endregion UnassignClientFromGroup
}

func searchRolesForGroupExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchRolesForGroup
	result, err := client.SearchRolesForGroup(ctx, "finance", *camunda.NewRoleSearchQueryRequest())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion SearchRolesForGroup
	return nil
}

func searchMappingRulesForGroupExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchMappingRulesForGroup
	result, err := client.SearchMappingRulesForGroup(ctx, "finance", *camunda.NewMappingRuleSearchQueryRequest())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion SearchMappingRulesForGroup
	return nil
}

func assignMappingRuleToGroupExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region AssignMappingRuleToGroup
	return client.AssignMappingRuleToGroup(ctx, "finance", "sso-auditors")
	// endregion AssignMappingRuleToGroup
}

func unassignMappingRuleFromGroupExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region UnassignMappingRuleFromGroup
	return client.UnassignMappingRuleFromGroup(ctx, "finance", "sso-auditors")
	// endregion UnassignMappingRuleFromGroup
}
