---
id: object-variables
title: "Object and List Variable Support"
description: "Learn how Optimize imports and handles object and list variables."
---

## Object Variables
Complex object variables can be imported into Optimize and thereafter be used in Reports and Filters. During import, Optimize flattens the given object variable to create individual variables for each property of the object, resulting in multiple "sub variables" for each imported object variable.  
For example, an object variable called `user` with the properties `firstName` and `lastName` will result in two flattened variables: `user.firstName` and `user.lastName`. These variables can be used within Reports and Filters.  
Additionally to the flattened properties, Optimize also imports the entire raw value of the object variable. In the above example, this would result in a variable called `user` with value `{"firstName": "John", "lastName": "Smith"}`. This raw object variable can be inspected in Raw Data Reports but is not supported in other Report types or Filters.

## List Variables
Optimize also supports object variables which are JSON serialized lists of primitive types, for example a list of strings or numbers. Note that for Camunda Platform and external variables, the `type` of list variables must still be set to `Object`. During import, Optimize also evaluate how many entries are in a given list and persists this in an additional `_listSize` variable.  
For example, a list variable with the name `users` and the values `["John Smith", "Jane Smith"]` will result in two imported variables: one `users` variable with the two given values and one variable called `users._listSize` with value `2`. Both can be used in Reports and Filters.  
However, Filters are not yet fully optimized for list support, and some Filter terms may be initially misleading. This is because Filters currently apply to each list item individually rather than the entire list. For example, an "is" filter on a list of string values filters for those instances where any individual list item is equal to the given term, ie instances whose list variable "contains" the selected value. Similarly, the "contains" filter matches process instances whose list variable contains at least one value which in turn contains the given substring.  
The value of list properties within objects as well as variables which are lists of objects rather than primitives can be inspected in the raw object variable value column accessible in Raw Data Reports.

## Variable Plugins
Any configured [variable plugins](../../plugins/variable-import-plugin) are applied _before_ Optimize creates the flattened property "sub variables", meaning the configured plugins have access to the raw JSON object variables only. Any modifications applied to the JSON object variables will then be persisted to the "sub variables" when Optimize flattens the resulting objects in the next step of the import cycle. 

## Optimize Configuration
The import of object variable values is enabled by default and can be disabled using the `import.data.variable.includeObjectVariableValue` [configuration](../configuration/#engine-common-settings).

## Other System Configurations
Depending on where the imported object variables originate, the following configuration is required to ensure that your system produces object variable data that Optimize can import correctly:

### Platform Object Variables
If you are importing object variables from Camunda Platform, it is required to configure the Platform's spin serialization so that process variables are by default **serialized as JSON**. Please refer to the [Platform documentation](https://docs.camunda.org/manual/latest/user-guide/data-formats/json/#serializing-process-variables) for more information on how to setup JSON serialization.
Furthermore, to allow Optimize to correctly parse date properties within the object variable, please ensure date properties of objects are serialized using a common **date format** other than timestamps. If date properties are serialized as timestamps, these properties cannot be identified and parsed as dates when importing into Optimize and will instead be persisted as number variables.

### Zeebe Object Variables
If you are creating object variables using a Zeebe process, please ensure date properties within the JSON object are stored using a common **date format** other than timestamps. If Optimize imports timestamp date properties, these properties cannot be identified and parsed as dates and will instead be persisted as number variables.

### External Object Variables
External variables of type object require an additional field called `serializationDataFormat` which specifies which data format was used to serialize the given object.  
Please refer to the [external object variable API section](../../rest-api/external-variable-ingestion) for further details on how to ingest external variables.