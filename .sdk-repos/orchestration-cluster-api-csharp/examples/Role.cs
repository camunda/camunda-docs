// Compilable usage examples for role management operations.
// These examples are type-checked during build to guard against API regressions.
using Camunda.Orchestration.Sdk;

public static class RoleExamples
{
    #region CreateRole
    // <CreateRole>
    public static async Task CreateRoleExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.CreateRoleAsync(new RoleCreateRequest
        {
            Name = "developer",
        });

        Console.WriteLine($"Role key: {result.RoleId}");
    }
    // </CreateRole>
    #endregion CreateRole

    #region GetRole

    // <GetRole>
    public static async Task GetRoleExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.GetRoleAsync("developer");
        Console.WriteLine($"Role: {result.Name}");
    }
    // </GetRole>
    #endregion GetRole

    #region SearchRoles

    // <SearchRoles>
    public static async Task SearchRolesExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchRolesAsync(new RoleSearchQueryRequest());

        foreach (var role in result.Items)
        {
            Console.WriteLine($"Role: {role.Name}");
        }
    }
    // </SearchRoles>
    #endregion SearchRoles

    #region UpdateRole

    // <UpdateRole>
    public static async Task UpdateRoleExample()
    {
        using var client = CamundaClient.Create();

        await client.UpdateRoleAsync("developer", new RoleUpdateRequest
        {
            Name = "senior-developer",
        });
    }
    // </UpdateRole>
    #endregion UpdateRole

    #region DeleteRole

    // <DeleteRole>
    public static async Task DeleteRoleExample()
    {
        using var client = CamundaClient.Create();

        await client.DeleteRoleAsync("developer");
    }
    // </DeleteRole>
    #endregion DeleteRole

    #region AssignRoleToUser

    // <AssignRoleToUser>
    public static async Task AssignRoleToUserExample(Username username)
    {
        using var client = CamundaClient.Create();

        await client.AssignRoleToUserAsync("developer", username);
    }
    // </AssignRoleToUser>
    #endregion AssignRoleToUser

    #region UnassignRoleFromUser

    // <UnassignRoleFromUser>
    public static async Task UnassignRoleFromUserExample(Username username)
    {
        using var client = CamundaClient.Create();

        await client.UnassignRoleFromUserAsync("developer", username);
    }
    // </UnassignRoleFromUser>
    #endregion UnassignRoleFromUser

    #region AssignRoleToGroup

    // <AssignRoleToGroup>
    public static async Task AssignRoleToGroupExample()
    {
        using var client = CamundaClient.Create();

        await client.AssignRoleToGroupAsync("developer", "engineering");
    }
    // </AssignRoleToGroup>
    #endregion AssignRoleToGroup

    #region UnassignRoleFromGroup

    // <UnassignRoleFromGroup>
    public static async Task UnassignRoleFromGroupExample()
    {
        using var client = CamundaClient.Create();

        await client.UnassignRoleFromGroupAsync("developer", "engineering");
    }
    // </UnassignRoleFromGroup>
    #endregion UnassignRoleFromGroup

    #region AssignRoleToClient

    // <AssignRoleToClient>
    public static async Task AssignRoleToClientExample()
    {
        using var client = CamundaClient.Create();

        await client.AssignRoleToClientAsync("developer", "my-service-account");
    }
    // </AssignRoleToClient>
    #endregion AssignRoleToClient

    #region UnassignRoleFromClient

    // <UnassignRoleFromClient>
    public static async Task UnassignRoleFromClientExample()
    {
        using var client = CamundaClient.Create();

        await client.UnassignRoleFromClientAsync("developer", "my-service-account");
    }
    // </UnassignRoleFromClient>
    #endregion UnassignRoleFromClient

    #region AssignRoleToMappingRule

    // <AssignRoleToMappingRule>
    public static async Task AssignRoleToMappingRuleExample()
    {
        using var client = CamundaClient.Create();

        await client.AssignRoleToMappingRuleAsync("developer", "rule-123");
    }
    // </AssignRoleToMappingRule>
    #endregion AssignRoleToMappingRule

    #region UnassignRoleFromMappingRule

    // <UnassignRoleFromMappingRule>
    public static async Task UnassignRoleFromMappingRuleExample()
    {
        using var client = CamundaClient.Create();

        await client.UnassignRoleFromMappingRuleAsync("developer", "rule-123");
    }
    // </UnassignRoleFromMappingRule>
    #endregion UnassignRoleFromMappingRule

    #region SearchUsersForRole

    // <SearchUsersForRole>
    public static async Task SearchUsersForRoleExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchUsersForRoleAsync(
            "developer",
            new SearchUsersForRoleRequest());

        foreach (var user in result.Items)
        {
            Console.WriteLine($"User: {user.Username}");
        }
    }
    // </SearchUsersForRole>
    #endregion SearchUsersForRole

    #region SearchGroupsForRole

    // <SearchGroupsForRole>
    public static async Task SearchGroupsForRoleExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchGroupsForRoleAsync(
            "developer",
            new RoleGroupSearchQueryRequest());

        foreach (var group in result.Items)
        {
            Console.WriteLine($"Group: {group.GroupId}");
        }
    }
    // </SearchGroupsForRole>
    #endregion SearchGroupsForRole

    #region SearchClientsForRole

    // <SearchClientsForRole>
    public static async Task SearchClientsForRoleExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchClientsForRoleAsync(
            "developer",
            new SearchClientsForRoleRequest());

        foreach (var c in result.Items)
        {
            Console.WriteLine($"Client: {c.ClientId}");
        }
    }
    // </SearchClientsForRole>
    #endregion SearchClientsForRole

    #region SearchMappingRulesForRole

    // <SearchMappingRulesForRole>
    public static async Task SearchMappingRulesForRoleExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchMappingRulesForRoleAsync(
            "developer",
            new MappingRuleSearchQueryRequest());

        foreach (var rule in result.Items)
        {
            Console.WriteLine($"Mapping rule: {rule.MappingRuleId}");
        }
    }
    // </SearchMappingRulesForRole>
    #endregion SearchMappingRulesForRole
}
