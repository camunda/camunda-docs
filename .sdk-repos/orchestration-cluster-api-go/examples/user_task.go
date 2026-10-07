// User task operations: search, read, assign, complete, update, forms, audit
// logs, and variables.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
)

func searchUserTasksExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchUserTasks
	result, err := client.SearchUserTasks(ctx, *camunda.NewUserTaskSearchQuery())
	if err != nil {
		return err
	}
	for _, t := range result.GetItems() {
		fmt.Printf("%v\n", t)
	}
	// endregion SearchUserTasks
	return nil
}

func getUserTaskExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetUserTask
	task, err := client.GetUserTask(ctx, camunda.MustUserTaskKey("2251799813685380"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", task)
	// endregion GetUserTask
	return nil
}

func assignUserTaskExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region AssignUserTask
	req := camunda.NewUserTaskAssignmentRequest()
	req.SetAssignee("alice")

	return client.AssignUserTask(ctx, camunda.MustUserTaskKey("2251799813685380"), *req)
	// endregion AssignUserTask
}

func unassignUserTaskExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region UnassignUserTask
	return client.UnassignUserTask(ctx, camunda.MustUserTaskKey("2251799813685380"))
	// endregion UnassignUserTask
}

func completeUserTaskExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region CompleteUserTask
	req := camunda.NewUserTaskCompletionRequest()
	req.SetVariables(map[string]any{"approved": true})

	return client.CompleteUserTask(ctx, camunda.MustUserTaskKey("2251799813685380"), *req)
	// endregion CompleteUserTask
}

func updateUserTaskExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region UpdateUserTask
	// Update fields (priority, due/follow-up dates, ...) via the request's
	// changeset. An empty request is a no-op.
	req := camunda.NewUserTaskUpdateRequest()

	return client.UpdateUserTask(ctx, camunda.MustUserTaskKey("2251799813685380"), *req)
	// endregion UpdateUserTask
}

func getUserTaskFormExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetUserTaskForm
	form, err := client.GetUserTaskForm(ctx, camunda.MustUserTaskKey("2251799813685380"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", form)
	// endregion GetUserTaskForm
	return nil
}

func searchUserTaskVariablesExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchUserTaskVariables
	result, err := client.SearchUserTaskVariables(ctx,
		camunda.MustUserTaskKey("2251799813685380"),
		*camunda.NewUserTaskVariableSearchQueryRequest())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion SearchUserTaskVariables
	return nil
}

func searchUserTaskEffectiveVariablesExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchUserTaskEffectiveVariables
	result, err := client.SearchUserTaskEffectiveVariables(ctx,
		camunda.MustUserTaskKey("2251799813685380"),
		*camunda.NewUserTaskEffectiveVariableSearchQueryRequest())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion SearchUserTaskEffectiveVariables
	return nil
}

func searchUserTaskAuditLogsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchUserTaskAuditLogs
	result, err := client.SearchUserTaskAuditLogs(ctx,
		camunda.MustUserTaskKey("2251799813685380"),
		*camunda.NewUserTaskAuditLogSearchQueryRequest())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion SearchUserTaskAuditLogs
	return nil
}
