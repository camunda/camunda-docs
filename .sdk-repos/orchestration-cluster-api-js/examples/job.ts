// Compilable usage examples for job operations.
// These examples are type-checked during build to guard against API regressions.

import {
  createCamundaClient,
  type JobActionReceipt,
  type JobKey,
} from '@camunda8/orchestration-cluster-api';

//#region ActivateJobs
async function activateJobsExample() {
  const camunda = createCamundaClient();

  const result = await camunda.activateJobs({
    type: 'payment-processing',
    timeout: 30000,
    maxJobsToActivate: 5,
  });

  for (const job of result.jobs) {
    console.log(`Job ${job.jobKey}: ${job.type}`);

    // Each enriched job has helper methods
    await job.complete({ paymentId: 'PAY-123' });
  }
}
//#endregion ActivateJobs

//#region CompleteJob
async function completeJobExample(jobKey: JobKey) {
  const camunda = createCamundaClient();

  await camunda.completeJob({
    jobKey,
    variables: {
      paymentId: 'PAY-123',
      status: 'completed',
    },
  });
}
//#endregion CompleteJob

//#region FailJob
async function failJobExample(jobKey: JobKey) {
  const camunda = createCamundaClient();

  await camunda.failJob({
    jobKey,
    retries: 2,
    errorMessage: 'Payment gateway timeout',
    retryBackOff: 5000,
  });
}
//#endregion FailJob

//#region CreateJobWorker
async function createJobWorkerExample() {
  const camunda = createCamundaClient();

  const _worker = camunda.createJobWorker({
    jobType: 'payment-processing',
    jobTimeoutMs: 30000,
    maxParallelJobs: 5,
    jobHandler: async (job): Promise<JobActionReceipt> => {
      console.log(`Processing job ${job.jobKey}`);
      return job.complete({ processed: true });
    },
  });

  // Workers run continuously until closed
  // worker.close();
}
//#endregion CreateJobWorker

//#region JobWorker
async function jobWorkerExample() {
  const camunda = createCamundaClient();

  const _worker = camunda.createJobWorker({
    jobType: 'payment-processing',
    jobTimeoutMs: 30000,
    maxParallelJobs: 5,
    jobHandler: async (job): Promise<JobActionReceipt> => {
      const orderId = job.variables.orderId;
      console.log(`Processing order: ${orderId}`);

      // Complete the job with result variables
      return job.complete({ paymentId: 'PAY-123' });
    },
  });

  // Workers run until closed
  // worker.close();
}
//#endregion JobWorker

//#region JobWorkerWithErrorHandling
async function jobWorkerWithErrorHandlingExample() {
  const camunda = createCamundaClient();

  const worker = camunda.createJobWorker({
    jobType: 'email-sending',
    jobTimeoutMs: 60000,
    maxParallelJobs: 10,
    pollIntervalMs: 300,
    jobHandler: async (job): Promise<JobActionReceipt> => {
      try {
        console.log(`Sending email for job ${job.jobKey}`);
        return job.complete({ sent: true });
      } catch (err) {
        return job.fail({
          errorMessage: String(err),
          retries: (job.retries ?? 1) - 1,
        });
      }
    },
  });

  void worker;
}
//#endregion JobWorkerWithErrorHandling

//#region CreateThreadedJobWorker
async function createThreadedJobWorkerExample() {
  const camunda = createCamundaClient();

  const _worker = camunda.createThreadedJobWorker({
    jobType: 'cpu-heavy-task',
    handlerModule: './my-handler.js',
    maxParallelJobs: 32,
    jobTimeoutMs: 30000,
  });
}
//#endregion CreateThreadedJobWorker

//#region GetWorkers
function getWorkersExample() {
  const camunda = createCamundaClient();

  camunda.createJobWorker({
    jobType: 'payment-processing',
    jobHandler: async (job): Promise<JobActionReceipt> => job.complete(),
  });

  const workers = camunda.getWorkers();
  console.log(`Active workers: ${workers.length}`);
}
//#endregion GetWorkers

//#region StopAllWorkers
function stopAllWorkersExample() {
  const camunda = createCamundaClient();

  camunda.createJobWorker({
    jobType: 'payment-processing',
    jobHandler: async (job): Promise<JobActionReceipt> => job.complete(),
  });

  // Stop all workers and terminate thread pool
  camunda.stopAllWorkers();
}
//#endregion StopAllWorkers

//#region GetBackpressureState
function getBackpressureStateExample() {
  const camunda = createCamundaClient();

  const state = camunda.getBackpressureState();
  console.log(`Severity: ${state.severity}, Permits: ${state.permitsMax}`);
}
//#endregion GetBackpressureState

// Suppress "declared but never read"
void activateJobsExample;
void completeJobExample;
void failJobExample;
void createJobWorkerExample;
void jobWorkerExample;
void jobWorkerWithErrorHandlingExample;
void createThreadedJobWorkerExample;
void getWorkersExample;
void stopAllWorkersExample;
void getBackpressureStateExample;
