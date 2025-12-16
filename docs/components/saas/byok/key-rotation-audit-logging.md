---
id: key-rotation-audit-logging
title: "Key rotation and audit logging"
description: "Camunda cannot rotate customer-managed keys. Any key rotation must be performed manually within your Amazon account."
---

Learn more about key rotation and audit logging when using Amazon BYOK with Camunda 8.8.

:::note Disclaimer
References to Amazon Web Services (AWS) operations may change over time. Camunda does not control AWS features, APIs, or logs. This documentation may become outdated if AWS updates their services.
:::

## Key rotation

With BYOK, you manage your own encryption keys in Amazon KMS. Camunda cannot rotate customer keys. Only you can rotate keys in KMS.

### Manual key rotation

- Rotating a key in KMS does not change the Key ID.
- New key material is generated for future encryption; previously encrypted data remains accessible.
- Camunda clusters continue using the same Key ID and do not need reconfiguration.
- Camunda does not re-encrypt existing data; you are responsible for key management.

To use a new KMS key instead of rotating, contact Camunda Support to update cluster settings.

:::warning Key rotation caution

- Do not delete or disable an old key until the cluster uses a replacement.
- Improper key management may block data access.
- Ensure backup storage and persistent volumes remain accessible.
- See [KMS key rotation](https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html) and [S3 server-side encryption](https://docs.aws.amazon.com/AmazonS3/latest/userguide/serv-side-encryption.html).
  :::

### Best practices

| Practice                      | Description                                                           |
| ----------------------------- | --------------------------------------------------------------------- |
| Separate keys per environment | Use different keys for production, staging, and development clusters. |
| Regular auditing              | Periodically review KMS key policies and access logs.                 |
| Monitor rotation              | Use CloudWatch or EventBridge to track key rotation events.           |

## Audit logging

Amazon KMS integrates with CloudTrail to log all key usage. You are responsible for monitoring and persisting these logs.

### What is logged

- Encrypt, Decrypt, GenerateDataKey, CreateGrant operations
- Failed attempts due to denied access

:::note Log visibility
All KMS operations performed by Camunda appear in CloudTrail in your Amazon account.
:::

### Audit best practices

1. Enable CloudTrail in the cluster region and persist logs.
2. Set up CloudWatch or EventBridge alerts for key deletion, disabled keys, or access denied events.
3. Review logs regularly for compliance.
4. Use tools like [CloudTrail Lake](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake.html) or [Access Analyzer for KMS](https://docs.aws.amazon.com/kms/latest/developerguide/grants.html) to simplify auditing.
5. Export logs to a centralized SIEM if required.

:::warning Audit responsibility
You are responsible for monitoring and persisting KMS activity and logs. Camunda does not have access to CloudTrail logs in your account.
:::
