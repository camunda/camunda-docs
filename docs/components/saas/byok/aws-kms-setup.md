---
id: aws-external-encryption-setup
title: "Encryption at rest using external encryption keys"
description: "Learn how to configure encryption at rest for a Camunda 8 SaaS Orchestration cluster using external Amazon encryption keys."
---

Learn how to configure encryption at rest for your **Camunda 8 SaaS Orchestration cluster** using **Amazon KMS**.

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

## Step 1: Create a Camunda 8 SaaS Orchestration cluster

1. Sign in to the [Camunda Console](https://console.camunda.io/).
2. Navigate to the **Cluster** section and click **Create New Cluster**.
3. For **Region**, select an Amazon region where you want your cluster deployed.
4. If desired, choose **Single region** or **Dual region backup**.
   - For **Dual region backup**, you must create one key per region. The keys do not need to be replicated; they can be separate keys as long as they are in the correct regions.
   - Full support for dual-region encryption is still under discussion. Check with your Camunda contact for the latest status.
5. Under **Encryption at rest**, choose **External**.
6. Click **Create cluster**.

:::note
[Insert screenshot of cluster creation page with "External" encryption selected]
:::

After creation, the Console displays an **Amazon Role ARN** unique to your Camunda cluster. You will use this in the next step when configuring your KMS key.

## Step 2: Create and configure a KMS key in Amazon

You can create your KMS key in three ways:

- **CLI**: Use the CLI script template provided in the Console. Populate the script with your AWS access keys and variables; it will return the ARN you need to input in the Console.
- **AWS CloudFormation**: Use the provided templates.
  - _One-click deployment_: Launches with predefined parameters and prompts you to execute the CloudFormation stack.
  - _Manual deployment_: Download and apply the YAML templates yourself.
  - For **dual region**, note that one-click deployment requires sequential execution of two templates, where the second depends on outputs from the first.
- **Manual**: Use the procedure described below.

### Manual creation steps

1. Open the **Amazon KMS console**.
2. From the AWS console **Region selector** (top navigation bar), select the Region matching your Camunda cluster.
   - For dual region, select the correct region for each cluster region and create a key in each.
3. Click **Create key**.
4. Choose **Symmetric** key type and **Encrypt and decrypt** key usage.
5. Click **Next: Key administrators** and assign any required key administrators.
   - If skipped, the root account is applied by default.
6. Click **Next: Key usage permissions**. Compare and apply the missing policy statements provided in your Camunda cluster’s **encryption at rest** view within the **Manual key creation** tab.

### KMS key policy

Replace `<tenant-role-arn>` with the Amazon Role ARN from Step 1, and `<customer-aws-account>` with the AWS account ID where the KMS key is created:

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

- Ensure you do not restrict the Camunda cluster Amazon Role from required KMS actions; otherwise, encryption will fail.
- Key rotation must be managed in AWS KMS; Camunda cannot rotate your keys.
- Any revocation of access immediately breaks the Camunda cluster.
  :::

7. Click **Finish** to create the key.
8. Copy the **KMS Key ARN**; you will need it in the Camunda Console.

:::note
[Insert screenshot of Amazon KMS key details showing Key ARN]
:::

## Step 3: Associate KMS key with your Camunda cluster

1. Return to the Camunda Console.
2. On the cluster details page, locate the **KMS Key ARN** input field.
   - For dual region, two fields will be available—enter the correct key for each region.
3. Paste your Amazon KMS Key ARN(s) from Step 2.
4. Confirm and apply the key. Camunda provisions storage using your key for:
   - Document handling storage
   - Backup storage
   - Orchestration cluster persistent disks
   - Elasticsearch persistent disks

:::note
Once a key is applied, it cannot be edited or replaced—even if the key was invalid or encryption failed. To change keys, you must create a new cluster.
:::

:::note
[Insert screenshot showing KMS Key ARN input in cluster details]
:::

## Step 4: Verify encryption and logging

After associating your Amazon KMS key with the Camunda cluster, verify that encryption is working as expected.

### Verify encryption

- In the Camunda Console, check the cluster details page to confirm that the **KMS Key ARN** is correctly applied.
- In your AWS account, verify the key usage in the **KMS console**:
  1. Navigate to **Customer managed keys**.
  2. Select your key and open the **Key policy** and **Key usage** tabs.
  3. Review the **Recent activity** section to confirm encryption operations (e.g., `Encrypt`, `Decrypt`, `GenerateDataKey`).
- To confirm encryption at the storage layer:
  - In **Amazon EBS**, check the **Encryption** column in the EBS volumes list.
  - For **Amazon S3**, confirm bucket encryption settings reference your KMS key.
  - For **Elasticsearch**, verify encryption settings under domain configuration.

### Monitor KMS usage

Set up monitoring in your **own AWS account**, under your **KMS service**:

- **Amazon CloudTrail** automatically logs all KMS operations, including key usage (`Encrypt`, `Decrypt`, `GenerateDataKey`).
- Use **Amazon CloudWatch** to create alarms that notify you of:
  - Key deletion or disabling
  - Unauthorized access attempts
  - Policy or grant modifications
- Regularly review CloudTrail and CloudWatch logs to ensure your cluster uses the correct KMS key and no unauthorized operations occur.

:::warning Monitoring reminder
You are responsible for monitoring key usage and access logs within your AWS account. Use CloudTrail and CloudWatch to detect misconfigurations or unauthorized access.
:::

## Additional considerations

- **Key rotation**: Amazon KMS manages the key lifecycle. You can enable [automatic rotation](https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html) or rotate keys manually. Camunda does not control this process.
- **Cost implications**: Using Amazon KMS keys incurs storage and management charges in your Amazon account. See the [Camunda pricing model](/components/saas/byok/index.md#cost-implications) for details.
- **Failure scenarios**: If the key is deleted or permissions revoked, cluster data becomes inaccessible. See [troubleshooting steps](/components/saas/byok/faq-and-troubleshooting.md#troubleshooting-external-encryption-keys) for recovery guidance.

:::note Reference
For more information, see the [Amazon KMS documentation](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html).
:::
