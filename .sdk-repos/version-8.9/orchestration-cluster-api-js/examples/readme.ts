// Compilable usage examples that appear in README.md.
// These snippets are synced into README.md by scripts/sync-readme-snippets.ts.
// They are type-checked during build (via tsc --noEmit) to guard against API drift.

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import createCamundaClient, {
  createCamundaResultClient,
  isOk,
  isSdkError,
  type JobActionReceipt,
  type JobKey,
  type JobResult,
  type ProcessDefinitionId,
  ProcessDefinitionKey,
  type ProcessInstanceKey,
} from '@camunda8/orchestration-cluster-api';
import { z } from 'zod';

// ---------------------------------------------------------------------------
// Quick Start
// ---------------------------------------------------------------------------

async function _readmeQuickStart() {
  //#region ReadmeQuickStart
  // Zero‑config construction: reads CAMUNDA_* from process.env. If no configuration is present, defaults to Camunda 8 Run on localhost.
  const camunda = createCamundaClient();

  const topology = await camunda.getTopology();
  console.log('Brokers:', topology.brokers?.length ?? 0);
  //#endregion ReadmeQuickStart
}

// ---------------------------------------------------------------------------
// Programmatic Overrides
// ---------------------------------------------------------------------------

async function _readmeOverrides() {
  //#region ReadmeOverrides
  const camunda = createCamundaClient({
    config: {
      CAMUNDA_REST_ADDRESS: 'https://cluster.example',
      CAMUNDA_AUTH_STRATEGY: 'BASIC',
      CAMUNDA_BASIC_AUTH_USERNAME: 'alice',
      CAMUNDA_BASIC_AUTH_PASSWORD: 'secret',
    },
  });
  //#endregion ReadmeOverrides
  void camunda;
}

// ---------------------------------------------------------------------------
// Custom Fetch
// ---------------------------------------------------------------------------

async function _readmeCustomFetch() {
  //#region ReadmeCustomFetch
  const camunda = createCamundaClient({
    fetch: (input, init) => {
      // inspect / modify request here
      return fetch(input, init);
    },
  });
  //#endregion ReadmeCustomFetch
  void camunda;
}

// ---------------------------------------------------------------------------
// Disable Retry
// ---------------------------------------------------------------------------

async function _readmeDisableRetry(jobKey: JobKey) {
  const camunda = createCamundaClient();
  //#region ReadmeDisableRetry
  // This call will not retry on transient errors
  await camunda.completeJob({ jobKey }, { retry: false });
  //#endregion ReadmeDisableRetry
}

// ---------------------------------------------------------------------------
// Override Retry Settings
// ---------------------------------------------------------------------------

async function _readmeRetryOverride(processDefinitionId: ProcessDefinitionId) {
  const camunda = createCamundaClient();
  //#region ReadmeRetryOverride
  // More aggressive retry for this operation only
  await camunda.createProcessInstance(
    { processDefinitionId },
    { retry: { maxAttempts: 8, maxDelayMs: 5000 } }
  );

  // Minimal retry: single retry with short backoff
  await camunda.getTopology({ retry: { maxAttempts: 2, baseDelayMs: 50 } });
  //#endregion ReadmeRetryOverride
}

// ---------------------------------------------------------------------------
// Job Worker Minimal
// ---------------------------------------------------------------------------

async function _readmeJobWorkerMinimal() {
  //#region ReadmeJobWorkerMinimal
  const client = createCamundaClient();

  // Define schemas (optional)
  const Input = z.object({ orderId: z.string() });
  const Output = z.object({ processed: z.boolean() });

  const worker = client.createJobWorker({
    jobType: 'process-order',
    maxParallelJobs: 10,
    jobTimeoutMs: 15_000, // long‑poll timeout (server side requestTimeout)
    pollIntervalMs: 100, // delay between polls when no jobs / at capacity
    // Optional: only fetch specific variables during activation
    fetchVariables: ['orderId'],
    inputSchema: Input, // validates incoming variables if validateSchemas true
    outputSchema: Output, // validates variables passed to complete(...)
    validateSchemas: true, // set false for max throughput (skip Zod)
    autoStart: true, // default true; start polling immediately
    startupJitterMaxSeconds: 5, // random delay up to 5s before first poll (default 0)
    jobHandler: (job) => {
      // Access typed variables
      const vars = job.variables; // inferred from Input schema
      console.log(`Processing order: ${vars.orderId}`);
      // Do work...
      return job.complete({ processed: true });
    },
  });

  // Later, on shutdown:
  process.on('SIGINT', () => {
    worker.stop();
  });
  //#endregion ReadmeJobWorkerMinimal
}

