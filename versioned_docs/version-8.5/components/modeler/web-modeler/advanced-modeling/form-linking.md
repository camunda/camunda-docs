---
id: form-linking
title: Form linking
description: Use one of the following approaches to link a form to a user task or none start event.
---

import FormLinkOverlayImg from './img/utl_overlay.png';
import FormLinkOverlayLinkedImg from './img/utl_linked.png';
import IssueLinkedFormSolution01 from './img/linked_issue01.png';
import IssueLinkedFormSolution02 from './img/linked_issue02.png';
import IssueLinkedFormSolution03 from './img/linked_issue03.png';
import IssueLinkedFormSolution04 from './img/linked_issue04.png';

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

#### Known issues with linked forms

##### Wrong form used for user task - [zeebe/#16311](https://github.com/camunda/camunda/issues/16311)

Some users have encountered an issue that was present in Camunda `8.4.0`, `8.4.1`, and `8.4.2` where linked forms did not correspond correctly to their tasks, leading to discrepancies in workflow execution. We have identified and rectified this issue in the Camunda `8.4.3` release, ensuring that tasks are now generated with the correct forms, as intended in your workflow design.

###### How to fix the issue - Regenerate tasks with correct forms

To correct any instances affected by this issue, we recommend the following steps after updating to Camunda `8.4.3`:

1. Navigate to [Operate](/components/operate/operate-introduction.md) to access your workflow instances impacted by the linked form issue.
2. Select the instances where tasks were generated with the incorrect forms by clicking on their process instance key, and you will be navigated to the process instance view.
3. Move the instance to the same task, effectively restarting the task. To do this, click the wrench icon in the top right corner:

<img src={IssueLinkedFormSolution01} style={{width: 400}} alt="Modify Process instance on Operate" />

4. After this, a popup explaining how process modification works will appear. Click **Continue**, select the active task, and click **Cancel instance**.

<img src={IssueLinkedFormSolution02} style={{width: 400}} alt="process instance modification mode" />

<img src={IssueLinkedFormSolution03} style={{width: 400}} alt="cancel instance" />

5. Click **Add** to add a flow node.

<img src={IssueLinkedFormSolution04} style={{width: 400}} alt="add flow node" />

6. Click **Apply notification** to check if the process is correct.
7. Click **Apply**; a new task should be generated with the correct form.

### Camunda Form (embedded)

When choosing **Camunda Form (embedded)** as type you have the option to directly paste the form's JSON schema into the **Form JSON configuration** field of the properties panel.
The form will be embedded directly into the BPMN diagram's XML representation.

This approach is not recommended anymore as it makes it harder to maintain the form and the diagram separately.
You will have to manually copy and paste the form's JSON schema into the properties panel every time you make a change to the form instead of benefiting from the advantages of linked forms [described above](#camunda-form-linked).

Use this option to ensure that the embedded form does not change when you or someone else makes a change to the source form.

### Custom form key

Choose **Custom form key** (only available for user tasks) to create a custom reference to an external form, application, or web page, that you can consume in your custom applications.
Read more in the [user task forms reference](/components/modeler/bpmn/user-tasks/user-tasks.md#user-task-forms).
