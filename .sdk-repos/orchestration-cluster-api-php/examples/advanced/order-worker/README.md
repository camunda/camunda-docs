# Resilient inventory worker

This example deploys an inventory-reservation process and handles three orders:
a normal reservation, an out-of-stock business outcome, and a transient
technical failure that succeeds on retry.

```sh
php examples/advanced/order-worker/main.php
```

It demonstrates the worker boundary: model business outcomes as BPMN errors and
use job retries only for technical failures. The worker fetches only the
variables it owns, keeps a bounded activation batch, and verifies every process
instance reaches `COMPLETED`.
