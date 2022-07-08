---
id: call-activity-linking
title: Call activity linking
description: Call activity linking
---

You can use one of the following approaches to link the process to be called by a [call activity](/components/modeler/bpmn/call-activities/call-activities.md).

### Using the link button

1. Select a call activity task from the canvas and a link button will appear at the bottom right.
2. Click on the button and choose any diagram from the same project.
3. Click on the `Link` button to complete the linking process. The process ID of the diagram you chose to link will automatically be copied to the `Called element` section in the Properties Panel.

![overlay](img/overlay.png)

For call activities that are already linked, the button appears even when the element is not selected. Clicking on the button opens a dialog which shows the name of the diagram that the call activity is linked to. It is possible to navigate to the linked diagram by clicking on it or you can use the `Unlink` button to remove the link.

![overlay](img/linked.png)

### Using the properties panel

You may also enter the process ID directly in the `Called element` section in the properties panel.

![overlay](img/properties-panel.png)

:::info
Deploying a diagram does not automatically deploy linked diagrams. Please make sure to deploy them separately.
:::
