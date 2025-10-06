---
id: encryption-at-rest
title: "Encryption at rest"
description: "Camunda 8 SaaS cluster data at rest is protected using Google Cloud Platform (GCP) encryption with a provider-managed or Camunda-managed encryption key. On AWS, enterprise customers can bring their own AWS KMS key (BYOK) for full control over key lifecycle management."
keywords:
  [
    "encryption",
    "encryption at rest",
    "encryption key",
    "provider key",
    "software key",
    "hardware key",
    "BYOK",
  ]
---

<span class="badge badge--cloud">Camunda 8 SaaS only</span>

Encryption at rest protects stored data by encrypting it so that if the underlying storage or physical media is accessed without authorization, the contents are unreadable without the appropriate decryption keys.

## Overview

By default, Camunda 8 SaaS cluster data at rest is protected with a provider-managed encryption key using [Google Cloud Platform (GCP) encryption](https://cloud.google.com/docs/security/encryption/default-encryption). The encryption key is owned and managed by GCP.

Enterprise customers can choose one of the following options when creating a cluster:

- **Camunda-managed software or hardware encryption keys**: Managed by Camunda using Google Cloud Key Management Service (KMS).
- **Bring Your Own Key (BYOK)**: On AWS, use your own AWS KMS key for full control over the key lifecycle.

Key details:

- The encryption type can only be selected when [creating a cluster](/components/console/manage-clusters/create-cluster.md). It cannot be changed after cluster creation.
- Encryption keys are configured per cluster. Each cluster can have a dedicated encryption key.
- The selected encryption key applies to all workloads within the cluster and persists across Camunda 8 SaaS updates.
- You can view cluster encryption key details in **Cluster Details** on the **Console Overview** tab.

:::note
Backups use the default provider GCP encryption.
:::

## Encryption types

| Encryption type                   | Managed by | Protection level                                                                                                                                                                                                                                                                                                                                                                 |
| :-------------------------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Provider encryption key (default) | Google     | Google uses a [FIPS 140-2](https://cloud.google.com/security/compliance/fips-140-2-validated) validated encryption module (certificate 4407) in the production environment.                                                                                                                                                                                                      |
| Software encryption key           | Camunda    | <ul><li>Google KMS [software](https://cloud.google.com/docs/security/key-management-deep-dive#software_backend_software_protection_level) protection level.</li><li>Cryptographic operations performed in software.</li><li>Compliant with [FIPS 140-2 Level 1](https://cloud.google.com/docs/security/key-management-deep-dive#fips_140-2_validation).</li></ul>                |
| Hardware encryption key           | Camunda    | <ul><li>Google KMS [hardware](https://cloud.google.com/docs/security/key-management-deep-dive#backend_hardware_protection_level) protection level.</li><li>Cryptographic operations performed in a hardware security module (HSM).</li><li>Compliant with [FIPS 140-2 Level 3](https://cloud.google.com/docs/security/key-management-deep-dive#fips_140-2_validation).</li></ul> |
| Bring your own key (BYOK)         | Customer   | <ul><li>Customer-managed AWS KMS keys.</li><li>Full control over key lifecycle, including rotation and revocation.</li><li>Supported for enterprise plans only.</li></ul>                                                                                                                                                                                                        |

## Provider encryption key (default)

By default, Camunda 8 SaaS cluster data at rest is protected using GCP encryption.

- Provider encryption keys are owned and managed by GCP.
- Google uses a [FIPS 140-2](https://cloud.google.com/docs/security/compliance/fips-140-2-validated) validated encryption module.

:::info
Learn more about [Google default encryption at rest](https://cloud.google.com/docs/security/encryption/default-encryption) and provider encryption settings.
:::

## Camunda-managed software encryption key

Camunda-managed software encryption keys use the Google KMS [software](https://cloud.google.com/docs/security/key-management-deep-dive#software_backend_software_protection_level) protection level for enhanced protection.

- Requires an enterprise plan.
- Managed by Camunda using Google KMS.
- Compliant with [FIPS 140-2 Level 1](https://cloud.google.com/docs/security/key-management-deep-dive#fips_140-2_validation).
- Cryptographic operations performed in software.
- Rotated with zero downtime for security and compliance.

## Camunda-managed hardware encryption key

Camunda-managed hardware encryption keys use the Google KMS [hardware](https://cloud.google.com/docs/security/key-management-deep-dive#backend_hardware_protection_level) protection level for the highest security assurance.

- Requires an enterprise plan.
- Managed by Camunda using Google KMS.
- Compliant with [FIPS 140-2 Level 3](https://cloud.google.com/docs/security/key-management-deep-dive#fips_140-2_validation).
- Cryptographic operations performed in a hardware security module (HSM).
- Rotated with zero downtime for security and compliance.

## Bring your own key (BYOK)

Bring Your Own Key (BYOK) lets enterprise customers on AWS use their own AWS KMS key.

- Supported for enterprise plans only.
- You manage the entire key lifecycle, including rotation and revocation.
- Camunda never stores your key; access is via standard AWS KMS integrations.
- Zero downtime rotation is supported.

For configuration details, see [BYOK setup guide](/components/saas/byok/index.md).
