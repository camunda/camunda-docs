//! Compilable usage examples for role operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::role_api::AssignRoleToClientParams;
use camunda_orchestration_sdk::apis::role_api::AssignRoleToGroupParams;
use camunda_orchestration_sdk::apis::role_api::AssignRoleToMappingRuleParams;
use camunda_orchestration_sdk::apis::role_api::AssignRoleToUserParams;
use camunda_orchestration_sdk::apis::role_api::CreateRoleParams;
use camunda_orchestration_sdk::apis::role_api::DeleteRoleParams;
use camunda_orchestration_sdk::apis::role_api::GetRoleParams;
use camunda_orchestration_sdk::apis::role_api::SearchClientsForRoleParams;
use camunda_orchestration_sdk::apis::role_api::SearchGroupsForRoleParams;
use camunda_orchestration_sdk::apis::role_api::SearchMappingRulesForRoleParams;
use camunda_orchestration_sdk::apis::role_api::SearchRolesParams;
use camunda_orchestration_sdk::apis::role_api::SearchUsersForRoleParams;
use camunda_orchestration_sdk::apis::role_api::UnassignRoleFromClientParams;
use camunda_orchestration_sdk::apis::role_api::UnassignRoleFromGroupParams;
use camunda_orchestration_sdk::apis::role_api::UnassignRoleFromMappingRuleParams;
use camunda_orchestration_sdk::apis::role_api::UnassignRoleFromUserParams;
use camunda_orchestration_sdk::apis::role_api::UpdateRoleParams;
use camunda_orchestration_sdk::models::MappingRuleSearchQueryRequest;
use camunda_orchestration_sdk::models::RoleClientSearchQueryRequest;
use camunda_orchestration_sdk::models::RoleCreateRequest;
use camunda_orchestration_sdk::models::RoleGroupSearchQueryRequest;
use camunda_orchestration_sdk::models::RoleId;
use camunda_orchestration_sdk::models::RoleSearchQueryRequest;
use camunda_orchestration_sdk::models::RoleUpdateRequest;
use camunda_orchestration_sdk::models::RoleUserSearchQueryRequest;
use camunda_orchestration_sdk::CamundaClient;

// region AssignRoleToClient
async fn assign_role_to_client(
    role_id: String,
    client_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .assign_role_to_client(AssignRoleToClientParams { role_id, client_id })
        .await?;
    println!("Assign a role to a client: done");

    Ok(())
}
// endregion AssignRoleToClient

// region AssignRoleToGroup
async fn assign_role_to_group(
    role_id: String,
    group_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .assign_role_to_group(AssignRoleToGroupParams { role_id, group_id })
        .await?;
    println!("Assign a role to a group: done");

    Ok(())
}
// endregion AssignRoleToGroup

// region AssignRoleToMappingRule
async fn assign_role_to_mapping_rule(
    role_id: String,
    mapping_rule_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .assign_role_to_mapping_rule(AssignRoleToMappingRuleParams {
            role_id,
            mapping_rule_id,
        })
        .await?;
    println!("Assign a role to a mapping rule: done");

    Ok(())
}
// endregion AssignRoleToMappingRule

// region AssignRoleToUser
async fn assign_role_to_user(
    role_id: String,
    username: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .assign_role_to_user(AssignRoleToUserParams { role_id, username })
        .await?;
    println!("Assign a role to a user: done");

    Ok(())
}
// endregion AssignRoleToUser

// region CreateRole
async fn create_role() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_role(CreateRoleParams {
            role_create_request: Some(RoleCreateRequest {
                role_id: RoleId::assume_exists("my-role"),
                name: "my-variable".to_string(),
                ..Default::default()
            }),
        })
        .await?;
    println!("{}", result.role_id);

    Ok(())
}
// endregion CreateRole

// region DeleteRole
async fn delete_role(role_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client.delete_role(DeleteRoleParams { role_id }).await?;
    println!("Delete role: done");

    Ok(())
}
// endregion DeleteRole

// region GetRole
async fn get_role(role_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client.get_role(GetRoleParams { role_id }).await?;
    println!("{}", result.role_id);

    Ok(())
}
// endregion GetRole

// region SearchClientsForRole
async fn search_clients_for_role(role_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_clients_for_role(SearchClientsForRoleParams {
            role_id,
            role_client_search_query_request: Some(RoleClientSearchQueryRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion SearchClientsForRole

// region SearchGroupsForRole
async fn search_groups_for_role(role_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_groups_for_role(SearchGroupsForRoleParams {
            role_id,
            role_group_search_query_request: Some(RoleGroupSearchQueryRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion SearchGroupsForRole

// region SearchMappingRulesForRole
async fn search_mapping_rules_for_role(role_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_mapping_rules_for_role(SearchMappingRulesForRoleParams {
            role_id,
            mapping_rule_search_query_request: Some(MappingRuleSearchQueryRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion SearchMappingRulesForRole

// region SearchRoles
async fn search_roles() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_roles(SearchRolesParams {
            role_search_query_request: Some(RoleSearchQueryRequest::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.role_id);
    }

    Ok(())
}
// endregion SearchRoles

// region SearchUsersForRole
async fn search_users_for_role(role_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_users_for_role(SearchUsersForRoleParams {
            role_id,
            role_user_search_query_request: Some(RoleUserSearchQueryRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion SearchUsersForRole

// region UnassignRoleFromClient
async fn unassign_role_from_client(
    role_id: String,
    client_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .unassign_role_from_client(UnassignRoleFromClientParams { role_id, client_id })
        .await?;
    println!("Unassign a role from a client: done");

    Ok(())
}
// endregion UnassignRoleFromClient

// region UnassignRoleFromGroup
async fn unassign_role_from_group(
    role_id: String,
    group_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .unassign_role_from_group(UnassignRoleFromGroupParams { role_id, group_id })
        .await?;
    println!("Unassign a role from a group: done");

    Ok(())
}
// endregion UnassignRoleFromGroup

// region UnassignRoleFromMappingRule
async fn unassign_role_from_mapping_rule(
    role_id: String,
    mapping_rule_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .unassign_role_from_mapping_rule(UnassignRoleFromMappingRuleParams {
            role_id,
            mapping_rule_id,
        })
        .await?;
    println!("Unassign a role from a mapping rule: done");

    Ok(())
}
// endregion UnassignRoleFromMappingRule

// region UnassignRoleFromUser
async fn unassign_role_from_user(
    role_id: String,
    username: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .unassign_role_from_user(UnassignRoleFromUserParams { role_id, username })
        .await?;
    println!("Unassign a role from a user: done");

    Ok(())
}
// endregion UnassignRoleFromUser

// region UpdateRole
async fn update_role(role_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .update_role(UpdateRoleParams {
            role_id,
            role_update_request: RoleUpdateRequest {
                name: "my-variable".to_string(),
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.role_id);

    Ok(())
}
// endregion UpdateRole

fn main() {
    // Examples above are compiled, not executed.
}
