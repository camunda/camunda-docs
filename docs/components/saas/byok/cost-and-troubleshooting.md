---
id: cost-and-troubleshooting
title: "Cost implications and troubleshooting"
description: "Learn more about cost implications and troubleshooting."
---

Using external encryption keys with AWS KMS incurs costs directly in your AWS account. Camunda does not charge for the feature itself, but you are responsible for all AWS KMS usage.

## Cost implications

| Cost type       | Description                                                              | Notes                                                      |
| --------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------- |
| KMS key storage | Monthly charge for each KMS key                                          | Depends on AWS region and key type                         |
| API requests    | Charges for KMS API calls (Encrypt, Decrypt, GenerateDataKey, ReEncrypt) | Costs increase with frequent operations                    |
| CloudTrail logs | Charges for storing and accessing CloudTrail events                      | Includes encryption/decryption activity by Camunda cluster |

:::warning Cost responsibility
You are responsible for monitoring AWS KMS usage and associated costs.
:::

### Cost optimization tips

- Use separate keys only when necessary to avoid extra storage fees.
- Aggregate audit logging to reduce frequent API calls.
- Review CloudTrail retention settings to balance compliance and storage cost.

## Troubleshooting

The following table summarizes common issues customers may encounter when using external encryption keys and recommended actions:

| Issue                             | Possible cause                                                      | Resolution                                                                                                 |
| --------------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Cluster cannot access KMS key     | Key policy does not grant the Camunda Cluster AWS Role access       | Update KMS key policy to include the correct AWS Role ARN from the Camunda Console                         |
| Encryption/decryption errors      | Key is disabled, deleted, or in the wrong region                    | Re-enable or restore key, or create a new key in the same region as the Camunda cluster                    |
| CloudTrail does not show activity | CloudTrail not enabled in region                                    | Enable CloudTrail in the AWS region where the cluster resides                                              |
| Key rotation issues               | New key not applied before old key deletion, or cluster not updated | Update cluster configuration with the new Key ARN before removing the old key. Verify encryption settings. |

:::note Support
If issues persist after checking key policies, region, and key status, contact AWS support for KMS-related troubleshooting. For Camunda-specific issues with cluster provisioning, contact Camunda support.
:::
