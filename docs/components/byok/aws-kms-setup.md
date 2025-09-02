---
id: aws-byok-setup
title: "AWS BYOK setup guide"
description: "Learn how to configure Bring Your Own Key (BYOK) for Camunda 8 SaaS using AWS KMS."
---

Learn how to configure Bring Your Own Key (BYOK) for Camunda 8 SaaS using AWS KMS.

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
- BYOK keys cannot be rotated automatically by Camunda 8.8; any rotation must be done manually in AWS KMS.
- Make sure the key policy grants your Camunda cluster the required access.
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

After creation, the Console will display a **unique Camunda Cluster IAM role ARN**. You will use this in the next step when configuring your KMS key.

## Step 2: Create and configure a KMS key in AWS

Follow these steps in your AWS account:

1. Open the **AWS KMS console**.
2. Click **Create key**.
3. Choose **Symmetric** key type.
4. Select **Region** matching your Camunda cluster.
5. Click **Next: Key administrators** and assign at least one administrator.
6. Click **Next: Key usage permissions**. Here, you need to grant your Camunda cluster role access.

### Example KMS key policy

Replace `<CAMUNDA_CLUSTER_ROLE_ARN>` with the IAM role ARN from Step 1:

```json
{
  "Sid": "Allow Camunda tenant IAM Role basic key access",
  "Effect": "Allow",
  "Principal": {
    "AWS": "arn:aws:iam::<camunda-accountId>:role/<tenant-IAM-role>"
  },
  "Action": [
    "kms:DescribeKey",
    "kms:GenerateDataKey*",
    "kms:Decrypt"
  ],
  "Resource": "*"
},
{
  "Sid": "Allow Camunda tenant IAM Role to create grants for provisioning encrypted EBS volumes",
  "Effect": "Allow",
  "Principal": {
    "AWS": "arn:aws:iam::<camunda-accountId>:role/<tenant-IAM-role>"
  },
  "Action": [
    "kms:CreateGrant"
  ],
  "Resource": "*"
}
```

:::warning Key policy warnings

- Ensure you do not restrict the Camunda cluster IAM role from any required KMS actions; otherwise encryption will fail.
- Keys must remain in the same region as your cluster.
- Any revocation of access will immediately break cluster encryption.

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
4. Confirm and apply the key. The Camunda Operator will provision storage using your BYOK key for:
   1. Document handling storage
   2. Backup storage
   3. Zeebe persistent disks
   4. Elasticsearch persistent disks

:::note Screenshot placeholder
[Insert screenshot showing KMS Key ARN input in cluster details]
:::

## Step 4: Verify encryption and logging

- AWS CloudTrail automatically logs all KMS operations.
- Verify that your cluster’s storage volumes are using the correct KMS key.
- Set up CloudWatch alerts for KMS key deletion or unauthorized access attempts.

:::warning Monitoring reminder
You are responsible for monitoring your key usage and access logs. Camunda will not track your AWS KMS logs in your account.
:::

## Additional considerations

- **Key rotation**: AWS supports manual rotation; Camunda 8.8 does not automatically rotate customer keys.
- **Cost implications**: You are responsible for all KMS charges, including API calls, storage, and logging.
- **Failure scenarios**: If the key is deleted or permissions revoked, cluster data will become inaccessible until the issue is resolved.

:::note Reference
For more information, see the [AWS KMS Documentation](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html?).
:::
