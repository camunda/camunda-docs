---
id: use-connectors
title: Use Connectors
description: "Learn how to use Camunda 8 Connectors in Desktop Modeler."
---

<span class="badge badge--cloud">Camunda 8 only</span>

As a user of Camunda 8 and Desktop Modeler you can configure the Desktop Modeler to automatically fetch [Camunda 8 Connector templates](../../connectors/out-of-the-box-connectors/available-connectors-overview.md). Alternatively, you can fetch them manually.

## Enable Automatic Fetching of Camunda 8 Connector templates

If enabled through the `enable-connector-templates` [flag](./flags/flags.md) Camunda 8 Connector templates will be fetched automatically and made available in Desktop Modeler so you're be able to use them in the Camunda 8 BPMN editor.

On startup a notification will indicate whether the templates are up to date or have been updated.

![Camunda Connector templates up to date notification](./img/use-connectors/up-to-date.png)

In case of an error you'll see a nofication, too.

![Error updating Camunda Connector templates notification](./img/use-connectors/error.png)

Once fetched, you'll be able to use the templates in the Camunda 8 BPMN editor.

![Using Camunda Connector templates in the Camunda 8 BPMN editor](./img/use-connectors/apply.png)

## Add Camunda 8 Connector templates manually

Alternatively, you can fetch individual Camunda 8 Connector templates manually through the [Camunda Marketplace website](https://marketplace.camunda.com/) and [make them available in Desktop Modeler](./element-templates/configuring-templates.md).

## Additional resources

- [Learn about Camunda 8 Connectors](../../connectors/out-of-the-box-connectors/available-connectors-overview.md)
- [Desktop Modeler flags documentation](./flags/flags.md)
