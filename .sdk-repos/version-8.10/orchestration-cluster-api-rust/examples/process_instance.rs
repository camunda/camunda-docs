//! Compilable usage examples for process instance operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::process_instance_api::AssignProcessInstanceBusinessIdParams;
use camunda_orchestration_sdk::apis::process_instance_api::CancelProcessInstancesBatchOperationParams;
use camunda_orchestration_sdk::apis::process_instance_api::DeleteProcessInstanceParams;
use camunda_orchestration_sdk::apis::process_instance_api::DeleteProcessInstancesBatchOperationParams;
use camunda_orchestration_sdk::apis::process_instance_api::GetProcessInstanceCallHierarchyParams;
use camunda_orchestration_sdk::apis::process_instance_api::GetProcessInstanceSequenceFlowsParams;
use camunda_orchestration_sdk::apis::process_instance_api::GetProcessInstanceStatisticsParams;
use camunda_orchestration_sdk::apis::process_instance_api::GetProcessInstanceWaitStateStatisticsParams;
use camunda_orchestration_sdk::apis::process_instance_api::MigrateProcessInstanceParams;
use camunda_orchestration_sdk::apis::process_instance_api::MigrateProcessInstancesBatchOperationParams;
use camunda_orchestration_sdk::apis::process_instance_api::ModifyProcessInstanceParams;
use camunda_orchestration_sdk::apis::process_instance_api::ModifyProcessInstancesBatchOperationParams;
use camunda_orchestration_sdk::apis::process_instance_api::ResolveIncidentsBatchOperationParams;
use camunda_orchestration_sdk::apis::process_instance_api::ResolveProcessInstanceIncidentsParams;
use camunda_orchestration_sdk::apis::process_instance_api::ResumeProcessInstanceParams;
use camunda_orchestration_sdk::apis::process_instance_api::ResumeProcessInstancesBatchOperationParams;
use camunda_orchestration_sdk::apis::process_instance_api::SearchProcessInstanceIncidentsParams;
use camunda_orchestration_sdk::apis::process_instance_api::SearchProcessInstancesParams;
use camunda_orchestration_sdk::apis::process_instance_api::SuspendProcessInstanceParams;
use camunda_orchestration_sdk::apis::process_instance_api::SuspendProcessInstancesBatchOperationParams;
use camunda_orchestration_sdk::models::BusinessId;
use camunda_orchestration_sdk::models::DeleteProcessInstanceRequest;
use camunda_orchestration_sdk::models::ElementId;
use camunda_orchestration_sdk::models::IncidentSearchQuery;
use camunda_orchestration_sdk::models::MigrateProcessInstanceMappingInstruction;
use camunda_orchestration_sdk::models::ProcessDefinitionId;
use camunda_orchestration_sdk::models::ProcessDefinitionKey;
use camunda_orchestration_sdk::models::ProcessInstanceBusinessIdAssignmentInstruction;
use camunda_orchestration_sdk::models::ProcessInstanceCancellationBatchOperationRequest;
use camunda_orchestration_sdk::models::ProcessInstanceCreationInstruction;
use camunda_orchestration_sdk::models::ProcessInstanceCreationInstructionById;
use camunda_orchestration_sdk::models::ProcessInstanceDeletionBatchOperationRequest;
use camunda_orchestration_sdk::models::ProcessInstanceFilter;
use camunda_orchestration_sdk::models::ProcessInstanceIncidentResolutionBatchOperationRequest;
use camunda_orchestration_sdk::models::ProcessInstanceMigrationBatchOperationPlan;
use camunda_orchestration_sdk::models::ProcessInstanceMigrationBatchOperationRequest;
use camunda_orchestration_sdk::models::ProcessInstanceMigrationInstruction;
use camunda_orchestration_sdk::models::ProcessInstanceModificationBatchOperationRequest;
use camunda_orchestration_sdk::models::ProcessInstanceModificationInstruction;
use camunda_orchestration_sdk::models::ProcessInstanceModificationMoveBatchOperationInstruction;
use camunda_orchestration_sdk::models::ProcessInstanceResumptionBatchOperationRequest;
use camunda_orchestration_sdk::models::ProcessInstanceSearchQuery;
use camunda_orchestration_sdk::models::ProcessInstanceSuspensionBatchOperationRequest;
use camunda_orchestration_sdk::models::ResumeProcessInstanceRequest;
use camunda_orchestration_sdk::models::SuspendProcessInstanceRequest;
use camunda_orchestration_sdk::CamundaClient;

// region AssignProcessInstanceBusinessId
async fn assign_process_instance_business_id(
    process_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .assign_process_instance_business_id(AssignProcessInstanceBusinessIdParams {
            process_instance_key,
            process_instance_business_id_assignment_instruction:
                ProcessInstanceBusinessIdAssignmentInstruction {
                    business_id: BusinessId::assume_exists("my-business-id"),
                },
        })
        .await?;
    println!("Assign business id to process instance: done");

    Ok(())
}
// endregion AssignProcessInstanceBusinessId

