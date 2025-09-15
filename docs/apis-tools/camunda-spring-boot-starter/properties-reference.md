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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.ca-certificate-path" env="CAMUNDA_CLIENT_CACERTIFICATEPATH"/><a href="#camundaclientcacertificatepath" id="camundaclientcacertificatepath" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.execution-threads" env="CAMUNDA_CLIENT_EXECUTIONTHREADS"/><a href="#camundaclientexecutionthreads" id="camundaclientexecutionthreads" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.grpc-address" env="CAMUNDA_CLIENT_GRPCADDRESS"/><a href="#camundaclientgrpcaddress" id="camundaclientgrpcaddress" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.keep-alive" env="CAMUNDA_CLIENT_KEEPALIVE"/><a href="#camundaclientkeepalive" id="camundaclientkeepalive" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.max-message-size" env="CAMUNDA_CLIENT_MAXMESSAGESIZE"/><a href="#camundaclientmaxmessagesize" id="camundaclientmaxmessagesize" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.max-metadata-size" env="CAMUNDA_CLIENT_MAXMETADATASIZE"/><a href="#camundaclientmaxmetadatasize" id="camundaclientmaxmetadatasize" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.message-time-to-live" env="CAMUNDA_CLIENT_MESSAGETIMETOLIVE"/><a href="#camundaclientmessagetimetolive" id="camundaclientmessagetimetolive" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.override-authority" env="CAMUNDA_CLIENT_OVERRIDEAUTHORITY"/><a href="#camundaclientoverrideauthority" id="camundaclientoverrideauthority" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.prefer-rest-over-grpc" env="CAMUNDA_CLIENT_PREFERRESTOVERGRPC"/><a href="#camundaclientpreferrestovergrpc" id="camundaclientpreferrestovergrpc" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.request-timeout" env="CAMUNDA_CLIENT_REQUESTTIMEOUT"/><a href="#camundaclientrequesttimeout" id="camundaclientrequesttimeout" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.request-timeout-offset" env="CAMUNDA_CLIENT_REQUESTTIMEOUTOFFSET"/><a href="#camundaclientrequesttimeoutoffset" id="camundaclientrequesttimeoutoffset" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.rest-address" env="CAMUNDA_CLIENT_RESTADDRESS"/><a href="#camundaclientrestaddress" id="camundaclientrestaddress" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.tenant-id" env="CAMUNDA_CLIENT_TENANTID"/><a href="#camundaclienttenantid" id="camundaclienttenantid" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.client-id" env="CAMUNDA_CLIENT_AUTH_CLIENTID"/><a href="#camundaclientauthclientid" id="camundaclientauthclientid" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.client-secret" env="CAMUNDA_CLIENT_AUTH_CLIENTSECRET"/><a href="#camundaclientauthclientsecret" id="camundaclientauthclientsecret" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.connect-timeout" env="CAMUNDA_CLIENT_AUTH_CONNECTTIMEOUT"/><a href="#camundaclientauthconnecttimeout" id="camundaclientauthconnecttimeout" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.credentials-cache-path" env="CAMUNDA_CLIENT_AUTH_CREDENTIALSCACHEPATH"/><a href="#camundaclientauthcredentialscachepath" id="camundaclientauthcredentialscachepath" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.keystore-key-password" env="CAMUNDA_CLIENT_AUTH_KEYSTOREKEYPASSWORD"/><a href="#camundaclientauthkeystorekeypassword" id="camundaclientauthkeystorekeypassword" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.keystore-password" env="CAMUNDA_CLIENT_AUTH_KEYSTOREPASSWORD"/><a href="#camundaclientauthkeystorepassword" id="camundaclientauthkeystorepassword" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.keystore-path" env="CAMUNDA_CLIENT_AUTH_KEYSTOREPATH"/><a href="#camundaclientauthkeystorepath" id="camundaclientauthkeystorepath" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.read-timeout" env="CAMUNDA_CLIENT_AUTH_READTIMEOUT"/><a href="#camundaclientauthreadtimeout" id="camundaclientauthreadtimeout" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.token-url" env="CAMUNDA_CLIENT_AUTH_TOKENURL"/><a href="#camundaclientauthtokenurl" id="camundaclientauthtokenurl" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.truststore-password" env="CAMUNDA_CLIENT_AUTH_TRUSTSTOREPASSWORD"/><a href="#camundaclientauthtruststorepassword" id="camundaclientauthtruststorepassword" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.truststore-path" env="CAMUNDA_CLIENT_AUTH_TRUSTSTOREPATH"/><a href="#camundaclientauthtruststorepath" id="camundaclientauthtruststorepath" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.client-assertion.keystore-key-alias" env="CAMUNDA_CLIENT_AUTH_CLIENTASSERTION_KEYSTOREKEYALIAS"/><a href="#camundaclientauthclientassertionkeystorekeyalias" id="camundaclientauthclientassertionkeystorekeyalias" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.client-assertion.keystore-key-password" env="CAMUNDA_CLIENT_AUTH_CLIENTASSERTION_KEYSTOREKEYPASSWORD"/><a href="#camundaclientauthclientassertionkeystorekeypassword" id="camundaclientauthclientassertionkeystorekeypassword" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.client-assertion.keystore-password" env="CAMUNDA_CLIENT_AUTH_CLIENTASSERTION_KEYSTOREPASSWORD"/><a href="#camundaclientauthclientassertionkeystorepassword" id="camundaclientauthclientassertionkeystorepassword" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.auth.client-assertion.keystore-path" env="CAMUNDA_CLIENT_AUTH_CLIENTASSERTION_KEYSTOREPATH"/><a href="#camundaclientauthclientassertionkeystorepath" id="camundaclientauthclientassertionkeystorepath" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.cloud.cluster-id" env="CAMUNDA_CLIENT_CLOUD_CLUSTERID"/><a href="#camundaclientcloudclusterid" id="camundaclientcloudclusterid" class="hash-link"/>
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

