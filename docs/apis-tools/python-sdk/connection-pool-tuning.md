---
id: connection-pool-tuning
title: Connection Pool Tuning
sidebar_label: Connection Pool Tuning
sidebar_position: 16
mdx:
  format: md
---

# Connection Pool Tuning

`CamundaAsyncClient` uses an `httpx.AsyncClient` with httpx's default pool limits (`max_connections=100`, `max_keepalive_connections=20`). httpcore's connection pool does work proportional to the number of pooled connections on every request, so with the async client **more requests in flight does not mean more throughput** — beyond a point it only costs more CPU per request. In benchmarks on a 2-vCPU host, create-heavy workloads peaked at around 10–25 concurrent connections.

If your application runs many concurrent requests (for example, bulk-creating process instances with `asyncio.gather`), cap the pool with the `CAMUNDA_HTTP_MAX_CONNECTIONS` configuration key (environment variable or explicit configuration entry). When set, the SDK builds its httpx clients — sync and async — with `httpx.Limits(max_connections=N, max_keepalive_connections=N)`:

<!-- snippet-exempt: configuration fragment -->

```python
import os
from camunda_orchestration_sdk import CamundaAsyncClient

os.environ["CAMUNDA_HTTP_MAX_CONNECTIONS"] = "20"

async with CamundaAsyncClient() as client:
    ...
```

For finer control (for example, a different keepalive bound), pass an explicit `limits` entry via `httpx_args` — it takes precedence over `CAMUNDA_HTTP_MAX_CONNECTIONS`:

<!-- snippet-exempt: configuration fragment -->

```python
import httpx
from camunda_orchestration_sdk import CamundaAsyncClient

async with CamundaAsyncClient(
    httpx_args={
        "limits": httpx.Limits(max_connections=20, max_keepalive_connections=20),
    },
) as client:
    ...
```

Requests beyond `max_connections` wait for a free connection instead of opening new ones. Bounding your own concurrency (e.g. with an `asyncio.Semaphore`) to a similar number has the same effect. Job workers are bounded by `max_concurrent_jobs`; keep that in the same range on small hosts.
