---
id: form-linking
title: Form linking
description: Use one of the following approaches to link a form to a user task or none start event.
---

import FormLinkOverlayImg from './img/utl_overlay.png';
import FormLinkOverlayLinkedImg from './img/utl_linked.png';

You can use one of the following approaches to link a form to a [user task](/components/modeler/bpmn/user-tasks/user-tasks.md) or a [none start event](/components/modeler/bpmn/none-events/none-events.md#none-start-events).

:::tip
By linking a Camunda Form to a start event, process instances can be started with the form's input [via a public form](/components/modeler/web-modeler/advanced-modeling/publish-public-processes.md) (SaaS only) or directly [in Tasklist](/components/tasklist/userguide/starting-processes.md).
:::

## Using the link button

1. Select a user task or none start event from the canvas and a link button will appear at the bottom right.
2. Click on the button and choose any form from the same project.
3. Click the **Link** button to complete the linking process.
   In the properties panel, the value **Camunda Form (linked)** is chosen for the **Type** property, and the form ID of the form you chose to link is automatically copied to the **Form ID** section.

<img src={FormLinkOverlayImg} style={{width: 400}} alt="Linking a Camunda Form" />

For user tasks/start events that are already linked, clicking on the link button opens a dialog which shows a preview of the form the user task is linked to.
It is possible to navigate to the linked form by clicking on it, or you can use the **Unlink** button to remove the link.

<img src={FormLinkOverlayLinkedImg} style={{width: 400}} alt="Linked Camunda Form preview" />

## Using the properties panel

Using the properties panel, you can connect a form to a user task/start event via the **Form** section by choosing between different types.

### Camunda Form (linked)

Choosing **Camunda Form (linked)** as type and entering form ID directly yields the same result as [using the link button on the modeling canvas](#using-the-link-button).

Using this type of linking is the recommended approach as it allows you to benefit from the form automatically being deployed along with the diagram.
This means when deploying a BPMN diagram, Web Modeler will always deploy the latest version of all linked forms along with the diagram, so you do not have to manually re-link forms or [copy & paste JSON configuration](#camunda-form-embedded) when making changes.

:::danger
When deploying a diagram, Web Modeler will always deploy the latest version of all linked forms along with the diagram.
This means that if you reference the same Form ID within multiple BPMN diagrams, all diagrams will always use the latest version of the form regardless of which version was used when the diagram was initially deployed.
:::

:::info
To deploy to a Camunda 8 cluster with a version lower than 8.4, linked forms will be automatically embedded into the BPMN diagram's XML to guarantee backwards compatibility.
This conversion will only be applied to the XML deployed to the cluster; the diagram in Web Modeler will not be changed.
:::

### Camunda Form (embedded)

When choosing **Camunda Form (embedded)** as type you have the option to directly paste the form's JSON schema into the **Form JSON configuration** field of the properties panel.
The form will be embedded directly into the BPMN diagram's XML representation.

This approach is not recommended anymore as it makes it harder to maintain the form and the diagram separately.
You will have to manually copy and paste the form's JSON schema into the properties panel every time you make a change to the form instead of benefiting from the advantages of linked forms [described above](#camunda-form-linked).

Use this option to ensure that the embedded form does not change when you or someone else makes a change to the source form.

### Custom form key

Choose **Custom form key** (only available for user tasks) to create a custom reference to an external form, application, or web page, that you can consume in your custom applications.
Read more in the [user task forms reference](/components/modeler/bpmn/user-tasks/user-tasks.md#user-task-forms).
