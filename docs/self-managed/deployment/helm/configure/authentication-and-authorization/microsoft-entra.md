---
id: microsoft-entra
sidebar_label: Microsoft Entra
title: Helm chart setup with an external Microsoft Entra tenant
description: "Learn how to set up the Helm Chart so that it connects to a Microsoft Entra tenant"
---

This guide shows you how you can set up the Helm Chart against a Microsoft Entra tenant, configuring all components with dedicated OIDC/OAuth clients.

TODO:

- For a new OIDC application (Web Modeler), configure Entra to use V2 API (was mentioned in our Helm installation docs): https://docs.camunda.io/docs/next/self-managed/deployment/helm/configure/authentication-and-authorization/connect-to-an-oidc-provider/
- For web modeler UI access, describe how to create a) mapping rule in Management Identity or b) use env vars for config (not sure if documented feature); or even better, link to existing docs
- For web modeler API access, I need to create a new role in Management Identity first and assign permissions there; then I need to create a mapping rule to match my client token to that role
- For Optimze UI access, assign user to Optimize role in Management Identity via Mapping Rule (not required for API access; get dashboards)

Structure:

- Tell people to create OIDC clients: For which app? Of which type? (consider linking to Entra docs)
- Create secrets
- Make global config first that is independent of components
- Tell people to configure the components that the want to run
- Tell people how to configure API access in the UI

## Configuration

To use Microsoft Entra, you need to perform the following steps:

