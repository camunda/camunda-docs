//! Compilable usage examples for cluster operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::CamundaClient;

// region GetStatus
async fn get_status() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client.get_status().await?;
    println!("Get cluster status: done");

    Ok(())
}
// endregion GetStatus

// region GetTopology
async fn get_topology() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let topology = client.topology().await?;

    println!("Gateway version:    {}", topology.gateway_version);
    println!("Cluster size:       {}", topology.cluster_size);
    println!("Partitions:         {}", topology.partitions_count);
    println!("Replication factor: {}", topology.replication_factor);

    for broker in topology.brokers {
        println!(
            "  broker {} at {}:{}",
            broker.node_id, broker.host, broker.port
        );
    }

    Ok(())
}
// endregion GetTopology

fn main() {
    // Examples above are compiled, not executed.
}
