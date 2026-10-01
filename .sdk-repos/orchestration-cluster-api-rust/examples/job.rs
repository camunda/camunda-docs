//! Compilable usage examples for job operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::job_api::GetGlobalJobStatisticsParams;
use camunda_orchestration_sdk::apis::job_api::GetJobErrorStatisticsParams;
use camunda_orchestration_sdk::apis::job_api::GetJobTimeSeriesStatisticsParams;
use camunda_orchestration_sdk::apis::job_api::GetJobTypeStatisticsParams;
use camunda_orchestration_sdk::apis::job_api::GetJobWorkerStatisticsParams;
use camunda_orchestration_sdk::apis::job_api::SearchJobsParams;
use camunda_orchestration_sdk::apis::job_api::UpdateJobParams;
use camunda_orchestration_sdk::apis::job_api::UpdateJobsBatchOperationParams;
use camunda_orchestration_sdk::models::JobActivationRequest;
use camunda_orchestration_sdk::models::JobBatchUpdateRequest;
use camunda_orchestration_sdk::models::JobChangeset;
use camunda_orchestration_sdk::models::JobCompletionRequest;
use camunda_orchestration_sdk::models::JobErrorRequest;
use camunda_orchestration_sdk::models::JobErrorStatisticsFilter;
use camunda_orchestration_sdk::models::JobErrorStatisticsQuery;
use camunda_orchestration_sdk::models::JobFailRequest;
use camunda_orchestration_sdk::models::JobFilter;
use camunda_orchestration_sdk::models::JobSearchQuery;
use camunda_orchestration_sdk::models::JobTimeSeriesStatisticsFilter;
use camunda_orchestration_sdk::models::JobTimeSeriesStatisticsQuery;
use camunda_orchestration_sdk::models::JobTypeStatisticsQuery;
use camunda_orchestration_sdk::models::JobUpdateRequest;
use camunda_orchestration_sdk::models::JobWorkerStatisticsFilter;
use camunda_orchestration_sdk::models::JobWorkerStatisticsQuery;
use camunda_orchestration_sdk::CamundaClient;

// region ActivateJobs
async fn activate_jobs() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    // For long-running workers prefer `client.create_job_worker(..)`, which handles
    // polling, back-off, and concurrency for you.
    let activated = client
        .activate_jobs(JobActivationRequest {
            r#type: "payment-service".to_string(),
            timeout: 60_000,
            max_jobs_to_activate: 10,
            worker: Some("payment-worker".to_string()),
            ..Default::default()
        })
        .await?;

    for job in activated.jobs {
        println!("Activated job {} for {}", job.job_key, job.element_id);
    }

    Ok(())
}
// endregion ActivateJobs

// region CompleteJob
async fn complete_job(job_key: &str) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .complete_job(
            job_key,
            Some(JobCompletionRequest {
                variables: Some(Some(
                    [("paymentStatus".to_string(), serde_json::json!("SETTLED"))]
                        .into_iter()
                        .collect(),
                )),
                ..Default::default()
            }),
        )
        .await?;

    println!("Completed job {job_key}");

    Ok(())
}
// endregion CompleteJob

// region FailJob
async fn fail_job(job_key: &str) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    // Setting `retries` to 0 raises an incident instead of retrying.
    client
        .fail_job(
            job_key,
            Some(JobFailRequest {
                retries: Some(2),
                error_message: Some("payment gateway timed out".to_string()),
                retry_back_off: Some(10_000),
                ..Default::default()
            }),
        )
        .await?;

    println!("Failed job {job_key}");

    Ok(())
}
// endregion FailJob

// region GetGlobalJobStatistics
async fn get_global_job_statistics() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_global_job_statistics(GetGlobalJobStatisticsParams {
            from: Default::default(),
            to: Default::default(),
            job_type: None,
        })
        .await?;
    println!("{}", result.is_incomplete);

    Ok(())
}
// endregion GetGlobalJobStatistics

// region GetJobErrorStatistics
async fn get_job_error_statistics() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_job_error_statistics(GetJobErrorStatisticsParams {
            job_error_statistics_query: JobErrorStatisticsQuery {
                filter: Box::new(JobErrorStatisticsFilter {
                    from: Default::default(),
                    to: Default::default(),
                    job_type: "payment-service".to_string(),
                    ..Default::default()
                }),
                ..Default::default()
            },
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion GetJobErrorStatistics

// region GetJobTimeSeriesStatistics
async fn get_job_time_series_statistics() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_job_time_series_statistics(GetJobTimeSeriesStatisticsParams {
            job_time_series_statistics_query: JobTimeSeriesStatisticsQuery {
                filter: Box::new(JobTimeSeriesStatisticsFilter {
                    from: Default::default(),
                    to: Default::default(),
                    job_type: "payment-service".to_string(),
                    ..Default::default()
                }),
                ..Default::default()
            },
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion GetJobTimeSeriesStatistics

// region GetJobTypeStatistics
async fn get_job_type_statistics() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_job_type_statistics(GetJobTypeStatisticsParams {
            job_type_statistics_query: JobTypeStatisticsQuery::default(),
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion GetJobTypeStatistics

// region GetJobWorkerStatistics
async fn get_job_worker_statistics() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_job_worker_statistics(GetJobWorkerStatisticsParams {
            job_worker_statistics_query: JobWorkerStatisticsQuery {
                filter: Box::new(JobWorkerStatisticsFilter {
                    from: Default::default(),
                    to: Default::default(),
                    job_type: "payment-service".to_string(),
                }),
                ..Default::default()
            },
        })
        .await?;
    println!("{result:#?}");

    Ok(())
}
// endregion GetJobWorkerStatistics

// region SearchJobs
async fn search_jobs() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_jobs(SearchJobsParams {
            job_search_query: Some(JobSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.process_definition_id);
    }

    Ok(())
}
// endregion SearchJobs

// region ThrowJobError
async fn throw_job_error(job_key: &str) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    // Routes the token to a matching BPMN error boundary event, rather than
    // failing the job technically.
    client
        .throw_job_error(
            job_key,
            JobErrorRequest {
                error_code: "PAYMENT_DECLINED".to_string(),
                error_message: Some(Some("card declined by issuer".to_string())),
                ..Default::default()
            },
        )
        .await?;

    println!("Threw BPMN error for job {job_key}");

    Ok(())
}
// endregion ThrowJobError

// region UpdateJob
async fn update_job(job_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .update_job(UpdateJobParams {
            job_key,
            job_update_request: JobUpdateRequest {
                changeset: Box::new(JobChangeset::default()),
                ..Default::default()
            },
        })
        .await?;
    println!("Update job: done");

    Ok(())
}
// endregion UpdateJob

// region UpdateJobsBatchOperation
async fn update_jobs_batch_operation() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .update_jobs_batch_operation(UpdateJobsBatchOperationParams {
            job_batch_update_request: JobBatchUpdateRequest {
                filter: Box::new(JobFilter::default()),
                changeset: Box::new(JobChangeset::default()),
                ..Default::default()
            },
        })
        .await?;
    println!("{}", result.batch_operation_key);

    Ok(())
}
// endregion UpdateJobsBatchOperation

fn main() {
    // Examples above are compiled, not executed.
}
