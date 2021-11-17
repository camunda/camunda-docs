---
id: installing-helm
title: "Zeebe Helm Charts"
---

[Helm](https://github.com/helm/helm) is a package manager for Kubernetes resources. Helm allows us to install a set of components by simply referencing a package name, and allowing us to override configurations to accommodate these packages to different scenarios.

Helm also provides dependency management between charts, meaning that charts can depend on other charts. This allows us to aggregate a set of components together that can be installed with a single command. 

:::note
All Helm charts are provided as a community effort. These charts are not part of the Zeebe or Camunda Cloud release process. Therefore, these charts are not updated as regularly as other artifacts. You are encouraged to get involved, submit fixes, and report issues if you find them.
:::

The following Zeebe Helm charts are currently available, and all of them can be found in the [Camunda Cloud Helm repository](https://github.com/camunda-community-hub/camunda-cloud-helm):

- **Zeebe Cluster Helm (zeebe-cluster-helm)**: Deploys a Zeebe Cluster with three brokers using the `camunda/zeebe` docker image. This chart depends on Elasticsearch Helm chart and optionally on Kibana Helm chart. This chart source code can be located [here](https://github.com/camunda-community-hub/camunda-cloud-helm/tree/main/charts/zeebe-cluster-helm).
- **Zeebe Operate Helm (zeebe-operate-helm)**: Deploys Zeebe Operate, which connects to an existing Elasticsearch. This chart source code can be located [here](https://github.com/camunda-community-hub/camunda-cloud-helm/tree/main/charts/zeebe-operate-helm/).
- **Zeebe Full Helm (zeebe-full-helm)** (Parent): Deploys a Zeebe Cluster + Operate + Ingress Controller. This parent chart can be located [here](https://github.com/camunda-community-hub/camunda-cloud-helm/tree/main/charts/zeebe-full-helm/).
- **Zeebe TaskList Helm (zeebe-tasklist-helm)** (Experimental): Deploys a Tasklist component to work with user tasks. This chart source code can be located [here](https://github.com/camunda-community-hub/camunda-cloud-helm/tree/main/charts/zeebe-tasklist-helm/).
- **Zeebe ZeeQS Helm (zeebe-zeeqs-helm)** (Experimental): Deploys a ZeeQS component that provides a Graphql interface to consume Zeebe process data. This component requires the Hazelcast Exporter, configured in the Zeebe brokers. This chart source code can be located [here](https://github.com/camunda-community-hub/camunda-cloud-helm/tree/main/charts/zeebe-zeeqs-helm/).

![Charts](assets/zeebe-helm-charts.png)

When installing the `zeebe-full-helm` chart, all the components marked in green are installed. The remaining components can be enabled using the flags provided in the `zeebe-full-helm` chart documentation. 

### Add Zeebe Helm repository

The next step is to add the Zeebe Helm chart repository to your installation. Once this is done, Helm will be able to fetch and install charts hosted in [http://helm.camunda.io](http://helm.camunda.io).

```
> helm repo add zeebe https://helm.camunda.io
> helm repo update
```

Once this is complete, we are ready to install any of the Helm charts hosted in the official Zeebe Helm chart repo. 

### Install Zeebe full Helm chart (Zeebe Cluster + Operate + Ingress Controller)

In this section, we will install all the available Zeebe components inside a Kubernetes cluster. Notice that this Kubernetes cluster can have services which are already running; Zeebe is simply installed as another set of services. 

```
> helm install <RELEASE NAME> zeebe/zeebe-full-helm
```

:::note
Change &gt;RELEASE NAME&lt; with a name of your choice.
:::

:::note
Notice that you can add the `-n` flag to specify in which Kubernetes namespace the components should be installed.
:::

Installing all the components in a cluster requires all Docker images to be downloaded to the remote cluster. Depending on which Cloud provider you are using, the amount of time it will take to fetch all the images will vary. 

If you are using [Kubernetes KIND](https://github.com/kubernetes-sigs/kind), add `-f zeebe-dev-profile.yaml`. The `zeebe-dev-profile.yaml` file can be downloaded [here](https://github.com/camunda-community-hub/zeebe-helm-profiles/blob/master/zeebe-dev-profile.yaml).

```
helm install <RELEASE NAME> zeebe/zeebe-full-helm -f kind-values.yaml
```

This will deploy the same components, but with a set of parameters tailored to a local environment setup. 

:::note
All Docker images will be downloaded to your local KIND cluster, so it might take some time for the services to get started.
:::

You can check the progress of your deployment by checking if the Kubernetes PODs are up and running with the following:

```
> kubectl get pods
```

This will return something similar to the following:

```
NAME                                                   READY   STATUS    RESTARTS   AGE
elasticsearch-master-0                                 1/1     Running   0          4m6s
elasticsearch-master-1                                 1/1     Running   0          4m6s
elasticsearch-master-2                                 1/1     Running   0          4m6s
<RELEASE NAME>-ingress-nginx-controller                1/1     Running   0          4m6s
<RELEASE NAME>-zeebe-operate-helm                      1/1     Running   0          4m6s
<RELEASE NAME>-zeebe-0                                 1/1     Running   0          4m6s
<RELEASE NAME>-zeebe-1                                 1/1     Running   0          4m6s
<RELEASE NAME>-zeebe-2                                 1/1     Running   0          4m6s
<RELEASE NAME>-zeebe-tasklist-helm                     1/1     Running   0          4m6s
<RELEASE NAME>-zeebe-gateway                           1/1     Running   0          4m6s
```

Check that each pod has at least 1/1 running instances. You can always tail the logs of these pods by running the following:

```
> kubectl logs -f <POD NAME> 
```

To check on which port the services are running you can run the following command:
```
> kubectl get svc
```

To interact with the services inside the cluster, use `port-forward` to route traffic from your environment to the cluster.
```
> kubectl port-forward svc/<RELEASE NAME>-zeebe-gateway 26500:26500
```

Now, you can connect and execute operations against your newly-created Zeebe cluster. 

:::note
Notice that you need to keep `port-forward` running to communicate with the remote cluster.
:::

:::note
Notice that accessing directly to the Zeebe cluster using `kubectl port-forward` is recommended for development purposes. By default, the Zeebe Helm charts are not exposing the Zeebe cluster via ingress. If you want to use `zbctl` or a local client/worker from outside the Kubernetes cluster, rely on `kubectl port-forward` to the Zeebe cluster to communicate.
:::
