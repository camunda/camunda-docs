---
id: technical-error-handling
title: "Technical error handling"
sidebar_position: 3
slug: /apis-tools/zeebe-api/technical-error-handling
description: "Learn more about business logic errors as a result of request processing logic."
---

In the documentation above, the documented errors are business logic errors.
These errors are a result of request processing logic, and not serialization, network, or
other more general errors. These errors are described in this section.

The gRPC API for Zeebe is exposed through an API gateway, which acts as a proxy
for the cluster. Generally, this means the clients execute a remote call on the gateway,
which is then translated to special binary protocol the gateway uses to
communicate with nodes in the cluster. The nodes in the cluster are called brokers.

Technical errors which occur between gateway and brokers (e.g. the gateway cannot deserialize the broker response,
the broker is unavailable, etc.) are reported to the client using the following error codes:

- `GRPC_STATUS_RESOURCE_EXHAUSTED`: When a broker receives more requests than it can handle, it signals backpressure and rejects requests with this error code.
  - In this case, it is possible to retry the requests with an appropriate retry strategy.
  - If you receive many such errors within a short time period, it indicates the broker is constantly under high load.
- `GRPC_STATUS_UNAVAILABLE`: If the gateway itself is in an invalid state (e.g. out of memory).
- `GRPC_STATUS_INTERNAL`: For any other internal errors that occurred between the gateway and the broker.

import BackpressureWarning from '../../components/react-components/backpressure-warning.md'

<BackpressureWarning/>

This behavior applies to every request. In these cases, the client should retry
with an appropriate retry policy (e.g. a combination of exponential backoff or jitter wrapped
in a circuit breaker).

As the gRPC server/client is based on generated code, keep in mind that
any call made to the server can also return errors as described by the spec
[here](https://grpc.io/docs/guides/error.html#error-status-codes).
