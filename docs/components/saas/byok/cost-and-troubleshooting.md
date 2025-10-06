---
id: cost-and-troubleshooting
title: "Cost implications and troubleshooting"
description: "Learn more about cost implications and troubleshooting for using external encryption keys with Amazon KMS."
---

Using external encryption keys with **Amazon KMS** incurs costs directly in your Amazon account. Camunda does not charge for the feature itself, but you are responsible for all Amazon KMS usage.

## Cost implications

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

## Troubleshooting

The following table summarizes common issues customers may encounter when using external encryption keys and recommended actions:

| Issue                             | Possible cause                                                   | Resolution                                                                                                                                                                                                                          |
| --------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cluster cannot access KMS key     | Key policy does not grant the Camunda Cluster Amazon Role access | Update the KMS key policy to include the correct Amazon Role ARN from the Camunda Console. This issue typically appears as a cluster provisioning or startup error.                                                                 |
| Encryption/decryption errors      | Key is disabled, deleted, or in the wrong region                 | Re-enable or restore the key, or create a new key in the same region as the Camunda cluster.                                                                                                                                        |
| CloudTrail does not show activity | CloudTrail not enabled or log retention insufficient             | Enable CloudTrail in the Amazon region where the cluster resides and persist logs beyond the default 90 days. See [View CloudTrail events](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events.html). |
| Key rotation issues               | Cluster encryption update not supported                          | Create a new key and associate it with a new cluster if rotation is required. Verify encryption settings before using the new key.                                                                                                  |

:::note Support
If issues persist after checking key policies, region, and key status, contact [Amazon support](https://aws.amazon.com/contact-us/) for KMS-related troubleshooting.  
For Camunda-specific issues with cluster provisioning, contact [Camunda support](https://camunda.com/services/support-guide/).
:::
