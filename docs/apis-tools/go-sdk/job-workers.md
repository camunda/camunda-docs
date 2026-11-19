---
id: job-workers
title: "Job workers"
sidebar_label: "Job workers"
sidebar_position: 9
mdx:
  format: md
---

# Job workers

:::caution Technical Preview
The Go SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

Register a REST activate-jobs worker with `NewJobWorker`. The handler's return
value decides the job outcome:

```go
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

// Run blocks until ctx is canceled, draining in-flight jobs on shutdown.
if err := worker.Run(ctx); err != nil {
	fmt.Println("worker stopped:", err)
}
```

For high-throughput, low-latency work, use the gRPC streaming worker
(`NewStreamJobWorker`) — a capability unique to this SDK among the Camunda
Orchestration Cluster SDKs:

```go
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
```

Pass `camunda.WithStreamJobLease(true)` to activate jobs with a lease. Each job
then carries a lease token that the worker sends back when it completes, fails,
or throws — so if the job timed out and another worker picked it up, the stale
acknowledgement is rejected instead of racing the newer activation. It covers
both the gRPC stream and the REST sidecar poll. The REST worker takes the same
option as `camunda.WithJobLease(true)`. Leases are off by default (matching the
engine) and need an engine that supports them: rather than degrade to unfenced
commands, a worker that asked for a lease and is handed a job without a token
rejects the activation with `camunda.ErrLeaseNotHonored`.

## Job Corrections (User Task Listeners)

When a job worker handles a [user task listener](../../components/concepts/user-task-listeners.md),
it can correct task properties (assignee, due date, candidate groups, etc.) by
completing the job with a job result. Write the handler as a
`camunda.JobCompletionHandler`, which returns a `camunda.JobCompletion`, and adapt
it with `camunda.CompletionHandler`:

```go
// A CompletionHandler returns a JobCompletion, which can carry a job result
// alongside the variables. Adapt it for NewJobWorker or NewStreamJobWorker.
worker := client.NewJobWorker("io.camunda:userTaskListener",
	camunda.CompletionHandler(func(ctx context.Context, job *camunda.Job) (camunda.JobCompletion, error) {
		corrections := camunda.NewJobResultCorrections()
		corrections.SetAssignee("corrected-user")
		corrections.SetPriority(80)
		corrections.SetFollowUpDate(camunda.ClearedDateTime()) // sent as "": removes the follow-up date
		return camunda.JobCompletion{Result: camunda.CorrectUserTask(*corrections)}, nil
	}),
	camunda.WithMaxConcurrentJobs(5),
)
```

To deny a task completion (reject the work):

```go
return camunda.JobCompletion{
	Result: camunda.DenyUserTask("Insufficient documentation"),
}, nil
```

| Correctable attribute | Setter on `JobResultCorrections`       | Clear value                                                 |
| --------------------- | -------------------------------------- | ----------------------------------------------------------- |
| `assignee`            | `SetAssignee(string)`                  | Empty string `""`                                           |
| `dueDate`             | `SetDueDate(camunda.DateTime(t))`      | `SetDueDate(camunda.ClearedDateTime())` (sent as `""`)      |
| `followUpDate`        | `SetFollowUpDate(camunda.DateTime(t))` | `SetFollowUpDate(camunda.ClearedDateTime())` (sent as `""`) |
| `candidateUsers`      | `SetCandidateUsers([]string)`          | Empty slice `[]string{}`                                    |
| `candidateGroups`     | `SetCandidateGroups([]string)`         | Empty slice `[]string{}`                                    |
| `priority`            | `SetPriority(int32)` (0–100)           | —                                                           |

Leaving an attribute unset (or setting it to `nil` with its `Set…Nil` method)
preserves the persisted value. The two dates are `ClearableDateTime` values:
`camunda.DateTime(t)` sets a date and `camunda.ClearedDateTime()` clears it (sent
as `""`). The clear lives on the `JobResultCorrections` model, so it also applies
when you build a `JobCompletionRequest` for `client.CompleteJob` yourself.

## Ad-hoc sub-process results

The job of an [ad-hoc sub-process](../../components/modeler/bpmn/ad-hoc-subprocesses.md)
completes with a result that names the inner elements to activate next and
whether the sub-process is done:

```go
// The job of an ad-hoc sub-process decides which inner elements to activate
// next, and whether the sub-process is done.
worker := client.NewJobWorker("plan-next-steps",
	camunda.CompletionHandler(func(ctx context.Context, job *camunda.Job) (camunda.JobCompletion, error) {
		result := camunda.NewJobResultAdHocSubProcess()
		result.SetActivateElements([]camunda.JobResultActivateElement{
			camunda.ActivateAdHocElement("review_document", map[string]any{"reviewer": "alice"}),
			camunda.ActivateAdHocElement("notify_customer", nil),
		})
		result.SetIsCompletionConditionFulfilled(false)
		result.SetIsCancelRemainingInstances(false)
		return camunda.JobCompletion{
			Variables: map[string]any{"planned": true},
			Result:    camunda.AdHocSubProcessJobResult(*result),
		}, nil
	}),
)
```

The worker sets the result's `type` discriminator (`userTask` or
`adHocSubProcess`) from the variant you populate, so a result built directly from
the generated `JobResult` union is sent correctly too. A result with no variant —
or both — fails the job rather than completing it without the result. Job results
work with both workers: the gRPC streaming worker sends them on `CompleteJob`, and
the REST worker on `POST /jobs/{jobKey}/completion`.

The FALCON command stream (used by `NewJobWorker` when a nanobpmn gateway
advertises it) cannot carry a job result: its completion frame has no result
field. On FALCON, a handler that returns a result fails the job with a message
saying so, rather than completing it without the result — which would, for
example, approve a task the listener denied. To use job results against such a
gateway, set `CAMUNDA_FORCE_REST=true` (or `camunda.WithForceREST(true)`) so the
worker polls over REST.

## Panicking handlers

A handler runs on its own goroutine, and in Go an unrecovered panic on _any_
goroutine terminates the whole process. The workers therefore recover a panicking
handler and **fail the job** with it, on every transport (REST polling, the
FALCON command stream, the gRPC stream, and the gRPC worker's REST sidecar poll):

- The job is failed exactly as it would be for a returned error, so its retries
  decrement and the engine schedules a retry instead of leaving the job to sit
  until its activation timeout expires.
- The recovered panic is observable through the SDK log and through the failed
  job (and its incident) on the cluster. It is **not** returned to your code:
  the worker consumes the resulting `camunda.ErrHandlerPanic` internally and
  `Run` does not return per-job handler errors, so `errors.Is` cannot be used
  to detect it from application code.
- The panic value and a stack trace are written to the SDK log at **error**
  level — the same detail the runtime would have printed to stderr as the process
  died.
- The panic value is **not** sent to the cluster. The failure message the engine
  stores on the incident says only that the handler panicked, because that
  message is durable and widely visible, and a panic value can carry job-variable
  content.

This is a deliberate choice rather than a silent one: a panic is a bug in the
handler, but losing the host application (and every other job it was running) is
a disproportionate consequence. If your handler must not be recovered — if a
panic indicates corrupted process state that should stop the program — detect
that in the handler and terminate the process explicitly rather than relying on
the panic to propagate. There is deliberately no option to turn recovery off;
adding one would be a design decision for the SDK team.
