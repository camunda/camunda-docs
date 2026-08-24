// Tenant operations: CRUD plus membership assignment (users, groups, clients,
// roles, mapping rules).
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
	openapi "github.com/camunda/orchestration-cluster-api-go/client"
)

func createTenantExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region CreateTenant
	result, err := client.CreateTenant(ctx, *openapi.NewTenantCreateRequest("tenant-a", "Tenant A"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion CreateTenant
	return nil
}

func searchTenantsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchTenants
	result, err := client.SearchTenants(ctx, *openapi.NewTenantSearchQueryRequest())
	if err != nil {
		return err
	}
	for _, t := range result.GetItems() {
		fmt.Printf("%v\n", t)
	}
	// endregion SearchTenants
	return nil
}

func getTenantExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetTenant
	tenant, err := client.GetTenant(ctx, "tenant-a")
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", tenant)
	// endregion GetTenant
	return nil
}

func updateTenantExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region UpdateTenant
	result, err := client.UpdateTenant(ctx, "tenant-a", *openapi.NewTenantUpdateRequest("Tenant A (renamed)"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion UpdateTenant
	return nil
}

func deleteTenantExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region DeleteTenant
	return client.DeleteTenant(ctx, "tenant-a")
	// endregion DeleteTenant
}

func searchUsersForTenantExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchUsersForTenant
	result, err := client.SearchUsersForTenant(ctx, "tenant-a", *openapi.NewTenantUserSearchQueryRequest())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion SearchUsersForTenant
	return nil
}

func assignUserToTenantExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region AssignUserToTenant
	return client.AssignUserToTenant(ctx, "tenant-a", "alice")
	// endregion AssignUserToTenant
}

func unassignUserFromTenantExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region UnassignUserFromTenant
	return client.UnassignUserFromTenant(ctx, "tenant-a", "alice")
	// endregion UnassignUserFromTenant
}

func searchGroupIdsForTenantExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchGroupIdsForTenant
	result, err := client.SearchGroupIdsForTenant(ctx, "tenant-a", *openapi.NewTenantGroupSearchQueryRequest())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion SearchGroupIdsForTenant
	return nil
}

func assignGroupToTenantExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region AssignGroupToTenant
	return client.AssignGroupToTenant(ctx, "tenant-a", "finance")
	// endregion AssignGroupToTenant
}

func unassignGroupFromTenantExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region UnassignGroupFromTenant
	return client.UnassignGroupFromTenant(ctx, "tenant-a", "finance")
	// endregion UnassignGroupFromTenant
}

func searchClientsForTenantExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchClientsForTenant
	result, err := client.SearchClientsForTenant(ctx, "tenant-a", *openapi.NewTenantClientSearchQueryRequest())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion SearchClientsForTenant
	return nil
}

func assignClientToTenantExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region AssignClientToTenant
	return client.AssignClientToTenant(ctx, "tenant-a", "reporting-service")
	// endregion AssignClientToTenant
}

func unassignClientFromTenantExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region UnassignClientFromTenant
	return client.UnassignClientFromTenant(ctx, "tenant-a", "reporting-service")
	// endregion UnassignClientFromTenant
}

func searchRolesForTenantExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchRolesForTenant
	result, err := client.SearchRolesForTenant(ctx, "tenant-a", *openapi.NewRoleSearchQueryRequest())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion SearchRolesForTenant
	return nil
}

func assignRoleToTenantExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region AssignRoleToTenant
	return client.AssignRoleToTenant(ctx, "tenant-a", "auditor")
	// endregion AssignRoleToTenant
}

func unassignRoleFromTenantExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region UnassignRoleFromTenant
	return client.UnassignRoleFromTenant(ctx, "tenant-a", "auditor")
	// endregion UnassignRoleFromTenant
}

func searchMappingRulesForTenantExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchMappingRulesForTenant
	result, err := client.SearchMappingRulesForTenant(ctx, "tenant-a", *openapi.NewMappingRuleSearchQueryRequest())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion SearchMappingRulesForTenant
	return nil
}

func assignMappingRuleToTenantExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region AssignMappingRuleToTenant
	return client.AssignMappingRuleToTenant(ctx, "tenant-a", "sso-auditors")
	// endregion AssignMappingRuleToTenant
}

func unassignMappingRuleFromTenantExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region UnassignMappingRuleFromTenant
	return client.UnassignMappingRuleFromTenant(ctx, "tenant-a", "sso-auditors")
	// endregion UnassignMappingRuleFromTenant
}
