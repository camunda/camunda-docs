# Compilable usage examples for deployment operations.
# These examples are type-checked during build to guard against API regressions.
from __future__ import annotations

from camunda_orchestration_sdk import CamundaClient


# region DeployResources
def deploy_resources_example() -> None:
    client = CamundaClient()

    result = client.deploy_resources_from_files(
        ["order-process.bpmn", "decision.dmn"]
    )

    print(f"Deployment key: {result.deployment_key}")
    for process in result.processes:
        print(
            f"  Process: {process.process_definition_id} v{process.process_definition_version}"
        )
    for decision in result.decisions:
        print(f"  Decision: {decision.decision_definition_id}")
# endregion DeployResources


# region DeployResourcesWithTenant
def deploy_resources_with_tenant_example() -> None:
    client = CamundaClient()

    result = client.deploy_resources_from_files(
        ["order-process.bpmn"],
        tenant_id="my-tenant",
    )

    print(f"Deployment key: {result.deployment_key}")
    print(f"Tenant: {result.tenant_id}")
# endregion DeployResourcesWithTenant


# region DeleteResource
def delete_resource_example() -> None:
    client = CamundaClient()

    # Use a resource key from a previous deployment response
    client.delete_resource(resource_key="2251799813685249")
# endregion DeleteResource
