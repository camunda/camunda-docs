---
id: object-variables
title: "Object and list variable support"
description: "Learn how Optimize imports and handles object and list variables."
---

## Object variables

Complex object variables can be imported into Optimize and thereafter be used in reports and filters. During import, Optimize flattens the given object variable to create individual variables for each property of the object, resulting in multiple "sub variables" for each imported object variable.

For example, an object variable called `user` with the properties `firstName` and `lastName` will result in two flattened variables: `user.firstName` and `user.lastName`. These variables can be used within reports and filters.

Additionally, to the flattened properties, Optimize also imports the entire raw value of the object variable. In the above example, this would result in a variable called `user` with value `{"firstName": "John", "lastName": "Smith"}`. This raw object variable can be inspected in Raw Data Reports but is not supported in other report types or filters.

## List variables

Optimize also supports object variables which are JSON serialized lists of primitive types, for example a list of strings or numbers. Note that for Camunda Platform 7 and external variables, the `type` of list variables must still be set to `Object`. During import, Optimize also evaluate how many entries are in a given list and persists this in an additional `_listSize` variable.

For example, a list variable with the name `users` and the values `["John Smith", "Jane Smith"]` will result in two imported variables: one `users` variable with the two given values, and one variable called `users._listSize` with value `2`. Both can be used in reports and filters.

However, filters are not yet fully optimized for list support, and some filter terms may be initially misleading. This is because filters currently apply to each list item individually rather than the entire list. For example, an "is" filter on a list of string values filters for those instances where any individual list item is equal to the given term, for example, instances whose list variable "contains" the selected value.

Similarly, the "contains" filter matches process instances whose list variable contains at least one value which in turn contains the given substring.

The value of list properties within objects as well as variables which are lists of objects rather than primitives can be inspected in the raw object variable value column accessible in raw data reports.

## Variable plugins

Any configured [variable plugins](../../plugins/variable-import-plugin) are applied _before_ Optimize creates the flattened property "sub variables", meaning the configured plugins have access to the raw JSON object variables only. Any modifications applied to the JSON object variables will then be persisted to the "sub variables" when Optimize flattens the resulting objects in the next step of the import cycle.

## Optimize configuration

The import of object variable values is enabled by default and can be disabled using the `import.data.variable.includeObjectVariableValue` [configuration](./system-configuration-platform-7.md).

## Other system configurations

Depending on where the imported object variables originate, the following configuration is required to ensure that your system produces object variable data that Optimize can import correctly:

### Platform object variables

Optimize supports both [object process variables serialized as JSON](https://docs.camunda.org/manual/latest/user-guide/data-formats/json/#serializing-process-variables) and [built-in JSON variables](https://docs.camunda.org/manual/latest/user-guide/data-formats/json/#native-json-variable-value) from Camunda Platform 7. If you are importing object variables, it is required to configure the Platform's spin serialization so that process variables are by default **serialized as JSON**. Refer to the [Camunda Platform 7 documentation](https://docs.camunda.org/manual/latest/user-guide/data-formats/json/#serializing-process-variables) for more information on how to set up JSON serialization.

Furthermore, to allow Optimize to correctly parse date properties within the object or built-in JSON variable, ensure date properties of objects are serialized using a common **date format** (for example `yyyy-MM-dd'T'HH:mm:ss.SSSZ`) other than unix timestamps. If date properties are serialized as unix timestamps, these properties cannot be identified and parsed as dates when importing into Optimize and will instead be persisted as number variables.

### Zeebe object variables

If you are creating object variables using a Zeebe process, ensure date properties within the JSON object are stored using a common **date format** (for example `yyyy-MM-dd'T'HH:mm:ss.SSSZ`) other than unix timestamps. If Optimize imports unix timestamp date properties, these properties cannot be identified and parsed as dates and will instead be persisted as number variables.

### External object variables

External variables of type object require an additional field called `serializationDataFormat` which specifies which data format was used to serialize the given object.

Refer to the [external object variable API section](../../../apis-tools/optimize-api/external-variable-ingestion.md) for further details on how to ingest external variables.
