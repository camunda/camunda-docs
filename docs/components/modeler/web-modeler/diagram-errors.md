---
id: diagram-errors
title: Diagram errors
description: This feature will assist you in correcting errors in your processes.
---

### Lint errors

Web Modeler continuously validates the implementation properties in the diagram while the user is modeling, based on a set of lint rules. The validation errors are added to the error panel at the bottom. The user has to expand the error panel to be able to see the errors.

![error panel](img/diagram-errors/error-panel.png)

### Expand / collapse

The error panel can be expanded or collapsed by clicking anywhere on the header. The panel is collapsed by default and the latest state (expanded or collapsed) is remembered.

### Version selection

The version selector can be used to choose the Zeebe version that the diagram is validated against. The version chosen here should match the Zeebe version of the cluster that the diagram is going to be deployed in, to get the correct set of errors. The version selector also provides information about the number of clusters available for each Zeebe version within the current organization.

![error panel](img/diagram-errors/version-selector.png)

### Interactivity

The diagram errors are interactive. Clicking on the element ID will highlight the corresponding element in the canvas and also highlight the property if the error is in a property.

![error panel](img/diagram-errors/interactivity.png)

### Engine errors

Not all errors are currently covered by the lint rules. These errors which are caught during deployment or execution and thrown by the engine are also shown in the same error panel. At present, we do not support interactivity for these errors.

![error panel](img/diagram-errors/engine-error.png)
