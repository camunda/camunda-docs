export const configs = [
  // 8.9 properties

  {
    name: "camunda.system.restore.validate-config",
    legacy: ["zeebe.restore.validateConfig"],
    types: ["Direct mapping"],
    area: ["System"],
  },
  {
    name: "camunda.cluster.network.advertised-host",
    legacy: ["?"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.network.port-offset",
    legacy: ["?"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.network.max-message-size",
    legacy: ["?"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.network.max-message-size",
    legacy: ["?"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },

  {
    name: "camunda.cluster.network.socket-send-buffer",
    legacy: ["?"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.network.socket-receive-buffer",
    legacy: ["?"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.network.heartbeat-timeout",
    legacy: ["?"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.network.heartbeat-interval",
    legacy: ["?"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.network.command-api.host",
    legacy: ["zeebe.broker.network.commandApi.host"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.network.command-api.port",
    legacy: ["zeebe.broker.network.commandApi.port"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.network.command-api.advertisedHost",
    legacy: ["zeebe.broker.network.commandApi.advertisedHost"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.network.command-api.advertisedPort",
    legacy: ["zeebe.broker.network.commandApi.advertisedPort"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.network.internal-api.host",
    legacy: [
      "zeebe.gateway.cluster.host",
      "zeebe.broker.network.internalApi.host",
    ],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.network.internal-api.port",
    legacy: [
      "zeebe.gateway.cluster.port",
      "zeebe.broker.network.internalApi.port",
    ],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.network.internal-api.advertisedHost",
    legacy: [
      "zeebe.gateway.cluster.advertisedHost",
      "zeebe.broker.network.internalApi.advertisedHost",
    ],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.network.internal-api.advertisedPort",
    legacy: [
      "zeebe.gateway.cluster.advertisedPort",
      "zeebe.broker.network.internalApi.advertisedPort",
    ],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.name",
    legacy: [
      "zeebe.gateway.cluster.clusterName",
      "zeebe.broker.cluster.clusterName",
    ],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.raft.max-appends-per-follower",
    legacy: ["zeebe.broker.experimental.maxAppendsPerFollower"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.raft.max-appends-batch-size",
    legacy: ["zeebe.broker.experimental.maxAppendBatchSize"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.raft.request-timeout",
    legacy: ["zeebe.broker.experimental.raft.requestTimeout"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.raft.snapshot-request-timeout",
    legacy: ["zeebe.broker.experimental.raft.snapshotRequestTimeout"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.raft.snapshot-chunk-size",
    legacy: ["zeebe.broker.experimental.raft.snapshotChunkSize"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.raft.configuration-change-timeout",
    legacy: ["zeebe.broker.experimental.raft.configurationChangeTimeout"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.raft.max-quorum-response-timeout",
    legacy: ["zeebe.broker.experimental.raft.maxQuorumResponseTimeout"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.raft.min-step-down-failure-count",
    legacy: ["zeebe.broker.experimental.raft.minStepDownFailureCount"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.raft.prefer-snapshot-replicationThreshold",
    legacy: [
      "zeebe.broker.experimental.raft.preferSnapshotReplicationThreshold",
    ],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.raft.preallocate-segment-files",
    legacy: ["zeebe.broker.experimental.raft.preallocateSegmentFiles"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.partitioning.scheme",
    legacy: ["zeebe.broker.experimental.partitioning.scheme"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.partitioning.fixed[].partition-id",
    legacy: ["zeebe.broker.experimental.partitioning.fixed.[x].partitionId"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.partitioning.fixed[].nodes[].nodes-id",
    legacy: [
      "zeebe.broker.experimental.partitioning.fixed.[x].nodes.[x].nodeId",
    ],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.partitioning.fixed[].nodes[].nodes-id",
    legacy: [
      "zeebe.broker.experimental.partitioning.fixed.[x].nodes.[x].nodeId",
    ],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.partitioning.fixed[].nodes[].priority",
    legacy: [
      "zeebe.broker.experimental.partitioning.fixed.[x].nodes.[x].priority",
    ],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.membership.broadcast-updates",
    legacy: [
      "zeebe.broker.cluster.membership.broadcastUpdates",
      "zeebe.gateway.cluster.membership.broadcastUpdates",
    ],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.membership.broadcast-disputes",
    legacy: [
      "zeebe.broker.cluster.membership.broadcastUpdates",
      "zeebe.gateway.cluster.membership.broadcastUpdates",
    ],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.membership.notify-suspect",
    legacy: [
      "zeebe.broker.cluster.membership.notifySuspect",
      "zeebe.gateway.cluster.membership.notifySuspect",
    ],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.membership.probe-interval",
    legacy: [
      "zeebe.broker.cluster.membership.probeInterval",
      "zeebe.gateway.cluster.membership.probeInterval",
    ],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.membership.probe-timeout",
    legacy: [
      "zeebe.broker.cluster.membership.probeTimeout",
      "zeebe.gateway.cluster.membership.probeTimeout",
    ],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.membership.suspect-probes",
    legacy: [
      "zeebe.broker.cluster.membership.suspectProbes",
      "zeebe.gateway.cluster.membership.suspectProbes",
    ],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.membership.failure-timeout",
    legacy: [
      "zeebe.broker.cluster.membership.failureTimeout",
      "zeebe.gateway.cluster.membership.failureTimeout",
    ],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.membership.sync-interval",
    legacy: [
      "zeebe.broker.cluster.membership.syncInterval",
      "zeebe.gateway.cluster.membership.syncInterval",
    ],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.membership.gossip-fanout",
    legacy: [
      "zeebe.broker.cluster.membership.gossipFanout",
      "zeebe.gateway.cluster.membership.gossipFanout",
    ],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.membership.gossip-interval",
    legacy: [
      "zeebe.broker.cluster.membership.gossipInterval",
      "zeebe.gateway.cluster.membership.gossipInterval",
    ],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.compression-algorithm",
    legacy: [
      "zeebe.broker.cluster.messageCompression",
      "zeebe.gateway.cluster.messageCompression",
    ],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.global-listeners",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.global-listeners.user-task",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.global-listeners.user-task.type",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.global-listeners.user-task.event-types",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.global-listeners.user-task.retries",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.global-listeners.user-task.after-non-global",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.node-id-provider.type",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.node-id-provider.s3.lease-duration",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.node-id-provider.s3.bucket-name",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.node-id-provider.s3.task-id",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.node-id-provider.s3.endpoint",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.node-id-provider.s3.region",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.node-id-provider.s3.access-key",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.node-id-provider.s3.secret-key",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.node-id-provider.s3.api-call-timeout",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.node-id-provider.fixed.node-id",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Cluster"],
  },
  {
    name: "camunda.data.secondary-storage.retention.enabled",
    legacy: [
      "camunda.database.retention.enabled",
      "zeebe.broker.exporters.camundaexporter.args.history.retention.enabled",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.retention.minimum-age",
    legacy: [
      "camunda.database.retention.minimumAge",
      "zeebe.broker.exporters.camundaexporter.args.history.retention.minimumAge",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.date-format",
    legacy: [
      "camunda.database.dateFormat",
      "camunda.tasklist.elasticsearch.dateFormat",
      "camunda.operate.elasticsearch.dateFormat",
      "zeebe.broker.exporters.camundaexporter.args.connect.dateFormat",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.socket-timeout",
    legacy: [
      "camunda.database.socketTimeout",
      "camunda.tasklist.elasticsearch.socketTimeout",
      "camunda.operate.elasticsearch.socketTimeout",
      "zeebe.broker.exporters.camundaexporter.args.connect.socketTimeout",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.connection-timeout",
    legacy: [
      "camunda.database.connectionTimeout",
      "camunda.tasklist.elasticsearch.connectionTimeout",
      "camunda.operate.elasticsearch.connectionTimeout",
      "zeebe.broker.exporters.camundaexporter.args.connect.connectionTimeout",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },

  {
    name: "camunda.data.secondary-storage.opensearch.date-format",
    legacy: [
      "camunda.database.dateFormat",
      "camunda.tasklist.opensearch.dateFormat",
      "camunda.operate.opensearch.dateFormat",
      "zeebe.broker.exporters.camundaexporter.args.connect.dateFormat",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.socket-timeout",
    legacy: [
      "camunda.database.socketTimeout",
      "camunda.tasklist.opensearch.socketTimeout",
      "camunda.operate.opensearch.socketTimeout",
      "zeebe.broker.exporters.camundaexporter.args.connect.socketTimeout",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.connection-timeout",
    legacy: [
      "camunda.database.connectionTimeout",
      "camunda.tasklist.opensearch.connectionTimeout",
      "camunda.operate.opensearch.connectionTimeout",
      "zeebe.broker.exporters.camundaexporter.args.connect.connectionTimeout",
    ],
    types: ["Breaking change"],
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
    name: "camunda.data.secondary-storage.elasticsearch.interceptor-plugins.[x].id",
    legacy: [
      "camunda.operate.elasticsearch.interceptorPlugins.[x].id",
      "camunda.tasklist.elasticsearch.interceptorPlugins.[x].id",
      "camunda.database.interceptorPlugins.id",
      "zeebe.broker.exporters.camundaexporter.args.connect.interceptorPlugins.[x].id",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.interceptor-plugins.[x].className",
    legacy: [
      "camunda.operate.elasticsearch.interceptorPlugins.[x].className",
      "camunda.tasklist.elasticsearch.interceptorPlugins.[x].className",
      "camunda.database.interceptorPlugins.className",
      "zeebe.broker.exporters.camundaexporter.args.connect.interceptorPlugins.[x].className",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.interceptor-plugins.[x].jarPath",
    legacy: [
      "camunda.operate.elasticsearch.interceptorPlugins.[x].jarPath",
      "camunda.tasklist.elasticsearch.interceptorPlugins.[x].jarPath",
      "camunda.database.interceptorPlugins.jarPath",
      "zeebe.broker.exporters.camundaexporter.args.connect.interceptorPlugins.[x].jarPath",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.number-of-shards",
    legacy: [
      "camunda.database.index.numberOfShards",
      "zeebe.broker.exporters.camundaexporter.args.index.numberOfShards",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.number-of-replicas",
    legacy: [
      "camunda.database.index.numberOfReplicas",
      "zeebe.broker.exporters.camundaexporter.args.index.numberOfReplicas",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.template-priority",
    legacy: [
      "camunda.database.index.templatePriority",
      "zeebe.broker.exporters.camundaexporter.args.index.templatePriority",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.variable-size-threshold",
    legacy: [
      "camunda.database.index.variableSizeThreshold",
      "zeebe.broker.exporters.camundaexporter.args.index.variableSizeThreshold",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.number-of-shards-per-index",
    legacy: [
      "camunda.database.index.shardsByIndexName",
      "zeebe.broker.exporters.camundaexporter.args.index.shardsByIndexName",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.number-of-replicas-per-index",
    legacy: [
      "camunda.database.index.replicasByIndexName",
      "zeebe.broker.exporters.camundaexporter.args.index.replicasByIndexName",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.bulk.delay",
    legacy: ["zeebe.broker.exporters.camundaexporter.args.bulk.delay"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.bulk.size",
    legacy: ["zeebe.broker.exporters.camundaexporter.args.bulk.size"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.bulk.memory-limit",
    legacy: ["zeebe.broker.exporters.camundaexporter.args.bulk.memoryLimit"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.process-cache.max-cache-size",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.processCache.maxCacheSize",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.form-cache.max-cache-size",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.formCache.maxCacheSize",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.redistribution-interval.max-cache-size",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.batchOperationCache.maxCacheSize",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.create-schema",
    legacy: ["zeebe.broker.exporters.camundaexporter.args.createSchema"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.post-export.batch-size",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.postExport.batchSize",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.post-export.delay-between-runs",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.postExport.delayBetweenRuns",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.post-export.max-delay-between-runs",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.postExport.maxDelayBetweenRuns",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.post-export.ignore-missing-data",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.postExport.ignoreMissingData",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.incident-notifier.auth0-protocol",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.notifier.auth0Protocol",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.incident-notifier.webhook",
    legacy: ["zeebe.broker.exporters.camundaexporter.args.notifier.webhook"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.incident-notifier.auth0-domain",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.notifier.auth0Domain",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.incident-notifier.m2m-client-id",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.notifier.m2mClientId",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.incident-notifier.m2m-client-secret",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.notifier.m2mClientSecret",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.incident-notifier.m2m-audience",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.notifier.m2mAudience",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.batch-operations.export-items-on-creation",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.batchOperation.exportItemsOnCreation",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.history.els-rollover-date-format",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.history.elsRolloverDateFormat",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.history.rollover-interval",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.history.rolloverInterval",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.history.rollover-batch-size",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.history.rolloverBatchSize",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.history.wait-period-before-archiving",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.history.waitPeriodBeforeArchiving",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.history.delay-between-runs",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.history.delayBetweenRuns",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.history.max-delay-between-runs",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.history.maxDelayBetweenRuns",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },

  {
    name: "camunda.data.secondary-storage.opensearch.interceptor-plugins.[x].id",
    legacy: [
      "camunda.operate.opensearch.interceptorPlugins.[x].id",
      "camunda.tasklist.opensearch.interceptorPlugins.[x].id",
      "camunda.database.interceptorPlugins.id",
      "zeebe.broker.exporters.camundaexporter.args.connect.interceptorPlugins.[x].id",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.interceptor-plugins.[x].className",
    legacy: [
      "camunda.operate.opensearch.interceptorPlugins.[x].className",
      "camunda.tasklist.opensearch.interceptorPlugins.[x].className",
      "camunda.database.interceptorPlugins.className",
      "zeebe.broker.exporters.camundaexporter.args.connect.interceptorPlugins.[x].className",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.interceptor-plugins.[x].jarPath",
    legacy: [
      "camunda.operate.opensearch.interceptorPlugins.[x].jarPath",
      "camunda.tasklist.opensearch.interceptorPlugins.[x].jarPath",
      "camunda.database.interceptorPlugins.jarPath",
      "zeebe.broker.exporters.camundaexporter.args.connect.interceptorPlugins.[x].jarPath",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.number-of-shards",
    legacy: [
      "camunda.database.index.numberOfShards",
      "zeebe.broker.exporters.camundaexporter.args.index.numberOfShards",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.number-of-replicas",
    legacy: [
      "camunda.database.index.numberOfReplicas",
      "zeebe.broker.exporters.camundaexporter.args.index.numberOfReplicas",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.template-priority",
    legacy: [
      "camunda.database.index.templatePriority",
      "zeebe.broker.exporters.camundaexporter.args.index.templatePriority",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.variable-size-threshold",
    legacy: [
      "camunda.database.index.variableSizeThreshold",
      "zeebe.broker.exporters.camundaexporter.args.index.variableSizeThreshold",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.number-of-shards-per-index",
    legacy: [
      "camunda.database.index.shardsByIndexName",
      "zeebe.broker.exporters.camundaexporter.args.index.shardsByIndexName",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.number-of-replicas-per-index",
    legacy: [
      "camunda.database.index.replicasByIndexName",
      "zeebe.broker.exporters.camundaexporter.args.index.replicasByIndexName",
    ],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.bulk.delay",
    legacy: ["zeebe.broker.exporters.camundaexporter.args.bulk.delay"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.bulk.size",
    legacy: ["zeebe.broker.exporters.camundaexporter.args.bulk.size"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.bulk.memory-limit",
    legacy: ["zeebe.broker.exporters.camundaexporter.args.bulk.memoryLimit"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.process-cache.max-cache-size",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.processCache.maxCacheSize",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.form-cache.max-cache-size",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.formCache.maxCacheSize",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.batch-operation-cache.max-cache-size",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.batchOperationCache.maxCacheSize",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.post-export.batch-size",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.postExport.batchSize",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.post-export.delay-between-runs",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.postExport.delayBetweenRuns",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.post-export.max-delay-between-runs",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.postExport.maxDelayBetweenRuns",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.post-export.ignore-missing-data",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.postExport.ignoreMissingData",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.incident-notifier.auth0-protocol",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.notifier.auth0Protocol",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.incident-notifier.webhook",
    legacy: ["zeebe.broker.exporters.camundaexporter.args.notifier.webhook"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.incident-notifier.auth0-domain",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.notifier.auth0Domain",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.incident-notifier.m2m-client-id",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.notifier.m2mClientId",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.incident-notifier.m2m-client-secret",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.notifier.m2mClientSecret",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.incident-notifier.m2m-audience",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.notifier.m2mAudience",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.batch-operations.export-items-on-creation",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.batchOperation.exportItemsOnCreation",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.history.els-rollover-date-format",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.history.elsRolloverDateFormat",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.history.rollover-interval",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.history.rolloverInterval",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.history.rollover-batch-size",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.history.rolloverBatchSize",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.history.wait-period-before-archiving",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.history.waitPeriodBeforeArchiving",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.history.delay-between-runs",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.history.delayBetweenRuns",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.history.max-delay-between-runs",
    legacy: [
      "zeebe.broker.exporters.camundaexporter.args.history.maxDelayBetweenRuns",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.url",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.url",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.username",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.password",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.prefix",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.flush-interval",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.queue-size",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.queue-memory-limit",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.auto-ddl",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.database-vendor-id",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.history.default-history-ttl",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.history.default-batch-operation-history-ttl",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.history.batch-operation-cancel-process-instance-history-ttl",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.history.batch-operation-migrate-process-instance-history-ttl",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.history.batch-operation-modify-process-instance-history-ttl",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.history.batch-operation-resolve-incident-history-ttl",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.history.usage-metrics-cleanup",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.history.usage-metrics-ttl",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.history.min-history-cleanup-interval",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.history.max-history-cleanup-interval",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.history.history-cleanup-batch-size",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.process-cache.max-size",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.batch-operation-cache.max-size",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.export-batch-operation-items-on-creation",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.batch-operation-item-inserts-block-size",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.connection-pool",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.connection-pool.maximum-pool-size",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.connection-pool.minimum-idle",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.connection-pool.idle-timeout",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.connection-pool.max-lifetime",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.connection-pool.connection-timeout",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.exporters.elasticsearch.class-name",
    legacy: ["zeebe.broker.exporters.[elasticsearch].className"],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.exporters.elasticsearch.jar-path",
    legacy: ["zeebe.broker.exporters.[elasticsearch].jarPath"],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.exporters.elasticsearch.args",
    legacy: ["zeebe.broker.exporters.[elasticsearch].args"],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.exporters.opensearch.class-name",
    legacy: ["zeebe.broker.exporters.[opensearch].className"],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.exporters.opensearch.jar-path",
    legacy: ["zeebe.broker.exporters.[opensearch].jarPath"],
    types: ["Breaking change"],
    area: ["Data"],
  },
  {
    name: "camunda.data.exporters.opensearch.args",
    legacy: ["zeebe.broker.exporters.[opensearch].args"],
    types: ["Breaking change"],
    area: ["Data"],
  },
];

// API keys
/* {
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
  }, */
