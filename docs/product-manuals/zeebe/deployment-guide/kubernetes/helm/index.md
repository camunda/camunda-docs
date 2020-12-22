---
id: index
title: "Helm Charts"
sidebar_label: "Overview"
---

![Zeebe on K8s](assets/zeebe-k8s-helm.png)

This section covers the fundamentals of how to run Zeebe in Kubernetes. There are several alternatives on how to deploy applications to a Kubernetes Cluster, but the following sections are using Helm charts to deploy a set of components into your cluster.

Helm allows you to choose exactly what chart (set of components) do you want to install and how these components needs to be configured. These Helm Charts are continuously being improved and released to the [Zeebe Helm Chart Repository](http://helm.zeebe.io)

You are free to choose your Kubernetes provider, our Helm charts are not cloud provider specific and we encourage [reporting issues here](http://github.com/zeebe-io/zeebe-full-helm/issues) if you find them.

You can also join us in [Slack at: https://zeebe-slack-invite.herokuapp.com/](https://zeebe-slack-invite.herokuapp.com/)

This chapter is divided in the following sections:

- [Prerequisites](prerequisites.md)
- [Getting to know and Installing Zeebe Helm Charts](installing-helm.md)
- [Accessing Operate from outside our Kubernetes Cluster](accessing-operate.md)
