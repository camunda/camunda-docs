---
title: Connect Orchestration Cluster to Identity Provider
sidebar_label: Connect Orchestration Cluster to Identity Provider
description: Learn how to connect Camunda 8 Orchestration Cluster Identity to an external Identity Provider (IdP) via OpenID Connect (OIDC) for authentication and user management.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Connect Orchestration Cluster to Identity Provider

This guide explains how to configure the Orchestration Cluster to use an external Identity Provider (IdP) via OpenID Connect (OIDC) for authentication and user management.

**User Interface access:**

Users authenticate via the **OIDC Authorization Code Flow**. This means users are redirected to your Identity Provider to log in, and Camunda receives a token to establish the session.
Claims from the token are used to identify the user's username and, optionally, groups for authorization.
In addition, Mapping Rules can be used to map token claims to Camunda roles, authorizations, or tenants.

Note that user information is not stored in the Orchestration Cluster when using OIDC. Hence you will notice that features like user search, user validation on assigning authorizations or tenants and user management are not available in the Orchestration Cluster Identity UI when using OIDC.

For information on configuring User Interface authentication, see the [User Interface](#user-interface) section below.

**M2M API access for Connectors and Workers:**

Connectors, job workers or other implementations that use the Orchestration Cluster REST or gRPC APIs (e.g. by using one of the Camunda Clients) do not use the browser-based authorization code flow. Instead, they authenticate using client credentials. The authentication method for Camunda Clients is separate from the interactive user login and typically require additional configuration in your Identity Provider and Camunda.

For information on configuring Connectors, job workers, or other applications to authenticate with the Orchestration Cluster APIs using client credentials, see the [M2M API access](#m2m-api-access) section below.

## User Interface

### Goal of this guide

By the end of this guide your Users should be able to authenticate to the Camunda 8 Orchestration Cluster using your own Identity Provider.

### Prerequisites

- Camunda 8 Orchestration Cluster (Self-Managed)
- Access to an OIDC-compliant Identity Provider (e.g., Keycloak, Auth0, Okta, Microsoft EntraID)
- Client credentials (client ID, client secret, issuer URI) from your Identity Provider

### Step 1: Prepare Your Identity Provider

Before configuring Camunda, perform these high-level steps in your Identity Provider:

1. **Register a new application/client** for Camunda 8 Orchestration Cluster in your Identity Provider.
   - Set the application type to "Web" or "Confidential".
   - Enable OIDC support.
   - Configure the necessary scopes (e.g., `openid`, `profile`, `email`).
   - Ensure the client is allowed to access user information.
2. **Set the redirect URI** to match your Camunda deployment (default: `http://localhost:8080/sso-callback`).
3. **Assign users or groups** who should have access to Camunda 8.
4. **(Optional) Configure group or other claims** if you want to use group-based authorizations or mapping rules in Camunda.
5. **Note the client ID, client secret, and issuer URI** for use in Camunda configuration.

> For most Identity Providers, the default claim for the username is `sub` (subject). If you want to use a different claim (e.g., `preferred_username` or `email`), configure your Identity Provider to include it in the token and update the Camunda configuration accordingly.

### Step 2: Choose Your Deployment and Configuration Method

You can configure OIDC using `application.yaml`, environment variables, or Helm values.

Select the option that best fits your deployment approach.

### Step 3: Set Authentication Method to OIDC

Set the authentication method to OIDC using the following settings:

<Tabs groupId="optionsType" defaultValue="env" queryString values={[{label: 'Application.yaml', value: 'yaml' }, {label: 'Environment variables', value: 'env' },{label: 'Helm values', value: 'helm' }]}>
<TabItem value="yaml">

```yaml
camunda.security.authentication.method: oidc
```

</TabItem>
<TabItem value="env">
```
CAMUNDA_SECURITY_AUTHENTICATION_METHOD=oidc
```
</TabItem>
<TabItem value="helm">
```
global.security.authentication.method: oidc
```
</TabItem>
</Tabs>

### Step 4: Configure OIDC Connection Details

Set the following properties with values from your Identity Provider:

<Tabs groupId="optionsType" defaultValue="env" queryString values={[{label: 'Application.yaml', value: 'yaml' }, {label: 'Environment variables', value: 'env' },{label: 'Helm values', value: 'helm' }]}>
<TabItem value="yaml">

```yaml
camunda.security.authentication.oidc.client-id: <YOUR_CLIENTID>
camunda.security.authentication.oidc.client-secret: <YOUR_CLIENTSECRET>
camunda.security.authentication.oidc.issuer-uri: <YOUR_ISSUERURI>
camunda.security.authentication.oidc.redirect-uri: <YOUR_REDIRECTURI>
camunda.security.authentication.oidc.username-claim: <YOUR_USERNAMECLAIM>
camunda.security.authentication.oidc.audiences: <YOUR_CLIENTID>
camunda.security.authentication.oidc.scope: ["openid"]
```

</TabItem>
<TabItem value="env">
```
CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENTID=<YOUR_CLIENTID>
CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENTSECRET=<YOUR_CLIENTSECRET>
CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ISSUERURI=<YOUR_ISSUERURI>
CAMUNDA_SECURITY_AUTHENTICATION_OIDC_REDIRECTURI=<YOUR_REDIRECTURI>
CAMUNDA_SECURITY_AUTHENTICATION_OIDC_USERNAMECLAIM=<YOUR_USERNAMECLAIM>
CAMUNDA_SECURITY_AUTHENTICATION_OIDC_AUDIENCES=<YOUR_CLIENTID>
CAMUNDA_SECURITY_AUTHENTICATION_OIDC_SCOPE=["openid"]
```
</TabItem>
<TabItem value="helm">
```yaml
global.security.authentication.oidc.clientId: <YOUR_CLIENTID>
global.security.authentication.oidc.clientSecret: <YOUR_CLIENTSECRET>
global.security.authentication.oidc.issuerUri: <YOUR_ISSUERURI>
global.security.authentication.oidc.redirectUri: <YOUR_REDIRECTURI>
global.security.authentication.oidc.userNameClaim: <YOUR_USERNAMECLAIM>
global.security.authentication.oidc.audiences: <YOUR_CLIENTID>
global.security.authentication.oidc.scope: ["openid"]
```
</TabItem>
</Tabs>

- _Redirect URI_: By default, the redirect URI is `http://localhost:8080/sso-callback`. Update this if your deployment uses a different hostname or port.

- _Username claim_: By default, the `sub` (subject) claim from the ID token is used as the username. If you want to use a different claim (such as `preferred_username` or `email`), ensure your Identity Provider includes it in the token and set the `username-claim` property accordingly.

#### Identity Provider Example Configurations

<Tabs groupId="idpExamples" defaultValue="entraid">
<TabItem value="entraid" label="Microsoft EntraID">
```yaml
global.security.authentication.oidc.clientId: <YOUR_CLIENTID>
global.security.authentication.oidc.clientSecret: <YOUR_CLIENTSECRET>
global.security.authentication.oidc.issuerUri: "https://login.microsoftonline.com/<YOUR_TENANT_ID>/v2.0"
global.security.authentication.oidc.redirectUri: "http://localhost:8080/sso-callback"
global.security.authentication.oidc.userNameClaim: "email"
global.security.authentication.oidc.audiences: <YOUR_CLIENTID>
global.security.authentication.oidc.scope: ["openid", "profile", "<client-id>/.default"]
```
</TabItem>
<TabItem value="keycloak" label="Keycloak">
```yaml
global.security.authentication.oidc.clientId: <YOUR_CLIENTID>
global.security.authentication.oidc.clientSecret: <YOUR_CLIENTSECRET>
global.security.authentication.oidc.issuerUri: "https://<KEYCLOAK_HOST>/realms/<REALM_NAME>"
global.security.authentication.oidc.redirectUri: "http://localhost:8080/sso-callback"
global.security.authentication.oidc.userNameClaim: "preferred_username"
global.security.authentication.oidc.audiences: <YOUR_CLIENTID>
global.security.authentication.oidc.scope: ["openid", "profile", "email"]
```
</TabItem>
</Tabs>

### Step 5: Restart the Orchestration Cluster

After updating your configuration, (re)start the Orchestration Cluster for changes to take effect.

### Step 6: Test User Authentication

At this point, you should be able to log in to the Orchestration Cluster using any user account from your Identity Provider that assigned to this client (application).

If login is successful, you will see that you are not authorized to access the Orchestration Cluster UIs. This is expected, as you have not yet configured an admin user or any authorizations for the user.

### Step 7: Configure Admin Role for Users

By default, authorizations are enabled which means that users cannot access any Orchestration Cluster UI or APIs - except authorizations have been granted to them.

In order to allow users to access the Orchestration Cluster UI, you can assign the "admin" role to a user from your Identity Provider:
<Tabs groupId="optionsType" defaultValue="env" queryString values={[{label: 'Application.yaml', value: 'yaml' }, {label: 'Environment variables', value: 'env' },{label: 'Helm values', value: 'helm' }]}>
<TabItem value="yaml">

```yaml
camunda.security.initialization.defaultRoles.admin.users[0]: <YOUR_USERNAME>
```

</TabItem>
<TabItem value="env">      
```
CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_ADMIN_USERS[0]=<YOUR_USERNAME>
```
</TabItem>
<TabItem value="helm">
```yaml
global.security.initialization.defaultRoles.admin.users[0]: <YOUR_USERNAME>
```
</TabItem>
</Tabs>

Replace `<YOUR_USERNAME>` with the actual username as provided by your Identity Provider (matching the claim configured as `username-claim`).

---

### (Optional) Step 8: Configure Bring your own Groups

The Orchestration Cluster allows you to manage groups in the Orchestration Cluster or to bring groups that you have configured in your Identity Provider.

In order to bring own groups, configure your Identity Provider to include a groups claim in the token (e.g., `groups` or `roles`). Then set the `groups-claim` property in your Camunda configuration to match the claim name.

Afterwards, you can use the groups for Role and Authorization Assignment as well as Tenant assignment.

<Tabs groupId="optionsType" defaultValue="env" queryString values={[{label: 'Application.yaml', value: 'yaml' }, {label: 'Environment variables', value: 'env' },{label: 'Helm values', value: 'helm' }]}>
<TabItem value="yaml">

```yaml
camunda.security.authentication.oidc.groups-claim: <YOUR_USERNAMECLAIM>
```

</TabItem>
<TabItem value="env">
```
CAMUNDA_SECURITY_AUTHENTICATION_OIDC_GROUPSCLAIM=<YOUR_GROUPSCLAIM>
```
</TabItem>
<TabItem value="helm">
```yaml
global.security.authentication.oidc.groupsClaim: <YOUR_GROUPSCLAIM>
```
</TabItem>
</Tabs>

### (Optional) Step 9: Advanced Mapping Rules

For advanced scenarios, such as mapping Identity Provider claims to Camunda roles, authorizations or tenants, you can use mapping rules. See the [configuration reference](./configuration.md) for details on how to define mapping rules.

## M2M API access

### Goal of this guide

By the end of this guide your Connectors, Job workers or other applications using the Orchestration Cluster REST or gRPC API should be able to authenticate to the Camunda 8 Orchestration Cluster using your own Identity Provider.

### Prerequisites

- Camunda 8 Orchestration Cluster (Self-Managed) configured against the same Identity Provider (as above)
- Access to an OIDC-compliant Identity Provider (e.g., Keycloak, Auth0, Okta, Microsoft EntraID)
- Client credentials (client ID, client secret, authorization server URI) from your Identity Provider

### Step 1: Prepare Your Identity Provider

Before configuring Camunda, perform these high-level steps in your Identity Provider:

1. **Register a new application/client** for your Job Worker in your Identity Provider.
   - Create a new application / client in your Identity Provider
   - Configure the necessary scopes (e.g., `openid`).
   - Create a new client secret.
2. **Note the client ID, client secret, and authorization URI** for use in Camunda configuration.

### Step 2: Configure your worker application

<Tabs groupId="camundaclientopts" defaultValue="camundaclient" >
<TabItem value="camundaclient" label="Camunda Client">
1) Add dependency to your Java Project:

```xml
<dependency>
    <groupId>io.camunda</groupId>
    <artifactId>camunda-client-java</artifactId>
    <version>8.8.x</version>
</dependency>
```

2. Update your java code to configure authentication and verify it:

```java
   private static final String clientId = "<YOUR_CLIENT_ID>";
   private static final String clientSecret = "<YOUR_CLIENT_SECRET>";
   private static final String authorizationServer = "<YOUR_AUTHORIZATION_SERVER>";
   private static final String audience = "<YOUR_CLIENT_ID>";
   private static final String ocAudience = "<YOUR_CLIENT_ID_FROM_OC>";
   private static final String clusterGrpcLocal = "grpc://localhost:26500";
   private static final String clusterRestLocal = "http://localhost:8080";

  // Build a new OAuthCredentialsProvider
  final OAuthCredentialsProvider credentialsProvider =
        new OAuthCredentialsProviderBuilder()
          .authorizationServerUrl(authorizationServer)
          .audience(audience)
          .clientId(clientId)
          .clientSecret(clientSecret)
          .scope(ocAudience+"/.default")
          .build();
  // Build a new Camunda Client with the CredentialsProvider
   try (CamundaClient client = CamundaClient.newClientBuilder()
            .grpcAddress(URI.create(clusterGrpcLocal))
            .restAddress(URI.create(clusterRestLocal))
            .credentialsProvider(credentialsProvider)
            .usePlaintext()
            .build()) {
      // Send a topology request to verify authentication
      Topology t = client.newTopologyRequest().send().join();
      System.out.println(t.toString());

      }
```

</TabItem>
<TabItem value="springclient" label="Camunda Spring Boot SDK">
1) Add dependency to your Java Project:

