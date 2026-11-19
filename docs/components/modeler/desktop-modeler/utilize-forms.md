---
title: Build and deploy your first form
sidebar_label: Tutorial - Build a form
description: "Learn how to use, model, and deploy Camunda Forms."
---

<span class="badge badge--beginner">Beginner</span>
<span class="badge badge--medium">Time estimate: 15 minutes</span>

In this tutorial, you build a form in Desktop Modeler, link it to a user task, and deploy and run the process. Tasklist renders the form for every task assigned to it. You need a BPMN diagram with a user task and a [connection to Camunda 8](./connect-to-camunda-8.md).

## Create a form

1. Click **File > New file > Form (Camunda 8)**.
1. From the **Components** palette on the left, drag a **Text area** to the **Form definition** editor.
1. Select the **Text area**.
1. In the properties panel on the right, open the **General** section and enter the following:

   | Field             | Value                              |
   | ----------------- | ---------------------------------- |
   | Field label       | `Email content`                    |
   | Field description | `The content of the email message` |

1. Deselect the text area so the properties panel shows the form's properties.
1. In the **General** section, copy the form's ID.
1. Click **File > Save File As...** and name the file `email-form`.

To explore all form elements, see the [Camunda Forms reference](/components/modeler/forms/camunda-forms-reference.md).

## Link the form to a user task

1. Open the diagram where you want to use the form.
1. Select the user task.
1. In the properties panel, in the **Form** section, select type **Camunda Form**.
1. For **Form ID**, paste the ID you copied.
1. Save the BPMN file.

## Deploy a form

Deploy both the form and the process before you run a process instance.

1. Open the form.
1. At the bottom of the view, select a connection, and click the rocket-shaped **Deploy** icon.
1. Click **Deploy Form**.
1. Open the BPMN process, click the **Deploy** icon, and click **Deploy BPMN**.

## Run the process

1. Click the play icon, then click **Start BPMN process instance**.
1. Monitor the instance in [Operate](/components/operate/operate-introduction.md).
1. To complete the user task, open [Tasklist](/components/tasklist/introduction-to-tasklist.md).

## Next steps

- [Utilize forms in Camunda Hub](/components/hub/workspace/modeler/modeling/utilize-forms.md)
- [User task reference](/components/modeler/bpmn/user-tasks/user-tasks.md)
