---
id: webserver
title: "Webserver & security"
description: "Configuration settings for the webserver and security across Camunda 8 Self-Managed Orchestration Cluster components."
---

## Setting a custom context path

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

:::note

- The same context-path and security configuration patterns apply across most Camunda 8 Self-Managed components.
- Component-specific property names and defaults may vary. Check each service’s reference documentation for details.

:::

## Propagation of membership changes to active sessions

When a user logs in, the Orchestration Cluster determines their associations at once (membership in roles, groups, tenants; application authorizations) and stores them into the user's active web session.
When these associations change (e.g. user is removed from a group; authorizations change), then this is not reflected in this cached state immediately but only until the next refresh interval comes.
The default interval is 30 seconds but can be configured via the `camunda.security.authentication.authentication-refresh-interval` property to a higher/lower value if needed considering a trade-off between the extra load for session refresh and the criticality of having sync authentications.
The property format is an ISO8601 duration, for example `PT10M` to set it to 10 minutes. For more information on ISO8601 duration format, refer to [ISO8601](https://en.wikipedia.org/wiki/ISO_8601#Durations).
