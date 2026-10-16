// Compilable usage examples for group management operations.
// These examples are type-checked during build to guard against API regressions.
using Camunda.Orchestration.Sdk;

public static class GroupExamples
{
    #region CreateGroup
    // <CreateGroup>
    public static async Task CreateGroupExample(GroupId groupId)
    {
        using var client = CamundaClient.Create();

        var result = await client.CreateGroupAsync(new GroupCreateRequest
        {
            GroupId = groupId,
            Name = "Engineering",
        });

        Console.WriteLine($"Group key: {result.GroupId}");
    }
    // </CreateGroup>
    #endregion CreateGroup

    #region GetGroup

    // <GetGroup>
    public static async Task GetGroupExample(GroupId groupId)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetGroupAsync(groupId);
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
    public static async Task UpdateGroupExample(GroupId groupId)
    {
        using var client = CamundaClient.Create();

        await client.UpdateGroupAsync(groupId, new GroupUpdateRequest
        {
            Name = "engineering-team",
        });
    }
    // </UpdateGroup>
    #endregion UpdateGroup

    #region DeleteGroup

    // <DeleteGroup>
    public static async Task DeleteGroupExample(GroupId groupId)
    {
        using var client = CamundaClient.Create();

        await client.DeleteGroupAsync(groupId);
    }
    // </DeleteGroup>
    #endregion DeleteGroup

    #region AssignUserToGroup

    // <AssignUserToGroup>
    public static async Task AssignUserToGroupExample(GroupId groupId, Username username)
    {
        using var client = CamundaClient.Create();

        await client.AssignUserToGroupAsync(groupId, username);
    }
    // </AssignUserToGroup>
    #endregion AssignUserToGroup

    #region UnassignUserFromGroup

    // <UnassignUserFromGroup>
    public static async Task UnassignUserFromGroupExample(GroupId groupId, Username username)
    {
        using var client = CamundaClient.Create();

        await client.UnassignUserFromGroupAsync(groupId, username);
    }
    // </UnassignUserFromGroup>
    #endregion UnassignUserFromGroup

    #region AssignClientToGroup

    // <AssignClientToGroup>
    public static async Task AssignClientToGroupExample(GroupId groupId, ClientId clientId)
    {
        using var client = CamundaClient.Create();

        await client.AssignClientToGroupAsync(groupId, clientId);
    }
    // </AssignClientToGroup>
    #endregion AssignClientToGroup

    #region UnassignClientFromGroup

    // <UnassignClientFromGroup>
    public static async Task UnassignClientFromGroupExample(GroupId groupId, ClientId clientId)
    {
        using var client = CamundaClient.Create();

        await client.UnassignClientFromGroupAsync(groupId, clientId);
    }
    // </UnassignClientFromGroup>
    #endregion UnassignClientFromGroup

    #region AssignMappingRuleToGroup

    // <AssignMappingRuleToGroup>
    public static async Task AssignMappingRuleToGroupExample(GroupId groupId, MappingRuleId mappingRuleId)
    {
        using var client = CamundaClient.Create();

        await client.AssignMappingRuleToGroupAsync(groupId, mappingRuleId);
    }
    // </AssignMappingRuleToGroup>
    #endregion AssignMappingRuleToGroup

    #region UnassignMappingRuleFromGroup

    // <UnassignMappingRuleFromGroup>
    public static async Task UnassignMappingRuleFromGroupExample(GroupId groupId, MappingRuleId mappingRuleId)
    {
        using var client = CamundaClient.Create();

        await client.UnassignMappingRuleFromGroupAsync(groupId, mappingRuleId);
    }
    // </UnassignMappingRuleFromGroup>
    #endregion UnassignMappingRuleFromGroup

    #region SearchUsersForGroup

    // <SearchUsersForGroup>
    public static async Task SearchUsersForGroupExample(GroupId groupId)
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchUsersForGroupAsync(
            groupId,
            new GroupUserSearchQueryRequest());

        foreach (var user in result.Items)
        {
            Console.WriteLine($"User: {user.Username}");
        }
    }
    // </SearchUsersForGroup>
    #endregion SearchUsersForGroup

    #region SearchClientsForGroup

    // <SearchClientsForGroup>
    public static async Task SearchClientsForGroupExample(GroupId groupId)
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchClientsForGroupAsync(
            groupId,
            new GroupClientSearchQueryRequest());

        foreach (var c in result.Items)
        {
            Console.WriteLine($"Client: {c.ClientId}");
        }
    }
    // </SearchClientsForGroup>
    #endregion SearchClientsForGroup

    #region SearchRolesForGroup

    // <SearchRolesForGroup>
    public static async Task SearchRolesForGroupExample(GroupId groupId)
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchRolesForGroupAsync(
            groupId,
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
    public static async Task SearchMappingRulesForGroupExample(GroupId groupId)
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchMappingRulesForGroupAsync(
            groupId,
            new MappingRuleSearchQueryRequest());

        foreach (var rule in result.Items)
        {
            Console.WriteLine($"Mapping rule: {rule.MappingRuleId}");
        }
    }
    // </SearchMappingRulesForGroup>
    #endregion SearchMappingRulesForGroup
}