### `camunda.client.worker`

Properties for the job workers being registered to the Camunda client.

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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.override" env="CAMUNDA_CLIENT_WORKER_OVERRIDE"/><a href="#camundaclientworkeroverride" id="camundaclientworkeroverride" class="hash-link"/>
</td>

<td>

Properties for overriding settings of individual job workers registered to the Camunda client. Overrides are specified as key-value pairs, where the key is the worker's job type and the values have the same properties as `camunda.client.worker.defaults` each: `camunda.client.worker.override.<job-type>.<property-name>: <property-value>`.

Type: <code>java.util.Map&lt;java.lang.String,io.camunda.client.spring.properties.CamundaClientJobWorkerProperties&gt;</code>

</td>
<td>
  <code>null</code>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.auto-complete" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_AUTOCOMPLETE"/><a href="#camundaclientworkerdefaultsautocomplete" id="camundaclientworkerdefaultsautocomplete" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.fetch-variables" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_FETCHVARIABLES"/><a href="#camundaclientworkerdefaultsfetchvariables" id="camundaclientworkerdefaultsfetchvariables" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.force-fetch-all-variables" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_FORCEFETCHALLVARIABLES"/><a href="#camundaclientworkerdefaultsforcefetchallvariables" id="camundaclientworkerdefaultsforcefetchallvariables" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.max-jobs-active" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_MAXJOBSACTIVE"/><a href="#camundaclientworkerdefaultsmaxjobsactive" id="camundaclientworkerdefaultsmaxjobsactive" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.max-retries" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_MAXRETRIES"/><a href="#camundaclientworkerdefaultsmaxretries" id="camundaclientworkerdefaultsmaxretries" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.poll-interval" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_POLLINTERVAL"/><a href="#camundaclientworkerdefaultspollinterval" id="camundaclientworkerdefaultspollinterval" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.request-timeout" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_REQUESTTIMEOUT"/><a href="#camundaclientworkerdefaultsrequesttimeout" id="camundaclientworkerdefaultsrequesttimeout" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.stream-enabled" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_STREAMENABLED"/><a href="#camundaclientworkerdefaultsstreamenabled" id="camundaclientworkerdefaultsstreamenabled" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.stream-timeout" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_STREAMTIMEOUT"/><a href="#camundaclientworkerdefaultsstreamtimeout" id="camundaclientworkerdefaultsstreamtimeout" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.tenant-ids" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_TENANTIDS"/><a href="#camundaclientworkerdefaultstenantids" id="camundaclientworkerdefaultstenantids" class="hash-link"/>
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

