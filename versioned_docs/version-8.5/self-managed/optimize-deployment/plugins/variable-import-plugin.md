---
id: variable-import-plugin
title: "Variable import customization"
description: "Enrich or filter the variable import so you can customize which and how variables are imported to Optimize."
---

<span class="badge badge--platform">Camunda 7 only</span>

Before implementing the plugin, make sure that you have [set up your environment](./plugin-system.md#set-up-your-environment).

This feature enables you to enrich or filter the variable import, e.g., if variables in Camunda contain IDs of variables in another database and you would like to resolve those references to the actual values.

The Optimize plugin system contains the following interface:

```java
public interface VariableImportAdapter {

  List<PluginVariableDto> adaptVariables(List<PluginVariableDto> variables);
}
```

Implement this to adjust the variables to be imported. Given is a list of variables that would be imported if no further action is performed. The returned list is the customized list with the enriched/filtered variables that will be imported. To create new variable instances, you can use the `PluginVariableDto` class as data transfer object (DTO), which is also contained in the plugin system.

:::note
All DTO class members need to be set in order, otherwise the variable is ignored, as this may lead to problems during data analysis.

The data from the engine is imported in batches. This means the `adaptVariables` method is called once per batch rather than once for all data. For instance, if you have 100,000 variables in total and the batch size is 10,000, the plugin function will be called 10 times.
:::

The following shows an example of a customization of the variable import in the package `optimize.plugin`, where every string variable is assigned the value 'foo':

```java
package org.mycompany.optimize.plugin;

import org.camunda.optimize.plugin.importing.variable.PluginVariableDto;
import org.camunda.optimize.plugin.importing.variable.VariableImportAdapter;

import java.util.List;

  public class MyCustomVariableImportAdapter implements VariableImportAdapter {

  @Override
  public List<PluginVariableDto> adaptVariables(List<PluginVariableDto> list) {
    for (PluginVariableDto pluginVariableDto : list) {
      if(pluginVariableDto.getType().toLowerCase().equals("string")) {
        pluginVariableDto.setValue("foo");
      }
    }
    return list;
  }

}
```

Now when `MyCustomVariableImportAdapter`, packaged as a `jar` file, is added to Optimize's `plugin` folder, we just have to add the following property to the `environment-config.yaml` file to make the plugin work:

```yaml
plugin:
  variableImport:
    # Look in the given base package list for variable import adaption plugins.
    # If empty, the import is not influenced.
    basePackages: ["org.mycompany.optimize.plugin"]
```

For more information and example implementations, have a look at the [Optimize Examples Repository](https://github.com/camunda/camunda-optimize-examples#getting-started-with-variable-import-plugins).
