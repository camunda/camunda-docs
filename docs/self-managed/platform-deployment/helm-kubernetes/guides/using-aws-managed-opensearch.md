---
id: using-aws-managed-opensearch
title: "Using AWS Managed OpenSearch"
description: "Learn how to use an AWS managed OpenSearch instance in Camunda 8 Self-Managed deployment."
---

Camunda 8 Self-Managed has two different types of components: Camunda components (Operate, Optimize, Tasklist, etc.) and non-Camunda, dependency components (such as Keycloak and Elasticsearch). For more details, review the [architecture](../../../platform-architecture/overview.md) documentation for more information on the different types of applications.

This guide steps through using an existing AWS managed OpenSearch instance. By default, [Helm chart deployment](../deploy.md) creates a new elassticsearch instance, but it's possible to use AWS managed OpenSearch instead.

## Preparation

<!-- optimize cant be ran with init container on OpenSearch -->

### Authentication

There are two layers of permissions with OpenSearch. AWS IAM and OpenSearch internal. If you would like to connect to OpenSearch using AWS IAM roles for service accounts (IRSA) then please also refer to the [IAM roles for service accounts](../platforms/amazon-eks/irsa.md#OpenSearch) page.

Otherwise, if it is intended to connect to AWS managed OpenSearch with basic auth then the example below can be followed:

## Values file

The following values can be configured in the Camunda 8 Self-Managed Helm chart in order to use AWS managed OpenSearch:

### Connecting to AWS managed OpenSearch with basic auth.

```yaml
global:
  elasticsearch:
    enabled: false
  opensearch:
    enabled: true
    auth:
      username: user
      password: pass
    url:
      protocol: https
      host: opensearch.example.com
      port: 443

elasticsearch:
  enabled: false
```

From the above configuration, the internal elasticsearch component and the elasticsearch configuration for all components are disabled. This is required in order to use AWS managed OpenSearch.

If you do not wish to specify the username and password in plaintext within the values.yaml, then the following configuration can be used:

```yaml
global:
  opensearcn:
    auth:
      existingSecret: secretName
      existingSecretKey: secretKey
```

## Next Steps

Then, use the custom values file to [deploy Camunda 8](../deploy.md) as usual.

```sh
helm install camunda camunda/camunda-platform -f existing-elasticsearch-values.yaml
```
