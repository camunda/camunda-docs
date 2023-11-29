---
id: user-task-linking
title: User task linking
description: Use one of the following approaches to link the form to be called by a user task.
---

import FormLinkOverlayImg from './img/utl_overlay.png';
import FormLinkOverlayLinkedImg from './img/utl_linked.png';

You can use one of the following approaches to link a form to a [user task](/components/modeler/bpmn/user-tasks/user-tasks.md).

## Using the link button

1. Select a user task from the canvas and a link button will appear at the bottom right.
2. Click on the button and choose any form from the same project.
3. Click the **Link** button to complete the linking process.
   In the properties panel, the value **Camunda form (linked)** is chosen for the **Type** property, and the form ID of the form you chose to link is automatically copied to the **Form ID** section.

<img src={FormLinkOverlayImg} style={{width: 400}} alt="Linking a Camunda form" />

For user tasks that are already linked, clicking on the link button opens a dialog which shows a preview of the form the user task is linked to.
It is possible to navigate to the linked form by clicking on it, or you can use the **Unlink** button to remove the link.

<img src={FormLinkOverlayLinkedImg} style={{width: 400}} alt="Linked Camunda form preview" />

## Using the properties panel

Using the properties panel, you can connect a form to a user task via the **Form** section by choosing between different types.

### Camunda form (linked)

Choosing **Camunda form (linked)** as type and entering form ID directly yields the same result as [using the link button on the modeling canvas](#using-the-link-button).

Using this type of linking is the recommended approach as it allows you to benefit from the form automatically being deployed along with the diagram.
This means when deploying a BPMN diagram, Web Modeler will always deploy the latest version of all linked forms along with the diagram, so you do not have to manually re-link forms or [copy & paste JSON configuration](#camunda-form-embedded) when making changes.

:::danger
When deploying a diagram, Web Modeler will always deploy the latest version of all linked forms along with the diagram.
This means that if you reference the same Form ID within multiple BPMN diagrams, all diagrams will always use the latest version of the form regardless of which version was used when the diagram was initially deployed.
:::

:::info
In case you want to deploy to a Camunda 8 cluster with a version lower than 8.4, linked forms will be automatically embedded into the BPMN diagram's XML to guarantee backwards compatibility.
This conversion will only be applied to the XML deployed to the cluster, the diagram in Web Modeler will not be changed.
:::

### Camunda form (embedded)

When choosing **Camunda form (embedded)** as type you have the option to directly paste the form's JSON schema into the **Form JSON configuration** field of the properties panel.
The form will be embedded directly into the BPMN diagram's XML representation.

This approach is not recommended anymore as it makes it harder to maintain the form and the diagram separately.
You will have to manually copy & paste the form's JSON schema into the properties panel every time you make a change to the form instead of benefiting from the advantages of linked forms [described above](#camunda-form-linked).

### Custom form key

Choosing **Custom form key** as type can be used to link to an external task form in custom applications.
Read more in the [user task forms reference](/components/modeler/bpmn/user-tasks/user-tasks.md#user-task-forms).
