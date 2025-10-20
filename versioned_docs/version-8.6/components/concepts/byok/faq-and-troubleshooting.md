---
id: faq-and-troubleshooting
title: "FAQ & troubleshooting"
description: "Frequently asked questions and troubleshooting guidance for encryption at rest, encryption key types, and external encryption keys in Camunda 8 SaaS."
keywords:
  [
    "encryption",
    "BYOK",
    "KMS",
    "encryption keys",
    "security",
    "FAQ",
    "troubleshooting",
  ]
---

Frequently asked questions and troubleshooting guidance for encryption at rest, encryption key types, and external encryption keys in Camunda 8 SaaS:

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
- External key: Customer-supplied KMS key (AWS only currently).

Full comparison: [encryption at rest](/components/concepts/encryption-at-rest.md)

### When can I choose the encryption type?

Only during cluster creation. It cannot be changed later.

### Is encryption at rest enabled by default?

Yes. All clusters use provider-managed encryption by default.

## Camunda-managed keys

- Software vs hardware: Software uses FIPS 140-2 Level 1, hardware uses FIPS 140-2 Level 3. Both support zero downtime rotation.
- Backups always use provider-managed keys.

## External encryption keys

- Use your own KMS key (AWS only) to encrypt cluster data. You control rotation and revocation and are responsible for monitoring via CloudTrail and CloudWatch.
- Supported on enterprise plans only.
- Revoking access immediately blocks cluster access; a new key or restored access is required.
- Camunda does not store your key.

Setup instructions: [external encryption setup guide](/components/saas/byok/aws-kms-setup.md)

## Other questions

- Performance: Minimal impact; handled by cloud KMS.
- Per-cluster keys: Supported.
- Encryption in transit: TLS enforced.
- Cost: Charges apply in your AWS account. See [cost implications](/components/concepts/byok/index.md#cost-implications).

## Troubleshooting external encryption keys

| Issue                             | Possible cause                                                   | Resolution                                                                                                                                                                          |
| --------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cluster cannot access KMS key     | Key policy does not grant the Camunda Cluster Amazon Role access | Update KMS key policy with correct Amazon Role ARN from Camunda Console.                                                                                                            |
| Encryption/decryption errors      | Key disabled, deleted, or in wrong region                        | Re-enable, restore, or create a new key in the correct region.                                                                                                                      |
| CloudTrail does not show activity | CloudTrail not enabled or retention too short                    | Enable CloudTrail in cluster region and store logs beyond 90 days. [View CloudTrail events](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events.html) |
| Key rotation issues               | Cluster encryption update not supported                          | Create a new key and associate it with a new cluster. Verify encryption settings before use.                                                                                        |

:::note Support
For persistent issues with key policies, region, or key status, contact [Amazon support](https://aws.amazon.com/contact-us/).  
For Camunda-specific cluster provisioning issues, contact [Camunda support](https://camunda.com/services/support-guide/).
:::
