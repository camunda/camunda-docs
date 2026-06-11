---
id: best-practices
title: Best practices
description: "Recommended approaches for building secure, reliable, and maintainable Camunda–ServiceNow integrations."
---

Use these practices to build secure, reliable, and maintainable Camunda–ServiceNow integrations.

### Manage credentials securely

- Store and manage ServiceNow credentials using [Camunda secrets](../../../components/console/manage-clusters/manage-secrets.md).
- Never hardcode usernames or passwords in connector configurations or BPMN models.
- Reference secrets with the `{{secrets.<name>}}` syntax in connector fields.
- Apply this consistently across all ServiceNow connectors to maintain a unified security model.

### Reuse variables effectively

- Map ServiceNow `sys_id` values to **top-scope process variables** in your BPMN process.
- Use these variables for:

| Action      | Purpose                                        |
| ----------- | ---------------------------------------------- |
| Lookup      | Retrieve existing records reliably             |
| Update      | Modify records without additional queries      |
| Delete      | Remove records when needed                     |
| Correlation | Tie records to notifications or process events |

**Example:**

```feel
= incidentResponse.body.sys_id
```
