---
id: modeler-bpmn
title: BPMN in Modeler
description: Let's start modeling by creating a BPMN diagram.
---

:::note
BPMN diagrams must be created for the process engine they intend to be deployed on. You cannot run a BPMN diagram modeled for Camunda Platform 7 in Camunda Platform 8, or vice versa, at this time.
:::

## Start modeling

![Start Modeling](./assets/quickstart-2.png)

The Web and Desktop Modeler both offer the same core BPMN 2.0 Modeling experience: you can add BPMN elements from the palette on the left side of the page by dragging and dropping them onto the diagram canvas. Alternatively, you can add new elements by using the context menu that appears when you select an element in the diagram. Using the wrench icon in the context menu, you can change the type of element in place.

## Demo

![Demo](./assets/demo.gif)

The demo above shows how to create more BPMN 2.0 elements like lanes, task types, and event definitions.

## BPMN 2.0 coverage

The Modeler [covers all BPMN 2.0 elements](/docs/components/modeler/bpmn/bpmn-coverage/) for modeling processes and collaborations.

## BPMN 2.0 properties for execution

![Save BPMN Diagram](./assets/quickstart-3.png)

In the properties panel on the right side, view and edit attributes that apply to the selected element.
