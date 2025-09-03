---
id: modeler-bpmn
title: BPMN in Modeler
description: Let's start modeling by creating a BPMN diagram.
---

:::note
BPMN diagrams must be created for the process engine they intend to be deployed on. You cannot run a BPMN diagram modeled for Camunda 7 in Camunda 8, or vice versa, at this time.
:::

## Start modeling

![Start Modeling](./assets/quickstart-2.png)

Web and Desktop Modeler both offer a similar core BPMN 2.0 Modeling experience:

- Add BPMN elements from the palette on the left side of the page by dragging and dropping them onto the diagram canvas.
- Change the type of element in place by clicking on an element to reveal the context menu. Then, click the wrench icon to change the type of element to a [service task](./service-tasks/service-tasks.md) or [user task](./user-tasks/user-tasks.md), for example.

## Demo

![Demo](./assets/demo.gif)

The demo above shows how to create more BPMN 2.0 elements like lanes, task types, and event definitions.

## BPMN 2.0 coverage

The Modeler [covers all BPMN 2.0 elements](/components/modeler/bpmn/bpmn-coverage.md) for modeling processes and collaborations.

## BPMN 2.0 properties for execution

![Save BPMN Diagram](./assets/quickstart-3.png)

In the properties panel on the right side, view and edit attributes that apply to the selected element.
