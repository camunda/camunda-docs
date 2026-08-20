// Form and audit-log reads.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
	openapi "github.com/camunda/orchestration-cluster-api-go/client"
)

func getFormByKeyExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetFormByKey
	form, err := client.GetFormByKey(ctx, openapi.MustFormKey("2251799813685260"))
	if err != nil {
		return err
	}
	fmt.Printf("form %v version %d\n", form.GetFormId(), form.GetVersion())
	// endregion GetFormByKey
	return nil
}

func searchAuditLogsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchAuditLogs
	result, err := client.SearchAuditLogs(ctx, *openapi.NewAuditLogSearchQueryRequest())
	if err != nil {
		return err
	}
	for _, entry := range result.GetItems() {
		fmt.Printf("%v\n", entry)
	}
	// endregion SearchAuditLogs
	return nil
}

func getAuditLogExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetAuditLog
	entry, err := client.GetAuditLog(ctx, openapi.MustAuditLogKey("2251799813685270"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", entry)
	// endregion GetAuditLog
	return nil
}
