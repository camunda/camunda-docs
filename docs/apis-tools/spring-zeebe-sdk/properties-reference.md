---
id: properties-reference
title: Properties reference
---

Properties for the Camunda Spring SDK.

## Properties

### `camunda.client`

Properties for the Camunda client.

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Type</th>
    <th>Default value</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <code>camunda.client.ca-certificate-path</code><br/><code>CAMUNDA_CLIENT_CACERTIFICATEPATH</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>null</code>
</td>
<td>

The path to a root Certificate Authority (CA) certificate to use instead of the certificate in the default store.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.enabled</code><br/><code>CAMUNDA_CLIENT_ENABLED</code>
</td>
<td>
  <code>boolean</code>
</td>
<td>
  <code>true</code>
</td>
<td>

Enable or disable the Camunda client. If disabled, the client bean is not created.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.execution-threads</code><br/><code>CAMUNDA_CLIENT_EXECUTIONTHREADS</code>
</td>
<td>
  <code>integer</code>
</td>
<td>
  <code>1</code>
</td>
<td>

The number of threads for invocation of job workers.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.grpc-address</code><br/><code>CAMUNDA_CLIENT_GRPCADDRESS</code>
</td>
<td>
  <code>url</code>
</td>
<td>
  <code>&quot;http:&#x2F;&#x2F;0.0.0.0:26500&quot;</code>
</td>
<td>

The gRPC address of Camunda that the client can connect to. The address must be an absolute URL, including the scheme. An alternative default is set by both `camunda.client.mode`.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.keep-alive</code><br/><code>CAMUNDA_CLIENT_KEEPALIVE</code>
</td>
<td>
  <code>duration</code>
</td>
<td>
  <code>null</code>
</td>
<td>

The time interval between keep-alive messages sent to the gateway.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.max-message-size</code><br/><code>CAMUNDA_CLIENT_MAXMESSAGESIZE</code>
</td>
<td>
  <code>dataSize</code>
</td>
<td>
  <code>&quot;5MB&quot;</code>
</td>
<td>

A custom `maxMessageSize` sets the maximum inbound message size the client can receive from Camunda. It specifies the `maxInboundMessageSize` of the gRPC channel.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.max-metadata-size</code><br/><code>CAMUNDA_CLIENT_MAXMETADATASIZE</code>
</td>
<td>
  <code>dataSize</code>
</td>
<td>
  <code>&quot;16KB&quot;</code>
</td>
<td>

A custom `maxMetadataSize` sets the maximum inbound metadata size the client can receive from Camunda. It specifies the `maxInboundMetadataSize` of the gRPC channel.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.message-time-to-live</code><br/><code>CAMUNDA_CLIENT_MESSAGETIMETOLIVE</code>
</td>
<td>
  <code>duration</code>
</td>
<td>
  <code>&quot;PT1H&quot;</code>
</td>
<td>

The default time-to-live for a message when no value is provided.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.mode</code><br/><code>CAMUNDA_CLIENT_MODE</code>
</td>
<td>
  <code>enum[self-managed, saas]</code>
</td>
<td>
  <code>null</code>
</td>
<td>

The client mode to use. If not set, `saas` mode is detected based on the presence of a `camunda.client.cloud.cluster-id`.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.override-authority</code><br/><code>CAMUNDA_CLIENT_OVERRIDEAUTHORITY</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>null</code>
</td>
<td>

Overrides the authority used with TLS virtual hosting to change hostname verification during the TLS handshake. It does not change the actual host connected to.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.prefer-rest-over-grpc</code><br/><code>CAMUNDA_CLIENT_PREFERRESTOVERGRPC</code>
</td>
<td>
  <code>boolean</code>
</td>
<td>
  <code>false</code>
</td>
<td>

If `true`, prefers REST over gRPC for operations supported by both protocols.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.request-timeout</code><br/><code>CAMUNDA_CLIENT_REQUESTTIMEOUT</code>
</td>
<td>
  <code>duration</code>
</td>
<td>
  <code>&quot;PT10S&quot;</code>
</td>
<td>

The request timeout to use when not overridden by a specific command.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.request-timeout-offset</code><br/><code>CAMUNDA_CLIENT_REQUESTTIMEOUTOFFSET</code>
</td>
<td>
  <code>duration</code>
</td>
<td>
  <code>&quot;PT1S&quot;</code>
</td>
<td>

The request timeout client offset applies to commands that also pass the request timeout to the server. It ensures the client timeout occurs after the server timeout. For these commands, the client-side timeout equals the request timeout plus the offset.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.rest-address</code><br/><code>CAMUNDA_CLIENT_RESTADDRESS</code>
</td>
<td>
  <code>url</code>
