---
id: businesskey-import-plugin
title: "Business key import customization"
description: "Adapt the process instance import so you can customize the associated business keys."
---

<span class="badge badge--platform">Camunda 7 only</span>

Before implementing the plugin, make sure that you have [set up your environment](./plugin-system.md#setup-your-environment).

This feature enables you to customize business keys during the process instance import, e.g. if your business keys contain sensitive information that requires anonymization.

The Optimize plugin system contains the following interface:

```java
public interface BusinessKeyImportAdapter {

   String adaptBusinessKeys(String businessKey);
}
```

Implement this to adjust the business keys of the process instances to be imported. Given is the business key of a process instance that would be imported if no further action is performed. The returned string is the customized business key of the process instance that will be imported.

The following shows an example of a customization of business keys during the process instance import in the package `optimize.plugin` where every business key is set to 'foo'.

```java
package org.mycompany.optimize.plugin;

import org.camunda.optimize.plugin.importing.businesskey.BusinessKeyImportAdapter;
import java.util.List;

  public class MyCustomBusinessKeyImportAdapter implements BusinessKeyImportAdapter {

  @Override
  public String adaptBusinessKey(String businessKey) {
    return "foo";
  }

}
```

Now, when `MyCustomBusinessKeyImportAdapter`, packaged as a `jar` file, is added to Optimize's `plugin` folder, we just have to add the following property to the `environment-config.yaml` file:

```yaml
plugin:
  businessKeyImport:
    # Look in the given base package list for businesskey import adaption plugins.
    # If empty, the import is not influenced.
    basePackages: ["org.mycompany.optimize.plugin"]
```

For more information on how this plugin works, have a look at the [Optimize Examples Repository](https://github.com/camunda/camunda-optimize-examples#getting-started-with-business-key-import-plugins).
