---
id: aws-external-encryption-setup
title: "Encryption at rest using external encryption keys"
description: "Learn how to configure Camunda 8 SaaS using external Amazon encryption keys."
---

Learn how to configure external encryption for Camunda 8 SaaS using **Amazon KMS**.

## Prerequisites

Before you begin, make sure you have:

| Requirement           | Description                                                                |
| --------------------- | -------------------------------------------------------------------------- |
| Amazon account        | Access to an Amazon account with KMS permissions.                          |
| KMS permissions       | Ability to create and manage KMS keys and attach policies.                 |
| Cluster region        | KMS key must reside in the same Amazon region as your Camunda 8.8 cluster. |
| Technical familiarity | Some experience with Amazon console, IAM roles, and KMS is recommended.    |

:::warning Important
- Deleting or disabling your KMS key will make your cluster and data inaccessible.
- Key management is performed fully on the customer side in Amazon KMS. Camunda cannot rotate your encryption keys.
:::

## Step 1: Create a Camunda 8 SaaS cluster

1. Sign in to the [Camunda Console](https://console.camunda.io/).
2. Navigate to the **Cluster** section and click **Create New Cluster**.
3. For **Region**, select an Amazon region where you want your cluster deployed.
4. If desired, choose **Single region** or **Dual region**.  
   - For **Dual region**, your key setup will require multi-Region keys in AWS.
5. Under **Encryption at rest**, choose **External**.
6. Click **Create cluster**.

:::note
[Insert screenshot of cluster creation page with "External" encryption selected]
:::

After creation, the Console displays an **Amazon Role ARN** unique to your Camunda cluster. You will use this in the next step when configuring your KMS key.

## Step 2: Create and configure a KMS key in Amazon

Follow these steps in your Amazon account:

1. Open the **Amazon KMS console**.
2. Click **Create key**.
3. Choose **Symmetric** key type.
4. Select the **Region** matching your Camunda cluster.  
   - For **Dual region**, create the key as a **multi-Region** key and ensure replication in the same secondary region as the cluster.
5. Click **Next: Key administrators** and assign at least one administrator.
6. Click **Next: Key usage permissions**. Grant your Camunda cluster Amazon Role access.

### Example KMS key policy

Replace `<your-cluster-role-arn>` with the Amazon Role ARN from Step 1:

```json
{
  "Sid": "Allow Camunda Cluster Amazon Role basic key access",
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
  "Sid": "Allow Camunda Cluster Amazon Role to create grants for provisioning encrypted EBS volumes",
  "Effect": "Allow",
  "Principal": {
    "AWS": "<your-cluster-role-arn>"
  },
  "Action": [
    "kms:CreateGrant"
  ],
  "Resource": "*"
}
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Enable IAM user permissions",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::<customer-aws-account>:root"
      },
      "Action": "kms:*",
      "Resource": "*"
    },
    {
      "Sid": "Allow Camunda tenant IAM Role basic key access",
      "Effect": "Allow",
      "Principal": {
        "AWS": "<tenant-role-arn>"
      },
      "Action": [
        "kms:Encrypt",
        "kms:Decrypt",
        "kms:ReEncrypt*",
        "kms:DescribeKey",
        "kms:GenerateDataKey*"
      ],
      "Resource": "*"
    },
    {
      "Sid": "Allow Camunda tenant IAM Role to create grants for provisioning encrypted EBS volumes",
      "Effect": "Allow",
      "Principal": {
        "AWS": "<tenant-role-arn>"
      },
      "Action": [
        "kms:CreateGrant",
        "kms:ListGrants",
        "kms:RevokeGrant"
      ],
      "Resource": "*"
    }
  ]
}
```

:::warning Key policy guidance
- Ensure you do not restrict the Camunda cluster Amazon Role from required KMS actions; otherwise, encryption will fail.
- For dual region clusters, replicate keys in the correct secondary region.
- After a key is created, core details cannot be modified. However, replication in additional regions is always possible later.
- Any revocation of access immediately breaks the Camunda cluster.
:::

7. Click **Finish** to create the key.
8. Copy the **Key ARN**; you will need it in the Camunda Console.

:::note
[Insert screenshot of Amazon KMS key details showing Key ARN]
:::

## Step 3: Associate KMS key with Camunda cluster

1. Return to the Camunda Console.
2. On the cluster details page, locate the **KMS Key ARN** input field.  
   - For **Dual region**, two fields will be available—enter the correct key for each region.
3. Paste your Amazon KMS Key ARN(s) from Step 2.
4. Confirm and apply the key. The Camunda Operator provisions storage using your key for:
   - Document handling storage
   - Backup storage
   - Orchestration cluster persistent disks
   - Elasticsearch persistent disks

:::note
[Insert screenshot showing KMS Key ARN input in cluster details]
:::

## Step 4: Verify encryption and logging

After associating your Amazon KMS key with the Camunda cluster, follow these steps to ensure encryption is correctly applied and operations are logged.

### Verify encryption

- In the Camunda Console, check the cluster details page to confirm that the **KMS Key ARN** is correctly applied.
- Verify that all cluster storage volumes are encrypted with the configured key:
  - Document handling storage
  - Backup storage
  - Orchestration cluster persistent disks
  - Elasticsearch persistent disks
- If needed, check the encryption status directly in the underlying storage service (e.g., Amazon EBS, S3, or Elasticsearch).

### Monitor KMS usage

- **Amazon CloudTrail** automatically logs all KMS operations, including key usage (`Encrypt`, `Decrypt`, `GenerateDataKey`).
- Use **Amazon CloudWatch** to create alarms for:
  - Key deletion or disabling
  - Unauthorized access attempts
- Regularly review logs to ensure your cluster uses the correct KMS key and no unauthorized operations occur.

:::warning Monitoring reminder
You are responsible for monitoring key usage and access logs. Use CloudTrail and CloudWatch to detect misconfigurations or unauthorized access.
:::

## Additional considerations

- **Key rotation**: Amazon KMS owns the key lifecycle. Customers can enable [automatic rotation](https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html) or manage rotation procedures externally. Camunda does not control this process.
- **Cost implications**: Using Amazon KMS keys incurs storage and management charges in your Amazon account. See the [Camunda pricing model](./cost-and-troubleshooting.md) for details.
- **Failure scenarios**: If the key is deleted or permissions revoked, cluster data becomes inaccessible. See [troubleshooting steps](./cost-and-troubleshooting.md) for guidance on resolving access issues.

:::note Reference
For more information, see the [Amazon KMS documentation](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html).
:::
