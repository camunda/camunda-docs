"""README code examples — type-checked during build to ensure accuracy.

These snippets are synced into README.md by scripts/sync-readme-snippets.py.
Edit these examples to update the corresponding README code blocks.
"""

# pyright: reportUnusedVariable=false, reportUnusedFunction=false
# ruff: noqa: F841

from __future__ import annotations


# ---------- Using the SDK ----------


def readme_sync_client() -> None:
    # region ReadmeSyncClient
    # Sync
    from camunda_orchestration_sdk import CamundaClient

    with CamundaClient() as client:
        topology = client.get_topology()
    # endregion ReadmeSyncClient


def readme_async_client() -> None:
    # region ReadmeAsyncClient
    # Async
    import asyncio

    from camunda_orchestration_sdk import CamundaAsyncClient

    async def main() -> None:
        async with CamundaAsyncClient() as client:
            topology = await client.get_topology()

    asyncio.run(main())
    # endregion ReadmeAsyncClient


# ---------- Semantic Types ----------


def readme_semantic_types() -> None:
    # region ReadmeSemanticTypes
    from camunda_orchestration_sdk import CamundaClient, ProcessCreationByKey

    client = CamundaClient()

    # Deploy → the response already carries typed keys
    deployment = client.deploy_resources_from_files(["process.bpmn"])
    process_key = deployment.processes[0].process_definition_key  # ProcessDefinitionKey

    # Pass it directly to another call — no conversion needed
    result = client.create_process_instance(
        data=ProcessCreationByKey(process_definition_key=process_key)
    )

    # The result also carries typed keys
    instance_key = result.process_instance_key  # ProcessInstanceKey
    client.cancel_process_instance(process_instance_key=instance_key)
    # endregion ReadmeSemanticTypes


# ---------- Quick start ----------


def readme_zero_config() -> None:
    # region ReadmeZeroConfig
    from camunda_orchestration_sdk import CamundaAsyncClient, CamundaClient

    # Zero-config construction: reads CAMUNDA_* from the environment
    client = CamundaClient()
    async_client = CamundaAsyncClient()
    # endregion ReadmeZeroConfig


# ---------- .env loading ----------


def readme_env_file_loading() -> None:
    # region ReadmeEnvFileLoading
    from camunda_orchestration_sdk import CamundaClient

    client = CamundaClient(configuration={"CAMUNDA_LOAD_ENVFILE": "true"})
    # endregion ReadmeEnvFileLoading


# ---------- Programmatic configuration ----------


def readme_programmatic_config() -> None:
    # region ReadmeProgrammaticConfig
    from camunda_orchestration_sdk import CamundaClient

    client = CamundaClient(
        configuration={
            "CAMUNDA_REST_ADDRESS": "http://localhost:8080/v2",
            "CAMUNDA_AUTH_STRATEGY": "NONE",
        }
    )
    # endregion ReadmeProgrammaticConfig


# ---------- Basic auth ----------


def readme_basic_auth() -> None:
    # region ReadmeBasicAuth
    from camunda_orchestration_sdk import CamundaClient

    client = CamundaClient(
        configuration={
            "CAMUNDA_REST_ADDRESS": "http://localhost:8080/v2",
            "CAMUNDA_AUTH_STRATEGY": "BASIC",
            "CAMUNDA_BASIC_AUTH_USERNAME": "your-username",
            "CAMUNDA_BASIC_AUTH_PASSWORD": "your-password",
        }
    )
    # endregion ReadmeBasicAuth


# ---------- Deploying Resources ----------


def readme_deploy_resources() -> None:
    # region ReadmeDeployResources
    from camunda_orchestration_sdk import CamundaClient

    with CamundaClient() as client:
        result = client.deploy_resources_from_files(["process.bpmn", "decision.dmn"])

        print(f"Deployment key: {result.deployment_key}")
        for process in result.processes:
            print(f"  Process: {process.process_definition_id} (key: {process.process_definition_key})")
    # endregion ReadmeDeployResources


# ---------- Creating a Process Instance ----------


def readme_create_process_instance() -> None:
    # region ReadmeCreateProcessInstance
    from camunda_orchestration_sdk import CamundaClient, ProcessCreationByKey

    with CamundaClient() as client:
        # Deploy and capture the typed key
        deployment = client.deploy_resources_from_files(["process.bpmn"])
        process_key = deployment.processes[0].process_definition_key

        # Use it directly — the type flows through without conversion
        result = client.create_process_instance(
            data=ProcessCreationByKey(process_definition_key=process_key)
        )
        print(f"Process instance key: {result.process_instance_key}")
    # endregion ReadmeCreateProcessInstance


def readme_create_from_storage() -> None:
    # region ReadmeCreateFromStorage
    from camunda_orchestration_sdk import CamundaClient, ProcessCreationByKey, ProcessDefinitionKey

    with CamundaClient() as client:
        stored_key = "2251799813685249"  # from a DB row or config
        result = client.create_process_instance(
            data=ProcessCreationByKey(process_definition_key=ProcessDefinitionKey(stored_key))
        )
        print(f"Process instance key: {result.process_instance_key}")
    # endregion ReadmeCreateFromStorage


