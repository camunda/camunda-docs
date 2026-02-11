<details>
<summary>To access the other services and their UIs, port-forward those components as well:</summary>

```shell
Orchestration:
> kubectl port-forward "svc/$CAMUNDA_RELEASE_NAME-zeebe-gateway"  8080:8080 --namespace "$CAMUNDA_NAMESPACE"
Optimize:
> kubectl port-forward "svc/$CAMUNDA_RELEASE_NAME-optimize" 8083:80 --namespace "$CAMUNDA_NAMESPACE"
Connectors:
> kubectl port-forward "svc/$CAMUNDA_RELEASE_NAME-connectors" 8086:8080 --namespace "$CAMUNDA_NAMESPACE"
WebModeler:
> kubectl port-forward "svc/$CAMUNDA_RELEASE_NAME-web-modeler-webapp" 8070:80 --namespace "$CAMUNDA_NAMESPACE"
Console:
> kubectl port-forward "svc/$CAMUNDA_RELEASE_NAME-console" 8087:80 --namespace "$CAMUNDA_NAMESPACE"
```

</details>
