// Clock operations: control the cluster clock (test/CI environments).
package examples

import (
	"context"
	"time"

	camunda "github.com/camunda/orchestration-cluster-api-go"
	openapi "github.com/camunda/orchestration-cluster-api-go/client"
)

func pinClockExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region PinClock
	// Pin the cluster clock to a fixed instant (epoch milliseconds).
	pinned := time.Date(2025, time.January, 1, 0, 0, 0, 0, time.UTC)
	return client.PinClock(ctx, *openapi.NewClockPinRequest(pinned.UnixMilli()))
	// endregion PinClock
}

func resetClockExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region ResetClock
	// Release a previously pinned clock back to system time.
	return client.ResetClock(ctx)
	// endregion ResetClock
}
