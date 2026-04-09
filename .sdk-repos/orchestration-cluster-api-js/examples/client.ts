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

// Suppress "declared but never read" — these are compile-only examples
void createClientExample;
void createClientWithConfigExample;
void createClientOAuthExample;
void getTopologyExample;
void resultClientExample;
void customFetchExample;
