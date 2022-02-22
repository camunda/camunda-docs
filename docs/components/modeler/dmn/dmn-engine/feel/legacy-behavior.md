---
id: feel-legacy-behavior
title: "FEEL Engine Legacy Behavior"
---

If you come from a Camunda Platform version <= 7.12.x and already use FEEL, it might be that you need to 
migrate your DMN models. To do this, please check out the [Migration Guide], where we've documented 
all breaking changes. 

If you don't want to migrate your DMN models right now, you can also restore the legacy FEEL 
behavior by flipping a config flag:

* To see how this legacy behavior can be enabled again in the Camunda Platform, please see the
[dmnFeelEnableLegacyBehavior][legacy behavior flag] engine configuration property.
* To enable this behavior in a standalone DMN Engine setup, please refer to the `DefaultDmnEngineConfiguration`
[enableFeelLegacyBehavior][fluent feel flag setter] and [setEnableFeelLegacyBehavior][feel flag setter] 
methods

:::note Heads up!
By using the legacy FEEL Engine, the Camunda DMN Engine **only** supports `FEEL` for 
[Input Entries](#) of a decision table – this corresponds to FEEL 
simple unary tests.
:::

[//]: # [Migration Guide]: {{< ref "/update/minor/712-to-713/_index.md#entirely-replaced-feel-engine" >}}
[//]: # [legacy behavior flag]: {{< ref "/reference/deployment-descriptors/tags/process-engine.md#dmnFeelEnableLegacyBehavior" >}}
[//]: # [fluent feel flag setter]: {{< javadocref_url page="?org/camunda/bpm/dmn/engine/impl/DefaultDmnEngineConfiguration.html#enableFeelLegacyBehavior" >}}
[//]: # [feel flag setter]: {{< javadocref_url page="?org/camunda/bpm/dmn/engine/impl/DefaultDmnEngineConfiguration.html#setEnableFeelLegacyBehavior" >}}