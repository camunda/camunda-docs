---
id: accessing-operate-tasklist
title: "Accessing Operate and Tasklist outside the cluster"
---

The **Camunda Cloud Helm charts** install an ingress controller. If this is deployed in a cloud provider (GKE, EKS, AKS, etc.),
it should provision a `LoadBalancer` which will expose an external IP that can be used as the main entry point to access all the 
services/applications that are configured to have Ingress Routes.

To interact with the services inside the cluster, use `port-forward` to route traffic from your environment to the cluster.
```
> kubectl port-forward svc/<RELEASE NAME>-zeebe-gateway 26500:26500
```

Now, you can connect and execute operations against your newly-created Camunda-Cloud cluster.

:::note
Notice that you need to keep `port-forward` running to communicate with the remote cluster.
:::

:::note
Notice that accessing directly to the Zeebe cluster using `kubectl port-forward` is recommended for development purposes. By default, the Zeebe Helm charts are not exposing the Zeebe cluster via ingress. If you want to use `zbctl` or a local client/worker from outside the Kubernetes cluster, rely on `kubectl port-forward` to the Zeebe cluster to communicate.
:::



You can find the external IP by running the following:

```
> kubectl get svc
```

You should see something like the following:

```
NAME                                    TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)                                  AGE
<RELEASE NAME>-ingress-nginx-controller        LoadBalancer   10.109.108.4     <pending>     80:30497/TCP,443:32232/TCP               63m
```

The `<pending>` under the `EXTERNAL-IP` column should change to a public IP that you (and other users) should be able to access from outside the cluster. Check your cloud provider's specific configuration if that doesn't work.

Then, you should be able to access Operate pointing your browser at `http://<EXTERNAL-IP>`.

If you are running in Kubernetes KIND, you will need to `port-forward` to the ingress controller main entry point due KIND doesn't support LoadBalancers. You can do that by running in a different terminal:

```
> kubectl port-forward svc/zeebe-self-managed-zeebe-operate-helm 8080:80
> kubectl port-forward svc/zeebe-self-managed-zeebe-tasklist-helm 9090:80  
```

Then, you should be able to access Operate pointing your browser at [http://localhost:8080](http://localhost:8080/) and Tasklist pointing at http://localhost:9090.

![Operate Login](assets/operate-login.png)

Using `demo`/`demo` for credentials.

![Operate Login](assets/operate-dashboard.png)

If you deploy process definitions, they will appear in the dashboard and then you can drill down to see your active instances. You can deploy and create new instances using the Zeebe clients or `zbctl`.
