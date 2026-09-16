//! Compilable usage examples for incident operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::incident_api::GetIncidentParams;
use camunda_orchestration_sdk::apis::incident_api::GetProcessInstanceStatisticsByDefinitionParams;
use camunda_orchestration_sdk::apis::incident_api::GetProcessInstanceStatisticsByErrorParams;
use camunda_orchestration_sdk::apis::incident_api::ResolveIncidentParams;
use camunda_orchestration_sdk::apis::incident_api::SearchIncidentsParams;
use camunda_orchestration_sdk::models::IncidentProcessInstanceStatisticsByDefinitionFilter;
use camunda_orchestration_sdk::models::IncidentProcessInstanceStatisticsByDefinitionQuery;
use camunda_orchestration_sdk::models::IncidentProcessInstanceStatisticsByErrorQuery;
use camunda_orchestration_sdk::models::IncidentResolutionRequest;
use camunda_orchestration_sdk::models::IncidentSearchQuery;
use camunda_orchestration_sdk::CamundaClient;

// region GetIncident
async fn get_incident(incident_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_incident(GetIncidentParams { incident_key })
        .await?;
    println!("{}", result.element_id);

    Ok(())
}
// endregion GetIncident

// region GetProcessInstanceStatisticsByDefinition
async fn get_process_instance_statistics_by_definition() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_process_instance_statistics_by_definition(
            GetProcessInstanceStatisticsByDefinitionParams {
                incident_process_instance_statistics_by_definition_query:
                    IncidentProcessInstanceStatisticsByDefinitionQuery {
                        filter: Box::new(IncidentProcessInstanceStatisticsByDefinitionFilter {
                            error_hash_code: 1,
                        }),
                        ..Default::default()
                    },
            },
        )
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion GetProcessInstanceStatisticsByDefinition

// region GetProcessInstanceStatisticsByError
async fn get_process_instance_statistics_by_error() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_process_instance_statistics_by_error(GetProcessInstanceStatisticsByErrorParams {
            incident_process_instance_statistics_by_error_query: Some(
                IncidentProcessInstanceStatisticsByErrorQuery::default(),
            ),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion GetProcessInstanceStatisticsByError

// region ResolveIncident
async fn resolve_incident(incident_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .resolve_incident(ResolveIncidentParams {
            incident_key,
            incident_resolution_request: Some(IncidentResolutionRequest::default()),
        })
        .await?;
    println!("Resolve incident: done");

    Ok(())
}
// endregion ResolveIncident

// region SearchIncidents
async fn search_incidents() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_incidents(SearchIncidentsParams {
            incident_search_query: Some(IncidentSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.element_id);
    }

    Ok(())
}
// endregion SearchIncidents

fn main() {
    // Examples above are compiled, not executed.
}
