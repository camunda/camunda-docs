---
id: faq
title: "FAQ"
description: "Frequently asked questions about encryption at rest, encryption key types, and External Encryption Keys in Camunda 8 SaaS."
keywords: ["encryption", "BYOK", "KMS", "encryption keys", "security", "FAQ"]
---

<span class="badge badge--cloud">Camunda 8 SaaS only</span>

This page answers common questions about encryption at rest, encryption key types, and External Encryption Keys for Camunda 8 SaaS clusters.

## General questions

### What is encryption at rest?

Encryption at rest ensures that data stored on physical media (for example, disks or backups) is encrypted, protecting it from unauthorized access if storage is compromised.

### Which encryption options are available in Camunda 8 SaaS?

Camunda 8 SaaS supports the following options:

- **Provider-managed encryption (default):** Data encrypted with an encryption key supplied by the cloud provider (AWS, GCP).
- **Camunda-managed software key:** Data encrypted with a Camunda-managed key at the software protection level.
- **Camunda-managed hardware key:** Data encrypted with a Camunda-managed key at the hardware (HSM) protection level.
- **External:** Use your own encryption key from a supported cloud KMS provider, such as AWS KMS.

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

External encryption keys allow you to supply an encryption key from a supported Cloud Key Management Service (KMS) provider, such as AWS KMS, to encrypt Camunda 8 SaaS cluster data. Amazon KMS is currently the only supported KMS provider.

You retain full control over the key lifecycle, including rotation and revocation.

### Which plans support external encryption?

External encryption is available for **enterprise plans only**.

### Can I revoke access to my encryption key?

Yes. If you revoke access to the key in your KMS provider, Camunda will immediately lose the ability to decrypt cluster data.

### Does Camunda store my encryption key?

No. Camunda never stores your encryption key. Access is granted through standard cloud KMS integrations.

### Where can I find setup instructions?

See [external encryption setup guide](/components/saas/byok/aws-kms-setup.md) for configuration steps.

## Other questions

### Does encryption at rest affect cluster performance?

Encryption at rest has minimal impact on performance because encryption and decryption are handled by optimized cloud KMS services.

### Can I use different encryption keys for each cluster?

Yes. Each cluster can have its own encryption key, whether provider-managed, Camunda-managed, or External.

### Is encryption in transit also supported?

Yes. All connections to Camunda 8 SaaS use TLS encryption for data in transit.
