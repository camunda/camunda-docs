//! End-to-end demo: deploy a process model, run a job worker for it, and start a
//! process instance — then watch the worker complete the job.
//!
//! Run with: `cargo run --example deploy_start_and_work`
//!
//! Environment variables (see the README for the full list):
//!   CAMUNDA_REST_ADDRESS   base cluster address (default http://localhost:8080)
//!   CAMUNDA_AUTH_STRATEGY  OAUTH | BASIC | NONE  (plus the chosen strategy's credentials)
//!
//! Against a local, auth-less cluster you can simply run:
//!   CAMUNDA_AUTH_STRATEGY=NONE cargo run --example deploy_start_and_work

use std::path::PathBuf;

use camunda_orchestration_sdk::models::{
    ProcessDefinitionId, ProcessInstanceCreationInstruction, ProcessInstanceCreationInstructionById,
};
use camunda_orchestration_sdk::{CamundaClient, JobAction, JobWorkerConfig};

/// The BPMN process id and the service-task job type wired together below.
const PROCESS_ID: &str = "demo-payment-process";
const JOB_TYPE: &str = "demo-payment";

/// A minimal executable BPMN model: start → service task (job type `demo-payment`) → end.
/// Embedded so the example is self-contained and needs no external `.bpmn` file.
const BPMN: &str = r#"<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
                  xmlns:zeebe="http://camunda.org/schema/zeebe/1.0"
                  id="demo-defs" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="demo-payment-process" isExecutable="true">
    <bpmn:startEvent id="start">
      <bpmn:outgoing>to-task</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:sequenceFlow id="to-task" sourceRef="start" targetRef="charge" />
    <bpmn:serviceTask id="charge" name="Charge payment">
      <bpmn:extensionElements>
        <zeebe:taskDefinition type="demo-payment" />
      </bpmn:extensionElements>
      <bpmn:incoming>to-task</bpmn:incoming>
      <bpmn:outgoing>to-end</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:sequenceFlow id="to-end" sourceRef="charge" targetRef="end" />
    <bpmn:endEvent id="end">
      <bpmn:incoming>to-end</bpmn:incoming>
    </bpmn:endEvent>
  </bpmn:process>
</bpmn:definitions>
"#;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    // 1. Deploy the process model. The BPMN is written to a temp file because
    //    `deploy_resources` takes file paths (matching the multipart upload API).
    let bpmn_path = std::env::temp_dir().join("demo-payment-process.bpmn");
    std::fs::write(&bpmn_path, BPMN)?;

    let deployment = client
        .deploy_resources(vec![PathBuf::from(&bpmn_path)], None)
        .await?;
    println!("✓ Deployed (deployment key {})", deployment.deployment_key);
    for meta in &deployment.deployments {
        if let Some(p) = &meta.process_definition {
            println!(
                "    process '{}' v{} (key {})",
                p.process_definition_id, p.process_definition_version, p.process_definition_key
            );
        }
    }

    // 2. Start a job worker for the service task's job type. `start` spawns the poll
    //    loop on the Tokio runtime and returns immediately, so it runs concurrently
    //    with the instance we create below.
    let worker = client.create_job_worker(
        JobWorkerConfig::new(JOB_TYPE)
            .worker_name("demo-payment-worker")
            .max_jobs_to_activate(10),
    );
    let worker_handle = worker.start(|job| async move {
        println!("→ Worker handling job {} for {}", job.key(), job.job_type());
        let amount = job
            .variables()
            .get("amount")
            .cloned()
            .unwrap_or(serde_json::json!(0));
        JobAction::complete_with(serde_json::json!({
            "paymentStatus": "COMPLETED",
            "chargedAmount": amount,
        }))
    });
    println!("✓ Worker started for job type '{JOB_TYPE}'");

    // 3. Create a process instance and wait for it to finish. `await_completion`
    //    returns once the worker has completed the job and the process reaches its end,
    //    yielding the requested output variables.
    let instruction = ProcessInstanceCreationInstruction::ProcessInstanceCreationInstructionById(
        Box::new(ProcessInstanceCreationInstructionById {
            process_definition_id: ProcessDefinitionId::assume_exists(PROCESS_ID),
            variables: Some(
                [("amount".to_string(), serde_json::json!(42))]
                    .into_iter()
                    .collect(),
            ),
            await_completion: Some(true),
            fetch_variables: Some(vec!["paymentStatus".into(), "chargedAmount".into()]),
            request_timeout: Some(10_000),
            ..Default::default()
        }),
    );

    let result = client.create_process_instance(instruction).await?;
    println!(
        "✓ Process instance {} completed",
        result.process_instance_key
    );
    println!(
        "    output variables: {}",
        serde_json::to_string(&result.variables)?
    );

    // Stop the background worker; the demo is done.
    worker_handle.abort();
    let _ = std::fs::remove_file(&bpmn_path);
    Ok(())
}
