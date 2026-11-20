---
id: job-streaming
title: "Job streaming"
sidebar_label: "Job streaming"
description: "Streaming job workers is expected to be long-lived to cut down on the latency overhead involved with re-creating a stream and propagating this throughout the cluster."
---

[Job streaming](../../../../../components/concepts/job-workers.md#job-streaming) is a long-lived process designed to reduce the latency involved with re-creating and propagating job workers.

When using a reverse proxy or a load balancer between your worker and your gateway, you may need to configure additional parameters to ensure the job stream is not closed unexpectedly.

A proxy that closes an idle stream shows up on the job streaming worker at regular intervals, as either:

- An HTTP 504 (gateway timeout) error.
- A warning such as the following, with the HTTP/2 error code `INTERNAL_ERROR`:

  ```
  Failed to stream jobs of type 'my-job-type' to worker 'my-worker'
  io.grpc.StatusRuntimeException: INTERNAL: RST_STREAM closed stream. HTTP/2 error code: INTERNAL_ERROR
  ```

The worker reopens the stream on its own and keeps polling as a backfill, so jobs are not lost. The messages repeat for as long as the proxy closes idle streams, and a stream that does not come back is a risk, so fix the cause instead of ignoring the warning.

:::note
This configuration is _only_ required for reverse proxies which do not support forwarding HTTP/2 keepalive (on either side). See [this nginx ticket](https://trac.nginx.org/nginx/ticket/1887), for example.

Proxies which support forwarding HTTP/2 keepalive do not require any change.
:::

## Choose a fix

The proxy closes a stream that sends nothing for longer than its idle timeout (60 seconds by default in nginx and ingress-nginx). Job types with few jobs have idle streams most of the time. Change one of the two sides:

- **Lower the stream timeout on the worker below the proxy idle timeout (recommended).** The worker closes and recreates each stream itself before the proxy does, without an error. No proxy change or reload is needed, and only the workers restart. The cost is one extra stream registration per stream every interval. For a proxy idle timeout of 60 seconds, set the stream timeout to 45 seconds.
- **Raise the proxy timeouts above the stream timeout.** Streams stay long-lived. Set an explicit stream timeout of one hour on your client, and set the proxy read and send timeouts slightly higher (for example, an hour and ten minutes). See additional examples in [Java](../../../../../apis-tools/java-client/job-worker.md#proxying).

Do not combine them in a way that leaves the stream timeout above the proxy timeout.

Set the stream timeout in the Spring Boot Starter with [`camunda.client.worker.defaults.stream-timeout`](../../../../../apis-tools/camunda-spring-boot-starter/properties-reference.md#camundaclientworkerdefaultsstreamtimeout) (all job types) or for a single job type with `camunda.client.worker.override.<job-type>.stream-timeout`. After a restart, check the effective value in the worker's configuration, because a misspelled property name is silently ignored.

## Nginx

Nginx is a known proxy which does not support forward HTTP/2 pings from either side as a form of keepalive. To resolve related gateway timeouts, configure both `grpc_read_timeout` and `grpc_send_timeout` so that they are _higher_ than your job worker stream timeout configuration. The read timeout is the time nginx waits between two reads from the gateway, so it is the one that closes an idle stream.

With the ingress-nginx controller on Kubernetes, set the following annotations on the gateway gRPC ingress, in seconds. For a gRPC backend, they set the `grpc_*` timeouts as well. For example, `4200` is an hour and ten minutes:

```yaml
nginx.ingress.kubernetes.io/proxy-read-timeout: "4200"
nginx.ingress.kubernetes.io/proxy-send-timeout: "4200"
```

Changing an ingress annotation reloads the controller for all traffic it serves, and open streams reconnect once. If that is too much for your environment, lower the stream timeout on the worker instead.

## What to expect from job streams

- A stream is a long-lived call that the worker recreates on purpose when the stream timeout is reached. This is not an error. Application performance monitoring tools show long `StreamActivatedJobs` spans because of it.
- Even with streaming enabled, workers poll for jobs as a backfill. With long polling, a request stays open until a job arrives or the request timeout ends. When few jobs exist, activation duration metrics are therefore long. This is expected and is not a reason to alert. See [how job streaming and polling deliver jobs](../../../../../components/concepts/job-workers.md#how-job-streaming-and-polling-deliver-jobs).
