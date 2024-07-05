---
id: job-streaming
title: "Job Streaming"
sidebar_label: "Job Streaming"
---

Streaming job workers are expected to be long lived in order to cut down on the latency overhead involved with (re)creating a stream and propagating this throughout the cluster. This may require special configuration, especially if you're using a reverse proxy in front of your gateway. Typically, this will affect you in the form of HTTP 504 (Gateway Timeout) being returned to your job streaming worker at regular intervals.

:::note
Note that this configuration is _only_ required for reverse proxies which do not support forwarding HTTP/2 keepalive (on either side). See, for example, [this nginx ticket](https://trac.nginx.org/nginx/ticket/1887).

If your proxy supports it, then you don't need to do anything.
:::

The general recommendation would be to apply the following configuration:

- On your client, set an explicit stream timeout, say, 1h. You can find examples in [Java](../../../apis-tools/java-client/job-worker) and [Go](../../../apis-tools/go-client/job-worker) as part of our documentation.
- On your reverse proxy, ensure the read response timeout is set to slightly higher than your client, e.g. 1h10.

## NGINX

As aforementioned, nginx is a known proxy which does not support forward HTTP/2 pings from either side as a form of keepalive. You should configure an appropriate `grpc_send_timeout` such that it is _higher_ than your job worker stream timeout configuration.
