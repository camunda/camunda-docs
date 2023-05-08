---
id: configurable-templates
title: Configurable Connector Templates
description: "Use configurable Template Connectors to build template-only Connectors on top of Protocol Connectors."
---

export const UploadIcon = () => <span style={{verticalAlign: "text-top"}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path d="M0 0h24v24H0z" fill="none"></path><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" fill="currentColor"></path></svg></span>;

Connectors offer a multilayer coding experience for all users including a template-only approach through configurable Connector Templates.

Fields or values defined in the Connector Template are configurable in the properties panel during model design.

[Protocol Connectors](/components/connectors/connector-types.md#protocol-connectors) can be customized to meet the needs of specific use cases using configurable Connector Templates, with no additional coding or deployment required. Connector Templates would then use the existing protocol runtime to execute.

## Download existing template

Find an existing Connector's element template in the [Camunda Connectors Bundle](https://github.com/camunda/connectors-bundle) on GitHub.

For this example, use the [REST Connector](https://github.com/camunda/connectors-bundle/blob/main/connectors/http-json/element-templates/http-json-connector.json).

Download the raw json file named `http-json-connector.json`.

## Upload existing template

Open Web Modeler with a new or existing project. Click **New**.

Upload the raw json file you downloaded in the previous step as a _new Connector template_ via the <UploadIcon /> **Upload files** action in the projects view. This will auto-generate a new ID for the template. The file name will replace the connector name.

![Uploading a new template via file upload](img/upload-files.png)

## Modify existing template

Update an existing template via the **Replace via upload** action in the breadcrumbs of the editor view. This preserves the name and ID of the existing template.

![Updating a template via file upload](img/replace-via-upload.png)

## Customize the template

Using the editor, modify the template to meet your service integration needs. This template includes multiple versions of authentication and methods which may not be applicable for your REST API.

See [Manage Connector templates](/components/modeler/web-modeler/advanced-modeling/manage-connector-templates.md) more information on creating and managing Connector Templates.
