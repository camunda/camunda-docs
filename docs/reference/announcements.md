---
id: announcements
title: "Announcements"
description: "Important announcements including deprecation & removal notices"
---

## Camunda Platform 8.3

Release date: 10th of October 2023

End of maintenance: 9th of April 2025

:::caution Breaking change

### Zeebe Docker image now runs with unprivileged user by default

The default user in the Zeebe Docker image changed from root to an unprivileged user with the UID 1000. This was done to provide stronger compliance with the [OWASP recommendations on Docker Security](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html#rule-2-set-a-user).

Please refer to the [Update 8.2 to 8.3](/self-managed/operational-guides/update-guide/820-to-830.md) guide.
:::

## Camunda Platform 8.2

Release date: 11th of April 2023

End of maintenance: 8th of October 2024

[Release notes](https://github.com/camunda/camunda-platform/releases/tag/8.2.0)
[Release blog](https://camunda.com/blog/2023/04/camunda-platform-8-2-key-to-scaling-automation/)

### Do not update from Camunda Platform 8.1.X to 8.2.6

An issue in the Operate 8.2.6 patch was discovered after it was published on June 8th.

You should not update directly from 8.1.x to 8.2.6 (it will require manual intervention as indices break), you either first update to 8.2.5 then 8.2.6 or straight from 8.1.x to 8.2.7.

To prevent this entirely we removed the Operate 8.2.6 artifacts from this release.

As Camunda Platform 8.2.7 was already released on Tuesday Jun 13th, you can just update to 8.2.7 directly, skipping 8.2.6.

### OpenSearch 1.3.x support

- Operate version 8.2+ support OpenSearch 1.3.x. However, 8.2.x patches will only be released on the OS 1.3 branch until end of 2023 given that OS 1.3 maintenance period ends by then. We recommend customers to go to 8.3.x which supports OS 2.5+.

## Camunda Platform 8.1

Release date: 11th of October 2022

End of maintenance: 10th of April 2024

[Release notes](https://github.com/camunda/camunda-platform/releases/tag/8.1.0)
[Release blog](https://camunda.com/blog/2022/10/camunda-platform-8-1-released-whats-new/)

## Camunda Platform 8.0

Release date: 12th of April 2022

End of maintenance: 11th of October 2023

[Release notes](https://github.com/camunda/camunda-platform/releases/tag/8.0.0)
[Release blog](https://camunda.com/blog/2022/04/camunda-platform-8-0-released-whats-new/)

### Camunda Platform 8.0.15 release is skipped

The `Camunda Platform 8.0.15` release pipeline lead to corrupted `Zeebe 8.0.15` artifacts getting published.
The whole [Camunda Platform 8.0.15 release](https://github.com/camunda/camunda-platform/releases/tag/8.0.15) was thus skipped and updates from `Camunda Platform 8.0.14` should go straight to `Camunda Platform 8.0.16`.

## Deprecated in 8.0

The [DeployProcess RPC](/apis-tools/grpc.md#deployprocess-rpc) was deprecated in 8.0.
It is replaced by the [DeployResource RPC](/apis-tools/grpc.md#deployresource-rpc).

### Camunda Cloud 1.3

Release date: 11th of January 2022

Camunda Cloud is out of maintenance.

#### Deprecated in 1.3

The `zeebe-test` module was deprecated in 1.3.0. We are currently planning to remove `zeebe-test` for the 1.4.0 release.

### Camunda Cloud 1.2

Release date: 12th of October 2021

Camunda Cloud is out of maintenance.

### Camunda Cloud 1.1

Release date: 13th of July 2021

Camunda Cloud is out of maintenance.

### Camunda Cloud 1.0

Release date: 11th of May 2021

Camunda Cloud is out of maintenance.

#### Removed in 1.0

The support for YAML processes was removed as of release 1.0. The `resourceType` in Deployment record and Process grpc request are deprecated; they will always contain `BPMN` as value.

### Zeebe 0.26.0

#### Deprecated in 0.26.0

##### YAML workflows descriptions

YAML workflows are an alternative way to specify simple workflows using a proprietary YAML description. This feature is deprecated and no longer advertised in the documentation. YAML workflows gained little traction with users and we do not intend to support them in the future.

We recommend all users of YAML workflows to migrate to BPMN workflows as soon as possible. The feature will eventually be removed completely, though the date when this will occur has yet to be defined.

### Zeebe 0.23.0-alpha2

#### Deprecated in 0.23.0-alpha2

- TOML configuration - deprecated and removed in 0.23.0-alpha2
- Legacy environment variables - deprecated in 0.23.0-alpha2, removed in 0.25.0

New configuration:

```yaml
exporters:
  elasticsearch:
    className: io.camunda.zeebe.exporter.ElasticsearchExporter
  debughttp:
    className: io.camunda.zeebe.broker.exporter.debug.DebugHttpExporter
```

In terms of specifying values, there were two minor changes:

- Memory sizes are now specified like this: `512MB` (old way: `512M`)
- Durations (e.g. timeouts) can now also be given in ISO-8601 Durations format. However, you can still use the established method and specify a timeout of `30s`