# ---------- Job Workers ----------


def readme_job_worker() -> None:
    # region ReadmeJobWorker
    import asyncio

    from camunda_orchestration_sdk import CamundaAsyncClient, ConnectedJobContext, WorkerConfig

    async def handle_job(job_context: ConnectedJobContext) -> dict[str, object]:
        variables = job_context.variables.to_dict()
        job_context.log.info(f"Processing job {job_context.job_key}: {variables}")
        return {"result": "processed"}

    async def main() -> None:
        async with CamundaAsyncClient() as client:
            config = WorkerConfig(
                job_type="my-service-task",
                job_timeout_milliseconds=30_000,
            )
            client.create_job_worker(config=config, callback=handle_job)

            # Keep workers running until cancelled
            await client.run_workers()

    asyncio.run(main())
    # endregion ReadmeJobWorker


# ---------- Using the Client in a Job Handler ----------


async def readme_async_handler() -> None:
    # region ReadmeAsyncHandler
    from camunda_orchestration_sdk import ConnectedJobContext, MessagePublicationRequest, MessagePublicationRequestVariables

    async def handle_order(job: ConnectedJobContext) -> dict[str, object]:
        variables = job.variables.to_dict()
        order_id = variables["orderId"]

        await job.client.publish_message(
            data=MessagePublicationRequest(
                name="order-processed",
                correlation_key=order_id,
                time_to_live=60000,
                variables=MessagePublicationRequestVariables.from_dict({"orderId": order_id, "status": "completed"}),
            )
        )

        job.log.info(f"Published order-processed message for order {order_id}")
        return {"status": "done"}
    # endregion ReadmeAsyncHandler


def readme_sync_handler() -> None:
    # region ReadmeSyncHandler
    from camunda_orchestration_sdk import MessagePublicationRequest, MessagePublicationRequestVariables, SyncJobContext

    def handle_order(job: SyncJobContext) -> dict[str, object]:
        variables = job.variables.to_dict()
        order_id = variables["orderId"]

        job.client.publish_message(
            data=MessagePublicationRequest(
                name="order-processed",
                correlation_key=order_id,
                time_to_live=60000,
                variables=MessagePublicationRequestVariables.from_dict({"orderId": order_id, "status": "completed"}),
            )
        )

        job.log.info(f"Published order-processed message for order {order_id}")
        return {"status": "done"}
    # endregion ReadmeSyncHandler


# ---------- Failing a Job ----------


async def readme_fail_job() -> None:
    # region ReadmeFailJob
    from camunda_orchestration_sdk import ConnectedJobContext, JobFailure

    async def handle_job(job: ConnectedJobContext) -> dict[str, object]:
        if not job.variables.to_dict().get("required_field"):
            raise JobFailure(
                message="Missing required field",
                retries=2,
                retry_back_off=5000,  # milliseconds
            )
        return {"result": "ok"}
    # endregion ReadmeFailJob


# ---------- BPMN Error ----------


async def readme_bpmn_error() -> None:
    # region ReadmeBpmnError
    from camunda_orchestration_sdk import ConnectedJobContext, JobError

    async def handle_payment(job: ConnectedJobContext) -> dict[str, object]:
        variables = job.variables.to_dict()
        if variables.get("amount", 0) > 10_000:
            raise JobError(error_code="AMOUNT_TOO_HIGH", message="Payment exceeds limit")
        return {"status": "approved"}
    # endregion ReadmeBpmnError


# ---------- Error Handling ----------


def readme_error_handling() -> None:
    # region ReadmeErrorHandling
    from camunda_orchestration_sdk import CamundaClient, ProcessCreationByKey, ProcessDefinitionKey
    from camunda_orchestration_sdk.errors import BadRequestError

    process_definition_key = ProcessDefinitionKey("2251799813685249")

    with CamundaClient() as client:
        try:
            result = client.create_process_instance(
                data=ProcessCreationByKey(process_definition_key=process_definition_key)
            )
        except BadRequestError as e:
            print(f"Bad request ({e.operation_id}): {e}")
    # endregion ReadmeErrorHandling


# ---------- Logging ----------


def readme_stdlib_logger() -> None:
    # region ReadmeStdlibLogger
    import logging

    from camunda_orchestration_sdk import CamundaClient

    my_logger = logging.getLogger("my_app.camunda")
    my_logger.setLevel(logging.DEBUG)

    client = CamundaClient(logger=my_logger)
    # endregion ReadmeStdlibLogger


def readme_custom_logger() -> None:
    # region ReadmeCustomLogger
    from camunda_orchestration_sdk import CamundaClient

    class MyLogger:
        def debug(self, msg: object, *args: object, **kwargs: object) -> None:
            print(f"[DEBUG] {msg}")

        def info(self, msg: object, *args: object, **kwargs: object) -> None:
            print(f"[INFO] {msg}")

        def warning(self, msg: object, *args: object, **kwargs: object) -> None:
            print(f"[WARN] {msg}")

        def error(self, msg: object, *args: object, **kwargs: object) -> None:
            print(f"[ERROR] {msg}")

    client = CamundaClient(logger=MyLogger())
    # endregion ReadmeCustomLogger


