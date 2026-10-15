//! Compilable usage examples for batch operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::batch_operation_api::CancelBatchOperationParams;
use camunda_orchestration_sdk::apis::batch_operation_api::GetBatchOperationParams;
use camunda_orchestration_sdk::apis::batch_operation_api::ResumeBatchOperationParams;
use camunda_orchestration_sdk::apis::batch_operation_api::SearchBatchOperationItemsParams;
use camunda_orchestration_sdk::apis::batch_operation_api::SearchBatchOperationsParams;
use camunda_orchestration_sdk::apis::batch_operation_api::SuspendBatchOperationParams;
use camunda_orchestration_sdk::models::BatchOperationItemSearchQuery;
use camunda_orchestration_sdk::models::BatchOperationSearchQuery;
use camunda_orchestration_sdk::CamundaClient;

// region CancelBatchOperation
async fn cancel_batch_operation(
    batch_operation_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .cancel_batch_operation(CancelBatchOperationParams {
            batch_operation_key,
        })
        .await?;
    println!("Cancel Batch operation: done");

    Ok(())
}
// endregion CancelBatchOperation

// region GetBatchOperation
async fn get_batch_operation(
    batch_operation_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_batch_operation(GetBatchOperationParams {
            batch_operation_key,
        })
        .await?;
    println!("{}", result.batch_operation_key);

    Ok(())
}
// endregion GetBatchOperation

// region ResumeBatchOperation
async fn resume_batch_operation(
    batch_operation_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .resume_batch_operation(ResumeBatchOperationParams {
            batch_operation_key,
        })
        .await?;
    println!("Resume Batch operation: done");

    Ok(())
}
// endregion ResumeBatchOperation

// region SearchBatchOperationItems
async fn search_batch_operation_items() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_batch_operation_items(SearchBatchOperationItemsParams {
            batch_operation_item_search_query: Some(BatchOperationItemSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.batch_operation_key);
    }

    Ok(())
}
// endregion SearchBatchOperationItems

// region SearchBatchOperations
async fn search_batch_operations() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_batch_operations(SearchBatchOperationsParams {
            batch_operation_search_query: Some(BatchOperationSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.batch_operation_key);
    }

    Ok(())
}
// endregion SearchBatchOperations

// region SuspendBatchOperation
async fn suspend_batch_operation(
    batch_operation_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .suspend_batch_operation(SuspendBatchOperationParams {
            batch_operation_key,
        })
        .await?;
    println!("Suspend Batch operation: done");

    Ok(())
}
// endregion SuspendBatchOperation

fn main() {
    // Examples above are compiled, not executed.
}
