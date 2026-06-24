---
id: orchestration-cluster-api-rest-deployment-configuration
title: "Deployment configuration"
description: "Learn how to configure upload limits and multipart handling for Orchestration Cluster REST API."
---

## Deployment configuration

The Orchestration Cluster REST API supports file and multipart uploads when deploying BPMN diagrams and other resources. By default, the maximum allowed request size is 4MB. You can increase this limit in Self-Managed cluster through configuration of the Zeebe Gateway, Broker, and the REST layer, for example, Spring Boot and Tomcat.

This guide walks you through adjusting these settings.

### Gateway and Broker configuration

The `maxMessageSize` default value is 4MB for raw Zeebe deployments (10MB for Helm). You can configure this setting in the:

- [Gateway config](../orchestration-cluster/zeebe/configuration/gateway.md#zeebegatewaynetwork)
- [Broker config](/self-managed/components/orchestration-cluster/zeebe/configuration/broker.md#zeebebrokernetwork)

If you deploy with Helm, the chart defaults to 10MB via `global.config.requestBodySize`, applying
this value to the Zeebe Gateway and broker message size, the REST multipart file and request size, and the Tomcat HTTP
form post size on the Zeebe Gateway. Change `global.config.requestBodySize` only if you need a
value other than 10MB.

If you expose the REST API through Ingress, you must also explicitly set
`global.ingress.annotations.nginx.ingress.kubernetes.io/proxy-body-size` to the same value.
This annotation is not propagated automatically from `requestBodySize`.

This setting aligns the HTTP, multipart, Tomcat, Gateway, and Broker transport limits. Deployments
can still be rejected by Zeebe's internal record batch processing if the deployed resources and
follow-up records exceed the engine batch limit. This engine-level rejection returns an HTTP 500
response, not HTTP 413.

Multipart requests include metadata and boundary overhead in addition to the uploaded file content.
Set these limits slightly above the largest file you expect users or Connectors to upload.

If you are not using Helm and increase this value, you must also adjust the configuration for the deployment REST endpoint to match.

### REST API server configuration

If you're using the REST API and submitting files via multipart upload (e.g., using `POST /v2/deployments`), make sure your application is configured to accept the updated request sizes. If you increase the `maxMessageSize` to 10MB, increase these property values to 10MB as well.

For Spring Boot applications:

```properties
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
server.tomcat.max-http-form-post-size=10MB
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
