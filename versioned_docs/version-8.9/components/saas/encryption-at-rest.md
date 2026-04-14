---
id: encryption-at-rest
title: "Encryption at rest"
description: "Camunda 8 SaaS cluster data at rest is protected using provider-managed or Camunda-managed encryption keys. AWS enterprise customers can bring their own AWS KMS key (BYOK) for full control."
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

Encryption at rest protects stored data by making it unreadable without the appropriate decryption keys.

By default, Camunda 8 SaaS uses a provider-managed encryption key with [Google Cloud Platform (GCP) encryption](https://cloud.google.com/docs/security/encryption/default-encryption). Enterprise customers can choose:

- Camunda-managed software or hardware keys (Google KMS)
- Bring Your Own Key (BYOK) on AWS for full control

Key points:

- Encryption type is selected only when [creating a cluster](/components/console/manage-clusters/create-cluster.md)
- Each cluster can have its own key
- The key applies to all workloads and persists across updates
- View encryption details on the cluster's **Overview** tab under **Cluster Details**

:::note
Backups use default provider GCP encryption.
:::

## Encryption types

| Type               | Managed by | Notes                                                                                                                          |
| ------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Provider (default) | Google     | FIPS 140-2 validated encryption module (certificate 4407)                                                                      |
| Software key       | Camunda    | Google KMS software protection; operations in software; FIPS 140-2 Level 1; zero downtime rotation                             |
| Hardware key       | Camunda    | Google KMS hardware (HSM) protection; FIPS 140-2 Level 3; operations in HSM; zero downtime rotation                            |
| BYOK               | Customer   | AWS KMS key; FIPS 140-3 Security Level 3 certification; full control over lifecycle, rotation, and revocation; enterprise only |

## Provider encryption key

Default option, managed by Google. Uses FIPS 140-2 validated module.

:::info
Learn more about [Google default encryption](https://cloud.google.com/docs/security/encryption/default-encryption)
:::

## Camunda-managed keys

### Software key

- Managed by Camunda using Google KMS
- FIPS 140-2 Level 1
- Operations in software
- Zero downtime rotation

### Hardware key

- Managed by Camunda using Google KMS
- FIPS 140-2 Level 3
- Operations in HSM
- Zero downtime rotation

## Bring Your Own Key (BYOK)

Enterprise customers on AWS can use their own AWS KMS key.

- You manage the key lifecycle, including rotation and revocation
- Camunda never stores the key; access occurs via standard AWS KMS integrations
- Zero downtime rotation supported

See the [BYOK setup guide](/components/saas/byok/aws-kms-setup.md) for configuration.