### `camunda.client.worker.override.{jobType}`

Properties for overriding settings of individual job workers registered to the Camunda client. Overrides are specified as key-value pairs, where the key is the worker's job type and the values have the same properties as `camunda.client.worker.defaults` each: `camunda.client.worker.override.<job-type>.<property-name>: <property-value>`.

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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.override.{jobType}.auto-complete" env="CAMUNDA_CLIENT_WORKER_OVERRIDE_{JOBTYPE}_AUTOCOMPLETE"/><a href="#camundaclientworkeroverridejobTypeautocomplete" id="camundaclientworkeroverridejobTypeautocomplete" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.override.{jobType}.enabled" env="CAMUNDA_CLIENT_WORKER_OVERRIDE_{JOBTYPE}_ENABLED"/><a href="#camundaclientworkeroverridejobTypeenabled" id="camundaclientworkeroverridejobTypeenabled" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.override.{jobType}.fetch-variables" env="CAMUNDA_CLIENT_WORKER_OVERRIDE_{JOBTYPE}_FETCHVARIABLES"/><a href="#camundaclientworkeroverridejobTypefetchvariables" id="camundaclientworkeroverridejobTypefetchvariables" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.override.{jobType}.force-fetch-all-variables" env="CAMUNDA_CLIENT_WORKER_OVERRIDE_{JOBTYPE}_FORCEFETCHALLVARIABLES"/><a href="#camundaclientworkeroverridejobTypeforcefetchallvariables" id="camundaclientworkeroverridejobTypeforcefetchallvariables" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.override.{jobType}.max-jobs-active" env="CAMUNDA_CLIENT_WORKER_OVERRIDE_{JOBTYPE}_MAXJOBSACTIVE"/><a href="#camundaclientworkeroverridejobTypemaxjobsactive" id="camundaclientworkeroverridejobTypemaxjobsactive" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.override.{jobType}.max-retries" env="CAMUNDA_CLIENT_WORKER_OVERRIDE_{JOBTYPE}_MAXRETRIES"/><a href="#camundaclientworkeroverridejobTypemaxretries" id="camundaclientworkeroverridejobTypemaxretries" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.override.{jobType}.name" env="CAMUNDA_CLIENT_WORKER_OVERRIDE_{JOBTYPE}_NAME"/><a href="#camundaclientworkeroverridejobTypename" id="camundaclientworkeroverridejobTypename" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.override.{jobType}.poll-interval" env="CAMUNDA_CLIENT_WORKER_OVERRIDE_{JOBTYPE}_POLLINTERVAL"/><a href="#camundaclientworkeroverridejobTypepollinterval" id="camundaclientworkeroverridejobTypepollinterval" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.override.{jobType}.request-timeout" env="CAMUNDA_CLIENT_WORKER_OVERRIDE_{JOBTYPE}_REQUESTTIMEOUT"/><a href="#camundaclientworkeroverridejobTyperequesttimeout" id="camundaclientworkeroverridejobTyperequesttimeout" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.override.{jobType}.stream-enabled" env="CAMUNDA_CLIENT_WORKER_OVERRIDE_{JOBTYPE}_STREAMENABLED"/><a href="#camundaclientworkeroverridejobTypestreamenabled" id="camundaclientworkeroverridejobTypestreamenabled" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.override.{jobType}.stream-timeout" env="CAMUNDA_CLIENT_WORKER_OVERRIDE_{JOBTYPE}_STREAMTIMEOUT"/><a href="#camundaclientworkeroverridejobTypestreamtimeout" id="camundaclientworkeroverridejobTypestreamtimeout" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.override.{jobType}.tenant-ids" env="CAMUNDA_CLIENT_WORKER_OVERRIDE_{JOBTYPE}_TENANTIDS"/><a href="#camundaclientworkeroverridejobTypetenantids" id="camundaclientworkeroverridejobTypetenantids" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.override.{jobType}.timeout" env="CAMUNDA_CLIENT_WORKER_OVERRIDE_{JOBTYPE}_TIMEOUT"/><a href="#camundaclientworkeroverridejobTypetimeout" id="camundaclientworkeroverridejobTypetimeout" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.worker.override.{jobType}.type" env="CAMUNDA_CLIENT_WORKER_OVERRIDE_{JOBTYPE}_TYPE"/><a href="#camundaclientworkeroverridejobTypetype" id="camundaclientworkeroverridejobTypetype" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.cluster-id" env="CAMUNDA_CLIENT_CLUSTERID"/><a href="#camundaclientclusterid" id="camundaclientclusterid" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientcloudclusterid"><Property defaultValue="property" groupId="property-format" property="camunda.client.cloud.cluster-id" env="CAMUNDA_CLIENT_CLOUD_CLUSTERID"/></a>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.tenant-ids" env="CAMUNDA_CLIENT_TENANTIDS"/><a href="#camundaclienttenantids" id="camundaclienttenantids" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultstenantids"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.tenant-ids" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_TENANTIDS"/></a>
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
  <a href="#camundaclientauthtokenurl"><Property defaultValue="property" groupId="property-format" property="camunda.client.auth.token-url" env="CAMUNDA_CLIENT_AUTH_TOKENURL"/></a>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.cloud.base-url" env="CAMUNDA_CLIENT_CLOUD_BASEURL"/><a href="#camundaclientcloudbaseurl" id="camundaclientcloudbaseurl" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.identity.base-url" env="CAMUNDA_CLIENT_IDENTITY_BASEURL"/><a href="#camundaclientidentitybaseurl" id="camundaclientidentitybaseurl" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.base-url" env="CAMUNDA_CLIENT_ZEEBE_BASEURL"/><a href="#camundaclientzeebebaseurl" id="camundaclientzeebebaseurl" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientrestaddress"><Property defaultValue="property" groupId="property-format" property="camunda.client.rest-address" env="CAMUNDA_CLIENT_RESTADDRESS"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.ca-certificate-path" env="CAMUNDA_CLIENT_ZEEBE_CACERTIFICATEPATH"/><a href="#camundaclientzeebecacertificatepath" id="camundaclientzeebecacertificatepath" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientcacertificatepath"><Property defaultValue="property" groupId="property-format" property="camunda.client.ca-certificate-path" env="CAMUNDA_CLIENT_CACERTIFICATEPATH"/></a>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.execution-threads" env="CAMUNDA_CLIENT_ZEEBE_EXECUTIONTHREADS"/><a href="#camundaclientzeebeexecutionthreads" id="camundaclientzeebeexecutionthreads" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientexecutionthreads"><Property defaultValue="property" groupId="property-format" property="camunda.client.execution-threads" env="CAMUNDA_CLIENT_EXECUTIONTHREADS"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.grpc-address" env="CAMUNDA_CLIENT_ZEEBE_GRPCADDRESS"/><a href="#camundaclientzeebegrpcaddress" id="camundaclientzeebegrpcaddress" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientgrpcaddress"><Property defaultValue="property" groupId="property-format" property="camunda.client.grpc-address" env="CAMUNDA_CLIENT_GRPCADDRESS"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.keep-alive" env="CAMUNDA_CLIENT_ZEEBE_KEEPALIVE"/><a href="#camundaclientzeebekeepalive" id="camundaclientzeebekeepalive" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientkeepalive"><Property defaultValue="property" groupId="property-format" property="camunda.client.keep-alive" env="CAMUNDA_CLIENT_KEEPALIVE"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.max-message-size" env="CAMUNDA_CLIENT_ZEEBE_MAXMESSAGESIZE"/><a href="#camundaclientzeebemaxmessagesize" id="camundaclientzeebemaxmessagesize" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientmaxmessagesize"><Property defaultValue="property" groupId="property-format" property="camunda.client.max-message-size" env="CAMUNDA_CLIENT_MAXMESSAGESIZE"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.max-metadata-size" env="CAMUNDA_CLIENT_ZEEBE_MAXMETADATASIZE"/><a href="#camundaclientzeebemaxmetadatasize" id="camundaclientzeebemaxmetadatasize" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientmaxmetadatasize"><Property defaultValue="property" groupId="property-format" property="camunda.client.max-metadata-size" env="CAMUNDA_CLIENT_MAXMETADATASIZE"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.message-time-to-live" env="CAMUNDA_CLIENT_ZEEBE_MESSAGETIMETOLIVE"/><a href="#camundaclientzeebemessagetimetolive" id="camundaclientzeebemessagetimetolive" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientmessagetimetolive"><Property defaultValue="property" groupId="property-format" property="camunda.client.message-time-to-live" env="CAMUNDA_CLIENT_MESSAGETIMETOLIVE"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.override-authority" env="CAMUNDA_CLIENT_ZEEBE_OVERRIDEAUTHORITY"/><a href="#camundaclientzeebeoverrideauthority" id="camundaclientzeebeoverrideauthority" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientoverrideauthority"><Property defaultValue="property" groupId="property-format" property="camunda.client.override-authority" env="CAMUNDA_CLIENT_OVERRIDEAUTHORITY"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.prefer-rest-over-grpc" env="CAMUNDA_CLIENT_ZEEBE_PREFERRESTOVERGRPC"/><a href="#camundaclientzeebepreferrestovergrpc" id="camundaclientzeebepreferrestovergrpc" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientpreferrestovergrpc"><Property defaultValue="property" groupId="property-format" property="camunda.client.prefer-rest-over-grpc" env="CAMUNDA_CLIENT_PREFERRESTOVERGRPC"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.request-timeout" env="CAMUNDA_CLIENT_ZEEBE_REQUESTTIMEOUT"/><a href="#camundaclientzeeberequesttimeout" id="camundaclientzeeberequesttimeout" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientrequesttimeout"><Property defaultValue="property" groupId="property-format" property="camunda.client.request-timeout" env="CAMUNDA_CLIENT_REQUESTTIMEOUT"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.rest-address" env="CAMUNDA_CLIENT_ZEEBE_RESTADDRESS"/><a href="#camundaclientzeeberestaddress" id="camundaclientzeeberestaddress" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientrestaddress"><Property defaultValue="property" groupId="property-format" property="camunda.client.rest-address" env="CAMUNDA_CLIENT_RESTADDRESS"/></a>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.defaults.auto-complete" env="CAMUNDA_CLIENT_ZEEBE_DEFAULTS_AUTOCOMPLETE"/><a href="#camundaclientzeebedefaultsautocomplete" id="camundaclientzeebedefaultsautocomplete" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultsautocomplete"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.auto-complete" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_AUTOCOMPLETE"/></a>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.defaults.fetch-variables" env="CAMUNDA_CLIENT_ZEEBE_DEFAULTS_FETCHVARIABLES"/><a href="#camundaclientzeebedefaultsfetchvariables" id="camundaclientzeebedefaultsfetchvariables" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultsfetchvariables"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.fetch-variables" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_FETCHVARIABLES"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.defaults.force-fetch-all-variables" env="CAMUNDA_CLIENT_ZEEBE_DEFAULTS_FORCEFETCHALLVARIABLES"/><a href="#camundaclientzeebedefaultsforcefetchallvariables" id="camundaclientzeebedefaultsforcefetchallvariables" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultsforcefetchallvariables"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.force-fetch-all-variables" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_FORCEFETCHALLVARIABLES"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.defaults.max-jobs-active" env="CAMUNDA_CLIENT_ZEEBE_DEFAULTS_MAXJOBSACTIVE"/><a href="#camundaclientzeebedefaultsmaxjobsactive" id="camundaclientzeebedefaultsmaxjobsactive" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultsmaxjobsactive"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.max-jobs-active" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_MAXJOBSACTIVE"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.defaults.max-retries" env="CAMUNDA_CLIENT_ZEEBE_DEFAULTS_MAXRETRIES"/><a href="#camundaclientzeebedefaultsmaxretries" id="camundaclientzeebedefaultsmaxretries" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultsmaxretries"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.max-retries" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_MAXRETRIES"/></a>
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
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.defaults.poll-interval" env="CAMUNDA_CLIENT_ZEEBE_DEFAULTS_POLLINTERVAL"/><a href="#camundaclientzeebedefaultspollinterval" id="camundaclientzeebedefaultspollinterval" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultspollinterval"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.poll-interval" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_POLLINTERVAL"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.defaults.request-timeout" env="CAMUNDA_CLIENT_ZEEBE_DEFAULTS_REQUESTTIMEOUT"/><a href="#camundaclientzeebedefaultsrequesttimeout" id="camundaclientzeebedefaultsrequesttimeout" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultsrequesttimeout"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.request-timeout" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_REQUESTTIMEOUT"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.defaults.stream-enabled" env="CAMUNDA_CLIENT_ZEEBE_DEFAULTS_STREAMENABLED"/><a href="#camundaclientzeebedefaultsstreamenabled" id="camundaclientzeebedefaultsstreamenabled" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultsstreamenabled"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.stream-enabled" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_STREAMENABLED"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.defaults.stream-timeout" env="CAMUNDA_CLIENT_ZEEBE_DEFAULTS_STREAMTIMEOUT"/><a href="#camundaclientzeebedefaultsstreamtimeout" id="camundaclientzeebedefaultsstreamtimeout" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultsstreamtimeout"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.stream-timeout" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_STREAMTIMEOUT"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="camunda.client.zeebe.defaults.tenant-ids" env="CAMUNDA_CLIENT_ZEEBE_DEFAULTS_TENANTIDS"/><a href="#camundaclientzeebedefaultstenantids" id="camundaclientzeebedefaultstenantids" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultstenantids"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.tenant-ids" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_TENANTIDS"/></a>
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
  <Property defaultValue="property" groupId="property-format" property="common.auth-url" env="COMMON_AUTHURL"/><a href="#commonauthurl" id="commonauthurl" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientauthtokenurl"><Property defaultValue="property" groupId="property-format" property="camunda.client.auth.token-url" env="CAMUNDA_CLIENT_AUTH_TOKENURL"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="common.base-url" env="COMMON_BASEURL"/><a href="#commonbaseurl" id="commonbaseurl" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientrestaddress"><Property defaultValue="property" groupId="property-format" property="camunda.client.rest-address" env="CAMUNDA_CLIENT_RESTADDRESS"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="common.client-id" env="COMMON_CLIENTID"/><a href="#commonclientid" id="commonclientid" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientauthclientid"><Property defaultValue="property" groupId="property-format" property="camunda.client.auth.client-id" env="CAMUNDA_CLIENT_AUTH_CLIENTID"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="common.client-secret" env="COMMON_CLIENTSECRET"/><a href="#commonclientsecret" id="commonclientsecret" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientauthclientsecret"><Property defaultValue="property" groupId="property-format" property="camunda.client.auth.client-secret" env="CAMUNDA_CLIENT_AUTH_CLIENTSECRET"/></a>
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
  <a href="#camundaclientrestaddress"><Property defaultValue="property" groupId="property-format" property="camunda.client.rest-address" env="CAMUNDA_CLIENT_RESTADDRESS"/></a>
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
  <Property defaultValue="property" groupId="property-format" property="common.keycloak.token-url" env="COMMON_KEYCLOAK_TOKENURL"/><a href="#commonkeycloaktokenurl" id="commonkeycloaktokenurl" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientauthtokenurl"><Property defaultValue="property" groupId="property-format" property="camunda.client.auth.token-url" env="CAMUNDA_CLIENT_AUTH_TOKENURL"/></a>
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
  <a href="#camundaclientauthtokenurl"><Property defaultValue="property" groupId="property-format" property="camunda.client.auth.token-url" env="CAMUNDA_CLIENT_AUTH_TOKENURL"/></a>
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
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.apply-environment-variable-overrides" env="ZEEBE_CLIENT_APPLYENVIRONMENTVARIABLEOVERRIDES"/><a href="#zeebeclientapplyenvironmentvariableoverrides" id="zeebeclientapplyenvironmentvariableoverrides" class="hash-link"/>
</td>
<td>
  
