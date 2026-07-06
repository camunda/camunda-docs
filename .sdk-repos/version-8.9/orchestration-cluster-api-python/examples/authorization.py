# Compilable usage examples for authorization operations.
# These examples are type-checked during build to guard against API regressions.
from __future__ import annotations

from camunda_orchestration_sdk import (
    AuthorizationIdBasedRequest,
    AuthorizationIdBasedRequestPermissionTypesItem,
    AuthorizationIdBasedRequestResourceType,
    AuthorizationKey,
    AuthorizationSearchQuery,
    CamundaClient,
    OwnerTypeEnum,
    Unset,
)


# region CreateAuthorization
def create_authorization_example() -> None:
    client = CamundaClient()

    result = client.create_authorization(
        data=AuthorizationIdBasedRequest(
            resource_type=AuthorizationIdBasedRequestResourceType.PROCESS_DEFINITION,
            permission_types=[
                AuthorizationIdBasedRequestPermissionTypesItem.READ,
                AuthorizationIdBasedRequestPermissionTypesItem.UPDATE,
            ],
            resource_id="my-process",
            owner_type=OwnerTypeEnum.USER,
            owner_id="user@example.com",
        ),
    )

    print(f"Authorization key: {result.authorization_key}")
# endregion CreateAuthorization


# region GetAuthorization
def get_authorization_example(authorization_key: AuthorizationKey) -> None:
    client = CamundaClient()

    result = client.get_authorization(
        authorization_key=authorization_key,
    )

    print(f"Resource type: {result.resource_type}")
# endregion GetAuthorization


# region SearchAuthorizations
def search_authorizations_example() -> None:
    client = CamundaClient()

    result = client.search_authorizations(
        data=AuthorizationSearchQuery(),
    )

    if not isinstance(result.items, Unset):
        for auth in result.items:
            print(f"Authorization: {auth.authorization_key}")
# endregion SearchAuthorizations


# region UpdateAuthorization
def update_authorization_example(authorization_key: AuthorizationKey) -> None:
    client = CamundaClient()

    client.update_authorization(
        authorization_key=authorization_key,
        data=AuthorizationIdBasedRequest(
            resource_type=AuthorizationIdBasedRequestResourceType.PROCESS_DEFINITION,
            permission_types=[
                AuthorizationIdBasedRequestPermissionTypesItem.READ,
                AuthorizationIdBasedRequestPermissionTypesItem.UPDATE,
                AuthorizationIdBasedRequestPermissionTypesItem.DELETE,
            ],
            resource_id="my-process",
            owner_type=OwnerTypeEnum.USER,
            owner_id="user@example.com",
        ),
    )
# endregion UpdateAuthorization


# region DeleteAuthorization
def delete_authorization_example(authorization_key: AuthorizationKey) -> None:
    client = CamundaClient()

    client.delete_authorization(
        authorization_key=authorization_key,
    )
# endregion DeleteAuthorization
