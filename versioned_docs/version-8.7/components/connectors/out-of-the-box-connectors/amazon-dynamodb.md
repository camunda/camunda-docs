---
id: amazon-dynamodb
sidebar_label: AWS DynamoDB
title: Amazon DynamoDB Connector
description: Use the Amazon DynamoDB Connector to connect your BPMN service with Amazon Web Service's DynamoDB Service, and work with tables and items using this service.
---

The **Amazon DynamoDB Connector** allows you to connect your BPMN service with Amazon Web Service's [DynamoDB Service](https://aws.amazon.com/dynamodb/). This can be useful for performing CRUD operations on Amazon DynamoDB tables from within a BPMN process.

## Prerequisites

To use the **Amazon DynamoDB Connector**, you need to have an AWS account with an access key and secret key to access DynamoDB, as well as a region where your DynamoDB instance is located. You can create an account and obtain the access and secret keys from the [AWS Console](https://aws.amazon.com/console/).

:::note
Use Camunda secrets to store credentials so you don't expose sensitive information directly from the process. Refer to [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.
:::

## Create an Amazon DynamoDB Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Make your Amazon DynamoDB Connector executable

To work with **Amazon DynamoDB Connector**, choose the required operation type in the **Operation** section and complete the
mandatory fields highlighted in red in the Connector properties panel on the right side of the screen.

:::note
All the mandatory and non-mandatory fields depending on the authentication selection you choose are covered in the upcoming sections.
:::

## Operation

Choose an operation type of either **Table** or **Item** in the **Operation** section:

- **Table**: Perform operations on a DynamoDB table.
- **Item**: Perform operations on a specific item in a DynamoDB table.

### Method

Choose one of the following methods:

#### [Table](#table-operations)

- [Create table](#create-table): Creates a new DynamoDB table.
- [Delete table](#delete-table): Deletes an existing DynamoDB table.
- [Describe table](#describe-table): Returns information about a DynamoDB table.
- [Scan table](#scan-table): Returns one or more items and their attributes by accessing every item in a table. You can use filter expressions to selectively scan for items that meet certain criteria.

#### [Item](#item-operations)

- [Add item](#add-item): Creates a new item or replaces an existing item with a new item.
- [Delete item](#delete-item): Deletes a single item in a table by primary key.
- [Get item](#get-item): Returns a set of attributes for the item with the given primary key.
- [Update item](#update-item): Modifies an existing item's attributes or adds a new item to the table if it does not already exist.

## Authentication

Choose an applicable authentication type from the **Authentication** dropdown. Learn more about authentication types in the related [appendix entry](#aws-authentication-types).

If you select **credentials** to access the **Amazon DynamoDB service**, the Connector requires the appropriate credentials. The following authentication options are available:

- **Access key**: Provide an access key of a user with permissions to the Amazon DynamoDB service.
- **Secret key**: Provide the secret key of the user with the access key provided above.

The Access Key and Secret Key are required properties and must be provided to use the Connector. If these properties are not set, the Connector will not be able to authenticate with the [DynamoDB Service](https://aws.amazon.com/dynamodb/).

For more information on authentication and security in Amazon DynamoDB, refer to the [AWS documentation](https://docs.aws.amazon.com/dynamodb/index.html).

## Configuration

The **Region** property in the **Configuration** section specifies the AWS region in which the DynamoDB table exists or will be created. This property is required and must be set to use the Connector.

For more information on AWS regions, refer to the [AWS documentation](https://docs.aws.amazon.com/general/latest/gr/rande.html).

## Input

The **Input** section of the **Amazon DynamoDB Connector** specifies the input data for the [selected operation](#operation). The input data varies depending on the [operation type](#operation) and [method](#method) selected.

### Table operations

For the **Table** operation type, the following input data is required:

#### Create table

**Request**

| Property name                                                                                                                                                               | Data type | Required |                                      Description                                       |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------: | :------: | :------------------------------------------------------------------------------------: |
| [Table name](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_CreateTable.html#DDB-CreateTable-request-TableName)                                         |  string   |   Yes    |                     The name of the DynamoDB table to be created.                      |
| [Partition key](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_CreateTable.html#DDB-CreateTable-request-KeySchema)                                      |  string   |   Yes    |                 The attribute name of the partition key for the table.                 |
| [Partition key role](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_CreateTable.html#DDB-CreateTable-request-KeySchema)                                 | dropdown  |   Yes    |            The role of the partition key. Can be set to "HASH" or "RANGE".             |
| [Partition key attribute data type](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_AttributeDefinition.html#DDB-Type-AttributeDefinition-AttributeType) | dropdown  |   Yes    |                     The data type of the partition key attribute.                      |
| [Sort key](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_CreateTable.html#DDB-CreateTable-request-KeySchema)                                           |  string   |    No    |           The attribute name of the sort key for the table (if applicable).            |
| [Sort key role](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_CreateTable.html#DDB-CreateTable-request-KeySchema)                                      | dropdown  |    No    |               The role of the sort key. Can be set to "HASH" or "RANGE".               |
| [Sort key attribute data type](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_AttributeDefinition.html#DDB-Type-AttributeDefinition-AttributeType)      | dropdown  |    No    |                        The data type of the sort key attribute.                        |
| [Read capacity units](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_CreateTable.html#DDB-CreateTable-request-ProvisionedThroughput)                    |  number   |   Yes    | The maximum number of strongly consistent reads per second that the table can support. |
| [Write capacity units](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_CreateTable.html#DDB-CreateTable-request-ProvisionedThroughput)                   |  number   |   Yes    |          The maximum number of writes per second that the table can support.           |
| [Billing mode](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_CreateTable.html#DDB-CreateTable-request-BillingMode)                                     | dropdown  |    No    |    The billing mode of the table. Can be set to "PROVISIONED" or "PAY_PER_REQUEST".    |
| [Deletion protection](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_CreateTable.html#DDB-CreateTable-request-GlobalSecondaryIndexUpdates)              | dropdown  |    No    |       Indicates whether to enable or disable deletion protection for the table.        |

**Response**

|                                                   Property                                                    | Data type | Description                                                                                                                                          |
| :-----------------------------------------------------------------------------------------------------------: | :-------: | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Table description](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_TableDescription.html) |  Object   | Information about the created table, including the table name, attribute definitions, primary key schema, provisioned throughput settings, and more. |

#### Delete table

**Request**

| Property name                                                                                     | Data type | Required |                  Description                  |
| :------------------------------------------------------------------------------------------------ | :-------: | :------: | :-------------------------------------------: |
| [Table name](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DeleteTable.html) |  string   |   Yes    | The name of the DynamoDB table to be deleted. |

**Response**

| Property | Data type |                                                              Description                                                              |
| :------- | :-------: | :-----------------------------------------------------------------------------------------------------------------------------------: |
| action   |  string   | The action performed. In this case, it will always be "delete Table [tableName]", where `tableName` is the name of the deleted table. |
| status   |  string   |        The status of the operation. In this case, it will always be "OK" to indicate that the table was successfully deleted.         |

#### Describe table

**Request**

| Property name                                                                                       | Data type | Required |                   Description                   |
| :-------------------------------------------------------------------------------------------------- | :-------: | :------: | :---------------------------------------------: |
| [Table name](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DescribeTable.html) |  string   |   Yes    | The name of the DynamoDB table to be described. |

**Response**

|                                                   Property                                                    | Data type | Description                                                                                                                                  |
| :-----------------------------------------------------------------------------------------------------------: | :-------: | -------------------------------------------------------------------------------------------------------------------------------------------- |
| [Table description](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_TableDescription.html) |  Object   | Information about the table, including the table name, attribute definitions, primary key schema, provisioned throughput settings, and more. |

#### Scan table

**Request**

| Property name                                                                                                                                         | Data type | Required | Description                                                                                                                                                                                                                                                                                                                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Table name](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#DDB-Scan-request-TableName)                                 | string    | Yes      | The name of the DynamoDB table to be scanned.                                                                                                                                                                                                                                                                                              |
| [Filter expression](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/QueryAndScan.html#FilterExpression)                              | string    | No       | The filter expression to apply to the scan results. For more information, refer to the [Expression Attribute Names and Values](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.ExpressionAttributeNames.html) section of the Amazon DynamoDB Developer Guide.                                                 |
| [Projection expression](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/QueryAndScan.html#ProjectionExpression)                      | string    | No       | A string that identifies one or more attributes to retrieve from the specified table.                                                                                                                                                                                                                                                      |
| [Expression attribute names](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ExpressionPlaceholders.html#ExpressionAttributeNames)   | map       | No       | A map of attribute names to their replacements in the filter expression or projection expression. For more information, refer to the [Expression Attribute Names and Values](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.ExpressionAttributeNames.html) section of the Amazon DynamoDB Developer Guide.   |
| [Expression attribute values](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ExpressionPlaceholders.html#ExpressionAttributeValues) | map       | No       | A map of attribute values to their replacements in the filter expression or projection expression. For more information, refer to the [Expression Attribute Names and Values](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.ExpressionAttributeValues.html) section of the Amazon DynamoDB Developer Guide. |

**Response**

| Property | Data type |                                                                Description                                                                |
| :------- | :-------: | :---------------------------------------------------------------------------------------------------------------------------------------: |
| action   |  string   |                                    The action performed. In this case, it will always be `scanTable`.                                     |
| status   |  string   |                The status of the operation. If successful, it will always be "OK". Otherwise, it will be an error message.                |
| items    |   list    | The list of items returned by the scan operation, in case the operation was successful. If there are no items, this field will be `null`. |

### Item operations

:::note
The **Amazon DynamoDB Connector** does not currently support binary data types. If binary data is input during the creation or update of items, it will be saved as a string.

When updating items, if an attribute of type SET is updated, it will be overwritten and saved as a list type. Consider these limitations to prevent unintended data structure modifications in your DynamoDB tables.
:::

#### Add item

**Request**

| Property name                                                                                                               | Data type | Required | Description                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------- | --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Table name](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_PutItem.html#DDB-PutItem-request-TableName) | string    | Yes      | The name of the DynamoDB table to add the item to.                                                                                                                                                                                                                                                                            |
| [Item](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_PutItem.html#DDB-PutItem-request-Item)            | object    | Yes      | The item to add to the table is represented in JSON format. For example: <br/>`{"Name": "Example Item", "ID": "123", "Description": "This is an example item"}`.<br/>This JSON object succinctly represents the item's attributes through straightforward key-value pairs, without the need to explicitly mention data types. |

**Response**

| Property                                                                                                               | Data type | Description |
| ---------------------------------------------------------------------------------------------------------------------- | --------- | ----------- | ----------------------------- |
| [Result](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_PutItem.html#API_PutItem_ResponseElements) | object    | Yes         | The item to add to the table. |

#### Delete item

**Request**

| Property name                                                                                                                                                  | Data type | Required | Description                                                  |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- | ------------------------------------------------------------ |
| [Table name](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DeleteItem.html#DDB-DeleteItem-request-TableName)                              | string    | Yes      | The name of the DynamoDB table to delete the item from.      |
| [Primary Key Components](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html#HowItWorks.CoreComponents.PrimaryKey) | object    | Yes      | The primary key components that identify the item to delete. |

**Response**

| Property                                                                                                                           | Data type | Description                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------------- |
| [Deleted Item](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DeleteItem.html#API_DeleteItem_ResponseElements) | object    | The item that was deleted. This field will be null if the item was not found. |

#### Get item

**Request**

| Property Name                                                                                                                     | Data type | Required | Description                                                                                                                                                                                                                                                                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Table name](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_GetItem.html#DDB-GetItem-request-TableName)       | string    | Yes      | The name of the table containing the requested item.                                                                                                                                                                                                                                                                                                                    |
| [Primary key components](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_GetItem.html#DDB-GetItem-request-Key) | object    | Yes      | A map of attribute names to `AttributeValue` objects, representing the primary key of the item to retrieve. For the primary key, you must provide all the attributes. For example, with a simple primary key, you only need to provide a value for the partition key. For a composite primary key, you must provide values for both the partition key and the sort key. |

**Response**

| Property                                                                                                                | Data type | Description                                                                                                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Attributes](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_GetItem.html#DDB-GetItem-response-Item) | object    | A map of attribute names to `AttributeValue` objects, representing the item retrieved. If there is no matching item, the response will contain only the consumed capacity, and a null attributes field. The keys of the attributes map correspond to the column names of the table |

#### Update item

**Request**

| Property name                                                                                                                                  | Data type | Required | Description                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| [Table name](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html#DDB-UpdateItem-request-TableName)              | string    | Yes      | The name of the table to update the item in.                                                                              |
| [Primary key components](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html#DDB-UpdateItem-request-Key)        | map       | Yes      | A map of attribute names to `AttributeValue` objects, representing the primary key of the item to update.                 |
| [Key attributes](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html#DDB-UpdateItem-request-AttributeUpdates)   | map       | Yes      | A map of attribute names to `AttributeValue` objects, representing the attributes to update.                              |
| [Attribute action](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html#DDB-UpdateItem-request-AttributeUpdates) | dropdown  | No       | Dropdown option for each attribute to be updated, allowing selection between "PUT" (add or replace) and "DELETE" (remove) |

**Response**

| Property                                                                                                                                            | Data type | Description                                                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [UpdateItemOutcome](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBMapper.Methods.html#DynamoDBMapper.Methods.updateItem) | object    | An object representing the outcome of the `UpdateItem` operation. The `UpdateItemOutcome` object contains the updated attributes of the item, as well as other metadata about the operation, such as the consumed capacity. |

## Request example

| Section        | Field                  | Description                                                                                                                        | Example value                                                               |
| -------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Operation      | Category               | Choose the category of the operation to be performed.                                                                              | Item                                                                        |
|                | Action                 | Select the specific action to update an item in the DynamoDB table.                                                                | Update item                                                                 |
| Authentication | Authentication type    | The method of AWS authentication; credentials are used here.                                                                       | Credentials                                                                 |
|                | Access key             | An example of an AWS access key.                                                                                                   | `AKIAU3GOTH...JBYX`                                                         |
|                | Secret key             | An example of an AWS secret key.                                                                                                   | `bZ/LPpqaw...0igikS`                                                        |
|                | Region                 | The AWS region where the DynamoDB table is located.                                                                                | `us-east-1`                                                                 |
| Input          | Table name             | The name of the DynamoDB table to be updated.                                                                                      | `test`                                                                      |
|                | Primary key components | The primary key component(s) of the item to be updated.                                                                            | `{"id": "5"}`                                                               |
|                | Key attributes         | JSON object representing the new values for the item attributes.                                                                   | `{ "stringValue": "StringValue", "numberValue": 42, "booleanValue": true }` |
|                | Attribute action       | The action to be performed on the attributes. Here it's set to PUT, which means the specified attributes will be added or updated. | PUT                                                                         |
| Output mapping | Result variable        | The name of the variable that will store the response from DynamoDB.                                                               | `result`                                                                    |
|                | Result expression      | The FEEL expression used to map the DynamoDB response to process variables. Not provided in the screenshots.                       | -                                                                           |

## Response Mapping

When using the DynamoDB Connector, the response from the DynamoDB Connector will be available in a temporary local `response` variable. This variable can be mapped to the process by specifying the **Result Variable**.

For example, if you use the **Update Item** method in the DynamoDB Connector, the response may look like this:

```json
{
  "action": "updateItem",
  "status": "OK",
  "response": {
    "Attributes": {
      "ID": {
        "N": "3"
      },
      "price": {
        "N": "10"
      }
    }
  }
}
```

In this example, the `response` variable contains an `Attributes` object with the updated values for the specified item.

The following fields are available in the `response` variable:

- `action`: The action that was performed by the DynamoDB Connector.
- `status`: The status of the response, which will be "OK" if the operation was successful.
- `response`: The response from the DynamoDB service, which will contain the updated attributes of the specified item.

You can choose to unpack the content of your `response` into multiple process variables using the **Result Expression**, which is a [FEEL Context Expression](/components/modeler/feel/language-guide/feel-context-expressions.md).

The **Result Expression** allows you to access specific attributes from the response and assign them to process variables that can be used in subsequent steps of your process.

```feel
= {
    id: response.response.Attributes.ID.N,
    price: response.response.Attributes.price.N
}
```

In this example, we are using the **Result Expression** to extract the **ID** and **price** attributes from the response variable and assign them to the ID and price process variables, respectively. You can then use these variables in subsequent steps of your process.

:::note
The syntax for accessing attributes in the **Result Expression** may vary depending on the structure of your response object. You can refer to the [FEEL Context Expression](/components/modeler/feel/language-guide/feel-context-expressions.md) documentation for more information on how to use the **Result Expression**.
:::

## Error handling

The **Amazon DynamoDB Connector** may throw the following exceptions:

- AwsDynamoDbConnectionException: Thrown if there is an error connecting to DynamoDB.
- AwsDynamoDbExecutionException: Thrown if there is an error executing a DynamoDB operation.
- AwsDynamoDbConfigurationException: Thrown if the Connector is not properly configured.

All of these checked exceptions are wrapped in a `RuntimeException`, so be prepared to handle this type of exception as well.

## Troubleshooting

If you are having issues with the **Amazon DynamoDB Connector**, try the following:

- Ensure your AWS credentials are correct.
- Ensure your DynamoDB table exists and is located in the specified region.
- Ensure your configuration properties are set correctly.
- Check the logs for any error messages.
- Contact (Camunda support)[https://camunda.com/services/support/] if you need further assistance.

For more information on Amazon DynamoDB, visit the [official documentation](https://docs.aws.amazon.com/dynamodb/).

## Using DynamoDB Connector best practice

When using the DynamoDB Connector in a BPMN process, it is important to keep in mind that there is no guarantee that a requested item will be retrieved or updated immediately. In this case, it is recommended to build your BPMN diagram to periodically retry polling until the item is available.

:::note
To avoid performance issues, it is recommended to limit the number of retries.
:::

To learn more about implementing retry logic in your BPMN diagram, you can refer to the [Camunda BPMN examples](https://camunda.com/bpmn/examples/) page, which includes examples of BPMN diagrams with timer and loop configurations.

## Appendix

### AWS authentication types

There are two options to authenticate the Connector with AWS:

- Choose **Credentials** in the **Authentication** dropdown if you have a valid pair of access and secret keys provided by your AWS account administrator. This option is applicable for both SaaS and Self-Managed users.
- Choose **Default Credentials Chain (Hybrid/Self-Managed only)** in the **Authentication** dropdown if your system is configured as an implicit authentication mechanism, such as role-based authentication, credentials supplied via environment variables, or files on target host. This option is applicable only for Self-Managed or hybrid distribution. This approach uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve required credentials.
