---
title: "Job workers"
sidebar_label: "Job workers"
mdx:
  format: md
---

# Job workers

:::caution Technical Preview
The Go SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

Job workers obtain jobs of a given type — by polling the REST activation endpoint or over the gRPC job stream — run a handler, and report the outcome back to the cluster.

## Job

Job is an activated job passed to a JobHandler. It is transport-agnostic: the
same type is produced by the REST job worker and the gRPC streaming worker.

### Methods

#### Clock

```go
func (j *Job) Clock() Clock
```

Clock returns the worker's clock. A handler that needs to wait should use this
rather than time.Sleep, so an injected clock controls it.

For short in-handler coordination only -- spacing a retry, waiting for a resource
to settle. A long or business wait belongs in the process as a BPMN timer event: a
handler holding a job for minutes occupies a worker slot, risks the job timeout
expiring underneath it, and hides the wait from the process model where it cannot
be seen or changed.

#### CustomHeaders

```go
func (j *Job) CustomHeaders() map[string]any
```

CustomHeaders returns the job's custom headers.

#### ElementID

```go
func (j *Job) ElementID() string
```

ElementID returns the BPMN element id that created the job.

#### Key

```go
func (j *Job) Key() string
```

Key returns the job key.

#### LeaseToken

```go
func (j *Job) LeaseToken() string
```

LeaseToken returns the activation lease token, or "" if the job was not leased.

#### ProcessInstanceKey

```go
func (j *Job) ProcessInstanceKey() string
```

ProcessInstanceKey returns the key of the owning process instance.

#### RawVariables

```go
func (j *Job) RawVariables() map[string]any
```

RawVariables returns the job variables as a decoded map.

#### Retries

```go
func (j *Job) Retries() int32
```

Retries returns the job's remaining retries.

#### Type

```go
func (j *Job) Type() string
```

Type returns the job type.

#### Variables

```go
func (j *Job) Variables(v any) error
```

Variables unmarshals the job variables into v (a pointer to a struct or map).

## JobCompletion

JobCompletion is the outcome of a successfully handled job: the variables to
complete it with and, optionally, a job result.

A job result is how a user task listener corrects or denies the task it
listens to (see CorrectUserTask and DenyUserTask), and how the job of an
ad-hoc sub-process tells the engine which elements to activate next (see
AdHocSubProcessJobResult). Leave Result nil for an ordinary job.

### Fields

| Field       | Type             | Description |
| ----------- | ---------------- | ----------- |
| `Variables` | `map[string]any` |             |
| `Result`    | `*JobResult`     |             |

## JobCompletionHandler

```go
type JobCompletionHandler func(ctx context.Context, job *Job) (JobCompletion, error)
```

JobCompletionHandler processes an activated job like a JobHandler, but
completes it with a JobCompletion, which can carry a job result. Errors are
handled exactly as for a JobHandler: a *BpmnError throws a BPMN error and any
other error fails the job. Adapt it with CompletionHandler.

## JobHandler

```go
type JobHandler func(ctx context.Context, job *Job) (map[string]any, error)
```

JobHandler processes an activated job:

- returning (variables, nil) completes the job with those variables;
- returning a *BpmnError throws a BPMN error;
- returning any other error fails the job (decrementing its retries).

To also complete the job with a job result (user task listener corrections or
denial, or an ad-hoc sub-process result), write a JobCompletionHandler and adapt
it with CompletionHandler.

### Functions

#### CompletionHandler

```go
func CompletionHandler(h JobCompletionHandler) JobHandler
```

CompletionHandler adapts a JobCompletionHandler to a JobHandler, so it can be
passed to NewJobWorker or NewStreamJobWorker.

The worker sets the result's "type" discriminator from the variant that is
populated, so it is always correct on the wire. A result with no variant set,
or with both, is a handler bug: the job is failed with a descriptive error
rather than completed without the result the handler asked for.

The FALCON command stream cannot carry a job result, so a JobWorker receiving
jobs over it fails a result-bearing completion; use WithForceREST to send job
results to a gateway that advertises FALCON.

## JobWorker

JobWorker polls for jobs of a given type and dispatches them to a handler with
bounded concurrency. Job completion, failure, and BPMN-error operations are
drain operations and bypass the client-side backpressure gate.

