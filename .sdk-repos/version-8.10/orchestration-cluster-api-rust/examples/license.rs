//! Compilable usage examples for license operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::CamundaClient;

// region GetLicense
async fn get_license() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client.get_license().await?;
    println!("{}", result.license_type);

    Ok(())
}
// endregion GetLicense

fn main() {
    // Examples above are compiled, not executed.
}
