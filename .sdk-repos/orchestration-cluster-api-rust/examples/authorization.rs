//! Compilable usage examples for authorization operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::authorization_api::CreateAuthorizationParams;
use camunda_orchestration_sdk::apis::authorization_api::DeleteAuthorizationParams;
use camunda_orchestration_sdk::apis::authorization_api::GetAuthorizationParams;
use camunda_orchestration_sdk::apis::authorization_api::SearchAuthorizationsParams;
use camunda_orchestration_sdk::apis::authorization_api::UpdateAuthorizationParams;
use camunda_orchestration_sdk::models::AuthorizationIdBasedRequest;
use camunda_orchestration_sdk::models::AuthorizationRequest;
use camunda_orchestration_sdk::models::AuthorizationSearchQuery;
use camunda_orchestration_sdk::models::OwnerTypeEnum;
use camunda_orchestration_sdk::models::PermissionTypeEnum;
use camunda_orchestration_sdk::models::ResourceTypeEnum;
use camunda_orchestration_sdk::CamundaClient;

// region CreateAuthorization
async fn create_authorization() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_authorization(CreateAuthorizationParams {
            authorization_request: AuthorizationRequest::AuthorizationIdBasedRequest(Box::new(
                AuthorizationIdBasedRequest {
                    owner_id: "my-owner".to_string(),
                    owner_type: OwnerTypeEnum::User,
                    resource_id: "my-resource".to_string(),
                    resource_type: ResourceTypeEnum::AuditLog,
                    permission_types: vec![PermissionTypeEnum::Access],
                },
            )),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion CreateAuthorization

// region DeleteAuthorization
async fn delete_authorization(authorization_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .delete_authorization(DeleteAuthorizationParams { authorization_key })
        .await?;
    println!("Delete authorization: done");

    Ok(())
}
// endregion DeleteAuthorization

// region GetAuthorization
async fn get_authorization(authorization_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_authorization(GetAuthorizationParams { authorization_key })
        .await?;
    println!("{}", result.owner_id);

    Ok(())
}
// endregion GetAuthorization

// region SearchAuthorizations
async fn search_authorizations() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_authorizations(SearchAuthorizationsParams {
            authorization_search_query: Some(AuthorizationSearchQuery::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion SearchAuthorizations

// region UpdateAuthorization
async fn update_authorization(authorization_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .update_authorization(UpdateAuthorizationParams {
            authorization_key,
            authorization_request: AuthorizationRequest::AuthorizationIdBasedRequest(Box::new(
                AuthorizationIdBasedRequest {
                    owner_id: "my-owner".to_string(),
                    owner_type: OwnerTypeEnum::User,
                    resource_id: "my-resource".to_string(),
                    resource_type: ResourceTypeEnum::AuditLog,
                    permission_types: vec![PermissionTypeEnum::Access],
                },
            )),
        })
        .await?;
    println!("Update authorization: done");

    Ok(())
}
// endregion UpdateAuthorization

fn main() {
    // Examples above are compiled, not executed.
}
