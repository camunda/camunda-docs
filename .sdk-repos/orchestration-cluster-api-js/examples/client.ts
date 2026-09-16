// Compilable usage examples for client construction and configuration.
// These examples are type-checked during build to guard against API regressions.

import {
  createCamundaClient,
  createCamundaResultClient,
  isErr,
  isOk,
} from '@camunda8/orchestration-cluster-api';

//#region CreateClient
async function createClientExample() {
  // Uses environment variables for configuration (CAMUNDA_REST_ADDRESS, etc.)
  const camunda = createCamundaClient();

  const topology = await camunda.getTopology();
  console.log(`Cluster size: ${topology.clusterSize}`);
}
//#endregion CreateClient

//#region CreateClientWithConfig
async function createClientWithConfigExample() {
  const camunda = createCamundaClient({
    config: {
      CAMUNDA_REST_ADDRESS: 'http://localhost:8080/v2',
      CAMUNDA_AUTH_STRATEGY: 'BASIC',
      CAMUNDA_BASIC_AUTH_USERNAME: 'demo',
      CAMUNDA_BASIC_AUTH_PASSWORD: 'demo',
    },
  });

  const topology = await camunda.getTopology();
  console.log(`Partitions: ${topology.partitionsCount}`);
}
//#endregion CreateClientWithConfig

//#region CreateClientOAuth
async function createClientOAuthExample() {
  const camunda = createCamundaClient({
    config: {
      CAMUNDA_REST_ADDRESS: 'https://cluster.example/v2',
      CAMUNDA_AUTH_STRATEGY: 'OAUTH',
      CAMUNDA_CLIENT_ID: 'my-client-id',
      CAMUNDA_CLIENT_SECRET: 'my-client-secret',
      CAMUNDA_OAUTH_URL: 'https://login.cloud.camunda.io/oauth/token',
      CAMUNDA_TOKEN_AUDIENCE: 'zeebe.camunda.io',
    },
  });

  const topology = await camunda.getTopology();
  console.log(`Brokers: ${topology.brokers?.length}`);
}
//#endregion CreateClientOAuth

//#region GetTopology
async function getTopologyExample() {
  const camunda = createCamundaClient();

  const topology = await camunda.getTopology();

  console.log(`Cluster size: ${topology.clusterSize}`);
  console.log(`Partitions: ${topology.partitionsCount}`);
  for (const broker of topology.brokers ?? []) {
    console.log(`  Broker ${broker.nodeId}: ${broker.host}:${broker.port}`);
  }
}
//#endregion GetTopology

//#region GetClusterTopology
async function getClusterTopologyExample() {
  const camunda = createCamundaClient();

  // Returns the full cluster topology: brokers, physical tenants (in a
  // multi-tenant cluster), cluster size, and gateway version.
  const topology = await camunda.getClusterTopology();

  console.log(
    `Cluster ${topology.clusterId} — ${topology.clusterSize} broker(s), gateway ${topology.gatewayVersion}`
  );
  for (const broker of topology.brokers) {
    console.log(`  Broker ${broker.brokerId}: ${broker.host}:${broker.port} (${broker.version})`);
  }
  for (const tenant of topology.physicalTenants) {
    console.log(
      `  Physical tenant ${tenant.physicalTenantId}: ${tenant.partitionsCount} partition(s), replication ${tenant.replicationFactor}`
    );
  }
}
//#endregion GetClusterTopology

//#region ChangeClusterMode
async function changeClusterModeExample() {
  const camunda = createCamundaClient();

  // Transition the cluster into recovery mode. Pass `dryRun: true` to validate
  // the request and inspect the resulting plan without applying it. Omit it (or
  // set it to false) to actually trigger the transition.
  const change = await camunda.changeClusterMode({
    mode: 'RECOVERING',
    dryRun: true,
  });

  // Operations are grouped by physical tenant; a null tenant means the operation
  // is not scoped to one, such as a broker lifecycle operation.
  console.log(`Cluster change ${change.changeId}:`);
  for (const group of change.plannedChanges) {
    console.log(`  ${group.physicalTenantId ?? 'cluster-wide'}:`);
    for (const op of group.operations) {
      console.log(`    ${op.operation}${op.mode ? ` -> ${op.mode}` : ''}`);
    }
  }
}
//#endregion ChangeClusterMode

//#region ChangeClusterModeAsClusterAdmin
async function changeClusterModeAsClusterAdminExample() {
  const camunda = createCamundaClient();

  // The cluster-admin variant can target a single physical tenant. Omit
  // `physicalTenantId` to apply the change to every physical tenant.
  const change = await camunda.changeClusterModeAsClusterAdmin({
    mode: 'RECOVERING',
    physicalTenantId: 'default',
    dryRun: true,
  });

  console.log(`Cluster change ${change.changeId}:`);
  for (const group of change.plannedChanges) {
    console.log(`  ${group.physicalTenantId ?? 'cluster-wide'}:`);
    for (const op of group.operations) {
      console.log(`    ${op.operation}${op.mode ? ` -> ${op.mode}` : ''}`);
    }
  }
}
//#endregion ChangeClusterModeAsClusterAdmin

