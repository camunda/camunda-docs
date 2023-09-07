---
id: data-retention
title: "Data retention"
description: "In Camunda 8 SaaS, the following data retention strategies are implemented. This is necessary as the amount of data can grow significantly over time."
---

In Camunda 8 SaaS, the following data retention strategies are implemented. This is necessary as the amount of data can grow significantly overtime. These settings are a balance between performance and usability.

## Default retention time of each application

The following time-to-live settings are configured in SaaS for each application. These are the defaults for our Professional and Enterprise plans.

- **Operate**: 30 days
- **Optimize**: 180 days
- **Tasklist**: 30 days
- **Zeebe**: 7 days

If there are specific requirements for your use-case, [reach out to us](/contact/) to discuss your data retention needs under an Enterprise plan.

## Further information

The following resources in our [Self-Managed documentation](../../self-managed/about-self-managed.md) describe these data retention concepts in more detail:

- [Operate Data Retention](/self-managed/operate-deployment/data-retention.md)
- [Optimize History Cleanup]($optimize$/self-managed/optimize-deployment/advanced-features/engine-data-deletion)
