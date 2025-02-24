---
id: call-activity-linking
title: Call activity linking
description: Use one of the following approaches to link the process to be called by a call activity.
---

import PropertiesPanelImg from './img/properties-panel.png'

You can use one of the following approaches to link the process to be called by a [call activity](/components/modeler/bpmn/call-activities/call-activities.md).

## Using the link button

1. Select a call activity task from the canvas. A link button appears at the bottom right.
2. Click on the button and choose any diagram from the same project.
3. Click the **Link** button to complete the linking process. The process ID of the diagram you chose to link is automatically copied to the **Called element** section in the properties panel on the right side of the screen.

![overlay](img/overlay.png)

For call activities that are already linked, clicking on the link button opens a dialog which shows the name of the diagram the call activity is linked to. It is possible to navigate to the linked diagram by clicking on it, or you can use the **Unlink** button to remove the link.

![overlay](img/linked.png)

## Using the properties panel

You can also enter the process ID directly in the **Called element** section in the properties panel.

- **Binding**: You can also select a different binding for the called decision. See [choosing the resource binding type](/components/best-practices/modeling/choosing-the-resource-binding-type.md).
- **Version tag**: If you select **version tag** for the binding, you must enter the actual version tag to use.

<p><img src={PropertiesPanelImg} alt="called element section in properties panel" style={{width: 430}} /></p>

:::info
Deploying a diagram does not automatically deploy linked diagrams. Ensure you deploy linked diagrams separately.

You might also consider using a [process application](../process-applications.md) that allows you to deploy all related
diagrams together in a single bundle.
:::
