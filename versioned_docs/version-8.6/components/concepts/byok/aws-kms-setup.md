---
id: aws-external-encryption-setup
title: "Encryption at rest using external encryption keys"
description: "Learn how to configure encryption at rest for a Camunda 8 SaaS Orchestration cluster using external Amazon KMS encryption keys."
---

:::warning Disclaimer
This documentation describes functionality that is not yet generally available.  
The **Bring Your Own Key (BYOK)** feature is scheduled for release with a future 8.8 update. Details may change before the official feature release.
:::

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
2. Navigate to the **Cluster** section and click **Create New Cluster**.
3. Select an Amazon region for your cluster.
4. Choose **Single region** or **Dual region backup**.
   - Dual region requires one key per region. Keys can be separate.
5. Under **Encryption at rest**, choose **External**.
6. Click **Create cluster**.

After creation, note the **Amazon Role ARN** displayed in the Console for your cluster.

## Step 2: Create and configure an AWS KMS key

You can create the key either via CLI or manually in the AWS console.

### Option A: Create the key using AWS CLI

We provide automated scripts to create the necessary KMS key(s) with the correct policy and permissions. Choose the option that matches your backup configuration.

#### Single-region backup

Use this script to create a single KMS key in the same region as the cluster.

**What the script does:**

- Creates a KMS key with the required policy for Camunda access.
- Sets up an alias for easier key management.
- Outputs the key ARN to provide to Camunda.

**Instructions:**

1. Download [create-byok-kms-key-single-region.sh](https://raw.githubusercontent.com/camunda/camunda-docs/refs/heads/main/versioned_docs/version-8.6/components/concepts/byok/downloads/create-byok-kms-key-single-region.sh).
2. Modify the following values at the top of the script:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_SESSION_TOKEN` (if using temporary credentials)
   - `YOUR_ACCOUNT_ID`
   - `ALIAS_NAME` (optional)
3. Make the script executable and run it.
4. Copy the outputted key ARN and provide it to Camunda.

#### Dual-region backup

Use this script to create a multi-region primary key in the cluster's region and a replica key in backup region.

**What the script does:**

- Creates a multi-region primary key and replica key.
- Applies the correct policies to both keys.
- Outputs both key ARNs to provide to Camunda.

**Instructions:**

1. Download [create-byok-kms-key-multi-region.sh](https://raw.githubusercontent.com/camunda/camunda-docs/refs/heads/main/versioned_docs/version-8.6/components/concepts/byok/downloads/create-byok-kms-key-multi-region.sh).
2. Modify the same variables as above.
3. Make the script executable and run it.
4. Copy the two outputted key ARNs and provide them to Camunda.

:::note Alternative
For dual-region setups, you can also run the single-region script twice—once in the cluster's region and once in backup region. Make sure to modify the `REGION` variable before creating the second key.
:::

### Option B: Manual key creation in AWS Console

#### Single-region backup

1. **Sign in to AWS Console**
   - Navigate to the KMS service and select the correct region.
2. **Create a customer managed key**
   - Click **Create key**.
   - Choose **Symmetric** and **Encrypt and decrypt** usage.
3. **Add labels**
   - Add an alias (e.g., `camunda-saas-byok`).
   - Add a description (e.g., `KMS key for Camunda SaaS BYOK`).
4. **Define key administrators**
   - Select IAM users/roles that will administer the key.
5. **Define key usage permissions**
   - Skip this step; permissions are configured in the next step.
6. **Edit key policy**
   - Switch to policy view and replace the existing policy with the [provided key policy](https://raw.githubusercontent.com/camunda/camunda-docs/refs/heads/main/versioned_docs/version-8.6/components/concepts/byok/downloads/aws-kms-key-policy.json).
   - Replace `<YOUR_AWS_ACCOUNT_ID>` and `<TENANT_ROLE_ARN>` with your values.
7. **Finish and copy the ARN**
   - Click **Finish** and copy the key ARN to use in the Camunda Console.

#### Dual-region backup

You can either create a multi-region key and replica or create two single-region keys.

##### Method A: Multi-region key (recommended)

1. Follow the single-region steps, selecting **Multi-Region key** under **Advanced options**.
2. After creating the primary key in cluster's region, go to **Regional replicas** and click **Create replica key**.
3. Select the region for the replica and confirm. The region should be the same as the backup region.
4. Copy both key ARNs and provide them to Camunda.

##### Method B: Two single-region keys

1. Create a key in the cluster's region using the single-region steps.
2. Repeat the process in the backup region using a different alias (e.g., `camunda-saas-byok-replica`).
3. Provide both key ARNs to Camunda.

### Sample key policy

Replace `<tenant-role-arn>` with the **Amazon Role ARN** from Step 1, and `<customer-aws-account>` with your AWS account ID.

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

</details>

:::warning Key policy guidance

- Don’t restrict the Camunda cluster **Role** from required KMS actions.
- Key rotation is managed in AWS KMS; Camunda cannot rotate keys.
- Revoking access immediately breaks the cluster.
  :::

## Step 3: Associate the KMS key with your Camunda cluster

1. Return to the **Camunda Console** and locate the **KMS Key ARN** input field.
   - For dual region, two fields will be available—enter the correct key for each region.
2. Paste your Amazon KMS Key ARN(s) from Step 2.
3. Confirm and apply. Camunda provisions storage using your key for:
   - Document handling storage
   - Backup storage
   - Orchestration cluster persistent disks
   - Elasticsearch persistent disks

:::note
Once a key is applied, it cannot be edited or replaced. To change keys, you must create a new cluster.
:::

## Step 4: Verify encryption and logging

- In the **Camunda Console**, check the cluster details page to confirm the **KMS Key ARN** is applied correctly.
- In AWS, verify key usage:
  1. Navigate to **Customer managed keys**.
  2. Select your key and view **Key policy** and **Key usage** tabs.
  3. Review **Recent activity** to confirm operations (Encrypt, Decrypt, GenerateDataKey).

### Monitor KMS usage

- **CloudTrail** logs all KMS operations.
- **CloudWatch** can trigger alarms for:
  - Key deletion or disabling
  - Unauthorized access attempts
  - Policy or grant modifications
- Regularly review logs to detect unauthorized activity.

:::warning Monitoring reminder
You are responsible for monitoring key usage and access logs within your AWS account. Use CloudTrail and CloudWatch to detect misconfigurations or unauthorized access.
:::

## Additional considerations

- **Key rotation**: Enable [automatic rotation](https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html) or rotate manually in AWS KMS.
- **Cost**: Using Amazon KMS keys incurs storage and management charges in your Amazon account. See the [Camunda pricing model](/components/concepts/byok/index.md#cost-implications).
- **Failure scenarios**: Deleting keys or revoking permissions makes cluster data inaccessible. See [troubleshooting steps](/components/concepts/byok/faq-and-troubleshooting.md#troubleshooting-external-encryption-keys).

:::note Reference
For more information, see the [Amazon KMS documentation](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html).
:::
