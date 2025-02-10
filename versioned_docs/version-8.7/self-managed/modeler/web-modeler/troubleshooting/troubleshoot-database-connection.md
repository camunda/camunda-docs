---
id: troubleshoot-database-connection
title: "Troubleshoot database connection issues"
sidebar_label: "Database connection"
---

You try to start Web Modeler, and encounter issues with the database connection.

## Using a non-empty schema

As Web Modeler uses [Flyway](https://www.red-gate.com/products/flyway/community/) to manage schema updates, the schema should not be shared.

Before the first initialization, ensure no tables or functions are present in your schema.

If your database setup requires mandatory tables or functions, Flyway may throw an exception like `Found non-empty schema(s) "<schema name>" without schema history table!`

To overcome this issue, add the property `spring.flyway.baselineOnMigrate: true` to your Web Modeler configuration and remove it after the schema has been initialized.

## Secure connection to standard PostgreSQL

Refer to the [database configuration guide](../configuration/database.md#configuring-ssl-for-the-database-connection)
for details on how to configure a secure connection to PostgreSQL.

## Secure connection to Amazon Aurora fails

You configured a custom SSL certificate in your remote Amazon Aurora PostgreSQL instance and want Web Modeler to accept
that certificate.

### Add Amazon Root CA to trust store

By default, the Java version used by `modeler-restapi` ships with the Amazon Root CA.

If you passed a custom trust store to `modeler-restapi`'s JVM process (e.g. via `JAVA_TOOL_OPTIONS` as described in
[the Zeebe connection troubleshooting guide](./troubleshoot-zeebe-connection.md#provide-the-certificate-to-the-jvm-trust-store)),
ensure the Amazon Trust Services CA are in `modeler-restapi`'s trust store (see the
[Amazon Aurora documentation](https://aws.amazon.com/blogs/security/how-to-prepare-for-aws-move-to-its-own-certificate-authority/)).

## IAM authentication against Amazon Aurora fails

You switched from standard username/password authentication to IAM authentication and Web Modeler can't obtain a connection to the database.

### Ensure the IAM account has all privileges to the Web Modeler database

After switching from standard username/password authentication to IAM authentication, privileges to Web Modeler's
database might still be associated with the old username.
Ensure the IAM account has all privileges to the Web Modeler database.