// ---------------------------------------------------------------------------
// Job Worker TypeScript Inference
// ---------------------------------------------------------------------------

async function _readmeJobWorkerInference() {
  const client = createCamundaClient();
  //#region ReadmeJobWorkerInference
  const Input = z.object({ orderId: z.string(), amount: z.number() });
  client.createJobWorker({
    jobType: 'process-order',
    maxParallelJobs: 5,
    jobTimeoutMs: 30_000,
    inputSchema: Input,
    // Only allows 'orderId' | 'amount' here at compile-time
    fetchVariables: ['orderId', 'amount'],
    jobHandler: async (job) => job.complete(),
  });
  //#endregion ReadmeJobWorkerInference
}

// ---------------------------------------------------------------------------
// Job Worker Startup Jitter
// ---------------------------------------------------------------------------

async function _readmeJobWorkerJitter() {
  const client = createCamundaClient();
  //#region ReadmeJobWorkerJitter
  client.createJobWorker({
    jobType: 'process-order',
    maxParallelJobs: 10,
    jobTimeoutMs: 30_000,
    startupJitterMaxSeconds: 5, // each instance delays 0–5s before first poll
    jobHandler: async (job) => job.complete(),
  });
  //#endregion ReadmeJobWorkerJitter
}

// ---------------------------------------------------------------------------
// Job Worker Graceful Shutdown
// ---------------------------------------------------------------------------

async function _readmeJobWorkerGraceful() {
  const client = createCamundaClient();
  const worker = client.createJobWorker({
    jobType: 'process-order',
    maxParallelJobs: 5,
    jobTimeoutMs: 30_000,
    jobHandler: async (job) => job.complete(),
  });

  //#region ReadmeJobWorkerGraceful
  // Attempt graceful drain for up to 8 seconds
  const { remainingJobs, timedOut } = await worker.stopGracefully({ waitUpToMs: 8000 });
  if (timedOut) {
    console.warn('Graceful stop timed out; remaining jobs:', remainingJobs);
  }
  //#endregion ReadmeJobWorkerGraceful
}

// ---------------------------------------------------------------------------
// Job Action Receipt
// ---------------------------------------------------------------------------

async function _readmeReceipt() {
  const client = createCamundaClient();
  const worker = client.createJobWorker({
    jobType: 'process-order',
    maxParallelJobs: 5,
    jobTimeoutMs: 30_000,
    jobHandler: async (job) => {
      //#region ReadmeReceipt
      const receipt: JobActionReceipt = await job.complete({ processed: true });
      //#endregion ReadmeReceipt
      return receipt;
    },
  });
  void worker;
}

// ---------------------------------------------------------------------------
// Job Corrections (User Task Listeners)
// ---------------------------------------------------------------------------

async function _readmeJobCorrections() {
  const client = createCamundaClient();
  //#region ReadmeJobCorrections
  const worker = client.createJobWorker({
    jobType: 'io.camunda:userTaskListener',
    jobTimeoutMs: 30_000,
    maxParallelJobs: 5,
    jobHandler: async (job) => {
      const result: JobResult = {
        type: 'userTask',
        corrections: {
          assignee: 'corrected-user',
          priority: 80,
        },
      };
      return job.complete({}, result);
    },
  });
  //#endregion ReadmeJobCorrections
  void worker;
}

