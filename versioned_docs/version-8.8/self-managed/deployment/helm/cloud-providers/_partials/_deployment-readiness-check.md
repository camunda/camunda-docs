import DeploymentReadinessDownload from './\_deployment-readiness-download.md'

The script polls the namespace until every pod is `Running` with all of its containers ready. If the deployment stalls, it reports the containers that are not ready, with their restart count, waiting reason, last termination reason, and exit code, together with recent warning events, so you can see what is blocking it.

{props.download && <DeploymentReadinessDownload />}

Configure it with the following environment variables:

| Variable                            | Default   | Purpose                                                          |
| ----------------------------------- | --------- | ---------------------------------------------------------------- |
| `CAMUNDA_NAMESPACE`                 | `camunda` | Namespace to watch                                               |
| `DEPLOYMENT_READY_TIMEOUT_SECONDS`  | `1800`    | Wall-clock budget in seconds. Set it to `0` to wait indefinitely |
| `DEPLOYMENT_READY_INTERVAL_SECONDS` | `5`       | Delay in seconds between two polls                               |

<details>
<summary>See the check-deployment-ready.sh script</summary>
```bash reference
https://github.com/camunda/camunda-deployment-references/blob/stable/8.8/generic/kubernetes/single-region/procedure/check-deployment-ready.sh
```
</details>