</td>
<td>
Only the environment variables belonging to the Spring SDK are applied.
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.connection-mode" env="ZEEBE_CLIENT_CONNECTIONMODE"/><a href="#zeebeclientconnectionmode" id="zeebeclientconnectionmode" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.default-job-worker-stream-enabled" env="ZEEBE_CLIENT_DEFAULTJOBWORKERSTREAMENABLED"/><a href="#zeebeclientdefaultjobworkerstreamenabled" id="zeebeclientdefaultjobworkerstreamenabled" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultsstreamenabled"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.stream-enabled" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_STREAMENABLED"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.default-job-worker-tenant-ids" env="ZEEBE_CLIENT_DEFAULTJOBWORKERTENANTIDS"/><a href="#zeebeclientdefaultjobworkertenantids" id="zeebeclientdefaultjobworkertenantids" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultstenantids"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.tenant-ids" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_TENANTIDS"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.default-tenant-id" env="ZEEBE_CLIENT_DEFAULTTENANTID"/><a href="#zeebeclientdefaulttenantid" id="zeebeclientdefaulttenantid" class="hash-link"/>
</td>
<td>
  <a href="#camundaclienttenantid"><Property defaultValue="property" groupId="property-format" property="camunda.client.tenant-id" env="CAMUNDA_CLIENT_TENANTID"/></a>
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
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.request-timeout" env="ZEEBE_CLIENT_REQUESTTIMEOUT"/><a href="#zeebeclientrequesttimeout" id="zeebeclientrequesttimeout" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientrequesttimeout"><Property defaultValue="property" groupId="property-format" property="camunda.client.request-timeout" env="CAMUNDA_CLIENT_REQUESTTIMEOUT"/></a>
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
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.broker.gateway-address" env="ZEEBE_CLIENT_BROKER_GATEWAYADDRESS"/><a href="#zeebeclientbrokergatewayaddress" id="zeebeclientbrokergatewayaddress" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientgrpcaddress"><Property defaultValue="property" groupId="property-format" property="camunda.client.grpc-address" env="CAMUNDA_CLIENT_GRPCADDRESS"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.broker.grpc-address" env="ZEEBE_CLIENT_BROKER_GRPCADDRESS"/><a href="#zeebeclientbrokergrpcaddress" id="zeebeclientbrokergrpcaddress" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientgrpcaddress"><Property defaultValue="property" groupId="property-format" property="camunda.client.grpc-address" env="CAMUNDA_CLIENT_GRPCADDRESS"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.broker.keep-alive" env="ZEEBE_CLIENT_BROKER_KEEPALIVE"/><a href="#zeebeclientbrokerkeepalive" id="zeebeclientbrokerkeepalive" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientkeepalive"><Property defaultValue="property" groupId="property-format" property="camunda.client.keep-alive" env="CAMUNDA_CLIENT_KEEPALIVE"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.broker.rest-address" env="ZEEBE_CLIENT_BROKER_RESTADDRESS"/><a href="#zeebeclientbrokerrestaddress" id="zeebeclientbrokerrestaddress" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientrestaddress"><Property defaultValue="property" groupId="property-format" property="camunda.client.rest-address" env="CAMUNDA_CLIENT_RESTADDRESS"/></a>
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
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.cloud.auth-url" env="ZEEBE_CLIENT_CLOUD_AUTHURL"/><a href="#zeebeclientcloudauthurl" id="zeebeclientcloudauthurl" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientauthtokenurl"><Property defaultValue="property" groupId="property-format" property="camunda.client.auth.token-url" env="CAMUNDA_CLIENT_AUTH_TOKENURL"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.cloud.base-url" env="ZEEBE_CLIENT_CLOUD_BASEURL"/><a href="#zeebeclientcloudbaseurl" id="zeebeclientcloudbaseurl" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.cloud.client-id" env="ZEEBE_CLIENT_CLOUD_CLIENTID"/><a href="#zeebeclientcloudclientid" id="zeebeclientcloudclientid" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientauthclientid"><Property defaultValue="property" groupId="property-format" property="camunda.client.auth.client-id" env="CAMUNDA_CLIENT_AUTH_CLIENTID"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.cloud.client-secret" env="ZEEBE_CLIENT_CLOUD_CLIENTSECRET"/><a href="#zeebeclientcloudclientsecret" id="zeebeclientcloudclientsecret" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientauthclientsecret"><Property defaultValue="property" groupId="property-format" property="camunda.client.auth.client-secret" env="CAMUNDA_CLIENT_AUTH_CLIENTSECRET"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.cloud.cluster-id" env="ZEEBE_CLIENT_CLOUD_CLUSTERID"/><a href="#zeebeclientcloudclusterid" id="zeebeclientcloudclusterid" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientcloudclusterid"><Property defaultValue="property" groupId="property-format" property="camunda.client.cloud.cluster-id" env="CAMUNDA_CLIENT_CLOUD_CLUSTERID"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.cloud.credentials-cache-path" env="ZEEBE_CLIENT_CLOUD_CREDENTIALSCACHEPATH"/><a href="#zeebeclientcloudcredentialscachepath" id="zeebeclientcloudcredentialscachepath" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientauthcredentialscachepath"><Property defaultValue="property" groupId="property-format" property="camunda.client.auth.credentials-cache-path" env="CAMUNDA_CLIENT_AUTH_CREDENTIALSCACHEPATH"/></a>
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
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.job.poll-interval" env="ZEEBE_CLIENT_JOB_POLLINTERVAL"/><a href="#zeebeclientjobpollinterval" id="zeebeclientjobpollinterval" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultspollinterval"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.poll-interval" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_POLLINTERVAL"/></a>
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
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.message.max-message-size" env="ZEEBE_CLIENT_MESSAGE_MAXMESSAGESIZE"/><a href="#zeebeclientmessagemaxmessagesize" id="zeebeclientmessagemaxmessagesize" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientmaxmessagesize"><Property defaultValue="property" groupId="property-format" property="camunda.client.max-message-size" env="CAMUNDA_CLIENT_MAXMESSAGESIZE"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.message.time-to-live" env="ZEEBE_CLIENT_MESSAGE_TIMETOLIVE"/><a href="#zeebeclientmessagetimetolive" id="zeebeclientmessagetimetolive" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientmessagetimetolive"><Property defaultValue="property" groupId="property-format" property="camunda.client.message-time-to-live" env="CAMUNDA_CLIENT_MESSAGETIMETOLIVE"/></a>
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
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.security.cert-path" env="ZEEBE_CLIENT_SECURITY_CERTPATH"/><a href="#zeebeclientsecuritycertpath" id="zeebeclientsecuritycertpath" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientcacertificatepath"><Property defaultValue="property" groupId="property-format" property="camunda.client.ca-certificate-path" env="CAMUNDA_CLIENT_CACERTIFICATEPATH"/></a>
</td>
<td>
N/A
</td>
</tr>
<tr>
<td>
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.security.override-authority" env="ZEEBE_CLIENT_SECURITY_OVERRIDEAUTHORITY"/><a href="#zeebeclientsecurityoverrideauthority" id="zeebeclientsecurityoverrideauthority" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientoverrideauthority"><Property defaultValue="property" groupId="property-format" property="camunda.client.override-authority" env="CAMUNDA_CLIENT_OVERRIDEAUTHORITY"/></a>
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
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.worker.default-name" env="ZEEBE_CLIENT_WORKER_DEFAULTNAME"/><a href="#zeebeclientworkerdefaultname" id="zeebeclientworkerdefaultname" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.worker.default-type" env="ZEEBE_CLIENT_WORKER_DEFAULTTYPE"/><a href="#zeebeclientworkerdefaulttype" id="zeebeclientworkerdefaulttype" class="hash-link"/>
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
  <Property defaultValue="property" groupId="property-format" property="zeebe.client.worker.max-jobs-active" env="ZEEBE_CLIENT_WORKER_MAXJOBSACTIVE"/><a href="#zeebeclientworkermaxjobsactive" id="zeebeclientworkermaxjobsactive" class="hash-link"/>
</td>
<td>
  <a href="#camundaclientworkerdefaultsmaxjobsactive"><Property defaultValue="property" groupId="property-format" property="camunda.client.worker.defaults.max-jobs-active" env="CAMUNDA_CLIENT_WORKER_DEFAULTS_MAXJOBSACTIVE"/></a>
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
  <a href="#camundaclientexecutionthreads"><Property defaultValue="property" groupId="property-format" property="camunda.client.execution-threads" env="CAMUNDA_CLIENT_EXECUTIONTHREADS"/></a>
</td>
<td>
N/A
</td>
</tr>
</tbody>
</table>

### `zeebe.client.worker.override`

Deprecated properties to override the individual job workers registered with the Camunda client. Replaced by `camunda.client.worker.override`.
