---
id: element-template-generator
title: Generate an element template
description: Learn how to generate element or connector templates for easier custom reusable elements creation.
---

## Start generating an element template

You can configure and automatically generate a custom Element template in Web Modeler.

You can start from a **Call Activity** template, a **Task** template, or from a **blank** template.

To generate an element template:

1. Select the Modeler project you want to create the template in.
2. Click **Create new**, select **Element template**, and then select the **BPMN element** tab to open the **Create new element template** screen.
   ![Create the new element template](./img/configure-element-template-details.png)

3. Select the template starting point.
   - **From Call activity**: Start from a Call activity template.
   - **From Task**: Start from a Task template.
     - You can select from a list of predefined Task templates, such as User task, Service task, Script task, and more.
   - **From blank**: Start from a blank template.

## Start generating a connector template

You can configure and automatically generate a custom [Connector template](/components/connectors/custom-built-connectors/connector-templates.md) in Web Modeler.

You can start from a blank template or import an existing API definition such as an [OpenAPI specification](https://swagger.io/resources/open-api/), [Swagger specification](https://swagger.io/resources/open-api/), or a [Postman collection](https://www.postman.com/collection/). For example, download a Postman collection as a YAML file, import this into the generator, and choose which methods to include in the generated template.

To generate a connector template:

1. Select the Modeler project you want to create the template in.
2. Click **Create new**, select **Element template**, and then select the **Connector** tab to open the **Create new connector template** screen.
   ![Create the new connector template](./img/configure-connector-template-details.png)

3. Select the template starting point.
   - **From API definition**: Import an existing API definition file as a starting point for the template. If you select this option, the **Import data source** section is shown below the template details.

   - **From blank**: Start from a blank template.

### Configure the template details

4. Configure the template details in the **Configure template details** section.
   - **Name:** Enter a clear and easily understood name for the template. For example, include the brand name if the template connects to a service or tool, or indicate the template's main feature.

   - **Description:** Enter a description for the template. For example, describe the template's main features and benefits.

   - **Icon:** Use a default BPMN symbol as the template icon in a BPMN diagram, or upload a custom icon. Supported icon formats are SVG, PNG, and JPEG, with a maximum file size limit of 8 KB. Icons must be a minimum of 512 x 512 pixels in size.
     - **Import from URL**: Enter the URL for the image you want to import, and click **Import icon**.
     - **Upload file**: Drag and drop a file into the upload area, or click the link and select a file to upload.

   :::note
   If you do not configure the template details at this point, a default name is generated and a default BPMN symbol selected. You can edit these template details after the template is created.
   :::

#### Only for connector templates: Import an API definition

5. If you selected the **From API definition** option, the **Import data source** section is shown. Select and upload an API definition. JSON and YAML file formats are supported, with a maximum file size limit of 1024 KB.
   1. Select the format you are going to upload (OpenAPI or Postman).
   1. Upload the API definition.
      - **Import from URL**: Enter the URL for the API definition you want to import, and click **Import icon**.
      - **Upload file**: Drag and drop a file into the upload area, or click the link and select a file to upload.

   1. After the import is complete, select which actions to include in the template from the generated list of supported methods.
      ![List of imported methods](./img/Imported-methods.png)

:::info
For more information on working with and configuring connector templates, see [Connector templates](/components/connectors/custom-built-connectors/connector-templates.md).
:::

### Create the template

6. Click **Create template** to create and open the newly generated element template in the [element template editor](/components/connectors/manage-connector-templates.md).
