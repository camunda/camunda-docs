---
id: key-rotation-audit-logging
title: "Key rotation and audit logging"
description: "Camunda does not automatically rotate customer-managed keys. Any key rotation must be performed manually within your AWS account."
---

Learn more about key rotation and audit logging for AWS.

## Key rotation

In Camunda 8.8, Bring Your Own Key (BYOK) allows you to manage encryption keys yourself in AWS KMS. Camunda does **not automatically rotate customer-managed keys**. Any key rotation must be performed manually within your AWS account.

### Manual key rotation steps

1. Open the [AWS KMS console](https://console.aws.amazon.com/kms).
2. Select the BYOK key used for your Camunda cluster.
3. Generate new key material or create a new KMS key.
4. Update your Camunda cluster to use the new Key ARN:
   - Navigate to the **KMS Key ARN** field in the cluster details page.
   - Replace the old ARN with the new one.
5. Verify that all cluster storage volumes are encrypted with the updated key.

:::warning Key rotation caution

- Ensure you do not delete the old key before updating the cluster with the new Key ARN.
- Rotating keys incorrectly may cause data access issues.
- Backup storage and persistent volumes must also reference the new key.
  :::

### Recommended best practices

| Practice                      | Description                                                           |
| ----------------------------- | --------------------------------------------------------------------- |
| Separate keys per environment | Use different keys for production, staging, and development clusters. |
| Regular auditing              | Periodically review KMS key policies and access logs.                 |
| Monitor rotation              | Use AWS CloudWatch or EventBridge to track key rotation events.       |

## Audit logging

AWS KMS integrates with **AWS CloudTrail** to provide detailed logging of all key usage. Camunda 8.8 BYOK customers are responsible for monitoring these logs in their AWS account.

### What is logged

- **Encrypt** operations
- **Decrypt** operations
- **GenerateDataKey** requests
- **ReEncrypt** operations
- Any **failed attempts** due to denied access

:::note Log visibility
All KMS operations performed by the Camunda cluster IAM role will appear in CloudTrail in your account. You can export these logs to a SIEM such as Splunk or Datadog for compliance purposes.
:::

### Recommended audit practices

1. Enable CloudTrail for the region where your cluster resides.
2. Set up CloudWatch or EventBridge alerts for critical events, such as key deletion or access denied errors.
3. Regularly review logs to ensure compliance with your internal security policies.

:::warning Audit responsibility
You are responsible for monitoring your KMS key activity and retaining logs according to your compliance requirements. Camunda does not access these logs in your AWS account.
:::
