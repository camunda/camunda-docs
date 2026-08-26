//! Compilable usage examples for user operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::user_api::CreateUserParams;
use camunda_orchestration_sdk::apis::user_api::DeleteUserParams;
use camunda_orchestration_sdk::apis::user_api::GetUserParams;
use camunda_orchestration_sdk::apis::user_api::SearchUsersParams;
use camunda_orchestration_sdk::apis::user_api::UpdateUserParams;
use camunda_orchestration_sdk::models::UserRequest;
use camunda_orchestration_sdk::models::UserSearchQueryRequest;
use camunda_orchestration_sdk::models::UserUpdateRequest;
use camunda_orchestration_sdk::models::Username;
use camunda_orchestration_sdk::CamundaClient;

// region CreateUser
async fn create_user() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_user(CreateUserParams {
            user_request: UserRequest {
                password: "my-password".to_string(),
                username: Username::assume_exists("my-user"),
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.username);

    Ok(())
}
// endregion CreateUser

// region DeleteUser
async fn delete_user(username: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client.delete_user(DeleteUserParams { username }).await?;
    println!("Delete user: done");

    Ok(())
}
// endregion DeleteUser

// region GetUser
async fn get_user(username: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client.get_user(GetUserParams { username }).await?;
    println!("{}", result.username);

    Ok(())
}
// endregion GetUser

// region SearchUsers
async fn search_users() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_users(SearchUsersParams {
            user_search_query_request: Some(UserSearchQueryRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion SearchUsers

// region UpdateUser
async fn update_user(username: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .update_user(UpdateUserParams {
            username,
            user_update_request: UserUpdateRequest::default(),
        })
        .await?;
    println!("{}", result.username);

    Ok(())
}
// endregion UpdateUser

fn main() {
    // Examples above are compiled, not executed.
}
