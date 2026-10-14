# Forked PHP job worker

This CLI-only scenario runs one job in a child process:

```sh
php examples/advanced/forked-worker/main.php
```

It requires `ext-pcntl`. When that extension is unavailable, the script reports
the prerequisite and exits without starting a process. Production handlers must
keep downstream side effects idempotent because job execution is at least once,
including across process boundaries.