</td>
<td>
  <code>&quot;http:&#x2F;&#x2F;0.0.0.0:8080&quot;</code>
</td>
<td>

The REST API address of the Camunda instance that the client can connect to. The address must be an absolute URL, including the scheme. An alternative default is set by both`camunda.client.mode`.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.tenant-id</code><br/><code>CAMUNDA_CLIENT_TENANTID</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>&quot;&lt;default&gt;&quot;</code>
</td>
<td>

The tenant ID used for tenant-aware commands when no tenant ID is set.

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
    <th>Type</th>
    <th>Default value</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <code>camunda.client.auth.audience</code><br/><code>CAMUNDA_CLIENT_AUTH_AUDIENCE</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>null</code>
</td>
<td>

The resource for which the access token must be valid. A default is set by `camunda.client.mode: saas` and `camunda.client.auth.method: oidc`.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.auth.client-id</code><br/><code>CAMUNDA_CLIENT_AUTH_CLIENTID</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>null</code>
</td>
<td>

The client ID to use when requesting an access token from the OAuth authorization server.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.auth.client-secret</code><br/><code>CAMUNDA_CLIENT_AUTH_CLIENTSECRET</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>null</code>
</td>
<td>

The client secret to use when requesting an access token from the OAuth authorization server.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.auth.connect-timeout</code><br/><code>CAMUNDA_CLIENT_AUTH_CONNECTTIMEOUT</code>
</td>
<td>
  <code>duration</code>
</td>
<td>
  <code>&quot;PT5S&quot;</code>
</td>
<td>

The connection timeout for requests to the OAuth credentials provider.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.auth.credentials-cache-path</code><br/><code>CAMUNDA_CLIENT_AUTH_CREDENTIALSCACHEPATH</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>&quot;$HOME&#x2F;.camunda&#x2F;credentials&quot;</code>
</td>
<td>

The path to the credentials cache file.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.auth.keystore-key-password</code><br/><code>CAMUNDA_CLIENT_AUTH_KEYSTOREKEYPASSWORD</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>null</code>
</td>
<td>

The keystore key password for the OAuth identity provider.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.auth.keystore-password</code><br/><code>CAMUNDA_CLIENT_AUTH_KEYSTOREPASSWORD</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>null</code>
</td>
<td>

The keystore password for the OAuth identity provider.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.auth.keystore-path</code><br/><code>CAMUNDA_CLIENT_AUTH_KEYSTOREPATH</code>
</td>
<td>
  <code>file</code>
</td>
<td>
  <code>null</code>
</td>
<td>

The path to the keystore for the OAuth identity provider.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.auth.method</code><br/><code>CAMUNDA_CLIENT_AUTH_METHOD</code>
</td>
<td>
  <code>enum[none, basic, oidc]</code>
</td>
<td>
  <code>null</code>
</td>
<td>

The authentication method to use. If not set, it is detected based on the presence of a username, password, client ID, and client secret. A default is set by `camunda.client.mode: saas`.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.auth.password</code><br/><code>CAMUNDA_CLIENT_AUTH_PASSWORD</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>null</code>
</td>
<td>

The password to be use for basic authentication. A default is set by `camunda.client.auth.method: basic`.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.auth.read-timeout</code><br/><code>CAMUNDA_CLIENT_AUTH_READTIMEOUT</code>
</td>
<td>
  <code>duration</code>
</td>
<td>
  <code>&quot;PT5S&quot;</code>
</td>
<td>

The data read timeout for requests to the OAuth credentials provider.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.auth.resource</code><br/><code>CAMUNDA_CLIENT_AUTH_RESOURCE</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>null</code>
</td>
<td>

The resource for which the access token must be valid.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.auth.scope</code><br/><code>CAMUNDA_CLIENT_AUTH_SCOPE</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>null</code>
</td>
<td>

The scopes of the access token.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.auth.token-url</code><br/><code>CAMUNDA_CLIENT_AUTH_TOKENURL</code>
</td>
<td>
  <code>url</code>
</td>
<td>
  <code>null</code>
</td>
<td>

The authorization server URL from which to request the access token. A default is set by `camunda.client.mode: saas` and `camunda.client.auth.method: oidc`.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.auth.truststore-password</code><br/><code>CAMUNDA_CLIENT_AUTH_TRUSTSTOREPASSWORD</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>null</code>
</td>
<td>

