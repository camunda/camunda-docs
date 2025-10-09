---
id: create-byok-aws-kms-key
title: "Create AWS KMS Key"
description: "Create an AWS KMS key with the correct permissions for Camunda SaaS BYOK integration."
---

This guide helps you create a KMS key in your AWS account with the correct permissions for Camunda SaaS BYOK integration.

## Using the AWS CLI

We provide automated scripts to create the necessary AWS KMS key(s) with the correct policy and permissions. Choose the script that matches your backup configuration.

### Option 1: Single-Region Backup

Use this script to create a single KMS key. The key will be created in eu-west-1 (Ireland) region.

**What the script does:**
*   Creates a KMS key with the required policy for Camunda access.
*   Sets up an alias for easier key management.
*   Outputs the key ARN for you to provide to Camunda.

**Instructions:**
1.  Download the script: [create-byok-kms-key-single-region.sh](https://docs.camunda.io/docs/next/components/saas/byok/downloads/create-byok-kms-key-single-region.sh).
2.  Modify the following values at the top of the script:
   *   `AWS_ACCESS_KEY_ID`
   *   `AWS_SECRET_ACCESS_KEY`
   *   `AWS_SESSION_TOKEN` (if using temporary credentials)
   *   `TENANT_ROLE_ARN` (provided by Camunda)
   *   `YOUR_ACCOUNT_ID`
   *   `ALIAS_NAME` (optional)
3.  Make the script executable and run it.
4.  Copy the outputted key ARN and provide it to Camunda.

---

### Option 2: Dual-Region Backup

Use this script to create a multi-region primary key and a replica key in a second region. The primary key will be created in eu-west-1 (Ireland) region, and the replica key will be created in eu-west-2 (London) region.

**What the script does:**
*   Creates a Multi-Region KMS key in the primary region.
*   Creates a replica key in the secondary region.
*   Applies the correct policies to both keys.
*   Outputs both key ARNs for you to provide to Camunda.

**Instructions:**
1.  Download the script: [create-byok-kms-key-multi-region.sh](https://docs.camunda.io/docs/next/components/saas/byok/downloads/create-byok-kms-key-multi-region.sh).
2.  Modify the following values at the top of the script:
   *   `AWS_ACCESS_KEY_ID`
   *   `AWS_SECRET_ACCESS_KEY`
   *   `AWS_SESSION_TOKEN` (if using temporary credentials)
   *   `TENANT_ROLE_ARN` (provided by Camunda)
   *   `YOUR_ACCOUNT_ID`
   *   `ALIAS_NAME` (optional)
3.  Make the script executable and run it.
4.  Copy the two outputted key ARNs and provide them to Camunda.

> **Note:** Alternatively, for a dual-region setup, you can run the single-region script from Option 1 twice—once in your primary region and once 
> in your secondary region—and provide both resulting key ARNs to Camunda. Make sure to modify also the REGION variable in the script to eu-west-2`
> before creating the second key.

**Script Reference:** 
For creating AWS KMS single-region key Download and run [create-byok-kms-key-single-region.sh](https://docs.camunda.io/docs/next/components/saas/byok/downloads/create-byok-kms-key-single-region.sh)
For creating AWS KMS multi-region keys Download and run [create-byok-kms-key-multi-region.sh](https://docs.camunda.io/docs/next/components/saas/byok/downloads/create-byok-kms-key-multi-region.sh)

---

## Manual Key Creation

If you prefer to create the key(s) manually using the AWS Console, follow the instructions below.

### Option 1: Single-Region Backup

Follow these steps to create a single KMS key in your desired AWS region.

1.  **Sign in to AWS Console**
   *   Sign in to your AWS account.
   *   Navigate to the KMS service.
   *   Ensure you are in the correct AWS region for your cluster.

2.  **Create a Customer Managed Key**
   *   Click **Create key**.
   *   Key type: **Symmetric**.
   *   Key usage: **Encrypt and decrypt**.
   *   Click **Next**.

3.  **Add Labels**
   *   Enter a descriptive alias (e.g., `camunda-saas-byok`).
   *   Add a description (e.g., `KMS key for Camunda SaaS BYOK integration`).
   *   Click **Next**.

4.  **Define Key Administrators**
   *   Select the IAM users and/or roles that will administer this key. At least one administrator is required.
   *   Click **Next**.

5.  **Define Key Usage Permissions**
   *   Skip this step by clicking **Next**. Permissions will be configured in the next step.

6.  **Edit Key Policy**
   *   On the review screen, find the **Key policy** section and click **Switch to policy view**.
   *   Add to or replace with the [key policy](https://docs.camunda.io/docs/next/components/saas/byok/downloads/aws-kms-key-policy.json) we provide to you
   *   Replace `<YOUR_AWS_ACCOUNT_ID>` with your AWS Account ID.
   *   Replace `<TENANT_ROLE_ARN>` with the tenant IAM role ARN provided by Camunda.

7.  **Finalize Key Creation**
   *   Click **Finish**.
   *   From the key details page, copy the **ARN**.
   *   Provide this ARN to Camunda.

### Option 2: Dual-Region Backup

For a dual-region setup, you can either create a multi-region key and replicate it, or create two independent single-region keys.

#### Method A: Create a Multi-Region Key and Replica (Recommended)

1.  **Create the Primary Multi-Region Key**
   *   Follow steps 1-7 from **Manual Key Creation > Option 1: Single-Region Backup**, with one change:
   *   In step 2 (**Create a Customer Managed Key**), under **Advanced options**, select **Multi-Region key**.
   *   Ensure this primary key is created in the region `eu-west-1`.

2.  **Create the Replica Key**
   *   After the primary multi-region key is created, select it from your list of keys.
   *   Go to the **Regional replicas** tab.
   *   Click **Create replica key**.
   *   Select region `eu-west-2` The alias and policy will be replicated from the primary key.
   *   Click **Create replica key**.

3.  **Provide ARNs to Camunda**
   *   Copy the ARNs for both the primary and replica keys.
   *   Provide both ARNs to Camunda.

#### Method B: Create Two Single-Region Keys

1.  Follow all the steps in **Manual Key Creation > Option 1: Single-Region Backup** to create a key in region`eu-west-1`.
2.  Repeat all the steps from **Option 1** to create a second key in region `eu-west-2`. Use a distinct alias (e.g., `camunda-saas-byok-replica`).
3.  Provide both key ARNs (from the primary and secondary regions) to Camunda.


## Important Notes

- Your KMS key remains in your AWS account and under your control
- You can monitor usage in CloudTrail logs
- You can revoke Camunda's access at any time by modifying the key policy
- Charges for KMS Key storage will appear on your AWS bill
- Charges for KMS API calls will appear on Camunda's AWS bill
- **For single region the KMS key must be created in the eu-west-1 (Ireland) region**
- **For dual-region backup, the primary key must be in eu-west-1 (Ireland) and the replica/secondary key in a eu-west-2 (London)**