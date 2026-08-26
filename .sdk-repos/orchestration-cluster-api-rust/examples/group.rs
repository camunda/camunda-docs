//! Compilable usage examples for group operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::group_api::AssignClientToGroupParams;
use camunda_orchestration_sdk::apis::group_api::AssignMappingRuleToGroupParams;
use camunda_orchestration_sdk::apis::group_api::AssignUserToGroupParams;
use camunda_orchestration_sdk::apis::group_api::CreateGroupParams;
use camunda_orchestration_sdk::apis::group_api::DeleteGroupParams;
use camunda_orchestration_sdk::apis::group_api::GetGroupParams;
use camunda_orchestration_sdk::apis::group_api::SearchClientsForGroupParams;
use camunda_orchestration_sdk::apis::group_api::SearchGroupsParams;
use camunda_orchestration_sdk::apis::group_api::SearchMappingRulesForGroupParams;
use camunda_orchestration_sdk::apis::group_api::SearchRolesForGroupParams;
use camunda_orchestration_sdk::apis::group_api::SearchUsersForGroupParams;
use camunda_orchestration_sdk::apis::group_api::UnassignClientFromGroupParams;
use camunda_orchestration_sdk::apis::group_api::UnassignMappingRuleFromGroupParams;
use camunda_orchestration_sdk::apis::group_api::UnassignUserFromGroupParams;
use camunda_orchestration_sdk::apis::group_api::UpdateGroupParams;
use camunda_orchestration_sdk::models::GroupClientSearchQueryRequest;
use camunda_orchestration_sdk::models::GroupCreateRequest;
use camunda_orchestration_sdk::models::GroupId;
use camunda_orchestration_sdk::models::GroupSearchQueryRequest;
use camunda_orchestration_sdk::models::GroupUpdateRequest;
use camunda_orchestration_sdk::models::GroupUserSearchQueryRequest;
use camunda_orchestration_sdk::models::MappingRuleSearchQueryRequest;
use camunda_orchestration_sdk::models::RoleSearchQueryRequest;
use camunda_orchestration_sdk::CamundaClient;

// region AssignClientToGroup
async fn assign_client_to_group(
    group_id: String,
    client_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .assign_client_to_group(AssignClientToGroupParams {
            group_id,
            client_id,
        })
        .await?;
    println!("Assign a client to a group: done");

    Ok(())
}
// endregion AssignClientToGroup

// region AssignMappingRuleToGroup
async fn assign_mapping_rule_to_group(
    group_id: String,
    mapping_rule_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .assign_mapping_rule_to_group(AssignMappingRuleToGroupParams {
            group_id,
            mapping_rule_id,
        })
        .await?;
    println!("Assign a mapping rule to a group: done");

    Ok(())
}
// endregion AssignMappingRuleToGroup

// region AssignUserToGroup
async fn assign_user_to_group(
    group_id: String,
    username: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .assign_user_to_group(AssignUserToGroupParams { group_id, username })
        .await?;
    println!("Assign a user to a group: done");

    Ok(())
}
// endregion AssignUserToGroup

// region CreateGroup
async fn create_group() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_group(CreateGroupParams {
            group_create_request: Some(GroupCreateRequest {
                group_id: GroupId::assume_exists("my-group"),
                name: "my-variable".to_string(),
                ..Default::default()
            }),
        })
        .await?;
    println!("{}", result.group_id);

    Ok(())
}
// endregion CreateGroup

// region DeleteGroup
async fn delete_group(group_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client.delete_group(DeleteGroupParams { group_id }).await?;
    println!("Delete group: done");

    Ok(())
}
// endregion DeleteGroup

// region GetGroup
async fn get_group(group_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client.get_group(GetGroupParams { group_id }).await?;
    println!("{}", result.group_id);

    Ok(())
}
// endregion GetGroup

// region SearchClientsForGroup
async fn search_clients_for_group(group_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_clients_for_group(SearchClientsForGroupParams {
            group_id,
            group_client_search_query_request: Some(GroupClientSearchQueryRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion SearchClientsForGroup

// region SearchGroups
async fn search_groups() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_groups(SearchGroupsParams {
            group_search_query_request: Some(GroupSearchQueryRequest::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.group_id);
    }

    Ok(())
}
// endregion SearchGroups

// region SearchMappingRulesForGroup
async fn search_mapping_rules_for_group(
    group_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_mapping_rules_for_group(SearchMappingRulesForGroupParams {
            group_id,
            mapping_rule_search_query_request: Some(MappingRuleSearchQueryRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion SearchMappingRulesForGroup

// region SearchRolesForGroup
async fn search_roles_for_group(group_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_roles_for_group(SearchRolesForGroupParams {
            group_id,
            role_search_query_request: Some(RoleSearchQueryRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion SearchRolesForGroup

// region SearchUsersForGroup
async fn search_users_for_group(group_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_users_for_group(SearchUsersForGroupParams {
            group_id,
            group_user_search_query_request: Some(GroupUserSearchQueryRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion SearchUsersForGroup

// region UnassignClientFromGroup
async fn unassign_client_from_group(
    group_id: String,
    client_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .unassign_client_from_group(UnassignClientFromGroupParams {
            group_id,
            client_id,
        })
        .await?;
    println!("Unassign a client from a group: done");

    Ok(())
}
// endregion UnassignClientFromGroup

// region UnassignMappingRuleFromGroup
async fn unassign_mapping_rule_from_group(
    group_id: String,
    mapping_rule_id: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .unassign_mapping_rule_from_group(UnassignMappingRuleFromGroupParams {
            group_id,
            mapping_rule_id,
        })
        .await?;
    println!("Unassign a mapping rule from a group: done");

    Ok(())
}
// endregion UnassignMappingRuleFromGroup

// region UnassignUserFromGroup
async fn unassign_user_from_group(
    group_id: String,
    username: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .unassign_user_from_group(UnassignUserFromGroupParams { group_id, username })
        .await?;
    println!("Unassign a user from a group: done");

    Ok(())
}
// endregion UnassignUserFromGroup

// region UpdateGroup
async fn update_group(group_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .update_group(UpdateGroupParams {
            group_id,
            group_update_request: GroupUpdateRequest {
                name: "my-variable".to_string(),
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.group_id);

    Ok(())
}
// endregion UpdateGroup

fn main() {
    // Examples above are compiled, not executed.
}
