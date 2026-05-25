# Compilable usage examples for decision instances, documents, jobs, and user task extras.
# These examples are type-checked during build to guard against API regressions.
from __future__ import annotations

from camunda_orchestration_sdk import (
    CamundaClient,
    CreateDocumentData,
    CreateDocumentsData,
    DecisionDefinitionKey,
    DecisionEvaluationInstanceKey,
    DecisionEvaluationKey,
    DecisionInstanceSearchQuery,
    DecisionRequirementsKey,
    DecisionRequirementsSearchQuery,
    DocumentId,
    DocumentLinkRequest,
    File,
    JobChangeset,
    JobErrorRequest,
    JobKey,
    JobSearchQuery,
    JobUpdateRequest,
    Unset,
    UserTaskAuditLogSearchQueryRequest,
    UserTaskKey,
)


# region GetDecisionDefinitionXml
def get_decision_definition_xml_example(decision_definition_key: DecisionDefinitionKey) -> None:
    client = CamundaClient()

    xml = client.get_decision_definition_xml(
        decision_definition_key=decision_definition_key,
    )

    print(f"XML length: {len(xml)}")
# endregion GetDecisionDefinitionXml


# region GetDecisionInstance
def get_decision_instance_example(decision_evaluation_instance_key: DecisionEvaluationInstanceKey) -> None:
    client = CamundaClient()

    result = client.get_decision_instance(
        decision_evaluation_instance_key=decision_evaluation_instance_key,
    )

    print(f"Decision instance: {result.decision_definition_id}")
# endregion GetDecisionInstance


# region SearchDecisionInstances
def search_decision_instances_example() -> None:
    client = CamundaClient()

    result = client.search_decision_instances(
        data=DecisionInstanceSearchQuery(),
    )

    if not isinstance(result.items, Unset):
        for di in result.items:
            print(f"Decision instance: {di.decision_definition_id}")
# endregion SearchDecisionInstances


# region DeleteDecisionInstance
def delete_decision_instance_example(decision_evaluation_key: DecisionEvaluationKey) -> None:
    client = CamundaClient()

    client.delete_decision_instance(
        decision_evaluation_key=decision_evaluation_key,
    )
# endregion DeleteDecisionInstance


# region GetDecisionRequirements
def get_decision_requirements_example(decision_requirements_key: DecisionRequirementsKey) -> None:
    client = CamundaClient()

    result = client.get_decision_requirements(
        decision_requirements_key=decision_requirements_key,
    )

    print(f"DRD: {result.decision_requirements_name}")
# endregion GetDecisionRequirements


# region GetDecisionRequirementsXml
def get_decision_requirements_xml_example(decision_requirements_key: DecisionRequirementsKey) -> None:
    client = CamundaClient()

    xml = client.get_decision_requirements_xml(
        decision_requirements_key=decision_requirements_key,
    )

    print(f"XML length: {len(xml)}")
# endregion GetDecisionRequirementsXml


# region SearchDecisionRequirements
def search_decision_requirements_example() -> None:
    client = CamundaClient()

    result = client.search_decision_requirements(
        data=DecisionRequirementsSearchQuery(),
    )

    if not isinstance(result.items, Unset):
        for drd in result.items:
            print(f"DRD: {drd.decision_requirements_name}")
# endregion SearchDecisionRequirements


# region CreateDocumentLink
def create_document_link_example(document_id: DocumentId) -> None:
    client = CamundaClient()

    result = client.create_document_link(
        document_id=document_id,
        data=DocumentLinkRequest(),
    )

    print(f"Document link: {result.url}")
# endregion CreateDocumentLink


# region DeleteDocument
def delete_document_example(document_id: DocumentId) -> None:
    client = CamundaClient()

    client.delete_document(document_id=document_id)
# endregion DeleteDocument


# region ThrowJobError
def throw_job_error_example(job_key: JobKey) -> None:
    client = CamundaClient()

    client.throw_job_error(
        job_key=job_key,
        data=JobErrorRequest(
            error_code="VALIDATION_ERROR",
            error_message="Input validation failed",
        ),
    )
