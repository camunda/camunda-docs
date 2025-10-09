---
id: tasklist-configuration
title: Configuration
---

As a Spring Boot application, Tasklist supports any standard
[Spring configuration](https://docs.spring.io/spring-boot/reference/features/external-config.html) method.

By default, the configuration for Tasklist is stored in a YAML file `application.yml`. All Tasklist-related settings are prefixed with `camunda.tasklist`.

:::note
Configuration properties can be defined as environment variables using [Spring Boot conventions](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties.relaxed-binding.environment-variables). To define an environment variable, convert the configuration property to uppercase, remove any dashes, and replace any delimiters (`.`) with `_`.

For example, the property `server.servlet.context-path` is represented by the environment variable `SERVER_SERVLET_CONTEXT_PATH`.
:::

The following components are configurable:

## Licensing

See the [core settings documentation](/self-managed/components/orchestration-cluster/core-settings/configuration/licensing.md).

## Webserver

See the [core settings documentation](/self-managed/components/orchestration-cluster/core-settings/configuration/webserver.md).

## Elasticsearch or OpenSearch

Review the [core settings documentation](/self-managed/components/orchestration-cluster/core-settings/concepts/elasticsearch-and-opensearch.md) and [secondary storage documentation](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#secondary-storage).

## Zeebe Elasticsearch or OpenSearch importer

:::note
Version 8.8: The importer is required only for migration scenarios (upgrades from 8.7). Keep it enabled until all remaining 8.7 records have been imported. After that, the [Camunda Exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter.md) takes over and writes directly to the Tasklist indices. The importer can then be safely disabled for subsequent restarts or deployments.

:::

For Elasticsearch, Tasklist imports data from Elasticsearch indices created and filled in by [Zeebe Elasticsearch Exporter](https://github.com/camunda/camunda/tree/main/zeebe/exporters/elasticsearch-exporter). <br/>For OpenSearch, Tasklist imports data from indices created and filled in by the [Zeebe OpenSearch exporter](../zeebe/exporters/opensearch-exporter.md).

Therefore, settings for this Elasticsearch or OpenSearch connection must be defined and must correspond to the settings on the Zeebe side.

:::note
Version 8.8: The importer is required only for migration scenarios (upgrades from 8.7). Keep it enabled until all remaining 8.7 records have been imported. After that, the [Camunda Exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter.md) takes over and writes directly to the Tasklist indices. The importer can then be safely disabled for subsequent restarts or deployments.

:::

For Elasticsearch, Tasklist imports data from Elasticsearch indices created and filled in by [Zeebe Elasticsearch Exporter](https://github.com/camunda/camunda/tree/main/zeebe/exporters/elasticsearch-exporter). <br/>For OpenSearch, Tasklist imports data from indices created and filled in by the [Zeebe OpenSearch exporter](../zeebe/exporters/opensearch-exporter.md).

Therefore, settings for this Elasticsearch or OpenSearch connection must be defined and must correspond to the settings on the Zeebe side.

### Settings to connect and import

See also [settings to connect to a secured Elasticsearch or OpenSearch instance](#settings-to-connect-to-a-secured-elasticsearch-or-opensearch-instance).

| Name                                                    | Description                                                 | Default value         |
| :------------------------------------------------------ | :---------------------------------------------------------- | :-------------------- |
| camunda.tasklist.zeebeElasticsearch.clusterName         | Cluster name of Elasticsearch.                              | elasticsearch         |
| camunda.tasklist.zeebeElasticsearch.url                 | URL of Elasticsearch REST API.                              | http://localhost:9200 |
| camunda.tasklist.zeebeElasticsearch.prefix              | Index prefix as configured in Zeebe Elasticsearch exporter. | zeebe-record          |
| camunda.tasklist.zeebeElasticsearch.username            | Username to access Elasticsearch REST API.                  | -                     |
| camunda.tasklist.zeebeElasticsearch.password            | Password to access Elasticsearch REST API.                  | -                     |
| camunda.tasklist.zeebeElasticsearch.ssl.certificatePath | Path to certificate used by Elasticsearch.                  | -                     |
| camunda.tasklist.zeebeElasticsearch.ssl.selfSigned      | Certificate was self-signed.                                | false                 |
| camunda.tasklist.zeebeElasticsearch.ssl.verifyHostname  | Should the hostname be validated.                           | false                 |

### Snippet from application.yml

```yaml
camunda.tasklist:
  zeebeElasticsearch:
    # Cluster name
    clusterName: elasticsearch
    # Url
    url: https://localhost:9200
    # Index prefix, configured in Zeebe Elasticsearch exporter
    prefix: zeebe-record
```

## Intra-cluster secure connection

You can enable intra-cluster TLS-secured connections between Tasklist and Zeebe by applying the following configuration properties:

| Name                                                  | Description                                                                                                  | Example value                       |
| :---------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- | :---------------------------------- |
| `zeebe.gateway.cluster.initialContactPoints`          | Zeebe Gateway initial contact points.                                                                        | `[gateway-0:26502,gateway-1:26502]` |
| `zeebe.gateway.cluster.security.enabled`              | Enables secure connections via Transport Layer Security (TLS).                                               | `true`                              |
| `zeebe.gateway.cluster.security.certificateChainPath` | Path to the certificate used by Zeebe. Required if the certificate isn't registered in the operating system. | `/path/to/cert.pem`                 |
| `zeebe.gateway.cluster.security.privateKeyPath`       | Path to the certificate's private key used by Zeebe.                                                         | `/path/to/private.key`              |
| `zeebe.gateway.cluster.advertisedHost`                | Advertised hostname in the cluster.                                                                          | `tasklist`                          |
| `zeebe.gateway.cluster.memberId`                      | Member ID for the cluster.                                                                                   | `tasklist`                          |

For extended configuration and guidelines, refer to [Secure cluster communication](../zeebe/security/secure-cluster-communication.md) and [Gateway configuration](../zeebe/configuration/gateway.md).

## Monitoring and health probes

See the [core settings documentation](/self-managed/components/orchestration-cluster/core-settings/concepts/monitoring.md).

## Logging

See the [core settings documentation](/self-managed/components/orchestration-cluster/core-settings/configuration/webserver.md).

## Clustering

### Distributed user sessions

If more than one Camunda Tasklist instance is accessible by users for a failover scenario, for example, persistent sessions must be configured for all instances. This enables distributed sessions among all instances and users do not lose their session when being routed to another instance.

| Name                                         | Description                                                | Default value |
| :------------------------------------------- | :--------------------------------------------------------- | :------------ |
| camunda.tasklist.persistent.sessions.enabled | Enables the persistence of user sessions in Elasticsearch. | false         |

## Cross-site request forgery protection

Cross-site request forgery (CSRF) is an attack that forces an end user to execute unwanted actions on a web application in which they are currently authenticated. To mitigate this risk, Camunda provides CSRF protection that can be enabled in the Tasklist web application.

### Enabling CSRF protection

CSRF protection is enabled by default on Camunda Self-Managed. To explicitly define this, set the configuration variable `camunda.tasklist.csrfPreventionEnabled` to `true`. This is the recommended setting for production environments to enhance security.

```yaml
camunda:
  tasklist:
    csrfPreventionEnabled: true
```

When CSRF protection is enabled, the Tasklist web application requires a valid `X-CSRF-Token` header to be present in all state-changing HTTP requests (POST, PUT, DELETE, etc.)

### Disabling CSRF protection

To disable CSRF protection, set the configuration property `camunda.tasklist.csrfPreventionEnabled` to `false`. This setting is not recommended for production environments as it may expose the application to CSRF attacks.

```yaml
camunda:
  tasklist:
    csrfPreventionEnabled: false
```

## Allow non-self assignment

:::info
The `allow-non-self-assignment` flag controls the behavior of the deprecated [Tasklist API](/apis-tools/tasklist-api-rest/specifications/assign-task.api.mdx).
It has no implication on the [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/tutorial.md). Please refer to [access control](/components/concepts/access-control/authorizations.md#available-resources) to manage what operations can be performed by a given user or application.
:::

:::danger
This disables an intentional security mechanism and should only be used in development environments with no Identity installed.
:::

To allow users to assign other users to tasks, set the configuration property `camunda.tasklist.feature-flag.allow-non-self-assignment` to `true`.

```yaml
camunda:
  tasklist:
    feature-flag:
      allow-non-self-assignment: true
```

## Tasklist API mode configuration

Starting with Camunda 8.8, Tasklist can operate in two modes: V1 (legacy) and V2 (recommended). The V2 mode uses the [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) and is enabled by default.

:::warning Deprecation notice
Tasklist V1 mode is deprecated and will be removed in Camunda 8.10. We recommend migrating to V2 mode for all new projects and planning migration for existing applications.
:::

### Configuration

You can configure the Tasklist mode using either environment variables or YAML configuration:

**Environment variable:**

```bash
CAMUNDA_TASKLIST_V2_MODE_ENABLED=false
```

**YAML configuration:**

```yaml
camunda:
  tasklist:
    V2ModeEnabled: false
```

| Name                           | Description                                                                                                                     | Default value |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------ | :------------ |
| camunda.tasklist.V2ModeEnabled | Enables Tasklist V2 mode using the Orchestration Cluster API. Set to `false` to use the legacy V1 mode during migration period. | true          |

### When to use V1 mode

Use V1 mode only during the migration period if your application relies on features that are not available in V2:

- User task access restrictions
- Draft variables
- Public start forms
- Advanced process filtering by name

:::tip
For a complete comparison of features and migration guidance, see [Tasklist API versions](/components/tasklist/api-versions.md).
:::

## Backups

See the [core settings documentation](/self-managed/components/orchestration-cluster/core-settings/concepts/backups.md).