The truststore password for the OAuth identity provider.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.auth.truststore-path</code><br/><code>CAMUNDA_CLIENT_AUTH_TRUSTSTOREPATH</code>
</td>
<td>
  <code>file</code>
</td>
<td>
  <code>null</code>
</td>
<td>

The path to the truststore for the OAuth identity provider.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.auth.username</code><br/><code>CAMUNDA_CLIENT_AUTH_USERNAME</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>null</code>
</td>
<td>

The username to use for basic authentication. A default is set by `camunda.client.auth.method: basic`.

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
    <th>Type</th>
    <th>Default value</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <code>camunda.client.auth.client-assertion.keystore-key-alias</code><br/><code>CAMUNDA_CLIENT_AUTH_CLIENTASSERTION_KEYSTOREKEYALIAS</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>null</code>
</td>
<td>

The alias of the key containing the certificate used to sign the client assertion certificate. If not set, the first alias from the keystore is used.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.auth.client-assertion.keystore-key-password</code><br/><code>CAMUNDA_CLIENT_AUTH_CLIENTASSERTION_KEYSTOREKEYPASSWORD</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>null</code>
</td>
<td>

The password of the key referenced by the alias. If not set, the keystore password is used.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.auth.client-assertion.keystore-password</code><br/><code>CAMUNDA_CLIENT_AUTH_CLIENTASSERTION_KEYSTOREPASSWORD</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>null</code>
</td>
<td>

The password of the referenced keystore.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.auth.client-assertion.keystore-path</code><br/><code>CAMUNDA_CLIENT_AUTH_CLIENTASSERTION_KEYSTOREPATH</code>
</td>
<td>
  <code>file</code>
</td>
<td>
  <code>null</code>
</td>
<td>

The path to the keystore where the client assertion certificate is stored.

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
    <th>Type</th>
    <th>Default value</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <code>camunda.client.cloud.cluster-id</code><br/><code>CAMUNDA_CLIENT_CLOUD_CLUSTERID</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>null</code>
</td>
<td>

The cluster ID the Camunda client connects to.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.cloud.domain</code><br/><code>CAMUNDA_CLIENT_CLOUD_DOMAIN</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>null</code>
</td>
<td>

The domain the Camunda client connects to. Change this to connect to a non-production instance of Camunda Cloud.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.cloud.port</code><br/><code>CAMUNDA_CLIENT_CLOUD_PORT</code>
</td>
<td>
  <code>integer</code>
</td>
<td>
  <code>null</code>
</td>
<td>

The port the Camunda client connects to.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.cloud.region</code><br/><code>CAMUNDA_CLIENT_CLOUD_REGION</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>null</code>
</td>
<td>

The region the Camunda client connects to.

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
    <th>Type</th>
    <th>Default value</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <code>camunda.client.deployment.enabled</code><br/><code>CAMUNDA_CLIENT_DEPLOYMENT_ENABLED</code>
</td>
<td>
  <code>boolean</code>
</td>
<td>
  <code>true</code>
</td>
<td>

Indicates if deployment uses the `@Deployment` annotation.

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
    <th>Type</th>
    <th>Default value</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <code>camunda.client.worker.defaults.auto-complete</code><br/><code>CAMUNDA_CLIENT_WORKER_DEFAULTS_AUTOCOMPLETE</code>
</td>
<td>
  <code>boolean</code>
</td>
<td>
  <code>null</code>
</td>
<td>

Enable or disable automatic job completion after method invocation.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.worker.defaults.enabled</code><br/><code>CAMUNDA_CLIENT_WORKER_DEFAULTS_ENABLED</code>
</td>
<td>
  <code>boolean</code>
</td>
<td>
  <code>null</code>
</td>
<td>

Enable or disable the job worker.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.worker.defaults.fetch-variables</code><br/><code>CAMUNDA_CLIENT_WORKER_DEFAULTS_FETCHVARIABLES</code>
</td>
<td>
  <code>array[string]</code>
</td>
<td>
  <code>null</code>
</td>
<td>

List of variable names to fetch on job activation. When set in defaults, it extends the list of variables to fetch from the annotation. When set in an override, it replaces the list of variables to fetch.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.worker.defaults.force-fetch-all-variables</code><br/><code>CAMUNDA_CLIENT_WORKER_DEFAULTS_FORCEFETCHALLVARIABLES</code>
</td>
<td>
  <code>boolean</code>
</td>
<td>
  <code>null</code>
</td>
<td>

Sets whether all variables are fetched. Overrides `fetch-variables`.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.worker.defaults.max-jobs-active</code><br/><code>CAMUNDA_CLIENT_WORKER_DEFAULTS_MAXJOBSACTIVE</code>
</td>
<td>
  <code>integer</code>
