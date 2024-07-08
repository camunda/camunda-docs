---
id: job-streaming
title: "Job streaming"
sidebar_label: "Job streaming"
description: "Streaming job workers is expected to be long-lived to cut down on the latency overhead involved with re-creating a stream and propagating this throughout the cluster."
---

Streaming job workers is expected to be long-lived to cut down on the latency overhead involved with re-creating a stream and propagating this throughout the cluster. This may require special configuration, especially if you're using a reverse proxy in front of your gateway. Typically, this will affect you in the form of HTTP 504 (gateway timeout) being returned to your job streaming worker at regular intervals.

:::note
This configuration is _only_ required for reverse proxies which do not support forwarding HTTP/2 keepalive (on either side). See [this nginx ticket](https://trac.nginx.org/nginx/ticket/1887), for example.

If your proxy supports it, you don't need to do anything.
:::

Generally, we recommend applying the following configuration:

- On your client, set an explicit stream timeout of one hour. See additional examples in [Java](../../../../apis-tools/java-client/job-worker) and [Go](../../../../apis-tools/go-client/job-worker).
- On your reverse proxy, ensure the read response timeout is set to slightly higher than your client -- an hour and ten minutes, for example.

## NGINX

As mentioned, nginx is a known proxy which does not support forward HTTP/2 pings from either side as a form of keepalive. Configure an appropriate `grpc_send_timeout` such that it is _higher_ than your job worker stream timeout configuration.
