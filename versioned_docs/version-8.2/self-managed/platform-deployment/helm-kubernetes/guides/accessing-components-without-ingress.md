---
id: accessing-components-without-ingress
title: "Accessing components without Ingress"
description: "Accessing Camunda Platform 8 components externally without Ingress"
---

By default, the [Camunda Platform Helm chart](../../helm-kubernetes/deploy.md) does not expose the Camunda Platform services externally. So to interact with the Camunda Platform services inside a Kubernetes cluster without Ingress setup, you can use `kubectl port-forward` to route traffic from your local machine to the cluster. This is useful for quick tests or for development purposes.

:::note
You need to keep `port-forward` running all the time to communicate with the remote cluster.
:::

## Accessing workflow engine

To interact with Camunda Platform workflow engine via [Zeebe Gateway](../../../zeebe-gateway-deployment/the-zeebe-gateway.md) using [zbctl](../../../../apis-tools/cli-client/index.md) or a local client/worker from outside the Kubernetes cluster, run `kubectl port-forward` to the Zeebe cluster as following:

```
kubectl port-forward svc/<RELEASE_NAME>-zeebe-gateway 26500:26500
```

Now, you can connect and execute operations against your new Zeebe cluster. This allows you to use `zbctl` as a command line interface to read and create resources inside the Zeebe broker.

:::note
Accessing the Zeebe cluster directly using `kubectl port-forward` is recommended for development purposes.
:::

## Accessing web applications

To interact with Camunda Platform web applications like Operate, Tasklist, and Optimize, also `kubectl port-forward` will be used.

:::note
To use the web applications without Camunda Identity, you can set `global.identity.auth.enabled: false` in the values file to disable the authentication mechanism.
Do _not_ disable it if you like to use Web Modeler, as it requires Camunda Identity and Keycloak.
:::

First, port-forward for each application service:

```
kubectl port-forward svc/<RELEASE_NAME>-operate  8081:80

kubectl port-forward svc/<RELEASE_NAME>-tasklist 8082:80

kubectl port-forward svc/<RELEASE_NAME>-optimize 8083:80
```

To be able to use Web Modeler, create additional port-forwardings for Web Modeler itself and Keycloak (assuming that Keycloak is installed as part of the Helm release):

```
kubectl port-forward svc/<RELEASE_NAME>-web-modeler-webapp 8084:80

kubectl port-forward svc/<RELEASE_NAME>-web-modeler-websockets 8085:80

kubectl port-forward svc/<RELEASE_NAME>-keycloak 18080:80
```

:::note
The name of the Keycloak service will be truncated after 20 characters if Keycloak 16 is used, for example: `svc/long-release-name-ke`
:::

Finally, you can access each app pointing your browser at:

- Operate: [http://localhost:8081](http://localhost:8081)
- Tasklist: [http://localhost:8082](http://localhost:8082)
- Optimize: [http://localhost:8083](http://localhost:8083)
- Web Modeler: [http://localhost:8084](http://localhost:8084)

Log in to these services using the `demo`/`demo` credentials.

<details>
  <summary>Operate and Tasklist Login</summary>
  <div>
    <img src={require('../../assets/operate-tasklist-login.png').default}/>
  </div>
</details>
<details>
  <summary>Operate and Tasklist Dashboard</summary>
  <div>
    <img src={require('../../assets/operate-tasklist-dashboard.png').default}/>
  </div>
</details>

If you deploy process definitions, they will appear in the dashboard. Then, you can drill down to see your active instances.

You can deploy and create new instances using the Zeebe clients or `zbctl`.
