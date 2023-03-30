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

To configure the embedded gateway, see [Gateway config docs](self-managed/zeebe-depolyment/configuration/gateway-config).

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
      messageCompression: NONE
```

### zeebe.broker.threads

#### YAML snippet

```yaml
threads:
    cpuThreadCount: 2
    ioThreadCount: 2
```

### zeebe.broker.backpressure

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

#### YAML snippet

```yaml
exporters:
      jarPath: null
      className: null
      debuglog:
        className: io.camunda.zeebe.broker.exporter.debug.DebugLogExporter
        args:
          logLevel: debug
          prettyPrint: false
      debugHttp:
        className: io.camunda.zeebe.broker.exporter.debug.DebugHttpExporter
        args: port = 8000 limit = 1024
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

#### YAML snippet

```yaml
processing:
      partitioning:
        scheme: ROUND_ROBIN
        fixed:
        - partitionId: 1
          nodes:
          - nodeId: 0
            priority: 1
          - nodeId: 1
            priority: 2
          - nodeId: 2
            priority: 3
        - partitionId: 2
          nodes:
          - nodeId: 0
            priority: 3
          - nodeId: 1
            priority: 2
          - nodeId: 2
            priority: 1
        - partitionId: 3
          nodes:
          - nodeId: 0
            priority: 2
          - nodeId: 1
            priority: 3
          - nodeId: 2
            priority: 2
      raft:
        requestTimeout: 5s
        minStepDownFailureCount: 3
        maxQuorumResponseTimeout: 0ms
        preferSnapshotReplicationThreshold: 100
        preallocateSegmentFiles: true
      rocksdb:
        columnFamilyOptions:
          compaction_pri: kOldestSmallestSeqFirst
          write_buffer_size: 67108864
        enableStatistics: false
        memoryLimit: 512MB
        maxOpenFiles: -1
        maxWriteBufferNumber: 6
        minWriteBufferNumberToMerge: 3
        ioRateBytesPerSecond: 0
        disableWal: true
      consistencyChecks:
        enablePreconditions: false
        enableForeignKeyChecks: false
      queryApi:
        enabled: false
      engine:
        messages:
          ttlCheckerBatchLimit: 2147483647
          ttlCheckerInterval: 1m
      features:
        enableYieldingDueDateChecker: false
        enableActorMetrics: false
        enableMessageTTLCheckerAsync: false
```


