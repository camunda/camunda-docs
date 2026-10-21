//! Compilable usage examples for resource operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::resource_api::DeleteResourceParams;
use camunda_orchestration_sdk::apis::resource_api::GetResourceContentBinaryParams;
use camunda_orchestration_sdk::apis::resource_api::GetResourceContentParams;
use camunda_orchestration_sdk::apis::resource_api::GetResourceParams;
use camunda_orchestration_sdk::apis::resource_api::SearchResourcesParams;
use camunda_orchestration_sdk::models::DeleteResourceRequest;
use camunda_orchestration_sdk::models::ResourceSearchQuery;
use camunda_orchestration_sdk::CamundaClient;
use std::path::PathBuf;

// region CreateDeployment
async fn create_deployment() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    // `deploy_resources` reads the files and builds the multipart request for you.
    // BPMN, DMN, and form resources can be deployed together in one atomic call.
    let deployment = client
        .deploy_resources(
            vec![
                PathBuf::from("resources/order-process.bpmn"),
                PathBuf::from("resources/approval.dmn"),
            ],
            None, // tenant id; `None` uses the default tenant
        )
        .await?;

    println!("Deployment {}", deployment.deployment_key);
    for item in deployment.deployments {
        if let Some(process) = item.process_definition {
            println!("  deployed process {}", process.process_definition_id);
        }
    }

    Ok(())
}
// endregion CreateDeployment

// region DeleteResource
async fn delete_resource(resource_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .delete_resource(DeleteResourceParams {
            resource_key,
            delete_resource_request: Some(DeleteResourceRequest::default()),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion DeleteResource

// region GetResource
async fn get_resource(resource_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_resource(GetResourceParams { resource_key })
        .await?;
    println!("{}", result.resource_id);

    Ok(())
}
// endregion GetResource

// region GetResourceContent
async fn get_resource_content(resource_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_resource_content(GetResourceContentParams { resource_key })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion GetResourceContent

// region GetResourceContentBinary
async fn get_resource_content_binary(
    resource_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_resource_content_binary(GetResourceContentBinaryParams { resource_key })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion GetResourceContentBinary

// region SearchResources
async fn search_resources() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_resources(SearchResourcesParams {
            resource_search_query: Some(ResourceSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.resource_id);
    }

    Ok(())
}
// endregion SearchResources

fn main() {
    // Examples above are compiled, not executed.
}
