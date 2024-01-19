---
id: migrating-from-cawemo
title: Migrate diagrams from Cawemo
description: "Migrating diagrams from Cawemo to Camunda 8 Web Modeler"
---

<span class="badge badge--beginner">Beginner</span>
<span class="badge badge--medium">Time estimate: 5 minutes</span>

:::note End of life notification
**Effective 30th April 2024**

As part of our ongoing commitment to enhance collaboration between Business and IT teams, we at Camunda have been diligently working to evolve our product offerings.

In line with this vision and based on insightful customer conversations, we have already combined the power of Cawemo and our Desktop Modeler to create [Web Modeler](/components/modeler/about-modeler.md), which is the successor to Cawemo. Web Modeler is designed to significantly improve time to value for both developers and business users by fostering a unified environment that enhances collaboration.

**Key transition information:**

End of Life for Cawemo SaaS: Effective 30th April 2024, the Cawemo SaaS service will be retired for all customers and users. This decision aligns with our strategic focus on delivering an integrated, comprehensive modeling experience.

Data access and transition deadline: This means that you have until the 30th of April to export your data and transition. Please be advised that after the 30th of April, you will not be able to access data within Cawemo SaaS. In line with our data retention policy, your data will be stored for an additional 30 days after this date. It is crucial to export any required data before the 30th of April to ensure you retain access to your information.

**Transition Options:**

- Move to [Web Modeler](/docs/components/modeler/web-modeler/new-web-modeler.md): Experience the combined power of Cawemo and our Desktop Modeler in a seamless, collaborative environment. For modeling only or Camunda 8 processes.
- Move to [Desktop Modeler](/components/modeler/desktop-modeler/install-the-modeler.md): Opt for a standalone BPMN modeling experience. Support both Camunda 7 and Camunda 8 processes.
- Move to Cawemo On-Premise: Continue with the familiar Cawemo environment, for modeling only or Camunda 7 processes. Please note that support for Cawemo On-Premise aligns with Camunda 7 timelines.

We understand that change can be challenging, and our team is dedicated to ensuring a smooth transition for you and your organization. For any queries or support during this transition phase, reach out to your account team.
:::

This guide steps through how to migrate BPMN diagrams created in Cawemo to Camunda 8 [Web Modeler](https://modeler.cloud.camunda.io/).

You should consider migrating diagrams from Cawemo to Camunda 8 Web Modeler if:

- You want to continue working on your diagrams on the latest Camunda version.
- You are exploring automating your processes.
- You are in need of certain features that can only be found in Camunda 8 (e.g. [BPMN message buffering](/components/concepts/messages.md#message-buffering), big [multi-instance constructs](/components/modeler/bpmn/multi-instance/multi-instance.md), the [Connectors framework](/components/connectors/introduction.md), or the improved [collaboration features](/components/modeler/web-modeler/collaboration.md) in Web Modeler).

## Prerequisites

- Ensure you have a valid [Camunda 8 account](/guides/create-account.md), or sign up if you still need one.
- A BPMN diagram in your Cawemo account.

## Migrate your BPMN diagram

Take the following steps to migrate your BPMN diagram in Cawemo to Camunda 8 [Web Modeler](/components/modeler/web-modeler/launch-cloud-modeler.md):

1. Log in to Cawemo.
2. Click the **Project** folder on the **Home** page of the BPMN diagram you want to transfer.
3. Click on the BPMN diagram you want to transfer.

:::caution
If the BPMN file has been uploaded to Cawemo from Desktop Modeler for execution on Camunda 7, the file cannot be uploaded to Web Modeler.
:::

4. Click **Download** or **export**.
5. Click **Download as BPMN 2.0 XML**.
6. Log in to Camunda 8.
7. Click **Modeler** to open Web Modeler.
8. Open the project you want to transfer your BPMN file to or create a new project by clicking **New project**.
9. Click **New** > **Upload files**.
10. Open the BPMN XML file downloaded from Cawemo.

:::note
While unsupported elements are imported in Web Modeler, they are not supported for deployment and will be highlighted in the error panel.
:::

## Additional resources

Not all elements in Cawemo are supported in Camunda 8 Web Modeler. Find details on BPMN coverage in Camunda 8 in the [BPMN coverage documentation](/components/modeler/bpmn/bpmn-coverage.md). We are investing in supporting the elements currently available on Camunda 7.

## Next steps

Learn more about [migrating from Camunda 7 to Camunda 8](/guides/migrating-from-camunda-7/index.md).

:::note
When you get the error `The following 1 file is invalid and can't be uploaded: ""` when uploading your BPMN file, it means a BPMN file for execution on Camunda 7 created with Desktop Modeler - or another BPM tool using BPMN to execute processes - has been uploaded to Cawemo. Find details in [migrating from Camunda 7 documentation under migration overview](/guides/migrating-from-camunda-7/index.md#migration-overview) to solve the error.
:::
