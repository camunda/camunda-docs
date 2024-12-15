---
id: encryption-at-rest
title: "Encryption at rest"
description: "Camunda 8 SaaS cluster data at rest is protected using Google Cloud Platform (GCP) encryption with a provider-managed encryption key."
keywords:
  [
    "encryption",
    "encryption at rest",
    "encryption key",
    "provider key",
    "software key",
    "hardware key",
  ]
---

<span class="badge badge--cloud">Camunda 8 SaaS only</span>

Camunda 8 SaaS cluster data is encrypted at rest to provide security and protection for your data.

## Overview

By default, Camunda 8 SaaS cluster data at rest is protected with a provider-managed encryption key using [Google Cloud Platform (GCP) encryption](https://cloud.google.com/docs/security/encryption/default-encryption). The encryption key is owned and managed by GCP.

Enterprise customers requiring a higher level of protection can select a dedicated Camunda-managed software or hardware (HSM) encryption key when creating a new cluster. The encryption key is managed by Camunda using Google Cloud Key Management Service (KMS).

- You can only select the encryption type when [creating a cluster](/components/console/manage-clusters/create-cluster.md). You cannot change the encryption type after cluster creation.
- You can configure encryption keys on a per-cluster basis so that each cluster has a dedicated encryption key. Encryption keys can be configured for all cluster versions.
- You can view cluster encryption key details in **Cluster Details** on the **Console Overview** tab.

:::note
Backups use the default provider GCP encryption.
:::

### Encryption types

The following table summarizes the available types of cluster encryption at rest.

| Encryption type                   | Managed by | Protection level                                                                                                                                                                                                                                                                                                                                                                                   |
| :-------------------------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Provider encryption key (default) | Google     | Google uses a [FIPS 140-2](https://cloud.google.com/security/compliance/fips-140-2-validated) validated encryption module (certificate 4407) in our production environment.                                                                                                                                                                                                                        |
| Software encryption key           | Camunda    | <p><ul><li><p>Google KMS [software](https://cloud.google.com/docs/security/key-management-deep-dive#software_backend_software_protection_level) protection level.</p></li><li>Cryptographic operations are performed in software.</li><li>Compliant with [FIPS 140-2 Level 1](https://cloud.google.com/docs/security/key-management-deep-dive#fips_140-2_validation).</li></ul></p>                |
| Hardware encryption key           | Camunda    | <p><ul><li><p>Google KMS [hardware](https://cloud.google.com/docs/security/key-management-deep-dive#backend_hardware_protection_level) protection level.</p></li><li>Cryptographic operations are performed in a hardware security module (HSM).</li><li>Compliant with [FIPS 140-2 Level 3](https://cloud.google.com/docs/security/key-management-deep-dive#fips_140-2_validation).</li></ul></p> |

## Provider encryption key (default)

By default, Camunda 8 SaaS cluster data at rest is protected using GCP encryption.

- Provider encryption keys are owned and managed by GCP.
- Google uses a [FIPS 140-2](https://cloud.google.com/security/compliance/fips-140-2-validated) validated encryption module.

:::info
Learn more about [Google default encryption at rest](https://cloud.google.com/docs/security/encryption/default-encryption) and default provider encryption settings.
:::

## Camunda-managed software encryption key

Camunda-managed software encryption keys use the Google KMS [software](https://cloud.google.com/docs/security/key-management-deep-dive#software_backend_software_protection_level) protection level to provide a higher level of protection than default provider encryption.

- Requires an enterprise plan.
- Software encryption keys are managed by Camunda.
- Software encryption keys are compliant with [FIPS 140-2 Level 1](https://cloud.google.com/docs/security/key-management-deep-dive#fips_140-2_validation).
- Cryptographic operations are performed in software.
- Rotated with zero downtime for security and compliance.

## Camunda-managed hardware encryption key

Camunda-managed hardware encryption keys use the Google KMS [hardware](https://cloud.google.com/docs/security/key-management-deep-dive#backend_hardware_protection_level) protection level to provide a higher level of protection than both default provider encryption and Camunda-managed software encryption keys.

- Requires an enterprise plan.
- Hardware encryption keys are managed by Camunda.
- Hardware encryption keys are compliant with [FIPS 140-2 Level 3](https://cloud.google.com/docs/security/key-management-deep-dive#fips_140-2_validation).
- Rotated with zero downtime for security and compliance.