</td>
<td>
  <code>32</code>
</td>
<td>

The maximum number of jobs exclusively activated for this worker at the same time.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.worker.defaults.max-retries</code><br/><code>CAMUNDA_CLIENT_WORKER_DEFAULTS_MAXRETRIES</code>
</td>
<td>
  <code>integer</code>
</td>
<td>
  <code>null</code>
</td>
<td>

The maximum number of retries before automatic responses (complete, fail, bpmn error) for jobs are no longer attempted.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.worker.defaults.name</code><br/><code>CAMUNDA_CLIENT_WORKER_DEFAULTS_NAME</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>&quot;default&quot;</code>
</td>
<td>

The name of the worker owner. If set to default, it is generated as `${beanName}#${methodName}`.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.worker.defaults.poll-interval</code><br/><code>CAMUNDA_CLIENT_WORKER_DEFAULTS_POLLINTERVAL</code>
</td>
<td>
  <code>duration</code>
</td>
<td>
  <code>&quot;PT0.1S&quot;</code>
</td>
<td>

The maximal interval between polls for new jobs.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.worker.defaults.request-timeout</code><br/><code>CAMUNDA_CLIENT_WORKER_DEFAULTS_REQUESTTIMEOUT</code>
</td>
<td>
  <code>duration</code>
</td>
<td>
  <code>null</code>
</td>
<td>

The request timeout for the activate job request used to poll for new jobs.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.worker.defaults.stream-enabled</code><br/><code>CAMUNDA_CLIENT_WORKER_DEFAULTS_STREAMENABLED</code>
</td>
<td>
  <code>boolean</code>
</td>
<td>
  <code>false</code>
</td>
<td>

Opt-in feature flag that enables job streaming. When enabled, the job worker uses both streaming and polling to activate jobs. A long-lived stream eagerly pushes new jobs, and polling retrieves jobs created <em>before</em> any streams were opened.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.worker.defaults.stream-timeout</code><br/><code>CAMUNDA_CLIENT_WORKER_DEFAULTS_STREAMTIMEOUT</code>
</td>
<td>
  <code>duration</code>
</td>
<td>
  <code>null</code>
</td>
<td>

If streaming is enabled, sets the maximum lifetime for a stream. When this timeout is reached, the stream closes, and no more jobs are activated or received. If the worker is still open, a new stream opens immediately.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.worker.defaults.tenant-ids</code><br/><code>CAMUNDA_CLIENT_WORKER_DEFAULTS_TENANTIDS</code>
</td>
<td>
  <code>array[string]</code>
</td>
<td>
  <code>[&quot;&lt;default&gt;&quot;]</code>
</td>
<td>

Sets the tenants for which the job worker is registered. When set in defaults, it extends the list of tenant IDs from the annotation. When set in override, it replaces the list of tenant IDs.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.worker.defaults.timeout</code><br/><code>CAMUNDA_CLIENT_WORKER_DEFAULTS_TIMEOUT</code>
</td>
<td>
  <code>duration</code>
</td>
<td>
  <code>&quot;PT5M&quot;</code>
</td>
<td>

The time a job remains exclusively assigned to the worker.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.worker.defaults.type</code><br/><code>CAMUNDA_CLIENT_WORKER_DEFAULTS_TYPE</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>null</code>
</td>
<td>

The type of jobs to work on.

</td>
</tr>
</tbody>
</table>

### `camunda.client.worker.override`

Properties for overriding settings of individual job workers registered to the Camunda client. Overrides are specified as key-value pairs, where the key is the worker's job type and the values have the same properties as `camunda.client.worker.defaults` each: `camunda.client.worker.override.<job-type>.<property-name>: <property-value>`.

## Deprecated properties

:::caution
The following properties are deprecated. See the replacement property and related hints.

All replacements are automatically mapped unless stated otherwise. The client logs these mappings at startup.
:::

### `camunda.client`

Deprecated properties for the Camunda client.

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Type</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <code>camunda.client.cluster-id</code><br/><code>CAMUNDA_CLIENT_CLUSTERID</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.cloud.cluster-id</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.region</code><br/><code>CAMUNDA_CLIENT_REGION</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.cloud.region</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.tenant-ids</code><br/><code>CAMUNDA_CLIENT_TENANTIDS</code>
</td>
<td>
  <code>array[string]</code>
</td>
<td>
  <code>camunda.client.worker.defaults.tenant-ids</code>
