---
id: job-worker
title: "Job worker"
description: "Let's take a deeper look at job workers to handle jobs."
---

## Related resources

- [Job worker basics](/components/concepts/job-workers.md)

## The Java client's job worker

The Java client provides a job worker that handles polling for available jobs. This allows you to focus on writing code to handle the activated jobs.

On `open`, the job worker waits `pollInterval` milliseconds and then polls for `maxJobsActive` jobs. It then continues with the following schedule:

1. If a poll did not activate any jobs, it waits for `pollInterval` milliseconds and then polls for more jobs.
2. If a poll activated jobs, the worker submits each job to the job handler.
3. Every time a job is handled, the worker checks whether the number of unhandled jobs have dropped below 30% of `maxJobsActive`. The first time that happens, it will poll for more jobs.
4. If a poll fails with an error response, a backoff strategy is applied. This strategy waits for the delay provided by the `backoffSupplier` and polls for more jobs.

## Example usage

- [Open a job worker](../java-client-examples/job-worker-open.md)

## Backoff configuration

When a poll fails with an error response, the job worker applies a backoff strategy. It waits for some time, after which it polls again for more jobs. This gives a Zeebe cluster some time to recover from a failure. In some cases, you may want to configure this backoff strategy to better fit your situation.

The retry delay (i.e. the time the job worker waits after an error before the next poll for new jobs) is provided by the [`BackoffSupplier`](https://github.com/camunda-cloud/zeebe/blob/develop/clients/java/src/main/java/io/camunda/zeebe/client/api/worker/BackoffSupplier.java). You can replace it using the `.backoffSupplier()` method on the [`JobWorkerBuilder`](https://github.com/camunda-cloud/zeebe/blob/develop/clients/java/src/main/java/io/camunda/zeebe/client/api/worker/JobWorkerBuilderStep1.java).

By default, the job worker uses an exponential backoff implementation, which you can configure using `BackoffSupplier.newBackoffBuilder()`.

The backoff strategy is especially useful for dealing with the `GRPC_STATUS_RESOURCE_EXHAUSTED` error response (see [gRPC Technical Error Handling](/apis-tools/grpc.md#technical-error-handling)).

This error code indicates the Zeebe cluster is currently under too large of a load and has decided to reject this request.

By backing off, the job worker helps Zeebe by reducing the load.

:::note
Zeebe's [backpressure mechanism](../../../self-managed/zeebe-deployment/operations/backpressure) can also be configured.
:::
