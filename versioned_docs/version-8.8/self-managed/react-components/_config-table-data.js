export const configs = [
  // API keys
  {
    name: "camunda.api.grpc.address",
    legacy: ["zeebe.gateway.network.host", "zeebe.broker.gateway.network.host"],
    types: ["Direct mapping"],
    area: ["API"],
  },
  {
    name: "camunda.api.grpc.port",
    legacy: ["zeebe.gateway.network.port", "zeebe.broker.gateway.network.port"],
    types: ["Direct mapping"],
    area: ["API"],
  },
  {
    name: "camunda.api.grpc.min-keep-alive-interval",
    legacy: [
      "zeebe.gateway.network.minKeepAliveInterval",
      "zeebe.broker.gateway.network.minKeepAliveInterval",
    ],
    types: ["Direct mapping"],
    area: ["API"],
  },
  {
    name: "camunda.api.grpc.max-message-size",
    legacy: [
      "zeebe.gateway.network.maxMessageSize",
      "zeebe.broker.gateway.network.maxMessageSize",
    ],
    types: ["Direct mapping"],
    area: ["API"],
  },
  {
    name: "camunda.api.grpc.ssl.enabled",
    legacy: [
      "zeebe.gateway.security.enabled",
      "zeebe.broker.gateway.security.enabled",
    ],
    types: ["Direct mapping"],
    area: ["API"],
  },
  {
    name: "camunda.api.grpc.ssl.certificate",
    legacy: [
      "zeebe.gateway.security.certificateChainPath",
      "zeebe.broker.gateway.security.certificateChainPath",
    ],
    types: ["Direct mapping"],
    area: ["API"],
  },
  {
    name: "camunda.api.grpc.ssl.certificate-private-key",
    legacy: [
      "zeebe.gateway.security.privateKeyPath",
      "zeebe.broker.gateway.security.privateKeyPath",
    ],
    types: ["Direct mapping"],
    area: ["API"],
  },
  {
    name: "camunda.api.grpc.ssl.key-store.file-path",
    legacy: [
      "zeebe.gateway.security.keyStore.filePath",
      "zeebe.broker.gateway.security.keyStore.filePath",
    ],
    types: ["Direct mapping"],
    area: ["API"],
  },
  {
    name: "camunda.api.grpc.ssl.key-store.password",
    legacy: [
      "zeebe.gateway.security.keyStore.password",
      "zeebe.broker.gateway.security.keyStore.password",
    ],
    types: ["Direct mapping"],
    area: ["API"],
  },
  {
    name: "camunda.api.grpc.interceptors[].id",
    legacy: [
      "zeebe.gateway.interceptors.[x].id",
      "zeebe.broker.gateway.interceptors.[x].id",
    ],
    types: ["Direct mapping"],
    area: ["API"],
  },
  {
    name: "camunda.api.grpc.interceptors[].jar-path",
    legacy: [
      "zeebe.gateway.interceptors.[x].jarPath",
      "zeebe.broker.gateway.interceptors.[x].jarPath",
    ],
    types: ["Direct mapping"],
    area: ["API"],
  },
  {
    name: "camunda.api.grpc.interceptors[].class-name",
    legacy: [
      "zeebe.gateway.interceptors.[x].className",
      "zeebe.broker.gateway.interceptors.[x].className",
    ],
    types: ["Direct mapping"],
    area: ["API"],
  },
  {
    name: "camunda.api.grpc.management-threads",
    legacy: [
      "zeebe.gateway.threads.managementThreads",
      "zeebe.broker.gateway.threads.managementThreads",
    ],
    types: ["Direct mapping"],
    area: ["API"],
  },
  {
    name: "camunda.api.long-polling.enabled",
    legacy: [
      "zeebe.gateway.longPolling.enabled",
      "zeebe.broker.gateway.longPolling.enabled",
    ],
    types: ["Direct mapping"],
    area: ["API"],
  },
  {
    name: "camunda.api.long-polling.timeout",
    legacy: [
      "zeebe.gateway.longPolling.timeout",
      "zeebe.broker.gateway.longPolling.timeout",
    ],
    types: ["Direct mapping"],
    area: ["API"],
  },
  {
    name: "camunda.api.long-polling.probe-timeout",
    legacy: [
      "zeebe.gateway.longPolling.probeTimeout",
      "zeebe.broker.gateway.longPolling.probeTimeout",
    ],
    types: ["Direct mapping"],
    area: ["API"],
  },
  {
    name: "camunda.api.long-polling.min-empty-responses",
    legacy: [
      "zeebe.gateway.longPolling.minEmptyResponses",
      "zeebe.broker.gateway.longPolling.minEmptyResponses",
    ],
    types: ["Direct mapping"],
    area: ["API"],
  },

  {
    name: "camunda.api.rest.filters[].id",
    legacy: [
      "zeebe.gateway.filters.[x].id",
      "zeebe.broker.gateway.filters.[x].id",
    ],
    types: ["Direct mapping"],
    area: ["API"],
  },
  {
    name: "camunda.api.rest.filters[].jar-path",
    legacy: [
      "zeebe.gateway.filters.[x].jarPath",
      "zeebe.broker.gateway.filters.[x].jarPath",
    ],
    types: ["Direct mapping"],
    area: ["API"],
  },
  {
    name: "camunda.api.rest.filters[].class-name",
    legacy: [
      "zeebe.gateway.filters.[x].className",
      "zeebe.broker.gateway.filters.[x].className",
    ],
    types: ["Direct mapping"],
    area: ["API"],
  },
  {
    name: "camunda.api.rest.process-cache.max-size",
    legacy: ["camunda.rest.processCache.maxSize"],
    types: ["Direct mapping"],
    area: ["API"],
  },
  {
    name: "camunda.api.rest.process-cache.expiration-idle",
    legacy: ["camunda.rest.processCache.expirationIdleMillis"],
    types: ["Direct mapping"],
    area: ["API"],
  },
  {
    name: "camunda.api.rest.executor.core-pool-size-multiplier",
    legacy: ["camunda.rest.apiExecutor.corePoolSizeMultiplier"],
    types: ["Direct mapping"],
    area: ["API"],
  },
  {
    name: "camunda.api.rest.executor.max-pool-size-multiplier",
    legacy: ["camunda.rest.apiExecutor.maxPoolSizeMultiplier"],
    types: ["Direct mapping"],
    area: ["API"],
  },
  {
    name: "camunda.api.rest.executor.keep-alive",
    legacy: ["camunda.rest.apiExecutor.keepAliveSeconds"],
    types: ["Direct mapping"],
    area: ["API"],
  },
  {
    name: "camunda.api.rest.executor.queue-capacity",
    legacy: ["camunda.rest.apiExecutor.queueCapacity"],
    types: ["Direct mapping"],
    area: ["API"],
  },

  // Cluster keys

  {
    name: "camunda.cluster.metadata.sync-delay",
    legacy: ["zeebe.broker.cluster.configManager.gossip.syncDelay"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.metadata.sync-request-timeout",
    legacy: ["zeebe.broker.cluster.configManager.gossip.syncRequestTimeout"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.metadata.gossip-fanout",
    legacy: ["zeebe.broker.cluster.configManager.gossip.gossipFanout"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.network.host",
    legacy: ["zeebe.gateway.cluster.host", "zeebe.broker.network.host"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.node-id",
    legacy: ["zeebe.broker.cluster.nodeId"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.partition-count",
    legacy: ["zeebe.broker.cluster.partitionsCount"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.replication-factor",
    legacy: ["zeebe.broker.cluster.replicationFactor"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.size",
    legacy: ["zeebe.broker.cluster.clusterSize"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.raft.priority-election-enabled",
    legacy: ["zeebe.broker.cluster.raft.enablePriorityElection"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.raft.flush-enabled",
    legacy: ["zeebe.broker.cluster.raft.flush.enabled"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.raft.flush-delay",
    legacy: ["zeebe.broker.cluster.raft.flush.delay"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.raft.heartbeat-interval",
    legacy: ["zeebe.broker.cluster.heartbeatInterval"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.raft.election-timeout",
    legacy: ["zeebe.broker.cluster.electionTimeout"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },

  // Data keys

  {
    name: "camunda.data.snapshot-period",
    legacy: ["zeebe.broker.data.snapshotPeriod"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.export.distribution-interval",
    legacy: ["zeebe.broker.exporting.distributionInterval"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.export.skip-records",
    legacy: ["zeebe.broker.exporting.skipRecords"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.repository-name",
    legacy: [
      "camunda.operate.backup.repositoryName",
      "camunda.tasklist.backup.repositoryName",
    ],
    types: ["Breaking change"],
    area: ["Data"],
    notes: [
      "Note: Starting with 8.8, the same repository must be used for both Operate and Tasklist.",
    ],
  },
  {
    name: "camunda.data.backup.snapshot-timeout",
    legacy: ["camunda.operate.backup.snapshotTimeout"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.incomplete-check-timeout",
    legacy: ["camunda.operate.backup.incompleteCheckTimeoutInSeconds"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.store",
    legacy: ["zeebe.broker.data.backup.store"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.s3.bucket-name",
    legacy: ["zeebe.broker.data.backup.s3.bucketName"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.s3.endpoint",
    legacy: ["zeebe.broker.data.backup.s3.endpoint"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.s3.endpoint",
    legacy: ["zeebe.broker.data.backup.s3.endpoint"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.s3.region",
    legacy: ["zeebe.broker.data.backup.s3.region"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.s3.access-key",
    legacy: ["zeebe.broker.data.backup.s3.accessKey"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.s3.secret-key",
    legacy: ["zeebe.broker.data.backup.s3.secretKey"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.s3.api-call-timeout",
    legacy: ["zeebe.broker.data.backup.s3.apiCallTimeout"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.s3.force-path-style-access",
    legacy: ["zeebe.broker.data.backup.s3.forcePathStyleAccess"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.s3.compression:",
    legacy: ["zeebe.broker.data.backup.s3.compression:"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.s3.max-concurrent-connections:",
    legacy: ["zeebe.broker.data.backup.s3.maxConcurrentConnections"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.s3.connection-acquisition-timeout",
    legacy: ["zeebe.broker.data.backup.s3.connectionAcquisitionTimeout"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.s3.base-path",
    legacy: ["zeebe.broker.data.backup.s3.basePath"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.s3.support-legacy-md5",
    legacy: ["zeebe.broker.data.backup.s3.supportLegacyMd5"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.gcs.bucket-name",
    legacy: ["zeebe.broker.data.backup.gcs.bucketName"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.gcs.host",
    legacy: ["zeebe.broker.data.backup.gcs.host"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.gcs.auth",
    legacy: ["zeebe.broker.data.backup.gcs.auth"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.azure.endpoint",
    legacy: ["zeebe.broker.data.backup.azure.endpoint"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.azure.account-name",
    legacy: ["zeebe.broker.data.backup.azure.accountName"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.azure.account-key",
    legacy: ["zeebe.broker.data.backup.azure.accountKey"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.azure.connection-string",
    legacy: ["zeebe.broker.data.backup.azure.connectionString"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.azure.base-path",
    legacy: ["zeebe.broker.data.backup.azure.basePath"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.azure.create-container",
    legacy: ["zeebe.broker.data.backup.azure.createContainer"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.azure.sas-token.type",
    legacy: ["zeebe.broker.data.backup.azure.sasToken.type"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.azure.sas-token.value",
    legacy: ["zeebe.broker.data.backup.azure.sasToken.value"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.backup.filesystem.base-path",
    legacy: ["zeebe.broker.data.backup.filesystem.basePath"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.type",
    legacy: [
      "camunda.database.type",
      "camunda.operate.database",
      "camunda.tasklist.database",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.autoconfigure-camunda-exporter",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.url",
    legacy: [
      "camunda.database.url",
      "camunda.operate.elasticsearch.url",
      "camunda.tasklist.elasticsearch.url",
      "zeebe.broker.exporters.camundaexporter.args.connect.url",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.cluster-name",
    legacy: [
      "camunda.database.clusterName",
      "camunda.operate.elasticsearch.clusterName",
      "camunda.tasklist.elasticsearch.clusterName",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.username",
    legacy: [
      "camunda.database.username",
      "camunda.operate.elasticsearch.username",
      "camunda.tasklist.elasticsearch.username",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.password",
    legacy: [
      "camunda.database.password",
      "camunda.operate.elasticsearch.password",
      "camunda.tasklist.elasticsearch.password",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.security.enabled",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.security.certificate-path",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.security.verify-hostname",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.security.self-signed",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.index-prefix",
    legacy: [
      "camunda.database.indexPrefix",
      "camunda.tasklist.elasticsearch.indexPrefix",
      "camunda.operate.elasticsearch.indexPrefix",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },

  {
    name: "camunda.data.secondary-storage.opensearch.url",
    legacy: [
      "camunda.database.url",
      "camunda.operate.opensearch.url",
      "camunda.tasklist.opensearch.url",
      "zeebe.broker.exporters.camundaexporter.args.connect.url",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.cluster-name",
    legacy: [
      "camunda.database.clusterName",
      "camunda.operate.opensearch.clusterName",
      "camunda.tasklist.opensearch.clusterName",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.username",
    legacy: [
      "camunda.database.username",
      "camunda.operate.opensearch.username",
      "camunda.tasklist.opensearch.username",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.password",
    legacy: [
      "camunda.database.password",
      "camunda.operate.opensearch.password",
      "camunda.tasklist.opensearch.password",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.security.enabled",
    legacy: ["camunda.database.security.enabled"],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.security.certificate-path",
    legacy: [
      "camunda.database.security.certificatePath",
      "camunda.tasklist.opensearch.ssl.certificatePath",
      "camunda.operate.opensearch.ssl.certificatePath",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.security.verify-hostname",
    legacy: [
      "camunda.database.security.verifyHostname",
      "camunda.tasklist.opensearch.ssl.verifyHostname",
      "camunda.operate.opensearch.ssl.verifyHostname",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.security.self-signed",
    legacy: [
      "camunda.database.security.selfSigned",
      "camunda.tasklist.elasticsearch.ssl.selfSigned",
      "camunda.operate.elasticsearch.ssl.selfSigned",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.index-prefix",
    legacy: [
      "camunda.database.indexPrefix",
      "camunda.tasklist.opensearch.indexPrefix",
      "camunda.operate.opensearch.indexPrefix",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.directory",
    legacy: ["zeebe.broker.data.directory"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.runtime-directory",
    legacy: ["zeebe.broker.data.runtimeDirectory"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.disk.monitoring-interval",
    legacy: ["zeebe.broker.data.disk.monitoringInterval"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.disk.monitoring-enabled",
    legacy: ["zeebe.broker.data.disk.enableMonitoring"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.disk.free-space.processing",
    legacy: ["zeebe.broker.data.disk.freeSpace.processing"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.disk.free-space.replication",
    legacy: ["zeebe.broker.data.disk.freeSpace.replication"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.logstream.log-segment-size",
    legacy: ["zeebe.broker.data.logSegmentSize"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.logstream.log-index-density",
    legacy: ["zeebe.broker.data.logIndexDensity"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.rocksdb.statistics-enabled",
    legacy: ["zeebe.broker.experimental.rocksdb.enableStatistics"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.rocksdb.access-metrics",
    legacy: ["zeebe.broker.experimental.rocksdb.accessMetrics"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.rocksdb.memory-limit",
    legacy: ["zeebe.broker.experimental.rocksdb.memoryLimit"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.rocksdb.max-open-files",
    legacy: ["zeebe.broker.experimental.rocksdb.maxOpenFiles"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.rocksdb.max-write-buffer-number",
    legacy: ["zeebe.broker.experimental.rocksdb.maxWriteBufferNumber"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.rocksdb.min-write-buffer-number-to-merge",
    legacy: ["zeebe.broker.experimental.rocksdb.minWriteBufferNumberToMerge"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.rocksdb.io-rate-bytes-per-second",
    legacy: ["zeebe.broker.experimental.rocksdb.ioRateBytesPerSecond"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.rocksdb.wal-disabled",
    legacy: ["zeebe.broker.experimental.rocksdb.disableWal"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.rocksdb.column-family-options",
    legacy: ["zeebe.broker.experimental.rocksdb.columnFamilyOptions"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.rocksdb.sst-partitioning-enabled",
    legacy: ["zeebe.broker.experimental.rocksdb.enableSstPartitioning"],
    types: ["Direct mapping"],
    area: ["Data"],
  },

  // System keys

  {
    name: "camunda.system.cpu-thread-count",
    legacy: ["zeebe.broker.threads.cpuThreadCount"],
    types: ["Direct mapping"],
    area: ["System"],
  },
  {
    name: "camunda.system.io-thread-count",
    legacy: ["zeebe.broker.threads.ioThreadCount"],
    types: ["Direct mapping"],
    area: ["System"],
  },
  {
    name: "camunda.system.clock-controlled",
    legacy: ["zeebe.clock.controlled"],
    types: ["Direct mapping"],
    area: ["System"],
  },
  {
    name: "camunda.system.actor.idle.max-spins",
    legacy: ["zeebe.actor.idle.maxSpins"],
    types: ["Direct mapping"],
    area: ["System"],
  },
  {
    name: "camunda.system.actor.idle.max-yields",
    legacy: ["zeebe.actor.idle.maxYields"],
    types: ["Direct mapping"],
    area: ["System"],
  },
  {
    name: "camunda.system.actor.idle.max-park-period",
    legacy: ["zeebe.actor.idle.maxParkPeriod"],
    types: ["Direct mapping"],
    area: ["System"],
  },
  {
    name: "camunda.system.upgrade.enable-version-check",
    legacy: ["zeebe.broker.experimental.versionCheckRestrictionEnabled"],
    types: ["Direct mapping"],
    area: ["System"],
  },
  // Spring profile keys
  {
    name: "spring.profiles.active",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Spring Profile"],
  },
  // Server keys
  {
    name: "server.address",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Server"],
  },
  {
    name: "server.port",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Server"],
  },
  {
    name: "server.ssl.enabled",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Server"],
  },
  {
    name: "server.ssl.certificate",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Server"],
  },
  {
    name: "server.ssl.certificate-private-key",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Server"],
  },
  // Management keys
  {
    name: "management.server",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Server"],
  },
  {
    name: "management.server.address",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Server"],
  },
  {
    name: "management.server.port",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Server"],
  },
  {
    name: "management.server.ssl.enabled",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Server"],
  },
  {
    name: "management.endpoint",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Server"],
  },
  // License keys
  {
    name: "camunda.license.key",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Licensing"],
  },
];
