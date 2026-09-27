//! Compilable usage examples for global listener operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::global_listener_api::CreateGlobalTaskListenerParams;
use camunda_orchestration_sdk::apis::global_listener_api::DeleteGlobalTaskListenerParams;
use camunda_orchestration_sdk::apis::global_listener_api::GetGlobalTaskListenerParams;
use camunda_orchestration_sdk::apis::global_listener_api::SearchGlobalTaskListenersParams;
use camunda_orchestration_sdk::apis::global_listener_api::UpdateGlobalTaskListenerParams;
use camunda_orchestration_sdk::models::CreateGlobalTaskListenerRequest;
use camunda_orchestration_sdk::models::GlobalListenerId;
use camunda_orchestration_sdk::models::GlobalTaskListenerEventTypeEnum;
use camunda_orchestration_sdk::models::GlobalTaskListenerSearchQueryRequest;
use camunda_orchestration_sdk::models::UpdateGlobalTaskListenerRequest;
use camunda_orchestration_sdk::CamundaClient;

// region CreateGlobalTaskListener
async fn create_global_task_listener() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_global_task_listener(CreateGlobalTaskListenerParams {
            create_global_task_listener_request: CreateGlobalTaskListenerRequest {
                id: GlobalListenerId::assume_exists("my-id"),
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.id);

    Ok(())
}
// endregion CreateGlobalTaskListener

// region DeleteGlobalTaskListener
async fn delete_global_task_listener(id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .delete_global_task_listener(DeleteGlobalTaskListenerParams { id })
        .await?;
    println!("Delete global user task listener: done");

    Ok(())
}
// endregion DeleteGlobalTaskListener

// region GetGlobalTaskListener
async fn get_global_task_listener(id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_global_task_listener(GetGlobalTaskListenerParams { id })
        .await?;
    println!("{}", result.id);

    Ok(())
}
// endregion GetGlobalTaskListener

// region SearchGlobalTaskListeners
async fn search_global_task_listeners() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_global_task_listeners(SearchGlobalTaskListenersParams {
            global_task_listener_search_query_request: Some(
                GlobalTaskListenerSearchQueryRequest::default(),
            ),
        })
        .await?;
    for item in result.items {
        println!("{}", item.id);
    }

    Ok(())
}
// endregion SearchGlobalTaskListeners

// region UpdateGlobalTaskListener
async fn update_global_task_listener(id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .update_global_task_listener(UpdateGlobalTaskListenerParams {
            id,
            update_global_task_listener_request: UpdateGlobalTaskListenerRequest {
                r#type: "my-type".to_string(),
                event_types: vec![GlobalTaskListenerEventTypeEnum::All],
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.id);

    Ok(())
}
// endregion UpdateGlobalTaskListener

fn main() {
    // Examples above are compiled, not executed.
}
