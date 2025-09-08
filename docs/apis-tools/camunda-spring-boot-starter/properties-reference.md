---
id: properties-reference
title: Properties reference
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import Property from "@site/src/components/Property";

Properties for the Camunda Spring Boot Starter.

## Properties

<Tabs groupId="property-format" defaultValue="property" queryString values={

[
{label: 'Configuration property', value: 'property' },
{label: 'Environment variable', value: 'env' },
]
}>
</Tabs>

### `camunda.client`

Properties for the Camunda client.

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Description</th>
    <th>Default value</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.ca-certificate-path" env="CAMUNDA_CLIENT_CACERTIFICATEPATH"/><a href="#camundaclientca-certificate-path" id="camundaclientca-certificate-path" class="hash-link"/>
</td>

<td>

The path to a root Certificate Authority (CA) certificate to use instead of the certificate in the default store.

Type: <code>string</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.enabled" env="CAMUNDA_CLIENT_ENABLED"/><a href="#camundaclientenabled" id="camundaclientenabled" class="hash-link"/>
</td>

<td>

Enable or disable the Camunda client. If disabled, the client bean is not created.

Type: <code>boolean</code>

</td>
<td>
  <code>true</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.execution-threads" env="CAMUNDA_CLIENT_EXECUTIONTHREADS"/><a href="#camundaclientexecution-threads" id="camundaclientexecution-threads" class="hash-link"/>
</td>

<td>

The number of threads for invocation of job workers.

Type: <code>integer</code>

</td>
<td>
  <code>1</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.grpc-address" env="CAMUNDA_CLIENT_GRPCADDRESS"/><a href="#camundaclientgrpc-address" id="camundaclientgrpc-address" class="hash-link"/>
</td>

<td>

The gRPC address of Camunda that the client can connect to. The address must be an absolute URL, including the scheme. An alternative default is set by both `camunda.client.mode`.

Type: <code>url</code>

</td>
<td>
  <code>&quot;http:&#x2F;&#x2F;0.0.0.0:26500&quot;</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.keep-alive" env="CAMUNDA_CLIENT_KEEPALIVE"/><a href="#camundaclientkeep-alive" id="camundaclientkeep-alive" class="hash-link"/>
</td>

<td>

The time interval between keep-alive messages sent to the gateway.

Type: <code>duration</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.max-message-size" env="CAMUNDA_CLIENT_MAXMESSAGESIZE"/><a href="#camundaclientmax-message-size" id="camundaclientmax-message-size" class="hash-link"/>
</td>

<td>

A custom `maxMessageSize` sets the maximum inbound message size the client can receive from Camunda. It specifies the `maxInboundMessageSize` of the gRPC channel.

Type: <code>dataSize</code>

</td>
<td>
  <code>&quot;5MB&quot;</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.max-metadata-size" env="CAMUNDA_CLIENT_MAXMETADATASIZE"/><a href="#camundaclientmax-metadata-size" id="camundaclientmax-metadata-size" class="hash-link"/>
</td>

<td>

A custom `maxMetadataSize` sets the maximum inbound metadata size the client can receive from Camunda. It specifies the `maxInboundMetadataSize` of the gRPC channel.

Type: <code>dataSize</code>

</td>
<td>
  <code>&quot;16KB&quot;</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.message-time-to-live" env="CAMUNDA_CLIENT_MESSAGETIMETOLIVE"/><a href="#camundaclientmessage-time-to-live" id="camundaclientmessage-time-to-live" class="hash-link"/>
</td>

<td>

The default time-to-live for a message when no value is provided.

Type: <code>duration</code>

</td>
<td>
  <code>&quot;PT1H&quot;</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.mode" env="CAMUNDA_CLIENT_MODE"/><a href="#camundaclientmode" id="camundaclientmode" class="hash-link"/>
</td>

<td>

The client mode to use. If not set, `saas` mode is detected based on the presence of a `camunda.client.cloud.cluster-id`.

Type: <code>enum[self-managed, saas]</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.override-authority" env="CAMUNDA_CLIENT_OVERRIDEAUTHORITY"/><a href="#camundaclientoverride-authority" id="camundaclientoverride-authority" class="hash-link"/>
</td>

<td>

Overrides the authority used with TLS virtual hosting to change hostname verification during the TLS handshake. It does not change the actual host connected to.

Type: <code>string</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.prefer-rest-over-grpc" env="CAMUNDA_CLIENT_PREFERRESTOVERGRPC"/><a href="#camundaclientprefer-rest-over-grpc" id="camundaclientprefer-rest-over-grpc" class="hash-link"/>
</td>

<td>

If `true`, prefers REST over gRPC for operations supported by both protocols.

Type: <code>boolean</code>

</td>
<td>
  <code>true</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.request-timeout" env="CAMUNDA_CLIENT_REQUESTTIMEOUT"/><a href="#camundaclientrequest-timeout" id="camundaclientrequest-timeout" class="hash-link"/>
</td>

<td>

The request timeout to use when not overridden by a specific command.

Type: <code>duration</code>

</td>
<td>
  <code>&quot;PT10S&quot;</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.request-timeout-offset" env="CAMUNDA_CLIENT_REQUESTTIMEOUTOFFSET"/><a href="#camundaclientrequest-timeout-offset" id="camundaclientrequest-timeout-offset" class="hash-link"/>
</td>

<td>

The request timeout client offset applies to commands that also pass the request timeout to the server. It ensures the client timeout occurs after the server timeout. For these commands, the client-side timeout equals the request timeout plus the offset.

Type: <code>duration</code>

</td>
<td>
  <code>&quot;PT1S&quot;</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.rest-address" env="CAMUNDA_CLIENT_RESTADDRESS"/><a href="#camundaclientrest-address" id="camundaclientrest-address" class="hash-link"/>
</td>

<td>

The REST API address of the Camunda instance that the client can connect to. The address must be an absolute URL, including the scheme. An alternative default is set by both`camunda.client.mode`.

Type: <code>url</code>

</td>
<td>
  <code>&quot;http:&#x2F;&#x2F;0.0.0.0:8080&quot;</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.tenant-id" env="CAMUNDA_CLIENT_TENANTID"/><a href="#camundaclienttenant-id" id="camundaclienttenant-id" class="hash-link"/>
</td>

<td>

The tenant ID used for tenant-aware commands when no tenant ID is set.

Type: <code>string</code>

</td>
<td>
  <code>&quot;&lt;default&gt;&quot;</code>
</td>
</tr>
</tbody>
</table>

### `camunda.client.auth`

