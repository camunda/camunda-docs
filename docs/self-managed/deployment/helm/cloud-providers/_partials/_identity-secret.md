### Create identity secrets

Before deploying Camunda, create the `camunda-credentials` Kubernetes secret with randomly generated credentials for all identity components. This secret is required by the Helm chart to configure authentication between Camunda components:

```bash
./procedure/create-identity-secrets.sh
```

<details>
<summary>See the create-identity-secrets.sh script</summary>
```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/local/kubernetes/kind-single-region/procedure/create-identity-secrets.sh
```
</details>

This script generates random passwords and tokens for Connectors, Console, Web Modeler, Orchestration, Optimize, and the admin user, then stores them in the `camunda-credentials` secret in the `camunda` namespace.