### Methods

#### Run

```go
func (w *JobWorker) Run(ctx context.Context) error
```

Run polls and dispatches jobs until ctx is canceled, then waits for in-flight
handlers to finish and returns ctx.Err(). Run blocks; call it in a goroutine to
run alongside other work.

A worker configured with a startup jitter (CAMUNDA_WORKER_STARTUP_JITTER_MAX_SECONDS)
first waits out its delay on the client's clock.

When the gateway advertises the FALCON command stream (a nanobpmn gateway) and
FALCON is enabled, jobs are pushed over a WebSocket subscription instead of
REST long-polling. If the subscription cannot be established (e.g. a proxy
blocks WebSockets) the worker transparently falls back to REST polling.

## StreamJobWorker

StreamJobWorker activates jobs over the Zeebe gRPC StreamActivatedJobs stream
and completes (with any job result, see CompletionHandler), fails, or throws
BPMN errors over gRPC. Unlike the REST JobWorker it does not poll: the engine
pushes jobs as they become available.

### Methods

#### Run

```go
func (w *StreamJobWorker) Run(ctx context.Context) error
```

Run opens the job stream and dispatches jobs until ctx is canceled. The gRPC
connection is held for the worker's lifetime and the stream is reopened (after
reconnectBackoff) whenever it ends, so in-flight acknowledgements are never cut
off by a reconnect. Run blocks; call it in a goroutine to run alongside other
work.

A worker configured with a startup jitter (CAMUNDA_WORKER_STARTUP_JITTER_MAX_SECONDS)
first waits out its delay on the client's clock.

## StreamWorkerOption

```go
type StreamWorkerOption func(*StreamJobWorker)
```

StreamWorkerOption customizes a StreamJobWorker.

### Functions

#### WithStreamFetchVariables

```go
func WithStreamFetchVariables(vars ...string) StreamWorkerOption
```

WithStreamFetchVariables restricts the variables fetched with each job. Empty fetches all.

#### WithStreamJobLease

```go
func WithStreamJobLease(enabled bool) StreamWorkerOption
```

WithStreamJobLease requests leased jobs. Each job then carries a distinct
lease token, which this worker sends back on complete, fail, and throw-error.
The engine rejects a command bearing a stale token, fencing the job against a
superseded activation — for example after the job timed out and another worker
picked it up.

Off by default, matching the gateway's own default. Enabling it requires an
engine that supports job leases: a gateway that ignores the field would leave
every acknowledgement unfenced, so a job arriving without a token fails the
activation with ErrLeaseNotHonored rather than being handled unfenced. It
covers both channels: the gRPC stream and the REST sidecar poll (see
WithStreamPollInterval).

#### WithStreamJobTimeout

```go
func WithStreamJobTimeout(d time.Duration) StreamWorkerOption
```

WithStreamJobTimeout sets how long a streamed job is exclusively locked to this worker.

#### WithStreamMaxConcurrentJobs

```go
func WithStreamMaxConcurrentJobs(n int) StreamWorkerOption
```

WithStreamMaxConcurrentJobs caps the number of jobs handled concurrently.

#### WithStreamPollInterval

```go
func WithStreamPollInterval(d time.Duration) StreamWorkerOption
```

WithStreamPollInterval sets the interval between REST sidecar-poll cycles. The
sidecar poll is a low-frequency safety net that picks up jobs the stream may
have missed (e.g. jobs re-queued after a timeout or during a brief reconnect).
A value <= 0 disables the sidecar poll entirely (pure gRPC streaming).

#### WithStreamPollMaxJobs

```go
func WithStreamPollMaxJobs(n int) StreamWorkerOption
```

WithStreamPollMaxJobs caps the number of jobs activated per REST sidecar-poll cycle.

#### WithStreamReconnectBackoff

```go
func WithStreamReconnectBackoff(d time.Duration) StreamWorkerOption
```

WithStreamReconnectBackoff sets the pause before reopening the stream after it ends.

#### WithStreamTenantIDs

```go
func WithStreamTenantIDs(ids ...string) StreamWorkerOption
```

WithStreamTenantIDs restricts job activation to the given tenant ids,
overriding the client's default tenant.

#### WithStreamWorkerName

