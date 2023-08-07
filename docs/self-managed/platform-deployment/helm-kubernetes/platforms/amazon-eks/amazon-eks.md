---
id: amazon-eks
title: "Amazon EKS"
description: "Deploy Camunda Platform 8 Self-Managed on Amazon EKS"
---

Amazon Elastic Kubernetes Service ([Amazon EKS](https://aws.amazon.com/eks/)) is a managed
container service to run and scale Kubernetes applications in the cloud or on-premises.

Camunda Platform 8 Self-Managed can be deployed on EKS like any Kubernetes cluster using [Helm charts](../../deploy.md). However, there are a few pitfalls to avoid as described below.

## EKS cluster specification

Generally speaking, the EKS cluster specification depends on your needs and workloads.
Here is a recommended start to run Camunda Platform 8:

- Instance type: `m5.xlarge` (4 vCPUs, 16 GiB Memory)
- Number of nodes: `4`
- Volume type: `SSD gp3`

:::caution
To use `SSD gp3` volume type on an EKS cluster, you need to install
[Amazon EBS CSI driver](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html).
If you are on 1.22 or an earlier cluster be sure to install this driver to your cluster before updating the cluster to 1.23 to avoid potential workload interruptions.

The next step is to create a new
[StorageClass](https://docs.aws.amazon.com/eks/latest/userguide/storage-classes.html)
that uses the Amazon EBS `gp3` volume type. Then, use it cluster-wide as a default
`StorageClass` or set it in your values file under `zeebe.pvcStorageClassName`.
:::

## Pitfalls to avoid

For general deployment pitfalls, visit the [deployment troubleshooting guide](../../../troubleshooting.md).

### Volume performance

To have proper performance in Camunda Platform 8, the EKS cluster nodes should use volumes
with around 1,000-3,000 IOPS. The `gp3` volumes deliver a consistent baseline IOPS performance
of 3,000 IOPS. The `gp2` volumes could also be used, but `gp2` volume type performance
[varies based on volume size](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/general-purpose.html#gp2-performance).

It's recommended to use `gp3` volumes, but if only `gp2` type is available, EKS cluster nodes
should use `gp2` volumes of at least 334 GB.

### Zeebe Ingress

Zeebe requires an Ingress controller that supports `gRPC`. Therefore, if you plan to use [AWS Load Balancer Controller](https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html) as an Ingress controller, ensure to review the official AWS guide to [deploy a gRPC-based application on an Amazon EKS cluster and access it with an Application Load Balancer](https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/deploy-a-grpc-based-application-on-an-amazon-eks-cluster-and-access-it-with-an-application-load-balancer.html).