Properties for authenticating the Camunda client.

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Description</th>
    <th>Default value</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.audience" env="CAMUNDA_CLIENT_AUTH_AUDIENCE"/><a href="#camundaclientauthaudience" id="camundaclientauthaudience" class="hash-link"/>
</td>

<td>

The resource for which the access token must be valid. A default is set by `camunda.client.mode: saas` and `camunda.client.auth.method: oidc`.

Type: <code>string</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.client-id" env="CAMUNDA_CLIENT_AUTH_CLIENTID"/><a href="#camundaclientauthclient-id" id="camundaclientauthclient-id" class="hash-link"/>
</td>

<td>

The client ID to use when requesting an access token from the OAuth authorization server.

Type: <code>string</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.client-secret" env="CAMUNDA_CLIENT_AUTH_CLIENTSECRET"/><a href="#camundaclientauthclient-secret" id="camundaclientauthclient-secret" class="hash-link"/>
</td>

<td>

The client secret to use when requesting an access token from the OAuth authorization server.

Type: <code>string</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.connect-timeout" env="CAMUNDA_CLIENT_AUTH_CONNECTTIMEOUT"/><a href="#camundaclientauthconnect-timeout" id="camundaclientauthconnect-timeout" class="hash-link"/>
</td>

<td>

The connection timeout for requests to the OAuth credentials provider.

Type: <code>duration</code>

</td>
<td>
  <code>&quot;PT5S&quot;</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.credentials-cache-path" env="CAMUNDA_CLIENT_AUTH_CREDENTIALSCACHEPATH"/><a href="#camundaclientauthcredentials-cache-path" id="camundaclientauthcredentials-cache-path" class="hash-link"/>
</td>

<td>

The path to the credentials cache file.

Type: <code>string</code>

</td>
<td>
  <code>&quot;$HOME&#x2F;.camunda&#x2F;credentials&quot;</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.keystore-key-password" env="CAMUNDA_CLIENT_AUTH_KEYSTOREKEYPASSWORD"/><a href="#camundaclientauthkeystore-key-password" id="camundaclientauthkeystore-key-password" class="hash-link"/>
</td>

<td>

The keystore key password for the OAuth identity provider.

Type: <code>string</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.keystore-password" env="CAMUNDA_CLIENT_AUTH_KEYSTOREPASSWORD"/><a href="#camundaclientauthkeystore-password" id="camundaclientauthkeystore-password" class="hash-link"/>
</td>

<td>

The keystore password for the OAuth identity provider.

Type: <code>string</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.keystore-path" env="CAMUNDA_CLIENT_AUTH_KEYSTOREPATH"/><a href="#camundaclientauthkeystore-path" id="camundaclientauthkeystore-path" class="hash-link"/>
</td>

<td>

The path to the keystore for the OAuth identity provider.

Type: <code>file</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.method" env="CAMUNDA_CLIENT_AUTH_METHOD"/><a href="#camundaclientauthmethod" id="camundaclientauthmethod" class="hash-link"/>
</td>

<td>

The authentication method to use. If not set, it is detected based on the presence of a username, password, client ID, and client secret. A default is set by `camunda.client.mode: saas`.

Type: <code>enum[none, basic, oidc]</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.password" env="CAMUNDA_CLIENT_AUTH_PASSWORD"/><a href="#camundaclientauthpassword" id="camundaclientauthpassword" class="hash-link"/>
</td>

<td>

The password to be use for basic authentication. A default is set by `camunda.client.auth.method: basic`.

Type: <code>string</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.read-timeout" env="CAMUNDA_CLIENT_AUTH_READTIMEOUT"/><a href="#camundaclientauthread-timeout" id="camundaclientauthread-timeout" class="hash-link"/>
</td>

<td>

The data read timeout for requests to the OAuth credentials provider.

Type: <code>duration</code>

</td>
<td>
  <code>&quot;PT5S&quot;</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.resource" env="CAMUNDA_CLIENT_AUTH_RESOURCE"/><a href="#camundaclientauthresource" id="camundaclientauthresource" class="hash-link"/>
</td>

<td>

The resource for which the access token must be valid.

Type: <code>string</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.scope" env="CAMUNDA_CLIENT_AUTH_SCOPE"/><a href="#camundaclientauthscope" id="camundaclientauthscope" class="hash-link"/>
</td>

<td>

The scopes of the access token.

Type: <code>string</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.token-url" env="CAMUNDA_CLIENT_AUTH_TOKENURL"/><a href="#camundaclientauthtoken-url" id="camundaclientauthtoken-url" class="hash-link"/>
</td>

<td>

The authorization server URL from which to request the access token. A default is set by `camunda.client.mode: saas` and `camunda.client.auth.method: oidc`.

Type: <code>url</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.truststore-password" env="CAMUNDA_CLIENT_AUTH_TRUSTSTOREPASSWORD"/><a href="#camundaclientauthtruststore-password" id="camundaclientauthtruststore-password" class="hash-link"/>
</td>

<td>

The truststore password for the OAuth identity provider.

Type: <code>string</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.truststore-path" env="CAMUNDA_CLIENT_AUTH_TRUSTSTOREPATH"/><a href="#camundaclientauthtruststore-path" id="camundaclientauthtruststore-path" class="hash-link"/>
</td>

<td>

The path to the truststore for the OAuth identity provider.

Type: <code>file</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.username" env="CAMUNDA_CLIENT_AUTH_USERNAME"/><a href="#camundaclientauthusername" id="camundaclientauthusername" class="hash-link"/>
</td>

<td>

The username to use for basic authentication. A default is set by `camunda.client.auth.method: basic`.

Type: <code>string</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
</tbody>
</table>

### `camunda.client.auth.client-assertion`

Properties for OIDC authentication using a client assertion instead of a client secret.

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Description</th>
    <th>Default value</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.client-assertion.keystore-key-alias" env="CAMUNDA_CLIENT_AUTH_CLIENTASSERTION_KEYSTOREKEYALIAS"/><a href="#camundaclientauthclient-assertionkeystore-key-alias" id="camundaclientauthclient-assertionkeystore-key-alias" class="hash-link"/>
</td>

<td>

The alias of the key containing the certificate used to sign the client assertion certificate. If not set, the first alias from the keystore is used.

Type: <code>string</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.client-assertion.keystore-key-password" env="CAMUNDA_CLIENT_AUTH_CLIENTASSERTION_KEYSTOREKEYPASSWORD"/><a href="#camundaclientauthclient-assertionkeystore-key-password" id="camundaclientauthclient-assertionkeystore-key-password" class="hash-link"/>
</td>

