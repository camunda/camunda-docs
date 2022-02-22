---
id: feel-types
title: "FEEL Engine Type Handling"
description: "Supported types of variable values and supported output types"
---

This documentation covers supported types of variable values when used in a FEEL expression and 
supported output types.

In DMN, when defining a `typeRef` attribute on a **Variable**, **Input** or **Output** element, the 
DMN Engine tries to convert the result value of the corresponding **Literal Expression**, 
**Input Expression** or the **Output Entry**. When no `typeRef` attribute is specified, the DMN 
Engine passes the return value of the FEEL Engine directly without any conversion. Please see the 
documentation about [Supported Data Types in DMN] to learn more about the `typeRef` attribute. 

The FEEL Engine might support more types than listed below. However, this page defines
which of the types are known for being...

* ...well integrable in Camunda Platform
* ...covered by automated tests

## Supported Variable Value Types

The variable value types listed in this section can be handled by the FEEL Engine when passing.

### Java Native Types

* `java.lang.String`
* `java.lang.Float`
* `java.lang.Double`
* `java.lang.Integer`
* `java.lang.Long`
* `java.lang.Boolean`
* `java.util.Date`
* `java.util.Map`
* `java.util.List`

### Spin Types

* `org.camunda.spin.json.SpinJsonNode`
* `org.camunda.spin.xml.SpinXmlElement`

For more information about the Camunda Spin integration, please see the documentation about 
[FEEL Engine Spin Integration].

## Return Types

The table displays:

* Which return value of a FEEL Expression maps to which Java type
* Which Camunda Platform specific variable type is assigned for the respective Java type

|FEEL Expression Example|FEEL Engine Return Type|Camunda Variable Type|
|--- |--- |--- |
|null|null|null|
|"foo"|java.lang.String|string|
|3.1415|java.lang.Double|double|
|3|java.lang.Long|long|
|true|java.lang.Boolean|boolean|
|time("11:45:30")|java.time.LocalTime|object|
|time("11:45:30+02:00")
        time("10:31:10@Europe/Paris")|org.camunda.feel.syntaxtree.ZonedTime|object|
|date("2017-03-10")|java.time.LocalDate|object|
|date and time("2019-08-12T22:22:22")|java.time.LocalDateTime|object|
|date and time("2019-08-12T22:22:22+02:00")
        date and time("2019-08-12T22:22:22@Europe/Berlin")|java.time.ZonedDateTime|object|
|duration("P4D")|java.time.Duration|object|
|duration("P1Y6M")|java.time.Period|object|
|{ "foo": "bar" }|java.util.Map *|object|
|[ "foo", "bar", "baz" ]|java.util.List *|object|

\* Since the FEEL Engine is based on the [Scala Library], a Scala-specific implementation type for 
`Map` and `List` is used

[//]: # [Supported Data Types in DMN]: {{< ref "/user-guide/dmn-engine/data-types.md#supported-data-types" >}}
[//]: # [FEEL Engine Spin Integration]: {{< ref "/user-guide/dmn-engine/feel/spin-integration.md" >}}
[//]: # [Scala Library]: https://www.scala-lang.org/