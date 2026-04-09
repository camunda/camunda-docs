# Compilable usage examples for job and job worker operations.
# These examples are type-checked during build to guard against API regressions.
from __future__ import annotations

from camunda_orchestration_sdk import (
    CamundaAsyncClient,
    CamundaClient,
    ConnectedJobContext,
    JobActivationRequest,
    JobCompletionRequest,
    JobCompletionRequestVariables,
    JobError,
    JobFailRequest,
    JobFailure,
    JobKey,
    SyncJobContext,
    WorkerConfig,
)


# region ActivateJobs
async def activate_jobs_example() -> None:
    async with CamundaAsyncClient() as client:
        result = await client.activate_jobs(
            data=JobActivationRequest(
                type_="payment-processing",
                timeout=30000,
                max_jobs_to_activate=5,
            )
        )

        for job in result.jobs:
            print(f"Job {job.job_key}: {job.type_}")
# endregion ActivateJobs


# region CompleteJob
def complete_job_example(job_key: JobKey) -> None:
    client = CamundaClient()

    client.complete_job(
        job_key=job_key,
        data=JobCompletionRequest(
            variables=JobCompletionRequestVariables.from_dict(
                {"paymentId": "PAY-123", "status": "completed"}
            )
        ),
    )
# endregion CompleteJob


# region FailJob
def fail_job_example(job_key: JobKey) -> None:
    client = CamundaClient()

    client.fail_job(
        job_key=job_key,
        data=JobFailRequest(
            retries=2,
            error_message="Payment gateway timeout",
            retry_back_off=5000,
        ),
    )
# endregion FailJob


# region CreateJobWorker
async def create_job_worker_example() -> None:
    async with CamundaAsyncClient() as client:
        config = WorkerConfig(
            job_type="payment-processing",
            job_timeout_milliseconds=30_000,
            max_concurrent_jobs=5,
        )

        async def handler(job: ConnectedJobContext) -> dict[str, object]:
            job.log.info(f"Processing job {job.job_key}")
            return {"processed": True}

        client.create_job_worker(config=config, callback=handler)

        # Workers run continuously until cancelled
        await client.run_workers()
# endregion CreateJobWorker


# region JobWorkerWithErrorHandling
async def job_worker_with_error_handling_example() -> None:
    async with CamundaAsyncClient() as client:
        config = WorkerConfig(
            job_type="email-sending",
            job_timeout_milliseconds=60_000,
            max_concurrent_jobs=10,
        )

        async def handler(job: ConnectedJobContext) -> dict[str, object]:
            # Raise JobError to throw a BPMN error
            if not job.variables:
                raise JobError("MISSING_DATA", "No variables provided")

            # Raise JobFailure to fail with custom retries/backoff
            recipient = job.variables.to_dict().get("recipient")
            if not recipient:
                raise JobFailure(
                    "Missing recipient address",
                    retries=0,
                    retry_back_off=0,
                )

            print(f"Sending email for job {job.job_key}")
            return {"sent": True}

        client.create_job_worker(config=config, callback=handler)
        await client.run_workers()
# endregion JobWorkerWithErrorHandling


# region SyncJobWorkerCallback
async def sync_job_worker_callback_example() -> None:
    async with CamundaAsyncClient() as client:
        config = WorkerConfig(
            job_type="cpu-intensive-task",
            job_timeout_milliseconds=120_000,
        )

        # Sync callbacks run in a thread pool by default
        def handler(job: SyncJobContext) -> dict[str, object]:
            # CPU-bound or blocking I/O work
            return {"result": "computed"}

        client.create_job_worker(config=config, callback=handler)
        await client.run_workers()
# endregion SyncJobWorkerCallback
