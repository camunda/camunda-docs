---
id: telemetry
title: Telemetry
description: "You can opt in for the collection of telemetry data when using Desktop Modeler. This data is used to better understand how the application is used and to improve it based on data."
---

You can opt in for the collection of telemetry data when using Desktop Modeler. This data is used to better understand how the application is used and to improve it based on data. This page summarizes the data collected.

## General structure of the events

The events **Desktop Modeler** sends share a similar payload which usually (but not exclusively) includes information like:

- **event name**: The name of the event triggered (e.g. `diagram:opened`)
- **application version**: The version of Desktop Modeler being used (e.g. Version 5.0.0)
- **editor id**: A randomly generated id assigned to your Desktop Modeler installation

## Definition of events

### Ping event

The `Ping Event` is sent in the following situations:

- The modeler is opened (given that `Usage Statistics` option is enabled).
- `Usage Statistics` option is enabled for the first time.
- Once every 24 hours (given that `Usage Statistics` option is enabled).

The `Ping Event` also sends the list of plugins installed and flags defined:

```json
  "plugins": ["PLUGIN_NAME"],
  "flags": {
    "FLAG_NAME": "FLAG_VALUE"
  }
```

### Diagram opened/closed event

The `Diagram Opened Event` is sent in the following situations:

- User created a new BPMN diagram
- User created a new DMN diagram
- User created a new Form
- User opened an existing BPMN diagram
- User opened an existing DMN diagram
- User opened an existing Form

The `Diagram Closed Event` is sent in the following situations:

- User closed a BPMN diagram
- User closed a DMN diagram
- User closed a Form

These events include the following properties:

- `diagramType`: BPMN, DMN, or Form
- Engine profile:
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

The `Deployment Event` is sent in the following situations:

- User deploys a BPMN or DMN diagram to Camunda Platform 7 or Camunda Platform 8
- User deploys a Form to Camunda Platform 7

The `Deployment Event` and `Start Instance` have the following properties:

- `diagramType`: BPMN, DMN, or Form
- Engine profile:
  - `executionPlatform`: <target platform\>
  - `executionPlatformVersion`: <target platform version\>

In the event of an unsuccessful deployment, an `error` property will be present in the payload containing an error code.

If provided, as is the case when deploying to a Zeebe-based platform, the payload also includes the target type of the deployment:

```json
"targetType": "[camundaCloud or selfHosted]"
```

In case of BPMN files, the event payload may include further diagram metrics:

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

If the target engine profile is set in the diagram, the payload will also contain it.

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
- The link target (optional for external links)

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

For the **Version Info** overlay, the event also sends `source` of the click (`"menu"` or `"statusBar"`).

For the **Deployment** and **Start Instance** overlays, the event also send the `diagramType` (BPMN, DMN or Form).

### Form editor events

The `Form editor events` are sent on different interactions with the form builder:

- User opened or collapsed a panel in the form editor. The event includes the current open state for each form preview panel and the interaction that triggered the change.

```json
{
  "layout": {
    "form-input": {
      "open": true
    },
    "form-output": {
      "open": true
    },
    "form-preview": {
      "open": true
    }
  },
  "triggeredBy": "keyboardShortcut|previewPanel|statusBar|windowMenu"
}
```

- User interacted with the form input data panel.
- User interacted with the form preview panel.

In all events [the execution platform and version](#diagram-openedclosed-event) are sent as well.
