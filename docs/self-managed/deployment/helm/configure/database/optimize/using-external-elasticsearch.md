---
id: using-external-elasticsearch
sidebar_label: External Elasticsearch
title: Use external Elasticsearch for Optimize with Helm
description: Configure Optimize in Camunda 8 Self-Managed to use an external Elasticsearch instance when deploying with Helm.
---

Configure Optimize in Camunda 8 Self-Managed to connect to an external Elasticsearch instance when deploying with Helm.

This page applies to Optimize only. If the Orchestration Cluster also uses Elasticsearch as secondary storage, configure that separately using [use external Elasticsearch for Orchestration Cluster with Helm](/self-managed/deployment/helm/configure/database/elasticsearch/using-external-elasticsearch.md).

Optimize supports Elasticsearch only through Elasticsearch or OpenSearch backends. It does not support RDBMS.

## Prerequisites

Before configuring, collect the following information about your external Elasticsearch instance:

- URL to access the cluster (protocol, host, and port)
- Authentication requirements and credentials (if needed)
- TLS requirements:
  - Whether the certificate is publicly trusted
  - Whether you need to provide a custom or self-signed certificate

## Configuration

### Parameters

Use the following Helm values for Optimize's Elasticsearch connection:

- `optimize.database.elasticsearch.enabled` (boolean, default `false`): Enable Elasticsearch for Optimize.
- `optimize.database.elasticsearch.external` (boolean, default `false`): Set to `true` to connect to an external Elasticsearch instance.
- `optimize.database.elasticsearch.auth.username` (string, default `""`): Username for external Elasticsearch authentication.
- `optimize.database.elasticsearch.auth.secret.inlineSecret` (string, default `""`): Elasticsearch password as a plain-text value for non-production environments only.
- `optimize.database.elasticsearch.auth.secret.existingSecret` (string, default `""`): Reference to an existing Kubernetes Secret containing the password.
- `optimize.database.elasticsearch.auth.secret.existingSecretKey` (string, default `""`): Key within the existing Kubernetes Secret containing the password.
- `optimize.database.elasticsearch.prefix` (string, default `zeebe-record`): Index prefix for `zeebe-record` indices. See [Configure Elasticsearch and OpenSearch index prefixes](/self-managed/deployment/helm/configure/database/elasticsearch/configure-elasticsearch-prefix-indices.md).
- `optimize.database.elasticsearch.tls.enabled` (boolean, default `false`): Enable TLS when connecting to Elasticsearch.
- `optimize.database.elasticsearch.tls.secret.existingSecret` (string, default `""`): Name of the Kubernetes Secret containing a TLS certificate.
- `optimize.database.elasticsearch.tls.secret.existingSecretKey` (string, default `externaldb.jks`): Key within the secret containing the TLS certificate.
- `optimize.database.elasticsearch.url.protocol` (string, default `""`): Protocol to use when connecting to Elasticsearch. Possible values are `http` and `https`.
- `optimize.database.elasticsearch.url.host` (string, default `""`): Hostname or IP address of the Elasticsearch instance.
- `optimize.database.elasticsearch.url.port` (integer, default `0`): Port number of the Elasticsearch instance.

### Example usage

#### Connect Optimize to external Elasticsearch without a certificate

```yaml
optimize:
  enabled: true
  database:
    elasticsearch:
      enabled: true
      external: true
      auth:
        username: elastic
        secret:
          inlineSecret: pass
      url:
        protocol: http
        host: elastic.example.com
        port: 443

elasticsearch:
  enabled: false
```

#### Connect Optimize to external Elasticsearch with a self-signed certificate

If the Elasticsearch cluster accepts only `https` requests with a self-signed certificate:

1. Create an `externaldb.jks` file from the Elasticsearch certificate file. For example, using the `keytool` CLI:

   ```yaml
   keytool -import -alias elasticsearch -keystore externaldb.jks -storetype jks -file elastic.crt -storepass changeit -noprompt
   ```

1. Create a Kubernetes secret from the `externaldb.jks` file before installing Camunda:

   ```yaml
   kubectl create secret -n camunda generic elastic-jks --from-file=externaldb.jks
   ```

1. Configure Optimize:

   ```yaml
   optimize:
     enabled: true
     database:
       elasticsearch:
         enabled: true
         external: true
         tls:
           enabled: true
           secret:
             existingSecret: elastic-jks
         auth:
           username: elastic
           secret:
             inlineSecret: pass
         url:
           protocol: https
           host: elastic.example.com
           port: 443

   elasticsearch:
     enabled: false
   ```

#### Connect Optimize to external Elasticsearch with a publicly trusted certificate

```yaml
optimize:
  enabled: true
  database:
    elasticsearch:
      enabled: true
      external: true
      auth:
        username: elastic
        secret:
          inlineSecret: pass
      url:
        protocol: https
        host: elastic.example.com
        port: 443

elasticsearch:
  enabled: false
```

## Related tasks

- [Configure Elasticsearch and OpenSearch index prefixes](/self-managed/deployment/helm/configure/database/elasticsearch/configure-elasticsearch-prefix-indices.md)
- [Configure custom HTTP headers for database clients](/self-managed/deployment/helm/configure/database/configure-db-custom-headers.md)
- [Use external Elasticsearch for Orchestration Cluster with Helm](/self-managed/deployment/helm/configure/database/elasticsearch/using-external-elasticsearch.md)
