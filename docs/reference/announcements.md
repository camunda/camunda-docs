---
id: announcements
title: "Announcements"
---

This section includes supported environments & technology for components of Camunda Cloud. This also includes deprecated features.

## Supported environments


### Zeebe

- **Zeebe Broker/Gateway** - the cluster components of Zeebe require OpenJDK 11+
  and optional if the Elasticsearch exporter is used Elasticsearch 6.8.x
- **Zeebe Java Client** - the Java client for Zeebe requires OpenJDK 8+
- **Zeebe Go Client** - the Go client for Zeebe requires Go 1.13+
- **zbctl** - the Zeebe CLI supports latest versions of Windows, MacOS and Linux

### Camunda Operate

- **Operate Web App/Importer/Archiver** - the server components of Camunda
  Operate require OpenJDK 11+ and Elasticsearch 6.8.x
- **Operate Browser App** - requires the latest version of Chrome, Firefox or
  Edge on Windows, MacOS and Linux



## Deprecated in 0.26.0

### YAML workflows descriptions

YAML workflows are an alternative way to specify simple workflows using a proprietary YAML description. This feature is deprecated and no longer advertised in the documentation. YAML workflows gained little traction with users and we do not intend to support them in the future.

We recommend all users of YAML workflows to migrate to BPMN workflows as soon as possible. The feature will be removed completely at some point. The date when this happens has yet to be defined.

## Deprecated in 0.23.0-alpha2

- TOML configuration - deprecated and removed in 0.23.0-alpha2
- Legacy environment variables - deprecated in 0.23.0-alpha2, removed in 0.25.0

New configuration:

```yaml
exporters:
  elasticsearch:
    className: io.zeebe.exporter.ElasticsearchExporter
  debughttp:
    className: io.zeebe.broker.exporter.debug.DebugHttpExporter
```

In terms of specifying values, there were two minor changes:

- Memory sizes are now specified like this: `512MB` (old way: `512M`)
- Durations, e.g. timeouts, can now also be given in ISO-8601 Durations format. However you can still use the established way and specify a timeout of `30s`

## Removed in 1.0

The support for yaml processes was removed as of release 1.0. The `resourceType` in Deployment record and Process grpc request are deprecated, they will always contain `BPMN` as value.
