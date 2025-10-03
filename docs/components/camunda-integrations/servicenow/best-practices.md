---
id: best-practices
title: Best Practices
description: "Recommendations and patterns for building robust Camunda ServiceNow integrations."
---

This page outlines recommended practices to help you build **reliable, secure, and maintainable** integrations between Camunda and ServiceNow.  Following these best practices will help you avoid common pitfalls and ensure your orchestrations scale effectively across teams and use cases.


---

### Credential Management

- Use [**Camunda Secrets**](https://docs.camunda.io/docs/components/connectors/use-connectors/secrets/) to store and manage ServiceNow credentials.  
- Avoid hardcoding usernames and passwords directly into connector configurations or BPMN models.  
- Reference secrets using the `{{secrets.<name>}}` syntax in connector fields.  
- Apply this practice consistently across the ServiceNow connectors.


### Reusing variables

- When creating or modifying records in ServiceNow (e.g. incidents, change requests, catalog items), the response contains a **unique `sys_id`**.  
- Best practice is to **map this value to a top-scope process variable** in your process so that it can be reused later for:
    - Record lookups  
    - Updates  
    - Deletions  
    - Correlation with ServiceNow notifications


Example snippet
```feel
= incidentResponse.body.sys_id
```

