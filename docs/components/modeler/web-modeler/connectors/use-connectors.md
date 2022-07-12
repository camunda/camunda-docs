---
id: use-connectors
title: Use Connectors
description: How to use Connectors in Web Modeler
---

Any task can be transformed into a connector task using the change type context menu item (spanner/wrench icon) to integrate connectors in a business model. Users can search for keywords like REST or email to find specific connectors. To discover all available connectors in Camunda, input the term connector into the search bar.

![](img/use-connectors-context-menu.png)

Alternatively, you can directly create a connector task by using the append context menu item. This will create a new connector task directly following the currently selected element.

![](img/use-connectors-append.png)

Once a connector task is selected, the available configuration will be visible in the properties panel on the right side. The required fields will be highlighted with an error message.

![](img/use-connectors-properties.png)

Fields in the properties panel marked with an equal sign inside a circle indicate that [FEEL](/components/modeler/feel/what-is-feel.md) can be used to configure the property. If the icon includes an equal sign marked with a star, FEEL is required. Using FEEL allows the user to reference process data from variables in the expression to configure the properties.

![](img/use-connectors-feel.png)

Please find the available connectors in Camunda Platform 8 SaaS in the [following pages](/components/modeler/web-modeler/connectors/available-connectors/available-connectors-overview.md).
