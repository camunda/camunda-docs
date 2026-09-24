//! Compilable usage examples for mapping rule operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::mapping_rule_api::CreateMappingRuleParams;
use camunda_orchestration_sdk::apis::mapping_rule_api::DeleteMappingRuleParams;
use camunda_orchestration_sdk::apis::mapping_rule_api::GetMappingRuleParams;
use camunda_orchestration_sdk::apis::mapping_rule_api::SearchMappingRuleParams;
use camunda_orchestration_sdk::apis::mapping_rule_api::UpdateMappingRuleParams;
use camunda_orchestration_sdk::models::MappingRuleCreateRequest;
use camunda_orchestration_sdk::models::MappingRuleId;
use camunda_orchestration_sdk::models::MappingRuleSearchQueryRequest;
use camunda_orchestration_sdk::models::MappingRuleUpdateRequest;
use camunda_orchestration_sdk::CamundaClient;

// region CreateMappingRule
async fn create_mapping_rule() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_mapping_rule(CreateMappingRuleParams {
            mapping_rule_create_request: Some(MappingRuleCreateRequest {
                claim_name: "my-claim-name".to_string(),
                claim_value: "my-claim-value".to_string(),
                name: "my-variable".to_string(),
                mapping_rule_id: MappingRuleId::assume_exists("my-mapping-rule"),
            }),
        })
        .await?;
    println!("{}", result.mapping_rule_id);

    Ok(())
}
// endregion CreateMappingRule

// region DeleteMappingRule
async fn delete_mapping_rule(mapping_rule_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .delete_mapping_rule(DeleteMappingRuleParams { mapping_rule_id })
        .await?;
    println!("Delete a mapping rule: done");

    Ok(())
}
// endregion DeleteMappingRule

// region GetMappingRule
async fn get_mapping_rule(mapping_rule_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_mapping_rule(GetMappingRuleParams { mapping_rule_id })
        .await?;
    println!("{}", result.mapping_rule_id);

    Ok(())
}
// endregion GetMappingRule

// region SearchMappingRule
async fn search_mapping_rule() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_mapping_rule(SearchMappingRuleParams {
            mapping_rule_search_query_request: Some(MappingRuleSearchQueryRequest::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.mapping_rule_id);
    }

    Ok(())
}
// endregion SearchMappingRule

// region UpdateMappingRule
async fn update_mapping_rule(mapping_rule_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .update_mapping_rule(UpdateMappingRuleParams {
            mapping_rule_id,
            mapping_rule_update_request: Some(MappingRuleUpdateRequest {
                claim_name: "my-claim-name".to_string(),
                claim_value: "my-claim-value".to_string(),
                name: "my-variable".to_string(),
            }),
        })
        .await?;
    println!("{}", result.mapping_rule_id);

    Ok(())
}
// endregion UpdateMappingRule

fn main() {
    // Examples above are compiled, not executed.
}
