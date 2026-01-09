---
id: connect-multiple-identity-providers
title: Connect to multiple identity providers
sidebar_label: Connect to multiple identity providers
description: Learn how to connect Camunda 8 Orchestration Cluster Identity to mulitple external Identity Providers (IdP) via OpenID Connect (OIDC) for authentication and user management
unlisted: true
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Camunda 8 Orchestration Cluster (OC) supports integrating multiple OpenID Connect (OIDC) Identity Providers (IdPs), allowing users from different organizations or platforms to authenticate using their preferred provider. This feature is essential for environments with diverse authentication needs, such as multi-organization, partner, or tenant scenarios.

With multiple IdPs configured:

- Users will choose their IdP when logging in to a cluster.
- Camunda will validate and accept access tokens from multiple trusted issuers for both web and automated (API) access.
- You can offer greater flexibility and security, aligning with best practices for identity federation and multi-tenancy.

## Overview

When multiple OIDC providers are set up, the clusterlogin page lets users select the provider they wish to use. For API access, any bearer token issued by one of the configured and trusted issuers is accepted; all others are denied.

## Prerequisites

- Camunda 8 Orchestration Cluster (Self-Managed) deployed.
- At least two OIDC-compliant IdPs (for example, Microsoft Entra ID, Keycloak, Okta).
- Administrative access to each IdP (to register applications and obtain credentials).

## Configuration Approach

Multiple IdPs are configured by defining each provider as a separate registration using application.yaml or environment variables.

Each provider is identified by a unique `<provider-id>`, which is a user-defined label (e.g., `ENTRA`, `KEYCLOAK`, `PARTNER_X`).

### Configure OIDC connection details for each provider

Define each provider’s settings using the following pattern (`<provider-id>` is your chosen id):

<Tabs groupId="optionsType" defaultValue="env" queryString values={[{label: 'Application.yaml', value: 'yaml' }, {label: 'Environment variables', value: 'env' }]}>
<TabItem value="yaml">

```yaml
camunda.security.authentication.providers.oidc.<provider-id>.client-id: <YOUR_CLIENTID>
camunda.security.authentication.providers.oidc.<provider-id>.client-name: <YOUR_CLIENTNAME>
camunda.security.authentication.providers.oidc.<provider-id>.client-secret: <YOUR_CLIENTSECRET>
camunda.security.authentication.providers.oidc.<provider-id>.issuer-uri: <YOUR_ISSUERURI>
camunda.security.authentication.providers.oidc.<provider-id>.redirect-uri: <YOUR_REDIRECTURI>
camunda.security.authentication.providers.oidc.<provider-id>.token-uri: <YOUR_TOKENRUI>
camunda.security.authentication.providers.oidc.<provider-id>.jwk-set-uri: <YOUR_JWKSETURI>
camunda.security.authentication.providers.oidc.<provider-id>.scope: ["openid"]
camunda.security.authentication.providers.oidc.<provider-id>.audiences: <YOUR_CLIENTID>
camunda.security.authentication.providers.oidc.<provider-id>.grant-type: <GRANT_TYPE>
```

</TabItem>
<TabItem value="env">
```
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<provider-id>_CLIENTID=
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<provider-id>_CLIENTNAME=
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<provider-id>_CLIENTSECRET=
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<provider-id>_ISSUERURI=
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<provider-id>_REDIRECTURI=
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<provider-id>_AUTHORIZATIONURI=
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<provider-id>_TOKENURI=
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<provider-id>_JWKSETURI=
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<provider-id>_SCOPE=
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<provider-id>_AUDIENCES=
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<provider-id>_GRANTTYPE=
```
</TabItem>
</Tabs>

**Example configuration for two providers:**

