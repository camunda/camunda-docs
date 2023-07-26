---
id: adjusting-dmn-models
title: Adjusting DMN models
description: "Learn how to adjust your DMN models when migrating from Camunda Platform 7 to Camunda Platform 8."
---

For Camunda Platform 8, [a former community extension](https://github.com/camunda-community-hub/dmn-scala), built by core Camunda developers is productized. This engine has a higher coverage of DMN elements. This engine can execute DMN models designed for Camunda Platform 7. However, there are some small differences as outlined in this document.

You can use the tooling mentioned above to convert your DMN models from Camunda Platform 7 to Camunda Platform 8.

The following elements/attributes are **not** supported in Camunda Platform 8:

- `Version Tag`
- `History Time to Live`
- You cannot select the `Expression Language`, only FEEL is supported
- The property `Input Variable` is removed. In FEEL, the input value can be accessed by using `?` if needed.

Furthermore, there are changes that might interesting, but legacy behavior can still be executed:

- Removed data types `integer` + `long` + `double` in favor of `number` for inputs and outputs (in FEEL, there is only a number type represented as `BigDecimal`).
