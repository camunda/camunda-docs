---
id: microsoft-aks
title: "Microsoft AKS"
description: "Deploy Camunda 8 Self-Managed on Microsoft AKS, a managed container service to run and scale Kubernetes applications in the cloud or on-premises."
---

Microsoft Azure Kubernetes Service ([Microsoft AKS](https://azure.microsoft.com/en-us/products/kubernetes-service/))
is a managed container service to run and scale Kubernetes applications in the cloud or on-premises.

Camunda 8 Self-Managed can be deployed on any Kubernetes cluster using [Helm charts](../deploy.md), like AKS. However, there are a few pitfalls to avoid as described below.

## AKS cluster specification

Generally speaking, the AKS cluster specification depends on your needs and workloads.
Here is a recommended start to run Camunda 8:

- Instance type: `Standard_D4as_v4` (4 vCPUs, 16 GiB Memory)
- Number of nodes: `4`
- Volume type: `Premium SSD v2`

## Pitfalls to avoid

For general deployment pitfalls, visit the [deployment troubleshooting guide](../../troubleshooting.md).

### Volume performance

To have proper performance in Camunda 8, the persistent volumes attached to Zeebe should have around 1,000-3,000 IOPS. The `Premium SSD v2` volumes deliver a consistent baseline IOPS performance
of 3,000 IOPS and is the recommended choice due to their cost-effectiveness.

Older disk options at Azure like `Premium SSD` and `Standard SSD` scale their performance by increasing disk size, and may result in unused disk space and a higher monthly cost to satisfy the base performance requirements. While they are capable of temporarily increasing their performance, this may not be sufficient to your use case and may negatively impact your experience with Camunda 8.

#### Example

| **Disk Type**      | **Size (GB)** | **IOPS (Temporary Burst)** | **Price/month** | **Price/GB** |
| ------------------ | ------------- | -------------------------- | --------------- | ------------ |
| Premium SSD (P15)  | 256           | 1,100 (3,500)              | $34.56          | $0.135       |
| Standard SSD (E30) | 1,000         | 500 (1,000)                | $76.80          | $0.0768      |
| Premium SSD v2     | 256           | 3,000                      | $20.74          | $0.081       |

For an overview and pricing for your particular region, see the [Azure pricing calculator](https://azure.microsoft.com/en-us/pricing/details/managed-disks).

### Zeebe Ingress

**Azure Application Gateway Ingress cannot be used as an Ingress for Zeebe/Zeebe Gateway** because Zeebe requires an Ingress controller that supports `gRPC`. You should use any other Ingress controller that supports `gRPC`, like the [ingress-nginx controller](https://github.com/kubernetes/ingress-nginx).

Currently, the Azure Application Gateway Ingress controller doesn't support `gRPC`. For more details, follow the upstream [GitHub issue about gRPC/HTTP2 support](https://github.com/Azure/application-gateway-kubernetes-ingress/issues/1015).
