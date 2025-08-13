---
id: csv
sidebar_label: CSV
title: CSV connector
description: Reads CSV files and converts JSON data into CSV format for further usage
---

The **CSV connector** reads CSV files and converts JSON data to CSV format for document or text use.

## Create a CSV connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Operations

The **CSV connector** supports operations to [read](#read-csv) and [write](#write-csv) CSVs.

### Read CSV

Reads a CSV from a text or a document and converts it into an array of JSON records.

| Property           | Type                                              | Description                                                                                                                                                                                                                                                                        | Required | Example                                              |
| ------------------ | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------- |
| Data               | Document or String                                | The CSV data as a document or text.                                                                                                                                                                                                                                                | Yes      | [Example CSV](#example-csv-input)                    |
| Delimiter          | String                                            | The delimiter used to separate each column.                                                                                                                                                                                                                                        | No       | Defaults to `,`                                      |
| Skip header record | Boolean                                           | Whether to skip the first row (header) in the records.                                                                                                                                                                                                                             | No       | Defaults to `true`                                   |
| Headers            | Array of strings                                  | Used when no header is present or to override column names.                                                                                                                                                                                                                        | No       | Defaults to `[]`. Example: `["name","cost","count"]` |
| Row type           | String                                            | Determines the structure of the result records.                                                                                                                                                                                                                                    | No       | Defaults to `Object`. Either `Object` or `Array`.    |
| Record mapping     | [FEEL](../../../modeler/feel/what-is-feel) script | The FEEL script will be evaluated against every record. All data returned by this mapping script will be part of the results. This can be useful for parsing string-based CSV data into different types like numbers. Returning `null` excludes the record from the final results. | No       | [Example script](#example-with-record-mapping)       |

#### Example CSV `Data` input:

```csv
product,quantity,price
Wireless Mouse,25,29.99
Office Chair,8,149.50n
USB Cable,100,12.99
Monitor Stand,15,45.00
Desk Lamp,32,24.95
```

:::info
To pass the CSV `Data` as a FEEL string, end lines with `\r\n`. This is the default line separator when reading CSV files. For example:

```
="product,quantity,price\r\nWireless Mouse,25,29.99\r\nOffice Chair,8,149.50\r\nUSB Cable,100,12.99\r\nMonitor Stand,15,45.00\r\nDesk Lamp,32,24.95"
```

:::

#### Example output for row type `Object`

```json
{
  "records": [
    { "product": "Wireless Mouse", "quantity": "25", "price": "29.99" },
    { "product": "Office Chair", "quantity": "8", "price": "149.50" },
    { "product": "USB Cable", "quantity": "100", "price": "12.99" },
    { "product": "Monitor Stand", "quantity": "15", "price": "45.00" },
    { "product": "Desk Lamp", "quantity": "32", "price": "24.95" }
  ]
}
```

Based on the `Object` [example](#example-output-for-row-type-object) above, you can access the CSV data in your result expression for further processing:

```
= {
  sum: sum(for r in records return number(r.quantity))
}
```

#### Example output for row type `Array`

```json
{
  "records": [
    ["Wireless Mouse", "25", "29.99"],
    ["Office Chair", "8", "149.50"],
    ["USB Cable", "100", "12.99"],
    ["Monitor Stand", "15", "45.00"],
    ["Desk Lamp", "32", "24.95"]
  ]
}
```

Based on the `Array` [example](#example-output-for-row-type-array) above, you can access the CSV data in your result expression for further processing:

```
= {
  sum: sum(for r in records return number(r[2]))
}
```

#### Example with record mapping

Based on the data of the `Object` [example](#example-output-for-row-type-object) above, we can use the following [FEEL](../../../modeler/feel/what-is-feel) script to extract only the `product` and the `price` converted to a number per record:

```
= {
  product: record.product,
  price: number(record.price)
}
```

Leading to the following output:

```
[
  {"product":"Wireless Mouse","price":29.99},
  {"product":"Office Chair","price":149.5},
  {"product":"USB Cable","price":12.99},
  {"product":"Monitor Stand","price":45},
  {"product":"Desk Lamp","price":24.95}
]
```

We can also use the record mapping as a filter to only include certain records in the final results:

```
= if number(record.price) >= 30 then {product: record.product, price: number(record.price)} else null
```

This will exclude all products with a price lower than 30 from the final results:

```
[
  {"product":"Office Chair","price":149.5},
  {"product":"Monitor Stand","price":45}
]
```

### Write CSV

Takes an array of JSON objects and creates a CSV from it. The result can either be stored as a document for further processing (e.g., uploading) or returned as a string.

| Property           | Type             | Description                                                                                                                              | Required | Example                                                                                                                                                                                                                                                                |
| :----------------- | :--------------- | :--------------------------------------------------------------------------------------------------------------------------------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Data               | Array            | The CSV data as an array of objects or arrays                                                                                            | Yes      | [Object](#example-for-an-object-based-data-input) and [Array](example-for-an-array-based-data-input) example.                                                                                                                                                          |
| Create document    | Boolean          | If `true` the connector will store the CSV document in Camunda and returns a reference. If `false` the CSV will be returned as a string. | No       | Defaults to `false` and leads to the creation of a [string](#example-output-for-a-csv-returned-as-a-string) with the data in the CSV format. If set to `true` a [document](#example-output-for-a-csv-stored-in-a-document) will created and returned by the Connector. |
| Delimiter          | String           | The delimiter used to separate each column.                                                                                              | No       | Defaults to `,`                                                                                                                                                                                                                                                        |
| Skip header record | Boolean          | Whether to include the first row in the records or not.                                                                                  | No       | Defaults to `true`                                                                                                                                                                                                                                                     |
| Headers            | Array of strings | Can be used when there is no header record present in the record or to change the column names if there is a header record.              | No       | Defaults to `[]`. Example: `["name","cost","count"]`. Needs to be specified when using object-based arrays as the `Data` input.                                                                                                                                        |

#### Example for an object-based `Data` input

Every record for an object-based `Data` input contains all column names as their property (key) names. The values of the properties
will be written into the CSV.

```json
{
  "records": [
    { "product": "Wireless Mouse", "quantity": "25", "price": "29.99" },
    { "product": "Office Chair", "quantity": "8", "price": "149.50" },
    { "product": "USB Cable", "quantity": "100", "price": "12.99" },
    { "product": "Monitor Stand", "quantity": "15", "price": "45.00" },
    { "product": "Desk Lamp", "quantity": "32", "price": "24.95" }
  ]
}
```

:::info

`Headers` must be specified when using object-based arrays as the `Data` input
when writing a CSV. The `Headers` must match the property names of the objects. For the example above,
one would provide the following value for `Headers`:

```json
=["product", "quantity", "price"]
```

:::

#### Example for an array-based `Data` input

Every record for an array-based `Data` input contains all values in a single array per row.

```json
[
  ["Wireless Mouse", "25", "29.99"],
  ["Office Chair", "8", "149.50n"],
  ["USB Cable", "100", "12.99"],
  ["Monitor Stand", "15", "45.00"],
  ["Desk Lamp", "32", "24.95"]
]
```

#### Example output for a CSV returned as a string

```json
{
  "content": "Wireless Mouse,25,29.99\r\nOffice Chair,8,149.50n\r\nUSB Cable,100,12.99\r\nMonitor Stand,15,45.00\r\nDesk Lamp,32,24.95\r\n"
}
```

#### Example output for a CSV stored in a document

```json
{
  "document": {
    "storeId": "in-memory",
    "documentId": "8b54b413-b847-4650-b445-de963d5c506d",
    "contentHash": "ed0f7ad835669698a108a32b2a99e89e4f5aea84127fde68df4248b11197b0e5",
    "metadata": {
      "contentType": "text/csv",
      "size": 114,
      "fileName": "8b54b413-b847-4650-b445-de963d5c506d"
    },
    "camunda.document.type": "camunda"
  }
}
```