</td>
<td>

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
    <th>Type</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <code>camunda.client.auth.issuer</code><br/><code>CAMUNDA_CLIENT_AUTH_ISSUER</code>
</td>
<td>
  <code>url</code>
</td>
<td>
  <code>camunda.client.auth.token-url</code>
</td>
<td>

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
    <th>Type</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <code>camunda.client.cloud.base-url</code><br/><code>CAMUNDA_CLIENT_CLOUD_BASEURL</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.cloud.domain</code>
</td>
<td>

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
    <th>Type</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <code>camunda.client.identity.audience</code><br/><code>CAMUNDA_CLIENT_IDENTITY_AUDIENCE</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.auth.audience</code>
</td>
<td>

Identity is now part of Camunda.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.identity.base-url</code><br/><code>CAMUNDA_CLIENT_IDENTITY_BASEURL</code>
</td>
<td>
  <code>url</code>
</td>
<td>
  
</td>
<td>

Identity is now part of Camunda.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.identity.enabled</code><br/><code>CAMUNDA_CLIENT_IDENTITY_ENABLED</code>
</td>
<td>
  <code>boolean</code>
</td>
<td>
  <code>camunda.client.enabled</code>
</td>
<td>

Identity is now part of Camunda.

</td>
</tr>
<tr>
<td>
  <code>camunda.client.identity.scope</code><br/><code>CAMUNDA_CLIENT_IDENTITY_SCOPE</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.auth.scope</code>
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
    <th>Type</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <code>camunda.client.zeebe.audience</code><br/><code>CAMUNDA_CLIENT_ZEEBE_AUDIENCE</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.auth.audience</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.zeebe.base-url</code><br/><code>CAMUNDA_CLIENT_ZEEBE_BASEURL</code>
</td>
<td>
  <code>url</code>
</td>
<td>
  <code>camunda.client.rest-address</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.zeebe.ca-certificate-path</code><br/><code>CAMUNDA_CLIENT_ZEEBE_CACERTIFICATEPATH</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.ca-certificate-path</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.zeebe.enabled</code><br/><code>CAMUNDA_CLIENT_ZEEBE_ENABLED</code>
</td>
<td>
  <code>boolean</code>
</td>
<td>
  <code>camunda.client.enabled</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.zeebe.execution-threads</code><br/><code>CAMUNDA_CLIENT_ZEEBE_EXECUTIONTHREADS</code>
</td>
<td>
  <code>integer</code>
</td>
<td>
  <code>camunda.client.execution-threads</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.zeebe.grpc-address</code><br/><code>CAMUNDA_CLIENT_ZEEBE_GRPCADDRESS</code>
</td>
<td>
  <code>url</code>
</td>
<td>
  <code>camunda.client.grpc-address</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.zeebe.keep-alive</code><br/><code>CAMUNDA_CLIENT_ZEEBE_KEEPALIVE</code>
</td>
<td>
  <code>duration</code>
</td>
<td>
  <code>camunda.client.keep-alive</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.zeebe.max-message-size</code><br/><code>CAMUNDA_CLIENT_ZEEBE_MAXMESSAGESIZE</code>
</td>
<td>
  <code>dataSize</code>
</td>
<td>
  <code>camunda.client.max-message-size</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.zeebe.max-metadata-size</code><br/><code>CAMUNDA_CLIENT_ZEEBE_MAXMETADATASIZE</code>
</td>
<td>
  <code>dataSize</code>
</td>
<td>
  <code>camunda.client.max-metadata-size</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.zeebe.message-time-to-live</code><br/><code>CAMUNDA_CLIENT_ZEEBE_MESSAGETIMETOLIVE</code>
</td>
<td>
  <code>duration</code>
</td>
<td>
  <code>camunda.client.message-time-to-live</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.zeebe.override-authority</code><br/><code>CAMUNDA_CLIENT_ZEEBE_OVERRIDEAUTHORITY</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.override-authority</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.zeebe.prefer-rest-over-grpc</code><br/><code>CAMUNDA_CLIENT_ZEEBE_PREFERRESTOVERGRPC</code>
</td>
<td>
  <code>boolean</code>
</td>
<td>
  <code>camunda.client.prefer-rest-over-grpc</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.zeebe.request-timeout</code><br/><code>CAMUNDA_CLIENT_ZEEBE_REQUESTTIMEOUT</code>
</td>
<td>
  <code>duration</code>
</td>
<td>
  <code>camunda.client.request-timeout</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.zeebe.rest-address</code><br/><code>CAMUNDA_CLIENT_ZEEBE_RESTADDRESS</code>
