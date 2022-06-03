---
id: telemetry
title: Telemetry
description: "You can opt-in the collection of telemetry data when using the desktop modeler. This data will be used to better understand how the application is used and to improve it based on data."
---

You can opt-in the collection of telemetry data when using the desktop modeler. This data will be used to better understand how the application is used and to improve it based on data.

This page summarizes the data that is being collected.

## General structure of the events

Independent from the type of the event we're dealing with, the payload we send to the ET has the following structure:

```json
{
  "installation": "[THE_EDITOR_ID]",
  "product": {
    "name": "Camunda Modeler",
    "version": "[MODELER_VERISON]",
    "edition": "community",
    "internals": {
      "event": "[NAME_OF_THE_EVENT]",
      "[SOME_ADDITIONAL_EVENT_DATA]": "[SOME_CUSTOM_VALUE]"
    }
  }
}
```

Every event directly modifies the `internals` field of the payload.

## Definition of events

### Ping event

The `Ping Event` is sent in following situations:

- The modeler is opened (given that `Usage Statistics` option is enabled)
- `Usage Statistics` option is enabled for the first time.
- Once every 24 hours (given that `Usage Statistics` option is enabled)

The Ping Event has the following structure:

```json
{
  "event": "ping",
  "plugins": ["PLUGIN_NAME"]
}
```

### Diagram opened event

The `Diagram Opened Event` is sent in following situations:

- User created a new BPMN diagram
- User created a new DMN diagram
- User created a new CMMN diagram
- User created a new Form
- User opened an existing BPMN diagram
- User opened an existing DMN diagram
- User opened an existing CMMN diagram
- User opened an existing Form

The Diagram Opened Event has the following core structure:

```json
{
  "event": "diagramOpened",
  "diagramType": "[bpmn, dmn, cmmn or form]"
}
```

In the case of bpmn and form, we add the engine profile:

```json
{
  "engineProfile": {
    "executionPlatform": "<target platform>",
    "executionPlatformVersion": "<target platform version>"
  }
}
```

In case the diagram type is bpmn, we also add the element template usage to
Diagram Opened Event payload:

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

Also in the case of BPMN diagrams, we add selected diagram metrics:

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

### Deployment event

The `Deployment Event` is sent in following situations:

- User deploys a BPMN diagram to Camunda Platform 7 or Camunda Platform 8
- User deploys a DMN diagram to Camunda Platform 7

The Deployment Event has the following core structure:

```json
{
  "event": "deployment",
  "diagramType": "[bpmn or dmn]",
  "deployment": {
    "outcome": "[success or failure]",
    "context": "[deploymentTool or startInstanceTool]",
    "executionPlatform": "[<target platform>]",
    "executionPlatformVersion": "[<target platform version>]"
  }
}
```

In case the diagram deployment was not successful, the error code returned from the Camunda Platform 7 will be added to the payload:

```json
{
  "deployment": {
    "outcome": "failure",
    "error": "DIAGRAM_PARSE_ERROR"
  }
}
```

If provided, for example, when deploying to a Zeebe based platform, we add the target type of the deployment as well:

```json
{
  "deployment": {
    "targetType": "camundaCloud"
  }
}
```

In case of BPMN files, we add selected diagram metrics:

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
{
  "engineProfile": {
    "executionPlatform": "<target platform>"
  }
}
```

### Tracked click events

The `Tracked Click Events` are sent when a user clicks a link or button contained within a tracked parent 'container'.

Currently, these containers are:

- Each of the welcome page columns
- The version info overlay

The event supplies:

- The parent container id to locate the application section
- The button label or link text (generalized as label) for identification of what was specifically clicked
- A type to differentiate buttons, internal links, and external links
- Optionally for external links: the link target

Example event:

```json
{
  "event": "userTrackedClick",
  "type": "[button or external-link or internal-link]"
  "parent": "welcome-page-learn-more"
  "label": "Click here to read more about Camunda"
  "link": "https://camunda.com/"
}
```

:::note
`"link"` is only present for `"type": "external-link"`.
:::

### Version info opened event

The `Version Info Opened Event` is sent when the version info overlay is opened via user interaction.

It has the following structure:

```json
{
  "event": "versionInfoOpened",
  "source": "[menu or statusBar]"
}
```
