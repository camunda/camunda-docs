---
id: clocks
title: "Clocks"
sidebar_label: "Clocks"
sidebar_position: 14
mdx:
  format: md
---

# Clocks

:::caution Technical Preview
The Go SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

Retry backoff, the backpressure gate, token refresh, job-worker polling and
consistency polling all resolve through an injected clock rather than the `time`
package, so a test can control cadence instead of waiting for it.

Two places deliberately stay on real time, each marked with a `//nolint:forbidigo`
naming the reason: `LiveClock` itself, which is the adapter onto the `time` package,
and `internal/falcon`, whose timers are mostly I/O bounds — read-idle detection and
create-ack budgets — that would misfire if bound to engine time.

| Clock            | Use                                                                       |
| ---------------- | ------------------------------------------------------------------------- |
| `LiveClock`      | real time; the default when nothing is injected                           |
| your own `Clock` | tests; return whatever `Now` you like and make `Sleep` return immediately |
| `EngineClock`    | drives the Camunda engine's clock and the SDK's together                  |

A local test clock makes the _SDK_ wait instantly, but the engine carries on in real
time — so a process that only completes once a BPMN timer fires still takes as long as
the timer says. `EngineClock` is for that case.

## Waiting inside a handler

A `Job` carries its worker's clock, so a handler that needs to wait can do it on the
same clock as everything else:

```go
worker := client.NewJobWorker("payment", func(ctx context.Context, job *camunda.Job) (map[string]any, error) {
	// Short coordination only -- a business wait belongs in the process as a
	// BPMN timer event.
	if err := job.Clock().Sleep(ctx, 500*time.Millisecond); err != nil {
		return nil, err
	}
	return map[string]any{"paid": true}, nil
})
```

Keep those waits short — spacing a retry, letting a resource settle. **A long or
business wait belongs in the process as a BPMN timer event, not in a handler.** A
handler that sleeps for minutes holds a worker slot for the duration, risks the job
timeout expiring underneath it, and hides the delay from the process model, where it
would otherwise be visible and changeable without a redeploy.

## Driving the engine's clock

`EngineClock` pins the engine's clock instead of passing time locally:

```go
// The control client issues the pin requests and keeps real time itself.
control, err := camunda.New(camunda.WithRestAddress(addr))
if err != nil {
	return err
}
clock := camunda.NewEngineClock(control)

// Anything this client waits on now advances the engine instead of real time.
client, err := camunda.New(camunda.WithRestAddress(addr), camunda.WithClock(clock))
if err != nil {
	return err
}
```

A wait now moves the engine forward and reports the new instant, so the SDK and the
engine agree on what time it is. Waits that overlap — those that read the clock before
any of them lands — settle at a single instant rather than summing; a wait that begins
after an earlier one has landed reads the new time and composes from it. `PinTo` and
`Reset` are available directly for tests that need to move the engine without waiting.

Clock pinning is an alpha engine endpoint, intended for tests rather than production
clusters. Pass the control client the pin requests should travel on: it keeps real
time, so the requests themselves are unaffected by the pinning.

## Writing your own

`Clock` is a public interface (`Now`, `Sleep`, `After`); implement it and pass it to
`camunda.WithClock`. `ClockController` is the engine-side half, if you want
`EngineClock` to drive something other than a `CamundaClient`.

Ambient time is banned in the runtime by `.golangci.yml` — `time.Now`, `time.Sleep`,
`time.NewTimer` and friends — so cadence cannot quietly drift back onto real time.
