// Compilable usage examples for group management operations.
// These examples are type-checked during build to guard against API regressions.
using Camunda.Orchestration.Sdk;

public static class GroupExamples
{
    #region CreateGroup
    // <CreateGroup>
    public static async Task CreateGroupExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.CreateGroupAsync(new GroupCreateRequest
        {
            GroupId = "engineering",
            Name = "Engineering",
        });

        Console.WriteLine($"Group key: {result.GroupId}");
    }
    // </CreateGroup>
    #endregion CreateGroup

    #region GetGroup

    // <GetGroup>
    public static async Task GetGroupExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.GetGroupAsync("engineering");
        Console.WriteLine($"Group: {result.Name}");
    }
    // </GetGroup>
    #endregion GetGroup

    #region SearchGroups

    // <SearchGroups>
    public static async Task SearchGroupsExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchGroupsAsync(new GroupSearchQueryRequest());

        foreach (var group in result.Items)
        {
            Console.WriteLine($"Group: {group.Name}");
        }
    }
    // </SearchGroups>
    #endregion SearchGroups

    #region UpdateGroup

    // <UpdateGroup>
    public static async Task UpdateGroupExample()
    {
        using var client = CamundaClient.Create();

        await client.UpdateGroupAsync("engineering", new GroupUpdateRequest
        {
            Name = "engineering-team",
        });
    }
    // </UpdateGroup>
    #endregion UpdateGroup

    #region DeleteGroup

    // <DeleteGroup>
    public static async Task DeleteGroupExample()
    {
        using var client = CamundaClient.Create();

        await client.DeleteGroupAsync("engineering");
    }
    // </DeleteGroup>
    #endregion DeleteGroup

    #region AssignUserToGroup

    // <AssignUserToGroup>
    public static async Task AssignUserToGroupExample(Username username)
    {
        using var client = CamundaClient.Create();

        await client.AssignUserToGroupAsync("engineering", username);
    }
    // </AssignUserToGroup>
    #endregion AssignUserToGroup

    #region UnassignUserFromGroup

    // <UnassignUserFromGroup>
    public static async Task UnassignUserFromGroupExample(Username username)
    {
        using var client = CamundaClient.Create();

        await client.UnassignUserFromGroupAsync("engineering", username);
    }
    // </UnassignUserFromGroup>
    #endregion UnassignUserFromGroup

    #region AssignClientToGroup

    // <AssignClientToGroup>
    public static async Task AssignClientToGroupExample()
    {
        using var client = CamundaClient.Create();

        await client.AssignClientToGroupAsync("engineering", "my-service-account");
    }
    // </AssignClientToGroup>
    #endregion AssignClientToGroup

    #region UnassignClientFromGroup

    // <UnassignClientFromGroup>
    public static async Task UnassignClientFromGroupExample()
    {
        using var client = CamundaClient.Create();

        await client.UnassignClientFromGroupAsync("engineering", "my-service-account");
    }
    // </UnassignClientFromGroup>
    #endregion UnassignClientFromGroup

    #region AssignMappingRuleToGroup

    // <AssignMappingRuleToGroup>
    public static async Task AssignMappingRuleToGroupExample()
    {
        using var client = CamundaClient.Create();

        await client.AssignMappingRuleToGroupAsync("engineering", "rule-123");
    }
    // </AssignMappingRuleToGroup>
    #endregion AssignMappingRuleToGroup

    #region UnassignMappingRuleFromGroup

    // <UnassignMappingRuleFromGroup>
    public static async Task UnassignMappingRuleFromGroupExample()
    {
        using var client = CamundaClient.Create();

        await client.UnassignMappingRuleFromGroupAsync("engineering", "rule-123");
    }
    // </UnassignMappingRuleFromGroup>
    #endregion UnassignMappingRuleFromGroup

    #region SearchUsersForGroup

    // <SearchUsersForGroup>
    public static async Task SearchUsersForGroupExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchUsersForGroupAsync(
            "engineering",
            new SearchUsersForGroupRequest());

        foreach (var user in result.Items)
        {
            Console.WriteLine($"User: {user.Username}");
        }
    }
    // </SearchUsersForGroup>
    #endregion SearchUsersForGroup

    #region SearchClientsForGroup

    // <SearchClientsForGroup>
    public static async Task SearchClientsForGroupExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchClientsForGroupAsync(
            "engineering",
            new SearchClientsForGroupRequest());

        foreach (var c in result.Items)
        {
            Console.WriteLine($"Client: {c.ClientId}");
        }
    }
    // </SearchClientsForGroup>
    #endregion SearchClientsForGroup

    #region SearchRolesForGroup

    // <SearchRolesForGroup>
    public static async Task SearchRolesForGroupExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchRolesForGroupAsync(
            "engineering",
            new RoleSearchQueryRequest());

        foreach (var role in result.Items)
        {
            Console.WriteLine($"Role: {role.Name}");
        }
    }
    // </SearchRolesForGroup>
    #endregion SearchRolesForGroup

    #region SearchMappingRulesForGroup

    // <SearchMappingRulesForGroup>
    public static async Task SearchMappingRulesForGroupExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchMappingRulesForGroupAsync(
            "engineering",
            new MappingRuleSearchQueryRequest());

        foreach (var rule in result.Items)
        {
            Console.WriteLine($"Mapping rule: {rule.MappingRuleId}");
        }
    }
    // </SearchMappingRulesForGroup>
    #endregion SearchMappingRulesForGroup
}
