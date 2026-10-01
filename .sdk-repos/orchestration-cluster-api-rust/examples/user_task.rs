//! Compilable usage examples for user task operations.
//!
//! Region-tagged snippets are surfaced in the Camunda REST API documentation via
//! `examples/operation-map.json`, and are type-checked by `cargo build --examples`.
#![allow(dead_code, unused_variables, unused_imports)]

use camunda_orchestration_sdk::apis::user_task_api::AssignUserTaskParams;
use camunda_orchestration_sdk::apis::user_task_api::CompleteUserTaskParams;
use camunda_orchestration_sdk::apis::user_task_api::GetUserTaskFormParams;
use camunda_orchestration_sdk::apis::user_task_api::GetUserTaskParams;
use camunda_orchestration_sdk::apis::user_task_api::SearchUserTaskAuditLogsParams;
use camunda_orchestration_sdk::apis::user_task_api::SearchUserTaskEffectiveVariablesParams;
use camunda_orchestration_sdk::apis::user_task_api::SearchUserTaskVariablesParams;
use camunda_orchestration_sdk::apis::user_task_api::SearchUserTasksParams;
use camunda_orchestration_sdk::apis::user_task_api::UnassignUserTaskParams;
use camunda_orchestration_sdk::apis::user_task_api::UpdateUserTaskParams;
use camunda_orchestration_sdk::models::UserTaskAssignmentRequest;
use camunda_orchestration_sdk::models::UserTaskAuditLogSearchQueryRequest;
use camunda_orchestration_sdk::models::UserTaskCompletionRequest;
use camunda_orchestration_sdk::models::UserTaskEffectiveVariableSearchQueryRequest;
use camunda_orchestration_sdk::models::UserTaskSearchQuery;
use camunda_orchestration_sdk::models::UserTaskUpdateRequest;
use camunda_orchestration_sdk::models::UserTaskVariableSearchQueryRequest;
use camunda_orchestration_sdk::CamundaClient;

// region AssignUserTask
async fn assign_user_task(user_task_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .assign_user_task(AssignUserTaskParams {
            user_task_key,
            user_task_assignment_request: UserTaskAssignmentRequest::default(),
        })
        .await?;
    println!("Assign user task: done");

    Ok(())
}
// endregion AssignUserTask

// region CompleteUserTask
async fn complete_user_task(user_task_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .complete_user_task(CompleteUserTaskParams {
            user_task_key,
            user_task_completion_request: Some(UserTaskCompletionRequest::default()),
        })
        .await?;
    println!("Complete user task: done");

    Ok(())
}
// endregion CompleteUserTask

// region GetUserTask
async fn get_user_task(user_task_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_user_task(GetUserTaskParams { user_task_key })
        .await?;
    println!("{}", result.element_id);

    Ok(())
}
// endregion GetUserTask

// region GetUserTaskForm
async fn get_user_task_form(user_task_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .get_user_task_form(GetUserTaskFormParams { user_task_key })
        .await?;
    println!("{}", result.form_id);

    Ok(())
}
// endregion GetUserTaskForm

// region SearchUserTaskAuditLogs
async fn search_user_task_audit_logs(
    user_task_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_user_task_audit_logs(SearchUserTaskAuditLogsParams {
            user_task_key,
            user_task_audit_log_search_query_request: Some(
                UserTaskAuditLogSearchQueryRequest::default(),
            ),
        })
        .await?;
    for item in result.items {
        println!("{}", item.entity_key);
    }

    Ok(())
}
// endregion SearchUserTaskAuditLogs

// region SearchUserTaskEffectiveVariables
async fn search_user_task_effective_variables(
    user_task_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_user_task_effective_variables(SearchUserTaskEffectiveVariablesParams {
            user_task_key,
            truncate_values: None,
            user_task_effective_variable_search_query_request: Some(
                UserTaskEffectiveVariableSearchQueryRequest::default(),
            ),
        })
        .await?;
    for item in result.items {
        println!("{}", item.name);
    }

    Ok(())
}
// endregion SearchUserTaskEffectiveVariables

// region SearchUserTaskVariables
async fn search_user_task_variables(
    user_task_key: String,
) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_user_task_variables(SearchUserTaskVariablesParams {
            user_task_key,
            truncate_values: None,
            user_task_variable_search_query_request: Some(
                UserTaskVariableSearchQueryRequest::default(),
            ),
        })
        .await?;
    for item in result.items {
        println!("{}", item.name);
    }

    Ok(())
}
// endregion SearchUserTaskVariables

// region SearchUserTasks
async fn search_user_tasks() -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    let result = client
        .search_user_tasks(SearchUserTasksParams {
            user_task_search_query: Some(UserTaskSearchQuery::default()),
        })
        .await?;
    for item in result.items {
        println!("{}", item.element_id);
    }

    Ok(())
}
// endregion SearchUserTasks

// region UnassignUserTask
async fn unassign_user_task(user_task_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .unassign_user_task(UnassignUserTaskParams { user_task_key })
        .await?;
    println!("Unassign user task: done");

    Ok(())
}
// endregion UnassignUserTask

// region UpdateUserTask
async fn update_user_task(user_task_key: String) -> Result<(), Box<dyn std::error::Error>> {
    let client = CamundaClient::from_env()?;

    client
        .update_user_task(UpdateUserTaskParams {
            user_task_key,
            user_task_update_request: Some(UserTaskUpdateRequest::default()),
        })
        .await?;
    println!("Update user task: done");

    Ok(())
}
// endregion UpdateUserTask

fn main() {
    // Examples above are compiled, not executed.
}
