---
id: use-connectors-in-hybrid-mode
title: Use Connectors in hybrid mode
description: "The following document provides explanation on how to run Connectors in hybrid mode."
---

## About a hybrid mode

Hybrid mode means running Self-Managed Connectors runtime instance that is attached to the Camunda SaaS cluster,
or other Self-Managed Camunda cluster that has already another instance of the Connectors runtime attached.

To name few use-cases where this approach might be useful:

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
[Learn more](../../components/console/manage-clusters/manage-api-clients/) about how to obtain required credentials.

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
- Build Connectors image, e.g. `docker build -f Dockerfile -t camunda/connectors-bundle:<desired-version> .`.
- Run the same `docker run ...` command as in [Option A](#option-a-get-connectors-runtime-from-docker-registry).

### Explanation

Pay attention at the line `-e CONNECTOR_HTTP_REST_TYPE='io.camunda:http-json:local'`. This line means that we have to override
`CONNECTOR_X_TYPE` with given type. In this case, we want to register local self-managed HTTP REST connector as `io.camunda:http-json:local`.
The `X` is normalized to environment variable Connector name. For example, the [HTTP REST Connector](https://github.com/camunda/connectors/blob/main/connectors/http/rest/src/main/java/io/camunda/connector/http/rest/HttpJsonFunction.java#L33)
`HTTP REST` name becomes `HTTP_REST`, or the [Kafka Consumer Connector](https://github.com/camunda/connectors/blob/main/connectors/kafka/src/main/java/io/camunda/connector/kafka/inbound/KafkaExecutable.java#L20) name
transformed to `KAFKA_CONSUMER`, therefore to override it one would need to pass `CONNECTOR_KAFKA_CONSUMER_TYPE=xxx` environment variable.

## Preparing element template for hybrid mode

### Overview

As mentioned before, to relate Connector element templates with Connectors runtime, you have to modify the task definition type.

In order to do that, get a copy of the element template you wish to override. All latest versions of the official element
templates can be found at the [official Connectors repository](https://github.com/camunda/connectors) at path `connectors/<desired connector>/element-templates/`.

Then you have to modify the `value` to desired new type of the property `zeebe:taskDefinition:type` for outbound Connectors, or `inbound.type` for inbound ones.
Afterward publish the new element template, and use it in your BPMN diagram.

There are several options how element templates may be delivered to the target user.

### Option A: hide task definition type value

Use this option when you plan to clearly indicate that a specific Connector will only be used in specific use-case.
Otherwise, users might be confused by two, say, HTTP REST Connectors.

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

### Option B: expose task definition type as plain text

Use this option when the target user who builds a BPMN process is up to decide which Connector to use, or you have
more than 1 dedicated self-managed Connector instance. Please, be mindful, that the user will be dealing with different
task definition types and has to know which is what.

For example, if you defined `CONNECTOR_HTTP_REST_TYPE='io.camunda:http-json:local'` in runtime, you have to do the following in the
element template to make it working.

```json
{
  "type": "String",
  "label": "Task definition type",
  "value": "io.camunda:http-json:local",
  "binding": {
    "type": "zeebe:taskDefinition:type"
  }
}
```

However, the target user can change value back to original `"value": "io.camunda:http-json:1",` to execute process in SaaS
environment. In addition to that, you can also add this field to a group to make UX more friendly.

### Option C: expose task definition type as dropdown

Use this option if you would like to achieve the most friendly user experience. However, this approach may take
bigger time investment in modifying element templates, plus additional time to support whenever you launch a new
Connector runtime or disable old one.

The following example demonstrates this approach:

```json
{
  "label": "Task definition type",
  "type": "Dropdown",
  "value": "io.camunda:http-json:1",
  "choices": [
    {
      "name": "SaaS environment",
      "value": "io.camunda:http-json:1"
    },
    {
      "name": "SM environment 1",
      "value": "io.camunda:http-json:local1"
    },
    {
      "name": "SM environment 2",
      "value": "io.camunda:http-json:local2"
    }
  ],
  "binding": {
    "type": "zeebe:taskDefinition:type"
  }
}
```

## Appendix

See ready-to-use hybrid element templates examples for [HTTP REST](https://github.com/camunda/connectors/blob/main/connectors/http/rest/element-templates/http-json-connector-hybrid.json) and [Kafka Consumer](https://github.com/camunda/connectors/blob/main/connectors/kafka/element-templates/kafka-inbound-connector-hybrid.json).
