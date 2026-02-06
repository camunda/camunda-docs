export const configs = [
  // Section: System
  {
    name: "camunda.system.restore.validate-config",
    legacy: ["zeebe.restore.validateConfig"],
    types: ["Direct mapping"],
    area: ["System"],
  },
  {
    name: "camunda.system.restore.ignore-files-in-target",
    legacy: ["zeebe.restore.ignoreFilesInTarget"],
    types: ["Direct mapping"],
    area: ["System"],
  },
  // Section: Cluster
  {
    name: "camunda.cluster.network.advertised-host",
    legacy: [
      "zeebe.gateway.cluster.advertisedHost",
      "zeebe.broker.network.advertisedHost",
    ],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.network.port-offset",
    legacy: ["zeebe.broker.network.portOffset"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.network.max-message-size",
    legacy: [
      "zeebe.gateway.cluster.maxMessageSize",
      "zeebe.broker.network.maxMessageSize",
    ],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.network.max-message-size",
    legacy: [
      "zeebe.gateway.cluster.maxMessageSize",
      "zeebe.broker.network.maxMessageSize",
    ],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.network.socket-send-buffer",
    legacy: [
      "zeebe.gateway.cluster.socketSendBuffer",
      "zeebe.broker.network.socketSendBuffer",
    ],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.network.socket-receive-buffer",
    legacy: [
      "zeebe.gateway.cluster.socketReceiveBuffer",
      "zeebe.broker.network.socketReceiveBuffer",
    ],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.network.heartbeat-timeout",
    legacy: ["zeebe.broker.network.heartbeatTimeout"],
    types: ["Direct mapping"],
    area: ["Cluster"],
  },
  {
    name: "camunda.cluster.network.heartbeat-interval",
    legacy: ["zeebe.broker.network.heartbeatInterval"],
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
    name: "camunda.cluster.initial-contact-points",
    legacy: [
      "zeebe.gateway.cluster.initialContactPoints",
      "zeebe.broker.cluster.initialContactPoints",
    ],
    types: ["Direct mapping"],
    area: ["Cluster"],
    notes: [
      "Note: The deprecated property 'zeebe.gateway.cluster.contactPoint' is removed in 8.9.",
    ],
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
    name: "camunda.cluster.id",
    legacy: ["zeebe.broker.cluster.clusterId"],
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
  // Section: Data
  {
    name: "camunda.data.audit-log.enabled",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.audit-log.user.categories",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.audit-log.user.excludes",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.audit-log.client.categories",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.audit-log.client.excludes",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  // Section: Data - Secondary storage
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
  // Section: Data - Secondary Storage - Elasticsearch
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
    name: "camunda.data.secondary-storage.elasticsearch.history.policy-name",
    legacy: [
      "camunda.database.retention.policyName",
      "zeebe.broker.exporters.camundaexporter.args.history.retention.policyName",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.backup.repository-name",
    legacy: [
      "camunda.operate.backup.repositoryName",
      "camunda.tasklist.backup.repositoryName",
      "camunda.data.backup.repository-name",
    ],
    types: ["Breaking change"],
    area: ["Data"],
    notes: [
      "Note: Starting with 8.8, the same repository must be used for both Operate and Tasklist.",
    ],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.backup.snapshot-timeout",
    legacy: [
      "camunda.operate.backup.snapshotTimeout",
      "camunda.data.backup.snapshot-timeout",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.elasticsearch.backup.incomplete-check-timeout",
    legacy: [
      "camunda.operate.backup.incompleteCheckTimeoutInSeconds",
      "camunda.data.backup.incomplete-check-timeout",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  // Section: Data - Secondary Storage - OpenSearch
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
    name: "camunda.data.secondary-storage.opensearch.backup.repository-name",
    legacy: [
      "camunda.operate.backup.repositoryName",
      "camunda.tasklist.backup.repositoryName",
      "camunda.data.backup.repository-name",
    ],
    types: ["Breaking change"],
    area: ["Data"],
    notes: [
      "Note: Starting with 8.8, the same repository must be used for both Operate and Tasklist.",
    ],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.backup.snapshot-timeout",
    legacy: [
      "camunda.operate.backup.snapshotTimeout",
      "camunda.data.backup.snapshot-timeout",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.opensearch.backup.incomplete-check-timeout",
    legacy: [
      "camunda.operate.backup.incompleteCheckTimeoutInSeconds",
      "camunda.data.backup.incomplete-check-timeout",
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
  // Section: Data - Secondary Storage - RDBMS
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
    name: "camunda.data.secondary-storage.rdbms.connection-pool",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.connection-pool.maximum-pool-size",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.connection-pool.minimum-idle",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.connection-pool.idle-timeout",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.connection-pool.max-lifetime",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  {
    name: "camunda.data.secondary-storage.rdbms.connection-pool.connection-timeout",
    legacy: ["N/A"],
    types: ["New"],
    area: ["Data"],
  },
  // Section: Data - Primary storage
  {
    name: "camunda.data.primary-storage.backup.store",
    legacy: ["zeebe.broker.data.backup.store", "camunda.data.backup.store"],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.backup.s3.bucket-name",
    legacy: [
      "zeebe.broker.data.backup.s3.bucketName",
      "camunda.data.backup.s3.bucket-name",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.backup.s3.endpoint",
    legacy: [
      "zeebe.broker.data.backup.s3.endpoint",
      "camunda.data.backup.s3.endpoint",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.backup.s3.region",
    legacy: [
      "zeebe.broker.data.backup.s3.region",
      "camunda.data.backup.s3.region",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.backup.s3.access-key",
    legacy: [
      "zeebe.broker.data.backup.s3.accessKey",
      "camunda.data.backup.s3.access-key",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.backup.s3.secret-key",
    legacy: [
      "zeebe.broker.data.backup.s3.secretKey",
      "camunda.data.backup.s3.secret-key",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.backup.s3.api-call-timeout",
    legacy: [
      "zeebe.broker.data.backup.s3.apiCallTimeout",
      "camunda.data.backup.s3.api-call-timeout",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.backup.s3.force-path-style-access",
    legacy: [
      "zeebe.broker.data.backup.s3.forcePathStyleAccess",
      "camunda.data.backup.s3.force-path-style-access",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.backup.s3.compression",
    legacy: [
      "zeebe.broker.data.backup.s3.compression",
      "camunda.data.backup.s3.compression",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.backup.s3.max-concurrent-connections",
    legacy: [
      "zeebe.broker.data.backup.s3.maxConcurrentConnections",
      "camunda.data.backup.s3.max-concurrent-connections",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.backup.s3.connection-acquisition-timeout",
    legacy: [
      "zeebe.broker.data.backup.s3.connectionAcquisitionTimeout",
      "camunda.data.backup.s3.connection-acquisition-timeout",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.backup.s3.base-path",
    legacy: [
      "zeebe.broker.data.backup.s3.basePath",
      "camunda.data.backup.s3.base-path",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.backup.s3.support-legacy-md5",
    legacy: [
      "zeebe.broker.data.backup.s3.supportLegacyMd5",
      "camunda.data.backup.s3.support-legacy-md5",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.backup.gcs.bucket-name",
    legacy: [
      "zeebe.broker.data.backup.gcs.bucketName",
      "camunda.data.backup.gcs.bucket-name",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.backup.gcs.endpoint",
    legacy: [
      "zeebe.broker.data.backup.gcs.endpoint",
      "camunda.data.backup.gcs.endpoint",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.backup.gcs.host",
    legacy: [
      "zeebe.broker.data.backup.gcs.host",
      "camunda.data.backup.gcs.host",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.backup.gcs.auth",
    legacy: [
      "zeebe.broker.data.backup.gcs.auth",
      "camunda.data.backup.gcs.auth",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.backup.azure.endpoint",
    legacy: [
      "zeebe.broker.data.backup.azure.endpoint",
      "camunda.data.backup.azure.endpoint",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.backup.azure.account-name",
    legacy: [
      "zeebe.broker.data.backup.azure.accountName",
      "camunda.data.backup.azure.account-name",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.backup.azure.account-key",
    legacy: [
      "zeebe.broker.data.backup.azure.accountKey",
      "camunda.data.backup.azure.account-key",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.backup.azure.connection-string",
    legacy: [
      "zeebe.broker.data.backup.azure.connectionString",
      "camunda.data.backup.azure.connection-string",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.backup.azure.base-path",
    legacy: [
      "zeebe.broker.data.backup.azure.basePath",
      "camunda.data.backup.azure.base-path",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.backup.azure.create-container",
    legacy: [
      "zeebe.broker.data.backup.azure.createContainer",
      "camunda.data.backup.azure.create-container",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.backup.azure.sas-token.type",
    legacy: [
      "zeebe.broker.data.backup.azure.sasToken.type",
      "camunda.data.backup.azure.sas-token.type",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.backup.azure.sas-token.value",
    legacy: [
      "zeebe.broker.data.backup.azure.sasToken.value",
      "camunda.data.backup.azure.sas-token.value",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  {
    name: "camunda.data.primary-storage.backup.filesystem.base-path",
    legacy: [
      "zeebe.broker.data.backup.filesystem.basePath",
      "camunda.data.backup.filesystem.base-path",
    ],
    types: ["Direct mapping"],
    area: ["Data"],
  },
  // Section: Exporters
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
    area: ["Monitoring"],
  },

  // Section: Expression
  {
    name: "camunda.expression.timeout",
    legacy: ["zeebe.broker.experimental.engine.expression.timeout"],
    types: ["Direct mapping"],
    area: ["Expression"],
  },

  // Section: Monitoring
  {
    name: "camunda.monitoring.metrics.actor",
    legacy: ["zeebe.broker.experimental.features.enableActorMetrics"],
    types: ["Direct mapping"],
    area: ["Monitoring"],
  },
  {
    name: "camunda.monitoring.metrics.enable-exporter-execution-metrics",
    legacy: ["zeebe.broker.executionMetricsExporterEnabled"],
    types: ["Direct mapping"],
    area: ["Monitoring"],
  },
  {
    name: "camunda.monitoring.jfr",
    legacy: ["camunda.flags.jfr.metrics"],
    types: ["Direct mapping"],
    area: ["Monitoring"],
  },
  // Section: Processing
  {
    name: "camunda.processing.max-commands-in-batch",
    legacy: ["zeebe.broker.processingCfg.maxCommandsInBatch"],
    types: ["Direct mapping"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.enable-async-scheduled-tasks",
    legacy: ["zeebe.broker.processingCfg.enableAsyncScheduledTasks"],
    types: ["Direct mapping"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.scheduled-tasks-check-interval",
    legacy: ["zeebe.broker.processingCfg.scheduledTaskCheckInterval"],
    types: ["Direct mapping"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.skip-positions",
    legacy: ["zeebe.broker.processingCfg.skipPositions"],
    types: ["Direct mapping"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.engine.distribution.max-backoff-duration",
    legacy: [
      "zeebe.broker.experimental.engine.distribution.maxBackoffDuration",
    ],
    types: ["Direct mapping"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.engine.distribution.redistribution-interval",
    legacy: [
      "zeebe.broker.experimental.engine.distribution.redistributionInterval",
    ],
    types: ["Direct mapping"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.enable-preconditions-check",
    legacy: ["zeebe.broker.experimental.consistencyChecks.enablePreconditions"],
    types: ["Direct mapping"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.enable-foreign-key-checks",
    legacy: [
      "zeebe.broker.experimental.consistencyChecks.enableForeignKeyChecks",
    ],
    types: ["Direct mapping"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.enable-yielding-duedate-checker",
    legacy: ["zeebe.broker.experimental.features.enableYieldingDueDateChecker"],
    types: ["Direct mapping"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.enable-async-message-ttl-checker",
    legacy: ["zeebe.broker.experimental.features.enableMessageTtlCheckerAsync"],
    types: ["Direct mapping"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.enable-async-timer-duedate-checker",
    legacy: [
      "zeebe.broker.experimental.features.enableTimerDueDateCheckerAsync",
    ],
    types: ["Direct mapping"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.enable-straightthrough-processing-loop-detector",
    legacy: [
      "zeebe.broker.experimental.features.enableStraightThroughProcessingLoopDetector",
    ],
    types: ["Direct mapping"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.enable-message-body-on-expired",
    legacy: ["zeebe.broker.experimental.features.enableMessageBodyOnExpired"],
    types: ["Direct mapping"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.request.enabled",
    legacy: [
      "zeebe.broker.flowControl.request.enabled",
      "zeebe.broker.backpressure.enabled",
    ],
    types: ["Breaking change"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.request.windowed",
    legacy: [
      "zeebe.broker.flowControl.request.useWindowed",
      "zeebe.broker.backpressure.useWindowed",
    ],
    types: ["Breaking change"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.request.algorithm",
    legacy: [
      "zeebe.broker.flowControl.request.algorithm",
      "zeebe.broker.backpressure.algorithm",
    ],
    types: ["Breaking change"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.request.aimd.request-timeout",
    legacy: [
      "zeebe.broker.flowControl.request.aimd.requestTimeout",
      "zeebe.broker.backpressure.aimd.requestTimeout",
    ],
    types: ["Breaking change"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.request.aimd.initial-limit",
    legacy: [
      "zeebe.broker.flowControl.request.aimd.initialLimit",
      "zeebe.broker.backpressure.aimd.initialLimit",
    ],
    types: ["Breaking change"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.request.aimd.min-limit",
    legacy: [
      "zeebe.broker.flowControl.request.aimd.minLimit",
      "zeebe.broker.backpressure.aimd.minLimit",
    ],
    types: ["Breaking change"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.request.aimd.max-limit",
    legacy: [
      "zeebe.broker.flowControl.request.aimd.maxLimit",
      "zeebe.broker.backpressure.aimd.maxLimit",
    ],
    types: ["Breaking change"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.request.aimd.backoff-ratio",
    legacy: [
      "zeebe.broker.flowControl.request.aimd.backoffRatio",
      "zeebe.broker.backpressure.aimd.backoffRatio",
    ],
    types: ["Breaking change"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.request.fixed.limit",
    legacy: [
      "zeebe.broker.flowControl.request.fixed.limit",
      "zeebe.broker.backpressure.fixed.limit",
    ],
    types: ["Breaking change"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.request.gradient.min-limit",
    legacy: [
      "zeebe.broker.flowControl.request.gradient.minLimit",
      "zeebe.broker.backpressure.gradient.minLimit",
    ],
    types: ["Breaking change"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.request.gradient.initial-limit",
    legacy: [
      "zeebe.broker.flowControl.request.gradient.initialLimit",
      "zeebe.broker.backpressure.gradient.initialLimit",
    ],
    types: ["Breaking change"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.request.gradient.rtt-tolerance",
    legacy: [
      "zeebe.broker.flowControl.request.gradient.rttTolerance",
      "zeebe.broker.backpressure.gradient.rttTolerance",
    ],
    types: ["Breaking change"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.request.gradient2.min-limit",
    legacy: [
      "zeebe.broker.flowControl.request.gradient2.minLimit",
      "zeebe.broker.backpressure.gradient2.minLimit",
    ],
    types: ["Breaking change"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.request.gradient2.initial-limit",
    legacy: [
      "zeebe.broker.flowControl.request.gradient2.initialLimit",
      "zeebe.broker.backpressure.gradient2.initialLimit",
    ],
    types: ["Breaking change"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.request.gradient2.rtt-tolerance",
    legacy: [
      "zeebe.broker.flowControl.request.gradient2.rttTolerance",
      "zeebe.broker.backpressure.gradient2.rttTolerance",
    ],
    types: ["Breaking change"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.request.gradient2.long-window",
    legacy: [
      "zeebe.broker.flowControl.request.gradient2.longWindow",
      "zeebe.broker.backpressure.gradient2.longWindow",
    ],
    types: ["Breaking change"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.request.vegas.alpha",
    legacy: [
      "zeebe.broker.flowControl.request.vegas.alpha",
      "zeebe.broker.backpressure.vegas.alpha",
    ],
    types: ["Breaking change"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.request.vegas.beta",
    legacy: [
      "zeebe.broker.flowControl.request.vegas.beta",
      "zeebe.broker.backpressure.vegas.beta",
    ],
    types: ["Breaking change"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.request.vegas.initial-limit",
    legacy: [
      "zeebe.broker.flowControl.request.vegas.initialLimit",
      "zeebe.broker.backpressure.vegas.initialLimit",
    ],
    types: ["Breaking change"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.request.legacy-vegas.initial-limit",
    legacy: [
      "zeebe.broker.flowControl.request.legacy-vegas.initialLimit",
      "zeebe.broker.backpressure.legacy-vegas.initialLimit",
    ],
    types: ["Breaking change"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.request.legacy-vegas.max-concurrency",
    legacy: [
      "zeebe.broker.flowControl.request.legacyVegas.maxConcurrency",
      "zeebe.broker.backpressure.legacyVegas.maxConcurrency",
    ],
    types: ["Breaking change"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.request.legacy-vegas.alpha-limit",
    legacy: [
      "zeebe.broker.flowControl.request.legacyVegas.alphaLimit",
      "zeebe.broker.backpressure.legacyVegas.alphaLimit",
    ],
    types: ["Breaking change"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.request.legacy-vegas.beta-limit",
    legacy: [
      "zeebe.broker.flowControl.request.legacyVegas.betaLimit",
      "zeebe.broker.backpressure.legacyVegas.betaLimit",
    ],
    types: ["Breaking change"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.write.enabled",
    legacy: ["zeebe.broker.flowControl.write.enabled"],
    types: ["Direct mapping"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.write.limit",
    legacy: ["zeebe.broker.flowControl.write.limit"],
    types: ["Direct mapping"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.write.ramp-up",
    legacy: ["zeebe.broker.flowControl.write.rampUp"],
    types: ["Direct mapping"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.write.throttle.enabled",
    legacy: ["zeebe.broker.flowControl.write.throttling.enabled"],
    types: ["Direct mapping"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.write.throttle.acceptable-backlog",
    legacy: ["zeebe.broker.flowControl.write.throttling.acceptableBacklog"],
    types: ["Direct mapping"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.write.throttle.minimum-limit",
    legacy: ["zeebe.broker.flowControl.write.throttling.minimumLimit"],
    types: ["Direct mapping"],
    area: ["Processing"],
  },
  {
    name: "camunda.processing.flow-control.write.throttle.resolution",
    legacy: ["zeebe.broker.flowControl.write.throttling.resolution"],
    types: ["Direct mapping"],
    area: ["Processing"],
  },
  // Section: Security
  {
    name: "camunda.security.transport-layer-security.cluster.enabled",
    legacy: [
      "zeebe.broker.network.security.enabled=false",
      "zeebe.gateway.cluster.security.enabled",
    ],
    types: ["Direct mapping"],
    area: ["Security"],
  },
  {
    name: "camunda.security.transport-layer-security.cluster.certificate-chain-path",
    legacy: [
      "zeebe.broker.network.security.certificateChainPath",
      "zeebe.gateway.cluster.security.certificateChainPath",
    ],
    types: ["Direct mapping"],
    area: ["Security"],
  },
  {
    name: "camunda.security.transport-layer-security.cluster.certificate-private-key-path",
    legacy: [
      "zeebe.broker.network.security.certificatePrivateKeyPath",
      "zeebe.gateway.cluster.security.certificatePrivateKeyPath",
    ],
    types: ["Direct mapping"],
    area: ["Security"],
  },
  {
    name: "camunda.security.transport-layer-security.cluster.key-store.file-path",
    legacy: [
      "zeebe.broker.network.security.keyStore.filePath",
      "zeebe.gateway.cluster.security.keyStore.filePath",
    ],
    types: ["Direct mapping"],
    area: ["Security"],
  },
  {
    name: "camunda.security.transport-layer-security.cluster.key-store.password",
    legacy: [
      "zeebe.broker.network.security.keyStore.password",
      "zeebe.gateway.cluster.security.keyStore.password",
    ],
    types: ["Direct mapping"],
    area: ["Security"],
  },
];
