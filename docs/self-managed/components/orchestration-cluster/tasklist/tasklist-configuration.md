---
id: tasklist-configuration
description: "Configuration guide for Configuration with setup instructions and available customization options. This guide provides detailed information for your deployment."
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

See the [core settings documentation](/self-managed/components/orchestration-cluster/core-settings/configuration/logging.md).

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

## Tasklist UI mode configuration

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
