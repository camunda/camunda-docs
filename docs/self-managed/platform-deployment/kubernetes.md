---
id: kubernetes
title: "Kubernetes"
sidebar_label: "Overview"
---

We recommend you to use Kubernetes when deploying Camunda 8 to production self-managed.

## General information

**Zeebe broker nodes** need to be deployed as a [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)
to preserve the identity of cluster nodes. StatefulSets require persistent storage, which must be allocated in advance. Depending on your
cloud provider, the persistent storage differs as it is provider-specific.

At [helm.camunda.io](https://helm.camunda.io/), you'll find a Helm chart to configure a three-broker cluster with two Elasticsearch instances, Operate, two Zeebe Gateways and Tasklist. This size is comparable with the Production-S cluster plan in Camunda Platform 8 SaaS. It should be sufficient for 80% of use cases.

There are many ways you can provision and configure a Kubernetes cluster, and there are a number of architectural choices you need to make. Will your workers run in the Kubernetes cluster or external to it?

You will need to configure your Kubernetes cluster and modify this to suit the architecture you are building.

The **Zeebe gateway** is deployed as a stateless service.

We support [Kubernetes startup and liveness probes](../../zeebe-deployment/configuration/gateway-health-probes/) for Zeebe.

## Use Helm to install Camunda into Kubernetes

There are several alternatives to deploy applications to a Kubernetes cluster, but we recommend to use our provided Helm charts to deploy a set of components into your cluster. Helm allows you to choose exactly what chart (set of components) you want to install and how these components need to be configured.

Refer to the [documentation on Camunda's Helm charts](../kubernetes-helm/) for details.

To do do, you must have the following tools installed in your local environment:

- `kubectl`: Kubernetes Control CLI tool, installed and connected to your cluster
- `helm`: Kubernetes Helm CLI tool

## Supported Kubernetes environments

You can use your Kubernetes environment of choice, e.g.:

- [Kubernetes KIND](https://github.com/kubernetes-sigs/kind), Minikube, and MicroK8s for local development
- Remote cloud service for prod, like Google GKE, Azure AKS, Amazon EKS, etc.

:::note
Be aware that we only officially test the Google GKE environment.
:::

Optional tools related to Camunda Platform 8:

- Camunda Modeler: to model/modify business processes. Install Camunda Modeler [here](/components/modeler/desktop-modeler/install-the-modeler.md).
- Zeebe CTL(`zbctl`): command line tool to interact with a Zeebe cluster (local/remote). You can get the `zbctl` tool from the official
  [Zeebe release page](https://github.com/camunda-cloud/zeebe/releases).

## Accessing Camunda components from outside the Kubernetes cluster

To interact with the Camunda services inside a Kubernetes cluster, use `port-forward` to route traffic from your environment to the cluster.

```
> kubectl port-forward svc/<RELEASE NAME>-zeebe-gateway 26500:26500
```

Now, you can connect and execute operations against your new Zeebe cluster. This allows you to use `zbctl` as a command line interface to read and create resources inside the Zeebe broker. You can install `zbctl` via [npm](https://www.npmjs.com/package/zbctl).

:::note
Notice that you need to keep `port-forward` running to communicate with the remote cluster.
:::

Note that accessing the Zeebe cluster directly using `kubectl port-forward` is recommended for development purposes.

By default, the [Camunda Helm charts](../kubernetes-helm) are not exposing the Zeebe cluster via the ingress controller. If you want to use `zbctl` or a local client/worker from outside the Kubernetes cluster, rely on `kubectl port-forward` to the Zeebe cluster to communicate.

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
If **no ingress** is enabled (e.g. like in Kubernetes KIND), you will need to `port-forward`. In a different terminal, run the following:

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