</td>
<td>
  <code>url</code>
</td>
<td>
  <code>camunda.client.rest-address</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.zeebe.scope</code><br/><code>CAMUNDA_CLIENT_ZEEBE_SCOPE</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.auth.scope</code>
</td>
<td>

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
    <th>Type</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <code>camunda.client.zeebe.defaults.auto-complete</code><br/><code>CAMUNDA_CLIENT_ZEEBE_DEFAULTS_AUTOCOMPLETE</code>
</td>
<td>
  <code>boolean</code>
</td>
<td>
  <code>camunda.client.worker.defaults.auto-complete</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.zeebe.defaults.enabled</code><br/><code>CAMUNDA_CLIENT_ZEEBE_DEFAULTS_ENABLED</code>
</td>
<td>
  <code>boolean</code>
</td>
<td>
  <code>camunda.client.worker.defaults.enabled</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.zeebe.defaults.fetch-variables</code><br/><code>CAMUNDA_CLIENT_ZEEBE_DEFAULTS_FETCHVARIABLES</code>
</td>
<td>
  <code>array[string]</code>
</td>
<td>
  <code>camunda.client.worker.defaults.fetch-variables</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.zeebe.defaults.force-fetch-all-variables</code><br/><code>CAMUNDA_CLIENT_ZEEBE_DEFAULTS_FORCEFETCHALLVARIABLES</code>
</td>
<td>
  <code>boolean</code>
</td>
<td>
  <code>camunda.client.worker.defaults.force-fetch-all-variables</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.zeebe.defaults.max-jobs-active</code><br/><code>CAMUNDA_CLIENT_ZEEBE_DEFAULTS_MAXJOBSACTIVE</code>
</td>
<td>
  <code>integer</code>
</td>
<td>
  <code>camunda.client.worker.defaults.max-jobs-active</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.zeebe.defaults.max-retries</code><br/><code>CAMUNDA_CLIENT_ZEEBE_DEFAULTS_MAXRETRIES</code>
</td>
<td>
  <code>integer</code>
</td>
<td>
  <code>camunda.client.worker.defaults.max-retries</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.zeebe.defaults.name</code><br/><code>CAMUNDA_CLIENT_ZEEBE_DEFAULTS_NAME</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.worker.defaults.name</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.zeebe.defaults.poll-interval</code><br/><code>CAMUNDA_CLIENT_ZEEBE_DEFAULTS_POLLINTERVAL</code>
</td>
<td>
  <code>duration</code>
</td>
<td>
  <code>camunda.client.worker.defaults.poll-interval</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.zeebe.defaults.request-timeout</code><br/><code>CAMUNDA_CLIENT_ZEEBE_DEFAULTS_REQUESTTIMEOUT</code>
</td>
<td>
  <code>duration</code>
</td>
<td>
  <code>camunda.client.worker.defaults.request-timeout</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.zeebe.defaults.stream-enabled</code><br/><code>CAMUNDA_CLIENT_ZEEBE_DEFAULTS_STREAMENABLED</code>
</td>
<td>
  <code>boolean</code>
</td>
<td>
  <code>camunda.client.worker.defaults.stream-enabled</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.zeebe.defaults.stream-timeout</code><br/><code>CAMUNDA_CLIENT_ZEEBE_DEFAULTS_STREAMTIMEOUT</code>
</td>
<td>
  <code>duration</code>
</td>
<td>
  <code>camunda.client.worker.defaults.stream-timeout</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.zeebe.defaults.tenant-ids</code><br/><code>CAMUNDA_CLIENT_ZEEBE_DEFAULTS_TENANTIDS</code>
</td>
<td>
  <code>array[string]</code>
</td>
<td>
  <code>camunda.client.worker.defaults.tenant-ids</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.zeebe.defaults.timeout</code><br/><code>CAMUNDA_CLIENT_ZEEBE_DEFAULTS_TIMEOUT</code>
</td>
<td>
  <code>duration</code>
</td>
<td>
  <code>camunda.client.worker.defaults.timeout</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>camunda.client.zeebe.defaults.type</code><br/><code>CAMUNDA_CLIENT_ZEEBE_DEFAULTS_TYPE</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.worker.defaults.type</code>
</td>
<td>

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
    <th>Type</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <code>camunda.client.zeebe.deployment.enabled</code><br/><code>CAMUNDA_CLIENT_ZEEBE_DEPLOYMENT_ENABLED</code>
</td>
<td>
  <code>boolean</code>
</td>
<td>
  <code>camunda.client.deployment.enabled</code>