async function _readmeJobCorrectionsDenial() {
  const client = createCamundaClient();
  const worker = client.createJobWorker({
    jobType: 'io.camunda:userTaskListener',
    jobTimeoutMs: 30_000,
    maxParallelJobs: 5,
    jobHandler: async (job) => {
      //#region ReadmeJobCorrectionsDenial
      return job.complete(
        {},
        {
          type: 'userTask',
          denied: true,
          deniedReason: 'Insufficient documentation',
        }
      );
      //#endregion ReadmeJobCorrectionsDenial
    },
  });
  void worker;
}

// ---------------------------------------------------------------------------
// Threaded Job Handler Module
// ---------------------------------------------------------------------------

// NOTE: The ReadmeThreadedHandler snippet in the README is pseudo-code
// (references heavyComputation, uses export default). It cannot be
// type-checked in this file, so it is not auto-synced.

// ---------------------------------------------------------------------------
// Threaded Job Worker Minimal
// ---------------------------------------------------------------------------

async function _readmeThreadedWorker() {
  //#region ReadmeThreadedWorker
  const client = createCamundaClient();

  const worker = client.createThreadedJobWorker({
    jobType: 'cpu-heavy-task',
    handlerModule: path.join(path.dirname(fileURLToPath(import.meta.url)), 'my-handler.js'),
    maxParallelJobs: 32,
    jobTimeoutMs: 30_000,
  });
  //#endregion ReadmeThreadedWorker
  void worker;
}

// ---------------------------------------------------------------------------
// Branded Keys
// ---------------------------------------------------------------------------

function _readmeBrandedKeys() {
  //#region ReadmeBrandedKeys
  const defKey = ProcessDefinitionKey.assumeExists('2251799813686749');
  // @ts-expect-error – cannot assign def key to instance key
  const bad: ProcessInstanceKey = defKey;
  //#endregion ReadmeBrandedKeys
  void bad;
}

// ---------------------------------------------------------------------------
// Cancelable Operations
// ---------------------------------------------------------------------------

async function _readmeCancelable(defKey: ProcessDefinitionKey) {
  const camunda = createCamundaClient();
  //#region ReadmeCancelable
  const p = camunda.searchProcessInstances(
    { filter: { processDefinitionKey: defKey } },
    { consistency: { waitUpToMs: 0 } }
  );
  setTimeout(() => p.cancel(), 100); // best‑effort cancel
  try {
    await p; // resolves if not cancelled
  } catch (e) {
    if (isSdkError(e) && e.name === 'CancelSdkError') {
      console.log('Operation cancelled');
    } else throw e;
  }
  //#endregion ReadmeCancelable
}

// ---------------------------------------------------------------------------
// Eventual Consistency
// ---------------------------------------------------------------------------

async function _readmeEventualConsistency() {
  const camunda = createCamundaClient();
  //#region ReadmeEventualConsistency
  const jobs = await camunda.searchJobs(
    {
      filter: { type: 'payment' },
    },
    {
      consistency: {
        waitUpToMs: 5000,
        pollIntervalMs: 200,
        trace: true,
        predicate: (r) => Array.isArray(r.items) && r.items.some((j) => j.state === 'CREATED'),
      },
    }
  );
  //#endregion ReadmeEventualConsistency
  void jobs;
}

// ---------------------------------------------------------------------------
// Logging
// ---------------------------------------------------------------------------

async function _readmeLogging() {
  //#region ReadmeLogging
  const client = createCamundaClient({
    log: {
      level: 'info',
      transport: (evt) => {
        // evt: { level, scope, ts, args, code?, data? }
        console.log(JSON.stringify(evt));
      },
    },
  });

  const log = client.logger('worker');
  log.debug(() => ['expensive detail only if enabled', { meta: 1 }]);
  log.code('info', 'WORK_START', 'Starting work loop', { pid: process.pid });
  //#endregion ReadmeLogging
}

// ---------------------------------------------------------------------------
// Typed Error Handling
// ---------------------------------------------------------------------------

