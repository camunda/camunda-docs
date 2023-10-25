---
id: decision-import-plugin
title: "Decision inputs and outputs import customization"
description: "Enrich or filter the Decision inputs and outputs so you can customize which and how these are imported to Optimize."
---

<span class="badge badge--platform">Camunda 7 only</span>

Before implementing the plugin, make sure that you have [set up your environment](./plugin-system.md/#setup-your-environment).

This feature enables you to enrich, modify, or filter the decision input and output instances, e.g., if instances in Camunda contain IDs of instances in another database and you would like to resolve those references to the actual values.

The plugin system contains the following interfaces:

```java
public interface DecisionInputImportAdapter {

  List<PluginDecisionInputDto> adaptInputs(List<PluginDecisionInputDto> inputs);
}
```

```java
public interface DecisionOutputImportAdapter {

  List<PluginDecisionOutputDto> adaptOutputs(List<PluginDecisionOutputDto> outputs);
}
```

Implement these to adjust the input and output instances to be imported. The methods take a list of instances that would be imported if no further action is performed as parameter. The returned list is the customized list with the enriched/filtered instances that will be imported. To create new instances, you can use the `PluginDecisionInputDto` and `PluginDecisionOutputDto` classes as data transfer object (DTO), which are also contained in the plugin system.

:::note
All class members need to be set in order, otherwise the instance is ignored, as this may lead to problems during data analysis.

The data from the engine is imported in batches. This means the `adaptInput/adaptOutput` method is called once per batch rather than once for all data. For instance, if you have 100 000 decision instances in total and if the batch size is 10,000, the plugin function will be called 10 times.
:::

Next, package your plugin into a `jar` file and then add the `jar` file to the `plugin` folder of your Optimize directory. Finally, add the name of the base package of your custom `DecisionOutputImportAdapter/DecisionInputImportAdapter` to the `environment-config.yaml` file:

```yaml
plugin:
  decisionInputImport:
    # Look in the given base package list for decision input import adaption plugins.
    # If empty, the import is not influenced.
    basePackages: ["org.mycompany.optimize.plugin"]
  decisionOutputImport:
    # Look in the given base package list for decision output import adaption plugins.
    # If empty, the import is not influenced.
    basePackages: ["org.mycompany.optimize.plugin"]
```

The following shows an example of a customization of the decision input import in the package `org.mycompany.optimize.plugin`, where every string input is assigned the value 'foo':

```java
package org.mycompany.optimize.plugin;

import org.camunda.optimize.plugin.importing.variable.DecisionInputImportAdapter;
import org.camunda.optimize.plugin.importing.variable.PluginDecisionInputDto;

import java.util.List;

public class SetAllStringInputsToFoo implements DecisionInputImportAdapter {

  public List<PluginDecisionInputDto> adaptInputs(List<PluginDecisionInputDto> inputs) {
    for (PluginDecisionInputDto input : inputs) {
      if (input.getType().toLowerCase().equals("string")) {
        input.setValue("foo");
      }
    }
    return inputs;
  }
}
```

Now, when `SetAllStringInputsToFoo`, packaged as a `jar` file, is added to the `plugin` folder, we just have to add the following property to the `environment-config.yaml` file to make the plugin work:

```yaml
plugin:
  decisionInputImport:
    # Look in the given base package list for decision input import adaption plugins.
    # If empty, the import is not influenced.
    basePackages: ["org.mycompany.optimize.plugin"]
```

For more information and example implementations, have a look at the [Optimize Examples Repository](https://github.com/camunda/camunda-optimize-examples#getting-started-with-decision-import-plugins).
