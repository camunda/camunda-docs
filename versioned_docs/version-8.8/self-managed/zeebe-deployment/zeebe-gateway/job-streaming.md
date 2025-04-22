---
id: job-streaming
title: "Job streaming"
sidebar_label: "Job streaming"
description: "Streaming job workers is expected to be long-lived to cut down on the latency overhead involved with re-creating a stream and propagating this throughout the cluster."
---

[Job streaming](../../../components/concepts/job-workers.md#job-streaming) is a long-lived process designed to reduce the latency involved with re-creating and propagating job workers.

When using a reverse proxy or a load balancer between your worker and your gateway, you may need to configure additional parameters to ensure the job stream is not closed unexpectedly. Impacted proxies will see HTTP 504 (gateway timeout) errors returned to the job streaming worker at regular intervals.

:::note
This configuration is _only_ required for reverse proxies which do not support forwarding HTTP/2 keepalive (on either side). See [this nginx ticket](https://trac.nginx.org/nginx/ticket/1887), for example.

Proxies which support forwarding HTTP/2 keepalive do not require any change.
:::

The following configuration is recommended for impacted reverse proxies:

- On your client, set an explicit stream timeout of one hour. See additional examples in [Java](../../../../apis-tools/java-client/job-worker).
- On your reverse proxy, ensure the read response timeout is set to slightly higher than your client (for example, an hour and ten minutes).

## Nginx

Nginx is a known proxy which does not support forward HTTP/2 pings from either side as a form of keepalive. To resolve related gateway timeouts, configure an appropriate `grpc_send_timeout` that it is _higher_ than your job worker stream timeout configuration.
