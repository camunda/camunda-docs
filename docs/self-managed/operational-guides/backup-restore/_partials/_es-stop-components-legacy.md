**Stop all components apart from Elasticsearch/OpenSearch**

If you are using an external Elasticsearch/OpenSearch and Kubernetes, you could temporarily [uninstall](https://helm.sh/docs/helm/helm_uninstall/) the Camunda Helm chart or [scale](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_scale/) all components to 0, so that nothing is running and potentially interacting with the datastore.

In a manual setup, you can simply stop all components.

Before restoring the Elasticsearch/OpenSearch snapshots, stop Optimize if it is installed. If Operate and Tasklist are deployed as standalone applications, stop them as well. With the official Camunda Helm chart, Operate and Tasklist run as part of the single orchestration cluster deployment, so stop the orchestration deployment as described above rather than stopping separate application deployments.

If you are using the Camunda Helm chart with an embedded Elasticsearch, you can achieve this by (for example) disabling all other components in the `values.yml`.

```yaml
elasticsearch:
  enabled: true

connectors:
  enabled: false
optimize:
  enabled: false
orchestration:
  enabled: false
```
