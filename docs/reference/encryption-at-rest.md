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

## About encryption at rest

By default, Camunda 8 SaaS cluster data at rest is protected using [Google Cloud Platform (GCP)](cloud.google.com) encryption with a provider-managed encryption key. This encryption key is owned and managed by GCP.

Enterprise customers requiring a stronger level of protection can instead use either a dedicated Camunda-managed Software or Hardware (HSM) encryption key when creating a new cluster. This encryption key is managed by Camunda using Google Cloud Key Management Service (KMS).

_screenshot_

- You can only configure the encryption type when [creating a new cluster](/docs/components/console/manage-clusters/create-cluster.md). You cannot change the encryption type after a cluster has been created.
- You can configure encryption keys on a per-cluster basis, so that every cluster has a dedicated encryption key. Encryption keys can be added to all cluster versions.
- You can view details of the encryption key for a cluster in the **Cluster details** on the **Console Overview** tab.

:::note
You cannot use Camunda-managed Software or Hardware encryption keys for encryption of backups. Backups use the default provider GCP encryption.
:::

### Encryption at rest options

The following table summarizes your cluster encryption options.

| Encryption type                   | Managed by | Protection level                                                                                                                                                                                                                         |
| :-------------------------------- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Provider encryption key (default) | Google     | Google uses a [FIPS 140-2](https://cloud.google.com/security/compliance/fips-140-2-validated) validated encryption module (certificate 4407) in our production environment.                                                              |
| Software encryption key           | Camunda    | <p><ul><li>Cryptographic operations are performed in software.</li><li>Compliant with [FIPS 140-2 Level 1](https://cloud.google.com/docs/security/key-management-deep-dive#fips_140-2_validation).</li></ul></p>                         |
| Hardware encryption key           | Camunda    | <p><ul><li>Cryptographic operations are performed in a hardware security module (HSM).</li><li>Compliant with [FIPS 140-2 Level 3](https://cloud.google.com/docs/security/key-management-deep-dive#fips_140-2_validation).</li></ul></p> |

## Provider encryption (default)

By default, Camunda 8 SaaS cluster data at rest is protected using [Google Cloud Platform (GCP) encryption](https://cloud.google.com/docs/security/encryption/default-encryption).

- Provider encryption keys are owned and managed by GCP.
- Google uses a [FIPS 140-2](https://cloud.google.com/security/compliance/fips-140-2-validated) validated encryption module.

:::info
Learn more about [Google default encryption at rest](https://cloud.google.com/docs/security/encryption/default-encryption) and encryption settings for provider encryption.
:::

## Camunda-managed Software encryption keys

Camunda-managed software encryption keys use the Google KMS [software](https://cloud.google.com/docs/security/key-management-deep-dive#software_backend_software_protection_level) protection level to provide a stronger level of protection than the default provider encryption.

- Requires an enterprise plan.
- Software encryption keys are managed by Camunda.
- Software encryption keys are compliant with [FIPS 140-2 Level 1](https://cloud.google.com/docs/security/key-management-deep-dive#fips_140-2_validation).
- Cryptographic operations are performed in software.

## Camunda-managed Hardware encryption keys

Camunda-managed hardware encryption keys use the Google KMS [hardware](https://cloud.google.com/docs/security/key-management-deep-dive#backend_hardware_protection_level) protection level to provide a stronger level of protection than both default encryption or software encryption keys.

- Requires an enterprise plan.
- Hardware encryption keys are managed by Camunda.
- Hardware encryption keys are compliant with [FIPS 140-2 Level 3](https://cloud.google.com/docs/security/key-management-deep-dive#fips_140-2_validation).

## Key rotation

Camunda-managed Software and Hardware encryption keys are rotated annually to maintain a high level of security and compliance. Zero downtime is expected during key rotation.
