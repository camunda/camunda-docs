---
id: object-variables
title: "Object and list variable support"
description: "Learn how Optimize imports and handles object and list variables."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

## Object variables

Complex object variables can be imported into Optimize and thereafter be used in reports and filters. During import, Optimize flattens the given object variable to create individual variables for each property of the object, resulting in multiple "sub variables" for each imported object variable.

For example, an object variable called `user` with the properties `firstName` and `lastName` will result in two flattened variables: `user.firstName` and `user.lastName`. These variables can be used within reports and filters.

Additionally, to the flattened properties, Optimize also imports the entire raw value of the object variable. In the above example, this would result in a variable called `user` with value `{"firstName": "John", "lastName": "Smith"}`. This raw object variable can be inspected in Raw Data Reports but is not supported in other report types or filters.

## List variables

Optimize also supports object variables which are JSON serialized lists of primitive types, for example a list of strings or numbers. Note that for Camunda 7 and external variables, the `type` of list variables must still be set to `Object`. During import, Optimize also evaluate how many entries are in a given list and persists this in an additional `_listSize` variable.

For example, a list variable with the name `users` and the values `["John Smith", "Jane Smith"]` will result in two imported variables: one `users` variable with the two given values, and one variable called `users._listSize` with value `2`. Both can be used in reports and filters.

However, filters are not yet fully optimized for list support, and some filter terms may be initially misleading. This is because filters currently apply to each list item individually rather than the entire list. For example, an "is" filter on a list of string values filters for those instances where any individual list item is equal to the given term, for example, instances whose list variable "contains" the selected value.

Similarly, the "contains" filter matches process instances whose list variable contains at least one value which in turn contains the given substring.

The value of list properties within objects as well as variables which are lists of objects rather than primitives can be inspected in the raw object variable value column accessible in raw data reports.

## Optimize configuration

The import of object variable values is enabled by default and can be disabled using the `import.data.variable.includeObjectVariableValue` configuration.

Depending on where the imported object variables originate, the following configuration is required to ensure that your system produces object variable data that Optimize can import correctly:

<Tabs groupId="systemconfig" defaultValue="zeebeobject" queryString values={
[
{label: 'Zeebe object', value: 'zeebeobject' },
{label: 'External object', value: 'externalobject' }
]
}>

<TabItem value='zeebeobject'>

If you are creating object variables using a Zeebe process, ensure date properties within the JSON object are stored using a common **date format** (for example `yyyy-MM-dd'T'HH:mm:ss.SSSZ`) other than unix timestamps. If Optimize imports unix timestamp date properties, these properties cannot be identified and parsed as dates and will instead be persisted as number variables.

</TabItem>

<TabItem value='externalobject'>

External variables of type object require an additional field called `serializationDataFormat` which specifies which data format was used to serialize the given object.

Refer to the [external object variable API section](../../../apis-tools/optimize-api/external-variable-ingestion.md) for further details on how to ingest external variables.

</TabItem>
</Tabs>
