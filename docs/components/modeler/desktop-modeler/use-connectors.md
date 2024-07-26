---
id: use-connectors
title: Use Connectors
description: "Learn how to use Camunda 8 Connectors in Desktop Modeler."
---

<span class="badge badge--cloud">Camunda 8 only</span>

To use [Camunda 8 Connectors](../../connectors/out-of-the-box-connectors/available-connectors-overview.md) in the Desktop Modeler enable [automatic fetching](#fetch-camunda-8-connector-templates-automatically) of the respective connector templates. Alternatively, for greater control, you may [fetch and configure templates manually](#add-camunda-8-connector-templates-manually).

## Fetch Camunda 8 Connector templates automatically

You can enable automatic fetching of connector templates for [Camunda 8 Connectors](../../connectors/out-of-the-box-connectors/available-connectors-overview.md) through the [`enable-connector-templates` flag](./flags/flags.md#enable-connector-templates). Once set, the app will fetch Camunda 8 Connector templates in the background and you'll be able to use them in your BPMN diagrams.

On startup a notification will indicate whether the templates are up to date or have been updated.

![Camunda Connector templates up to date notification](./img/use-connectors/up-to-date.png)

In case of an error you'll see a nofication, too.

![Error updating Camunda Connector templates notification](./img/use-connectors/error.png)

Once fetched, you'll be able to use the templates in the Camunda 8 BPMN editor.

![Using Camunda Connector templates in the Camunda 8 BPMN editor](./img/use-connectors/apply.png)

## Add Camunda 8 Connector templates manually

For greater control you can download individual Camunda 8 Connector templates manually through the [Camunda Marketplace website](https://marketplace.camunda.com/) and make them available in Desktop Modeler via the [standard element template search paths](./element-templates/configuring-templates.md).

## Additional resources

- [Learn about Camunda 8 Connectors](../../connectors/out-of-the-box-connectors/available-connectors-overview.md)
- [Desktop Modeler flags documentation](./flags/flags.md)
