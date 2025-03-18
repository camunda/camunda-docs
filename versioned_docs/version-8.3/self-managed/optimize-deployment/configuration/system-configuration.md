---
id: system-configuration
title: "Overview"
description: "An overview of all possible configuration options in Optimize."
---

All distributions of Camunda Optimize come with a predefined set of configuration options that can be overwritten by the user, based on current environment requirements. To do that, have a look into the folder named `config` which contains a file called `environment-config.yaml` with values that override the default Optimize properties.

You can see a sample configuration file with all possible configuration fields
and their default values [here](service-config.yaml).

In the following section, you will find descriptions and default values of the configuration fields with their respective YAML path.

:::note Heads Up
For changes in the configuration to take effect, you need to restart Optimize!
:::

### Java system properties & OS environment variable placeholders

To externalize configuration properties from the `environment-config.yaml`, Optimize provides variable placeholder support.

The order in which placeholders are resolved is the following:

1. Java system properties
2. OS environment variables

The placeholder format is `${VARIABLE_NAME}` and allows you to refer to a value of a Java system property or OS environment variable of your choice.
The `VARIABLE_NAME` is required to contain only lowercase or uppercase letters, digits and underscore `_` characters and shall not begin with a digit. The corresponding regular expression is `([a-zA-Z_]+[a-zA-Z0-9_]*)`.

The following example illustrates the usage:

```
security:
  auth:
    token:
      secret: ${AUTH_TOKEN_SECRET}
```

Given this variable is set before Optimize is started, for example on Unix systems with:

```
export AUTH_TOKEN_SECRET=sampleTokenValue
```

The value will be resolved at startup to `sampleTokenValue`.

However, if the same variable is provided at the same time as a Java system property, for example via passing `-DAUTH_TOKEN_SECRET=othertokenValue` to the Optimize startup script:

```
./optimize-startup.sh -DAUTH_TOKEN_SECRET=othertokenValue
```

The value would be resolved to `othertokenValue` as Java system properties have precedence over OS environment variables.

:::note
For Windows users, to pass Java system properties to the provided Windows Batch script `optimize-startup.bat`, you have to put them into double quotes when using the `cmd.exe` shell, as shown below.
:::

```
optimize-startup.bat "-DAUTH_TOKEN_SECRET=othertokenValue"
```

For the Windows Powershell in three double quotes:

```
./optimize-startup.bat """-DAUTH_TOKEN_SECRET=othertokenValue"""
```

#### Default values

For variable placeholders it's also possible to provide default values using the following format: `${VARIABLE_NAME:DEFAULT_VALUE}`. The `DEFAULT_VALUE` can contain any character except `}`.

The following example illustrates the usage:

```
security:
  auth:
    token:
      secret: ${AUTH_TOKEN_SECRET:defaultSecret}
```

### Security

These values control mechanisms of Optimize related security, e.g. security headers and authentication.

