---
id: broker-config
title: "Broker configuration"
sidebar_label: "Broker configuration"
description: "Let's analyze how to configure the Zeebe broker"
---

A complete broker configuration template is available in the [Zeebe repo](https://github.com/camunda/zeebe/blob/main/dist/src/main/config/broker.yaml.template).

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

### zeebe.broker.gateway

To configure the embedded gateway, see [Gateway config docs](/self-managed/zeebe-deployment/configuration/gateway.md).

| Name   | Description                                                                                                                                               | Example value |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| enable | Enable the embedded gateway to start on broker startup. This setting can also be overridden using the environment variable `ZEEBE_BROKER_GATEWAY_ENABLE`. | False         |

#### YAML snippet

```yaml
broker:
  gateway:
    enable: false
```

### zeebe.broker.network

This section contains the network configuration. Particularly, it allows to configure the hosts and ports the broker should bind to. The broker exposes two sockets:

1. command: the socket which is used for gateway-to-broker communication
2. internal: the socket which is used for broker-to-broker communication

| Name           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Example Value |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| host           | Controls the default host the broker should bind to. Can be overwritten on a per binding basis for client, management and replication. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_HOST`.                                                                                                                                                                                                                                      | 0.0.0.0       |
| advertisedHost | Controls the advertised host; if omitted defaults to the host. This is particularly useful if your broker stands behind a proxy. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_ADVERTISEDHOST`.                                                                                                                                                                                                                                  | 0.0.0.0       |
| portOffset     | If a port offset is set it will be added to all ports specified in the config or the default values. This is a shortcut to not always specifying every port. The offset will be added to the second last position of the port, as Zeebe requires multiple ports. As example a portOffset of 5 will increment all ports by 50, i.e. 26500 will become 26550 and so on. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_PORTOFFSET`. | 0             |
| maxMessageSize | Sets the maximum size of the incoming and outgoing messages (i.e. commands and events). This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_MAXMESSAGESIZE`.                                                                                                                                                                                                                                                                           | 4MB           |

#### YAML snippet

```yaml
network:
  host: 0.0.0.0
  advertisedHost: 0.0.0.0
  portOffset: 0
  maxMessageSize: 4MB
```

### zeebe.broker.network.security

| Name                 | Description                                                                                                                                                                                 | Example Value |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| enabled              | Enables TLS authentication between this gateway and other nodes in the cluster. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_SECURITY_ENABLED`. | False         |
| certificateChainPath | Sets the path to the certificate chain file. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_SECURITY_CERTIFICATECHAINPATH`.                       |               |
| privateKeyPath       | Sets the path to the private key file location. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_SECURITY_PRIVATEKEYPATH`.                          |               |

#### YAML snippet

```yaml
security:
  enabled: false
  certificateChainPath:
  privateKeyPath:
```

### zeebe.broker.network.commandApi

| Name           | Description                                                                                                                                                                                                                                           | Example Value |
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

| Name           | Description                                                                                                                                                                                                                                            | Example Value |
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

### zeebe.broker.data

This section allows to configure Zeebe's data storage. Data is stored in "partition folders". A partition folder has the following structure:

```
partitions
└── 1              (root partition folder)
    ├── 1.log
    ├── 2.log
    └── snapshots
        └── <snapshot-id>
                    └── xx.sst
    └── runtime
        └── yy.sst
```

| Name             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Example Value |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| directory        | Specify the directory in which data is stored. This setting can also be overridden using the environment variable ZEEBE_BROKER_DATA_DIRECTORY.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | data          |
| runtimeDirectory | Specify the directory in which runtime is stored. By default runtime is stored in `directory` for data. If runtimeDirectory is configured, then the configured directory will be used. It will have a subdirectory for each partition to store its runtime. There is no need to store runtime in a persistent storage. This configuration allows to split runtime to another disk to optimize for performance and disk usage. Note: If runtime is another disk than the data directory, files need to be copied to data directory while taking snapshot. This may impact disk i/o or performance during snapshotting. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_RUNTIMEDIRECTORY`. | null          |
| logSegmentSize   | The size of data log segment files. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_LOGSEGMENTSIZE`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 128MB         |
| snapshotPeriod   | How often we take snapshots of streams (time unit). This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_SNAPSHOTPERIOD`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 15m           |

#### YAML snippet

```yaml
data:
  directory: data
  runtimeDirectory: null
  logSegmentSize: 128MB
  snapshotPeriod: 15m
```

### zeebe.broker.data.disk

| Name               | Description                                                                                                                                                                                                                                                                                                                                  | Example Value |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| enableMonitoring   | Configure disk monitoring to prevent getting into a non-recoverable state due to out of disk space. When monitoring is enabled, the broker rejects commands and pause replication when the required freeSpace is not available. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_DISK_ENABLEMONITORING` | True          |
| monitoringInterval | Sets the interval at which the disk usage is monitored. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_DISK_MONITORINGINTERVAL`                                                                                                                                                                       | 1s            |

#### YAML snippet

```yaml
disk:
  enableMonitoring: true
  monitoringInterval: 1s
```

### zeebe.broker.data.disk.freeSpace

| Name        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Example Value |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| processing  | When the free space available is less than this value, this broker rejects all client commands and pause processing. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_DISK_FREESPACE_PROCESSING`                                                                                                                                                                                                                                                                                        | 2GB           |
| replication | When the free space available is less than this value, broker stops receiving replicated events. This value must be less than freeSpace.processing. It is recommended to configure free space large enough for at least one log segment and one snapshot. This is because a partition needs enough space to take a new snapshot to be able to compact the log segments to make disk space available again. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_DISK_FREESPACE_REPLICATION` | 1GB           |

#### YAML snippet

```yaml
disk:
  freeSpace:
    processing: 2GB
    replication: 1GB
```

### zeebe.broker.data.backup

Configure backup store.

:::note

Use the same configuration on all brokers of this cluster.

:::

| Name  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Example Value |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| store | Set the backup store type. Supported values are [NONE, S3, GCS]. Default value is NONE. When NONE, no backup store is configured and no backup will be taken. Use S3 to use any [S3 compatible storage](https://docs.aws.amazon.com/AmazonS3/latest/API/Type_API_Reference.html). Use GCS to use [Google Cloud Storage](https://cloud.google.com/storage/). This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_BACKUP_STORE`. | NONE          |

#### YAML snippet

```yaml
backup:
  store: NONE
```

### zeebe.broker.data.backup.s3

Configure the following if store is set to s3.

| Name                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Example Value |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| bucketName           | Name of the bucket where the backup will be stored. The bucket must be already created. The bucket must not be shared with other zeebe clusters. bucketName must not be empty. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_BACKUP_S3_BUCKETNAME`.                                                                                                                                                                                                                |               |
| endpoint             | Configure URL endpoint for the store. If no endpoint is provided, it will be determined based on the configured region. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_BACKUP_S3_ENDPOINT`.                                                                                                                                                                                                                                                                         |               |
| region               | Configure AWS region. If no region is provided it will be determined as [documented](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/region-selection.html#automatically-determine-the-aws-region-from-the-environment). This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_BACKUP_S3_REGION`                                                                                                                                                           |               |
| accessKey            | Configure access credentials. If either accessKey or secretKey is not provided, the credentials will be determined as [documented](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials.html#credentials-chain). This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_BACKUP_S3_ACCESSKEY`                                                                                                                                                         |               |
| secretKey            | This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_BACKUP_S3_SECRETKEY`.                                                                                                                                                                                                                                                                                                                                                                                                |               |
| apiCallTimeout       | Configure a maximum duration for all S3 client API calls. Lower values will ensure that failed or slow API calls don't block other backups but may increase the risk that backups can't be stored if uploading parts of the backup takes longer than the configured timeout. See https://github.com/aws/aws-sdk-java-v2/blob/master/docs/BestPractices.md#utilize-timeout-configurations. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_BACKUP_S3_APICALLTIMEOUT`. | PT180S        |
| forcePathStyleAccess | When enabled, forces the s3 client to use path-style access. By default, the client will automatically choose between path-style and virtual-hosted-style. Should only be enabled if the s3 compatible storage cannot support virtual-hosted-style. See https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-bucket-intro.html. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_BACKUP_S3_FORCEPATHSTYLEACCESS`.                                             | False         |
| compression          | When set to an algorithm such as 'zstd', enables compression of backup contents. When not set or set to 'none', backup content is not compressed. Enabling compression reduces the required storage space for backups in S3 but also increases the impact on CPU and disk utilization while taking a backup. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_BACKUP_S3_COMPRESSION`                                                                                  | none          |
| basePath             | When set, all objects in the bucket will use this prefix. Must be non-empty and not start or end with '/'. Useful for using the same bucket for multiple Zeebe clusters. In this case, basePath must be unique. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_BACKUP_S3_BASEPATH`.                                                                                                                                                                                 |

#### YAML snippet

```yaml
backup:
  store: s3
  s3:
    bucketName: null
    endpoint: null
    region: null
    secretKey: null
    apiCallTimeout: PT180S
    forcePathStyleAccess: false
    compression: none
    basePath: null
```

### zeebe.broker.data.backup.gcs

Configure the following if store is set to GCS.

| Name       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Example Value |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| bucketName | Name of the bucket where the backup will be stored. The bucket must already exist. The bucket must not be shared with other Zeebe clusters unless basePath is also set. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_BACKUP_GCS_BUCKETNAME`.                                                                                                                                                                                                                                                                                            |               |
| basePath   | When set, all blobs in the bucket will use this prefix. Useful for using the same bucket for multiple Zeebe clusters. In this case, basePath must be unique. Should not start or end with '/' character. Must be non-empty and not consist of only '/' characters. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_BACKUP_GCS_BASEPATH`.                                                                                                                                                                                                   |               |
| host       | When set, this overrides the host that the GCS client connects to. By default, this is not set because the client can automatically discover the correct host to connect to. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_BACKUP_GCS_HOST`                                                                                                                                                                                                                                                                                              |               |
| auth       | Configures which authentication method is used for connecting to GCS. Can be either 'auto' or 'none'. Choosing 'auto' means that the GCS client uses application default credentials which automatically discovers appropriate credentials from the runtime environment: https://cloud.google.com/docs/authentication/application-default-credentials. Choosing 'none' means that no authentication is attempted which is only applicable for testing with emulated GCS. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_BACKUP_GCS_AUTH`. | auto          |

#### YAML snippet

```yaml
backup:
  store: gcs
  gcs:
    bucketName: null
    basePath: null
    host: null
    auth: auto
```

### zeebe.broker.cluster

This section contains all cluster related configurations, to setup a zeebe cluster.

| Field                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Example Value                              |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| nodeId               | Specifies the unique id of this broker node in a cluster. The id should be between 0 and number of nodes in the cluster (exclusive). This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_NODEID`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 0                                          |
| partitionsCount      | Controls the number of partitions, which should exist in the cluster. This can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_PARTITIONSCOUNT`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 1                                          |
| replicationFactor    | Controls the replication factor, which defines the count of replicas per partition. The replication factor cannot be greater than the number of nodes in the cluster. This can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_REPLICATIONFACTOR`.                                                                                                                                                                                                                                                                                                                                                                                                                                              | 1                                          |
| clusterSize          | Specifies the zeebe cluster size. This value is used to determine which broker is responsible for which partition. This can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_CLUSTERSIZE`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 1                                          |
| initialContactPoints | Allows to specify a list of known other nodes to connect to on startup. The contact points of the internal network configuration must be specified. The format is [HOST:PORT]. To guarantee the cluster can survive network partitions, all nodes must be specified as initial contact points. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS` specifying a comma-separated list of contact points. Default is empty list.                                                                                                                                                                                                                               | [ 192.168.1.22:26502, 192.168.1.32:26502 ] |
| clusterName          | Allows to specify a name for the cluster. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_CLUSTERNAME`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | zeebe-cluster                              |
| heartbeatInterval    | Configure heartbeatInterval. The leader sends a heartbeat to a follower every heartbeatInterval. Note: This is an advanced setting. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_HEARTBEATINTERVAL`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 250ms                                      |
| electionTimeout      | Configure electionTimeout. If a follower does not receive a heartbeat from the leader with in an election timeout, it can start a new leader election. electionTimeout should be greater than configured heartbeatInterval. When the electionTimeout is large, there will be delay in detecting a leader failure. When the electionTimeout is small, it can lead to false positives when detecting leader failures and thus leading to unnecessary leader changes. If the network latency between the nodes is high, it is recommended to have a higher election latency. Note: This is an advanced setting. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_ELECTIONTIMEOUT`. | 2500ms                                     |

#### YAML snippet

```yaml
cluster:
  nodeId: 0
  partitionsCount: 1
  replicationFactor: 1
  clusterSize: 1
  initialContactPoints: []
  clusterName: zeebe-cluster
  heartbeatInterval: 250ms
  electionTimeout: 2500ms
```

### zeebe.broker.cluster.raft

| Field                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                            | Example Value |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| raft                   | Configure raft properties.                                                                                                                                                                                                                                                                                                                                                                                                             |               |
| enablePriorityElection | When this flag is enabled, the leader election algorithm attempts to elect the leaders based on a pre-defined priority. As a result, it tries to distributed the leaders uniformly across the brokers. Note that it is only a best-effort strategy. It is not guaranteed to be a strictly uniform distribution. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_RAFT_ENABLEPRIORITYELECTION`. | true          |

#### YAML snippet

```yaml
cluster:
  raft: enablePriorityElection = true
```

### zeebe.broker.cluster.flush

| Field     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Example Value |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| flush     | Configures how often data is explicitly flushed to disk. By default, for a given partition, data is flushed on every leader commit, and every follower append. This is to ensure consistency across all replicas. Disabling this can cause inconsistencies, and at worst, data corruption or data loss scenarios. The default behavior is optimized for safety, and flushing occurs on every leader commit and follower append in a synchronous fashion. You can introduce a delay to reduce the performance penalty of flushing via `delayTime`. |               |
| enabled   | If false, explicit flushing of the Raft log is disabled, and flushing only occurs right before a snapshot is taken. You should only disable explicit flushing if you are willing to accept potential data loss at the expense of performance. Before disabling it, try the delayed options, which provide a trade-off between safety and performance. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_RAFT_FLUSH_ENABLED`.                                                                               | True          |
| delayTime | If the delay is > 0, then flush requests are delayed by at least the given period. It is recommended that you find the smallest delay here with which you achieve your performance goals. It's also likely that anything above 30s is not useful, as this is the typical default flush interval for the Linux OS. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_RAFT_FLUSH_DELAYTIME`.                                                                                                                 | 0s            |

#### YAML snippet

```yaml
cluster:
  flush:
    enabled: true
    delayTime: 0s
```

### zeebe.broker.cluster.membership

Configure parameters for SWIM protocol which is used to propagate cluster membership information among brokers and gateways.

| Field             | Example Value                                                                                                                                                                                                                                                                                                                                         | Description |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| broadcastUpdates  | Configure whether to broadcast member updates to all members. If set to false updates will be gossiped among the members. If set to true the network traffic may increase but it reduce the time to detect membership changes. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_MEMBERSHIP_BROADCASTUPDATES`. | False       |
| broadcastDisputes | Configure whether to broadcast disputes to all members. If set to true the network traffic may increase but it reduce the time to detect membership changes. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_MEMBERSHIP_BROADCASTDISPUTES`.                                                                  | True        |
| notifySuspect     | Configure whether to notify a suspect node on state changes. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_MEMBERSHIP_NOTIFYSUSPECT`.                                                                                                                                                                      | False       |
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

### zeebe.broker.threads

| Field          | Example Value                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Description |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| cpuThreadCount | Controls the number of non-blocking CPU threads to be used. WARNING: You should never specify a value that is larger than the number of physical cores available. Good practice is to leave 1-2 cores for ioThreads and the operating system (it has to run somewhere). For example, when running Zeebe on a machine which has 4 cores, a good value would be 2. This setting can also be overridden using the environment variable `ZEEBE_BROKER_THREADS_CPUTHREADCOUNT`. | 2           |
| ioThreadCount  | Controls the number of io threads to be used. These threads are used for workloads that write data to disk. While writing, these threads are blocked which means that they yield the CPU. This setting can also be overridden using the environment variable `ZEEBE_BROKER_THREADS_IOTHREADCOUNT`.                                                                                                                                                                         | 2           |

#### YAML snippet

```yaml
threads:
  cpuThreadCount: 2
  ioThreadCount: 2
```

### zeebe.broker.backpressure

| Field       | Description                                                                                                                                                                                                                                                                                                                                        | Example Value |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| enabled     | Set this to enable or disable backpressure. When enabled the broker rejects user requests when the number of inflight requests is greater than than the "limit". The value of the "limit" is determined based on the configured algorithm. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_ENABLED`. | True          |
| useWindowed | if enabled - will use the average latencies over a window as the current latency to update the limit. It is not recommended to enable this when the algorithm is aimd. This setting is not applicable to fixed limit. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_USEWINDOWED`.                  | True          |
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

| Field        | Description                                                                                                                                                                                                                                                                                                                                           | Example Value |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| minLimit     | The minimum limit. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_GRADIENT_MINLIMIT`.                                                                                                                                                                                                                  | 10            |
| initialLimit | The initial limit to be used when the broker starts. The limit will be reset to this value when the broker restarts. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_GRADIENT_INITIALLIMIT`.                                                                                                            | 20            |
| rttTolerance | Tolerance for changes from minimum latency. A value >= 1.0 indicating how much change from minimum latency is acceptable before reducing the limit. For example, a value of 2.0 means that a 2x increase in latency is acceptable. This setting can also be overridden using the environment variable ZEEBE_BROKER_BACKPRESSURE_GRADIENT_RTTTOLERANCE | 2.0           |

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

| Field        | Description                                                                                                                                                                                                                                                                                                                                               | Example Value |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| minLimit     | The minimum limit. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_GRADIENT2_MINLIMIT`.                                                                                                                                                                                                                     | 10            |
| initialLimit | The initial limit to be used when the broker starts. The limit will be reset to this value when the broker restarts. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_GRADIENT2_INITIALLIMIT`.                                                                                                               | 20            |
| rttTolerance | Tolerance for changes from minimum latency. A value >= 1.0 indicating how much change from minimum latency is acceptable before reducing the limit. For example, a value of 2.0 means that a 2x increase in latency is acceptable. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_GRADIENT2_RTTTOLERANCE`. | 2.0           |
| longWindow   | longWindow is the length of the window (the number of samples) to calculate the exponentially smoothed average latency. This setting can also be overridden using the environment `ZEEBE_BROKER_BACKPRESSURE_GRADIENT2_LONGWINDOW`.                                                                                                                       | 600           |

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
exporters:
  jarPath:
  className:
```

### zeebe.broker.exporters.elasticsearch

An example configuration for the Elasticsearch exporter is below.

These setting can also be overridden using the environment variables `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCH_*`

#### YAML snippet

```yaml
exporters:
  elasticsearch:
    className: io.camunda.zeebe.exporter.ElasticsearchExporter

    args:
      url: http://localhost:9200

      bulk:
        delay: 5
        size: 1000
        memoryLimit: 10485760

      authentication:
        username: elastic
        password: changeme

      index:
        prefix: zeebe-record
        createTemplate: true

        numberOfShards: 3
        numberOfReplicas: 0

        command: false
        event: true
        rejection: false

        commandDistribution: true
        decisionRequirements: true
        decision: true
        decisionEvaluation: true
        deployment: true
        deploymentDistribution: true
        error: true
        escalation: true
        incident: true
        job: true
        jobBatch: false
        message: true
        messageStartSubscription: true
        messageSubscription: true
        process: true
        processEvent: false
        processInstance: true
        processInstanceCreation: true
        processInstanceModification: true
        processMessageSubscription: true
        resourceDeletion: true
        signal: true
        signalSubscription: true
        timer: true
        variable: true
        variableDocument: true

      retention:
        enabled: false
        minimumAge: 30d
        policyName: zeebe-record-retention-policy
```

### zeebe.broker.exporters.opensearch (OpenSearch Exporter)

An example configuration for the OpenSearch exporter.

These setting can also be overridden using the environment variables `ZEEBE_BROKER_EXPORTERS_OPENSEARCH_*`

#### YAML snippet

```yaml
exporters:
  opensearch:
    className: io.camunda.zeebe.exporter.opensearch.OpensearchExporter

    args:
      url: http://localhost:9200
      requestTimeoutMs: 1000

      bulk:
        delay: 5
        size: 1000
        memoryLimit: 10485760

      authentication:
        username: opensearch
        password: changeme

      aws:
        enabled: true
        serviceName: es
        region: eu-west-1

      index:
        prefix: zeebe-record
        createTemplate: true

        numberOfShards: 3
        numberOfReplicas: 0

        command: false
        event: true
        rejection: false

        commandDistribution: true
        decisionRequirements: true
        decision: true
        decisionEvaluation: true
        deployment: true
        deploymentDistribution: true
        error: true
        escalation: true
        incident: true
        job: true
        jobBatch: false
        message: true
        messageStartSubscription: true
        messageSubscription: true
        process: true
        processEvent: false
        processInstance: true
        processInstanceCreation: true
        processInstanceModification: true
        processMessageSubscription: true
        resourceDeletion: true
        signal: true
        signalSubscription: true
        timer: true
        variable: true
        variableDocument: true
```

### zeebe.broker.processing

| Field              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Example Value |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| maxCommandsInBatch | Sets the maximum number of commands that processed within one batch. The processor will process until no more follow up commands are created by the initial command or the configured limit is reached. By default, up to 100 commands are processed in one batch. Can be set to 1 to disable batch processing. Must be a positive integer number. Note that the resulting batch size will contain more entries than this limit because it includes follow up events. When resulting batch size is too large (see maxMessageSize), processing will be rolled back and retried with a smaller maximum batch size. Lowering the command limit can reduce the frequency of rollback and retry. This setting can also be overridden using the environment variable `ZEEBE_BROKER_PROCESSING_MAXCOMMANDSINBATCH`. | 100           |

#### YAML snippet

```yaml
processing: maxCommandsInBatch = 100
```

### Experimental configuration

See the experimental section of the [broker.yaml.template](https://github.com/camunda/zeebe/blob/main/dist/src/main/config/broker.yaml.template#L733).

Be aware that all configuration's which are part of the experimental section are subject to change and can be dropped at any time.
