# SDK test drive

Run the quickest end-to-end confidence check for the PHP SDK:

```sh
php examples/advanced/sdk-test-drive/main.php
```

The program creates unique process and job-type identifiers for each run,
deploys its model, evaluates `=21 * 2`, starts a process, completes its job,
and verifies the instance reaches `COMPLETED`. If a failure interrupts the
flow, it cancels the active instance before returning a non-zero exit status.
