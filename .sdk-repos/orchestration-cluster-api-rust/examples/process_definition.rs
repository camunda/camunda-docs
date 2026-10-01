//! Compilable usage examples for process definition operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::process_definition_api::GetProcessDefinitionInstanceStatisticsParams;
use camunda_orchestration_sdk::apis::process_definition_api::GetProcessDefinitionInstanceVersionStatisticsParams;
use camunda_orchestration_sdk::apis::process_definition_api::GetProcessDefinitionMessageSubscriptionStatisticsParams;
use camunda_orchestration_sdk::apis::process_definition_api::GetProcessDefinitionParams;
use camunda_orchestration_sdk::apis::process_definition_api::GetProcessDefinitionStatisticsParams;
use camunda_orchestration_sdk::apis::process_definition_api::GetProcessDefinitionXmlParams;
use camunda_orchestration_sdk::apis::process_definition_api::GetStartProcessFormParams;
use camunda_orchestration_sdk::apis::process_definition_api::SearchProcessDefinitionVariableNamesParams;
use camunda_orchestration_sdk::apis::process_definition_api::SearchProcessDefinitionsParams;
use camunda_orchestration_sdk::models::ProcessDefinitionElementStatisticsQuery;
use camunda_orchestration_sdk::models::ProcessDefinitionId;
use camunda_orchestration_sdk::models::ProcessDefinitionInstanceStatisticsQuery;
use camunda_orchestration_sdk::models::ProcessDefinitionInstanceVersionStatisticsFilter;
use camunda_orchestration_sdk::models::ProcessDefinitionInstanceVersionStatisticsQuery;
use camunda_orchestration_sdk::models::ProcessDefinitionMessageSubscriptionStatisticsQuery;
use camunda_orchestration_sdk::models::ProcessDefinitionSearchQuery;
use camunda_orchestration_sdk::models::ProcessDefinitionVariableNameSearchQuery;
use camunda_orchestration_sdk::CamundaClient;

// region GetProcessDefinition
async fn get_process_definition(
    process_definition_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_process_definition(GetProcessDefinitionParams {
            process_definition_key,
        })
        .await?;
    println!("{}", result.process_definition_id);

    Ok(())
}
// endregion GetProcessDefinition

// region GetProcessDefinitionInstanceStatistics
async fn get_process_definition_instance_statistics() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_process_definition_instance_statistics(GetProcessDefinitionInstanceStatisticsParams {
            process_definition_instance_statistics_query: Some(
                ProcessDefinitionInstanceStatisticsQuery::default(),
            ),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion GetProcessDefinitionInstanceStatistics

// region GetProcessDefinitionInstanceVersionStatistics
async fn get_process_definition_instance_version_statistics(
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_process_definition_instance_version_statistics(
            GetProcessDefinitionInstanceVersionStatisticsParams {
                process_definition_instance_version_statistics_query:
                    ProcessDefinitionInstanceVersionStatisticsQuery {
                        filter: Box::new(ProcessDefinitionInstanceVersionStatisticsFilter {
                            process_definition_id: ProcessDefinitionId::assume_exists("my-process"),
                            ..Default::default()
                        }),
                        ..Default::default()
                    },
            },
        )
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion GetProcessDefinitionInstanceVersionStatistics

// region GetProcessDefinitionMessageSubscriptionStatistics
async fn get_process_definition_message_subscription_statistics(
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_process_definition_message_subscription_statistics(
            GetProcessDefinitionMessageSubscriptionStatisticsParams {
                process_definition_message_subscription_statistics_query: Some(
                    ProcessDefinitionMessageSubscriptionStatisticsQuery::default(),
                ),
            },
        )
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion GetProcessDefinitionMessageSubscriptionStatistics

// region GetProcessDefinitionStatistics
async fn get_process_definition_statistics(
    process_definition_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_process_definition_statistics(GetProcessDefinitionStatisticsParams {
            process_definition_key,
            process_definition_element_statistics_query: Some(
                ProcessDefinitionElementStatisticsQuery::default(),
            ),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion GetProcessDefinitionStatistics

// region GetProcessDefinitionXML
async fn get_process_definition_xml(
    process_definition_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let xml = client
        .get_process_definition_xml(GetProcessDefinitionXmlParams {
            process_definition_key,
        })
        .await?;

    println!("{xml}");

    Ok(())
}
// endregion GetProcessDefinitionXML

// region GetStartProcessForm
async fn get_start_process_form(
    process_definition_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_start_process_form(GetStartProcessFormParams {
            process_definition_key,
        })
        .await?;
    println!("{}", result.form_id);

    Ok(())
}
// endregion GetStartProcessForm

// region SearchProcessDefinitionVariableNames
async fn search_process_definition_variable_names(
    process_definition_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_process_definition_variable_names(SearchProcessDefinitionVariableNamesParams {
            process_definition_key,
            process_definition_variable_name_search_query: Some(
                ProcessDefinitionVariableNameSearchQuery::default(),
            ),
        })
        .await?;
    for item in result.items {
        println!("{}", item.name);
    }

    Ok(())
}
// endregion SearchProcessDefinitionVariableNames

// region SearchProcessDefinitions
async fn search_process_definitions() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_process_definitions(SearchProcessDefinitionsParams {
            process_definition_search_query: Some(ProcessDefinitionSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.process_definition_id);
    }

    Ok(())
}
// endregion SearchProcessDefinitions

fn main() {
    // Examples above are compiled, not executed.
}
