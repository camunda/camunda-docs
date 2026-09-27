//! Compilable usage examples for conditional operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::conditional_api::EvaluateConditionalsParams;
use camunda_orchestration_sdk::models::ConditionalEvaluationInstruction;
use camunda_orchestration_sdk::CamundaClient;

// region EvaluateConditionals
async fn evaluate_conditionals() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .evaluate_conditionals(EvaluateConditionalsParams {
            conditional_evaluation_instruction: ConditionalEvaluationInstruction {
                variables: [("key".to_string(), serde_json::json!({"key": "value"}))]
                    .into_iter()
                    .collect(),
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.tenant_id);

    Ok(())
}
// endregion EvaluateConditionals

fn main() {
    // Examples above are compiled, not executed.
}
