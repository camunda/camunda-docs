// Probe operations (alpha): ask a worker a question and wait for its answer.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go/v11"
)

func createProbeExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region CreateProbe
	// Ask the worker registered for this probe ID a question and wait for its answer.
	// `input` is a FEEL expression; secrets are injected by the engine, never by the client.
	req := camunda.NewProbeCreationRequest(
		camunda.MustProbeId("validate-configuration/io.camunda:aws-credential:1"),
		`={region: "eu-west-1", accessKey: camunda.secrets.awsKey}`,
	)
	req.SetRequestTimeout(10_000)

	result, err := client.CreateProbe(ctx, *req)
	if camunda.IsNotFound(err) {
		// 404: no worker collected the probe, so nothing can answer it.
		fmt.Println("No worker is polling this probe ID")
		return nil
	}
	if err != nil {
		return err
	}

	switch {
	case result.ProbeOkResult != nil:
		fmt.Printf("Worker %s answered: %v\n", result.ProbeOkResult.GetWorker(), result.ProbeOkResult.GetData())
	case result.ProbeUnsupportedResult != nil:
		fmt.Printf("Worker %s does not support this probe\n", result.ProbeUnsupportedResult.GetWorker())
	case result.ProbeErrorResult != nil:
		fmt.Printf("Worker %s failed: %s\n", result.ProbeErrorResult.GetWorker(), result.ProbeErrorResult.GetMessage())
	}
	// endregion CreateProbe
	return nil
}

func activateProbesExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region ActivateProbes
	req := camunda.NewProbeActivationRequest([]camunda.ProbeId{
		camunda.MustProbeId("validate-configuration/io.camunda:aws-credential:1"),
		camunda.MustProbeId("validate-configuration/io.camunda:slack:1"),
	}, 10)
	req.SetWorker("connectors-runtime")
	// A negative timeout turns long polling off: the request returns at once,
	// with an empty list when no probe is waiting.
	req.SetRequestTimeout(-1)

	result, err := client.ActivateProbes(ctx, *req)
	if err != nil {
		return err
	}

	// The activated input holds resolved secret values, so log identifiers only.
	for _, probe := range result.GetProbes() {
		fmt.Printf("Probe %v (%v) must be answered by %d\n", probe.GetProbeKey(), probe.GetProbeId(), probe.GetDeadline())

		// Answer before the deadline.
		answer := camunda.ProbeOkAnswerRequestAsProbeAnswerRequest(
			camunda.NewProbeOkAnswerRequest("OK", map[string]interface{}{"valid": true}),
		)
		if err := client.AnswerProbe(ctx, probe.GetProbeKey(), answer); err != nil {
			return err
		}
	}
	// endregion ActivateProbes
	return nil
}

func answerProbeExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region AnswerProbe
	// Answer with `UNSUPPORTED`, or with `ERROR` and a message, when the worker
	// cannot produce a result.
	answer := camunda.ProbeOkAnswerRequestAsProbeAnswerRequest(
		camunda.NewProbeOkAnswerRequest("OK", map[string]interface{}{
			"valid":  true,
			"region": "eu-west-1",
		}),
	)
	if err := client.AnswerProbe(ctx, camunda.MustProbeKey("2251799813685249"), answer); err != nil {
		return err
	}
	// endregion AnswerProbe
	return nil
}
