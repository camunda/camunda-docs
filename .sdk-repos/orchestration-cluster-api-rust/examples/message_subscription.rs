//! Compilable usage examples for message subscription operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::message_subscription_api::SearchCorrelatedMessageSubscriptionsParams;
use camunda_orchestration_sdk::apis::message_subscription_api::SearchMessageSubscriptionsParams;
use camunda_orchestration_sdk::models::CorrelatedMessageSubscriptionSearchQuery;
use camunda_orchestration_sdk::models::MessageSubscriptionSearchQuery;
use camunda_orchestration_sdk::CamundaClient;

// region SearchCorrelatedMessageSubscriptions
async fn search_correlated_message_subscriptions() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_correlated_message_subscriptions(SearchCorrelatedMessageSubscriptionsParams {
            correlated_message_subscription_search_query: Some(
                CorrelatedMessageSubscriptionSearchQuery::default(),
            ),
        })
        .await?;
    for item in result.items {
        println!("{}", item.process_definition_id);
    }

    Ok(())
}
// endregion SearchCorrelatedMessageSubscriptions

// region SearchMessageSubscriptions
async fn search_message_subscriptions() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_message_subscriptions(SearchMessageSubscriptionsParams {
            message_subscription_search_query: Some(MessageSubscriptionSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.element_id);
    }

    Ok(())
}
// endregion SearchMessageSubscriptions

fn main() {
    // Examples above are compiled, not executed.
}
