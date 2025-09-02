---
id: overview
title: "Overview"
description: "Learn more about Camunda integrations, such as Camunda's AWS Bring Your Own Key (BYOK) integration."
---

Camunda 8 SaaS encrypts all cluster data at rest to protect customer workloads. By default, encryption is managed using cloud provider–supplied keys. While this satisfies many organizations, some—especially in regulated industries—require full control over their encryption keys.

This documentation focuses specifically on the bring your own key (BYOK) approach with **AWS Key Management Service (KMS)**. Other cloud providers may use similar concepts, but the details here are AWS-specific.

With BYOK, you can configure Camunda 8 SaaS to use a **customer-managed key** stored in your own AWS account. This ensures you retain ownership, control, and visibility throughout the key lifecycle, including creation, rotation, and audit logging.

## Problem statement

By default, Camunda 8 SaaS uses either **Camunda-managed keys** (where Camunda manages the key material and lifecycle on your behalf) or **AWS-managed keys** (where AWS manages the key material in your account). These options may not meet the strict requirements of certain industries. For example, financial services, healthcare, and government organizations often need:

- Exclusive ownership of encryption keys
- Centralized audit logs within their own AWS accounts
- Custom key lifecycle policies, such as mandatory rotation or automated revocation

Without BYOK, customers in these environments may need to accept a higher risk profile or look for alternative solutions.

## Feature overview

BYOK enables Camunda 8 SaaS customers to configure their own AWS KMS encryption keys for cluster data at rest.

**Supported storage types** (encrypted with customer-managed keys)

- Document handling storage
- Backup storage
- Zeebe persistent disks
- Elasticsearch persistent disks

**Supported operations**

- **Provisioning** — configure a customer-managed key when creating a cluster
- **Audit logging** — view encryption and decryption activity in AWS CloudTrail
- **Rotation** — rotation must be handled manually in AWS KMS; Camunda does not currently perform automated rotation

## Shared responsibility model

BYOK introduces a shared responsibility between Camunda and the customer.

**Customer responsibilities**

- Create and manage the KMS key in your AWS account
- Ensure the key resides in the same **AWS region** as your Camunda 8 SaaS cluster
- Configure key policies to allow Camunda access
- Monitor, rotate, and retire keys as required by your internal security policies
- Cover all associated costs for KMS usage (API calls, storage, and logging)

:::warning Key deletion or permissions changes
Disabling, deleting, or revoking permissions for your KMS key will make your cluster and its data inaccessible. This is the customer's responsibility to manage and restore.
:::

**Camunda responsibilities**

- Use the customer-provided key to encrypt all supported data at rest
- Integrate BYOK into the cluster creation and provisioning flow
- Ensure least-privilege access to customer keys
- Surface key usage errors in the Camunda Console
- Provide documentation, examples, and troubleshooting guidance

:::note Risk scenarios

- **Incorrect key policy configuration** → Customer responsibility to fix the policy
- **Camunda system failure in applying the key** → Camunda responsibility to resolve and ensure data remains encrypted

:::
