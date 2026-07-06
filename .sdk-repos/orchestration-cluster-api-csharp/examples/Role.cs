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
    public static async Task GetRoleExample(RoleId roleId)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetRoleAsync(roleId);
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
    public static async Task UpdateRoleExample(RoleId roleId)
    {
        using var client = CamundaClient.Create();

        await client.UpdateRoleAsync(roleId, new RoleUpdateRequest
        {
            Name = "senior-developer",
        });
    }
    // </UpdateRole>
    #endregion UpdateRole

    #region DeleteRole

    // <DeleteRole>
    public static async Task DeleteRoleExample(RoleId roleId)
    {
        using var client = CamundaClient.Create();

        await client.DeleteRoleAsync(roleId);
    }
    // </DeleteRole>
    #endregion DeleteRole

    #region AssignRoleToUser

    // <AssignRoleToUser>
    public static async Task AssignRoleToUserExample(RoleId roleId, Username username)
    {
        using var client = CamundaClient.Create();

        await client.AssignRoleToUserAsync(roleId, username);
    }
    // </AssignRoleToUser>
    #endregion AssignRoleToUser

    #region UnassignRoleFromUser

    // <UnassignRoleFromUser>
    public static async Task UnassignRoleFromUserExample(RoleId roleId, Username username)
    {
        using var client = CamundaClient.Create();

        await client.UnassignRoleFromUserAsync(roleId, username);
    }
    // </UnassignRoleFromUser>
    #endregion UnassignRoleFromUser

    #region AssignRoleToGroup

    // <AssignRoleToGroup>
    public static async Task AssignRoleToGroupExample(RoleId roleId, GroupId groupId)
    {
        using var client = CamundaClient.Create();

        await client.AssignRoleToGroupAsync(roleId, groupId);
    }
    // </AssignRoleToGroup>
    #endregion AssignRoleToGroup

    #region UnassignRoleFromGroup

    // <UnassignRoleFromGroup>
    public static async Task UnassignRoleFromGroupExample(RoleId roleId, GroupId groupId)
    {
        using var client = CamundaClient.Create();

        await client.UnassignRoleFromGroupAsync(roleId, groupId);
    }
    // </UnassignRoleFromGroup>
    #endregion UnassignRoleFromGroup

    #region AssignRoleToClient

    // <AssignRoleToClient>
    public static async Task AssignRoleToClientExample(RoleId roleId, ClientId clientId)
    {
        using var client = CamundaClient.Create();

        await client.AssignRoleToClientAsync(roleId, clientId);
    }
    // </AssignRoleToClient>
    #endregion AssignRoleToClient

    #region UnassignRoleFromClient

    // <UnassignRoleFromClient>
    public static async Task UnassignRoleFromClientExample(RoleId roleId, ClientId clientId)
    {
        using var client = CamundaClient.Create();

        await client.UnassignRoleFromClientAsync(roleId, clientId);
    }
    // </UnassignRoleFromClient>
    #endregion UnassignRoleFromClient

    #region AssignRoleToMappingRule

    // <AssignRoleToMappingRule>
    public static async Task AssignRoleToMappingRuleExample(RoleId roleId, MappingRuleId mappingRuleId)
    {
        using var client = CamundaClient.Create();

        await client.AssignRoleToMappingRuleAsync(roleId, mappingRuleId);
    }
    // </AssignRoleToMappingRule>
    #endregion AssignRoleToMappingRule

    #region UnassignRoleFromMappingRule

    // <UnassignRoleFromMappingRule>
    public static async Task UnassignRoleFromMappingRuleExample(RoleId roleId, MappingRuleId mappingRuleId)
    {
        using var client = CamundaClient.Create();

        await client.UnassignRoleFromMappingRuleAsync(roleId, mappingRuleId);
    }
    // </UnassignRoleFromMappingRule>
    #endregion UnassignRoleFromMappingRule

    #region SearchUsersForRole

    // <SearchUsersForRole>
    public static async Task SearchUsersForRoleExample(RoleId roleId)
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchUsersForRoleAsync(
            roleId,
            new RoleUserSearchQueryRequest());

        foreach (var user in result.Items)
        {
            Console.WriteLine($"User: {user.Username}");
        }
    }
    // </SearchUsersForRole>
    #endregion SearchUsersForRole

    #region SearchGroupsForRole

    // <SearchGroupsForRole>
    public static async Task SearchGroupsForRoleExample(RoleId roleId)
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchGroupsForRoleAsync(
            roleId,
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
    public static async Task SearchClientsForRoleExample(RoleId roleId)
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchClientsForRoleAsync(
            roleId,
            new RoleClientSearchQueryRequest());

        foreach (var c in result.Items)
        {
            Console.WriteLine($"Client: {c.ClientId}");
        }
    }
    // </SearchClientsForRole>
    #endregion SearchClientsForRole

    #region SearchMappingRulesForRole

    // <SearchMappingRulesForRole>
    public static async Task SearchMappingRulesForRoleExample(RoleId roleId)
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchMappingRulesForRoleAsync(
            roleId,
            new MappingRuleSearchQueryRequest());

        foreach (var rule in result.Items)
        {
            Console.WriteLine($"Mapping rule: {rule.MappingRuleId}");
        }
    }
    // </SearchMappingRulesForRole>
    #endregion SearchMappingRulesForRole
}
