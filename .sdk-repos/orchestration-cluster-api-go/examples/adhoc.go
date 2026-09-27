// Ad-hoc sub-process operations: activate activities inside a running ad-hoc
// sub-process instance.
package examples

import (
	"context"

	camunda "github.com/camunda/orchestration-cluster-api-go"
	openapi "github.com/camunda/orchestration-cluster-api-go/client"
)

func activateAdHocSubProcessActivitiesExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region ActivateAdHocSubProcessActivities
	instruction := openapi.NewAdHocSubProcessActivateActivitiesInstruction(
		[]openapi.AdHocSubProcessActivateActivityReference{
			*openapi.NewAdHocSubProcessActivateActivityReference("review-task"),
		})

	return client.ActivateAdHocSubProcessActivities(ctx,
		openapi.MustElementInstanceKey("2251799813685360"), *instruction)
	// endregion ActivateAdHocSubProcessActivities
}
