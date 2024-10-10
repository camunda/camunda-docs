---
id: adjusting-dmn-models
title: Adjust DMN models
description: "Learn how to adjust your DMN models when migrating from Camunda 7 to Camunda 8."
---

For Camunda 8, [a former community extension](https://github.com/camunda-community-hub/dmn-scala), built by core Camunda developers is productized. This engine has a higher coverage of DMN elements. This engine can execute DMN models designed for Camunda 7. However, there are some small differences as outlined in this document.

To evaluate Camunda 7 DMN files in Camunda 8, change the following in the XML:

`modeler:executionPlatform` should be set to `Camunda Cloud`. Prior to this change, you will see `Camunda Platform`, indicating designed compatibility with Camunda 7.

`modeler:executionPlatformVersion` should be set to `8.2.0`. Prior to this change, you will see `7.19.0` or similar.

:::info
Web Modeler will automatically update `modeler:executionPlatform` and `modeler:executionPlatformVersion` to the correct values when you upload a DMN file.
:::

### General considerations

The following elements/attributes are **not** supported in Camunda 8:

- `History Time to Live`
- You cannot select the `Expression Language`, only FEEL is supported
- The property `Input Variable` is removed. In FEEL, the input value can be accessed by using `?` if needed.

Furthermore, legacy behavior can still be executed but the following should be kept in mind:

- Remove data types `integer` + `long` + `double` in favor of `number` for inputs and outputs (in FEEL, there is only a number type represented as `BigDecimal`).

### Decisions

The following attribute can be migrated:

- `camunda:versionTag` to `extensionElements > zeebe:versionTag value`