<td>

The password of the key referenced by the alias. If not set, the keystore password is used.

Type: <code>string</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.client-assertion.keystore-password" env="CAMUNDA_CLIENT_AUTH_CLIENTASSERTION_KEYSTOREPASSWORD"/><a href="#camundaclientauthclient-assertionkeystore-password" id="camundaclientauthclient-assertionkeystore-password" class="hash-link"/>
</td>

<td>

The password of the referenced keystore.

Type: <code>string</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.client-assertion.keystore-path" env="CAMUNDA_CLIENT_AUTH_CLIENTASSERTION_KEYSTOREPATH"/><a href="#camundaclientauthclient-assertionkeystore-path" id="camundaclientauthclient-assertionkeystore-path" class="hash-link"/>
</td>

<td>

The path to the keystore where the client assertion certificate is stored.

Type: <code>file</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
</tbody>
</table>

### `camunda.client.cloud`

Properties for connecting the Camunda client to SaaS. These are used to compose default connection details when the client is configured to `camunda.client.mode: saas`.

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Description</th>
    <th>Default value</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.cloud.cluster-id" env="CAMUNDA_CLIENT_CLOUD_CLUSTERID"/><a href="#camundaclientcloudcluster-id" id="camundaclientcloudcluster-id" class="hash-link"/>
</td>

<td>

The cluster ID the Camunda client connects to.

Type: <code>string</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.cloud.domain" env="CAMUNDA_CLIENT_CLOUD_DOMAIN"/><a href="#camundaclientclouddomain" id="camundaclientclouddomain" class="hash-link"/>
</td>

<td>

The domain the Camunda client connects to. Change this to connect to a non-production instance of Camunda Cloud.

Type: <code>string</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.cloud.port" env="CAMUNDA_CLIENT_CLOUD_PORT"/><a href="#camundaclientcloudport" id="camundaclientcloudport" class="hash-link"/>
</td>

<td>

The port the Camunda client connects to.

Type: <code>integer</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.cloud.region" env="CAMUNDA_CLIENT_CLOUD_REGION"/><a href="#camundaclientcloudregion" id="camundaclientcloudregion" class="hash-link"/>
</td>

<td>

The region the Camunda client connects to.

Type: <code>string</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
</tbody>
</table>

### `camunda.client.deployment`

Properties for automatic deployment at startup.

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Description</th>
    <th>Default value</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.deployment.enabled" env="CAMUNDA_CLIENT_DEPLOYMENT_ENABLED"/><a href="#camundaclientdeploymentenabled" id="camundaclientdeploymentenabled" class="hash-link"/>
</td>

<td>

Indicates if deployment uses the `@Deployment` annotation.

Type: <code>boolean</code>

</td>
<td>
  <code>true</code>
</td>
</tr>
</tbody>
</table>

### `camunda.client.worker.defaults`

Global default properties for job workers registered to the Camunda client.

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Description</th>
    <th>Default value</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.auto-complete" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_AUTOCOMPLETE"/><a href="#camundaclientworkerdefaultsauto-complete" id="camundaclientworkerdefaultsauto-complete" class="hash-link"/>
</td>

<td>

Enable or disable automatic job completion after method invocation.

Type: <code>boolean</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.enabled" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_ENABLED"/><a href="#camundaclientworkerdefaultsenabled" id="camundaclientworkerdefaultsenabled" class="hash-link"/>
</td>

<td>

Enable or disable the job worker.

Type: <code>boolean</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.fetch-variables" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_FETCHVARIABLES"/><a href="#camundaclientworkerdefaultsfetch-variables" id="camundaclientworkerdefaultsfetch-variables" class="hash-link"/>
</td>

<td>

List of variable names to fetch on job activation. When set in defaults, it extends the list of variables to fetch from the annotation. When set in an override, it replaces the list of variables to fetch.

Type: <code>array[string]</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.force-fetch-all-variables" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_FORCEFETCHALLVARIABLES"/><a href="#camundaclientworkerdefaultsforce-fetch-all-variables" id="camundaclientworkerdefaultsforce-fetch-all-variables" class="hash-link"/>
</td>

<td>

Sets whether all variables are fetched. Overrides `fetch-variables`.

Type: <code>boolean</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.max-jobs-active" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_MAXJOBSACTIVE"/><a href="#camundaclientworkerdefaultsmax-jobs-active" id="camundaclientworkerdefaultsmax-jobs-active" class="hash-link"/>
</td>

<td>

The maximum number of jobs exclusively activated for this worker at the same time.

Type: <code>integer</code>

</td>
<td>
  <code>32</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.max-retries" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_MAXRETRIES"/><a href="#camundaclientworkerdefaultsmax-retries" id="camundaclientworkerdefaultsmax-retries" class="hash-link"/>
</td>

<td>

The maximum number of retries before automatic responses (complete, fail, bpmn error) for jobs are no longer attempted.

Type: <code>integer</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.name" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_NAME"/><a href="#camundaclientworkerdefaultsname" id="camundaclientworkerdefaultsname" class="hash-link"/>
</td>

<td>

The name of the worker owner. If set to default, it is generated as `${beanName}#${methodName}`.

Type: <code>string</code>

</td>
<td>
  <code>&quot;default&quot;</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.poll-interval" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_POLLINTERVAL"/><a href="#camundaclientworkerdefaultspoll-interval" id="camundaclientworkerdefaultspoll-interval" class="hash-link"/>
</td>

<td>

The maximal interval between polls for new jobs.

Type: <code>duration</code>

</td>
<td>
  <code>&quot;PT0.1S&quot;</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.request-timeout" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_REQUESTTIMEOUT"/><a href="#camundaclientworkerdefaultsrequest-timeout" id="camundaclientworkerdefaultsrequest-timeout" class="hash-link"/>
</td>

<td>

The request timeout for the activate job request used to poll for new jobs.

Type: <code>duration</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.stream-enabled" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_STREAMENABLED"/><a href="#camundaclientworkerdefaultsstream-enabled" id="camundaclientworkerdefaultsstream-enabled" class="hash-link"/>
</td>

<td>

Opt-in feature flag that enables job streaming. When enabled, the job worker uses both streaming and polling to activate jobs. A long-lived stream eagerly pushes new jobs, and polling retrieves jobs created <em>before</em> any streams were opened.

Type: <code>boolean</code>

</td>
<td>
  <code>false</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.stream-timeout" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_STREAMTIMEOUT"/><a href="#camundaclientworkerdefaultsstream-timeout" id="camundaclientworkerdefaultsstream-timeout" class="hash-link"/>
