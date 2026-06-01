---
id: orchestration-cluster-api-rest-deployment-configuration
title: "Deployment configuration"
description: "Learn how to configure upload limits and multipart handling for Orchestration Cluster REST API."
---

## Deployment configuration

The Orchestration Cluster REST API supports file and multipart uploads when deploying BPMN diagrams and other resources. By default, the maximum allowed request size is 4MB. You can increase this limit in Self-Managed cluster through configuration of the Zeebe Gateway, Broker, and the REST layer (e.g. Spring Boot + Tomcat).

This guide walks you through adjusting these settings.

### Gateway and Broker configuration

The `maxMessageSize` default value is 4MB. You can configure this setting in the:

- [Gateway config](../orchestration-cluster/zeebe/configuration/gateway.md#zeebegatewaynetwork)
- [Broker config](/self-managed/components/orchestration-cluster/zeebe/configuration/broker.md#zeebebrokernetwork)

If you deploy with Helm, set `global.config.requestBodySize`. The chart applies this value to
the Zeebe message size and the REST multipart file and request size. If you expose the REST API
through ingress, keep
`global.ingress.annotations.nginx.ingress.kubernetes.io/proxy-body-size` aligned with the same size.

This setting aligns the HTTP, multipart, Gateway, and Broker transport limits. Deployments can still
be rejected by Zeebe's internal record batch processing if the deployed resources and follow-up records
exceed the engine batch limit.

If you increase this value, you must also adjust the configuration for the deployment REST endpoint to match.

### REST API server configuration

If you're using the REST API and submitting files via multipart upload (e.g., using `POST /v2/deployments`), make sure your application is configured to accept the updated request sizes. If you increase the `maxMessageSize` to 10MB, increase these property values to 10MB as well.

For Spring Boot applications:

```properties
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
```

### Tomcat multipart settings

Tomcat, which underlies many Java web applications, also applies multipart limits. If you're uploading multiple files as part of a multipart request, note that Tomcat limits the number of parts per request using the `server.tomcat.max-part-count` property. By default, this is set to 50 in the orchestration API. You can increase the limit to allow more files by setting the property in your configuration:

```properties
server.tomcat.max-part-count=100
```

or using an environment variable:

```properties
SERVER_TOMCAT_MAX_PART_COUNT=100
```

The default is `50` in the orchestration API layer.

#### Max parameter count

Tomcat also enforces a separate limit on the total number of request parameters via the `server.tomcat.max-parameter-count` property. Since each file upload typically counts as both a part and a parameter, the lower of these two limits will determine how many files can be uploaded.

### Reference

For more information on defaults and options, refer to the [Apache Tomcat documentation](https://tomcat.apache.org/).
