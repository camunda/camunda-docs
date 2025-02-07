---
id: sql
title: SQL Connector
sidebar_label: SQL
description: "Connect your BPMN process with SQL databases, learn how to create a SQL Connector, and make it executable."
---

The **SQL Connector** is an outbound Connector that allows you to connect your BPMN service with SQL databases (MariaDB, Microsoft SQL Server, PostgreSQL, MySQL).

## Prerequisites

To use the **SQL Connector**, ensure you have an SQL database instance running.

To avoid exposing your sensitive data as plain text, use Camunda secrets. Follow our documentation on [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.

## Create an SQL Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Make your SQL Connector executable

To make your **SQL Connector** executable, fill out the mandatory fields highlighted in red in the properties panel on the right side of the screen.

### Database

Select the database type you want to connect to. The **SQL Connector** supports the following databases:

- MariaDB
- Microsoft SQL Server
- MySQL
- PostgreSQL

### Connection

The **SQL Connector** supports two types of connections:

- [URI](#uri-connection): Use this option to connect to your database using a URI (similar to a connection string).
- [Detailed](#detailed-connection): Use this option to connect to your database by providing detailed connection information (host, port, database name, username, password).

#### URI connection

If you choose the URI connection type, you need to provide:

| Property   | Type                                                                         | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Example                                                                 |
| ---------- | ---------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| URI        | String                                                                       | Yes      | The URI connection string for your database. The format of the URI depends on the database type you selected. You can find more details about the URI format in the relevant official documentation for [MariaDB](https://mariadb.com/kb/en/about-mariadb-connector-j/#connection-strings), [PostgreSQL](https://jdbc.postgresql.org/documentation/use/#connecting-to-the-database), [MySQL](https://dev.mysql.com/doc/connector-j/en/connector-j-reference-jdbc-url-format.html), and [Microsoft SQL Server](https://learn.microsoft.com/en-us/sql/connect/jdbc/building-the-connection-url?view=sql-server-ver16).              | `jdbc:mysql://mysqlHost:3306/mydatabase?someOption=someValue`           |
| Properties | [Object](/components/modeler/feel/language-guide/feel-data-types.md#context) | No       | Optional properties that can be used to configure the connection. These properties are appended to the URI. You can find more details about the properties in the relevant official documentation for [MariaDB](https://mariadb.com/kb/en/about-mariadb-connector-j/#optional-url-parameters), [PostgreSQL](https://jdbc.postgresql.org/documentation/use/#connection-parameters), [MySQL](https://dev.mysql.com/doc/connector-j/en/connector-j-reference-configuration-properties.html), and [Microsoft SQL Server](https://learn.microsoft.com/en-us/sql/connect/jdbc/setting-the-connection-properties?view=sql-server-ver16). | `={useSSL:false, requireSSL:false, user: "john", password:"securePwd"}` |

#### Detailed connection

If you choose the detailed connection type, provide the following:

| Property   | Type                                                                         | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Example                                 |
| ---------- | ---------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| Host       | String                                                                       | Yes      | The host of your database.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `localhost`                             |
| Port       | Number                                                                       | Yes      | The port of your database.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `3306`                                  |
| Username   | String                                                                       | No       | The username to connect to your database.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `myuser`                                |
| Password   | String                                                                       | No       | The password to connect to your database.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `mypassword`, `{{secrets.MY_PASSWORD}}` |
| Database   | String                                                                       | No       | The name of your database.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `mydatabase`                            |
| Properties | [Object](/components/modeler/feel/language-guide/feel-data-types.md#context) | No       | Optional properties that can be used to configure the connection. You can find more details about the properties in the relevant official documentation for [MariaDB](https://mariadb.com/kb/en/about-mariadb-connector-j/#optional-url-parameters), [PostgreSQL](https://jdbc.postgresql.org/documentation/use/#connection-parameters), [MySQL](https://dev.mysql.com/doc/connector-j/en/connector-j-reference-configuration-properties.html), and [Microsoft SQL Server](https://learn.microsoft.com/en-us/sql/connect/jdbc/setting-the-connection-properties?view=sql-server-ver16). | `={useSSL:false, requireSSL:false}`     |

### Query

:::note
You should pay extra attention to the query you are executing. Make sure it is safe and does not expose your database to SQL injection attacks.
Use **[variables](#variables)** as much as possible to prevent SQL injection attacks.
:::

| Property                          | Type                                                                                                                                                    | Required                 | Description                                                                                                                                                                                                                                                                                      | Example                                      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| [Return results](#return-results) | Boolean                                                                                                                                                 | Yes (default is `false`) | If the query should return results (when using `SELECT` or `RETURNING`), set this field to `true`. Otherwise (insert, update, delete, create table or database), leave the checkbox unchecked.<br/>This property will **change** the response type.<br/>See the details [here](#return-results). | `true`                                       |
| [Query](#query-description)       | String                                                                                                                                                  | Yes                      | The SQL query you want to execute.<br/>See the details [here](#query-description).                                                                                                                                                                                                               | `SELECT * FROM mytable WHERE field = :field` |
| [Variables](#variables)           | [List](/components/modeler/feel/language-guide/feel-data-types.md#list) or [object](/components/modeler/feel/language-guide/feel-data-types.md#context) | No                       | Variables that can be used in the query.<br/>See the details [here](#variables).                                                                                                                                                                                                                 | `={field: "theFieldValue"}`, `=[24]`         |

#### Return results

- When `false`, the response (see the [output](#what-is-the-output-format-of-the-sql-connector) section) will consist of an object containing an integer (`modifiedRows`) representing the number of modified rows. This is applicable for:

  - `INSERT`
  - `UPDATE`
  - `DELETE`

This will return `0` for:

- `CREATE TABLE`
- `CREATE DATABASE`, except for MySQL, where it will return `1`

- When `true`, the response will be a list of objects. This list will contain the results of the `SELECT` query.<br/>For instance, `SELECT * FROM mytable`, where `mytable` is a table with columns' `name` and `age`, will return:

  ```json
  {
    "resultSet": [
      {
        "name": "John Doe",
        "age": 29
      },
      {
        "name": "Jane Doe",
        "age": 27
      }
    ]
  }
  ```

#### Query {#query-description}

The query you want to execute. We currently support the following SQL queries:

- `SELECT`
- `INSERT`
- `UPDATE`
- `DELETE`
- `CREATE TABLE`
- `CREATE DATABASE`

The query might contain variables that can be used in the query, and we recommend using them as a best practice to prevent SQL injection attacks. See the [variables](#variables) section for more details.

#### Variables

Variables need to be provided as a list or an object. We provide three ways to use variables in your query:

| Type                  | Query example                                                                                                                                   | Variables example                                                                          |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Named parameters      | `SELECT * FROM mytable WHERE field = :field`<br/><br/>`INSERT INTO Employee (id, name, age, department) VALUES (:id, :name, :age, :department)` | `={field: "theFieldValue"}`<br/><br/>`={id: 1, name: "John", age: 34, department: "Dept"}` |
| Positional parameters | `SELECT * FROM mytable WHERE field = ?`<br/><br/>`INSERT INTO Employee (id, name, age, department) VALUES (?, ?, ?, ?)`                         | `=["theFieldValue"]`<br/><br/>`=[1, "John", 34, "Dept"]`                                   |
| List parameters       | `SELECT * FROM mytable WHERE field IN (<listField>)`                                                                                            | `={listField: ["val1", "val2"]}`                                                           |

## Appendix & FAQ

### How do I store secrets for my Connector?

Use Camunda secrets to avoid exposing your credentials. Follow our documentation on [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.

### What is the output format of the SQL Connector?

Depending on the type of query you execute, the response will contain either the number of modified rows (an object with a `modifiedRows` attribute) or the result set (an object with a `resultSet` attribute).

- If the query **doesn't return results** (insert, update, delete, create table or database), the response will consist of an integer representing the number of modified rows. See the [return results](#return-results) section for more details.

  In this case, the response will look like this:

  ```json
  {
    "modifiedRows": 1
  }
  ```

- If the query is a `SELECT` query (or uses the `RETURNING` keyword), the response will be an object with a `resultSet` property (as a list). This list will contain the results of the `SELECT` query as explained in the [return results](#return-results) section.
  For instance, `SELECT * FROM mytable`, where `mytable` is a table with columns' `name` and `age`, will return:
  ```json
  {
    "resultSet": [
      {
        "name": "John Doe",
        "age": 29
      },
      {
        "name": "Jane Doe",
        "age": 27
      }
    ]
  }
  ```