</td>

<td>

If streaming is enabled, sets the maximum lifetime for a stream. When this timeout is reached, the stream closes, and no more jobs are activated or received. If the worker is still open, a new stream opens immediately.

Type: <code>duration</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.tenant-ids" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_TENANTIDS"/><a href="#camundaclientworkerdefaultstenant-ids" id="camundaclientworkerdefaultstenant-ids" class="hash-link"/>
</td>

<td>

Sets the tenants for which the job worker is registered. When set in defaults, it extends the list of tenant IDs from the annotation. When set in override, it replaces the list of tenant IDs.

Type: <code>array[string]</code>

</td>
<td>
  <code>[&quot;&lt;default&gt;&quot;]</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.timeout" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_TIMEOUT"/><a href="#camundaclientworkerdefaultstimeout" id="camundaclientworkerdefaultstimeout" class="hash-link"/>
</td>

<td>

The time a job remains exclusively assigned to the worker.

Type: <code>duration</code>

</td>
<td>
  <code>&quot;PT5M&quot;</code>
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.type" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_TYPE"/><a href="#camundaclientworkerdefaultstype" id="camundaclientworkerdefaultstype" class="hash-link"/>
</td>

<td>

The type of jobs to work on.

Type: <code>string</code>

</td>
<td>
  <code>null</code>
</td>
</tr>
</tbody>
</table>

### `camunda.client.worker.override`

Properties for overriding settings of individual job workers registered to the Camunda client. Overrides are specified as key-value pairs, where the key is the worker's job type and the values have the same properties as `camunda.client.worker.defaults` each: `camunda.client.worker.override.<job-type>.<property-name>: <property-value>`.

## Deprecated properties

:::caution
The following properties are deprecated. See the replacement property and related hints.

The deprecated properties are still effective if their replacement is not used yet. The SDK hints on the usage of deprecated properties by logging warn statements during startup.
:::

### `camunda.client`

Deprecated properties for the Camunda client.

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.cluster-id" env="CAMUNDA_CLIENT_CLUSTERID"/><a href="#camundaclientcluster-id" id="camundaclientcluster-id" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientcloudcluster-id"><Property defaultValue="property" groupId="property-format" property="camunda.client.cloud.cluster-id" env="CAMUNDA_CLIENT_CLOUD_CLUSTERID"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.region" env="CAMUNDA_CLIENT_REGION"/><a href="#camundaclientregion" id="camundaclientregion" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientcloudregion"><Property defaultValue="property" groupId="property-format" property="camunda.client.cloud.region" env="CAMUNDA_CLIENT_CLOUD_REGION"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.tenant-ids" env="CAMUNDA_CLIENT_TENANTIDS"/><a href="#camundaclienttenant-ids" id="camundaclienttenant-ids" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultstenant-ids"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.tenant-ids" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_TENANTIDS"/></a>
</td>
<td>
N/A
</td>
</tr>
</tbody>
</table>

### `camunda.client.auth`

Deprecated properties for authenticating the Camunda client.

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.issuer" env="CAMUNDA_CLIENT_AUTH_ISSUER"/><a href="#camundaclientauthissuer" id="camundaclientauthissuer" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientauthtoken-url"><Property defaultValue="property" groupId="property-format" property="camunda.client.auth.token-url" env="CAMUNDA_CLIENT_AUTH_TOKENURL"/></a>
</td>
<td>
N/A
</td>
</tr>
</tbody>
</table>

### `camunda.client.cloud`

Deprecated properties for connecting the Camunda client to SaaS. These are used to compose default connection details when the client is configured to `camunda.client.mode: saas`.

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.cloud.base-url" env="CAMUNDA_CLIENT_CLOUD_BASEURL"/><a href="#camundaclientcloudbase-url" id="camundaclientcloudbase-url" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientclouddomain"><Property defaultValue="property" groupId="property-format" property="camunda.client.cloud.domain" env="CAMUNDA_CLIENT_CLOUD_DOMAIN"/></a>
</td>
<td>
N/A
</td>
</tr>
</tbody>
</table>

### `camunda.client.identity`

Deprecated properties for identity settings.

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.identity.audience" env="CAMUNDA_CLIENT_IDENTITY_AUDIENCE"/><a href="#camundaclientidentityaudience" id="camundaclientidentityaudience" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientauthaudience"><Property defaultValue="property" groupId="property-format" property="camunda.client.auth.audience" env="CAMUNDA_CLIENT_AUTH_AUDIENCE"/></a>
</td>
<td>
Identity is now part of Camunda.
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.identity.base-url" env="CAMUNDA_CLIENT_IDENTITY_BASEURL"/><a href="#camundaclientidentitybase-url" id="camundaclientidentitybase-url" class="hash-link"/>
</td>
<td>
  
</td>
<td>
Identity is now part of Camunda.
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.identity.enabled" env="CAMUNDA_CLIENT_IDENTITY_ENABLED"/><a href="#camundaclientidentityenabled" id="camundaclientidentityenabled" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientenabled"><Property defaultValue="property" groupId="property-format" property="camunda.client.enabled" env="CAMUNDA_CLIENT_ENABLED"/></a>
</td>
<td>
Identity is now part of Camunda.
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.identity.scope" env="CAMUNDA_CLIENT_IDENTITY_SCOPE"/><a href="#camundaclientidentityscope" id="camundaclientidentityscope" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientauthscope"><Property defaultValue="property" groupId="property-format" property="camunda.client.auth.scope" env="CAMUNDA_CLIENT_AUTH_SCOPE"/></a>
</td>
<td>
Identity is now part of Camunda.
</td>
</tr>
</tbody>
</table>

### `camunda.client.zeebe`

