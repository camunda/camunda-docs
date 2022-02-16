---
id: accessing-operate-tasklist
title: "Accessing Operate and Tasklist outside the cluster"
description: "Let's take a closer look at how you can utilize Operate and Tasklist outside of your cluster."
---

The **Camunda Cloud Helm charts** install an ingress controller. If this is deployed in a cloud provider (GKE, EKS, AKS, etc.),
it should provision a `LoadBalancer` which will expose an external IP that can be used as the main entry point to access all the services and applications configured to have ingress routes.

To interact with the services inside the cluster, use `port-forward` to route traffic from your environment to the cluster.

```
> kubectl port-forward svc/<RELEASE NAME>-zeebe-gateway 26500:26500
```

Now, you can connect and execute operations against your new Camunda Cloud cluster. This allows you to use `zbctl` as a command line interface to read and create resources inside the Zeebe broker.

:::note
Notice that you need to keep `port-forward` running to communicate with the remote cluster.
:::

Note that accessing the Zeebe cluster directly using `kubectl port-forward` is recommended for development purposes. By default, the Camunda Cloud Helm charts are not exposing the Zeebe cluster via the ingress controller. If you want to use `zbctl` or a local client/worker from outside the Kubernetes cluster, rely on `kubectl port-forward` to the Zeebe cluster to communicate.

You can find the external IP by running the following:

```
> kubectl get svc
```

You should see something like the following:

```
NAME                               TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)                                  AGE
<RELEASE NAME>-zeebe-gateway       LoadBalancer   10.109.108.4     <pending>     80:30497/TCP,443:32232/TCP               63m
```

The `<pending>` under the `EXTERNAL-IP` column should change to a public IP that you (and other users) should be able to access from outside the cluster. Check your cloud provider's specific configuration if that does not work.

Then, you can access Operate pointing your browser at `http://<EXTERNAL-IP>`.

:::note
If you are running in **Kubernetes KIND**, you will need to `port-forward` to the ingress controller main entry point given KIND doesn't support load balancers. In a different terminal, run the following:
```
> kubectl port-forward svc/<RELEASE NAME>-operate 8080:80
> kubectl port-forward svc/<RELEASE NAME>-tasklist 9090:80  
```
:::

Then, you can access Operate pointing your browser at [http://localhost:8080](http://localhost:8080/), and Tasklist pointing at [http://localhost:9090](http://localhost:9090). Log in to these services using the `demo`/`demo` credentials.

<details>
  <summary>Operate and Tasklist Login</summary>
  <div>
    <img src={require('./assets/operate-tasklist-login.png').default}/>
  </div>
</details>
<details>
  <summary>Operate and Tasklist Login</summary>
  <div>
    <img src={require('./assets/operate-tasklist-dashboard.png').default}/>
  </div>
</details>

If you deploy process definitions, they will appear in the dashboard. Then, you can drill down to see your active instances.

You can deploy and create new instances using the Zeebe clients or `zbctl`.
