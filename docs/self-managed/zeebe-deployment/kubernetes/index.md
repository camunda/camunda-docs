---
id: index
title: "Kubernetes deployment"
sidebar_label: "Overview"
---

We recommend you use Kubernetes when deploying Zeebe to production.

## Deployment options

| Option                                                      | Comment                                                                                                                                                                                     |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Helm](helm/index.md)                                       | Helm allows you to choose exactly what chart (set of components) you want to install and how these components need to be configured.                                                    |

## General information

### Broker

Zeebe broker nodes need to be deployed as a [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) to preserve the identity of cluster nodes. StatefulSets require persistent storage, which must be allocated in advance. Depending on your cloud provider, the persistent storage differs as it is provider-specific.

At [helm.camunda.io](https://helm.camunda.io/), you'll find helm charts to configure a 3-broker cluster with the Elasticsearch exporter and Operate.

There are many ways you can provision and configure a Kubernetes cluster, and there are a number of architectural choices you need to make: will your workers run in the Kubernetes cluster or external to it?

You will need to configure your Kubernetes cluster and modify this to suit the architecture you are building.

### Gateway

Zeebe gateway is deployed as a stateless service.

We support [Kubernetes startup and liveness probes](../operations/health.md#gateway) for Zeebe gateway.
