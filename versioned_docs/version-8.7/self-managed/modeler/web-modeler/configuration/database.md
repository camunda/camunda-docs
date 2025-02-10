---
id: database
title: "Database"
description: "Read details on how to connect Web Modeler with a database."
---

This page describes advanced database connection configuration for Web Modeler. For a general guide on how to set up Web Modeler's database connection, visit [the configuration overview](configuration.md#database).

## Configuring SSL for the database connection

The generic way to configure an SSL connection between Web Modeler and the database is as follows:

- Modify the JDBC URL `SPRING_DATASOURCE_URL` and customize connection parameters.
- Provide SSL certificates and keys to the `restapi` component, if required.

Consult the [PostgreSQL documentation](https://jdbc.postgresql.org/documentation/ssl/) for a description
of the different SSL modes and the security provided.

For a full list of all available connection parameters, visit the [PostgreSQL documentation](https://jdbc.postgresql.org/documentation/use/#connection-parameters/).

Below are examples for common scenarios, increasing in the level of security they provide.

### SSL mode "require"

In this mode, an SSL connection is established between Web Modeler and the database. It is still prone to
person-in-the-middle attacks.

To enable this mode, modify the JDBC URL as follows: `jdbc:postgresql://[DB_HOST]:[DB_PORT]/[DB_NAME]?sslmode=require`

No certificates are needed in Web Modeler for this mode.

### SSL mode "verify-full"

In this mode, Web Modeler requests a certificate from the database server to verify its identity. It is not
prone to person-in-the-middle attacks.

To enable this mode, mount the root certificate with which the server certificate was signed and follow these steps:

1. Provide the root certificate at this location: `myCA.crt -> ~/.postgresql/root.crt`.
2. Modify the JDBC URL: `jdbc:postgresql://[DB_HOST]:[DB_PORT]/[DB_NAME]?ssl=true`.

### SSL mode "verify-full" with client certificates

In this mode, Web Modeler requests a certificate from the database server to verify the server's identity, and
the server requests a certificate from the client to verify the client's identity.

To enable this mode, mount the client certificates and follow these steps:

1. Provide client certificates at these locations:
   1. `myClientCertificate.pk8 -> ~/.postgresl/postgresql.pk8`
   2. `myClientCertificate.crt -> ~/.postgresl/postgresql.crt`
2. Provide the root certificate at this location: `myCA.crt -> ~/.postgresql/root.crt`.
3. Modify the JDBC URL: `jdbc:postgresql://[DB_HOST]:[DB_PORT]/[DB_NAME]?ssl=true`.

Furthermore, configure the database server to verify client certificates:
[PostgreSQL documentation](https://www.postgresql.org/docs/current/ssl-tcp.html).

## Running Web Modeler on Amazon Aurora PostgreSQL

Web Modeler supports running on Amazon Aurora PostgreSQL.
To connect Web Modeler with your Amazon Aurora PostgreSQL instance, make the following configuration adjustments:

1. Modify the `SPRING_DATASOURCE_URL` environment variable: `jdbc:aws-wrapper:postgresql://[DB_HOST]:[DB_PORT]/[DB_NAME]`.
2. Add the environment variable `SPRING_DATASOURCE_DRIVER_CLASS_NAME` with the value `software.amazon.jdbc.Driver`.

For a full list of available driver parameters visit the [AWS JDBC Driver documentation](https://github.com/awslabs/aws-advanced-jdbc-wrapper/wiki/UsingTheJdbcDriver#aws-advanced-jdbc-driver-parameters).

### AWS IAM authentication

To use AWS Identity and Access Management (IAM) database authentication with your Amazon Aurora PostgreSQL
instance, in addition to the adjustments described [above](#running-web-modeler-on-amazon-aurora-postgresql), follow these steps:

1. Modify the `SPRING_DATASOURCE_URL` environment variable as follows: `jdbc:aws-wrapper:postgresql://[DB_HOST]:[DB_PORT]/[DB_NAME]?wrapperPlugins=iam`.
2. Modify the `SPRING_DATASOURCE_USERNAME` environment variable to match the database user you configured for AWS IAM authentication as described in the [Amazon Aurora documentation](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.DBAccounts.html#UsingWithRDS.IAMDBAuth.DBAccounts.PostgreSQL).
3. Remove the `SPRING_DATASOURCE_PASSWORD` environment variable.
