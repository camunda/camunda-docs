---
id: using-existing-elasticsearch
sidebar_label: Existing Elasticsearch
title: Helm chart existing Elasticsearch usage
description: "Learn how to use an existing Elasticsearch instance in Camunda 8 Self-Managed Helm chart deployment."
---

By default, the [Helm chart deployment](/self-managed/installation-methods/helm/install.md) creates a new Elasticsearch instance, but it's possible to use an existing Elasticsearch instance either inside the same Kubernetes cluster or outside of it.

Managing elasticsearch installations externally (without enabling the elasticsearch subchart) is recommended for production deployments because it allows for more flexibility when it comes to scaling, backups, and upgrades of elasticsearch without affecting the rest of the camunda installation.

This guide steps through using an existing Elasticsearch instance.

### Prerequisites

At a minimum, before configuring this, you should know the following about your existing Elasticsearch instance:

1. The url to access the cluster
2. Will you need authentication, and if so, what are the credentials?
3. Will the TLS be publicly verified or will you need to provide a certificate?

### Configuration

#### Parameters

| values.yaml option                                  | type    | default                             | description                                                                               |
| --------------------------------------------------- | ------- | ----------------------------------- | ----------------------------------------------------------------------------------------- |
| `global.elasticsearch.enabled`                      | boolean | `true`                              | Enable or disable all components connecting to elasticsearch                              |
| `global.elasticsearch.external.true`                | boolean | `false`                             | Set to `true` to connect to an existing Elasticsearch instance.                           |
| `global.elasticsearch.auth.username`                | string  | `""`                                | HTTP Basic username for Elasticsearch authentication.                                     |
| `global.elasticsearch.auth.password`                | string  | `""`                                | HTTP Basic password for Elasticsearch authentication.                                     |
| `global.elasticsearch.tls.enabled`                  | boolean | `false`                             | Does Elasticsearch listen on TLS                                                          |
| `global.elasticsearch.tls.secret.inlineSecret`      | string  | `""`                                | TLS certificate specified directly in values.yaml                                         |
| `global.elasticsearch.tls.secret.existingSecret`    | string  | `""`                                | K8S Secret name with a TLS certificate inside                                             |
| `global.elasticsearch.tls.secret.existingSecretKey` | string  | `""`                                | K8S Secret key with the TLS certificate                                                   |
| `global.elasticsearch.url.protocol`                 | string  | `http`                              | Protocol to use when connecting to Elasticsearch. Possible values are `http` and `https`. |
| `global.elasticsearch.url.host`                     | string  | `{{ .Release.Name }}-elasticsearch` | Hostname or IP address of the Elasticsearch instance.                                     |
| `global.elasticsearch.url.port`                     | integer | `9200`                              | Port number of the Elasticsearch instance.                                                |
| `elasticsearch.enabled`                             | boolean | `true`                              | Enable or disable the elasticsearch subchart                                              |

#### Example usage

##### Connecting to existing Elasticsearch without a certificate

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
      secret:
        inlineSecret: pass
    url:
      protocol: http
      host: elastic.example.com
      port: 443

elasticsearch:
  enabled: false
```

##### Connecting to existing Elasticsearch with a self-signed certificate

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
      secret:
        inlineSecret: pass
    url:
      protocol: https
      host: elastic.example.com
      port: 443

elasticsearch:
  enabled: false
```

##### Connecting to existing Elasticsearch with a publicly trusted certificate

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
      secret:
        inlineSecret: pass
    url:
      protocol: https
      host: elastic.example.com
      port: 443

elasticsearch:
  enabled: false
```

### Troubleshooting

Look out for the following errors in the zeebe pods:

1. The host is unreachable or DNS is not properly resolving to an IP address listening on the specified port.

```
Caused by: java.net.UnknownHostException: elastic.example.com
```

### References

Production guide https://docs.camunda.io/docs/self-managed/operational-guides/production-guide/helm-chart-production-guide/ (8.8 version doesn't exist yet.)

### Next steps

Use the custom values file to [deploy Camunda 8](/self-managed/setup/overview.md) as usual:

```sh
helm install camunda camunda/camunda-platform --version $HELM_CHART_VERSION -f existing-elasticsearch-values.yaml
```