async function _readmeErrorHandling() {
  //#region ReadmeErrorHandling
  const client = createCamundaClient();

  try {
    await client.getTopology();
  } catch (e) {
    if (isSdkError(e)) {
      switch (e.name) {
        case 'HttpSdkError':
          console.error('HTTP failure', e.status, e.operationId);
          break;
        case 'ValidationSdkError':
          console.error('Validation issue on', e.operationId, e.side, e.issues);
          break;
        case 'AuthSdkError':
          console.error('Auth problem', e.message, e.status);
          break;
        case 'CancelSdkError':
          console.error('Operation cancelled', e.operationId);
          break;
        case 'NetworkSdkError':
          console.error('Network layer error', e.message);
          break;
      }
      return;
    }
    // Non-SDK (programmer) error; rethrow or wrap
    throw e;
  }
  //#endregion ReadmeErrorHandling
}

// ---------------------------------------------------------------------------
// Result Client
// ---------------------------------------------------------------------------

async function _readmeResultClient() {
  const file = new File(['<xml/>'], 'process.bpmn', { type: 'application/xml' });
  //#region ReadmeResultClient
  const camundaR = createCamundaResultClient();
  const res = await camundaR.createDeployment({ resources: [file] });
  if (isOk(res)) {
    console.log('Deployment key', res.value.deploymentKey);
  } else {
    console.error('Deployment failed', res.error);
  }
  //#endregion ReadmeResultClient
}

// ---------------------------------------------------------------------------
// Browser Deployment
// ---------------------------------------------------------------------------

async function _readmeDeployBrowser() {
  const camunda = createCamundaClient();
  //#region ReadmeDeployBrowser
  const bpmnXml = `<definitions id="process" xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL">...</definitions>`;
  const file = new File([bpmnXml], 'order-process.bpmn', { type: 'application/xml' });
  const result = await camunda.createDeployment({ resources: [file] });
  console.log(result.deployments.length);
  //#endregion ReadmeDeployBrowser
}

// ---------------------------------------------------------------------------
// Node Deployment
// ---------------------------------------------------------------------------

async function _readmeDeployNode() {
  const camunda = createCamundaClient();
  //#region ReadmeDeployNode
  const result = await camunda.deployResourcesFromFiles([
    './bpmn/order-process.bpmn',
    './dmn/discount.dmn',
    './forms/order.form',
  ]);

  console.log(result.processes.map((p) => p.processDefinitionId));
  console.log(result.decisions.length);
  //#endregion ReadmeDeployNode
}

// ---------------------------------------------------------------------------
// Testing Patterns
// ---------------------------------------------------------------------------

async function _readmeTestingClient() {
  //#region ReadmeTestingClient
  const client = createCamundaClient({
    config: { CAMUNDA_REST_ADDRESS: 'http://localhost:8080', CAMUNDA_AUTH_STRATEGY: 'NONE' },
  });
  //#endregion ReadmeTestingClient
  void client;
}

async function _readmeTestingMock() {
  //#region ReadmeTestingMock
  const client = createCamundaClient({
    fetch: async (_input, _init) => new Response(JSON.stringify({ ok: true }), { status: 200 }),
  });
  //#endregion ReadmeTestingMock
  void client;
}

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Heritable Worker Defaults
// ---------------------------------------------------------------------------

async function _readmeWorkerDefaultsEnv() {
  const client = createCamundaClient();

  //#region ReadmeWorkerDefaultsEnv
  // Workers inherit timeout, concurrency, and name from environment
  const w1 = client.createJobWorker({
    jobType: 'validate-order',
    jobHandler: async (job) => job.complete(),
  });

  const w2 = client.createJobWorker({
    jobType: 'ship-order',
    jobHandler: async (job) => job.complete(),
  });

  // Per-worker override: this worker uses 32 concurrent jobs instead of the global 8
  const w3 = client.createJobWorker({
    jobType: 'bulk-import',
    maxParallelJobs: 32,
    jobHandler: async (job) => job.complete(),
  });
  //#endregion ReadmeWorkerDefaultsEnv

  void w1;
  void w2;
  void w3;
}

async function _readmeWorkerDefaultsClient() {
  //#region ReadmeWorkerDefaultsClient
  const client = createCamundaClient({
    config: {
      CAMUNDA_WORKER_TIMEOUT: 30000,
      CAMUNDA_WORKER_MAX_CONCURRENT_JOBS: 8,
    },
  });
  //#endregion ReadmeWorkerDefaultsClient
  void client;
}

