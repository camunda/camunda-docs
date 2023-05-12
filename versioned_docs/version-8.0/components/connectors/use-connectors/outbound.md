---
id: outbound
title: Using outbound Connectors
description: Learn how to use outbound Connectors
---

[Outbound Connectors](/components/connectors/connector-types.md#outbound-connectors) allow workflows to trigger external systems or services.

### Creating the BPMN task

Use the change type context menu item (spanner/wrench icon) to integrate Connectors in a business model. Users can search for keywords like `REST` or `email` to find specific Connectors. To discover all available Connectors in Camunda, input the term `Connector` into the search bar.

![connectors context menu](../img/use-connectors-context-menu.png)

Alternatively, you can directly create a Connector task by using the **Append Connector** context menu item. This creates a new Connector task directly following the currently selected element.

![append Connector](../img/use-connectors-append.png)

### Configuring the Outbound Connector

Once a Connector task is selected, the available configuration is visible in the properties panel on the right side. The required fields are highlighted with an error message.

![Connectors properties panel](../img/use-connectors-properties.png)

Fields in the properties panel marked with an equals sign inside a circle indicate that [FEEL](/components/modeler/feel/what-is-feel.md) can be used to configure the property. If the icon includes an equals sign marked with a star, FEEL is required. Using FEEL allows the user to reference process data from variables in the expression to configure the properties.

![feel Connectors](../img/use-connectors-feel.png)

Each Connector defines its own set of properties you can fill in. Find the details for Connectors provided by Camunda in the [out-of-the-box Connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md) documentation.

### Retries

By default, Connector execution is repeated `3` times if execution fails. To change the default retries value, edit the BPMN XML file and set the `retries` attribute at the `zeebe:taskDefinition`. For example:

```xml
...
<zeebe:taskDefinition type="io.camunda:http-json:1" retries="12" />
...
```
