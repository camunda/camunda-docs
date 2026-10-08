# Live example showcase

Run this manually against a disposable Camunda cluster to produce a visual,
live proof of the PHP SDK examples:

```sh
CAMUNDA_REST_ADDRESS=http://localhost:8080 \
CAMUNDA_AUTH_STRATEGY=NONE \
  php examples/advanced/showcase/main.php
```

The showcase executes six scenario groups:

1. bootstrap and discovery;
2. deployment and process lifecycle;
3. jobs and bounded worker loops;
4. user tasks, incidents, expressions, and variables;
5. message correlation; and
6. management and operations.

The report indexes every source-backed top-level `examples/*.php` snippet
alongside the scenario that demonstrates its API area. The worker-loop examples
run in bounded child processes and are verified by process completion. The
existing advanced workflow programs provide end-to-end proof for process
execution, retry handling, message idempotency, and `pcntl` forking.

Run a single scenario with:

```sh
make example-showcase SCENARIO=jobs-and-workers
```

Each run writes `docs/example-validation-results.json` and the searchable,
self-contained `docs/example-validation.html` report. A result is:

- `PASS` when the API call or workflow produced the expected successful
  evidence; or
- `FAIL` for an unexpected runner, SDK, transport, or workflow error.

The showcase invokes mutations and cluster-management endpoints. Do not run it
against a shared development, staging, or production cluster.