### STOP

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
            <td>&nbsp;&nbsp;cluster</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;urna&#x27; b&#x27;ve&#x27; b&#x27;id&#x27; b&#x27;nibh&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;nodeId</td>
            <td>0</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;partitionsCount</td>
            <td>1</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;replicationFactor</td>
            <td>1</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;quis&#x27; b&#x27;in&#x27; b&#x27;a&#x27; b&#x27;per&#x27; b&#x27;ipsum&#x27; b&#x27;auctor&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;clusterSize</td>
            <td>1</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;initialContactPoints</td>
            <td></td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;cras&#x27; b&#x27;in&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;clusterName</td>
            <td>zeebe-cluster</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;heartbeatInterval</td>
            <td>250ms</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;electionTimeout</td>
            <td>2500ms</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;raft</td>
            <td>enablePriorityElection = true</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;flush</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</td>
            <td>True</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;delayTime</td>
            <td>0s</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;erat&#x27; b&#x27;ad&#x27; b&#x27;a&#x27; b&#x27;quis&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;membership</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;nibh&#x27; b&#x27;ad&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;broadcastUpdates</td>
            <td>False</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;orci&#x27; b&#x27;ve&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;broadcastDisputes</td>
            <td>True</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;notifySuspect</td>
            <td>False</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;gossipInterval</td>
            <td>250ms</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;gossipFanout</td>
            <td>2</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;eget&#x27; b&#x27;ut&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;probeInterval</td>
            <td>1s</td>
            <td>Lorem ipsum dolor.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;probeTimeout</td>
            <td>100ms</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;suspectProbes</td>
            <td>3</td>
            <td>Lorem ipsum dolor sit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;failureTimeout</td>
            <td>10s</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;syncInterval</td>
            <td>10s</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;messageCompression</td>
            <td>NONE</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;threads</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;odio&#x27; b&#x27;ut&#x27; b&#x27;mi&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;cpuThreadCount</td>
            <td>2</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;nisi&#x27; b&#x27;ac&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;ioThreadCount</td>
            <td>2</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;backpressure</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;ante&#x27; b&#x27;in&#x27; b&#x27;a&#x27; b&#x27;enim&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;enabled</td>
            <td>True</td>
            <td>Lorem ipsum dolor.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;useWindowed</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;algorithm</td>
            <td>aimd</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;aimd</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requestTimeout</td>
            <td>200ms</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;elit&#x27; b&#x27;id&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;initialLimit</td>
            <td>100</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;diam&#x27; b&#x27;et&#x27; b&#x27;amet&#x27; b&#x27;a&#x27; b&#x27;porta&#x27; b&#x27;magnis&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;minLimit</td>
            <td>1</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;nisi&#x27; b&#x27;id&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;maxLimit</td>
            <td>1000</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;backoffRatio</td>
            <td>0.9</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;enim&#x27; b&#x27;et&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;fixed</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;limit</td>
            <td>20</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;vegas</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;duis&#x27; b&#x27;ve&#x27; b&#x27;a&#x27; b&#x27;ac&#x27; b&#x27;a&#x27; b&#x27;ut&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;initialLimit</td>
            <td>20</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;eros&#x27; b&#x27;ac&#x27; b&#x27;a&#x27; b&#x27;rutrum&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;alpha</td>
            <td>3</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;enim&#x27; b&#x27;at&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;beta</td>
            <td>6</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;quis&#x27; b&#x27;ut&#x27; b&#x27;a&#x27; b&#x27;a&#x27; b&#x27;tempor&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;gradient</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;minLimit</td>
            <td>10</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;initialLimit</td>
            <td>20</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rttTolerance</td>
            <td>2.0</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;gradient2</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;ante&#x27; b&#x27;ac&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;minLimit</td>
            <td>10</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;initialLimit</td>
            <td>20</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;cras&#x27; b&#x27;ac&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rttTolerance</td>
            <td>2.0</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;duis&#x27; b&#x27;ac&#x27; b&#x27;a&#x27; b&#x27;ac&#x27; b&#x27;mauris&#x27; b&#x27;a&#x27; b&#x27;accumsan&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;longWindow</td>
            <td>600</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;ante&#x27; b&#x27;ve&#x27; b&#x27;a&#x27; b&#x27;maecenas&#x27; b&#x27;quam&#x27; b&#x27;placerat&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;exporters</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;jarPath</td>
            <td>None</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;className</td>
            <td>None</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;debuglog</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;className</td>
            <td>io.camunda.zeebe.broker.exporter.debug.DebugLogExporter</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;args</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;logLevel</td>
            <td>debug</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;prettyPrint</td>
            <td>False</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;nisl&#x27; b&#x27;in&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;debugHttp</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;ante&#x27; b&#x27;ac&#x27; b&#x27;a&#x27; b&#x27;ut&#x27; b&#x27;nascetur&#x27; b&#x27;a&#x27; b&#x27;a&#x27; b&#x27;justo&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;className</td>
            <td>io.camunda.zeebe.broker.exporter.debug.DebugHttpExporter</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;args</td>
            <td>port = 8000 limit = 1024</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;elasticsearch</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;className</td>
            <td>io.camunda.zeebe.exporter.ElasticsearchExporter</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;args</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url</td>
            <td>http://localhost:9200</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bulk</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;delay</td>
            <td>5</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;size</td>
            <td>1000</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;memoryLimit</td>
            <td>10485760</td>
            <td>Lorem ipsum dolor sit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;authentication</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;amet&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;username</td>
            <td>elastic</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password</td>
            <td>changeme</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;index</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;prefix</td>
            <td>zeebe-record</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;createTemplate</td>
            <td>True</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;numberOfShards</td>
            <td>3</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;numberOfReplicas</td>
            <td>0</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;enim&#x27; b&#x27;eu&#x27; b&#x27;nunc&#x27; b&#x27;a&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;command</td>
            <td>False</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;event</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rejection</td>
            <td>False</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;quis&#x27; b&#x27;mi&#x27; b&#x27;eu&#x27; b&#x27;velit&#x27; b&#x27;ut&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;commandDistribution</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;quis&#x27; b&#x27;ve&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;decisionRequirements</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;diam&#x27; b&#x27;mi&#x27; b&#x27;in&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;decision</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;elit&#x27; b&#x27;mi&#x27; b&#x27;a&#x27; b&#x27;quis&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;decisionEvaluation</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deployment</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deploymentDistribution</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;error</td>
            <td>True</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;escalation</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;pede&#x27; b&#x27;et&#x27; b&#x27;id&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;incident</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;job</td>
            <td>True</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;jobBatch</td>
            <td>False</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;nisl&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;message</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;eget&#x27; b&#x27;id&#x27; b&#x27;a&#x27; b&#x27;ante&#x27; b&#x27;taciti&#x27; b&#x27;a&#x27; b&#x27;montes&#x27; b&#x27;vitae&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;messageStartSubscription</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;messageSubscription</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;process</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;processEvent</td>
            <td>False</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;processInstance</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;processInstanceCreation</td>
            <td>True</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;processInstanceModification</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;processMessageSubscription</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;quam&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;resourceDeletion</td>
            <td>True</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;signal</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;urna&#x27; b&#x27;eu&#x27; b&#x27;a&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;signalSubscription</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;nisi&#x27; b&#x27;et&#x27; b&#x27;a&#x27; b&#x27;turpis&#x27; b&#x27;est&#x27; b&#x27;mi&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;timer</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variable</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;urna&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variableDocument</td>
            <td>True</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;retention</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</td>
            <td>False</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;enim&#x27; b&#x27;id&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;minimumAge</td>
            <td>30d</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;policyName</td>
            <td>zeebe-record-retention-policy</td>
            <td>Lorem ipsum dolor sit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;opensearch</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;amet&#x27; b&#x27;ac&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;className</td>
            <td>io.camunda.zeebe.exporter.opensearch.OpensearchExporter</td>
            <td>Lorem ipsum dolor sit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;args</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url</td>
            <td>http://localhost:9200</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;elit&#x27; b&#x27;ve&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requestTimeoutMs</td>
            <td>1000</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;elit&#x27; b&#x27;ve&#x27; b&#x27;a&#x27; b&#x27;a&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bulk</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;cras&#x27; b&#x27;ve&#x27; b&#x27;a&#x27; b&#x27;mi&#x27; b&#x27;nec&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;delay</td>
            <td>5</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;size</td>
            <td>1000</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;nisl&#x27; b&#x27;et&#x27; b&#x27;a&#x27; b&#x27;ad&#x27; b&#x27;nec&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;memoryLimit</td>
            <td>10485760</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;authentication</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;erat&#x27; b&#x27;id&#x27; b&#x27;a&#x27; b&#x27;et&#x27; b&#x27;nisi&#x27; b&#x27;est&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;username</td>
            <td>opensearch</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;ante&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password</td>
            <td>changeme</td>
            <td>Lorem ipsum dolor sit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;aws</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;cras&#x27; b&#x27;ut&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;serviceName</td>
            <td>es</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;region</td>
            <td>eu-west-1</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;index</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;diam&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;prefix</td>
            <td>zeebe-record</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;nisl&#x27; b&#x27;ac&#x27; b&#x27;a&#x27; b&#x27;auctor&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;createTemplate</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;numberOfShards</td>
            <td>3</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;numberOfReplicas</td>
            <td>0</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;command</td>
            <td>False</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;event</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;orci&#x27; b&#x27;eu&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rejection</td>
            <td>False</td>
            <td>Lorem ipsum dolor.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;commandDistribution</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;decisionRequirements</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;quam&#x27; b&#x27;ut&#x27; b&#x27;a&#x27; b&#x27;per&#x27; b&#x27;a&#x27; b&#x27;ipsum&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;decision</td>
            <td>True</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;decisionEvaluation</td>
            <td>True</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deployment</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deploymentDistribution</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;enim&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;error</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;elit&#x27; b&#x27;in&#x27; b&#x27;a&#x27; b&#x27;velit&#x27; b&#x27;potenti&#x27; b&#x27;dui&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;escalation</td>
            <td>True</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;incident</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;elit&#x27; b&#x27;et&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;job</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;amet&#x27; b&#x27;ve&#x27; b&#x27;id&#x27; b&#x27;magna&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;jobBatch</td>
            <td>False</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;message</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;messageStartSubscription</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;messageSubscription</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;nibh&#x27; b&#x27;ac&#x27; b&#x27;a&#x27; b&#x27;nibh&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;process</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;nibh&#x27; b&#x27;ut&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;processEvent</td>
            <td>False</td>
            <td>Lorem ipsum dolor sit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;processInstance</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;cras&#x27; b&#x27;mi&#x27; b&#x27;a&#x27; b&#x27;nam&#x27; b&#x27;aliquam&#x27; b&#x27;eu&#x27; b&#x27;a&#x27; b&#x27;a&#x27; b&#x27;a&#x27; b&#x27;posuere&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;processInstanceCreation</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;processInstanceModification</td>
            <td>True</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;processMessageSubscription</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;eget&#x27; b&#x27;in&#x27; b&#x27;a&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;resourceDeletion</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;signal</td>
            <td>True</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;signalSubscription</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;orci&#x27; b&#x27;id&#x27; b&#x27;ut&#x27; b&#x27;id&#x27; b&#x27;dui&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;timer</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;amet&#x27; b&#x27;ac&#x27; b&#x27;pretium&#x27; b&#x27;erat&#x27; b&#x27;a&#x27; b&#x27;felis&#x27; b&#x27;proin&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variable</td>
            <td>True</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variableDocument</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;processing</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;elit&#x27; b&#x27;ut&#x27; b&#x27;a&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;partitioning</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;ante&#x27; b&#x27;id&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;scheme</td>
            <td>ROUND_ROBIN</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fixed</td>
            <td></td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;urna&#x27; b&#x27;ut&#x27; b&#x27;a&#x27; b&#x27;a&#x27; b&#x27;ac&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;partitionId</td>
            <td>1</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodes</td>
            <td></td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodeId</td>
            <td>0</td>
            <td>Lorem ipsum dolor sit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;priority</td>
            <td>1</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;eget&#x27; b&#x27;in&#x27; b&#x27;a&#x27; b&#x27;hac&#x27; b&#x27;condimentum&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodeId</td>
            <td>1</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;priority</td>
            <td>2</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodeId</td>
            <td>2</td>
            <td>Lorem ipsum dolor.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;priority</td>
            <td>3</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;quam&#x27; b&#x27;et&#x27; b&#x27;a&#x27; b&#x27;quam&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;partitionId</td>
            <td>2</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodes</td>
            <td></td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodeId</td>
            <td>0</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;priority</td>
            <td>3</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodeId</td>
            <td>1</td>
            <td>Lorem ipsum dolor sit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;priority</td>
            <td>2</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;amet&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodeId</td>
            <td>2</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;priority</td>
            <td>1</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;partitionId</td>
            <td>3</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;enim&#x27; b&#x27;ut&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodes</td>
            <td></td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodeId</td>
            <td>0</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;priority</td>
            <td>2</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodeId</td>
            <td>1</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;priority</td>
            <td>3</td>
            <td>Lorem ipsum dolor.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nodeId</td>
            <td>2</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;odio&#x27; b&#x27;id&#x27; b&#x27;a&#x27; b&#x27;ad&#x27; b&#x27;a&#x27; b&#x27;ac&#x27; b&#x27;nunc&#x27; b&#x27;ve&#x27; b&#x27;at&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;priority</td>
            <td>2</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;eget&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;raft</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requestTimeout</td>
            <td>5s</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;minStepDownFailureCount</td>
            <td>3</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;amet&#x27; b&#x27;eu&#x27; b&#x27;a&#x27; b&#x27;et&#x27; b&#x27;at&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;maxQuorumResponseTimeout</td>
            <td>0ms</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;odio&#x27; b&#x27;ut&#x27; b&#x27;a&#x27; b&#x27;ac&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;preferSnapshotReplicationThreshold</td>
            <td>100</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;orci&#x27; b&#x27;id&#x27; b&#x27;a&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;preallocateSegmentFiles</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;odio&#x27; b&#x27;ve&#x27; b&#x27;et&#x27; b&#x27;at&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;rocksdb</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;columnFamilyOptions</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;compaction_pri</td>
            <td>kOldestSmallestSeqFirst</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;write_buffer_size</td>
            <td>67108864</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enableStatistics</td>
            <td>False</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;memoryLimit</td>
            <td>512MB</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;maxOpenFiles</td>
            <td>-1</td>
            <td>Lorem ipsum dolor sit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;maxWriteBufferNumber</td>
            <td>6</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;minWriteBufferNumberToMerge</td>
            <td>3</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ioRateBytesPerSecond</td>
            <td>0</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;disableWal</td>
            <td>True</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;consistencyChecks</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enablePreconditions</td>
            <td>False</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enableForeignKeyChecks</td>
            <td>False</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;queryApi</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enabled</td>
            <td>False</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;engine</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;messages</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum dolor sit amet.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ttlCheckerBatchLimit</td>
            <td>2147483647</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ttlCheckerInterval</td>
            <td>1m</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;features</td>
            <td>&nbsp;&nbsp;</td>
            <td>Lorem ipsum.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enableYieldingDueDateChecker</td>
            <td>False</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing elit b&#x27;eros&#x27; b&#x27;in&#x27;.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enableActorMetrics</td>
            <td>False</td>
            <td>Lorem ipsum dolor sit amet, consecteteur adipiscing.</td>
        </tr>
        <tr>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enableMessageTTLCheckerAsync</td>
            <td>False</td>
            <td>Lorem ipsum dolor sit amet, consecteteur.</td>
        </tr>
    </tbody>
</table> 