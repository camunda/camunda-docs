// Ad-hoc sub-process operations: activate activities inside a running ad-hoc
// sub-process instance.
package examples

import (
	"context"

	camunda "github.com/camunda/orchestration-cluster-api-go"
)

func activateAdHocSubProcessActivitiesExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region ActivateAdHocSubProcessActivities
	instruction := camunda.NewAdHocSubProcessActivateActivitiesInstruction(
		[]camunda.AdHocSubProcessActivateActivityReference{
			*camunda.NewAdHocSubProcessActivateActivityReference("review-task"),
		})

	return client.ActivateAdHocSubProcessActivities(ctx,
		camunda.MustElementInstanceKey("2251799813685360"), *instruction)
	// endregion ActivateAdHocSubProcessActivities
}
