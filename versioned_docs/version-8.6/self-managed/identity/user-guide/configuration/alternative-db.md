---
id: alternative-db
title: "Using Different DBs with Identity for OIDC"
sidebar_label: "Different DBs with Identity for OIDC"
description: "Configure Identity to use other DBs with OIDC"
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

## Overview

This guide is intended for customers those internal policies or compliance requirements prevent the use of PostgreSQL.

## Versions

Identity is tested against the following alternative relational databases:

| Camunda Version | Database Version | Driver Version |
| --------------- | ---------------- | -------------- |
| 8.6.13          | Oracle 19C       | 21.3.0.0       |
| 8.6.13          | SQL Server 2019  | 12.10.0.jre11  |

## Configuration

### Oracle

#### Provisioning the driver

The Oracle driver is not provided by default in each of the Camunda 8 distributions. Therefore, we must download the driver and supply it for the application to load.

1. Download the appropriate driver: https://download.oracle.com/otn-pub/otn_software/jdbc/237/ojdbc17.jar

2. When starting the application, set `-cp "/app/ojdbc.jar:/app/identity.jar"` in the `java` command during startup. Only necessary for Oracle.

3. If using docker or kubernetes, ensure that the folder with the library is properly mounted as a volume.

<Tabs groupId="oracle-config" defaultValue="envVars" queryString values={
[
{label: 'Environment variables', value: 'envVars' },
{label: 'values.yaml', value: 'valuesYaml' },
{label: 'application.yaml', value: 'applicationYaml' },
]}>
<TabItem value="envVars">

```sh
SPRING_DATASOURCE_URL="jdbc:oracle:thin:@(DESCRIPTION=(ADDRESS=(PROTOCOL=tcps)(HOST=${IDENTITY_DATABASE_HOST:})(PORT=${IDENTITY_DATABASE_PORT:}))(CONNECT_DATA=(SERVICE_NAME=${IDENTITY_DATABASE_NAME:}))(SECURITY=(SSL_SERVER_CERT_DN=\"CN={CERT_CN}, O={CERT_ORG},L={..},ST={..},C={..}\")))"
SPRING_DATASOURCE_DRIVER_CLASS_NAME=oracle.jdbc.OracleDriver
SPRING_JPA_DATABASE=oracle
JAVA_TOOL_OPTIONS=$JAVA_OPTS

```

</TabItem>
<TabItem value="valuesYaml">

```yaml
identity:
  externalDatabase:
    enabled: true
  # These three configuration options are added so that spring knows to connect to oracledb using it's client library
  env:
    - name: SPRING_DATASOURCE_URL
      value: 'jdbc:oracle:thin:@(DESCRIPTION=(ADDRESS=(PROTOCOL=tcps)(HOST=${IDENTITY_DATABASE_HOST:})(PORT=${IDENTITY_DATABASE_PORT:}))(CONNECT_DATA=(SERVICE_NAME=${IDENTITY_DATABASE_NAME:}))(SECURITY=(SSL_SERVER_CERT_DN="CN={CERT_CN}, O={CERT_ORG},L={..},ST={..},C={..}")))'
    - name: SPRING_DATASOURCE_DRIVER_CLASS_NAME
      value: oracle.jdbc.OracleDriver
    - name: JAVA_TOOL_OPTIONS
      value: $JAVA_OPTS
    - name: SPRING_JPA_DATABASE
      value: oracle
  # Overriding identity.command is required so that the new driver in /app will be loaded upon startup.
  command:
    - /bin/sh
    - -c
  # the wget command downloads the odbc driver, and the -cp option loads the jar in the classpath so that the module is loaded. It could be replaced with an initContainer or by loading a volume that already has the odbc driver inside.
  args:
    - |
      wget https://download.oracle.com/otn-pub/otn_software/jdbc/237/ojdbc17.jar -O /app/ojdbc.jar
      java -cp "/app/ojdbc.jar:/app/identity.jar" org.springframework.boot.loader.launch.JarLauncher
  # Extra volumes are mounted for any TLS certs necessary for the database:
  extraVolumeMounts:
    - name: "keystore-secret"
      secret:
        secretName: "keystore-secret"
  extraVolumes:
    - name: "keystore-secret"
      mountPath: "/usr/local/certificates"
```

