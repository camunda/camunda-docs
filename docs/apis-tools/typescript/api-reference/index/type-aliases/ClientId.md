---
title: "Type Alias: ClientId"
sidebar_label: "ClientId"
mdx:
  format: md
---

# Type Alias: ClientId

```ts
type ClientId = CamundaKey<"ClientId">;
```

The unique identifier of an OAuth client.
Minted outside the Camunda REST API: in SaaS by Console, in Self-Managed
with OIDC by the external identity provider (e.g. EntraID, Keycloak,
Okta). In Self-Managed with Basic authentication, machine-to-machine
applications are modelled as users instead — see the user identifier.
