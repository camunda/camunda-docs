---
id: overview
title: Encryption
description: "Learn about Encryption including key features, configuration, and implementation details. This guide provides detailed information for your deployment."
---

Camunda 8 SaaS encrypts all cluster data at rest. By default, encryption uses cloud provider–managed keys. For stricter compliance or control, you can configure **Bring Your Own Key (BYOK)** with **Amazon KMS**, available for clusters hosted in AWS regions.

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
| Amazon-managed          | AWS        | Encryption in your account, but AWS controls key lifecycle |
| Customer-managed (BYOK) | You        | You create, own, and manage the key in your AWS account    |

Industries such as finance, healthcare, and government often require this level of control for compliance reasons.  
With BYOK, you maintain visibility through **CloudTrail** and **CloudWatch**, apply your own rotation policies, and centralize audit logs in your AWS account.

</details>

## Responsibilities

| Owner    | Responsibility                                           |
| -------- | -------------------------------------------------------- |
| Customer | Create and manage the KMS key in AWS                     |
| Customer | Ensure the key and cluster are in the same AWS region    |
| Customer | Configure key policies granting Camunda access           |
| Camunda  | Encrypt and decrypt customer data using the provided key |
| Camunda  | Surface any key-related errors in the Console            |

:::warning Key management
If your KMS key is disabled, deleted, or permissions are revoked, your cluster and its data become inaccessible.
:::

## Cost implications

Using external encryption keys with **Amazon KMS** incurs costs directly in your Amazon account. Camunda does not charge for the feature itself, but you are responsible for all Amazon KMS usage.

| Cost type       | Description                                                              | Notes                                                      |
| --------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------- |
| KMS key storage | Monthly charge for each KMS key                                          | Depends on Amazon region and key type                      |
| API requests    | Charges for KMS API calls (Encrypt, Decrypt, GenerateDataKey, ReEncrypt) | Costs increase with frequent operations                    |
| CloudTrail logs | Charges for storing and accessing CloudTrail events                      | Includes encryption/decryption activity by Camunda cluster |

:::warning Cost responsibility
You are responsible for monitoring Amazon KMS usage and associated costs.
:::

### Cost optimization tips

- Use separate keys only when necessary to avoid extra storage fees.
- Aggregate audit logging to reduce frequent API calls.
- Review CloudTrail retention settings to balance compliance and storage cost.
