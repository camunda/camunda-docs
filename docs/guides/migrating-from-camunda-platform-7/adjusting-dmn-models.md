---
id: adjusting-dmn-models
title: Adjusting DMN models
description: "Learn how to adjust your DMN models when migrating from Camunda Platform 7 to Camunda Platform 8."
---

For Camunda Platform 8, [a former community extension](https://github.com/camunda-community-hub/dmn-scala), built by core Camunda developers, is productized. This engine has a higher coverage of DMN elements. This engine can execute DMN models designed for Camunda Platform 7, however, there are some small differences listed below.

You can use the above mentioned tooling to convert your DMN models from Camunda Platform 7 to Camunda Platform 8.

The following elements/attributes are not supported :

- `Version Tag` is not supported in Camunda Platform 8
- `History Time to Live` is not supported in Camunda Platform 8
- You cannot select the `Expression Language` in Camunda Platform 8, only FEEL is supported
- The property `Input Variable` is removed, in FEEL, the input value can be accessed by using `?` if needed

Furthermore, there are changes that might interesting, but legacy behavior can still be executed:

- Removed data types `integer` + `long` + `double` in favor of `number` for inputs and outputs (in FEEL, there is only a number type represented as `BigDecimal`)
