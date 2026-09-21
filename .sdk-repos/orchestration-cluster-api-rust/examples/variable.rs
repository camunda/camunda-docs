//! Compilable usage examples for variable operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::variable_api::GetVariableParams;
use camunda_orchestration_sdk::models::VariableSearchQuery;
use camunda_orchestration_sdk::CamundaClient;

// region GetVariable
async fn get_variable(variable_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_variable(GetVariableParams { variable_key })
        .await?;
    println!("{}", result.name);

    Ok(())
}
// endregion GetVariable

// region SearchVariables
async fn search_variables() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    // An empty query returns the first page of all variables. Set `filter` to narrow
    // by process instance, scope, name, or value.
    let results = client
        .search_variables(VariableSearchQuery::default())
        .await?;

    for variable in results.items {
        println!("{} = {}", variable.name, variable.value);
    }

    Ok(())
}
// endregion SearchVariables

fn main() {
    // Examples above are compiled, not executed.
}
