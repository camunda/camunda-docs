---
id: amazon-eks
title: "Amazon EKS"
description: "Deploy Camunda 8 Self-Managed on Amazon EKS"
---

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

Amazon Elastic Kubernetes Service ([Amazon EKS](https://aws.amazon.com/eks/)) is a managed
container service to run and scale Kubernetes applications in the cloud or on-premises.

Camunda 8 Self-Managed can be deployed on any Kubernetes cluster using [Helm charts](/self-managed/setup/install.md), like EKS. However, there are a few pitfalls to avoid as described below.

## Guides

<DocCardList queryString items={useCurrentSidebarCategory().items}/>

## EKS cluster specification

Generally speaking, the EKS cluster specification depends on your needs and workloads.
Here is a recommended start to run Camunda 8:

- Instance type: `m6i.xlarge` (4 vCPUs, 16 GiB Memory)
- Number of nodes: `4`
- Volume type: `SSD gp3`

:::caution
To use `SSD gp3` volume type on an EKS cluster, you need to install
[Amazon EBS CSI driver](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html).

The next step is to create a new
[StorageClass](https://docs.aws.amazon.com/eks/latest/userguide/storage-classes.html)
that uses the Amazon EBS `gp3` volume type. Then, use it cluster-wide as a default
`StorageClass` or set it in your values file under `zeebe.pvcStorageClassName`.

If you encounter issues with EBS CSI Driver, follow the instructions in the [helm-profiles repository](https://github.com/camunda-community-hub/camunda-8-helm-profiles/blob/main/aws/README.md#ebs-csi-driver-addon) maintained by the Camunda Consulting Team.
:::

## Load Balancer set up

AWS offers different types of Load Balancers (LB). Those namely being:

- Classic Load Balancer (CLB) - previous generation, unsupported by Camunda 8
- Network Load Balancer (NLB)
- Application Load Balancer (ALB)

Typically the NLB and ALB are used in production setups and the ones we're focusing on as CLB are not endorsed anymore and counted as previous generation LB.

The Zeebe Gateway requires [gRPC](https://grpc.io/) to work, which in itself requires http2 to be used. Additionally, it's recommended to secure the endpoint with [a TLS certificate](https://aws.amazon.com/what-is/ssl-certificate/).

Here the choice of LB is important as not every setup will work with every TLS termination. Typically, the NLB has to terminate the TLS within the ingress, while the ALB can terminate TLS within the LB, allowing the usage of the [AWS Certificate Manager (ACM)](https://aws.amazon.com/certificate-manager/).

The NLB will not work with the AWS Certificate Manager, as the ACM does not allow exporting the private key required to terminate the TLS within the ingress.

The Camunda 8 Helm chart primarily focuses on the [ingress-nginx controller](https://github.com/kubernetes/ingress-nginx) due to the usage of controller specific annotations. Using a different Ingress controller requires supplying the necessary equivalent annotation options, ensuring http2 is enabled, and gRPC is used for the Zeebe Gateway.

### Application Load Balancer (ALB)

To conclude for using the **Application Load Balancer** (ALB) to terminate TLS in the Load Balancer, the following is required:

- Deploy the [AWS Load Balancer Controller](https://kubernetes-sigs.github.io/aws-load-balancer-controller/).
- A [certificate set up](https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-request-public.html) in the AWS Certificate Manager (ACM).
- Follow the [example by AWS](https://github.com/kubernetes-sigs/aws-load-balancer-controller/blob/main/docs/examples/grpc_server.md) to configure the Ingress for the Zeebe Gateway. To summarize, add the following annotations to the Zeebe Gateway ingress:
  ```shell
  alb.ingress.kubernetes.io/ssl-redirect: '443'
  alb.ingress.kubernetes.io/backend-protocol-version: GRPC
  alb.ingress.kubernetes.io/listen-ports: '[{"HTTP": 80}, {"HTTPS":443}]'
  alb.ingress.kubernetes.io/scheme: internet-facing
  alb.ingress.kubernetes.io/target-type: ip
  ```
  - This does not require the configuration of the [TLS on the ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/#tls)
  - If the AWS Load Balancer Controller is correctly set up, it automatically pulls the correct certificate from ACM based on the host name.

### Network Load Balancer (NLB)

Alternatively, one can use a **Network Load Balancer** (NLB) to terminate TLS within the ingress. This requires the following:

- An Ingress controller, preferably [ingress-nginx](https://github.com/kubernetes/ingress-nginx) deployed.
  - The Ingress controller must support gRPC and http2.
- A certificate, preferably created with [Cert-Manager](https://cert-manager.io/).
- [TLS configured](https://kubernetes.io/docs/concepts/services-networking/ingress/#tls) on the Ingress object.

## Pitfalls to avoid

For general deployment pitfalls, visit the [deployment troubleshooting guide](/self-managed/operational-guides/troubleshooting/troubleshooting.md).

### Volume performance

To have proper performance in Camunda 8, the persistent volumes attached to Zeebe should have around 1,000-3,000 IOPS. The `gp3` volumes deliver a consistent baseline IOPS performance
of 3,000 IOPS. The `gp2` volumes could also be used, but `gp2` volume type performance
[varies based on volume size](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/general-purpose.html#gp2-performance).

It's recommended to use `gp3` volumes, but if only `gp2` type is available, persistent volumes
should use `gp2` volumes of at least 334 GB.
