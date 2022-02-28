---
id: desktop-modeler-dmn
title: Editing DMN in Desktop Modeler
description: To start modeling, let's create a DMN diagram.
---

<span class="badge badge--CCSM">Camunda Platform Only</span>

:::note
DMN is currently only available in Camunda Platform.
:::

## Create new DMN decision requirement diagram

![New DMN Diagram](./img/create-dmn.png)

To start modeling, create a new DMN 1.3 diagram for Camunda Platform by selecting **Create diagram > Create new DMN diagram (Camunda Platform)** in the top-level menu.

## Start modeling

![Start Modeling](./img/main.png)

Now you can start to create a DMN 1.3 model. Add the desired elements from the palette on the left side by dragging and dropping them onto the diagram canvas.

Alternatively, you can add new elements by using the context menu that appears when you select an element in the diagram. Using the wrench icon in the context menu, you can change the type of an element in place. Use the properties panel on the right side to change the name or id of the DMN diagram.

## Demo

![Demo](./img/demo.gif)

The demo above shows how to model a decision table. After creating a decision and morphing it into a decision table, you can start editing the table by clicking the overlay on the upper left corner of the decision. Using the overview in the decision table view, you can jump between decision tables.

## Save a diagram

To save your diagram, click **File > Save File As...** in the top-level menu. Then, select a location on your file system to store the diagram in the DMN 1.3 XML format. You can load that file again by clicking **File > Open File...**.

## DMN coverage

Desktop Modeler covers the following elements:

- Decision (tables and literal expressions)
- Input data
- Knowledge source
- Business knowledge model

## Decision tables

![Decision Table](./img/decision-table.png)

By clicking the blue icon on a decision table, you can open the decision table view and start to edit it. Add **Input**, **Output**, and **Rule** elements by clicking the plus signs. Edit a table cell by clicking on it. Alternatively, the tabulator and enter keys can be used to walk through the table cells.

Delete a rule or a column, copy, or insert a new rule by right clicking in the cell:

![Delete or copy rules](./img/dmn-modeler-right-click.png)

Adjust the details of an input or output column (e.g., name, expression, and type) by double clicking in the header row:

![Change input or output column](./img/dmn-modeler-double-click.png)

Jump between decision tables or literal expressions in your decision requirement diagram by opening and using the `Overview` on the left side:

![Jump between decision tables](./img/dmn-modeler-toggle-overview.png)

## Literal expressions

![New DMN Literal Expression](./img/literal-expression.png)

You can also edit literal expressions. Just as with decision tables, in the decision requirement diagram view, click the blue icon to *drill-down* into the literal expression view and start editing.
