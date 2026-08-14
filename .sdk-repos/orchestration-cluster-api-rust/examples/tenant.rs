//! Compilable usage examples for tenant operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::tenant_api::AssignClientToTenantParams;
use camunda_orchestration_sdk::apis::tenant_api::AssignGroupToTenantParams;
use camunda_orchestration_sdk::apis::tenant_api::AssignMappingRuleToTenantParams;
use camunda_orchestration_sdk::apis::tenant_api::AssignRoleToTenantParams;
use camunda_orchestration_sdk::apis::tenant_api::AssignUserToTenantParams;
use camunda_orchestration_sdk::apis::tenant_api::CreateTenantParams;
use camunda_orchestration_sdk::apis::tenant_api::DeleteTenantParams;
use camunda_orchestration_sdk::apis::tenant_api::GetTenantParams;
use camunda_orchestration_sdk::apis::tenant_api::SearchClientsForTenantParams;
use camunda_orchestration_sdk::apis::tenant_api::SearchGroupIdsForTenantParams;
use camunda_orchestration_sdk::apis::tenant_api::SearchMappingRulesForTenantParams;
use camunda_orchestration_sdk::apis::tenant_api::SearchRolesForTenantParams;
use camunda_orchestration_sdk::apis::tenant_api::SearchTenantsParams;
use camunda_orchestration_sdk::apis::tenant_api::SearchUsersForTenantParams;
use camunda_orchestration_sdk::apis::tenant_api::UnassignClientFromTenantParams;
use camunda_orchestration_sdk::apis::tenant_api::UnassignGroupFromTenantParams;
use camunda_orchestration_sdk::apis::tenant_api::UnassignMappingRuleFromTenantParams;
use camunda_orchestration_sdk::apis::tenant_api::UnassignRoleFromTenantParams;
use camunda_orchestration_sdk::apis::tenant_api::UnassignUserFromTenantParams;
use camunda_orchestration_sdk::apis::tenant_api::UpdateTenantParams;
use camunda_orchestration_sdk::models::MappingRuleSearchQueryRequest;
use camunda_orchestration_sdk::models::RoleSearchQueryRequest;
use camunda_orchestration_sdk::models::TenantClientSearchQueryRequest;
use camunda_orchestration_sdk::models::TenantCreateRequest;
use camunda_orchestration_sdk::models::TenantGroupSearchQueryRequest;
use camunda_orchestration_sdk::models::TenantId;
use camunda_orchestration_sdk::models::TenantSearchQueryRequest;
use camunda_orchestration_sdk::models::TenantUpdateRequest;
use camunda_orchestration_sdk::models::TenantUserSearchQueryRequest;
use camunda_orchestration_sdk::CamundaClient;

// region AssignClientToTenant
async fn assign_client_to_tenant(
    tenant_id: String,
    client_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .assign_client_to_tenant(AssignClientToTenantParams {
            tenant_id,
            client_id,
        })
        .await?;
    println!("Assign a client to a tenant: done");

    Ok(())
}
// endregion AssignClientToTenant

// region AssignGroupToTenant
async fn assign_group_to_tenant(
    tenant_id: String,
    group_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .assign_group_to_tenant(AssignGroupToTenantParams {
            tenant_id,
            group_id,
        })
        .await?;
    println!("Assign a group to a tenant: done");

    Ok(())
}
// endregion AssignGroupToTenant

// region AssignMappingRuleToTenant
async fn assign_mapping_rule_to_tenant(
    tenant_id: String,
    mapping_rule_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .assign_mapping_rule_to_tenant(AssignMappingRuleToTenantParams {
            tenant_id,
            mapping_rule_id,
        })
        .await?;
    println!("Assign a mapping rule to a tenant: done");

    Ok(())
}
// endregion AssignMappingRuleToTenant

// region AssignRoleToTenant
async fn assign_role_to_tenant(
    tenant_id: String,
    role_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .assign_role_to_tenant(AssignRoleToTenantParams { tenant_id, role_id })
        .await?;
    println!("Assign a role to a tenant: done");

    Ok(())
}
// endregion AssignRoleToTenant

// region AssignUserToTenant
async fn assign_user_to_tenant(
    tenant_id: String,
    username: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .assign_user_to_tenant(AssignUserToTenantParams {
            tenant_id,
            username,
        })
        .await?;
    println!("Assign a user to a tenant: done");

    Ok(())
}
// endregion AssignUserToTenant

