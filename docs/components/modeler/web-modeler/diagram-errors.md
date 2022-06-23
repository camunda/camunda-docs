---
id: diagram-errors
title: Diagram errors
description: This feature will assist you in debug and fix errors in your processes.
---

### Lint errors

Web Modeler continuously validates implementation properties for a process diagram while the user is modeling, based on a set of debug rules. The debug rules are added to the debug panel at the bottom of the web modeler. Simply expand the debug panel to be able to see the errors.

![error panel](img/diagram-errors/error-panel.png)

### Expand / collapse

The debug panel can be expanded or collapsed by clicking anywhere on the header. The panel is collapsed by default and the latest state (expanded or collapsed) is remembered when you next open the web modeler.

### Version selection

The version selector can be used to choose the Zeebe version that the diagram is validated against. The version chosen here should match the Zeebe version of the cluster that the diagram is going to be deployed in, to get the correct set of debug errors. The version selector also provides information about the number of clusters available for each Zeebe version within the current organization.

![error panel](img/diagram-errors/version-selector.png)

### Interactivity

The debug errors are interactive - Clicking on the element ID in the error line highlights the corresponding element in the canvas and points to the specific property in the properties panel where you can resolve the issue.

![error panel](img/diagram-errors/interactivity.png)

### Engine errors

Not all errors are currently covered by the debug rules. Engine errors which are shown when you deploy a process and shown in the same debug panel. At present, we do not support interactivity for these errors.

![error panel](img/diagram-errors/engine-error.png)
