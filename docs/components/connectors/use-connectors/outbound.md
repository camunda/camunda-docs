---
id: outbound
title: Use an outbound connector
description: Learn how to use outbound connectors
---

[Outbound connectors](/components/connectors/connector-types.md#outbound-connectors) allow workflows to trigger external systems or services.

## Creating the BPMN task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Configuring the outbound connector

Once a connector task is selected, the available configuration is visible in the properties panel on the right side. The required fields are highlighted with an error message.

Fields in the properties panel marked with an equals sign inside a circle indicate that [FEEL](/components/modeler/feel/what-is-feel.md) can be used to configure the property. If the icon includes an equals sign marked with a star, FEEL is required. Using FEEL allows the user to reference process data from variables in the expression to configure the properties.

Each connector defines its own set of properties you can fill in. Find the details for connectors provided by Camunda in the [out-of-the-box connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md) documentation.

## Retries

By default, connector execution is repeated `3` times if execution fails.

Out-of-the-box connector element templates expose the retry settings in the **Retries** group of the properties panel:

- **Retries**: The number of retries. Defaults to `3`.
- **Retry backoff**: The interval between retries, as an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Durations) duration. Defaults to `PT30S`.

If your element template doesn't expose these properties, you can change the retries value by editing the BPMN XML file and setting the `retries` attribute at the `zeebe:taskDefinition`. For example:

```xml
...
<zeebe:taskDefinition type="io.camunda:http-json:1" retries="12" />
...
```

The connector runtime also supports custom intervals between retries (**retry backoff**). To configure a custom retry interval in such a template, you need to add a special property to the connector element template. The property must bind to the `retryBackoff` task header, and the value must be a valid [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Durations) duration.

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

In the example above, the retry attempts will be spaced 30 seconds apart. Without a `retryBackoff` task header, the retries are executed immediately.

If necessary, the **retry backoff** property can be made visible and editable in the properties panel by changing the property `type` to `String`.

`retryBackoff` is a reserved task header key recognized by the connector runtime. You don't need to handle this input in your connector implementation, as the runtime handles it automatically for all outbound connectors.

## Job timeout

If Zeebe doesn't receive a result for a job within the job timeout, it makes the job available again and another worker can pick it up. A long-running connector call can then run twice.

Element templates of outbound connectors can include an optional **Job timeout** property in the **Retries** section of the properties panel. Enter an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Durations) duration, for example `PT15M`, to give the call more time before Zeebe reassigns the job. Leave the property empty to use the default job timeout.

## Downloading documents

To download documents without an additional step, review [uploading a document when using connectors](/components/document-handling/upload-document-to-bpmn-process.md#upload-a-document-when-using-any-connector).