# endregion ThrowJobError


# region UpdateJob
def update_job_example(job_key: JobKey) -> None:
    client = CamundaClient()

    client.update_job(
        job_key=job_key,
        data=JobUpdateRequest(
            changeset=JobChangeset(
                retries=3,
            ),
        ),
    )
# endregion UpdateJob


# region SearchJobs
def search_jobs_example() -> None:
    client = CamundaClient()

    result = client.search_jobs(
        data=JobSearchQuery(),
    )

    if not isinstance(result.items, Unset):
        for job in result.items:
            print(f"Job: {job.job_key}")
# endregion SearchJobs


# region GetUserTask
def get_user_task_example(user_task_key: UserTaskKey) -> None:
    client = CamundaClient()

    result = client.get_user_task(
        user_task_key=user_task_key,
    )

    print(f"User task: {result.user_task_key}")
# endregion GetUserTask


# region UpdateUserTask
def update_user_task_example(user_task_key: UserTaskKey) -> None:
    from camunda_orchestration_sdk import Changeset, UserTaskUpdateRequest

    client = CamundaClient()

    client.update_user_task(
        user_task_key=user_task_key,
        data=UserTaskUpdateRequest(
            changeset=Changeset(
                priority=80,
            ),
        ),
    )
# endregion UpdateUserTask


# region GetUserTaskForm
def get_user_task_form_example(user_task_key: UserTaskKey) -> None:
    client = CamundaClient()

    result = client.get_user_task_form(
        user_task_key=user_task_key,
    )

    print(f"Form: {result.form_key}")
# endregion GetUserTaskForm


# region SearchUserTaskVariables
def search_user_task_variables_example(user_task_key: UserTaskKey) -> None:
    client = CamundaClient()

    result = client.search_user_task_variables(
        user_task_key=user_task_key,
    )

    if not isinstance(result.items, Unset):
        for var in result.items:
            print(f"Variable: {var.name}")
# endregion SearchUserTaskVariables


# region SearchUserTaskAuditLogs
def search_user_task_audit_logs_example(user_task_key: UserTaskKey) -> None:
    client = CamundaClient()

    result = client.search_user_task_audit_logs(
        user_task_key=user_task_key,
        data=UserTaskAuditLogSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for log in result.items:
            print(f"Audit log: {log.audit_log_key}")
# endregion SearchUserTaskAuditLogs


# region CreateDocument
def create_document_example() -> None:
    import io

    client = CamundaClient()

    result = client.create_document(
        data=CreateDocumentData(
            file=File(payload=io.BytesIO(b"hello world"), file_name="example.txt"),
        ),
    )

    print(f"Document ID: {result.document_id}")
# endregion CreateDocument


# region CreateDocuments
def create_documents_example() -> None:
    import io

    client = CamundaClient()

    result = client.create_documents(
        data=CreateDocumentsData(
            files=[
                File(payload=io.BytesIO(b"file one"), file_name="one.txt"),
                File(payload=io.BytesIO(b"file two"), file_name="two.txt"),
            ],
        ),
    )

    if not isinstance(result.created_documents, Unset):
        for doc in result.created_documents:
            print(f"Created document: {doc.document_id}")
# endregion CreateDocuments


# region GetDocument
def get_document_example(document_id: DocumentId) -> None:
    client = CamundaClient()

    result = client.get_document(document_id=document_id)

    print(f"File name: {result.file_name}")
# endregion GetDocument


# region SearchUserTaskEffectiveVariables
def search_user_task_effective_variables_example(user_task_key: UserTaskKey) -> None:
    client = CamundaClient()

    result = client.search_user_task_effective_variables(
        user_task_key=user_task_key,
    )

    if not isinstance(result.items, Unset):
        for var in result.items:
            print(f"Variable: {var.name}")
# endregion SearchUserTaskEffectiveVariables
