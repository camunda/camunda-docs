---
id: database
title: "Database"
description: "Learn how to configure Web Modeler to connect securely to supported databases, including PostgreSQL, H2, MariaDB, MSSQL, MySQL, and Oracle."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This page describes advanced database connection configuration for Web Modeler.  
For a general setup guide, visit the [configuration overview](configuration.md#database).

Web Modeler supports multiple database vendors such as PostgreSQL, MySQL, MariaDB, and Microsoft SQL Server. You can choose the one that best fits your environment.

| Database   | Default driver included | Notes                                                                  |
| ---------- | ----------------------- | ---------------------------------------------------------------------- |
| PostgreSQL | ✅ Yes                  | Supported for production use.                                          |
| H2         | ✅ Yes                  | For development, testing, or evaluation only.                          |
| MariaDB    | ✅ Yes                  | Must use a case-sensitive collation.                                   |
| MySQL      | ❌ No                   | Driver must be provided manually; must use a case-sensitive collation. |
| MSSQL      | ✅ Yes                  | Must use a case-sensitive collation.                                   |
| Oracle     | ❌ No                   | Driver must be provided manually.                                      |

## Configuring SSL for the database connection

To configure SSL between Web Modeler and the database:

- Modify the JDBC URL using `SPRING_DATASOURCE_URL` and add connection parameters.
- Provide SSL certificates and keys to the `restapi` component, if required.

Consult the [PostgreSQL documentation](https://jdbc.postgresql.org/documentation/ssl/) for details on SSL modes and their security guarantees.  
For a full list of available connection parameters, see the [PostgreSQL connection parameters reference](https://jdbc.postgresql.org/documentation/use/#connection-parameters/).

Below are examples for common SSL configurations, ordered by increasing security.

### SSL mode `require`

An SSL connection is established, but this mode remains vulnerable to person-in-the-middle attacks.

Modify the JDBC URL as follows:

```bash
jdbc:postgresql://[DB_HOST]:[DB_PORT]/[DB_NAME]?sslmode=require
```

No certificates are required for this mode.

### SSL mode `verify-full`

Web Modeler verifies the server’s identity by checking its certificate.  
This mode prevents person-in-the-middle attacks.

1. Provide the root certificate that signed the server certificate:  
   `myCA.crt -> ~/.postgresql/root.crt`
2. Modify the JDBC URL:

```bash
   jdbc:postgresql://[DB_HOST]:[DB_PORT]/[DB_NAME]?sslmode=verify-full
```

### SSL mode `verify-full` with client certificates

In this mode, both the server and Web Modeler authenticate each other using certificates.

1. Mount client certificates:
   - `myClientCertificate.pk8 -> ~/.postgresql/postgresql.pk8`
   - `myClientCertificate.crt -> ~/.postgresql/postgresql.crt`
2. Provide the root certificate:  
   `myCA.crt -> ~/.postgresql/root.crt`
3. Modify the JDBC URL:
   ```bash
   jdbc:postgresql://[DB_HOST]:[DB_PORT]/[DB_NAME]?sslmode=verify-full
   ```
4. Configure the database server to verify client certificates. See the [PostgreSQL SSL documentation](https://www.postgresql.org/docs/current/ssl-tcp.html).

## Running Web Modeler on Amazon Aurora PostgreSQL

Web Modeler supports connecting to **Amazon Aurora PostgreSQL**.  
To connect, update the following environment variables:

1. Set the JDBC URL:
   ```bash
   SPRING_DATASOURCE_URL="jdbc:aws-wrapper:postgresql://[DB_HOST]:[DB_PORT]/[DB_NAME]"
   ```
2. Set the driver class:
   ```bash
   SPRING_DATASOURCE_DRIVER_CLASS_NAME="software.amazon.jdbc.Driver"
   ```

For all available driver parameters, see the [AWS Advanced JDBC Driver documentation](https://github.com/awslabs/aws-advanced-jdbc-wrapper/wiki/UsingTheJdbcDriver#aws-advanced-jdbc-driver-parameters).

### AWS IAM authentication

To enable IAM database authentication for Aurora PostgreSQL:

1. Modify the JDBC URL:
   ```bash
   SPRING_DATASOURCE_URL="jdbc:aws-wrapper:postgresql://[DB_HOST]:[DB_PORT]/[DB_NAME]?wrapperPlugins=iam"
   ```
2. Set the username:
   ```bash
   SPRING_DATASOURCE_USERNAME="[IAM_DB_USER]"
   ```
   The username must match a database user configured for IAM authentication as described in the [Amazon Aurora documentation](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.DBAccounts.html#UsingWithRDS.IAMDBAuth.DBAccounts.PostgreSQL).
3. Remove the password variable:
   ```bash
   unset SPRING_DATASOURCE_PASSWORD
   ```

When using IAM authentication, ensure Web Modeler has permission to generate IAM authentication tokens (for example, through an attached IAM role or access key).

## Using alternative database vendors

### H2

The H2 driver is included by default.  
To use a different driver, set `SPRING_DATASOURCE_DRIVER_CLASS_NAME` to the fully qualified class name of your driver.  
Otherwise, omit this variable.

<Tabs groupId="h2-config" defaultValue="envVars" queryString values={[
{label: 'Environment variables', value: 'envVars' },
{label: 'values.yaml', value: 'valuesYaml' },
{label: 'application.yaml', value: 'applicationYaml' },
]}>

<TabItem value="envVars">

```sh
SPRING_DATASOURCE_URL="jdbc:h2:mem:[DB_NAME]" # See https://www.h2database.com/html/features.html
SPRING_DATASOURCE_USERNAME="[DB_USER]"
SPRING_DATASOURCE_PASSWORD="[DB_PASSWORD]"
SPRING_DATASOURCE_DRIVER_CLASS_NAME="[YOUR_CUSTOM_DRIVER]" # Optional
```

</TabItem>

<TabItem value="valuesYaml">

```yaml
webModeler:
  restapi:
    externalDatabase:
      enabled: true
      url: "jdbc:h2:mem:[DB_NAME]"
      user: "[DB_USER]"
      password: "[DB_PASSWORD]"
    env:
      - name: SPRING_DATASOURCE_DRIVER_CLASS_NAME
        value: "[YOUR_CUSTOM_DRIVER]"
```

</TabItem>

<TabItem value="applicationYaml">

```yaml
spring:
  datasource:
    url: jdbc:h2:mem:[DB_NAME]
    username: [DB_USER]
    password: [DB_PASSWORD]
    driver-class-name: [YOUR_CUSTOM_DRIVER] # Optional
```

</TabItem>

</Tabs>

H2 is intended for local development or testing only, not for production environments.

#### Custom schema

By default, H2 uses the `PUBLIC` schema.  
To use a custom schema, add an initialization command to the JDBC URL:

```yaml
jdbc:h2:mem:[DB_NAME];INIT=CREATE SCHEMA IF NOT EXISTS [CUSTOM_SCHEMA]\;SET SCHEMA [CUSTOM_SCHEMA]
```

### MariaDB

The MariaDB driver is provided by default, so no additional steps are required to include it.  
To use a custom database driver, set `SPRING_DATASOURCE_DRIVER_CLASS_NAME` to the fully qualified class name of your driver.  
Otherwise, omit this variable.

<Tabs groupId="mariadb-config" defaultValue="envVars" queryString values={[
{label: 'Environment variables', value: 'envVars'},
{label: 'values.yaml', value: 'valuesYaml'},
{label: 'application.yaml', value: 'applicationYaml'},
]}>

<TabItem value="envVars">

```sh
SPRING_DATASOURCE_URL="jdbc:mariadb://[DB_HOST]:[DB_PORT]/[DB_NAME]"
SPRING_DATASOURCE_USERNAME="[DB_USER]"
SPRING_DATASOURCE_PASSWORD="[DB_PASSWORD]"
SPRING_DATASOURCE_DRIVER_CLASS_NAME="[YOUR_CUSTOM_DRIVER]" # Optional; omit to use default MariaDB driver
```

</TabItem>

<TabItem value="valuesYaml">

```yaml
webModeler:
  restapi:
    externalDatabase:
      enabled: true
      url: "jdbc:mariadb://[DB_HOST]:[DB_PORT]/[DB_NAME]"
      user: "[DB_USER]"
      password: "[DB_PASSWORD]"
    env:
      - name: SPRING_DATASOURCE_DRIVER_CLASS_NAME
        value: "[YOUR_CUSTOM_DRIVER]"
```

</TabItem>

<TabItem value="applicationYaml">

```yaml
spring:
  datasource:
    url: jdbc:mariadb://[DB_HOST]:[DB_PORT]/[DB_NAME]
    username: [DB_USER]
    password: [DB_PASSWORD]
    driver-class-name: [YOUR_CUSTOM_DRIVER] # Optional
```

</TabItem>
</Tabs>

#### Case sensitivity

MariaDB uses case-insensitive collations by default.  
To enable case sensitivity, set the database collation to a case-sensitive one such as `utf8mb4_bin`.

:::note
If a case-insensitive collation is used, you may encounter unexpected behavior.  
For example, in [IDP extraction](/components/modeler/web-modeler/idp/idp-unstructured-extraction.md#extract-fields),  
a field named `amount` and another named `Amount` would be treated as identical because the database does not distinguish between them.
:::

### MSSQL

The MSSQL driver is provided by default, so no additional steps are required.  
To use a custom database driver, set `SPRING_DATASOURCE_DRIVER_CLASS_NAME` to the fully qualified class name of your driver.  
Otherwise, omit this variable.

<Tabs groupId="mssql-config" defaultValue="envVars" queryString values={[
{label: 'Environment variables', value: 'envVars'},
{label: 'values.yaml', value: 'valuesYaml'},
{label: 'application.yaml', value: 'applicationYaml'},
]}>

<TabItem value="envVars">

```sh
SPRING_DATASOURCE_URL="jdbc:sqlserver://[DB_HOST]:[DB_PORT];databaseName=[DB_NAME]"
SPRING_DATASOURCE_USERNAME="[DB_USER]"
SPRING_DATASOURCE_PASSWORD="[DB_PASSWORD]"
SPRING_DATASOURCE_DRIVER_CLASS_NAME="[YOUR_CUSTOM_DRIVER]" # Optional; omit to use default MSSQL driver
```

</TabItem>

<TabItem value="valuesYaml">

```yaml
webModeler:
  restapi:
    externalDatabase:
      enabled: true
      url: "jdbc:sqlserver://[DB_HOST]:[DB_PORT];databaseName=[DB_NAME]"
      user: "[DB_USER]"
      password: "[DB_PASSWORD]"
    env:
      - name: SPRING_DATASOURCE_DRIVER_CLASS_NAME # Optional; omit to use default MSSQL driver
        value: "[YOUR_CUSTOM_DRIVER]"
```

</TabItem>

<TabItem value="applicationYaml">

```yaml
spring:
  datasource:
    url: jdbc:sqlserver://[DB_HOST]:[DB_PORT];databaseName=[DB_NAME]
    username: [DB_USER]
    password: [DB_PASSWORD]
    driver-class-name: [YOUR_CUSTOM_DRIVER] # Optional; omit to use default MSSQL driver
```

</TabItem>
</Tabs>

#### Case sensitivity

MSSQL is case-insensitive by default.  
To enable case sensitivity, set the database collation to a case-sensitive one such as `Latin1_General_CS_AS`.

Otherwise, you may encounter unexpected behavior.  
The only current restriction is that extraction fields in [IDP extraction](../../../../../components/modeler/web-modeler/idp/idp-unstructured-extraction.md#extract-fields) will not be case-sensitive.  
This means that if you have a field named `amount`, you cannot create another field named `Amount`, because the database treats them as the same identifier.

#### Custom schema

MSSQL supports custom schemas, but this is not configurable within Web Modeler.  
To use a custom schema, set the database user’s **default schema**.

### MySQL

The MySQL driver is **not provided by default** in Camunda 8 distributions.  
You must download and provide it manually for the application to load.

1. Download the appropriate (platform-independent) MySQL driver:  
   [https://dev.mysql.com/downloads/connector/j/](https://dev.mysql.com/downloads/connector/j/)
2. If you are using Docker or Kubernetes, ensure that the folder with the library is properly mounted as a volume at this location:  
   `/driver-lib`. It will be automatically loaded by the application.

To use a custom database driver, set `SPRING_DATASOURCE_DRIVER_CLASS_NAME` to the fully qualified class name of your driver.  
Otherwise, omit this variable.

<Tabs groupId="mysql-config" defaultValue="envVars" queryString values={[
{label: 'Environment variables', value: 'envVars'},
{label: 'values.yaml', value: 'valuesYaml'},
{label: 'application.yaml', value: 'applicationYaml'},
]}>

<TabItem value="envVars">

```sh
SPRING_DATASOURCE_URL="jdbc:mysql://[DB_HOST]:[DB_PORT]/[DB_NAME]"
SPRING_DATASOURCE_USERNAME="[DB_USER]"
SPRING_DATASOURCE_PASSWORD="[DB_PASSWORD]"
SPRING_DATASOURCE_DRIVER_CLASS_NAME="[YOUR_CUSTOM_DRIVER]" # Optional; omit to use default MySQL driver
```

</TabItem>

<TabItem value="valuesYaml">

```yaml
webModeler:
  restapi:
    externalDatabase:
      enabled: true
      url: "jdbc:mysql://[DB_HOST]:[DB_PORT]/[DB_NAME]"
      user: "[DB_USER]"
      password: "[DB_PASSWORD]"
    env:
      - name: SPRING_DATASOURCE_DRIVER_CLASS_NAME # Optional; omit to use default MySQL driver
        value: "[YOUR_CUSTOM_DRIVER]"
    extraVolumeMounts:
      - name: mysql-driver
        mountPath: /driver-lib
    extraVolumes:
      - name: mysql-driver
        emptyDir: {}
    initContainers:
      - name: fetch-jdbc-drivers
        image: alpine:3.22.1
        imagePullPolicy: "Always"
        command:
          [
            "sh",
            "-c",
            "wget https://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-j-9.5.0.tar.gz -O /driver-lib/mysql.tar.gz && tar -xzf /driver-lib/mysql.tar.gz -C /driver-lib --strip-components=1",
          ]
        volumeMounts:
          - name: mysql-driver
            mountPath: /driver-lib
        securityContext:
          runAsUser: 1001
```

</TabItem>

<TabItem value="applicationYaml">

```yaml
spring:
  datasource:
    url: jdbc:mysql://[DB_HOST]:[DB_PORT]/[DB_NAME]
    username: [DB_USER]
    password: [DB_PASSWORD]
    driver-class-name: [YOUR_CUSTOM_DRIVER] # Optional; omit to use default MySQL driver
```

</TabItem>

</Tabs>

#### Case sensitivity

MySQL usually uses **case-insensitive** collations by default.  
To enable case sensitivity, set the database collation to a case-sensitive one such as `utf8mb4_0900_as_cs`.

Otherwise, you may encounter unexpected behavior.  
The only current restriction is that extraction fields in [IDP extraction](../../../../../components/modeler/web-modeler/idp/idp-unstructured-extraction.md#extract-fields) will not be case-sensitive.  
This means that if you have a field named `amount`, you cannot create another field named `Amount`, because the database treats them as the same identifier.

### Oracle

The Oracle driver is **not provided by default** in Camunda 8 distributions.  
You must download and provide it manually for the application to load.

1. Download the appropriate Oracle driver:  
   [https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html](https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html)
2. If you are using Docker or Kubernetes, ensure that the folder with the library is properly mounted as a volume at this location:  
   `/driver-lib`. It will be automatically loaded by the application.

To use a custom database driver, set `SPRING_DATASOURCE_DRIVER_CLASS_NAME` to the fully qualified class name of your driver.  
Otherwise, omit this variable.

<Tabs groupId="oracle-config" defaultValue="envVars" queryString values={[
{label: 'Environment variables', value: 'envVars'},
{label: 'values.yaml', value: 'valuesYaml'},
{label: 'application.yaml', value: 'applicationYaml'},
]}>

<TabItem value="envVars">

```sh
SPRING_DATASOURCE_URL="jdbc:oracle:thin:@//[DB_HOST]:[DB_PORT]/[DB_NAME]"
SPRING_DATASOURCE_USERNAME="[DB_USER]"
SPRING_DATASOURCE_PASSWORD="[DB_PASSWORD]"
SPRING_DATASOURCE_DRIVER_CLASS_NAME="[YOUR_CUSTOM_DRIVER]" # Optional; omit to use default Oracle driver
```

</TabItem>

<TabItem value="valuesYaml">

```yaml
webModeler:
  restapi:
    externalDatabase:
      enabled: true
      url: "jdbc:oracle:thin:@//[DB_HOST]:[DB_PORT]/[DB_NAME]"
      user: "[DB_USER]"
      password: "[DB_PASSWORD]"
    env:
      - name: SPRING_DATASOURCE_DRIVER_CLASS_NAME # Optional; omit to use default Oracle driver
        value: "[YOUR_CUSTOM_DRIVER]"
    extraVolumeMounts:
      - name: oracle-driver
        mountPath: /driver-lib
    extraVolumes:
      - name: oracle-driver
        emptyDir: {}
    initContainers:
      - name: fetch-jdbc-drivers
        image: alpine:3.22.1
        imagePullPolicy: "Always"
        command:
          [
            "sh",
            "-c",
            "wget https://download.oracle.com/otn-pub/otn_software/jdbc/237/ojdbc17.jar -O /driver-lib/ojdbc.jar",
          ]
        volumeMounts:
          - name: oracle-driver
            mountPath: /driver-lib
        securityContext:
          runAsUser: 1001
```

</TabItem>

<TabItem value="applicationYaml">

```yaml
spring:
  datasource:
    url: jdbc:oracle:thin:@//[DB_HOST]:[DB_PORT]/[DB_NAME]
    username: [DB_USER]
    password: [DB_PASSWORD]
    driver-class-name: [YOUR_CUSTOM_DRIVER] # Optional; omit to use default Oracle driver
```

</TabItem>

</Tabs>
