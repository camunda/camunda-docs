---
title: "Runtime"
sidebar_label: "Runtime"
mdx:
  format: md
---

# Runtime

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

BpmnError, when returned by a JobHandler, makes the worker throw a BPMN error
(raising a catch event) instead of failing the job.

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

## PollOption

```go
type PollOption func(*pollConfig)
```

PollOption customizes Poll.

### Functions

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

### Poll

```go
func Poll[T any](ctx context.Context, fn func(context.Context) (T, error), opts ...PollOption) (T, error)
```

Poll repeatedly calls fn until it succeeds, the retry predicate returns false,
the timeout elapses, or ctx is cancelled. It is intended for
eventually-consistent reads: newly created or modified entities may not be
immediately visible in the cluster's secondary storage, surfacing as a 404.

By default Poll retries while fn returns a 404 and gives up after the timeout
with ErrEventualConsistencyTimeout (wrapping the last error). A non-retryable
error is returned immediately.

Example:

```go
pi, err := camunda.Poll(ctx, func(ctx context.Context) (*openapi.ProcessInstanceResult, error) {
    return client.GetProcessInstance(ctx, key)
})
```

### StatusCode

```go
func StatusCode(err error) (status int, ok bool)
```

StatusCode returns the HTTP status code carried by err if it is (or wraps) an
*APIError, and ok reports whether it was found.

## ErrConfig, ErrAuth, ErrBackpressureQueueFull, ErrEventualConsistencyTimeout

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
)
```

Sentinel errors. Use errors.Is to test for them.
