---
id: using-existing-elasticsearch
title: "Using existing Elasticsearch"
description: "Learn how to use an existing elasticsearch instance in Camunda 8 Self-Managed deployment."
---

Camunda 8 Self-Managed has two different types of components: Camunda components (Operate, Optimize, Tasklist, etc.) and non-Camunda, dependency components (such as Keycloak and Elasticsearch). For more details, review the [architecture](../../../platform-architecture/overview.md) documentation for more information on the different types of applications.

This guide steps through using an existing elasticsearch instance. By default, [Helm chart deployment](../deploy.md) creates a new elassticsearch instance, but it's possible to use an existing elasticsearch instance either inside the same Kubernetes cluster or outside of it.

## Preparation

### Connecting to self managed elasticsearch

<!-- You must be aware of the username and password needed to connect to your Elasticsearch cluster. -->
<!-- You must be aware of the hostname of the elasticsearch cluster. -->

You must be aware of the following information relating to your self managed elasticsearch cluster:

1. protocol, host, port
2. username and password

Both `http` and `https` connections are possible when connecting to self managed elasticsearch by modifying `global.elasticsearch.protocol`

If you are using self signed certificates and are accepting only `https` requests in your elasticsearch cluster then you must create a `.jks` file from your elasticsearch certificate file using the `keystore` tool. Then you must create a kubernetes secret from the `.jks` file before installing Camunda. For example, this is how you would create the `.jks` file and kubernetes secret from your elasticsearch certificate file:

```yaml
keytool -import -alias elasticsearch -keystore externaldb.jks -storetype jks -file <name of elasticsearch crt file> -storepass changeit -noprompt
kubectl  create secret -n <namespace> generic <secret name> --from-file=externaldb.jks
```

### Connecting to es-cloud

Since es-cloud does not use self signed certificates, all you need is the following information:

1. protocol, host, port
2. username and password

You do not need to create a secret including the `.jks` file before installing camunda like the previous section.

## Values file

The only change required to use the existing elasticsearch is configuring the following values in the Camunda 8 Self-Managed Helm chart:

### Connecting to self managed elasticsearch with self signed certificates

```yaml
global:
  elasticsearch:
    enabled: true
    external: true
    tls:
      enabled: true
      existingSecret: <secret name that includes the .jks file>
    auth:
      username: <username>
      password: <password>
      existingSecret:
      existingSecretKey:
    url:
      protocol: https
      host: <elasticsearch host>
      port: 443

elasticsearch:
  enabled: false
```

If you do not wish to specify the username and password in plaintext within the values.yaml, you can use the following values instead:

```yaml
global:
  elasticsearch:
    auth:
      existingSecret: <name of the already existing secret that includes the password>
      existingSecretKey: <key of the password value within the already existing secret>
```

### Connecting to es-cloud

You can use the same values provided above and not include the `global.elasticsearch.tls` section since the tls section is only needed to specify self signed certificates.

## Next Steps

Then, use the custom values file to [deploy Camunda 8](../deploy.md) as usual.

```sh
helm install camunda camunda/camunda-platform -f existing-elasticsearch-values.yaml
```
