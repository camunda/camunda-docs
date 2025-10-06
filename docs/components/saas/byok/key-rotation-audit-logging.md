---
id: key-rotation-audit-logging
title: "Key rotation and audit logging"
description: "Camunda cannot rotate customer-managed keys. Any key rotation must be performed manually within your Amazon account."
---

This page describes how key rotation and audit logging work when using **Amazon Bring Your Own Key (BYOK)** with Camunda 8.8.

:::note Disclaimer
This page includes references to **Amazon Web Services (AWS)** operations and behaviors, which are subject to change by the vendor. Camunda does not control or guarantee the accuracy of AWS features, APIs, or logging mechanisms. If AWS modifies these services, this documentation may become outdated.
:::

## Key rotation

With BYOK, you manage your own encryption keys in **Amazon KMS**. Camunda **cannot rotate the customer's KMS key**. The customer owns the key, and only the customer can rotate it in Amazon KMS.

### Manual key rotation in Amazon KMS

Key rotation in Amazon KMS does **not change the Key ID**. When you enable automatic or manual rotation, Amazon generates new key material for the same key. Camunda SaaS clusters continue to use the same Key ID and do not need to be reconfigured.

Using KMS key rotation creates new key material for future encryptions while preserving access to previously encrypted data. Camunda does **not** automatically re-encrypt existing data. The customer is solely responsible for managing their key material.

If you prefer to create a new KMS key instead of rotating an existing one, contact **Camunda Support** to update your cluster configuration. Customers cannot update encryption settings directly in Camunda SaaS.

:::warning Key rotation caution

- Do not delete or disable an old key until your cluster is confirmed to be using a replacement key.
- Incorrect key management may cause data access issues.
- Ensure backup storage and persistent volumes remain accessible after any key changes.
- For more details, see [Amazon KMS key rotation documentation](https://docs.aws.amazon.com/kms/latest/userguide/list-rotations.html) and [Amazon S3 server-side encryption](https://docs.aws.amazon.com/AmazonS3/latest/userguide/serv-side-encryption.html).
  :::

### Recommended best practices

| Practice                      | Description                                                           |
| ----------------------------- | --------------------------------------------------------------------- |
| Separate keys per environment | Use different keys for production, staging, and development clusters. |
| Regular auditing              | Periodically review KMS key policies and access logs.                 |
| Monitor rotation              | Use Amazon CloudWatch or EventBridge to track key rotation events.    |

## Audit logging

**Amazon KMS** integrates with **Amazon CloudTrail** to provide detailed logs of all key usage. As a BYOK customer, you are responsible for monitoring and persisting these logs in your Amazon account.

### What is logged

- **Encrypt**, **Decrypt**, **GenerateDataKey**, and **CreateGrant** operations
- Any **failed attempts** due to denied access

:::note Log visibility
All KMS operations performed by Camunda appear in CloudTrail within your Amazon account.
:::

### Recommended audit practices

1. Enable CloudTrail in the Amazon region where your cluster resides to persist audit logs.
2. Set up CloudWatch or EventBridge alerts for critical events, such as key deletion, disabled keys, or access denied errors.
3. Review logs regularly to verify compliance with your internal security policies.
4. Use Amazon tools such as [CloudTrail Lake](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake.html) or [Access Analyzer for KMS](https://docs.aws.amazon.com/kms/latest/userguide/viewing-grants.html) to simplify auditing.
5. Export CloudTrail logs to a centralized SIEM if required by your organization.

:::warning Audit responsibility
You are responsible for monitoring and persisting your KMS key activity and logs according to your compliance requirements. Camunda does not have access to CloudTrail logs in your Amazon account.
:::
