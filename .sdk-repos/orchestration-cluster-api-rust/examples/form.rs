//! Compilable usage examples for form operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::form_api::GetFormByKeyParams;
use camunda_orchestration_sdk::CamundaClient;

// region GetFormByKey
async fn get_form_by_key(form_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_form_by_key(GetFormByKeyParams { form_key })
        .await?;
    println!("{}", result.form_id);

    Ok(())
}
// endregion GetFormByKey

fn main() {
    // Examples above are compiled, not executed.
}
