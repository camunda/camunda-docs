---
id: use-connectors
title: Use Connectors
description: "Learn how to use Camunda 8 Connectors in Desktop Modeler."
---

<span class="badge badge--cloud">Camunda 8 only</span>

Use  [Camunda 8 Connectors](../../connectors/introduction-to-connectors.md) to access a growing range of external services or communication protocols. 

The Desktop Modeler fetches templates for [pre-built Connectors](../../connectors/out-of-the-box-connectors/available-connectors-overview.md] [automatically](#automatic-connector-template-fetching) and makes them available for use in your Camunda 8 BPMN processes. 
You can [disable this feature](#disable-automatic-connector-template-fetching) and [provide Connector templates manually](#add-camunda-connector-templates-manually) for full control over the building blocks the modeler should offer.

## Automatic Connector template fetching

The modeler fetches and updates templates for [pre-built Camunda connectors](../../connectors/out-of-the-box-connectors/available-connectors-overview.md) periodically [from the Camunda Marketplace](https://marketplace.camunda.com/en-US/listing?pl=3038&attr=20486&cat=107792&locale=en-US). This happens automatically, in the background, unless you [explicitly disable it](#disable-automatic-connector-template-fetching).

After an update check concluded, a notification indicates if the templates are up to date or have been updated:

![Camunda Connector templates up to date notification](./img/use-connectors/up-to-date.png)

In case of an error you'll see a nofication:

![Error updating Camunda Connector templates notification](./img/use-connectors/error.png)

Once fetched, you can use the templates in the Camunda 8 BPMN editor.

![Using Camunda Connector templates in the Camunda 8 BPMN editor](./img/use-connectors/apply.png)

## Disable automatic Connector template fetching

Disable automatic fetching of Connector templates through the [`enable-connector-templates` flag](./flags/flags.md#enable-connector-templates).

## Add Connector templates manually

For full control over building blocks offered by the Desktop Modeler download templates for individual Camunda 8 Connectors manually, i.e. through the [Camunda Marketplace](https://marketplace.camunda.com/). Make them available to the Desktop Modeler via the [standard element template search paths](./element-templates/configuring-templates.md).

## Additional resources

- [About Camunda 8 Connectors](../../connectors/out-of-the-box-connectors/available-connectors-overview.md)
- [Desktop Modeler flags](./flags/flags.md#enable-connector-templates)
