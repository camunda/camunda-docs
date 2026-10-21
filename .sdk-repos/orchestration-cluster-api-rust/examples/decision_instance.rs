//! Compilable usage examples for decision instance operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::decision_instance_api::DeleteDecisionInstanceParams;
use camunda_orchestration_sdk::apis::decision_instance_api::DeleteDecisionInstancesBatchOperationParams;
use camunda_orchestration_sdk::apis::decision_instance_api::GetDecisionInstanceParams;
use camunda_orchestration_sdk::apis::decision_instance_api::SearchDecisionInstancesParams;
use camunda_orchestration_sdk::models::DecisionInstanceDeletionBatchOperationRequest;
use camunda_orchestration_sdk::models::DecisionInstanceFilter;
use camunda_orchestration_sdk::models::DecisionInstanceSearchQuery;
use camunda_orchestration_sdk::models::DeleteDecisionInstanceRequest;
use camunda_orchestration_sdk::CamundaClient;

// region DeleteDecisionInstance
async fn delete_decision_instance(
    decision_evaluation_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .delete_decision_instance(DeleteDecisionInstanceParams {
            decision_evaluation_key,
            delete_decision_instance_request: Some(DeleteDecisionInstanceRequest::default()),
        })
        .await?;
    println!("Delete decision instance: done");

    Ok(())
}
// endregion DeleteDecisionInstance

// region DeleteDecisionInstancesBatchOperation
async fn delete_decision_instances_batch_operation() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .delete_decision_instances_batch_operation(DeleteDecisionInstancesBatchOperationParams {
            decision_instance_deletion_batch_operation_request:
                DecisionInstanceDeletionBatchOperationRequest {
                    filter: Box::new(DecisionInstanceFilter::default()),
                    ..Default::default()
                },
        })
        .await?;
    println!("{}", result.batch_operation_key);

    Ok(())
}
// endregion DeleteDecisionInstancesBatchOperation

// region GetDecisionInstance
async fn get_decision_instance(
    decision_evaluation_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_decision_instance(GetDecisionInstanceParams {
            decision_evaluation_instance_key,
        })
        .await?;
    println!("{}", result.decision_evaluation_instance_key);

    Ok(())
}
// endregion GetDecisionInstance

// region SearchDecisionInstances
async fn search_decision_instances() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_decision_instances(SearchDecisionInstancesParams {
            decision_instance_search_query: Some(DecisionInstanceSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.decision_evaluation_instance_key);
    }

    Ok(())
}
// endregion SearchDecisionInstances

fn main() {
    // Examples above are compiled, not executed.
}
