//! Compilable usage examples for message operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::models::MessageCorrelationRequest;
use camunda_orchestration_sdk::models::MessagePublicationRequest;
use camunda_orchestration_sdk::CamundaClient;

// region CorrelateMessage
async fn correlate_message() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    // Unlike `publish_message`, this blocks until the message is correlated and
    // returns the process instance it was correlated with.
    let correlated = client
        .correlate_message(MessageCorrelationRequest {
            name: "order-received".to_string(),
            correlation_key: Some("ORD-4711".to_string()),
            variables: Some(
                [("total".to_string(), serde_json::json!(99.5))]
                    .into_iter()
                    .collect(),
            ),
            ..Default::default()
        })
        .await?;

    println!(
        "Correlated message {} with process instance {}",
        correlated.message_key, correlated.process_instance_key
    );

    Ok(())
}
// endregion CorrelateMessage

// region PublishMessage
async fn publish_message() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let published = client
        .publish_message(MessagePublicationRequest {
            name: "order-received".to_string(),
            correlation_key: Some("ORD-4711".to_string()),
            time_to_live: Some(60_000),
            variables: Some(
                [("total".to_string(), serde_json::json!(99.5))]
                    .into_iter()
                    .collect(),
            ),
            ..Default::default()
        })
        .await?;

    println!("Published message {}", published.message_key);

    Ok(())
}
// endregion PublishMessage

fn main() {
    // Examples above are compiled, not executed.
}
