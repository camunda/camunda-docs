// Authorization operations: grant, search, read, update, and revoke authorizations.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
	openapi "github.com/camunda/orchestration-cluster-api-go/client"
)

func createAuthorizationExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region CreateAuthorization
	// AuthorizationRequest is a union; grant an id-based authorization here.
	grant := openapi.NewAuthorizationIdBasedRequest(
		"user@example.com",
		openapi.OWNERTYPEENUM_USER,
		"order-process",
		openapi.RESOURCETYPEENUM_PROCESS_DEFINITION,
		[]openapi.PermissionTypeEnum{
			openapi.PERMISSIONTYPEENUM_READ_PROCESS_DEFINITION,
			openapi.PERMISSIONTYPEENUM_CREATE_PROCESS_INSTANCE,
		},
	)

	result, err := client.CreateAuthorization(ctx,
		openapi.AuthorizationIdBasedRequestAsAuthorizationRequest(grant))
	if err != nil {
		return err
	}
	fmt.Printf("created authorization %v\n", result.GetAuthorizationKey())
	// endregion CreateAuthorization
	return nil
}

func searchAuthorizationsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchAuthorizations
	result, err := client.SearchAuthorizations(ctx, *openapi.NewAuthorizationSearchQuery())
	if err != nil {
		return err
	}
	for _, a := range result.GetItems() {
		fmt.Printf("%v\n", a)
	}
	// endregion SearchAuthorizations
	return nil
}

func searchOwnAuthorizationsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchOwnAuthorizations
	// Scoped to the authenticated principal: direct grants plus those inherited
	// from a group, role, or mapping rule.
	result, err := client.SearchOwnAuthorizations(ctx, *openapi.NewAuthorizationSearchQuery())
	if err != nil {
		return err
	}
	for _, a := range result.GetItems() {
		fmt.Printf("%v\n", a)
	}
	// endregion SearchOwnAuthorizations
	return nil
}

func getAuthorizationExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetAuthorization
	auth, err := client.GetAuthorization(ctx, openapi.MustAuthorizationKey("2251799813685280"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", auth)
	// endregion GetAuthorization
	return nil
}

func updateAuthorizationExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region UpdateAuthorization
	updated := openapi.NewAuthorizationIdBasedRequest(
		"user@example.com",
		openapi.OWNERTYPEENUM_USER,
		"order-process",
		openapi.RESOURCETYPEENUM_PROCESS_DEFINITION,
		[]openapi.PermissionTypeEnum{openapi.PERMISSIONTYPEENUM_READ_PROCESS_DEFINITION},
	)

	return client.UpdateAuthorization(ctx,
		openapi.MustAuthorizationKey("2251799813685280"),
		openapi.AuthorizationIdBasedRequestAsAuthorizationRequest(updated))
	// endregion UpdateAuthorization
}

func deleteAuthorizationExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region DeleteAuthorization
	return client.DeleteAuthorization(ctx, openapi.MustAuthorizationKey("2251799813685280"))
	// endregion DeleteAuthorization
}
