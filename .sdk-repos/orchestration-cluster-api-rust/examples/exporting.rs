//! Compilable usage examples for exporting operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::exporting_api::PauseClusterExportingParams;
use camunda_orchestration_sdk::apis::exporting_api::PauseExportingParams;
use camunda_orchestration_sdk::CamundaClient;

// region GetExportingStatus
async fn get_exporting_status() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let status = client.get_exporting_status().await?;
    println!("{status:#?}");

    Ok(())
}
// endregion GetExportingStatus

// region PauseExporting
async fn pause_exporting() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .pause_exporting(PauseExportingParams { soft: Some(true) })
        .await?;
    println!("Pause exporting: done");

    Ok(())
}
// endregion PauseExporting

// region ResumeExporting
async fn resume_exporting() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client.resume_exporting().await?;
    println!("Resume exporting: done");

    Ok(())
}
// endregion ResumeExporting

// region GetClusterExportingStatus
async fn get_cluster_exporting_status() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let status = client.get_cluster_exporting_status().await?;
    println!("{status:#?}");

    Ok(())
}
// endregion GetClusterExportingStatus

// region PauseClusterExporting
async fn pause_cluster_exporting() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .pause_cluster_exporting(PauseClusterExportingParams { soft: Some(true) })
        .await?;
    println!("Pause cluster exporting: done");

    Ok(())
}
// endregion PauseClusterExporting

// region ResumeClusterExporting
async fn resume_cluster_exporting() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client.resume_cluster_exporting().await?;
    println!("Resume cluster exporting: done");

    Ok(())
}
// endregion ResumeClusterExporting

fn main() {
    // Examples above are compiled, not executed.
}
