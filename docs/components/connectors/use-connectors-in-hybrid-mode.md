---
id: use-connectors-in-hybrid-mode
title: Use connectors in hybrid mode
description: "Learn how to run connectors in hybrid mode."
---

:::note
Hybrid mode is supported as of the connectors `0.23.0` release.
:::

**Hybrid mode** is where you can run a Self-Managed connector runtime instance attached to a Camunda SaaS cluster or another Self-Managed cluster that has another instance of the connector runtime attached.

To name few use-cases where this approach might be useful:

- When you deal with services that must be isolated within private network and must never be exposed to the public internet.
- Infrastructure amendments need to be applied to the connector runtime, such as SSL certificates, mounted volumes, etc.
- Code modifications applied to connector runtime, or specific connector logic.

## How it works

Every connector has its ID (type definition), and name. Every connector element template has a hidden property that
defines which connector is to be used to execute with a given template.

For example, see a relation between [Kafka element template](https://github.com/camunda/connectors/tree/main/connectors/kafka/element-templates)
and [Kafka connector](https://github.com/camunda/connectors/blob/main/connectors/kafka/src/main/java/io/camunda/connector/kafka/inbound/KafkaExecutable.java#L20).

For the hybrid connector runtime to work properly, you must override the connector type.

For the purpose of this guide, imagine you would like to override an HTTP REST connector with type `io.camunda:http-json:1`.
Refer to the [element template](https://github.com/camunda/connectors/blob/main/connectors/http/rest/element-templates/http-json-connector.json#L50) and its related [runtime](https://github.com/camunda/connectors/blob/main/connectors/http/rest/src/main/java/io/camunda/connector/http/rest/HttpJsonFunction.java#L43).

## Start connector runtime in hybrid mode

### Prerequisites

Ensure you have a running Camunda cluster, and a pair of `Client ID`/`Client Secret` with `Zeebe` and `Operate` scopes. Learn more about [how to obtain required credentials](/components/console/manage-clusters/manage-api-clients.md).

To use secrets managed by the SaaS environment, add the `Secrets` scope.

### Option 1: Get connector runtime from Docker registry

:::note When to use?
Use this option when you don't need to make any code modifications to either connector runtime, or a specific connector.
This option allows you to start the connector runtime bundle that runs all of [Camunda's officially-supported connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md).
:::

Run the following script:

```shell
docker run --rm --name=HybridConnectorRuntime \
    -e CAMUNDA_CLIENT_MODE=saas \
    -e CAMUNDA_CLIENT_CLOUD_CLUSTERID='<YOUR_CLUSTER_ID>' \
    -e CAMUNDA_CLIENT_CLOUD_REGION='<YOUR_CLUSTER_REGION>' \
    -e CAMUNDA_CLIENT_AUTH_CLIENTID='<YOUR_CLIENT_ID>' \
    -e CAMUNDA_CLIENT_AUTH_CLIENTSECRET='<YOUR_CLIENT_SECRET>' \
    -e CONNECTOR_HTTP_REST_TYPE='io.camunda:http-json:local' \
        camunda/connectors-bundle:<desired-version>
```

### Option 2: Build your own runtime

:::note When to use?
Use this option when you make modifications to the original connector runtime, existing connectors, or
other related changes.
This option allows you to start the connector runtime bundle with provided connectors.
:::

1. Ensure `docker` is installed.
2. Clone [https://github.com/camunda/connectors](https://github.com/camunda/connectors).
3. Go to `<connectors-root>/bundle/default-bundle`.
4. Build a connector image, e.g. `docker build -f Dockerfile -t myorg/my-connectors-bundle:<desired-version> .`.
5. Run the same `docker run ...` command as in [Option 1](#option-a-get-connectors-runtime-from-docker-registry).

### Explanation

Note the line `-e CONNECTOR_HTTP_REST_TYPE='io.camunda:http-json:local'`. This line means we have to override
`CONNECTOR_X_TYPE` with a given type. In this case, we want to register a local Self-Managed HTTP REST connector as `io.camunda:http-json:local`.

The `X` is normalized to the environment variable connector name. For example, the [HTTP REST connector](https://github.com/camunda/connectors/blob/main/connectors/http/rest/src/main/java/io/camunda/connector/http/rest/HttpJsonFunction.java#L33)
`HTTP REST` name becomes `HTTP_REST`, or the [Kafka Consumer connector](https://github.com/camunda/connectors/blob/main/connectors/kafka/src/main/java/io/camunda/connector/kafka/inbound/KafkaExecutable.java#L20) name
becomes `KAFKA_CONSUMER`. Therefore, to override it one would need to pass in the `CONNECTOR_KAFKA_CONSUMER_TYPE=xxx` environment variable.

## Using SaaS secrets

If you add the `Secrets` scope to your API client, you can access cluster [secrets](/components/connectors/use-connectors/index.md#using-secrets) in a hybrid setup.

Enable the SaaS secret provider via an environment variable or in your application config file:

**Environment variable:**

```
CAMUNDA_CONNECTOR_SECRETPROVIDER_CONSOLE_ENABLED = true
```

**Properties file:**

```
camunda.connector.secretprovider.console.enabled = true
```

After enabling Console, secret provider secrets used in an external connectors
runtime will be resolved by fetching them from Console.

## Preparing element template for hybrid mode

As mentioned, to relate connector element templates with connector runtime, you must modify the task definition type.

To do this, take the following steps:

1. Obtain a copy of the element template you wish to override. All latest versions of the official element
   templates can be found in the [official connectors repository](https://github.com/camunda/connectors) at path `connectors/<desired connector>/element-templates/`.
2. Modify the `value` to the desired new type of the property. Use `zeebe:taskDefinition:type` for outbound connectors, or `inbound.type` for inbound ones.
3. Publish the new element template, and use it in your BPMN diagram.

There are several options to deliver element templates to the target user:

### Option 1: Hide task definition type value

Use this option when you plan to clearly indicate that a specific connector will only be used in a specific use-case.
Otherwise, users might be confused between two of the same connector types.

For example, if you defined `CONNECTOR_HTTP_REST_TYPE='io.camunda:http-json:local'` argument variable when running connectors
runtime, you must implement the following in the element template for it to function properly:

```json
{
  "type": "Hidden",
  "value": "io.camunda:http-json:local",
  "binding": {
    "type": "zeebe:taskDefinition:type"
  }
}
```

### Option 2: Expose task definition type as plain text

Use this option when the target user building a BPMN process is deciding which connector to use, or you have
more than one dedicated Self-Managed connector instance.

Be mindful that the user will be dealing with different
task definition types and has to know which is what. For example, if you defined `CONNECTOR_HTTP_REST_TYPE='io.camunda:http-json:local'` in runtime, you must implement the following in the
element template for it to function properly:

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

However, the target user can change the value back to the original `"value": "io.camunda:http-json:1",` to execute the process in a SaaS
environment. You can also add this field to a group for UX purposes.

### Option 3: Expose task definition type as dropdown

Use this option if you would like to achieve the most user-friendly experience. However, this approach may take a larger time investment in modifying element templates, plus additional time to support whenever you launch a new
Connector runtime or disable an old one.

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

See ready-to-use hybrid element templates examples for [HTTP REST](https://github.com/camunda/connectors/blob/main/connectors/http/rest/element-templates/hybrid/http-json-connector-hybrid.json) and [Kafka Consumer](https://github.com/camunda/connectors/tree/main/connectors/kafka/element-templates/hybrid).
