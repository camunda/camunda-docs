//! Compilable usage examples for ad-hoc sub-process operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::ad_hoc_sub_process_api::ActivateAdHocSubProcessActivitiesParams;
use camunda_orchestration_sdk::models::AdHocSubProcessActivateActivitiesInstruction;
use camunda_orchestration_sdk::models::AdHocSubProcessActivateActivityReference;
use camunda_orchestration_sdk::models::ElementId;
use camunda_orchestration_sdk::CamundaClient;

// region ActivateAdHocSubProcessActivities
async fn activate_ad_hoc_sub_process_activities(
    ad_hoc_sub_process_instance_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .activate_ad_hoc_sub_process_activities(ActivateAdHocSubProcessActivitiesParams {
            ad_hoc_sub_process_instance_key,
            ad_hoc_sub_process_activate_activities_instruction:
                AdHocSubProcessActivateActivitiesInstruction {
                    elements: vec![AdHocSubProcessActivateActivityReference {
                        element_id: ElementId::assume_exists("my-element"),
                        ..Default::default()
                    }],
                    ..Default::default()
                },
        })
        .await?;
    println!("Activate activities within an ad-hoc sub-process: done");

    Ok(())
}
// endregion ActivateAdHocSubProcessActivities

fn main() {
    // Examples above are compiled, not executed.
}
