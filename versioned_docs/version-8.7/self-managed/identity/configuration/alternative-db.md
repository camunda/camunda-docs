---
id: alternative-db
title: "Use an alternative database for Identity"
sidebar_label: "Use an alternative database for Identity"
description: "You can use alternative databases to PostgreSQL to configure Identity"
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Use an alternative database for Identity if your internal policies or compliance requirements prevent the use of PostgreSQL.

## Database versions

Identity is tested against the following alternative relational databases:

| Camunda version | Database version | Driver version |
| --------------- | ---------------- | -------------- |
| 8.7.1           | Oracle 19C       | 21.3.0.0       |
| 8.7.1           | SQL Server 2019  | 12.10.0.jre11  |

## Oracle database configuration

### Driver provision

As the Oracle driver is not provided by default in each of the Camunda 8 distributions, you must download the driver and supply it for the application to load.

1. Download the appropriate Oracle driver: https://download.oracle.com/otn-pub/otn_software/jdbc/237/ojdbc17.jar.

2. When starting the application, set `-cp "/app/ojdbc.jar:/app/identity.jar"` in the `java` command during startup. This is only required for Oracle.

3. If you are using docker or kubernetes, ensure that the folder with the library is properly mounted as a volume.

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
    - |
      java -cp "/extraDrivers/ojdbc.jar:/app/identity.jar" org.springframework.boot.loader.launch.JarLauncher
  # Extra volumes are mounted for any TLS certs necessary for the database:
  extraVolumeMounts:
    - name: "keystore-secret"
      secret:
        secretName: "keystore-secret"
    - name: jdbcdrivers
      mountPath: /extraDrivers
  extraVolumes:
    - name: "keystore-secret"
      mountPath: "/usr/local/certificates"
    - name: jdbcdrivers
      emptyDir: {}
  initContainers:
    - name: fetch-jdbc-drivers
      image: alpine:3.19
      imagePullPolicy: "Always"
      command:
        [
          "sh",
          "-c",
          "wget https://download.oracle.com/otn-pub/otn_software/jdbc/237/ojdbc17.jar -O /extraDrivers/ojdbc.jar",
        ]
      volumeMounts:
        - name: jdbcdrivers
          mountPath: /extraDrivers
      securityContext:
        runAsUser: 1001
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

## MSSQL database configuration

### Driver provision

As the driver for MSSQL is provided by default in identity, you do not need to download it or supply it in the classpath.

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

## Troubleshooting

The following troubleshooting tips are provided to help you with common issues:

| Tip                      | Description                                                                                                                                                                                  |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Check Keystore path      | Access (or "exec into") the running container where the application is deployed and confirm that the Java process running inside the container is configured with the correct keystore path. |
| Check certificates       | Confirm that any SSL/TLS certificate required for secure communication with the database exists in the mounted location on the filesystem.                                                   |
| Test database connection | Test and verify the connection from the pod to the database using simple tools and utilities, such as JDBC tool, ping, curl, and so on.                                                      |
