---
id: connector-templates
title: Connector templates
description: Learn how to modify BPMN elements with Connector templates to create custom modeling experiences.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

**Connector templates** are JSON configuration files, which customize how a BPMN element is shown,
and how it can be configured by process developers. Connector templates are a specific kind of [element templates](/components/modeler/desktop-modeler/element-templates/about-templates.md).

Before developing one, you'll need to decide what you would like to achieve with your Connector.

Currently, the options are:

- Starting a BPMN process, triggered by external service - use [inbound start event Connector template](#inbound-start-event-connector-templates)
- Continue process with an intermediate catch event emitted by external service call - use [inbound intermediate catch event Connector templates](#inbound-intermediate-catch-event-connector-templates)
- Trigger an external service - use [outbound Connector template](#outbound-connector-templates)

:::note
Do not confuse **Connector templates** with the **[Connector template](https://github.com/camunda/connector-template-outbound)**,
which is used to supply boilerplate code and configuration when developing a new custom Connector.
:::

## Inbound start event Connector templates

You can, for example, allow the user to model and configure the following **HTTP Webhook Connector** by providing
a simple JSON configuration:

<Tabs groupId="connectorTemplateInbound" defaultValue="process" values={
[
{label: 'Process modeling view', value: 'process' },
{label: 'Connector template configuration', value: 'json' }
]
}>

<TabItem value='process'>

![Webhook Inbound Connector Example](./img/custom-connector-template-inbound-start.png)

</TabItem>

<TabItem value='json'>

```json
{
  "$schema": "https://unpkg.com/@camunda/zeebe-element-templates-json-schema/resources/schema.json",
  "name": "Webhook Connector",
  "id": "io.camunda.connectors.webhook.WebhookConnector.v1",
  "version": 1,
  "description": "Configure webhook to receive callbacks",
  "documentationRef": "https://docs.camunda.io/docs/components/connectors/out-of-the-box-connectors/http-webhook/",
  "category": {
    "id": "connectors",
    "name": "Connectors"
  },
  "appliesTo": ["bpmn:StartEvent"],
  "elementType": {
    "value": "bpmn:StartEvent"
  },
  "groups": [
    {
      "id": "endpoint",
      "label": "Webhook Configuration"
    },
    {
      "id": "activation",
      "label": "Activation"
    },
    {
      "id": "variable-mapping",
      "label": "Variable Mapping"
    }
  ],
  "properties": [
    {
      "type": "Hidden",
      "value": "io.camunda:webhook:1",
      "binding": {
        "type": "zeebe:property",
        "name": "inbound.type"
      }
    },
    {
      "type": "Hidden",
      "value": "ConfigurableInboundWebhook",
      "binding": {
        "type": "zeebe:property",
        "name": "inbound.subtype"
      }
    },
    {
      "label": "Webhook ID",
      "type": "String",
      "group": "endpoint",
      "binding": {
        "type": "zeebe:property",
        "name": "inbound.context"
      },
      "description": "The webhook ID is a part of the URL"
    },
    {
      "id": "shouldValidateHmac",
      "label": "HMAC authentication",
      "group": "endpoint",
      "description": "Choose whether HMAC verification is enabled. <a href='https://docs.camunda.io/docs/components/connectors/out-of-the-box-connectors/http-webhook/#make-your-http-webhook-connector-for-receiving-messages-executable' target='_blank'>See documentation</a> and <a href='https://docs.camunda.io/docs/components/connectors/out-of-the-box-connectors/http-webhook/#example' target='_blank'>example</a> that explains how to use HMAC-related fields",
      "value": "disabled",
      "type": "Dropdown",
      "choices": [
        {
          "name": "Enabled",
          "value": "enabled"
        },
        {
          "name": "Disabled",
          "value": "disabled"
        }
      ],
      "binding": {
        "type": "zeebe:property",
        "name": "inbound.shouldValidateHmac"
      }
    },
    {
      "label": "HMAC secret key",
      "description": "Shared secret key",
      "type": "String",
      "group": "endpoint",
      "optional": true,
      "binding": {
        "type": "zeebe:property",
        "name": "inbound.hmacSecret"
      },
      "condition": {
        "property": "shouldValidateHmac",
        "equals": "enabled"
      }
    },
    {
      "label": "HMAC header",
      "description": "Name of header attribute that will contain the HMAC value",
      "type": "String",
      "group": "endpoint",
      "optional": true,
      "binding": {
        "type": "zeebe:property",
        "name": "inbound.hmacHeader"
      },
      "condition": {
        "property": "shouldValidateHmac",
        "equals": "enabled"
      }
    },
    {
      "label": "HMAC algorithm",
      "group": "endpoint",
      "description": "Choose HMAC algorithm",
      "value": "sha_256",
      "type": "Dropdown",
      "choices": [
        {
          "name": "SHA-1",
          "value": "sha_1"
        },
        {
          "name": "SHA-256",
          "value": "sha_256"
        },
        {
          "name": "SHA-512",
          "value": "sha_512"
        }
      ],
      "binding": {
        "type": "zeebe:property",
        "name": "inbound.hmacAlgorithm"
      },
      "condition": {
        "property": "shouldValidateHmac",
        "equals": "enabled"
      }
    },
    {
      "label": "Condition",
      "type": "String",
      "group": "activation",
      "feel": "required",
      "optional": true,
      "binding": {
        "type": "zeebe:property",
        "name": "inbound.activationCondition"
      },
      "description": "Condition under which the connector triggers. Leave empty to catch all events. <a href='https://docs.camunda.io/docs/components/connectors/out-of-the-box-connectors/http-webhook/#make-your-http-webhook-connector-for-receiving-messages-executable' target='_blank'>See documentation</a>"
    },
    {
      "label": "Variables",
      "type": "String",
      "group": "variable-mapping",
      "feel": "required",
      "binding": {
        "type": "zeebe:property",
        "name": "inbound.variableMapping"
      },
      "description": "Map variables from the webhook payload (request) to start the process with. When blank, entire payload is copied over. <a href='https://docs.camunda.io/docs/components/connectors/out-of-the-box-connectors/http-webhook/#make-your-http-webhook-connector-for-receiving-messages-executable' target='_blank'>See documentation</a>"
    }
  ],
  "icon": {
    "contents": "data:image/svg+xml,%3Csvg id='icon' xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 32 32'%3E%3Cdefs%3E%3Cstyle%3E .cls-1 %7B fill: none; %7D %3C/style%3E%3C/defs%3E%3Cpath d='M24,26a3,3,0,1,0-2.8164-4H13v1a5,5,0,1,1-5-5V16a7,7,0,1,0,6.9287,8h6.2549A2.9914,2.9914,0,0,0,24,26Z'/%3E%3Cpath d='M24,16a7.024,7.024,0,0,0-2.57.4873l-3.1656-5.5395a3.0469,3.0469,0,1,0-1.7326.9985l4.1189,7.2085.8686-.4976a5.0006,5.0006,0,1,1-1.851,6.8418L17.937,26.501A7.0005,7.0005,0,1,0,24,16Z'/%3E%3Cpath d='M8.532,20.0537a3.03,3.03,0,1,0,1.7326.9985C11.74,18.47,13.86,14.7607,13.89,14.708l.4976-.8682-.8677-.497a5,5,0,1,1,6.812-1.8438l1.7315,1.002a7.0008,7.0008,0,1,0-10.3462,2.0356c-.457.7427-1.1021,1.8716-2.0737,3.5728Z'/%3E%3Crect id='_Transparent_Rectangle_' data-name='&lt;Transparent Rectangle&gt;' class='cls-1' width='32' height='32'/%3E%3C/svg%3E"
  }
}
```

</TabItem>
</Tabs>

## Inbound intermediate catch event Connector templates

You can, for example, allow the user to model and configure the following **HTTP Webhook Connector** by providing
a simple JSON configuration:

<Tabs groupId="connectorTemplateInbound" defaultValue="process" values={
[
{label: 'Process modeling view', value: 'process' },
{label: 'Connector template configuration', value: 'json' }
]
}>

<TabItem value='process'>

![Webhook Inbound intermediate Connector Example](./img/custom-connector-template-inbound-intermediate.png)

</TabItem>

<TabItem value='json'>

```json
{
  "$schema": "https://unpkg.com/@camunda/zeebe-element-templates-json-schema/resources/schema.json",
  "name": "Webhook Connector",
  "id": "io.camunda.connectors.webhook.WebhookConnectorIntermediate.v1",
  "version": 1,
  "description": "Configure webhook to receive callbacks",
  "documentationRef": "https://docs.camunda.io/docs/components/connectors/out-of-the-box-connectors/http-webhook/",
  "category": {
    "id": "connectors",
    "name": "Connectors"
  },
  "appliesTo": ["bpmn:IntermediateCatchEvent", "bpmn:IntermediateThrowEvent"],
  "elementType": {
    "value": "bpmn:IntermediateCatchEvent",
    "eventDefinition": "bpmn:MessageEventDefinition"
  },
  "groups": [
    {
      "id": "endpoint",
      "label": "Webhook Configuration"
    },
    {
      "id": "activation",
      "label": "Activation"
    },
    {
      "id": "variable-mapping",
      "label": "Variable Mapping"
    }
  ],
  "properties": [
    {
      "type": "Hidden",
      "value": "io.camunda:webhook:1",
      "binding": {
        "type": "zeebe:property",
        "name": "inbound.type"
      }
    },
    {
      "type": "Hidden",
      "generatedValue": {
        "type": "uuid"
      },
      "binding": {
        "type": "bpmn:Message#property",
        "name": "name"
      }
    },
    {
      "type": "Hidden",
      "value": "ConfigurableInboundWebhook",
      "binding": {
        "type": "zeebe:property",
        "name": "inbound.subtype"
      }
    },
    {
      "label": "Webhook ID",
      "type": "String",
      "group": "endpoint",
      "binding": {
        "type": "zeebe:property",
        "name": "inbound.context"
      },
      "description": "The webhook ID is a part of the URL"
    },
    {
      "id": "shouldValidateHmac",
      "label": "HMAC authentication",
      "group": "endpoint",
      "description": "Choose whether HMAC verification is enabled. <a href='https://docs.camunda.io/docs/components/connectors/out-of-the-box-connectors/http-webhook/#make-your-http-webhook-connector-for-receiving-messages-executable' target='_blank'>See documentation</a> and <a href='https://docs.camunda.io/docs/components/connectors/out-of-the-box-connectors/http-webhook/#example' target='_blank'>example</a> that explains how to use HMAC-related fields",
      "value": "disabled",
      "type": "Dropdown",
      "choices": [
        {
          "name": "Enabled",
          "value": "enabled"
        },
        {
          "name": "Disabled",
          "value": "disabled"
        }
      ],
      "binding": {
        "type": "zeebe:property",
        "name": "inbound.shouldValidateHmac"
      }
    },
    {
      "label": "HMAC secret key",
      "description": "Shared secret key",
      "type": "String",
      "group": "endpoint",
      "optional": true,
      "binding": {
        "type": "zeebe:property",
        "name": "inbound.hmacSecret"
      },
      "condition": {
        "property": "shouldValidateHmac",
        "equals": "enabled"
      }
    },
    {
      "label": "HMAC header",
      "description": "Name of header attribute that will contain the HMAC value",
      "type": "String",
      "group": "endpoint",
      "optional": true,
      "binding": {
        "type": "zeebe:property",
        "name": "inbound.hmacHeader"
      },
      "condition": {
        "property": "shouldValidateHmac",
        "equals": "enabled"
      }
    },
    {
      "label": "HMAC algorithm",
      "group": "endpoint",
      "description": "Choose HMAC algorithm",
      "value": "sha_256",
      "type": "Dropdown",
      "choices": [
        {
          "name": "SHA-1",
          "value": "sha_1"
        },
        {
          "name": "SHA-256",
          "value": "sha_256"
        },
        {
          "name": "SHA-512",
          "value": "sha_512"
        }
      ],
      "binding": {
        "type": "zeebe:property",
        "name": "inbound.hmacAlgorithm"
      },
      "condition": {
        "property": "shouldValidateHmac",
        "equals": "enabled"
      }
    },
    {
      "label": "Correlation key (process)",
      "type": "String",
      "group": "activation",
      "feel": "required",
      "description": "Sets up the correlation key from process variables",
      "binding": {
        "type": "bpmn:Message#zeebe:subscription#property",
        "name": "correlationKey"
      },
      "constraints": {
        "notEmpty": true
      }
    },
    {
      "label": "Correlation key (payload)",
      "type": "String",
      "group": "activation",
      "feel": "required",
      "binding": {
        "type": "zeebe:property",
        "name": "correlationKeyExpression"
      },
      "description": "Extracts the correlation key from the incoming message payload",
      "constraints": {
        "notEmpty": true
      }
    },
    {
      "label": "Condition",
      "type": "String",
      "group": "activation",
      "feel": "required",
      "optional": true,
      "binding": {
        "type": "zeebe:property",
        "name": "inbound.activationCondition"
      },
      "description": "Condition under which the connector triggers. Leave empty to catch all events. <a href='https://docs.camunda.io/docs/components/connectors/out-of-the-box-connectors/http-webhook/#make-your-http-webhook-connector-for-receiving-messages-executable' target='_blank'>See documentation</a>"
    },
    {
      "label": "Variables",
      "type": "String",
      "group": "variable-mapping",
      "feel": "required",
      "binding": {
        "type": "zeebe:property",
        "name": "inbound.variableMapping"
      },
      "description": "Map variables from the webhook payload (request) to start the process with. When blank, entire payload is copied over. <a href='https://docs.camunda.io/docs/components/connectors/out-of-the-box-connectors/http-webhook/#make-your-http-webhook-connector-for-receiving-messages-executable' target='_blank'>See documentation</a>"
    }
  ],
  "icon": {
    "contents": "data:image/svg+xml,%3Csvg id='icon' xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 32 32'%3E%3Cdefs%3E%3Cstyle%3E .cls-1 %7B fill: none; %7D %3C/style%3E%3C/defs%3E%3Cpath d='M24,26a3,3,0,1,0-2.8164-4H13v1a5,5,0,1,1-5-5V16a7,7,0,1,0,6.9287,8h6.2549A2.9914,2.9914,0,0,0,24,26Z'/%3E%3Cpath d='M24,16a7.024,7.024,0,0,0-2.57.4873l-3.1656-5.5395a3.0469,3.0469,0,1,0-1.7326.9985l4.1189,7.2085.8686-.4976a5.0006,5.0006,0,1,1-1.851,6.8418L17.937,26.501A7.0005,7.0005,0,1,0,24,16Z'/%3E%3Cpath d='M8.532,20.0537a3.03,3.03,0,1,0,1.7326.9985C11.74,18.47,13.86,14.7607,13.89,14.708l.4976-.8682-.8677-.497a5,5,0,1,1,6.812-1.8438l1.7315,1.002a7.0008,7.0008,0,1,0-10.3462,2.0356c-.457.7427-1.1021,1.8716-2.0737,3.5728Z'/%3E%3Crect id='_Transparent_Rectangle_' data-name='&lt;Transparent Rectangle&gt;' class='cls-1' width='32' height='32'/%3E%3C/svg%3E"
  }
}
```

</TabItem>
</Tabs>

## Outbound Connector templates

You can, for example, allow the user to model and configure the following **REST Connector** by providing a JSON configuration for a service task:

<Tabs groupId="connectorTemplateOutbound" defaultValue="process" values={
[
{label: 'Process modeling view', value: 'process' },
{label: 'Connector template configuration', value: 'json' }
]
}>

<TabItem value='process'>

![REST Outbound Connector Example](./img/custom-connector-template.png)

</TabItem>

<TabItem value='json'>

```json
{
  "$schema": "https://unpkg.com/@camunda/zeebe-element-templates-json-schema/resources/schema.json",
  "name": "(Conditional) REST Connector",
  "id": "io.camunda.examples.ConditionalRestConnector",
  "description": "A REST API invocation task.",
  "appliesTo": ["bpmn:ServiceTask"],
  "icon": {
    "contents": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 22 22' fill='none'%3E%3Ccircle cx='11' cy='11' r='9' fill='black'/%3E%3Ctext x='6.9' y='14.9' fill='white' style='font-family: Arial; font-size: 10px;'%3EM%3C/text%3E%3C/svg%3E"
  },
  "properties": [
    {
      "type": "Hidden",
      "value": "http",
      "binding": {
        "type": "zeebe:taskDefinition:type"
      }
    },
    {
      "label": "REST Endpoint URL",
      "description": "Specify the url of the REST API to talk to.",
      "type": "String",
      "binding": {
        "type": "zeebe:taskHeader",
        "key": "url"
      },
      "constraints": {
        "notEmpty": true,
        "pattern": {
          "value": "^https?://.*",
          "message": "Must be http(s) URL."
        }
      }
    },
    {
      "id": "httpMethod",
      "label": "REST Method",
      "description": "Specify the HTTP method to use.",
      "type": "Dropdown",
      "value": "get",
      "choices": [
        { "name": "GET", "value": "get" },
        { "name": "POST", "value": "post" },
        { "name": "PATCH", "value": "patch" },
        { "name": "DELETE", "value": "delete" }
      ],
      "binding": {
        "type": "zeebe:taskHeader",
        "key": "method"
      }
    },
    {
      "label": "Request Body",
      "description": "Data to send to the endpoint.",
      "value": "",
      "type": "String",
      "optional": true,
      "binding": {
        "type": "zeebe:input",
        "name": "body"
      },
      "condition": {
        "property": "httpMethod",
        "oneOf": ["patch", "post", "delete"]
      }
    },
    {
      "id": "authenticationType",
      "label": "Authentication Type",
      "description": "Specify the authentication type to use.",
      "type": "Dropdown",
      "value": "",
      "optional": true,
      "choices": [
        {
          "name": "None",
          "value": ""
        },
        {
          "name": "Basic",
          "value": "basic"
        },
        {
          "name": "Bearer",
          "value": "bearer"
        }
      ],
      "binding": {
        "type": "zeebe:input",
        "name": "authentication.type"
      }
    },
    {
      "label": "Username",
      "type": "String",
      "feel": "optional",
      "binding": {
        "type": "zeebe:input",
        "name": "authentication.username"
      },
      "constraints": {
        "notEmpty": true
      },
      "condition": {
        "property": "authenticationType",
        "equals": "basic"
      }
    },
    {
      "label": "Password",
      "type": "String",
      "feel": "optional",
      "binding": {
        "type": "zeebe:input",
        "name": "authentication.password"
      },
      "constraints": {
        "notEmpty": true
      },
      "condition": {
        "property": "authenticationType",
        "equals": "basic"
      }
    },
    {
      "label": "Bearer Token",
      "type": "String",
      "feel": "optional",
      "binding": {
        "type": "zeebe:input",
        "name": "authentication.token"
      },
      "constraints": {
        "notEmpty": true
      },
      "condition": {
        "property": "authenticationType",
        "equals": "bearer"
      }
    }
  ]
}
```

</TabItem>
</Tabs>

## Develop Connector templates

You can develop Connector templates using the [`element template` feature](/components/modeler/desktop-modeler/element-templates/defining-templates). You can also look at existing [examples](https://github.com/camunda/camunda-modeler/blob/master/resources/element-templates/cloud-samples.json).

## Providing and using Connector templates

When using [Web Modeler](/components/modeler/web-modeler/launch-cloud-modeler.md), you can create **Connector templates** [directly within the application](/components/connectors/manage-connector-templates.md) and share them with your respective organization.

When using [Desktop Modeler](/components/modeler/desktop-modeler/index.md), you must place the **Connector templates** [within the file system](/components/modeler/desktop-modeler/element-templates/configuring-templates.md) so the modeler will pick them up.

Once available, process developers can directly [use the **Connector templates** from within the modeling canvas](/components/connectors/use-connectors/index.md).
