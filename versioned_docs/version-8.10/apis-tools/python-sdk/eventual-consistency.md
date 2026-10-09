---
id: eventual-consistency
title: Eventual Consistency
sidebar_label: Eventual Consistency
sidebar_position: 16
mdx:
  format: md
---

# Eventual Consistency

Some Camunda endpoints — particularly search and "get by key" operations — are eventually consistent: data written via one API call may not be immediately visible to a follow-up read. Endpoints flagged as eventually consistent in the OpenAPI spec accept an optional `consistency` parameter that transparently polls until the data is visible (or a timeout is reached).

The `consistency` parameter is fully optional and defaults to `None`, so existing call sites continue to work unchanged.

<!-- snippet-source: examples/readme.py | regions: ReadmeEventualConsistency -->

```python
from camunda_orchestration_sdk import CamundaClient
from camunda_orchestration_sdk.models import (
    ProcessInstanceSearchQuery,
    ProcessInstanceSearchQueryFilter,
)
from camunda_orchestration_sdk.runtime.eventual import (
    ConsistencyOptions,
    EventualConsistencyTimeoutError,
)

with CamundaClient() as client:
    try:
        result = client.search_process_instances(
            data=ProcessInstanceSearchQuery(
                filter_=ProcessInstanceSearchQueryFilter(
                    process_definition_id="order-process",
                ),
            ),
            # Opt in to transparent polling. Default predicate accepts the
            # first response whose `items` list is non-empty.
            consistency=ConsistencyOptions(
                wait_up_to_ms=5000,
                poll_interval_ms=200,
            ),
        )
        for instance in result.items:
            print(instance.process_instance_key)
    except EventualConsistencyTimeoutError as exc:
        print(f"Timed out after {exc.elapsed_ms}ms ({exc.attempts} attempts)")
```

For non-GET endpoints (search/list) the default predicate succeeds on the first response whose `items` list is non-empty. For GET endpoints it succeeds on any non-`None` result and transparently retries `404 Not Found` while waiting. Pass a custom `predicate` to wait for a more specific condition:

<!-- snippet-source: examples/readme.py | regions: ReadmeEventualConsistencyPredicate -->

```python
from camunda_orchestration_sdk import CamundaClient
from camunda_orchestration_sdk.models import (
    ProcessInstanceSearchQuery,
    ProcessInstanceSearchQueryFilter,
)
from camunda_orchestration_sdk.runtime.eventual import ConsistencyOptions

with CamundaClient() as client:
    # Wait until at least 3 instances are visible.
    result = client.search_process_instances(
        data=ProcessInstanceSearchQuery(
            filter_=ProcessInstanceSearchQueryFilter(
                process_definition_id="order-process",
            ),
        ),
        consistency=ConsistencyOptions(
            wait_up_to_ms=10_000,
            poll_interval_ms=250,
            predicate=lambda r: len(r.items) >= 3,
        ),
    )
    print(f"Got {len(result.items)} instances")
```

`ConsistencyOptions` fields:

| Field              | Type                          | Default    | Description                                        |
| ------------------ | ----------------------------- | ---------- | -------------------------------------------------- |
| `wait_up_to_ms`    | `int`                         | _required_ | Maximum time to wait. `0` skips polling entirely.  |
| `poll_interval_ms` | `int`                         | `500`      | Delay between polling attempts (minimum 10ms).     |
| `predicate`        | `Callable[[T], bool] \| None` | `None`     | Custom success check. Defaults as described above. |

Polling aborts immediately on `400`, `401`, `403`, `409`, `422`, and `5xx` responses. `429` responses are retried with backoff. On timeout the SDK raises `EventualConsistencyTimeoutError`, which exposes `attempts`, `elapsed_ms`, `last_status`, and `operation_id`.

The same parameter is available on `CamundaAsyncClient` and behaves identically using `asyncio.sleep` for the polling delay.