```go
func WithStreamWorkerName(name string) StreamWorkerOption
```

WithStreamWorkerName sets the worker name reported to the engine.

## WorkerOption

```go
type WorkerOption func(*JobWorker)
```

WorkerOption customizes a JobWorker.

### Functions

#### WithFetchVariables

```go
func WithFetchVariables(vars ...string) WorkerOption
```

WithFetchVariables restricts the variables fetched with each job. Empty fetches all.

#### WithJobLease

```go
func WithJobLease(enabled bool) WorkerOption
```

WithJobLease activates jobs with a lease. Each job then carries a lease token,
which this worker sends back on complete, fail, and throw-error. The engine
rejects a command bearing a stale token, fencing the job against a superseded
activation — for example after the job timed out and another worker picked it
up.

Off by default, matching the engine's own default. Enabling it requires an
engine that supports job leases: a server that ignores the flag would leave
every acknowledgement unfenced, so a job arriving without a token fails the
activation with ErrLeaseNotHonored rather than being handled unfenced. It has
no effect when jobs arrive over the FALCON command stream, which activates them
outside the REST activation API.

#### WithJobTimeout

```go
func WithJobTimeout(d time.Duration) WorkerOption
```

WithJobTimeout sets how long an activated job is exclusively locked to this worker.

#### WithMaxConcurrentJobs

```go
func WithMaxConcurrentJobs(n int) WorkerOption
```

WithMaxConcurrentJobs caps the number of jobs handled concurrently.

#### WithPollInterval

```go
func WithPollInterval(d time.Duration) WorkerOption
```

WithPollInterval sets the pause between polls when idle, at capacity, or after
an activation error.

#### WithRequestTimeout

```go
func WithRequestTimeout(d time.Duration) WorkerOption
```

WithRequestTimeout sets the long-poll request timeout for job activation.

#### WithWorkerName

```go
func WithWorkerName(name string) WorkerOption
```

WithWorkerName sets the worker name reported to the engine.

#### WithWorkerTenantIDs

```go
func WithWorkerTenantIDs(ids ...string) WorkerOption
```

WithWorkerTenantIDs restricts job activation to the given tenant ids,
overriding the client's default tenant.

## Package functions

### ActivateAdHocElement

```go
func ActivateAdHocElement(elementID ElementId, variables map[string]any) JobResultActivateElement
```

**Types:** [`ElementId`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/v11/client#ElementId), [`JobResultActivateElement`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/v11/client#JobResultActivateElement)

ActivateAdHocElement returns an instruction to activate the element elementID
inside an ad-hoc sub-process, creating variables (which may be nil) in the
scope of the activated element.

### AdHocSubProcessJobResult

```go
func AdHocSubProcessJobResult(r JobResultAdHocSubProcess) *JobResult
```

**Types:** [`JobResultAdHocSubProcess`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/v11/client#JobResultAdHocSubProcess), [`JobResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/v11/client#JobResult)

AdHocSubProcessJobResult wraps an ad-hoc sub-process result as a JobResult with
the "adHocSubProcess" discriminator set.

### CorrectUserTask

```go
func CorrectUserTask(c JobResultCorrections) *JobResult
```

**Types:** [`JobResultCorrections`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/v11/client#JobResultCorrections), [`JobResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/v11/client#JobResult)

CorrectUserTask returns a user task listener result that corrects the task's
attributes. Only the attributes set on c are corrected; the rest keep their
persisted value. Clear the assignee with an empty string, the due or follow-up
date with ClearDueDate or ClearFollowUpDate, and the candidate users or groups
with an empty, non-nil slice.

### DenyUserTask

```go
func DenyUserTask(reason string) *JobResult
```

**Types:** [`JobResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/v11/client#JobResult)

DenyUserTask returns a user task listener result that denies the work, for
example rejecting a task completion so the task stays active. reason is
optional; an empty reason is omitted.

### UserTaskJobResult

```go
func UserTaskJobResult(r JobResultUserTask) *JobResult
```

**Types:** [`JobResultUserTask`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/v11/client#JobResultUserTask), [`JobResult`](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/v11/client#JobResult)

UserTaskJobResult wraps a user task listener result as a JobResult with the
"userTask" discriminator set.
