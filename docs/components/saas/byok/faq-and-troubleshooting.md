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

<span class="badge badge--cloud">Camunda 8 SaaS only</span>

This page answers common questions about encryption at rest, encryption key types, and external encryption keys for Camunda 8 SaaS clusters, and provides troubleshooting guidance for common issues.

## General questions

### What is encryption at rest?

Encryption at rest ensures that data stored on physical media (for example, disks or backups) is encrypted, protecting it from unauthorized access if storage is compromised.

:::note Applies to
Encryption at rest applies to both **Orchestration clusters** and **Web Modeler** environments in Camunda 8 SaaS.
:::

### Which encryption options are available in Camunda 8 SaaS?

Camunda 8 SaaS supports the following encryption options:

- **Provider-managed encryption (default):** Data encrypted with an encryption key supplied by the cloud provider (Amazon, Google).
- **Camunda-managed software key:** Data encrypted with a Camunda-managed key at the software protection level (Google KMS).
- **Camunda-managed hardware key:** Data encrypted with a Camunda-managed key at the hardware (HSM) protection level (Google KMS).
- **External encryption key:** Use your own encryption key from a supported cloud Key Management Service (KMS) provider. Currently, this option is **available only for clusters hosted in the AWS region** using **Amazon KMS**.

For a full comparison, see [encryption at rest](/components/saas/encryption-at-rest.md).

### When can I choose the encryption type?

You can only choose the encryption type when creating a new cluster. It cannot be changed after the cluster is created.

### Is encryption at rest enabled by default?

Yes. All Camunda 8 SaaS clusters have encryption at rest enabled by default using provider-managed encryption keys.

## Camunda-managed keys

### What is the difference between software and hardware encryption keys?

- **Software encryption key:**  
  Uses Google KMS at the software protection level. Keys are managed by Camunda and comply with [FIPS 140-2 Level 1](https://cloud.google.com/docs/security/key-management-deep-dive#fips_140-2_validation).

- **Hardware encryption key:**  
  Uses Google KMS at the hardware (HSM) protection level for higher security assurance. Keys comply with [FIPS 140-2 Level 3](https://cloud.google.com/docs/security/key-management-deep-dive#fips_140-2_validation).

Both options support zero downtime key rotation.

### How often are Camunda-managed keys rotated?

Camunda-managed keys are rotated regularly with zero downtime to maintain compliance and security.

### Do backups use Camunda-managed keys?

No. Backups always use the default provider-managed encryption.

## External encryption keys

### What are external encryption keys?

External encryption keys allow you to supply an encryption key from a supported cloud Key Management Service (KMS) provider—currently **Amazon KMS** for clusters hosted in the **AWS region**—to encrypt Camunda 8 SaaS cluster data.

You retain full control over the key lifecycle, including rotation and revocation. You are responsible for monitoring key usage and access using **Amazon CloudTrail** and **Amazon CloudWatch**.

### Which plans support external encryption?

External encryption is available for **enterprise plans only**.

### Can I revoke access to my encryption key?

Yes. If you revoke access to the key in Amazon KMS, Camunda will immediately lose the ability to decrypt cluster data. Restoring access or configuring a new key is required to regain cluster functionality.

### Does Camunda store my encryption key?

No. Camunda never stores your encryption key. Access is granted through standard Amazon KMS integrations.

### Where can I find setup instructions?

See the [external encryption setup guide](/components/saas/byok/aws-kms-setup.md) for configuration steps, including creating and associating Amazon KMS keys with your cluster.

## Other questions

### Does encryption at rest affect cluster performance?

Encryption at rest has minimal impact on performance because encryption and decryption are handled by optimized cloud KMS services.

### Can I use different encryption keys for each cluster?

Yes. Each cluster can have its own encryption key, whether provider-managed, Camunda-managed, or external.

### Is encryption in transit also supported?

Yes. All connections to Camunda 8 SaaS use TLS encryption for data in transit.

### Are there cost implications for using external encryption keys?

Yes. Using external encryption keys incurs charges directly in your Amazon account for KMS key storage, API calls, and CloudTrail logging. For more details, see [cost implications](/components/saas/byok/index.md#cost-implications).

## Troubleshooting external encryption keys

The following table summarizes common issues customers may encounter when using external encryption keys and recommended actions:

| Issue                             | Possible cause                                                   | Resolution                                                                                                                                                                                                                          |
| --------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cluster cannot access KMS key     | Key policy does not grant the Camunda Cluster Amazon Role access | Update the KMS key policy to include the correct Amazon Role ARN from the Camunda Console. This issue typically appears as a cluster provisioning or startup error.                                                                 |
| Encryption/decryption errors      | Key is disabled, deleted, or in the wrong region                 | Re-enable or restore the key, or create a new key in the same region as the Camunda cluster.                                                                                                                                        |
| CloudTrail does not show activity | CloudTrail not enabled or log retention insufficient             | Enable CloudTrail in the Amazon region where the cluster resides and persist logs beyond the default 90 days. See [View CloudTrail events](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events.html). |
| Key rotation issues               | Cluster encryption update not supported                          | Create a new key and associate it with a new cluster if rotation is required. Verify encryption settings before using the new key.                                                                                                  |

:::note Support
If issues persist after checking key policies, region, and key status, contact [Amazon support](https://aws.amazon.com/contact-us/) for KMS-related troubleshooting.  
For Camunda-specific issues with cluster provisioning, contact [Camunda support](https://camunda.com/services/support-guide/).
:::