```yaml
# Keycloak
camunda.security.authentication.providers.oidc.keycloak.client-name: "Keycloak - MyCompany"
camunda.security.authentication.providers.oidc.keycloak.client-id: <YOUR_KEYCLOAK_CLIENTID>
camunda.security.authentication.providers.oidc.keycloak.client-secret: <YOUR_KEYCLOK_CLIENTSECRET>
camunda.security.authentication.providers.oidc.keycloak.issuer-uri: "https://<KEYCLOAK_HOST>/realms/<REALM_NAME>"
camunda.security.authentication.providers.oidc.keycloak.redirect-uri: "http://localhost:8080/sso-callback"
camunda.security.authentication.providers.oidc.keycloak.audiences: <YOUR_CLIENTID>
camunda.security.authentication.providers.oidc.keycloak.scope: ["openid", "profile", "email"]

# Microsoft EntraID
camunda.security.authentication.providers.oidc.entraid.client-name: "Microsoft EntraID - ContractorCompany"
camunda.security.authentication.providers.oidc.entraid.client-id: <YOUR_ENTRAID_CLIENTID>
camunda.security.authentication.providers.oidc.entraid.client-secret: <YOUR_ENTRAID_CLIENTSECRET>
camunda.security.authentication.providers.oidc.entraid.issuer-uri: "https://login.microsoftonline.com/<YOUR_TENANT_ID>/v2.0"
camunda.security.authentication.providers.oidc.entraid.redirect-uri: "http://localhost:8080/sso-callback"
camunda.security.authentication.providers.oidc.entraid.audiences: <YOUR_ENTRAID_CLIENTID>
camunda.security.authentication.providers.oidc.entraid.scope: ["openid", "profile", "<YOUR_ENTRAID_CLIENTID>/.default"]
```

:::tip
The **issuer-uri** property is required and identifies the identity provider that issues tokens for this configuration.
:::

You can repeat these variables for any number of OIDC IdPs by using a unique `<REG_ID>` for each.

### Global OIDC Properties

The following OIDC-related properties are shared by all configured providers and **must be the same** for every IdP:

<Tabs groupId="optionsType" defaultValue="env" queryString values={[{label: 'Application.yaml', value: 'yaml' }, {label: 'Environment variables', value: 'env' }]}>
<TabItem value="yaml">

```yaml
camunda.security.authentication.oidc.client-id-claim:
camunda.security.authentication.oidc.groups-claim:
camunda.security.authentication.oidc.username-claim:
camunda.security.authentication.oidc.organization-id:
```

</TabItem>
<TabItem value="env">
```
CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENTIDCLAIM=
CAMUNDA_SECURITY_AUTHENTICATION_OIDC_GROUPSCLAIM=
CAMUNDA_SECURITY_AUTHENTICATION_OIDC_USERNAMECLAIM=
CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ORGANIZATIONID=
```
</TabItem>
</Tabs>

These define:

- Which claim to use as the client ID and username
- The claim containing group information (if applicable)
- The claim for organization or tenant assignment

All IdPs must use the same claims for these purposes.

### Login Page Behavior

After configuring multiple IdPs and restarting the Orchestration Cluster:

- The cluster login page will show a list of available OIDC Providers. Users will see the `client name` as the selection, so choose accordingly.
- Users can pick their identity provider, sign in, and proceed to Camunda UIs.
  - This login page is generated by Spring Security and suffices for most use cases.

### API Authentication

For machine-to-machine (M2M) API calls (REST/gRPC), Camunda accepts access tokens (bearer tokens) from **any** of the configured IdPs, as long as the `issuer` claim matches one of the trusted issuer URIs.

If an access token’s issuer is not configured, the request is denied.

### Best Practices

- Each IdP should use a unique and meaningful `<provider-id>`.
- Ensure the `issuer URI` is present and correct for each provider.
- Set up claims (clientId, username, groups) consistently across all IdPs.

### Overall Workflow

1. **Prepare and register applications/clients** in each IdP, obtaining client ID, secret, and issuer URI.
2. **Configure environment variables** (or use application.yaml/Helm values) for each IdP as above.
3. **Set global OIDC claims** that work across all providers.
4. **Restart Camunda Orchestration Cluster** to apply changes.
5. **Test logins** with accounts from each IdP to verify authentication and access.
6. **Assign roles and authorizations** as required (for more, see [Authorizations](../../../../components/concepts/access-control/authorizations.md)).

### Troubleshooting

- If users cannot log in, check that the client configuration, issuer URI, and claims match exactly what is set in the IdP.
- Logs will indicate if an issuer or client configuration is missing or mismatched.
- The login page may not show a provider if its configuration is incomplete.

### Further Resources

- [Configure external Identity Providers](./connect-external-identity-provider.md)
- [Camunda authentication and authorization](../../../../components/concepts/access-control/authorizations.md)
- [OIDC configuration reference](../core-settings/configuration/properties.md)