// region CreateTenant
async fn create_tenant() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_tenant(CreateTenantParams {
            tenant_create_request: TenantCreateRequest {
                tenant_id: TenantId::assume_exists("my-tenant"),
                name: "my-variable".to_string(),
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.name);

    Ok(())
}
// endregion CreateTenant

// region DeleteTenant
async fn delete_tenant(tenant_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .delete_tenant(DeleteTenantParams { tenant_id })
        .await?;
    println!("Delete tenant: done");

    Ok(())
}
// endregion DeleteTenant

// region GetTenant
async fn get_tenant(tenant_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client.get_tenant(GetTenantParams { tenant_id }).await?;
    println!("{}", result.name);

    Ok(())
}
// endregion GetTenant

// region SearchClientsForTenant
async fn search_clients_for_tenant(tenant_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_clients_for_tenant(SearchClientsForTenantParams {
            tenant_id,
            tenant_client_search_query_request: Some(TenantClientSearchQueryRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion SearchClientsForTenant

// region SearchGroupIdsForTenant
async fn search_group_ids_for_tenant(tenant_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_group_ids_for_tenant(SearchGroupIdsForTenantParams {
            tenant_id,
            tenant_group_search_query_request: Some(TenantGroupSearchQueryRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion SearchGroupIdsForTenant

// region SearchMappingRulesForTenant
async fn search_mapping_rules_for_tenant(
    tenant_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_mapping_rules_for_tenant(SearchMappingRulesForTenantParams {
            tenant_id,
            mapping_rule_search_query_request: Some(MappingRuleSearchQueryRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion SearchMappingRulesForTenant

// region SearchRolesForTenant
async fn search_roles_for_tenant(tenant_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_roles_for_tenant(SearchRolesForTenantParams {
            tenant_id,
            role_search_query_request: Some(RoleSearchQueryRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion SearchRolesForTenant

// region SearchTenants
async fn search_tenants() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_tenants(SearchTenantsParams {
            tenant_search_query_request: Some(TenantSearchQueryRequest::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.name);
    }

    Ok(())
}
// endregion SearchTenants

// region SearchUsersForTenant
async fn search_users_for_tenant(tenant_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_users_for_tenant(SearchUsersForTenantParams {
            tenant_id,
            tenant_user_search_query_request: Some(TenantUserSearchQueryRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion SearchUsersForTenant

// region UnassignClientFromTenant
async fn unassign_client_from_tenant(
    tenant_id: String,
    client_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .unassign_client_from_tenant(UnassignClientFromTenantParams {
            tenant_id,
            client_id,
        })
        .await?;
    println!("Unassign a client from a tenant: done");

    Ok(())
}
// endregion UnassignClientFromTenant

// region UnassignGroupFromTenant
async fn unassign_group_from_tenant(
    tenant_id: String,
    group_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .unassign_group_from_tenant(UnassignGroupFromTenantParams {
            tenant_id,
            group_id,
        })
        .await?;
    println!("Unassign a group from a tenant: done");

    Ok(())
}
// endregion UnassignGroupFromTenant

// region UnassignMappingRuleFromTenant
async fn unassign_mapping_rule_from_tenant(
    tenant_id: String,
    mapping_rule_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .unassign_mapping_rule_from_tenant(UnassignMappingRuleFromTenantParams {
            tenant_id,
            mapping_rule_id,
        })
        .await?;
    println!("Unassign a mapping rule from a tenant: done");

    Ok(())
}
// endregion UnassignMappingRuleFromTenant

// region UnassignRoleFromTenant
async fn unassign_role_from_tenant(
    tenant_id: String,
    role_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .unassign_role_from_tenant(UnassignRoleFromTenantParams { tenant_id, role_id })
        .await?;
    println!("Unassign a role from a tenant: done");

    Ok(())
}
// endregion UnassignRoleFromTenant

// region UnassignUserFromTenant
async fn unassign_user_from_tenant(
    tenant_id: String,
    username: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .unassign_user_from_tenant(UnassignUserFromTenantParams {
            tenant_id,
            username,
        })
        .await?;
    println!("Unassign a user from a tenant: done");

    Ok(())
}
// endregion UnassignUserFromTenant

// region UpdateTenant
async fn update_tenant(tenant_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .update_tenant(UpdateTenantParams {
            tenant_id,
            tenant_update_request: TenantUpdateRequest {
                name: "my-variable".to_string(),
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.name);

    Ok(())
}
// endregion UpdateTenant

fn main() {
    // Examples above are compiled, not executed.
}
