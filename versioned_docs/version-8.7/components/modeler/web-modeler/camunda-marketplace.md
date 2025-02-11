---
id: camunda-marketplace
title: Camunda Marketplace
description: "Visit the Camunda Marketplace to browse available resources, and incorporate them into your project."
---

Discover the **Camunda Marketplace**, your go-to destination for leveraging various contributions from the Camunda community, trusted partners, and the Camunda team.

Follow our intuitive guides to explore and harness Connectors and blueprints using Web Modeler. If you prefer to utilize these resources within Desktop Modeler, download them directly from the [Camunda Marketplace website](https://marketplace.camunda.com).

If you are a **[Web Modeler Self-Managed](/self-managed/modeler/web-modeler/installation.md)** user, be aware that your organization may restrict access to marketplace resources. If you are unsure about your organization's access, contact your organization's owner for clarification.

## Browse Marketplace Connectors

:::note
Connectors created by partners or the community are not part of the commercial Camunda product. Camunda does not support these Connectors as part of its commercial services to enterprise customers. Please evaluate each client to make sure it meets your requirements before using.
:::

To navigate to the Camunda Marketplace, take the following steps:

1. Log in to your Camunda account.
2. Click on an existing project, or create a new project by clicking **New project > Create new > BPMN diagram**.
3. While modeling your BPMN diagram, you can incorporate Marketplace Connectors from the append menu. The append menu can be accessed in three ways:

- From the canvas, select an element and click the **Change element** icon.
- From the properties panel on the right side of the screen, navigate to the **Template** section and click **Select**.
- From the side palette, click the **Create element** icon.
  ![change element](./img/change-element.png)

4. Click the **blue shop icon** next to Change element to open the Camunda Marketplace modal.
   ![marketplace icon](./img/marketplace-icon.png)
5. Browse [available Connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md), tick the boxes on the left side of the modal to implement filters, and search for a specific Connector by typing in the **Search for a connector** search bar.
   ![camunda marketplace](./img/connector-marketplace.png)

:::note
Want to learn more about a Connector before applying it to your diagram? Every Connector in the Camunda Marketplace offers additional documentation by clicking the **Documentation** link inside the Connector's box. This will open a new tab in your browser of the [Camunda Marketplace](https://marketplace.camunda.com/) and additional details for the Connector you selected.
:::

## Download a Connector to your diagram

Once you find a Connector you want to integrate into your BPMN diagram, click **Download to project**. The resource is then downloaded from the Camunda Marketplace into your project.

Scroll down in the change type context menu and click on your downloaded Connector to change the type of existing task. You can then add the required details in the properties panel on the right side of the screen.

After downloading, you may view a modal reading **Connector already exists**:

- By clicking **Save as copy**, you are not overwriting the current Connector. Instead, you are saving this as a new file you can edit.
- By clicking **Replace resource**, you are replacing the current Connector. If you are downloading a Connector from the Camunda Marketplace, it is read-only and you can view it if you are opening the template using the Camunda template editor. To edit the Connector, click **Customize template** to duplicate this template.

:::note
You can also host custom Connectors developed with [Connector SDK](/components/connectors/custom-built-connectors/connector-sdk.md). Instead of viewing **Download to project**, it may read [**Learn more about self-hosted Connectors**](/guides/host-custom-connector.md).

For the out-of-the-box Connectors provided by Camunda, the Connectors Bundle project provides a set of all Connector templates related to one release version. These are templates that are reusing the Camunda Connectors via the [Protocol Connector Approach](/components/connectors/protocol/rest.md).

This means a developer created a template and reused one of the Camunda Connector runtimes. Only for these templates is direct **Download to project** available.
:::

## Browse Marketplace blueprints

1. Log in to your Camunda account and navigate to Web Modeler by clicking the Camunda components icon in the top left corner of your console, and then select Modeler.
2. Select an existing project or create a new one within the projects tab.
3. If you initiate a project with a pre-defined blueprint, navigate to the Marketplace modal by clicking on **Browse blueprints**. If you wish to incorporate it into an existing project, open the **Create new** dropdown and select **Browse blueprints**.
   ![Browse-blueprints-ctas](./img/browse-blueprints-ctas.png)
4. Within the modal, you'll discover a variety of blueprints submitted by Camunda, partners, or community members to the **Camunda Marketplace**. These can include BPMN, DMN, and/or Form files. Utilize the sidebar to filter blueprints by use case, or leverage the sub-navigation to search and filter by industry, creator, or supported Camunda version.
   ![Marketplace-modal-blueprints](./img/marketplace-modal-blueprints.png)
5. Once you've found the desired blueprint, click **Use blueprint** to open it in Web Modeler and start your work. The blueprint will be automatically saved within the project you initiated.
6. If you can't find the right blueprint, you can suggest ideas in our [Idea Portal](https://marketplace.camunda.com/en-US/pages/connectorsIdeaPortal) or contribute your own process to the [Camunda Marketplace](https://marketplace.camunda.com/en-US/pages/submissionMenu).

## Additional resources

- Learn more about our available [out-of-the-box Connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md).
- Understand different [Connector types](/components/connectors/connector-types.md).
- Learn how to modify BPMN elements with [Connector templates](/components/connectors/custom-built-connectors/connector-templates.md) to create custom modeling experiences.
