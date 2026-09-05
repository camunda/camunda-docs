---
id: form-linking
title: Form linking
description: Use one of the following approaches to link a form to a user task or none start event.
---

You can use one of the following approaches to link a form to a [user task](/components/modeler/bpmn/user-tasks/user-tasks.md) or a [none start event](/components/modeler/bpmn/none-events/none-events.md#none-start-events).

:::tip
By linking a Camunda Form to a start event, process instances can be started directly [in Tasklist](/components/tasklist/userguide/starting-processes.md) or through your own application built on the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).
:::

## Using the link button

1. Select a user task or none start event from the canvas. A link icon appears in the floating menu.
2. Click the link icon, and choose any form from the same project.
3. Click **Link** to complete the linking process. In the properties panel on the right side of the screen, the value **Camunda Form (linked)** is chosen for the **Type** property, and the form ID of the form you chose to link is automatically copied to the **Form ID** section.

For user tasks/start events that are already linked, clicking the link button opens a dialog which shows a preview of the form the user task is linked to.
It is possible to navigate to the linked form by clicking on it. You can use the **Unlink** button to remove the link.

## Using the properties panel

You can also connect a form in the properties panel:

1. Select a business rule task from the canvas.
2. On the right side of the canvas, open the **Details** panel.
3. Under **Properties > Form**, select the **Type**:
   - [Camunda Form](#camunda-form)
   - External form reference

### Camunda Form (linked)

Choosing **Camunda Form**, or **Camunda Form (linked)** in the case of a **Job worker** implementation, as the type and entering the form ID directly produces the same result as [using the link button on the modeling canvas](#using-the-link-button).

- **Binding**: You can also select a different binding for the called decision. See [choosing the resource binding type](/components/best-practices/modeling/choosing-the-resource-binding-type.md).
- **Version tag**: If you select **version tag** for the binding, you must enter the actual version tag to use.

Using a linked form is the recommended approach as it allows you to manage form versions independently from the diagram.

When deploying a BPMN diagram, Camunda Hub deploys all resources, including linked forms by default. To deploy the diagram only, select **Resources to deploy > Only this resource** in the deployment modal. You are responsible for ensuring the correct form version is deployed and available to your process.

:::info
To deploy to a Camunda 8 cluster with a version lower than 8.4, linked forms will be automatically embedded into the BPMN diagram's XML to guarantee backwards compatibility.
This conversion will only be applied to the XML deployed to the cluster; the diagram in Camunda Hub will not be changed.
:::

### Camunda Form (embedded)

:::info
Embedded forms are only supported for job worker-based user tasks. They are not available for the [Camunda user task implementation type](/components/modeler/bpmn/user-tasks/user-tasks.md#user-task-implementation-types).
:::

When choosing **Camunda Form (embedded)** as type you have the option to directly paste the form's JSON schema into the **Form JSON configuration** field of the properties panel.
The form will be embedded directly into the BPMN diagram's XML representation.

This approach is not recommended anymore as it makes it harder to maintain the form and the diagram separately.
You will have to manually copy and paste the form's JSON schema into the properties panel every time you make a change to the form instead of benefiting from the advantages of linked forms [described above](#camunda-form-linked).

Use this option to ensure that the embedded form does not change when you or someone else makes a change to the source form.

### Custom form key

Choose **Custom form key** (only available for job worker-based user tasks) to create a custom reference to an external form, application, or web page, that you can consume in your custom applications.
Read more in the [user task forms reference](/components/modeler/bpmn/user-tasks/user-tasks.md#user-task-forms).
