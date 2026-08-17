// Package examples holds compilable usage snippets that are injected into
// README.md by scripts/sync-readme-snippets.py.
//
// Region markers (// region <Name> ... // endregion <Name>) delimit the lines
// that appear in the README; the surrounding function bodies do not. Because
// these are real Go sources, `go build ./examples/...` (and CI) type-checks them,
// so the README can never drift from the actual SDK API.
//
// None of these functions are called — they exist purely to be compiled.
package examples

import (
	"context"
	"errors"
	"fmt"
	"os"
	"time"

	camunda "github.com/camunda/orchestration-cluster-api-go"
	openapi "github.com/camunda/orchestration-cluster-api-go/client"
)

func quickStart() error {
	// region QuickStart
	// Configuration is resolved from CAMUNDA_* environment variables (with ZEEBE_*
	// fallbacks) and validated fail-fast at construction.
	client, err := camunda.New()
	if err != nil {
		return err
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	topology, err := client.GetTopology(ctx)
	if err != nil {
		return err
	}
	fmt.Printf("Camunda 8 %s — %d broker(s), %d partition(s)\n",
		topology.GetGatewayVersion(), len(topology.GetBrokers()), topology.GetPartitionsCount())
	// endregion QuickStart
	return nil
}

func configuration() error {
	// region Configuration
	// Functional options override the environment. Here: OAuth 2.0
	// client-credentials against a SaaS cluster.
	client, err := camunda.New(
		camunda.WithRestAddress("https://my-cluster.region.camunda.io"),
		camunda.WithOAuth(
			"my-client-id",
			"my-client-secret",
			"https://login.cloud.camunda.io/oauth/token",
		),
		camunda.WithOAuthAudience("zeebe.camunda.io"),
	)
	// endregion Configuration
	_ = err
	_ = client
	return nil
}

func jobWorker(client *camunda.CamundaClient) {
	// region JobWorker
	// One JobHandler contract for both workers: returning variables completes the
	// job; returning a *camunda.BpmnError throws a BPMN error; returning any other
	// error fails the job (decrementing its retries).
	worker := client.NewJobWorker("greet",
		func(ctx context.Context, job *camunda.Job) (map[string]any, error) {
			var in struct {
				Name string `json:"name"`
			}
			if err := job.Variables(&in); err != nil {
				return nil, err
			}
			return map[string]any{"greeting": "Hello, " + in.Name + "!"}, nil
		},
		camunda.WithMaxConcurrentJobs(10),
		camunda.WithPollInterval(500*time.Millisecond),
	)

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// Run blocks until ctx is cancelled, draining in-flight jobs on shutdown.
	if err := worker.Run(ctx); err != nil {
		fmt.Println("worker stopped:", err)
	}
	// endregion JobWorker
}

func streamWorker(client *camunda.CamundaClient) {
	// region StreamWorker
	// The gRPC streaming worker activates jobs over a StreamActivatedJobs stream
	// and acknowledges them over gRPC. A low-frequency REST sidecar poll backs it
	// up (a safety net for jobs re-queued after a timeout or brief reconnect).
	worker := client.NewStreamJobWorker("greet",
		func(ctx context.Context, job *camunda.Job) (map[string]any, error) {
			return map[string]any{"greeting": "Hello!"}, nil
		},
		camunda.WithStreamPollInterval(30*time.Second), // -1 disables the sidecar poll
	)

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	if err := worker.Run(ctx); err != nil {
		fmt.Println("stream worker stopped:", err)
	}
	// endregion StreamWorker
}

func deployAndStart(ctx context.Context, client *camunda.CamundaClient) error {
	// region DeployAndStart
	// Deploy a BPMN process. Multipart resource upload goes through the Raw()
	// generated client (the escape hatch for anything the facade doesn't cover).
	f, err := os.Open("greet.bpmn")
	if err != nil {
		return err
	}
	defer func() { _ = f.Close() }()

	if _, _, err := client.Raw().ResourceAPI.CreateDeployment(ctx).
		Resources([]*os.File{f}).
		Execute(); err != nil {
		return err
	}

	// Start an instance by process id. The request body is a first-class facade
	// parameter — no Raw() needed.
	byID := openapi.NewProcessInstanceCreationInstructionById("demo-process")
	byID.SetVariables(map[string]any{"name": "Camunda"})
	instruction := openapi.ProcessInstanceCreationInstructionByIdAsProcessInstanceCreationInstruction(byID)

	instance, err := client.CreateProcessInstance(ctx, instruction)
	if err != nil {
		return err
	}
	fmt.Printf("started process instance %v\n", instance.GetProcessInstanceKey())
	// endregion DeployAndStart
	return nil
}

func eventualConsistency(ctx context.Context, client *camunda.CamundaClient) error {
	// region EventualConsistency
	// Reads are eventually consistent: a just-created entity may briefly 404.
	// Poll retries 404s until the entity is visible or the timeout elapses.
	key := openapi.MustProcessInstanceKey("2251799813685249")

	instance, err := camunda.Poll(ctx, func(ctx context.Context) (*openapi.ProcessInstanceResult, error) {
		return client.GetProcessInstance(ctx, key)
	}, camunda.WithPollTimeout(10*time.Second))
	if err != nil {
		return err
	}
	fmt.Printf("instance state: %v\n", instance.GetState())
	// endregion EventualConsistency
	return nil
}

func semanticKeys() error {
	// region SemanticKeys
	// Semantic key types validate their format at construction.
	key, err := openapi.NewJobKey("2251799813685424") // validates pattern & length
	if err != nil {
		return err
	}
	fmt.Println(key.String())

	// Side-load a key you already trust, without validation:
	loose := openapi.MustJobKey("2251799813685424")
	_ = loose
	// endregion SemanticKeys
	return nil
}

func errorHandling(ctx context.Context, client *camunda.CamundaClient) {
	// region ErrorHandling
	_, err := client.GetTopology(ctx)
	var apiErr *camunda.APIError
	if errors.As(err, &apiErr) {
		// The server returned a 4xx/5xx — inspect the status and response body.
		fmt.Printf("API error: HTTP %d — %s\n", apiErr.Status, apiErr.Body)
	} else if err != nil {
		// Transport-level failure (DNS, TLS, connection refused, ...).
		fmt.Println("request failed:", err)
	}
	// endregion ErrorHandling
}

func errorClassification(ctx context.Context, client *camunda.CamundaClient) error {
	// region ErrorClassification
	key := openapi.MustProcessInstanceKey("2251799813685249")

	_, err := client.GetProcessInstance(ctx, key)

	// IsNotFound is the idiomatic 404 check — the common case when reading an
	// entity that has not yet propagated to secondary storage.
	if camunda.IsNotFound(err) {
		fmt.Println("not visible yet")
		return nil
	}

	// StatusCode reports the HTTP status for any server-side error, and
	// ok == false for transport-level failures.
	if status, ok := camunda.StatusCode(err); ok {
		fmt.Printf("server rejected the request: HTTP %d\n", status)
	}
	// endregion ErrorClassification
	return err
}

func authentication() error {
	// region Authentication
	// OAuth 2.0 client credentials. Tokens are cached in memory and on disk, and
	// refreshed before expiry; concurrent refreshes are collapsed into one.
	oauthClient, err := camunda.New(
		camunda.WithOAuth(
			"my-client-id",
			"my-client-secret",
			"https://login.cloud.camunda.io/oauth/token",
		),
		camunda.WithOAuthAudience("zeebe.camunda.io"),
		camunda.WithOAuthScope("camunda:read"),
		camunda.WithOAuthCacheDir("/var/cache/camunda"),
	)

	// HTTP Basic — typical for a Self-Managed cluster behind basic auth.
	basicClient, err := camunda.New(
		camunda.WithBasicAuth("demo", "demo"),
	)

	// No authentication — a local development cluster with auth disabled.
	openClient, err := camunda.New(camunda.WithNoAuth())
	// endregion Authentication
	_, _, _, _ = oauthClient, basicClient, openClient, err
	return nil
}

func backpressure() error {
	// region Backpressure
	// BALANCED (the default) gates outbound requests through an AIMD concurrency
	// limiter that reacts to broker backpressure (HTTP 429/503). LEGACY observes
	// and reports, but never gates — use it to compare against older SDKs.
	client, err := camunda.New(
		camunda.WithBackpressureProfile(camunda.ProfileLegacy),
	)
	// endregion Backpressure
	_, _ = client, err
	return nil
}

func transientRetry() error {
	// region TransientRetry
	// Transient failures (429, 502, 503, 504 and network errors) are retried with
	// exponential backoff and full jitter. Non-transient 4xx are never retried.
	client, err := camunda.New(
		camunda.WithRetry(camunda.RetryConfig{
			MaxAttempts: 5,
			BaseDelay:   100 * time.Millisecond,
			MaxDelay:    5 * time.Second,
		}),
	)
	// endregion TransientRetry
	_, _ = client, err
	return nil
}

func logging() error {
	// region Logging
	// Levels: LogOff, LogError, LogWarn, LogInfo (default), LogDebug, LogTrace.
	// LogDebug reports auth-token refreshes, retries, and backpressure decisions;
	// LogTrace adds per-request detail. Credentials are never logged.
	client, err := camunda.New(camunda.WithLogLevel(camunda.LogDebug))
	// endregion Logging
	_, _ = client, err
	return nil
}

func rawEscapeHatch(ctx context.Context, client *camunda.CamundaClient) error {
	// region RawEscapeHatch
	// Raw() exposes the generated client: every operation, with the full builder
	// surface. Use it for anything the facade does not cover, and for access to
	// the raw *http.Response.
	result, resp, err := client.Raw().ProcessDefinitionAPI.
		SearchProcessDefinitions(ctx).
		Execute()
	if err != nil {
		return err
	}
	fmt.Printf("HTTP %d — %d process definition(s)\n", resp.StatusCode, len(result.GetItems()))
	// endregion RawEscapeHatch
	return nil
}
