---
id: camunda-marketplace
title: Camunda Marketplace
description: "Visit the Camunda Marketplace to browse available resources, and incorporate them into your project."
---

Discover the **Camunda Marketplace**, your go-to destination for leveraging various contributions from the Camunda community, trusted partners, and the Camunda team.

## About

Follow our intuitive guides to explore and harness connectors and blueprints using Camunda Hub. If you prefer to utilize these resources within Desktop Modeler, download them directly from the [Camunda Marketplace website](https://marketplace.camunda.com).

In **[Camunda Hub Self-Managed](/self-managed/components/hub/index.md)**, an administrator can [disable Marketplace](/self-managed/components/hub/configuration/properties.md#feature-flags). When Marketplace is disabled, it doesn't appear in **Browse all** or the element-template selector.

## Browse Marketplace connectors while modeling

Connectors created by partners or the community aren't part of the commercial Camunda product. Camunda doesn't support these connectors as part of its commercial services to enterprise customers. Evaluate each connector to make sure it meets your requirements before using it.

To browse Marketplace connectors from a modeling menu:

1. In Camunda Hub, navigate to your workspace.
2. Create or open a project.
3. In the project, click **Create new > BPMN diagram**.
4. Open the **Create element**, **Append element**, or **Change element** menu.
5. Select **Browse all**.
6. Under **Show**, select **Marketplace** or search across all sources.
7. Select **View details** for a connector.

Marketplace cards don't report whether a connector is already in the project. The details check the selected connector and show its included or available elements.

For a complete guide to source filters, project availability, and direct modeling actions, see [find resources with Browse all](./browse-all-resources.md#browse-marketplace-connectors).

### Browse Marketplace from the element-template selector

The element-template selector remains a separate Marketplace path for applying a template to an existing compatible element.

1. Select an element in the diagram.
2. Go to **Details > Properties > Template > Select**.
3. In **Choose element template**, click the blue shop icon.

For complete template-selection steps, see [using templates in Camunda Hub](../element-templates/using-templates.md#applying-templates).

## Add a Marketplace connector to your project

Connector details show which elements are already available in the current project.

- If no elements are available, review **Included elements** and select **Add to project**.
- If some elements are available, use them directly or select **Add remaining elements**.
- If all applicable elements are available, select a **Create**, **Append**, or **Change** action under **Available elements**.

The details can also explain when an installed connector isn't available for the modeling action you started. For a change-element action, Marketplace matching is based on BPMN type only, so confirm the connector's configuration and runtime requirements before using it.

Self-hosted connector cards open **View setup instructions** instead of offering **Add to project**. Follow the linked [self-hosted connector guidance](/components/connectors/custom-built-connectors/host-custom-connector.md) to configure the connector in your environment.

## Connector template versions

The Camunda Marketplace always serves the **latest** version of a connector template. If that version's [`engines.camunda`](/components/modeler/element-templates/template-metadata.md#engine-compatibility-engines) range doesn't cover your cluster version, the connector is listed under **Requires newer Camunda version** and can't be applied to your diagram.

To use an older version, obtain the template file from the connector's source and [upload it as an element template](/components/hub/workspace/modeler/element-templates/manage-element-templates.md#importing-an-existing-element-template) yourself. Camunda's built-in connectors publish previous versions in the `element-templates/versioned` directory of the [`camunda/connectors`](https://github.com/camunda/connectors) repository. For partner and community connectors, availability of previous versions depends on the connector creator.

## Browse Marketplace blueprints

1. In Camunda Hub, navigate to your workspace.
2. Create or open a project.
3. If you initiate a project with a pre-defined blueprint, navigate to the Marketplace modal by clicking on **Browse blueprints**. If you wish to incorporate it into an existing project, click **Create new > Browse blueprints**.
4. Within the modal, you'll discover a variety of blueprints submitted by Camunda, partners, or community members to the **Camunda Marketplace**. These include BPMN, DMN, and/or Form files. Utilize the sidebar to filter blueprints by use case, or leverage the sub-navigation to search and filter by industry, creator, or supported Camunda version.
5. Once you've found the desired blueprint, click **Use blueprint** to open it in Camunda Hub and start your work. The blueprint will be automatically saved within the project you initiated.
6. If you can't find the right blueprint, you can suggest ideas in our [Idea Portal](https://marketplace.camunda.com/en-US/pages/connectorsIdeaPortal) or contribute your own process to the [Camunda Marketplace](https://marketplace.camunda.com/en-US/pages/submissionMenu).

## Additional resources

- [Find resources with Browse all](./browse-all-resources.md).
- Learn more about available [built-in connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md).
- Understand different [Connector types](/components/connectors/connector-types.md).
- Learn how to modify BPMN elements with [Connector templates](/components/connectors/custom-built-connectors/connector-templates.md) to create custom modeling experiences.
