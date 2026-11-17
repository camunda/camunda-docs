//! Compilable usage examples for signal operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::models::SignalBroadcastRequest;
use camunda_orchestration_sdk::CamundaClient;

// region BroadcastSignal
async fn broadcast_signal() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let broadcast = client
        .broadcast_signal(SignalBroadcastRequest {
            signal_name: "cancel-all-orders".to_string(),
            variables: Some(
                [("reason".to_string(), serde_json::json!("stock outage"))]
                    .into_iter()
                    .collect(),
            ),
            ..Default::default()
        })
        .await?;

    println!("Broadcast signal {}", broadcast.signal_key);

    Ok(())
}
// endregion BroadcastSignal

fn main() {
    // Examples above are compiled, not executed.
}
