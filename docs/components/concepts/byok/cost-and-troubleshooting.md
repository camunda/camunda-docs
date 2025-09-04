---
id: cost-and-troubleshooting
title: "Cost implications and troubleshooting"
description: "Learn more about cost implications and troubleshooting."
---

Using BYOK with AWS KMS incurs costs directly in your AWS account. Camunda 8.8 does not charge for the BYOK feature itself, but you are responsible for all AWS KMS usage.

## Cost implications

| Cost type       | Description                                                              | Notes                                                      |
| --------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------- |
| KMS key storage | Monthly charge for each KMS key                                          | Depends on AWS region and key type                         |
| API requests    | Charges for KMS API calls (Encrypt, Decrypt, GenerateDataKey, ReEncrypt) | Costs increase with frequent operations                    |
| CloudTrail logs | Charges for storing and accessing CloudTrail events                      | Includes encryption/decryption activity by Camunda cluster |

:::warning Cost responsibility
You are responsible for monitoring AWS KMS usage and associated costs. Camunda does not bill for KMS or CloudTrail usage.
:::

### Cost optimization tips

- Use separate keys only when necessary to avoid extra storage fees.
- Aggregate audit logging to reduce frequent API calls.
- Review CloudTrail retention settings to balance compliance and storage cost.

## Troubleshooting

The following table summarizes common issues customers may encounter when using BYOK and recommended actions:

| Issue                             | Possible cause                                                  | Resolution                                                                   |
| --------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Cluster cannot access KMS key     | Key policy does not grant Camunda cluster IAM role access       | Update KMS key policy to include correct IAM role permissions                |
| Encryption/decryption errors      | Key is disabled, deleted, or in wrong region                    | Re-enable key, restore key, or create key in correct region                  |
| CloudTrail does not show activity | CloudTrail not enabled in region                                | Enable CloudTrail for region where cluster resides                           |
| Key rotation issues               | Old key deleted before updating cluster, or new key not applied | Ensure cluster references new Key ARN, verify volumes encrypted with new key |

:::note Support
If issues persist after checking policies, regions, and key status, contact AWS support for KMS-related troubleshooting. For Camunda-specific issues with cluster provisioning, contact Camunda support.
:::
