---
title: "Runtime"
sidebar_label: "Runtime"
mdx:
  format: md
---

# Runtime

:::caution Technical Preview
The Go SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

Error types returned by every SDK call, the helpers that classify them, and the polling helper that absorbs eventual consistency.

## APIError

APIError is returned when the server responds with a non-success HTTP status.
It carries the status code and the (often RFC 7807 problem-detail) response body.

### Fields

| Field    | Type     | Description                            |
| -------- | -------- | -------------------------------------- |
| `Status` | `int`    | Status is the HTTP status code.        |
| `Body`   | `string` | Body is the raw response body, if any. |

### Methods

#### Error

```go
func (e *APIError) Error() string
```

## BpmnError

BpmnError is an error that, when returned by a JobHandler, makes the worker throw
a BPMN error (raising a catch event) instead of failing the job.

### Fields

| Field       | Type             | Description |
| ----------- | ---------------- | ----------- |
| `Code`      | `string`         |             |
| `Message`   | `string`         |             |
| `Variables` | `map[string]any` |             |

### Methods

#### Error

```go
func (e *BpmnError) Error() string
```

## Clock

Clock is time and waiting, as an injectable dependency.

It exists so that runtime cadence can be resolved through a clock a test controls
rather than by calling the time package directly. Inject one with `WithClock`; the
default is `LiveClock`.

