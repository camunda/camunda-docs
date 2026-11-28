//! Compilable usage examples for probe operations (alpha).
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use std::collections::HashMap;

use camunda_orchestration_sdk::apis::probe_api::{
    ActivateProbesParams, AnswerProbeParams, CreateProbeParams,
};
use camunda_orchestration_sdk::models::{
    CamundaKey, ProbeActivationRequest, ProbeAnswerRequest, ProbeCreationRequest, ProbeId,
    ProbeOkAnswerRequest, ProbeResult,
};
use camunda_orchestration_sdk::CamundaClient;

// region CreateProbe
async fn create_probe() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    // Ask the worker registered for this probe ID a question and wait for its answer.
    // `input` is a FEEL expression; secrets are injected by the engine, never by the client.
    let mut request = ProbeCreationRequest::new(
        ProbeId::assume_exists("validate-configuration/io.camunda:aws-credential:1"),
        r#"={region: "eu-west-1", accessKey: camunda.secrets.awsKey}"#.to_owned(),
    );
    request.request_timeout = Some(10_000);

    match client
        .create_probe(CreateProbeParams {
            probe_creation_request: request,
        })
        .await
    {
        Ok(ProbeResult::Ok(answer)) => {
            println!("Worker {} answered: {:?}", answer.worker, answer.data);
        }
        Ok(ProbeResult::Unsupported(answer)) => {
            println!("Worker {} does not support this probe", answer.worker);
        }
        Ok(ProbeResult::Error(answer)) => {
            println!("Worker {} failed: {}", answer.worker, answer.message);
        }
        // 404: no worker collected the probe, so nothing can answer it.
        Err(error) if error.status() == Some(404) => {
            println!("No worker is polling this probe ID");
        }
        Err(error) => return Err(error.into()),
    }

    Ok(())
}
// endregion CreateProbe

// region ActivateProbes
async fn activate_probes() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let mut request = ProbeActivationRequest::new(
        vec![
            ProbeId::assume_exists("validate-configuration/io.camunda:aws-credential:1"),
            ProbeId::assume_exists("validate-configuration/io.camunda:slack:1"),
        ],
        10,
    );
    request.worker = Some("connectors-runtime".to_owned());
    // A negative timeout turns long polling off: the request returns at once,
    // with an empty list when no probe is waiting.
    request.request_timeout = Some(-1);

    let result = client
        .activate_probes(ActivateProbesParams {
            probe_activation_request: request,
        })
        .await?;

    // The activated input holds resolved secret values, so log identifiers only.
    for probe in result.probes {
        println!(
            "Probe {} ({}) must be answered by {}",
            probe.probe_key.value(),
            probe.probe_id.value(),
            probe.deadline
        );

        // Answer before the deadline.
        client
            .answer_probe(AnswerProbeParams {
                probe_key: probe.probe_key.value().to_owned(),
                probe_answer_request: ProbeAnswerRequest::Ok(Box::new(ProbeOkAnswerRequest::new(
                    HashMap::from([("valid".to_owned(), serde_json::json!(true))]),
                ))),
            })
            .await?;
    }

    Ok(())
}
// endregion ActivateProbes

// region AnswerProbe
async fn answer_probe(probe_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    // Answer with `Unsupported`, or with `Error` and a message, when the worker
    // cannot produce a result.
    client
        .answer_probe(AnswerProbeParams {
            probe_key,
            probe_answer_request: ProbeAnswerRequest::Ok(Box::new(ProbeOkAnswerRequest::new(
                HashMap::from([
                    ("valid".to_owned(), serde_json::json!(true)),
                    ("region".to_owned(), serde_json::json!("eu-west-1")),
                ]),
            ))),
        })
        .await?;

    Ok(())
}
// endregion AnswerProbe

fn main() {
    // Examples above are compiled, not executed.
}
