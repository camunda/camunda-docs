---
id: telemetry
title: Telemetry
description: "You can opt-in the collection of telemetry data when using the desktop modeler. This data will be used to better understand how the application is used and to improve it based on data."
---

You can opt-in the collection of telemetry data when using the desktop modeler. This data will be used to better understand how the application is used and to improve it based on data.

This page summarizes the data that is being collected.

## General structure of the events

The events **Desktop Modeler** sends are sharing a similar payload which usually, but not exclusively includes information like:

- **event name**: the name of the event being triggered (e.g. "diagram:opened")
- **application version**: the version of the Desktop Modeler that is being used (e.g. Version 5.0.0)
- **editor id**: a randomly generated id assigned to your Desktop Modeler installation

## Definition of events

### Ping event

The `Ping Event` is sent in following situations:

- The modeler is opened (given that `Usage Statistics` option is enabled)
- `Usage Statistics` option is enabled for the first time.
- Once every 24 hours (given that `Usage Statistics` option is enabled)

The Ping Event also sends the list plugins installed and flags defined.

```json
  "plugins": ["PLUGIN_NAME"],
  "flags": {
    "FLAG_NAME": "FLAG_VALUE"
  }
```

### Diagram opened/closed event

The `Diagram Opened Event` is sent in following situations:

- User created a new BPMN diagram
- User created a new DMN diagram
- User created a new Form
- User opened an existing BPMN diagram
- User opened an existing DMN diagram
- User opened an existing Form

The `Diagram Closed Event` is sent in following situations:

- User closed a BPMN diagram
- User closed a DMN diagram
- User closed a Form

These events include the following properties:

- `diagramType`: [bpmn, dmn or form]
- engine profile:
  - `executionPlatform`: <target platform\>
  - `executionPlatformVersion`: <target platform version\>

In case of BPMN files, the event payload may include further diagram metrics:

```json
{
  "elementTemplateCount": 1,
  "elementTemplates": [
    {
      "appliesTo": ["bpmn:ServiceTask"],
      "properties": {
        "camunda:asyncBefore": 1,
        "camunda:class": 1,
        "camunda:inputParameter": 3,
        "camunda:outputParameter": 1
      }
    }
  ]
}
```

Also in the case of BPMN diagrams, the event payload may include further diagram metrics:

```json
{
  "diagramMetrics": {
    "processVariablesCount": 3,
    "tasks": {
      "userTask": {
        "count": 5,
        "form": {
          "count": 5,
          "embedded": 1,
          "camundaForms": 1,
          "external": 2,
          "generated": 0,
          "other": 1
        }
      },
      "serviceTask": {
        "count": 5,
        "implementation": {
          "count": 5,
          "java": 1,
          "expression": 1,
          "delegate": 2,
          "external": 0,
          "connector": 1
        }
      }
    },
    "subprocessPlanes": {
      "count": 5,
      "nesting:": 2
    }
  }
}
```

### Deployment and start instance events

The `Deployment Event` is sent in following situations:

- User deploys a BPMN or DMN diagram to Camunda Platform 7 or Camunda Platform 8
- User deploys a Form to Camunda Platform 7

The Deployment Event and Start Instance has the following properties:

- `diagramType`: [bpmn, dmn or form]
- engine profile:
  - `executionPlatform`: <target platform\>
  - `executionPlatformVersion`: <target platform version\>

We also send infromation regarding the outcome of the deployment. In case the diagram deployment was not successful, the `error` returned will be added to the payload.

If provided, for example, when deploying to a Zeebe based platform, we add the target type of the deployment as well:

```json
"targetType": "[camundaCloud or selfHosted]"
```

In case of BPMN files, we may add selected diagram metrics:

```json
{
  "diagramMetrics": {
    "processVariablesCount": 3,
    "tasks": {
      "userTask": {
        "count": 5,
        "form": {
          "count": 5,
          "embedded": 1,
          "camundaForms": 1,
          "external": 2,
          "generated": 0,
          "other": 1
        }
      },
      "serviceTask": {
        "count": 5,
        "implementation": {
          "count": 5,
          "java": 1,
          "expression": 1,
          "delegate": 2,
          "external": 0,
          "connector": 1
        }
      }
    },
    "subprocessPlanes": {
      "count": 5,
      "nesting:": 2
    }
  }
}
```

If it is set in the diagram, we also add target engine profile information:

```json
 "executionPlatform": "<target platform>"
```

### Tracked click events

The `Tracked Click Events` are sent when a user clicks a link or button contained within a tracked parent 'container'.

Currently, these containers are:

- Each of the welcome page columns
- The version info overlay

The event supplies:

- The `parent` container id to locate the application section
- The button label or link text (generalized as label) for identification of what was specifically clicked
- A type to differentiate buttons, internal links, and external links
- Optionally for external links: the link target

Example event:

```json
{
  "type": "[button or external-link or internal-link]",
  "parent": "welcome-page-learn-more",
  "label": "Click here to read more about Camunda",
  "link": "https://camunda.com/"
}
```

:::note
`"link"` is only present for `"type": "external-link"`.
:::

### Overlay opened event

The `Overlay Opened Event` is sent when an overlay is opened via user interaction. Currently, this event is sent in the following circumstances:

- Version Info overlay is opened
- Deployment overlay is opened
- Start instance overlay is opened
- Deployment overlay is closed
- Start Instance overlay is closed

For the Version Info overlay, the event also sends `source` of the click (`"menu"` or `"statusBar"`).

For the Deployment and Start Instance overlays, the event also send the `diagramType` (BPMN, DMN or FORM)
