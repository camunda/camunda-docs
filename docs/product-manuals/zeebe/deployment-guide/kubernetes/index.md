---
id: index
title: "Overview"
---

We recommend that you use Kubernetes when deploying Zeebe to production.

Zeebe needs to be deployed as a [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/), in order to preserve the identity of cluster nodes. StatefulSets require persistent storage, which needs to be allocated in advance. Depending on your cloud provider, the persistent storage will differ, as it is provider-specific.

In the [zeebe-kubernetes](https://github.com/zeebe-io/zeebe-kubernetes) repository you will find example Kubernetes manifests to configure a three broker cluster with the Elastic Search exporter and the Operate preview. Examples are provided for provisioning storage on Google Cloud Platform, and Microsoft Azure.

There are many ways that you can provision and configure a Kubernetes cluster. And there are a number of architectural choices you need to make: will your workers run in the Kubernetes cluster or external to it?

You will need to configure your Kubernetes cluster and modify this to suit the architecture you are building.

### Gateway

Zeebe gateway is deployed as a stateless service.

We support [Kubernetes startup and liveness probes](../operations/health.md#gateway) for Zeebe gateway.

## Helm Charts

![Zeebe on K8s](assets/zeebe-k8s-helm.png)

This section covers the fundamentals of how to run Zeebe in Kubernetes. There are several alternatives on how to deploy applications to a Kubernetes Cluster, but the following sections are using Helm charts to deploy a set of components into your cluster.

Helm allows you to choose exactly what chart (set of components) do you want to install and how these components needs to be configured. These Helm Charts are continuously being improved and released to the Official [Zeebe Helm Chart Repository http://helm.zeebe.io](http://helm.zeebe.io)

You are free to choose your Kubernetes provider, our Helm charts are not cloud provider specific and we encourage [reporting issues here](http://github.com/zeebe-io/zeebe-full-helm/issues) if you find them.

You can also join us in [Slack at: https://zeebe-slack-invite.herokuapp.com/](https://zeebe-slack-invite.herokuapp.com/)

This document is divided in the following sections:

- [Prerequisites](prerequisites.md)
- [Getting to know and Installing Zeebe Helm Charts](installing-helm.md)
- [Accessing Operate from outside our Kubernetes Cluster](accessing-operate.md)