```xml
<dependency>
    <groupId>io.camunda</groupId>
    <artifactId>spring-boot-starter-camunda-sdk</artifactId>
    <version>8.8.x</version>
</dependency>
```

2. Configure your application.yaml:

```yaml
camunda:
  client:
    mode: self-managed
    auth:
      client-id: <YOUR_CLIENT_ID>
      client-secret: <YOUR_CLIENT_SECRET>
      token-url: <YOUR_AUTHORIZATION_SERVER>
      audience: <YOUR_CLIENT_ID>
      scope: <YOUR_CLIENT_ID_FROM_OC>
    grpc-address: grpc://localhost:26500
    rest-address: http://localhost:8080
```

3. Verify authentication in code:

```java
@Autowired
private CamundaClient client;

public static void main(String[] args) {
  Topology t = client.newTopologyRequest().send().join();
  System.out.println(t.toString());
}
```

</TabItem>
<TabItem value="connectorruntime" label="Camunda Connector Runtime">
</TabItem>
</Tabs>

#### Identity Provider Example Configurations

<Tabs groupId="idpExamples" defaultValue="entraid">
<TabItem value="entraid" label="Microsoft EntraID">

```java
private static final String clientId = "<YOUR_CLIENT_ID>";
private static final String clientSecret = "<YOUR_CLIENT_SECRET>";
private static final String authorizationServer = "https://login.microsoftonline.com/<YOUR_TENANT_ID>/oauth2/v2.0/token";
private static final String audience = "<YOUR_CLIENT_ID>";
private static final String ocAudience = "<YOUR_CLIENT_ID_FROM_OC>" + "/.default";
private static final String clusterGrpcLocal = "grpc://localhost:26500";
private static final String clusterRestLocal = "http://localhost:8080";
```

</TabItem>
<TabItem value="keycloak" label="Keycloak">

```java
private static final String clientId = "<YOUR_CLIENT_ID>";
private static final String clientSecret = "<YOUR_CLIENT_SECRET>";
private static final String authorizationServer = "https://<KEYCLOAK_HOST>/realms/<REALM_NAME>/protocol/openid-connect/token";
private static final String audience = "<YOUR_CLIENT_ID>";
private static final String ocAudience = "<YOUR_CLIENT_ID>";
private static final String clusterGrpcLocal = "grpc://localhost:26500";
private static final String clusterRestLocal = "http://localhost:8080";
```

</TabItem>
</Tabs>

## Troubleshooting

- Check logs for authentication errors.
- Ensure your IdP client is configured to allow the specified redirect URI.
- Verify claim names match your IdP's token claims.

## Learn More

- [OIDC configuration reference](./configuration.md)
- [OpenID Connect (OIDC) overview](https://openid.net/connect/)
- [Camunda documentation: Authentication and Authorization](../../../../components/concepts/access-control/authorizations.md)
