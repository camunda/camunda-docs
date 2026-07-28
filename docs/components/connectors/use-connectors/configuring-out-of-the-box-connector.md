---
id: configuring-out-of-the-box-connectors
title: Integrate a built-in connector
description: "Ready to use out of the box, connectors help automate complex business processes by inserting them into BPMN diagrams."
keywords: [connector, modeling, connectors, low-code, no-code]
---

Integrate a [built-in connector](/components/connectors/introduction.md) to reduce the time it takes to automate and orchestrate business processes across systems.

## About

With built-in connectors, you can automate complex [business processes](/components/concepts/processes.md) by inserting them into [BPMN diagrams](/components/modeler/bpmn/automating-a-process-using-bpmn.md) within your [Camunda Hub](/components/modeler/about-modeler.md) projects and configuring them with the properties panel.

You can also orchestrate APIs, for example by working with a [REST connector](/guides/getting-started-orchestrate-apis.md). Learn more about [types of connectors](/components/connectors/connector-types.md).

Connectors technically consist of two parts:

- The business logic is implemented as a [job worker](/components/concepts/job-workers.md)
- The user interface during modeling is provided using an element template.

In this tutorial, you'll walk step-by-step through the implementation of a sample connector.

## Prerequisites

Before you begin, ensure you have:

- [A Camunda 8 account](/components/hub/organization/manage-organization-settings/manage-plan/create-account.md).
- [A SendGrid account](https://signup.sendgrid.com/). You'll use SendGrid in the example connector. Once you've created your account, you will immediately be prompted to create a [sender](https://docs.sendgrid.com/ui/sending-email/senders).
- [A Camunda Hub workspace](/components/hub/organization/manage-workspaces/index.md). This is typically provisioned by a center of excellence team.

### Create a cluster

import CreateCluster from '../../../components/react-components/create-cluster.md'

<CreateCluster/>

## Import a diagram

1. Download the following files:
   - <a href="/bpmn/connectors/submit-expense.bpmn" download>`submit-expense.bpmn`</a>: A process for submitting expenses for approval.
   - <a href="/bpmn/connectors/upload-receipt.form" download>`upload-receipt.form`</a>: A form for uploading receipts.
   - <a href="/bpmn/connectors/approve-receipt.form" download>`approve-receipt.form`</a>: A form for approving receipts.
2. Log in to your Camunda 8 account.
3. In your Camunda Hub workspace, click **New project**, and name your project `Expense process`.
4. In your project, delete the default diagram, and click **Create new > Upload files**.
5. Upload `submit-expense.bpmn`, `upload-receipt.form`, and `approve-receipt.form`.

Open **submit-expense** to see the process you'll be working with throughout this tutorial:

<div bpmn="connectors/submit-expense.bpmn" />

:::note
To learn more about building your own BPMN diagram from scratch, visit our guide on [automating a process using BPMN](/components/modeler/bpmn/automating-a-process-using-bpmn.md).
:::

## Add a connector

At the beginning of the process, a receipt is ready and uploaded for review. The next task is to notify the manager of the uploaded receipt.

To accomplish this, you'll use SendGrid to send an email:

1. With the **submit-expense** diagram open, make sure you're in [**Implement** mode](/components/hub/workspace/modeler/collaboration/implement-your-process.md).
2. Click the **Notify manager of receipt** task.
3. Click **Change element**.
4. Search for **SendGrid Outbound Connector**. If you're using Self-Managed, you may need to download it from the connector marketplace.
5. Open the **Details** panel on the right side of the modeling interface.
6. Under **Properties**, configure the following sections:
   - **Authentication:** [Full Access API Key](https://www.twilio.com/docs/sendgrid/ui/account-and-settings/api-keys#creating-an-api-key)
   - **Sender:** Name and email address. Make sure [this email is verified by SendGrid](https://www.twilio.com/docs/sendgrid/ui/sending-email/sender-verification).
   - **Receiver:** Name and email address
   - **Compose email:** Email contents

The connector is ready to use.

:::note
Camunda offers a variety of available connectors. For example, utilize cloud connectors to communicate with cloud-native applications and conform to REST, GraphQL, or SOAP protocols. Or, employ service connectors to integrate with technology enablers like RPA, AI or IOT services. Learn more about our [available connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md) to find out which may best suit your business needs.
:::

## Execute your process diagram

If you change a diagram and it is auto-saved, this has no effect on your cluster(s). When you deploy the diagram, it becomes available on the selected cluster, and new instances can start.

To execute your completed process with the diagram open:

1. Make sure you're in [**Implement** mode](/components/hub/workspace/modeler/collaboration/implement-your-process.md).
2. Click **Deploy and run**.

You can now monitor your instances in [Operate](/components/operate/operate-introduction.md).

:::note
Variables are part of a process instance and represent the data of the instance. To learn more about these values, variable scope, and input/output mappings, visit our documentation on [variables](/components/concepts/variables.md).
:::

## Observe your running process

After the [user task](/guides/getting-started-orchestrate-human-tasks.md) **Upload receipt** is completed in [Tasklist](/components/tasklist/introduction-to-tasklist.md), an email is automatically sent to the address you specified in the SendGrid connector's properties panel.

In [Operate](/components/operate/operate-introduction.md), you will now see the process move forward to **Review receipt**.

## Additional resources and next steps

- [Use connectors in your BPMN process](/components/connectors/use-connectors/index.md)
- [Available connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md)
- [Connectors & Integration Framework](https://camunda.com/platform/modeler/connectors/)
- [Camunda BPMN Tutorial](https://camunda.com/bpmn/)
- [Camunda Academy: How To Configure the SendGrid Connector](https://academy.camunda.com/c8-h2-sendgrid-connector/)
