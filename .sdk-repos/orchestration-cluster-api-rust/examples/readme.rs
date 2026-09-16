//! Compilable usage examples that appear in `README.md`.
//!
//! The region-tagged snippets below are injected into `README.md` by
//! `scripts/sync-readme-snippets.py`. They are type-checked by
//! `cargo build --examples` (and CI) so the README cannot drift from the real API.
//!
//! Region tags use `// region <Name>` ... `// endregion <Name>`. Only the lines
//! *between* the markers appear in the README; the wrapper functions do not. Each
//! region includes its own `use` statements so the README snippet is self-contained.
//!
//! Run nothing here — these functions exist purely to be compiled.
#![allow(dead_code, unused_variables, unused_imports)]

async fn quick_start() -> Result<(), Box<dyn std::error::Error>> {
    // region QuickStart
    use camunda_orchestration_sdk::CamundaClient;

    // Reads CAMUNDA_REST_ADDRESS, CAMUNDA_AUTH_STRATEGY, CAMUNDA_CLIENT_ID, ... from the env.
    let client = CamundaClient::from_env()?;

    let topology = client.topology().await?;
    println!("Gateway version: {}", topology.gateway_version);
    // endregion QuickStart
    Ok(())
}

fn programmatic_overrides() -> Result<(), Box<dyn std::error::Error>> {
    // region Overrides
    use camunda_orchestration_sdk::{CamundaClient, CamundaOptions};

    let client = CamundaClient::new(
        CamundaOptions::new()
            .with("CAMUNDA_REST_ADDRESS", "https://my-cluster.camunda.io")
            .with("CAMUNDA_AUTH_STRATEGY", "OAUTH")
            .with("CAMUNDA_CLIENT_ID", "my-client-id")
            .with("CAMUNDA_CLIENT_SECRET", "my-secret")
            .with(
                "CAMUNDA_OAUTH_URL",
                "https://login.cloud.camunda.io/oauth/token",
            )
            .with("CAMUNDA_TOKEN_AUDIENCE", "zeebe.camunda.io"),
    )?;
    // endregion Overrides
    let _ = client;
    Ok(())
}

async fn job_worker() -> Result<(), Box<dyn std::error::Error>> {
    use camunda_orchestration_sdk::CamundaClient;
    let client = CamundaClient::from_env()?;
    // region JobWorker
    use camunda_orchestration_sdk::{JobAction, JobWorkerConfig};

    let worker = client.create_job_worker(
        JobWorkerConfig::new("payment-service")
            .max_jobs_to_activate(20)
            .worker_name("payment-worker"),
    );

    worker
        .run(|job| async move {
            println!("handling job {}", job.key());
            JobAction::complete_with(serde_json::json!({ "paid": true }))
        })
        .await?;
    // endregion JobWorker
    Ok(())
}

async fn graceful_shutdown() -> Result<(), Box<dyn std::error::Error>> {
    use camunda_orchestration_sdk::{CamundaClient, JobAction};
    let client = CamundaClient::from_env()?;
    // region GracefulShutdown
    // Spawn managed workers; the client retains them in its registry.
    client.spawn_worker(client.worker_config("payment-service"), |job| async move {
        JobAction::complete_with(serde_json::json!({ "paid": true }))
    });

    // ... later, on shutdown: drain in-flight jobs and stop every worker gracefully.
    client.stop_all_workers().await?;
    // endregion GracefulShutdown
    Ok(())
}

async fn eventual_consistency() -> Result<(), Box<dyn std::error::Error>> {
    use camunda_orchestration_sdk::CamundaClient;
    let client = CamundaClient::from_env()?;
    let process_instance_key = "2251799813685249".to_string();
    // region EventualConsistency
    use camunda_orchestration_sdk::ConsistencyOptions;

    // Reads are eventually consistent: poll until the instance is visible, retrying 404s.
    let instance = client
        .eventual(ConsistencyOptions::default(), || {
            let client = client.clone();
            let key = process_instance_key.clone();
            async move { client.get_process_instance(&key).await }
        })
        .await?;
    // endregion EventualConsistency
    let _ = instance;
    Ok(())
}

fn semantic_keys() -> Result<(), Box<dyn std::error::Error>> {
    // region SemanticKeys
    use camunda_orchestration_sdk::models::{CamundaKey, JobKey};

    let key = JobKey::try_new("2251799813653498")?; // validates pattern & length
    assert_eq!(key.value(), "2251799813653498");
    // Side-load without validation:
    let loose = JobKey::assume_exists("123");
    // endregion SemanticKeys
    let _ = loose;
    Ok(())
}

async fn full_surface() -> Result<(), Box<dyn std::error::Error>> {
    use camunda_orchestration_sdk::CamundaClient;
    let client = CamundaClient::from_env()?;
    // region FullSurface
    // Every REST operation has a flat, ergonomic method on the client. Parameter types
    // are imported from `camunda_orchestration_sdk::apis::<area>_api`.
    use camunda_orchestration_sdk::apis::process_instance_api::SearchProcessInstancesParams;

    let page = client
        .search_process_instances(SearchProcessInstancesParams {
            process_instance_search_query: None,
        })
        .await?;
    println!("found {} process instance(s)", page.items.len());
    // endregion FullSurface
    Ok(())
}

async fn escape_hatch() -> Result<(), Box<dyn std::error::Error>> {
    // region EscapeHatch
    use camunda_orchestration_sdk::client::apis::authentication_api;
    use camunda_orchestration_sdk::CamundaClient;

    let client = CamundaClient::from_env()?;
    let cfg = client.configuration().await?; // base URL + auth applied
    let me = authentication_api::get_authentication(&cfg).await?;
    // endregion EscapeHatch
    let _ = me;
    Ok(())
}

fn main() {
    // The examples above are compiled but not executed; they document the README.
}