1. [Create OIDC clients in Entra](#create-oidc-clients-in-entra)
1. [Create secrets](#create-secrets)
1. [Configure components using OIDC](#configure-components-using-oidc)

Jump to the [full configuration example](#full-configuration-example) to see it all at once.

### Create OIDC clients in Entra

TODO: review if the naming here should be "client" or "application" when we talk about the Entra part

As a prerequisite to configuring Camunda, create one OIDC client in Entra for each of the following components:

TODO: link here to Entra docs on each client type

Confidential clients:

- Management Identity (in the following code examples referred to as `<mgmt-identity-client>`)
- Orchestration Cluster (`<oc-client>`)
- Optimize (`<optimize-client>`)

TODO: what about Web Modeler public API? should that have a dedicated client application?

For every confidential client, note down the client id and client secret.

Public clients:

- Web Modeler (`<web-modeler-client>`)
- Console (`<console-client>`)

For every public client, note down the client id.

TODO: use proper references to those client ids and secrets in the later stages of the guide
TODO: validate this against the 8.7 mgmt identity client seutp for Entra that we have documented
TODO: should we include the redirect URL properties here and in all the other OIDC guides?

### Create secrets

Create two secrets in your Kubernetes namespace.

First, a secret that contains all your OIDC client secrets:

```
kubectl create secret generic entra-credentials \
  --from-literal=identity-client-secret="<mgmt-identity-client-secret>" \
  --from-literal=orchestration-cluster-client-secret="<oc-client-secret>" \
  --from-literal=optimize-client-secret="<optimize-client-secret>"
```

Next, create a secret with the remaining credentials for the Camunda Helm Chart:

```
kubectl create secret generic camunda-credentials \
  --from-literal=identity-postgresql-admin-password=CHANGE_ME \
  --from-literal=identity-postgresql-user-password=CHANGE_ME \
  --from-literal=webmodeler-postgresql-admin-password=CHANGE_ME \
  --from-literal=webmodeler-postgresql-user-password=CHANGE_ME
```

Note that unlike the OIDC client secrets, the passwords here will preconfigure the respective components. That means, you can freely choose the values to initialize access.

This secret includes the following keys:

- `identity-postgresql-admin-password`: The password for the administrative account of the PostgreSQL instance used by Management Identity (username `postgres`).
- `identity-postgresql-user-password`: The password non-privileged user account of the PostgreSQL instance used by Management Identity (username `bn_keycloak`).
- `literal=webmodeler-postgresql-admin-password`: The password for the administrative account of the PostgreSQL instance used by Web Modeler (username `postgres`).
- `webmodeler-postgresql-user-password` The password non-privileged user account of the PostgreSQL instance used by Web Modeler (username `web-modeler`).

### Configure components using OIDC

With the OIDC clients and the cluster secrets in place, you can move on to configuring the OAuth and OIDC connections for the components. You can skip those components that you do not need. Keep in mind that Orchestration Cluster and Connectors are enabled by default, so you will have to disable them explicitly in that case.

#### Global configuration

Start with the following global configuration that provides defaults for all components:

```yaml
global:
  identity:
    auth:
      enabled: true
      issuer: https://login.microsoftonline.com/<tenant id>/v2.0
      issuerBackendUrl: https://login.microsoftonline.com/<tenant id>/v2.0
      authUrl: https://login.microsoftonline.com/<tenant id>/oauth2/v2.0/authorize
      tokenUrl: https://login.microsoftonline.com/<tenant id>/oauth2/v2.0/token
      jwksUrl: https://login.microsoftonline.com/<tenant id>/discovery/v2.0/keys
      type: "MICROSOFT"
  security:
    authentication:
      method: oidc
```

In the URLs, replace `<tenant id>` with the ID of your Microsoft Entra tenant. We will use this convention throughout the rest of this guide.

#### Configure Orchestration Cluster

Add the following to configure the Orchestration Cluster:

```yaml
orchestration:
  security:
    authentication:
      oidc:
        clientId: "<oc-client-id>"
        audience: "<oc-client-id>"
        usernameClaim: preferred_username
        clientIdClaim: azp
        preferUsernameClaim: true
        scope:
          - openid
          - profile
          - offline_access
          - "<oc-client-id>/.default"
        secret:
          existingSecret: "entra-credentials"
          existingSecretKey: "orchestration-cluster-client-secret"
    initialization:
      defaultRoles:
        admin:
          users:
            - "<the email address of your initial admin user>"
        connectors:
          clients:
            - "<oc-client-id>"
```

The value `orchestration.security.authentication.oidc.usernameClaim` determines which claim of an access token carries the identifier of a user. Likewise, `clientIdClaim` carries the same value for a client. `preferred_username` carries by default the email address of the accessing user. `azp` carries the client's ID in Entra. You can change those values if you would like to use different claims. TODO: link to detailed explanation here and maybe config reference

#### Configure Connectors

Add the following to configure Connectors:

```yaml
connectors:
  security:
    authentication:
      oidc:
        clientId: "<oc-client-id>"
        audience: "<oc-client-id>"
        tokenScope: "<oc-client-id>/.default"
        secret:
          existingSecret: "entra-credentials"
          existingSecretKey: "oidc-client-secret"
```

#### Configure Management Identity

Add the following to configure Management Identity:

```yaml
global:
  identity:
    auth:
      identity:
        clientId: "<mgmt-identity-client-id>"
        audience: "<mgmt-identity-client-id>"
        initialClaimName: preferred_username
        initialClaimValue: "<the email address of your initial admin user>"
        secret:
          existingSecret: "entra-credentials"
          existingSecretKey: "identity-client-secret"

identity:
  enabled: true

identityPostgresql:
  enabled: true
  auth:
    existingSecret: "camunda-credentials"
    secretKeys:
      adminPasswordKey: "identity-postgresql-admin-password"
      userPasswordKey: "identity-postgresql-admin-password"
```

The value `global.identity.auth.identity.initialClaimName` determines which claim of an access token carries the identifier of your initial administrative user. On the same level, the value `initialClaimValue` determines the value of that claim that when matched grants administrative access to Management Identity.

TODO: shall we add this in a hint/warning box?

```
  env:
    - name: CAMUNDA_IDENTITY_AUDIENCE # redundant with global.identity.auth.identity.audience; needed to get the audience value in the optimize config in the embedded application.yaml of Management Identity right when Optimize is disabled...
      value: "6fe432f2-7dc3-4e13-b1b4-4cc8480c80b7"
```

TODO: is this needed? => shouldn't config is only relevant to keycloak

```
identity:
  firstUser:
    existingSecret: "camunda-credentials"
```

#### Configure Optimize

Add the following to configure Optimize:

```yaml
global:
  identity:
    auth:
      optimize:
        clientId: "<optimize-client-id>"
        audience: "<optimize-client-id>"
        secret:
          existingSecret: "entra-credentials"
          existingSecretKey: "optimize-client-secret"

optimize:
  enabled: true
```

TODO: should the secret declaration go into the component-specific area to be more consistent with the other configs?

#### Configure Web Modeler

Add the following to configure Web Modeler:

TODO: which value for the public api audience?

```yaml
global:
  identity:
    auth:
      webModeler:
        clientId: "<web-modeler-client-id>"
        clientApiAudience: "<web-modeler-client-id>"
        publicApiAudience: "6fe432f2-7dc3-4e13-b1b4-4cc8480c80b7"

webModeler:
  enabled: true
  restapi:
    mail:
      fromAddress: noreply@example.com

webModelerPostgresql:
  enabled: true
  auth:
    existingSecret: "camunda-credentials"
    secretKeys:
      adminPasswordKey: "webmodeler-postgresql-admin-password"
      userPasswordKey: "webmodeler-postgresql-user-password"
```

You can replace the value of `webModeler.restapi.mail.fromAddress` with a value that fits your scenario. This is the email address that Web Modeler declares in the emails it sends. For more details on how you can configure the Web Modeler email connection, see [the corresponding documentation](../enable-additional-components.md#web-modeler).

#### Configure Console

```yaml
global:
  identity:
    auth:
      console:
        clientId: "<console-client-id>"
        audience: "<console-client-id>"

console:
  enabled: true
```

### Full configuration example

### Connect to the cluster

### Grant access to components
