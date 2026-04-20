// Compilable usage examples for tenant management operations.
// These examples are type-checked during build to guard against API regressions.
using Camunda.Orchestration.Sdk;

public static class TenantExamples
{
    #region CreateTenant
    // <CreateTenant>
    public static async Task CreateTenantExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.CreateTenantAsync(new TenantCreateRequest
        {
            TenantId = "acme-corp",
            Name = "Acme Corporation",
        });

        Console.WriteLine($"Tenant key: {result.TenantId}");
    }
    // </CreateTenant>
    #endregion CreateTenant

    #region GetTenant

    // <GetTenant>
    public static async Task GetTenantExample(TenantId tenantId)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetTenantAsync(tenantId);
        Console.WriteLine($"Tenant: {result.Name}");
    }
    // </GetTenant>
    #endregion GetTenant

    #region SearchTenants

    // <SearchTenants>
    public static async Task SearchTenantsExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchTenantsAsync(new TenantSearchQueryRequest());

        foreach (var tenant in result.Items)
        {
            Console.WriteLine($"Tenant: {tenant.Name}");
        }
    }
    // </SearchTenants>
    #endregion SearchTenants

    #region UpdateTenant

    // <UpdateTenant>
    public static async Task UpdateTenantExample(TenantId tenantId)
    {
        using var client = CamundaClient.Create();

        await client.UpdateTenantAsync(
            tenantId,
            new TenantUpdateRequest
            {
                Name = "Acme Corp International",
            });
    }
    // </UpdateTenant>
    #endregion UpdateTenant

    #region DeleteTenant

    // <DeleteTenant>
    public static async Task DeleteTenantExample(TenantId tenantId)
    {
        using var client = CamundaClient.Create();

        await client.DeleteTenantAsync(tenantId);
    }
    // </DeleteTenant>
    #endregion DeleteTenant

    #region AssignUserToTenant

    // <AssignUserToTenant>
    public static async Task AssignUserToTenantExample(TenantId tenantId, Username username)
    {
        using var client = CamundaClient.Create();

        await client.AssignUserToTenantAsync(
            tenantId,
            username);
    }
    // </AssignUserToTenant>
    #endregion AssignUserToTenant

    #region UnassignUserFromTenant

    // <UnassignUserFromTenant>
    public static async Task UnassignUserFromTenantExample(TenantId tenantId, Username username)
    {
        using var client = CamundaClient.Create();

        await client.UnassignUserFromTenantAsync(
            tenantId,
            username);
    }
    // </UnassignUserFromTenant>
    #endregion UnassignUserFromTenant

    #region AssignGroupToTenant

    // <AssignGroupToTenant>
    public static async Task AssignGroupToTenantExample(TenantId tenantId)
    {
        using var client = CamundaClient.Create();

        await client.AssignGroupToTenantAsync(
            tenantId,
            "engineering");
    }
    // </AssignGroupToTenant>
    #endregion AssignGroupToTenant

    #region UnassignGroupFromTenant

    // <UnassignGroupFromTenant>
    public static async Task UnassignGroupFromTenantExample(TenantId tenantId)
    {
        using var client = CamundaClient.Create();

        await client.UnassignGroupFromTenantAsync(
            tenantId,
            "engineering");
    }
    // </UnassignGroupFromTenant>
    #endregion UnassignGroupFromTenant

    #region AssignRoleToTenant

    // <AssignRoleToTenant>
    public static async Task AssignRoleToTenantExample(TenantId tenantId)
    {
        using var client = CamundaClient.Create();

        await client.AssignRoleToTenantAsync(
            tenantId,
            "developer");
    }
    // </AssignRoleToTenant>
    #endregion AssignRoleToTenant

    #region UnassignRoleFromTenant

    // <UnassignRoleFromTenant>
    public static async Task UnassignRoleFromTenantExample(TenantId tenantId)
    {
        using var client = CamundaClient.Create();

        await client.UnassignRoleFromTenantAsync(
            tenantId,
            "developer");
    }
    // </UnassignRoleFromTenant>
    #endregion UnassignRoleFromTenant

    #region AssignClientToTenant

    // <AssignClientToTenant>
    public static async Task AssignClientToTenantExample(TenantId tenantId)
    {
        using var client = CamundaClient.Create();

        await client.AssignClientToTenantAsync(
            tenantId,
            "my-service-account");
    }
    // </AssignClientToTenant>
    #endregion AssignClientToTenant

    #region UnassignClientFromTenant

    // <UnassignClientFromTenant>
    public static async Task UnassignClientFromTenantExample(TenantId tenantId)
    {
        using var client = CamundaClient.Create();

        await client.UnassignClientFromTenantAsync(
            tenantId,
            "my-service-account");
    }
    // </UnassignClientFromTenant>
    #endregion UnassignClientFromTenant

    #region AssignMappingRuleToTenant

    // <AssignMappingRuleToTenant>
    public static async Task AssignMappingRuleToTenantExample(TenantId tenantId)
    {
        using var client = CamundaClient.Create();

        await client.AssignMappingRuleToTenantAsync(
            tenantId,
            "rule-123");
    }
    // </AssignMappingRuleToTenant>
    #endregion AssignMappingRuleToTenant

    #region UnassignMappingRuleFromTenant

    // <UnassignMappingRuleFromTenant>
    public static async Task UnassignMappingRuleFromTenantExample(TenantId tenantId)
    {
        using var client = CamundaClient.Create();

        await client.UnassignMappingRuleFromTenantAsync(
            tenantId,
            "rule-123");
    }
    // </UnassignMappingRuleFromTenant>
    #endregion UnassignMappingRuleFromTenant

    #region SearchUsersForTenant

    // <SearchUsersForTenant>
    public static async Task SearchUsersForTenantExample(TenantId tenantId)
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchUsersForTenantAsync(
            tenantId,
            new SearchUsersForTenantRequest());

        foreach (var user in result.Items)
        {
            Console.WriteLine($"User: {user.Username}");
        }
    }
    // </SearchUsersForTenant>
    #endregion SearchUsersForTenant

    #region SearchClientsForTenant

    // <SearchClientsForTenant>
    public static async Task SearchClientsForTenantExample(TenantId tenantId)
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchClientsForTenantAsync(
            tenantId,
            new SearchClientsForTenantRequest());

        foreach (var c in result.Items)
        {
            Console.WriteLine($"Client: {c.ClientId}");
        }
    }
    // </SearchClientsForTenant>
    #endregion SearchClientsForTenant

    #region SearchGroupIdsForTenant

    // <SearchGroupIdsForTenant>
    public static async Task SearchGroupIdsForTenantExample(TenantId tenantId)
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchGroupIdsForTenantAsync(
            tenantId,
            new TenantGroupSearchQueryRequest());

        foreach (var group in result.Items)
        {
            Console.WriteLine($"Group: {group.GroupId}");
        }
    }
    // </SearchGroupIdsForTenant>
    #endregion SearchGroupIdsForTenant

    #region SearchRolesForTenant

    // <SearchRolesForTenant>
    public static async Task SearchRolesForTenantExample(TenantId tenantId)
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchRolesForTenantAsync(
            tenantId,
            new RoleSearchQueryRequest());

        foreach (var role in result.Items)
        {
            Console.WriteLine($"Role: {role.Name}");
        }
    }
    // </SearchRolesForTenant>
    #endregion SearchRolesForTenant

    #region SearchMappingRulesForTenant

    // <SearchMappingRulesForTenant>
    public static async Task SearchMappingRulesForTenantExample(TenantId tenantId)
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchMappingRulesForTenantAsync(
            tenantId,
            new MappingRuleSearchQueryRequest());

        foreach (var rule in result.Items)
        {
            Console.WriteLine($"Mapping rule: {rule.MappingRuleId}");
        }
    }
    // </SearchMappingRulesForTenant>
    #endregion SearchMappingRulesForTenant
}