// region CancelProcessInstance
async fn cancel_process_instance(
    process_instance_key: &str,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    // Pass `Some(CancelProcessInstanceRequest { .. })` to supply an operation reference.
    client
        .cancel_process_instance(process_instance_key, None)
        .await?;

    println!("Cancelled process instance {process_instance_key}");

    Ok(())
}
// endregion CancelProcessInstance

// region CancelProcessInstancesBatchOperation
async fn cancel_process_instances_batch_operation() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .cancel_process_instances_batch_operation(CancelProcessInstancesBatchOperationParams {
            process_instance_cancellation_batch_operation_request:
                ProcessInstanceCancellationBatchOperationRequest {
                    filter: Box::new(ProcessInstanceFilter::default()),
                    ..Default::default()
                },
        })
        .await?;
    println!("{}", result.batch_operation_key);

    Ok(())
}
// endregion CancelProcessInstancesBatchOperation

// region CreateProcessInstance
async fn create_process_instance() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    // Start by BPMN process id. Use `ProcessInstanceCreationInstructionByKey` to
    // pin a specific deployed version instead.
    let instruction = ProcessInstanceCreationInstruction::ProcessInstanceCreationInstructionById(
        Box::new(ProcessInstanceCreationInstructionById {
            process_definition_id: ProcessDefinitionId::assume_exists("order-process"),
            variables: Some(
                [
                    ("orderId".to_string(), serde_json::json!("ORD-4711")),
                    ("amount".to_string(), serde_json::json!(42)),
                ]
                .into_iter()
                .collect(),
            ),
            ..Default::default()
        }),
    );

    let created = client.create_process_instance(instruction).await?;
    println!("Started process instance {}", created.process_instance_key);

    Ok(())
}
// endregion CreateProcessInstance

// region DeleteProcessInstance
async fn delete_process_instance(
    process_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .delete_process_instance(DeleteProcessInstanceParams {
            process_instance_key,
            delete_process_instance_request: Some(DeleteProcessInstanceRequest::default()),
        })
        .await?;
    println!("Delete process instance: done");

    Ok(())
}
// endregion DeleteProcessInstance

// region DeleteProcessInstancesBatchOperation
async fn delete_process_instances_batch_operation() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .delete_process_instances_batch_operation(DeleteProcessInstancesBatchOperationParams {
            process_instance_deletion_batch_operation_request:
                ProcessInstanceDeletionBatchOperationRequest {
                    filter: Box::new(ProcessInstanceFilter::default()),
                    ..Default::default()
                },
        })
        .await?;
    println!("{}", result.batch_operation_key);

    Ok(())
}
// endregion DeleteProcessInstancesBatchOperation

// region GetProcessInstance
async fn get_process_instance(
    process_instance_key: &str,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let instance = client.get_process_instance(process_instance_key).await?;

    println!("Process:  {}", instance.process_definition_id);
    println!("State:    {:?}", instance.state);
    println!("Incident: {}", instance.has_incident);

    Ok(())
}
// endregion GetProcessInstance

