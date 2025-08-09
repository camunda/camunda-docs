---
id: properties-reference
title: Properties Reference
---

Here is the full properties reference for the Camunda Spring SDK.

## Current properties

### `camunda.client`

Properties related to the Camunda client.

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

Path to a root CA certificate to be used instead of the certificate in the default store.

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

Whether the Camunda client is enabled. If disabled, no bean is created.

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

Time interval between keep alive messages sent to the gateway.

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

A custom maxMessageSize allows the client to receive larger or smaller responses from Camunda. Technically, it specifies the maxInboundMessageSize of the gRPC channel.

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

A custom maxMetadataSize allows the client to receive larger or smaller response headers from Camunda. Technically, it specifies the maxInboundMetadataSize of the gRPC channel.

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

The time-to-live which is used when none is provided for a message.

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

The client mode to be used. If not set, `saas` mode will be detected based on the presence of a `camunda.client.cloud.cluster-id`.

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

Overrides the authority used with TLS virtual hosting. Specifically, to override hostname verification in the TLS handshake. It does not change what host is actually connected to.

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

If true, will prefer to use REST over gRPC for calls which can be done over both REST and gRPC.

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

The request timeout used if not overridden by the command.

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

The request timeout client offset is used in commands where the request timeout is also passed to the server. This ensures that the client timeout does not occur before the server timeout. The client-side timeout for these commands is calculated as the sum of request timeout plus offset.

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

The REST API address of Camunda that the client can connect to. The address must be an absolute URL, including the scheme. An alternative default is set by both`camunda.client.mode`.

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

The tenant identifier which is used for tenant-aware commands when no tenant identifier is set.

</td>
</tr>
</tbody>
</table>

### `camunda.client.auth`

Properties related to the authentication of the Camunda client.

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

The resource for which the access token should be valid. A default is set by `camunda.client.mode: saas` and `camunda.client.auth.method: oidc`.

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

Client id to be used when requesting access token from OAuth authorization server.

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

Client secret to be used when requesting access token from OAuth authorization server.

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

The connection timeout of requests to the OAuth credentials provider.

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

The location for the credentials cache file.

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

Keystore key password used for OAuth identity provider.

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

Password to keystore used for OAuth identity provider.

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

Path to keystore used for OAuth identity provider.

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

Authentication method to be used. If not set, it will be detected based on the presence of username, password, client id and client secret. A default is set by `camunda.client.mode: saas`.

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

Password to be used for basic authentication. A default is set by `camunda.client.auth.method: basic`.

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

The data read timeout of requests to the OAuth credentials provider.

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

The resource for which the access token should be valid.

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

The authorization server's URL, from which the access token will be requested. A default is set by `camunda.client.mode: saas` and `camunda.client.auth.method: oidc`.

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

Password to truststore used for OAuth identity provider.

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

Path to truststore used for OAuth identity provider.

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

Username to be used for basic authentication. A default is set by `camunda.client.auth.method: basic`.

</td>
</tr>
</tbody>
</table>

### `camunda.client.auth.client-assertion`

Properties related to oidc authentication using client-assertion instead of a client secret.

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

Alias of the key holding the certificate to sign the client assertion certificate. If not set, the first alias from the keystore will be used.

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

Password of the key the alias points to. If not set, the password of the keystore will be used.

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

Password of the referenced keystore.

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

Path to the keystore where the client assertion certificate is stored.

</td>
</tr>
</tbody>
</table>

### `camunda.client.cloud`

Properties related to the connection of the Camunda client to SaaS. They will only be used to compose default connection details if the client is configured to `camunda.client.mode: saas`.

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

Set the cluster id the Camunda client will connect to.

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

Set the domain the Camunda client will connect to. Change this to connect to a non-productive instance of Camunda Cloud.

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

Set the port the Camunda client will connect to.

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

Set the region the Camunda client will connect to.

</td>
</tr>
</tbody>
</table>

### `camunda.client.deployment`

Properties related to the automatic deployment at startup.

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

Whether a deployment will be done using the `@Deployment` annotation.

</td>
</tr>
</tbody>
</table>

