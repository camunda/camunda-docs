// User operations: CRUD over users.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
	openapi "github.com/camunda/orchestration-cluster-api-go/client"
)

func createUserExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region CreateUser
	req := openapi.NewUserRequest("secure-password-123", "alice")
	req.SetName("Alice Example")
	req.SetEmail("alice@example.com")

	result, err := client.CreateUser(ctx, *req)
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion CreateUser
	return nil
}

func searchUsersExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchUsers
	result, err := client.SearchUsers(ctx, *openapi.NewUserSearchQueryRequest())
	if err != nil {
		return err
	}
	for _, u := range result.GetItems() {
		fmt.Printf("%v\n", u)
	}
	// endregion SearchUsers
	return nil
}

func getUserExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetUser
	user, err := client.GetUser(ctx, "alice")
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", user)
	// endregion GetUser
	return nil
}

func updateUserExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region UpdateUser
	req := openapi.NewUserUpdateRequest()
	req.SetName("Alice Updated")

	result, err := client.UpdateUser(ctx, "alice", *req)
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion UpdateUser
	return nil
}

func deleteUserExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region DeleteUser
	return client.DeleteUser(ctx, "alice")
	// endregion DeleteUser
}
