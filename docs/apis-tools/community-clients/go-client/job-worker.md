---
id: job-worker
title: "Job worker"
description: "Let's take a deeper look at job workers to handle jobs."
keywords: ["backpressure", "back-pressure", "back pressure"]
---

The Go client provides a job worker that handles both polling and streaming for available jobs. This allows you to focus on writing code to handle the activated jobs.

On `Open`, the job worker waits `PollInterval` milliseconds and then polls for `MaxJobsActive` jobs. It then continues with the following schedule:

1. If a poll did not activate any jobs, it waits for `PollInterval` milliseconds and then polls for more jobs.
2. If a poll activated jobs, the worker submits each job to the job handler.
3. Every time a job is handled, the worker checks if the number of unhandled jobs has dropped below the configured `PollThreshold` (rounded up) of `MaxJobsActive`. The first time this happens, it polls for more jobs.
4. If a poll fails with an error response, a backoff strategy is applied. This strategy waits for the delay provided by the `BackoffSupplier` and polls for more jobs.

For example, imagine you have 10 process instances and a single job worker configured with `MaxJobsActive = 3` and `PollThreshold = 0.3`. The job worker will first pull three jobs and begin executing them. The threshold to poll for new jobs is 1 (30% of 3 rounded up). After two jobs have completed, the threshold is reached and the job worker will poll for up to two additional jobs. This process repeats until the jobs from all 10 process instances are completed.

If streaming is enabled (via `StreamEnabled`), it will also open a long-living stream over which jobs will be pushed without having to be polled. In such cases, a worker will only buffer up to `MaxJobsActive` jobs at the same time. You can then estimate its memory usage as `MaxJobsActive` times the max message size (worst case memory used by buffered, unhandled jobs) plus `Concurrency` times the max message size (worst case memory used by jobs currently being handled).

You can control how many jobs are worked on in parallel via the `Concurrency` parameter. This will set how many Go routines will be spawned by the worker, which de-queues an activated job from the worker queue and calls the `Handler` function with it.

## Example usage

```go
jobWorker := s.client.NewJobWorker().
	JobType(taskType).
	Handler(func(client worker.JobClient, job entities.Job) {
    // handle jobs; keep in mind this can come from different go routines
		fmt.Printf("Activated job with key: %d", job.Key)
	}).
	Timeout(time.Minute * 5).
	PollInterval(5 * time.Second).
  Concurrency(10).
  MaxJobsActive(32).
	Name(workerName).
	StreamEnabled(true).
	RequestTimeout(time.Duration(10) * time.Second).
	Open()

// do more things in the meantime, then eventually close the worker
jobWorker.Close()
```

## Backoff configuration

When a poll fails with an error response, the job worker applies a backoff strategy. It waits for some time, after which it polls again for more jobs. This gives a Zeebe cluster some time to recover from a failure. In some cases, you may want to configure this backoff strategy to better fit your situation.

The retry delay (i.e. the time the job worker waits after an error before the next poll for new jobs) is provided by the [`BackoffSupplier`](https://github.com/camunda-community-hub/zeebe-client-go/blob/main/pkg/worker/backoffSupplier.go). You can replace it using the `.BackoffSupplier()` method on the [`JobWorkerBuilder`](https://github.com/camunda-community-hub/zeebe-client-go/blob/main/pkg/worker/jobWorker_builder.go).

By default, the job worker uses an exponential backoff implementation, which you can configure by making your own [`ExponentialBackoffSupplier`](https://github.com/camunda-community-hub/zeebe-client-go/blob/main/pkg/worker/exponentialBackoffSupplier.go).

The backoff strategy is especially useful for dealing with the `GRPC_STATUS_RESOURCE_EXHAUSTED` error response (refer to [gRPC technical error handling](/apis-tools/zeebe-api/technical-error-handling.md)).

This error code indicates the Zeebe cluster is currently under too large of a load and has decided to reject this request.

By backing off, the job worker helps Zeebe by reducing the load.

:::note
Zeebe's [backpressure mechanism](/self-managed/zeebe-deployment/operations/backpressure.md) can also be configured.
:::

## Metrics

The job worker exposes metrics through a custom interface: [JobWorkerMetrics](https://github.com/camunda-community-hub/zeebe-client-go/blob/main/pkg/worker/jobWorkerMetrics.go).

:::note
By default, job workers will not track any metrics, and it's up to the caller to specify an implementation if they wish to make use of this feature.
:::

## Job streaming

Job workers are designed to regularly poll and activate jobs. It's also possible to use them in a streaming fashion, such that jobs are automatically activated and pushed downstream to workers without requiring an extra round of polling. This greatly cuts down on overall activation latency by almost completely removing the poll request.

### Usage

Enabling job streaming consists of toggling a single flag in the job worker builder:

```go
jobWorker := s.client.NewJobWorker().
	JobType(taskType).
	Handler(func(client worker.JobClient, job entities.Job) {
    // handle jobs; keep in mind this can come from different go routines
		fmt.Printf("Activated job with key: %d", job.Key)
	}).
	StreamEnabled(true).
  StreamRequestTimeout(4 * time.Hour)
	Open()
```

This configures the job worker to open a long-living stream between itself and a gateway, through which activated jobs will be pushed. **If the stream is closed for any reason - e.g. the gateway crashed, there is a temporary network issue, etc. - it is automatically recreated.**

:::note
It's also possible to set an overall timeout - called `streamTimeout` - which ensures the underlying long-living stream is refreshed once the timeout is reached. This is useful to trigger load balancing of your workers overtime, instead of having workers pinned to the same gateway.
:::

#### Backfilling

Even with streaming enabled, job workers still occasionally poll the cluster for jobs. Due to implementation constraints, when a job is made activate-able, it is pushed out only if there exists a stream for it; if not, it remains untouched. Even if a stream is created afterwards, it remains untouched. However, if a stream exists, then streaming is always prioritized over polling.

This ensures polling should not activate any new jobs, and the worker will back off and poll less often as long as it receives empty responses overtime.

#### Backpressure

To avoid your workers being overloaded with too many jobs, e.g. running out of memory, the Go job worker relies on the [built-in gRPC flow control mechanism](https://grpc.io/docs/guides/flow-control/). If streaming is enabled, this means the worker will never buffer more jobs than the configured `MaxJobsActive + Concurrency` parameters. For example, if `MaxJobsActive = 32` and `Concurrency = 10`, then your worker will only buffer at most 42 jobs concurrently. If this is already the case, and a 43rd job comes in, the streaming Go routine will block, thus signaling the gateway to stop sending more jobs.

**If streaming is enabled, back pressure applies to both pushing and polling**. You can then use `MaxJobsActive` and `Concurrency` as a way to soft-bound the memory usage of your worker. For example, given a maximum variable payload for a job of 1MB, `MaxJobsActive = 32`, and `Concurrency = 10`, then a single worker could use up to 42MB of memory. You can estimate a worst case scenario using the configured maximum message size, as no job payload will ever exceed this.

#### Proxying

If you're using a reverse proxy or a load balancer between your worker and your gateway, you may need to configure additional parameters to ensure the job stream is not closed unexpectedly with an error. If you observe regular 504 timeouts, read our guide on [job streaming](/self-managed/zeebe-deployment/zeebe-gateway/job-streaming.md).

By default, the Go job workers have a stream timeout of one hour. You can overwrite this by calling the `StreamRequestTimeout` of the job worker builder:

```go
var JobWorkerBuilderStep3 builder;
// builder is set in some way
builder.StreamRequestTimeout(30 * time.Minute);
```

## Additional resources

- [Job worker reference](/components/concepts/job-workers.md)
