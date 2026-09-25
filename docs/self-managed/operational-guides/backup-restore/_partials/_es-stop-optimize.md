The Restore API keeps the brokers running in recovery mode and the web applications up, so only Optimize needs to be stopped before you restore the Elasticsearch/OpenSearch snapshots.

If you are using the Camunda Helm chart, disable Optimize in the `values.yml`:

```yaml
optimize:
  enabled: false
```

In a manual setup, stop the Optimize process.
