//! Compilable usage examples for clock operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::clock_api::PinClockParams;
use camunda_orchestration_sdk::models::ClockPinRequest;
use camunda_orchestration_sdk::CamundaClient;

// region PinClock
async fn pin_clock() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .pin_clock(PinClockParams {
            clock_pin_request: ClockPinRequest { timestamp: 1 },
        })
        .await?;
    println!("Pin internal clock (alpha): done");

    Ok(())
}
// endregion PinClock

// region ResetClock
async fn reset_clock() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client.reset_clock().await?;
    println!("Reset internal clock (alpha): done");

    Ok(())
}
// endregion ResetClock

fn main() {
    // Examples above are compiled, not executed.
}
