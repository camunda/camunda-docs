//! Connect to a cluster and print its topology.
//!
//! Run with: `cargo run --example topology`
//!
//! Configure via environment variables, e.g. for a local cluster:
//!   CAMUNDA_REST_ADDRESS=http://localhost:8080

use camunda_orchestration_sdk::CamundaClient;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let topology = client.topology().await?;
    println!("Gateway version: {}", topology.gateway_version);
    println!("Cluster size:    {}", topology.cluster_size);
    println!("Brokers:         {}", topology.brokers.len());

    Ok(())
}
