//! Compilable usage examples for decision definition operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::decision_definition_api::GetDecisionDefinitionParams;
use camunda_orchestration_sdk::apis::decision_definition_api::GetDecisionDefinitionXmlParams;
use camunda_orchestration_sdk::apis::decision_definition_api::SearchDecisionDefinitionsParams;
use camunda_orchestration_sdk::models::DecisionDefinitionId;
use camunda_orchestration_sdk::models::DecisionDefinitionSearchQuery;
use camunda_orchestration_sdk::models::DecisionEvaluationById;
use camunda_orchestration_sdk::models::DecisionEvaluationInstruction;
use camunda_orchestration_sdk::CamundaClient;

// region EvaluateDecision
async fn evaluate_decision() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let instruction =
        DecisionEvaluationInstruction::DecisionEvaluationById(Box::new(DecisionEvaluationById {
            decision_definition_id: DecisionDefinitionId::assume_exists("approval-decision"),
            variables: Some(
                [("amount".to_string(), serde_json::json!(500))]
                    .into_iter()
                    .collect(),
            ),
            ..Default::default()
        }));

    let evaluated = client.evaluate_decision(instruction).await?;

    println!("Decision output: {}", evaluated.output);

    Ok(())
}
// endregion EvaluateDecision

// region GetDecisionDefinition
async fn get_decision_definition(
    decision_definition_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_decision_definition(GetDecisionDefinitionParams {
            decision_definition_key,
        })
        .await?;
    println!("{}", result.decision_definition_id);

    Ok(())
}
// endregion GetDecisionDefinition

// region GetDecisionDefinitionXML
async fn get_decision_definition_xml(
    decision_definition_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let xml = client
        .get_decision_definition_xml(GetDecisionDefinitionXmlParams {
            decision_definition_key,
        })
        .await?;

    println!("{xml}");

    Ok(())
}
// endregion GetDecisionDefinitionXML

// region SearchDecisionDefinitions
async fn search_decision_definitions() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_decision_definitions(SearchDecisionDefinitionsParams {
            decision_definition_search_query: Some(DecisionDefinitionSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.decision_definition_id);
    }

    Ok(())
}
// endregion SearchDecisionDefinitions

fn main() {
    // Examples above are compiled, not executed.
}