| YAML Path                                        | Default Value   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|                                                  |
| security.auth.token.lifeMin                      | 60              | Optimize uses token-based authentication to keep track of which users are logged in. Define the lifetime of the token in minutes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| security.auth.token.secret                       | null            | Optional secret used to sign authentication tokens, it's recommended to use at least a 64-character secret. If set to `null` a random secret will be generated with each startup of Optimize.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| security.auth.superUserIds                       | [ ]             | List of user IDs that are granted full permission to all collections, reports, and dashboards. <br /><br /> Note: For reports, these users are still required to be granted access to the corresponding process/decision definitions in Camunda 7 Admin. See [Authorization Management](#).                                                                                                                                                                                                                                                                                                                                                                                                                  |
| security.auth.superGroupIds                      | [ ]             | List of group IDs that are granted full permission to all collections, reports, and dashboards. All members of the groups specified will have superuser permissions in Optimize. <br /><br />Note: For reports, these groups are still required to be granted access to the corresponding process/decision definitions in Camunda 7 Admin. See [Authorization Management](#).                                                                                                                                                                                                                                                                                                                                |
| security.responseHeaders.HSTS.max-age            | 63072000        | HTTP Strict Transport Security (HSTS) is a web security policy mechanism which helps to protect websites against protocol downgrade attacks and cookie hijacking. This field defines the time, in seconds, that the browser should remember that this site is only to be accessed using HTTPS. If you set the number to a negative value no HSTS header is sent.                                                                                                                                                                                                                                                                                                                                             |
| security.responseHeaders.HSTS.includeSubDomains  | true            | HTTP Strict Transport Security (HSTS) is a web security policy mechanism which helps to protect websites against protocol downgrade attacks and cookie hijacking. If this optional parameter is specified, this rule applies to all the site’s subdomains as well.                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| security.responseHeaders.X-XSS-Protection        | 1; mode=block   | This header enables the cross-site scripting (XSS) filter in your browser. Can have one of the following options:<ul><li> `0`: Filter disabled. </li><li> `1`: Filter enabled. If a cross-site scripting attack is detected, in order to stop the attack, the browser will sanitize the page. </li><li> `1; mode=block`: Filter enabled. Rather than sanitize the page, when a XSS attack is detected, the browser will prevent rendering of the page.</li><li> `1; report=http://[YOURDOMAIN]/your_report_URI`: Filter enabled. The browser will sanitize the page and report the violation. This is a Chromium function utilizing CSP violation reports to send details to a URI of your choice.</li></ul> |
| security.responseHeaders.X-Content-Type-Options  | true            | Setting this header will prevent the browser from interpreting files as a different MIME type to what is specified in the Content-Type HTTP header (e.g. treating text/plain as text/css).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| security.responseHeaders.Content-Security-Policy | base-uri 'self' | A Content Security Policy (CSP) has significant impact on the way browsers render pages. By default Optimize uses the base-uri directive which restricts the URLs that can be used to the Optimize pages. Find more details in [Mozilla's Content Security Policy Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy).                                                                                                                                                                                                                                                                                                                                                 |

### Public API

This section focuses on common properties related to the Public REST API of Optimize. It is
mandatory to configure one of the values below if the Public REST API is to be used. If neither is
configured an error will be thrown and all requests to the Public API will get rejected. If both are configured then
the `jwtSetUri` will take precedence and the `accessToken` will be ignored.

| YAML Path       | Default Value | Description                                                                                                                                    |
| --------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| api.accessToken | null          | Secret static shared token to be provided to the secured REST API in the authorization header. Will be ignored if `api.jwtSetUri` is also set. |
| api.jwtSetUri   | null          | Complete URI to get public keys for JWT validation, e.g. `https://weblogin.cloud.company.com/.well-known/jwks.json`                            |
| api.audience    | optimize      | Optimize tries to match this with the `aud` field contained in the JWT token. Only used when `jwtSetUri` is set.                               |

### Container

Settings related to embedded Jetty container, which serves the Optimize application.

| YAML Path                        | Default Value | Description                                                                                                                                                                                                                             |
| -------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| container.host                   | localhost     | A host name or IP address to identify a specific network interface on which to listen.                                                                                                                                                  |
| container.contextPath            | null          | Allows you to specify a custom context path. If set, must start with a leading '/'                                                                                                                                                      |
| container.ports.http             | 8090          | A port number that will be used by Optimize to process HTTP connections. If set to null, or left empty, HTTP connections won't be accepted.                                                                                             |
| container.ports.https            | 8091          | A port number that will be used by Optimize to process secure HTTPS connections.                                                                                                                                                        |
| container.ports.actuator         | 8092          | A port number that will be used by Optimize's Actuator management server, defaults to 8092                                                                                                                                              |
| container.keystore.location      | keystore.jks  | HTTPS requires an SSL Certificate. When you generate an SSL Certificate, you are creating a keystore file and a keystore password for use when the browser interface connects. This field specifies the location of this keystore file. |
| container.keystore.password      | optimize      | Password of keystore file.                                                                                                                                                                                                              |
| container.status.connections.max | 10            | Maximum number of web socket connections accepted for status report.                                                                                                                                                                    |
| container.accessUrl              | null          | Optional URL to access Optimize (used for links to Optimize in e.g. alert emails). If no value specified the container host and port are used instead.                                                                                  |
| container.http2Enabled           | false         | Enable use of HTTP/2 for Optimize                                                                                                                                                                                                       |
| container.enableSniCheck         | true          | Determines whether SNI checking should be enabled.                                                                                                                                                                                      |

### Elasticsearch

Settings related to Elasticsearch.

#### Connection settings

Everything that is related to building the connection to Elasticsearch.

Please note that you can define a number of connection points
in a cluster. Therefore, everything that is under `es.connection.nodes` is a list of nodes Optimize can connect to.
If you have built an Elasticsearch cluster with several nodes it is recommended to define several connection points so that
if one node fails, Optimize is still able to talk to the cluster.

| YAML Path                                     | Default Value | Description                                                                                                                                                               |
| --------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| es.connection.timeout                         | 10000         | Maximum time without connection to Elasticsearch that Optimize should wait until a timeout triggers.                                                                      |
| es.connection.responseConsumerBufferLimitInMb | 100           | Maximum size of the Elasticsearch response consumer heap buffer. This can be increased to resolve errors from Elasticsearch relating to the entity content being too long |
| es.connection.pathPrefix                      |               | The path prefix under which Elasticsearch is available.                                                                                                                   |
| es.connection.nodes[*].host                   | localhost     | The address/hostname under which the Elasticsearch node is available.                                                                                                     |
| es.connection.nodes[*].httpPort               | 9200          | A port number used by Elasticsearch to accept HTTP connections.                                                                                                           |
| es.connection.proxy.enabled                   | false         | Whether an HTTP proxy should be used for requests to Elasticsearch.                                                                                                       |
| es.connection.proxy.host                      | null          | The proxy host to use, must be set if es.connection.proxy.enabled = true.                                                                                                 |
| es.connection.proxy.port                      | null          | The proxy port to use, must be set if es.connection.proxy.enabled = true.                                                                                                 |
| es.connection.proxy.sslEnabled                | false         | Whether this proxy is using a secured connection (HTTPS).                                                                                                                 |
| es.connection.skipHostnameVerification        | false         | Determines whether the hostname verification should be skipped.                                                                                                           |

#### Index settings

| YAML Path                                | Default Value | Description                                                                                                                                                                                                                                                                                                                                                                                                               |
| ---------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| es.settings.index.prefix                 | optimize      | The prefix prepended to all Optimize index and alias names. Custom values allow to operate multiple isolated Optimize instances on one Elasticsearch cluster. <br /><br />NOTE: Changing this after Optimize was already run before will create new empty indexes.                                                                                                                                                        |
| es.settings.index.number_of_replicas     | 1             | How often data should be replicated to handle node failures.                                                                                                                                                                                                                                                                                                                                                              |
| es.settings.index.number_of_shards       | 1             | How many shards should be used in the cluster for process instance and decision instance indices. All other indices will be made up of a single shard. <br /><br />Note: this property only applies the first time Optimize is started and the schema/mapping is deployed on Elasticsearch. If you want this property to take effect again, you need to delete all indices (and with that all data) and restart Optimize. |
| es.settings.index.refresh_interval       | 2s            | How long Elasticsearch waits until the documents are available for search. A positive value defines the duration in seconds. A value of -1 means that a refresh needs to be done manually.                                                                                                                                                                                                                                |
| es.settings.index.nested_documents_limit | 10000         | Optimize uses nested documents to store list information such as activities or variables belonging to a process instance. This setting defines the maximum number of activities/variables/incidents that a single process instance can contain. This limit helps to prevent out of memory errors and should be used with care. For more information, please refer to the Elasticsearch documentation on this topic.       |

#### Elasticsearch Security

Define a secured connection to be able to communicate with a secured Elasticsearch instance.

| YAML Path                               | Default Value | Description                                                                                                                                                                                                                                           |
| --------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| es.security.username                    |               | The basic authentication (x-pack) username.                                                                                                                                                                                                           |
| es.security.password                    |               | The basic authentication (x-pack) password.                                                                                                                                                                                                           |
| es.security.ssl.enabled                 | false         | Used to enable or disable TLS/SSL for the HTTP connection.                                                                                                                                                                                            |
| es.security.ssl.certificate             |               | The path to a PEM encoded file containing the certificate (or certificate chain) that will be presented to clients when they connect.                                                                                                                 |
| es.security.ssl.certificate_authorities | [ ]           | A list of paths to PEM encoded CA certificate files that should be trusted, e.g. ['/path/to/ca.crt']. <br /><br />Note: if you are using a public CA that is already trusted by the Java runtime, you do not need to set the certificate_authorities. |
| es.security.ssl.selfSigned              | false         | Used to specify that the certificate was self-signed.                                                                                                                                                                                                 |

#### Elasticsearch backup settings

| YAML path                | Default value | Description                                                              |
| ------------------------ | ------------- | ------------------------------------------------------------------------ |
| es.backup.repositoryName | ""            | The name of the snapshot repository to be used to back up Optimize data. |

### Email

Settings for the email server to send email notifications, e.g. when an alert is triggered.

| YAML Path                             | Default Value | Description                                                                                                     |
| ------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------- |
| email.enabled                         | false         | A switch to enable the email sending functionality.                                                             |
| email.address                         |               | Email address that can be used to send notifications.                                                           |
| email.hostname                        |               | The smtp server name.                                                                                           |
| email.port                            | 587           | The smtp server port. This one is also used as SSL port for the security connection.                            |
| email.checkServerIdentity             | false         | A switch to control checking the identity of the email server.                                                  |
| email.authentication.enabled          |               | A switch to enable email server authentication.                                                                 |
| email.authentication.username         |               | Username of your smtp server.                                                                                   |
| email.authentication.password         |               | Corresponding password to the given user of your smtp server.                                                   |
| email.authentication.securityProtocol |               | States how the connection to the server should be secured. Possible values are 'NONE', 'STARTTLS' or 'SSL/TLS'. |

### Digest

Settings influencing the process digest feature.

| YAML Path          | Default value   | Description                                                          |
| ------------------ | --------------- | -------------------------------------------------------------------- |
| digest.cronTrigger | 0 0 9 \* \* MON | Cron expression to define when enabled email digests are to be sent. |

### Alert Notification Webhooks

<span class="badge badge--platform">Camunda 7 only</span>

Settings for webhooks which can receive custom alert notifications. You can configure multiple webhooks which will be available to select from when creating or editing alerts. Each webhook configuration should have a unique human readable name which will appear in the Optimize UI.

| YAML Path                                                 | Default Value | Description                                                                                                                                                                                                                                         |
| --------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| webhookAlerting.webhooks.$\{webhookName}.url              |               | The URL of the webhook.                                                                                                                                                                                                                             |
| webhookAlerting.webhooks.$\{webhookName}.headers          |               | A map of the headers of the request to be sent to the webhook.                                                                                                                                                                                      |
| webhookAlerting.webhooks.$\{webhookName}.httpMethod       |               | The HTTP Method of the request to be sent to the webhook.                                                                                                                                                                                           |
| webhookAlerting.webhooks.$\{webhookName}.defaultPayload   |               | The payload of the request to be sent to the webhook. This should include placeholder keys that allow you to define dynamic content. See [Alert Webhook Payload Placeholders](../webhooks#alert-webhook-payload-placeholders) for available values. |
| webhookAlerting.webhooks.$\{webhookName}.proxy.enabled    |               | Whether an HTTP proxy should be used for requests to the webhook URL.                                                                                                                                                                               |
| webhookAlerting.webhooks.$\{webhookName}.proxy.host       |               | The proxy host to use, must be set if webhookAlerting.webhooks.$\{webhookName}.proxy.enabled = true.                                                                                                                                                |
| webhookAlerting.webhooks.$\{webhookName}.proxy.port       |               | The proxy port to use, must be set if webhookAlerting.webhooks.$\{webhookName}.proxy.enabled = true.                                                                                                                                                |
| webhookAlerting.webhooks.$\{webhookName}.proxy.sslEnabled |               | Whether this proxy is using a secured connection (HTTPS). Must be set if webhookAlerting.webhooks.$\{webhookName}.proxy.enabled = true.                                                                                                             |

### History Cleanup Settings

Settings for automatic cleanup of historic process/decision instances based on their end time.

:::note
Two types of history cleanup are available for Camunda 8 users at this time - process data cleanup and external variable cleanup. For more information, see [History cleanup](/optimize/self-managed/optimize-deployment/configuration/history-cleanup.md).
:::

| YAML Path                                                                         | Default Value | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------------------------------------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| historyCleanup.cronTrigger                                                        | `'0 1 * * *'` | Cron expression to schedule when the cleanup should be executed, defaults to 01:00 A.M. As the cleanup can cause considerable load on the underlying Elasticsearch database it is recommended to schedule it outside of office hours. You can either use the default Cron (5 fields) or the Spring Cron (6 fields) expression format here.                                                                                                                                                                                                                                                                           |
| historyCleanup.ttl                                                                | 'P2Y'         | Global time to live (ttl) period for process/decision/event data. The relevant property differs between entities. For process data, it's the `endTime` of the process instance. For decision data, it's the `evaluationTime` and for ingested events it's the `time` field. The format of the string is ISO_8601 duration. The default value is 2 years. For details on the notation refer to: [https://en.wikipedia.org/wiki/ISO_8601#Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) Note: The time component of the ISO_8601 duration is not supported. Only years (Y), months (M) and days (D) are. |
| historyCleanup.processDataCleanup.enabled                                         | false         | A switch to activate the history cleanup of process data. \[true/false\]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| historyCleanup.processDataCleanup.cleanupMode                                     | 'all'         | Global type of the cleanup to perform for process instances, possible values: 'all' - delete everything related and including the process instance that passed the defined ttl 'variables' - only delete variables of a process instance Note: This doesn't affect the decision instance cleanup which always deletes the whole instance.                                                                                                                                                                                                                                                                            |
| historyCleanup.processDataCleanup.batchSize                                       | 10000         | Defines the batch size in which Camunda engine process instance data gets cleaned up. It may be reduced if requests fail due to request size constraints. In most cases, this should not be necessary and has only been experienced when connecting to an AWS Elasticsearch instance.                                                                                                                                                                                                                                                                                                                                |
| historyCleanup.processDataCleanup.perProcessDefinitionConfig                      |               | A list of process definition specific configuration parameters that will overwrite the global cleanup settings for the specific process definition identified by its $\{key}.                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| historyCleanup.processDataCleanup .perProcessDefinitionConfig.$\{key}.ttl         |               | Time to live to use for process instances of the process definition with the $\{key}.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| historyCleanup.processDataCleanup .perProcessDefinitionConfig.$\{key}.cleanupMode |               | Cleanup mode to use for process instances of the process definition with the $\{key}.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| historyCleanup.decisionDataCleanup.enabled                                        | false         | A switch to activate the history cleanup of decision data. \[true/false\]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| historyCleanup.decisionDataCleanup.perDecisionDefinitionConfig                    |               | A list of decision definition specific configuration parameters that will overwrite the global cleanup settings for the specific decision definition identified by its $\{key}.                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| historyCleanup.decisionDataCleanup .perDecisionDefinitionConfig.$\{key}.ttl       |               | Time to live to use for decision instances of the decision definition with the $\{key}.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| historyCleanup.ingestedEventCleanup.enabled                                       | false         | A switch to activate the history cleanup of ingested event data. \[true/false\]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

### Localization

Define the languages that can be used by Optimize.

| YAML Path                     | Default Value | Description                                                                                                                                                                            |
| ----------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| localization.availableLocales | ['en','de']   | All locales available in the Optimize Frontend. <br /><br />Note: for languages other than the default there must be a `<localeCode>.json` file available under ./config/localization. |
| localization.fallbackLocale   | 'en'          | The fallback locale used if there is a locale requested that is not available in availableLocales. The fallbackLocale is required to be present in localization.availableLocales.      |

### UI Configuration

Customize the Optimize UI e.g. by adjusting the logo, head background color etc.

| YAML Path       | Default Value | Description                                                                                                                                                              |
| --------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ui.logoutHidden | false         | Setting this property to true will hide the logout option from the user menu. This is useful if you are using single sign-on and it is not possible for users to logout. |

### External Variable Ingestion REST API Configuration

| YAML Path                                                        | Default Value | Description                                                                                                                                                                                                                                                                                                               |
| ---------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| externalVariable.import.enabled                                  | false         | Controls whether external ingested variable data is processed and imported to process instance data.                                                                                                                                                                                                                      |
| externalVariable.import.maxPageSize                              | 10000         | Determines the page size for the import of ingested external variable data to process instance data.                                                                                                                                                                                                                      |
| externalVariable.variableIndexRollover.maxIndexSizeGB            | 50            | Specifies the maximum size for the external variable index. When shards get too large, query performance can slow down and rolling over an index can bring an improvement. Using this configuration, a rollover will occur when the current external variable index size matches or exceeds the maxIndexSizeGB threshold. |
| externalVariable.variableIndexRollover.scheduleIntervalInMinutes | 10            | The interval in minutes at which to check whether the conditions for a rollover of the external variable index are met, triggering one if required. This value should be greater than 0.                                                                                                                                  |
| externalVariable.variableIngestion.maxBatchRequestBytes          | 10485760      | Content length limit for a variable ingestion REST API bulk request in bytes. Requests will be rejected when exceeding that limit. Defaults to 10MB. In case this limit is raised you should carefully tune the heap memory accordingly, see Adjust Optimize heap size on how to do that.                                 |
| externalVariable.variableIngestion.maxRequests                   | 5             | The maximum number of variable ingestion requests that can be serviced at any given time.                                                                                                                                                                                                                                 |

### Telemetry Configuration

<span class="badge badge--platform">Camunda 7 only</span>

Configuration of initial telemetry settings.

| YAML Path                     | Default Value | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| telemetry.initializeTelemetry | false         | Decides whether telemetry is initially enabled or disabled when Optimize starts. Thereafter, telemetry can be turned on and off in the UI by superusers. If enabled, information about the setup and usage of the Optimize is sent to remote Camunda servers for the sake of analytical evaluation. When enabled, the following information is sent every 24 hours: Optimize version, License Key, Optimize installation ID, Elasticsearch version. <br /><br />Legal note: Before you install Camunda Optimize version ≥ 3.2.0 or activate the telemetric functionality, please make sure that you are authorized to take this step, and that the installation or activation of the telemetric functionality is not in conflict with any internal company policies, compliance guidelines, any contractual or other provisions or obligations of your company. Camunda cannot be held responsible in the event of unauthorized installation or activation of this function. |

### Other

Settings of plugin subsystem serialization format, variable import, Camunda endpoint.

| YAML Path                                     | Default Value              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| plugin.directory                              | ./plugin                   | Defines the directory path in the local Optimize file system which should be checked for plugins.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| plugin.variableImport.basePackages            |                            | Look in the given base package list for variable import adaption plugins. If empty, the import is not influenced.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| plugin.authenticationExtractor.basePackages   |                            | Looks in the given base package list for authentication extractor plugins. If empty, the standard Optimize authentication mechanism is used.                                                                                                                                                                                                                                                                                                                                                                                                        |
| plugin.engineRestFilter.basePackages          |                            | Look in the given base package list for engine rest filter plugins. If empty, the REST calls are not influenced.                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| plugin.decisionInputImport.basePackages       |                            | Look in the given base package list for Decision input import adaption plugins. If empty, the import is not influenced.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| plugin.decisionOutputImport.basePackages      |                            | Look in the given base package list for Decision output import adaption plugins. If empty, the import is not influenced.                                                                                                                                                                                                                                                                                                                                                                                                                            |
| plugin.elasticsearchCustomHeader.basePackages |                            | Look in the given base package list for Elasticsearch custom header plugins. If empty, Elasticsearch requests are not influenced.                                                                                                                                                                                                                                                                                                                                                                                                                   |
| serialization.engineDateFormat                | yyyy-MM-dd'T'HH:mm:ss.SSSZ | Define a custom date format that should be used (should be the same as in the engine).                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| entity.authorizedEditors                      | 'all'                      | Define which users are authorized to Create, Edit, Copy and Delete Optimize entities outside of a collection. Available options: 'all', 'superuser', 'none'.                                                                                                                                                                                                                                                                                                                                                                                        |
| entity.kpiRefreshInterval                     | 600                        | Define the interval in which the kpi import scheduler should run in seconds                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| export.csv.authorizedUsers                    | 'all'                      | Define which users are authorized to download CSVs. Available options: 'all', 'superuser', 'none'.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| export.csv.limit                              | 1000                       | Maximum number of records returned by CSV export.<br /><br /> Note: Increasing this value comes at a memory cost for the Optimize application that varies based on the actual data. As a rough guideline, an export of a 50000 raw data report records containing 8 variables on each instance can cause temporary heap memory peaks of up to ~200MB with the actual CSV file having a size of ~20MB. Please adjust the heap memory accordingly, see [Adjust Optimize heap size](./getting-started.md#adjust-optimize-heap-size) on how to do that. |
| export.csv.delimiter                          | ,                          | The delimiter used for the CSV export. The value defaults to a comma, however other common CSV delimiters such as semicolons (";") and tabs ("\\t") can also be used.                                                                                                                                                                                                                                                                                                                                                                               |
| sharing.enabled                               | true                       | Enable/disable the possibility to share reports and dashboards.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