</TabItem>
<TabItem value="applicationYaml">

```yaml
spring:
  datasource:
    url: jdbc:oracle:thin:@(DESCRIPTION=(ADDRESS=(PROTOCOL=tcps)(HOST=${IDENTITY_DATABASE_HOST:})(PORT=${IDENTITY_DATABASE_PORT:}))(CONNECT_DATA=(SERVICE_NAME=${IDENTITY_DATABASE_NAME:}))(SECURITY=(SSL_SERVER_CERT_DN=\"CN={CERT_CN}, O={CERT_ORG},L={..},ST={..},C={..}\")))
    driver-class-name: oracle.jdbc.OracleDriver
  jpa:
    database: oracle
```

</TabItem>
</Tabs>

### MSSQL

<Tabs groupId="mssql-config" defaultValue="envVars" queryString values={
[
{label: 'Environment variables', value: 'envVars' },
{label: 'values.yaml', value: 'valuesYaml' },
{label: 'application.yaml', value: 'applicationYaml' },
]}>
<TabItem value="envVars">

```sh
SPRING_DATASOURCE_URL="jdbc:sqlserver://${IDENTITY_DATABASE_HOST:}:${IDENTITY_DATABASE_PORT:};databaseName=${IDENTITY_DATABASE_NAME:};encrypt=true;hostNameInCertificate={CACERT_/CN};trustServerCertificate=false"
SPRING_DATASOURCE_DRIVER_CLASS_NAME=com.microsoft.sqlserver.jdbc.SQLServerDriver
SPRING_JPA_DATABASE=sql_server
JAVA_TOOL_OPTIONS=$JAVA_OPTS
```

</TabItem>
<TabItem value="valuesYaml">

```yaml
identity:
  externalDatabase:
    enabled: true
  # These three configuration options are added so that spring knows to connect to oracledb using it's client library
  env:
    - name: SPRING_DATASOURCE_URL
      value: "jdbc:sqlserver://${IDENTITY_DATABASE_HOST:}:${IDENTITY_DATABASE_PORT:};databaseName=${IDENTITY_DATABASE_NAME:};encrypt=true;hostNameInCertificate={CACERT_/CN};trustServerCertificate=false"
    - name: SPRING_DATASOURCE_DRIVER_CLASS_NAME
      value: com.microsoft.sqlserver.jdbc.SQLServerDriver
    - name: SPRING_JPA_DATABASE
      value: sql_server
    - name: JAVA_TOOL_OPTIONS
      value: $JAVA_OPTS
  # Extra volumes are mounted for any TLS certs necessary for the database:
  extraVolumeMounts:
    - name: "keystore-secret"
      secret:
        secretName: "keystore-secret"
  extraVolumes:
    - name: "keystore-secret"
      mountPath: "/usr/local/certificates"
```

</TabItem>
<TabItem value="applicationYaml">

```yaml
spring:
  datasource:
    url: jdbc:sqlserver://${IDENTITY_DATABASE_HOST:}:${IDENTITY_DATABASE_PORT:};databaseName=${IDENTITY_DATABASE_NAME:};encrypt=true;hostNameInCertificate={CACERT_/CN};trustServerCertificate=false
    username: user
    password: AStrongPassword
    driver-class-name: com.microsoft.sqlserver.jdbc.SQLServerDriver
  jpa:
    database: sql_server
```

</TabItem>

</Tabs>

## Troubleshooting tips

- Exec into container confirm java process has the keystore path
- Confirm certificate exists in the mounted location on the filesystem
- Test connection from pod to database with simple tool(s) JDBC tool, ping, curl, etc
