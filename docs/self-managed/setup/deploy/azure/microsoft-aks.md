---
id: microsoft-aks
title: "Microsoft AKS"
description: "Deploy Camunda 8 Self-Managed on Microsoft AKS, a managed container service to run and scale Kubernetes applications in the cloud or on-premises."
---

Microsoft Azure Kubernetes Service ([Microsoft AKS](https://azure.microsoft.com/en-us/products/kubernetes-service/))
is a managed container service to run and scale Kubernetes applications in the cloud or on-premises.

Camunda 8 Self-Managed can be deployed on any Kubernetes cluster using [Helm charts](/self-managed/setup/install.md), like AKS. However, there are a few pitfalls to avoid as described below.

## AKS cluster specification

Generally speaking, the AKS cluster specification depends on your needs and workloads.
Here is a recommended start to run Camunda 8:

- Instance type: `Standard_D4as_v4` (4 vCPUs, 16 GiB Memory)
- Number of nodes: `4`
- Volume type: `Premium SSD/Premium SSD v2`

## Pitfalls to avoid

For general deployment pitfalls, visit the [deployment troubleshooting guide](/self-managed/operational-guides/troubleshooting/troubleshooting.md).

### Volume performance

To have proper performance in Camunda 8, the persistent volumes attached to Zeebe should have around 1,000-3,000 IOPS. The `Premium SSD v2` volumes deliver a consistent baseline IOPS performance
of 3,000 IOPS. However, it has some [limitations](https://learn.microsoft.com/en-us/azure/virtual-machines/disks-types#premium-ssd-v2-limitations), including [lack of support in Azure Backup](https://learn.microsoft.com/en-us/azure/backup/disk-backup-support-matrix#limitations). Therefore, using `Premium SSD` could be the only option in many cases.
The `Premium SSD` volume could also be used, but its performance
[varies based on volume size](https://learn.microsoft.com/en-us/azure/virtual-machines/disks-types#premium-ssds).

It's recommended to use `Premium SSD v2` volume type, but only if `Premium SSD` type is available; persistent volumes
should use `Premium SSD` volumes of at least `256 GB` (P15).

### Zeebe Ingress

**Azure Application Gateway Ingress cannot be used as an Ingress for Zeebe/Zeebe Gateway** because Zeebe requires an Ingress controller that supports `gRPC`. You should use any other Ingress controller that supports `gRPC`, like the [ingress-nginx controller](https://github.com/kubernetes/ingress-nginx).

Currently, the Azure Application Gateway Ingress controller doesn't support `gRPC`. For more details, follow the upstream [GitHub issue about gRPC/HTTP2 support](https://github.com/Azure/application-gateway-kubernetes-ingress/issues/1015).