</td>
<td>

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
    <th>Type</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <code>common.auth-url</code><br/><code>COMMON_AUTHURL</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.auth.token-url</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>common.base-url</code><br/><code>COMMON_BASEURL</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.rest-address</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>common.client-id</code><br/><code>COMMON_CLIENTID</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.auth.client-id</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>common.client-secret</code><br/><code>COMMON_CLIENTSECRET</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.auth.client-secret</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>common.enabled</code><br/><code>COMMON_ENABLED</code>
</td>
<td>
  <code>boolean</code>
</td>
<td>
  <code>camunda.client.enabled</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>common.password</code><br/><code>COMMON_PASSWORD</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.auth.password</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>common.url</code><br/><code>COMMON_URL</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.rest-address</code>
</td>
<td>

The REST address is the unified endpoint for all interaction with Camunda.

</td>
</tr>
<tr>
<td>
  <code>common.username</code><br/><code>COMMON_USERNAME</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.auth.username</code>
</td>
<td>

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
    <th>Type</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <code>common.keycloak.realm</code><br/><code>COMMON_KEYCLOAK_REALM</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  
</td>
<td>

There is no keycloak-specific configuration for Camunda; the issuer is provided as a URL.

</td>
</tr>
<tr>
<td>
  <code>common.keycloak.token-url</code><br/><code>COMMON_KEYCLOAK_TOKENURL</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.auth.token-url</code>
</td>
<td>

There is no keycloak-specific configuration for Camunda; the issuer is provided as a URL.

</td>
</tr>
<tr>
<td>
  <code>common.keycloak.url</code><br/><code>COMMON_KEYCLOAK_URL</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.auth.token-url</code>
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
    <th>Type</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <code>zeebe.client.apply-environment-variable-overrides</code><br/><code>ZEEBE_CLIENT_APPLYENVIRONMENTVARIABLEOVERRIDES</code>
</td>
<td>
  <code>boolean</code>
</td>
<td>
  
</td>
<td>

Only the environment variables belonging to the Spring SDK are applied.

</td>
</tr>
<tr>
<td>
  <code>zeebe.client.connection-mode</code><br/><code>ZEEBE_CLIENT_CONNECTIONMODE</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.mode</code>
</td>
<td>

Client modes are now available.

</td>
</tr>
<tr>
<td>
  <code>zeebe.client.default-job-worker-stream-enabled</code><br/><code>ZEEBE_CLIENT_DEFAULTJOBWORKERSTREAMENABLED</code>
</td>
<td>
  <code>boolean</code>
</td>
<td>
  <code>camunda.client.worker.defaults.stream-enabled</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>zeebe.client.default-job-worker-tenant-ids</code><br/><code>ZEEBE_CLIENT_DEFAULTJOBWORKERTENANTIDS</code>
</td>
<td>
  <code>array[string]</code>
</td>
<td>
  <code>camunda.client.worker.defaults.tenant-ids</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>zeebe.client.default-tenant-id</code><br/><code>ZEEBE_CLIENT_DEFAULTTENANTID</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.tenant-id</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>zeebe.client.enabled</code><br/><code>ZEEBE_CLIENT_ENABLED</code>
</td>
<td>
  <code>boolean</code>
</td>
<td>
  <code>camunda.client.enabled</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>zeebe.client.request-timeout</code><br/><code>ZEEBE_CLIENT_REQUESTTIMEOUT</code>
</td>
<td>
  <code>duration</code>
</td>
<td>
  <code>camunda.client.request-timeout</code>
</td>
<td>

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
    <th>Type</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <code>zeebe.client.broker.gateway-address</code><br/><code>ZEEBE_CLIENT_BROKER_GATEWAYADDRESS</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.grpc-address</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>zeebe.client.broker.grpc-address</code><br/><code>ZEEBE_CLIENT_BROKER_GRPCADDRESS</code>
</td>
<td>
  <code>url</code>
</td>
<td>
  <code>camunda.client.grpc-address</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>zeebe.client.broker.keep-alive</code><br/><code>ZEEBE_CLIENT_BROKER_KEEPALIVE</code>
</td>
<td>
  <code>duration</code>
</td>
<td>
  <code>camunda.client.keep-alive</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>zeebe.client.broker.rest-address</code><br/><code>ZEEBE_CLIENT_BROKER_RESTADDRESS</code>
</td>
<td>
  <code>url</code>
</td>
<td>
  <code>camunda.client.rest-address</code>
