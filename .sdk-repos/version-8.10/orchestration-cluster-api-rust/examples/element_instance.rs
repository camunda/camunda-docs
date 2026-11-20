//! Compilable usage examples for element instance operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::element_instance_api::CreateElementInstanceVariablesParams;
use camunda_orchestration_sdk::apis::element_instance_api::GetElementInstanceParams;
use camunda_orchestration_sdk::apis::element_instance_api::SearchElementInstanceIncidentsParams;
use camunda_orchestration_sdk::apis::element_instance_api::SearchElementInstanceWaitStatesParams;
use camunda_orchestration_sdk::apis::element_instance_api::SearchElementInstancesParams;
use camunda_orchestration_sdk::models::ElementInstanceSearchQuery;
use camunda_orchestration_sdk::models::ElementInstanceWaitStateQuery;
use camunda_orchestration_sdk::models::IncidentSearchQuery;
use camunda_orchestration_sdk::models::SetVariableRequest;
use camunda_orchestration_sdk::CamundaClient;

// region CreateElementInstanceVariables
async fn create_element_instance_variables(
    element_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .create_element_instance_variables(CreateElementInstanceVariablesParams {
            element_instance_key,
            set_variable_request: SetVariableRequest {
                variables: [("key".to_string(), serde_json::json!({"key": "value"}))]
                    .into_iter()
                    .collect(),
                ..Default::default()
            },
        })
        .await?;
    println!("Update element instance variables: done");

    Ok(())
}
// endregion CreateElementInstanceVariables

// region GetElementInstance
async fn get_element_instance(
    element_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_element_instance(GetElementInstanceParams {
            element_instance_key,
        })
        .await?;
    println!("{}", result.element_id);

    Ok(())
}
// endregion GetElementInstance

// region SearchElementInstanceIncidents
async fn search_element_instance_incidents(
    element_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_element_instance_incidents(SearchElementInstanceIncidentsParams {
            element_instance_key,
            incident_search_query: IncidentSearchQuery::default(),
        })
        .await?;
    for item in result.items {
        println!("{}", item.element_id);
    }

    Ok(())
}
// endregion SearchElementInstanceIncidents

// region SearchElementInstanceWaitStates
async fn search_element_instance_wait_states() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_element_instance_wait_states(SearchElementInstanceWaitStatesParams {
            element_instance_wait_state_query: Some(ElementInstanceWaitStateQuery::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion SearchElementInstanceWaitStates

// region SearchElementInstances
async fn search_element_instances() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_element_instances(SearchElementInstancesParams {
            element_instance_search_query: Some(ElementInstanceSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.element_id);
    }

    Ok(())
}
// endregion SearchElementInstances

fn main() {
    // Examples above are compiled, not executed.
}
