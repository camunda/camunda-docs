//! Compilable usage examples for agent definition operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::agent_definition_api::GetAgentDefinitionParams;
use camunda_orchestration_sdk::apis::agent_definition_api::SearchAgentDefinitionsParams;
use camunda_orchestration_sdk::models::AgentDefinitionSearchQuery;
use camunda_orchestration_sdk::CamundaClient;

// region GetAgentDefinition
async fn get_agent_definition() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_agent_definition(GetAgentDefinitionParams {
            agent_definition_key: "2251799813691958".to_string(),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion GetAgentDefinition

// region SearchAgentDefinitions
async fn search_agent_definitions() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_agent_definitions(SearchAgentDefinitionsParams {
            agent_definition_search_query: Some(AgentDefinitionSearchQuery::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion SearchAgentDefinitions

fn main() {
    // Examples above are compiled, not executed.
}
