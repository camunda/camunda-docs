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

For buffers and others must be specified as strings and follow the following format: "10U" where U (unit) must be replaced with KB = Kilobytes, MB = Megabytes or GB = Gigabytes. If unit is omitted then the default unit is simply bytes.

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

<table name="gateway" id="zeebe">
    <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Example value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>enable</td>
            <td>Enable the embedded gateway to start on broker startup. This setting can also be overridden using the environment variable `ZEEBE_BROKER_GATEWAY_ENABLE`.</td>
            <td>False</td>
        </tr>
    </tbody>
</table>

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

<table name="network" id="network">
    <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Default Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>host</td>
            <td>Controls the default host the broker should bind to. Can be overwritten on a per binding basis for client, management and replication. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_HOST`.</td>
            <td>0.0.0.0</td>
        </tr>
        <tr>
            <td>advertisedHost</td>
            <td>Controls the advertised host; if omitted defaults to the host. This is particularly useful if your broker stands behind a proxy. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_ADVERTISEDHOST`.</td>
            <td>0.0.0.0</td>
        </tr>
        <tr>
            <td>portOffset</td>
            <td>If a port offset is set it will be added to all ports specified in the config or the default values. This is a shortcut to not always specifying every port. The offset will be added to the second last position of the port, as Zeebe requires multiple ports. As example a portOffset of 5 will increment all ports by 50, i.e. 26500 will become 26550 and so on. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_PORTOFFSET`.</td>
            <td>0</td>
        </tr>
        <tr>
            <td>maxMessageSize</td>
            <td>Sets the maximum size of the incoming and outgoing messages (i.e. commands and events). This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_MAXMESSAGESIZE`.</td>
            <td>4MB</td>
        </tr>
    </tbody>
</table>

#### YAML snippet

```yaml
network:
  host: 0.0.0.0
  advertisedHost: 0.0.0.0
  portOffset: 0
  maxMessageSize: 4MB
```

### zeebe.broker.network.security

<table name="security" id="security">
    <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Default Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>enabled</td>
            <td>Enables TLS authentication between this gateway and other nodes in the cluster. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_SECURITY_ENABLED`.</td>
            <td>False</td>
        </tr>
        <tr>
            <td>certificateChainPath</td>
            <td>Sets the path to the certificate chain file. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_SECURITY_CERTIFICATECHAINPATH`.</td>
            <td></td>
        </tr>
        <tr>
            <td>privateKeyPath</td>
            <td>Sets the path to the private key file location. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_SECURITY_PRIVATEKEYPATH`.</td>
            <td></td>
        </tr>
    </tbody>
</table>

#### YAML snippet

```yaml
security:
  enabled: false
  certificateChainPath:
  privateKeyPath:
```

### zeebe.broker.network.commandApi

<table name="commandApi" id="commandApi">
    <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Default Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>host</td>
            <td>Overrides the host used for gateway-to-broker communication. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_COMMANDAPI_HOST`.</td>
            <td>0.0.0.0</td>
        </tr>
        <tr>
            <td>port</td>
            <td>Sets the port used for gateway-to-broker communication. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_COMMANDAPI_PORT`.</td>
            <td>26501</td>
        </tr>
        <tr>
            <td>advertisedHost</td>
            <td>Controls the advertised host; if omitted defaults to the host. This is particularly useful if your broker stands behind a proxy. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_COMMANDAPI_ADVERTISEDHOST`.</td>
            <td>0.0.0.0</td>
        </tr>
        <tr>
            <td>advertisedPort</td>
            <td>Controls the advertised port; if omitted defaults to the port. This is particularly useful if your broker stands behind a proxy. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_COMMANDAPI_ADVERTISEDPORT`.</td>
            <td>25601</td>
        </tr>
    </tbody>
</table>

#### YAML snippet

```yaml
commandApi:
  host: 0.0.0.0
  port: 26501
  advertisedHost: 0.0.0.0
  advertisedPort: 25601
