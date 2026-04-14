---
id: faq-and-troubleshooting
title: "FAQ & troubleshooting"
description: "Frequently asked questions and troubleshooting guidance for encryption at rest, encryption key types, and external AWS KMS encryption keys in Camunda 8 SaaS."
keywords:
  [
    "encryption",
    "BYOK",
    "KMS",
    "AWS KMS",
    "encryption keys",
    "security",
    "FAQ",
    "troubleshooting",
  ]
---

Frequently asked questions and troubleshooting guidance for encryption at rest, encryption key types, and external AWS KMS encryption keys in Camunda 8 SaaS.

## General questions

### What is encryption at rest?

Encryption at rest protects data on storage media (disks or backups) from unauthorized access.

:::note
Applies to both Orchestration clusters and Web Modeler in Camunda 8 SaaS.
:::

### Which encryption options are available?

- Provider-managed (default): Cloud provider keys.
- Camunda-managed software key: Uses Google KMS at software protection level (FIPS 140-2 Level 1).
- Camunda-managed hardware key: Uses Google KMS HSM (FIPS 140-2 Level 3).
- External key: Customer-supplied AWS KMS key (AWS only currently).

Full comparison: [encryption at rest](/components/saas/encryption-at-rest.md)

### When can I choose the encryption type?

Only during cluster creation. It cannot be changed later.

### Is encryption at rest enabled by default?

Yes. All clusters use provider-managed encryption by default.

## Camunda-managed keys

- Software vs. hardware: Software uses FIPS 140-2 Level 1, hardware uses FIPS 140-2 Level 3. Both support zero downtime rotation.
- Backups always use provider-managed keys.

## External encryption keys

- Use your own AWS KMS key to encrypt cluster data. You control rotation and revocation and are responsible for monitoring via AWS CloudTrail and Amazon CloudWatch.
- Supported on enterprise plans only.
- Revoking access immediately blocks cluster access; a new key or restored access is required.
- Camunda does not store your key.

Setup instructions: [external encryption setup guide](/components/saas/byok/aws-kms-setup.md)

## Other questions

- Performance: Minimal impact; handled by AWS KMS.
- Per-cluster keys: Supported.
- Encryption in transit: TLS enforced.
- Cost: AWS KMS key storage and management charges apply in your AWS account. See [cost implications](/components/saas/byok/index.md#cost-implications).

## Troubleshooting external encryption keys

| Issue                             | Possible cause                                                | Resolution                                                                                                                                                                                  |
| --------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cluster cannot access AWS KMS key | Key policy does not grant the Camunda cluster AWS Role access | Update the AWS KMS key policy with the correct AWS Role ARN from the Camunda Console.                                                                                                       |
| Encryption/decryption errors      | Key disabled, deleted, or in wrong Region                     | Re-enable, restore, or create a new key in the correct AWS Region.                                                                                                                          |
| CloudTrail does not show activity | AWS CloudTrail not enabled or retention too short             | Enable AWS CloudTrail in the cluster Region and store logs beyond 90 days. [View CloudTrail events](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events.html) |
| Key rotation issues               | Cluster encryption update not supported                       | Create a new key and associate it with a new cluster. Verify encryption settings before use.                                                                                                |

:::note
For details on how Camunda responds when an external KMS key becomes disabled, deleted, or misconfigured, see [key state behavior](/components/saas/byok/key-state-behavior.md).
:::

:::note Support
For persistent issues with key policies, Region, or key status, contact [AWS support](https://docs.aws.amazon.com/awssupport/latest/user/case-management.html).  
For Camunda-specific cluster provisioning issues, contact [Camunda support](https://camunda.com/services/support-guide/).
:::
