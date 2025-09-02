---
id: key-rotation-audit-logging
title: "Key rotation and audit logging"
description: "Camunda does not automatically rotate customer-managed keys. Any key rotation must be performed manually within your AWS account."
---

This page describes how key rotation and audit logging work when using **AWS Bring Your Own Key (BYOK)** with Camunda 8.8.

## Key rotation

With BYOK, you manage your own encryption keys in AWS KMS. Camunda does **not automatically rotate customer-managed keys**, nor can it rotate them on your behalf. The customer owns the key, and only the customer can rotate it in AWS.

### Manual key rotation in AWS

Key rotation in AWS KMS never changes the Key ARN. When you enable automatic or manual rotation, AWS generates new key material for the same key. Camunda SaaS clusters continue to use the same Key ARN and do not need to be reconfigured.

If you prefer to create a new KMS key instead of rotating an existing one, contact Camunda Support to update your cluster configuration. Customers cannot update encryption settings directly in Camunda SaaS.

:::warning Key rotation caution

- Do not delete or disable an old key until your cluster is confirmed to be using a replacement key.
- Incorrect key management may cause data access issues.
- Ensure backup storage and persistent volumes also remain accessible after any key changes.  
  :::

### Recommended best practices

| Practice                      | Description                                                           |
| ----------------------------- | --------------------------------------------------------------------- |
| Separate keys per environment | Use different keys for production, staging, and development clusters. |
| Regular auditing              | Periodically review KMS key policies and access logs.                 |
| Monitor rotation              | Use AWS CloudWatch or EventBridge to track key rotation events.       |

For more details, see [AWS KMS key rotation documentation](https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html).

## Audit logging

AWS KMS integrates with **AWS CloudTrail** to provide detailed logs of all key usage. As a BYOK customer, you are responsible for monitoring these logs in your AWS account.

### What is logged

- **Decrypt** operations
- **GenerateDataKey** requests
- **ReEncrypt** operations
- **CreateGrant** operations
- Any **failed attempts** due to denied access

:::note Log visibility
All KMS operations performed by the Camunda cluster IAM role appear in CloudTrail in your account. You can export these logs to a SIEM such as Splunk or Datadog for compliance purposes.
:::

### Recommended audit practices

1. Enable CloudTrail for the AWS region where your cluster resides.
2. Set up CloudWatch or EventBridge alerts for critical events, such as key deletion, disabled keys, or access denied errors.
3. Review logs regularly to verify compliance with your internal security policies.
4. Use AWS tools such as [CloudTrail Lake](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake.html) or [Access Analyzer for KMS](https://docs.aws.amazon.com/kms/latest/developerguide/viewing-grants.html) to simplify auditing.
5. Export CloudTrail logs to a centralized SIEM if required by your organization.

:::warning Audit responsibility
You are responsible for monitoring your KMS key activity and retaining logs according to your compliance requirements. Camunda does not have access to CloudTrail logs in your AWS account.
:::
