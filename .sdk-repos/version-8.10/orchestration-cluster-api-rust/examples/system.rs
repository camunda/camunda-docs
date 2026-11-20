//! Compilable usage examples for system operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::system_api::GetUsageMetricsParams;
use camunda_orchestration_sdk::CamundaClient;

// region GetSystemConfiguration
async fn get_system_configuration() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client.get_system_configuration().await?;
    println!("{result:#?}");

    Ok(())
}
// endregion GetSystemConfiguration

// region GetUsageMetrics
async fn get_usage_metrics() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_usage_metrics(GetUsageMetricsParams {
            start_time: Default::default(),
            end_time: Default::default(),
            tenant_id: None,
            with_tenants: None,
        })
        .await?;
    println!("{}", result.active_tenants);

    Ok(())
}
// endregion GetUsageMetrics

fn main() {
    // Examples above are compiled, not executed.
}