// ---------------------------------------------------------------------------
// Job Completion Patterns
// ---------------------------------------------------------------------------

async function _readmeJobCompletionPatterns() {
  const client = createCamundaClient();
  const worker = client.createJobWorker({
    jobType: 'example',
    maxParallelJobs: 1,
    jobTimeoutMs: 30_000,
    jobHandler: async (job) => {
      //#region ReadmeJobCompletionPatterns
      // GOOD: explicit completion
      return job.complete({ variables: { processed: true } });

      // GOOD: No-arg completion example, sentinel stored for ultimate return
      const ack = await job.complete();
      // ...
      return ack;

      // GOOD: explicit ignore
      const ack2 = await job.ignore();
      //#endregion ReadmeJobCompletionPatterns
      return ack2;
    },
  });
  void worker;
}

// ---------------------------------------------------------------------------
// Backpressure State Shape
// ---------------------------------------------------------------------------

function _readmeBackpressureState() {
  const client = createCamundaClient();
  //#region ReadmeBackpressureState
  const state = client.getBackpressureState();
  // state.severity: 'healthy' | 'soft' | 'severe'
  // state.consecutive: number — consecutive backpressure signals observed
  // state.permitsMax: number | null — current concurrency cap (null => unlimited/not engaged)
  // state.permitsCurrent: number — currently acquired permits
  // state.waiters: number — queued operations waiting for a permit
  //#endregion ReadmeBackpressureState
  void state;
}

// ---------------------------------------------------------------------------
// Threaded Worker Lifecycle
// ---------------------------------------------------------------------------

async function _readmeThreadedLifecycle() {
  const client = createCamundaClient();
  //#region ReadmeThreadedLifecycle
  // Returned by getWorkers()
  const allWorkers = client.getWorkers();

  // Stopped by stopAllWorkers()
  client.stopAllWorkers();
  //#endregion ReadmeThreadedLifecycle
  void allWorkers;
}

async function _readmeThreadedGraceful() {
  const client = createCamundaClient();
  const worker = client.createJobWorker({
    jobType: 'example',
    maxParallelJobs: 1,
    jobTimeoutMs: 30_000,
    jobHandler: async (job) => job.complete(),
  });
  //#region ReadmeThreadedGraceful
  // Graceful shutdown (waits for in-flight jobs to finish)
  const { timedOut, remainingJobs } = await worker.stopGracefully({ waitUpToMs: 10_000 });
  //#endregion ReadmeThreadedGraceful
  void timedOut;
  void remainingJobs;
}

function _readmePoolStats() {
  const client = createCamundaClient();
  const worker = client.createThreadedJobWorker({
    jobType: 'example',
    handlerModule: './handler.js',
    maxParallelJobs: 1,
    jobTimeoutMs: 30_000,
  });
  //#region ReadmePoolStats
  worker.poolSize; // number of threads
  worker.busyThreads; // threads currently processing a job
  worker.activeJobs; // total jobs dispatched but not yet completed
  //#endregion ReadmePoolStats
}

// Suppress "declared but never read"
void _readmeQuickStart;
void _readmeOverrides;
void _readmeCustomFetch;
void _readmeDisableRetry;
void _readmeRetryOverride;
void _readmeJobWorkerMinimal;
void _readmeJobWorkerInference;
void _readmeJobWorkerJitter;
void _readmeJobWorkerGraceful;
void _readmeReceipt;
void _readmeThreadedWorker;
void _readmeBrandedKeys;
void _readmeCancelable;
void _readmeEventualConsistency;
void _readmeLogging;
void _readmeErrorHandling;
void _readmeResultClient;
void _readmeDeployBrowser;
void _readmeDeployNode;
void _readmeTestingClient;
void _readmeTestingMock;
void _readmeWorkerDefaultsEnv;
void _readmeWorkerDefaultsClient;
void _readmeJobCompletionPatterns;
void _readmeBackpressureState;
void _readmeThreadedLifecycle;
void _readmeThreadedGraceful;
void _readmePoolStats;
