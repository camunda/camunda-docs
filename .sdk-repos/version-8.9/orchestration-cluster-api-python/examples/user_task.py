# Compilable usage examples for user task operations.
# These examples are type-checked during build to guard against API regressions.
from __future__ import annotations

import datetime

from camunda_orchestration_sdk import (
    CamundaClient,
    Changeset,
    Unset,
    UserTaskAssignmentRequest,
    UserTaskCompletionRequest,
    UserTaskCompletionRequestVariables,
    UserTaskKey,
    UserTaskSearchQuery,
    UserTaskUpdateRequest,
)


# region SearchUserTasks
def search_user_tasks_example() -> None:
    client = CamundaClient()

    result = client.search_user_tasks(
        data=UserTaskSearchQuery()
    )

    if not isinstance(result.items, Unset):
        for task in result.items:
            print(f"Task: {task.user_task_key}")
# endregion SearchUserTasks


# region AssignUserTask
def assign_user_task_example(user_task_key: UserTaskKey) -> None:
    client = CamundaClient()

    client.assign_user_task(
        user_task_key=user_task_key,
        data=UserTaskAssignmentRequest(
            assignee="user@example.com",
        ),
    )
# endregion AssignUserTask


# region UnassignUserTask
def unassign_user_task_example(user_task_key: UserTaskKey) -> None:
    client = CamundaClient()

    client.unassign_user_task(user_task_key=user_task_key)
# endregion UnassignUserTask


# region CompleteUserTask
def complete_user_task_example(user_task_key: UserTaskKey) -> None:
    client = CamundaClient()

    variables = UserTaskCompletionRequestVariables()
    variables["approved"] = True

    client.complete_user_task(
        user_task_key=user_task_key,
        data=UserTaskCompletionRequest(
            variables=variables,
        ),
    )
# endregion CompleteUserTask


# region UpdateUserTask
def update_user_task_example(user_task_key: UserTaskKey) -> None:
    client = CamundaClient()

    client.update_user_task(
        user_task_key=user_task_key,
        data=UserTaskUpdateRequest(
            changeset=Changeset(
                due_date=datetime.datetime(2025, 12, 31, 23, 59, 59),
            ),
        ),
    )
# endregion UpdateUserTask


# region GetUserTask
def get_user_task_example(user_task_key: UserTaskKey) -> None:
    client = CamundaClient()

    task = client.get_user_task(user_task_key=user_task_key)

    print(f"Task: {task.user_task_key}")
# endregion GetUserTask
