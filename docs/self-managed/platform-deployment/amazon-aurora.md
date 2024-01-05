---
id: amazon-aurora-postgresql
title: "Amazon Aurora PostgreSQL"
keywords: ["amazon aurora"]
---

This document contains details for running Amazon Aurora PostgreSQL on various components like Web Modeler and Identity.

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

## Running Identity on Amazon Aurora PostgreSQL

Identity supports running on Amazon Aurora PostgreSQL.
To connect Identity with your Amazon Aurora PostgreSQL instance, make the following configuration adjustments:

1. Modify the `SPRING_DATASOURCE_URL` environment variable: `jdbc:aws-wrapper:postgresql://[DB_HOST]:[DB_PORT]/[DB_NAME]`.
2. Add the environment variable `SPRING_DATASOURCE_DRIVER_CLASS_NAME` with the value `software.amazon.jdbc.Driver`.

For a full list of available driver parameters visit the [AWS JDBC Driver documentation](https://github.com/awslabs/aws-advanced-jdbc-wrapper/wiki/UsingTheJdbcDriver#aws-advanced-jdbc-driver-parameters).

### AWS IAM authentication

To use AWS Identity and Access Management (IAM) database authentication with your Amazon Aurora PostgreSQL
instance, in addition to the adjustments described [above](#running-identity-on-amazon-aurora-postgresql), follow these steps:

1. Modify the `SPRING_DATASOURCE_URL` environment variable as follows: `jdbc:aws-wrapper:postgresql://[DB_HOST]:[DB_PORT]/[DB_NAME]?wrapperPlugins=iam`.
2. Modify the `SPRING_DATASOURCE_USERNAME` environment variable to match the database user you configured for AWS IAM authentication as described in the [Amazon Aurora documentation](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.DBAccounts.html#UsingWithRDS.IAMDBAuth.DBAccounts.PostgreSQL).
3. Remove the `SPRING_DATASOURCE_PASSWORD` environment variable.
