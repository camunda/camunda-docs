---
id: best-practices
title: Best practices
description: "Recommended approaches for building secure, reliable, and maintainable Camunda–ServiceNow integrations."
---

This page outlines best practices for building **secure, reliable, and maintainable** integrations between Camunda and ServiceNow.  
Following these recommendations helps you avoid common pitfalls and ensure your orchestrations scale effectively across teams and use cases.

### Credential management

- Use [**Camunda secrets**](/components/console/manage-clusters/manage-secrets.md) to store and manage ServiceNow credentials.
- Never hardcode usernames or passwords directly into connector configurations or BPMN models.
- Reference secrets using the `{{secrets.<name>}}` syntax in connector fields.
- Apply this practice consistently across all ServiceNow connectors to maintain a unified security model.

### Reusing variables

When creating or modifying records in ServiceNow (for example, incidents, change requests, or catalog items), the response includes a **unique `sys_id`**.

Map this value to a **top-scope process variable** in your BPMN process. This allows you to reuse the variable later for:

- Record lookups
- Updates
- Deletions
- Correlation with ServiceNow notifications

**Example**

```feel
= incidentResponse.body.sys_id
```
