//! Compilable usage examples for decision requirements operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::decision_requirements_api::GetDecisionRequirementsParams;
use camunda_orchestration_sdk::apis::decision_requirements_api::GetDecisionRequirementsXmlParams;
use camunda_orchestration_sdk::apis::decision_requirements_api::SearchDecisionRequirementsParams;
use camunda_orchestration_sdk::models::DecisionRequirementsSearchQuery;
use camunda_orchestration_sdk::CamundaClient;

// region GetDecisionRequirements
async fn get_decision_requirements(
    decision_requirements_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_decision_requirements(GetDecisionRequirementsParams {
            decision_requirements_key,
        })
        .await?;
    println!("{}", result.decision_requirements_id);

    Ok(())
}
// endregion GetDecisionRequirements

// region GetDecisionRequirementsXML
async fn get_decision_requirements_xml(
    decision_requirements_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let xml = client
        .get_decision_requirements_xml(GetDecisionRequirementsXmlParams {
            decision_requirements_key,
        })
        .await?;

    println!("{xml}");

    Ok(())
}
// endregion GetDecisionRequirementsXML

// region SearchDecisionRequirements
async fn search_decision_requirements() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_decision_requirements(SearchDecisionRequirementsParams {
            decision_requirements_search_query: Some(DecisionRequirementsSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.decision_requirements_id);
    }

    Ok(())
}
// endregion SearchDecisionRequirements

fn main() {
    // Examples above are compiled, not executed.
}
