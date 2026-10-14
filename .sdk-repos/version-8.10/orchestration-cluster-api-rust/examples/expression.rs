//! Compilable usage examples for expression operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::expression_api::EvaluateExpressionParams;
use camunda_orchestration_sdk::models::ExpressionEvaluationRequest;
use camunda_orchestration_sdk::CamundaClient;

// region EvaluateExpression
async fn evaluate_expression() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .evaluate_expression(EvaluateExpressionParams {
            expression_evaluation_request: ExpressionEvaluationRequest {
                expression: "my-expression".to_string(),
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.expression);

    Ok(())
}
// endregion EvaluateExpression

fn main() {
    // Examples above are compiled, not executed.
}
