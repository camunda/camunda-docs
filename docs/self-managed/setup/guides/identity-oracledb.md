---
id: identity-oracledb
title: "Using OracleDB with Identity for OIDC"
sidebar_label: "OracleDB with Identity for OIDC"
description: "Configure Identity to use OracleDB with OIDC"
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

## Overview

For those with company requirements preventing them from using postgresql.

## Scope

For this guide, we will not focus on Optimize or Web Modeler, which normally would also connect to postgresql. These components should be disabled since they will not work without postgresql.

```yaml
postgresql:
  enabled: false
identityKeycloak:
  enabled: false
identityPostgresql:
  enabled: false
webModeler:
  enabled: false
webModelerPostgresql:
  enabled: false
optimize:
  enabled: false
```

## Versions

We tested with the following versions

| Camunda Version | Database Version       | Driver Version |
| --------------- | ---------------------- | -------------- |
| 8.6.13          | Oracle 19C (Preferred) | 21.3.0.0       |
| 8.6.13          | SQL Server 2019        | 12.10.0.jre11  |

## Configuration

<Tabs groupId="featured" defaultValue="envVars" queryString values={
[
{label: 'Environment variables', value: 'envVars' },
{label: 'values.yaml', value: 'valuesYaml' },
{label: 'application.yaml', value: 'applicationYaml' },
]}>
<TabItem value="envVars">

```sh
SPRING_DATASOURCE_URL="jdbc:oracle:thin:@(DESCRIPTION=(ADDRESS=(PROTOCOL=tcps)(HOST=oracle.example.com)(PORT=2484))(CONNECT_DATA=(SERVICE_NAME=orcl)))"
SPRING_DATASOURCE_DRIVER_CLASS_NAME=oracle.jdbc.OracleDriver
JAVA_TOOL_OPTIONS=$JAVA_OPTS
```

</TabItem>
<TabItem value="valuesYaml">

```yaml
identity:
  keycloak:
    enabled: false
  externalDatabase:
    enabled: true
  env:
    - name: SPRING_DATASOURCE_URL
      value: "jdbc:oracle:thin:@(DESCRIPTION=(ADDRESS=(PROTOCOL=tcps)(HOST=oracle.example.com)(PORT=2484))(CONNECT_DATA=(SERVICE_NAME=orcl)))"
    - name: SPRING_DATASOURCE_DRIVER_CLASS_NAME
      value: oracle.jdbc.OracleDriver
    - name: JAVA_TOOL_OPTIONS
      value: $JAVA_OPTS
  command:
    - /bin/sh
    - -c
  args:
    - |
      wget https://download.oracle.com/otn-pub/otn_software/jdbc/237/ojdbc17.jar -O /app/ojdbc.jar
      java -cp "/app/ojdbc.jar:/app/identity.jar" org.springframework.boot.loader.launch.JarLauncher
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
    url: jdbc:oracle:thin:@(DESCRIPTION=(ADDRESS=(PROTOCOL=tcps)(HOST=oracle.example.com)(PORT=2484))(CONNECT_DATA=(SERVICE_NAME=orcl)))
    driver-class-name: oracle.jdbc.OracleDriver
```

</TabItem>

</Tabs>

## Env vars by database type

<Tabs groupId="databases" defaultValue="OracleDB" queryString values={
[
{label: 'OracleDB', value: 'OracleDB' },
{label: 'MSSQL', value: 'MSSQL' },
]}>
<TabItem value="OracleDB">

| Env var                             | Value                                                                                                                                                                                 |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SPRING_DATASOURCE_URL               | `jdbc:oracle:thin:@(DESCRIPTION=(ADDRESS=(PROTOCOL=tcps)(HOST=${IDENTITY_DATABASE_HOST:})(PORT=${IDENTITY_DATABASE_PORT:}))(CONNECT_DATA=(SERVICE_NAME=${IDENTITY_DATABASE_NAME:})))` |
| SPRING_DATASOURCE_DRIVER_CLASS_NAME | oracle.jdbc.OracleDriver                                                                                                                                                              |
| SPRING_JPA_DATABASE                 | oracle                                                                                                                                                                                |

</TabItem>
<TabItem value="MSSQL">

| Env var                             | Value                                                                                                                                                                                              |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SPRING_DATASOURCE_URL               | `url: jdbc:sqlserver://${IDENTITY_DATABASE_HOST:}:${IDENTITY_DATABASE_PORT:};databaseName=${IDENTITY_DATABASE_NAME:};encrypt=true;hostNameInCertificate={CACERT_/CN};trustServerCertificate=false` |
| SPRING_DATASOURCE_DRIVER_CLASS_NAME | com.microsoft.sqlserver.jdbc.SQLServerDriver                                                                                                                                                       |
| SPRING_JPA_DATABASE                 | sql_server                                                                                                                                                                                         |

</TabItem>

</Tabs>

## Breakdown of values.yaml configuration

1. Overriding `identity.command` is required so that the new driver in `/app` will be loaded upon startup.

```yaml
command:
  - /bin/sh
  - -c
args:
  - |
    wget https://download.oracle.com/otn-pub/otn_software/jdbc/237/ojdbc17.jar -O /app/ojdbc.jar
    java -cp "/app/ojdbc.jar:/app/identity.jar" org.springframework.boot.loader.launch.JarLauncher
```

2. the wget command downloads the odbc driver, and the `-cp` option loads the jar in the classpath so that the module is loaded. This wget command could be replaced with an initContainer or by loading a volume that already has the odbc driver inside.

3. These configuration options are added so that spring knows to connect to oracledb using it's client library

```yaml
- name: SPRING_DATASOURCE_URL
  value: "jdbc:oracle:thin:@(DESCRIPTION=(ADDRESS=(PROTOCOL=tcps)(HOST=oracle.example.com)(PORT=2484))(CONNECT_DATA=(SERVICE_NAME=orcl)))"
- name: SPRING_DATASOURCE_DRIVER_CLASS_NAME
  value: oracle.jdbc.OracleDriver
- name: JAVA_TOOL_OPTIONS
  value: $JAVA_OPTS
```

4. Extra volumes are mounted for any TLS certs necessary for the database:

```yaml
extraVolumeMounts:
  - name: "keystore-secret"
    secret:
      secretName: "keystore-secret"
extraVolumes:
  - name: "keystore-secret"
    mountPath: "/usr/local/certificates"
```

## Troubleshooting tips

- Exec into container confirm java process has the keystore path
- Confirm certificate exists in the mounted location on the filesystem
- Test connection from pod to database with simple tool(s) JDBC tool, ping, curl, etc