Deprecated properties for Zeebe client settings.

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.audience" env="CAMUNDA_CLIENT_ZEEBE_AUDIENCE"/><a href="#camundaclientzeebeaudience" id="camundaclientzeebeaudience" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientauthaudience"><Property defaultValue="property" groupId="property-format" property="camunda.client.auth.audience" env="CAMUNDA_CLIENT_AUTH_AUDIENCE"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.base-url" env="CAMUNDA_CLIENT_ZEEBE_BASEURL"/><a href="#camundaclientzeebebase-url" id="camundaclientzeebebase-url" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientrest-address"><Property defaultValue="property" groupId="property-format" property="camunda.client.rest-address" env="CAMUNDA_CLIENT_RESTADDRESS"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.ca-certificate-path" env="CAMUNDA_CLIENT_ZEEBE_CACERTIFICATEPATH"/><a href="#camundaclientzeebeca-certificate-path" id="camundaclientzeebeca-certificate-path" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientca-certificate-path"><Property defaultValue="property" groupId="property-format" property="camunda.client.ca-certificate-path" env="CAMUNDA_CLIENT_CACERTIFICATEPATH"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.enabled" env="CAMUNDA_CLIENT_ZEEBE_ENABLED"/><a href="#camundaclientzeebeenabled" id="camundaclientzeebeenabled" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientenabled"><Property defaultValue="property" groupId="property-format" property="camunda.client.enabled" env="CAMUNDA_CLIENT_ENABLED"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.execution-threads" env="CAMUNDA_CLIENT_ZEEBE_EXECUTIONTHREADS"/><a href="#camundaclientzeebeexecution-threads" id="camundaclientzeebeexecution-threads" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientexecution-threads"><Property defaultValue="property" groupId="property-format" property="camunda.client.execution-threads" env="CAMUNDA_CLIENT_EXECUTIONTHREADS"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.grpc-address" env="CAMUNDA_CLIENT_ZEEBE_GRPCADDRESS"/><a href="#camundaclientzeebegrpc-address" id="camundaclientzeebegrpc-address" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientgrpc-address"><Property defaultValue="property" groupId="property-format" property="camunda.client.grpc-address" env="CAMUNDA_CLIENT_GRPCADDRESS"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.keep-alive" env="CAMUNDA_CLIENT_ZEEBE_KEEPALIVE"/><a href="#camundaclientzeebekeep-alive" id="camundaclientzeebekeep-alive" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientkeep-alive"><Property defaultValue="property" groupId="property-format" property="camunda.client.keep-alive" env="CAMUNDA_CLIENT_KEEPALIVE"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.max-message-size" env="CAMUNDA_CLIENT_ZEEBE_MAXMESSAGESIZE"/><a href="#camundaclientzeebemax-message-size" id="camundaclientzeebemax-message-size" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientmax-message-size"><Property defaultValue="property" groupId="property-format" property="camunda.client.max-message-size" env="CAMUNDA_CLIENT_MAXMESSAGESIZE"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.max-metadata-size" env="CAMUNDA_CLIENT_ZEEBE_MAXMETADATASIZE"/><a href="#camundaclientzeebemax-metadata-size" id="camundaclientzeebemax-metadata-size" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientmax-metadata-size"><Property defaultValue="property" groupId="property-format" property="camunda.client.max-metadata-size" env="CAMUNDA_CLIENT_MAXMETADATASIZE"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.message-time-to-live" env="CAMUNDA_CLIENT_ZEEBE_MESSAGETIMETOLIVE"/><a href="#camundaclientzeebemessage-time-to-live" id="camundaclientzeebemessage-time-to-live" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientmessage-time-to-live"><Property defaultValue="property" groupId="property-format" property="camunda.client.message-time-to-live" env="CAMUNDA_CLIENT_MESSAGETIMETOLIVE"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.override-authority" env="CAMUNDA_CLIENT_ZEEBE_OVERRIDEAUTHORITY"/><a href="#camundaclientzeebeoverride-authority" id="camundaclientzeebeoverride-authority" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientoverride-authority"><Property defaultValue="property" groupId="property-format" property="camunda.client.override-authority" env="CAMUNDA_CLIENT_OVERRIDEAUTHORITY"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.prefer-rest-over-grpc" env="CAMUNDA_CLIENT_ZEEBE_PREFERRESTOVERGRPC"/><a href="#camundaclientzeebeprefer-rest-over-grpc" id="camundaclientzeebeprefer-rest-over-grpc" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientprefer-rest-over-grpc"><Property defaultValue="property" groupId="property-format" property="camunda.client.prefer-rest-over-grpc" env="CAMUNDA_CLIENT_PREFERRESTOVERGRPC"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.request-timeout" env="CAMUNDA_CLIENT_ZEEBE_REQUESTTIMEOUT"/><a href="#camundaclientzeeberequest-timeout" id="camundaclientzeeberequest-timeout" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientrequest-timeout"><Property defaultValue="property" groupId="property-format" property="camunda.client.request-timeout" env="CAMUNDA_CLIENT_REQUESTTIMEOUT"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.rest-address" env="CAMUNDA_CLIENT_ZEEBE_RESTADDRESS"/><a href="#camundaclientzeeberest-address" id="camundaclientzeeberest-address" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientrest-address"><Property defaultValue="property" groupId="property-format" property="camunda.client.rest-address" env="CAMUNDA_CLIENT_RESTADDRESS"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.scope" env="CAMUNDA_CLIENT_ZEEBE_SCOPE"/><a href="#camundaclientzeebescope" id="camundaclientzeebescope" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientauthscope"><Property defaultValue="property" groupId="property-format" property="camunda.client.auth.scope" env="CAMUNDA_CLIENT_AUTH_SCOPE"/></a>
</td>
<td>
N/A
</td>
</tr>
</tbody>
</table>

### `camunda.client.zeebe.defaults`

