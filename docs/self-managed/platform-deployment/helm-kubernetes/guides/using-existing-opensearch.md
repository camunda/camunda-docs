---
id: using-aws-managed-opensearch
title: "Using AWS Managed Opensearch"
description: "Learn how to use an AWS managed opensearch instance in Camunda 8 Self-Managed deployment."
---

Camunda 8 Self-Managed has two different types of components: Camunda components (Operate, Optimize, Tasklist, etc.) and non-Camunda, dependency components (such as Keycloak and Elasticsearch). For more details, review the [architecture](../../../platform-architecture/overview.md) documentation for more information on the different types of applications.

This guide steps through using an existing AWS managed opensearch instance. By default, [Helm chart deployment](../deploy.md) creates a new elassticsearch instance, but it's possible to use AWS managed opensearch instead.

## Preparation

<!-- optimize cant be ran with init container on opensearch -->

### Authentication

There are two layers of permissions with opensearch. IAM and Opensearch internal. If you would like to connect to Opensearch using IAM roles for service accounts (IRSA) then please also refer to this [page](../platforms/amazon-eks/irsa.md)

Otherwise, if you wish to connect to AWS managed opensearch with basic auth the you can follow the example given below.

## Values file

The only change required to use AWS managed Opensearch is configuring the following values in the Camunda 8 Self-Managed Helm chart:

### Connecting to AWS managed opensearch with basic auth.

```yaml
global:
  elasticsearch:
    enabled: false
  opensearch:
    enabled: true
    auth:
      username: <username>
      password: <password>
    url:
      protocol: https
      host: <elasticsearch host>
      port: 443

elasticsearch:
  enabled: false
```

You must disable the internal elasticsearch component and the elasticsearch configuration for all components.

If you do not wish to specify the username and password in plaintext within the values.yaml, you can use the following values instead:

```yaml
global:
  elasticsearch:
    auth:
      existingSecret: <name of the already existing secret that includes the password>
      existingSecretKey: <key of the password value within the already existing secret>
```

## Next Steps

Then, use the custom values file to [deploy Camunda 8](../deploy.md) as usual.

```sh
helm install camunda camunda/camunda-platform -f existing-elasticsearch-values.yaml
```
