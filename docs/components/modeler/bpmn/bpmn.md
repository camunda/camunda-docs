---
id: modeler-bpmn
title: BPMN in Modeler
description: Let's start modeling by creating a new BPMN diagram.
---

# Create new BPMN 2.0 diagram

To start modeling, create a new BPMN 2.0 diagram by selecting **Create New Diagram** in the **Diagrams** tab for your process engine in the top-level menu.

:::note
If working in Camunda Platform, select **Create diagram > Create new BPMN diagram**.
:::

:::note
BPMN diagrams must be created for the process engine they intend to be deployed on. You cannot run a BPMN diagram modeled for Camunda Platform in Camunda Cloud, or vice versa, at this time.
:::

## Start modeling

![Start Modeling](./assets/quickstart-2.png)

Now you can start to create a BPMN 2.0 model. Add the desired elements from the palette on the left hand side by dragging and dropping them onto the diagram canvas.

Alternatively, you can add new elements by using the context menu that appears when you select an element in the diagram. Using the wrench icon in the context menu, you can change the type of an element in place.

## Demo

![Demo](./assets/demo.gif)

The demo above shows how to create more BPMN 2.0 elements like lanes, task types and event definitions.

## BPMN 2.0 coverage

Modeler [covers all BPMN 2.0 elements](/docs/components/modeler/bpmn/bpmn-coverage/) for modeling processes and collaborations.

## BPMN 2.0 properties for execution

![Save BPMN Diagram](./assets/quickstart-3.png)

In the properties panel on the right hand side, you can view and edit attributes that apply to the currently selected element.

![Save BPMN Diagram](./assets/quickstart-4.png)

The panel can be hidden and restored by clicking the tab on its left border.

## Save a diagram

To save your state of work, click **Save**.

:::note
To save your state of work in Camunda Platform, click **File > Save File As...** in the top-level menu. Then select a location on your file system to store the diagram in the BPMN 2.0 XML format. You can load that file again by clicking **File > Open File...**.
:::
