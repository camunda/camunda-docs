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

Each provider is identified by a unique `registration-id`, which is a user-defined label (e.g., `ENTRA`, `KEYCLOAK`, `PARTNER_X`).

### Configure OIDC connection details for each provider

Define each provider’s settings using the following pattern (`<REG_ID>` is your chosen registration id):

<Tabs groupId="optionsType" defaultValue="env" queryString values={[{label: 'Application.yaml', value: 'yaml' }, {label: 'Environment variables', value: 'env' }]}>
<TabItem value="yaml">

```yaml
camunda.security.authentication.providers.oidc.<REG_ID>.client-id: <YOUR_CLIENTID>
camunda.security.authentication.providers.oidc.<REG_ID>.client-name: <YOUR_CLIENTNAME>
camunda.security.authentication.providers.oidc.<REG_ID>.client-secret: <YOUR_CLIENTSECRET>
camunda.security.authentication.providers.oidc.<REG_ID>.issuer-uri: <YOUR_ISSUERURI>
camunda.security.authentication.providers.oidc.<REG_ID>.redirect-uri: <YOUR_REDIRECTURI>
camunda.security.authentication.providers.oidc.<REG_ID>.token-uri: <YOUR_TOKENRUI>
camunda.security.authentication.providers.oidc.<REG_ID>.jwk-set-uri: <YOUR_JWKSETURI>
camunda.security.authentication.providers.oidc.<REG_ID>.scope: ["openid"]
camunda.security.authentication.providers.oidc.<REG_ID>.audiences: <YOUR_CLIENTID>
camunda.security.authentication.providers.oidc.<REG_ID>.grant-type:
```

</TabItem>
<TabItem value="env">
```
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<REG_ID>_CLIENTID=
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<REG_ID>_CLIENTNAME=
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<REG_ID>_CLIENTSECRET=
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<REG_ID>_ISSUERURI=
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<REG_ID>_REDIRECTURI=
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<REG_ID>_AUTHORIZATIONURI=
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<REG_ID>_TOKENURI=
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<REG_ID>_JWKSETURI=
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<REG_ID>_SCOPE=
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<REG_ID>_AUDIENCES=
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<REG_ID>_GRANTTYPE=
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<REG_ID>_AUTHORIZEREQUESTCONFIGURATION_ADDITIONALPARAMETERS=
```
</TabItem>
</Tabs>

**Example configuration using environment variables for two providers:**

```
# OIDC provider with registration ID: ENTRA (Microsoft Entra ID)
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_ENTRA_CLIENTID=<your-entra-client-id>
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_ENTRA_CLIENTSECRET=<your-entra-client-secret>
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_ENTRA_ISSUERURI=https://login.microsoftonline.com/<YOUR_TENANT_ID>/v2.0
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_ENTRA_REDIRECTURI=http://localhost:8080/sso-callback

# OIDC provider with registration ID: KEYCLOAK
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_KEYCLOAK_CLIENTID=<your-keycloak-client-id>
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_KEYCLOAK_CLIENTSECRET=<your-keycloak-client-secret>
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_KEYCLOAK_ISSUERURI=https://<KEYCLOAK_HOST>/realms/<REALM_NAME>
CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_KEYCLOAK_REDIRECTURI=http://localhost:8080/sso-callback
```

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

- The login page will show a list of available OIDC Providers. Users will see the `<REG_ID>` as the selection, so choose accordingly.
- Users can pick their identity provider, sign in, and proceed to Camunda UIs.
  - This login page is generated by Spring Security and suffices for most use cases.

### API Authentication

For machine-to-machine (M2M) API calls (REST/gRPC), Camunda accepts access tokens (bearer tokens) from **any** of the configured IdPs, as long as the `issuer` claim matches one of the trusted issuer URIs.

If an access token’s issuer is not configured, the request is denied.

### Best Practices

- Each IdP registration should use a unique and meaningful `<registration-id>`. This will be visible to users on the login page, so choose appropriately
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
