---
id: data-retention
title: "Data retention"
---

In Camunda Platform 8 SaaS, the following data retention strategies are implemented. This is necessary as the amount of data can grow significantly over time. These settings are a balance between performance and usability.

## Default retention time of each application

The following time-to-live settings are configured in SaaS for each application. These are the defaults for our enterprise plan.

- **Operate**: 30 days
- **Optimize**: 180 days
- **Tasklist**: 30 days
- **Zeebe**: 7 days

If there are specific requirements for your use-case, please [reach out to us](/contact/) to discuss your data retention needs.

## Further information

The following links, from our self-managed documentation, describe these concepts in more detail.

[Operate Data Retention](self-managed/operate-deployment/data-retention/data-retention.md)
[Optimize History Cleanup]($optimize$/self-managed/optimize-deployment/advanced-features/engine-data-deletion/engine-data-deletion.md)
