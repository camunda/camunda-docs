---
id: index
title: "Helm charts"
sidebar_label: "Overview"
---

![Zeebe on K8s](assets/zeebe-k8s-helm.png)

This section covers the fundamentals of how to run Zeebe in Kubernetes. There are several alternatives on how to deploy applications to a Kubernetes cluster, but the following sections are using Helm charts to deploy a set of components into your cluster.

Helm allows you to choose exactly what chart (set of components) do you want to install and how these components needs to be configured. These Helm charts are continuously being improved and released to the [Zeebe Helm Chart Repository](http://helm.zeebe.io)

You are free to choose your Kubernetes provider, our Helm charts are not cloud provider specific and we encourage [reporting issues](http://github.com/zeebe-io/zeebe-full-helm/issues) if you find them.

You can also join us on [Slack](https://zeebe-slack-invite.herokuapp.com/).

This chapter is divided in the following sections:

- [Prerequisites](prerequisites.md)
- [Getting to know and installing Zeebe Helm charts](installing-helm.md)
- [Accessing Operate from outside our Kubernetes cluster](accessing-operate.md)
