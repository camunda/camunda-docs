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

## Secondary storage

Review the [secondary storage documentation](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#secondary-storage) and [secondary storage configuration](/self-managed/concepts/secondary-storage/configuring-secondary-storage.md).

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

:::danger
The `allow-non-self-assignment` flag applied only to the removed Tasklist V1 API.

In Camunda 8.10 and later, Tasklist uses only the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md), so this flag is not part of the current configuration model. Use [authorization-based access control](/components/concepts/access-control/authorizations.md#available-resources) to manage who can assign or update user tasks.
:::

## Tasklist API mode configuration

Starting with Camunda 8.10, Tasklist no longer supports switching between V1 and V2 modes.

Tasklist always uses the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md), and the legacy `CAMUNDA_TASKLIST_V2_MODE_ENABLED` / `camunda.tasklist.V2ModeEnabled` settings are no longer part of the current configuration model.

## Backups

See the [core settings documentation](/self-managed/components/orchestration-cluster/core-settings/concepts/backups.md).