Deprecated default properties for Zeebe job workers.

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.defaults.auto-complete" env="CAMUNDA_CLIENT_ZEEBE_DEFAULTS_AUTOCOMPLETE"/><a href="#camundaclientzeebedefaultsauto-complete" id="camundaclientzeebedefaultsauto-complete" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultsauto-complete"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.auto-complete" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_AUTOCOMPLETE"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.defaults.enabled" env="CAMUNDA_CLIENT_ZEEBE_DEFAULTS_ENABLED"/><a href="#camundaclientzeebedefaultsenabled" id="camundaclientzeebedefaultsenabled" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultsenabled"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.enabled" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_ENABLED"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.defaults.fetch-variables" env="CAMUNDA_CLIENT_ZEEBE_DEFAULTS_FETCHVARIABLES"/><a href="#camundaclientzeebedefaultsfetch-variables" id="camundaclientzeebedefaultsfetch-variables" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultsfetch-variables"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.fetch-variables" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_FETCHVARIABLES"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.defaults.force-fetch-all-variables" env="CAMUNDA_CLIENT_ZEEBE_DEFAULTS_FORCEFETCHALLVARIABLES"/><a href="#camundaclientzeebedefaultsforce-fetch-all-variables" id="camundaclientzeebedefaultsforce-fetch-all-variables" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultsforce-fetch-all-variables"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.force-fetch-all-variables" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_FORCEFETCHALLVARIABLES"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.defaults.max-jobs-active" env="CAMUNDA_CLIENT_ZEEBE_DEFAULTS_MAXJOBSACTIVE"/><a href="#camundaclientzeebedefaultsmax-jobs-active" id="camundaclientzeebedefaultsmax-jobs-active" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultsmax-jobs-active"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.max-jobs-active" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_MAXJOBSACTIVE"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.defaults.max-retries" env="CAMUNDA_CLIENT_ZEEBE_DEFAULTS_MAXRETRIES"/><a href="#camundaclientzeebedefaultsmax-retries" id="camundaclientzeebedefaultsmax-retries" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultsmax-retries"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.max-retries" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_MAXRETRIES"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.defaults.name" env="CAMUNDA_CLIENT_ZEEBE_DEFAULTS_NAME"/><a href="#camundaclientzeebedefaultsname" id="camundaclientzeebedefaultsname" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultsname"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.name" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_NAME"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.defaults.poll-interval" env="CAMUNDA_CLIENT_ZEEBE_DEFAULTS_POLLINTERVAL"/><a href="#camundaclientzeebedefaultspoll-interval" id="camundaclientzeebedefaultspoll-interval" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultspoll-interval"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.poll-interval" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_POLLINTERVAL"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.defaults.request-timeout" env="CAMUNDA_CLIENT_ZEEBE_DEFAULTS_REQUESTTIMEOUT"/><a href="#camundaclientzeebedefaultsrequest-timeout" id="camundaclientzeebedefaultsrequest-timeout" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultsrequest-timeout"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.request-timeout" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_REQUESTTIMEOUT"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.defaults.stream-enabled" env="CAMUNDA_CLIENT_ZEEBE_DEFAULTS_STREAMENABLED"/><a href="#camundaclientzeebedefaultsstream-enabled" id="camundaclientzeebedefaultsstream-enabled" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultsstream-enabled"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.stream-enabled" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_STREAMENABLED"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.defaults.stream-timeout" env="CAMUNDA_CLIENT_ZEEBE_DEFAULTS_STREAMTIMEOUT"/><a href="#camundaclientzeebedefaultsstream-timeout" id="camundaclientzeebedefaultsstream-timeout" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultsstream-timeout"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.stream-timeout" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_STREAMTIMEOUT"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.defaults.tenant-ids" env="CAMUNDA_CLIENT_ZEEBE_DEFAULTS_TENANTIDS"/><a href="#camundaclientzeebedefaultstenant-ids" id="camundaclientzeebedefaultstenant-ids" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultstenant-ids"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.tenant-ids" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_TENANTIDS"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.defaults.timeout" env="CAMUNDA_CLIENT_ZEEBE_DEFAULTS_TIMEOUT"/><a href="#camundaclientzeebedefaultstimeout" id="camundaclientzeebedefaultstimeout" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultstimeout"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.timeout" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_TIMEOUT"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.defaults.type" env="CAMUNDA_CLIENT_ZEEBE_DEFAULTS_TYPE"/><a href="#camundaclientzeebedefaultstype" id="camundaclientzeebedefaultstype" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultstype"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.type" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_TYPE"/></a>
</td>
<td>
N/A
</td>
</tr>
</tbody>
</table>

### `camunda.client.zeebe.deployment`

Deprecated deployment properties for Zeebe.

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.deployment.enabled" env="CAMUNDA_CLIENT_ZEEBE_DEPLOYMENT_ENABLED"/><a href="#camundaclientzeebedeploymentenabled" id="camundaclientzeebedeploymentenabled" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientdeploymentenabled"><Property defaultValue="property" groupId="property-format" property="camunda.client.deployment.enabled" env="CAMUNDA_CLIENT_DEPLOYMENT_ENABLED"/></a>
</td>
<td>
N/A
</td>
</tr>
</tbody>
</table>

### `camunda.client.zeebe.override`

Deprecated properties for overriding individual job workers registered to the Camunda client. Replaced by `camunda.client.worker.override`.

### `common`

Deprecated common client properties.

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="common.auth-url" env="COMMON_AUTHURL"/><a href="#commonauth-url" id="commonauth-url" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientauthtoken-url"><Property defaultValue="property" groupId="property-format" property="camunda.client.auth.token-url" env="CAMUNDA_CLIENT_AUTH_TOKENURL"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="common.base-url" env="COMMON_BASEURL"/><a href="#commonbase-url" id="commonbase-url" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientrest-address"><Property defaultValue="property" groupId="property-format" property="camunda.client.rest-address" env="CAMUNDA_CLIENT_RESTADDRESS"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="common.client-id" env="COMMON_CLIENTID"/><a href="#commonclient-id" id="commonclient-id" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientauthclient-id"><Property defaultValue="property" groupId="property-format" property="camunda.client.auth.client-id" env="CAMUNDA_CLIENT_AUTH_CLIENTID"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="common.client-secret" env="COMMON_CLIENTSECRET"/><a href="#commonclient-secret" id="commonclient-secret" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientauthclient-secret"><Property defaultValue="property" groupId="property-format" property="camunda.client.auth.client-secret" env="CAMUNDA_CLIENT_AUTH_CLIENTSECRET"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="common.enabled" env="COMMON_ENABLED"/><a href="#commonenabled" id="commonenabled" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientenabled"><Property defaultValue="property" groupId="property-format" property="camunda.client.enabled" env="CAMUNDA_CLIENT_ENABLED"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="common.password" env="COMMON_PASSWORD"/><a href="#commonpassword" id="commonpassword" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientauthpassword"><Property defaultValue="property" groupId="property-format" property="camunda.client.auth.password" env="CAMUNDA_CLIENT_AUTH_PASSWORD"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="common.url" env="COMMON_URL"/><a href="#commonurl" id="commonurl" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientrest-address"><Property defaultValue="property" groupId="property-format" property="camunda.client.rest-address" env="CAMUNDA_CLIENT_RESTADDRESS"/></a>
</td>
<td>
The REST address is the unified endpoint for all interaction with Camunda.
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="common.username" env="COMMON_USERNAME"/><a href="#commonusername" id="commonusername" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientauthusername"><Property defaultValue="property" groupId="property-format" property="camunda.client.auth.username" env="CAMUNDA_CLIENT_AUTH_USERNAME"/></a>
</td>
<td>
N/A
</td>
</tr>
</tbody>
</table>

### `common.keycloak`

Deprecated Keycloak-specific properties.

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="common.keycloak.realm" env="COMMON_KEYCLOAK_REALM"/><a href="#commonkeycloakrealm" id="commonkeycloakrealm" class="hash-link"/>
</td>
<td>
  
