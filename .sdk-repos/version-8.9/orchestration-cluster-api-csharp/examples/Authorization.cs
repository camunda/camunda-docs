// Compilable usage examples for authorization operations.
// These examples are type-checked during build to guard against API regressions.
using Camunda.Orchestration.Sdk;

public static class AuthorizationExamples
{
    #region CreateAuthorization
    // <CreateAuthorization>
    public static async Task CreateAuthorizationExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.CreateAuthorizationAsync(new AuthorizationPropertyBasedRequest
        {
            ResourceType = ResourceTypeEnum.PROCESSDEFINITION,
            PermissionTypes = new List<PermissionTypeEnum> { PermissionTypeEnum.READ, PermissionTypeEnum.UPDATE },
            ResourcePropertyName = "my-process",
            OwnerType = OwnerTypeEnum.USER,
            OwnerId = "user@example.com",
        });

        Console.WriteLine($"Authorization key: {result.AuthorizationKey}");
    }
    // </CreateAuthorization>
    #endregion CreateAuthorization

    #region GetAuthorization

    // <GetAuthorization>
    public static async Task GetAuthorizationExample(AuthorizationKey authorizationKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetAuthorizationAsync(
            authorizationKey);

        Console.WriteLine($"Resource type: {result.ResourceType}");
    }
    // </GetAuthorization>
    #endregion GetAuthorization

    #region SearchAuthorizations

    // <SearchAuthorizations>
    public static async Task SearchAuthorizationsExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchAuthorizationsAsync(
            new AuthorizationSearchQuery());

        foreach (var auth in result.Items)
        {
            Console.WriteLine($"Authorization: {auth.AuthorizationKey}");
        }
    }
    // </SearchAuthorizations>
    #endregion SearchAuthorizations

    #region UpdateAuthorization

    // <UpdateAuthorization>
    public static async Task UpdateAuthorizationExample(AuthorizationKey authorizationKey)
    {
        using var client = CamundaClient.Create();

        await client.UpdateAuthorizationAsync(
            authorizationKey,
            new AuthorizationPropertyBasedRequest
            {
                ResourceType = ResourceTypeEnum.PROCESSDEFINITION,
                PermissionTypes = new List<PermissionTypeEnum> { PermissionTypeEnum.READ, PermissionTypeEnum.UPDATE, PermissionTypeEnum.DELETE },
                ResourcePropertyName = "my-process",
                OwnerType = OwnerTypeEnum.USER,
                OwnerId = "user@example.com",
            });
    }
    // </UpdateAuthorization>
    #endregion UpdateAuthorization

    #region DeleteAuthorization

    // <DeleteAuthorization>
    public static async Task DeleteAuthorizationExample(AuthorizationKey authorizationKey)
    {
        using var client = CamundaClient.Create();

        await client.DeleteAuthorizationAsync(authorizationKey);
    }
    // </DeleteAuthorization>
    #endregion DeleteAuthorization

    #region GetAuthentication

    // <GetAuthentication>
    public static async Task GetAuthenticationExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.GetAuthenticationAsync();
        Console.WriteLine($"Authenticated user: {result.Username}");
    }
    // </GetAuthentication>
    #endregion GetAuthentication
}
