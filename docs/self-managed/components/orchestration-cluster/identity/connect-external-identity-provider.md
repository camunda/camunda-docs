---
title: Connect Identity to an identity provider
sidebar_label: Connect to an identity provider
description: Learn how to connect Camunda 8 Orchestration Cluster Identity to an external Identity Provider (IdP) via OpenID Connect (OIDC) for authentication and user management.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Configure Identity to use an external identity provider (IdP) via OpenID Connect (OIDC).

## About Authentication and authorization

You can configure IdP integration to control authentication and authorization for both the user interface (UI) and machine-to-machine (M2M) API access (for connectors and workers).

| Access type                                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| :----------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [User Interface](#user-interface)                      | <p>Users authenticate via the OIDC [Authorization Code Flow](https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth).</p><p><ul><li><p>Users are redirected to your IdP to log in, and Camunda receives a token to establish the session.</p></li><li><p>Claims from the token are used to identify the user's username, and (optionally) groups for easier assignment and management.</p></li><li><p>Mapping Rules can be used to map token claims to Camunda roles, authorizations, or tenants.</p></li></ul></p><p>As user information is not stored in the Orchestration Cluster using OIDC, features such as user search and user validation on assigning authorizations or tenants and user management are not available in the Orchestration Cluster Identity UI.</p> |
| [Machine-to-machine (M2M) API access](#m2m-api-access) | <p>Connectors, job workers or other implementations that use the Orchestration Cluster REST or gRPC APIs (for example, by using one of the Camunda Clients) do not use the browser-based authorization code flow.</p><p>Instead, they authenticate using client credentials. The authentication method for Camunda Clients is separate from the interactive user login and typically requires additional configuration in your IdP and Camunda.</p>                                                                                                                                                                                                                                                                                                                                      |

## User Interface

Configure Identity so your users can use your IdP to authenticate to the Orchestration Cluster.

### Prerequisites

- A Camunda 8 Orchestration Cluster (Self-Managed).
- Access to an OIDC-compliant IdP (for example, Keycloak, Auth0, Okta, Microsoft EntraID).
- Client credentials (client ID, client secret, issuer URI) from your IdP.

### Step 1: Prepare your IdP

Before configuring Camunda, you must first prepare your IdP:

1. Register a new application/client for the Orchestration Cluster in your IdP.
   - Set the application type to "Web" or "Confidential".
   - Enable OIDC support.
   - Configure the necessary scopes (for example, `openid`, `profile`, `email`).
   - Ensure the client is allowed to access user information.
2. Set the **redirect URI** to match your Camunda deployment (default: `http://localhost:8080/sso-callback`).
3. Assign the users or groups who require access to Camunda 8.
4. (Optional) Configure group or other claims if you want to use group-based authorizations or mapping rules in Camunda.
5. Note the **client ID**, **client secret**, and **issuer URI** as these are required during Camunda configuration.

:::note
For most IdPs, the default claim for the username is `sub` (subject). If you want to use a different claim (for example, `preferred_username` or `email`), [configure](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#oidc-configuration) your IdP to include it in the token, and update the Camunda configuration.
:::

### Step 2: Choose Your deployment and configuration Method

You can configure OIDC using `application.yaml`, environment variables, or Helm values.

Select the option that best fits your deployment approach.

### Step 3: Set the authentication method to OIDC

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

### Step 4: Configure the OIDC connection details

Set the following properties using the respective values from your IdP:

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
global.security.authentication.oidc.usernameClaim: <YOUR_USERNAMECLAIM>
global.security.authentication.oidc.audiences: <YOUR_CLIENTID>
global.security.authentication.oidc.scope: ["openid"]
```
</TabItem>
</Tabs>

- **Redirect URI**: By default, the redirect URI is `http://localhost:8080/sso-callback`. Update this if your deployment uses a different hostname or port.

- **Username claim**: By default, the `sub` (subject) claim from the token is used as the username. If you want to use a different claim (such as `preferred_username` or `email`), ensure your IdP includes it in the token and set the `username-claim` property accordingly. You can use a [JSONPath expression](https://www.rfc-editor.org/rfc/rfc9535.html) to locate the username claim in the token (for example, `$['camundaorg']['username']`).

#### Example IdP configuration

The following examples use HELM values notation. You can also apply these using application.yaml or environment variables shown above.

<Tabs groupId="idpExamples" defaultValue="entraid">
<TabItem value="entraid" label="Microsoft EntraID">
```yaml
global.security.authentication.oidc.clientId: <YOUR_CLIENTID>
global.security.authentication.oidc.clientSecret: <YOUR_CLIENTSECRET>
global.security.authentication.oidc.issuerUri: "https://login.microsoftonline.com/<YOUR_TENANT_ID>/v2.0"
global.security.authentication.oidc.redirectUri: "http://localhost:8080/sso-callback"
global.security.authentication.oidc.usernameClaim: "email"
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
global.security.authentication.oidc.usernameClaim: "preferred_username"
global.security.authentication.oidc.audiences: <YOUR_CLIENTID>
global.security.authentication.oidc.scope: ["openid", "profile", "email"]
```
</TabItem>
</Tabs>

### Step 5: Restart the Orchestration Cluster

After updating your configuration, (re)start the Orchestration Cluster for the configuration changes to be applied.

### Step 6: Test user authentication

At this point, you should be able to log in to the Orchestration Cluster using any user account from your IdP that is assigned to this client (application).

:::note
If login is successful, you will see that you are not authorized to access the Orchestration Cluster UIs. This is expected, as you have not yet configured an Admin user or any authorizations for the user.
:::

### Step 7: Assign Admin role to users

[Authorizations](../../../../components/concepts/access-control/authorizations.md) are enabled by default. This means users cannot access any Orchestration Cluster UI or APIs - except authorizations that have been granted to them.

To allow users to access the Orchestration Cluster UI, you can assign the "Admin" role to a user from your IdP:

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

1. Replace `<YOUR_USERNAME>` with the username provided by your IdP (matching the claim configured as `username-claim`).
1. Restart your Orchestration Cluster and verify that the chosen user has the Admin Role, for example by visiting `localhost:8080/identity/roles/admin/users`.
1. If the username is shown, continue configuring your own groups, mapping rules, or setting up [authorizations](../../../../components/concepts/access-control/authorizations.md) for other users.

### (Optional) Step 8: Configure bring your own groups

You can manage groups in the Orchestration Cluster or bring groups that you have already configured in your IdP:

1. Configure your IdP to include a groups claim in the token (for example, `groups` or `roles`). The value should be an strings array.
1. Set the `groups-claim` property in your Camunda configuration to match the claim name. Similar to the `username-claim`, you can use a [JSONPath expression](https://www.rfc-editor.org/rfc/rfc9535.html) to locate the groups claim in the token (for example, `$['camundaorg']['groups']`).

You can then use these groups for role and authorization assignment, and tenant assignment.

<Tabs groupId="optionsType" defaultValue="env" queryString values={[{label: 'Application.yaml', value: 'yaml' }, {label: 'Environment variables', value: 'env' },{label: 'Helm values', value: 'helm' }]}>
<TabItem value="yaml">

```yaml
camunda.security.authentication.oidc.groups-claim: <YOUR_GROUPSCLAIM>
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

### (Optional) Step 9: Mapping rules

You can use mapping rules for advanced scenarios, such as mapping IdP claims to Camunda roles, authorizations, or tenants. See [configuration reference](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md) for more information on how to define mapping rules.

## Machine-to-machine (M2M) API access

Configure Identity so your connectors, job workers, or other applications using the Orchestration Cluster REST or gRPC API can use your IdP to authenticate to the Orchestration Cluster.

### Prerequisites

- Camunda 8 Orchestration Cluster (Self-Managed) configured against the same IdP (as above).
- Access to an OIDC-compliant Identity Provider (for example, Keycloak, Auth0, Okta, Microsoft EntraID).
- Client credentials (client ID, client secret, authorization server URI) from your IdP.

### Step 1: Prepare your IdP

Before configuring Camunda, you must first prepare your IdP:

1. Register a new application/client for your job worker in your IdP.
   - Create a new application/client in your IdP.
   - Configure the necessary scopes (for example, `openid`).
   - Create a new client secret.
2. Note the **client ID**, **client secret**, and **authorization URI** as these are required during Camunda configuration.

### Step 2: Configure your worker application

Depending on your application type (for example, standalone Java application, Spring Boot application), the configuration steps may vary.

- **Audience Validation**: If you have configured the audiences property for the Orchestration Cluster (`camunda.security.authentication.oidc.audiences`), the Orchestration Cluster will validate the audience claim in the token against the configured audiences. Make sure your token has the correct audience from the Orchestration Cluster above, or add your audience in the Orchestration Cluster configuration.

:::note
As per default authorizations are enabled, your application will only be able to retrieve the topology, with other requests requiring you to configure [authorizations](../../../../components/concepts/access-control/authorizations.md) for the client. You should use your `client id` when configuring authorizations.
:::

<Tabs groupId="camundaclientopts" defaultValue="camundaclient" >
<TabItem value="camundaclient" label="Camunda Client">
1) Add the dependency to your Java Project:

```xml
<dependency>
    <groupId>io.camunda</groupId>
    <artifactId>camunda-client-java</artifactId>
    <version>8.8.x</version>
</dependency>
```

2. Update your Java code to configure and verify authentication:

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
          .scope(ocAudience) // for Microsoft EntraID typically use: ocAudience + "/.default"
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
1) Add the dependency to your Java Project:

```xml
<dependency>
    <groupId>io.camunda</groupId>
    <artifactId>spring-boot-starter-camunda-sdk</artifactId>
    <version>${version.camundastarter}</version>
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
@SpringBootApplication
public class App implements CommandLineRunner
{
	  @Autowired
	  private CamundaClient client;

	  public static void main(String[] args) {
		  SpringApplication.run(App.class, args);

	  }
	  @Override
		public void run(final String... args) {
		  Topology t = client.newTopologyRequest().send().join();
		    System.out.println(t.toString());
	  }
}
```

</TabItem>
<TabItem value="connectorruntime" label="Camunda Connector Runtime">
1. Configure your application.yaml:

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

2. Add the following dependencies to your project:

```xml
<dependency>
    <groupId>io.camunda.connector</groupId>
    <artifactId>spring-boot-starter-camunda-connectors</artifactId>
    <version>${version.connectors}</version>
</dependency>
```

Note: You can run the Connector Runtime simply using Helm or Docker Image.

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

- Check the logs for authentication errors.
- Ensure your IdP client is configured to allow the specified redirect URI.
- Verify the claim names match your IdP's token claims.

## Further resources

- [OIDC configuration reference](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md)
- [OpenID Connect (OIDC) overview](https://openid.net/connect/)
- [Camunda authentication and authorization](../../../../components/concepts/access-control/authorizations.md)
