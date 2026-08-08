The script polls the namespace until every pod is `Running` with all of its containers ready. If the deployment stalls, it reports the containers that are not ready, with their restart count, waiting reason, last termination reason, and exit code, together with recent warning events, so you can see what is blocking it.

If you don't have a local copy of the reference architecture, download the script and run it:

```bash
curl -fsSL https://raw.githubusercontent.com/camunda/camunda-deployment-references/stable/8.9/generic/kubernetes/single-region/procedure/check-deployment-ready.sh -o check-deployment-ready.sh
chmod +x check-deployment-ready.sh
./check-deployment-ready.sh
```

Review the script before you run it. Configure it with the following environment variables:

| Variable                            | Default   | Purpose                                                          |
| ----------------------------------- | --------- | ---------------------------------------------------------------- |
| `CAMUNDA_NAMESPACE`                 | `camunda` | Namespace to watch                                               |
| `DEPLOYMENT_READY_TIMEOUT_SECONDS`  | `1800`    | Wall-clock budget in seconds. Set it to `0` to wait indefinitely |
| `DEPLOYMENT_READY_INTERVAL_SECONDS` | `5`       | Delay in seconds between two polls                               |

<details>
<summary>See the check-deployment-ready.sh script</summary>
```bash reference
https://github.com/camunda/camunda-deployment-references/blob/stable/8.9/generic/kubernetes/single-region/procedure/check-deployment-ready.sh
```
</details>
