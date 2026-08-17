//! Register a job worker that processes jobs of a given type.
//!
//! Run with: `cargo run --example worker`
//!
//! Environment variables:
//!   CAMUNDA_REST_ADDRESS   base cluster address (default http://localhost:8080)
//!   CAMUNDA_AUTH_STRATEGY  OAUTH | BASIC | NONE
//!   (plus the credentials for the chosen strategy — see the README)

use camunda_orchestration_sdk::{CamundaClient, JobAction, JobWorkerConfig};
use serde::Deserialize;

#[derive(Deserialize)]
struct OrderVariables {
    #[serde(default)]
    order_id: String,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let worker = client.create_job_worker(
        JobWorkerConfig::new("payment-service")
            .max_jobs_to_activate(20)
            .worker_name("payment-worker"),
    );

    println!("Worker started for job type 'payment-service'. Ctrl-C to stop.");

    worker
        .run(|job| async move {
            println!("Handling job {} ({})", job.key(), job.job_type());

            match job.variables_as::<OrderVariables>() {
                Ok(vars) => {
                    println!("  order_id = {}", vars.order_id);
                    JobAction::complete_with(serde_json::json!({
                        "paymentStatus": "COMPLETED",
                    }))
                }
                Err(e) => JobAction::fail(format!("invalid variables: {e}")),
            }
        })
        .await?;

    Ok(())
}
