# Advanced runnable examples

These scenarios deploy their own BPMN model, exercise the running cluster, and
exit non-zero if the expected workflow outcome does not occur. Start a local
Camunda 8.10 cluster, then run them from the repository root:

```sh
php examples/advanced/sdk-test-drive/main.php
php examples/advanced/order-worker/main.php
php examples/advanced/message-correlation/main.php
php examples/advanced/forked-worker/main.php
php examples/advanced/showcase/main.php
```

`make advanced-examples` runs the same sequence. The default client uses
`http://localhost:8080/v2`; set `CAMUNDA_REST_ADDRESS` and the appropriate
authentication variables for another cluster.

- **sdk-test-drive** validates topology, FEEL expression evaluation, deployment,
  process creation, job activation/completion, and eventual completion readback.
- **order-worker** distinguishes a modeled out-of-stock BPMN error from a
  retryable inventory-service failure.
- **message-correlation** uses a message TTL and stable message IDs so a
  process-start race and at-least-once producer redelivery are both safe.
- **forked-worker** exercises PHP's optional `ext-pcntl` worker mode. It skips
  cleanly when the extension is unavailable.
- **showcase** runs six live scenario groups and writes a searchable HTML proof
  report that indexes every top-level source snippet by its demonstrated API
  area. It deliberately exercises mutating and privileged operations, so use
  only a disposable cluster. See its [detailed guide](showcase/README.md).

The Go SDK's raw gRPC and stream-worker scenarios have no PHP equivalent: this
SDK currently exposes REST APIs only. Its adaptive backpressure example depends
on a Go runtime capability that PHP does not implement, so it is intentionally
not represented by a misleading stand-in.
