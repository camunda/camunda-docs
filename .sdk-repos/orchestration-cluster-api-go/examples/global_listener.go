// Global task listener operations: register cluster-wide user-task listeners.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
)

func createGlobalTaskListenerExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region CreateGlobalTaskListener
	result, err := client.CreateGlobalTaskListener(ctx,
		*camunda.NewCreateGlobalTaskListenerRequest("audit-listener"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion CreateGlobalTaskListener
	return nil
}

func getGlobalTaskListenerExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetGlobalTaskListener
	result, err := client.GetGlobalTaskListener(ctx, "audit-listener")
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion GetGlobalTaskListener
	return nil
}

func updateGlobalTaskListenerExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region UpdateGlobalTaskListener
	result, err := client.UpdateGlobalTaskListener(ctx, "audit-listener",
		*camunda.NewUpdateGlobalTaskListenerRequest(
			"audit-worker",
			[]camunda.GlobalTaskListenerEventTypeEnum{camunda.GLOBALTASKLISTENEREVENTTYPEENUM_ALL},
		))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion UpdateGlobalTaskListener
	return nil
}

func deleteGlobalTaskListenerExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region DeleteGlobalTaskListener
	return client.DeleteGlobalTaskListener(ctx, "audit-listener")
	// endregion DeleteGlobalTaskListener
}

func searchGlobalTaskListenersExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchGlobalTaskListeners
	result, err := client.SearchGlobalTaskListeners(ctx, *camunda.NewGlobalTaskListenerSearchQueryRequest())
	if err != nil {
		return err
	}
	for _, l := range result.GetItems() {
		fmt.Printf("%v\n", l)
	}
	// endregion SearchGlobalTaskListeners
	return nil
}