//#region Restore
async function restoreExample() {
  const camunda = createCamundaClient();

  // The cluster must be in recovery mode before a restore is accepted. Provide
  // either a list of backup IDs (one per partition) or a time range (`from`/`to`)
  // that selects the backups to restore, but not both.
  const change = await camunda.restore({
    backupIds: [100, 101],
  });

  console.log(`Cluster change ${change.changeId}:`);
  for (const group of change.plannedChanges) {
    console.log(`  ${group.physicalTenantId ?? 'cluster-wide'}:`);
    for (const op of group.operations) {
      const mode = 'mode' in op ? op.mode : undefined;
      console.log(`    ${op.operation}${mode ? ` -> ${mode}` : ''}`);
    }
  }
}
//#endregion Restore

//#region RestoreAsClusterAdmin
async function restoreAsClusterAdminExample() {
  const camunda = createCamundaClient();

  // The cluster-admin variant can target a specific physical tenant and supports
  // per-tenant overrides. Omit `physicalTenantId` to restore every physical
  // tenant. Provide either backup IDs (one per partition) or a time range
  // (`from`/`to`), but not both.
  const change = await camunda.restoreAsClusterAdmin({
    backupIds: [200, 201],
    physicalTenantId: 'default',
    dryRun: true,
  });

  console.log(`Cluster change ${change.changeId}:`);
  for (const group of change.plannedChanges) {
    console.log(`  ${group.physicalTenantId ?? 'cluster-wide'}:`);
    for (const op of group.operations) {
      const mode = 'mode' in op ? op.mode : undefined;
      console.log(`    ${op.operation}${mode ? ` -> ${mode}` : ''}`);
    }
  }
}
//#endregion RestoreAsClusterAdmin

//#region GetRestoreStatus
async function getRestoreStatusExample() {
  const camunda = createCamundaClient();

  const status = await camunda.getRestoreStatus();

  console.log(`Restore status: ${status.status} (change ${status.changeId})`);
  for (const broker of status.brokers) {
    console.log(
      `  Broker ${broker.brokerId}: ${broker.partitionsRestored}/${broker.partitionsToRestore} partitions restored`
    );
  }
}
//#endregion GetRestoreStatus

//#region ResultClient
async function resultClientExample() {
  const camunda = createCamundaResultClient({
    config: { CAMUNDA_REST_ADDRESS: 'http://localhost:8080/v2' },
  });

  const result = await camunda.getTopology();

  if (isOk(result)) {
    console.log(`Cluster size: ${result.value.clusterSize}`);
  }
  if (isErr(result)) {
    console.error(`Error: ${result.error}`);
  }
}
//#endregion ResultClient

//#region CustomFetch
async function customFetchExample() {
  const camunda = createCamundaClient({
    config: { CAMUNDA_REST_ADDRESS: 'http://localhost:8080/v2' },
    fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
      // Add custom headers or logging
      const response = await globalThis.fetch(input, init);
      return response;
    },
  });

  const topology = await camunda.getTopology();
  console.log(`Cluster size: ${topology.clusterSize}`);
}
//#endregion CustomFetch

//#region Config
function configExample() {
  const camunda = createCamundaClient({
    config: { CAMUNDA_REST_ADDRESS: 'http://localhost:8080/v2' },
  });

  const config = camunda.config;
  console.log(`REST address: ${config.restAddress}`);
}
//#endregion Config

//#region GetConfig
function getConfigExample() {
  const camunda = createCamundaClient();

  const config = camunda.getConfig();
  console.log(`Auth strategy: ${config.auth.strategy}`);
}
//#endregion GetConfig

//#region Configure
async function configureExample() {
  const camunda = createCamundaClient();

  // Reconfigure the client with new overrides
  camunda.configure({
    config: {
      CAMUNDA_REST_ADDRESS: 'http://new-host:8080/v2',
    },
  });

  const topology = await camunda.getTopology();
  console.log(`Cluster size: ${topology.clusterSize}`);
}
//#endregion Configure

//#region GetAuthHeaders
async function getAuthHeadersExample() {
  const camunda = createCamundaClient();

  const headers = await camunda.getAuthHeaders();
  console.log(`Auth headers: ${JSON.stringify(headers)}`);
}
//#endregion GetAuthHeaders

//#region ForceAuthRefresh
async function forceAuthRefreshExample() {
  const camunda = createCamundaClient();

  // Force a fresh token exchange, bypassing any cached token
  await camunda.forceAuthRefresh();
}
//#endregion ForceAuthRefresh

//#region ClearAuthCache
function clearAuthCacheExample() {
  const camunda = createCamundaClient();

  // Clear all cached auth tokens
  camunda.clearAuthCache();

  // Or selectively clear
  camunda.clearAuthCache({ memory: true, disk: false });
}
//#endregion ClearAuthCache

//#region WithCorrelation
async function withCorrelationExample() {
  const camunda = createCamundaClient();

  // Run operations with a correlation ID for tracing
  await camunda.withCorrelation('request-123', async () => {
    const topology = await camunda.getTopology();
    console.log(`Cluster size: ${topology.clusterSize}`);
  });
}
//#endregion WithCorrelation

// Suppress "declared but never read" — these are compile-only examples
void createClientExample;
void createClientWithConfigExample;
void createClientOAuthExample;
void getTopologyExample;
void changeClusterModeExample;
void changeClusterModeAsClusterAdminExample;
void getRestoreStatusExample;
void restoreExample;
void restoreAsClusterAdminExample;
void getClusterTopologyExample;
void resultClientExample;
void customFetchExample;
void configExample;
void getConfigExample;
void configureExample;
void getAuthHeadersExample;
void forceAuthRefreshExample;
void clearAuthCacheExample;
void withCorrelationExample;
