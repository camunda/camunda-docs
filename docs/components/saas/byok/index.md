---
id: overview
title: "Overview"
description: "Learn more about Camunda integrations, including Camunda's Amazon BYOK (Bring Your Own Key) integration."
---

Camunda 8 SaaS encrypts all cluster data at rest to protect customer workloads. By default, encryption is managed using cloud provider–supplied keys. While this satisfies many organizations, some—especially in regulated industries—require full control over their encryption keys.

This documentation focuses specifically on the **Bring Your Own Key (BYOK)** approach with **Amazon Key Management Service (KMS)**. This feature is currently **available only for clusters provisioned in AWS regions**. Support for additional cloud providers may be added in the future.

With BYOK, you can configure Camunda 8 SaaS to use a **customer-managed key** stored in your own Amazon account. This ensures you retain ownership, control, and visibility throughout the key lifecycle, including creation, rotation, and audit logging.

## Problem statement

By default, Camunda 8 SaaS uses either **Camunda-managed keys** (where Camunda manages the key material and lifecycle on your behalf) or **Amazon-managed keys** (where Amazon manages the key material in your account). These options may not meet the strict requirements of certain industries. For example, financial services, healthcare, and government organizations often need:

- Exclusive ownership of encryption keys
- Centralized audit logs within their own Amazon accounts
- Custom key lifecycle policies, such as mandatory rotation or automated revocation

Without BYOK, customers in these environments may need to accept a higher risk profile or consider alternative solutions.

## Feature overview

External encryption enables Camunda 8 SaaS customers to configure their own **Amazon KMS** encryption keys for cluster data at rest.  
This option is **available only for clusters hosted in AWS regions**.

**Supported storage types** (encrypted with customer-managed keys):

- Document handling storage
- Backup storage
- Zeebe persistent disks
- Elasticsearch persistent disks

**Supported operations** (for AWS-region clusters):

- **Provisioning** — configure a customer-managed key when creating a cluster
- **Audit logging** — view encryption and decryption activity in **Amazon CloudTrail**
- **Rotation** — rotation must be handled on the Amazon KMS side; Camunda SaaS cannot initiate key rotation

## Shared responsibility model

External encryption introduces a shared responsibility between Camunda and the customer.

### Customer responsibilities

:::note Important configuration step
Configuring your external encryption key in **Amazon KMS** is a critical part of the **Bring Your Own Key (BYOK)** setup.  
For detailed guidance on cost implications and troubleshooting, see [external encryption key cost implications and troubleshooting](./cost-and-troubleshooting.md).
:::

- Create and manage the KMS key in your Amazon account
- Ensure the key resides in the same **AWS region** as your Camunda 8 SaaS cluster
- Configure key policies to allow Camunda access
- Monitor key usage and access logs via **Amazon CloudTrail** and **Amazon CloudWatch**
- Rotate keys as required by your internal security policies

:::warning Key deletion or permissions changes
Disabling, deleting, or revoking permissions for your KMS key will make your cluster and its data inaccessible. This is the customer's responsibility to manage and restore.
:::

### Camunda responsibilities

- Use the customer-provided key to encrypt all customer-specific data at rest
- Handle encryption and decryption operations for the customer
- Integrate BYOK into the cluster creation and provisioning flow
- Surface key usage errors in the Camunda Console
