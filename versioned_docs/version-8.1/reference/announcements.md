---
id: announcements
title: "Announcements"
description: "Important announcements including deprecation & removal notices"
---

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

## Deprecated in 1.3

The `zeebe-test` module was deprecated in 1.3.0. We are currently planning to remove `zeebe-test` for the 1.4.0 release.

## Removed in 1.0

The support for YAML processes was removed as of release 1.0. The `resourceType` in Deployment record and Process grpc request are deprecated; they will always contain `BPMN` as value.

## Deprecated in 0.26.0

### YAML workflows descriptions

YAML workflows are an alternative way to specify simple workflows using a proprietary YAML description. This feature is deprecated and no longer advertised in the documentation. YAML workflows gained little traction with users and we do not intend to support them in the future.

We recommend all users of YAML workflows to migrate to BPMN workflows as soon as possible. The feature will eventually be removed completely, though the date when this will occur has yet to be defined.

## Deprecated in 0.23.0-alpha2

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
