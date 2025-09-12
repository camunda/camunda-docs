export const configs = [
  /*   {
    name: "camunda.system.cpu-thread-count",
    legacy: [
      "zeebe.broker.threads.cpuThreadCount",
      "broker.threads.cpuThreadCount",
    ],
    types: ["1-to-1"],
  }, 
    {
    name: "data.secondary-storage.type",
    legacy: [
      "camunda.database.type",
      "camunda.operate.database",
      "camunda.tasklist.database",
      "zeebe.broker.exporters.camundaexporter.args.connect.type",
    ],
    types: ["Breaking change (double configuration)"],
  },

  */

  // API keys

  {
    name: "camunda.api.grpc.address",
    legacy: ["zeebe.gateway.network.host", "zeebe.broker.gateway.network.host"],
    types: ["1-to-1"],
    area: ["Api"],
  },
  {
    name: "camunda.api.grpc.port",
    legacy: ["zeebe.gateway.network.port", "zeebe.broker.gateway.network.port"],
    types: ["1-to-1"],
    area: ["Api"],
  },
  {
    name: "camunda.api.grpc.min-keep-alive-interval",
    legacy: [
      "zeebe.gateway.network.minKeepAliveInterval",
      "zeebe.broker.gateway.network.minKeepAliveInterval",
    ],
    types: ["1-to-1"],
    area: ["Api"],
  },
  {
    name: "camunda.api.grpc.max-message-size",
    legacy: [
      "zeebe.gateway.network.maxMessageSize",
      "zeebe.broker.gateway.network.maxMessageSize",
    ],
    types: ["1-to-1"],
    area: ["Api"],
  },
  {
    name: "camunda.api.grpc.ssl.enabled",
    legacy: [
      "zeebe.gateway.security.enabled",
      "zeebe.broker.gateway.security.enabled",
    ],
    types: ["1-to-1"],
    area: ["Api"],
  },
  {
    name: "camunda.api.grpc.ssl.certificate",
    legacy: [
      "zeebe.gateway.security.certificateChainPath",
      "zeebe.broker.gateway.security.certificateChainPath",
    ],
    types: ["1-to-1"],
    area: ["Api"],
  },
  {
    name: "camunda.api.grpc.ssl.certificate-private-key",
    legacy: [
      "zeebe.gateway.security.privateKeyPath",
      "zeebe.broker.gateway.security.privateKeyPath",
    ],
    types: ["1-to-1"],
    area: ["Api"],
  },
  {
    name: "camunda.api.grpc.ssl.key-store.file-path",
    legacy: [
      "zeebe.gateway.security.keyStore.filePath",
      "zeebe.broker.gateway.security.keyStore.filePath",
    ],
    types: ["1-to-1"],
    area: ["Api"],
  },
  {
    name: "camunda.api.grpc.ssl.key-store.password",
    legacy: [
      "zeebe.gateway.security.keyStore.password",
      "zeebe.broker.gateway.security.keyStore.password",
    ],
    types: ["1-to-1"],
    area: ["Api"],
  },
  {
    name: "camunda.api.grpc.interceptors.id",
    legacy: [
      "zeebe.gateway.interceptors.[x].id",
      "zeebe.broker.gateway.interceptors.[x].id",
    ],
    types: ["1-to-1"],
    area: ["Api"],
  },
  {
    name: "camunda.api.grpc.interceptors.jar-path",
    legacy: [
      "zeebe.gateway.interceptors.[x].jarPath",
      "zeebe.broker.gateway.interceptors.[x].jarPath",
    ],
    types: ["1-to-1"],
    area: ["Api"],
  },
  {
    name: "camunda.api.grpc.interceptors.class-name",
    legacy: [
      "zeebe.gateway.interceptors.[x].className",
      "zeebe.broker.gateway.interceptors.[x].className",
    ],
    types: ["1-to-1"],
    area: ["Api"],
  },
  {
    name: "camunda.api.grpc.management-threads",
    legacy: [
      "zeebe.gateway.threads.managementThreads",
      "zeebe.broker.gateway.threads.managementThreads",
    ],
    types: ["1-to-1"],
    area: ["Api"],
  },
  {
    name: "camunda.api.grpc.long-polling.enabled",
    legacy: [
      "zeebe.gateway.longPolling.enabled",
      "zeebe.broker.gateway.longPolling.enabled",
    ],
    types: ["1-to-1"],
    area: ["Api"],
  },
  {
    name: "camunda.api.grpc.long-polling.timeout",
    legacy: [
      "zeebe.gateway.longPolling.timeout",
      "zeebe.broker.gateway.longPolling.timeout",
    ],
    types: ["1-to-1"],
    area: ["Api"],
  },
  {
    name: "camunda.api.grpc.long-polling.timeout",
    legacy: [
      "zeebe.gateway.longPolling.probeTimeout",
      "zeebe.broker.gateway.longPolling.probeTimeout",
    ],
    types: ["1-to-1"],
    area: ["Api"],
  },
  {
    name: "camunda.api.grpc.long-polling.min-empty-responses",
    legacy: [
      "zeebe.gateway.longPolling.minEmptyResponses",
      "zeebe.broker.gateway.longPolling.minEmptyResponses",
    ],
    types: ["1-to-1"],
    area: ["Api"],
  },

  {
    name: "camunda.api.rest.filters.id",
    legacy: [
      "zeebe.gateway.filters.[x].id",
      "zeebe.broker.gateway.filters.[x].id",
    ],
    types: ["1-to-1"],
    area: ["Api"],
  },
  {
    name: "camunda.api.rest.filters.jar-path",
    legacy: [
      "zeebe.gateway.filters.[x].jarPath",
      "zeebe.broker.gateway.filters.[x].jarPath",
    ],
    types: ["1-to-1"],
    area: ["Api"],
  },
  {
    name: "camunda.api.rest.filters.class-name",
    legacy: [
      "zeebe.gateway.filters.[x].className",
      "zeebe.broker.gateway.filters.[x].className",
    ],
    types: ["1-to-1"],
    area: ["Api"],
  },
  {
    name: "camunda.api.rest.process-cache.max-size",
    legacy: ["camunda.rest.processCache.maxSize"],
    types: ["1-to-1"],
    area: ["Api"],
  },
  {
    name: "camunda.api.rest.process-cache.expiration-idle",
    legacy: ["camunda.rest.processCache.expirationIdleMillis"],
    types: ["1-to-1"],
    area: ["Api"],
  },
  {
    name: "camunda.api.grpc.rest.executor.core-pool-size-multiplier",
    legacy: ["camunda.rest.apiExecutor.corePoolSizeMultiplier"],
    types: ["1-to-1"],
    area: ["Api"],
  },
  {
    name: "camunda.api.rest.executor.max-pool-size-multiplier",
    legacy: ["camunda.rest.apiExecutor.maxPoolSizeMultiplier"],
    types: ["1-to-1"],
    area: ["Api"],
  },
  {
    name: "camunda.api.rest.executor.keep-alive",
    legacy: ["camunda.rest.apiExecutor.keepAliveSeconds"],
    types: ["1-to-1"],
    area: ["Api"],
  },
  {
    name: "camunda.api.rest.executor.queue-capacity",
    legacy: ["camunda.rest.apiExecutor.queueCapacity"],
    types: ["1-to-1"],
    area: ["Api"],
  },

  // Cluster keys

  {
    name: "camunda.cluster.metadata.sync-delay",
    legacy: ["zeebe.broker.cluster.configManager.gossip.syncDelay"],
    types: ["1-to-1"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.metadata.sync-request-timeout",
    legacy: ["zeebe.broker.cluster.configManager.gossip.syncRequestTimeout"],
    types: ["1-to-1"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.metadata.gossip-fanout",
    legacy: ["zeebe.broker.cluster.configManager.gossip.gossipFanout"],
    types: ["1-to-1"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.network.host",
    legacy: ["zeebe.gateway.cluster.host", "zeebe.broker.network.host"],
    types: ["1-to-1"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.node-id",
    legacy: ["zeebe.broker.cluster.nodeId"],
    types: ["1-to-1"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.partition-count",
    legacy: ["zeebe.broker.cluster.partitionsCount"],
    types: ["1-to-1"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.replication-factor",
    legacy: ["zeebe.broker.cluster.replicationFactor"],
    types: ["1-to-1"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.size",
    legacy: ["zeebe.broker.cluster.clusterSize"],
    types: ["1-to-1"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.raft.priority-election-enabled",
    legacy: ["zeebe.broker.cluster.raft.enablePriorityElection"],
    types: ["1-to-1"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.raft.flush-enabled",
    legacy: ["zeebe.broker.cluster.raft.flush.enabled"],
    types: ["1-to-1"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.raft.flush-delay",
    legacy: ["zeebe.broker.cluster.raft.flush.delay"],
    types: ["1-to-1"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.raft.heartbeat-interval",
    legacy: ["zeebe.broker.cluster.heartbeatInterval"],
    types: ["1-to-1"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.raft.election-timeout",
    legacy: ["zeebe.broker.cluster.electionTimeout"],
    types: ["1-to-1"],
    area: ["Cluster"],
  },

  // Data keys

  {
    name: "camunda.data.snapshot-period",
    legacy: ["zeebe.broker.data.snapshotPeriod"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.export.distribution-interval",
    legacy: ["zeebe.broker.exporting.distributionInterval"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.export.skip-records",
    legacy: ["zeebe.broker.exporting.skipRecords"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.repository-name",
    legacy: [
      "camunda.operate.backup.repositoryName",
      "camunda.tasklist.backup.repositoryName",
    ],
    types: ["1-to-1", "Breaking change (double configuration)"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.snapshot-timeout",
    legacy: ["camunda.operate.backup.snapshotTimeout"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.incomplete-check-timeout",
    legacy: ["camunda.operate.backup.incompleteCheckTimeoutInSeconds"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.store",
    legacy: ["zeebe.broker.data.backup.store"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.s3.bucket-name",
    legacy: ["zeebe.broker.data.backup.s3.bucketName"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.s3.endpoint",
    legacy: ["zeebe.broker.data.backup.s3.endpoint"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.s3.endpoint",
    legacy: ["zeebe.broker.data.backup.s3.endpoint"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.s3.region",
    legacy: ["zeebe.broker.data.backup.s3.region"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.s3.access-key",
    legacy: ["zeebe.broker.data.backup.s3.accessKey"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.s3.secret-key",
    legacy: ["zeebe.broker.data.backup.s3.secretKey"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.s3.api-call-timeout",
    legacy: ["zeebe.broker.data.backup.s3.apiCallTimeout"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.s3.force-path-style-access",
    legacy: ["zeebe.broker.data.backup.s3.forcePathStyleAccess"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.s3.compression:",
    legacy: ["zeebe.broker.data.backup.s3.compression:"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.s3.max-concurrent-connections:",
    legacy: ["zeebe.broker.data.backup.s3.maxConcurrentConnections"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.s3.connection-acquisition-timeout",
    legacy: ["zeebe.broker.data.backup.s3.connectionAcquisitionTimeout"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.s3.base-path",
    legacy: ["zeebe.broker.data.backup.s3.basePath"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.s3.support-legacy-md5",
    legacy: ["zeebe.broker.data.backup.s3.supportLegacyMd5"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.gcs.bucket-name",
    legacy: ["zeebe.broker.data.backup.gcs.bucketName"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.gcs.host",
    legacy: ["zeebe.broker.data.backup.gcs.host"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.gcs.auth",
    legacy: ["zeebe.broker.data.backup.gcs.auth"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.azure.endpoint",
    legacy: ["zeebe.broker.data.backup.azure.endpoint"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.azure.account-name",
    legacy: ["zeebe.broker.data.backup.azure.accountName"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.azure.account-key",
    legacy: ["zeebe.broker.data.backup.azure.accountKey"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.azure.connection-string",
    legacy: ["zeebe.broker.data.backup.azure.connectionString"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.azure.base-path",
    legacy: ["zeebe.broker.data.backup.azure.basePath"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.azure.create-container",
    legacy: ["zeebe.broker.data.backup.azure.createContainer"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.azure.sas-token.type",
    legacy: ["zeebe.broker.data.backup.azure.sasToken.type"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.azure.sas-token.value",
    legacy: ["zeebe.broker.data.backup.azure.sasToken.value"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.filesystem.base-path",
    legacy: ["zeebe.broker.data.backup.filesystem.basePath"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.type",
    legacy: [
      "camunda.database.type",
      "camunda.operate.database",
      "camunda.tasklist.database",
      "zeebe.broker.exporters.camundaexporter.args.connect.type",
    ],
    types: ["Breaking change (double configuration)"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.url",
    legacy: [
      "camunda.database.url",
      "camunda.operate.elasticsearch.url",
      "camunda.tasklist.elasticsearch.url",
      "zeebe.broker.exporters.camundaexporter.args.connect.url",
      "camunda.operate.zeebeElasticsearch.url",
      "camunda.tasklist.zeebeElasticsearch.url",
    ],
    types: ["Breaking change (double configuration)"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.cluster-name",
    legacy: [
      "camunda.database.clusterName",
      "camunda.operate.elasticsearch.clusterName",
      "camunda.tasklist.elasticsearch.clusterName",
      "zeebe.broker.exporters.camundaexporter.args.connect.clusterName",
    ],
    types: ["Breaking change (double configuration)"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.username",
    legacy: [
      "camunda.database.username",
      "camunda.operate.elasticsearch.username",
      "camunda.tasklist.elasticsearch.username",
      "zeebe.broker.exporters.camundaexporter.args.connect.username",
    ],
    types: ["Breaking change (double configuration)"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.password",
    legacy: [
      "camunda.database.password",
      "camunda.operate.elasticsearch.password",
      "camunda.tasklist.elasticsearch.password",
      "zeebe.broker.exporters.camundaexporter.args.connect.password",
    ],
    types: ["Breaking change (double configuration)"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.index-prefix",
    legacy: [
      "camunda.database.indexPrefix",
      "camunda.tasklist.elasticsearch.indexPrefix",
      "camunda.operate.elasticsearch.indexPrefix",
      "zeebe.broker.exporters.camundaexporter.args.index.indexPrefix",
    ],
    types: ["Breaking change (double configuration)"],
    area: ["Data"],
  },

  {
    name: "camunda.data.secondary-storage.opensearch.url",
    legacy: [
      "camunda.database.url",
      "camunda.operate.opensearch.url",
      "camunda.tasklist.opensearch.url",
      "zeebe.broker.exporters.camundaexporter.args.connect.url",
      "(camunda.operate.zeebeOpensearch.url)",
      "(camunda.tasklist.zeebeOpensearch.url)",
    ],
    types: ["Breaking change (double configuration)"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.cluster-name",
    legacy: [
      "camunda.database.clusterName",
      "camunda.operate.opensearch.clusterName",
      "camunda.tasklist.opensearch.clusterName",
      "zeebe.broker.exporters.camundaexporter.args.connect.clusterName",
    ],
    types: ["Breaking change (double configuration)"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.username",
    legacy: [
      "camunda.database.username",
      "camunda.operate.opensearch.username",
      "camunda.tasklist.opensearch.username",
      "zeebe.broker.exporters.camundaexporter.args.connect.username",
    ],
    types: ["Breaking change (double configuration)"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.password",
    legacy: [
      "camunda.database.password",
      "camunda.operate.opensearch.password",
      "camunda.tasklist.opensearch.password",
      "zeebe.broker.exporters.camundaexporter.args.connect.password",
    ],
    types: ["Breaking change (double configuration)"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.security.enabled",
    legacy: [
      "camunda.database.security.enabled",
      "zeebe.broker.exporters.camundaexporter.args.connect.security.enabled",
    ],
    types: ["Breaking change (double configuration)"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.security.certificate-path",
    legacy: [
      "camunda.database.security.certificatePath",
      "camunda.tasklist.opensearch.ssl.certificatePath",
      "camunda.operate.opensearch.ssl.certificatePath",
      "zeebe.broker.exporters.camundaexporter.args.connect.security.certificatePath",
    ],
    types: ["Breaking change (double configuration)"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.security.verify-hostname",
    legacy: [
      "camunda.database.security.verifyHostname",
      "camunda.tasklist.opensearch.ssl.verifyHostname",
      "camunda.operate.opensearch.ssl.verifyHostname",
      "zeebe.broker.exporters.camundaexporter.args.connect.security.verifyHostname",
    ],
    types: ["Breaking change (double configuration)"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.security.self-signed",
    legacy: [
      "camunda.database.security.selfSigned",
      "camunda.tasklist.elasticsearch.ssl.selfSigned",
      "camunda.operate.elasticsearch.ssl.selfSigned",
      "zeebe.broker.exporters.camundaexporter.args.connect.security.selfSigned",
    ],
    types: ["Breaking change (double configuration)"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.index-prefix",
    legacy: [
      "camunda.database.indexPrefix",
      "camunda.tasklist.opensearch.indexPrefix",
      "camunda.operate.opensearch.indexPrefix",
      "zeebe.broker.exporters.camundaexporter.args.index.indexPrefix",
    ],
    types: ["Breaking change (double configuration)"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.directory",
    legacy: ["zeebe.broker.data.directory"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.runtime-directory",
    legacy: ["zeebe.broker.data.runtimeDirectory"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.disk.monitoring-interval",
    legacy: ["zeebe.broker.data.disk.monitoringInterval"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.disk.monitoring-enabled",
    legacy: ["zeebe.broker.data.disk.enableMonitoring"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.disk.free-space.processing",
    legacy: ["zeebe.broker.data.disk.freeSpace.processing"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.disk.free-space.replication",
    legacy: ["zeebe.broker.data.disk.freeSpace.replication"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.logstream.log-segment-size",
    legacy: ["zeebe.broker.data.logSegmentSize"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.logstream.log-index-density",
    legacy: ["zeebe.broker.data.logIndexDensity"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.rocksdb.statistics-enabled",
    legacy: ["zeebe.broker.experimental.rocksdb.enableStatistics"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.rocksdb.access-metrics",
    legacy: ["zeebe.broker.experimental.rocksdb.accessMetrics"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.rocksdb.memory-limit",
    legacy: ["zeebe.broker.experimental.rocksdb.memoryLimit"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.rocksdb.max-open-files",
    legacy: ["zeebe.broker.experimental.rocksdb.maxOpenFiles"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.rocksdb.max-write-buffer-number",
    legacy: ["zeebe.broker.experimental.rocksdb.maxWriteBufferNumber"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.rocksdb.min-write-buffer-number-to-merge",
    legacy: ["zeebe.broker.experimental.rocksdb.minWriteBufferNumberToMerge"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.rocksdb.io-rate-bytes-per-second",
    legacy: ["zeebe.broker.experimental.rocksdb.ioRateBytesPerSecond"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.rocksdb.wal-disabled",
    legacy: ["zeebe.broker.experimental.rocksdb.walDisabled"],
    types: ["1-to-1"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.rocksdb.sst-partitioning-enabled",
    legacy: ["zeebe.broker.experimental.rocksdb.enableSstPartitioning"],
    types: ["1-to-1"],
    area: ["Data"],
  },

  // System keys

  {
    name: "camunda.system.cpu-thread-count",
    legacy: ["zeebe.broker.threads.cpuThreadCount"],
    types: ["1-to-1"],
    area: ["System"],
  },
  {
    name: "camunda.system.io-thread-count",
    legacy: ["zeebe.broker.threads.ioThreadCount"],
    types: ["1-to-1"],
    area: ["System"],
  },
  {
    name: "camunda.system.clock-controlled",
    legacy: ["zeebe.clock.controlled"],
    types: ["1-to-1"],
    area: ["System"],
  },
  {
    name: "camunda.system.actor.idle.max-spins",
    legacy: ["zeebe.actor.idle.maxSpins"],
    types: ["1-to-1"],
    area: ["System"],
  },
  {
    name: "camunda.system.actor.idle.max-yields",
    legacy: ["zeebe.actor.idle.maxYields"],
    types: ["1-to-1"],
    area: ["System"],
  },
  {
    name: "camunda.system.actor.idle.max-park-period",
    legacy: ["zeebe.actor.idle.maxParkPeriod"],
    types: ["1-to-1"],
    area: ["System"],
  },
  {
    name: "camunda.system.upgrade.enable-version-check",
    legacy: ["zeebe.broker.experimental.versionCheckRestrictionEnabled"],
    types: ["1-to-1"],
    area: ["System"],
  },
];
