//! Compilable usage examples for cluster variable operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::cluster_variable_api::CreateGlobalClusterVariableParams;
use camunda_orchestration_sdk::apis::cluster_variable_api::CreateTenantClusterVariableParams;
use camunda_orchestration_sdk::apis::cluster_variable_api::DeleteGlobalClusterVariableParams;
use camunda_orchestration_sdk::apis::cluster_variable_api::DeleteTenantClusterVariableParams;
use camunda_orchestration_sdk::apis::cluster_variable_api::GetGlobalClusterVariableParams;
use camunda_orchestration_sdk::apis::cluster_variable_api::GetTenantClusterVariableParams;
use camunda_orchestration_sdk::apis::cluster_variable_api::SearchClusterVariablesParams;
use camunda_orchestration_sdk::apis::cluster_variable_api::UpdateGlobalClusterVariableParams;
use camunda_orchestration_sdk::apis::cluster_variable_api::UpdateTenantClusterVariableParams;
use camunda_orchestration_sdk::models::ClusterVariableName;
use camunda_orchestration_sdk::models::ClusterVariableSearchQueryRequest;
use camunda_orchestration_sdk::models::CreateClusterVariableRequest;
use camunda_orchestration_sdk::models::UpdateClusterVariableRequest;
use camunda_orchestration_sdk::CamundaClient;

// region CreateGlobalClusterVariable
async fn create_global_cluster_variable() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_global_cluster_variable(CreateGlobalClusterVariableParams {
            create_cluster_variable_request: CreateClusterVariableRequest {
                name: ClusterVariableName::assume_exists("my-variable"),
                value: serde_json::json!({"key": "value"}),
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.name);

    Ok(())
}
// endregion CreateGlobalClusterVariable

// region CreateTenantClusterVariable
async fn create_tenant_cluster_variable(
    tenant_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_tenant_cluster_variable(CreateTenantClusterVariableParams {
            tenant_id,
            create_cluster_variable_request: CreateClusterVariableRequest {
                name: ClusterVariableName::assume_exists("my-variable"),
                value: serde_json::json!({"key": "value"}),
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.name);

    Ok(())
}
// endregion CreateTenantClusterVariable

// region DeleteGlobalClusterVariable
async fn delete_global_cluster_variable(name: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .delete_global_cluster_variable(DeleteGlobalClusterVariableParams { name })
        .await?;
    println!("Delete a global-scoped cluster variable: done");

    Ok(())
}
// endregion DeleteGlobalClusterVariable

// region DeleteTenantClusterVariable
async fn delete_tenant_cluster_variable(
    tenant_id: String,
    name: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .delete_tenant_cluster_variable(DeleteTenantClusterVariableParams { tenant_id, name })
        .await?;
    println!("Delete a tenant-scoped cluster variable: done");

    Ok(())
}
// endregion DeleteTenantClusterVariable

// region GetGlobalClusterVariable
async fn get_global_cluster_variable(name: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_global_cluster_variable(GetGlobalClusterVariableParams { name })
        .await?;
    println!("{}", result.name);

    Ok(())
}
// endregion GetGlobalClusterVariable

// region GetTenantClusterVariable
async fn get_tenant_cluster_variable(
    tenant_id: String,
    name: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_tenant_cluster_variable(GetTenantClusterVariableParams { tenant_id, name })
        .await?;
    println!("{}", result.name);

    Ok(())
}
// endregion GetTenantClusterVariable

// region SearchClusterVariables
async fn search_cluster_variables() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_cluster_variables(SearchClusterVariablesParams {
            truncate_values: None,
            cluster_variable_search_query_request: Some(
                ClusterVariableSearchQueryRequest::default(),
            ),
        })
        .await?;
    for item in result.items {
        println!("{}", item.name);
    }

    Ok(())
}
// endregion SearchClusterVariables

// region UpdateGlobalClusterVariable
async fn update_global_cluster_variable(name: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .update_global_cluster_variable(UpdateGlobalClusterVariableParams {
            name,
            update_cluster_variable_request: UpdateClusterVariableRequest {
                value: serde_json::json!({"key": "value"}),
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.name);

    Ok(())
}
// endregion UpdateGlobalClusterVariable

// region UpdateTenantClusterVariable
async fn update_tenant_cluster_variable(
    tenant_id: String,
    name: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .update_tenant_cluster_variable(UpdateTenantClusterVariableParams {
            tenant_id,
            name,
            update_cluster_variable_request: UpdateClusterVariableRequest {
                value: serde_json::json!({"key": "value"}),
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.name);

    Ok(())
}
// endregion UpdateTenantClusterVariable

fn main() {
    // Examples above are compiled, not executed.
}
