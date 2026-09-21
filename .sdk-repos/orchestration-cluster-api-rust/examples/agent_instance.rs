//! Compilable usage examples for agent instance operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::agent_instance_api::CreateAgentInstanceHistoryItemParams;
use camunda_orchestration_sdk::apis::agent_instance_api::CreateAgentInstanceParams;
use camunda_orchestration_sdk::apis::agent_instance_api::GetAgentInstanceParams;
use camunda_orchestration_sdk::apis::agent_instance_api::SearchAgentInstanceHistoryParams;
use camunda_orchestration_sdk::apis::agent_instance_api::SearchAgentInstancesParams;
use camunda_orchestration_sdk::apis::agent_instance_api::UpdateAgentInstanceParams;
use camunda_orchestration_sdk::models::AgentInstanceCreationRequest;
use camunda_orchestration_sdk::models::AgentInstanceDefinition;
use camunda_orchestration_sdk::models::AgentInstanceHistoryItemRequest;
use camunda_orchestration_sdk::models::AgentInstanceHistoryRoleEnum;
use camunda_orchestration_sdk::models::AgentInstanceHistorySearchQuery;
use camunda_orchestration_sdk::models::AgentInstanceMessageContent;
use camunda_orchestration_sdk::models::AgentInstanceSearchQuery;
use camunda_orchestration_sdk::models::AgentInstanceTextContent;
use camunda_orchestration_sdk::models::AgentInstanceUpdateRequest;
use camunda_orchestration_sdk::models::ElementInstanceKey;
use camunda_orchestration_sdk::models::JobKey;
use camunda_orchestration_sdk::CamundaClient;

// region CreateAgentInstance
async fn create_agent_instance() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_agent_instance(CreateAgentInstanceParams {
            agent_instance_creation_request: AgentInstanceCreationRequest {
                element_instance_key: Box::new(ElementInstanceKey::assume_exists(
                    "my-element-instance",
                )),
                definition: Box::new(AgentInstanceDefinition {
                    model: "my-model".to_string(),
                    provider: "my-provider".to_string(),
                    system_prompt: "my-system-prompt".to_string(),
                }),
                ..Default::default()
            },
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion CreateAgentInstance

// region CreateAgentInstanceHistoryItem
async fn create_agent_instance_history_item(
    agent_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_agent_instance_history_item(CreateAgentInstanceHistoryItemParams {
            agent_instance_key,
            agent_instance_history_item_request: AgentInstanceHistoryItemRequest {
                element_instance_key: Box::new(ElementInstanceKey::assume_exists(
                    "my-element-instance",
                )),
                job_key: Box::new(JobKey::assume_exists("my-job")),
                job_lease: "my-job-lease".to_string(),
                role: AgentInstanceHistoryRoleEnum::User,
                content: vec![AgentInstanceMessageContent::Text(Box::new(
                    AgentInstanceTextContent {
                        content_type: "TEXT".to_string(),
                        text: "What is the status of my order?".to_string(),
                    },
                ))],
                produced_at: Default::default(),
                ..Default::default()
            },
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion CreateAgentInstanceHistoryItem

// region GetAgentInstance
async fn get_agent_instance(agent_instance_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_agent_instance(GetAgentInstanceParams { agent_instance_key })
        .await?;
    println!("{}", result.element_id);

    Ok(())
}
// endregion GetAgentInstance

// region SearchAgentInstanceHistory
async fn search_agent_instance_history(
    agent_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_agent_instance_history(SearchAgentInstanceHistoryParams {
            agent_instance_key,
            agent_instance_history_search_query: Some(AgentInstanceHistorySearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.job_lease);
    }

    Ok(())
}
// endregion SearchAgentInstanceHistory

// region SearchAgentInstances
async fn search_agent_instances() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_agent_instances(SearchAgentInstancesParams {
            agent_instance_search_query: Some(AgentInstanceSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.element_id);
    }

    Ok(())
}
// endregion SearchAgentInstances

// region UpdateAgentInstance
async fn update_agent_instance(
    agent_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .update_agent_instance(UpdateAgentInstanceParams {
            agent_instance_key,
            agent_instance_update_request: AgentInstanceUpdateRequest {
                element_instance_key: Box::new(ElementInstanceKey::assume_exists(
                    "my-element-instance",
                )),
                ..Default::default()
            },
        })
        .await?;
    println!("Update agent instance: done");

    Ok(())
}
// endregion UpdateAgentInstance

fn main() {
    // Examples above are compiled, not executed.
}
