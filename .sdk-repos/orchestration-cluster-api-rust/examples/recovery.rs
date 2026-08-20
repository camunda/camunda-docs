//! Compilable usage examples for recovery operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::recovery_api::ChangeClusterModeAsClusterAdminParams;
use camunda_orchestration_sdk::apis::recovery_api::ChangeClusterModeParams;
use camunda_orchestration_sdk::apis::recovery_api::RestoreParams;
use camunda_orchestration_sdk::models::Mode;
use camunda_orchestration_sdk::models::RestoreRequest;
use camunda_orchestration_sdk::CamundaClient;

// region ChangeClusterMode
async fn change_cluster_mode() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .change_cluster_mode(ChangeClusterModeParams {
            mode: Mode::Recovering,
            dry_run: None,
        })
        .await?;
    println!("{}", result.change_id);

    Ok(())
}
// endregion ChangeClusterMode

// region ChangeClusterModeAsClusterAdmin
async fn change_cluster_mode_as_cluster_admin() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    // Omit `physical_tenant_id` to apply the change to every physical tenant.
    let result = client
        .change_cluster_mode_as_cluster_admin(ChangeClusterModeAsClusterAdminParams {
            mode: Mode::Recovering,
            physical_tenant_id: Some("default".to_string()),
            dry_run: Some(true),
        })
        .await?;
    println!("{}", result.change_id);

    Ok(())
}
// endregion ChangeClusterModeAsClusterAdmin

// region Restore
async fn restore() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .restore(RestoreParams {
            restore_request: RestoreRequest::default(),
            dry_run: None,
        })
        .await?;
    println!("{}", result.change_id);

    Ok(())
}
// endregion Restore

// region GetRestoreStatus
async fn get_restore_status() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let status = client.get_restore_status().await?;
    println!("{status:#?}");

    Ok(())
}
// endregion GetRestoreStatus

fn main() {
    // Examples above are compiled, not executed.
}
