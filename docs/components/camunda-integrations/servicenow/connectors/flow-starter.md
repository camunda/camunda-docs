---
id: flow-starter
title: ServiceNow Flow Starter
description: "Trigger ServiceNow flows from Camunda processes using the ServiceNow Flow Starter."
---

Use the ServiceNow Flow Starter connector to trigger ServiceNow flows from Camunda processes and correlate them using the ServiceNow **Sys ID**.

The connector calls ServiceNow flows via REST API, enabling you to orchestrate complex business logic such as fulfillment, approvals, or catalog flows as part of an end-to-end Camunda process.  
It also allows Camunda orchestrations to **pause or wait** for ServiceNow-driven approval steps.

:::important
The ServiceNow Flow Starter connector requires the **ServiceNow Integration Hub Enterprise Pack** and the **Flow Trigger – REST plugin**.  
See [prerequisites](../prerequisites.md) for installation requirements.
:::

## Supported operations

| Operation    | Description                                                          | Example use case                                                        |
| :----------- | :------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| Trigger Flow | Start a ServiceNow Flow Designer flow via its REST trigger endpoint. | Initiate catalog requests or approval workflows from Camunda processes. |

## Configure the connector

In Camunda Modeler, select **ServiceNow Flow Starter** from the connector templates or download it from the [Camunda Marketplace](https://marketplace.camunda.com/).

### Required fields

| Field                 | Description                                                                                                                          |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| Instance name         | Name of your ServiceNow instance (e.g., `your-instance-name`).                                                                       |
| REST API trigger path | REST API endpoint for the ServiceNow flow (e.g., `/api/camun/my_flow_name`).                                                         |
| Method                | HTTP method for the request (`POST`, `GET`, `PUT`, `PATCH`, `DELETE`).                                                               |
| Headers               | Optional HTTP headers to include in the request (e.g., `{"hello":"header"}`).                                                        |
| Query parameters      | Optional URL query parameters (e.g., `{"hello":"query"}`).                                                                           |
| Request body          | Payload sent to the ServiceNow flow, typically containing input variables or correlation data (e.g., `{"correlationValue": camId}`). |
| Authentication        | ServiceNow credentials (username and password).                                                                                      |

:::tip
Store ServiceNow credentials securely as [Camunda secrets](/components/console/manage-clusters/manage-secrets.md) and reference them in the connector configuration (e.g., `{{secrets.snUser}}`).
:::

![Configuration of the Flow Starter connector in Camunda Modeler.](../img/flow-starter.png)
_Configuration of the Flow Starter connector in Camunda Modeler._

## Example configuration

| Field                 | Example value                 |
| :-------------------- | :---------------------------- |
| Instance name         | `your-instance-name`          |
| REST API trigger path | `/api/camun/your_flow_name`   |
| Method                | `POST`                        |
| Headers               | `{"hello": "header"}`         |
| Query parameters      | `{"hello": "query"}`          |
| Request body          | `{"correlationValue": camId}` |
| Username              | `{{secrets.snUser}}`          |
| Password              | `{{secrets.snPwd}}`           |