### `camunda.client.worker.defaults`

Properties related to the global defaults of job workers being registered to the Camunda client.

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

Set whether a job should automatically be completed after the method invocation.

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

Set whether the job worker is enabled.

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

Set a list of variable names which should be fetched on job activation. If set on defaults, it will extend the list of variables to fetch from the annotation. If set on override, it will replace the list of variables to fetch.

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

Set whether all variables should be fetched. Overrides `fetch-variables`.

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

Set the maximum number of jobs which will be exclusively activated for this worker at the same time.

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

Set the maximum number of retries before an automatic response (complete, fail, bpmn error) for jobs will not be attempted anymore.

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

Set the name of the worker owner. Will be generated as `${beanName}#${methodName}` as long as set to default.

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

Set the maximal interval between polling for new jobs.

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

Set the request timeout for activate job request used to poll for new job.

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

Opt-in feature flag to enable job streaming. If set as enabled, the job worker will use a mix of streaming and polling to activate jobs. A long living stream will be opened onto which jobs will be eagerly pushed, and the polling mechanism will be used strictly to fetch jobs created <em>before</em> any streams were opened.

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

If streaming is enabled, sets a maximum lifetime for a given stream. Once this timeout is reached, the stream is closed, such that no more jobs are activated and received. If the worker is still open, then it will immediately open a new stream.

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

Set for which tenants the jobs worker should be registered. If set on defaults, it will extend the list of tenant ids from the annotation. Of set on override, it will replace the list of tenant ids.

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

Set the time for how long a job is exclusively assigned for a worker.

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

Set the type of jobs to work on.

</td>
</tr>
</tbody>
</table>

### `camunda.client.worker.override`

Properties related to the override of individual job workers being registered to the Camunda client. Overrides are composed in key-value pairs where the key is the job type of the worker and the values have the same properties as `camunda.client.worker.defaults` each: `camunda.client.worker.override.<job-type>.<property-name>: <property-value>`.

## Deprecated properties

:::caution
The following properties are deprecated. Please find the according replacement and read the hint.

All replacements are automatically mapped unless documented otherwise. The client will log these mappings on startup.
:::

### `camunda.client`

Properties related to the Camunda client.

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

Properties related to the authentication of the Camunda client.

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

Properties related to the connection of the Camunda client to SaaS. They will only be used to compose default connection details if the client is configured to `camunda.client.mode: saas`.

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
  <code>camunda.client.restAddress</code>
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
  <code>camunda.client.worker.defaults.request-timeout</code>
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

Properties related to the override of individual job workers being registered to the Camunda client. Replaced by `camunda.client.worker.override`.

### `common`

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

The rest address is the unified endpoint for all interaction with Camunda.

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
  <code>camunda.client.auth.token-url</code>
</td>
<td>

There is no keycloak-specific configuration for camunda, the issuer is provided as url.

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

There is no keycloak-specific configuration for camunda, the issuer is provided as url.

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

There is no keycloak-specific configuration for camunda, the issuer is provided as url.

</td>
</tr>
</tbody>
</table>

### `zeebe.client`

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

Only the environment variables belonging to the Spring SDK will be applied.

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

There are client modes now.

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
  <code>camunda.client.worker.defaults.tenant-ids</code>
</td>
<td>

the first provided tenant id is applied.

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
  <code>camunda.client.grpc-address</code>
</td>
<td>

The zeebe client url is now configured as http&#x2F;https url.

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
  <code>camunda.client.cluster-id</code>
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
  <code>camunda.client.grpc-address</code>
</td>
<td>

The zeebe client url is now configured as http&#x2F;https url.

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
  <code>camunda.client.region</code>
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
  <code>camunda.client.scope</code>
</td>
<td>

</td>
</tr>
</tbody>
</table>

### `zeebe.client.job`

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
  <code>camunda.client.grpc-address</code>
</td>
<td>

plaintext is determined by the url protocol (http&#x2F;https) now.

</td>
</tr>
</tbody>
</table>

### `zeebe.client.worker`

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

Properties related to the override of individual job workers being registered to the Camunda client. Replaced by `camunda.client.worker.override`.
