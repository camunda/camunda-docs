---
id: broker-config
title: "Broker configuration"
sidebar_label: "Broker configuration"
description: "Let's analyze how to configure the Zeebe Broker"
---

A complete broker configuration template is available in the [Zeebe repo](https://github.com/camunda/camunda/blob/8.8.0/dist/src/main/config/broker.yaml.template).

## Conventions

Take the following conventions into consideration when working with the broker configuration.

### Byte sizes

Buffers and data values referencing sizing must be specified as strings and follow the following format: "10U" where U (unit) must be replaced with KB = Kilobytes, MB = Megabytes or GB = Gigabytes. If unit is omitted then the default unit is simply bytes.

Example:
`sendBufferSize = "16MB"` (creates a buffer of 16 Megabytes)

### Time units

Timeouts, intervals, and the likes, must be specified either in the standard ISO-8601 format used by java.time.Duration, or as strings with the following format: "VU", where:

- V is a numerical value (e.g. 1, 5, 10, etc.)
- U is the unit, one of: ms = Millis, s = Seconds, m = Minutes, or h = Hours

### Paths

Relative paths are resolved relative to the installation directory of the broker.

## Configuration

We provide tables with environment variables, application properties, a description, and corresponding default values in the following sections. We also describe a few use cases for each type of configuration.

Configuration names are noted as the **header** of each documented section, while the **field** values represent properties to set the configuration.

:::note
The Zeebe Broker is a Spring Boot application. As such, [many common Spring Boot properties will work out of the box](https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html).

Additionally, its REST server is a Spring Boot server (powered by Spring MVC), and can be configured using the standard `server.*` properties. Its management server (for example, where actuator endpoints live) is configured as a child application context, and is also a Spring MVC server. It can be configured via `management.server.*` properties.

Finally, the REST server is only serving requests _if, and only if, the embedded gateway is enabled via_ `zeebe.broker.gateway.enable: true`.
:::

### server

The `server` configuration allows you to configure the main REST server. Below are a few common ones, but you can find a more exhaustive list [in the official Spring documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html#appendix.application-properties.server).

| Field   | Description                                                                                                                     | Example value |
| ------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| address | Sets the address the REST server binds to. This setting can also be overridden using the environment variable `SERVER_ADDRESS`. | 0.0.0.0       |
| port    | Sets the port the REST server binds to. This setting can also be overridden using the environment variable `SERVER_PORT`.       | 8080          |

#### server.compression

| Field   | Description                                                                                                                                                                        | Example value |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| enabled | If true, enables compression of responses for the Orchestration Cluster REST API. This setting can also be overridden using the environment variable `SERVER_COMPRESSION_ENABLED`. | false         |

#### server.ssl

Allows you to configure the SSL security for the REST server.

| Field                   | Description                                                                                                                                                                     | Example value |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| enabled                 | If true, enables TLS for the Orchestration Cluster REST API. This setting can also be overridden using the environment variable `SERVER_SSL_ENABLED`.                           | false         |
| certificate             | The path to a PEM encoded certificate. This setting can also be overridden using the environment variable `SERVER_SSL_CERTIFICATE`.                                             |               |
| certificate-private-key | The path to a PKCS1 or PKCS8 private key for the configured certificate. This setting can also be overridden using the environment variable `SERVER_SSL_CERTIFICATEPRIVATEKEY`. |               |

#### YAML snippet

```yaml
server:
  address: 0.0.0.0
  port: 8080
  compression:
    enabled: true
  ssl:
    enabled: true
    certificate: /path/to/my/cert.pem
    certificate-private-key: /path/to/my/private.key
```

### server.servlet

| Field        | Description                                                                                                                                                                                                                                                        | Example value |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| context-path | The context path prefix for all REST API requests. For example, if you configure `/zeebe`, then the client's REST address would be `http://localhost:8080/zeebe`. This setting can also be overridden using the environment variable `SERVER_SERVLET_CONTEXTPATH`. | `/`           |

#### YAML snippet

```yaml
server.servlet:
  context-path: /
```

### management.server

The `management.server` configuration allows you to configure the management server.

| Field     | Description                                                                                                                                                                                                                                                                           | Example value |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| address   | Sets the address the management server binds to. This setting can also be overridden using the environment variable `MANAGEMENT_SERVER_ADDRESS`.                                                                                                                                      | 0.0.0.0       |
| port      | Sets the port the management server binds to. This setting can also be overridden using the environment variable `MANAGEMENT_SERVER_PORT`.                                                                                                                                            | 9600          |
| base-path | The context path prefix for all management endpoints. For example, if you configure `/zeebe`, your actuator endpoints will be at `http://localhost:9600/zeebe/actuator/configprops`. This setting can also be overridden using the environment variable `MANAGEMENT_SERVER_BASEPATH`. | `/`           |

#### YAML snippet

```yaml
management.server:
  address: 0.0.0.0
  port: 9600
  base-path: /
```

### zeebe.broker.gateway

To configure the embedded gateway, see [Gateway config docs](/self-managed/components/orchestration-cluster/zeebe/configuration/gateway.md).

| Field  | Description                                                                                                                                               | Example value |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| enable | Enable the embedded gateway to start on broker startup. This setting can also be overridden using the environment variable `ZEEBE_BROKER_GATEWAY_ENABLE`. | false         |

#### YAML snippet

```yaml
broker:
  gateway:
    enable: false
```

### camunda.cluster.network

This section contains the unified network host setting introduced in Camunda 8.8.

| Field | Description                                                                                                                                                                                                                                | Example value |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| host  | Controls the default host the broker should bind to. Can be overwritten on a per binding basis for client, management, and replication. This setting can also be overridden using the environment variable `CAMUNDA_CLUSTER_NETWORK_HOST`. | 0.0.0.0       |

#### YAML snippet

```yaml
camunda:
  cluster:
    network:
      host: 0.0.0.0
```

### zeebe.broker.network

This section contains the network configuration. Particularly, it allows to configure the hosts and ports the broker should bind to. The broker exposes two sockets:

1. command: the socket which is used for gateway-to-broker communication
2. internal: the socket which is used for broker-to-broker communication

| Field               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Example Value |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| advertisedHost      | Controls the advertised host (the contact point advertised to other brokers); if omitted defaults to the host. This is particularly useful if your broker stands behind a proxy. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_ADVERTISEDHOST`.                                                                                                                                                                                  | 0.0.0.0       |
| portOffset          | If a port offset is set it will be added to all ports specified in the config or the default values. This is a shortcut to not always specifying every port. The offset will be added to the second last position of the port, as Zeebe requires multiple ports. As example a portOffset of 5 will increment all ports by 50, i.e. 26500 will become 26550 and so on. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_PORTOFFSET`. | 0             |
| maxMessageSize      | Sets the maximum size of the incoming and outgoing messages (i.e. commands and events). This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_MAXMESSAGESIZE`.                                                                                                                                                                                                                                                                           | 4MB           |
| socketReceiveBuffer | Sets the size of the socket's receive buffer for the broker. If omitted defaults to 1MB. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_SOCKETRECEIVEBUFFER`.                                                                                                                                                                                                                                                                     | 4MB           |
| socketSendBuffer    | Sets the size of the socket's send buffer for the broker. If omitted defaults to 1MB. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_SOCKETSENDBUFFER`.                                                                                                                                                                                                                                                                           | 4MB           |

#### YAML snippet

```yaml
network:
  advertisedHost: 0.0.0.0
  portOffset: 0
  maxMessageSize: 4MB
  socketReceiveBuffer: 4MB
  socketSendBuffer: 4MB
```

### zeebe.broker.network.security

| Field                | Description                                                                                                                                                                                                  | Example Value |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| enabled              | Enables TLS authentication between this gateway and other nodes in the cluster. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_SECURITY_ENABLED`.                  | false         |
| certificateChainPath | Sets the path to the certificate chain file. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_SECURITY_CERTIFICATECHAINPATH`.                                        |               |
| privateKeyPath       | Sets the path to the private key file location. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_SECURITY_PRIVATEKEYPATH`.                                           |               |
| keyStore             | Configures the keystore file containing both the certificate chain and the private key; currently only supports PKCS12 format.                                                                               |               |
| keyStore.filePath    | The path for keystore file; This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_SECURITY_KEYSTORE_FILEPATH`.                                                            | /path/key.pem |
| keyStore.password    | Sets the password for the keystore file, if not set it is assumed there is no password; This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_SECURITY_KEYSTORE_PASSWORD` | changeme      |

#### YAML snippet

```yaml
security:
  enabled: false
  certificateChainPath: null
  privateKeyPath: null
  keyStore:
    filePath: null
    password: null
```

### zeebe.broker.network.commandApi

| Field          | Description                                                                                                                                                                                                                                           | Example Value |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| host           | Overrides the host used for gateway-to-broker communication. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_COMMANDAPI_HOST`.                                                                               | 0.0.0.0       |
| port           | Sets the port used for gateway-to-broker communication. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_COMMANDAPI_PORT`.                                                                                    | 26501         |
| advertisedHost | Controls the advertised host; if omitted defaults to the host. This is particularly useful if your broker stands behind a proxy. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_COMMANDAPI_ADVERTISEDHOST`. | 0.0.0.0       |
| advertisedPort | Controls the advertised port; if omitted defaults to the port. This is particularly useful if your broker stands behind a proxy. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_COMMANDAPI_ADVERTISEDPORT`. | 25601         |

#### YAML snippet

```yaml
commandApi:
  host: 0.0.0.0
  port: 26501
  advertisedHost: 0.0.0.0
  advertisedPort: 25601
```

### zeebe.broker.network.internalApi

| Field          | Description                                                                                                                                                                                                                                            | Example Value |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| host           | Overrides the host used for internal broker-to-broker communication. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_INTERNALAPI_HOST`.                                                                       | 0.0.0.0       |
| port           | Sets the port used for internal broker-to-broker communication. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_INTERNALAPI_PORT`.                                                                            | 26502         |
| advertisedHost | Controls the advertised host; if omitted defaults to the host. This is particularly useful if your broker stands behind a proxy. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_INTERNALAPI_ADVERTISEDHOST`. | 0.0.0.0       |
| advertisedPort | Controls the advertised port; if omitted defaults to the port. This is particularly useful if your broker stands behind a proxy. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_INTERNALAPI_ADVERTISEDPORT`. | 25602         |

#### YAML snippet

```yaml
internalApi:
  host: 0.0.0.0
  port: 26502
  advertisedHost: 0.0.0.0
  advertisedPort: 25602
```

### camunda.data

| Field           | Description                                                                                                                                             | Example Value |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| snapshot-period | How often snapshots of streams are taken (time unit). This setting can also be overridden using the environment variable `CAMUNDA_DATA_SNAPSHOTPERIOD`. | 5m            |

#### YAML snippet

```yaml
camunda:
  data:
    snapshot-period: 5m
```

### camunda.data.primary-storage

This section allows you to configure Zeebe's primary data storage. Data is stored in partition folders.

| Field                      | Description                                                                                                                                                                                                                                                                                                                                                             | Example Value |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| directory                  | Specify the directory in which data is stored. This setting can also be overridden using the environment variable `CAMUNDA_DATA_PRIMARYSTORAGE_DIRECTORY`.                                                                                                                                                                                                              | data          |
| runtime-directory          | Specify the directory in which runtime is stored. By default, runtime is stored in `directory` for data. If `runtime-directory` is configured, then the configured directory is used. It has a subdirectory for each partition to store its runtime. This setting can also be overridden using the environment variable `CAMUNDA_DATA_PRIMARYSTORAGE_RUNTIMEDIRECTORY`. | null          |
| logstream.log-segment-size | The size of data log segment files. This setting can also be overridden using the environment variable `CAMUNDA_DATA_PRIMARYSTORAGE_LOGSTREAM_LOGSEGMENTSIZE`.                                                                                                                                                                                                          | 128MB         |

#### YAML snippet

```yaml
camunda:
  data:
    primary-storage:
      directory: data
      runtime-directory: null
      logstream:
        log-segment-size: 128MB
```

### camunda.data.primary-storage.disk

| Field               | Description                                                                                                                                                                                                                                                                                                                                                        | Example Value |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| monitoring-enabled  | Configure disk monitoring to prevent getting into a non-recoverable state due to running out of disk space. When monitoring is enabled, the broker rejects commands and pauses replication when the required free space is not available. This setting can also be overridden using the environment variable `CAMUNDA_DATA_PRIMARYSTORAGE_DISK_MONITORINGENABLED`. | true          |
| monitoring-interval | Sets the interval at which disk usage is monitored. This setting can also be overridden using the environment variable `CAMUNDA_DATA_PRIMARYSTORAGE_DISK_MONITORINGINTERVAL`.                                                                                                                                                                                      | 1s            |

#### YAML snippet

```yaml
camunda:
  data:
    primary-storage:
      disk:
        monitoring-enabled: true
        monitoring-interval: 1s
```

### camunda.data.primary-storage.disk.free-space

| Field       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Example Value |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| processing  | When the available free space is less than this value, the broker rejects all client commands and pauses processing. This setting can also be overridden using the environment variable `CAMUNDA_DATA_PRIMARYSTORAGE_DISK_FREESPACE_PROCESSING`.                                                                                                                                                                                                                                                                                  | 2GB           |
| replication | When the available free space is less than this value, the broker stops receiving replicated events. This value must be less than `free-space.processing`. It is recommended to configure enough free space for at least one log segment and one snapshot. This is because a partition needs enough space to take a new snapshot so it can compact log segments and make disk space available again. This setting can also be overridden using the environment variable `CAMUNDA_DATA_PRIMARYSTORAGE_DISK_FREESPACE_REPLICATION`. | 1GB           |

#### YAML snippet

```yaml
camunda:
  data:
    primary-storage:
      disk:
        free-space:
          processing: 2GB
          replication: 1GB
```

### camunda.data.backup

Configure backup store.

:::note
Use the same configuration on all brokers of this cluster.
:::

:::caution
Backups created with one store are not available or restorable from another store.

This is especially relevant if you were using GCS through the S3 compatibility mode and want to switch to the new built-in support for GCS now.
Even when the underlying storage bucket is the same, backups from one are not compatible with the other.
:::

| Field | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Example value |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| store | Set the backup store type. Supported values are [NONE, S3, GCS, AZURE, FILESYSTEM]. Default value is NONE. When NONE, no backup store is configured and no backup is taken. Use S3 to use any S3 compatible storage, including, but not limited to, Amazon S3. Use GCS to use [Google Cloud Storage](https://cloud.google.com/storage/). Use AZURE to employ [Azure Cloud Storage](https://learn.microsoft.com/en-us/azure/storage/common/storage-introduction). Use FILESYSTEM to store backups directly via the filesystem to a particular folder. This setting can also be overridden using the environment variable `CAMUNDA_DATA_BACKUP_STORE`. | NONE          |

#### YAML snippet

```yaml
camunda:
  data:
    backup:
      store: NONE
```

### camunda.data.backup.s3

Configure the following if `store` is set to `S3`.

:::note
You can use any S3 compatible storage, including, but not limited to, Amazon S3.
:::

:::note Backup encryption
Zeebe does not support backup encryption natively, but it can use encrypted S3 buckets. For AWS S3, this means [enabling default bucket encryption](https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-bucket-encryption.html).

Using default bucket encryption gives you control over the encryption keys and algorithms while being completely transparent with Zeebe.

Combined with TLS between Zeebe and the S3 API, backups are fully encrypted in transit and at rest. Other S3 compatible services might have similar features that should work as well.
:::

:::note Backup compression
Backups can be large depending on your usage of Zeebe. To reduce S3 storage costs and upload times, you can enable backup compression.

Zeebe compresses backup data immediately before uploading to S3 and buffers the compressed files in a temporary directory. Compression and buffering of compressed files can have a negative effect if Zeebe is heavily resource constrained.

You can enable compression by specifying a compression algorithm to use. We recommend using [zstd](https://github.com/facebook/zstd) as it provides a good trade-off between compression ratio and resource usage.

More compression algorithms are available; check [commons-compress](https://commons.apache.org/proper/commons-compress/) for a full list.
:::

| Field                          | Description                                                                                                                                                                                                                                                                                                                                                                            | Example value |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| bucket-name                    | Name of the bucket where the backup is stored. The bucket must already be created. The bucket must not be shared with other Zeebe clusters. `bucket-name` must not be empty. This setting can also be overridden using the environment variable `CAMUNDA_DATA_BACKUP_S3_BUCKETNAME`.                                                                                                   |               |
| endpoint                       | Configure URL endpoint for the store. If no endpoint is provided, it is determined based on the configured region. This setting can also be overridden using the environment variable `CAMUNDA_DATA_BACKUP_S3_ENDPOINT`.                                                                                                                                                               |               |
| region                         | Configure region. If no region is provided it is determined as documented by your S3 compatible storage provider. If you use Amazon S3, it is determined as documented by AWS. This setting can also be overridden using the environment variable `CAMUNDA_DATA_BACKUP_S3_REGION`.                                                                                                     |               |
| access-key                     | Configure access credentials. If either `access-key` or `secret-key` is not provided, it is determined as documented by AWS, not based on your S3 compatible storage provider. This setting can also be overridden using the environment variable `CAMUNDA_DATA_BACKUP_S3_ACCESSKEY`.                                                                                                  |               |
| secret-key                     | This setting can also be overridden using the environment variable `CAMUNDA_DATA_BACKUP_S3_SECRETKEY`.                                                                                                                                                                                                                                                                                 |               |
| api-call-timeout               | Configure a maximum duration for all S3 client API calls. Lower values ensure that failed or slow API calls do not block other backups, but may increase the risk that backups cannot be stored if uploading parts of the backup takes longer than the configured timeout. This setting can also be overridden using the environment variable `CAMUNDA_DATA_BACKUP_S3_APICALLTIMEOUT`. | PT180S        |
| force-path-style-access        | When enabled, forces the S3 client to use path-style access. By default, the client automatically chooses between path-style and virtual-hosted-style. This should only be enabled if the S3 compatible storage cannot support virtual-hosted-style. This setting can also be overridden using the environment variable `CAMUNDA_DATA_BACKUP_S3_FORCEPATHSTYLEACCESS`.                 | false         |
| compression                    | When set to an algorithm such as `zstd`, enables compression of backup contents. When not set or set to `none`, backup content is not compressed. This setting can also be overridden using the environment variable `CAMUNDA_DATA_BACKUP_S3_COMPRESSION`.                                                                                                                             | none          |
| base-path                      | When set, all objects in the bucket use this prefix. Must be non-empty and not start or end with `/`. Useful for using the same bucket for multiple Zeebe clusters. In this case, `base-path` must be unique. This setting can also be overridden using the environment variable `CAMUNDA_DATA_BACKUP_S3_BASEPATH`.                                                                    |               |
| max-concurrent-connections     | Maximum number of connections allowed in a connection pool. This is used to restrict the maximum number of concurrent uploads and avoid connection timeouts when uploading backups with large or many files. This setting can also be overridden using the environment variable `CAMUNDA_DATA_BACKUP_S3_MAXCONCURRENTCONNECTIONS`.                                                     |               |
| connection-acquisition-timeout | Timeout for acquiring an already-established connection from a connection pool to a remote service. This setting can also be overridden using the environment variable `CAMUNDA_DATA_BACKUP_S3_CONNECTIONACQUISITIONTIMEOUT`.                                                                                                                                                          |               |
| support-legacy-md5             | Enables the AWS-provided `LegacyMd5Plugin` to extend backwards compatibility of the client. Useful when using an S3-compatible object storage backup store that is not up to date with the latest AWS SDK guidelines. This setting can also be overridden using the environment variable `CAMUNDA_DATA_BACKUP_S3_SUPPORTLEGACYMD5`.                                                    | false         |

#### YAML snippet

```yaml
camunda:
  data:
    backup:
      store: s3
      s3:
        bucket-name: null
        endpoint: null
        region: null
        access-key: null
        secret-key: null
        api-call-timeout: PT180S
        force-path-style-access: false
        compression: none
        base-path: null
        max-concurrent-connections: null
        connection-acquisition-timeout: null
        support-legacy-md5: false
```

### camunda.data.backup.gcs

Configure the following if `store` is set to `GCS`.

:::note
The GCS backup strategy utilizes the [Google Cloud Storage REST API](https://cloud.google.com/storage/docs/request-endpoints).
:::

:::note Backup encryption
There are multiple [data encryption options](https://cloud.google.com/storage/docs/encryption), some of which are supported by Zeebe:

- [Default server-side encryption](https://cloud.google.com/storage/docs/encryption/default-keys) is fully supported. This is enabled by default for all GCS buckets.
- [Customer-managed encryption keys](https://cloud.google.com/storage/docs/encryption/customer-managed-keys) are supported if they are [set as the default key](https://cloud.google.com/storage/docs/encryption/using-customer-managed-keys#set-default-key) for your bucket.
- [Customer-supplied encryption keys](https://cloud.google.com/storage/docs/encryption/customer-supplied-keys) are not supported.
- [Client-side encryption keys](https://cloud.google.com/storage/docs/encryption/client-side-keys) are not supported.
  :::

| Field       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Example value |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| bucket-name | Name of the bucket where the backup is stored. The bucket must already exist. The bucket must not be shared with other Zeebe clusters unless `base-path` is also set. Zeebe checks at startup that the specified bucket exists and can be accessed, and logs at WARN level if the bucket does not exist. This setting can also be overridden using the environment variable `CAMUNDA_DATA_BACKUP_GCS_BUCKETNAME`.                                                                             |               |
| base-path   | When set, all blobs in the bucket use this prefix. Useful for using the same bucket for multiple Zeebe clusters. In this case, `base-path` must be unique. It should not start or end with `/`, must be non-empty, and must not consist only of `/` characters. This setting can also be overridden using the environment variable `CAMUNDA_DATA_BACKUP_GCS_BASEPATH`.                                                                                                                        |               |
| host        | When set, this overrides the host that the GCS client connects to. By default, this is not set because the client can automatically discover the correct host to connect to. This setting can also be overridden using the environment variable `CAMUNDA_DATA_BACKUP_GCS_HOST`.                                                                                                                                                                                                               |               |
| auth        | Configures which authentication method is used for connecting to GCS. Can be either `auto` or `none`. Choosing `auto` means that the GCS client uses application default credentials which automatically discover appropriate credentials from the runtime environment. Choosing `none` means that no authentication is attempted, which is only applicable for testing with emulated GCS. This setting can also be overridden using the environment variable `CAMUNDA_DATA_BACKUP_GCS_AUTH`. | auto          |

#### YAML snippet

```yaml
camunda:
  data:
    backup:
      store: gcs
      gcs:
        bucket-name: null
        base-path: null
        host: null
        auth: auto
```

### camunda.data.backup.azure

Configure the following if `store` is set to `AZURE`.

:::note Backup encryption

- [Default server-side encryption](https://learn.microsoft.com/en-us/azure/storage/common/storage-service-encryption?toc=%2Fazure%2Fstorage%2Fblobs%2Ftoc.json&bc=%2Fazure%2Fstorage%2Fblobs%2Fbreadcrumb%2Ftoc.json#about-azure-storage-service-side-encryption) is fully supported, is enabled by default, and cannot be switched off.
- [Customer-managed encryption keys](https://learn.microsoft.com/en-us/azure/storage/common/customer-managed-keys-overview?toc=/azure/storage/blobs/toc.json&bc=/azure/storage/blobs/breadcrumb/toc.json) are supported if they are configured in the Azure store.
- [Customer-provided encryption keys](https://learn.microsoft.com/en-us/azure/storage/blobs/encryption-customer-provided-keys) are not supported.
- [Client-side encryption keys](https://learn.microsoft.com/en-us/azure/storage/blobs/client-side-encryption?tabs=dotnet) are not supported.
  :::

| Field             | Description                                                                                                                                                                                                                                                                                                                                                                                                                      | Example value |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| endpoint          | Name of the endpoint where the backup is stored. Sets the blob service endpoint. This setting can also be overridden using the environment variable `CAMUNDA_DATA_BACKUP_AZURE_ENDPOINT`.                                                                                                                                                                                                                                        |               |
| account-name      | Account name used to connect to the service. This setting can also be overridden using the environment variable `CAMUNDA_DATA_BACKUP_AZURE_ACCOUNTNAME`.                                                                                                                                                                                                                                                                         |               |
| account-key       | Account key used to connect to the service. This setting can also be overridden using the environment variable `CAMUNDA_DATA_BACKUP_AZURE_ACCOUNTKEY`.                                                                                                                                                                                                                                                                           |               |
| connection-string | The [connection string](https://learn.microsoft.com/en-us/azure/storage/common/storage-configure-connection-string?toc=/azure/storage/blobs/toc.json&bc=/azure/storage/blobs/breadcrumb/toc.json) used to connect to the service. If this is defined, it overrides the account name, account key, and endpoint. This setting can also be overridden using the environment variable `CAMUNDA_DATA_BACKUP_AZURE_CONNECTIONSTRING`. |               |
| base-path         | Used to define the container name where blobs are saved. This value must not be empty. When `base-path` is set, Zeebe only creates and accesses objects under this path. This setting can also be overridden using the environment variable `CAMUNDA_DATA_BACKUP_AZURE_BASEPATH`.                                                                                                                                                |               |
| create-container  | Defines if the container is created initially or if an existing one should be used. If set to `true` and the container already exists, it is not recreated. This setting can also be overridden using the environment variable `CAMUNDA_DATA_BACKUP_AZURE_CREATECONTAINER`.                                                                                                                                                      | true          |
| sas-token.type    | Defines the SAS token type to use. This setting can also be overridden using the environment variable `CAMUNDA_DATA_BACKUP_AZURE_SASTOKEN_TYPE`.                                                                                                                                                                                                                                                                                 |               |
| sas-token.value   | Specifies the value of the SAS token. This setting can also be overridden using the environment variable `CAMUNDA_DATA_BACKUP_AZURE_SASTOKEN_VALUE`.                                                                                                                                                                                                                                                                             |               |

#### YAML snippet

```yaml
camunda:
  data:
    backup:
      store: azure
      azure:
        endpoint: null
        account-name: null
        account-key: null
        connection-string: null
        base-path: null
        create-container: true
        sas-token:
          type: null
          value: null
```

### camunda.data.backup.filesystem

To store your backups in the local filesystem, choose the `FILESYSTEM` backup store and specify where to store the backups locally.

:::caution
Since the durability of the backups depends largely on the target file system and underlying storage, it is recommended to use known durable solutions in production, such as S3, GCS, or Azure. To ensure this can be used properly in production, you must use a POSIX-compliant file system and, at a minimum, replicated disks (for example, RAID-configured disks).
:::

:::note Backup encryption
Zeebe does not support backup encryption natively, but it can use filesystem-based encryption. This is a feature of the filesystem and not Zeebe itself.
:::

| Field     | Description                                                                                                                                                                                                                                                                         | Example value      |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| base-path | The base path is used to define the parent directory of all created backups and backup-manifest files. This directory must exist and be writable by the Zeebe broker. This setting can also be overridden using the environment variable `CAMUNDA_DATA_BACKUP_FILESYSTEM_BASEPATH`. | /mnt/backups/zeebe |

#### YAML snippet

```yaml
camunda:
  data:
    backup:
      store: filesystem
      filesystem:
        base-path: /mnt/backups/zeebe
```

### camunda.cluster

This section contains cluster-related configuration used to set up a Zeebe cluster.

| Field              | Description                                                                                                                                                                                                                           | Example Value |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| node-id            | Specifies the unique ID of this broker node in a cluster. The ID should be between 0 and the number of nodes in the cluster (exclusive). This setting can also be overridden using the environment variable `CAMUNDA_CLUSTER_NODEID`. | 0             |
| partition-count    | Controls the number of partitions in the cluster. This setting can also be overridden using the environment variable `CAMUNDA_CLUSTER_PARTITIONCOUNT`.                                                                                | 1             |
| replication-factor | Controls the replication factor, which defines the number of replicas per partition. This setting can also be overridden using the environment variable `CAMUNDA_CLUSTER_REPLICATIONFACTOR`.                                          | 1             |
| size               | Controls the number of nodes in the cluster. This setting can also be overridden using the environment variable `CAMUNDA_CLUSTER_SIZE`.                                                                                               | 1             |

#### YAML snippet

```yaml
camunda:
  cluster:
    node-id: 0
    partition-count: 1
    replication-factor: 1
    size: 1
```

### camunda.cluster.raft

This section contains properties required to configure Raft.

| Field                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Example Value |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| priority-election-enabled | When this flag is enabled, the leader election algorithm attempts to elect the leaders based on a pre-defined priority. As a result, it tries to distribute the leaders uniformly across the brokers. Note that it is only a best-effort strategy. It is not guaranteed to be a strictly uniform distribution. This setting can also be overridden using the environment variable `CAMUNDA_CLUSTER_RAFT_PRIORITYELECTIONENABLED`.                                                                                                                                                                                | true          |
| heartbeat-interval        | The leader sends a heartbeat to a follower every `heartbeat-interval`. Note: This is an advanced setting. This setting can also be overridden using the environment variable `CAMUNDA_CLUSTER_RAFT_HEARTBEATINTERVAL`.                                                                                                                                                                                                                                                                                                                                                                                           | 250ms         |
| election-timeout          | If a follower does not receive a heartbeat from the leader within an election timeout, it can start a new leader election. `election-timeout` should be greater than `heartbeat-interval`. When the election timeout is large, there is a delay in detecting a leader failure. When it is small, it can lead to false positives and unnecessary leader changes. If network latency between the nodes is high, it is recommended to have a higher election timeout. Note: This is an advanced setting. This setting can also be overridden using the environment variable `CAMUNDA_CLUSTER_RAFT_ELECTIONTIMEOUT`. | 2500ms        |
| flush-enabled             | If false, explicit flushing of the Raft log is disabled, and flushing only occurs right before a snapshot is taken. You should only disable explicit flushing if you are willing to accept potential data loss at the expense of performance. Before disabling it, try the delayed options, which provide a trade-off between safety and performance. This setting can also be overridden using the environment variable `CAMUNDA_CLUSTER_RAFT_FLUSHENABLED`.                                                                                                                                                    | true          |
| flush-delay               | If the delay is > 0, flush requests are delayed by at least the given period. It is recommended that you find the smallest delay that achieves your performance goals. It is also likely that anything above 30s is not useful, as this is the typical default flush interval for Linux. This setting can also be overridden using the environment variable `CAMUNDA_CLUSTER_RAFT_FLUSHDELAY`.                                                                                                                                                                                                                   | 0s            |

#### YAML snippet

```yaml
camunda:
  cluster:
    raft:
      priority-election-enabled: true
      flush-enabled: true
      flush-delay: 0s
      heartbeat-interval: 250ms
      election-timeout: 2500ms
```

### zeebe.broker.cluster.membership

Configure parameters for SWIM protocol which is used to propagate cluster membership information among brokers and gateways.

| Field             | Example Value                                                                                                                                                                                                                                                                                                                                         | Description |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| broadcastUpdates  | Configure whether to broadcast member updates to all members. If set to false updates will be gossiped among the members. If set to true the network traffic may increase but it reduce the time to detect membership changes. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_MEMBERSHIP_BROADCASTUPDATES`. | false       |
| broadcastDisputes | Configure whether to broadcast disputes to all members. If set to true the network traffic may increase but it reduce the time to detect membership changes. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_MEMBERSHIP_BROADCASTDISPUTES`.                                                                  | true        |
| notifySuspect     | Configure whether to notify a suspect node on state changes. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_MEMBERSHIP_NOTIFYSUSPECT`.                                                                                                                                                                      | false       |
| gossipInterval    | Sets the interval at which the membership updates are sent to a random member. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_MEMBERSHIP_GOSSIPINTERVAL`.                                                                                                                                                   | 250ms       |
| gossipFanout      | Sets the number of members to which membership updates are sent at each gossip interval. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_MEMBERSHIP_GOSSIPFANOUT`.                                                                                                                                           | 2           |
| probeInterval     | Sets the interval at which to probe a random member. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_MEMBERSHIP_PROBEINTERVAL`.                                                                                                                                                                              | 1s          |
| probeTimeout      | Sets the timeout for a probe response. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_MEMBERSHIP_PROBETIMEOUT`.                                                                                                                                                                                             | 100ms       |
| suspectProbes     | Sets the number of probes failed before declaring a member is suspect. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_MEMBERSHIP_SUSPECTPROBES`.                                                                                                                                                            | 3           |
| failureTimeout    | Sets the timeout for a suspect member is declared dead. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_MEMBERSHIP_FAILURETIMEOUT`.                                                                                                                                                                          | 10s         |
| syncInterval      | Sets the interval at which this member synchronizes its membership information with a random member. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_MEMBERSHIP_SYNCINTERVAL`.                                                                                                                               | 10s         |

#### YAML snippet

```yaml
membership:
  broadcastUpdates: false
  broadcastDisputes: true
  notifySuspect: false
  gossipInterval: 250ms
  gossipFanout: 2
  probeInterval: 1s
  probeTimeout: 100ms
  suspectProbes: 3
  failureTimeout: 10s
  syncInterval: 10s
```

### camunda.cluster.metadata

Configure the parameters used to propagate the dynamic cluster configuration across brokers and gateways.

| Field                | Description                                                                                                                                                                                      | Example Value |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| sync-delay           | Sets the interval between two synchronization requests to other members of the cluster. This setting can also be overridden using the environment variable `CAMUNDA_CLUSTER_METADATA_SYNCDELAY`. | 10s           |
| sync-request-timeout | Sets the timeout for the synchronization requests. This setting can also be overridden using the environment variable `CAMUNDA_CLUSTER_METADATA_SYNCREQUESTTIMEOUT`.                             | 2s            |
| gossip-fanout        | Sets the number of cluster members the configuration is gossiped to. This setting can also be overridden using the environment variable `CAMUNDA_CLUSTER_METADATA_GOSSIPFANOUT`.                 | 2             |

#### YAML snippet

```yaml
camunda:
  cluster:
    metadata:
      sync-delay: 10s
      sync-request-timeout: 2s
      gossip-fanout: 2
```

### zeebe.broker.cluster.messageCompression

This feature is useful when the network latency between the nodes is very high (for example when nodes are deployed in different data centers).

When latency is high, the network bandwidth is severely reduced. Hence enabling compression helps to improve the throughput.

:::caution
When there is no latency enabling this may have a performance impact.
:::

:::note
When this flag is enables, you must also enable compression in standalone broker configuration.
:::

| Field              | Description                                                                                                                                                                                                                                           | Example Value |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| messageCompression | Configure compression algorithm for all messages sent between the gateway and the brokers. Available options are NONE, GZIP and SNAPPY. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_MESSAGECOMPRESSION`. | NONE          |

#### YAML snippet

```yaml
messageCompression: NONE
```

### camunda.system

| Field            | Example Value | Description                                                                                                                                                                                                                                                                                                                                 |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cpu-thread-count | 2             | Controls the number of non-blocking CPU threads to be used. WARNING: You should never specify a value larger than the number of physical cores available. Good practice is to leave 1–2 cores for I/O threads and the operating system. This setting can also be overridden using the environment variable `CAMUNDA_SYSTEM_CPUTHREADCOUNT`. |
| io-thread-count  | 2             | Controls the number of I/O threads to be used. These threads are used for workloads that write data to disk. While writing, these threads are blocked, which means that they yield the CPU. This setting can also be overridden using the environment variable `CAMUNDA_SYSTEM_IOTHREADCOUNT`.                                              |

#### YAML snippet

```yaml
camunda:
  system:
    cpu-thread-count: 2
    io-thread-count: 2
```

### zeebe.broker.flowControl.request

Replaces the deprecated `zeebe.broker.backpressure` configuration.

| Field       | Description                                                                                                                                                                                                                                                                                                                                                      | Example Value |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| enabled     | Set this to enable flow control for user requests. When enabled the broker rejects user requests when the number of inflight requests is greater than than the "limit". The value of the "limit" is determined based on the configured algorithm. This setting can also be overridden using the environment variable `ZEEBE_BROKER_FLOWCONTROL_REQUEST_ENABLED`. | true          |
| algorithm   | The algorithm configures which algorithm to use for the flow control. It should be one of vegas, aimd, fixed, gradient, or gradient2. This setting can also be overridden using the environment variable `ZEEBE_BROKER_FLOWCONTROL_REQUEST_ALGORITHM`.                                                                                                           | aimd          |
| useWindowed | If enabled, will use the average latencies over a window as the current latency to update the limit. It is not recommended to enable this when the algorithm is aimd. This setting is not applicable to fixed limit. This setting can also be overridden using the environment variable `ZEEBE_BROKER_FLOWCONTROL_REQUEST_USEWINDOWED`.                          | false         |

#### YAML snippet

```yaml
flowControl:
  request:
    enabled: true
    algorithm: aimd
    useWindowed: false
```

### zeebe.broker.flowControl.request.aimd

| Field          | Description                                                                                                                                                                                                                                             | Example Value |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| requestTimeout | The limit will be reduced if the observed latency is greater than the requestTimeout. This setting can also be overridden using the environment variable `ZEEBE_BROKER_FLOWCONTROL_REQUEST_AIMD_REQUESTTIMEOUT`.                                        | 200ms         |
| initialLimit   | The initial limit to be used when the broker starts. The limit will be reset to this value when the broker restarts. This setting can also be overridden using the environment `ZEEBE_BROKER_FLOWCONTROL_REQUEST_AIMD_INITIALLIMIT`.                    | 100           |
| minLimit       | The minimum limit. This setting can also be overridden using the environment variable `ZEEBE_BROKER_FLOWCONTROL_REQUEST_AIMD_MINLIMIT`.                                                                                                                 | 1             |
| maxLimit       | The maximum limit. This setting can also be overridden using the environment variable `ZEEBE_BROKER_FLOWCONTROL__REQUEST_AIMD_MAXLIMIT`.                                                                                                                | 1000          |
| backoffRatio   | The backoffRatio is a double value x such that x is between 0 and 1. It determines the factor by which the limit is decreased. This setting can also be overridden using the environment variable `ZEEBE_BROKER_FLOWCONTROL_REQUEST_AIMD_BACKOFFRATIO`. | 0.9           |

#### YAML snippet

```yaml
request:
  algorithm: aimd
  aimd:
    requestTimeout: 200ms
    initialLimit: 100
    minLimit: 1
    maxLimit: 1000
    backoffRatio: 0.9
```

### zeebe.broker.flowControl.request.fixed

| Field | Description                                                                                                                           | Example Value |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| limit | Set a fixed limit. This setting can also be overridden using the environment variable `ZEEBE_BROKER_FLOWCONTROL_REQUEST_FIXED_LIMIT`. | 20            |

#### YAML snippet

```yaml
request:
  algorithm: fixed
  fixed:
    limit: 20
```

### zeebe.broker.flowControl.request.vegas

| Field        | Description                                                                                                                                                                                                                                    | Example Value |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| initialLimit | The initial limit to be used when the broker starts. The limit will be reset to this value when the broker restarts. This setting can also be overridden using the environment variable `ZEEBE_BROKER_FLOWCONTROL_REQUEST_VEGAS_INITIALLIMIT`. | 20            |
| alpha        | The limit is increased if the queue size is less than this value. This setting can also be overridden using the environment variable `ZEEBE_BROKER_FLOWCONTROL_REQUEST_VEGAS_ALPHA`.                                                           | 3             |
| beta         | The limit is decreased if the queue size is greater than this value. This setting can also be overridden using the environment variable `ZEEBE_BROKER_FLOWCONTROL_REQUEST_VEGAS_BETA`.                                                         | 6             |

#### YAML snippet

```yaml
request:
  algorithm: vegas
  vegas:
    initialLimit: 20
    alpha: 3
    beta: 6
```

### zeebe.broker.flowControl.request.gradient

| Field        | Description                                                                                                                                                                                                                                                                                                                                                   | Example Value |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| minLimit     | The minimum limit. This setting can also be overridden using the environment variable `ZEEBE_BROKER_FLOWCONTROL_REQUEST_GRADIENT_MINLIMIT`.                                                                                                                                                                                                                   | 10            |
| initialLimit | The initial limit to be used when the broker starts. The limit will be reset to this value when the broker restarts. This setting can also be overridden using the environment variable `ZEEBE_BROKER_FLOWCONTROL_REQUEST_GRADIENT_INITIALLIMIT`.                                                                                                             | 20            |
| rttTolerance | Tolerance for changes from minimum latency. A value ≥ 1.0 indicating how much change from minimum latency is acceptable before reducing the limit. For example, a value of 2.0 means that a 2x increase in latency is acceptable. This setting can also be overridden using the environment variable `ZEEBE_BROKER_FLOWCONTROL_REQUEST_GRADIENT_RTTTOLERANCE` | 2.0           |

#### YAML snippet

```yaml
request:
  algorithm: gradient
  gradient:
    minLimit: 10
    initialLimit: 20
    rttTolerance: 2.0
```

### zeebe.broker.flowControl.request.gradient2

| Field        | Description                                                                                                                                                                                                                                                                                                                                                     | Example Value |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| minLimit     | The minimum limit. This setting can also be overridden using the environment variable `ZEEBE_BROKER_FLOWCONTROL_REQUEST_GRADIENT2_MINLIMIT`.                                                                                                                                                                                                                    | 10            |
| initialLimit | The initial limit to be used when the broker starts. The limit will be reset to this value when the broker restarts. This setting can also be overridden using the environment variable `ZEEBE_BROKER_FLOWCONTROL_REQUEST_GRADIENT2_INITIALLIMIT`.                                                                                                              | 20            |
| rttTolerance | Tolerance for changes from minimum latency. A value ≥ 1.0 indicating how much change from minimum latency is acceptable before reducing the limit. For example, a value of 2.0 means that a 2x increase in latency is acceptable. This setting can also be overridden using the environment variable `ZEEBE_BROKER_FLOWCONTROL_REQUEST_GRADIENT2_RTTTOLERANCE`. | 2.0           |
| longWindow   | longWindow is the length of the window (the number of samples) to calculate the exponentially smoothed average latency. This setting can also be overridden using the environment `ZEEBE_BROKER_FLOWCONTROL_REQUEST_GRADIENT2_LONGWINDOW`.                                                                                                                      | 600           |

#### YAML snippet

```yaml
request:
  algorithm: gradient2
  gradient2:
    minLimit: 10
    initialLimit: 20
    rttTolerance: 2.0
    longWindow: 600
```

### zeebe.broker.flowControl.write

| Field   | Description                                                                                                                                                                                       | Example Value |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| enabled | Set this to enable or disable flow control for all writes. This setting can also be overridden using the environment variable `ZEEBE_BROKER_FLOWCONTROL_WRITE_ENABLED`.                           | false         |
| rampUp  | Time period during which the write limit gradually increases to the configured limit. This setting can also be overridden using the environment variable `ZEEBE_BROKER_FLOWCONTROL_WRITE_RAMPUP`. | 10s           |
| limit   | The maximum number of record that can be written per second. This setting can also be overridden using the environment variable `ZEEBE_BROKER_FLOWCONTROL_WRITE_LIMIT`.                           | 1000          |

#### YAML snippet

```yaml
write:
  enabled: false
  rampUp: 10s
  limit: 1000
```

### zeebe.broker.flowControl.write.throttling

| Field             | Description                                                                                                                                                                                                                                                                                                  | Example Value |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| enabled           | Set this to enable or disable write throttling based on the exporting backlog. This setting can also be overridden using the environment variable `ZEEBE_BROKER_FLOWCONTROL_WRITE_THROTTLING_ENABLED`.                                                                                                       | false         |
| acceptableBacklog | The number of records that can be in the exporting backlog. The write rate is throttled such that the backlog stabilizes around this value when exporting is a bottleneck. This setting can also be overridden using the environment variable `ZEEBE_BROKER_FLOWCONTROL_WRITE_THROTTLING_ACCEPTABLEBACKLOG`. | 100000        |
| minimumLimit      | The minimum write limit that is guaranteed even when throttling. This setting can also be overridden using the environment variable `ZEEBE_BROKER_FLOWCONTROL_WRITE_THROTTLING_MINIMUMLIMIT`.                                                                                                                | 100           |
| resolution        | The frequency at which the throttling is updated. This setting can also be overridden using the environment variable `ZEEBE_BROKER_FLOWCONTROL_WRITE_THROTTLING_RESOLUTION`.                                                                                                                                 | 15s           |

#### YAML snippet

```yaml
write:
  throttling:
    enabled: false
    acceptableBacklog: 100000
    minimumLimit: 100
    resolution: 15s
```

### zeebe.broker.backpressure

| Field       | Description                                                                                                                                                                                                                                                                                                                                        | Example Value |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| enabled     | Set this to enable or disable backpressure. When enabled the broker rejects user requests when the number of inflight requests is greater than than the "limit". The value of the "limit" is determined based on the configured algorithm. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_ENABLED`. | true          |
| useWindowed | if enabled - will use the average latencies over a window as the current latency to update the limit. It is not recommended to enable this when the algorithm is aimd. This setting is not applicable to fixed limit. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_USEWINDOWED`.                  | true          |
| algorithm   | The algorithm configures which algorithm to use for the backpressure. It should be one of vegas, aimd, fixed, gradient, or gradient2. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_ALGORITHM`.                                                                                                    | aimd          |

#### YAML snippet

```yaml
backpressure:
  enabled: true
  useWindowed: true
  algorithm: aimd
```

### zeebe.broker.backpressure.aimd

| Field          | Description                                                                                                                                                                                                                                      | Example Value |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| requestTimeout | The limit will be reduced if the observed latency is greater than the requestTimeout. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_AIMD_REQUESTTIMEOUT`.                                        | 200ms         |
| initialLimit   | The initial limit to be used when the broker starts. The limit will be reset to this value when the broker restarts. This setting can also be overridden using the environment `ZEEBE_BROKER_BACKPRESSURE_AIMD_INITIALLIMIT`.                    | 100           |
| minLimit       | The minimum limit. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_AIMD_MINLIMIT`.                                                                                                                 | 1             |
| maxLimit       | The maximum limit. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_AIMD_MAXLIMIT`.                                                                                                                 | 1000          |
| backoffRatio   | The backoffRatio is a double value x such that x is between 0 and 1. It determines the factor by which the limit is decreased. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_AIMD_BACKOFFRATIO`. | 0.9           |

#### YAML snippet

```yaml
backpressure:
  algorithm: aimd
  aimd:
    requestTimeout: 200ms
    initialLimit: 100
    minLimit: 1
    maxLimit: 1000
    backoffRatio: 0.9
```

### zeebe.broker.backpressure.fixed

| Field | Description                                                                                                                    | Example Value |
| ----- | ------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| limit | Set a fixed limit. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_FIXED_LIMIT`. | 20            |

#### YAML snippet

```yaml
backpressure:
  algorithm: fixed
  fixed:
    limit: 20
```

### zeebe.broker.backpressure.vegas

| Field        | Description                                                                                                                                                                                                                             | Example Value |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| initialLimit | The initial limit to be used when the broker starts. The limit will be reset to this value when the broker restarts. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_VEGAS_INITIALLIMIT`. | 20            |
| alpha        | The limit is increased if the queue size is less than this value. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_VEGAS_ALPHA`.                                                           | 3             |
| beta         | The limit is decreased if the queue size is greater than this value. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_VEGAS_BETA`.                                                         | 6             |

#### YAML snippet

```yaml
backpressure:
  algorithm: vegas
  vegas:
    initialLimit: 20
    alpha: 3
    beta: 6
```

### zeebe.broker.backpressure.gradient

| Field        | Description                                                                                                                                                                                                                                                                                                                                          | Example Value |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| minLimit     | The minimum limit. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_GRADIENT_MINLIMIT`.                                                                                                                                                                                                                 | 10            |
| initialLimit | The initial limit to be used when the broker starts. The limit will be reset to this value when the broker restarts. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_GRADIENT_INITIALLIMIT`.                                                                                                           | 20            |
| rttTolerance | Tolerance for changes from minimum latency. A value ≥ 1.0 indicating how much change from minimum latency is acceptable before reducing the limit. For example, a value of 2.0 means that a 2x increase in latency is acceptable. This setting can also be overridden using the environment variable ZEEBE_BROKER_BACKPRESSURE_GRADIENT_RTTTOLERANCE | 2.0           |

#### YAML snippet

```yaml
backpressure:
  algorithm: gradient
  gradient:
    minLimit: 10
    initialLimit: 20
    rttTolerance: 2.0
```

### zeebe.broker.backpressure.gradient2

| Field        | Description                                                                                                                                                                                                                                                                                                                                              | Example Value |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| minLimit     | The minimum limit. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_GRADIENT2_MINLIMIT`.                                                                                                                                                                                                                    | 10            |
| initialLimit | The initial limit to be used when the broker starts. The limit will be reset to this value when the broker restarts. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_GRADIENT2_INITIALLIMIT`.                                                                                                              | 20            |
| rttTolerance | Tolerance for changes from minimum latency. A value ≥ 1.0 indicating how much change from minimum latency is acceptable before reducing the limit. For example, a value of 2.0 means that a 2x increase in latency is acceptable. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_GRADIENT2_RTTTOLERANCE`. | 2.0           |
| longWindow   | longWindow is the length of the window (the number of samples) to calculate the exponentially smoothed average latency. This setting can also be overridden using the environment `ZEEBE_BROKER_BACKPRESSURE_GRADIENT2_LONGWINDOW`.                                                                                                                      | 600           |

#### YAML snippet

```yaml
backpressure:
  algorithm: gradient2
  gradient2:
    minLimit: 10
    initialLimit: 20
    rttTolerance: 2.0
    longWindow: 600
```

### zeebe.broker.exporters

Each exporter should be configured following this template:

| Field     | Description                                                                                                                                                                                                                                                                                                                                            | Example Value |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| exporters | Configure exporters below                                                                                                                                                                                                                                                                                                                              |               |
| jarPath   | path to the JAR file containing the exporter class. JARs are only loaded once, so you can define two exporters that point to the same JAR, with the same class or a different one, and use args to parametrize its instantiation.                                                                                                                      |               |
| className | entry point of the exporter, a class which _must_ extend the io.camunda.zeebe.exporter.Exporter interface. A nested table as "args:" will allow you to inject arbitrary arguments into your class through the use of annotations. These setting can also be overridden using the environment variables "`ZEEBE_BROKER_EXPORTERS_`[exporter name]\_..." |               |

#### YAML snippet

```yaml
zeebe:
  broker:
    ...
    exporters:
      jarPath:
      className:
```

### zeebe.broker.exporters.elasticsearch

An example configuration for the Elasticsearch exporter can be found [here](../exporters/elasticsearch-exporter.md#example).

### zeebe.broker.exporters.opensearch (OpenSearch Exporter)

An example configuration for the OpenSearch exporter can be found [here](../exporters/opensearch-exporter.md#example).

### zeebe.broker.exporters.camundaExporter (Camunda Exporter)

An example configuration for the Camunda exporter can be found [here](../exporters/camunda-exporter.md#example).

### zeebe.broker.processing

| Field              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Example Value |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| maxCommandsInBatch | Sets the maximum number of commands that processed within one batch. The processor will process until no more follow up commands are created by the initial command or the configured limit is reached. By default, up to 100 commands are processed in one batch. Can be set to 1 to disable batch processing. Must be a positive integer number. Note that the resulting batch size will contain more entries than this limit because it includes follow up events. When resulting batch size is too large (see maxMessageSize), processing will be rolled back and retried with a smaller maximum batch size. Lowering the command limit can reduce the frequency of rollback and retry. This setting can also be overridden using the environment variable `ZEEBE_BROKER_PROCESSING_MAXCOMMANDSINBATCH`. | 100           |

#### YAML snippet

```yaml
processing: maxCommandsInBatch = 100
```

### Experimental configuration

See the experimental section of the [broker.yaml.template](https://github.com/camunda/camunda/blob/8.8.0/dist/src/main/config/broker.yaml.template#:~:text=%23%20experimental).

Be aware that all configurations which are part of the experimental section are subject to change and can be dropped at any time.

#### zeebe.broker.experimental.engine.caches

| Field                        | Description                                                                                                                                                                                                                                                                                                                                        | Example value |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| groupNameCacheCapacity       | Maximum number of group names held in the in-memory name-to-ID cache used during candidate group resolution. This setting can also be overridden using the environment variable `ZEEBE_BROKER_EXPERIMENTAL_ENGINE_CACHES_GROUPNAMECACHECAPACITY`.                                                                                                  | 1000          |
| candidateGroupNameResolution | If true, the Zeebe engine attempts to resolve user task candidate group names to group IDs at task creation. Set to false to disable this resolution and pass candidate group values through unchanged. This setting can also be overridden using the environment variable `ZEEBE_BROKER_EXPERIMENTAL_ENGINE_CACHES_CANDIDATEGROUPNAMERESOLUTION`. | true          |

### Multitenancy configuration

For an embedded gateway setup, any gateway property can be passed along to the `StandaloneBroker` by prefixing `zeebe.broker`.

#### zeebe.broker.gateway.multitenancy

Multi-tenancy in Zeebe can be configured with the following configuration properties.
Multi-tenancy is disabled by default.
Read more [in the multi-tenancy documentation](/components/concepts/multi-tenancy.md).

:::note
For now, multi-tenancy is only supported in combination with Identity.
To use multi-tenancy, you must set [`authentication.mode`](#zeebebrokergatewaysecurityauthentication) to `'identity'` and specify the
`camunda.identity.baseUrl` property or the [corresponding Camunda Identity environment variable](/self-managed/components/management-identity/miscellaneous/configuration-variables.md#core-configuration)
as well.
:::

:::note
If you are using a standalone gateway, refer to the [gateway configuration guide](./gateway.md#zeebegatewaymultitenancy).
:::

| Field   | Description                                                                                                                                                  | Example value |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| enabled | Enable multitenancy in the embedded gateway. This setting can also be overridden using the environment variable `ZEEBE_BROKER_GATEWAY_MULTITENANCY_ENABLED`. | false         |

##### YAML snippet

```yaml
broker:
  gateway:
    multitenancy:
      enabled: false
```

#### zeebe.broker.gateway.security.authentication

| Field | Description                                                                                                                                                                                                                                                                                                                                                                                                          | Example value |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| mode  | Controls which authentication mode is active; supported modes are `none` and `identity`. If `identity` is set, authentication will be done using [camunda-identity](/self-managed/components/management-identity/overview.md), which needs to be configured in the corresponding subsection. This setting can also be overridden using the environment variable `ZEEBE_BROKER_GATEWAY_SECURITY_AUTHENTICATION_MODE`. | none          |

##### YAML snippet

```yaml
security:
  authentication:
    mode: none
```

#### zeebe.broker.gateway.security.authentication.identity

:::note
The Zeebe configuration properties for Camunda Identity are deprecated as of version `8.4.0`. Use the dedicated
Camunda Identity properties or the [corresponding environment variables](/self-managed/components/management-identity/miscellaneous/configuration-variables.md#core-configuration).
:::

| Field            | Description                                                                                                                                                                                                 | Example value                                      |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| issuerBackendUrl | The URL to the auth provider backend, used to validate tokens. This setting can also be overridden using the environment variable `ZEEBE_BROKER_GATEWAY_SECURITY_AUTHENTICATION_IDENTITY_ISSUERBACKENDURL`. | http://keycloak:18080/auth/realms/camunda-platform |
| audience         | The required audience of the auth token. This setting can also be overridden using the environment variable `ZEEBE_BROKER_GATEWAY_SECURITY_AUTHENTICATION_IDENTITY_AUDIENCE`.                               | zeebe-api                                          |
| baseUrl          | The URL to the Identity instance. This setting can also be overridden using the environment variable `ZEEBE_BROKER_GATEWAY_SECURITY_AUTHENTICATION_IDENTITY_BASEURL`.                                       | http://identity:8084                               |

##### YAML snippet

```yaml
security:
  authentication:
    mode: identity
    identity:
      issuerBackendUrl: http://keycloak:18080/auth/realms/camunda-platform
      audience: zeebe-api
      type: keycloak
```

### Console Ping Configuration

This feature enables components like the Zeebe Broker, Tasklist, Operate, and Zeebe Gateway to ping Console with license information.

#### camunda.console.ping

| Field                        | Description                                                                                                                                                                            | Example value                  |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `enabled`                    | Enables or disables the ping to console feature. Disabled by default. This setting can also be overridden using the environment variable `CAMUNDA_CONSOLE_PING_ENABLED`                | `true`                         |
| `endpoint`                   | Endpoint where pings should be sent. This setting can also be overridden using the environment variable `CAMUNDA_CONSOLE_PING_ENDPOINT`.                                               | `https://console.endpoint.com` |
| `clusterName`                | Cluster name sent with telemetry. This setting can also be overridden using the environment variable `CAMUNDA_CONSOLE_PING_CLUSTERNAME`.                                               | `test_cluster_name`            |
| `pingPeriod`                 | Frequency of pings (e.g., `1s`, `1h`, `1d`). This setting can also be overridden using the environment variable `CAMUNDA_CONSOLE_PING_PINGPERIOD`.                                     | `1h`                           |
| `properties`                 | Additional properties to include in the ping payload (as key-value pairs). This setting can also be overridden using the environment variable `CAMUNDA_CONSOLE_PING_PROPERTIES`.       | `testProperty: 123`            |
| `retry.maxRetries`           | Maximum number of retry attempts after a failed ping. Uses exponential backoff. This setting can also be overridden using the environment variable `CAMUNDA_CONSOLE_PING_MAX_RETRIES`. | `1`                            |
| `retry.minRetryDelay`        | Minimum delay between retries. This setting can also be overridden using the environment variable `CAMUNDA_CONSOLE_PING_RETRY_MINRETRYDELAY`.                                          | `1s`                           |
| `retry.maxRetryDelay`        | Maximum delay between retries. This setting can also be overridden using the environment variable `CAMUNDA_CONSOLE_PING_ENABLED_RETRY_MAXRETRYDELAY`.                                  | `10s`                          |
| `retry.retryDelayMultiplier` | Multiplier applied to delay between retries. This setting can also be overridden using the environment variable `CAMUNDA_CONSOLE_PING_RETRY_RETRYDELAYMULTIPLIER`.                     | `2`                            |

##### YAML snippet

```yaml
camunda:
  console:
    ping:
      enabled: true
      endpoint: https://console.endpoint.com
      clusterName: test_cluster_name
      pingPeriod: 1h
      properties:
        testProperty: 123
      retry:
        maxRetries: 1
        minRetryDelay: 1s
        maxRetryDelay: 10s
        retryDelayMultiplier: 2
```
