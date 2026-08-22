//! Compilable usage examples for runtime backup operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::backup_api::DeleteHistoryBackupParams;
use camunda_orchestration_sdk::apis::backup_api::DeleteRuntimeBackupParams;
use camunda_orchestration_sdk::apis::backup_api::GetHistoryBackupParams;
use camunda_orchestration_sdk::apis::backup_api::GetRuntimeBackupParams;
use camunda_orchestration_sdk::apis::backup_api::ListHistoryBackupsParams;
use camunda_orchestration_sdk::apis::backup_api::ListRuntimeBackupsParams;
use camunda_orchestration_sdk::apis::backup_api::TakeHistoryBackupParams;
use camunda_orchestration_sdk::apis::backup_api::TakeRuntimeBackupParams;
use camunda_orchestration_sdk::models::TakeHistoryBackupRequest;
use camunda_orchestration_sdk::models::TakeRuntimeBackupRequest;
use camunda_orchestration_sdk::CamundaClient;

// region TakeRuntimeBackup
async fn take_runtime_backup() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .take_runtime_backup(TakeRuntimeBackupParams {
            take_runtime_backup_request: Some(TakeRuntimeBackupRequest {
                backup_id: Some(Some(1)),
            }),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion TakeRuntimeBackup

// region ListRuntimeBackups
async fn list_runtime_backups() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let backups = client
        .list_runtime_backups(ListRuntimeBackupsParams { prefix: None })
        .await?;
    for backup in backups {
        println!("{backup:#?}");
    }

    Ok(())
}
// endregion ListRuntimeBackups

// region GetRuntimeBackup
async fn get_runtime_backup() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_runtime_backup(GetRuntimeBackupParams { backup_id: 1 })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion GetRuntimeBackup

// region DeleteRuntimeBackup
async fn delete_runtime_backup() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .delete_runtime_backup(DeleteRuntimeBackupParams { backup_id: 1 })
        .await?;
    println!("Delete runtime backup: done");

    Ok(())
}
// endregion DeleteRuntimeBackup

// region GetRuntimeBackupState
async fn get_runtime_backup_state() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let state = client.get_runtime_backup_state().await?;
    println!("{state:#?}");

    Ok(())
}
// endregion GetRuntimeBackupState

// region SyncRuntimeBackupState
async fn sync_runtime_backup_state() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let state = client.sync_runtime_backup_state().await?;
    println!("{state:#?}");

    Ok(())
}
// endregion SyncRuntimeBackupState

// region DeleteRuntimeBackupState
async fn delete_runtime_backup_state() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client.delete_runtime_backup_state().await?;
    println!("Delete runtime backup state: done");

    Ok(())
}
// endregion DeleteRuntimeBackupState

// region TakeHistoryBackup
async fn take_history_backup() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .take_history_backup(TakeHistoryBackupParams {
            take_history_backup_request: TakeHistoryBackupRequest { backup_id: 1 },
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion TakeHistoryBackup

// region ListHistoryBackups
async fn list_history_backups() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    // `prefix` must end in a single '*'. Setting `verbose` to false makes the
    // query cheaper, at the cost of snapshot-level detail.
    let backups = client
        .list_history_backups(ListHistoryBackupsParams {
            prefix: None,
            verbose: None,
        })
        .await?;
    for backup in backups {
        println!("{backup:#?}");
    }

    Ok(())
}
// endregion ListHistoryBackups

// region GetHistoryBackup
async fn get_history_backup() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_history_backup(GetHistoryBackupParams { backup_id: 1 })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion GetHistoryBackup

// region DeleteHistoryBackup
async fn delete_history_backup() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .delete_history_backup(DeleteHistoryBackupParams { backup_id: 1 })
        .await?;
    println!("Delete history backup: done");

    Ok(())
}
// endregion DeleteHistoryBackup

fn main() {
    // Examples above are compiled, not executed.
}
