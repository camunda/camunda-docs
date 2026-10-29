---
id: amazon-dynamodb
sidebar_label: AWS DynamoDB
title: Amazon DynamoDB connector
description: Create, delete, describe, and scan tables, and add, get, update, and delete items in Amazon DynamoDB from your BPMN process.
---

import OutboundConnectorBasics from '../../../components/react-components/\_connector-outbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'

Use the Amazon DynamoDB connector to work with tables and items in [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) from your BPMN process.

## About this connector

The **Amazon DynamoDB connector** is an outbound connector that connects your BPMN process with the Amazon DynamoDB service. Use it to perform create, read, update, and delete (CRUD) operations on DynamoDB tables and items from within a process.

The connector supports the following operations:

- **Table**: Create table, Delete table, Describe table, and Scan table.
- **Item**: Add item, Delete item, Get item, and Update item.

## Prerequisites

To use the **Amazon DynamoDB connector**, you need an AWS account with an access key and secret key to access DynamoDB, and the region where your DynamoDB tables are located. You can create an account and obtain the keys from the [AWS Console](https://aws.amazon.com/console/).

Learn more about Amazon DynamoDB in the [Amazon DynamoDB documentation](https://docs.aws.amazon.com/dynamodb/index.html).

:::note
Use secrets to store credentials and avoid exposing sensitive information from the process.
See [managing secrets](/components/console/manage-clusters/manage-secrets.md).
:::

<OutboundConnectorBasics />

## Configuration

### Authentication

| Property       | Type     | Required                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Example |
| :------------- | :------- | :-------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Authentication | Dropdown | Yes                                           | <p>The AWS authentication strategy:</p><ul><li><p>**Credentials** (SaaS/Self-Managed): Use this option if you have a valid pair of access and secret keys provided by your AWS account administrator.</p></li><li><p>**Default Credentials Chain** (Hybrid/Self-Managed only): Use this option if your system is configured for implicit authentication, such as role-based authentication, credentials supplied through environment variables, or files on the target host. This approach uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve the required credentials.</p></li></ul> |         |
| Access key     | String   | Yes, if **Authentication** is **Credentials** | The access key of an IAM user with permissions to the Amazon DynamoDB service.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |         |
| Secret key     | String   | Yes, if **Authentication** is **Credentials** | The secret key of the IAM user with the access key above.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |         |

### Region

| Property | Type   | Required | Description                                                   | Example     |
| :------- | :----- | :------- | :------------------------------------------------------------ | :---------- |
| Region   | String | Yes      | The AWS region where the DynamoDB table exists or is created. | `us-east-1` |

For more information on AWS regions, see the [AWS documentation](https://docs.aws.amazon.com/general/latest/gr/rande.html).

## Operations

Select the category in the **Choose category** dropdown (**Table** or **Item**), and then select the operation in the **Select action** dropdown. The properties that apply depend on the action.

:::note
The **Amazon DynamoDB connector** does not currently support binary data types. If binary data is input during the creation or update of items, it is saved as a string.

When you update items, an attribute of type SET is overwritten and saved as a list type. Consider these limitations to prevent unintended data structure modifications in your DynamoDB tables.
:::

### Create table

Create a new DynamoDB table. The connector waits until the table is active before it returns.

#### Input parameters

| Property                          | Type     | Required | Description                                                                                                                                         | Example |
| :-------------------------------- | :------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Table name                        | String   | Yes      | The name of the DynamoDB table to create.                                                                                                           |         |
| Partition key                     | String   | Yes      | The attribute name of the partition key of the table.                                                                                               |         |
| Partition key role                | Dropdown | Yes      | The role of the partition key attribute: **HASH** or **RANGE**.                                                                                     |         |
| Partition key attribute data type | Dropdown | Yes      | The data type of the partition key attribute: **Binary**, **Number**, or **String**.                                                                |         |
| Sort key                          | String   | No       | The attribute name of the sort key of the table, if the table has one.                                                                              |         |
| Sort key role                     | Dropdown | No       | The role of the sort key attribute: **HASH** or **RANGE**.                                                                                          |         |
| Sort key attribute data type      | Dropdown | No       | The data type of the sort key attribute: **Binary**, **Number**, or **String**.                                                                     |         |
| Read capacity units               | Number   | Yes      | The maximum number of strongly consistent reads per second that the table supports. The connector uses it when **Billing mode** is **PROVISIONED**. |         |
| Write capacity units              | Number   | Yes      | The maximum number of writes per second that the table supports. The connector uses it when **Billing mode** is **PROVISIONED**.                    |         |
| Billing mode                      | Dropdown | Yes      | Controls how you are charged for read and write throughput: **PROVISIONED** or **PAY_PER_REQUEST**.                                                 |         |
| Deletion protection               | Dropdown | Yes      | Prevents accidental table deletion: **True** or **False**. The default is **False**.                                                                |         |

For details on the key schema and billing modes, see the [CreateTable API reference](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_CreateTable.html).

#### Output

The connector returns the description of the created table. It includes, among others, the following fields:

- `tableName`: The name of the table.
- `tableStatus`: The status of the table.
- `keySchema`: The key schema of the table.
- `attributeDefinitions`: The attribute definitions of the table.
- `provisionedThroughput`: The provisioned throughput settings of the table.
- `billingModeSummary`: The billing mode of the table.
- `deletionProtectionEnabled`: Whether deletion protection is enabled.
- `tableArn` and `tableId`: The Amazon Resource Name (ARN) and the ID of the table.

For all fields, see [TableDescription](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_TableDescription.html) in the AWS documentation.

### Delete table

Delete an existing DynamoDB table. The connector waits until the table no longer exists before it returns.

#### Input parameters

| Property   | Type   | Required | Description                               | Example |
| :--------- | :----- | :------- | :---------------------------------------- | :------ |
| Table name | String | Yes      | The name of the DynamoDB table to delete. |         |

#### Output

The connector returns the following fields:

- `action`: The action performed, in the format `delete Table [<table name>]`.
- `status`: The status of the operation. `OK` indicates that the table was deleted.

Example response:

```json
{
  "action": "delete Table [test]",
  "status": "OK"
}
```

### Describe table

Return information about a DynamoDB table.

#### Input parameters

| Property   | Type   | Required | Description                                 | Example |
| :--------- | :----- | :------- | :------------------------------------------ | :------ |
| Table name | String | Yes      | The name of the DynamoDB table to describe. |         |

#### Output

The connector returns the description of the table, with the same fields as the output of [Create table](#create-table). For all fields, see [TableDescription](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_TableDescription.html) in the AWS documentation.

To use the status of the table in your process, use a result expression such as:

```feel
= {
    tableStatus: response.tableStatus
}
```

### Scan table

Return the items of a table by accessing every item in it. Use a filter expression to return only the items that meet certain criteria.

#### Input parameters

| Property                    | Type   | Required | Description                                                                                                                                                                                                                                                                                               | Example |
| :-------------------------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Table name                  | String | Yes      | The name of the DynamoDB table to scan.                                                                                                                                                                                                                                                                   |         |
| Filter expression           | String | No       | The filter expression to apply to the scan results. See [filter expressions](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Scan.html#Scan.FilterExpression) in the Amazon DynamoDB Developer Guide.                                                                                    |         |
| Projection expression       | String | No       | A string that identifies the attributes to retrieve. For multiple attributes, separate the names with commas.                                                                                                                                                                                             |         |
| Expression attribute names  | String | No       | A FEEL expression with a map of placeholders to attribute names. Use it as an alternative to actual attribute names in the filter or projection expression. See [expression attribute names](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.ExpressionAttributeNames.html). |         |
| Expression attribute values | String | No       | A FEEL expression with a map of placeholders to the substitution values used in the filter or projection expression. See [expression attribute values](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.ExpressionAttributeValues.html).                                      |         |

To learn more about Friendly Enough Expression Language (FEEL) expressions, see [what is FEEL?](/components/modeler/feel/what-is-feel.md).

#### Output

The connector returns the following fields:

- `action`: The action performed. Always `scanTable`.
- `status`: The status of the operation. `OK` indicates success.
- `response`: The list of items returned by the scan. If the scan returns no items, this field is `null`.

Example response:

```json
{
  "action": "scanTable",
  "status": "OK",
  "response": [
    {
      "id": "5",
      "name": "Example item"
    }
  ]
}
```

To use the items in your process, use a result expression such as:

```feel
= {
    items: response.response
}
```

### Add item

Create a new item or replace an existing item with a new item.

#### Input parameters

| Property   | Type   | Required | Description                                                                                                                                                                                                                     | Example |
| :--------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------ |
| Table name | String | Yes      | The name of the DynamoDB table to add the item to.                                                                                                                                                                              |         |
| Item       | String | Yes      | A FEEL expression with the item to add, as a JSON object of attribute names and values. You do not need to specify data types. For example: `={"Name": "Example Item", "ID": "123", "Description": "This is an example item"}`. |         |

#### Output

The connector returns the following fields:

- `item`: The attributes returned by DynamoDB as a plain object, or `null` if DynamoDB returns none.
- `putItemResult`: The result of the put request, with the fields `sdkResponseMetadata`, `sdkHttpMetadata`, `attributes`, `consumedCapacity`, and `itemCollectionMetrics`.

### Delete item

Delete a single item in a table by primary key.

#### Input parameters

| Property               | Type   | Required | Description                                                                                                                                      | Example |
| :--------------------- | :----- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Table name             | String | Yes      | The name of the DynamoDB table to delete the item from.                                                                                          |         |
| Primary key components | String | Yes      | A FEEL expression with the primary key of the item to delete. A simple primary key has the partition key. A composite key also has the sort key. |         |

#### Output

The connector returns the following fields:

- `item`: The attributes returned by DynamoDB as a plain object, or `null` if DynamoDB returns none.
- `deleteItemResult`: The result of the delete request, with the fields `sdkResponseMetadata`, `sdkHttpMetadata`, `attributes`, `consumedCapacity`, and `itemCollectionMetrics`.

### Get item

Return the attributes of the item with the given primary key.

#### Input parameters

| Property               | Type   | Required | Description                                                                                                                                                                                        | Example |
| :--------------------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Table name             | String | Yes      | The name of the table that contains the requested item.                                                                                                                                            |         |
| Primary key components | String | Yes      | A FEEL expression with the primary key of the item to retrieve. Provide all key attributes: for a simple primary key, the partition key; for a composite primary key, the partition and sort keys. |         |

#### Output

The connector returns a list with one object per attribute of the item, for example one object for each column of the table. If no item matches, the output is `null`.

Example response:

```json
[
  {
    "id": "5"
  },
  {
    "name": "Example item"
  }
]
```

### Update item

Modify the attributes of an existing item, or add a new item to the table if it does not exist.

#### Input parameters

| Property               | Type     | Required | Description                                                                                                | Example |
| :--------------------- | :------- | :------- | :--------------------------------------------------------------------------------------------------------- | :------ |
| Table name             | String   | Yes      | The name of the table that contains the item to update.                                                    |         |
| Primary key components | String   | Yes      | A FEEL expression with the primary key of the item to update.                                              |         |
| Key attributes         | String   | Yes      | A FEEL expression with the attribute names and values to write to the item.                                |         |
| Attribute action       | Dropdown | Yes      | The action to apply to the attributes: **PUT** sets the attribute value, **DELETE** removes the attribute. |         |

#### Output

The connector returns the following fields:

- `item`: The attributes returned by DynamoDB as a plain object, or `null` if DynamoDB returns none.
- `updateItemResult`: The result of the update request, with the fields `sdkResponseMetadata`, `sdkHttpMetadata`, `attributes`, `consumedCapacity`, and `itemCollectionMetrics`.

## Example

The following example updates an item in a DynamoDB table.

| Section        | Field                  | Description                                                                                | Example value                                                               |
| -------------- | ---------------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| Operation      | Choose category        | The category of the operation to perform.                                                  | Item                                                                        |
|                | Select action          | The action to update an item in the DynamoDB table.                                        | Update item                                                                 |
| Authentication | Authentication         | The method of AWS authentication. Credentials are used here.                               | Credentials                                                                 |
|                | Access key             | An example of an AWS access key.                                                           | `AKIAU3GOTH...JBYX`                                                         |
|                | Secret key             | An example of an AWS secret key.                                                           | `bZ/LPpqaw...0igikS`                                                        |
|                | Region                 | The AWS region where the DynamoDB table is located.                                        | `us-east-1`                                                                 |
| Input          | Table name             | The name of the DynamoDB table to update.                                                  | `test`                                                                      |
|                | Primary key components | The primary key component(s) of the item to update.                                        | `{"id": "5"}`                                                               |
|                | Key attributes         | JSON object with the new values for the item attributes.                                   | `{ "stringValue": "StringValue", "numberValue": 42, "booleanValue": true }` |
|                | Attribute action       | The action to perform on the attributes. **PUT** adds or updates the specified attributes. | PUT                                                                         |
| Output mapping | Result variable        | The name of the variable that stores the response from DynamoDB.                           | `result`                                                                    |

## Best practices

There is no guarantee that a requested item is retrieved or updated immediately. Build your BPMN diagram to periodically retry until the item is available.

:::note
To avoid performance issues, limit the number of retries.
:::

To learn more about implementing retry logic in your BPMN diagram, see the [Camunda BPMN examples](https://camunda.com/bpmn/examples/), which include diagrams with timer and loop configurations.

<ErrorHandling />

### Check your configuration

If you have issues with the **Amazon DynamoDB connector**, try the following:

- Ensure your AWS credentials are correct.
- Ensure your DynamoDB table exists and is located in the specified region.
- Ensure your configuration properties are set correctly.
- Check the logs for any error messages.
- Contact [Camunda support](https://camunda.com/services/support/) if you need further assistance.

## Further resources

- [Amazon DynamoDB documentation](https://docs.aws.amazon.com/dynamodb/)
- [Amazon DynamoDB API reference](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/Welcome.html)
