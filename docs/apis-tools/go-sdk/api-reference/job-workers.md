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

### Variables are untrusted input

A job's variables reach the handler through the cluster, but their content is
set by whoever started the process instance. Treat them as you would the body
of an HTTP request from an untrusted caller.

What the SDK guarantees:

- Variables are decoded into JSON-shaped values only — a map[string]any,

```go
via the generated model for REST jobs and encoding/json for gRPC jobs.
Nothing here can instantiate a type chosen by the payload.
```

- `Job.Variables` fills only the type the handler author supplied; the

```go
payload selects values, never a type.
```

- Nesting is bounded by encoding/json's limit of 10000, so a deeply nested

```go
payload cannot exhaust the stack. On a gRPC-streamed job the decode error
is swallowed and the handler sees no variables at all, so check for the
keys you need rather than expecting a decode failure to surface.
```

- Variable values are kept out of the SDK's own log records: the worker logs

```go
job keys and types, never the variable map or a raw frame. A decoding
error is logged, though, and a Go JSON error can quote the offending
literal, so a malformed value can reach the log by that route.
```

- Each job owns its maps, so concurrent handlers never share or mutate the

```go
same values.
```

What the SDK does not do:

- It enforces no variable-specific size limit: whatever arrives is decoded.

```go
Two nearby limits are not that limit — the FALCON command stream caps a
single frame at 16 MiB (a transport limit that does not apply to REST or
gRPC), and WithMaxConcurrentJobs / WithStreamMaxConcurrentJobs cap how
many handlers run at once, bounding neither the bytes in one payload nor
the jobs buffered before dispatch. Whether the SDK should impose a limit
of its own is an open question; none is applied today.
```

- It does not validate or sanitise values beyond what JSON decoding

```go
requires, and it does not interpret them. A variable holding a path, URL,
query fragment or shell string is just a string here — if a handler
passes one to a filesystem, database, template or subprocess, enforcing
that trust boundary is the handler's job.
```

`Job.RawVariables` is subject to all of the above: its content is untrusted
input, and the SDK neither validates nor size-limits it. It returns the job's
own decoded map, not a copy, so reading from it is safe, but copy it before
handing it to code that may retain or mutate it.

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

CustomHeaders returns the job's custom headers. The map is never nil, so a
handler may read from or write to it on any transport (see RawVariables).

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

The map is never nil: a job with no variables (absent, null or empty) yields an
empty, writable map, identically on the REST and gRPC transports. Each job owns
its map, so a handler may add to it freely without affecting other jobs.

Malformed payloads are handled differently per transport. The gRPC stream
carries variables as a JSON string, and one that cannot be decoded as an object
also yields an empty map. On REST the response is decoded before any Job is
built, so a malformed variables value fails the activation with an error and no
job reaches the handler.

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

v selects the target type, never the payload: the decoded variables are
re-marshalled and unmarshalled into the type the handler author named, so a
payload cannot cause an arbitrary type to be instantiated. The values are
still untrusted input and are not validated or size-limited by the SDK; see
`Job` for the full trust model.

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

## StreamPollBackoff

StreamPollBackoff configures how the REST sidecar poll backs off while it
keeps coming back empty (Camunda Java client parity). After a poll that
activates no jobs, the next delay is the current delay × Multiplier, capped at
Max, then jittered by ±Jitter (a fraction of the delay) and clamped to Max
again. Backoff applies only while the gRPC stream is open; while it is
disconnected the poll runs at the poll interval. A poll that activates
at least one job resets the delay to the poll interval (WithStreamPollInterval).
A failed poll keeps the current delay.

A Multiplier <= 1 disables the backoff: the poll then runs at the fixed poll
interval regardless of the result.

### Fields

| Field        | Type            | Description |
| ------------ | --------------- | ----------- |
| `Multiplier` | `float64`       |             |
| `Jitter`     | `float64`       |             |
| `Max`        | `time.Duration` |             |

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

#### WithStreamInactivityTimeout

```go
func WithStreamInactivityTimeout(d time.Duration) StreamWorkerOption
```

WithStreamInactivityTimeout sets how long a stream may go without delivering a
job before it is canceled and reopened (default
DefaultStreamInactivityTimeout, 10m). The timer resets on every received job,
and is jittered down by up to 10%. It catches streams whose transport stays
healthy but which no longer deliver jobs. A value <= 0 disables it. When both
are enabled it must be less than the max lifetime, or Run returns an ErrConfig
error.

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

#### WithStreamMaxLifetime

```go
func WithStreamMaxLifetime(d time.Duration) StreamWorkerOption
```

WithStreamMaxLifetime sets the maximum lifetime of one job stream (default
DefaultStreamMaxLifetime, 8h). When it is reached the stream is closed and a
new one opened at once, so streams rebalance across gateways after a scale-out
or restart. Jobs already received keep running and are acknowledged normally.
Each stream's deadline is jittered down by up to 10% to spread recycling
across a fleet. A value <= 0 disables it.

Rebalancing only helps when a new stream can reach a different gateway: true
behind a request-level (L7) gRPC load balancer, but not behind a plain L4 load
balancer, because the worker reuses its HTTP/2 connection. L4 deployments need
DNS or client-side balancing to benefit.

#### WithStreamPollBackoff

```go
func WithStreamPollBackoff(b StreamPollBackoff) StreamWorkerOption
```

WithStreamPollBackoff sets the empty-poll backoff of the REST sidecar poll.
Defaults to DefaultStreamPollBackoff; pass StreamPollBackoff{} to disable it
and poll at the fixed WithStreamPollInterval.

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
overriding the client's default tenant. An empty list keeps the default.

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

WithPollInterval sets the pause after an empty poll or an activation error. A
worker at capacity does not wait this interval: it polls again as soon as
enough slots free up.

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
overriding the client's default tenant. An empty list keeps the default.

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

## DefaultStreamMaxLifetime, DefaultStreamInactivityTimeout

```go
const (
	DefaultStreamMaxLifetime       = 8 * time.Hour
	DefaultStreamInactivityTimeout = 10 * time.Minute
)
```

Defaults for the stream-lifecycle safeguards, matching the Camunda Java client.

## DefaultStreamPollBackoff

```go
var DefaultStreamPollBackoff = StreamPollBackoff{Multiplier: 1.6, Jitter: 0.1, Max: time.Minute}
```

DefaultStreamPollBackoff is the sidecar-poll empty-result backoff the Camunda
Java client uses: ×1.6, ±10% jitter, capped at 60 s.
