// User task operations: search, read, assign, complete, update, forms, audit
// logs, and variables.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
	openapi "github.com/camunda/orchestration-cluster-api-go/client"
)

func searchUserTasksExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchUserTasks
	result, err := client.SearchUserTasks(ctx, *openapi.NewUserTaskSearchQuery())
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
	task, err := client.GetUserTask(ctx, openapi.MustUserTaskKey("2251799813685380"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", task)
	// endregion GetUserTask
	return nil
}

func assignUserTaskExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region AssignUserTask
	req := openapi.NewUserTaskAssignmentRequest()
	req.SetAssignee("alice")

	return client.AssignUserTask(ctx, openapi.MustUserTaskKey("2251799813685380"), *req)
	// endregion AssignUserTask
}

func unassignUserTaskExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region UnassignUserTask
	return client.UnassignUserTask(ctx, openapi.MustUserTaskKey("2251799813685380"))
	// endregion UnassignUserTask
}

func completeUserTaskExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region CompleteUserTask
	req := openapi.NewUserTaskCompletionRequest()
	req.SetVariables(map[string]any{"approved": true})

	return client.CompleteUserTask(ctx, openapi.MustUserTaskKey("2251799813685380"), *req)
	// endregion CompleteUserTask
}

func updateUserTaskExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region UpdateUserTask
	// Update fields (priority, due/follow-up dates, ...) via the request's
	// changeset. An empty request is a no-op.
	req := openapi.NewUserTaskUpdateRequest()

	return client.UpdateUserTask(ctx, openapi.MustUserTaskKey("2251799813685380"), *req)
	// endregion UpdateUserTask
}

func getUserTaskFormExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetUserTaskForm
	form, err := client.GetUserTaskForm(ctx, openapi.MustUserTaskKey("2251799813685380"))
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
		openapi.MustUserTaskKey("2251799813685380"),
		*openapi.NewUserTaskVariableSearchQueryRequest())
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
		openapi.MustUserTaskKey("2251799813685380"),
		*openapi.NewUserTaskEffectiveVariableSearchQueryRequest())
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
		openapi.MustUserTaskKey("2251799813685380"),
		*openapi.NewUserTaskAuditLogSearchQueryRequest())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion SearchUserTaskAuditLogs
	return nil
}
