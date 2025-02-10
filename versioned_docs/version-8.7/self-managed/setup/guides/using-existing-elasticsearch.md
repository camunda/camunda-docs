---
id: using-existing-elasticsearch
title: "Using existing Elasticsearch"
description: "Learn how to use an existing Elasticsearch instance in Camunda 8 Self-Managed Helm chart deployment."
---

By default, the [Helm chart deployment](/self-managed/setup/install.md) creates a new Elasticsearch instance, but it's possible to use an existing Elasticsearch instance either inside the same Kubernetes cluster or outside of it. This guide steps through using an existing Elasticsearch instance.

## Connecting to existing Elasticsearch without a certificate

By default, `global.elasticsearch.url.protocol` is set to `http`. This makes it possible to connect to Elasticsearch through `http`.

The following information must be known relating to the Self-Managed Elasticsearch cluster:

- Protocol, host, port
- Username and password

The Camunda 8 Self-Managed Helm chart can then be configured as follows:

```yaml
global:
  elasticsearch:
    enabled: true
    external: true
    auth:
      username: elastic
      password: pass
    url:
      protocol: http
      host: elastic.example.com
      port: 443

elasticsearch:
  enabled: false
```

## Connecting to existing Elasticsearch with a self-signed certificate

If a self-signed certificate is used and only `https` requests are accepted in the Elasticsearch cluster, then the following steps can be applied:

1. Create an `externaldb.jks` file from your Elasticsearch certificate file. Here is an example of that, using the `keytool` CLI:

```yaml
keytool -import -alias elasticsearch -keystore externaldb.jks -storetype jks -file elastic.crt -storepass changeit -noprompt
```

2. Create a Kubernetes secret from the `externaldb.jks` file before installing Camunda. This is how you can create the secret:

```yaml
kubectl  create secret -n camunda generic elastic-jks --from-file=externaldb.jks
```

The Camunda 8 Self-Managed Helm chart can then be configured as follows:

```yaml
global:
  elasticsearch:
    enabled: true
    external: true
    tls:
      enabled: true
      existingSecret: elastic-jks
    auth:
      username: elastic
      password: pass
    url:
      protocol: https
      host: elastic.example.com
      port: 443

elasticsearch:
  enabled: false
```

## Connecting to existing Elasticsearch with a publicly trusted certificate

This configuration should work with any managed Elasticsearch. We have specifically tested this configuration using Elastic Cloud on Google Cloud.

The following information must be known relating to the Elasticsearch cluster:

- Protocol, host, port
- Username and password

The Camunda 8 Self-Managed Helm chart can then be configured as follows:

```yaml
global:
  elasticsearch:
    enabled: true
    external: true
    auth:
      username: elastic
      password: pass
    url:
      protocol: https
      host: elastic.example.com
      port: 443

elasticsearch:
  enabled: false
```

## Next steps

Use the custom values file to [deploy Camunda 8](/self-managed/setup/overview.md) as usual:

```sh
helm install camunda camunda/camunda-platform -f existing-elasticsearch-values.yaml
```
