---
id: create-connector-from-rest
title: Create a custom REST connector
description: Learn how to create a custom connector based on and using the Camunda REST connector as a starting point.
---

import CustomRestURLImg from './img/custom-rest-connector.png';
import CustomRestSaveImg from './img/custom-save-as.png';
import CustomRestSaveTemplateImg from './img/custom-save-as-template.png';
import CustomBPMNImg from './img/custom-swapi-connector.png';

# Create a custom REST connector

Create a custom REST connector based on and using the [Camunda REST connector](/components/connectors/protocol/rest.md) as a starting point.

## Create a custom connector based on the Camunda REST connector

1. In Web Modeler, add a [task](/components/modeler/bpmn/tasks.md) element to a new or existing BPMN diagram.
1. Change the task type to [REST connector](/components/connectors/protocol/rest.md).
1. In the Properties panel, configure the connector as required. For example, define the Authentication URL, HTTP method, and any headers or payload needed for the API request.
1. Click **Save as Template**.
1. Enter details for the new connector template, such as a name and description. Save and create the new connector template.
1. Open the new connector template in the template editor and customize it as required. For example, add or remove fields, adjust default values and input parameters, and update the description and other metadata.
1. Save your changes to the new connector template, and use it as required in your processes.

:::caution
When creating a new template based on the REST connector, you must ensure that any field(s) used to set variables are placed **before** any field(s) that uses these variables. For example, in the following code, as the `url` requires the variables defined by `swid` and `swresource`, it is placed after them. Incorrectly placed variables will be considered as `null`.

```json
{
      "id": "swid",
      "label": "id",
      "description": "Index of the resource",
      "feel": "optional",
      "group": "swapi",
      "binding": {
        "name": "index",
        "type": "zeebe:input"
      },
      "type": "String"
    },
    {
      "id": "swresource",
      "label": "Type",
      "description": "Choose the resource type",
      "value": "Planets",
      "group": "swapi",
      "binding": {
        "name": "resource",
        "type": "zeebe:input"
      },
      "type": "Dropdown",
      "choices": [...]
    },
    {
      "id": "url",
      "label": "URL",
      "optional": false,
      "constraints": {
        "notEmpty": true,
        "pattern": {
          "value": "^(=|(http://|https://|secrets|\\{\\{).*$)",
          "message": "Must be a http(s) URL"
        }
      },
      "group": "endpoint",
      "binding": {
        "name": "url",
        "type": "zeebe:input"
      },
      "type": "Hidden",
      "value": "=\"https://swapi.dev/api/\" + resource + \"/\" + index"
    }
```

:::

## Example: Custom Star Wars API connector

The following example shows how you can create a custom connector based on the Camunda REST connector that retrieves data from the [Star Wars API (SWAPI)](https://swapi.dev/).

### Step 1: Create connector template

In this first step, create a new connector template, using the REST connector as a starting point.

1. Create a REST Outbound connector task.
1. Define the URL as a FEEL (Friendly Enough Expression Language) expression, using the `resource` and `index` variables.

   <img src={CustomRestURLImg} alt="Create a REST connector task" style={{marginTop: '0', width: '800px'}} />

1. Click **Save as** to create a template from your configured connector.

   <img src={CustomRestSaveImg} alt="Create your connector template" style={{marginTop: '0'}} />

1. Enter the **Template Name** and **Template Description** and click **Save**. These fields are essential for identifying and understanding the purpose of the template.

   <img src={CustomRestSaveTemplateImg} alt="Save your connector template" style={{marginTop: '0', width: '600px'}} />

### Step 2: Edit the new connector template

Once the new connector template is created, edit and configure it to retrieve data from the Star Wars API.

1. Open the new connector template in the Template Editor.
1. Hide Unwanted Properties: For properties that are not required in your connector, set the `type` to `Hidden`. For example, since authentication is not required in this example, it is set to `Hidden`.
   ```json
   {
     "id": "authentication.type",
     "label": "Type",
     "description": "Choose the authentication type. Select 'None' if no authentication is necessary",
     "value": "noAuth",
     "group": "authentication",
     "binding": {
       "name": "authentication.type",
       "type": "zeebe:input"
     },
     "type": "Hidden",
     "choices": [
       {
         "name": "API key",
         "value": "apiKey"
       },
       {
         "name": "Basic",
         "value": "basic"
       },
       {
         "name": "Bearer token",
         "value": "bearer"
       },
       {
         "name": "None",
         "value": "noAuth"
       },
       {
         "name": "OAuth 2.0",
         "value": "oauth-client-credentials-flow"
       }
     ]
   }
   ```
   Similarly, hide other fields such as `url`, `method`, `headers`, and `queryParameters`. If the `hidden` type does not apply, ensure that you remove the `feel` property.
   ```json
   {
     "id": "url",
     "label": "URL",
     "optional": false,
     "constraints": {
       "notEmpty": true,
       "pattern": {
         "value": "^(=|(http://|https://|secrets|\\{\\{).*$)",
         "message": "Must be a http(s) URL"
       }
     },
     "group": "endpoint",
     "binding": {
       "name": "url",
       "type": "zeebe:input"
     },
     "type": "Hidden",
     "value": "=\"https://swapi.dev/api/\" + resource + \"/\" + index"
   }
   ```
1. Create a Custom Group for the Star Wars API: Add a customized group named `swapi` for organizing your Star Wars-related properties.
   ```json
   {
     "id": "swapi",
     "label": "Star Wars Payload"
   }
   ```
1. Define the Properties in the SWAPI Group: Map the properties within the new group to the previously defined `resource` and `index` variables.
   - Set `resource` as a `Dropdown`.
   - Set `index` as a `String`.
   ```json
   [
     {
       "id": "swid",
       "label": "id",
       "description": "Index of the resource",
       "feel": "optional",
       "group": "swapi",
       "binding": {
         "name": "index",
         "type": "zeebe:input"
       },
       "type": "String"
     },
     {
       "id": "swresource",
       "label": "Type",
       "description": "Choose the resource type",
       "value": "Planets",
       "group": "swapi",
       "binding": {
         "name": "resource",
         "type": "zeebe:input"
       },
       "type": "Dropdown",
       "choices": [
         {
           "name": "Planets",
           "value": "planets"
         },
         {
           "name": "Spaceships",
           "value": "spaceships"
         },
         {
           "name": "Vehicles",
           "value": "vehicles"
         },
         {
           "name": "People",
           "value": "people"
         },
         {
           "name": "Films",
           "value": "films"
         },
         {
           "name": "species",
           "value": "Species"
         }
       ]
     }
   ]
   ```
1. Add an appropriate icon if required to enhance your connector's visual appeal.
1. Once configuration is complete, click **Publish** to publish the connector template and make it available for use.
1. Use your newly published SWAPI connector in your BPMN workflows.

   <img src={CustomBPMNImg} alt="Use your new connector in a BPMN diagram" style={{marginTop: '0', width: '800px'}} />
