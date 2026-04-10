// Compilable usage examples for user task operations.
// These examples are type-checked during build to guard against API regressions.
using Camunda.Orchestration.Sdk;

public static class UserTaskExamples
{
    #region AssignUserTask
    // <AssignUserTask>
    public static async Task AssignUserTaskExample(UserTaskKey userTaskKey)
    {
        using var client = CamundaClient.Create();

        await client.AssignUserTaskAsync(
            userTaskKey,
            new UserTaskAssignmentRequest
            {
                Assignee = "user@example.com",
            });
    }
    // </AssignUserTask>
    #endregion AssignUserTask

    #region CompleteUserTask

    // <CompleteUserTask>
    public static async Task CompleteUserTaskExample(UserTaskKey userTaskKey)
    {
        using var client = CamundaClient.Create();

        await client.CompleteUserTaskAsync(
            userTaskKey,
            new UserTaskCompletionRequest());
    }
    // </CompleteUserTask>
    #endregion CompleteUserTask

    #region UnassignUserTask

    // <UnassignUserTask>
    public static async Task UnassignUserTaskExample(UserTaskKey userTaskKey)
    {
        using var client = CamundaClient.Create();

        await client.UnassignUserTaskAsync(userTaskKey);
    }
    // </UnassignUserTask>
    #endregion UnassignUserTask

    #region GetUserTask

    // <GetUserTask>
    public static async Task GetUserTaskExample(UserTaskKey userTaskKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetUserTaskAsync(userTaskKey);
        Console.WriteLine($"User task: {result.UserTaskKey}");
    }
    // </GetUserTask>
    #endregion GetUserTask

    #region UpdateUserTask

    // <UpdateUserTask>
    public static async Task UpdateUserTaskExample(UserTaskKey userTaskKey)
    {
        using var client = CamundaClient.Create();

        await client.UpdateUserTaskAsync(
            userTaskKey,
            new UserTaskUpdateRequest());
    }
    // </UpdateUserTask>
    #endregion UpdateUserTask

    #region GetUserTaskForm

    // <GetUserTaskForm>
    public static async Task GetUserTaskFormExample(UserTaskKey userTaskKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.GetUserTaskFormAsync(userTaskKey);
        Console.WriteLine($"Form: {result.FormKey}");
    }
    // </GetUserTaskForm>
    #endregion GetUserTaskForm

    #region SearchUserTasks

    // <SearchUserTasks>
    public static async Task SearchUserTasksExample()
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchUserTasksAsync(new UserTaskSearchQuery());

        foreach (var task in result.Items)
        {
            Console.WriteLine($"User task: {task.UserTaskKey}");
        }
    }
    // </SearchUserTasks>
    #endregion SearchUserTasks

    #region SearchUserTaskVariables

    // <SearchUserTaskVariables>
    public static async Task SearchUserTaskVariablesExample(UserTaskKey userTaskKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchUserTaskVariablesAsync(
            userTaskKey,
            new SearchUserTaskVariablesRequest());

        foreach (var variable in result.Items)
        {
            Console.WriteLine($"Variable: {variable.Name}");
        }
    }
    // </SearchUserTaskVariables>
    #endregion SearchUserTaskVariables

    #region SearchUserTaskAuditLogs

    // <SearchUserTaskAuditLogs>
    public static async Task SearchUserTaskAuditLogsExample(UserTaskKey userTaskKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchUserTaskAuditLogsAsync(
            userTaskKey,
            new UserTaskAuditLogSearchQueryRequest());

        foreach (var log in result.Items)
        {
            Console.WriteLine($"Audit log: {log.AuditLogKey}");
        }
    }
    // </SearchUserTaskAuditLogs>
    #endregion SearchUserTaskAuditLogs

    #region SearchUserTaskEffectiveVariables

    // <SearchUserTaskEffectiveVariables>
    public static async Task SearchUserTaskEffectiveVariablesExample(UserTaskKey userTaskKey)
    {
        using var client = CamundaClient.Create();

        var result = await client.SearchUserTaskEffectiveVariablesAsync(
            userTaskKey,
            new SearchUserTaskEffectiveVariablesRequest());

        foreach (var variable in result.Items)
        {
            Console.WriteLine($"Variable: {variable.Name}");
        }
    }
    // </SearchUserTaskEffectiveVariables>
    #endregion SearchUserTaskEffectiveVariables
}
