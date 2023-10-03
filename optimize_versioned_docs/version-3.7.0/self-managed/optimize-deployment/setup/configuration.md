---
id: configuration
title: "Configuration"
description: "An overview of all possible configuration options in Optimize."
---

<span class="badge badge--platform">Camunda Platform 7 only</span>

## Logging

Camunda Optimize provides logging facilities that are preconfigured to use
_INFO_ logging level which provides minimal output of information in log files.
This level can be adjusted using the `environment-logback.xml` configuration file.

Even though one could potentially configure logging levels for all packages, it
is recommended to set logging levels for the following three Optimize parts only using exact package
reference as follows:

* Optimize runtime environment:

```xml
<logger name="org.camunda.optimize" level="info" />
```

* Optimize update:

```xml
<logger name="org.camunda.optimize.update" level="info">
  <appender-ref ref="UPGRADE"/>
</logger>
```

* Communication to Elasticsearch:

```xml
<logger name="org.elasticsearch" level="warn" />
```

If you are running Optimize with Docker, you can use the following environment variables to configure its logging levels.

- `OPTIMIZE_LOG_LEVEL` sets the logging level for the Optimize log
- `UPGRADE_LOG_LEVEL` sets the logging level for the Optimize update log
- `ES_LOG_LEVEL` sets the logging level for Elasticsearch

Whether using the configuration file or Docker environment variables, to define the granularity of the information shown in the log you can set one of the following log levels:

- **error**: shows errors only.
- **warn**: like **error**, but displays warnings as well.
- **info**: logs everything from **warn** and the most important information about state changes or actions in Optimize.
- **debug**: in addition to **info**, writes information about the scheduling process, alerting as well as the import of the engine data.
- **trace**: like **debug**, but in addition, writes all requests sent to the Camunda engine as well as all queries towards Elasticsearch to the log output.

## System configuration

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