</td>
<td>

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
    <th>Type</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <code>zeebe.client.cloud.auth-url</code><br/><code>ZEEBE_CLIENT_CLOUD_AUTHURL</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.auth.token-url</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>zeebe.client.cloud.base-url</code><br/><code>ZEEBE_CLIENT_CLOUD_BASEURL</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.cloud.domain</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>zeebe.client.cloud.client-id</code><br/><code>ZEEBE_CLIENT_CLOUD_CLIENTID</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.auth.client-id</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>zeebe.client.cloud.client-secret</code><br/><code>ZEEBE_CLIENT_CLOUD_CLIENTSECRET</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.auth.client-secret</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>zeebe.client.cloud.cluster-id</code><br/><code>ZEEBE_CLIENT_CLOUD_CLUSTERID</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.cloud.cluster-id</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>zeebe.client.cloud.credentials-cache-path</code><br/><code>ZEEBE_CLIENT_CLOUD_CREDENTIALSCACHEPATH</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.auth.credentials-cache-path</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>zeebe.client.cloud.port</code><br/><code>ZEEBE_CLIENT_CLOUD_PORT</code>
</td>
<td>
  <code>integer</code>
</td>
<td>
  
</td>
<td>

The Zeebe client URL is now configured as HTTP&#x2F;HTTPS URL.

</td>
</tr>
<tr>
<td>
  <code>zeebe.client.cloud.region</code><br/><code>ZEEBE_CLIENT_CLOUD_REGION</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.cloud.region</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>zeebe.client.cloud.scope</code><br/><code>ZEEBE_CLIENT_CLOUD_SCOPE</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.auth.scope</code>
</td>
<td>

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
    <th>Type</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <code>zeebe.client.job.poll-interval</code><br/><code>ZEEBE_CLIENT_JOB_POLLINTERVAL</code>
</td>
<td>
  <code>duration</code>
</td>
<td>
  <code>camunda.client.worker.defaults.poll-interval</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>zeebe.client.job.timeout</code><br/><code>ZEEBE_CLIENT_JOB_TIMEOUT</code>
</td>
<td>
  <code>duration</code>
</td>
<td>
  <code>camunda.client.worker.defaults.timeout</code>
</td>
<td>

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
    <th>Type</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <code>zeebe.client.message.max-message-size</code><br/><code>ZEEBE_CLIENT_MESSAGE_MAXMESSAGESIZE</code>
</td>
<td>
  <code>integer</code>
</td>
<td>
  <code>camunda.client.max-message-size</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>zeebe.client.message.time-to-live</code><br/><code>ZEEBE_CLIENT_MESSAGE_TIMETOLIVE</code>
</td>
<td>
  <code>duration</code>
</td>
<td>
  <code>camunda.client.message-time-to-live</code>
</td>
<td>

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
    <th>Type</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <code>zeebe.client.security.cert-path</code><br/><code>ZEEBE_CLIENT_SECURITY_CERTPATH</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.ca-certificate-path</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>zeebe.client.security.override-authority</code><br/><code>ZEEBE_CLIENT_SECURITY_OVERRIDEAUTHORITY</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.override-authority</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>zeebe.client.security.plaintext</code><br/><code>ZEEBE_CLIENT_SECURITY_PLAINTEXT</code>
</td>
<td>
  <code>boolean</code>
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
    <th>Type</th>
    <th>Replacement</th>
    <th>Hint</th>
  </tr>
</thead>
<tbody>
<tr>
<td>
  <code>zeebe.client.worker.default-name</code><br/><code>ZEEBE_CLIENT_WORKER_DEFAULTNAME</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.worker.defaults.name</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>zeebe.client.worker.default-type</code><br/><code>ZEEBE_CLIENT_WORKER_DEFAULTTYPE</code>
</td>
<td>
  <code>string</code>
</td>
<td>
  <code>camunda.client.worker.defaults.type</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>zeebe.client.worker.max-jobs-active</code><br/><code>ZEEBE_CLIENT_WORKER_MAXJOBSACTIVE</code>
</td>
<td>
  <code>integer</code>
</td>
<td>
  <code>camunda.client.worker.defaults.max-jobs-active</code>
</td>
<td>

</td>
</tr>
<tr>
<td>
  <code>zeebe.client.worker.threads</code><br/><code>ZEEBE_CLIENT_WORKER_THREADS</code>
</td>
<td>
  <code>integer</code>
</td>
<td>
  <code>camunda.client.execution-threads</code>
</td>
<td>

</td>
</tr>
</tbody>
</table>

### `zeebe.client.worker.override`

Deprecated properties to override the individual job workers registered with the Camunda client. Replaced by `camunda.client.worker.override`.