</td>
<td>
There is no keycloak-specific configuration for Camunda; the issuer is provided as a URL.
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="common.keycloak.token-url" env="COMMON_KEYCLOAK_TOKENURL"/><a href="#commonkeycloaktoken-url" id="commonkeycloaktoken-url" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientauthtoken-url"><Property defaultValue="property" groupId="property-format" property="camunda.client.auth.token-url" env="CAMUNDA_CLIENT_AUTH_TOKENURL"/></a>
</td>
<td>
There is no keycloak-specific configuration for Camunda; the issuer is provided as a URL.
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="common.keycloak.url" env="COMMON_KEYCLOAK_URL"/><a href="#commonkeycloakurl" id="commonkeycloakurl" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientauthtoken-url"><Property defaultValue="property" groupId="property-format" property="camunda.client.auth.token-url" env="CAMUNDA_CLIENT_AUTH_TOKENURL"/></a>
</td>
<td>
There is no keycloak-specific configuration for Camunda; the issuer is provided as a URL.
</td>
</tr>
</tbody>
</table>

### `zeebe.client`

Deprecated Zeebe client properties.

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.apply-environment-variable-overrides" env="ZEEBE_CLIENT_APPLYENVIRONMENTVARIABLEOVERRIDES"/><a href="#zeebeclientapply-environment-variable-overrides" id="zeebeclientapply-environment-variable-overrides" class="hash-link"/>
</td>
<td>
  
</td>
<td>
Only the environment variables belonging to the Spring SDK are applied.
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.connection-mode" env="ZEEBE_CLIENT_CONNECTIONMODE"/><a href="#zeebeclientconnection-mode" id="zeebeclientconnection-mode" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientmode"><Property defaultValue="property" groupId="property-format" property="camunda.client.mode" env="CAMUNDA_CLIENT_MODE"/></a>
</td>
<td>
Client modes are now available.
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.default-job-worker-stream-enabled" env="ZEEBE_CLIENT_DEFAULTJOBWORKERSTREAMENABLED"/><a href="#zeebeclientdefault-job-worker-stream-enabled" id="zeebeclientdefault-job-worker-stream-enabled" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultsstream-enabled"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.stream-enabled" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_STREAMENABLED"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.default-job-worker-tenant-ids" env="ZEEBE_CLIENT_DEFAULTJOBWORKERTENANTIDS"/><a href="#zeebeclientdefault-job-worker-tenant-ids" id="zeebeclientdefault-job-worker-tenant-ids" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultstenant-ids"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.tenant-ids" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_TENANTIDS"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.default-tenant-id" env="ZEEBE_CLIENT_DEFAULTTENANTID"/><a href="#zeebeclientdefault-tenant-id" id="zeebeclientdefault-tenant-id" class="hash-link"/>
</td>
<td>
  <a href="#camundaclienttenant-id"><Property defaultValue="property" groupId="property-format" property="camunda.client.tenant-id" env="CAMUNDA_CLIENT_TENANTID"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.enabled" env="ZEEBE_CLIENT_ENABLED"/><a href="#zeebeclientenabled" id="zeebeclientenabled" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientenabled"><Property defaultValue="property" groupId="property-format" property="camunda.client.enabled" env="CAMUNDA_CLIENT_ENABLED"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.request-timeout" env="ZEEBE_CLIENT_REQUESTTIMEOUT"/><a href="#zeebeclientrequest-timeout" id="zeebeclientrequest-timeout" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientrequest-timeout"><Property defaultValue="property" groupId="property-format" property="camunda.client.request-timeout" env="CAMUNDA_CLIENT_REQUESTTIMEOUT"/></a>
</td>
<td>
N/A
</td>
</tr>
</tbody>
</table>

### `zeebe.client.broker`

Deprecated Zeebe broker properties.

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.broker.gateway-address" env="ZEEBE_CLIENT_BROKER_GATEWAYADDRESS"/><a href="#zeebeclientbrokergateway-address" id="zeebeclientbrokergateway-address" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientgrpc-address"><Property defaultValue="property" groupId="property-format" property="camunda.client.grpc-address" env="CAMUNDA_CLIENT_GRPCADDRESS"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.broker.grpc-address" env="ZEEBE_CLIENT_BROKER_GRPCADDRESS"/><a href="#zeebeclientbrokergrpc-address" id="zeebeclientbrokergrpc-address" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientgrpc-address"><Property defaultValue="property" groupId="property-format" property="camunda.client.grpc-address" env="CAMUNDA_CLIENT_GRPCADDRESS"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.broker.keep-alive" env="ZEEBE_CLIENT_BROKER_KEEPALIVE"/><a href="#zeebeclientbrokerkeep-alive" id="zeebeclientbrokerkeep-alive" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientkeep-alive"><Property defaultValue="property" groupId="property-format" property="camunda.client.keep-alive" env="CAMUNDA_CLIENT_KEEPALIVE"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.broker.rest-address" env="ZEEBE_CLIENT_BROKER_RESTADDRESS"/><a href="#zeebeclientbrokerrest-address" id="zeebeclientbrokerrest-address" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientrest-address"><Property defaultValue="property" groupId="property-format" property="camunda.client.rest-address" env="CAMUNDA_CLIENT_RESTADDRESS"/></a>
</td>
<td>
N/A
</td>
</tr>
</tbody>
</table>

### `zeebe.client.cloud`

