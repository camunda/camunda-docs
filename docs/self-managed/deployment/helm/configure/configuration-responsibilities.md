---
id: configuration-responsibilities
sidebar_label: Configuration responsibilities
title: Understand Helm and application configuration responsibilities
description: "Helm configures how and where a Camunda component runs and connects. The application configures what it does. extraConfiguration is the hook between them."
---

Helm configures how and where a Camunda component runs and connects. The application configures what it does. `<component>.extraConfiguration` is the hook between the two.

Neither layer is more authoritative than the other. They answer different questions, and knowing which question you're asking tells you where a setting belongs.

Starting with Camunda 8.10, chart values that existed only to proxy a single application property are deprecated in favor of `extraConfiguration`. The chart keeps the Kubernetes surface it's responsible for and stops mirroring the application's own configuration.

## Which layer owns a setting

Ask one question: does this control what the application **does**, or **how and where** it runs and connects?

| Layer                        | Controls                                                                                                                                          | Where to set it                  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| Application configuration    | Feature flags, toggles, log levels, security and authorization behavior, Spring Boot properties, and anything else that changes application logic | `<component>.extraConfiguration` |
| Kubernetes infrastructure    | Resource requests and limits, affinity and scheduling, service accounts, volumes, replica counts, deployment strategy                             | `values.yaml`                    |
| Connectivity and credentials | External endpoints, database URLs, secondary storage hosts, TLS certificates, secret references, Ingress and Gateway wiring                       | `values.yaml`                    |
| Cross-component coordination | Release role (`global.topology.mode`), the Hub cluster inventory, shared authentication identifiers                                               | `values.yaml`                    |

Application property names are the same whichever deployment method you use, so what you learn about `camunda.security.*` or `camunda.physical-tenants.*` transfers from Helm to Docker, to a JAR, or to ECS. Chart values don't transfer, which is why they're limited to the deployment layer.

## Deliver application configuration

Three forms are supported, and they behave differently. For the full mechanics, including per-component merge behavior and a worked migration from environment variables, see [configure component configuration](/self-managed/deployment/helm/configure/application-configs.md).

| Form                             | Behavior                                                                                                                  | Use when                                                             |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `<component>.extraConfiguration` | Each entry mounts as its own file and merges into the pod's Spring configuration alongside the chart's `application.yaml` | Almost always. This is the recommended path                          |
| `<component>.configuration`      | Replaces the entire default application configuration file                                                                | You intend to own the whole file, including the chart's defaults     |
| `<component>.env`                | Injects environment variables                                                                                             | A single value, or a value that must come from a secret at pod start |

:::warning
Helm merges maps deeply but replaces arrays wholesale. `extraConfiguration` is a list, so an overlay that sets it replaces every entry from a lower layer rather than adding to them. Keep all entries for a component in one place.
:::

## Example: configure Orchestration Cluster authorizations

`orchestration.security.authorizations.enabled` is an application setting. In chart 15.x it still works and logs a deprecation warning. Set the application property instead.

```yaml
# Deprecated in chart 15.x
orchestration:
  security:
    authorizations:
      enabled: true
```

```yaml
# Recommended
orchestration:
  extraConfiguration:
    - file: authorizations.yaml
      content: |
        camunda:
          security:
            authorizations:
              enabled: true
```

The same release still sets its connectivity and infrastructure in `values.yaml`, because those aren't application concerns:

```yaml
orchestration:
  resources:
    requests:
      cpu: "2"
      memory: 4Gi
  extraConfiguration:
    - file: authorizations.yaml
      content: |
        camunda:
          security:
            authorizations:
              enabled: true

global:
  identity:
    service:
      url: http://camunda-identity.hub.svc.cluster.local:80/identity
```

## Find the keys you still need to migrate

`helm install` and `helm upgrade` log a `[camunda][warning] DEPRECATION` message for every deprecated key you set to a non-default value. Each message names the key and where to configure it instead.

Treat that output as the authoritative list for your chart version. Camunda 8.10 is under active development and more keys may be deprecated across its release cycle, so any table in the documentation is a snapshot and the warnings are not.

```sh
helm upgrade camunda camunda/camunda-platform \
  --version "$HELM_CHART_VERSION" \
  --namespace camunda \
  -f values.yaml 2>&1 | grep 'DEPRECATION'
```

For the keys deprecated at the time of writing, and the tables mapping each one to its replacement, see [upgrade Camunda 8.9 to 8.10 using Helm](/self-managed/upgrade/helm/890-to-8100.md).
