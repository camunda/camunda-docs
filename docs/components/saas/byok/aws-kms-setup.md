---
id: aws-external-encryption-setup
title: "Encryption at rest using external encryption keys"
description: "Learn how to configure encryption at rest for a Camunda 8 SaaS Orchestration cluster using external Amazon encryption keys."
---

Learn how to configure encryption at rest for your Camunda 8 SaaS Orchestration cluster using Amazon KMS.

## Prerequisites

| Requirement           | Description                                                                |
| --------------------- | -------------------------------------------------------------------------- |
| Amazon account        | Access to an Amazon account with KMS permissions.                          |
| KMS permissions       | Ability to create and manage KMS keys and attach policies.                 |
| Cluster region        | KMS key must reside in the same Amazon region as your Camunda 8.8 cluster. |
| Technical familiarity | Some experience with Amazon console, IAM roles, and KMS is recommended.    |

:::warning Important

- Deleting or disabling your KMS key will make your cluster and data inaccessible.
- Key management is fully customer-side in Amazon KMS. Camunda cannot rotate keys.
  :::

## Step 1: Create a Camunda 8 SaaS Orchestration cluster

1. Sign in to the [Camunda Console](https://console.camunda.io/).
2. Navigate to the Cluster section and click Create New Cluster.
3. Select an Amazon region for your cluster.
4. Choose Single region or Dual region backup.
   - Dual region requires one key per region. Keys can be separate.
   - Full support for dual-region encryption is under discussion; confirm with your Camunda contact.
5. Under Encryption at rest, choose External.
6. Click Create cluster.

<!-- :::note
[Insert screenshot of cluster creation page with "External" encryption selected]
::: -->

After creation, note the Amazon Role ARN displayed in the Console for your cluster.

## Step 2: Create and configure a KMS key in Amazon

KMS keys can be created via CLI, CloudFormation templates, or manually.

### Manual creation steps

1. Open the Amazon KMS console and select the correct region.
2. Click Create key, choose Symmetric and Encrypt/Decrypt usage.
3. Assign key administrators (defaults to root if skipped).
4. Apply missing policy statements from the Camunda Console Manual key creation tab.

### KMS key policy

Replace `<tenant-role-arn>` with the Amazon Role ARN from Step 1, and `<customer-aws-account>` with your AWS account ID.

<details>
<summary>View sample key policy JSON</summary>

```json
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
      "Action": ["kms:CreateGrant", "kms:ListGrants", "kms:RevokeGrant"],
      "Resource": "*"
    }
  ]
}
```

:::warning Key policy guidance

- Don’t restrict the Camunda cluster Role from required KMS actions.
- Key rotation is managed in AWS KMS; Camunda cannot rotate keys.
- Revoking access immediately breaks the cluster.
  :::

7. Click Finish to create the key.
8. Copy the KMS Key ARN; you will need it in the Camunda Console.

<!-- :::note
[Insert screenshot of Amazon KMS key details showing Key ARN]
::: -->

## Step 3: Associate KMS key with your Camunda cluster

1. Return to the Camunda Console and locate the KMS Key ARN input field.
   - For dual region, two fields will be available—enter the correct key for each region.
2. Paste your Amazon KMS Key ARN(s) from Step 2.
3. Confirm and apply. Camunda provisions storage using your key for:
   - Document handling storage
   - Backup storage
   - Orchestration cluster persistent disks
   - Elasticsearch persistent disks

:::note
Once a key is applied, it cannot be edited or replaced—even if the key was invalid or encryption failed. To change keys, you must create a new cluster.
:::

<!-- :::note
[Insert screenshot showing KMS Key ARN input in cluster details]
::: -->

## Step 4: Verify encryption and logging

- In the Camunda Console, check the cluster details page to confirm that the KMS Key ARN is applied correctly.
- In AWS, verify key usage in the KMS console:
  1. Navigate to Customer managed keys.
  2. Select your key and view Key policy and Key usage tabs.
  3. Review Recent activity to confirm operations (Encrypt, Decrypt, GenerateDataKey).
- To confirm storage encryption:
  - Amazon EBS: check Encryption column in volumes list.
  - Amazon S3: confirm bucket encryption references your KMS key.
  - Elasticsearch: verify encryption in domain settings.

### Monitor KMS usage

- CloudTrail logs all KMS operations, including Encrypt, Decrypt, and GenerateDataKey.
- CloudWatch can trigger alarms for:
  - Key deletion or disabling
  - Unauthorized access attempts
  - Policy or grant modifications
- Regularly review CloudTrail and CloudWatch logs to ensure correct key usage and detect unauthorized activity.

:::warning Monitoring reminder
You are responsible for monitoring key usage and access logs within your AWS account. Use CloudTrail and CloudWatch to detect misconfigurations or unauthorized access.
:::

## Additional considerations

- Key rotation: Amazon KMS manages the key lifecycle. Enable [automatic rotation](https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html) or rotate manually. Camunda does not control this.
- Cost: Using Amazon KMS keys incurs storage and management charges in your Amazon account. See the [Camunda pricing model](/components/saas/byok/index.md#cost-implications).
- Failure scenarios: Deleting keys or revoking permissions makes cluster data inaccessible. See [troubleshooting steps](/components/saas/byok/faq-and-troubleshooting.md#troubleshooting-external-encryption-keys) for recovery guidance.

:::note Reference
For more information, see the [Amazon KMS documentation](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html).
:::
