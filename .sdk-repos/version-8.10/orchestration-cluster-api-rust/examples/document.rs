//! Compilable usage examples for document operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::document_api::CreateDocumentLinkParams;
use camunda_orchestration_sdk::apis::document_api::CreateDocumentParams;
use camunda_orchestration_sdk::apis::document_api::CreateDocumentsParams;
use camunda_orchestration_sdk::apis::document_api::DeleteDocumentParams;
use camunda_orchestration_sdk::apis::document_api::GetDocumentParams;
use camunda_orchestration_sdk::models::DocumentLinkRequest;
use camunda_orchestration_sdk::models::DocumentMetadata;
use camunda_orchestration_sdk::CamundaClient;

// region CreateDocument
async fn create_document() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_document(CreateDocumentParams {
            file: Default::default(),
            store_id: None,
            document_id: None,
            metadata: Some(DocumentMetadata::default()),
        })
        .await?;
    println!("{}", result.document_id);

    Ok(())
}
// endregion CreateDocument

// region CreateDocumentLink
async fn create_document_link(document_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_document_link(CreateDocumentLinkParams {
            document_id,
            store_id: None,
            content_hash: None,
            document_link_request: Some(DocumentLinkRequest::default()),
        })
        .await?;
    println!("{}", result.url);

    Ok(())
}
// endregion CreateDocumentLink

// region CreateDocuments
async fn create_documents() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .create_documents(CreateDocumentsParams {
            files: vec![Default::default()],
            store_id: None,
            metadata_list: None,
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion CreateDocuments

// region DeleteDocument
async fn delete_document(document_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .delete_document(DeleteDocumentParams {
            document_id,
            store_id: None,
        })
        .await?;
    println!("Delete document: done");

    Ok(())
}
// endregion DeleteDocument

// region GetDocument
async fn get_document(document_id: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_document(GetDocumentParams {
            document_id,
            store_id: None,
            content_hash: None,
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion GetDocument

fn main() {
    // Examples above are compiled, not executed.
}
