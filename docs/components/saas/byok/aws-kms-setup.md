---
id: aws-external-encryption-setup
title: "Encryption at rest using external encryption keys"
description: "Learn how to configure Camunda 8 SaaS using external AWS encryption keys."
---

Learn how to configure external encryption for Camunda 8 SaaS using AWS KMS.

## Prerequisites

Before you begin, make sure you have:

| Requirement           | Description                                                                 |
| --------------------- | --------------------------------------------------------------------------- |
| AWS account           | Access to an AWS account with KMS permissions.                              |
| KMS permissions       | Ability to create and manage KMS keys and attach policies.                  |
| Cluster region        | KMS key must be created in the same AWS region as your Camunda 8.8 cluster. |
| Technical familiarity | Some experience with AWS console, IAM roles, and KMS is recommended.        |

:::warning Important

- Deleting or disabling your KMS key will make your cluster and data inaccessible.
- Key management is performed fully on the customer side in AWS KMS. Camunda cannot rotate encryption keys.

:::

## Step 1: Create a Camunda 8 SaaS cluster

1. Sign in to the [Camunda Console](https://console.camunda.io/).
2. Navigate to the **Cluster** section and click **Create New Cluster**.
3. For **Region**, select an AWS region where you want your cluster deployed.
4. Under **Encryption at rest**, choose **External**.
5. Click **Create Cluster**.

:::note Screenshot placeholder
[Insert screenshot of cluster creation page with "External" encryption selected]
:::

After creation, the Console will display an **AWS Role ARN** that is unique to your Camunda Cluster. You will use this in the next step when configuring your KMS key.

## Step 2: Create and configure a KMS key in AWS

Follow these steps in your AWS account:

1. Open the **AWS KMS console**.
2. Click **Create key**.
3. Choose **Symmetric** key type.
4. Select the **Region** matching your Camunda cluster.
5. Click **Next: Key administrators** and assign at least one administrator.
6. Click **Next: Key usage permissions**. Here, you need to grant your Camunda cluster AWS Role access.

### Example KMS key policy

Replace `<your-cluster-role-arn>` with the AWS Role ARN from Step 1:

```json
{
  "Sid": "Allow Camunda Cluster AWS Role basic key access",
  "Effect": "Allow",
  "Principal": {
    "AWS": "<your-cluster-role-arn>"
  },
  "Action": [
    "kms:DescribeKey",
    "kms:GenerateDataKey*",
    "kms:Decrypt"
  ],
  "Resource": "*"
},
{
  "Sid": "Allow Camunda Cluster AWS Role to create grants for provisioning encrypted EBS volumes",
  "Effect": "Allow",
  "Principal": {
    "AWS": "<your-cluster-role-arn>"
  },
  "Action": [
    "kms:CreateGrant"
  ],
  "Resource": "*"
}
```

:::warning Key policy warnings

- Ensure you do not restrict the Camunda Cluster AWS Role from any required KMS actions; otherwise encryption will fail.
- Keys must remain in the same region as your cluster.
- Any revocation of access will immediately break the Camunda cluster.

:::

7. Click **Finish** to create the key.
8. Copy the **Key ARN**; you will need it in the Camunda Console.

:::note Screenshot placeholder
[Insert screenshot of AWS KMS key details showing Key ARN]
:::

## Step 3: Associate KMS key with Camunda cluster

1. Return to the Camunda Console.
2. In the cluster details page, locate the KMS Key ARN input field.
3. Paste your AWS KMS Key ARN from Step 2.
4. Confirm and apply the key. The Camunda Operator will provision storage using your key for:
   1. Document handling storage
   2. Backup storage
   3. Orchestration Cluster persistent disks
   4. Elasticsearch persistent disks

:::note Screenshot placeholder
[Insert screenshot showing KMS Key ARN input in cluster details]
:::

## Step 4: Verify encryption and logging

- AWS CloudTrail automatically logs all KMS operations.
- Set up CloudWatch alerts for KMS key deletion or unauthorized access attempts.
- Verify your cluster’s storage volumes are using the correct KMS key. This is possible, but not required.

:::warning Monitoring reminder
You are responsible for monitoring your key usage and access logs.
:::

## Additional considerations

- **Key rotation**: Amazon KMS owns the key lifecycle. Customers can enable [automatic rotation](https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html) or manage rotation procedures externally. Camunda does not control this process.
- **Cost implications**: Using AWS KMS keys incurs storage and management charges in your own AWS account. See the [Camunda pricing model](./cost-and-troubleshooting.md) for details.
- **Failure scenarios**: If the key is deleted or permissions revoked, cluster data will become inaccessible. See [troubleshooting steps](./cost-and-troubleshooting.md) for guidance on resolving access issues.

:::note Reference
For more information, see the [AWS KMS documentation](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html).
:::