Deprecated Zeebe cloud connection properties.

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.cloud.auth-url" env="ZEEBE_CLIENT_CLOUD_AUTHURL"/><a href="#zeebeclientcloudauth-url" id="zeebeclientcloudauth-url" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientauthtoken-url"><Property defaultValue="property" groupId="property-format" property="camunda.client.auth.token-url" env="CAMUNDA_CLIENT_AUTH_TOKENURL"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.cloud.base-url" env="ZEEBE_CLIENT_CLOUD_BASEURL"/><a href="#zeebeclientcloudbase-url" id="zeebeclientcloudbase-url" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientclouddomain"><Property defaultValue="property" groupId="property-format" property="camunda.client.cloud.domain" env="CAMUNDA_CLIENT_CLOUD_DOMAIN"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.cloud.client-id" env="ZEEBE_CLIENT_CLOUD_CLIENTID"/><a href="#zeebeclientcloudclient-id" id="zeebeclientcloudclient-id" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientauthclient-id"><Property defaultValue="property" groupId="property-format" property="camunda.client.auth.client-id" env="CAMUNDA_CLIENT_AUTH_CLIENTID"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.cloud.client-secret" env="ZEEBE_CLIENT_CLOUD_CLIENTSECRET"/><a href="#zeebeclientcloudclient-secret" id="zeebeclientcloudclient-secret" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientauthclient-secret"><Property defaultValue="property" groupId="property-format" property="camunda.client.auth.client-secret" env="CAMUNDA_CLIENT_AUTH_CLIENTSECRET"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.cloud.cluster-id" env="ZEEBE_CLIENT_CLOUD_CLUSTERID"/><a href="#zeebeclientcloudcluster-id" id="zeebeclientcloudcluster-id" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientcloudcluster-id"><Property defaultValue="property" groupId="property-format" property="camunda.client.cloud.cluster-id" env="CAMUNDA_CLIENT_CLOUD_CLUSTERID"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.cloud.credentials-cache-path" env="ZEEBE_CLIENT_CLOUD_CREDENTIALSCACHEPATH"/><a href="#zeebeclientcloudcredentials-cache-path" id="zeebeclientcloudcredentials-cache-path" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientauthcredentials-cache-path"><Property defaultValue="property" groupId="property-format" property="camunda.client.auth.credentials-cache-path" env="CAMUNDA_CLIENT_AUTH_CREDENTIALSCACHEPATH"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.cloud.port" env="ZEEBE_CLIENT_CLOUD_PORT"/><a href="#zeebeclientcloudport" id="zeebeclientcloudport" class="hash-link"/>
</td>
<td>
  
</td>
<td>
The Zeebe client URL is now configured as HTTP&#x2F;HTTPS URL.
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.cloud.region" env="ZEEBE_CLIENT_CLOUD_REGION"/><a href="#zeebeclientcloudregion" id="zeebeclientcloudregion" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientcloudregion"><Property defaultValue="property" groupId="property-format" property="camunda.client.cloud.region" env="CAMUNDA_CLIENT_CLOUD_REGION"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.cloud.scope" env="ZEEBE_CLIENT_CLOUD_SCOPE"/><a href="#zeebeclientcloudscope" id="zeebeclientcloudscope" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientauthscope"><Property defaultValue="property" groupId="property-format" property="camunda.client.auth.scope" env="CAMUNDA_CLIENT_AUTH_SCOPE"/></a>
</td>
<td>
N/A
</td>
</tr>
</tbody>
</table>

### `zeebe.client.job`

Deprecated Zeebe job worker properties.

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.job.poll-interval" env="ZEEBE_CLIENT_JOB_POLLINTERVAL"/><a href="#zeebeclientjobpoll-interval" id="zeebeclientjobpoll-interval" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultspoll-interval"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.poll-interval" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_POLLINTERVAL"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.job.timeout" env="ZEEBE_CLIENT_JOB_TIMEOUT"/><a href="#zeebeclientjobtimeout" id="zeebeclientjobtimeout" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultstimeout"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.timeout" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_TIMEOUT"/></a>
</td>
<td>
N/A
</td>
</tr>
</tbody>
</table>

### `zeebe.client.message`

Deprecated Zeebe message properties.

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.message.max-message-size" env="ZEEBE_CLIENT_MESSAGE_MAXMESSAGESIZE"/><a href="#zeebeclientmessagemax-message-size" id="zeebeclientmessagemax-message-size" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientmax-message-size"><Property defaultValue="property" groupId="property-format" property="camunda.client.max-message-size" env="CAMUNDA_CLIENT_MAXMESSAGESIZE"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.message.time-to-live" env="ZEEBE_CLIENT_MESSAGE_TIMETOLIVE"/><a href="#zeebeclientmessagetime-to-live" id="zeebeclientmessagetime-to-live" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientmessage-time-to-live"><Property defaultValue="property" groupId="property-format" property="camunda.client.message-time-to-live" env="CAMUNDA_CLIENT_MESSAGETIMETOLIVE"/></a>
</td>
<td>
N/A
</td>
</tr>
</tbody>
</table>

### `zeebe.client.security`

Deprecated Zeebe security properties.

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.security.cert-path" env="ZEEBE_CLIENT_SECURITY_CERTPATH"/><a href="#zeebeclientsecuritycert-path" id="zeebeclientsecuritycert-path" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientca-certificate-path"><Property defaultValue="property" groupId="property-format" property="camunda.client.ca-certificate-path" env="CAMUNDA_CLIENT_CACERTIFICATEPATH"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.security.override-authority" env="ZEEBE_CLIENT_SECURITY_OVERRIDEAUTHORITY"/><a href="#zeebeclientsecurityoverride-authority" id="zeebeclientsecurityoverride-authority" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientoverride-authority"><Property defaultValue="property" groupId="property-format" property="camunda.client.override-authority" env="CAMUNDA_CLIENT_OVERRIDEAUTHORITY"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.security.plaintext" env="ZEEBE_CLIENT_SECURITY_PLAINTEXT"/><a href="#zeebeclientsecurityplaintext" id="zeebeclientsecurityplaintext" class="hash-link"/>
</td>
<td>
  
</td>
<td>
plaintext is now determined by the URL protocol (HTTP or HTTPS).
</td>
</tr>
</tbody>
</table>

### `zeebe.client.worker`

Deprecated Zeebe job worker properties.

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.worker.default-name" env="ZEEBE_CLIENT_WORKER_DEFAULTNAME"/><a href="#zeebeclientworkerdefault-name" id="zeebeclientworkerdefault-name" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultsname"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.name" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_NAME"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.worker.default-type" env="ZEEBE_CLIENT_WORKER_DEFAULTTYPE"/><a href="#zeebeclientworkerdefault-type" id="zeebeclientworkerdefault-type" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultstype"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.type" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_TYPE"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.worker.max-jobs-active" env="ZEEBE_CLIENT_WORKER_MAXJOBSACTIVE"/><a href="#zeebeclientworkermax-jobs-active" id="zeebeclientworkermax-jobs-active" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultsmax-jobs-active"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.max-jobs-active" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_MAXJOBSACTIVE"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.worker.threads" env="ZEEBE_CLIENT_WORKER_THREADS"/><a href="#zeebeclientworkerthreads" id="zeebeclientworkerthreads" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientexecution-threads"><Property defaultValue="property" groupId="property-format" property="camunda.client.execution-threads" env="CAMUNDA_CLIENT_EXECUTIONTHREADS"/></a>
</td>
<td>
N/A
</td>
</tr>
</tbody>
</table>

### `zeebe.client.worker.override`

Deprecated properties to override the individual job workers registered with the Camunda client. Replaced by `camunda.client.worker.override`.
