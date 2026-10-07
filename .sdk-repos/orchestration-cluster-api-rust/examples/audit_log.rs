//! Compilable usage examples for audit log operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::audit_log_api::GetAuditLogParams;
use camunda_orchestration_sdk::apis::audit_log_api::SearchAuditLogsParams;
use camunda_orchestration_sdk::models::AuditLogSearchQueryRequest;
use camunda_orchestration_sdk::CamundaClient;

// region GetAuditLog
async fn get_audit_log(audit_log_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_audit_log(GetAuditLogParams { audit_log_key })
        .await?;
    println!("{}", result.entity_key);

    Ok(())
}
// endregion GetAuditLog

// region SearchAuditLogs
async fn search_audit_logs() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_audit_logs(SearchAuditLogsParams {
            audit_log_search_query_request: Some(AuditLogSearchQueryRequest::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.entity_key);
    }

    Ok(())
}
// endregion SearchAuditLogs

fn main() {
    // Examples above are compiled, not executed.
}
