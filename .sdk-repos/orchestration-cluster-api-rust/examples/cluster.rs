//! Compilable usage examples for cluster operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::cluster_api::TriggerClusterRebalanceParams;
use camunda_orchestration_sdk::models::ClusterRebalanceRequest;
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

// region GetClusterStatus
async fn get_cluster_status() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let status = client.get_cluster_status().await?;
    println!("{status:#?}");

    Ok(())
}
// endregion GetClusterStatus

// region GetClusterTopology
async fn get_cluster_topology() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    // Unlike `topology`, this reports the brokers of every physical tenant.
    let topology = client.get_cluster_topology().await?;

    println!("Cluster id:   {:?}", topology.cluster_id);
    println!("Cluster size: {}", topology.cluster_size);

    for tenant in topology.physical_tenants {
        println!("{tenant:#?}");
    }

    Ok(())
}
// endregion GetClusterTopology

// region TriggerClusterRebalance
async fn trigger_cluster_rebalance() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    // Every setting is optional; an absent request body means "use the configured
    // settings". Set `dry_run` to report the plan without moving any leadership.
    let result = client
        .trigger_cluster_rebalance(TriggerClusterRebalanceParams {
            dry_run: Some(true),
            cluster_rebalance_request: Some(ClusterRebalanceRequest {
                replication_timeout: Some("PT30S".to_string()),
                ..Default::default()
            }),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion TriggerClusterRebalance

// region GetClusterRebalance
async fn get_cluster_rebalance() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client.get_cluster_rebalance().await?;
    println!("{result:#?}");

    Ok(())
}
// endregion GetClusterRebalance

// region CancelClusterRebalance
async fn cancel_cluster_rebalance() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client.cancel_cluster_rebalance().await?;
    println!("{result:#?}");

    Ok(())
}
// endregion CancelClusterRebalance

fn main() {
    // Examples above are compiled, not executed.
}
