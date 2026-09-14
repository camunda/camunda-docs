// Incident operations: search, read, resolve, and process-instance statistics.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
	openapi "github.com/camunda/orchestration-cluster-api-go/client"
)

func searchIncidentsExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region SearchIncidents
	result, err := client.SearchIncidents(ctx, *openapi.NewIncidentSearchQuery())
	if err != nil {
		return err
	}
	for _, inc := range result.GetItems() {
		fmt.Printf("incident %v: %s\n", inc.GetIncidentKey(), inc.GetErrorType())
	}
	// endregion SearchIncidents
	return nil
}

func getIncidentExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetIncident
	incident, err := client.GetIncident(ctx, openapi.MustIncidentKey("2251799813685300"))
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", incident)
	// endregion GetIncident
	return nil
}

func resolveIncidentExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region ResolveIncident
	// After fixing the root cause (e.g. correcting a variable), resolve the
	// incident so the engine retries the failed element.
	return client.ResolveIncident(ctx,
		openapi.MustIncidentKey("2251799813685300"),
		*openapi.NewIncidentResolutionRequest())
	// endregion ResolveIncident
}

func getProcessInstanceStatisticsByDefinitionExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetProcessInstanceStatisticsByDefinition
	query := openapi.NewIncidentProcessInstanceStatisticsByDefinitionQuery(
		*openapi.NewIncidentProcessInstanceStatisticsByDefinitionFilter(0))

	result, err := client.GetProcessInstanceStatisticsByDefinition(ctx, *query)
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion GetProcessInstanceStatisticsByDefinition
	return nil
}

func getProcessInstanceStatisticsByErrorExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetProcessInstanceStatisticsByError
	result, err := client.GetProcessInstanceStatisticsByError(ctx,
		*openapi.NewIncidentProcessInstanceStatisticsByErrorQuery())
	if err != nil {
		return err
	}
	fmt.Printf("%v\n", result)
	// endregion GetProcessInstanceStatisticsByError
	return nil
}
