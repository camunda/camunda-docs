---
title: "Type Alias: AuthenticationConfigurationResponse"
sidebar_label: "AuthenticationConfigurationResponse"
mdx:
  format: md
---

# Type Alias: AuthenticationConfigurationResponse

```ts
type AuthenticationConfigurationResponse = object;
```

Configuration for authentication and session management.

## Properties

### canLogout

```ts
canLogout: boolean;
```

Whether users can log out (false for SaaS deployments).

---

### isLoginDelegated

```ts
isLoginDelegated: boolean;
```

Whether login is delegated to an external identity provider.
