---
id: microsoft-aks
title: "Microsoft AKS"
description: "Deploy Camunda Platform 8 Self-Managed on Microsoft AKS"
---

Microsoft Azure Kubernetes Service ([Microsoft AKS](https://azure.microsoft.com/en-us/products/kubernetes-service/))
is a managed container service to run and scale Kubernetes applications in the cloud or on-premises.

Camunda Platform 8 Self-Managed can be deployed on AKS like any Kubernetes cluster using [Helm charts](../deploy.md). However, there are a few pitfalls to avoid as described below.

## AKS cluster specification

Generally speaking, the AKS cluster specification depends on your needs and workloads.
Here is a recommended start to run Camunda Platform 8:

- Instance type: `Standard_D4as_v4` (4 vCPUs, 16 GiB Memory)
- Number of nodes: `4`
- Volume type: `Premium SSD/Premium SSD v2`

## Pitfalls to avoid

For general deployment pitfalls, visit the [deployment troubleshooting guide](../../troubleshooting.md).

### Volume performance

To have proper performance in Camunda Platform 8, the AKS cluster nodes should use volumes
with around 1,000-3,000 IOPS. The `Premium SSD v2` volumes deliver a consistent baseline IOPS performance
of 3,000 IOPS. However, it has some [limitations](https://learn.microsoft.com/en-us/azure/virtual-machines/disks-types#premium-ssd-v2-limitations), so using `Premium SSD` could be the only option in many cases.
The `Premium SSD` volume could also be used, but its performance
[varies based on volume size](https://learn.microsoft.com/en-us/azure/virtual-machines/disks-types#premium-ssds).

It's recommended to use `Premium SSD v2` volume type, but if only `Premium SSD` type is available, AKS cluster nodes
should use `Premium SSD` volumes of at least `256 GB` (P15).
