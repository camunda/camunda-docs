---
id: overview
title: Encryption
description: Learn how to configure AWS BYOK (Bring Your Own Key) for Camunda 8 SaaS clusters.
---

Camunda 8 SaaS encrypts all cluster data at rest. By default, encryption uses cloud provider–managed keys. For stricter compliance or control, you can configure **Bring Your Own Key (BYOK)** with **AWS KMS**, available for clusters hosted in AWS Regions.

## Encryption overview

With BYOK, Camunda 8 SaaS uses your customer-managed key stored in your AWS account.  
You control the key’s lifecycle—creation, access, rotation, and logging—while Camunda handles encryption and decryption operations.

| Category          | Details                                          |
| ----------------- | ------------------------------------------------ |
| Availability      | AWS-hosted clusters only                         |
| Encrypted storage | Document, backup, Zeebe, and Elasticsearch disks |
| Setup             | Configure the key during cluster creation        |
| Rotation          | Managed in AWS KMS (not through Camunda)         |
| Logging           | Key usage visible in AWS CloudTrail              |

<details>
<summary>Encryption details for beginners</summary>

**Encryption at rest** protects stored data from unauthorized access.  
Camunda 8 SaaS supports three encryption models:

| Type                    | Managed by | Description                                                |
| ----------------------- | ---------- | ---------------------------------------------------------- |
| Camunda-managed         | Camunda    | Default encryption, handled automatically                  |
| AWS managed             | AWS        | Encryption in your account, but AWS controls key lifecycle |
| Customer-managed (BYOK) | You        | You create, own, and manage the key in your AWS account    |

Industries such as finance, healthcare, and government often require this level of control for compliance reasons.  
With BYOK, you maintain visibility through **AWS CloudTrail** and **Amazon CloudWatch**, apply your own rotation policies, and centralize audit logs in your AWS account.

</details>

## Responsibilities

| Owner    | Responsibility                                           |
| -------- | -------------------------------------------------------- |
| Customer | Create and manage the AWS KMS key                        |
| Customer | Ensure the key and cluster are in the same AWS Region    |
| Customer | Configure key policies granting Camunda access           |
| Camunda  | Encrypt and decrypt customer data using the provided key |
| Camunda  | Surface any key-related errors in the Console            |

:::warning Key management
If your AWS KMS key is disabled, deleted, or permissions are revoked, your cluster and its data become inaccessible. For details on how Camunda responds when an external AWS KMS key becomes disabled, deleted, or misconfigured, see [key state behavior](/components/saas/byok/key-state-behavior.md).
:::

## Cost implications

Using external encryption keys with **AWS KMS** incurs costs directly in your AWS account. Camunda does not charge for the feature itself, but you are responsible for AWS KMS key storage, management, and persistence of logs.

| Cost type       | Description                                             | Notes                                                      |
| --------------- | ------------------------------------------------------- | ---------------------------------------------------------- |
| KMS key storage | Monthly charge for each AWS KMS key                     | Depends on AWS Region and key type                         |
| CloudTrail logs | Charges for storing and accessing AWS CloudTrail events | Includes encryption/decryption activity by Camunda cluster |

:::note
Customers are not charged for key usage operations (for example, encrypting or decrypting) as per [AWS KMS pricing](https://aws.amazon.com/kms/pricing/).
:::

:::warning Cost responsibility
You are responsible for monitoring AWS KMS key storage, management, and log persistence costs.
:::

### Cost optimization tips

- Use separate keys only when necessary to avoid extra storage fees.
- Review AWS CloudTrail retention settings to balance compliance and storage cost.
