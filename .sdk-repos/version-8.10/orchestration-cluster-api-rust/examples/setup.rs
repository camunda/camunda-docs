//! Compilable usage examples for setup operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::setup_api::CreateAdminUserParams;
use camunda_orchestration_sdk::models::UserRequest;
use camunda_orchestration_sdk::models::Username;
use camunda_orchestration_sdk::CamundaClient;

// region CreateAdminUser
async fn create_admin_user() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_admin_user(CreateAdminUserParams {
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
// endregion CreateAdminUser

fn main() {
    // Examples above are compiled, not executed.
}