```

### zeebe.broker.network.internalApi

<table name="internalApi" id="internalApi">
    <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Default Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>host</td>
            <td>Overrides the host used for internal broker-to-broker communication. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_INTERNALAPI_HOST`.</td>
            <td>0.0.0.0</td>
        </tr>
        <tr>
            <td>port</td>
            <td>Sets the port used for internal broker-to-broker communication. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_INTERNALAPI_PORT`.</td>
            <td>26502</td>
        </tr>
        <tr>
            <td>advertisedHost</td>
            <td>Controls the advertised host; if omitted defaults to the host. This is particularly useful if your broker stands behind a proxy. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_INTERNALAPI_ADVERTISEDHOST`.</td>
            <td>0.0.0.0</td>
        </tr>
        <tr>
            <td>advertisedPort</td>
            <td>Controls the advertised port; if omitted defaults to the port. This is particularly useful if your broker stands behind a proxy. This setting can also be overridden using the environment variable `ZEEBE_BROKER_NETWORK_INTERNALAPI_ADVERTISEDPORT`.</td>
            <td>25602</td>
        </tr>
    </tbody>
</table>

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

<table name="data" id="data">
    <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Default Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>directory</td>
            <td>Specify the directory in which data is stored. This setting can also be overridden using the environment variable ZEEBE_BROKER_DATA_DIRECTORY.</td>
            <td>data</td>
        </tr>
        <tr>
            <td>runtimeDirectory</td>
            <td>Specify the directory in which runtime is stored. By default runtime is stored in `directory` for data. If runtimeDirectory is configured, then the configured directory will be used. It will have a subdirectory for each partition to store its runtime. There is no need to store runtime in a persistent storage. This configuration allows to split runtime to another disk to optimize for performance and disk usage.
            Note: If runtime is another disk than the data directory, files need to be copied to data directory while taking snapshot. This may impact disk i/o or performance during snapshotting. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_RUNTIMEDIRECTORY`.</td>
            <td>None</td>
        </tr>
        <tr>
            <td>logSegmentSize</td>
            <td>The size of data log segment files. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_LOGSEGMENTSIZE`.</td>
            <td>128MB</td>
        </tr>
        <tr>
            <td>snapshotPeriod</td>
            <td>How often we take snapshots of streams (time unit). This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_SNAPSHOTPERIOD`.</td>
            <td>15m</td>
        </tr>
    </tbody>
</table>

#### YAML snippet

```yaml
data:
  directory: data
  runtimeDirectory: null
  logSegmentSize: 128MB
  snapshotPeriod: 15m
```

### zeebe.broker.data.disk

<table name="disk" id="disk">
    <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Default Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>enableMonitoring</td>
            <td>Configure disk monitoring to prevent getting into a non-recoverable state due to out of disk space. When monitoring is enabled, the broker rejects commands and pause replication when the required freeSpace is not available. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_DISK_ENABLEMONITORING`</td>
            <td>True</td>
        </tr>
        <tr>
            <td>monitoringInterval</td>
            <td>Sets the interval at which the disk usage is monitored. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_DISK_MONITORINGINTERVAL`</td>
            <td>1s</td>
        </tr>
        <tr>
            <td>freeSpace</td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>processing</td>
            <td>When the free space available is less than this value, this broker rejects all client commands and pause processing. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_DISK_FREESPACE_PROCESSING`</td>
            <td>2GB</td>
        </tr>
        <tr>
            <td>replication</td>
            <td>When the free space available is less than this value, broker stops receiving replicated events. This value must be less than freeSpace.processing. It is recommended to configure free space large enough for at least one log segment and one snapshot. This is because a partition needs enough space to take a new snapshot to be able to compact the log segments to make disk space available again. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_DISK_FREESPACE_REPLICATION`</td>
            <td>1GB</td>
        </tr>
    </tbody>
</table>

#### YAML snippet

```yaml
disk:
  enableMonitoring: true
  monitoringInterval: 1s
  freeSpace:
    processing: 2GB
    replication: 1GB
