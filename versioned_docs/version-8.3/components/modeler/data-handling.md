---
id: data-handling
title: Data handling
description: "Get editor support for variables by defining the variables in the process model."
---

<span class="badge badge--cloud">Camunda 8 only</span>

The FEEL editor will suggest variables in the current element's scope when defining input and output mappings in a process. The variables created by the mapping are automatically picked up and added to the suggestions.

To get editor support for variables created by your [job workers](../concepts/job-workers.md) or passed as process start variables, define the variables in the process model.

## Defining additional data

You can add the schema for this data by adding a JSON return value in the `Data` section of the properties panel. The values are used to derive variable names and types in the FEEL editor. Nested objects are also supported.

Providing this data is optional, but it's recommended if you want to take full advantage of the FEEL editor's suggestions.

:::note
The provided data schema is only used by the FEEL editor to provide variable suggestions while modeling. It is not used during process execution.
:::

![Variable suggestions with additional Variables](img/data-handling-example-json.png)

Data provided this way is added to scope of the element. To use the data in other parts of your process, you can use output mappings to make the variables available in the parent scope. Check the [variable concepts page](../concepts/variables.md) for more information on variables, scopes, and output mappings.
