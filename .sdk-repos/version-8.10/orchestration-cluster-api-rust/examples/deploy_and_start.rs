//! Deploy a process and start an instance by process definition id.
//!
//! Run with: `cargo run --example deploy_and_start -- path/to/process.bpmn my-process-id`

use std::path::PathBuf;

use camunda_orchestration_sdk::models::{
    ProcessDefinitionId, ProcessInstanceCreationInstruction, ProcessInstanceCreationInstructionById,
};
use camunda_orchestration_sdk::CamundaClient;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut args = std::env::args().skip(1);
    let resource = args
        .next()
        .expect("usage: deploy_and_start <file.bpmn> <process-id>");
    let process_id = args
        .next()
        .expect("usage: deploy_and_start <file.bpmn> <process-id>");

    let client = CamundaClient::from_env()?;

    let deployment = client
        .deploy_resources(vec![PathBuf::from(&resource)], None)
        .await?;
    println!("Deployed: key={}", deployment.deployment_key);

    let instruction = ProcessInstanceCreationInstruction::ProcessInstanceCreationInstructionById(
        Box::new(ProcessInstanceCreationInstructionById {
            process_definition_id: ProcessDefinitionId::assume_exists(process_id),
            variables: Some(
                [("amount".to_string(), serde_json::json!(42))]
                    .into_iter()
                    .collect(),
            ),
            ..Default::default()
        }),
    );

    let created = client.create_process_instance(instruction).await?;
    println!("Started process instance: {}", created.process_instance_key);

    Ok(())
}
