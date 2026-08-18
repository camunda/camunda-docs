//! Compilable usage examples for secret operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::secret_api::ListSecretsParams;
use camunda_orchestration_sdk::apis::secret_api::ResolveSecretsParams;
use camunda_orchestration_sdk::models::SecretResolveRequest;
use camunda_orchestration_sdk::CamundaClient;

// region ResolveSecrets
async fn resolve_secrets() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .resolve_secrets(ResolveSecretsParams {
            secret_resolve_request: SecretResolveRequest {
                references: vec!["camunda.secrets.my-secret".to_string()],
            },
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion ResolveSecrets

// region ListSecrets
async fn list_secrets() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .list_secrets(ListSecretsParams { body: None })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion ListSecrets

fn main() {
    // Examples above are compiled, not executed.
}
