---
id: camunda-modeler-dmn
title: Editing DMN in Camunda Modeler
---

# Quickstart

## Create new DMN Decision Requirement Diagram

![New DMN Diagram](./img/create-dmn.png)

To start modeling, create a new DMN 1.3 diagram for the Camunda Platform by selecting **Create diagram > Create new DMN diagram (Camunda Platform)** in the top-level menu.

## Start Modeling

![Start Modeling](./img/main.png)

Now you can start to create a DMN 1.3 model. Add the desired elements from the palette on the left hand side by dragging and dropping them onto the diagram canvas. Alternatively, you can add new elements by using the context menu that appears when you select an element in the diagram. Using the wrench icon in the context menu, you can change the type of an element in place. Use the properties panel on the right hand side to change the name or id of the DMN diagram.

## Demo

![Demo](./img/demo.gif)

The demo above shows how to model a decision table. After creating a decision and morphing it to a decision table, you can start editing the table by clicking the overlay on the upper left corner of the decision. Using the overview in the decision table view you can jump between decision tables.

## Save a Diagram

To save your state of work, click **File > Save File As...** in the top-level menu. Then select a location on your file system to store the diagram in the DMN 1.3 XML format. You can load that file again by clicking **File > Open File...**.

## DMN Coverage

The Camunda Modeler covers the following elements:

- Decision (Tables and Literal Expressions)
- Input Data
- Knowledge Source
- Business Knowledge Model

## Decision Tables

![Decision Table](./img/decision-table.png)

By clicking the blue icon on a Decision Table, you can open the Decision Table view and can start to edit it. Add Input, Output and Rule elements by clicking the plus signs. Edit a table cell by clicking on it. Alternatively, the tabulator and enter keys can be used to walk through the table cells.

Delete a rule or a column, copy or insert a new rule by right clicking in the cell:

![Delete or copy rules](./img/dmn-modeler-right-click.png)

Adjust the details of an input or output column (e.g., name, expression, type) by double clicking in the header row:

![Change input or output column](./img/dmn-modeler-double-click.png)

You can jump between Decision Tables or Literal Expressions in your Decision Requirement Diagram by opening and using the `Overview` on the left-hand side:

![Jump between decision tables](./img/dmn-modeler-toggle-overview.png)

## Literal Expressions

![New DMN Literal Expression](./img/literal-expression.png)

You can also edit Literal Expressions. Just as with Decision Tables, in the Decision Requirement Diagram view, click the blue icon to *drill-down* into the Literal Expression view and start editing.
