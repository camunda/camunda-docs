---
id: cloud-provider
title: "Choose a cloud provider"
sidebar_label: "Cloud provider"
description: "See which Camunda 8 Self-Managed reference architectures exist for each cloud provider, and where the layered deployment applies."
---

Choose the cloud provider first, because it decides which compute options and reference architectures exist. The layered deployment, where each layer is a separate Terraform root, exists for AWS.

## Compare the reference architectures

| Cloud provider            | Compute                  | Reference architectures                                                                                                                                                                                                                                                                                                   |
| ------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Amazon Web Services (AWS) | Amazon EKS               | [Single region](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/terraform-setup.md), [dual region](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region.md), and [multi-region with RDBMS](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/multi-region-rdbms.md). |
| Amazon Web Services (AWS) | Amazon ECS with Fargate  | [Single region](/self-managed/deployment/containers/cloud-providers/amazon/aws-ecs.md) and [dual region](/self-managed/deployment/containers/cloud-providers/amazon/aws-ecs-dual-region.md).                                                                                                                              |
| Amazon Web Services (AWS) | Amazon EC2               | [Manual deployment](/self-managed/deployment/manual/cloud-providers/amazon/aws-ec2.md) on virtual machines.                                                                                                                                                                                                               |
| Red Hat OpenShift on AWS  | OpenShift                | [Single region](/self-managed/deployment/helm/cloud-providers/amazon/openshift/terraform-setup.md) and [dual region](/self-managed/deployment/helm/cloud-providers/amazon/openshift/terraform-setup-dual-region.md).                                                                                                      |
| Microsoft Azure           | Azure Kubernetes Service | [Single region](/self-managed/deployment/helm/cloud-providers/azure/microsoft-aks/terraform-setup.md).                                                                                                                                                                                                                    |
| Google Cloud              | Google Kubernetes Engine | [Deploy to GKE](/self-managed/deployment/helm/cloud-providers/gcp/google-gke.md).                                                                                                                                                                                                                                         |

The same Camunda components run in every option. What differs is the compute, the managed services around it, and how many regions the reference architecture covers. For the Kubernetes and container families, see the [Kubernetes](/self-managed/reference-architecture/kubernetes.md) and [container](/self-managed/reference-architecture/containers.md) overviews.

## Decide with the layers in mind

A layered deployment splits the installation into network, compute, secondary storage, object storage, exposure, identity, and Camunda configuration. The provider decides what each layer is made of:

| Layer             | On AWS                                                          |
| ----------------- | --------------------------------------------------------------- |
| Network           | A VPC with private and public subnets                           |
| Compute           | An Amazon ECS cluster, or an Amazon EKS cluster                 |
| Secondary storage | Aurora PostgreSQL, or Amazon OpenSearch Service                 |
| Object storage    | Amazon S3 buckets                                               |
| Exposure          | Application and Network Load Balancers, AWS Certificate Manager |

The layered Terraform in the [reference repository](https://github.com/camunda/camunda-deployment-references/tree/main/aws/containers/ecs-layered) implements these layers for AWS. On another cloud provider, use the single-stack reference architecture in the table above.

## Prepare your AWS account

Before you apply the first layer, check these items:

1. Pick two regions if you plan to grow. Keep the regions that your organization reserves for tests out of your plan.
1. Check the service quotas in each region for VPCs, Elastic IP addresses, NAT gateways, load balancers, and Aurora clusters.
1. Create an S3 bucket and a prefix for the Terraform state of the layers.
1. Sign in with permissions for the services that the layers create: ECS, IAM, EC2 and VPC, Elastic Load Balancing, KMS, CloudWatch Logs, RDS, S3, and Secrets Manager.

## Next steps

- [Bring your own VPC](./network-bring-your-own-vpc.md)
- [Choose between Amazon EKS and Amazon ECS](./compute-eks-vs-ecs.md)
- [Choose the secondary storage](./secondary-storage.md)
