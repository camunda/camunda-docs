# Compilable usage examples for user management operations.
# These examples are type-checked during build to guard against API regressions.
from __future__ import annotations

from camunda_orchestration_sdk import (
    CamundaClient,
    Unset,
    UserRequest,
    UserSearchQueryRequest,
    UserUpdateRequest,
    Username,
)


# region CreateUser
def create_user_example(username: Username) -> None:
    client = CamundaClient()

    result = client.create_user(
        data=UserRequest(
            username=username,
            name="Jane Doe",
            email="jdoe@example.com",
            password="secure-password",
        ),
    )

    print(f"Created user: {result.username}")
# endregion CreateUser


# region CreateAdminUser
def create_admin_user_example(username: Username) -> None:
    client = CamundaClient()

    result = client.create_admin_user(
        data=UserRequest(
            username=username,
            name="Admin User",
            email="admin@example.com",
            password="admin-password",
        ),
    )

    print(f"Admin user: {result.username}")
# endregion CreateAdminUser


# region GetUser
def get_user_example(username: Username) -> None:
    client = CamundaClient()

    result = client.get_user(username=username)

    print(f"User: {result.username}")
# endregion GetUser


# region SearchUsers
def search_users_example() -> None:
    client = CamundaClient()

    result = client.search_users(
        data=UserSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for user in result.items:
            print(f"User: {user.username}")
# endregion SearchUsers


# region UpdateUser
def update_user_example(username: Username) -> None:
    client = CamundaClient()

    client.update_user(
        username=username,
        data=UserUpdateRequest(
            name="Jane Smith",
            email="jsmith@example.com",
        ),
    )
# endregion UpdateUser


# region DeleteUser
def delete_user_example(username: Username) -> None:
    client = CamundaClient()

    client.delete_user(username=username)
# endregion DeleteUser
