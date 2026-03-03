---
id: secure-connectivity-console-setup
title: Enable secure connectivity
description: Configure AWS PrivateLink connectivity for a Camunda 8 SaaS Orchestration cluster in Console.
---

# Enable secure connectivity for a cluster

This guide explains how to enable secure connectivity (AWS PrivateLink) for an AWS-hosted Camunda 8 SaaS Orchestration cluster.

Secure connectivity must be enabled per cluster.

For a conceptual overview, see [secure connectivity (AWS PrivateLink)](./index.md).

## Prerequisites

Before enabling secure connectivity:

- The cluster must be hosted in AWS.
- The cluster must be version 8.8 or later.
- You must have sufficient permissions to manage clusters in Console.
- You must know the AWS account IDs or ARNs that should be allowed to connect.
- Your organization must be on an Enterprise plan.

On the AWS side, you must have:

- An existing AWS VPC.
- Permission to create VPC interface endpoints.
- Appropriate security group configuration.

For AWS configuration details, see the AWS PrivateLink documentation.

## Enable secure connectivity for a cluster

1. Navigate to **Console → Clusters**.
2. Select the cluster.
3. Open the **Private networking** tab. The **Private networking** tab is available only for clusters hosted in AWS. It is not displayed for clusters hosted in other cloud providers.
4. Select **Activate PrivateLink endpoint service**.

### Step 1: Allowed principals

1. In **Principal ARN**, enter the ARN of an AWS principal that should be allowed to connect.
2. Select **Add principal**.
3. Repeat for additional principals as needed.
4. Select **Next**.

### Step 2: Supported regions

1. Review the cluster’s AWS region (pre-selected).
2. Optionally add additional regions to allow cross-region endpoint connections.
3. Select **Activate service**.

After activation, Console provisions a VPC endpoint service for the cluster and displays the connection details.

## Validation and activation requirements

When activating the PrivateLink endpoint service:

- At least one valid AWS principal ARN must be provided.
- Principal ARNs must follow a valid AWS ARN format.
- At least one supported region must be configured.
- The cluster’s AWS region is preselected by default.

You cannot activate the service until all required fields are completed.

## Activation behavior

After selecting **Activate service**, Console provisions the VPC endpoint service for the cluster.

The service status is displayed in the **Service details** section. Provisioning may take several minutes.

During provisioning, the endpoint service is not available for new VPC endpoint connections.

## Manage allowed principals and regions

After activation, you can modify the configuration from the **Private networking** tab.

In the **Service details** section:

- Select the edit icon next to **Allowed principals** to add or remove AWS principal ARNs.
- Select the edit icon next to **Supported regions** to add or remove regions.

Changes apply to new VPC endpoint connection attempts.

Removing a previously allowed principal does not invalidate existing VPC endpoint connections.

### Endpoint connection approval

VPC endpoint connections are automatically approved when the AWS principal creating the interface endpoint is included in the **Allowed principals** list.

Manual approval of endpoint connections is not required.

### Removing supported regions

Removing a supported region does not affect existing VPC endpoint connections that were created using that region.

Existing endpoint connections remain available.

## View connection details

After activation, the **Private networking** tab displays the **Service details** section.

This section shows:

- **Status** (for example, Ready).
- **Service name** (VPC endpoint service name).
- **Service region**.
- **Service type** (Interface).
- **Private DNS name**.
- **Allowed principals**.
- **Supported regions**.

To connect from AWS, select **Create interface VPC endpoint connections in AWS** and use the service name when creating a VPC interface endpoint.

The **Endpoint connections** section lists VPC interface endpoint connections created in AWS that target this cluster’s VPC endpoint service.

For each connection, Console displays:

- The VPC endpoint identifier
- The connection status (for example, Pending or Available)

New endpoint connections appear in this section after they are created in AWS.

## Deactivate secure connectivity

In the **Private networking** tab, select **Deactivate service** to remove the VPC endpoint service for the cluster.

Public connectivity remains available.

## Create a VPC interface endpoint in AWS

After activating the PrivateLink endpoint service in Console:

1. Copy the **Service name** from the **Service details** section.
2. In your AWS account, create a VPC **Interface endpoint** that connects to this service.
3. Configure subnets, security groups, and optional private DNS according to your AWS requirements.

AWS-side provisioning must follow the standard AWS PrivateLink process.

For detailed instructions, see the [AWS documentation on configuring a VPC endpoint service](https://docs.aws.amazon.com/vpc/latest/privatelink/configure-endpoint-service.html).

## View-only access

If you do not have permission to manage private networking for a cluster:

- The **Activate PrivateLink endpoint service** button is not displayed.
- The **Deactivate service** option is not displayed.
- Edit options for **Allowed principals** and **Supported regions** are hidden.

You can still view the **Service details** and **Endpoint connections** sections.

## Limits

You can create up to 10 VPC endpoint connections per cluster.

For organization-wide limits and adjustments, see [secure connectivity (AWS PrivateLink)](./index.md).
