// Compilable usage examples for user management operations.
// These examples are type-checked during build to guard against API regressions.
using Camunda.Orchestration.Sdk;

public static class UserExamples
{
    #region CreateUser
    // <CreateUser>
    public static async Task CreateUserExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.CreateUserAsync(new UserRequest
        {
            Username = "jdoe",
            Name = "Jane Doe",
            Email = "jdoe@example.com",
            Password = "secure-password",
        });

        Console.WriteLine($"User key: {result.Username}");
    }
    // </CreateUser>
    #endregion CreateUser

    #region CreateAdminUser

    // <CreateAdminUser>
    public static async Task CreateAdminUserExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.CreateAdminUserAsync(new UserRequest
        {
            Username = "admin",
            Name = "Admin User",
            Email = "admin@example.com",
            Password = "admin-password",
        });

        Console.WriteLine($"Admin user key: {result.Username}");
    }
    // </CreateAdminUser>
    #endregion CreateAdminUser

    #region GetUser

    // <GetUser>
    public static async Task GetUserExample(Username username)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetUserAsync(username);
        Console.WriteLine($"User: {result.Username}");
    }
    // </GetUser>
    #endregion GetUser

    #region SearchUsers

    // <SearchUsers>
    public static async Task SearchUsersExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchUsersAsync(new UserSearchQueryRequest());

        foreach (var user in result.Items)
        {
            Console.WriteLine($"User: {user.Username}");
        }
    }
    // </SearchUsers>
    #endregion SearchUsers

    #region UpdateUser

    // <UpdateUser>
    public static async Task UpdateUserExample(Username username)
    {
        using var client = CamundaClient.Create();

        await client.UpdateUserAsync(
            username,
            new UserUpdateRequest
            {
                Name = "Jane Smith",
                Email = "jsmith@example.com",
            });
    }
    // </UpdateUser>
    #endregion UpdateUser

    #region DeleteUser

    // <DeleteUser>
    public static async Task DeleteUserExample(Username username)
    {
        using var client = CamundaClient.Create();

        await client.DeleteUserAsync(username);
    }
    // </DeleteUser>
    #endregion DeleteUser
}
