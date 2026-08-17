//! Compilable usage examples for recovery operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::recovery_api::ChangeClusterModeParams;
use camunda_orchestration_sdk::apis::recovery_api::RestoreParams;
use camunda_orchestration_sdk::models::RestoreRequest;
use camunda_orchestration_sdk::CamundaClient;

// region ChangeClusterMode
async fn change_cluster_mode() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .change_cluster_mode(ChangeClusterModeParams {
            mode: "my-mode".to_string(),
            dry_run: None,
        })
        .await?;
    println!("{}", result.change_id);

    Ok(())
}
// endregion ChangeClusterMode

// region Restore
async fn restore() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .restore(RestoreParams {
            restore_request: RestoreRequest::default(),
        })
        .await?;
    println!("{}", result.change_id);

    Ok(())
}
// endregion Restore

fn main() {
    // Examples above are compiled, not executed.
}
