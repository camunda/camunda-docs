---
id: use-connectors-in-hybrid-mode
title: Use Connectors in hybrid mode
description: "The following document provides explanation on how to run Connectors in hybrid mode."
---

## About a hybrid mode

Hybrid mode means running Self-Managed Connectors runtime instance that is attached to the Camunda SaaS cluster,
or other Self-Managed Camunda cluster that has already another instance of the Connectors runtime attached.

To name few use-cases where this approach might be useful:

- When you deal with business critical secrets, such as financial information, personal identifiable information, other information that is legally not allowed to share with Camunda SaaS clusters.
- When you deal with services that must be isolated within private network and must never be exposed to the public internet.
- Infrastructure amendments need to be applied to the Connectors runtime, such as SSL certificates, mounted volumes, etc.
- Code modifications applied to Connectors runtime, or specific connector logic.

## How it works

Every Connector has its ID, aka type definition, and name. Every Connector element template has a hidden property that
defines which Connector to be used to execute with given template.

For example, see a relation between [Kafka element template](https://github.com/camunda/connectors/blob/main/connectors/kafka/element-templates/kafka-inbound-connector.json#L39)
and [Kafka Connector](https://github.com/camunda/connectors/blob/main/connectors/kafka/src/main/java/io/camunda/connector/kafka/inbound/KafkaExecutable.java#L20).

In order to make hybrid Connector runtime working correctly, it is required to override Connector type.

For the purpose of this guide, let's consider we would like to override HTTP REST Connector with type `io.camunda:http-json:1`.
Refer to the [element template](https://github.com/camunda/connectors/blob/main/connectors/http/rest/element-templates/http-json-connector.json#L50) and its related [runtime](https://github.com/camunda/connectors/blob/main/connectors/http/rest/src/main/java/io/camunda/connector/http/rest/HttpJsonFunction.java#L43).

## Start Connectors runtime in a hybrid mode

### Prerequisite

You need to have a running Camunda cluster, and a pair of `Client ID`/`Client Secret` with `Zeebe` and `Operate` scopes.
[Learn more](../components/console/manage-clusters/manage-api-clients/) about how to obtain required credentials.

### Option A: get Connectors runtime from Docker registry

Use this option when you don't need to make any code modifications to either Connectors runtime, or specific Connector.

Run the following script:

```shell
docker run --rm --name=HybridConnectorRuntime \
    -e ZEEBE_CLIENT_SECURITY_PLAINTEXT=false \
    -e ZEEBE_CLIENT_CLOUD_CLUSTER-ID='<YOUR_CLUSTER_ID>' \
    -e ZEEBE_CLIENT_CLOUD_CLIENT-ID='<YOUR_CLIENT_ID>' \
    -e ZEEBE_CLIENT_CLOUD_CLIENT-SECRET='<YOUR_CLIENT_SECRET>' \
    -e ZEEBE_CLIENT_CLOUD_REGION='<YOUR_CLUSTER_REGION>' \
    -e CAMUNDA_OPERATE_CLIENT_URL='https://<region>.operate.camunda.io/<cluster-id>' \
    -e CONNECTOR_HTTP_REST_TYPE='io.camunda:http-json:local' \
        camunda/connectors-bundle:<desired-version>
```

### Option B: build your own runtime

Use this option if you need to make code modifications.

- Make sure `docker` is installed.
- Clone https://github.com/camunda/connectors.
- Go to `<connectors-root>/bundle/default-bundle`.
- Build Connectors image, e.g. `docker build -f Dockerfile -t camunda/connectors-bundle:<desired-version> .`

Run the following script:

```shell
docker run --rm --name=HybridConnector \
    -e ZEEBE_CLIENT_SECURITY_PLAINTEXT=false \
    -e ZEEBE_CLIENT_CLOUD_CLUSTER-ID='<YOUR_CLUSTER_ID>' \
    -e ZEEBE_CLIENT_CLOUD_CLIENT-ID='<YOUR_CLIENT_ID>' \
    -e ZEEBE_CLIENT_CLOUD_CLIENT-SECRET='<YOUR_CLIENT_SECRET>' \
    -e ZEEBE_CLIENT_CLOUD_REGION='<YOUR_CLUSTER_REGION>' \
    -e CAMUNDA_OPERATE_CLIENT_URL='https://<region>.operate.camunda.io/<cluster-id>' \
    -e CONNECTOR_HTTP_REST_TYPE='io.camunda:http-json:local' \
        camunda/connectors-bundle:<desired-version>
```

### Explanation

Pay attention at the line `-e CONNECTOR_HTTP_REST_TYPE='io.camunda:http-json:local'`. This line means that we have to override
`CONNECTOR_X_TYPE` with given type. In this case, we want to register local self-managed HTTP REST connector as `io.camunda:http-json:local`.
The `X` is normalized to environment variable Connector name. For example, the [HTTP REST Connector](https://github.com/camunda/connectors/blob/main/connectors/http/rest/src/main/java/io/camunda/connector/http/rest/HttpJsonFunction.java#L33)
`HTTP REST` name becomes `HTTP_REST`, or the [Kafka Consumer Connector](https://github.com/camunda/connectors/blob/main/connectors/kafka/src/main/java/io/camunda/connector/kafka/inbound/KafkaExecutable.java#L20) name
transformed to `KAFKA_CONSUMER`, therefore to override it one would need to pass `CONNECTOR_KAFKA_CONSUMER_TYPE=xxx` environment variable.

## Modify element template

As mentioned before, to relate Connector element templates with Connectors runtime, you have to modify the task definition type.

In order to do that, get a copy of the element template you wish to override. All latest versions of the official element
templates can be found at the [official Connectors repository](https://github.com/camunda/connectors) at path `connectors/<desired connector>/element-templates/`.
Then, do the following:

- [Create new or import](../components/connectors/manage-connector-templates/) desired Connector element template into your Web Modeler.
- Modify the `value` to desired new type of the property `zeebe:taskDefinition:type` for outbound Connectors, or `inbound.type` for inbound ones.
- Publish new element template.
- Use new published template in the BPMN diagram as usual.

For example, if you defined `CONNECTOR_HTTP_REST_TYPE='io.camunda:http-json:local'` in runtime, you have to do the following in the
element template to make it working:

```json
{
  "type": "Hidden",
  "value": "io.camunda:http-json:local",
  "binding": {
    "type": "zeebe:taskDefinition:type"
  }
}
```

## Appendix

See ready-to-use hybrid element templates examples for [HTTP REST](https://github.com/camunda/connectors/blob/main/connectors/http/rest/element-templates/http-json-connector-hybrid.json) and [Kafka Consumer](https://github.com/camunda/connectors/blob/main/connectors/kafka/element-templates/kafka-inbound-connector-hybrid.json).
