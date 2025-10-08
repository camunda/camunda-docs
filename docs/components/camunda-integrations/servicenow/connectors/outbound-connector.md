---
id: outbound-connector
title: ServiceNow Outbound Connector
description: "Perform CRUD operations on any ServiceNow table directly from Camunda processes using the ServiceNow outbound connector."
---

The **ServiceNow Outbound Connector** allows Camunda processes to interact directly with ServiceNow tables through REST APIs. You can create, read, update, and delete records in any table, enabling powerful integrations without writing custom scripts.

## Supported operations

| Operation  | Description                                                       | Example use case                                                   |
| :--------- | :---------------------------------------------------------------- | :----------------------------------------------------------------- |
| **Create** | Inserts a new record into a ServiceNow table.                     | Creating a new incident or service request from a Camunda process. |
| **Read**   | Retrieves records from a ServiceNow table using query parameters. | Looking up user details or checking incident status.               |
| **Update** | Modifies fields of an existing record.                            | Updating ticket status or assignment group.                        |
| **Delete** | Removes a record from a table by its `sys_id`.                    | Deleting temporary or test records after processing.               |

## Configuration

In Camunda Modeler, configure the outbound connector by selecting **ServiceNow Outbound Connector** from the connector templates or download it from the Camunda Marketplace.

The following fields are typically required:

| Field                    | Description                                                                                                      |
| :----------------------- | :--------------------------------------------------------------------------------------------------------------- |
| **Instance name**        | Only the name of your ServiceNow instance (e.g. `your-instance-name`).                                           |
| **Operation**            | One of `Create`, `Read`, `Update`, or `Delete`.                                                                  |
| **Target table**         | The target ServiceNow table (e.g. `incident`, `sc_task`, `sc_req_item`).                                         |
| **Payload**              | JSON data sent to ServiceNow for `Create` and `Update` operations.                                               |
| **Authentication**       | ServiceNow credentials (username and password).                                                                  |
| **Query parameters**     | For `Read` operations. Filter records separated by multiple conditions with '^' (e.g. `active=true^priority=1`). |
| **Sys ID of the record** | Required for `Update` and `Delete` operations to identify the target record.                                     |

:::tip
Authentication - Store your ServiceNow credentials securely as [Camunda secrets](/components/console/manage-clusters/manage-secrets.md) and reference them in the connector configuration (e.g. `{{secrets.snUser}}`).
:::

![ServiceNow Outbound Connector example](../img/outbound-connector.png)
_Configuration of the ServiceNow Outbound Connector in Camunda Modeler._

## Example: Create requested item

This connector configuration shows how to create a new Requested Item in ServiceNow from a Camunda process.

| Field             | Example value                                                                                                         |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------- |
| **Instance name** | `your-instance-name`                                                                                                  |
| **Operation**     | `Create`                                                                                                              |
| **Target table**  | `Requested Item [sc_req_item]`                                                                                        |
| **Payload**       | `{"short_description": "Database maintenance scheduled via Camunda process", "category": "Hardware","priority": "2"}` |
| **Username**      | `{{secrets.snUser}}` (ServiceNow username stored securely as Camunda Secrets)                                         |
| **Password**      | `{{secrets.snPwd}}` (ServiceNow password stored securely as Camunda Secrets)                                          |