```

### zeebe.broker.data.backup

Configure backup store.

:::note

Use the same configuration on all brokers of this cluster.

:::

<table name="zeebe" id="zeebe">
    <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Default Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>store</td>
            <td>Set the backup store type. Supported values are [NONE, S3, GCS]. Default value is NONE. When NONE, no backup store is configured and no backup will be taken. Use S3 to use any S3 compatible storage (https://docs.aws.amazon.com/AmazonS3/latest/API/Type_API_Reference.html). Use GCS to use Google Cloud Storage (https://cloud.google.com/storage/). This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_BACKUP_STORE`.</td>
            <td>NONE</td>
        </tr>
        <tr>
            <td>s3</td>
            <td>Configure the following if store is set to S3.</td>
            <td></td>
        </tr>
        <tr>
            <td>bucketName</td>
            <td>Name of the bucket where the backup will be stored. The bucket must be already created. The bucket must not be shared with other zeebe clusters. bucketName must not be empty. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_BACKUP_S3_BUCKETNAME`.</td>
            <td></td>
        </tr>
        <tr>
            <td>endpoint</td>
            <td>Configure URL endpoint for the store. If no endpoint is provided, it will be determined based on the configured region. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_BACKUP_S3_ENDPOINT`.</td>
            <td></td>
        </tr>
        <tr>
            <td>region</td>
            <td>Configure AWS region. If no region is provided it will be determined as [documented](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/region-selection.html#automatically-determine-the-aws-region-from-the-environment). This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_BACKUP_S3_REGION`</td>
            <td></td>
        </tr>
        <tr>
            <td>accessKey</td>
            <td>Configure access credentials. If either accessKey or secretKey is not provided, the credentials will be determined as [documented](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials.html#credentials-chain). This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_BACKUP_S3_ACCESSKEY`</td>
            <td></td>
        </tr>
        <tr>
            <td>secretKey</td>
            <td>This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_BACKUP_S3_SECRETKEY`.</td>
            <td></td>
        </tr>
        <tr>
            <td>apiCallTimeout</td>
            <td>Configure a maximum duration for all S3 client API calls. Lower values will ensure that failed or slow API calls don't block other backups but may increase the risk that backups can't be stored if uploading parts of the backup takes longer than the configured timeout. See https://github.com/aws/aws-sdk-java-v2/blob/master/docs/BestPractices.md#utilize-timeout-configurations. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_BACKUP_S3_APICALLTIMEOUT`.</td>
            <td>PT180S</td>
        </tr>
        <tr>
            <td>forcePathStyleAccess</td>
            <td>When enabled, forces the s3 client to use path-style access. By default, the client will automatically choose between path-style and virtual-hosted-style. Should only be enabled if the s3 compatible storage cannot support virtual-hosted-style. See https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-bucket-intro.html. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_BACKUP_S3_FORCEPATHSTYLEACCESS`.</td>
            <td>False</td>
        </tr>
        <tr>
            <td>compression</td>
            <td>When set to an algorithm such as 'zstd', enables compression of backup contents. When not set or set to 'none', backup content is not compressed. Enabling compression reduces the required storage space for backups in S3 but also increases the impact on CPU and disk utilization while taking a backup. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_BACKUP_S3_COMPRESSION`</td>
            <td>none</td>
        </tr>
        <tr>
            <td>basePath</td>
            <td>When set, all objects in the bucket will use this prefix. Must be non-empty and not start or end with '/'. Useful for using the same bucket for multiple Zeebe clusters. In this case, basePath must be unique. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_BACKUP_S3_BASEPATH`.</td>
            <td></td>
        </tr>
        <tr>
            <td>gcs</td>
            <td>Configure the following if store is set to GCS</td>
            <td></td>
        </tr>
        <tr>
            <td>bucketName</td>
            <td>Name of the bucket where the backup will be stored. The bucket must already exist. The bucket must not be shared with other Zeebe clusters unless basePath is also set. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_BACKUP_GCS_BUCKETNAME`.</td>
            <td></td>
        </tr>
        <tr>
            <td>basePath</td>
            <td>When set, all blobs in the bucket will use this prefix. Useful for using the same bucket for multiple Zeebe clusters. In this case, basePath must be unique. Should not start or end with '/' character. Must be non-empty and not consist of only '/' characters. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_BACKUP_GCS_BASEPATH`.</td>
            <td></td>
        </tr>
        <tr>
            <td>host</td>
            <td>When set, this overrides the host that the GCS client connects to. By default, this is not set because the client can automatically discover the correct host to connect to. This setting can also be overridden using the environment variable ZEEBE_BROKER_DATA_BACKUP_GCS_HOST</td>
            <td></td>
        </tr>
        <tr>
            <td>auth</td>
            <td>Configures which authentication method is used for connecting to GCS. Can be either 'auto' or 'none'. Choosing 'auto' means that the GCS client uses application default credentials which automatically discovers appropriate credentials from the runtime environment: https://cloud.google.com/docs/authentication/application-default-credentials. Choosing 'none' means that no authentication is attempted which is only applicable for testing with emulated GCS. This setting can also be overridden using the environment variable `ZEEBE_BROKER_DATA_BACKUP_GCS_AUTH`.</td>
            <td>auto</td>
        </tr>
    </tbody>
</table>

#### YAML snippet

```yaml
backup:
  store: NONE
  s3:
    bucketName: null
    endpoint: null
    region: null
    secretKey: null
    apiCallTimeout: PT180S
    forcePathStyleAccess: false
    compression: none
    basePath: null
  gcs:
    bucketName: null
    basePath: null
    host: null
    auth: auto
```

### zeebe.broker.cluster

This section contains all cluster related configurations, to setup a zeebe cluster.

<table name="cluser" id="cluster">
    <thead>
        <tr>
            <th>Field</th>
            <th>Description</th>
            <th>Example Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>nodeId</td>
            <td>Specifies the unique id of this broker node in a cluster. The id should be between 0 and number of nodes in the cluster (exclusive). This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_NODEID`.</td>
            <td>0</td>
        </tr>
        <tr>
            <td>partitionsCount</td>
            <td>Controls the number of partitions, which should exist in the cluster. This can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_PARTITIONSCOUNT`.</td>
            <td>1</td>
        </tr>
        <tr>
            <td>replicationFactor</td>
            <td>Controls the replication factor, which defines the count of replicas per partition. The replication factor cannot be greater than the number of nodes in the cluster. This can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_REPLICATIONFACTOR`.</td>
            <td>1</td>
        </tr>
        <tr>
            <td>clusterSize</td>
            <td>Specifies the zeebe cluster size. This value is used to determine which broker is responsible for which partition. This can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_CLUSTERSIZE`.</td>
            <td>1</td>
        </tr>
        <tr>
            <td>initialContactPoints</td>
            <td>Allows to specify a list of known other nodes to connect to on startup. The contact points of the internal network configuration must be specified. The format is [HOST:PORT]. To guarantee the cluster can survive network partitions, all nodes must be specified as initial contact points. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS` specifying a comma-separated list of contact points. Default is empty list.</td>
            <td>[ 192.168.1.22:26502, 192.168.1.32:26502 ]</td>
        </tr>
        <tr>
            <td>clusterName</td>
            <td>Allows to specify a name for the cluster. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_CLUSTERNAME`.</td>
            <td>zeebe-cluster</td>
        </tr>
        <tr>
            <td>heartbeatInterval</td>
            <td>Configure heartbeatInterval. The leader sends a heartbeat to a follower every heartbeatInterval. Note: This is an advanced setting. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_HEARTBEATINTERVAL`.</td>
            <td>250ms</td>
        </tr>
        <tr>
            <td>electionTimeout</td>
            <td>Configure electionTimeout. If a follower does not receive a heartbeat from the leader with in an election timeout, it can start a new leader election. electionTimeout should be greater than configured heartbeatInterval. When the electionTimeout is large, there will be delay in detecting a leader failure. When the electionTimeout is small, it can lead to false positives when detecting leader failures and thus leading to unnecessary leader changes. If the network latency between the nodes is high, it is recommended to have a higher election latency. Note: This is an advanced setting. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_ELECTIONTIMEOUT`.</td>
            <td>2500ms</td>
        </tr>
        <tr>
            <td>raft</td>
            <td>Configure raft properties.</td>
            <td></td>
        </tr>
        <tr>
            <td>enablePriorityElection</td>
            <td>When this flag is enabled, the leader election algorithm attempts to elect the leaders based on a pre-defined priority. As a result, it tries to distributed the leaders uniformly across the brokers. Note that it is only a best-effort strategy. It is not guaranteed to be a strictly uniform distribution. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_RAFT_ENABLEPRIORITYELECTION`.</td>
            <td>true</td>
        </tr>
        <tr>
            <td>flush</td>
            <td>Configures how often data is explicitly flushed to disk. By default, for a given partition, data is flushed on every leader commit, and every follower append. This is to ensure consistency across all replicas. Disabling this can cause inconsistencies, and at worst, data corruption or data loss scenarios. The default behavior is optimized for safety, and flushing occurs on every leader commit and follower append in a synchronous fashion. You can introduce a delay to reduce the performance penalty of flushing via `delayTime`.</td>
            <td></td>
        </tr>
        <tr>
            <td>enabled</td>
            <td>If false, explicit flushing of the Raft log is disabled, and flushing only occurs right before a snapshot is taken. You should only disable explicit flushing if you are willing to accept potential data loss at the expense of performance. Before disabling it, try the delayed options, which provide a trade-off between safety and performance. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_RAFT_FLUSH_ENABLED`.</td>
            <td>True</td>
        </tr>
        <tr>
            <td>delayTime</td>
            <td>If the delay is > 0, then flush requests are delayed by at least the given period. It is recommended that you find the smallest delay here with which you achieve your performance goals. It's also likely that anything above 30s is not useful, as this is the typical default flush interval for the Linux OS. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_RAFT_FLUSH_DELAYTIME`.</td>
            <td>0s</td>
        </tr>
    </tbody>
</table>

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
  raft: enablePriorityElection = true
  flush:
    enabled: true
    delayTime: 0s
```

### zeebe.broker.cluster.membership

Configure parameters for SWIM protocol which is used to propagate cluster membership information among brokers and gateways.

<table name="membership" id="membership">
    <thead>
        <tr>
            <th>Field</th>
            <th>Example Value</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>broadcastUpdates</td>
            <td>Configure whether to broadcast member updates to all members. If set to false updates will be gossiped among the members. If set to true the network traffic may increase but it reduce the time to detect membership changes. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_MEMBERSHIP_BROADCASTUPDATES`.</td>
            <td>False</td>
        </tr>
        <tr>
            <td>broadcastDisputes</td>
            <td>Configure whether to broadcast disputes to all members. If set to true the network traffic may increase but it reduce the time to detect membership changes. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_MEMBERSHIP_BROADCASTDISPUTES`.</td>
            <td>True</td>
        </tr>
        <tr>
            <td>notifySuspect</td>
            <td>Configure whether to notify a suspect node on state changes. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_MEMBERSHIP_NOTIFYSUSPECT`.</td>
            <td>False</td>
        </tr>
        <tr>
            <td>gossipInterval</td>
            <td>Sets the interval at which the membership updates are sent to a random member. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_MEMBERSHIP_GOSSIPINTERVAL`.</td>
            <td>250ms</td>
        </tr>
        <tr>
            <td>gossipFanout</td>
            <td>Sets the number of members to which membership updates are sent at each gossip interval. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_MEMBERSHIP_GOSSIPFANOUT`.</td>
            <td>2</td>
        </tr>
        <tr>
            <td>probeInterval</td>
            <td>Sets the interval at which to probe a random member. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_MEMBERSHIP_PROBEINTERVAL`.</td>
            <td>1s</td>
        </tr>
        <tr>
            <td>probeTimeout</td>
            <td>Sets the timeout for a probe response. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_MEMBERSHIP_PROBETIMEOUT`.</td>
            <td>100ms</td>
        </tr>
        <tr>
            <td>suspectProbes</td>
            <td>Sets the number of probes failed before declaring a member is suspect. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_MEMBERSHIP_SUSPECTPROBES`.</td>
            <td>3</td>
        </tr>
        <tr>
            <td>failureTimeout</td>
            <td>Sets the timeout for a suspect member is declared dead. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_MEMBERSHIP_FAILURETIMEOUT`.</td>
            <td>10s</td>
        </tr>
        <tr>
            <td>syncInterval</td>
            <td>Sets the interval at which this member synchronizes its membership information with a random member. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_MEMBERSHIP_SYNCINTERVAL`.</td>
            <td>10s</td>
        </tr>
    </tbody>
</table>

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

<table name="messageCompression" id="messageCompression">
    <thead>
        <tr>
            <th>Field</th>
            <th>Description</th>
            <th>Example Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>messageCompression</td>
            <td>Configure compression algorithm for all messages sent between the gateway and the brokers. Available options are NONE, GZIP and SNAPPY. This setting can also be overridden using the environment variable `ZEEBE_BROKER_CLUSTER_MESSAGECOMPRESSION`.</td>
            <td>NONE</td>
        </tr>
    </tbody>
</table>

#### YAML snippet

```yaml
messageCompression: NONE
```

### zeebe.broker.threads

 <table name="threads" id="threads">
    <thead>
        <tr>
            <th>Field</th>
            <th>Example Value</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>cpuThreadCount</td>
            <td>Controls the number of non-blocking CPU threads to be used. WARNING: You should never specify a value that is larger than the number of physical cores available. Good practice is to leave 1-2 cores for ioThreads and the operating system (it has to run somewhere). For example, when running Zeebe on a machine which has 4 cores, a good value would be 2. This setting can also be overridden using the environment variable `ZEEBE_BROKER_THREADS_CPUTHREADCOUNT`.</td>
            <td>2</td>
        </tr>
        <tr>
            <td>ioThreadCount</td>
            <td>Controls the number of io threads to be used. These threads are used for workloads that write data to disk. While writing, these threads are blocked which means that they yield the CPU. This setting can also be overridden using the environment variable `ZEEBE_BROKER_THREADS_IOTHREADCOUNT`.</td>
            <td>2</td>
        </tr>
    </tbody>
</table>

#### YAML snippet

```yaml
threads:
  cpuThreadCount: 2
  ioThreadCount: 2
```

### zeebe.broker.backpressure

 <table name="backpressure" id="backpressure">
    <thead>
        <tr>
            <th>Field</th>
            <th>Description</th>
            <th>Example Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>enabled</td>
            <td>Set this to enable or disable backpressure. When enabled the broker rejects user requests when the number of inflight requests is greater than than the "limit". The value of the "limit" is determined based on the configured algorithm. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_ENABLED`.</td>
            <td>True</td>
        </tr>
        <tr>
            <td>useWindowed</td>
            <td>if enabled - will use the average latencies over a window as the current latency to update the limit. It is not recommended to enable this when the algorithm is aimd. This setting is not applicable to fixed limit. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_USEWINDOWED`.</td>
            <td>True</td>
        </tr>
        <tr>
            <td>algorithm</td>
            <td>The algorithm configures which algorithm to use for the backpressure. It should be one of vegas, aimd, fixed, gradient, or gradient2. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_ALGORITHM`.</td>
            <td>aimd</td>
        </tr>
        <tr>
            <td>aimd</td>
            <td>Configure the parameters for "aimd" algorithm. AIMD increases the limit for every successful response and decrease the limit for every request timeout.</td>
            <td></td>
        </tr>
        <tr>
            <td>requestTimeout</td>
            <td>The limit will be reduced if the observed latency is greater than the requestTimeout. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_AIMD_REQUESTTIMEOUT`.</td>
            <td>200ms</td>
        </tr>
        <tr>
            <td>initialLimit</td>
            <td>The initial limit to be used when the broker starts. The limit will be reset to this value when the broker restarts. This setting can also be overridden using the environment `ZEEBE_BROKER_BACKPRESSURE_AIMD_INITIALLIMIT`.</td>
            <td>100</td>
        </tr>
        <tr>
            <td>minLimit</td>
            <td>The minimum limit. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_AIMD_MINLIMIT`.</td>
            <td>1</td>
        </tr>
        <tr>
            <td>maxLimit</td>
            <td>The maximum limit. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_AIMD_MAXLIMIT`.</td>
            <td>1000</td>
        </tr>
        <tr>
            <td>backoffRatio</td>
            <td>The backoffRatio is a double value x such that x is between 0 and 1. It determines the factor by which the limit is decreased. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_AIMD_BACKOFFRATIO`.</td>
            <td>0.9</td>
        </tr>
        <tr>
            <td>fixed</td>
            <td>Configure the parameters for "fixed" algorithm. </td>
            <td></td>
        </tr>
        <tr>
            <td>limit</td>
            <td>Set a fixed limit. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_FIXED_LIMIT`.</td>
            <td>20</td>
        </tr>
        <tr>
            <td>vegas</td>
            <td>Configure the parameters for "vegas" algorithm. Vegas is an adaptive limit algorithm based on TCP Vegas congestion control algorithm. It estimates a queue size which indicates how many additional requests are in the queue over the estimated limit. The limit is adjusted based on this queueSize.</td>
            <td></td>
        </tr>
        <tr>
            <td>initialLimit</td>
            <td>The initial limit to be used when the broker starts. The limit will be reset to this value when the broker restarts. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_VEGAS_INITIALLIMIT`.</td>
            <td>20</td>
        </tr>
        <tr>
            <td>alpha</td>
            <td>The limit is increased if the queue size is less than this value. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_VEGAS_ALPHA`.</td>
            <td>3</td>
        </tr>
        <tr>
            <td>beta</td>
            <td>The limit is decreased if the queue size is greater than this value. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_VEGAS_BETA`.</td>
            <td>6</td>
        </tr>
        <tr>
            <td>gradient</td>
            <td>Configure the parameters for "gradient" algorithm. In gradient algorithm, the limit is adjusted based on the gradient of observed latency and an estimated minimum latency. If gradient is less than 1, the limit is decreased otherwise the limit is increased.</td>
            <td></td>
        </tr>
        <tr>
            <td>minLimit</td>
            <td>The minimum limit. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_GRADIENT_MINLIMIT`.</td>
            <td>10</td>
        </tr>
        <tr>
            <td>initialLimit</td>
            <td>The initial limit to be used when the broker starts. The limit will be reset to this value when the broker restarts. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_GRADIENT_INITIALLIMIT`.</td>
            <td>20</td>
        </tr>
        <tr>
            <td>rttTolerance</td>
            <td>Tolerance for changes from minimum latency. A value >= 1.0 indicating how much change from minimum latency is acceptable before reducing the limit.  For example, a value of 2.0 means that a 2x increase in latency is acceptable. This setting can also be overridden using the environment variable ZEEBE_BROKER_BACKPRESSURE_GRADIENT_RTTTOLERANCE</td>
            <td>2.0</td>
        </tr>
        <tr>
            <td>gradient2</td>
            <td>Configure the parameters for "gradient2" algorithm.</td>
            <td></td>
        </tr>
        <tr>
            <td>minLimit</td>
            <td>The minimum limit. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_GRADIENT2_MINLIMIT`.</td>
            <td>10</td>
        </tr>
        <tr>
            <td>initialLimit</td>
            <td>The initial limit to be used when the broker starts. The limit will be reset to this value when the broker restarts. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_GRADIENT2_INITIALLIMIT`.</td>
            <td>20</td>
        </tr>
        <tr>
            <td>rttTolerance</td>
            <td>Tolerance for changes from minimum latency. A value >= 1.0 indicating how much change from minimum latency is acceptable before reducing the limit.  For example, a value of 2.0 means that a 2x increase in latency is acceptable. This setting can also be overridden using the environment variable `ZEEBE_BROKER_BACKPRESSURE_GRADIENT2_RTTTOLERANCE`.</td>
            <td>2.0</td>
        </tr>
        <tr>
            <td>longWindow</td>
            <td>longWindow is the length of the window (the number of samples) to calculate the exponentially smoothed average latency. This setting can also be overridden using the environment `ZEEBE_BROKER_BACKPRESSURE_GRADIENT2_LONGWINDOW`.</td>
            <td>600</td>
        </tr>
    </tbody>
</table>

#### YAML snippet

```yaml
backpressure:
  enabled: true
  useWindowed: true
  algorithm: aimd
  aimd:
    requestTimeout: 200ms
    initialLimit: 100
    minLimit: 1
    maxLimit: 1000
    backoffRatio: 0.9
  fixed:
    limit: 20
  vegas:
    initialLimit: 20
    alpha: 3
    beta: 6
  gradient:
    minLimit: 10
    initialLimit: 20
    rttTolerance: 2.0
  gradient2:
    minLimit: 10
    initialLimit: 20
    rttTolerance: 2.0
    longWindow: 600
```

### zeebe.broker.exporters

Each exporter should be configured following this template:

<table name="exporters" id="exporters">
    <thead>
        <tr>
            <th>Field</th>
            <th>Description</th>
            <th>Example Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>exporters</td>
            <td>Configure exporters below</td>
            <td></td>
        </tr>
        <tr>
            <td>jarPath</td>
            <td>path to the JAR file containing the exporter class. JARs are only loaded once, so you can define two exporters that point to the same JAR, with the same class or a different one, and use args to parametrize its instantiation.</td>
            <td></td>
        </tr>
        <tr>
            <td>className</td>
            <td>entry point of the exporter, a class which *must* extend the io.camunda.zeebe.exporter.Exporter interface. A nested table as "args:" will allow you to inject arbitrary arguments into your class through the use of annotations. These setting can also be overridden using the environment variables "ZEEBE_BROKER_EXPORTERS_[exporter name]_..."</td>
            <td></td>
        </tr>
    </tbody>
</table>

#### YAML snippet

```yaml
exporters
  jarPath:
  className:
```

### zeebe.broker.exporters.debuglog (Debug Log Exporter)

Enable the debug exporter to log the exported records to console.

These setting can also be overridden using the environment variables "ZEEBE*BROKER_EXPORTERS_DEBUGLOG*..."

#### YAML snippet

```yaml
exporters:
  debuglog:
    className: io.camunda.zeebe.broker.exporter.debug.DebugLogExporter
    args:
      logLevel: debug
      prettyPrint: false
```

### zeebe.broker.exporters.debugHttp (Debug HTTP Export)

Enable the debug exporter to start a http server to inspect the exported records.

These setting can also be overridden using the environment variables "ZEEBE*BROKER_EXPORTERS_DEBUGHTTP*..."

#### YAML snippet

```yaml
debugHttp:
  className: io.camunda.zeebe.broker.exporter.debug.DebugHttpExporter
  args: port = 8000
    limit = 1024
```

### zeebe.broker.exporters.elasticsearch

An example configuration for the elasticsearch exporter is below.

These setting can also be overridden using the environment variables "ZEEBE*BROKER_EXPORTERS_ELASTICSEARCH*..."

#### YAML snippet

```yaml
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

### zeebe.broker.exporters.opensearch (Opensearch Exporter)

An example configuration for the opensearch exporter.

These setting can also be overridden using the environment variables "ZEEBE*BROKER_EXPORTERS_OPENSEARCH*..."

#### YAML snippet

```yaml
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

  <table name="processing" id="processing">
    <thead>
        <tr>
            <th>Field</th>
            <th>Description</th>
            <th>Example Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>maxCommandsInBatch</td>
            <td>Sets the maximum number of commands that processed within one batch. The processor will process until no more follow up commands are created by the initial command or the configured limit is reached. By default, up to 100 commands are processed in one batch. Can be set to 1 to disable batch processing. Must be a positive integer number. Note that the resulting batch size will contain more entries than this limit because it includes follow up events. When resulting batch size is too large (see maxMessageSize), processing will be rolled back and retried with a smaller maximum batch size. Lowering the command limit can reduce the frequency of rollback and retry. This setting can also be overridden using the environment variable `ZEEBE_BROKER_PROCESSING_MAXCOMMANDSINBATCH`.</td>
            <td>100</td>
        </tr>
    </tbody>
</table>

#### YAML snippet

```yaml
processing: maxCommandsInBatch = 100
```

### Experimental configuration

See the experimental section of the [broker.yaml.template](https://github.com/camunda/zeebe/blob/main/dist/src/main/config/broker.yaml.template#L733).

Be aware that all configuration's which are part of the experimental section are subject to change and can be dropped at any time.
