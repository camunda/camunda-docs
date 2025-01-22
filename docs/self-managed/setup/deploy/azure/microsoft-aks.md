---

id: microsoft-aks
title: "Microsoft AKS"
description: "Run Camunda 8 Self-Managed on Microsoft Azure's Kubernetes Service, leveraging its scalability and performance."
----------------------------------------------------------------------------------------------------------------------------------------------------------------------

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

Microsoft Azure Kubernetes Service ([Azure AKS](https://azure.microsoft.com/en-us/products/kubernetes-service/)) is a managed
container service to run and scale Kubernetes applications in the cloud.

Camunda 8 Self-Managed can be deployed on any Kubernetes cluster using [Helm charts](/self-managed/setup/install.md), like AKS. However, there are a few considerations to ensure a smooth deployment as described below.

## Guides

## AKS Cluster Specification

The AKS cluster specification depends on your needs and workloads. Here is a recommended starting configuration for running Camunda 8:

- Instance type: `Standard_D4as_v5` (4 vCPUs, 16 GiB Memory)
- Number of nodes: `4`
- Volume type: `Azure Premium SSD` or `Premium SSD v2`

## Load Balancer Set Up

Azure provides several options for load balancing. With the introduction of **Application Gateway for Containers**, Azure now offers a modern alternative to the older Application Gateway Ingress Controller (AGIC).

### Application Gateway for Containers

**Application Gateway for Containers** supports gRPC and HTTP/2 when implementing the `GRPCRoute` resource via the Kubernetes Gateway API. This makes it compatible with modern applications requiring these protocols. For configuration guidance, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/application-gateway/for-containers/grpc).

### Recommended Ingress Controller

For users who prefer a more traditional setup or do not wish to adopt Application Gateway for Containers:

- Deploy the [ingress-nginx controller](https://github.com/kubernetes/ingress-nginx), which supports `gRPC` and HTTP/2.
- Configure your ingress with annotations such as:
  ```yaml
  annotations:
    nginx.ingress.kubernetes.io/backend-protocol: "GRPC"
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
  ```
- Use [Cert-Manager](https://cert-manager.io/) or other certificate solutions to manage TLS for secure communication.

For more details on ingress configuration, see the [ingress-nginx documentation](https://kubernetes.github.io/ingress-nginx/).

## Pitfalls to Avoid

Refer to the [deployment troubleshooting guide](/self-managed/operational-guides/troubleshooting/troubleshooting.md) for common pitfalls.

### Storage Performance

Optimal storage performance is essential for running Camunda 8, particularly for components like Zeebe that use persistent volumes for data and logs. Azure Premium SSD is recommended for production workloads due to its consistent baseline performance of 3,000 IOPS and throughput up to 125 MB/s ([learn more](https://learn.microsoft.com/en-us/azure/virtual-machines/disks-types#premium-ssds)).

#### Premium SSD v2
Azure Premium SSD v2 offers higher performance with up to 80,000 IOPS and 1,200 MB/s throughput. However, consider the following limitations:

- **Regional Availability**: Limited to specific Azure regions ([check availability](https://learn.microsoft.com/en-us/azure/virtual-machines/disks-types#premium-ssd-v2-limitations)).
- **Attachment Restrictions**: Usable only with zonal VMs in Availability Zone regions.
- **Feature Support**: Lacks support for Azure Backup and some encryption options.

#### Recommendations
- Use Premium SSD v2 where available and appropriate for high I/O demands.
- In regions without Premium SSD v2, choose Premium SSD disks of at least 256 GB (P15) for sufficient IOPS.
- Ensure your `StorageClass` in Kubernetes aligns with the disk type by configuring `pvcStorageClassName` in the `values.yaml` file.

For more information, refer to [Azure disk types](https://learn.microsoft.com/en-us/azure/virtual-machines/disks-types).

### Unsupported Legacy Ingress

Do not use the legacy Application Gateway Ingress Controller (AGIC) for Zeebe/Zeebe Gateway, as it lacks gRPC support and is not being actively improved for these protocols. Instead, leverage Application Gateway for Containers or ingress-nginx as outlined above.

## Additional Resources

- [Camunda Platform Helm Chart Documentation](https://github.com/camunda/camunda-platform-helm)
- [Azure Kubernetes Service Documentation](https://learn.microsoft.com/en-us/azure/aks/)
- [Kubernetes Official Documentation](https://kubernetes.io/docs/)

---

This guide offers a starting point for deploying Camunda 8 on Azure AKS. For more detailed configurations and advanced setups, explore the linked resources.

