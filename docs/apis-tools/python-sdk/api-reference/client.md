---
title: CamundaClient
sidebar_label: CamundaClient
sidebar_position: 2
mdx:
  format: md
---

# CamundaClient

## CamundaClient

```python
class CamundaClient(configuration=None, auth_provider=None, logger=None, **kwargs)
```

Bases: `object`

- **Parameters:**
  - **configuration** ([_CamundaSdkConfiguration_](runtime.md#camunda_orchestration_sdk.runtime.configuration_resolver.CamundaSdkConfiguration))
  - **auth_provider** ([_AuthProvider_](runtime.md#camunda_orchestration_sdk.runtime.auth.AuthProvider))
  - **logger** ([_CamundaLogger_](runtime.md#camunda_orchestration_sdk.runtime.logging.CamundaLogger) _|_ _None_)
  - **kwargs** (_Any_)

### activate_ad_hoc_sub_process_activities()

```python
def activate_ad_hoc_sub_process_activities(ad_hoc_sub_process_instance_key, , data, **kwargs)
```

Activate activities within an ad-hoc sub-process

> Activates selected activities within an ad-hoc sub-process identified by element ID.

The provided element IDs must exist within the ad-hoc sub-process instance identified by the
provided adHocSubProcessInstanceKey.

- **Parameters:**
  - **ad_hoc_sub_process_instance_key** (_str_) – System-generated key for a element instance.
    Example: 2251799813686789.
  - **body** (_AdHocSubProcessActivateActivitiesInstruction_)
  - **data** (_AdHocSubProcessActivateActivitiesInstruction_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The ad-hoc sub-process instance is not found or the provided key does not identify an ad-hoc sub-process.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Activate ad-hoc sub-process activities:**

```python
def activate_ad_hoc_sub_process_activities_example(element_id: ElementId) -> None:
    client = CamundaClient()

    client.activate_ad_hoc_sub_process_activities(
        ad_hoc_sub_process_instance_key="123456",
        data=AdHocSubProcessActivateActivitiesInstruction(
            elements=[
                AdHocSubProcessActivateActivityReference(element_id=element_id),
                AdHocSubProcessActivateActivityReference(element_id=element_id),
            ],
        ),
    )
```

### activate_jobs()

```python
def activate_jobs(, data, **kwargs)
```

Activate jobs

> Iterate through all known partitions and activate jobs up to the requested maximum.

- **Parameters:**
  - **body** (_JobActivationRequest_)
  - **data** (_JobActivationRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  JobActivationResult
- **Return type:**
  JobActivationResult

#### Examples

**Activate and process jobs:**

```python
async def activate_jobs_example() -> None:
    async with CamundaAsyncClient() as client:
        result = await client.activate_jobs(
            data=JobActivationRequest(
                type_="payment-processing",
                timeout=30000,
                max_jobs_to_activate=5,
            )
        )

        for job in result.jobs:
            print(f"Job {job.job_key}: {job.type_}")
```

### assign_client_to_group()

```python
def assign_client_to_group(group_id, client_id, **kwargs)
```

Assign a client to a group

> Assigns a client to a group, making it a member of the group.

Members of the group inherit the group authorizations, roles, and tenant assignments.

- **Parameters:**
  - **group_id** (_str_)
  - **client_id** (_str_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The group with the given ID was not found.
  - **errors.ConflictError** – If the response status code is 409. The client with the given ID is already assigned to the group.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Assign a client to a group:**

```python
def assign_client_to_group_example() -> None:
    client = CamundaClient()

    client.assign_client_to_group(
        group_id="engineering",
        client_id="my-service-account",
    )
```

### assign_client_to_tenant()

```python
def assign_client_to_tenant(tenant_id, client_id, **kwargs)
```

Assign a client to a tenant

> Assign the client to the specified tenant.

The client can then access tenant data and perform authorized actions.

- **Parameters:**
  - **tenant_id** (_str_) – The unique identifier of the tenant. Example: customer-service.
  - **client_id** (_str_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The tenant was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Assign a client to a tenant:**

```python
def assign_client_to_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    client.assign_client_to_tenant(
        tenant_id=tenant_id,
        client_id="my-service-account",
    )
```

### assign_group_to_tenant()

```python
def assign_group_to_tenant(tenant_id, group_id, **kwargs)
```

Assign a group to a tenant

> Assigns a group to a specified tenant.

Group members (users, clients) can then access tenant data and perform authorized actions.

- **Parameters:**
  - **tenant_id** (_str_) – The unique identifier of the tenant. Example: customer-service.
  - **group_id** (_str_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. Not found. The tenant or group was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Assign a group to a tenant:**

```python
def assign_group_to_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    client.assign_group_to_tenant(
        tenant_id=tenant_id,
        group_id="engineering",
    )
```

### assign_mapping_rule_to_group()

```python
def assign_mapping_rule_to_group(group_id, mapping_rule_id, **kwargs)
```

Assign a mapping rule to a group

> Assigns a mapping rule to a group.

- **Parameters:**
  - **group_id** (_str_)
  - **mapping_rule_id** (_str_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The group or mapping rule with the given ID was not found.
  - **errors.ConflictError** – If the response status code is 409. The mapping rule with the given ID is already assigned to the group.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Assign a mapping rule to a group:**

```python
def assign_mapping_rule_to_group_example() -> None:
    client = CamundaClient()

    client.assign_mapping_rule_to_group(
        group_id="engineering",
        mapping_rule_id="rule-123",
    )
```

### assign_mapping_rule_to_tenant()

```python
def assign_mapping_rule_to_tenant(tenant_id, mapping_rule_id, **kwargs)
```

Assign a mapping rule to a tenant

> Assign a single mapping rule to a specified tenant.

- **Parameters:**
  - **tenant_id** (_str_) – The unique identifier of the tenant. Example: customer-service.
  - **mapping_rule_id** (_str_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. Not found. The tenant or mapping rule was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Assign a mapping rule to a tenant:**

```python
def assign_mapping_rule_to_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    client.assign_mapping_rule_to_tenant(
        tenant_id=tenant_id,
        mapping_rule_id="rule-123",
    )
```

### assign_role_to_client()

```python
def assign_role_to_client(role_id, client_id, **kwargs)
```

Assign a role to a client

> Assigns the specified role to the client. The client will inherit the authorizations associated with

this role.

- **Parameters:**
  - **role_id** (_str_)
  - **client_id** (_str_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The role with the given ID was not found.
  - **errors.ConflictError** – If the response status code is 409. The role was already assigned to the client with the given ID.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Assign a role to a client:**

```python
def assign_role_to_client_example() -> None:
    client = CamundaClient()

    client.assign_role_to_client(
        role_id="developer",
        client_id="my-service-account",
    )
```

### assign_role_to_group()

```python
def assign_role_to_group(role_id, group_id, **kwargs)
```

Assign a role to a group

> Assigns the specified role to the group. Every member of the group (user or client) will inherit the

authorizations associated with this role.

- **Parameters:**
  - **role_id** (_str_)
  - **group_id** (_str_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The role or group with the given ID was not found.
  - **errors.ConflictError** – If the response status code is 409. The role is already assigned to the group with the given ID.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Assign a role to a group:**

```python
def assign_role_to_group_example() -> None:
    client = CamundaClient()

    client.assign_role_to_group(
        role_id="developer",
        group_id="engineering",
    )
```

### assign_role_to_mapping_rule()

```python
def assign_role_to_mapping_rule(role_id, mapping_rule_id, **kwargs)
```

Assign a role to a mapping rule

> Assigns a role to a mapping rule.

- **Parameters:**
  - **role_id** (_str_)
  - **mapping_rule_id** (_str_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The role or mapping rule with the given ID was not found.
  - **errors.ConflictError** – If the response status code is 409. The role is already assigned to the mapping rule with the given ID.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Assign a role to a mapping rule:**

```python
def assign_role_to_mapping_rule_example() -> None:
    client = CamundaClient()

    client.assign_role_to_mapping_rule(
        role_id="developer",
        mapping_rule_id="rule-123",
    )
```

### assign_role_to_tenant()

```python
def assign_role_to_tenant(tenant_id, role_id, **kwargs)
```

Assign a role to a tenant

> Assigns a role to a specified tenant.

Users, Clients or Groups, that have the role assigned, will get access to the tenant’s data and can
perform actions according to their authorizations.

- **Parameters:**
  - **tenant_id** (_str_) – The unique identifier of the tenant. Example: customer-service.
  - **role_id** (_str_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. Not found. The tenant or role was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Assign a role to a tenant:**

```python
def assign_role_to_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    client.assign_role_to_tenant(
        tenant_id=tenant_id,
        role_id="developer",
    )
```

### assign_role_to_user()

```python
def assign_role_to_user(role_id, username, **kwargs)
```

Assign a role to a user

> Assigns the specified role to the user. The user will inherit the authorizations associated with

this role.

- **Parameters:**
  - **role_id** (_str_)
  - **username** (_str_) – The unique name of a user. Example: swillis.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The role or user with the given ID or username was not found.
  - **errors.ConflictError** – If the response status code is 409. The role is already assigned to the user with the given ID.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Assign a role to a user:**

```python
def assign_role_to_user_example(username: Username) -> None:
    client = CamundaClient()

    client.assign_role_to_user(
        role_id="developer",
        username=username,
    )
```

### assign_user_task()

```python
def assign_user_task(user_task_key, , data, **kwargs)
```

Assign user task

> Assigns a user task with the given key to the given assignee. Assignment waits for blocking task

listeners on this lifecycle transition. If listener processing is delayed beyond the request
timeout, this endpoint can return 504. Other gateway timeout causes are also possible. Retry with
backoff and inspect listener worker availability and logs when this repeats.

- **Parameters:**
  - **user_task_key** (_str_) – System-generated key for a user task.
  - **body** (_UserTaskAssignmentRequest_)
  - **data** (_UserTaskAssignmentRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.NotFoundError** – If the response status code is 404. The user task with the given key was not found.
  - **errors.ConflictError** – If the response status code is 409. The user task with the given key is in the wrong state currently. More details are provided in the response body.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.GatewayTimeoutError** – If the response status code is 504. The request timed out between the gateway and the broker. For these endpoints, this often happens when user task listeners are configured and the corresponding listener job is not completed within the request timeout. Common causes include no available job workers for the listener type, busy or crashed job workers, or delayed job completion. As with any gateway timeout, general timeout causes (for example transient network issues) can also result in a 504 response. Troubleshooting: - verify that job workers for the listener type are running and healthy - check worker logs for crashes, retries, and completion failures - check network connectivity between workers, gateway, and broker - retry with backoff after transient failures - fail without retries if a problem persists
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Assign a user task:**

```python
def assign_user_task_example(user_task_key: UserTaskKey) -> None:
    client = CamundaClient()

    client.assign_user_task(
        user_task_key=user_task_key,
        data=UserTaskAssignmentRequest(
            assignee="user@example.com",
        ),
    )
```

### assign_user_to_group()

```python
def assign_user_to_group(group_id, username, **kwargs)
```

Assign a user to a group

> Assigns a user to a group, making the user a member of the group.

Group members inherit the group authorizations, roles, and tenant assignments.

- **Parameters:**
  - **group_id** (_str_)
  - **username** (_str_) – The unique name of a user. Example: swillis.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The group or user with the given ID or username was not found.
  - **errors.ConflictError** – If the response status code is 409. The user with the given ID is already assigned to the group.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Assign a user to a group:**

```python
def assign_user_to_group_example(username: Username) -> None:
    client = CamundaClient()

    client.assign_user_to_group(
        group_id="engineering",
        username=username,
    )
```

### assign_user_to_tenant()

```python
def assign_user_to_tenant(tenant_id, username, **kwargs)
```

Assign a user to a tenant

> Assign a single user to a specified tenant. The user can then access tenant data and perform

authorized actions.

- **Parameters:**
  - **tenant_id** (_str_) – The unique identifier of the tenant. Example: customer-service.
  - **username** (_str_) – The unique name of a user. Example: swillis.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. Not found. The tenant or user was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Assign a user to a tenant:**

```python
def assign_user_to_tenant_example(tenant_id: TenantId, username: Username) -> None:
    client = CamundaClient()

    client.assign_user_to_tenant(
        tenant_id=tenant_id,
        username=username,
    )
```

### auth_provider

```python
auth_provider: [AuthProvider](runtime.md#camunda_orchestration_sdk.runtime.auth.AuthProvider)
```

### broadcast_signal()

```python
def broadcast_signal(, data, **kwargs)
```

Broadcast signal

> Broadcasts a signal.

- **Parameters:**
  - **body** (_SignalBroadcastRequest_)
  - **data** (_SignalBroadcastRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.NotFoundError** – If the response status code is 404. The signal is not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  SignalBroadcastResult
- **Return type:**
  SignalBroadcastResult

#### Examples

**Broadcast a signal:**

```python
def broadcast_signal_example() -> None:
    client = CamundaClient()

    result = client.broadcast_signal(
        data=SignalBroadcastRequest(
            signal_name="order-cancelled",
        )
    )

    print(f"Signal key: {result.signal_key}")
```

### cancel_batch_operation()

```python
def cancel_batch_operation(batch_operation_key, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Cancel Batch operation

> Cancels a running batch operation.

This is done asynchronously, the progress can be tracked using the batch operation status endpoint
(/batch-operations/{batchOperationKey}).

- **Parameters:**
  - **batch_operation_key** (_str_) – System-generated key for an batch operation. Example: 2251799813684321.
  - **body** (_Any_ _|_ _Unset_)
  - **data** (_Any_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. Not found. The batch operation was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Cancel a batch operation:**

```python
def cancel_batch_operation_example(batch_operation_key: BatchOperationKey) -> None:
    client = CamundaClient()

    client.cancel_batch_operation(
        batch_operation_key=batch_operation_key,
    )
```

### cancel_process_instance()

```python
def cancel_process_instance(process_instance_key, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Cancel process instance

> Cancels a running process instance. As a cancellation includes more than just the removal of the

process instance resource, the cancellation resource must be posted. Cancellation can wait on
listener-related processing; when that processing does not complete in time, this endpoint can
return 504. Other gateway timeout causes are also possible. Retry with backoff and inspect listener
worker availability and logs when this repeats.

- **Parameters:**
  - **process_instance_key** (_str_) – System-generated key for a process instance. Example: 2251799813690746.
  - **body** (_CancelProcessInstanceData_ _|_ _None_ _|_ _Unset_)
  - **data** (_CancelProcessInstanceData_ _|_ _None_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.NotFoundError** – If the response status code is 404. The process instance is not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.GatewayTimeoutError** – If the response status code is 504. The request timed out between the gateway and the broker. For these endpoints, this often happens when user task listeners are configured and the corresponding listener job is not completed within the request timeout. Common causes include no available job workers for the listener type, busy or crashed job workers, or delayed job completion. As with any gateway timeout, general timeout causes (for example transient network issues) can also result in a 504 response. Troubleshooting: - verify that job workers for the listener type are running and healthy - check worker logs for crashes, retries, and completion failures - check network connectivity between workers, gateway, and broker - retry with backoff after transient failures - fail without retries if a problem persists
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Cancel a process instance:**

```python
def cancel_process_instance_example(process_definition_id: ProcessDefinitionId) -> None:
    client = CamundaClient()

    # Create a process instance and get its key from the response
    created = client.create_process_instance(
        data=ProcessCreationById(process_definition_id=process_definition_id)
    )

    # Cancel it using the key from the creation response
    client.cancel_process_instance(
        process_instance_key=created.process_instance_key,
    )
```

### cancel_process_instances_batch_operation()

```python
def cancel_process_instances_batch_operation(, data, **kwargs)
```

Cancel process instances (batch)

> Cancels multiple running process instances.

Since only ACTIVE root instances can be cancelled, any given filters for state and
parentProcessInstanceKey are ignored and overridden during this batch operation.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the
response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

- **Parameters:**
  - **body** (_ProcessInstanceCancellationBatchOperationRequest_) – The process instance filter that
    defines which process instances should be canceled.
  - **data** (_ProcessInstanceCancellationBatchOperationRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The process instance batch operation failed. More details are provided in the response body.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  BatchOperationCreatedResult
- **Return type:**
  BatchOperationCreatedResult

#### Examples

**Cancel process instances in batch:**

```python
def cancel_process_instances_batch_operation_example() -> None:
    client = CamundaClient()

    result = client.cancel_process_instances_batch_operation(
        data=ProcessInstanceCancellationBatchOperationRequest(
            filter_=ProcessInstanceCancellationBatchOperationRequestFilter(),
        ),
    )

    print(f"Batch operation key: {result.batch_operation_key}")
```

### client

```python
client: [Client](configuration.md#camunda_orchestration_sdk.Client) | [AuthenticatedClient](configuration.md#camunda_orchestration_sdk.AuthenticatedClient)
```

### close()

```python
def close()
```

Close underlying HTTP clients.

This closes both the API client’s httpx client and, when available, the
auth provider’s token client.

- **Return type:**
  None

### complete_job()

```python
def complete_job(job_key, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Complete job

> Complete a job with the given payload, which allows completing the associated service task.

- **Parameters:**
  - **job_key** (_str_) – System-generated key for a job. Example: 2251799813653498.
  - **body** (_JobCompletionRequest_ _|_ _Unset_)
  - **data** (_JobCompletionRequest_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.NotFoundError** – If the response status code is 404. The job with the given key was not found.
  - **errors.ConflictError** – If the response status code is 409. The job with the given key is in the wrong state currently. More details are provided in the response body.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Complete a job:**

```python
def complete_job_example(job_key: JobKey) -> None:
    client = CamundaClient()

    client.complete_job(
        job_key=job_key,
        data=JobCompletionRequest(
            variables=JobCompletionRequestVariables.from_dict(
                {"paymentId": "PAY-123", "status": "completed"}
            )
        ),
    )
```

### complete_user_task()

```python
def complete_user_task(user_task_key, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Complete user task

> Completes a user task with the given key. Completion waits for blocking task listeners on this

lifecycle transition. If listener processing is delayed beyond the request timeout, this endpoint
can return 504. Other gateway timeout causes are also possible. Retry with backoff and inspect
listener worker availability and logs when this repeats.

- **Parameters:**
  - **user_task_key** (_str_) – System-generated key for a user task.
  - **body** (_UserTaskCompletionRequest_ _|_ _Unset_)
  - **data** (_UserTaskCompletionRequest_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.NotFoundError** – If the response status code is 404. The user task with the given key was not found.
  - **errors.ConflictError** – If the response status code is 409. The user task with the given key is in the wrong state currently. More details are provided in the response body.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.GatewayTimeoutError** – If the response status code is 504. The request timed out between the gateway and the broker. For these endpoints, this often happens when user task listeners are configured and the corresponding listener job is not completed within the request timeout. Common causes include no available job workers for the listener type, busy or crashed job workers, or delayed job completion. As with any gateway timeout, general timeout causes (for example transient network issues) can also result in a 504 response. Troubleshooting: - verify that job workers for the listener type are running and healthy - check worker logs for crashes, retries, and completion failures - check network connectivity between workers, gateway, and broker - retry with backoff after transient failures - fail without retries if a problem persists
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Complete a user task:**

```python
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
```

### configuration

```python
configuration: [CamundaSdkConfiguration](runtime.md#camunda_orchestration_sdk.runtime.configuration_resolver.CamundaSdkConfiguration)
```

### correlate_message()

```python
def correlate_message(, data, **kwargs)
```

Correlate message

> Publishes a message and correlates it to a subscription.

If correlation is successful it will return the first process instance key the message correlated
with.
The message is not buffered.
Use the publish message endpoint to send messages that can be buffered.

- **Parameters:**
  - **body** (_MessageCorrelationRequest_)
  - **data** (_MessageCorrelationRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. Not found
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  MessageCorrelationResult
- **Return type:**
  MessageCorrelationResult

#### Examples

**Correlate a message:**

```python
def correlate_message_example() -> None:
    client = CamundaClient()

    result = client.correlate_message(
        data=MessageCorrelationRequest(
            name="payment-received",
            correlation_key="order-12345",
        )
    )

    print(f"Message key: {result.message_key}")
```

### create_admin_user()

```python
def create_admin_user(, data, **kwargs)
```

Create admin user

> Creates a new user and assigns the admin role to it. This endpoint is only usable when users are

managed in the Orchestration Cluster and while no user is assigned to the admin role.

- **Parameters:**
  - **body** (_UserRequest_)
  - **data** (_UserRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  UserCreateResult
- **Return type:**
  UserCreateResult

#### Examples

**Create an admin user:**

```python
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
```

### create_authorization()

```python
def create_authorization(, data, **kwargs)
```

Create authorization

> Create the authorization.

- **Parameters:**
  - **body** (_AuthorizationIdBasedRequest_ _|_ _AuthorizationPropertyBasedRequest_)
  - **data** (_AuthorizationIdBasedRequest_ _|_ _AuthorizationPropertyBasedRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The owner was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  AuthorizationCreateResult
- **Return type:**
  AuthorizationCreateResult

#### Examples

**Create an authorization:**

```python
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
```

### create_deployment()

```python
def create_deployment(, data, **kwargs)
```

Deploy resources

> Deploys one or more resources (e.g. processes, decision models, or forms).

This is an atomic call, i.e. either all resources are deployed or none of them are.

- **Parameters:**
  - **body** (_CreateDeploymentData_)
  - **data** (_CreateDeploymentData_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  DeploymentResult
- **Return type:**
  DeploymentResult

#### Examples

**Deploy resources from files:**

```python
def deploy_resources_example() -> None:
    client = CamundaClient()

    result = client.deploy_resources_from_files(
        ["order-process.bpmn", "decision.dmn"]
    )

    print(f"Deployment key: {result.deployment_key}")
    for process in result.processes:
        print(
            f"  Process: {process.process_definition_id} v{process.process_definition_version}"
        )
    for decision in result.decisions:
        print(f"  Decision: {decision.decision_definition_id}")
```

**Deploy resources with tenant ID:**

```python
def deploy_resources_with_tenant_example() -> None:
    client = CamundaClient()

    result = client.deploy_resources_from_files(
        ["order-process.bpmn"],
        tenant_id="my-tenant",
    )

    print(f"Deployment key: {result.deployment_key}")
    print(f"Tenant: {result.tenant_id}")
```

### create_document()

```python
def create_document(*, data, store_id=<camunda_orchestration_sdk.types.Unset object>, document_id=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Upload document

> Upload a document to the Camunda 8 cluster.

Note that this is currently supported for document stores of type: AWS, GCP, in-memory (non-
production), local (non-production)

- **Parameters:**
  - **store_id** (_str_ _|_ _Unset_)
  - **document_id** (_str_ _|_ _Unset_) – Document Id that uniquely identifies a document.
  - **body** (_CreateDocumentData_)
  - **data** (_CreateDocumentData_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnsupportedMediaTypeError** – If the response status code is 415. The server cannot process the request because the media type (Content-Type) of the request payload is not supported by the server for the requested resource and method.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  DocumentReference
- **Return type:**
  DocumentReference

#### Examples

**Create a document:**

```python
def create_document_example() -> None:
    import io

    client = CamundaClient()

    result = client.create_document(
        data=CreateDocumentData(
            file=File(payload=io.BytesIO(b"hello world"), file_name="example.txt"),
        ),
    )

    print(f"Document ID: {result.document_id}")
```

### create_document_link()

```python
def create_document_link(document_id, *, data=<camunda_orchestration_sdk.types.Unset object>, store_id=<camunda_orchestration_sdk.types.Unset object>, content_hash=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Create document link

> Create a link to a document in the Camunda 8 cluster.

Note that this is currently supported for document stores of type: AWS, GCP

- **Parameters:**
  - **document_id** (_str_) – Document Id that uniquely identifies a document.
  - **store_id** (_str_ _|_ _Unset_)
  - **content_hash** (_str_ _|_ _Unset_)
  - **body** (_DocumentLinkRequest_ _|_ _Unset_)
  - **data** (_DocumentLinkRequest_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  DocumentLink
- **Return type:**
  DocumentLink

#### Examples

**Create a document link:**

```python
def create_document_link_example(document_id: DocumentId) -> None:
    client = CamundaClient()

    result = client.create_document_link(
        document_id=document_id,
        data=DocumentLinkRequest(),
    )

    print(f"Document link: {result.url}")
```

### create_documents()

```python
def create_documents(*, data, store_id=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Upload multiple documents

> Upload multiple documents to the Camunda 8 cluster.

The caller must provide a file name for each document, which will be used in case of a multi-status
response
to identify which documents failed to upload. The file name can be provided in the Content-
Disposition header
of the file part or in the fileName field of the metadata. You can add a parallel array of
metadata objects. These
are matched with the files based on index, and must have the same length as the files array.
To pass homogenous metadata for all files, spread the metadata over the metadata array.
A filename value provided explicitly via the metadata array in the request overrides the Content-
Disposition header
of the file part.

In case of a multi-status response, the response body will contain a list of
DocumentBatchProblemDetail objects,
each of which contains the file name of the document that failed to upload and the reason for the
failure.
The client can choose to retry the whole batch or individual documents based on the response.

Note that this is currently supported for document stores of type: AWS, GCP, in-memory (non-
production), local (non-production)

- **Parameters:**
  - **store_id** (_str_ _|_ _Unset_)
  - **body** (_CreateDocumentsData_)
  - **data** (_CreateDocumentsData_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnsupportedMediaTypeError** – If the response status code is 415. The server cannot process the request because the media type (Content-Type) of the request payload is not supported by the server for the requested resource and method.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  DocumentCreationBatchResponse
- **Return type:**
  DocumentCreationBatchResponse

#### Examples

**Create documents:**

```python
def create_documents_example() -> None:
    import io

    client = CamundaClient()

    result = client.create_documents(
        data=CreateDocumentsData(
            files=[
                File(payload=io.BytesIO(b"file one"), file_name="one.txt"),
                File(payload=io.BytesIO(b"file two"), file_name="two.txt"),
            ],
        ),
    )

    if not isinstance(result.created_documents, Unset):
        for doc in result.created_documents:
            print(f"Created document: {doc.document_id}")
```

### create_element_instance_variables()

```python
def create_element_instance_variables(element_instance_key, , data, **kwargs)
```

Update element instance variables

> Updates all the variables of a particular scope (for example, process instance, element instance)

with the given variable data.
Specify the element instance in the elementInstanceKey parameter.
Variable updates can be delayed by listener-related processing; if processing exceeds the
request timeout, this endpoint can return 504. Other gateway timeout causes are also
possible. Retry with backoff and inspect listener worker availability and logs when this
repeats.

- **Parameters:**
  - **element_instance_key** (_str_) – System-generated key for a element instance. Example: 2251799813686789.
  - **body** (_SetVariableRequest_)
  - **data** (_SetVariableRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.GatewayTimeoutError** – If the response status code is 504. The request timed out between the gateway and the broker. For these endpoints, this often happens when user task listeners are configured and the corresponding listener job is not completed within the request timeout. Common causes include no available job workers for the listener type, busy or crashed job workers, or delayed job completion. As with any gateway timeout, general timeout causes (for example transient network issues) can also result in a 504 response. Troubleshooting: - verify that job workers for the listener type are running and healthy - check worker logs for crashes, retries, and completion failures - check network connectivity between workers, gateway, and broker - retry with backoff after transient failures - fail without retries if a problem persists
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Create element instance variables:**

```python
def create_element_instance_variables_example(element_instance_key: ElementInstanceKey) -> None:
    client = CamundaClient()

    variables = SetVariableRequestVariables.from_dict({"myVar": "myValue"})
    client.create_element_instance_variables(
        element_instance_key=element_instance_key,
        data=SetVariableRequest(
            variables=variables,
        ),
    )
```

### create_global_cluster_variable()

```python
def create_global_cluster_variable(, data, **kwargs)
```

Create a global-scoped cluster variable

> Create a global-scoped cluster variable.

- **Parameters:**
  - **body** (_CreateClusterVariableRequest_)
  - **data** (_CreateClusterVariableRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  ClusterVariableResult
- **Return type:**
  ClusterVariableResult

#### Examples

**Create a global cluster variable:**

```python
def create_global_cluster_variable_example() -> None:
    client = CamundaClient()

    result = client.create_global_cluster_variable(
        data=CreateClusterVariableRequest(
            name="my-variable",
            value=CreateClusterVariableRequestValue.from_dict({"key": "my-value"}),
        ),
    )

    print(f"Created variable: {result.name}")
```

### create_global_task_listener()

```python
def create_global_task_listener(, data, **kwargs)
```

Create global user task listener

> Create a new global user task listener.

- **Parameters:**
  - **body** (_CreateGlobalTaskListenerRequest_)
  - **data** (_CreateGlobalTaskListenerRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.ConflictError** – If the response status code is 409. A global listener with this id already exists.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  GlobalTaskListenerResult
- **Return type:**
  GlobalTaskListenerResult

#### Examples

**Create a global task listener:**

```python
def create_global_task_listener_example() -> None:
    client = CamundaClient()

    result = client.create_global_task_listener(
        data=CreateGlobalTaskListenerRequest(
            id="audit-log-listener",
            event_types=[GlobalTaskListenerEventTypeEnum.COMPLETING],
            type_="my-task-listener",
        ),
    )

    print(f"Task listener: {result.id}")
```

### create_group()

```python
def create_group(*, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Create group

> Create a new group.

- **Parameters:**
  - **body** (_GroupCreateRequest_ _|_ _Unset_)
  - **data** (_GroupCreateRequest_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  GroupCreateResult
- **Return type:**
  GroupCreateResult

#### Examples

**Create a group:**

```python
def create_group_example() -> None:
    client = CamundaClient()

    result = client.create_group(
        data=GroupCreateRequest(group_id="engineering", name="Engineering"),
    )

    print(f"Group: {result.group_id}")
```

### create_mapping_rule()

```python
def create_mapping_rule(*, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Create mapping rule

> Create a new mapping rule

- **Parameters:**
  - **body** (_MappingRuleCreateRequest_ _|_ _Unset_)
  - **data** (_MappingRuleCreateRequest_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. The request to create a mapping rule was denied. More details are provided in the response body.
  - **errors.NotFoundError** – If the response status code is 404. The request to create a mapping rule was denied.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  CreateMappingRuleResponse201
- **Return type:**
  CreateMappingRuleResponse201

#### Examples

**Create a mapping rule:**

```python
def create_mapping_rule_example() -> None:
    client = CamundaClient()

    result = client.create_mapping_rule(
        data=MappingRuleCreateRequest(
            mapping_rule_id="engineering-group-mapping",
            claim_name="groups",
            claim_value="engineering",
            name="Engineering Group Mapping",
        ),
    )

    print(f"Mapping rule: {result.mapping_rule_id}")
```

### create_process_instance()

```python
def create_process_instance(, data, **kwargs)
```

Create process instance

> Creates and starts an instance of the specified process.

The process definition to use to create the instance can be specified either using its unique key
(as returned by Deploy resources), or using the BPMN process id and a version.

Waits for the completion of the process instance before returning a result
when awaitCompletion is enabled.

- **Parameters:**
  - **body** (_ProcessCreationById_ _|_ _ProcessCreationByKey_) – Instructions for creating a process
    instance. The process definition can be specified
    either by id or by key.
  - **data** (_ProcessCreationById_ _|_ _ProcessCreationByKey_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ConflictError** – If the response status code is 409. The process instance creation was rejected due to a business ID uniqueness conflict. This can happen only when Business ID Uniqueness Control is enabled and an active root process instance with the provided business ID already exists for the same process definition and tenant.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.GatewayTimeoutError** – If the response status code is 504. The process instance creation request timed out in the gateway. This can happen if the awaitCompletion request parameter is set to true and the created process instance did not complete within the defined request timeout. This often happens when the created instance is not fully automated or contains wait states.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  CreateProcessInstanceResult
- **Return type:**
  CreateProcessInstanceResult

#### Examples

**Create by process definition key:**

```python
def create_process_instance_by_key_example() -> None:
    client = CamundaClient()

    # Deploy a process and obtain the typed key from the response
    deployment = client.deploy_resources_from_files(["order-process.bpmn"])
    process_key = deployment.processes[0].process_definition_key

    # Use the typed key directly — no manual string lifting needed
    result = client.create_process_instance(
        data=ProcessCreationByKey(
            process_definition_key=process_key,
        )
    )

    print(f"Process instance key: {result.process_instance_key}")
```

**Create from a stored key:**

```python
def create_process_instance_by_key_from_storage_example() -> None:
    client = CamundaClient()

    # When restoring a key from a database or message queue,
    # wrap the raw string with the semantic type constructor:
    stored_key = "2251799813685249"  # e.g. from a DB row
    result = client.create_process_instance(
        data=ProcessCreationByKey(
            process_definition_key=ProcessDefinitionKey(stored_key),
        )
    )

    print(f"Process instance key: {result.process_instance_key}")
```

**Create by process definition ID:**

```python
def create_process_instance_by_id_example(process_definition_id: ProcessDefinitionId) -> None:
    client = CamundaClient()

    result = client.create_process_instance(
        data=ProcessCreationById(
            process_definition_id=process_definition_id,
        )
    )

    print(f"Process instance key: {result.process_instance_key}")
```

### create_role()

```python
def create_role(*, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Create role

> Create a new role.

- **Parameters:**
  - **body** (_RoleCreateRequest_ _|_ _Unset_)
  - **data** (_RoleCreateRequest_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  RoleCreateResult
- **Return type:**
  RoleCreateResult

#### Examples

**Create a role:**

```python
def create_role_example() -> None:
    client = CamundaClient()

    result = client.create_role(
        data=RoleCreateRequest(role_id="developer", name="Developer"),
    )

    print(f"Role: {result.role_id}")
```

### create_tenant()

```python
def create_tenant(, data, **kwargs)
```

Create tenant

> Creates a new tenant.

- **Parameters:**
  - **body** (_TenantCreateRequest_)
  - **data** (_TenantCreateRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. Not found. The resource was not found.
  - **errors.ConflictError** – If the response status code is 409. Tenant with this id already exists.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  TenantCreateResult
- **Return type:**
  TenantCreateResult

#### Examples

**Create a tenant:**

```python
def create_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    result = client.create_tenant(
        data=TenantCreateRequest(
            tenant_id=tenant_id,
            name="Acme Corporation",
        ),
    )

    print(f"Tenant: {result.tenant_id}")
```

### create_tenant_cluster_variable()

```python
def create_tenant_cluster_variable(tenant_id, , data, **kwargs)
```

Create a tenant-scoped cluster variable

> Create a new cluster variable for the given tenant.

- **Parameters:**
  - **tenant_id** (_str_) – The unique identifier of the tenant. Example: customer-service.
  - **body** (_CreateClusterVariableRequest_)
  - **data** (_CreateClusterVariableRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  ClusterVariableResult
- **Return type:**
  ClusterVariableResult

#### Examples

**Create a tenant cluster variable:**

```python
def create_tenant_cluster_variable_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    result = client.create_tenant_cluster_variable(
        tenant_id=tenant_id,
        data=CreateClusterVariableRequest(
            name="my-variable",
            value=CreateClusterVariableRequestValue.from_dict({"key": "tenant-value"}),
        ),
    )

    print(f"Created variable: {result.name}")
```

### create_user()

```python
def create_user(, data, **kwargs)
```

Create user

> Create a new user.

- **Parameters:**
  - **body** (_UserRequest_)
  - **data** (_UserRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.ConflictError** – If the response status code is 409. A user with this username already exists.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  UserCreateResult
- **Return type:**
  UserCreateResult

#### Examples

**Create a user:**

```python
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
```

### delete_authorization()

```python
def delete_authorization(authorization_key, **kwargs)
```

Delete authorization

> Deletes the authorization with the given key.

- **Parameters:**
  - **authorization_key** (_str_) – System-generated key for an authorization. Example: 2251799813684332.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.NotFoundError** – If the response status code is 404. The authorization with the authorizationKey was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Delete an authorization:**

```python
def delete_authorization_example(authorization_key: AuthorizationKey) -> None:
    client = CamundaClient()

    client.delete_authorization(
        authorization_key=authorization_key,
    )
```

### delete_decision_instance()

```python
def delete_decision_instance(decision_evaluation_key, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Delete decision instance

> Delete all associated decision evaluations based on provided key.

- **Parameters:**
  - **decision_evaluation_key** (_str_) – System-generated key for a decision evaluation. Example: 2251792362345323.
  - **body** (_DeleteDecisionInstanceData_ _|_ _None_ _|_ _Unset_)
  - **data** (_DeleteDecisionInstanceData_ _|_ _None_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The decision instance is not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Delete a decision instance:**

```python
def delete_decision_instance_example(decision_evaluation_key: DecisionEvaluationKey) -> None:
    client = CamundaClient()

    client.delete_decision_instance(
        decision_evaluation_key=decision_evaluation_key,
    )
```

### delete_decision_instances_batch_operation()

```python
def delete_decision_instances_batch_operation(, data, **kwargs)
```

Delete decision instances (batch)

> Delete multiple decision instances. This will delete the historic data from secondary storage.

This is done asynchronously, the progress can be tracked using the batchOperationKey from the
response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

- **Parameters:**
  - **body** (_DecisionInstanceDeletionBatchOperationRequest_) – The decision instance filter that
    defines which decision instances should be deleted.
  - **data** (_DecisionInstanceDeletionBatchOperationRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The decision instance batch operation failed. More details are provided in the response body.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  BatchOperationCreatedResult
- **Return type:**
  BatchOperationCreatedResult

#### Examples

**Delete decision instances in batch:**

```python
def delete_decision_instances_batch_operation_example() -> None:
    client = CamundaClient()

    result = client.delete_decision_instances_batch_operation(
        data=DecisionInstanceDeletionBatchOperationRequest(
            filter_=DecisionInstanceDeletionBatchOperationRequestFilter(),
        ),
    )

    print(f"Batch operation key: {result.batch_operation_key}")
```

### delete_document()

```python
def delete_document(document_id, *, store_id=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Delete document

> Delete a document from the Camunda 8 cluster.

Note that this is currently supported for document stores of type: AWS, GCP, in-memory (non-
production), local (non-production)

- **Parameters:**
  - **document_id** (_str_) – Document Id that uniquely identifies a document.
  - **store_id** (_str_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.NotFoundError** – If the response status code is 404. The document with the given ID was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Delete a document:**

```python
def delete_document_example(document_id: DocumentId) -> None:
    client = CamundaClient()

    client.delete_document(document_id=document_id)
```

### delete_global_cluster_variable()

```python
def delete_global_cluster_variable(name, **kwargs)
```

Delete a global-scoped cluster variable

> Delete a global-scoped cluster variable.

- **Parameters:**
  - **name** (_str_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. Cluster variable not found
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Delete a global cluster variable:**

```python
def delete_global_cluster_variable_example() -> None:
    client = CamundaClient()

    client.delete_global_cluster_variable(name="my-variable")
```

### delete_global_task_listener()

```python
def delete_global_task_listener(id, **kwargs)
```

Delete global user task listener

> Deletes a global user task listener.

- **Parameters:**
  - **id** (_str_) – The user-defined id for the global listener Example: GlobalListener_1.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The global user task listener was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Delete a global task listener:**

```python
def delete_global_task_listener_example(listener_id: GlobalListenerId) -> None:
    client = CamundaClient()

    client.delete_global_task_listener(id=listener_id)
```

### delete_group()

```python
def delete_group(group_id, **kwargs)
```

Delete group

> Deletes the group with the given ID.

- **Parameters:**
  - **group_id** (_str_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.NotFoundError** – If the response status code is 404. The group with the given ID was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Delete a group:**

```python
def delete_group_example() -> None:
    client = CamundaClient()

    client.delete_group(group_id="engineering")
```

### delete_mapping_rule()

```python
def delete_mapping_rule(mapping_rule_id, **kwargs)
```

Delete a mapping rule

> Deletes the mapping rule with the given ID.

- **Parameters:**
  - **mapping_rule_id** (_str_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.NotFoundError** – If the response status code is 404. The mapping rule with the mappingRuleId was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Delete a mapping rule:**

```python
def delete_mapping_rule_example() -> None:
    client = CamundaClient()

    client.delete_mapping_rule(mapping_rule_id="rule-123")
```

### delete_process_instance()

```python
def delete_process_instance(process_instance_key, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Delete process instance

> Deletes a process instance. Only instances that are completed or terminated can be deleted.

- **Parameters:**
  - **process_instance_key** (_str_) – System-generated key for a process instance. Example: 2251799813690746.
  - **body** (_DeleteProcessInstanceData_ _|_ _None_ _|_ _Unset_)
  - **data** (_DeleteProcessInstanceData_ _|_ _None_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The process instance is not found.
  - **errors.ConflictError** – If the response status code is 409. The process instance is not in a completed or terminated state and cannot be deleted.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Delete a process instance:**

```python
def delete_process_instance_example(process_instance_key: ProcessInstanceKey) -> None:
    client = CamundaClient()

    client.delete_process_instance(
        process_instance_key=process_instance_key,
    )
```

### delete_process_instances_batch_operation()

```python
def delete_process_instances_batch_operation(, data, **kwargs)
```

Delete process instances (batch)

> Delete multiple process instances. This will delete the historic data from secondary storage.

Only process instances in a final state (COMPLETED or TERMINATED) can be deleted.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the
response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

- **Parameters:**
  - **body** (_ProcessInstanceDeletionBatchOperationRequest_) – The process instance filter that
    defines which process instances should be deleted.
  - **data** (_ProcessInstanceDeletionBatchOperationRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The process instance batch operation failed. More details are provided in the response body.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  BatchOperationCreatedResult
- **Return type:**
  BatchOperationCreatedResult

#### Examples

**Delete process instances in batch:**

```python
def delete_process_instances_batch_operation_example() -> None:
    client = CamundaClient()

    result = client.delete_process_instances_batch_operation(
        data=ProcessInstanceDeletionBatchOperationRequest(
            filter_=ProcessInstanceCancellationBatchOperationRequestFilter(),
        ),
    )

    print(f"Batch operation key: {result.batch_operation_key}")
```

### delete_resource()

```python
def delete_resource(resource_key, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Delete resource

> Deletes a deployed resource. This can be a process definition, decision requirements

definition, or form definition deployed using the deploy resources endpoint. Specify the
resource you want to delete in the resourceKey parameter.

Once a resource has been deleted it cannot be recovered. If the resource needs to be
available again, a new deployment of the resource is required.

By default, only the resource itself is deleted from the runtime state. To also delete the
historic data associated with a resource, set the deleteHistory flag in the request body
to true. The historic data is deleted asynchronously via a batch operation. The details of
the created batch operation are included in the response. Note that history deletion is only
supported for process resources; for other resource types this flag is ignored and no history
will be deleted.

- **Parameters:**
  - **resource_key** (_str_) – The system-assigned key for this resource.
  - **body** (_DeleteResourceRequest_ _|_ _None_ _|_ _Unset_)
  - **data** (_DeleteResourceRequest_ _|_ _None_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.NotFoundError** – If the response status code is 404. The resource is not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  DeleteResourceResponse
- **Return type:**
  DeleteResourceResponse

#### Examples

**Delete a resource:**

```python
def delete_resource_example() -> None:
    client = CamundaClient()

    # Use a resource key from a previous deployment response
    client.delete_resource(resource_key="2251799813685249")
```

### delete_role()

```python
def delete_role(role_id, **kwargs)
```

Delete role

> Deletes the role with the given ID.

- **Parameters:**
  - **role_id** (_str_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.NotFoundError** – If the response status code is 404. The role with the ID was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Delete a role:**

```python
def delete_role_example() -> None:
    client = CamundaClient()

    client.delete_role(role_id="developer")
```

### delete_tenant()

```python
def delete_tenant(tenant_id, **kwargs)
```

Delete tenant

> Deletes an existing tenant.

- **Parameters:**
  - **tenant_id** (_str_) – The unique identifier of the tenant. Example: customer-service.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. Not found. The tenant was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Delete a tenant:**

```python
def delete_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    client.delete_tenant(tenant_id=tenant_id)
```

### delete_tenant_cluster_variable()

```python
def delete_tenant_cluster_variable(tenant_id, name, **kwargs)
```

Delete a tenant-scoped cluster variable

> Delete a tenant-scoped cluster variable.

- **Parameters:**
  - **tenant_id** (_str_) – The unique identifier of the tenant. Example: customer-service.
  - **name** (_str_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. Cluster variable not found
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Delete a tenant cluster variable:**

```python
def delete_tenant_cluster_variable_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    client.delete_tenant_cluster_variable(
        tenant_id=tenant_id,
        name="my-variable",
    )
```

### delete_user()

```python
def delete_user(username, **kwargs)
```

Delete user

> Deletes a user.

- **Parameters:**
  - **username** (_str_) – The unique name of a user. Example: swillis.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.NotFoundError** – If the response status code is 404. The user is not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Delete a user:**

```python
def delete_user_example(username: Username) -> None:
    client = CamundaClient()

    client.delete_user(username=username)
```

### deploy_resources_from_files()

```python
def deploy_resources_from_files(files, tenant_id=None)
```

Deploy BPMN/DMN/Form resources from local files.

This is a convenience wrapper around [`create_deployment()`](#create_deployment) that:

- Reads each path in `files` as bytes.
- Wraps the bytes in `camunda_orchestration_sdk.types.File` using the file’s basename
  as `file_name`.
- Builds `camunda_orchestration_sdk.models.CreateDeploymentData` and calls
  [`create_deployment()`](#create_deployment).
- Returns an `ExtendedDeploymentResult`, which is the deployment response plus
  convenience lists (`processes`, `decisions`, `decision_requirements`, `forms`).

* **Parameters:**
  - **files** (_list_ _[\*\*str_ _|_ _Path_ _]_) – File paths (`str` or `Path`) to deploy.
  - **tenant_id** (_str_ _|_ _None_) – Optional tenant identifier. If not provided, the default tenant is used.
* **Returns:**
  The deployment result with extracted resource lists.
* **Return type:**
  ExtendedDeploymentResult
* **Raises:**
  - **FileNotFoundError** – If any file path does not exist.
  - **PermissionError** – If any file path cannot be read.
  - **IsADirectoryError** – If any file path is a directory.
  - **OSError** – For other I/O failures while reading files.
  - **Exception** – Propagates any exception raised by [`create_deployment()`](#create_deployment) (including
    typed API errors in `camunda_orchestration_sdk.errors` and `httpx.TimeoutException`).

### evaluate_conditionals()

```python
def evaluate_conditionals(, data, **kwargs)
```

Evaluate root level conditional start events

> Evaluates root-level conditional start events for process definitions.

If the evaluation is successful, it will return the keys of all created process instances, along
with their associated process definition key.
Multiple root-level conditional start events of the same process definition can trigger if their
conditions evaluate to true.

- **Parameters:**
  - **body** (_ConditionalEvaluationInstruction_)
  - **data** (_ConditionalEvaluationInstruction_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. The client is not authorized to start process instances for the specified process definition. If a processDefinitionKey is not provided, this indicates that the client is not authorized to start process instances for at least one of the matched process definitions.
  - **errors.NotFoundError** – If the response status code is 404. The process definition was not found for the given processDefinitionKey.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  EvaluateConditionalResult
- **Return type:**
  EvaluateConditionalResult

#### Examples

**Evaluate conditionals:**

```python
def evaluate_conditionals_example() -> None:
    client = CamundaClient()

    result = client.evaluate_conditionals(
        data=ConditionalEvaluationInstruction(
            variables=ConditionalEvaluationInstructionVariables.from_dict({"orderReady": True}),
        ),
    )

    print(f"Result: {result}")
```

### evaluate_decision()

```python
def evaluate_decision(, data, **kwargs)
```

Evaluate decision

> Evaluates a decision.

You specify the decision to evaluate either by using its unique key (as returned by
DeployResource), or using the decision ID. When using the decision ID, the latest deployed
version of the decision is used.

- **Parameters:**
  - **body** (_DecisionEvaluationByID_ _|_ _DecisionEvaluationByKey_)
  - **data** (_DecisionEvaluationByID_ _|_ _DecisionEvaluationByKey_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.NotFoundError** – If the response status code is 404. The decision is not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  EvaluateDecisionResult
- **Return type:**
  EvaluateDecisionResult

#### Examples

**Evaluate by decision definition key:**

```python
def evaluate_decision_by_key_example(decision_definition_key: DecisionDefinitionKey) -> None:
    client = CamundaClient()

    result = client.evaluate_decision(
        data=DecisionEvaluationByKey(
            decision_definition_key=decision_definition_key,
        )
    )

    print(f"Decision key: {result.decision_definition_key}")
```

**Evaluate by decision definition ID:**

```python
def evaluate_decision_by_id_example(decision_definition_id: DecisionDefinitionId) -> None:
    client = CamundaClient()

    result = client.evaluate_decision(
        data=DecisionEvaluationByID(
            decision_definition_id=decision_definition_id,
        )
    )

    print(f"Decision key: {result.decision_definition_key}")
```

### evaluate_expression()

```python
def evaluate_expression(, data, **kwargs)
```

Evaluate an expression

> Evaluates a FEEL expression and returns the result. Supports references to tenant scoped cluster

variables when a tenant ID is provided.

- **Parameters:**
  - **body** (_ExpressionEvaluationRequest_)
  - **data** (_ExpressionEvaluationRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  ExpressionEvaluationResult
- **Return type:**
  ExpressionEvaluationResult

#### Examples

**Evaluate an expression:**

```python
def evaluate_expression_example() -> None:
    client = CamundaClient()

    result = client.evaluate_expression(
        data=ExpressionEvaluationRequest(
            expression="= 1 + 2",
        ),
    )

    print(f"Result: {result.result}")
```

### fail_job()

```python
def fail_job(job_key, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Fail job

> Mark the job as failed.

- **Parameters:**
  - **job_key** (_str_) – System-generated key for a job. Example: 2251799813653498.
  - **body** (_JobFailRequest_ _|_ _Unset_)
  - **data** (_JobFailRequest_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.NotFoundError** – If the response status code is 404. The job with the given jobKey is not found. It was completed by another worker, or the process instance itself was canceled.
  - **errors.ConflictError** – If the response status code is 409. The job with the given key is in the wrong state (i.e: not ACTIVATED or ACTIVATABLE). The job was failed by another worker with retries = 0, and the process is now in an incident state.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Fail a job with retry:**

```python
def fail_job_example(job_key: JobKey) -> None:
    client = CamundaClient()

    client.fail_job(
        job_key=job_key,
        data=JobFailRequest(
            retries=2,
            error_message="Payment gateway timeout",
            retry_back_off=5000,
        ),
    )
```

### get_audit_log()

```python
def get_audit_log(audit_log_key, **kwargs)
```

Get audit log

> Get an audit log entry by auditLogKey.

- **Parameters:**
  - **audit_log_key** (_str_) – System-generated key for an audit log entry. Example: 22517998136843567.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The audit log with the given key was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  AuditLogResult
- **Return type:**
  AuditLogResult

#### Examples

**Get an audit log entry:**

```python
def get_audit_log_example(audit_log_key: AuditLogKey) -> None:
    client = CamundaClient()

    result = client.get_audit_log(audit_log_key=audit_log_key)

    print(f"Audit log: {result.audit_log_key}")
```

### get_authentication()

```python
def get_authentication(**kwargs)
```

Get current user

> Retrieves the current authenticated user.

- **Raises:**
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  CamundaUserResult
- **Parameters:**
  **kwargs** (_Any_)
- **Return type:**
  CamundaUserResult

#### Examples

**Get authentication info:**

```python
def get_authentication_example() -> None:
    client = CamundaClient()

    result = client.get_authentication()

    print(f"Authenticated user: {result.username}")
```

### get_authorization()

```python
def get_authorization(authorization_key, **kwargs)
```

Get authorization

> Get authorization by the given key.

- **Parameters:**
  - **authorization_key** (_str_) – System-generated key for an authorization. Example: 2251799813684332.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The authorization with the given key was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  AuthorizationResult
- **Return type:**
  AuthorizationResult

#### Examples

**Get an authorization:**

```python
def get_authorization_example(authorization_key: AuthorizationKey) -> None:
    client = CamundaClient()

    result = client.get_authorization(
        authorization_key=authorization_key,
    )

    print(f"Resource type: {result.resource_type}")
```

### get_batch_operation()

```python
def get_batch_operation(batch_operation_key, **kwargs)
```

Get batch operation

> Get batch operation by key.

- **Parameters:**
  - **batch_operation_key** (_str_) – System-generated key for an batch operation. Example: 2251799813684321.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.NotFoundError** – If the response status code is 404. The batch operation is not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  BatchOperationResponse
- **Return type:**
  BatchOperationResponse

#### Examples

**Get a batch operation:**

```python
def get_batch_operation_example(batch_operation_key: BatchOperationKey) -> None:
    client = CamundaClient()

    result = client.get_batch_operation(
        batch_operation_key=batch_operation_key,
    )

    print(f"Batch operation: {result.batch_operation_key}")
```

### get_decision_definition()

```python
def get_decision_definition(decision_definition_key, **kwargs)
```

Get decision definition

> Returns a decision definition by key.

- **Parameters:**
  - **decision_definition_key** (_str_) – System-generated key for a decision definition. Example: 2251799813326547.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The decision definition with the given key was not found. More details are provided in the response body.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  DecisionDefinitionResult
- **Return type:**
  DecisionDefinitionResult

#### Examples

**Get a decision definition:**

```python
def get_decision_definition_example(decision_definition_key: DecisionDefinitionKey) -> None:
    client = CamundaClient()

    definition = client.get_decision_definition(
        decision_definition_key=decision_definition_key,
    )

    print(f"Decision: {definition.decision_definition_id}")
```

### get_decision_definition_xml()

```python
def get_decision_definition_xml(decision_definition_key, **kwargs)
```

Get decision definition XML

> Returns decision definition as XML.

- **Parameters:**
  - **decision_definition_key** (_str_) – System-generated key for a decision definition. Example: 2251799813326547.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The decision definition with the given key was not found. More details are provided in the response body.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  str
- **Return type:**
  str

#### Examples

**Get decision definition XML:**

```python
def get_decision_definition_xml_example(decision_definition_key: DecisionDefinitionKey) -> None:
    client = CamundaClient()

    xml = client.get_decision_definition_xml(
        decision_definition_key=decision_definition_key,
    )

    print(f"XML length: {len(xml)}")
```

### get_decision_instance()

```python
def get_decision_instance(decision_evaluation_instance_key, **kwargs)
```

Get decision instance

> Returns a decision instance.

- **Parameters:**
  - **decision_evaluation_instance_key** (_str_) – System-generated key for a decision evaluation
    instance. Example: 2251799813684367.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The decision instance with the given key was not found. More details are provided in the response body.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  DecisionInstanceGetQueryResult
- **Return type:**
  DecisionInstanceGetQueryResult

#### Examples

**Get a decision instance:**

```python
def get_decision_instance_example(decision_evaluation_instance_key: DecisionEvaluationInstanceKey) -> None:
    client = CamundaClient()

    result = client.get_decision_instance(
        decision_evaluation_instance_key=decision_evaluation_instance_key,
    )

    print(f"Decision instance: {result.decision_definition_id}")
```

### get_decision_requirements()

```python
def get_decision_requirements(decision_requirements_key, **kwargs)
```

Get decision requirements

> Returns Decision Requirements as JSON.

- **Parameters:**
  - **decision_requirements_key** (_str_) – System-generated key for a deployed decision requirements
    definition. Example: 2251799813683346.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The decision requirements with the given key was not found. More details are provided in the response body.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  DecisionRequirementsResult
- **Return type:**
  DecisionRequirementsResult

#### Examples

**Get decision requirements:**

```python
def get_decision_requirements_example(decision_requirements_key: DecisionRequirementsKey) -> None:
    client = CamundaClient()

    result = client.get_decision_requirements(
        decision_requirements_key=decision_requirements_key,
    )

    print(f"DRD: {result.decision_requirements_name}")
```

### get_decision_requirements_xml()

```python
def get_decision_requirements_xml(decision_requirements_key, **kwargs)
```

Get decision requirements XML

> Returns decision requirements as XML.

- **Parameters:**
  - **decision_requirements_key** (_str_) – System-generated key for a deployed decision requirements
    definition. Example: 2251799813683346.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The decision requirements with the given key was not found. More details are provided in the response body.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  str
- **Return type:**
  str

#### Examples

**Get decision requirements XML:**

```python
def get_decision_requirements_xml_example(decision_requirements_key: DecisionRequirementsKey) -> None:
    client = CamundaClient()

    xml = client.get_decision_requirements_xml(
        decision_requirements_key=decision_requirements_key,
    )

    print(f"XML length: {len(xml)}")
```

### get_document()

```python
def get_document(document_id, *, store_id=<camunda_orchestration_sdk.types.Unset object>, content_hash=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Download document

> Download a document from the Camunda 8 cluster.

Note that this is currently supported for document stores of type: AWS, GCP, in-memory (non-
production), local (non-production)

- **Parameters:**
  - **document_id** (_str_) – Document Id that uniquely identifies a document.
  - **store_id** (_str_ _|_ _Unset_)
  - **content_hash** (_str_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.NotFoundError** – If the response status code is 404. The document with the given ID was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  File
- **Return type:**
  File

#### Examples

**Get a document:**

```python
def get_document_example(document_id: DocumentId) -> None:
    client = CamundaClient()

    result = client.get_document(document_id=document_id)

    print(f"File name: {result.file_name}")
```

### get_element_instance()

```python
def get_element_instance(element_instance_key, **kwargs)
```

Get element instance

> Returns element instance as JSON.

- **Parameters:**
  - **element_instance_key** (_str_) – System-generated key for a element instance. Example: 2251799813686789.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The element instance with the given key was not found. More details are provided in the response body.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  ElementInstanceResult
- **Return type:**
  ElementInstanceResult

#### Examples

**Get an element instance:**

```python
def get_element_instance_example(element_instance_key: ElementInstanceKey) -> None:
    client = CamundaClient()

    result = client.get_element_instance(
        element_instance_key=element_instance_key,
    )

    print(f"Element: {result.element_id}")
```

### get_global_cluster_variable()

```python
def get_global_cluster_variable(name, **kwargs)
```

Get a global-scoped cluster variable

> Get a global-scoped cluster variable.

- **Parameters:**
  - **name** (_str_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. Cluster variable not found
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  ClusterVariableResult
- **Return type:**
  ClusterVariableResult

#### Examples

**Get a global cluster variable:**

```python
def get_global_cluster_variable_example() -> None:
    client = CamundaClient()

    result = client.get_global_cluster_variable(name="my-variable")

    print(f"Variable: {result.name} = {result.value}")
```

### get_global_job_statistics()

```python
def get_global_job_statistics(*, from_, to, job_type=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Global job statistics

> Returns global aggregated counts for jobs. Filter by the creation time window (required) and

optionally by jobType.

- **Parameters:**
  - **from** (_datetime.datetime_)
  - **to** (_datetime.datetime_)
  - **job_type** (_str_ _|_ _Unset_)
  - **from\_** (_datetime.datetime_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  GlobalJobStatisticsQueryResult
- **Return type:**
  GlobalJobStatisticsQueryResult

#### Examples

**Get global job statistics:**

```python
def get_global_job_statistics_example() -> None:
    client = CamundaClient()

    result = client.get_global_job_statistics(
        from_=datetime.datetime(2024, 1, 1),
        to=datetime.datetime(2024, 12, 31),
    )

    print(f"Global job stats: {result}")
```

### get_global_task_listener()

```python
def get_global_task_listener(id, **kwargs)
```

Get global user task listener

> Get a global user task listener by its id.

- **Parameters:**
  - **id** (_str_) – The user-defined id for the global listener Example: GlobalListener_1.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The global user task listener with the given id was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  GlobalTaskListenerResult
- **Return type:**
  GlobalTaskListenerResult

#### Examples

**Get a global task listener:**

```python
def get_global_task_listener_example(listener_id: GlobalListenerId) -> None:
    client = CamundaClient()

    result = client.get_global_task_listener(id=listener_id)

    print(f"Task listener: {result.event_types}")
```

### get_group()

```python
def get_group(group_id, **kwargs)
```

Get group

> Get a group by its ID.

- **Parameters:**
  - **group_id** (_str_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The group with the given ID was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  GroupResult
- **Return type:**
  GroupResult

#### Examples

**Get a group:**

```python
def get_group_example() -> None:
    client = CamundaClient()

    result = client.get_group(group_id="engineering")

    print(f"Group: {result.name}")
```

### get_incident()

```python
def get_incident(incident_key, **kwargs)
```

Get incident

> Returns incident as JSON.

- **Parameters:**
  - **incident_key** (_str_) – System-generated key for a incident. Example: 2251799813689432.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The incident with the given key was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  IncidentResult
- **Return type:**
  IncidentResult

#### Examples

**Get an incident:**

```python
def get_incident_example(incident_key: IncidentKey) -> None:
    client = CamundaClient()

    incident = client.get_incident(incident_key=incident_key)

    print(f"Incident error type: {incident.error_type}")
```

### get_job_error_statistics()

```python
def get_job_error_statistics(, data, **kwargs)
```

Get error metrics for a job type

> Returns aggregated metrics per error for the given jobType.

- **Parameters:**
  - **body** (_JobErrorStatisticsQuery_) – Job error statistics query.
  - **data** (_JobErrorStatisticsQuery_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  JobErrorStatisticsQueryResult
- **Return type:**
  JobErrorStatisticsQueryResult

#### Examples

**Get job error statistics:**

```python
def get_job_error_statistics_example() -> None:
    client = CamundaClient()

    result = client.get_job_error_statistics(
        data=JobErrorStatisticsQuery(
            filter_=JobErrorStatisticsFilter(
                from_=datetime.datetime(2024, 1, 1),
                to=datetime.datetime(2024, 12, 31),
                job_type="payment-processing",
            ),
        ),
    )

    if not isinstance(result.items, Unset):
        for stat in result.items:
            print(f"Error: {stat.error_code}")
```

### get_job_time_series_statistics()

```python
def get_job_time_series_statistics(, data, **kwargs)
```

Get time-series metrics for a job type

> Returns a list of time-bucketed metrics ordered ascending by time.

The from and to fields select the time window of interest.
Each item in the response corresponds to one time bucket of the requested resolution.

- **Parameters:**
  - **body** (_JobTimeSeriesStatisticsQuery_) – Job time-series statistics query.
  - **data** (_JobTimeSeriesStatisticsQuery_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  JobTimeSeriesStatisticsQueryResult
- **Return type:**
  JobTimeSeriesStatisticsQueryResult

#### Examples

**Get job time series statistics:**

```python
def get_job_time_series_statistics_example() -> None:
    client = CamundaClient()

    result = client.get_job_time_series_statistics(
        data=JobTimeSeriesStatisticsQuery(
            filter_=JobTimeSeriesStatisticsFilter(
                from_=datetime.datetime(2024, 1, 1),
                to=datetime.datetime(2024, 12, 31),
                job_type="payment-processing",
            ),
        ),
    )

    if not isinstance(result.items, Unset):
        for stat in result.items:
            print(f"Time series: {stat}")
```

### get_job_type_statistics()

```python
def get_job_type_statistics(, data, **kwargs)
```

Get job statistics by type

> Get statistics about jobs, grouped by job type.

- **Parameters:**
  - **body** (_JobTypeStatisticsQuery_) – Job type statistics query.
  - **data** (_JobTypeStatisticsQuery_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  JobTypeStatisticsQueryResult
- **Return type:**
  JobTypeStatisticsQueryResult

#### Examples

**Get job type statistics:**

```python
def get_job_type_statistics_example() -> None:
    client = CamundaClient()

    result = client.get_job_type_statistics(
        data=JobTypeStatisticsQuery(),
    )

    if not isinstance(result.items, Unset):
        for stat in result.items:
            print(f"Job type: {stat.job_type}")
```

### get_job_worker_statistics()

```python
def get_job_worker_statistics(, data, **kwargs)
```

Get job statistics by worker

> Get statistics about jobs, grouped by worker, for a given job type.

- **Parameters:**
  - **body** (_JobWorkerStatisticsQuery_) – Job worker statistics query.
  - **data** (_JobWorkerStatisticsQuery_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  JobWorkerStatisticsQueryResult
- **Return type:**
  JobWorkerStatisticsQueryResult

#### Examples

**Get job worker statistics:**

```python
def get_job_worker_statistics_example() -> None:
    client = CamundaClient()

    result = client.get_job_worker_statistics(
        data=JobWorkerStatisticsQuery(
            filter_=JobWorkerStatisticsFilter(
                from_=datetime.datetime(2024, 1, 1),
                to=datetime.datetime(2024, 12, 31),
                job_type="payment-processing",
            ),
        ),
    )

    if not isinstance(result.items, Unset):
        for stat in result.items:
            print(f"Worker: {stat.worker}")
```

### get_license()

```python
def get_license(**kwargs)
```

Get license status

> Obtains the status of the current Camunda license.

- **Raises:**
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  LicenseResponse
- **Parameters:**
  **kwargs** (_Any_)
- **Return type:**
  LicenseResponse

#### Examples

**Get license information:**

```python
def get_license_example() -> None:
    client = CamundaClient()

    result = client.get_license()

    print(f"License type: {result.license_type}")
```

### get_mapping_rule()

```python
def get_mapping_rule(mapping_rule_id, **kwargs)
```

Get a mapping rule

> Gets the mapping rule with the given ID.

- **Parameters:**
  - **mapping_rule_id** (_str_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.NotFoundError** – If the response status code is 404. The mapping rule with the mappingRuleId was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  MappingRuleResult
- **Return type:**
  MappingRuleResult

#### Examples

**Get a mapping rule:**

```python
def get_mapping_rule_example() -> None:
    client = CamundaClient()

    result = client.get_mapping_rule(mapping_rule_id="rule-123")

    print(f"Mapping rule: {result.name}")
```

### get_process_definition()

```python
def get_process_definition(process_definition_key, **kwargs)
```

Get process definition

> Returns process definition as JSON.

- **Parameters:**
  - **process_definition_key** (_str_) – System-generated key for a deployed process definition.
    Example: 2251799813686749.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The process definition with the given key was not found. More details are provided in the response body.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  ProcessDefinitionResult
- **Return type:**
  ProcessDefinitionResult

#### Examples

**Get a process definition:**

```python
def get_process_definition_example(process_definition_key: ProcessDefinitionKey) -> None:
    client = CamundaClient()

    result = client.get_process_definition(
        process_definition_key=process_definition_key,
    )

    print(f"Process definition: {result.name}")
```

### get_process_definition_instance_statistics()

```python
def get_process_definition_instance_statistics(*, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Get process instance statistics

> Get statistics about process instances, grouped by process definition and tenant.

- **Parameters:**
  - **body** (_ProcessDefinitionInstanceStatisticsQuery_ _|_ _Unset_)
  - **data** (_ProcessDefinitionInstanceStatisticsQuery_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  ProcessDefinitionInstanceStatisticsQueryResult
- **Return type:**
  ProcessDefinitionInstanceStatisticsQueryResult

#### Examples

**Get process definition instance statistics:**

```python
def get_process_definition_instance_statistics_example() -> None:
    client = CamundaClient()

    result = client.get_process_definition_instance_statistics(
        data=ProcessDefinitionInstanceStatisticsQuery(),
    )

    if not isinstance(result.items, Unset):
        for stat in result.items:
            print(f"Definition: {stat.process_definition_id}")
```

### get_process_definition_instance_version_statistics()

```python
def get_process_definition_instance_version_statistics(, data, **kwargs)
```

Get process instance statistics by version

> Get statistics about process instances, grouped by version for a given process definition.

The process definition ID must be provided as a required field in the request body filter.

- **Parameters:**
  - **body** (_ProcessDefinitionInstanceVersionStatisticsQuery_)
  - **data** (_ProcessDefinitionInstanceVersionStatisticsQuery_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  ProcessDefinitionInstanceVersionStatisticsQueryResult
- **Return type:**
  ProcessDefinitionInstanceVersionStatisticsQueryResult

#### Examples

**Get version statistics:**

```python
def get_process_definition_instance_version_statistics_example(process_definition_id: ProcessDefinitionId) -> None:
    client = CamundaClient()

    result = client.get_process_definition_instance_version_statistics(
        data=ProcessDefinitionInstanceVersionStatisticsQuery(
            filter_=ProcessDefinitionInstanceVersionStatisticsQueryFilter(
                process_definition_id=process_definition_id,
            ),
        ),
    )

    if not isinstance(result.items, Unset):
        for stat in result.items:
            print(f"Version: {stat.process_definition_version}")
```

### get_process_definition_message_subscription_statistics()

```python
def get_process_definition_message_subscription_statistics(*, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Get message subscription statistics

> Get message subscription statistics, grouped by process definition.

- **Parameters:**
  - **body** (_ProcessDefinitionMessageSubscriptionStatisticsQuery_ _|_ _Unset_)
  - **data** (_ProcessDefinitionMessageSubscriptionStatisticsQuery_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  ProcessDefinitionMessageSubscriptionStatisticsQueryResult
- **Return type:**
  ProcessDefinitionMessageSubscriptionStatisticsQueryResult

#### Examples

**Get message subscription statistics:**

```python
def get_process_definition_message_subscription_statistics_example() -> None:
    client = CamundaClient()

    result = client.get_process_definition_message_subscription_statistics(
        data=ProcessDefinitionMessageSubscriptionStatisticsQuery(),
    )

    if not isinstance(result.items, Unset):
        for stat in result.items:
            print(f"Definition: {stat.process_definition_id}, subscriptions: {stat.active_subscriptions}")
```

### get_process_definition_statistics()

```python
def get_process_definition_statistics(process_definition_key, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Get process definition statistics

> Get statistics about elements in currently running process instances by process definition key and

search filter.

- **Parameters:**
  - **process_definition_key** (_str_) – System-generated key for a deployed process definition.
    Example: 2251799813686749.
  - **body** (_ProcessDefinitionElementStatisticsQuery_ _|_ _Unset_) – Process definition element
    statistics request.
  - **data** (_ProcessDefinitionElementStatisticsQuery_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  ProcessDefinitionElementStatisticsQueryResult
- **Return type:**
  ProcessDefinitionElementStatisticsQueryResult

#### Examples

**Get process definition element statistics:**

```python
def get_process_definition_statistics_example(process_definition_key: ProcessDefinitionKey) -> None:
    client = CamundaClient()

    result = client.get_process_definition_statistics(
        process_definition_key=process_definition_key,
    )

    if not isinstance(result.items, Unset):
        for stat in result.items:
            print(f"Element: {stat.element_id}")
```

### get_process_definition_xml()

```python
def get_process_definition_xml(process_definition_key, **kwargs)
```

Get process definition XML

> Returns process definition as XML.

- **Parameters:**
  - **process_definition_key** (_str_) – System-generated key for a deployed process definition.
    Example: 2251799813686749.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The process definition with the given key was not found. More details are provided in the response body.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  str
- **Return type:**
  str

#### Examples

**Get process definition XML:**

```python
def get_process_definition_xml_example(process_definition_key: ProcessDefinitionKey) -> None:
    client = CamundaClient()

    xml = client.get_process_definition_xml(
        process_definition_key=process_definition_key,
    )

    print(f"XML length: {len(xml)}")
```

### get_process_instance()

```python
def get_process_instance(process_instance_key, **kwargs)
```

Get process instance

> Get the process instance by the process instance key.

- **Parameters:**
  - **process_instance_key** (_str_) – System-generated key for a process instance. Example: 2251799813690746.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The process instance with the given key was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  ProcessInstanceResult
- **Return type:**
  ProcessInstanceResult

#### Examples

**Get a process instance:**

```python
def get_process_instance_example(process_instance_key: ProcessInstanceKey) -> None:
    client = CamundaClient()

    result = client.get_process_instance(
        process_instance_key=process_instance_key,
    )

    print(f"Process instance: {result.process_definition_id}")
```

### get_process_instance_call_hierarchy()

```python
def get_process_instance_call_hierarchy(process_instance_key, **kwargs)
```

Get call hierarchy

> Returns the call hierarchy for a given process instance, showing its ancestry up to the root

instance.

- **Parameters:**
  - **process_instance_key** (_str_) – System-generated key for a process instance. Example: 2251799813690746.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The process instance is not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  list[Any]
- **Return type:**
  list[Any]

#### Examples

**Get process instance call hierarchy:**

```python
def get_process_instance_call_hierarchy_example(process_instance_key: ProcessInstanceKey) -> None:
    client = CamundaClient()

    result = client.get_process_instance_call_hierarchy(
        process_instance_key=process_instance_key,
    )

    for entry in result:
        print(f"Call hierarchy entry: {entry}")
```

### get_process_instance_sequence_flows()

```python
def get_process_instance_sequence_flows(process_instance_key, **kwargs)
```

Get sequence flows

> Get sequence flows taken by the process instance.

- **Parameters:**
  - **process_instance_key** (_str_) – System-generated key for a process instance. Example: 2251799813690746.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  ProcessInstanceSequenceFlowsQueryResult
- **Return type:**
  ProcessInstanceSequenceFlowsQueryResult

#### Examples

**Get process instance sequence flows:**

```python
def get_process_instance_sequence_flows_example(process_instance_key: ProcessInstanceKey) -> None:
    client = CamundaClient()

    result = client.get_process_instance_sequence_flows(
        process_instance_key=process_instance_key,
    )

    if not isinstance(result.items, Unset):
        for flow in result.items:
            print(f"Sequence flow: {flow}")
```

### get_process_instance_statistics()

```python
def get_process_instance_statistics(process_instance_key, **kwargs)
```

Get element instance statistics

> Get statistics about elements by the process instance key.

- **Parameters:**
  - **process_instance_key** (_str_) – System-generated key for a process instance. Example: 2251799813690746.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  ProcessInstanceElementStatisticsQueryResult
- **Return type:**
  ProcessInstanceElementStatisticsQueryResult

#### Examples

**Get process instance statistics:**

```python
def get_process_instance_statistics_example(process_instance_key: ProcessInstanceKey) -> None:
    client = CamundaClient()

    result = client.get_process_instance_statistics(
        process_instance_key=process_instance_key,
    )

    if not isinstance(result.items, Unset):
        for stat in result.items:
            print(f"Element: {stat.element_id}, Active: {stat.active}")
```

### get_process_instance_statistics_by_definition()

```python
def get_process_instance_statistics_by_definition(, data, **kwargs)
```

Get process instance statistics by definition

> Returns statistics for active process instances with incidents, grouped by process

definition. The result set is scoped to a specific incident error hash code, which must be
provided as a filter in the request body.

- **Parameters:**
  - **body** (_IncidentProcessInstanceStatisticsByDefinitionQuery_)
  - **data** (_IncidentProcessInstanceStatisticsByDefinitionQuery_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  IncidentProcessInstanceStatisticsByDefinitionQueryResult
- **Return type:**
  IncidentProcessInstanceStatisticsByDefinitionQueryResult

#### Examples

**Get instance statistics by definition:**

```python
def get_process_instance_statistics_by_definition_example() -> None:
    client = CamundaClient()

    result = client.get_process_instance_statistics_by_definition(
        data=IncidentProcessInstanceStatisticsByDefinitionQuery(
            filter_=IncidentProcessInstanceStatisticsByDefinitionQueryFilter(
                error_hash_code=12345,
            ),
        ),
    )

    if not isinstance(result.items, Unset):
        for stat in result.items:
            print(f"Definition: {stat.process_definition_key}")
```

### get_process_instance_statistics_by_error()

```python
def get_process_instance_statistics_by_error(*, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Get process instance statistics by error

> Returns statistics for active process instances that currently have active incidents,

grouped by incident error hash code.

- **Parameters:**
  - **body** (_IncidentProcessInstanceStatisticsByErrorQuery_ _|_ _Unset_)
  - **data** (_IncidentProcessInstanceStatisticsByErrorQuery_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  IncidentProcessInstanceStatisticsByErrorQueryResult
- **Return type:**
  IncidentProcessInstanceStatisticsByErrorQueryResult

#### Examples

**Get instance statistics by error:**

```python
def get_process_instance_statistics_by_error_example() -> None:
    client = CamundaClient()

    result = client.get_process_instance_statistics_by_error(
        data=IncidentProcessInstanceStatisticsByErrorQuery(),
    )

    if not isinstance(result.items, Unset):
        for stat in result.items:
            print(f"Error: {stat.error_message}")
```

### get_resource()

```python
def get_resource(resource_key, **kwargs)
```

Get resource

> Returns a deployed resource.

:::info
Currently, this endpoint only supports RPA resources.
:::

- **resource_key**: The system-assigned key for this resource.

````

* **Raises:**
  * **errors.NotFoundError** – If the response status code is 404. A resource with the given key was not found.
  * **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  ResourceResult
* **Parameters:**
  * **resource_key** (*str*)
  * **kwargs** (*Any*)
* **Return type:**
  ResourceResult

#### Examples

**Get a resource:**

```python
def get_resource_example() -> None:
    client = CamundaClient()

    result = client.get_resource(resource_key="123456")

    print(f"Resource: {result.resource_name}")
````

### get_resource_content()

```python
def get_resource_content(resource_key, **kwargs)
```

Get resource content

> Returns the content of a deployed resource.

:::info
Currently, this endpoint only supports RPA resources.
:::

- **resource_key**: The system-assigned key for this resource.

````

* **Raises:**
  * **errors.NotFoundError** – If the response status code is 404. A resource with the given key was not found.
  * **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  str
* **Parameters:**
  * **resource_key** (*str*)
  * **kwargs** (*Any*)
* **Return type:**
  str

#### Examples

**Get resource content:**

```python
def get_resource_content_example() -> None:
    client = CamundaClient()

    content = client.get_resource_content(resource_key="123456")

    print(f"Content length: {len(content)}")
````

### get_role()

```python
def get_role(role_id, **kwargs)
```

Get role

> Get a role by its ID.

- **Parameters:**
  - **role_id** (_str_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The role with the given ID was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  RoleResult
- **Return type:**
  RoleResult

#### Examples

**Get a role:**

```python
def get_role_example() -> None:
    client = CamundaClient()

    result = client.get_role(role_id="developer")

    print(f"Role: {result.name}")
```

### get_start_process_form()

```python
def get_start_process_form(process_definition_key, **kwargs)
```

Get process start form

> Get the start form of a process.

Note that this endpoint will only return linked forms. This endpoint does not support embedded
forms.

- **Parameters:**
  - **process_definition_key** (_str_) – System-generated key for a deployed process definition.
    Example: 2251799813686749.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. Not found
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  FormResult
- **Return type:**
  FormResult

#### Examples

**Get start process form:**

```python
def get_start_process_form_example(process_definition_key: ProcessDefinitionKey) -> None:
    client = CamundaClient()

    result = client.get_start_process_form(
        process_definition_key=process_definition_key,
    )

    print(f"Form: {result.form_key}")
```

### get_status()

```python
def get_status(**kwargs)
```

Get cluster status

- **Raises:**
  - **errors.ServiceUnavailableError** – If the response status code is 503.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Parameters:**
  **kwargs** (_Any_)
- **Return type:**
  None

#### Examples

**Check cluster status:**

```python
def get_status_example() -> None:
    client = CamundaClient()

    client.get_status()

    print("Cluster is healthy")
```

### get_system_configuration()

```python
def get_system_configuration(**kwargs)
```

System configuration (alpha)

> Returns the current system configuration. The response is an envelope

that groups settings by feature area.

This endpoint is an alpha feature and may be subject to change
in future releases.

- **Raises:**
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  SystemConfigurationResponse
- **Parameters:**
  **kwargs** (_Any_)
- **Return type:**
  SystemConfigurationResponse

#### Examples

**Get system configuration:**

```python
def get_system_configuration_example() -> None:
    client = CamundaClient()

    result = client.get_system_configuration()

    print(f"System config: {result}")
```

### get_tenant()

```python
def get_tenant(tenant_id, **kwargs)
```

Get tenant

> Retrieves a single tenant by tenant ID.

- **Parameters:**
  - **tenant_id** (_str_) – The unique identifier of the tenant. Example: customer-service.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. Tenant not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  TenantResult
- **Return type:**
  TenantResult

#### Examples

**Get a tenant:**

```python
def get_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    result = client.get_tenant(tenant_id=tenant_id)

    print(f"Tenant: {result.name}")
```

### get_tenant_cluster_variable()

```python
def get_tenant_cluster_variable(tenant_id, name, **kwargs)
```

Get a tenant-scoped cluster variable

> Get a tenant-scoped cluster variable.

- **Parameters:**
  - **tenant_id** (_str_) – The unique identifier of the tenant. Example: customer-service.
  - **name** (_str_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. Cluster variable not found
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  ClusterVariableResult
- **Return type:**
  ClusterVariableResult

#### Examples

**Get a tenant cluster variable:**

```python
def get_tenant_cluster_variable_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    result = client.get_tenant_cluster_variable(
        tenant_id=tenant_id,
        name="my-variable",
    )

    print(f"Variable: {result.name} = {result.value}")
```

### get_topology()

```python
def get_topology(**kwargs)
```

Get cluster topology

> Obtains the current topology of the cluster the gateway is part of.

- **Raises:**
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  TopologyResponse
- **Parameters:**
  **kwargs** (_Any_)
- **Return type:**
  TopologyResponse

#### Examples

**Get cluster topology:**

```python
def get_topology_example() -> None:
    client = CamundaClient()

    result = client.get_topology()

    print(f"Topology: {result}")
```

### get_usage_metrics()

```python
def get_usage_metrics(*, start_time, end_time, tenant_id=<camunda_orchestration_sdk.types.Unset object>, with_tenants=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Get usage metrics

> Retrieve the usage metrics based on given criteria.

- **Parameters:**
  - **start_time** (_datetime.datetime_) – Example: 2025-06-07T13:14:15Z.
  - **end_time** (_datetime.datetime_) – Example: 2025-06-07T13:14:15Z.
  - **tenant_id** (_str_ _|_ _Unset_) – The unique identifier of the tenant. Example: customer-service.
  - **with_tenants** (_bool_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  UsageMetricsResponse
- **Return type:**
  UsageMetricsResponse

#### Examples

**Get usage metrics:**

```python
def get_usage_metrics_example() -> None:
    client = CamundaClient()

    result = client.get_usage_metrics(
        start_time=datetime.datetime(2024, 1, 1),
        end_time=datetime.datetime(2024, 12, 31),
    )

    print(f"Metrics: {result}")
```

### get_user()

```python
def get_user(username, **kwargs)
```

Get user

> Get a user by its username.

- **Parameters:**
  - **username** (_str_) – The unique name of a user. Example: swillis.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The user with the given username was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  GetUserResponse200
- **Return type:**
  GetUserResponse200

#### Examples

**Get a user:**

```python
def get_user_example(username: Username) -> None:
    client = CamundaClient()

    result = client.get_user(username=username)

    print(f"User: {result.username}")
```

### get_user_task()

```python
def get_user_task(user_task_key, **kwargs)
```

Get user task

> Get the user task by the user task key.

- **Parameters:**
  - **user_task_key** (_str_) – System-generated key for a user task.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The user task with the given key was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  UserTaskResult
- **Return type:**
  UserTaskResult

#### Examples

**Get a user task:**

```python
def get_user_task_example(user_task_key: UserTaskKey) -> None:
    client = CamundaClient()

    task = client.get_user_task(user_task_key=user_task_key)

    print(f"Task: {task.user_task_key}")
```

### get_user_task_form()

```python
def get_user_task_form(user_task_key, **kwargs)
```

Get user task form

> Get the form of a user task.

Note that this endpoint will only return linked forms. This endpoint does not support embedded
forms.

- **Parameters:**
  - **user_task_key** (_str_) – System-generated key for a user task.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. Not found
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  FormResult
- **Return type:**
  FormResult

#### Examples

**Get a user task form:**

```python
def get_user_task_form_example(user_task_key: UserTaskKey) -> None:
    client = CamundaClient()

    result = client.get_user_task_form(
        user_task_key=user_task_key,
    )

    print(f"Form: {result.form_key}")
```

### get_variable()

```python
def get_variable(variable_key, **kwargs)
```

Get variable

> Get a variable by its key.

This endpoint returns both process-level and local (element-scoped) variables.
The variable’s scopeKey indicates whether it’s a process-level variable or scoped to a
specific element instance.

- **Parameters:**
  - **variable_key** (_str_) – System-generated key for a variable. Example: 2251799813683287.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. Not found
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  VariableResult
- **Return type:**
  VariableResult

#### Examples

**Get a variable:**

```python
def get_variable_example(variable_key: VariableKey) -> None:
    client = CamundaClient()

    result = client.get_variable(
        variable_key=variable_key,
    )

    print(f"Variable: {result.name} = {result.value}")
```

### migrate_process_instance()

```python
def migrate_process_instance(process_instance_key, , data, **kwargs)
```

Migrate process instance

> Migrates a process instance to a new process definition.

This request can contain multiple mapping instructions to define mapping between the active
process instance’s elements and target process definition elements.

Use this to upgrade a process instance to a new version of a process or to
a different process definition, e.g. to keep your running instances up-to-date with the
latest process improvements.

- **Parameters:**
  - **process_instance_key** (_str_) – System-generated key for a process instance. Example: 2251799813690746.
  - **body** (_ProcessInstanceMigrationInstruction_) – The migration instructions describe how to
    migrate a process instance from one process definition to another.
  - **data** (_ProcessInstanceMigrationInstruction_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.NotFoundError** – If the response status code is 404. The process instance is not found.
  - **errors.ConflictError** – If the response status code is 409. The process instance migration failed. More details are provided in the response body.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Migrate a process instance:**

```python
def migrate_process_instance_example(process_instance_key: ProcessInstanceKey, target_process_definition_key: ProcessDefinitionKey, source_element_id: ElementId, target_element_id: ElementId) -> None:
    client = CamundaClient()

    client.migrate_process_instance(
        process_instance_key=process_instance_key,
        data=ProcessInstanceMigrationInstruction(
            target_process_definition_key=target_process_definition_key,
            mapping_instructions=[
                MigrateProcessInstanceMappingInstruction(
                    source_element_id=source_element_id,
                    target_element_id=target_element_id,
                ),
            ],
        ),
    )
```

### migrate_process_instances_batch_operation()

```python
def migrate_process_instances_batch_operation(, data, **kwargs)
```

Migrate process instances (batch)

> Migrate multiple process instances.

Since only process instances with ACTIVE state can be migrated, any given
filters for state are ignored and overridden during this batch operation.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the
response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

- **Parameters:**
  - **body** (_ProcessInstanceMigrationBatchOperationRequest_)
  - **data** (_ProcessInstanceMigrationBatchOperationRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The process instance batch operation failed. More details are provided in the response body.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  BatchOperationCreatedResult
- **Return type:**
  BatchOperationCreatedResult

#### Examples

**Migrate process instances in batch:**

```python
def migrate_process_instances_batch_operation_example(target_process_definition_key: ProcessDefinitionKey, source_element_id: ElementId, target_element_id: ElementId) -> None:
    client = CamundaClient()

    result = client.migrate_process_instances_batch_operation(
        data=ProcessInstanceMigrationBatchOperationRequest(
            filter_=ProcessInstanceCancellationBatchOperationRequestFilter(),
            migration_plan=ProcessInstanceMigrationBatchOperationRequestMigrationPlan(
                target_process_definition_key=target_process_definition_key,
                mapping_instructions=[
                    MigrateProcessInstanceMappingInstruction(
                        source_element_id=source_element_id,
                        target_element_id=target_element_id,
                    ),
                ],
            ),
        ),
    )

    print(f"Batch operation key: {result.batch_operation_key}")
```

### modify_process_instance()

```python
def modify_process_instance(process_instance_key, , data, **kwargs)
```

Modify process instance

> Modifies a running process instance.

This request can contain multiple instructions to activate an element of the process or
to terminate an active instance of an element.

Use this to repair a process instance that is stuck on an element or took an unintended path.
For example, because an external system is not available or doesn’t respond as expected.

- **Parameters:**
  - **process_instance_key** (_str_) – System-generated key for a process instance. Example: 2251799813690746.
  - **body** (_ProcessInstanceModificationInstruction_)
  - **data** (_ProcessInstanceModificationInstruction_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.NotFoundError** – If the response status code is 404. The process instance is not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Modify a process instance:**

```python
def modify_process_instance_example(process_instance_key: ProcessInstanceKey) -> None:
    client = CamundaClient()

    client.modify_process_instance(
        process_instance_key=process_instance_key,
        data=ProcessInstanceModificationInstruction(),
    )
```

### modify_process_instances_batch_operation()

```python
def modify_process_instances_batch_operation(, data, **kwargs)
```

Modify process instances (batch)

> Modify multiple process instances.

Since only process instances with ACTIVE state can be modified, any given
filters for state are ignored and overridden during this batch operation.
In contrast to single modification operation, it is not possible to add variable instructions or
modify by element key.
It is only possible to use the element id of the source and target.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the
response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

- **Parameters:**
  - **body** (_ProcessInstanceModificationBatchOperationRequest_) – The process instance filter to
    define on which process instances tokens should be moved,
    and new element instances should be activated or terminated.
  - **data** (_ProcessInstanceModificationBatchOperationRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The process instance batch operation failed. More details are provided in the response body.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  BatchOperationCreatedResult
- **Return type:**
  BatchOperationCreatedResult

#### Examples

**Modify process instances in batch:**

```python
def modify_process_instances_batch_operation_example(source_element_id: ElementId, target_element_id: ElementId) -> None:
    client = CamundaClient()

    result = client.modify_process_instances_batch_operation(
        data=ProcessInstanceModificationBatchOperationRequest(
            filter_=ProcessInstanceCancellationBatchOperationRequestFilter(),
            move_instructions=[
                ProcessInstanceModificationMoveBatchOperationInstruction(
                    source_element_id=source_element_id,
                    target_element_id=target_element_id,
                ),
            ],
        ),
    )

    print(f"Batch operation key: {result.batch_operation_key}")
```

### pin_clock()

```python
def pin_clock(, data, **kwargs)
```

Pin internal clock (alpha)

> Set a precise, static time for the Zeebe engine’s internal clock.

When the clock is pinned, it remains at the specified time and does not advance.
To change the time, the clock must be pinned again with a new timestamp.

This endpoint is an alpha feature and may be subject to change
in future releases.

- **Parameters:**
  - **body** (_ClockPinRequest_)
  - **data** (_ClockPinRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Pin the cluster clock:**

```python
def pin_clock_example() -> None:
    client = CamundaClient()

    client.pin_clock(
        data=ClockPinRequest(
            timestamp=1700000000000,
        ),
    )
```

### publish_message()

```python
def publish_message(, data, **kwargs)
```

Publish message

> Publishes a single message.

Messages are published to specific partitions computed from their correlation keys.
Messages can be buffered.
The endpoint does not wait for a correlation result.
Use the message correlation endpoint for such use cases.

- **Parameters:**
  - **body** (_MessagePublicationRequest_)
  - **data** (_MessagePublicationRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  MessagePublicationResult
- **Return type:**
  MessagePublicationResult

#### Examples

**Publish a message:**

```python
def publish_message_example() -> None:
    client = CamundaClient()

    result = client.publish_message(
        data=MessagePublicationRequest(
            name="order-created",
            correlation_key="order-12345",
            time_to_live=60000,
        )
    )

    print(f"Message key: {result.message_key}")
```

### reset_clock()

```python
def reset_clock(**kwargs)
```

Reset internal clock (alpha)

> Resets the Zeebe engine’s internal clock to the current system time, enabling it to tick in real-

time.
This operation is useful for returning the clock to
normal behavior after it has been pinned to a specific time.

This endpoint is an alpha feature and may be subject to change
in future releases.

- **Raises:**
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Parameters:**
  **kwargs** (_Any_)
- **Return type:**
  None

#### Examples

**Reset the cluster clock:**

```python
def reset_clock_example() -> None:
    client = CamundaClient()

    client.reset_clock()
```

### resolve_incident()

```python
def resolve_incident(incident_key, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Resolve incident

> Marks the incident as resolved; most likely a call to Update job will be necessary

to reset the job’s retries, followed by this call.

- **Parameters:**
  - **incident_key** (_str_) – System-generated key for a incident. Example: 2251799813689432.
  - **body** (_IncidentResolutionRequest_ _|_ _Unset_)
  - **data** (_IncidentResolutionRequest_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.NotFoundError** – If the response status code is 404. The incident with the incidentKey is not found.
  - **errors.ConflictError** – If the response status code is 409. The incident cannot be resolved due to an invalid state. For example, the associated job may have no retries left.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Resolve an incident:**

```python
def resolve_incident_example(incident_key: IncidentKey) -> None:
    client = CamundaClient()

    client.resolve_incident(incident_key=incident_key)
```

### resolve_incidents_batch_operation()

```python
def resolve_incidents_batch_operation(*, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Resolve related incidents (batch)

> Resolves multiple instances of process instances.

Since only process instances with ACTIVE state can have unresolved incidents, any given
filters for state are ignored and overridden during this batch operation.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the
response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

- **Parameters:**
  - **body** (_ProcessInstanceIncidentResolutionBatchOperationRequest_ _|_ _Unset_) – The process
    instance filter that defines which process instances should have their incidents resolved.
  - **data** (_ProcessInstanceIncidentResolutionBatchOperationRequest_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The process instance batch operation failed. More details are provided in the response body.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  BatchOperationCreatedResult
- **Return type:**
  BatchOperationCreatedResult

#### Examples

**Resolve incidents in batch:**

```python
def resolve_incidents_batch_operation_example() -> None:
    client = CamundaClient()

    result = client.resolve_incidents_batch_operation(
        data=ProcessInstanceIncidentResolutionBatchOperationRequest(
            filter_=ProcessInstanceCancellationBatchOperationRequestFilter(),
        ),
    )

    print(f"Batch operation key: {result.batch_operation_key}")
```

### resolve_process_instance_incidents()

```python
def resolve_process_instance_incidents(process_instance_key, **kwargs)
```

Resolve related incidents

> Creates a batch operation to resolve multiple incidents of a process instance.

- **Parameters:**
  - **process_instance_key** (_str_) – System-generated key for a process instance. Example: 2251799813690746.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.NotFoundError** – If the response status code is 404. The process instance is not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  BatchOperationCreatedResult
- **Return type:**
  BatchOperationCreatedResult

#### Examples

**Resolve process instance incidents:**

```python
def resolve_process_instance_incidents_example(process_instance_key: ProcessInstanceKey) -> None:
    client = CamundaClient()

    result = client.resolve_process_instance_incidents(
        process_instance_key=process_instance_key,
    )

    print(f"Batch operation key: {result.batch_operation_key}")
```

### resume_batch_operation()

```python
def resume_batch_operation(batch_operation_key, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Resume Batch operation

> Resumes a suspended batch operation.

This is done asynchronously, the progress can be tracked using the batch operation status endpoint
(/batch-operations/{batchOperationKey}).

- **Parameters:**
  - **batch_operation_key** (_str_) – System-generated key for an batch operation. Example: 2251799813684321.
  - **body** (_Any_ _|_ _Unset_)
  - **data** (_Any_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. Not found. The batch operation was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Resume a batch operation:**

```python
def resume_batch_operation_example(batch_operation_key: BatchOperationKey) -> None:
    client = CamundaClient()

    client.resume_batch_operation(
        batch_operation_key=batch_operation_key,
    )
```

### search_audit_logs()

```python
def search_audit_logs(*, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search audit logs

> Search for audit logs based on given criteria.

- **Parameters:**
  - **body** (_AuditLogSearchQueryRequest_ _|_ _Unset_) – Audit log search request.
  - **data** (_AuditLogSearchQueryRequest_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  AuditLogSearchQueryResult
- **Return type:**
  AuditLogSearchQueryResult

#### Examples

**Search audit logs:**

```python
def search_audit_logs_example() -> None:
    client = CamundaClient()

    result = client.search_audit_logs(
        data=AuditLogSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for log in result.items:
            print(f"Audit log: {log.audit_log_key}")
```

### search_authorizations()

```python
def search_authorizations(*, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search authorizations

> Search for authorizations based on given criteria.

- **Parameters:**
  - **body** (_AuthorizationSearchQuery_ _|_ _Unset_)
  - **data** (_AuthorizationSearchQuery_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  AuthorizationSearchResult
- **Return type:**
  AuthorizationSearchResult

#### Examples

**Search authorizations:**

```python
def search_authorizations_example() -> None:
    client = CamundaClient()

    result = client.search_authorizations(
        data=AuthorizationSearchQuery(),
    )

    if not isinstance(result.items, Unset):
        for auth in result.items:
            print(f"Authorization: {auth.authorization_key}")
```

### search_batch_operation_items()

```python
def search_batch_operation_items(*, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search batch operation items

> Search for batch operation items based on given criteria.

- **Parameters:**
  - **body** (_BatchOperationItemSearchQuery_ _|_ _Unset_) – Batch operation item search request.
  - **data** (_BatchOperationItemSearchQuery_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  BatchOperationItemSearchQueryResult
- **Return type:**
  BatchOperationItemSearchQueryResult

#### Examples

**Search batch operation items:**

```python
def search_batch_operation_items_example(batch_operation_key: BatchOperationKey) -> None:
    client = CamundaClient()

    result = client.search_batch_operation_items(
        batch_operation_key=batch_operation_key,
        data=BatchOperationItemSearchQuery(),
    )

    if not isinstance(result.items, Unset):
        for item in result.items:
            print(f"Item: {item.item_key}")
```

### search_batch_operations()

```python
def search_batch_operations(*, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search batch operations

> Search for batch operations based on given criteria.

- **Parameters:**
  - **body** (_BatchOperationSearchQuery_ _|_ _Unset_) – Batch operation search request.
  - **data** (_BatchOperationSearchQuery_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  BatchOperationSearchQueryResult
- **Return type:**
  BatchOperationSearchQueryResult

#### Examples

**Search batch operations:**

```python
def search_batch_operations_example() -> None:
    client = CamundaClient()

    result = client.search_batch_operations(
        data=BatchOperationSearchQuery(),
    )

    if not isinstance(result.items, Unset):
        for op in result.items:
            print(f"Batch operation: {op.batch_operation_key}")
```

### search_clients_for_group()

```python
def search_clients_for_group(group_id, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search group clients

> Search clients assigned to a group.

- **Parameters:**
  - **group_id** (_str_)
  - **body** (_SearchClientsForGroupData_ _|_ _Unset_)
  - **data** (_SearchClientsForGroupData_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The group with the given ID was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  SearchClientsForGroupResponse200
- **Return type:**
  SearchClientsForGroupResponse200

#### Examples

**Search clients in a group:**

```python
def search_clients_for_group_example() -> None:
    client = CamundaClient()

    result = client.search_clients_for_group(
        group_id="engineering",
    )

    if not isinstance(result.items, Unset):
        for c in result.items:
            print(f"Client: {c.client_id}")
```

### search_clients_for_role()

```python
def search_clients_for_role(role_id, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search role clients

> Search clients with assigned role.

- **Parameters:**
  - **role_id** (_str_)
  - **body** (_SearchClientsForRoleData_ _|_ _Unset_)
  - **data** (_SearchClientsForRoleData_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The role with the given ID was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  SearchClientsForRoleResponse200
- **Return type:**
  SearchClientsForRoleResponse200

#### Examples

**Search clients for a role:**

```python
def search_clients_for_role_example() -> None:
    client = CamundaClient()

    result = client.search_clients_for_role(
        role_id="developer",
    )

    if not isinstance(result.items, Unset):
        for c in result.items:
            print(f"Client: {c.client_id}")
```

### search_clients_for_tenant()

```python
def search_clients_for_tenant(tenant_id, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search clients for tenant

> Retrieves a filtered and sorted list of clients for a specified tenant.

- **Parameters:**
  - **tenant_id** (_str_) – The unique identifier of the tenant. Example: customer-service.
  - **body** (_SearchClientsForTenantData_ _|_ _Unset_)
  - **data** (_SearchClientsForTenantData_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  SearchClientsForTenantResponse200
- **Return type:**
  SearchClientsForTenantResponse200

#### Examples

**Search clients for a tenant:**

```python
def search_clients_for_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    result = client.search_clients_for_tenant(
        tenant_id=tenant_id,
    )

    if not isinstance(result.items, Unset):
        for c in result.items:
            print(f"Client: {c.client_id}")
```

### search_cluster_variables()

```python
def search_cluster_variables(*, data=<camunda_orchestration_sdk.types.Unset object>, truncate_values=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search for cluster variables based on given criteria. By default, long variable values in the
response are truncated.

- **Parameters:**
  - **truncate_values** (_bool_ _|_ _Unset_)
  - **body** (_ClusterVariableSearchQueryRequest_ _|_ _Unset_) – Cluster variable search query request.
  - **data** (_ClusterVariableSearchQueryRequest_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  ClusterVariableSearchQueryResult
- **Return type:**
  ClusterVariableSearchQueryResult

#### Examples

**Search cluster variables:**

```python
def search_cluster_variables_example() -> None:
    client = CamundaClient()

    result = client.search_cluster_variables(
        data=ClusterVariableSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for var in result.items:
            print(f"Variable: {var.name}")
```

### search_correlated_message_subscriptions()

```python
def search_correlated_message_subscriptions(*, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search correlated message subscriptions

> Search correlated message subscriptions based on given criteria.

- **Parameters:**
  - **body** (_CorrelatedMessageSubscriptionSearchQuery_ _|_ _Unset_)
  - **data** (_CorrelatedMessageSubscriptionSearchQuery_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  CorrelatedMessageSubscriptionSearchQueryResult
- **Return type:**
  CorrelatedMessageSubscriptionSearchQueryResult

#### Examples

**Search correlated message subscriptions:**

```python
def search_correlated_message_subscriptions_example() -> None:
    client = CamundaClient()

    result = client.search_correlated_message_subscriptions(
        data=CorrelatedMessageSubscriptionSearchQuery(),
    )

    if not isinstance(result.items, Unset):
        for sub in result.items:
            print(f"Correlated subscription: {sub.message_name}")
```

### search_decision_definitions()

```python
def search_decision_definitions(*, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search decision definitions

> Search for decision definitions based on given criteria.

- **Parameters:**
  - **body** (_DecisionDefinitionSearchQuery_ _|_ _Unset_)
  - **data** (_DecisionDefinitionSearchQuery_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  DecisionDefinitionSearchQueryResult
- **Return type:**
  DecisionDefinitionSearchQueryResult

#### Examples

**Search decision definitions:**

```python
def search_decision_definitions_example() -> None:
    client = CamundaClient()

    result = client.search_decision_definitions(
        data=DecisionDefinitionSearchQuery()
    )

    if not isinstance(result.items, Unset):
        for definition in result.items:
            print(f"Decision: {definition.decision_definition_id}")
```

### search_decision_instances()

```python
def search_decision_instances(*, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search decision instances

> Search for decision instances based on given criteria.

- **Parameters:**
  - **body** (_DecisionInstanceSearchQuery_ _|_ _Unset_)
  - **data** (_DecisionInstanceSearchQuery_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  DecisionInstanceSearchQueryResult
- **Return type:**
  DecisionInstanceSearchQueryResult

#### Examples

**Search decision instances:**

```python
def search_decision_instances_example() -> None:
    client = CamundaClient()

    result = client.search_decision_instances(
        data=DecisionInstanceSearchQuery(),
    )

    if not isinstance(result.items, Unset):
        for di in result.items:
            print(f"Decision instance: {di.decision_definition_id}")
```

### search_decision_requirements()

```python
def search_decision_requirements(*, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search decision requirements

> Search for decision requirements based on given criteria.

- **Parameters:**
  - **body** (_DecisionRequirementsSearchQuery_ _|_ _Unset_)
  - **data** (_DecisionRequirementsSearchQuery_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  DecisionRequirementsSearchQueryResult
- **Return type:**
  DecisionRequirementsSearchQueryResult

#### Examples

**Search decision requirements:**

```python
def search_decision_requirements_example() -> None:
    client = CamundaClient()

    result = client.search_decision_requirements(
        data=DecisionRequirementsSearchQuery(),
    )

    if not isinstance(result.items, Unset):
        for drd in result.items:
            print(f"DRD: {drd.decision_requirements_name}")
```

### search_element_instance_incidents()

```python
def search_element_instance_incidents(element_instance_key, , data, **kwargs)
```

Search for incidents of a specific element instance

> Search for incidents caused by the specified element instance, including incidents of any child

instances created from this element instance.

Although the elementInstanceKey is provided as a path parameter to indicate the root element
instance,
you may also include an elementInstanceKey within the filter object to narrow results to specific
child element instances. This is useful, for example, if you want to isolate incidents associated
with
nested or subordinate elements within the given element instance while excluding incidents directly
tied
to the root element itself.

- **Parameters:**
  - **element_instance_key** (_str_) – System-generated key for a element instance. Example: 2251799813686789.
  - **body** (_IncidentSearchQuery_)
  - **data** (_IncidentSearchQuery_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The element instance with the given key was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  IncidentSearchQueryResult
- **Return type:**
  IncidentSearchQueryResult

#### Examples

**Search element instance incidents:**

```python
def search_element_instance_incidents_example(element_instance_key: ElementInstanceKey) -> None:
    client = CamundaClient()

    result = client.search_element_instance_incidents(
        element_instance_key=element_instance_key,
        data=IncidentSearchQuery(),
    )

    if not isinstance(result.items, Unset):
        for incident in result.items:
            print(f"Incident: {incident.incident_key}")
```

### search_element_instances()

```python
def search_element_instances(*, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search element instances

> Search for element instances based on given criteria.

- **Parameters:**
  - **body** (_ElementInstanceSearchQuery_ _|_ _Unset_) – Element instance search request.
  - **data** (_ElementInstanceSearchQuery_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  ElementInstanceSearchQueryResult
- **Return type:**
  ElementInstanceSearchQueryResult

#### Examples

**Search element instances:**

```python
def search_element_instances_example() -> None:
    client = CamundaClient()

    result = client.search_element_instances(
        data=ElementInstanceSearchQuery(),
    )

    if not isinstance(result.items, Unset):
        for ei in result.items:
            print(f"Element instance: {ei.element_instance_key}")
```

### search_global_task_listeners()

```python
def search_global_task_listeners(*, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search global user task listeners

> Search for global user task listeners based on given criteria.

- **Parameters:**
  - **body** (_GlobalTaskListenerSearchQueryRequest_ _|_ _Unset_) – Global listener search query request.
  - **data** (_GlobalTaskListenerSearchQueryRequest_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  GlobalTaskListenerSearchQueryResult
- **Return type:**
  GlobalTaskListenerSearchQueryResult

#### Examples

**Search global task listeners:**

```python
def search_global_task_listeners_example() -> None:
    client = CamundaClient()

    result = client.search_global_task_listeners(
        data=GlobalTaskListenerSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for listener in result.items:
            print(f"Listener: {listener.id}")
```

### search_group_ids_for_tenant()

```python
def search_group_ids_for_tenant(tenant_id, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search groups for tenant

> Retrieves a filtered and sorted list of groups for a specified tenant.

- **Parameters:**
  - **tenant_id** (_str_) – The unique identifier of the tenant. Example: customer-service.
  - **body** (_TenantGroupSearchQueryRequest_ _|_ _Unset_)
  - **data** (_TenantGroupSearchQueryRequest_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  TenantGroupSearchResult
- **Return type:**
  TenantGroupSearchResult

#### Examples

**Search groups for a tenant:**

```python
def search_group_ids_for_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    result = client.search_group_ids_for_tenant(
        tenant_id=tenant_id,
        data=TenantGroupSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for group in result.items:
            print(f"Group: {group.group_id}")
```

### search_groups()

```python
def search_groups(*, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search groups

> Search for groups based on given criteria.

- **Parameters:**
  - **body** (_GroupSearchQueryRequest_ _|_ _Unset_) – Group search request.
  - **data** (_GroupSearchQueryRequest_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  GroupSearchQueryResult
- **Return type:**
  GroupSearchQueryResult

#### Examples

**Search groups:**

```python
def search_groups_example() -> None:
    client = CamundaClient()

    result = client.search_groups(
        data=GroupSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for group in result.items:
            print(f"Group: {group.name}")
```

### search_groups_for_role()

```python
def search_groups_for_role(role_id, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search role groups

> Search groups with assigned role.

- **Parameters:**
  - **role_id** (_str_)
  - **body** (_RoleGroupSearchQueryRequest_ _|_ _Unset_)
  - **data** (_RoleGroupSearchQueryRequest_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The role with the given ID was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  RoleGroupSearchResult
- **Return type:**
  RoleGroupSearchResult

#### Examples

**Search groups for a role:**

```python
def search_groups_for_role_example() -> None:
    client = CamundaClient()

    result = client.search_groups_for_role(
        role_id="developer",
        data=RoleGroupSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for group in result.items:
            print(f"Group: {group.group_id}")
```

### search_incidents()

```python
def search_incidents(*, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search incidents

> Search for incidents based on given criteria.

- **Parameters:**
  - **body** (_IncidentSearchQuery_ _|_ _Unset_)
  - **data** (_IncidentSearchQuery_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  IncidentSearchQueryResult
- **Return type:**
  IncidentSearchQueryResult

#### Examples

**Search incidents:**

```python
def search_incidents_example() -> None:
    client = CamundaClient()

    result = client.search_incidents(
        data=IncidentSearchQuery()
    )

    if not isinstance(result.items, Unset):
        for incident in result.items:
            print(f"Incident key: {incident.incident_key}")
```

### search_jobs()

```python
def search_jobs(*, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search jobs

> Search for jobs based on given criteria.

- **Parameters:**
  - **body** (_JobSearchQuery_ _|_ _Unset_) – Job search request.
  - **data** (_JobSearchQuery_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  JobSearchQueryResult
- **Return type:**
  JobSearchQueryResult

#### Examples

**Search jobs:**

```python
def search_jobs_example() -> None:
    client = CamundaClient()

    result = client.search_jobs(
        data=JobSearchQuery(),
    )

    if not isinstance(result.items, Unset):
        for job in result.items:
            print(f"Job: {job.job_key}")
```

### search_mapping_rule()

```python
def search_mapping_rule(*, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search mapping rules

> Search for mapping rules based on given criteria.

- **Parameters:**
  - **body** (_MappingRuleSearchQueryRequest_ _|_ _Unset_)
  - **data** (_MappingRuleSearchQueryRequest_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  SearchMappingRuleResponse200
- **Return type:**
  SearchMappingRuleResponse200

#### Examples

**Search mapping rules:**

```python
def search_mapping_rule_example() -> None:
    client = CamundaClient()

    result = client.search_mapping_rule(
        data=MappingRuleSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for rule in result.items:
            print(f"Mapping rule: {rule.name}")
```

### search_mapping_rules_for_group()

```python
def search_mapping_rules_for_group(group_id, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search group mapping rules

> Search mapping rules assigned to a group.

- **Parameters:**
  - **group_id** (_str_)
  - **body** (_MappingRuleSearchQueryRequest_ _|_ _Unset_)
  - **data** (_MappingRuleSearchQueryRequest_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The group with the given ID was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  SearchMappingRulesForGroupResponse200
- **Return type:**
  SearchMappingRulesForGroupResponse200

#### Examples

**Search mapping rules for a group:**

```python
def search_mapping_rules_for_group_example() -> None:
    client = CamundaClient()

    result = client.search_mapping_rules_for_group(
        group_id="engineering",
        data=MappingRuleSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for rule in result.items:
            print(f"Mapping rule: {rule.mapping_rule_id}")
```

### search_mapping_rules_for_role()

```python
def search_mapping_rules_for_role(role_id, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search role mapping rules

> Search mapping rules with assigned role.

- **Parameters:**
  - **role_id** (_str_)
  - **body** (_MappingRuleSearchQueryRequest_ _|_ _Unset_)
  - **data** (_MappingRuleSearchQueryRequest_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The role with the given ID was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  SearchMappingRulesForRoleResponse200
- **Return type:**
  SearchMappingRulesForRoleResponse200

#### Examples

**Search mapping rules for a role:**

```python
def search_mapping_rules_for_role_example() -> None:
    client = CamundaClient()

    result = client.search_mapping_rules_for_role(
        role_id="developer",
        data=MappingRuleSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for rule in result.items:
            print(f"Mapping rule: {rule.mapping_rule_id}")
```

### search_mapping_rules_for_tenant()

```python
def search_mapping_rules_for_tenant(tenant_id, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search mapping rules for tenant

> Retrieves a filtered and sorted list of MappingRules for a specified tenant.

- **Parameters:**
  - **tenant_id** (_str_) – The unique identifier of the tenant. Example: customer-service.
  - **body** (_MappingRuleSearchQueryRequest_ _|_ _Unset_)
  - **data** (_MappingRuleSearchQueryRequest_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  SearchMappingRulesForTenantResponse200
- **Return type:**
  SearchMappingRulesForTenantResponse200

#### Examples

**Search mapping rules for a tenant:**

```python
def search_mapping_rules_for_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    result = client.search_mapping_rules_for_tenant(
        tenant_id=tenant_id,
        data=MappingRuleSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for rule in result.items:
            print(f"Mapping rule: {rule.mapping_rule_id}")
```

### search_message_subscriptions()

```python
def search_message_subscriptions(*, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search message subscriptions

> Search for message subscriptions based on given criteria.

- **Parameters:**
  - **body** (_MessageSubscriptionSearchQuery_ _|_ _Unset_)
  - **data** (_MessageSubscriptionSearchQuery_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  MessageSubscriptionSearchQueryResult
- **Return type:**
  MessageSubscriptionSearchQueryResult

#### Examples

**Search message subscriptions:**

```python
def search_message_subscriptions_example() -> None:
    client = CamundaClient()

    result = client.search_message_subscriptions(
        data=MessageSubscriptionSearchQuery(),
    )

    if not isinstance(result.items, Unset):
        for sub in result.items:
            print(f"Subscription: {sub.message_name}")
```

### search_process_definitions()

```python
def search_process_definitions(*, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search process definitions

> Search for process definitions based on given criteria.

- **Parameters:**
  - **body** (_ProcessDefinitionSearchQuery_ _|_ _Unset_)
  - **data** (_ProcessDefinitionSearchQuery_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  ProcessDefinitionSearchQueryResult
- **Return type:**
  ProcessDefinitionSearchQueryResult

#### Examples

**Search process definitions:**

```python
def search_process_definitions_example() -> None:
    client = CamundaClient()

    result = client.search_process_definitions(
        data=ProcessDefinitionSearchQuery(),
    )

    if not isinstance(result.items, Unset):
        for pd in result.items:
            print(f"Process definition: {pd.name}")
```

### search_process_instance_incidents()

```python
def search_process_instance_incidents(process_instance_key, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search related incidents

> Search for incidents caused by the process instance or any of its called process or decision

instances.

Although the processInstanceKey is provided as a path parameter to indicate the root process
instance,
you may also include a processInstanceKey within the filter object to narrow results to specific
child process instances. This is useful, for example, if you want to isolate incidents associated
with
subprocesses or called processes under the root instance while excluding incidents directly tied to
the root.

- **Parameters:**
  - **process_instance_key** (_str_) – System-generated key for a process instance. Example: 2251799813690746.
  - **body** (_IncidentSearchQuery_ _|_ _Unset_)
  - **data** (_IncidentSearchQuery_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The process instance with the given key was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  IncidentSearchQueryResult
- **Return type:**
  IncidentSearchQueryResult

#### Examples

**Search process instance incidents:**

```python
def search_process_instance_incidents_example(process_instance_key: ProcessInstanceKey) -> None:
    client = CamundaClient()

    result = client.search_process_instance_incidents(
        process_instance_key=process_instance_key,
        data=IncidentSearchQuery(),
    )

    if not isinstance(result.items, Unset):
        for incident in result.items:
            print(f"Incident: {incident.incident_key}")
```

### search_process_instances()

```python
def search_process_instances(*, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search process instances

> Search for process instances based on given criteria.

- **Parameters:**
  - **body** (_ProcessInstanceSearchQuery_ _|_ _Unset_) – Process instance search request.
  - **data** (_ProcessInstanceSearchQuery_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  ProcessInstanceSearchQueryResult
- **Return type:**
  ProcessInstanceSearchQueryResult

#### Examples

**Search process instances:**

```python
def search_process_instances_example() -> None:
    client = CamundaClient()

    result = client.search_process_instances(
        data=ProcessInstanceSearchQuery(
            filter_=ProcessInstanceSearchQueryFilter(
                process_definition_id="order-process",
            ),
            sort=[
                ProcessInstanceSearchQuerySortRequest(
                    field=ProcessInstanceSearchQuerySortRequestField.STARTDATE,
                    order=SortOrderEnum.DESC,
                )
            ],
            page=LimitBasedPagination(limit=10),
        )
    )

    for instance in result.items:
        print(f"{instance.process_instance_key}: {instance.state}")
    print(f"Total: {result.page.total_items}")
```

### search_roles()

```python
def search_roles(*, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search roles

> Search for roles based on given criteria.

- **Parameters:**
  - **body** (_RoleSearchQueryRequest_ _|_ _Unset_) – Role search request.
  - **data** (_RoleSearchQueryRequest_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  RoleSearchQueryResult
- **Return type:**
  RoleSearchQueryResult

#### Examples

**Search roles:**

```python
def search_roles_example() -> None:
    client = CamundaClient()

    result = client.search_roles(
        data=RoleSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for role in result.items:
            print(f"Role: {role.name}")
```

### search_roles_for_group()

```python
def search_roles_for_group(group_id, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search group roles

> Search roles assigned to a group.

- **Parameters:**
  - **group_id** (_str_)
  - **body** (_RoleSearchQueryRequest_ _|_ _Unset_) – Role search request.
  - **data** (_RoleSearchQueryRequest_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The group with the given ID was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  SearchRolesForGroupResponse200
- **Return type:**
  SearchRolesForGroupResponse200

#### Examples

**Search roles for a group:**

```python
def search_roles_for_group_example() -> None:
    client = CamundaClient()

    result = client.search_roles_for_group(
        group_id="engineering",
        data=RoleSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for role in result.items:
            print(f"Role: {role.name}")
```

### search_roles_for_tenant()

```python
def search_roles_for_tenant(tenant_id, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search roles for tenant

> Retrieves a filtered and sorted list of roles for a specified tenant.

- **Parameters:**
  - **tenant_id** (_str_) – The unique identifier of the tenant. Example: customer-service.
  - **body** (_RoleSearchQueryRequest_ _|_ _Unset_) – Role search request.
  - **data** (_RoleSearchQueryRequest_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  SearchRolesForTenantResponse200
- **Return type:**
  SearchRolesForTenantResponse200

#### Examples

**Search roles for a tenant:**

```python
def search_roles_for_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    result = client.search_roles_for_tenant(
        tenant_id=tenant_id,
        data=RoleSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for role in result.items:
            print(f"Role: {role.name}")
```

### search_tenants()

```python
def search_tenants(*, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search tenants

> Retrieves a filtered and sorted list of tenants.

- **Parameters:**
  - **body** (_TenantSearchQueryRequest_ _|_ _Unset_) – Tenant search request
  - **data** (_TenantSearchQueryRequest_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. Not found
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  TenantSearchQueryResult
- **Return type:**
  TenantSearchQueryResult

#### Examples

**Search tenants:**

```python
def search_tenants_example() -> None:
    client = CamundaClient()

    result = client.search_tenants(
        data=TenantSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for tenant in result.items:
            print(f"Tenant: {tenant.name}")
```

### search_user_task_audit_logs()

```python
def search_user_task_audit_logs(user_task_key, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search user task audit logs

> Search for user task audit logs based on given criteria.

- **Parameters:**
  - **user_task_key** (_str_) – System-generated key for a user task.
  - **body** (_UserTaskAuditLogSearchQueryRequest_ _|_ _Unset_) – User task search query request.
  - **data** (_UserTaskAuditLogSearchQueryRequest_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  AuditLogSearchQueryResult
- **Return type:**
  AuditLogSearchQueryResult

#### Examples

**Search user task audit logs:**

```python
def search_user_task_audit_logs_example(user_task_key: UserTaskKey) -> None:
    client = CamundaClient()

    result = client.search_user_task_audit_logs(
        user_task_key=user_task_key,
        data=UserTaskAuditLogSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for log in result.items:
            print(f"Audit log: {log.audit_log_key}")
```

### search_user_task_effective_variables()

```python
def search_user_task_effective_variables(user_task_key, *, data=<camunda_orchestration_sdk.types.Unset object>, truncate_values=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search user task effective variables

> Search for the effective variables of a user task. This endpoint returns deduplicated

variables where each variable name appears at most once. When the same variable name exists
at multiple scope levels in the scope hierarchy, the value from the innermost scope (closest
to the user task) takes precedence. This is useful for retrieving the actual runtime state
of variables as seen by the user task. By default, long variable values in the response are
truncated.

- **Parameters:**
  - **user_task_key** (_str_) – System-generated key for a user task.
  - **truncate_values** (_bool_ _|_ _Unset_)
  - **body** (_SearchUserTaskEffectiveVariablesData_ _|_ _Unset_) – User task effective variable search
    query request. Uses offset-based pagination only.
  - **data** (_SearchUserTaskEffectiveVariablesData_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  VariableSearchQueryResult
- **Return type:**
  VariableSearchQueryResult

#### Examples

**Search user task effective variables:**

```python
def search_user_task_effective_variables_example(user_task_key: UserTaskKey) -> None:
    client = CamundaClient()

    result = client.search_user_task_effective_variables(
        user_task_key=user_task_key,
    )

    if not isinstance(result.items, Unset):
        for var in result.items:
            print(f"Variable: {var.name}")
```

### search_user_task_variables()

```python
def search_user_task_variables(user_task_key, *, data=<camunda_orchestration_sdk.types.Unset object>, truncate_values=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search user task variables

> Search for user task variables based on given criteria. This endpoint returns all variable

documents visible from the user task’s scope, including variables from parent scopes in the
scope hierarchy. If the same variable name exists at multiple scope levels, each scope’s
variable is returned as a separate result. Use the
/user-tasks/{userTaskKey}/effective-variables/search endpoint to get deduplicated variables
where the innermost scope takes precedence. By default, long variable values in the response
are truncated.

- **Parameters:**
  - **user_task_key** (_str_) – System-generated key for a user task.
  - **truncate_values** (_bool_ _|_ _Unset_)
  - **body** (_SearchUserTaskVariablesData_ _|_ _Unset_) – User task search query request.
  - **data** (_SearchUserTaskVariablesData_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  VariableSearchQueryResult
- **Return type:**
  VariableSearchQueryResult

#### Examples

**Search user task variables:**

```python
def search_user_task_variables_example(user_task_key: UserTaskKey) -> None:
    client = CamundaClient()

    result = client.search_user_task_variables(
        user_task_key=user_task_key,
    )

    if not isinstance(result.items, Unset):
        for var in result.items:
            print(f"Variable: {var.name}")
```

### search_user_tasks()

```python
def search_user_tasks(*, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search user tasks

> Search for user tasks based on given criteria.

- **Parameters:**
  - **body** (_UserTaskSearchQuery_ _|_ _Unset_) – User task search query request.
  - **data** (_UserTaskSearchQuery_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  UserTaskSearchQueryResult
- **Return type:**
  UserTaskSearchQueryResult

#### Examples

**Search user tasks:**

```python
def search_user_tasks_example() -> None:
    client = CamundaClient()

    result = client.search_user_tasks(
        data=UserTaskSearchQuery()
    )

    if not isinstance(result.items, Unset):
        for task in result.items:
            print(f"Task: {task.user_task_key}")
```

### search_users()

```python
def search_users(*, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search users

> Search for users based on given criteria.

- **Parameters:**
  - **body** (_UserSearchQueryRequest_ _|_ _Unset_)
  - **data** (_UserSearchQueryRequest_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  SearchUsersResponse200
- **Return type:**
  SearchUsersResponse200

#### Examples

**Search users:**

```python
def search_users_example() -> None:
    client = CamundaClient()

    result = client.search_users(
        data=UserSearchQueryRequest(),
    )

    if not isinstance(result.items, Unset):
        for user in result.items:
            print(f"User: {user.username}")
```

### search_users_for_group()

```python
def search_users_for_group(group_id, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search group users

> Search users assigned to a group.

- **Parameters:**
  - **group_id** (_str_)
  - **body** (_SearchUsersForGroupData_ _|_ _Unset_)
  - **data** (_SearchUsersForGroupData_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The group with the given ID was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  SearchUsersForGroupResponse200
- **Return type:**
  SearchUsersForGroupResponse200

#### Examples

**Search users in a group:**

```python
def search_users_for_group_example() -> None:
    client = CamundaClient()

    result = client.search_users_for_group(
        group_id="engineering",
    )

    if not isinstance(result.items, Unset):
        for user in result.items:
            print(f"User: {user.username}")
```

### search_users_for_role()

```python
def search_users_for_role(role_id, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search role users

> Search users with assigned role.

- **Parameters:**
  - **role_id** (_str_)
  - **body** (_SearchUsersForRoleData_ _|_ _Unset_)
  - **data** (_SearchUsersForRoleData_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The role with the given ID was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  SearchUsersForRoleResponse200
- **Return type:**
  SearchUsersForRoleResponse200

#### Examples

**Search users for a role:**

```python
def search_users_for_role_example() -> None:
    client = CamundaClient()

    result = client.search_users_for_role(
        role_id="developer",
    )

    if not isinstance(result.items, Unset):
        for user in result.items:
            print(f"User: {user.username}")
```

### search_users_for_tenant()

```python
def search_users_for_tenant(tenant_id, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search users for tenant

> Retrieves a filtered and sorted list of users for a specified tenant.

- **Parameters:**
  - **tenant_id** (_str_) – The unique identifier of the tenant. Example: customer-service.
  - **body** (_SearchUsersForTenantData_ _|_ _Unset_)
  - **data** (_SearchUsersForTenantData_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  SearchUsersForTenantResponse200
- **Return type:**
  SearchUsersForTenantResponse200

#### Examples

**Search users for a tenant:**

```python
def search_users_for_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    result = client.search_users_for_tenant(
        tenant_id=tenant_id,
    )

    if not isinstance(result.items, Unset):
        for user in result.items:
            print(f"User: {user.username}")
```

### search_variables()

```python
def search_variables(*, data=<camunda_orchestration_sdk.types.Unset object>, truncate_values=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Search variables

> Search for variables based on given criteria.

This endpoint returns variables that exist directly at the specified scopes - it does not
include variables from parent scopes that would be visible through the scope hierarchy.

Variables can be process-level (scoped to the process instance) or local (scoped to specific
BPMN elements like tasks, subprocesses, etc.).

By default, long variable values in the response are truncated.

- **Parameters:**
  - **truncate_values** (_bool_ _|_ _Unset_)
  - **body** (_SearchVariablesData_ _|_ _Unset_) – Variable search query request.
  - **data** (_SearchVariablesData_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  VariableSearchQueryResult
- **Return type:**
  VariableSearchQueryResult

#### Examples

**Search variables:**

```python
def search_variables_example() -> None:
    client = CamundaClient()

    result = client.search_variables()

    if not isinstance(result.items, Unset):
        for var in result.items:
            print(f"Variable: {var.name}")
```

### suspend_batch_operation()

```python
def suspend_batch_operation(batch_operation_key, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Suspend Batch operation

> Suspends a running batch operation.

This is done asynchronously, the progress can be tracked using the batch operation status endpoint
(/batch-operations/{batchOperationKey}).

- **Parameters:**
  - **batch_operation_key** (_str_) – System-generated key for an batch operation. Example: 2251799813684321.
  - **body** (_Any_ _|_ _Unset_)
  - **data** (_Any_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. Not found. The batch operation was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Suspend a batch operation:**

```python
def suspend_batch_operation_example(batch_operation_key: BatchOperationKey) -> None:
    client = CamundaClient()

    client.suspend_batch_operation(
        batch_operation_key=batch_operation_key,
    )
```

### throw_job_error()

```python
def throw_job_error(job_key, , data, **kwargs)
```

Throw error for job

> Reports a business error (i.e. non-technical) that occurs while processing a job.

- **Parameters:**
  - **job_key** (_str_) – System-generated key for a job. Example: 2251799813653498.
  - **body** (_JobErrorRequest_)
  - **data** (_JobErrorRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.NotFoundError** – If the response status code is 404. The job with the given key was not found or is not activated.
  - **errors.ConflictError** – If the response status code is 409. The job with the given key is in the wrong state currently. More details are provided in the response body.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Throw a job error:**

```python
def throw_job_error_example(job_key: JobKey) -> None:
    client = CamundaClient()

    client.throw_job_error(
        job_key=job_key,
        data=JobErrorRequest(
            error_code="VALIDATION_ERROR",
            error_message="Input validation failed",
        ),
    )
```

### unassign_client_from_group()

```python
def unassign_client_from_group(group_id, client_id, **kwargs)
```

Unassign a client from a group

> Unassigns a client from a group.

The client is removed as a group member, with associated authorizations, roles, and tenant
assignments no longer applied.

- **Parameters:**
  - **group_id** (_str_)
  - **client_id** (_str_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The group with the given ID was not found, or the client is not assigned to this group.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Unassign a client from a group:**

```python
def unassign_client_from_group_example() -> None:
    client = CamundaClient()

    client.unassign_client_from_group(
        group_id="engineering",
        client_id="my-service-account",
    )
```

### unassign_client_from_tenant()

```python
def unassign_client_from_tenant(tenant_id, client_id, **kwargs)
```

Unassign a client from a tenant

> Unassigns the client from the specified tenant.

The client can no longer access tenant data.

- **Parameters:**
  - **tenant_id** (_str_) – The unique identifier of the tenant. Example: customer-service.
  - **client_id** (_str_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The tenant does not exist or the client was not assigned to it.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Unassign a client from a tenant:**

```python
def unassign_client_from_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    client.unassign_client_from_tenant(
        tenant_id=tenant_id,
        client_id="my-service-account",
    )
```

### unassign_group_from_tenant()

```python
def unassign_group_from_tenant(tenant_id, group_id, **kwargs)
```

Unassign a group from a tenant

> Unassigns a group from a specified tenant.

Members of the group (users, clients) will no longer have access to the tenant’s data - except they
are assigned directly to the tenant.

- **Parameters:**
  - **tenant_id** (_str_) – The unique identifier of the tenant. Example: customer-service.
  - **group_id** (_str_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. Not found. The tenant or group was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Unassign a group from a tenant:**

```python
def unassign_group_from_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    client.unassign_group_from_tenant(
        tenant_id=tenant_id,
        group_id="engineering",
    )
```

### unassign_mapping_rule_from_group()

```python
def unassign_mapping_rule_from_group(group_id, mapping_rule_id, **kwargs)
```

Unassign a mapping rule from a group

> Unassigns a mapping rule from a group.

- **Parameters:**
  - **group_id** (_str_)
  - **mapping_rule_id** (_str_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The group or mapping rule with the given ID was not found, or the mapping rule is not assigned to this group.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Unassign a mapping rule from a group:**

```python
def unassign_mapping_rule_from_group_example() -> None:
    client = CamundaClient()

    client.unassign_mapping_rule_from_group(
        group_id="engineering",
        mapping_rule_id="rule-123",
    )
```

### unassign_mapping_rule_from_tenant()

```python
def unassign_mapping_rule_from_tenant(tenant_id, mapping_rule_id, **kwargs)
```

Unassign a mapping rule from a tenant

> Unassigns a single mapping rule from a specified tenant without deleting the rule.

- **Parameters:**
  - **tenant_id** (_str_) – The unique identifier of the tenant. Example: customer-service.
  - **mapping_rule_id** (_str_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. Not found. The tenant or mapping rule was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Unassign a mapping rule from a tenant:**

```python
def unassign_mapping_rule_from_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    client.unassign_mapping_rule_from_tenant(
        tenant_id=tenant_id,
        mapping_rule_id="rule-123",
    )
```

### unassign_role_from_client()

```python
def unassign_role_from_client(role_id, client_id, **kwargs)
```

Unassign a role from a client

> Unassigns the specified role from the client. The client will no longer inherit the authorizations

associated with this role.

- **Parameters:**
  - **role_id** (_str_)
  - **client_id** (_str_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The role or client with the given ID or username was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Unassign a role from a client:**

```python
def unassign_role_from_client_example() -> None:
    client = CamundaClient()

    client.unassign_role_from_client(
        role_id="developer",
        client_id="my-service-account",
    )
```

### unassign_role_from_group()

```python
def unassign_role_from_group(role_id, group_id, **kwargs)
```

Unassign a role from a group

> Unassigns the specified role from the group. All group members (user or client) no longer inherit

the authorizations associated with this role.

- **Parameters:**
  - **role_id** (_str_)
  - **group_id** (_str_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The role or group with the given ID was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Unassign a role from a group:**

```python
def unassign_role_from_group_example() -> None:
    client = CamundaClient()

    client.unassign_role_from_group(
        role_id="developer",
        group_id="engineering",
    )
```

### unassign_role_from_mapping_rule()

```python
def unassign_role_from_mapping_rule(role_id, mapping_rule_id, **kwargs)
```

Unassign a role from a mapping rule

> Unassigns a role from a mapping rule.

- **Parameters:**
  - **role_id** (_str_)
  - **mapping_rule_id** (_str_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The role or mapping rule with the given ID was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Unassign a role from a mapping rule:**

```python
def unassign_role_from_mapping_rule_example() -> None:
    client = CamundaClient()

    client.unassign_role_from_mapping_rule(
        role_id="developer",
        mapping_rule_id="rule-123",
    )
```

### unassign_role_from_tenant()

```python
def unassign_role_from_tenant(tenant_id, role_id, **kwargs)
```

Unassign a role from a tenant

> Unassigns a role from a specified tenant.

Users, Clients or Groups, that have the role assigned, will no longer have access to the
tenant’s data - unless they are assigned directly to the tenant.

- **Parameters:**
  - **tenant_id** (_str_) – The unique identifier of the tenant. Example: customer-service.
  - **role_id** (_str_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. Not found. The tenant or role was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Unassign a role from a tenant:**

```python
def unassign_role_from_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    client.unassign_role_from_tenant(
        tenant_id=tenant_id,
        role_id="developer",
    )
```

### unassign_role_from_user()

```python
def unassign_role_from_user(role_id, username, **kwargs)
```

Unassign a role from a user

> Unassigns a role from a user. The user will no longer inherit the authorizations associated with

this role.

- **Parameters:**
  - **role_id** (_str_)
  - **username** (_str_) – The unique name of a user. Example: swillis.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The role or user with the given ID or username was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Unassign a role from a user:**

```python
def unassign_role_from_user_example(username: Username) -> None:
    client = CamundaClient()

    client.unassign_role_from_user(
        role_id="developer",
        username=username,
    )
```

### unassign_user_from_group()

```python
def unassign_user_from_group(group_id, username, **kwargs)
```

Unassign a user from a group

> Unassigns a user from a group.

The user is removed as a group member, with associated authorizations, roles, and tenant assignments
no longer applied.

- **Parameters:**
  - **group_id** (_str_)
  - **username** (_str_) – The unique name of a user. Example: swillis.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The group or user with the given ID was not found, or the user is not assigned to this group.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Unassign a user from a group:**

```python
def unassign_user_from_group_example(username: Username) -> None:
    client = CamundaClient()

    client.unassign_user_from_group(
        group_id="engineering",
        username=username,
    )
```

### unassign_user_from_tenant()

```python
def unassign_user_from_tenant(tenant_id, username, **kwargs)
```

Unassign a user from a tenant

> Unassigns the user from the specified tenant.

The user can no longer access tenant data.

- **Parameters:**
  - **tenant_id** (_str_) – The unique identifier of the tenant. Example: customer-service.
  - **username** (_str_) – The unique name of a user. Example: swillis.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. Not found. The tenant or user was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Unassign a user from a tenant:**

```python
def unassign_user_from_tenant_example(tenant_id: TenantId, username: Username) -> None:
    client = CamundaClient()

    client.unassign_user_from_tenant(
        tenant_id=tenant_id,
        username=username,
    )
```

### unassign_user_task()

```python
def unassign_user_task(user_task_key, **kwargs)
```

Unassign user task

> Removes the assignee of a task with the given key. Unassignment waits for blocking task listeners on

this lifecycle transition. If listener processing is delayed beyond the request timeout, this
endpoint can return 504. Other gateway timeout causes are also possible. Retry with backoff and
inspect listener worker availability and logs when this repeats.

- **Parameters:**
  - **user_task_key** (_str_) – System-generated key for a user task.
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.NotFoundError** – If the response status code is 404. The user task with the given key was not found.
  - **errors.ConflictError** – If the response status code is 409. The user task with the given key is in the wrong state currently. More details are provided in the response body.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.GatewayTimeoutError** – If the response status code is 504. The request timed out between the gateway and the broker. For these endpoints, this often happens when user task listeners are configured and the corresponding listener job is not completed within the request timeout. Common causes include no available job workers for the listener type, busy or crashed job workers, or delayed job completion. As with any gateway timeout, general timeout causes (for example transient network issues) can also result in a 504 response. Troubleshooting: - verify that job workers for the listener type are running and healthy - check worker logs for crashes, retries, and completion failures - check network connectivity between workers, gateway, and broker - retry with backoff after transient failures - fail without retries if a problem persists
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Unassign a user task:**

```python
def unassign_user_task_example(user_task_key: UserTaskKey) -> None:
    client = CamundaClient()

    client.unassign_user_task(user_task_key=user_task_key)
```

### update_authorization()

```python
def update_authorization(authorization_key, , data, **kwargs)
```

Update authorization

> Update the authorization with the given key.

- **Parameters:**
  - **authorization_key** (_str_) – System-generated key for an authorization. Example: 2251799813684332.
  - **body** (_AuthorizationIdBasedRequest_ _|_ _AuthorizationPropertyBasedRequest_)
  - **data** (_AuthorizationIdBasedRequest_ _|_ _AuthorizationPropertyBasedRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.NotFoundError** – If the response status code is 404. The authorization with the authorizationKey was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Update an authorization:**

```python
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
```

### update_global_cluster_variable()

```python
def update_global_cluster_variable(name, , data, **kwargs)
```

Update a global-scoped cluster variable

> Updates the value of an existing global cluster variable.

The variable must exist, otherwise a 404 error is returned.

- **Parameters:**
  - **name** (_str_)
  - **body** (_UpdateClusterVariableRequest_)
  - **data** (_UpdateClusterVariableRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. Cluster variable not found
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  ClusterVariableResult
- **Return type:**
  ClusterVariableResult

#### Examples

**Update a global cluster variable:**

```python
def update_global_cluster_variable_example() -> None:
    client = CamundaClient()

    result = client.update_global_cluster_variable(
        name="my-variable",
        data=UpdateClusterVariableRequest(
            value=UpdateClusterVariableRequestValue.from_dict({"key": "updated-value"}),
        ),
    )

    print(f"Updated variable: {result.name}")
```

### update_global_task_listener()

```python
def update_global_task_listener(id, , data, **kwargs)
```

Update global user task listener

> Updates a global user task listener.

- **Parameters:**
  - **id** (_str_) – The user-defined id for the global listener Example: GlobalListener_1.
  - **body** (_UpdateGlobalTaskListenerRequest_)
  - **data** (_UpdateGlobalTaskListenerRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The global user task listener was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  GlobalTaskListenerResult
- **Return type:**
  GlobalTaskListenerResult

#### Examples

**Update a global task listener:**

```python
def update_global_task_listener_example(listener_id: GlobalListenerId) -> None:
    client = CamundaClient()

    result = client.update_global_task_listener(
        id=listener_id,
        data=UpdateGlobalTaskListenerRequest(
            event_types=[GlobalTaskListenerEventTypeEnum.COMPLETING],
            type_="updated-task-listener",
        ),
    )

    print(f"Updated listener: {result.id}")
```

### update_group()

```python
def update_group(group_id, , data, **kwargs)
```

Update group

> Update a group with the given ID.

- **Parameters:**
  - **group_id** (_str_)
  - **body** (_GroupUpdateRequest_)
  - **data** (_GroupUpdateRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.NotFoundError** – If the response status code is 404. The group with the given ID was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  GroupUpdateResult
- **Return type:**
  GroupUpdateResult

#### Examples

**Update a group:**

```python
def update_group_example() -> None:
    client = CamundaClient()

    client.update_group(
        group_id="engineering",
        data=GroupUpdateRequest(name="engineering-team"),
    )
```

### update_job()

```python
def update_job(job_key, , data, **kwargs)
```

Update job

> Update a job with the given key.

- **Parameters:**
  - **job_key** (_str_) – System-generated key for a job. Example: 2251799813653498.
  - **body** (_JobUpdateRequest_)
  - **data** (_JobUpdateRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.NotFoundError** – If the response status code is 404. The job with the jobKey is not found.
  - **errors.ConflictError** – If the response status code is 409. The job with the given key is in the wrong state currently. More details are provided in the response body.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Update a job:**

```python
def update_job_example(job_key: JobKey) -> None:
    client = CamundaClient()

    client.update_job(
        job_key=job_key,
        data=JobUpdateRequest(
            changeset=JobChangeset(
                retries=3,
            ),
        ),
    )
```

### update_mapping_rule()

```python
def update_mapping_rule(mapping_rule_id, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Update mapping rule

> Update a mapping rule.

- **Parameters:**
  - **mapping_rule_id** (_str_)
  - **body** (_MappingRuleUpdateRequest_ _|_ _Unset_)
  - **data** (_MappingRuleUpdateRequest_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. The request to update a mapping rule was denied. More details are provided in the response body.
  - **errors.NotFoundError** – If the response status code is 404. The request to update a mapping rule was denied.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  UpdateMappingRuleResponse200
- **Return type:**
  UpdateMappingRuleResponse200

#### Examples

**Update a mapping rule:**

```python
def update_mapping_rule_example() -> None:
    client = CamundaClient()

    client.update_mapping_rule(
        mapping_rule_id="rule-123",
        data=MappingRuleUpdateRequest(
            claim_name="groups",
            claim_value="senior-engineering",
            name="Senior Engineering Mapping",
        ),
    )
```

### update_role()

```python
def update_role(role_id, , data, **kwargs)
```

Update role

> Update a role with the given ID.

- **Parameters:**
  - **role_id** (_str_)
  - **body** (_RoleUpdateRequest_)
  - **data** (_RoleUpdateRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.NotFoundError** – If the response status code is 404. The role with the ID is not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  RoleUpdateResult
- **Return type:**
  RoleUpdateResult

#### Examples

**Update a role:**

```python
def update_role_example() -> None:
    client = CamundaClient()

    client.update_role(
        role_id="developer",
        data=RoleUpdateRequest(name="senior-developer"),
    )
```

### update_tenant()

```python
def update_tenant(tenant_id, , data, **kwargs)
```

Update tenant

> Updates an existing tenant.

- **Parameters:**
  - **tenant_id** (_str_) – The unique identifier of the tenant. Example: customer-service.
  - **body** (_TenantUpdateRequest_)
  - **data** (_TenantUpdateRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. Not found. The tenant was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  TenantUpdateResult
- **Return type:**
  TenantUpdateResult

#### Examples

**Update a tenant:**

```python
def update_tenant_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    client.update_tenant(
        tenant_id=tenant_id,
        data=TenantUpdateRequest(name="Acme Corp International"),
    )
```

### update_tenant_cluster_variable()

```python
def update_tenant_cluster_variable(tenant_id, name, , data, **kwargs)
```

Update a tenant-scoped cluster variable

> Updates the value of an existing tenant-scoped cluster variable.

The variable must exist, otherwise a 404 error is returned.

- **Parameters:**
  - **tenant_id** (_str_) – The unique identifier of the tenant. Example: customer-service.
  - **name** (_str_)
  - **body** (_UpdateClusterVariableRequest_)
  - **data** (_UpdateClusterVariableRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.UnauthorizedError** – If the response status code is 401. The request lacks valid authentication credentials.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. Cluster variable not found
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  ClusterVariableResult
- **Return type:**
  ClusterVariableResult

#### Examples

**Update a tenant cluster variable:**

```python
def update_tenant_cluster_variable_example(tenant_id: TenantId) -> None:
    client = CamundaClient()

    result = client.update_tenant_cluster_variable(
        tenant_id=tenant_id,
        name="my-variable",
        data=UpdateClusterVariableRequest(
            value=UpdateClusterVariableRequestValue.from_dict({"key": "updated-tenant-value"}),
        ),
    )

    print(f"Updated variable: {result.name}")
```

### update_user()

```python
def update_user(username, , data, **kwargs)
```

Update user

> Updates a user.

- **Parameters:**
  - **username** (_str_) – The unique name of a user. Example: swillis.
  - **body** (_UserUpdateRequest_)
  - **data** (_UserUpdateRequest_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.ForbiddenError** – If the response status code is 403. Forbidden. The request is not allowed.
  - **errors.NotFoundError** – If the response status code is 404. The user was not found.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  UpdateUserResponse200
- **Return type:**
  UpdateUserResponse200

#### Examples

**Update a user:**

```python
def update_user_example(username: Username) -> None:
    client = CamundaClient()

    client.update_user(
        username=username,
        data=UserUpdateRequest(
            name="Jane Smith",
            email="jsmith@example.com",
        ),
    )
```

### update_user_task()

```python
def update_user_task(user_task_key, *, data=<camunda_orchestration_sdk.types.Unset object>, **kwargs)
```

Update user task

> Update a user task with the given key. Updates wait for blocking task listeners on this lifecycle

transition. If listener processing is delayed beyond the request timeout, this endpoint can return 504. Other gateway timeout causes are also possible. Retry with backoff and inspect listener worker
availability and logs when this repeats.

- **Parameters:**
  - **user_task_key** (_str_) – System-generated key for a user task.
  - **body** (_UserTaskUpdateRequest_ _|_ _Unset_)
  - **data** (_UserTaskUpdateRequest_ _|_ _Unset_)
  - **kwargs** (_Any_)
- **Raises:**
  - **errors.BadRequestError** – If the response status code is 400. The provided data is not valid.
  - **errors.NotFoundError** – If the response status code is 404. The user task with the given key was not found.
  - **errors.ConflictError** – If the response status code is 409. The user task with the given key is in the wrong state currently. More details are provided in the response body.
  - **errors.InternalServerErrorError** – If the response status code is 500. An internal error occurred while processing the request.
  - **errors.ServiceUnavailableError** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  - **errors.GatewayTimeoutError** – If the response status code is 504. The request timed out between the gateway and the broker. For these endpoints, this often happens when user task listeners are configured and the corresponding listener job is not completed within the request timeout. Common causes include no available job workers for the listener type, busy or crashed job workers, or delayed job completion. As with any gateway timeout, general timeout causes (for example transient network issues) can also result in a 504 response. Troubleshooting: - verify that job workers for the listener type are running and healthy - check worker logs for crashes, retries, and completion failures - check network connectivity between workers, gateway, and broker - retry with backoff after transient failures - fail without retries if a problem persists
  - **errors.UnexpectedStatus** – If the response status code is not documented.
  - **httpx.TimeoutException** – If the request takes longer than Client.timeout.
- **Returns:**
  None
- **Return type:**
  None

#### Examples

**Update a user task:**

```python
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
```
