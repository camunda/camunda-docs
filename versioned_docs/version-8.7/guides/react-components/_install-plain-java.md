---
---

**Starting in 8.6.0-alpha2**, you can install Camunda 8 Self-Managed as an integrated plain Java application.

For this installation, you must have:

- OpenJDK 21+ locally installed
- Camunda `8.6.0-alpha2` or later

### Download and configure Elasticsearch

:::danger
Disabling Elasticsearch's security packages is for non-production only!
:::

1. Download [Elasticsearch 8.9.2](https://www.elastic.co/downloads/past-releases/elasticsearch-8-9-2) and follow the [installation instructions](https://www.elastic.co/guide/en/elasticsearch/reference/8.9/targz.html).
2. Navigate to the directory where you installed Elasticsearch, and open `/config/elasticsearch.yml`. Add the line `xpack.security.enabled: false` to the bottom of the configuration to disable Elasticsearch's security packages.
3. Start Elasticsearch by running `ELASTICSEARCH_HOME/bin/elasticsearch` (or `ELASTICSEARCH_HOME\bin\elasticsearch.bat` on Windows).

Confirm Elasticsearch is running by visiting `http://localhost:9200` in a browser. If the response doesn't include version information formatted as JSON, you will need to troubleshoot your installation.

### Download and configure Camunda

1. Download and extract the [latest `camunda-zeebe-` release artifact](https://github.com/camunda/camunda/releases) in the **Assets** section of the release page, starting with [8.6.0-alpha2](https://github.com/camunda/camunda/releases/tag/8.6.0-alpha2).
2. Navigate to the directory where you installed Camunda, and open `/config/application.yaml`. Add the following Elasticsearch exporter as a child of the `zeebe`/`broker` configuration element:

```
zeebe:
  broker:
    ...
    exporters:
      elasticsearch:
        className: io.camunda.zeebe.exporter.ElasticsearchExporter
        args:
          url: http://localhost:9200
          index:
            prefix: zeebe-record
```

:::note
Spacing is important! Indent the `exporters` element four spaces to properly nest the configuration.

<details>
<summary>Still need help?</summary>

Here is the full `application.yaml` file:

```
zeebe:
  broker:
    gateway:
      # Enable the embedded gateway to start on broker startup.
      # This setting can also be overridden using the environment variable ZEEBE_BROKER_GATEWAY_ENABLE.
      enable: true

      network:
        # Sets the port the embedded gateway binds to.
        # This setting can also be overridden using the environment variable ZEEBE_BROKER_GATEWAY_NETWORK_PORT.
        port: 26500

      security:
        # Enables TLS authentication between clients and the gateway
        # This setting can also be overridden using the environment variable ZEEBE_BROKER_GATEWAY_SECURITY_ENABLED.
        enabled: false
        authentication:
          # Controls which authentication mode is active, supported modes are 'none' and 'identity'.
          # If 'identity' is set, authentication will be done using camunda-identity, which needs to
          # be configured in the corresponding subsection. See also https://docs.camunda.io/docs/self-managed/identity/what-is-identity/ .
          # This setting can also be overridden using the environment variable ZEEBE_BROKER_GATEWAY_SECURITY_AUTHENTICATION_MODE.
          mode: none

    network:
      # Controls the default host the broker should bind to. Can be overwritten on a
      # per-binding basis for client, management and replication
      # This setting can also be overridden using the environment variable ZEEBE_BROKER_NETWORK_HOST.
      host: 0.0.0.0

    data:
      # Specify a directory in which data is stored.
      # This setting can also be overridden using the environment variable ZEEBE_BROKER_DATA_DIRECTORY.
      directory: data
      # The size of data log segment files.
      # This setting can also be overridden using the environment variable ZEEBE_BROKER_DATA_LOGSEGMENTSIZE.
      logSegmentSize: 128MB
      # How often we take snapshots of streams (time unit)
      # This setting can also be overridden using the environment variable ZEEBE_BROKER_DATA_SNAPSHOTPERIOD.
      snapshotPeriod: 15m

    cluster:
      # Specifies the Zeebe cluster size.
      # This can also be overridden using the environment variable ZEEBE_BROKER_CLUSTER_CLUSTERSIZE.
      clusterSize: 1
      # Controls the replication factor, which defines the count of replicas per partition.
      # This can also be overridden using the environment variable ZEEBE_BROKER_CLUSTER_REPLICATIONFACTOR.
      replicationFactor: 1
      # Controls the number of partitions, which should exist in the cluster.
      # This can also be overridden using the environment variable ZEEBE_BROKER_CLUSTER_PARTITIONSCOUNT.
      partitionsCount: 1

    threads:
      # Controls the number of non-blocking CPU threads to be used.
      # WARNING: You should never specify a value that is larger than the number of physical cores
      # available. Good practice is to leave 1-2 cores for ioThreads and the operating
      # system (it has to run somewhere). For example, when running Zeebe on a machine
      # which has 4 cores, a good value would be 2.
      # This setting can also be overridden using the environment variable ZEEBE_BROKER_THREADS_CPUTHREADCOUNT
      cpuThreadCount: 2
      # Controls the number of io threads to be used.
      # This setting can also be overridden using the environment variable ZEEBE_BROKER_THREADS_IOTHREADCOUNT
      ioThreadCount: 2

    exporters:
      elasticsearch:
        className: io.camunda.zeebe.exporter.ElasticsearchExporter
        args:
          url: http://localhost:9200
          index:
            prefix: zeebe-record

camunda:
  # Operate configuration properties
  operate:
    # Set operate username and password.
    # If user with <username> does not exists it will be created.
    # Default: demo/demo
    #username:
    #password:
    # ELS instance to store Operate data
    elasticsearch:
      # Cluster name
      clusterName: elasticsearch
      # URL
      url: http://localhost:9200
    # Zeebe instance
    zeebe:
      # Gateway address
      gatewayAddress: localhost:26500
    # ELS instance to export Zeebe data to
    zeebeElasticsearch:
      # Cluster name
      clusterName: elasticsearch
      # URL
      url: http://localhost:9200
      # Index prefix, configured in Zeebe Elasticsearch exporter
      prefix: zeebe-record
  # Tasklist configuration properties
  tasklist:
    # Set Tasklist username and password.
    # If user with <username> does not exists it will be created.
    # Default: demo/demo
    #username:
    #password:
    # ELS instance to store Tasklist data
    elasticsearch:
      # Cluster name
      clusterName: elasticsearch
      # URL
      url: http://localhost:9200
    # Zeebe instance
    zeebe:
      # Gateway address
      gatewayAdress: localhost:26500
    # ELS instance to export Zeebe data to
    zeebeElasticsearch:
      # Cluster name
      clusterName: elasticsearch
      # Url
      url: http://localhost:9200
      # Index prefix, configured in Zeebe Elasticsearch exporter
      prefix: zeebe-record

```

</details>

:::

Save the file. Without performing this step, no data will be visible in Operate or Tasklist.

3. To start Camunda, run `bin/camunda` (or `bin\camunda.bat` on Windows).

It may take a few minutes for startup to complete. When the message `Started StandaloneCamunda in ___ seconds` is displayed, the application is ready to use.

:::tip
Operate can be found at `http://localhost:8080/operate` and Tasklist can be found at `http://localhost:8080/tasklist`. Both use a default username/password of `demo`/`demo`.
:::
