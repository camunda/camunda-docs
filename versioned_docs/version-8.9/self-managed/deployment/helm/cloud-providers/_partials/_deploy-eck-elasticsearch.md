To deploy Elasticsearch using the ECK operator:

```bash
(cd generic/kubernetes/operator-based/elasticsearch && ./deploy.sh)
```

The script installs the ECK operator, deploys an Elasticsearch cluster, and waits until it is ready.

<details>
<summary>Review the Elasticsearch cluster configuration</summary>

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/stable/8.9/generic/kubernetes/operator-based/elasticsearch/elasticsearch-cluster.yml
```

</details>

For more details on the Elasticsearch deployment, see [Elasticsearch deployment in the operator-based infrastructure guide](/self-managed/deployment/helm/configure/operator-based-infrastructure.md#elasticsearch-deployment).
