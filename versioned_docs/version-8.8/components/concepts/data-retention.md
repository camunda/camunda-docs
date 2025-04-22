---
id: data-retention
title: "Data retention"
description: "In Camunda 8 SaaS, the following data retention strategies are implemented. This is necessary as the amount of data can grow significantly over time."
---

In Camunda 8 SaaS, the following data retention strategies are implemented. This is necessary as the amount of data can grow significantly overtime. These settings are a balance between performance and usability.

## Default retention time of each application

The following time-to-live settings are configured in SaaS for each application. These are the defaults for our production clusters in the Starter and Enterprise plans.

- **Operate**: 30 days
- **Optimize**: 180 days
- **Tasklist**: 30 days
- **Zeebe**: 7 days

If there are specific requirements for your use-case, [reach out to us](/reference/contact.md) to discuss your data retention needs under an Enterprise plan.
For more information on development clusters in the Starter or Professional plans, refer to our [fair usage limits of those plans](https://camunda.com/legal/fair-usage-limits-for-starter-plan/).

## Additional information

The following resources in our [Self-Managed documentation](../../self-managed/about-self-managed.md) describe these data retention concepts in more detail:

- [Operate data retention](/self-managed/operate-deployment/data-retention.md)
- [Tasklist data retention](/self-managed/tasklist-deployment/data-retention.md)
