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

Review the [core settings documentation](/self-managed/components/orchestration-cluster/core-settings/concepts/elasticsearch-and-opensearch.md).

## Zeebe Broker connection

Tasklist needs a connection to the Zeebe Broker to start the import.

### Settings to connect

| Name                                   | Description                                                                                                         | Default value         |
| :------------------------------------- | :------------------------------------------------------------------------------------------------------------------ | :-------------------- |
| camunda.tasklist.zeebe.gatewayAddress  | Gateway address that points to Zeebe as hostname and port.                                                          | localhost:26500       |
| camunda.tasklist.zeebe.secure          | Connection should be secure via Transport Layer Security (TLS).                                                     | false                 |
| camunda.tasklist.zeebe.certificatePath | Path to certificate used by Zeebe. This is necessary when the certificate isn't registered in the operating system. | -                     |
| camunda.tasklist.zeebe.restAddress     | Path to Zeebe REST address. This is necessary to consume the Zeebe API from Tasklist.                               | http://localhost:8083 |

Additionally, visit [Zeebe Secure Client Communication](/self-managed/components/orchestration-cluster/zeebe/security/secure-client-communication.md) for more details.

### Snippet from application.yml

```yaml
camunda.tasklist:
  zeebe:
    # Gateway host and port
    gatewayAddress: localhost:26500
```

### Intra-cluster secure connection

You can enable intra-cluster TLS secured connections between Tasklist and Zeebe by applying the following configuration properties.

| Name                                                | Description                                                                                                         | Example value                     |
| :-------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ | :-------------------------------- |
| zeebe.gateway.cluster.initialContactPoints          | Zeebe Gateway initial contact points.                                                                               | [gateway-0:26502,gateway-1:26502] |
| zeebe.gateway.cluster.security.enabled              | Connection should be secure via Transport Layer Security (TLS).                                                     | true                              |
| zeebe.gateway.cluster.security.certificateChainPath | Path to certificate used by Zeebe. This is necessary when the certificate isn't registered in the operating system. | /path/to/cert.pem                 |
| zeebe.gateway.cluster.security.privateKeyPath       | Path to certificate's key used by Zeebe.                                                                            | /path/to/private.key              |
| zeebe.gateway.cluster.advertisedHost                | Advertised hostname in the cluster.                                                                                 | tasklist                          |
| zeebe.gateway.cluster.memberId                      | Member ID for the cluster.                                                                                          | tasklist                          |

For extended configuration and guidelines, refer to [secure cluster communication](../zeebe/security/secure-cluster-communication.md) and [gateway configuration](../zeebe/configuration/gateway.md).

## Zeebe Elasticsearch or OpenSearch exporter

:::note
Refer to [supported environments](../../../../reference/supported-environments.md#camunda-8-self-managed) to find out which versions of Elasticsearch or OpenSearch are supported in a Camunda 8 Self-Managed setup.
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

## Monitoring and health probes

Tasklist includes the [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-features.html#production-ready) inside, which
provides the number of monitoring possibilities (e.g. health check (http://localhost:9600/actuator/health) and metrics (http://localhost:9600/actuator/prometheus) endpoints).

Tasklist uses the following Actuator configuration by default:

```yaml
# disable default health indicators:
# https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-features.html#production-ready-health-indicators
management.health.defaults.enabled: false

# enable Kubernetes health groups:
# https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-features.html#production-ready-kubernetes-probes
management.endpoint.health.probes.enabled: true

# enable health check and metrics endpoints
management.endpoints.web.exposure.include: health, prometheus, loggers, usage-metrics, backups
```

With this configuration, the following endpoints are available for use out of the box:

`<server>:9600/actuator/prometheus` Prometheus metrics

`<server>:9600/actuator/health/liveness` Liveness probe

`<server>:9600/actuator/health/readiness` Readiness probe

### Example snippets to use Tasklist probes in Kubernetes

For details to set Kubernetes probes parameters, see [Kubernetes configure probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes).

#### Readiness probe as yaml config

```yaml
readinessProbe:
  httpGet:
    path: /actuator/health/readiness
    port: 9600
  initialDelaySeconds: 30
  periodSeconds: 30
```

#### Liveness probe as yaml config

```yaml
livenessProbe:
  httpGet:
    path: /actuator/health/liveness
    port: 9600
  initialDelaySeconds: 30
  periodSeconds: 30
```

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

## Backups

You must configure the following on your chosen database:

- [Elasticsearch snapshot repository](https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshot-restore.html)
- [OpenSearch snapshot repository](https://docs.opensearch.org/docs/latest/tuning-your-cluster/availability-and-recovery/snapshots/snapshot-restore/)

Tasklist is configured with the snapshot repository name to trigger database snapshots. This is important for coherent backups.

:::info
Learn more about the procedure and the need to trigger it through Camunda components in the [backup guide](/self-managed/operational-guides/backup-restore/backup-and-restore.md).
:::

Tasklist must be configured with the repository name:

| Name                                   | Description                      | Default value |
| -------------------------------------- | -------------------------------- | ------------- |
| camunda.tasklist.backup.repositoryName | ES / OS snapshot repository name | -             |

:::warning breaking change
Configuring Operate and Tasklist with different repository names will potentially create multiple backups in different repositories. Therefore, use the same `repositoryName` for both components.
:::
