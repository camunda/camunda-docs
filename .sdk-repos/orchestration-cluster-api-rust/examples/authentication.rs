//! Compilable usage examples for authentication operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::authentication_api::SearchOwnAuthorizationsParams;
use camunda_orchestration_sdk::models::AuthorizationSearchQuery;
use camunda_orchestration_sdk::CamundaClient;

// region GetAuthentication
async fn get_authentication() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client.get_authentication().await?;
    println!("{}", result.username);

    Ok(())
}
// endregion GetAuthentication

// region SearchOwnAuthorizations
async fn search_own_authorizations() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_own_authorizations(SearchOwnAuthorizationsParams {
            authorization_search_query: Some(AuthorizationSearchQuery::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion SearchOwnAuthorizations

fn main() {
    // Examples above are compiled, not executed.
}
