---
id: webserver
title: "Webserver & security"
description: "Configuration settings for the webserver and security across Camunda 8 Self-Managed Orchestration Cluster components."
---

All components support customizing the **context-path** using the default Spring configuration.

Example for `application.yml`:

```yaml
server.servlet.context-path: /<component>
```

Example for environment variable:

```
SERVER_SERVLET_CONTEXT_PATH=/<component>
```

The default context-path is `/`.

Replace `<component>` with the identifier for the service (for example, `operate`, `tasklist`, or another component).

## Securing component-to-orchestration communication

When executing user operations, some components (such as Operate or Tasklist) communicate with the orchestration cluster (Zeebe) using a client library.

For the orchestration cluster to validate whether these operations are allowed (for example, in terms of tenant assignment), the connection must be secured.

## Troubleshooting multi-tenancy

- **Symptom**: Users can view data only from the `<default>` tenant and no data from other tenants.
  - **Cause**: Multi-tenancy is not enabled for the component.
  - **Solution**: Enable multi-tenancy in the component configuration. If you use Helm, see the multi-tenancy configuration guide.
- **Symptom**: Multi-tenancy is enabled in the component but disabled in Identity.
  - **Cause**: Users will not have tenant authorizations.
  - **Solution**: Enable multi-tenancy in both the component and Identity to allow tenant-specific data access.

## Notes

- The same context-path and security configuration patterns apply across most Camunda 8 Self-Managed components.
- Component-specific property names and defaults may vary. Check each service’s reference documentation for details.