def readme_disable_logging() -> None:
    # region ReadmeDisableLogging
    from camunda_orchestration_sdk import CamundaClient, NullLogger

    client = CamundaClient(logger=NullLogger())
    # endregion ReadmeDisableLogging


# ---------- Heritable Worker Defaults ----------


async def readme_worker_defaults_env() -> None:
    from camunda_orchestration_sdk import CamundaAsyncClient, ConnectedJobContext, WorkerConfig

    async def handle_payment(job: ConnectedJobContext) -> dict[str, object]:
        return {"status": "paid"}

    async def handle_notification(job: ConnectedJobContext) -> dict[str, object]:
        return {"sent": True}

    async with CamundaAsyncClient() as client:
        # region ReadmeWorkerDefaultsEnv
        # No need to set job_timeout_milliseconds on every worker — inherited from env
        client.create_job_worker(
            config=WorkerConfig(job_type="payment-service"),
            callback=handle_payment,
        )
        client.create_job_worker(
            config=WorkerConfig(job_type="notification-service"),
            callback=handle_notification,
        )
        # endregion ReadmeWorkerDefaultsEnv


async def readme_worker_defaults_client() -> None:
    from camunda_orchestration_sdk import CamundaAsyncClient, ConnectedJobContext, WorkerConfig

    async def handle_payment(job: ConnectedJobContext) -> dict[str, object]:
        return {"status": "paid"}

    async def handle_shipping(job: ConnectedJobContext) -> dict[str, object]:
        return {"shipped": True}

    # region ReadmeWorkerDefaultsClient
    client = CamundaAsyncClient(configuration={
        "CAMUNDA_WORKER_TIMEOUT": "30000",
        "CAMUNDA_WORKER_MAX_CONCURRENT_JOBS": "16",
        "CAMUNDA_WORKER_NAME": "my-app",
    })

    # Both workers inherit timeout, concurrency, and name
    client.create_job_worker(
        config=WorkerConfig(job_type="payment-service"),
        callback=handle_payment,
    )
    client.create_job_worker(
        config=WorkerConfig(job_type="shipping-service"),
        callback=handle_shipping,
    )
    # endregion ReadmeWorkerDefaultsClient


# ---------- Job Corrections ----------


async def readme_job_corrections() -> None:
    # region ReadmeJobCorrections
    from camunda_orchestration_sdk import ConnectedJobContext
    from camunda_orchestration_sdk.models import (
        JobCompletionRequest,
        JobResultUserTask,
        JobResultCorrections,
    )

    async def validate_task(job: ConnectedJobContext) -> JobCompletionRequest:
        return JobCompletionRequest(
            result=JobResultUserTask(
                type_="userTask",
                corrections=JobResultCorrections(
                    assignee="corrected-user",
                    priority=80,
                ),
            ),
        )
    # endregion ReadmeJobCorrections


async def readme_job_corrections_denied() -> None:
    from camunda_orchestration_sdk import ConnectedJobContext
    from camunda_orchestration_sdk.models import (
        JobCompletionRequest,
        JobResultUserTask,
    )

    # region ReadmeJobCorrectionsDenied
    async def review_task(job: ConnectedJobContext) -> JobCompletionRequest:
        return JobCompletionRequest(
            result=JobResultUserTask(
                type_="userTask",
                denied=True,
                denied_reason="Insufficient documentation",
            ),
        )
    # endregion ReadmeJobCorrectionsDenied


# ---------- Job Logger ----------


async def readme_job_logger() -> None:
    from camunda_orchestration_sdk import ConnectedJobContext

    # region ReadmeJobLogger
    async def handler(job: ConnectedJobContext) -> dict[str, object]:
        job.log.info(f"Starting work on {job.job_key}")
        # ... do work ...
        job.log.debug("Work completed successfully")
        return {"done": True}
    # endregion ReadmeJobLogger


# ---------- Execution Strategies ----------


async def readme_execution_strategies() -> None:
    from camunda_orchestration_sdk import CamundaAsyncClient, WorkerConfig

    async with CamundaAsyncClient() as client:
        # region ReadmeExecutionStrategies
        from camunda_orchestration_sdk import SyncJobContext, JobContext

        # Force thread pool for a sync handler (receives SyncJobContext)
        def io_handler(job: SyncJobContext) -> dict[str, object]:
            return {"done": True}

        client.create_job_worker(
            config=WorkerConfig(job_type="io-bound-task", job_timeout_milliseconds=30_000),
            callback=io_handler,
            execution_strategy="thread",
        )

        # Force process pool for CPU-heavy work (receives plain JobContext)
        def cpu_handler(job: JobContext) -> dict[str, object]:
            return {"computed": True}

        client.create_job_worker(
            config=WorkerConfig(job_type="image-processing", job_timeout_milliseconds=120_000),
            callback=cpu_handler,
            execution_strategy="process",
        )
        # endregion ReadmeExecutionStrategies
