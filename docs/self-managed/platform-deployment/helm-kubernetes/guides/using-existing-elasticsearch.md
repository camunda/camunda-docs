---
id: using-existing-elasticsearch
title: "Using existing Elasticsearch"
description: "Learn how to use an existing elasticsearch instance in Camunda 8 Self-Managed deployment."
---

Camunda 8 Self-Managed has two different types of components: Camunda components (Operate, Optimize, Tasklist, etc.) and non-Camunda, dependency components (such as Keycloak and Elasticsearch). For more details, review the [architecture](../../../platform-architecture/overview.md) documentation for more information on the different types of applications.

This guide steps through using an existing elasticsearch instance. By default, [Helm chart deployment](../deploy.md) creates a new elassticsearch instance, but it's possible to use an existing elasticsearch instance either inside the same Kubernetes cluster or outside of it.

## Preparation

### Connecting to self-managed Elasticsearch

The following information must be known to you relating to your self-managed Elasticsearch cluster:

1. Protocol, Host, Port
2. username and password

Both `http` and `https` connections are possible when connecting to self-managed Elasticsearch by modifying `global.elasticsearch.protocol`

If you are using self-signed certificates and are accepting only `https` requests in your Elasticsearch cluster then you must create a `.jks` file from your Elasticsearch certificate file using the `keystore` tool. Then you must create a kubernetes secret from the `.jks` file before installing Camunda. For example, this is how you would create the `.jks` file and kubernetes secret from your Elasticsearch certificate file:

```yaml
keytool -import -alias elasticsearch -keystore externaldb.jks -storetype jks -file <name of elasticsearch crt file> -storepass changeit -noprompt
kubectl  create secret -n <namespace> generic <secret name> --from-file=externaldb.jks
```

### Connecting to Elastic Cloud

Since Elastic Cloud does not use self-signed certificates, all you need is the following information:

1. Protocol, Host, Port
2. username and password

You do not need to create a secret including the `.jks` file before installing camunda like the previous section since Elastic Cloud uses a publicly trusted certificate.

## Values file

The only change required to use the existing Elasticsearch is configuring the following values in the Camunda 8 self-managed Helm chart:

### Connecting to self-managed Elasticsearch with self-signed certificates

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

If you do not wish to specify the username and password in plaintext within the values.yaml, you can use the following values instead:

```yaml
global:
  elasticsearch:
    auth:
      existingSecret: elastic-jks
      existingSecretKey: jksFile
```

### Connecting to managed Elasticsearch

This configuration should work with any managed Elasticsearch. We have specifically tested this configuration using Elastic on Google Cloud. You can use the same values provided above and not include the `global.elasticsearch.tls` section since the tls section is only needed to specify self-signed certificates.

## Next Steps

Then, use the custom values file to [deploy Camunda 8](../deploy.md) as usual.

```sh
helm install camunda camunda/camunda-platform -f existing-elasticsearch-values.yaml
```
