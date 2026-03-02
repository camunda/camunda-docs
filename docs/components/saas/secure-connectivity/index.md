---
id: secure-connectivity-AWS
title: Secure connectivity (AWS PrivateLink)
description: Connect to Camunda 8 SaaS Orchestration clusters from your AWS VPC using AWS PrivateLink.
---

# Secure connectivity (AWS PrivateLink)

Secure connectivity allows you to connect to Camunda 8 SaaS Orchestration clusters from your AWS Virtual Private Cloud (VPC) using AWS PrivateLink.

When enabled, inbound traffic from your AWS VPC to a cluster is routed over private AWS networking rather than the public internet.

Secure connectivity:

- Applies per cluster.
- Is available only for AWS-hosted Orchestration clusters.
- Supports inbound connectivity only.
- Adds a private connectivity path. Public endpoints remain enabled in 8.9.

<!-- TODO: Confirm whether Secure connectivity is Enterprise-only at GA and add availability statement here. -->

## How it works

When you enable Secure connectivity for a cluster:

- Camunda provisions a VPC endpoint service for that cluster in the cluster’s AWS region.
- You create one or more VPC interface endpoints in your AWS account that connect to the endpoint service.
- Traffic from resources in your VPC (for example, job workers or inbound connectors) is routed privately to the cluster.

Each cluster has its own VPC endpoint service and dedicated networking components. Access to the cluster gateway is restricted to the cluster’s Kubernetes namespace.

Secure connectivity relies on standard AWS PrivateLink functionality. For an overview of AWS PrivateLink concepts and terminology, see [the AWS documentation](https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html).

## Connect from your AWS VPC via PrivateLink

At a high level:

1. Enable Secure connectivity for a cluster in Console.
2. Review the VPC endpoint service details provided by Camunda.
3. Create one or more VPC interface endpoints in your AWS account.
4. Configure appropriate security groups and optional private DNS.
5. Test connectivity from resources inside your VPC.

Camunda owns and operates:

- The VPC endpoint service.
- The cluster-side load balancer and ingress configuration.

You own and manage:

- Your AWS VPC.
- VPC interface endpoints.
- Security groups.
- Routing and DNS configuration.
- AWS permissions and quotas.

For step-by-step Console instructions, see [Enable Secure connectivity for a cluster](/console-setup.md).

## Security and isolation

Secure connectivity restricts private access to your cluster using AWS PrivateLink and an allowlist of AWS principals.

When enabling Secure connectivity, you define one or more allowed AWS principals (AWS account IDs or ARNs). Only those principals can create VPC endpoints that connect to your cluster’s endpoint service.

Requests from AWS accounts that are not explicitly allowed cannot establish a PrivateLink connection.

For each cluster:

- A separate VPC endpoint service is provisioned.
- Cluster-specific networking components are provisioned. Private connectivity does not share entry components across clusters.
- The cluster gateway is restricted to its Kubernetes namespace.

Traffic between your VPC and the Camunda ingress endpoint is encrypted in transit using TLS. TLS terminates at the cluster’s API gateway layer.

Traffic within the cluster follows the same model as public connectivity.

## Limits

The following limits apply:

- Up to 10 VPC endpoint connections per organization (adjustable on request).
- Up to 10 VPC endpoint connections per cluster.

Contact Camunda support if you require higher limits.

## Supported connectivity modes (8.9)

In 8.9, the following combinations are supported:

| Private connectivity | Public connectivity | Supported |
| -------------------- | ------------------- | --------- |
| Disabled             | Enabled             | Yes       |
| Enabled              | Enabled             | Yes       |
| Enabled              | Disabled            | No        |

Private-only connectivity is not supported in 8.9.

## What Secure connectivity does not change

Secure connectivity:

- Does not change data location or backup regions.
- Does not affect encryption at rest or key management.
- Does not provide outbound private connectivity from Camunda to your services.
- Does not replace IP allowlists or other access control features.

Secure connectivity changes only the network path used for inbound connections from your AWS VPC.
