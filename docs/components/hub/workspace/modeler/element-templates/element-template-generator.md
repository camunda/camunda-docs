---
id: element-template-generator
title: Generate an element template
description: Learn how to generate element or connector templates for easier creation of custom reusable elements.
---

Configure and generate a custom element template in Camunda Hub.

## About

Use this page for both BPMN element templates and connector templates:

- [Generate a BPMN element template](#generate-a-bpmn-element-template).
- [Generate a connector template](#generate-a-connector-template).
- To customize a generated connector template after creation, see [connector templates](/components/connectors/custom-built-connectors/connector-templates.md).

## Best practices

When creating custom-built element templates, consider the [recommended best practices](best-practices.md) to ensure they are effective, user-friendly, and maintainable.

## Generate a BPMN element template

Create a BPMN element template in Camunda Hub.

1. Select the Camunda Hub project where you want to create the template.
2. Click **Create new > Element template**. This opens the **Create new element template** screen.
3. Select **BPMN element**.
4. Choose a starting point for your template:
   - **Call activity**
   - **Event**. Also select an event type.
   - **Task**. Also select a task type.
   - **Blank**. A blank template includes only the basic properties shared by all BPMN elements. With this, you can customize the template from scratch.

Next, [**configure the template details**](#configure-the-template-details).

## Generate a connector template

Create a connector template in Camunda Hub.

You can start from a blank template or import an existing API definition such as an [OpenAPI specification](https://swagger.io/resources/open-api/), [Swagger specification](https://swagger.io/resources/open-api/), or [Postman collection](https://www.postman.com/collection/). For example, download a Postman collection as a YAML file, import it into the generator, and choose which methods to include in the generated template.

1. Select the Camunda Hub project where you want to create the template.
2. Click **Create new > Element template**. This opens the **Create new element template** screen.
3. Select **Connector**.
4. Choose a starting point for your template:
   - **From API definition**: Import an existing API definition file as a starting point. The **Import data source** section will appear below the template details.
   - **From blank**: Start from a blank template.

Next, [**configure the template details**](#configure-the-template-details).

## Configure the template details

Under **Configure template details**, provide the following information:

- **Name:** Enter a clear and descriptive name for the template. For example, include the brand name if the template connects to a service, or indicate its main feature.
- **Description:** Describe the template’s main features and benefits.
- **Icon:** Use a default BPMN symbol or upload a custom icon. Supported formats: SVG, PNG, JPEG. Maximum file size: 8 KB. Minimum dimensions: 512 × 512 pixels. To add an icon, enter the image URL and click **Import icon**, or drag and drop a file into the upload area.

:::note
If you do not configure template details at this stage, a default name and BPMN symbol are assigned. You can edit them later.
:::

## Only for connector templates: Import an API definition

If you're generating a connector template, and you selected **From API definition**, you need to import the data source.

1. Under **Import data source**, select the format to import (OpenAPI or Postman).
2. Import the API definition:
   - **Import from URL:** Enter the API definition URL, and click **Import file**.
   - **Upload file:** Drag and drop a file into the upload area, or click the link to select a file.
3. After importing, select which actions to include from the generated list of supported methods.

:::info
For more information on working with and configuring connector templates, see [Connector templates](/components/connectors/custom-built-connectors/connector-templates.md).
:::

## Create the template

Click **Create template** to generate the new template and open it in the element template editor.