| YAML Path | Default Value | Description |
| - | - | - |
|  |
| security.auth.token.lifeMin | 60 | Optimize uses token-based authentication to keep track of which users are logged in. Define the lifetime of the token in minutes. |
| security.auth.token.secret | null | Optional secret used to sign authentication tokens, it's recommended to use at least a 64-character secret. If set to `null` a random secret will be generated with each startup of Optimize. |
| security.auth.superUserIds | [ ] | List of user IDs that are granted full permission to all collections, reports, and dashboards. <br /><br /> Note: For reports, these users are still required to be granted access to the corresponding process/decision definitions in Camunda Platform Admin. See [Authorization Management](./authorization-management.md). |
| security.auth.superGroupIds | [ ] | List of group IDs that are granted full permission to all collections, reports, and dashboards. All members of the groups specified will have superuser permissions in Optimize. <br /><br />Note: For reports, these groups are still required to be granted access to the corresponding process/decision definitions in Camunda Platform Admin. See [Authorization Management](./authorization-management.md). |
| security.responseHeaders.HSTS.max-age | 31536000 | HTTP Strict Transport Security (HSTS) is a web security policy mechanism which helps to protect websites against protocol downgrade attacks and cookie hijacking. This field defines the time, in seconds, that the browser should remember that this site is only to be accessed using HTTPS. If you set the number to a negative value no HSTS header is sent. |
| security.responseHeaders.HSTS.includeSubDomains | true | HTTP Strict Transport Security (HSTS) is a web security policy mechanism which helps to protect websites against protocol downgrade attacks and cookie hijacking. If this optional parameter is specified, this rule applies to all the site’s subdomains as well. |
| security.responseHeaders.X-XSS-Protection | 1; mode=block   | This header enables the cross-site scripting (XSS) filter in your browser. Can have one of the following options:<ul><li>   `0`: Filter disabled. </li><li>    `1`: Filter enabled. If a cross-site scripting attack is detected, in order to stop the attack, the browser will sanitize the page. </li><li>    `1; mode=block`: Filter enabled. Rather than sanitize the page, when a XSS attack is detected, the browser will prevent rendering of the page.</li><li>    `1; report=http://[YOURDOMAIN]/your_report_URI`: Filter enabled. The browser will sanitize the page and report the violation. This is a Chromium function utilizing CSP violation reports to send details to a URI of your choice.</li></ul> |
| security.responseHeaders.X-Content-Type-Options  | true            | Setting this header will prevent the browser from interpreting files as a different MIME type to what is specified in the Content-Type HTTP header (e.g. treating text/plain as text/css). |
| security.responseHeaders.Content-Security-Policy | base-uri 'self' | A Content Security Policy (CSP) has significant impact on the way browsers render pages. By default Optimize uses the base-uri directive which restricts the URLs that can be used to the Optimize pages. Find more details in [Mozilla's Content Security Policy Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy). |

### Public API

This section focuses on common properties related to the Public REST API of Optimize.

|YAML Path|Default Value|Description|
|--- |--- |--- |
|api.accessToken|null|Secret token to be provided to the secured REST API on access. If set to `null` an error will be thrown and requests will get rejected.<br /><br />It is mandatory to configure a value if the majority of Public REST API is to be used.|

### Container

Settings related to embedded Jetty container, which serves the Optimize application.

|YAML Path|Default Value|Description|
|--- |--- |--- |
|container.host|localhost|A host name or IP address to identify a specific network interface on which to listen.|
|container.ports.http|8090|A port number that will be used by Optimize to process HTTP connections. If set to null, or left empty, HTTP connections won't be accepted.|
|container.ports.https|8091|A port number that will be used by Optimize to process secure HTTPS connections.|
|container.keystore.location|keystore.jks|HTTPS requires an SSL Certificate. When you generate an SSL Certificate, you are creating a keystore file and a keystore password for use when the browser interface connects. This field specifies the location of this keystore file.|
|container.keystore.password|optimize|Password of keystore file.|
|container.status.connections.max|10|Maximum number of web socket connections accepted for status report.|
|container.accessUrl|null|Optional URL to access Optimize (used for links to Optimize in e.g. alert emails). If no value specified the container host and port are used instead.|

### Connection to Camunda Platform

Configuration for engines used to import data. Note that you have to have
at least one engine configured at all times. You can configure multiple engines
to import data from. Each engine configuration should have a unique alias associated
with it and represented by `${engineAlias}`.

Note that each connected engine must have its respective history level set to `FULL` in order to see all available data
in Optimize. Using any other history level will result in less data and/or functionality within Optimize. Furthermore,
history in a connected engine should be configured for long enough for Optimize to import it. If data is removed from an
engine before Optimize has imported it, that data will not be available in Optimize.

|YAML Path|Default Value|Description|
|--- |--- |--- |
|engines.${engineAlias}.name|default|The process engine's name on the platform, this is the unique engine identifier on the platforms REST API.|
|engines.${engineAlias}.defaultTenant.id|null|A default tenantID to associate all imported data with if there is no tenant configured in the engine itself. This property is only relevant in the context of a `One Process Engine Per Tenant` tenancy. For details consult the Multi-Tenancy documentation.|
|engines.${engineAlias}.defaultTenant.name|null|The name used for this default tenant when displayed in the UI.|
|engines.${engineAlias}.excludeTenant|[ ]|Comma-separated list of tenant IDs to be excluded when importing data from the specified engine. When left empty, data from all tenants will be imported. Please note that the `defaultTenant` cannot be excluded (and therefore also not the entities with `null` as tenant)|
|engines.${engineAlias}.rest|http://localhost:8080/engine-rest|A base URL that will be used for connections to the Camunda Engine REST API.|
|engines.${engineAlias}.importEnabled|true|Determines whether this instance of Optimize should import definition & historical data from this engine.|
|engines.${engineAlias}.eventImportEnabled|false|Determines whether this instance of Optimize should convert historical data to event data usable for event based processes.|
|engines.${engineAlias}.authentication.enabled|false|Toggles basic authentication on or off. When enabling basic authentication, please be aware that you also need to adjust the values of the user and password.|
|engines.${engineAlias}.authentication.user||When basic authentication is enabled, this user is used to authenticate against the engine.<br /><br /> Note: when enabled, it is required that the user has <ul><li>READ_HISTORY permission on the Process and Decision Definition resources</li> <li>READ permission on *all* ("*")Authorization, Group, User, Tenant, Deployment & User Operation Log resources</li></ul> to enable users to log in and Optimize to import the engine data.|
|engines.${engineAlias}.authentication.password||When basic authentication is enabled, this password is used to authenticate against the engine.|
|engines.${engineAlias}.webapps.endpoint|http://localhost:8080/camunda|Defines the endpoint where the Camunda webapps are found. This allows Optimize to directly link to the other Camunda Web Applications, e.g. to jump from Optimize directly to a dedicated process instance in Cockpit|
|engines.${engineAlias}.webapps.enabled|true|Enables/disables linking to other Camunda Web Applications|

### Engine common settings

Settings used by Optimize, which are common among all configured engines, such as
REST API endpoint locations, timeouts, etc.

| YAML Path                                                 | Default Value | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|-----------------------------------------------------------|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| engine-commons.connection.timeout                         | 0             | Maximum time in milliseconds without connection to the engine that Optimize should wait until a timeout is triggered. If set to zero, no timeout will be triggered.                                                                                                                                                                                                                                                                                                                                                       |
| engine-commons.read.timeout                               | 0             | Maximum time a request to the engine should last before a timeout triggers. A value of zero means to wait an infinite amount of time.                                                                                                                                                                                                                                                                                                                                                                                     |
| import.data.activity-instance.maxPageSize                 | 10000         | Determines the page size for historic activity instance fetching.                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| import.data.incident.maxPageSize                          | 10000         | Determines the page size for historic incident fetching.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| import.data.process-definition-xml.maxPageSize            | 2             | Determines the page size for process definition XML model fetching. Should be a low value, as large models will lead to memory or timeout problems.                                                                                                                                                                                                                                                                                                                                                                       |
| import.data.process-definition.maxPageSize                | 10000         | Determines the page size for process definition entities fetching.                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| import.data.process-instance.maxPageSize                  | 10000         | Determines the page size for historic decision instance fetching.                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| import.data.variable.maxPageSize                          | 10000         | Determines the page size for historic variable instance fetching.                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| import.data.variable.includeObjectVariableValue           | true          | Controls whether Optimize fetches the serialized value of object variables from the Camunda Runtime REST API. By default, this is active for backwards compatibility. If no variable plugin to handle object variables is installed, it can be turned off to reduce the overhead of the variable import. <br /><br />Note: Disabling the object variable value transmission is only effective with Camunda Platform 7.13.11+, 7.14.5+ and 7.15.0+.                                                                        |
| import.data.user-task-instance.maxPageSize                | 10000         | Determines the page size for historic User Task instance fetching.                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| import.data.identity-link-log.maxPageSize                 | 10000         | Determines the page size for historic identity link log fetching.                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| import.data.decision-definition-xml.maxPageSize           | 2             | Determines the page size for decision definition xml model fetching. Should be a low value, as large models will lead to memory or timeout problems.                                                                                                                                                                                                                                                                                                                                                                      |
| import.data.decision-definition.maxPageSize               | 10000         | Determines the page size for decision definition entities fetching.                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| import.data.decision-instance.maxPageSize                 | 10000         | Overwrites the maximum page size for historic decision instance fetching.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| import.data.tenant.maxPageSize                            | 10000         | Overwrites the maximum page size for tenant fetching.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| import.data.group.maxPageSize                             | 10000         | Overwrites the maximum page size for groups fetching.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| import.data.authorization.maxPageSize                     | 10000         | Overwrites the maximum page size for authorizations fetching.                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| import.data.dmn.enabled                                   | true          | Determines if the DMN/decision data, such as decision definitions and instances, should be imported.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| import.data.user-task-worker.enabled                      | true          | Determines if the User Task worker data, such as assignee or candidate group of a User Task, should be imported.                                                                                                                                                                                                                                                                                                                                                                                                          |
| import.data.user-task-worker.metadata.includeUserMetaData | true          | Determines whether Optimize imports and displays assignee user metadata, otherwise only the user id is shown.                                                                                                                                                                                                                                                                                                                                                                                                             |
| import.data.user-task-worker.metadata.cronTrigger         | `0 */3 * * *` | Cron expression for when to fully refresh the internal metadata cache, it defaults to every third hour. Otherwise deleted assignees/candidateGroups or metadata changes are not reflected in Optimize. You can either use the default Cron (5 fields) or the Spring Cron (6 fields) expression format here. For details on the format please refer to: Cron Expression Description Spring Cron Expression Documentation                                                                                                   |
| import.data.user-task-worker.metadata.maxPageSize         | 10000         | The max page size when multiple users or groups are iterated during the metadata refresh.                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| import.data.user-task-worker.metadata.maxEntryLimit       | 100000        | The entry limit of the cache that holds the metadata, if you need more entries you can increase that limit. When increasing the limit, keep in mind to account for that by increasing the JVM heap memory as well. Please refer to the "Adjust Optimize heap size" documentation.                                                                                                                                                                                                                                         |
| import.skipDataAfterNestedDocLimitReached                 | false         | Some data can no longer be imported to a given document if its number of nested documents has reached the configured limit. Enable this setting to skip this data during import if the nested document limit has been reached.                                                                                                                                                                                                                                                                                            |
| import.elasticsearchJobExecutorThreadCount                | 1             | Number of threads being used to process the import jobs per data type that are writing data to elasticsearch.                                                                                                                                                                                                                                                                                                                                                                                                             |
| import.elasticsearchJobExecutorQueueSize                  | 5             | Adjust the queue size of the import jobs per data type that store data to elasticsearch. If the value is too large it might cause memory problems.                                                                                                                                                                                                                                                                                                                                                                        |
| import.handler.backoff.interval                           | 5000          | Interval in milliseconds which is used for the backoff time calculation.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| import.handler.backoff.max                                | 15            | Once all pages are consumed, the import scheduler component will start scheduling fetching tasks in increasing periods of time, controlled by "backoff" counter.                                                                                                                                                                                                                                                                                                                                                          |
| import.handler.backoff.isEnabled                          | true          | Tells if the backoff is enabled of not.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| import.indexType                                          | import-index  | The name of the import index type.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| import.importIndexStorageIntervalInSec                    | 10            | States how often the import index should be stored to Elasticsearch.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| import.currentTimeBackoffMilliseconds                     | 300000        | This is the time interval the import backs off from the current tip of the time during the ongoing import cycle. This ensures that potentially missed concurrent writes in the engine are reread going back by the amount of this time interval.                                                                                                                                                                                                                                                                          |
| import.identitySync.includeUserMetaData                   | true          | Whether to include metaData (firstName, lastName, email) when synchronizing users. If disabled only user IDs will be shown on user search and in collection permissions.                                                                                                                                                                                                                                                                                                                                                  |
| import.identitySync.collectionRoleCleanupEnabled          | false         | Whether collection role cleanup should be performed. If enabled, users that no longer exist in the identity provider will be automatically removed from collection permissions.                                                                                                                                                                                                                                                                                                                                           |
| import.identitySync.cronTrigger                           | `0 */2 * * *` | Cron expression for when the identity sync should run, defaults to every second hour. You can either use the default Cron (5 fields) or the Spring Cron (6 fields) expression format here.<br /><br /> For details on the format please refer to: <ul><li>[Cron Expression Description](https://en.wikipedia.org/wiki/Cron)</li><li> [Spring Cron Expression Documentation](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/scheduling/support/CronSequenceGenerator.html)</li></ul> |
| import.identitySync.maxPageSize                           | 10000         | The max page size when multiple users or groups are iterated during the import.                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| import.identitySync.maxEntryLimit                         | 100000        | The entry limit of the user/group search cache. When increasing the limit, keep in mind to account for this by increasing the JVM heap memory as well. Please refer to the "Adjust Optimize heap size" documentation on how to configure the heap size.                                                                                                                                                                                                                                                                   |

### Elasticsearch

Settings related to Elasticsearch.

#### Connection settings

Everything that is related to building the connection to Elasticsearch.

Please note that you can define a number of connection points
in a cluster. Therefore, everything that is under `es.connection.nodes` is a list of nodes Optimize can connect to.
If you have built an Elasticsearch cluster with several nodes it is recommended to define several connection points so that
if one node fails, Optimize is still able to talk to the cluster.

|YAML Path|Default Value|Description|
|--- |--- |--- |
|es.connection.timeout|10000|Maximum time without connection to Elasticsearch that Optimize should wait until a timeout triggers.|
|es.connection.responseConsumerBufferLimitInMb|100|Maximum size of the Elasticsearch response consumer heap buffer. This can be increased to resolve errors from Elasticsearch relating to the entity content being too long|
|es.connection.nodes[*].host|localhost|The address/hostname under which the Elasticsearch node is available.|
|es.connection.nodes[*].httpPort|9200|A port number used by Elasticsearch to accept HTTP connections.|
|es.connection.proxy.enabled|false|Whether an HTTP proxy should be used for requests to Elasticsearch.|
|es.connection.proxy.host|null|The proxy host to use, must be set if es.connection.proxy.enabled = true.|
|es.connection.proxy.port|null|The proxy port to use, must be set if es.connection.proxy.enabled = true.|
|es.connection.proxy.sslEnabled|false|Whether this proxy is using a secured connection (HTTPS).|


#### Index settings

|YAML Path|Default Value|Description|
|--- |--- |--- |
|es.settings.index.prefix|optimize|The prefix prepended to all Optimize index and alias names. Custom values allow to operate multiple isolated Optimize instances on one Elasticsearch cluster. <br /><br />NOTE: Changing this after Optimize was already run before will create new empty indexes.|
|es.settings.index.number_of_replicas|1|How often data should be replicated to handle node failures.|
|es.settings.index.number_of_shards|1|How many shards should be used in the cluster for process instance and decision instance indices. All other indices will be made up of a single shard. <br /><br />Note: this property only applies the first time Optimize is started and the schema/mapping is deployed on Elasticsearch. If you want this property to take effect again, you need to delete all indices (and with that all data) and restart Optimize.|
|es.settings.index.refresh_interval|2s|How long Elasticsearch waits until the documents are available for search. A positive value defines the duration in seconds. A value of -1 means that a refresh needs to be done manually.|
|es.settings.index.nested_documents_limit|10000|Optimize uses nested documents to store list information such as activities or variables belonging to a process instance. This setting defines the maximum number of activities/variables/incidents that a single process instance can contain. This limit helps to prevent out of memory errors and should be used with care. For more information, please refer to the Elasticsearch documentation on this topic.|


#### Elasticsearch Security

Define a secured connection to be able to communicate with a secured Elasticsearch instance.

|YAML Path|Default Value|Description|
|--- |--- |--- |
|es.security.username||The basic authentication (x-pack) username.|
|es.security.password||The basic authentication (x-pack) password.|
|es.security.ssl.enabled|false|Used to enable or disable TLS/SSL for the HTTP connection.|
|es.security.ssl.certificate||The path to a PEM encoded file containing the certificate (or certificate chain) that will be presented to clients when they connect.|
|es.security.ssl.certificate_authorities|[ ]|A list of paths to PEM encoded CA certificate files that should be trusted, e.g. ['/path/to/ca.crt']. <br /><br />Note: if you are using a public CA that is already trusted by the Java runtime, you do not need to set the certificate_authorities.|

### Email

Settings for the email server to send email notifications, e.g. when an alert is triggered.

|YAML Path|Default Value|Description|
|--- |--- |--- |
|email.enabled|false|A switch to enable the email sending functionality.|
|email.address||Email address that can be used to send notifications.|
|email.hostname||The smtp server name.|
|email.port|587|The smtp server port. This one is also used as SSL port for the security connection.|
|email.authentication.enabled||A switch to enable email server authentication.|
|email.authentication.username||Username of your smtp server.|
|email.authentication.password||Corresponding password to the given user of your smtp server.|
|email.authentication.securityProtocol||States how the connection to the server should be secured. Possible values are 'NONE', 'STARTTLS' or 'SSL/TLS'.|

### Alert Notification Webhooks

Settings for webhooks which can receive custom alert notifications. You can configure multiple webhooks which will be available to select from when creating or editing alerts. Each webhook configuration should have a unique human readable name which will appear in the Optimize UI.

|YAML Path|Default Value|Description|
|--- |--- |--- |
|webhookAlerting.webhooks.${webhookName}.url||The URL of the webhook.|
|webhookAlerting.webhooks.${webhookName}.headers||A map of the headers of the request to be sent to the webhook.|
|webhookAlerting.webhooks.${webhookName}.httpMethod||The HTTP Method of the request to be sent to the webhook.|
|webhookAlerting.webhooks.${webhookName}.defaultPayload||The payload of the request to be sent to the webhook. This should include placeholder keys that allow you to define dynamic content. See [Alert Webhook Payload Placeholders](../webhooks#alert-webhook-payload-placeholders) for available values.|
|webhookAlerting.webhooks.${webhookName}.proxy.enabled||Whether an HTTP proxy should be used for requests to the webhook URL.|
|webhookAlerting.webhooks.${webhookName}.proxy.host||The proxy host to use, must be set if webhookAlerting.webhooks.${webhookName}.proxy.enabled = true.|
|webhookAlerting.webhooks.${webhookName}.proxy.port||The proxy port to use, must be set if webhookAlerting.webhooks.${webhookName}.proxy.enabled = true.|
|webhookAlerting.webhooks.${webhookName}.proxy.sslEnabled||Whether this proxy is using a secured connection (HTTPS). Must be set if webhookAlerting.webhooks.${webhookName}.proxy.enabled = true.|

### History Cleanup Settings

Settings for automatic cleanup of historic process/decision instances based on their end time.

| YAML Path | Default Value | Description |
| --- | --- | --- |
| historyCleanup.cronTrigger | `'0 1 * * *'` | Cron expression to schedule when the cleanup should be executed, defaults to 01:00 A.M. As the cleanup can cause considerable load on the underlying Elasticsearch database it is recommended to schedule it outside of office hours. You can either use the default Cron (5 fields) or the Spring Cron (6 fields) expression format here.  For details on the format please refer to: [Cron Expression Description](https://en.wikipedia.org/wiki/Cron) or [Spring Cron Expression Documentation](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/scheduling/support/CronSequenceGenerator.html) |
| historyCleanup.ttl | 'P2Y' | Global time to live (ttl) period for process/decision/event data. The relevant property differs between entities. For process data, it's the `endTime` of the process instance. For decision data, it's the `evaluationTime` and for ingested events it's the `time` field. The format of the string is ISO_8601 duration. The default value is 2 years.  For details on the notation refer to: [https://en.wikipedia.org/wiki/ISO_8601#Durations](https://en.wikipedia.org/wiki/ISO_8601#Durations) Note: The time component of the ISO_8601 duration is not supported. Only years (Y), months (M) and days (D) are. |
| historyCleanup.processDataCleanup.enabled | false | A switch to activate the history cleanup of process data. \[true/false\] |
| historyCleanup.processDataCleanup.cleanupMode | 'all' | Global type of the cleanup to perform for process instances, possible values:  'all' - delete everything related and including the process instance that passed the defined ttl  'variables' - only delete variables of a process instance  Note: This doesn't affect the decision instance cleanup which always deletes the whole instance. |
| historyCleanup.processDataCleanup.batchSize | 10000 | Defines the batch size in which Camunda engine process instance data gets cleaned up. It may be reduced if requests fail due to request size constraints. In most cases, this should not be necessary and has only been experienced when connecting to an AWS Elasticsearch instance. |
| historyCleanup.processDataCleanup.perProcessDefinitionConfig |     | A list of process definition specific configuration parameters that will overwrite the global cleanup settings for the specific process definition identified by its ${key}. |
| historyCleanup.processDataCleanup  .perProcessDefinitionConfig.${key}.ttl |     | Time to live to use for process instances of the process definition with the ${key}. |
| historyCleanup.processDataCleanup  .perProcessDefinitionConfig.${key}.cleanupMode |     | Cleanup mode to use for process instances of the process definition with the ${key}. |
| historyCleanup.decisionDataCleanup.enabled | false | A switch to activate the history cleanup of decision data. \[true/false\] |
| historyCleanup.decisionDataCleanup.perDecisionDefinitionConfig |     | A list of decision definition specific configuration parameters that will overwrite the global cleanup settings for the specific decision definition identified by its ${key}. |
| historyCleanup.decisionDataCleanup  .perDecisionDefinitionConfig.${key}.ttl |     | Time to live to use for decision instances of the decision definition with the ${key}. |
| historyCleanup.ingestedEventCleanup.enabled | false | A switch to activate the history cleanup of ingested event data. \[true/false\] |

### Localization

Define the languages that can be used by Optimize.

|YAML Path|Default Value|Description|
|--- |--- |--- |
|localization.availableLocales|['en','de']|All locales available in the Optimize Frontend. <br /><br />Note: for languages other than the default there must be a `<localeCode>.json` file available under ./config/localization.|
|localization.fallbackLocale|'en'|The fallback locale used if there is a locale requested that is not available in availableLocales. The fallbackLocale is required to be present in localization.availableLocales.|

### UI Configuration

Customize the Optimize UI e.g. by adjusting the logo, head background color etc.

|YAML Path|Default Value|Description|
|--- |--- |--- |
|ui.header.textColor|'dark'|Determines the color theme of the text in the header. Currently 'dark' and 'light' are supported.|
|ui.header.pathToLogoIcon|'logo/camunda_icon.svg'|Path to the logo that is displayed in the header of Optimize. Path can be: relative: starting from the config folder you can provide a relative path. absolute: full path in the file system. Supported image formats can be found here.|
|ui.header.backgroundColor|'#FFFFFF'|A hex encoded color that should be used as background color for the header. Default color is white.|
|ui.logoutHidden|false|Setting this property to true will hide the logout option from the user menu. This is useful if you are using single sign-on and it is not possible for users to logout.|

### Event Based Process Configuration

Configuration of the Optimize event based process feature.

|YAML Path|Default Value|Description|
|--- |--- |--- |
|eventBasedProcess.authorizedUserIds|[ ]|A list of userIds that are authorized to manage (Create, Update, Publish & Delete) event based processes.|
|eventBasedProcess.authorizedGroupIds|[ ]|A list of groupIds that are authorized to manage (Create, Update, Publish & Delete) event based processes.|
|eventBasedProcess.eventImport.enabled|false|Determines whether this Optimize instance performs event based process instance import.|
|eventBasedProcess.eventImport.maxPageSize|5000|The batch size of events being correlated to process instances of event based processes.|
|eventBasedProcess.eventIndexRollover.scheduleIntervalInMinutes|10|The interval in minutes at which to check whether the conditions for a rollover of eligible indices are met, triggering one if required. This value should be greater than 0.|
|eventBasedProcess.eventIndexRollover.maxIndexSizeGB|50|Specifies the maximum total index size for events (excluding replicas). When shards get too large, query performance can slow down and rolling over an index can bring an improvement. Using this configuration, a rollover will occur when triggered and the current event index size matches or exceeds the maxIndexSizeGB threshold.|

### Event Ingestion REST API Configuration

Configuration of the Optimize [Event Ingestion REST API](../../rest-api/event-ingestion) for [Event Based Processes](../../../components/userguide/additional-features/event-based-processes.md).

|YAML Path|Default Value|Description|
|--- |--- |--- |
|eventBasedProcess.eventIngestion.maxBatchRequestBytes|10485760|Content length limit for an ingestion REST API bulk request in bytes. Requests will be rejected when exceeding that limit. Defaults to 10MB. In case this limit is raised you should carefully tune the heap memory accordingly, see Adjust Optimize heap size on how to do that.|
|eventBasedProcess.eventIngestion.maxRequests|5|The maximum number of event ingestion requests that can be serviced at any given time.|

### External Variable Ingestion REST API Configuration

|YAML Path|Default Value|Description|
|--- |--- |--- |
|externalVariable.import.enabled|false|Controls whether external ingested variable data is processed and imported to process instance data.|
|externalVariable.import.maxPageSize|10000|Determines the page size for the import of ingested external variable data to process instance data.|
|externalVariable.variableIndexRollover.maxIndexSizeGB|50|Specifies the maximum size for the external variable index. When shards get too large, query performance can slow down and rolling over an index can bring an improvement. Using this configuration, a rollover will occur when the current external variable index size matches or exceeds the maxIndexSizeGB threshold.|
|externalVariable.variableIndexRollover.scheduleIntervalInMinutes|10|The interval in minutes at which to check whether the conditions for a rollover of the external variable index are met, triggering one if required. This value should be greater than 0.|
|externalVariable.variableIngestion.maxBatchRequestBytes|10485760|Content length limit for a variable ingestion REST API bulk request in bytes. Requests will be rejected when exceeding that limit. Defaults to 10MB. In case this limit is raised you should carefully tune the heap memory accordingly, see Adjust Optimize heap size on how to do that.|
|externalVariable.variableIngestion.maxRequests|5|The maximum number of variable ingestion requests that can be serviced at any given time.|


### Telemetry Configuration

Configuration of initial telemetry settings.

|YAML Path|Default Value|Description|
|--- |--- |--- |
|telemetry.initializeTelemetry|false|Decides whether telemetry is initially enabled or disabled when Optimize starts. Thereafter, telemetry can be turned on and off in the UI by superusers. If enabled, information about the setup and usage of the Optimize is sent to remote Camunda servers for the sake of analytical evaluation. When enabled, the following information is sent every 24 hours: Optimize version, License Key, Optimize installation ID, Elasticsearch version. <br /><br />Legal note: Before you install Camunda Optimize version >= 3.2.0 or activate the telemetric functionality, please make sure that you are authorized to take this step, and that the installation or activation of the telemetric functionality is not in conflict with any internal company policies, compliance guidelines, any contractual or other provisions or obligations of your company. Camunda cannot be held responsible in the event of unauthorized installation or activation of this function.|

### Other

Settings of plugin subsystem serialization format, variable import, Camunda endpoint.

| YAML Path | Default Value | Description |
| --- | --- | --- |
| plugin.directory | ./plugin | Defines the directory path in the local Optimize file system which should be checked for plugins. |
| plugin.variableImport.basePackages |     | Look in the given base package list for variable import adaption plugins. If empty, the import is not influenced. |
| plugin.authenticationExtractor.basePackages |     | Looks in the given base package list for authentication extractor plugins. If empty, the standard Optimize authentication mechanism is used. |
| plugin.engineRestFilter.basePackages |     | Look in the given base package list for engine rest filter plugins. If empty, the REST calls are not influenced. |
| plugin.decisionInputImport.basePackages |     | Look in the given base package list for Decision input import adaption plugins. If empty, the import is not influenced. |
| plugin.decisionOutputImport.basePackages |     | Look in the given base package list for Decision output import adaption plugins. If empty, the import is not influenced. |
| plugin.elasticsearchCustomHeader.basePackages |     | Look in the given base package list for Elasticsearch custom header plugins. If empty, Elasticsearch requests are not influenced. |
| serialization.engineDateFormat | yyyy-MM-dd'T'HH:mm:ss.SSSZ | Define a custom date format that should be used (should be the same as in the engine). |
| export.csv.limit | 1000 | Maximum number of records returned by CSV export.<br /><br /> Note: Increasing this value comes at a memory cost for the Optimize application that varies based on the actual data. As a rough guideline, an export of a 50000 raw data report records containing 8 variables on each instance can cause temporary heap memory peaks of up to ~200MB with the actual CSV file having a size of ~20MB. Please adjust the heap memory accordingly, see [Adjust Optimize heap size](../installation/#adjust-optimize-heap-size) on how to do that. |
| export.csv.delimiter | ,   | The delimiter used for the CSV export. The value defaults to a comma, however other common CSV delimiters such as semicolons (";") and tabs ("\\t") can also be used. |
| sharing.enabled | true | Enable/disable the possibility to share reports and dashboards. |