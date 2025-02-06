---
id: outbound
title: Use an outbound connector
description: Learn how to use outbound Connectors
---

[Outbound Connectors](/components/connectors/connector-types.md#outbound-connectors) allow workflows to trigger external systems or services.

## Creating the BPMN task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Configuring the outbound Connector

Once a Connector task is selected, the available configuration is visible in the properties panel on the right side. The required fields are highlighted with an error message.

Fields in the properties panel marked with an equals sign inside a circle indicate that [FEEL](/components/modeler/feel/what-is-feel.md) can be used to configure the property. If the icon includes an equals sign marked with a star, FEEL is required. Using FEEL allows the user to reference process data from variables in the expression to configure the properties.

Each Connector defines its own set of properties you can fill in. Find the details for Connectors provided by Camunda in the [out-of-the-box Connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md) documentation.

## Retries

By default, Connector execution is repeated `3` times if execution fails. The retries are executed sequentially without delays.

To change the default retries value, edit the BPMN XML file and set the `retries` attribute at the `zeebe:taskDefinition`. For example:

```xml
...
<zeebe:taskDefinition type="io.camunda:http-json:1" retries="12" />
...
```

The Connector runtime also supports custom intervals between retries (**retry backoff**). To configure a custom retry interval, you need to add a special property to the Connector element template. The property must bind to the `retryBackoff` task header, and the value must be a valid [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Durations) duration.

```json
{
  "value": "PT30S",
  "binding": {
    "key": "retryBackoff",
    "type": "zeebe:taskHeader"
  },
  "type": "Hidden"
}
```

In the example above, the retry attempts will be spaced 30 seconds apart, instead of the default behavior of retrying immediately.

If necessary, the **retry backoff** property can be made visible and editable in the properties panel by changing the property `type` to `String`.

`retryBackoff` is a reserved task header key recognized by the Connector runtime. You don't need to handle this input in your Connector implementation, as the runtime handles it automatically for all outbound Connectors.