Runtime call sites are being migrated onto it (see camunda/orchestration-cluster-api-go#40);
until that lands, an injected clock is stored and reachable via CamundaClient.Clock
but does not yet drive retry, backpressure, worker or consistency cadence.

Implementations must be safe for concurrent use.

## ClockController

ClockController is the engine-side clock an `EngineClock` drives.

Implemented by `CamundaClient` in terms of PUT /clock and POST /clock/reset. It is
an interface so the pin semantics can be tested without a running engine.

## EngineClock

EngineClock is a clock bound to the engine's own clock.

A wait does not pass time locally: it moves the _engine_ forward and reports the new
instant. Process instances, timers and the SDK therefore agree on what time it is,
which a purely local test clock cannot achieve.

A wait resolves against an instant read before the engine is contacted, so waits
that overlap -- those that read the clock before any of them lands -- settle at a
single instant instead of summing. A wait that begins after an earlier one has
landed reads the new time and composes from it, which is the intended behaviour: it
really did start later.

Clock pinning is an alpha engine endpoint intended for tests, not production
clusters. Pass the client the pin requests should travel on; it keeps real time, so
the requests themselves are unaffected by the pinning.

### Functions

#### NewEngineClock

```go
func NewEngineClock(engine ClockController) *EngineClock
```

NewEngineClock binds to an engine. The clock starts unpinned, following real time
until the first wait or `EngineClock.PinTo`.

engine must not be a client using this clock: a client captures its clock when it is
built, so the one passed here always predates this clock.

### Methods

#### After

```go
func (c *EngineClock) After(d time.Duration) <-chan time.Time
```

After returns immediately with a channel that receives once the engine clock has
been advanced by d. The advance runs in the background, so After stays usable in a
select rather than blocking the caller for an engine round-trip.

A failed pin panics in that goroutine. Because the panic is not on the caller's
goroutine it cannot be recovered, and terminates the program: After has no way to
report an error, and reporting a time the engine never moved to would be worse. The
panic value is an error wrapping the cause so the crash names it.

Use `EngineClock.Sleep` wherever failure needs handling; it returns the error.

#### IsPinned

```go
func (c *EngineClock) IsPinned() bool
```

IsPinned reports whether this clock currently holds the engine clock pinned.

#### Now

```go
func (c *EngineClock) Now() time.Time
```

Now reports the pinned instant, or live time when unpinned.

#### PinTo

```go
func (c *EngineClock) PinTo(ctx context.Context, t time.Time) error
```

PinTo moves the engine clock to an absolute instant, and reports that instant from
`EngineClock.Now` once the engine accepts it -- including when t is in the past,
since the SDK's reading has to match the engine's.

A no-op when the clock already sits at or past t, which is what makes overlapping
waits settle at a single instant. The local reading is published only after the
engine accepts the pin, so a failed request leaves the clock untouched.

Waits never move the clock backwards: `EngineClock.Sleep` derives its instant by
adding to the current reading.

#### Reset

```go
func (c *EngineClock) Reset(ctx context.Context) error
```

Reset returns the engine to real time. Readings follow live time again afterwards,
rather than freezing at the last pinned instant.

#### Sleep

```go
func (c *EngineClock) Sleep(ctx context.Context, d time.Duration) error
```

Sleep advances the engine clock by d rather than waiting for it to pass.

## LiveClock

LiveClock is real time, backed by the time package. It is the clock used when none
is injected.

### Methods

#### After

```go
func (LiveClock) After(d time.Duration) <-chan time.Time
```

After returns a channel that receives once d has elapsed.

#### Now

```go
func (LiveClock) Now() time.Time
```

Now reports the current system time.

#### Sleep

```go
func (LiveClock) Sleep(ctx context.Context, d time.Duration) error
```

Sleep waits for d or until ctx is canceled.

## LiveRandom

LiveRandom draws from the process-wide generator. It is the default when no
`Random` is injected.

### Methods

#### Float64

```go
func (LiveRandom) Float64() float64
```

Float64 implements `Random`.

## PollOption

```go
type PollOption func(*pollConfig)
```

PollOption customizes Poll.

### Functions

#### WithPollClock

```go
func WithPollClock(clock Clock) PollOption
```

WithPollClock resolves the poll interval and timeout through clock. Poll is a
package-level function with no client to inherit one from, so pass the client's
clock (CamundaClient.Clock) to keep a test on a single timeline.

#### WithPollRetryInterval

```go
func WithPollRetryInterval(d time.Duration) PollOption
```

WithPollRetryInterval sets the delay between polling attempts.

#### WithPollTimeout

```go
func WithPollTimeout(d time.Duration) PollOption
```

WithPollTimeout sets the overall polling deadline.

#### WithRetryOn

```go
func WithRetryOn(pred func(error) bool) PollOption
```

WithRetryOn overrides the predicate that decides whether an error is
retryable (the entity is not yet consistent). The default retries on 404.

## Random

Random is the source of randomness the SDK draws jitter from: retry backoff,
worker startup delay and FALCON endpoint selection. Inject one with
`WithRandom`; the default is `LiveRandom`.

Implementations must be safe for concurrent use, since retries and workers
draw from one source on many goroutines.

## SeededRandom

SeededRandom is a deterministic `Random`. Two sources with the same seed
produce the same sequence, so a test can assert the exact delays the SDK
schedules and replay a failure. It is safe for concurrent use, though
concurrent callers then share one sequence in nondeterministic order.

The generator is SplitMix64, taking the top 53 bits of each output. It is
specified across the Camunda SDKs, so one seed yields the same sequence in
every language.

### Functions

#### NewSeededRandom

```go
func NewSeededRandom(seed uint64) *SeededRandom
```

NewSeededRandom returns a source that replays the sequence for seed.

#### SeededRandomFromEnv

```go
func SeededRandomFromEnv() (*SeededRandom, error)
```

SeededRandomFromEnv seeds from CAMUNDA_TEST_SEED when it is set, otherwise
from a fresh random seed. Either way the source reports its seed through
`SeededRandom.Seed` and `SeededRandom.String`, so a failing test can be
replayed.

Only an unset variable means absent. Any other value that is not a decimal
integer in the uint64 range, including an empty string, returns an error
wrapping `ErrConfig` rather than silently running with a different seed.

### Methods

#### Float64

```go
func (r *SeededRandom) Float64() float64
```

Float64 implements `Random`.

#### Seed

```go
func (r *SeededRandom) Seed() uint64
```

Seed returns the seed this source was created with.

#### String

```go
func (r *SeededRandom) String() string
```

String names the seed and how to replay it, so a test that prints the source
on failure says how to reproduce the run.

## Package functions

### IsEventuallyConsistent

```go
func IsEventuallyConsistent(operationID string) bool
```

IsEventuallyConsistent reports whether the REST operation with the given
operationId is eventually consistent: a read issued immediately after a
related write may not observe the write yet. Wrap such reads in Poll to
tolerate propagation delay.

The operationId is the OpenAPI operation id (camelCase), e.g.
"getProcessInstance". The set is generated from the spec metadata.

### IsNotFound

```go
func IsNotFound(err error) bool
```

IsNotFound reports whether err is (or wraps) an *APIError with HTTP 404.

### OperationServerOrigin

```go
func OperationServerOrigin(restAddress string, exact bool) (string, error)
```

OperationServerOrigin derives the origin (scheme://host[:port]) that
operation-level servers — the cluster-admin /cluster/v2/* operations, whose
spec template is "{schema}://{host}:{port}" with no path — resolve against.
It is the configured REST address with any base path stripped: the spec paths
for these operations already carry their own prefix, so appending the REST
base path (/v2, or a gateway-fronted path under ExactRestAddress) would
double it. The origin is serialized through url.URL, not concatenated, so an
IPv6 literal keeps its brackets and a scoped literal keeps its
percent-escaped zone identifier (url.Parse decodes %25 in u.Host; a plain
scheme+"://"+host join would emit an invalid URL containing a raw "%eth0").
A REST address that is not a valid http(s) URL is an error, never a
best-guess origin.

### Poll

```go
func Poll[T any](ctx context.Context, fn func(context.Context) (T, error), opts ...PollOption) (T, error)
```

Poll repeatedly calls fn until it succeeds, the retry predicate returns false,
the timeout elapses, or ctx is canceled. It is intended for
eventually-consistent reads: newly created or modified entities may not be
immediately visible in the cluster's secondary storage, surfacing as a 404.

By default Poll retries while fn returns a 404 and gives up after the timeout
with ErrEventualConsistencyTimeout (wrapping the last error). A non-retryable
error is returned immediately.

Example:

```go
pi, err := camunda.Poll(ctx, func(ctx context.Context) (*camunda.ProcessInstanceResult, error) {
    return client.GetProcessInstance(ctx, key)
})
```

### StatusCode

```go
func StatusCode(err error) (status int, ok bool)
```

StatusCode returns the HTTP status code carried by err if it is (or wraps) an
*APIError, and ok reports whether it was found.

## SeedEnvVar

```go
const SeedEnvVar = "CAMUNDA_TEST_SEED"
```

SeedEnvVar names the environment variable `SeededRandomFromEnv` reads. A test
that fails under a seeded source can be replayed by setting it to the seed the
failure reported.

## ErrConfig, ErrAuth, ErrBackpressureQueueFull, ErrEventualConsistencyTimeout, ErrLeaseNotHonored

```go
var (
	// ErrConfig indicates configuration was invalid or incomplete.
	ErrConfig = errors.New("camunda: configuration error")
	// ErrAuth indicates a failure obtaining or refreshing an auth token.
	ErrAuth = errors.New("camunda: authentication error")
	// ErrBackpressureQueueFull indicates the client-side backpressure controller
	// rejected the request because its waiter queue is at capacity. It is the same
	// value the backpressure gate returns, so errors.Is matches it on any request
	// rejected for this reason (facade, Raw client, or job workers).
	ErrBackpressureQueueFull = backpressure.ErrQueueFull
	// ErrEventualConsistencyTimeout indicates an eventual-consistency polling
	// helper timed out before its predicate was met.
	ErrEventualConsistencyTimeout = errors.New("camunda: eventual consistency timeout")
	// ErrLeaseNotHonored indicates a worker activated jobs with a lease but the
	// server returned a job carrying no lease token.
	//
	// The specification declares the token present exactly when the activation sets
	// the lease flag (see presentwhen.go). A server that predates job leases, or one
	// that ignores the flag, breaks that quietly: the worker would go on to complete,
	// fail, or throw an error for the job with no token, so the engine could not fence
	// the command against a superseded activation. The caller asked for fencing and
	// would not be getting it, which is worth failing over rather than logging.
	ErrLeaseNotHonored = errors.New("camunda: activation requested a job lease but the server returned no lease token")
)
```

Sentinel errors. Use errors.Is to test for them.