// region GetProcessInstanceCallHierarchy
async fn get_process_instance_call_hierarchy(
    process_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_process_instance_call_hierarchy(GetProcessInstanceCallHierarchyParams {
            process_instance_key,
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion GetProcessInstanceCallHierarchy

// region GetProcessInstanceSequenceFlows
async fn get_process_instance_sequence_flows(
    process_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_process_instance_sequence_flows(GetProcessInstanceSequenceFlowsParams {
            process_instance_key,
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion GetProcessInstanceSequenceFlows

// region GetProcessInstanceStatistics
async fn get_process_instance_statistics(
    process_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_process_instance_statistics(GetProcessInstanceStatisticsParams {
            process_instance_key,
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion GetProcessInstanceStatistics

// region GetProcessInstanceWaitStateStatistics
async fn get_process_instance_wait_state_statistics(
    process_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_process_instance_wait_state_statistics(GetProcessInstanceWaitStateStatisticsParams {
            process_instance_key,
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion GetProcessInstanceWaitStateStatistics

// region MigrateProcessInstance
async fn migrate_process_instance(
    process_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .migrate_process_instance(MigrateProcessInstanceParams {
            process_instance_key,
            process_instance_migration_instruction: ProcessInstanceMigrationInstruction {
                target_process_definition_key: Box::new(ProcessDefinitionKey::assume_exists(
                    "my-target-process-definition",
                )),
                mapping_instructions: vec![MigrateProcessInstanceMappingInstruction {
                    source_element_id: ElementId::assume_exists("my-source-element"),
                    target_element_id: ElementId::assume_exists("my-target-element"),
                }],
                ..Default::default()
            },
        })
        .await?;
    println!("Migrate process instance: done");

    Ok(())
}
// endregion MigrateProcessInstance

// region MigrateProcessInstancesBatchOperation
async fn migrate_process_instances_batch_operation() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .migrate_process_instances_batch_operation(MigrateProcessInstancesBatchOperationParams {
            process_instance_migration_batch_operation_request:
                ProcessInstanceMigrationBatchOperationRequest {
                    filter: Box::new(ProcessInstanceFilter::default()),
                    migration_plan: Box::new(ProcessInstanceMigrationBatchOperationPlan {
                        target_process_definition_key: Box::new(
                            ProcessDefinitionKey::assume_exists("my-target-process-definition"),
                        ),
                        mapping_instructions: vec![Default::default()],
                    }),
                    ..Default::default()
                },
        })
        .await?;
    println!("{}", result.batch_operation_key);

    Ok(())
}
// endregion MigrateProcessInstancesBatchOperation

// region ModifyProcessInstance
async fn modify_process_instance(
    process_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .modify_process_instance(ModifyProcessInstanceParams {
            process_instance_key,
            process_instance_modification_instruction:
                ProcessInstanceModificationInstruction::default(),
        })
        .await?;
    println!("Modify process instance: done");

    Ok(())
}
// endregion ModifyProcessInstance

// region ModifyProcessInstancesBatchOperation
async fn modify_process_instances_batch_operation() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .modify_process_instances_batch_operation(ModifyProcessInstancesBatchOperationParams {
            process_instance_modification_batch_operation_request:
                ProcessInstanceModificationBatchOperationRequest {
                    filter: Box::new(ProcessInstanceFilter::default()),
                    move_instructions: vec![
                        ProcessInstanceModificationMoveBatchOperationInstruction {
                            source_element_id: ElementId::assume_exists("my-source-element"),
                            target_element_id: ElementId::assume_exists("my-target-element"),
                        },
                    ],
                    ..Default::default()
                },
        })
        .await?;
    println!("{}", result.batch_operation_key);

    Ok(())
}
// endregion ModifyProcessInstancesBatchOperation

// region ResolveIncidentsBatchOperation
async fn resolve_incidents_batch_operation() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .resolve_incidents_batch_operation(ResolveIncidentsBatchOperationParams {
            process_instance_incident_resolution_batch_operation_request: Some(
                ProcessInstanceIncidentResolutionBatchOperationRequest {
                    filter: Box::new(ProcessInstanceFilter::default()),
                    ..Default::default()
                },
            ),
        })
        .await?;
    println!("{}", result.batch_operation_key);

    Ok(())
}
// endregion ResolveIncidentsBatchOperation

// region ResolveProcessInstanceIncidents
async fn resolve_process_instance_incidents(
    process_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .resolve_process_instance_incidents(ResolveProcessInstanceIncidentsParams {
            process_instance_key,
        })
        .await?;
    println!("{}", result.batch_operation_key);

    Ok(())
}
// endregion ResolveProcessInstanceIncidents

// region ResumeProcessInstance
async fn resume_process_instance(
    process_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .resume_process_instance(ResumeProcessInstanceParams {
            process_instance_key,
            resume_process_instance_request: Some(ResumeProcessInstanceRequest::default()),
        })
        .await?;
    println!("Resume process instance: done");

    Ok(())
}
// endregion ResumeProcessInstance

// region ResumeProcessInstancesBatchOperation
async fn resume_process_instances_batch_operation() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .resume_process_instances_batch_operation(ResumeProcessInstancesBatchOperationParams {
            process_instance_resumption_batch_operation_request:
                ProcessInstanceResumptionBatchOperationRequest {
                    filter: Box::new(ProcessInstanceFilter::default()),
                    ..Default::default()
                },
        })
        .await?;
    println!("{}", result.batch_operation_key);

    Ok(())
}
// endregion ResumeProcessInstancesBatchOperation

// region SearchProcessInstanceIncidents
async fn search_process_instance_incidents(
    process_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_process_instance_incidents(SearchProcessInstanceIncidentsParams {
            process_instance_key,
            incident_search_query: Some(IncidentSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.element_id);
    }

    Ok(())
}
// endregion SearchProcessInstanceIncidents

// region SearchProcessInstances
async fn search_process_instances() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_process_instances(SearchProcessInstancesParams {
            process_instance_search_query: Some(ProcessInstanceSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.process_definition_id);
    }

    Ok(())
}
// endregion SearchProcessInstances

// region SuspendProcessInstance
async fn suspend_process_instance(
    process_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .suspend_process_instance(SuspendProcessInstanceParams {
            process_instance_key,
            suspend_process_instance_request: Some(SuspendProcessInstanceRequest::default()),
        })
        .await?;
    println!("Suspend process instance: done");

    Ok(())
}
// endregion SuspendProcessInstance

// region SuspendProcessInstancesBatchOperation
async fn suspend_process_instances_batch_operation() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .suspend_process_instances_batch_operation(SuspendProcessInstancesBatchOperationParams {
            process_instance_suspension_batch_operation_request:
                ProcessInstanceSuspensionBatchOperationRequest {
                    filter: Box::new(ProcessInstanceFilter::default()),
                    ..Default::default()
                },
        })
        .await?;
    println!("{}", result.batch_operation_key);

    Ok(())
}
// endregion SuspendProcessInstancesBatchOperation

fn main() {
    // Examples above are compiled, not executed.
}
