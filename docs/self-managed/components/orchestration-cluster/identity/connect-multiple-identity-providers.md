---
id: connect-multiple-identity-providers
title: Connect to multiple identity providers
sidebar_label: Connect to multiple identity providers
description: Learn how to connect Camunda 8 Orchestration Cluster Identity to multiple external identity providers (IdPs) using OpenID Connect (OIDC) for authentication and user management.
unlisted: true
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Camunda 8 Orchestration Cluster supports multiple OpenID Connect (OIDC) identity providers (IdPs). This lets users from different organizations authenticate using their preferred provider.

With multiple IdPs configured:

- Users choose an IdP when logging in to a cluster.
- Camunda validates and accepts access tokens from trusted issuers for UI and API access.
- You can support identity federation and multi-tenancy scenarios with more flexible authentication.

## Overview

When multiple OIDC providers are set up, the cluster login page lets users select the provider they wish to use. For API access, any bearer token issued by one of the configured and trusted issuers is accepted; all others are denied.

## Prerequisites

- Camunda 8 Orchestration Cluster (Self-Managed) deployed.
- At least two OIDC-compliant IdPs (for example, Microsoft Entra ID, Keycloak, Okta).
- Administrative access to each IdP (to register applications and obtain credentials).

## Configure multiple identity providers

Configure multiple IdPs by defining each provider as a separate registration in `application.yaml` or using environment variables.

Each provider is identified by a unique `<provider-id>`, which is a user-defined label (e.g., `ENTRA`, `KEYCLOAK`, `PARTNER_X`).

### Configure OIDC connection details for each provider

Define each provider’s settings using the following pattern (`<provider-id>` is your chosen ID):

<Tabs
groupId="optionsType"
defaultValue="yaml"
queryString
values={[
{ label: "application.yaml", value: "yaml" },
{ label: "Environment variables", value: "env" }
]}

> <TabItem value="yaml">

```yaml
camunda.security.authentication.providers.oidc.<provider-id>.client-id: <YOUR_CLIENTID>
camunda.security.authentication.providers.oidc.<provider-id>.client-name: <YOUR_CLIENTNAME>
camunda.security.authentication.providers.oidc.<provider-id>.client-secret: <YOUR_CLIENTSECRET>
camunda.security.authentication.providers.oidc.<provider-id>.issuer-uri: <YOUR_ISSUERURI>
camunda.security.authentication.providers.oidc.<provider-id>.redirect-uri: <YOUR_REDIRECTURI>
camunda.security.authentication.providers.oidc.<provider-id>.token-uri: <YOUR_TOKENURI>
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

Example configuration for two providers:

```yaml
# Keycloak
camunda.security.authentication.providers.oidc.keycloak.client-name: "Keycloak - MyCompany"
camunda.security.authentication.providers.oidc.keycloak.client-id: <YOUR_KEYCLOAK_CLIENTID>
camunda.security.authentication.providers.oidc.keycloak.client-secret: <YOUR_KEYCLOAK_CLIENTSECRET>
camunda.security.authentication.providers.oidc.keycloak.issuer-uri: "https://<KEYCLOAK_HOST>/realms/<REALM_NAME>"
camunda.security.authentication.providers.oidc.keycloak.redirect-uri: "http://localhost:8080/sso-callback"
camunda.security.authentication.providers.oidc.keycloak.audiences: <YOUR_CLIENTID>
camunda.security.authentication.providers.oidc.keycloak.scope:
  ["openid", "profile", "email"]

# Microsoft EntraID
camunda.security.authentication.providers.oidc.entraid.client-name: "Microsoft EntraID - ContractorCompany"
camunda.security.authentication.providers.oidc.entraid.client-id: <YOUR_ENTRAID_CLIENTID>
camunda.security.authentication.providers.oidc.entraid.client-secret: <YOUR_ENTRAID_CLIENTSECRET>
camunda.security.authentication.providers.oidc.entraid.issuer-uri: "https://login.microsoftonline.com/<YOUR_TENANT_ID>/v2.0"
camunda.security.authentication.providers.oidc.entraid.redirect-uri: "http://localhost:8080/sso-callback"
camunda.security.authentication.providers.oidc.entraid.audiences: <YOUR_ENTRAID_CLIENTID>
camunda.security.authentication.providers.oidc.entraid.scope:
  ["openid", "profile", "<YOUR_ENTRAID_CLIENTID>/.default"]
```

:::tip
The `issuer-uri` property is required for each provider configuration.
:::

You can repeat these variables for any number of OIDC IdPs by using a unique `<provider-id>` for each.

### Configure global OIDC claims

The following OIDC-related properties are shared by all configured providers and must be the same for every IdP:

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

### Login page behavior

After you configure multiple IdPs and restart Camunda 8 Orchestration Cluster, users can select an identity provider on the login page and sign in.

### API authentication

For machine-to-machine (M2M) API calls (REST/gRPC), Camunda accepts access tokens (bearer tokens) from any of the configured IdPs, as long as the `issuer` claim matches one of the trusted issuer URIs.

If an access token’s issuer is not configured, the request is denied.

### Best practices

- Each IdP should use a unique and meaningful `<provider-id>`.
- Ensure the `issuer URI` is present and correct for each provider.
- Configure claims consistently across all IdPs (for example, client ID, username, and groups).

### Overall workflow

1. Prepare and register applications/clients in each IdP. Obtain the client ID, client secret, and issuer URI.
2. Configure each IdP using environment variables or `application.yaml` (or Helm values).
3. Configure global OIDC claims that work across all providers.
4. Restart Camunda 8 Orchestration Cluster to apply the changes.
5. Test login with accounts from each IdP.
6. Assign roles and authorizations as needed. For details, see [Authorizations](../../../../components/concepts/access-control/authorizations.md).

### Troubleshooting

- If users cannot log in, verify that the client configuration, issuer URI, and claims match the values configured in the IdP.
- Check the Orchestration Cluster logs for missing or mismatched issuer and client configuration.
- If a provider does not appear on the login page, verify that its configuration is complete.

### Further resources

- [Configure external Identity Providers](./connect-external-identity-provider.md)
- [Camunda authentication and authorization](../../../../components/concepts/access-control/authorizations.md)
- [OIDC configuration reference](../core-settings/configuration/properties.md)
