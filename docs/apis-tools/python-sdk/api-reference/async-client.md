---
title: CamundaAsyncClient
sidebar_label: CamundaAsyncClient
sidebar_position: 3
mdx:
  format: md
---

# CamundaAsyncClient

## CamundaAsyncClient

```python
class CamundaAsyncClient(configuration=None, auth_provider=None, logger=None, \*\*kwargs)
```

Bases: `object`

* **Parameters:**
  * **configuration** ([*CamundaSdkConfiguration*](runtime.md#camunda_orchestration_sdk.runtime.configuration_resolver.CamundaSdkConfiguration))
  * **auth_provider** ([*AuthProvider*](runtime.md#camunda_orchestration_sdk.runtime.auth.AuthProvider))
  * **logger** ([*CamundaLogger*](runtime.md#camunda_orchestration_sdk.runtime.logging.CamundaLogger) *|* *None*)
  * **kwargs** (*Any*)

### aclose()

```python
async def aclose()
```

Close underlying HTTP clients.

This closes both the API client’s async httpx client and, when available,
the auth provider’s token client.

* **Return type:**
  None

### activate_ad_hoc_sub_process_activities()

```python
async def activate_ad_hoc_sub_process_activities(ad_hoc_sub_process_instance_key, , data, \*\*kwargs)
```

Activate activities within an ad-hoc sub-process

> Activates selected activities within an ad-hoc sub-process identified by element ID.

The provided element IDs must exist within the ad-hoc sub-process instance identified by the
provided adHocSubProcessInstanceKey.

* **Parameters:**
  * **ad_hoc_sub_process_instance_key** (*str*) – System-generated key for a element instance.
    Example: 2251799813686789.
  * **body** (*AdHocSubProcessActivateActivitiesInstruction*)
  * **data** (*AdHocSubProcessActivateActivitiesInstruction*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.ActivateAdHocSubProcessActivitiesBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.ActivateAdHocSubProcessActivitiesUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.ActivateAdHocSubProcessActivitiesForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.ActivateAdHocSubProcessActivitiesNotFound** – If the response status code is 404. The ad-hoc sub-process instance is not found or the provided key does not identify an ad-hoc sub-process.
  * **errors.ActivateAdHocSubProcessActivitiesInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.ActivateAdHocSubProcessActivitiesServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### activate_jobs()

```python
async def activate_jobs(, data, \*\*kwargs)
```

Activate jobs

> Iterate through all known partitions and activate jobs up to the requested maximum.
* **Parameters:**
  * **body** (*JobActivationRequest*)
  * **data** (*JobActivationRequest*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.ActivateJobsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.ActivateJobsUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.ActivateJobsInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.ActivateJobsServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  ActivateJobsResponse200
* **Return type:**
  ActivateJobsResponse200

### Examples

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
async def assign_client_to_group(group_id, client_id, \*\*kwargs)
```

Assign a client to a group

> Assigns a client to a group, making it a member of the group.

Members of the group inherit the group authorizations, roles, and tenant assignments.

* **Parameters:**
  * **group_id** (*str*)
  * **client_id** (*str*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.AssignClientToGroupBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.AssignClientToGroupForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.AssignClientToGroupNotFound** – If the response status code is 404. The group with the given ID was not found.
  * **errors.AssignClientToGroupConflict** – If the response status code is 409. The client with the given ID is already assigned to the group.
  * **errors.AssignClientToGroupInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.AssignClientToGroupServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### assign_client_to_tenant()

```python
async def assign_client_to_tenant(tenant_id, client_id, \*\*kwargs)
```

Assign a client to a tenant

> Assign the client to the specified tenant.

The client can then access tenant data and perform authorized actions.

* **Parameters:**
  * **tenant_id** (*str*) – The unique identifier of the tenant. Example: customer-service.
  * **client_id** (*str*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.AssignClientToTenantBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.AssignClientToTenantForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.AssignClientToTenantNotFound** – If the response status code is 404. The tenant was not found.
  * **errors.AssignClientToTenantInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.AssignClientToTenantServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### assign_group_to_tenant()

```python
async def assign_group_to_tenant(tenant_id, group_id, \*\*kwargs)
```

Assign a group to a tenant

> Assigns a group to a specified tenant.

Group members (users, clients) can then access tenant data and perform authorized actions.

* **Parameters:**
  * **tenant_id** (*str*) – The unique identifier of the tenant. Example: customer-service.
  * **group_id** (*str*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.AssignGroupToTenantBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.AssignGroupToTenantForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.AssignGroupToTenantNotFound** – If the response status code is 404. Not found. The tenant or group was not found.
  * **errors.AssignGroupToTenantInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.AssignGroupToTenantServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### assign_mapping_rule_to_group()

```python
async def assign_mapping_rule_to_group(group_id, mapping_rule_id, \*\*kwargs)
```

Assign a mapping rule to a group

> Assigns a mapping rule to a group.
* **Parameters:**
  * **group_id** (*str*)
  * **mapping_rule_id** (*str*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.AssignMappingRuleToGroupBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.AssignMappingRuleToGroupForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.AssignMappingRuleToGroupNotFound** – If the response status code is 404. The group or mapping rule with the given ID was not found.
  * **errors.AssignMappingRuleToGroupConflict** – If the response status code is 409. The mapping rule with the given ID is already assigned to the group.
  * **errors.AssignMappingRuleToGroupInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.AssignMappingRuleToGroupServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### assign_mapping_rule_to_tenant()

```python
async def assign_mapping_rule_to_tenant(tenant_id, mapping_rule_id, \*\*kwargs)
```

Assign a mapping rule to a tenant

> Assign a single mapping rule to a specified tenant.
* **Parameters:**
  * **tenant_id** (*str*) – The unique identifier of the tenant. Example: customer-service.
  * **mapping_rule_id** (*str*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.AssignMappingRuleToTenantBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.AssignMappingRuleToTenantForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.AssignMappingRuleToTenantNotFound** – If the response status code is 404. Not found. The tenant or mapping rule was not found.
  * **errors.AssignMappingRuleToTenantInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.AssignMappingRuleToTenantServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### assign_role_to_client()

```python
async def assign_role_to_client(role_id, client_id, \*\*kwargs)
```

Assign a role to a client

> Assigns the specified role to the client. The client will inherit the authorizations associated with

this role.

* **Parameters:**
  * **role_id** (*str*)
  * **client_id** (*str*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.AssignRoleToClientBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.AssignRoleToClientForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.AssignRoleToClientNotFound** – If the response status code is 404. The role with the given ID was not found.
  * **errors.AssignRoleToClientConflict** – If the response status code is 409. The role was already assigned to the client with the given ID.
  * **errors.AssignRoleToClientInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.AssignRoleToClientServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### assign_role_to_group()

```python
async def assign_role_to_group(role_id, group_id, \*\*kwargs)
```

Assign a role to a group

> Assigns the specified role to the group. Every member of the group (user or client) will inherit the

authorizations associated with this role.

* **Parameters:**
  * **role_id** (*str*)
  * **group_id** (*str*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.AssignRoleToGroupBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.AssignRoleToGroupForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.AssignRoleToGroupNotFound** – If the response status code is 404. The role or group with the given ID was not found.
  * **errors.AssignRoleToGroupConflict** – If the response status code is 409. The role is already assigned to the group with the given ID.
  * **errors.AssignRoleToGroupInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.AssignRoleToGroupServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### assign_role_to_mapping_rule()

```python
async def assign_role_to_mapping_rule(role_id, mapping_rule_id, \*\*kwargs)
```

Assign a role to a mapping rule

> Assigns a role to a mapping rule.
* **Parameters:**
  * **role_id** (*str*)
  * **mapping_rule_id** (*str*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.AssignRoleToMappingRuleBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.AssignRoleToMappingRuleForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.AssignRoleToMappingRuleNotFound** – If the response status code is 404. The role or mapping rule with the given ID was not found.
  * **errors.AssignRoleToMappingRuleConflict** – If the response status code is 409. The role is already assigned to the mapping rule with the given ID.
  * **errors.AssignRoleToMappingRuleInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.AssignRoleToMappingRuleServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### assign_role_to_tenant()

```python
async def assign_role_to_tenant(tenant_id, role_id, \*\*kwargs)
```

Assign a role to a tenant

> Assigns a role to a specified tenant.

Users, Clients or Groups, that have the role assigned, will get access to the tenant’s data and can
perform actions according to their authorizations.

* **Parameters:**
  * **tenant_id** (*str*) – The unique identifier of the tenant. Example: customer-service.
  * **role_id** (*str*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.AssignRoleToTenantBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.AssignRoleToTenantForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.AssignRoleToTenantNotFound** – If the response status code is 404. Not found. The tenant or role was not found.
  * **errors.AssignRoleToTenantInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.AssignRoleToTenantServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### assign_role_to_user()

```python
async def assign_role_to_user(role_id, username, \*\*kwargs)
```

Assign a role to a user

> Assigns the specified role to the user. The user will inherit the authorizations associated with

this role.

* **Parameters:**
  * **role_id** (*str*)
  * **username** (*str*) – The unique name of a user. Example: swillis.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.AssignRoleToUserBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.AssignRoleToUserForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.AssignRoleToUserNotFound** – If the response status code is 404. The role or user with the given ID or username was not found.
  * **errors.AssignRoleToUserConflict** – If the response status code is 409. The role is already assigned to the user with the given ID.
  * **errors.AssignRoleToUserInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.AssignRoleToUserServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### assign_user_task()

```python
async def assign_user_task(user_task_key, , data, \*\*kwargs)
```

Assign user task

> Assigns a user task with the given key to the given assignee.
* **Parameters:**
  * **user_task_key** (*str*) – System-generated key for a user task.
  * **body** (*UserTaskAssignmentRequest*)
  * **data** (*UserTaskAssignmentRequest*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.AssignUserTaskBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.AssignUserTaskNotFound** – If the response status code is 404. The user task with the given key was not found.
  * **errors.AssignUserTaskConflict** – If the response status code is 409. The user task with the given key is in the wrong state currently. More details are provided in the response body.
  * **errors.AssignUserTaskInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.AssignUserTaskServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### Examples

**Assign a user task:**

```python
def assign_user_task_example() -> None:
    client = CamundaClient()

    client.assign_user_task(
        user_task_key=UserTaskKey("123456"),
        data=UserTaskAssignmentRequest(
            assignee="user@example.com",
        ),
    )
```

### assign_user_to_group()

```python
async def assign_user_to_group(group_id, username, \*\*kwargs)
```

Assign a user to a group

> Assigns a user to a group, making the user a member of the group.

Group members inherit the group authorizations, roles, and tenant assignments.

* **Parameters:**
  * **group_id** (*str*)
  * **username** (*str*) – The unique name of a user. Example: swillis.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.AssignUserToGroupBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.AssignUserToGroupForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.AssignUserToGroupNotFound** – If the response status code is 404. The group or user with the given ID or username was not found.
  * **errors.AssignUserToGroupConflict** – If the response status code is 409. The user with the given ID is already assigned to the group.
  * **errors.AssignUserToGroupInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.AssignUserToGroupServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### assign_user_to_tenant()

```python
async def assign_user_to_tenant(tenant_id, username, \*\*kwargs)
```

Assign a user to a tenant

> Assign a single user to a specified tenant. The user can then access tenant data and perform

authorized actions.

* **Parameters:**
  * **tenant_id** (*str*) – The unique identifier of the tenant. Example: customer-service.
  * **username** (*str*) – The unique name of a user. Example: swillis.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.AssignUserToTenantBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.AssignUserToTenantForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.AssignUserToTenantNotFound** – If the response status code is 404. Not found. The tenant or user was not found.
  * **errors.AssignUserToTenantInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.AssignUserToTenantServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### auth_provider

```python
auth_provider: [AuthProvider](runtime.md#camunda_orchestration_sdk.runtime.auth.AuthProvider)
```

### broadcast_signal()

```python
async def broadcast_signal(, data, \*\*kwargs)
```

Broadcast signal

> Broadcasts a signal.
* **Parameters:**
  * **body** (*SignalBroadcastRequest*)
  * **data** (*SignalBroadcastRequest*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.BroadcastSignalBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.BroadcastSignalNotFound** – If the response status code is 404. The signal is not found.
  * **errors.BroadcastSignalInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.BroadcastSignalServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  SignalBroadcastResult
* **Return type:**
  SignalBroadcastResult

### Examples

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
async def cancel_batch_operation(batch_operation_key, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Cancel Batch operation

> Cancels a running batch operation.

This is done asynchronously, the progress can be tracked using the batch operation status endpoint
(/batch-operations/{batchOperationKey}).

* **Parameters:**
  * **batch_operation_key** (*str*) – System-generated key for an batch operation. Example:
    2251799813684321.
  * **body** (*Any* *|* *Unset*)
  * **data** (*Any* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.CancelBatchOperationBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.CancelBatchOperationForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.CancelBatchOperationNotFound** – If the response status code is 404. Not found. The batch operation was not found.
  * **errors.CancelBatchOperationInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### cancel_process_instance()

```python
async def cancel_process_instance(process_instance_key, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Cancel process instance

> Cancels a running process instance. As a cancellation includes more than just the removal of the

process instance resource, the cancellation resource must be posted.

* **Parameters:**
  * **process_instance_key** (*str*) – System-generated key for a process instance. Example:
    2251799813690746.
  * **body** (*CancelProcessInstanceDataType0* *|* *None* *|* *Unset*)
  * **data** (*CancelProcessInstanceDataType0* *|* *None* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.CancelProcessInstanceBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.CancelProcessInstanceNotFound** – If the response status code is 404. The process instance is not found.
  * **errors.CancelProcessInstanceInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.CancelProcessInstanceServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### Examples

**Cancel a process instance:**

```python
def cancel_process_instance_example() -> None:
    client = CamundaClient()

    # Create a process instance and get its key from the response
    created = client.create_process_instance(
        data=ProcessCreationById(process_definition_id=ProcessDefinitionId("order-process"))
    )

    # Cancel it using the key from the creation response
    client.cancel_process_instance(
        process_instance_key=created.process_instance_key,
    )
```

### cancel_process_instances_batch_operation()

```python
async def cancel_process_instances_batch_operation(, data, \*\*kwargs)
```

Cancel process instances (batch)

> Cancels multiple running process instances.

Since only ACTIVE root instances can be cancelled, any given filters for state and
parentProcessInstanceKey are ignored and overridden during this batch operation.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the
response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

* **Parameters:**
  * **body** (*CancelProcessInstancesBatchOperationData*) – The process instance filter that defines
    which process instances should be canceled.
  * **data** (*CancelProcessInstancesBatchOperationData*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.CancelProcessInstancesBatchOperationBadRequest** – If the response status code is 400. The process instance batch operation failed. More details are provided in the response body.
  * **errors.CancelProcessInstancesBatchOperationUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.CancelProcessInstancesBatchOperationForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.CancelProcessInstancesBatchOperationInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  BatchOperationCreatedResult
* **Return type:**
  BatchOperationCreatedResult

### client

```python
client: [Client](configuration.md#camunda_orchestration_sdk.Client) | [AuthenticatedClient](configuration.md#camunda_orchestration_sdk.AuthenticatedClient)
```

### complete_job()

```python
async def complete_job(job_key, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Complete job

> Complete a job with the given payload, which allows completing the associated service task.
* **Parameters:**
  * **job_key** (*str*) – System-generated key for a job. Example: 2251799813653498.
  * **body** (*CompleteJobData* *|* *Unset*)
  * **data** (*CompleteJobData* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.CompleteJobBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.CompleteJobNotFound** – If the response status code is 404. The job with the given key was not found.
  * **errors.CompleteJobConflict** – If the response status code is 409. The job with the given key is in the wrong state currently. More details are provided in the response body.
  * **errors.CompleteJobInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.CompleteJobServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### Examples

**Complete a job:**

```python
def complete_job_example() -> None:
    client = CamundaClient()

    client.complete_job(
        job_key=JobKey("2251799813685249"),
        data=CompleteJobData(
            variables=JobCompletionRequestVariables.from_dict(
                {"paymentId": "PAY-123", "status": "completed"}
            )
        ),
    )
```

### complete_user_task()

```python
async def complete_user_task(user_task_key, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Complete user task

> Completes a user task with the given key.
* **Parameters:**
  * **user_task_key** (*str*) – System-generated key for a user task.
  * **body** (*UserTaskCompletionRequest* *|* *Unset*)
  * **data** (*UserTaskCompletionRequest* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.CompleteUserTaskBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.CompleteUserTaskNotFound** – If the response status code is 404. The user task with the given key was not found.
  * **errors.CompleteUserTaskConflict** – If the response status code is 409. The user task with the given key is in the wrong state currently. More details are provided in the response body.
  * **errors.CompleteUserTaskInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.CompleteUserTaskServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### Examples

**Complete a user task:**

```python
def complete_user_task_example() -> None:
    client = CamundaClient()

    variables = UserTaskCompletionRequestVariables()
    variables["approved"] = True

    client.complete_user_task(
        user_task_key=UserTaskKey("123456"),
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
async def correlate_message(, data, \*\*kwargs)
```

Correlate message

> Publishes a message and correlates it to a subscription.

If correlation is successful it will return the first process instance key the message correlated
with.
The message is not buffered.
Use the publish message endpoint to send messages that can be buffered.

* **Parameters:**
  * **body** (*MessageCorrelationRequest*)
  * **data** (*MessageCorrelationRequest*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.CorrelateMessageBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.CorrelateMessageForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.CorrelateMessageNotFound** – If the response status code is 404. Not found
  * **errors.CorrelateMessageInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.CorrelateMessageServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  MessageCorrelationResult
* **Return type:**
  MessageCorrelationResult

### Examples

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

    if not isinstance(result.message_key, Unset):
        print(f"Message key: {result.message_key}")
```

### create_admin_user()

```python
async def create_admin_user(, data, \*\*kwargs)
```

Create admin user

> Creates a new user and assigns the admin role to it. This endpoint is only usable when users are

managed in the Orchestration Cluster and while no user is assigned to the admin role.

* **Parameters:**
  * **body** (*UserRequest*)
  * **data** (*UserRequest*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.CreateAdminUserBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.CreateAdminUserForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.CreateAdminUserInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.CreateAdminUserServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### create_authorization()

```python
async def create_authorization(, data, \*\*kwargs)
```

Create authorization

> Create the authorization.
* **Parameters:**
  * **body** (*AuthorizationIdBasedRequest* *|* *AuthorizationPropertyBasedRequest*)
  * **data** (*AuthorizationIdBasedRequest* *|* *AuthorizationPropertyBasedRequest*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.CreateAuthorizationBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.CreateAuthorizationUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.CreateAuthorizationForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.CreateAuthorizationNotFound** – If the response status code is 404. The owner was not found.
  * **errors.CreateAuthorizationInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.CreateAuthorizationServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  AuthorizationCreateResult
* **Return type:**
  AuthorizationCreateResult

### create_deployment()

```python
async def create_deployment(, data, \*\*kwargs)
```

Deploy resources

> Deploys one or more resources (e.g. processes, decision models, or forms).

This is an atomic call, i.e. either all resources are deployed or none of them are.

* **Parameters:**
  * **body** (*CreateDeploymentData*)
  * **data** (*CreateDeploymentData*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.CreateDeploymentBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.CreateDeploymentServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  CreateDeploymentResponse200
* **Return type:**
  CreateDeploymentResponse200

### Examples

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
async def create_document(\*, data, store_id=<camunda_orchestration_sdk.types.Unset object>, document_id=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Upload document

> Upload a document to the Camunda 8 cluster.

Note that this is currently supported for document stores of type: AWS, GCP, in-memory (non-
production), local (non-production)

* **Parameters:**
  * **store_id** (*str* *|* *Unset*)
  * **document_id** (*str* *|* *Unset*) – Document Id that uniquely identifies a document.
  * **body** (*CreateDocumentData*)
  * **data** (*CreateDocumentData*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.CreateDocumentBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.CreateDocumentUnsupportedMediaType** – If the response status code is 415. The server cannot process the request because the media type (Content-Type) of the request payload is not supported by the server for the requested resource and method.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  DocumentReference
* **Return type:**
  DocumentReference

### create_document_link()

```python
async def create_document_link(document_id, \*, data=<camunda_orchestration_sdk.types.Unset object>, store_id=<camunda_orchestration_sdk.types.Unset object>, content_hash=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Create document link

> Create a link to a document in the Camunda 8 cluster.

Note that this is currently supported for document stores of type: AWS, GCP

* **Parameters:**
  * **document_id** (*str*) – Document Id that uniquely identifies a document.
  * **store_id** (*str* *|* *Unset*)
  * **content_hash** (*str* *|* *Unset*)
  * **body** (*DocumentLinkRequest* *|* *Unset*)
  * **data** (*DocumentLinkRequest* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.CreateDocumentLinkBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  DocumentLink
* **Return type:**
  DocumentLink

### create_documents()

```python
async def create_documents(\*, data, store_id=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
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

* **Parameters:**
  * **store_id** (*str* *|* *Unset*)
  * **body** (*CreateDocumentsData*)
  * **data** (*CreateDocumentsData*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.CreateDocumentsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.CreateDocumentsUnsupportedMediaType** – If the response status code is 415. The server cannot process the request because the media type (Content-Type) of the request payload is not supported by the server for the requested resource and method.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  DocumentCreationBatchResponse
* **Return type:**
  DocumentCreationBatchResponse

### create_element_instance_variables()

```python
async def create_element_instance_variables(element_instance_key, , data, \*\*kwargs)
```

Update element instance variables

> Updates all the variables of a particular scope (for example, process instance, element instance)

with the given variable data.
Specify the element instance in the elementInstanceKey parameter.

* **Parameters:**
  * **element_instance_key** (*str*) – System-generated key for a element instance. Example:
    2251799813686789.
  * **body** (*SetVariableRequest*)
  * **data** (*SetVariableRequest*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.CreateElementInstanceVariablesBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.CreateElementInstanceVariablesInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.CreateElementInstanceVariablesServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### create_global_cluster_variable()

```python
async def create_global_cluster_variable(, data, \*\*kwargs)
```

Create a global-scoped cluster variable

* **Parameters:**
  * **body** (*CreateClusterVariableRequest*)
  * **data** (*CreateClusterVariableRequest*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.CreateGlobalClusterVariableBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.CreateGlobalClusterVariableUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.CreateGlobalClusterVariableForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.CreateGlobalClusterVariableInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  ClusterVariableResult
* **Return type:**
  ClusterVariableResult

### create_group()

```python
async def create_group(\*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Create group

> Create a new group.
* **Parameters:**
  * **body** (*GroupCreateRequest* *|* *Unset*)
  * **data** (*GroupCreateRequest* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.CreateGroupBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.CreateGroupUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.CreateGroupForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.CreateGroupInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.CreateGroupServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  GroupCreateResult
* **Return type:**
  GroupCreateResult

### create_job_worker()

```python
def create_job_worker(config, callback, auto_start=True)
```

* **Parameters:**
  * **config** ([*WorkerConfig*](runtime.md#camunda_orchestration_sdk.runtime.job_worker.WorkerConfig))
  * **callback** (*Callable* *[* *[*[*JobContext*](runtime.md#camunda_orchestration_sdk.runtime.job_worker.JobContext) *]* *,* *Coroutine* *[**Any* *,* *Any* *,* *dict* *[**str* *,* *Any* *]*  *|* *CompleteJobData* *|* *None* *]* *]*  *|* *Callable* *[* *[*[*JobContext*](runtime.md#camunda_orchestration_sdk.runtime.job_worker.JobContext) *]* *,* *dict* *[**str* *,* *Any* *]*  *|* *None* *]*  *|* [*HintedCallable*](runtime.md#camunda_orchestration_sdk.runtime.job_worker.HintedCallable))
  * **auto_start** (*bool*)
* **Return type:**
  [*JobWorker*](runtime.md#camunda_orchestration_sdk.runtime.job_worker.JobWorker)

### create_mapping_rule()

```python
async def create_mapping_rule(\*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Create mapping rule

> Create a new mapping rule
* **Parameters:**
  * **body** (*MappingRuleCreateRequest* *|* *Unset*)
  * **data** (*MappingRuleCreateRequest* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.CreateMappingRuleBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.CreateMappingRuleForbidden** – If the response status code is 403. The request to create a mapping rule was denied. More details are provided in the response body.
  * **errors.CreateMappingRuleNotFound** – If the response status code is 404. The request to create a mapping rule was denied.
  * **errors.CreateMappingRuleInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  MappingRuleUpdateResult
* **Return type:**
  MappingRuleUpdateResult

### create_process_instance()

```python
async def create_process_instance(, data, \*\*kwargs)
```

Create process instance

> Creates and starts an instance of the specified process.

The process definition to use to create the instance can be specified either using its unique key
(as returned by Deploy resources), or using the BPMN process id and a version.

Waits for the completion of the process instance before returning a result
when awaitCompletion is enabled.

* **Parameters:**
  * **body** (*ProcessCreationById* *|* *ProcessCreationByKey*) – Instructions for creating a process
    instance. The process definition can be specified
    either by id or by key.
  * **data** (*ProcessCreationById* *|* *ProcessCreationByKey*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.CreateProcessInstanceBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.CreateProcessInstanceInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.CreateProcessInstanceServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.CreateProcessInstanceGatewayTimeout** – If the response status code is 504. The process instance creation request timed out in the gateway. This can happen if the awaitCompletion request parameter is set to true and the created process instance did not complete within the defined request timeout. This often happens when the created instance is not fully automated or contains wait states.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  CreateProcessInstanceResult
* **Return type:**
  CreateProcessInstanceResult

### Examples

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
def create_process_instance_by_id_example() -> None:
    client = CamundaClient()

    result = client.create_process_instance(
        data=ProcessCreationById(
            process_definition_id=ProcessDefinitionId("order-process"),
        )
    )

    print(f"Process instance key: {result.process_instance_key}")
```

### create_role()

```python
async def create_role(\*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Create role

> Create a new role.
* **Parameters:**
  * **body** (*RoleCreateRequest* *|* *Unset*)
  * **data** (*RoleCreateRequest* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.CreateRoleBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.CreateRoleUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.CreateRoleForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.CreateRoleInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.CreateRoleServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  RoleCreateResult
* **Return type:**
  RoleCreateResult

### create_tenant()

```python
async def create_tenant(, data, \*\*kwargs)
```

Create tenant

> Creates a new tenant.
* **Parameters:**
  * **body** (*TenantCreateRequest*)
  * **data** (*TenantCreateRequest*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.CreateTenantBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.CreateTenantForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.CreateTenantNotFound** – If the response status code is 404. Not found. The resource was not found.
  * **errors.CreateTenantConflict** – If the response status code is 409. Tenant with this id already exists.
  * **errors.CreateTenantInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.CreateTenantServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  TenantCreateResult
* **Return type:**
  TenantCreateResult

### create_tenant_cluster_variable()

```python
async def create_tenant_cluster_variable(tenant_id, , data, \*\*kwargs)
```

Create a tenant-scoped cluster variable

* **Parameters:**
  * **tenant_id** (*str*) – The unique identifier of the tenant. Example: customer-service.
  * **body** (*CreateClusterVariableRequest*)
  * **data** (*CreateClusterVariableRequest*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.CreateTenantClusterVariableBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.CreateTenantClusterVariableUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.CreateTenantClusterVariableForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.CreateTenantClusterVariableInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  ClusterVariableResult
* **Return type:**
  ClusterVariableResult

### create_user()

```python
async def create_user(, data, \*\*kwargs)
```

Create user

> Create a new user.
* **Parameters:**
  * **body** (*UserRequest*)
  * **data** (*UserRequest*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.CreateUserBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.CreateUserUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.CreateUserForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.CreateUserConflict** – If the response status code is 409. A user with this username already exists.
  * **errors.CreateUserInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.CreateUserServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  UserCreateResult
* **Return type:**
  UserCreateResult

### delete_authorization()

```python
async def delete_authorization(authorization_key, \*\*kwargs)
```

Delete authorization

> Deletes the authorization with the given key.
* **Parameters:**
  * **authorization_key** (*str*) – System-generated key for an authorization. Example:
    2251799813684332.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.DeleteAuthorizationUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.DeleteAuthorizationNotFound** – If the response status code is 404. The authorization with the authorizationKey was not found.
  * **errors.DeleteAuthorizationInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.DeleteAuthorizationServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### delete_decision_instance()

```python
async def delete_decision_instance(decision_instance_key, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Delete decision instance

> Delete all associated decision evaluations based on provided key.
* **Parameters:**
  * **decision_instance_key** (*str*) – System-generated key for a deployed decision instance.
    Example: 22517998136843567.
  * **body** (*DeleteProcessInstanceRequestType0* *|* *None* *|* *Unset*)
  * **data** (*DeleteProcessInstanceRequestType0* *|* *None* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.DeleteDecisionInstanceUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.DeleteDecisionInstanceForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.DeleteDecisionInstanceNotFound** – If the response status code is 404. The decision instance is not found.
  * **errors.DeleteDecisionInstanceInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.DeleteDecisionInstanceServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  BatchOperationCreatedResult
* **Return type:**
  BatchOperationCreatedResult

### delete_decision_instances_batch_operation()

```python
async def delete_decision_instances_batch_operation(, data, \*\*kwargs)
```

Delete decision instances (batch)

> Delete multiple decision instances. This will delete the historic data from secondary storage.

This is done asynchronously, the progress can be tracked using the batchOperationKey from the
response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

* **Parameters:**
  * **body** (*DecisionInstanceDeletionBatchOperationRequest*) – The decision instance filter that
    defines which decision instances should be deleted.
  * **data** (*DecisionInstanceDeletionBatchOperationRequest*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.DeleteDecisionInstancesBatchOperationBadRequest** – If the response status code is 400. The decision instance batch operation failed. More details are provided in the response body.
  * **errors.DeleteDecisionInstancesBatchOperationUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.DeleteDecisionInstancesBatchOperationForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.DeleteDecisionInstancesBatchOperationInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  BatchOperationCreatedResult
* **Return type:**
  BatchOperationCreatedResult

### delete_document()

```python
async def delete_document(document_id, \*, store_id=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Delete document

> Delete a document from the Camunda 8 cluster.

Note that this is currently supported for document stores of type: AWS, GCP, in-memory (non-
production), local (non-production)

* **Parameters:**
  * **document_id** (*str*) – Document Id that uniquely identifies a document.
  * **store_id** (*str* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.DeleteDocumentNotFound** – If the response status code is 404. The document with the given ID was not found.
  * **errors.DeleteDocumentInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### delete_global_cluster_variable()

```python
async def delete_global_cluster_variable(name, \*\*kwargs)
```

Delete a global-scoped cluster variable

* **Parameters:**
  * **name** (*str*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.DeleteGlobalClusterVariableBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.DeleteGlobalClusterVariableUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.DeleteGlobalClusterVariableForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.DeleteGlobalClusterVariableNotFound** – If the response status code is 404. Cluster variable not found
  * **errors.DeleteGlobalClusterVariableInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### delete_group()

```python
async def delete_group(group_id, \*\*kwargs)
```

Delete group

> Deletes the group with the given ID.
* **Parameters:**
  * **group_id** (*str*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.DeleteGroupUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.DeleteGroupNotFound** – If the response status code is 404. The group with the given ID was not found.
  * **errors.DeleteGroupInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.DeleteGroupServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### delete_mapping_rule()

```python
async def delete_mapping_rule(mapping_rule_id, \*\*kwargs)
```

Delete a mapping rule

> Deletes the mapping rule with the given ID.
* **Parameters:**
  * **mapping_rule_id** (*str*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.DeleteMappingRuleUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.DeleteMappingRuleNotFound** – If the response status code is 404. The mapping rule with the mappingRuleId was not found.
  * **errors.DeleteMappingRuleInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.DeleteMappingRuleServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### delete_process_instance()

```python
async def delete_process_instance(process_instance_key, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Delete process instance

> Deletes a process instance. Only instances that are completed or terminated can be deleted.
* **Parameters:**
  * **process_instance_key** (*str*) – System-generated key for a process instance. Example:
    2251799813690746.
  * **body** (*DeleteProcessInstanceDataType0* *|* *None* *|* *Unset*)
  * **data** (*DeleteProcessInstanceDataType0* *|* *None* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.DeleteProcessInstanceUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.DeleteProcessInstanceForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.DeleteProcessInstanceNotFound** – If the response status code is 404. The process instance is not found.
  * **errors.DeleteProcessInstanceConflict** – If the response status code is 409. The process instance is not in a completed or terminated state and cannot be deleted.
  * **errors.DeleteProcessInstanceInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.DeleteProcessInstanceServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  BatchOperationCreatedResult
* **Return type:**
  BatchOperationCreatedResult

### delete_process_instances_batch_operation()

```python
async def delete_process_instances_batch_operation(, data, \*\*kwargs)
```

Delete process instances (batch)

> Delete multiple process instances. This will delete the historic data from secondary storage.

Only process instances in a final state (COMPLETED or TERMINATED) can be deleted.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the
response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

* **Parameters:**
  * **body** (*DeleteProcessInstancesBatchOperationData*) – The process instance filter that defines
    which process instances should be deleted.
  * **data** (*DeleteProcessInstancesBatchOperationData*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.DeleteProcessInstancesBatchOperationBadRequest** – If the response status code is 400. The process instance batch operation failed. More details are provided in the response body.
  * **errors.DeleteProcessInstancesBatchOperationUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.DeleteProcessInstancesBatchOperationForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.DeleteProcessInstancesBatchOperationInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  BatchOperationCreatedResult
* **Return type:**
  BatchOperationCreatedResult

### delete_resource()

```python
async def delete_resource(resource_key, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
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

* **Parameters:**
  * **resource_key** (*str*) – The system-assigned key for this resource.
  * **body** (*DeleteResourceDataType0* *|* *None* *|* *Unset*)
  * **data** (*DeleteResourceDataType0* *|* *None* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.DeleteResourceBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.DeleteResourceNotFound** – If the response status code is 404. The resource is not found.
  * **errors.DeleteResourceInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.DeleteResourceServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  DeleteResourceResponse
* **Return type:**
  DeleteResourceResponse

### Examples

**Delete a resource:**

```python
def delete_resource_example() -> None:
    client = CamundaClient()

    # Use a resource key from a previous deployment response
    client.delete_resource(resource_key="2251799813685249")
```

### delete_role()

```python
async def delete_role(role_id, \*\*kwargs)
```

Delete role

> Deletes the role with the given ID.
* **Parameters:**
  * **role_id** (*str*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.DeleteRoleUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.DeleteRoleNotFound** – If the response status code is 404. The role with the ID was not found.
  * **errors.DeleteRoleInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.DeleteRoleServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### delete_tenant()

```python
async def delete_tenant(tenant_id, \*\*kwargs)
```

Delete tenant

> Deletes an existing tenant.
* **Parameters:**
  * **tenant_id** (*str*) – The unique identifier of the tenant. Example: customer-service.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.DeleteTenantBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.DeleteTenantForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.DeleteTenantNotFound** – If the response status code is 404. Not found. The tenant was not found.
  * **errors.DeleteTenantInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.DeleteTenantServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### delete_tenant_cluster_variable()

```python
async def delete_tenant_cluster_variable(tenant_id, name, \*\*kwargs)
```

Delete a tenant-scoped cluster variable

* **Parameters:**
  * **tenant_id** (*str*) – The unique identifier of the tenant. Example: customer-service.
  * **name** (*str*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.DeleteTenantClusterVariableBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.DeleteTenantClusterVariableUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.DeleteTenantClusterVariableForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.DeleteTenantClusterVariableNotFound** – If the response status code is 404. Cluster variable not found
  * **errors.DeleteTenantClusterVariableInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### delete_user()

```python
async def delete_user(username, \*\*kwargs)
```

Delete user

> Deletes a user.
* **Parameters:**
  * **username** (*str*) – The unique name of a user. Example: swillis.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.DeleteUserBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.DeleteUserNotFound** – If the response status code is 404. The user is not found.
  * **errors.DeleteUserInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.DeleteUserServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### deploy_resources_from_files()

```python
async def deploy_resources_from_files(files, tenant_id=None)
```

Deploy BPMN/DMN/Form resources from local files.

Async variant of [`CamundaClient.deploy_resources_from_files()`](client.md#camunda_orchestration_sdk.CamundaClient.deploy_resources_from_files).

This reads each file path in `files` as bytes, wraps them into
`camunda_orchestration_sdk.types.File`, calls [`create_deployment()`](#create_deployment), and returns
an `ExtendedDeploymentResult`.

Note: file reads are currently performed using blocking I/O (`open(...).read()`). If you
need fully non-blocking file access, load the bytes yourself and call [`create_deployment()`](#create_deployment).

* **Parameters:**
  * **files** (*list* *[**str* *|* *Path* *]*) – File paths (`str` or `Path`) to deploy.
  * **tenant_id** (*str* *|* *None*) – Optional tenant identifier. If not provided, the default tenant is used.
* **Returns:**
  The deployment result with extracted resource lists.
* **Return type:**
  ExtendedDeploymentResult
* **Raises:**
  * **FileNotFoundError** – If any file path does not exist.
  * **PermissionError** – If any file path cannot be read.
  * **IsADirectoryError** – If any file path is a directory.
  * **OSError** – For other I/O failures while reading files.
  * **Exception** – Propagates any exception raised by [`create_deployment()`](#create_deployment) (including
        typed API errors in `camunda_orchestration_sdk.errors` and `httpx.TimeoutException`).

### evaluate_conditionals()

```python
async def evaluate_conditionals(, data, \*\*kwargs)
```

Evaluate root level conditional start events

> Evaluates root-level conditional start events for process definitions.

If the evaluation is successful, it will return the keys of all created process instances, along
with their associated process definition key.
Multiple root-level conditional start events of the same process definition can trigger if their
conditions evaluate to true.

* **Parameters:**
  * **body** (*ConditionalEvaluationInstruction*)
  * **data** (*ConditionalEvaluationInstruction*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.EvaluateConditionalsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.EvaluateConditionalsForbidden** – If the response status code is 403. The client is not authorized to start process instances for the specified process definition. If a processDefinitionKey is not provided, this indicates that the client is not authorized to start process instances for at least one of the matched process definitions.
  * **errors.EvaluateConditionalsNotFound** – If the response status code is 404. The process definition was not found for the given processDefinitionKey.
  * **errors.EvaluateConditionalsInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.EvaluateConditionalsServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  EvaluateConditionalResult
* **Return type:**
  EvaluateConditionalResult

### evaluate_decision()

```python
async def evaluate_decision(, data, \*\*kwargs)
```

Evaluate decision

> Evaluates a decision.

You specify the decision to evaluate either by using its unique key (as returned by
DeployResource), or using the decision ID. When using the decision ID, the latest deployed
version of the decision is used.

* **Parameters:**
  * **body** (*DecisionEvaluationByID* *|* *DecisionEvaluationByKey*)
  * **data** (*DecisionEvaluationByID* *|* *DecisionEvaluationByKey*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.EvaluateDecisionBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.EvaluateDecisionNotFound** – If the response status code is 404. The decision is not found.
  * **errors.EvaluateDecisionInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.EvaluateDecisionServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  EvaluateDecisionResult
* **Return type:**
  EvaluateDecisionResult

### Examples

**Evaluate by decision definition key:**

```python
def evaluate_decision_by_key_example() -> None:
    client = CamundaClient()

    result = client.evaluate_decision(
        data=DecisionEvaluationByKey(
            decision_definition_key=DecisionDefinitionKey("123456"),
        )
    )

    print(f"Decision key: {result.decision_definition_key}")
```

**Evaluate by decision definition ID:**

```python
def evaluate_decision_by_id_example() -> None:
    client = CamundaClient()

    result = client.evaluate_decision(
        data=DecisionEvaluationByID(
            decision_definition_id=DecisionDefinitionId("invoice-classification"),
        )
    )

    print(f"Decision key: {result.decision_definition_key}")
```

### evaluate_expression()

```python
async def evaluate_expression(, data, \*\*kwargs)
```

Evaluate an expression

> Evaluates a FEEL expression and returns the result. Supports references to tenant scoped cluster

variables when a tenant ID is provided.

* **Parameters:**
  * **body** (*ExpressionEvaluationRequest*)
  * **data** (*ExpressionEvaluationRequest*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.EvaluateExpressionBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.EvaluateExpressionUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.EvaluateExpressionForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.EvaluateExpressionInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  ExpressionEvaluationResult
* **Return type:**
  ExpressionEvaluationResult

### fail_job()

```python
async def fail_job(job_key, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Fail job

> Mark the job as failed.
* **Parameters:**
  * **job_key** (*str*) – System-generated key for a job. Example: 2251799813653498.
  * **body** (*JobFailRequest* *|* *Unset*)
  * **data** (*JobFailRequest* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.FailJobBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.FailJobNotFound** – If the response status code is 404. The job with the given jobKey is not found. It was completed by another worker, or the process instance itself was canceled.
  * **errors.FailJobConflict** – If the response status code is 409. The job with the given key is in the wrong state (i.e: not ACTIVATED or ACTIVATABLE). The job was failed by another worker with retries = 0, and the process is now in an incident state.
  * **errors.FailJobInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.FailJobServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### Examples

**Fail a job with retry:**

```python
def fail_job_example() -> None:
    client = CamundaClient()

    client.fail_job(
        job_key=JobKey("2251799813685249"),
        data=JobFailRequest(
            retries=2,
            error_message="Payment gateway timeout",
            retry_back_off=5000,
        ),
    )
```

### get_audit_log()

```python
async def get_audit_log(audit_log_key, \*\*kwargs)
```

Get audit log

> Get an audit log entry by auditLogKey.
* **Parameters:**
  * **audit_log_key** (*str*) – System-generated key for an audit log entry. Example:
    22517998136843567.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetAuditLogUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetAuditLogForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetAuditLogNotFound** – If the response status code is 404. The audit log with the given key was not found.
  * **errors.GetAuditLogInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  GetAuditLogResponse200
* **Return type:**
  GetAuditLogResponse200

### get_authentication()

```python
async def get_authentication(\*\*kwargs)
```

Get current user

> Retrieves the current authenticated user.
* **Raises:**
  * **errors.GetAuthenticationUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetAuthenticationForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetAuthenticationInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  CamundaUserResult
* **Parameters:**
  **kwargs** (*Any*)
* **Return type:**
  CamundaUserResult

### get_authorization()

```python
async def get_authorization(authorization_key, \*\*kwargs)
```

Get authorization

> Get authorization by the given key.
* **Parameters:**
  * **authorization_key** (*str*) – System-generated key for an authorization. Example:
    2251799813684332.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetAuthorizationUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetAuthorizationForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetAuthorizationNotFound** – If the response status code is 404. The authorization with the given key was not found.
  * **errors.GetAuthorizationInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  AuthorizationResult
* **Return type:**
  AuthorizationResult

### get_batch_operation()

```python
async def get_batch_operation(batch_operation_key, \*\*kwargs)
```

Get batch operation

> Get batch operation by key.
* **Parameters:**
  * **batch_operation_key** (*str*) – System-generated key for an batch operation. Example:
    2251799813684321.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetBatchOperationBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetBatchOperationNotFound** – If the response status code is 404. The batch operation is not found.
  * **errors.GetBatchOperationInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  BatchOperationResponse
* **Return type:**
  BatchOperationResponse

### get_decision_definition()

```python
async def get_decision_definition(decision_definition_key, \*\*kwargs)
```

Get decision definition

> Returns a decision definition by key.
* **Parameters:**
  * **decision_definition_key** (*str*) – System-generated key for a decision definition. Example:
    2251799813326547.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetDecisionDefinitionBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetDecisionDefinitionUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetDecisionDefinitionForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetDecisionDefinitionNotFound** – If the response status code is 404. The decision definition with the given key was not found. More details are provided in the response body.
  * **errors.GetDecisionDefinitionInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  DecisionDefinitionResult
* **Return type:**
  DecisionDefinitionResult

### Examples

**Get a decision definition:**

```python
def get_decision_definition_example() -> None:
    client = CamundaClient()

    definition = client.get_decision_definition(
        decision_definition_key=DecisionDefinitionKey("123456")
    )

    print(f"Decision: {definition.decision_definition_id}")
```

### get_decision_definition_xml()

```python
async def get_decision_definition_xml(decision_definition_key, \*\*kwargs)
```

Get decision definition XML

> Returns decision definition as XML.
* **Parameters:**
  * **decision_definition_key** (*str*) – System-generated key for a decision definition. Example:
    2251799813326547.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetDecisionDefinitionXmlBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetDecisionDefinitionXmlUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetDecisionDefinitionXmlForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetDecisionDefinitionXmlNotFound** – If the response status code is 404. The decision definition with the given key was not found. More details are provided in the response body.
  * **errors.GetDecisionDefinitionXmlInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  str
* **Return type:**
  str

### get_decision_instance()

```python
async def get_decision_instance(decision_evaluation_instance_key, \*\*kwargs)
```

Get decision instance

> Returns a decision instance.
* **Parameters:**
  * **decision_evaluation_instance_key** (*str*) – System-generated key for a deployed decision
    instance. Example: 22517998136843567.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetDecisionInstanceBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetDecisionInstanceUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetDecisionInstanceForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetDecisionInstanceNotFound** – If the response status code is 404. The decision instance with the given key was not found. More details are provided in the response body.
  * **errors.GetDecisionInstanceInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  DecisionInstanceGetQueryResult
* **Return type:**
  DecisionInstanceGetQueryResult

### get_decision_requirements()

```python
async def get_decision_requirements(decision_requirements_key, \*\*kwargs)
```

Get decision requirements

> Returns Decision Requirements as JSON.
* **Parameters:**
  * **decision_requirements_key** (*str*) – System-generated key for a deployed decision requirements
    definition. Example: 2251799813683346.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetDecisionRequirementsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetDecisionRequirementsUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetDecisionRequirementsForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetDecisionRequirementsNotFound** – If the response status code is 404. The decision requirements with the given key was not found. More details are provided in the response body.
  * **errors.GetDecisionRequirementsInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  DecisionRequirementsResult
* **Return type:**
  DecisionRequirementsResult

### get_decision_requirements_xml()

```python
async def get_decision_requirements_xml(decision_requirements_key, \*\*kwargs)
```

Get decision requirements XML

> Returns decision requirements as XML.
* **Parameters:**
  * **decision_requirements_key** (*str*) – System-generated key for a deployed decision requirements
    definition. Example: 2251799813683346.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetDecisionRequirementsXmlBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetDecisionRequirementsXmlUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetDecisionRequirementsXmlForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetDecisionRequirementsXmlNotFound** – If the response status code is 404. The decision requirements with the given key was not found. More details are provided in the response body.
  * **errors.GetDecisionRequirementsXmlInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  str
* **Return type:**
  str

### get_document()

```python
async def get_document(document_id, \*, store_id=<camunda_orchestration_sdk.types.Unset object>, content_hash=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Download document

> Download a document from the Camunda 8 cluster.

Note that this is currently supported for document stores of type: AWS, GCP, in-memory (non-
production), local (non-production)

* **Parameters:**
  * **document_id** (*str*) – Document Id that uniquely identifies a document.
  * **store_id** (*str* *|* *Unset*)
  * **content_hash** (*str* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetDocumentNotFound** – If the response status code is 404. The document with the given ID was not found.
  * **errors.GetDocumentInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  File
* **Return type:**
  File

### get_element_instance()

```python
async def get_element_instance(element_instance_key, \*\*kwargs)
```

Get element instance

> Returns element instance as JSON.
* **Parameters:**
  * **element_instance_key** (*str*) – System-generated key for a element instance. Example:
    2251799813686789.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetElementInstanceBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetElementInstanceUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetElementInstanceForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetElementInstanceNotFound** – If the response status code is 404. The element instance with the given key was not found. More details are provided in the response body.
  * **errors.GetElementInstanceInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  ElementInstanceResult
* **Return type:**
  ElementInstanceResult

### get_global_cluster_variable()

```python
async def get_global_cluster_variable(name, \*\*kwargs)
```

Get a global-scoped cluster variable

* **Parameters:**
  * **name** (*str*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetGlobalClusterVariableBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetGlobalClusterVariableUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetGlobalClusterVariableForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetGlobalClusterVariableNotFound** – If the response status code is 404. Cluster variable not found
  * **errors.GetGlobalClusterVariableInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  ClusterVariableResult
* **Return type:**
  ClusterVariableResult

### get_global_job_statistics()

```python
async def get_global_job_statistics(\*, from_, to, job_type=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Global job statistics

> Returns global aggregated counts for jobs. Optionally filter by the creation time window and/or

jobType.

* **Parameters:**
  * **from** (*datetime.datetime*)
  * **to** (*datetime.datetime*)
  * **job_type** (*str* *|* *Unset*)
  * **from_** (*datetime.datetime*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetGlobalJobStatisticsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetGlobalJobStatisticsUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetGlobalJobStatisticsForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetGlobalJobStatisticsInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  GlobalJobStatisticsQueryResult
* **Return type:**
  GlobalJobStatisticsQueryResult

### get_group()

```python
async def get_group(group_id, \*\*kwargs)
```

Get group

> Get a group by its ID.
* **Parameters:**
  * **group_id** (*str*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetGroupUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetGroupForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetGroupNotFound** – If the response status code is 404. The group with the given ID was not found.
  * **errors.GetGroupInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  GroupResult
* **Return type:**
  GroupResult

### get_incident()

```python
async def get_incident(incident_key, \*\*kwargs)
```

Get incident

> Returns incident as JSON.
* **Parameters:**
  * **incident_key** (*str*) – System-generated key for a incident. Example: 2251799813689432.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetIncidentBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetIncidentUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetIncidentForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetIncidentNotFound** – If the response status code is 404. The incident with the given key was not found.
  * **errors.GetIncidentInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  IncidentResult
* **Return type:**
  IncidentResult

### Examples

**Get an incident:**

```python
def get_incident_example() -> None:
    client = CamundaClient()

    incident = client.get_incident(incident_key=IncidentKey("123456"))

    print(f"Incident error type: {incident.error_type}")
```

### get_license()

```python
async def get_license(\*\*kwargs)
```

Get license status

> Obtains the status of the current Camunda license.
* **Raises:**
  * **errors.GetLicenseInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  LicenseResponse
* **Parameters:**
  **kwargs** (*Any*)
* **Return type:**
  LicenseResponse

### get_mapping_rule()

```python
async def get_mapping_rule(mapping_rule_id, \*\*kwargs)
```

Get a mapping rule

> Gets the mapping rule with the given ID.
* **Parameters:**
  * **mapping_rule_id** (*str*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetMappingRuleUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetMappingRuleNotFound** – If the response status code is 404. The mapping rule with the mappingRuleId was not found.
  * **errors.GetMappingRuleInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  MappingRuleResult
* **Return type:**
  MappingRuleResult

### get_process_definition()

```python
async def get_process_definition(process_definition_key, \*\*kwargs)
```

Get process definition

> Returns process definition as JSON.
* **Parameters:**
  * **process_definition_key** (*str*) – System-generated key for a deployed process definition.
    Example: 2251799813686749.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetProcessDefinitionBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetProcessDefinitionUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetProcessDefinitionForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetProcessDefinitionNotFound** – If the response status code is 404. The process definition with the given key was not found. More details are provided in the response body.
  * **errors.GetProcessDefinitionInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  ProcessDefinitionResult
* **Return type:**
  ProcessDefinitionResult

### get_process_definition_instance_statistics()

```python
async def get_process_definition_instance_statistics(\*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Get process instance statistics

> Get statistics about process instances, grouped by process definition and tenant.
* **Parameters:**
  * **body** (*ProcessDefinitionInstanceStatisticsQuery* *|* *Unset*)
  * **data** (*ProcessDefinitionInstanceStatisticsQuery* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetProcessDefinitionInstanceStatisticsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetProcessDefinitionInstanceStatisticsUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetProcessDefinitionInstanceStatisticsForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetProcessDefinitionInstanceStatisticsInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  ProcessDefinitionInstanceStatisticsQueryResult
* **Return type:**
  ProcessDefinitionInstanceStatisticsQueryResult

### get_process_definition_instance_version_statistics()

```python
async def get_process_definition_instance_version_statistics(process_definition_id, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Get process instance statistics by version

> Get statistics about process instances, grouped by version for a given process definition.
* **Parameters:**
  * **process_definition_id** (*str*) – Id of a process definition, from the model. Only ids of
    process definitions that are deployed are useful. Example: new-account-onboarding-
    workflow.
  * **body** (*ProcessDefinitionInstanceVersionStatisticsQuery* *|* *Unset*)
  * **data** (*ProcessDefinitionInstanceVersionStatisticsQuery* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetProcessDefinitionInstanceVersionStatisticsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetProcessDefinitionInstanceVersionStatisticsUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetProcessDefinitionInstanceVersionStatisticsForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetProcessDefinitionInstanceVersionStatisticsInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  ProcessDefinitionInstanceVersionStatisticsQueryResult
* **Return type:**
  ProcessDefinitionInstanceVersionStatisticsQueryResult

### get_process_definition_message_subscription_statistics()

```python
async def get_process_definition_message_subscription_statistics(\*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Get message subscription statistics

> Get message subscription statistics, grouped by process definition.
* **Parameters:**
  * **body** (*ProcessDefinitionMessageSubscriptionStatisticsQuery* *|* *Unset*)
  * **data** (*ProcessDefinitionMessageSubscriptionStatisticsQuery* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetProcessDefinitionMessageSubscriptionStatisticsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetProcessDefinitionMessageSubscriptionStatisticsUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetProcessDefinitionMessageSubscriptionStatisticsForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetProcessDefinitionMessageSubscriptionStatisticsInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  ProcessDefinitionMessageSubscriptionStatisticsQueryResult
* **Return type:**
  ProcessDefinitionMessageSubscriptionStatisticsQueryResult

### get_process_definition_statistics()

```python
async def get_process_definition_statistics(process_definition_key, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Get process definition statistics

> Get statistics about elements in currently running process instances by process definition key and

search filter.

* **Parameters:**
  * **process_definition_key** (*str*) – System-generated key for a deployed process definition.
    Example: 2251799813686749.
  * **body** (*GetProcessDefinitionStatisticsData* *|* *Unset*) – Process definition element statistics
    request.
  * **data** (*GetProcessDefinitionStatisticsData* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetProcessDefinitionStatisticsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetProcessDefinitionStatisticsUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetProcessDefinitionStatisticsForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetProcessDefinitionStatisticsInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  GetProcessDefinitionStatisticsResponse200
* **Return type:**
  GetProcessDefinitionStatisticsResponse200

### get_process_definition_xml()

```python
async def get_process_definition_xml(process_definition_key, \*\*kwargs)
```

Get process definition XML

> Returns process definition as XML.
* **Parameters:**
  * **process_definition_key** (*str*) – System-generated key for a deployed process definition.
    Example: 2251799813686749.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetProcessDefinitionXmlBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetProcessDefinitionXmlUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetProcessDefinitionXmlForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetProcessDefinitionXmlNotFound** – If the response status code is 404. The process definition with the given key was not found. More details are provided in the response body.
  * **errors.GetProcessDefinitionXmlInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  str
* **Return type:**
  str

### get_process_instance()

```python
async def get_process_instance(process_instance_key, \*\*kwargs)
```

Get process instance

> Get the process instance by the process instance key.
* **Parameters:**
  * **process_instance_key** (*str*) – System-generated key for a process instance. Example:
    2251799813690746.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetProcessInstanceBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetProcessInstanceUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetProcessInstanceForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetProcessInstanceNotFound** – If the response status code is 404. The process instance with the given key was not found.
  * **errors.GetProcessInstanceInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  GetProcessInstanceResponse200
* **Return type:**
  GetProcessInstanceResponse200

### get_process_instance_call_hierarchy()

```python
async def get_process_instance_call_hierarchy(process_instance_key, \*\*kwargs)
```

Get call hierarchy

> Returns the call hierarchy for a given process instance, showing its ancestry up to the root

instance.

* **Parameters:**
  * **process_instance_key** (*str*) – System-generated key for a process instance. Example:
    2251799813690746.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetProcessInstanceCallHierarchyBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetProcessInstanceCallHierarchyUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetProcessInstanceCallHierarchyForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetProcessInstanceCallHierarchyNotFound** – If the response status code is 404. The process instance is not found.
  * **errors.GetProcessInstanceCallHierarchyInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  list[Any]
* **Return type:**
  list[Any]

### get_process_instance_sequence_flows()

```python
async def get_process_instance_sequence_flows(process_instance_key, \*\*kwargs)
```

Get sequence flows

> Get sequence flows taken by the process instance.
* **Parameters:**
  * **process_instance_key** (*str*) – System-generated key for a process instance. Example:
    2251799813690746.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetProcessInstanceSequenceFlowsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetProcessInstanceSequenceFlowsUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetProcessInstanceSequenceFlowsForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetProcessInstanceSequenceFlowsInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  GetProcessInstanceSequenceFlowsResponse200
* **Return type:**
  GetProcessInstanceSequenceFlowsResponse200

### get_process_instance_statistics()

```python
async def get_process_instance_statistics(process_instance_key, \*\*kwargs)
```

Get element instance statistics

> Get statistics about elements by the process instance key.
* **Parameters:**
  * **process_instance_key** (*str*) – System-generated key for a process instance. Example:
    2251799813690746.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetProcessInstanceStatisticsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetProcessInstanceStatisticsUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetProcessInstanceStatisticsForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetProcessInstanceStatisticsInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  GetProcessInstanceStatisticsResponse200
* **Return type:**
  GetProcessInstanceStatisticsResponse200

### get_process_instance_statistics_by_definition()

```python
async def get_process_instance_statistics_by_definition(, data, \*\*kwargs)
```

Get process instance statistics by definition

> Returns statistics for active process instances with incidents, grouped by process

definition. The result set is scoped to a specific incident error hash code, which must be
provided as a filter in the request body.

* **Parameters:**
  * **body** (*IncidentProcessInstanceStatisticsByDefinitionQuery*)
  * **data** (*IncidentProcessInstanceStatisticsByDefinitionQuery*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetProcessInstanceStatisticsByDefinitionBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetProcessInstanceStatisticsByDefinitionUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetProcessInstanceStatisticsByDefinitionForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetProcessInstanceStatisticsByDefinitionInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  IncidentProcessInstanceStatisticsByDefinitionQueryResult
* **Return type:**
  IncidentProcessInstanceStatisticsByDefinitionQueryResult

### get_process_instance_statistics_by_error()

```python
async def get_process_instance_statistics_by_error(\*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Get process instance statistics by error

> Returns statistics for active process instances that currently have active incidents,

grouped by incident error hash code.

* **Parameters:**
  * **body** (*IncidentProcessInstanceStatisticsByErrorQuery* *|* *Unset*)
  * **data** (*IncidentProcessInstanceStatisticsByErrorQuery* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetProcessInstanceStatisticsByErrorBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetProcessInstanceStatisticsByErrorUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetProcessInstanceStatisticsByErrorForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetProcessInstanceStatisticsByErrorInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  IncidentProcessInstanceStatisticsByErrorQueryResult
* **Return type:**
  IncidentProcessInstanceStatisticsByErrorQueryResult

### get_resource()

```python
async def get_resource(resource_key, \*\*kwargs)
```

Get resource

> Returns a deployed resource.

:::info
Currently, this endpoint only supports RPA resources.
:::
* **resource_key**: The system-assigned key for this resource.
```

* **Raises:**
  * **errors.GetResourceNotFound** – If the response status code is 404. A resource with the given key was not found.
  * **errors.GetResourceInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  ResourceResult
* **Parameters:**
  * **resource_key** (*str*)
  * **kwargs** (*Any*)
* **Return type:**
  ResourceResult

### get_resource_content()

```python
async def get_resource_content(resource_key, \*\*kwargs)
```

Get resource content

> Returns the content of a deployed resource.

:::info
Currently, this endpoint only supports RPA resources.
:::
* **resource_key**: The system-assigned key for this resource.
```

* **Raises:**
  * **errors.GetResourceContentNotFound** – If the response status code is 404. A resource with the given key was not found.
  * **errors.GetResourceContentInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  File
* **Parameters:**
  * **resource_key** (*str*)
  * **kwargs** (*Any*)
* **Return type:**
  File

### get_role()

```python
async def get_role(role_id, \*\*kwargs)
```

Get role

> Get a role by its ID.
* **Parameters:**
  * **role_id** (*str*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetRoleUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetRoleForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetRoleNotFound** – If the response status code is 404. The role with the given ID was not found.
  * **errors.GetRoleInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  RoleResult
* **Return type:**
  RoleResult

### get_start_process_form()

```python
async def get_start_process_form(process_definition_key, \*\*kwargs)
```

Get process start form

> Get the start form of a process.

Note that this endpoint will only return linked forms. This endpoint does not support embedded
forms.

* **Parameters:**
  * **process_definition_key** (*str*) – System-generated key for a deployed process definition.
    Example: 2251799813686749.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetStartProcessFormBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetStartProcessFormUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetStartProcessFormForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetStartProcessFormNotFound** – If the response status code is 404. Not found
  * **errors.GetStartProcessFormInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  GetStartProcessFormResponse200
* **Return type:**
  GetStartProcessFormResponse200

### get_tenant()

```python
async def get_tenant(tenant_id, \*\*kwargs)
```

Get tenant

> Retrieves a single tenant by tenant ID.
* **Parameters:**
  * **tenant_id** (*str*) – The unique identifier of the tenant. Example: customer-service.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetTenantBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetTenantUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetTenantForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetTenantNotFound** – If the response status code is 404. Tenant not found.
  * **errors.GetTenantInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  TenantResult
* **Return type:**
  TenantResult

### get_tenant_cluster_variable()

```python
async def get_tenant_cluster_variable(tenant_id, name, \*\*kwargs)
```

Get a tenant-scoped cluster variable

* **Parameters:**
  * **tenant_id** (*str*) – The unique identifier of the tenant. Example: customer-service.
  * **name** (*str*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetTenantClusterVariableBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetTenantClusterVariableUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetTenantClusterVariableForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetTenantClusterVariableNotFound** – If the response status code is 404. Cluster variable not found
  * **errors.GetTenantClusterVariableInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  ClusterVariableResult
* **Return type:**
  ClusterVariableResult

### get_topology()

```python
async def get_topology(\*\*kwargs)
```

Get cluster topology

> Obtains the current topology of the cluster the gateway is part of.
* **Raises:**
  * **errors.GetTopologyUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetTopologyInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  TopologyResponse
* **Parameters:**
  **kwargs** (*Any*)
* **Return type:**
  TopologyResponse

### Examples

**Get cluster topology:**

```python
def get_topology_example() -> None:
    client = CamundaClient()

    topology = client.get_topology()

    print(f"Cluster size: {topology.cluster_size}")
    print(f"Partitions: {topology.partitions_count}")
    for broker in topology.brokers:
        print(f"  Broker {broker.node_id}: {broker.host}:{broker.port}")
```

### get_usage_metrics()

```python
async def get_usage_metrics(\*, start_time, end_time, tenant_id=<camunda_orchestration_sdk.types.Unset object>, with_tenants=False, \*\*kwargs)
```

Get usage metrics

> Retrieve the usage metrics based on given criteria.
* **Parameters:**
  * **start_time** (*datetime.datetime*) – Example: 2025-06-07T13:14:15Z.
  * **end_time** (*datetime.datetime*) – Example: 2025-06-07T13:14:15Z.
  * **tenant_id** (*str* *|* *Unset*) – The unique identifier of the tenant. Example: customer-service.
  * **with_tenants** (*bool* *|* *Unset*) – Default: False.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetUsageMetricsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetUsageMetricsUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetUsageMetricsForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetUsageMetricsInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  UsageMetricsResponse
* **Return type:**
  UsageMetricsResponse

### get_user()

```python
async def get_user(username, \*\*kwargs)
```

Get user

> Get a user by its username.
* **Parameters:**
  * **username** (*str*) – The unique name of a user. Example: swillis.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetUserUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetUserForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetUserNotFound** – If the response status code is 404. The user with the given username was not found.
  * **errors.GetUserInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  UserResult
* **Return type:**
  UserResult

### get_user_task()

```python
async def get_user_task(user_task_key, \*\*kwargs)
```

Get user task

> Get the user task by the user task key.
* **Parameters:**
  * **user_task_key** (*str*) – System-generated key for a user task.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetUserTaskBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetUserTaskUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetUserTaskForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetUserTaskNotFound** – If the response status code is 404. The user task with the given key was not found.
  * **errors.GetUserTaskInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  GetUserTaskResponse200
* **Return type:**
  GetUserTaskResponse200

### Examples

**Get a user task:**

```python
def get_user_task_example() -> None:
    client = CamundaClient()

    task = client.get_user_task(user_task_key=UserTaskKey("123456"))

    print(f"Task: {task.user_task_key}")
```

### get_user_task_form()

```python
async def get_user_task_form(user_task_key, \*\*kwargs)
```

Get user task form

> Get the form of a user task.

Note that this endpoint will only return linked forms. This endpoint does not support embedded
forms.

* **Parameters:**
  * **user_task_key** (*str*) – System-generated key for a user task.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetUserTaskFormBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetUserTaskFormUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetUserTaskFormForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetUserTaskFormNotFound** – If the response status code is 404. Not found
  * **errors.GetUserTaskFormInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  GetUserTaskFormResponse200
* **Return type:**
  GetUserTaskFormResponse200

### get_variable()

```python
async def get_variable(variable_key, \*\*kwargs)
```

Get variable

> Get the variable by the variable key.
* **Parameters:**
  * **variable_key** (*str*) – System-generated key for a variable. Example: 2251799813683287.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.GetVariableBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.GetVariableUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.GetVariableForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.GetVariableNotFound** – If the response status code is 404. Not found
  * **errors.GetVariableInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  VariableResult
* **Return type:**
  VariableResult

### migrate_process_instance()

```python
async def migrate_process_instance(process_instance_key, , data, \*\*kwargs)
```

Migrate process instance

> Migrates a process instance to a new process definition.

This request can contain multiple mapping instructions to define mapping between the active
process instance’s elements and target process definition elements.

Use this to upgrade a process instance to a new version of a process or to
a different process definition, e.g. to keep your running instances up-to-date with the
latest process improvements.

* **Parameters:**
  * **process_instance_key** (*str*) – System-generated key for a process instance. Example:
    2251799813690746.
  * **body** (*MigrateProcessInstanceData*) – The migration instructions describe how to migrate a
    process instance from one process definition to another.
  * **data** (*MigrateProcessInstanceData*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.MigrateProcessInstanceBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.MigrateProcessInstanceNotFound** – If the response status code is 404. The process instance is not found.
  * **errors.MigrateProcessInstanceConflict** – If the response status code is 409. The process instance migration failed. More details are provided in the response body.
  * **errors.MigrateProcessInstanceInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.MigrateProcessInstanceServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### migrate_process_instances_batch_operation()

```python
async def migrate_process_instances_batch_operation(, data, \*\*kwargs)
```

Migrate process instances (batch)

> Migrate multiple process instances.

Since only process instances with ACTIVE state can be migrated, any given
filters for state are ignored and overridden during this batch operation.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the
response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

* **Parameters:**
  * **body** (*MigrateProcessInstancesBatchOperationData*)
  * **data** (*MigrateProcessInstancesBatchOperationData*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.MigrateProcessInstancesBatchOperationBadRequest** – If the response status code is 400. The process instance batch operation failed. More details are provided in the response body.
  * **errors.MigrateProcessInstancesBatchOperationUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.MigrateProcessInstancesBatchOperationForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.MigrateProcessInstancesBatchOperationInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  BatchOperationCreatedResult
* **Return type:**
  BatchOperationCreatedResult

### modify_process_instance()

```python
async def modify_process_instance(process_instance_key, , data, \*\*kwargs)
```

Modify process instance

> Modifies a running process instance.

This request can contain multiple instructions to activate an element of the process or
to terminate an active instance of an element.

Use this to repair a process instance that is stuck on an element or took an unintended path.
For example, because an external system is not available or doesn’t respond as expected.

* **Parameters:**
  * **process_instance_key** (*str*) – System-generated key for a process instance. Example:
    2251799813690746.
  * **body** (*ModifyProcessInstanceData*)
  * **data** (*ModifyProcessInstanceData*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.ModifyProcessInstanceBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.ModifyProcessInstanceNotFound** – If the response status code is 404. The process instance is not found.
  * **errors.ModifyProcessInstanceInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.ModifyProcessInstanceServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### modify_process_instances_batch_operation()

```python
async def modify_process_instances_batch_operation(, data, \*\*kwargs)
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

* **Parameters:**
  * **body** (*ModifyProcessInstancesBatchOperationData*) – The process instance filter to define on
    which process instances tokens should be moved,
    and new element instances should be activated or terminated.
  * **data** (*ModifyProcessInstancesBatchOperationData*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.ModifyProcessInstancesBatchOperationBadRequest** – If the response status code is 400. The process instance batch operation failed. More details are provided in the response body.
  * **errors.ModifyProcessInstancesBatchOperationUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.ModifyProcessInstancesBatchOperationForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.ModifyProcessInstancesBatchOperationInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  BatchOperationCreatedResult
* **Return type:**
  BatchOperationCreatedResult

### pin_clock()

```python
async def pin_clock(, data, \*\*kwargs)
```

Pin internal clock (alpha)

> Set a precise, static time for the Zeebe engine’s internal clock.

When the clock is pinned, it remains at the specified time and does not advance.
To change the time, the clock must be pinned again with a new timestamp.

This endpoint is an alpha feature and may be subject to change
in future releases.

* **Parameters:**
  * **body** (*ClockPinRequest*)
  * **data** (*ClockPinRequest*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.PinClockBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.PinClockInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.PinClockServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### publish_message()

```python
async def publish_message(, data, \*\*kwargs)
```

Publish message

> Publishes a single message.

Messages are published to specific partitions computed from their correlation keys.
Messages can be buffered.
The endpoint does not wait for a correlation result.
Use the message correlation endpoint for such use cases.

* **Parameters:**
  * **body** (*MessagePublicationRequest*)
  * **data** (*MessagePublicationRequest*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.PublishMessageBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.PublishMessageInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.PublishMessageServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  PublishMessageResponse200
* **Return type:**
  PublishMessageResponse200

### Examples

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

    if not isinstance(result.message_key, Unset):
        print(f"Message key: {result.message_key}")
```

### reset_clock()

```python
async def reset_clock(\*\*kwargs)
```

Reset internal clock (alpha)

> Resets the Zeebe engine’s internal clock to the current system time, enabling it to tick in real-

time.
This operation is useful for returning the clock to
normal behavior after it has been pinned to a specific time.

This endpoint is an alpha feature and may be subject to change
in future releases.

* **Raises:**
  * **errors.ResetClockInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.ResetClockServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Parameters:**
  **kwargs** (*Any*)
* **Return type:**
  None

### resolve_incident()

```python
async def resolve_incident(incident_key, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Resolve incident

> Marks the incident as resolved; most likely a call to Update job will be necessary

to reset the job’s retries, followed by this call.

* **Parameters:**
  * **incident_key** (*str*) – System-generated key for a incident. Example: 2251799813689432.
  * **body** (*IncidentResolutionRequest* *|* *Unset*)
  * **data** (*IncidentResolutionRequest* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.ResolveIncidentBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.ResolveIncidentNotFound** – If the response status code is 404. The incident with the incidentKey is not found.
  * **errors.ResolveIncidentInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.ResolveIncidentServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### Examples

**Resolve an incident:**

```python
def resolve_incident_example() -> None:
    client = CamundaClient()

    client.resolve_incident(incident_key=IncidentKey("123456"))
```

### resolve_incidents_batch_operation()

```python
async def resolve_incidents_batch_operation(\*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Resolve related incidents (batch)

> Resolves multiple instances of process instances.

Since only process instances with ACTIVE state can have unresolved incidents, any given
filters for state are ignored and overridden during this batch operation.
This is done asynchronously, the progress can be tracked using the batchOperationKey from the
response and the batch operation status endpoint (/batch-operations/{batchOperationKey}).

* **Parameters:**
  * **body** (*ResolveIncidentsBatchOperationData* *|* *Unset*) – The process instance filter that
    defines which process instances should have their incidents resolved.
  * **data** (*ResolveIncidentsBatchOperationData* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.ResolveIncidentsBatchOperationBadRequest** – If the response status code is 400. The process instance batch operation failed. More details are provided in the response body.
  * **errors.ResolveIncidentsBatchOperationUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.ResolveIncidentsBatchOperationForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.ResolveIncidentsBatchOperationInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  BatchOperationCreatedResult
* **Return type:**
  BatchOperationCreatedResult

### resolve_process_instance_incidents()

```python
async def resolve_process_instance_incidents(process_instance_key, \*\*kwargs)
```

Resolve related incidents

> Creates a batch operation to resolve multiple incidents of a process instance.
* **Parameters:**
  * **process_instance_key** (*str*) – System-generated key for a process instance. Example:
    2251799813690746.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.ResolveProcessInstanceIncidentsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.ResolveProcessInstanceIncidentsUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.ResolveProcessInstanceIncidentsNotFound** – If the response status code is 404. The process instance is not found.
  * **errors.ResolveProcessInstanceIncidentsInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.ResolveProcessInstanceIncidentsServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  BatchOperationCreatedResult
* **Return type:**
  BatchOperationCreatedResult

### resume_batch_operation()

```python
async def resume_batch_operation(batch_operation_key, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Resume Batch operation

> Resumes a suspended batch operation.

This is done asynchronously, the progress can be tracked using the batch operation status endpoint
(/batch-operations/{batchOperationKey}).

* **Parameters:**
  * **batch_operation_key** (*str*) – System-generated key for an batch operation. Example:
    2251799813684321.
  * **body** (*Any* *|* *Unset*)
  * **data** (*Any* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.ResumeBatchOperationBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.ResumeBatchOperationForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.ResumeBatchOperationNotFound** – If the response status code is 404. Not found. The batch operation was not found.
  * **errors.ResumeBatchOperationInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.ResumeBatchOperationServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### run_workers()

```python
async def run_workers()
```

### search_audit_logs()

```python
async def search_audit_logs(\*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search audit logs

> Search for audit logs based on given criteria.
* **Parameters:**
  * **body** (*AuditLogSearchQueryRequest* *|* *Unset*) – Audit log search request.
  * **data** (*AuditLogSearchQueryRequest* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchAuditLogsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchAuditLogsUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchAuditLogsForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchAuditLogsInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  SearchAuditLogsResponse200
* **Return type:**
  SearchAuditLogsResponse200

### search_authorizations()

```python
async def search_authorizations(\*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search authorizations

> Search for authorizations based on given criteria.
* **Parameters:**
  * **body** (*AuthorizationSearchQuery* *|* *Unset*)
  * **data** (*AuthorizationSearchQuery* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchAuthorizationsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchAuthorizationsUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchAuthorizationsForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchAuthorizationsInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  AuthorizationSearchResult
* **Return type:**
  AuthorizationSearchResult

### search_batch_operation_items()

```python
async def search_batch_operation_items(\*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search batch operation items

> Search for batch operation items based on given criteria.
* **Parameters:**
  * **body** (*SearchBatchOperationItemsData* *|* *Unset*) – Batch operation item search request.
  * **data** (*SearchBatchOperationItemsData* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchBatchOperationItemsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchBatchOperationItemsInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  BatchOperationItemSearchQueryResult
* **Return type:**
  BatchOperationItemSearchQueryResult

### search_batch_operations()

```python
async def search_batch_operations(\*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search batch operations

> Search for batch operations based on given criteria.
* **Parameters:**
  * **body** (*SearchBatchOperationsData* *|* *Unset*) – Batch operation search request.
  * **data** (*SearchBatchOperationsData* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchBatchOperationsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchBatchOperationsInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  BatchOperationSearchQueryResult
* **Return type:**
  BatchOperationSearchQueryResult

### search_clients_for_group()

```python
async def search_clients_for_group(group_id, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search group clients

> Search clients assigned to a group.
* **Parameters:**
  * **group_id** (*str*)
  * **body** (*SearchClientsForGroupData* *|* *Unset*)
  * **data** (*SearchClientsForGroupData* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchClientsForGroupBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchClientsForGroupUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchClientsForGroupForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchClientsForGroupNotFound** – If the response status code is 404. The group with the given ID was not found.
  * **errors.SearchClientsForGroupInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  TenantClientSearchResult
* **Return type:**
  TenantClientSearchResult

### search_clients_for_role()

```python
async def search_clients_for_role(role_id, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search role clients

> Search clients with assigned role.
* **Parameters:**
  * **role_id** (*str*)
  * **body** (*SearchClientsForRoleData* *|* *Unset*)
  * **data** (*SearchClientsForRoleData* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchClientsForRoleBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchClientsForRoleUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchClientsForRoleForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchClientsForRoleNotFound** – If the response status code is 404. The role with the given ID was not found.
  * **errors.SearchClientsForRoleInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  TenantClientSearchResult
* **Return type:**
  TenantClientSearchResult

### search_clients_for_tenant()

```python
async def search_clients_for_tenant(tenant_id, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search clients for tenant

> Retrieves a filtered and sorted list of clients for a specified tenant.
* **Parameters:**
  * **tenant_id** (*str*) – The unique identifier of the tenant. Example: customer-service.
  * **body** (*SearchClientsForTenantData* *|* *Unset*)
  * **data** (*SearchClientsForTenantData* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  TenantClientSearchResult
* **Return type:**
  TenantClientSearchResult

### search_cluster_variables()

```python
async def search_cluster_variables(\*, data=<camunda_orchestration_sdk.types.Unset object>, truncate_values=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search for cluster variables based on given criteria. By default, long variable values in the
response are truncated.

* **Parameters:**
  * **truncate_values** (*bool* *|* *Unset*)
  * **body** (*ClusterVariableSearchQueryRequest* *|* *Unset*) – Cluster variable search query request.
  * **data** (*ClusterVariableSearchQueryRequest* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchClusterVariablesBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchClusterVariablesUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchClusterVariablesForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchClusterVariablesInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  ClusterVariableSearchQueryResult
* **Return type:**
  ClusterVariableSearchQueryResult

### search_correlated_message_subscriptions()

```python
async def search_correlated_message_subscriptions(\*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search correlated message subscriptions

> Search correlated message subscriptions based on given criteria.
* **Parameters:**
  * **body** (*CorrelatedMessageSubscriptionSearchQuery* *|* *Unset*)
  * **data** (*CorrelatedMessageSubscriptionSearchQuery* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchCorrelatedMessageSubscriptionsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchCorrelatedMessageSubscriptionsUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchCorrelatedMessageSubscriptionsForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchCorrelatedMessageSubscriptionsInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  CorrelatedMessageSubscriptionSearchQueryResult
* **Return type:**
  CorrelatedMessageSubscriptionSearchQueryResult

### search_decision_definitions()

```python
async def search_decision_definitions(\*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search decision definitions

> Search for decision definitions based on given criteria.
* **Parameters:**
  * **body** (*DecisionDefinitionSearchQuery* *|* *Unset*)
  * **data** (*DecisionDefinitionSearchQuery* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchDecisionDefinitionsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchDecisionDefinitionsUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchDecisionDefinitionsForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchDecisionDefinitionsInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  DecisionDefinitionSearchQueryResult
* **Return type:**
  DecisionDefinitionSearchQueryResult

### Examples

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
async def search_decision_instances(\*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search decision instances

> Search for decision instances based on given criteria.
* **Parameters:**
  * **body** (*DecisionInstanceSearchQuery* *|* *Unset*)
  * **data** (*DecisionInstanceSearchQuery* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchDecisionInstancesBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchDecisionInstancesUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchDecisionInstancesForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchDecisionInstancesInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  DecisionInstanceSearchQueryResult
* **Return type:**
  DecisionInstanceSearchQueryResult

### search_decision_requirements()

```python
async def search_decision_requirements(\*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search decision requirements

> Search for decision requirements based on given criteria.
* **Parameters:**
  * **body** (*DecisionRequirementsSearchQuery* *|* *Unset*)
  * **data** (*DecisionRequirementsSearchQuery* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchDecisionRequirementsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchDecisionRequirementsUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchDecisionRequirementsForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchDecisionRequirementsInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  DecisionRequirementsSearchQueryResult
* **Return type:**
  DecisionRequirementsSearchQueryResult

### search_element_instance_incidents()

```python
async def search_element_instance_incidents(element_instance_key, , data, \*\*kwargs)
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

* **Parameters:**
  * **element_instance_key** (*str*) – System-generated key for a element instance. Example:
    2251799813686789.
  * **body** (*IncidentSearchQuery*)
  * **data** (*IncidentSearchQuery*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchElementInstanceIncidentsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchElementInstanceIncidentsUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchElementInstanceIncidentsForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchElementInstanceIncidentsNotFound** – If the response status code is 404. The element instance with the given key was not found.
  * **errors.SearchElementInstanceIncidentsInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  IncidentSearchQueryResult
* **Return type:**
  IncidentSearchQueryResult

### search_element_instances()

```python
async def search_element_instances(\*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search element instances

> Search for element instances based on given criteria.
* **Parameters:**
  * **body** (*ElementInstanceSearchQuery* *|* *Unset*) – Element instance search request.
  * **data** (*ElementInstanceSearchQuery* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchElementInstancesBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchElementInstancesUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchElementInstancesForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchElementInstancesInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  ElementInstanceSearchQueryResult
* **Return type:**
  ElementInstanceSearchQueryResult

### search_group_ids_for_tenant()

```python
async def search_group_ids_for_tenant(tenant_id, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search groups for tenant

> Retrieves a filtered and sorted list of groups for a specified tenant.
* **Parameters:**
  * **tenant_id** (*str*) – The unique identifier of the tenant. Example: customer-service.
  * **body** (*SearchGroupIdsForTenantData* *|* *Unset*)
  * **data** (*SearchGroupIdsForTenantData* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  TenantGroupSearchResult
* **Return type:**
  TenantGroupSearchResult

### search_groups()

```python
async def search_groups(\*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search groups

> Search for groups based on given criteria.
* **Parameters:**
  * **body** (*GroupSearchQueryRequest* *|* *Unset*) – Group search request.
  * **data** (*GroupSearchQueryRequest* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchGroupsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchGroupsUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchGroupsForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchGroupsInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  GroupSearchQueryResult
* **Return type:**
  GroupSearchQueryResult

### search_groups_for_role()

```python
async def search_groups_for_role(role_id, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search role groups

> Search groups with assigned role.
* **Parameters:**
  * **role_id** (*str*)
  * **body** (*SearchGroupsForRoleData* *|* *Unset*)
  * **data** (*SearchGroupsForRoleData* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchGroupsForRoleBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchGroupsForRoleUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchGroupsForRoleForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchGroupsForRoleNotFound** – If the response status code is 404. The role with the given ID was not found.
  * **errors.SearchGroupsForRoleInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  RoleGroupSearchResult
* **Return type:**
  RoleGroupSearchResult

### search_incidents()

```python
async def search_incidents(\*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search incidents

> Search for incidents based on given criteria.
* **Parameters:**
  * **body** (*IncidentSearchQuery* *|* *Unset*)
  * **data** (*IncidentSearchQuery* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchIncidentsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchIncidentsUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchIncidentsForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchIncidentsInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  IncidentSearchQueryResult
* **Return type:**
  IncidentSearchQueryResult

### Examples

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
async def search_jobs(\*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search jobs

> Search for jobs based on given criteria.
* **Parameters:**
  * **body** (*JobSearchQuery* *|* *Unset*) – Job search request.
  * **data** (*JobSearchQuery* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchJobsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchJobsUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchJobsForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchJobsInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  SearchJobsResponse200
* **Return type:**
  SearchJobsResponse200

### search_mapping_rule()

```python
async def search_mapping_rule(\*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search mapping rules

> Search for mapping rules based on given criteria.
* **Parameters:**
  * **body** (*MappingRuleSearchQueryRequest* *|* *Unset*)
  * **data** (*MappingRuleSearchQueryRequest* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchMappingRuleBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchMappingRuleUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchMappingRuleForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchMappingRuleInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  MappingRuleSearchQueryResult
* **Return type:**
  MappingRuleSearchQueryResult

### search_mapping_rules_for_group()

```python
async def search_mapping_rules_for_group(group_id, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search group mapping rules

> Search mapping rules assigned to a group.
* **Parameters:**
  * **group_id** (*str*)
  * **body** (*MappingRuleSearchQueryRequest* *|* *Unset*)
  * **data** (*MappingRuleSearchQueryRequest* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchMappingRulesForGroupBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchMappingRulesForGroupUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchMappingRulesForGroupForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchMappingRulesForGroupNotFound** – If the response status code is 404. The group with the given ID was not found.
  * **errors.SearchMappingRulesForGroupInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  SearchQueryResponse
* **Return type:**
  SearchQueryResponse

### search_mapping_rules_for_role()

```python
async def search_mapping_rules_for_role(role_id, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search role mapping rules

> Search mapping rules with assigned role.
* **Parameters:**
  * **role_id** (*str*)
  * **body** (*MappingRuleSearchQueryRequest* *|* *Unset*)
  * **data** (*MappingRuleSearchQueryRequest* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchMappingRulesForRoleBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchMappingRulesForRoleUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchMappingRulesForRoleForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchMappingRulesForRoleNotFound** – If the response status code is 404. The role with the given ID was not found.
  * **errors.SearchMappingRulesForRoleInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  SearchQueryResponse
* **Return type:**
  SearchQueryResponse

### search_mapping_rules_for_tenant()

```python
async def search_mapping_rules_for_tenant(tenant_id, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search mapping rules for tenant

> Retrieves a filtered and sorted list of MappingRules for a specified tenant.
* **Parameters:**
  * **tenant_id** (*str*) – The unique identifier of the tenant. Example: customer-service.
  * **body** (*MappingRuleSearchQueryRequest* *|* *Unset*)
  * **data** (*MappingRuleSearchQueryRequest* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  SearchQueryResponse
* **Return type:**
  SearchQueryResponse

### search_message_subscriptions()

```python
async def search_message_subscriptions(\*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search message subscriptions

> Search for message subscriptions based on given criteria.
* **Parameters:**
  * **body** (*SearchMessageSubscriptionsData* *|* *Unset*)
  * **data** (*SearchMessageSubscriptionsData* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchMessageSubscriptionsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchMessageSubscriptionsUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchMessageSubscriptionsForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchMessageSubscriptionsInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  SearchMessageSubscriptionsResponse200
* **Return type:**
  SearchMessageSubscriptionsResponse200

### search_process_definitions()

```python
async def search_process_definitions(\*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search process definitions

> Search for process definitions based on given criteria.
* **Parameters:**
  * **body** (*SearchProcessDefinitionsData* *|* *Unset*)
  * **data** (*SearchProcessDefinitionsData* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchProcessDefinitionsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchProcessDefinitionsUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchProcessDefinitionsForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchProcessDefinitionsInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  ProcessDefinitionSearchQueryResult
* **Return type:**
  ProcessDefinitionSearchQueryResult

### search_process_instance_incidents()

```python
async def search_process_instance_incidents(process_instance_key, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
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

* **Parameters:**
  * **process_instance_key** (*str*) – System-generated key for a process instance. Example:
    2251799813690746.
  * **body** (*IncidentSearchQuery* *|* *Unset*)
  * **data** (*IncidentSearchQuery* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchProcessInstanceIncidentsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchProcessInstanceIncidentsUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchProcessInstanceIncidentsForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchProcessInstanceIncidentsNotFound** – If the response status code is 404. The process instance with the given key was not found.
  * **errors.SearchProcessInstanceIncidentsInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  IncidentSearchQueryResult
* **Return type:**
  IncidentSearchQueryResult

### search_process_instances()

```python
async def search_process_instances(\*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search process instances

> Search for process instances based on given criteria.
* **Parameters:**
  * **body** (*SearchProcessInstancesData* *|* *Unset*) – Process instance search request.
  * **data** (*SearchProcessInstancesData* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchProcessInstancesBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchProcessInstancesUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchProcessInstancesForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchProcessInstancesInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  SearchProcessInstancesResponse200
* **Return type:**
  SearchProcessInstancesResponse200

### Examples

**Search process instances:**

```python
def search_process_instances_example() -> None:
    client = CamundaClient()

    result = client.search_process_instances(
        data=SearchProcessInstancesData(
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
async def search_roles(\*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search roles

> Search for roles based on given criteria.
* **Parameters:**
  * **body** (*RoleSearchQueryRequest* *|* *Unset*) – Role search request.
  * **data** (*RoleSearchQueryRequest* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchRolesBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchRolesUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchRolesForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchRolesInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  RoleSearchQueryResult
* **Return type:**
  RoleSearchQueryResult

### search_roles_for_group()

```python
async def search_roles_for_group(group_id, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search group roles

> Search roles assigned to a group.
* **Parameters:**
  * **group_id** (*str*)
  * **body** (*RoleSearchQueryRequest* *|* *Unset*) – Role search request.
  * **data** (*RoleSearchQueryRequest* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchRolesForGroupBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchRolesForGroupUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchRolesForGroupForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchRolesForGroupNotFound** – If the response status code is 404. The group with the given ID was not found.
  * **errors.SearchRolesForGroupInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  SearchQueryResponse
* **Return type:**
  SearchQueryResponse

### search_roles_for_tenant()

```python
async def search_roles_for_tenant(tenant_id, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search roles for tenant

> Retrieves a filtered and sorted list of roles for a specified tenant.
* **Parameters:**
  * **tenant_id** (*str*) – The unique identifier of the tenant. Example: customer-service.
  * **body** (*RoleSearchQueryRequest* *|* *Unset*) – Role search request.
  * **data** (*RoleSearchQueryRequest* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  SearchQueryResponse
* **Return type:**
  SearchQueryResponse

### search_tenants()

```python
async def search_tenants(\*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search tenants

> Retrieves a filtered and sorted list of tenants.
* **Parameters:**
  * **body** (*SearchTenantsData* *|* *Unset*) – Tenant search request
  * **data** (*SearchTenantsData* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchTenantsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchTenantsUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchTenantsForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchTenantsNotFound** – If the response status code is 404. Not found
  * **errors.SearchTenantsInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  TenantSearchQueryResult
* **Return type:**
  TenantSearchQueryResult

### search_user_task_audit_logs()

```python
async def search_user_task_audit_logs(user_task_key, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search user task audit logs

> Search for user task audit logs based on given criteria.
* **Parameters:**
  * **user_task_key** (*str*) – System-generated key for a user task.
  * **body** (*SearchUserTaskAuditLogsData* *|* *Unset*) – User task search query request.
  * **data** (*SearchUserTaskAuditLogsData* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchUserTaskAuditLogsBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchUserTaskAuditLogsInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  SearchUserTaskAuditLogsResponse200
* **Return type:**
  SearchUserTaskAuditLogsResponse200

### search_user_task_variables()

```python
async def search_user_task_variables(user_task_key, \*, data=<camunda_orchestration_sdk.types.Unset object>, truncate_values=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search user task variables

> Search for user task variables based on given criteria. By default, long variable values in the

response are truncated.

* **Parameters:**
  * **user_task_key** (*str*) – System-generated key for a user task.
  * **truncate_values** (*bool* *|* *Unset*)
  * **body** (*SearchUserTaskVariablesData* *|* *Unset*) – User task search query request.
  * **data** (*SearchUserTaskVariablesData* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchUserTaskVariablesBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchUserTaskVariablesInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  VariableSearchQueryResult
* **Return type:**
  VariableSearchQueryResult

### search_user_tasks()

```python
async def search_user_tasks(\*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search user tasks

> Search for user tasks based on given criteria.
* **Parameters:**
  * **body** (*SearchUserTasksData* *|* *Unset*) – User task search query request.
  * **data** (*SearchUserTasksData* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchUserTasksBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchUserTasksUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchUserTasksForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchUserTasksInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  SearchUserTasksResponse200
* **Return type:**
  SearchUserTasksResponse200

### Examples

**Search user tasks:**

```python
def search_user_tasks_example() -> None:
    client = CamundaClient()

    result = client.search_user_tasks(
        data=SearchUserTasksData()
    )

    if not isinstance(result.items, Unset):
        for task in result.items:
            print(f"Task: {task.user_task_key}")
```

### search_users()

```python
async def search_users(\*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search users

> Search for users based on given criteria.
* **Parameters:**
  * **body** (*SearchUsersData* *|* *Unset*)
  * **data** (*SearchUsersData* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchUsersBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchUsersUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchUsersForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchUsersInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  UserSearchResult
* **Return type:**
  UserSearchResult

### search_users_for_group()

```python
async def search_users_for_group(group_id, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search group users

> Search users assigned to a group.
* **Parameters:**
  * **group_id** (*str*)
  * **body** (*SearchUsersForGroupData* *|* *Unset*)
  * **data** (*SearchUsersForGroupData* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchUsersForGroupBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchUsersForGroupUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchUsersForGroupForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchUsersForGroupNotFound** – If the response status code is 404. The group with the given ID was not found.
  * **errors.SearchUsersForGroupInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  TenantUserSearchResult
* **Return type:**
  TenantUserSearchResult

### search_users_for_role()

```python
async def search_users_for_role(role_id, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search role users

> Search users with assigned role.
* **Parameters:**
  * **role_id** (*str*)
  * **body** (*SearchUsersForRoleData* *|* *Unset*)
  * **data** (*SearchUsersForRoleData* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchUsersForRoleBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchUsersForRoleUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchUsersForRoleForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchUsersForRoleNotFound** – If the response status code is 404. The role with the given ID was not found.
  * **errors.SearchUsersForRoleInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  TenantUserSearchResult
* **Return type:**
  TenantUserSearchResult

### search_users_for_tenant()

```python
async def search_users_for_tenant(tenant_id, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search users for tenant

> Retrieves a filtered and sorted list of users for a specified tenant.
* **Parameters:**
  * **tenant_id** (*str*) – The unique identifier of the tenant. Example: customer-service.
  * **body** (*SearchUsersForTenantData* *|* *Unset*)
  * **data** (*SearchUsersForTenantData* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  TenantUserSearchResult
* **Return type:**
  TenantUserSearchResult

### search_variables()

```python
async def search_variables(\*, data=<camunda_orchestration_sdk.types.Unset object>, truncate_values=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Search variables

> Search for process and local variables based on given criteria. By default, long variable values in

the response are truncated.

* **Parameters:**
  * **truncate_values** (*bool* *|* *Unset*)
  * **body** (*SearchVariablesData* *|* *Unset*) – Variable search query request.
  * **data** (*SearchVariablesData* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SearchVariablesBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SearchVariablesUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.SearchVariablesForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SearchVariablesInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  VariableSearchQueryResult
* **Return type:**
  VariableSearchQueryResult

### suspend_batch_operation()

```python
async def suspend_batch_operation(batch_operation_key, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Suspend Batch operation

> Suspends a running batch operation.

This is done asynchronously, the progress can be tracked using the batch operation status endpoint
(/batch-operations/{batchOperationKey}).

* **Parameters:**
  * **batch_operation_key** (*str*) – System-generated key for an batch operation. Example:
    2251799813684321.
  * **body** (*Any* *|* *Unset*)
  * **data** (*Any* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.SuspendBatchOperationBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.SuspendBatchOperationForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.SuspendBatchOperationNotFound** – If the response status code is 404. Not found. The batch operation was not found.
  * **errors.SuspendBatchOperationInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.SuspendBatchOperationServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### throw_job_error()

```python
async def throw_job_error(job_key, , data, \*\*kwargs)
```

Throw error for job

> Reports a business error (i.e. non-technical) that occurs while processing a job.
* **Parameters:**
  * **job_key** (*str*) – System-generated key for a job. Example: 2251799813653498.
  * **body** (*JobErrorRequest*)
  * **data** (*JobErrorRequest*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.ThrowJobErrorBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.ThrowJobErrorNotFound** – If the response status code is 404. The job with the given key was not found or is not activated.
  * **errors.ThrowJobErrorConflict** – If the response status code is 409. The job with the given key is in the wrong state currently. More details are provided in the response body.
  * **errors.ThrowJobErrorInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.ThrowJobErrorServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### unassign_client_from_group()

```python
async def unassign_client_from_group(group_id, client_id, \*\*kwargs)
```

Unassign a client from a group

> Unassigns a client from a group.

The client is removed as a group member, with associated authorizations, roles, and tenant
assignments no longer applied.

* **Parameters:**
  * **group_id** (*str*)
  * **client_id** (*str*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.UnassignClientFromGroupBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.UnassignClientFromGroupForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.UnassignClientFromGroupNotFound** – If the response status code is 404. The group with the given ID was not found, or the client is not assigned to this group.
  * **errors.UnassignClientFromGroupInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnassignClientFromGroupServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### unassign_client_from_tenant()

```python
async def unassign_client_from_tenant(tenant_id, client_id, \*\*kwargs)
```

Unassign a client from a tenant

> Unassigns the client from the specified tenant.

The client can no longer access tenant data.

* **Parameters:**
  * **tenant_id** (*str*) – The unique identifier of the tenant. Example: customer-service.
  * **client_id** (*str*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.UnassignClientFromTenantBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.UnassignClientFromTenantForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.UnassignClientFromTenantNotFound** – If the response status code is 404. The tenant does not exist or the client was not assigned to it.
  * **errors.UnassignClientFromTenantInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnassignClientFromTenantServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### unassign_group_from_tenant()

```python
async def unassign_group_from_tenant(tenant_id, group_id, \*\*kwargs)
```

Unassign a group from a tenant

> Unassigns a group from a specified tenant.

Members of the group (users, clients) will no longer have access to the tenant’s data - except they
are assigned directly to the tenant.

* **Parameters:**
  * **tenant_id** (*str*) – The unique identifier of the tenant. Example: customer-service.
  * **group_id** (*str*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.UnassignGroupFromTenantBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.UnassignGroupFromTenantForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.UnassignGroupFromTenantNotFound** – If the response status code is 404. Not found. The tenant or group was not found.
  * **errors.UnassignGroupFromTenantInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnassignGroupFromTenantServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### unassign_mapping_rule_from_group()

```python
async def unassign_mapping_rule_from_group(group_id, mapping_rule_id, \*\*kwargs)
```

Unassign a mapping rule from a group

> Unassigns a mapping rule from a group.
* **Parameters:**
  * **group_id** (*str*)
  * **mapping_rule_id** (*str*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.UnassignMappingRuleFromGroupBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.UnassignMappingRuleFromGroupForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.UnassignMappingRuleFromGroupNotFound** – If the response status code is 404. The group or mapping rule with the given ID was not found, or the mapping rule is not assigned to this group.
  * **errors.UnassignMappingRuleFromGroupInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnassignMappingRuleFromGroupServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### unassign_mapping_rule_from_tenant()

```python
async def unassign_mapping_rule_from_tenant(tenant_id, mapping_rule_id, \*\*kwargs)
```

Unassign a mapping rule from a tenant

> Unassigns a single mapping rule from a specified tenant without deleting the rule.
* **Parameters:**
  * **tenant_id** (*str*) – The unique identifier of the tenant. Example: customer-service.
  * **mapping_rule_id** (*str*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.UnassignMappingRuleFromTenantBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.UnassignMappingRuleFromTenantForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.UnassignMappingRuleFromTenantNotFound** – If the response status code is 404. Not found. The tenant or mapping rule was not found.
  * **errors.UnassignMappingRuleFromTenantInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnassignMappingRuleFromTenantServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### unassign_role_from_client()

```python
async def unassign_role_from_client(role_id, client_id, \*\*kwargs)
```

Unassign a role from a client

> Unassigns the specified role from the client. The client will no longer inherit the authorizations

associated with this role.

* **Parameters:**
  * **role_id** (*str*)
  * **client_id** (*str*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.UnassignRoleFromClientBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.UnassignRoleFromClientForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.UnassignRoleFromClientNotFound** – If the response status code is 404. The role or client with the given ID or username was not found.
  * **errors.UnassignRoleFromClientInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnassignRoleFromClientServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### unassign_role_from_group()

```python
async def unassign_role_from_group(role_id, group_id, \*\*kwargs)
```

Unassign a role from a group

> Unassigns the specified role from the group. All group members (user or client) no longer inherit

the authorizations associated with this role.

* **Parameters:**
  * **role_id** (*str*)
  * **group_id** (*str*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.UnassignRoleFromGroupBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.UnassignRoleFromGroupForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.UnassignRoleFromGroupNotFound** – If the response status code is 404. The role or group with the given ID was not found.
  * **errors.UnassignRoleFromGroupInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnassignRoleFromGroupServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### unassign_role_from_mapping_rule()

```python
async def unassign_role_from_mapping_rule(role_id, mapping_rule_id, \*\*kwargs)
```

Unassign a role from a mapping rule

> Unassigns a role from a mapping rule.
* **Parameters:**
  * **role_id** (*str*)
  * **mapping_rule_id** (*str*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.UnassignRoleFromMappingRuleBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.UnassignRoleFromMappingRuleForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.UnassignRoleFromMappingRuleNotFound** – If the response status code is 404. The role or mapping rule with the given ID was not found.
  * **errors.UnassignRoleFromMappingRuleInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnassignRoleFromMappingRuleServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### unassign_role_from_tenant()

```python
async def unassign_role_from_tenant(tenant_id, role_id, \*\*kwargs)
```

Unassign a role from a tenant

> Unassigns a role from a specified tenant.

Users, Clients or Groups, that have the role assigned, will no longer have access to the
tenant’s data - unless they are assigned directly to the tenant.

* **Parameters:**
  * **tenant_id** (*str*) – The unique identifier of the tenant. Example: customer-service.
  * **role_id** (*str*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.UnassignRoleFromTenantBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.UnassignRoleFromTenantForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.UnassignRoleFromTenantNotFound** – If the response status code is 404. Not found. The tenant or role was not found.
  * **errors.UnassignRoleFromTenantInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnassignRoleFromTenantServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### unassign_role_from_user()

```python
async def unassign_role_from_user(role_id, username, \*\*kwargs)
```

Unassign a role from a user

> Unassigns a role from a user. The user will no longer inherit the authorizations associated with

this role.

* **Parameters:**
  * **role_id** (*str*)
  * **username** (*str*) – The unique name of a user. Example: swillis.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.UnassignRoleFromUserBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.UnassignRoleFromUserForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.UnassignRoleFromUserNotFound** – If the response status code is 404. The role or user with the given ID or username was not found.
  * **errors.UnassignRoleFromUserInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnassignRoleFromUserServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### unassign_user_from_group()

```python
async def unassign_user_from_group(group_id, username, \*\*kwargs)
```

Unassign a user from a group

> Unassigns a user from a group.

The user is removed as a group member, with associated authorizations, roles, and tenant assignments
no longer applied.

* **Parameters:**
  * **group_id** (*str*)
  * **username** (*str*) – The unique name of a user. Example: swillis.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.UnassignUserFromGroupBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.UnassignUserFromGroupForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.UnassignUserFromGroupNotFound** – If the response status code is 404. The group or user with the given ID was not found, or the user is not assigned to this group.
  * **errors.UnassignUserFromGroupInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnassignUserFromGroupServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### unassign_user_from_tenant()

```python
async def unassign_user_from_tenant(tenant_id, username, \*\*kwargs)
```

Unassign a user from a tenant

> Unassigns the user from the specified tenant.

The user can no longer access tenant data.

* **Parameters:**
  * **tenant_id** (*str*) – The unique identifier of the tenant. Example: customer-service.
  * **username** (*str*) – The unique name of a user. Example: swillis.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.UnassignUserFromTenantBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.UnassignUserFromTenantForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.UnassignUserFromTenantNotFound** – If the response status code is 404. Not found. The tenant or user was not found.
  * **errors.UnassignUserFromTenantInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnassignUserFromTenantServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### unassign_user_task()

```python
async def unassign_user_task(user_task_key, \*\*kwargs)
```

Unassign user task

> Removes the assignee of a task with the given key.
* **Parameters:**
  * **user_task_key** (*str*) – System-generated key for a user task.
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.UnassignUserTaskBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.UnassignUserTaskNotFound** – If the response status code is 404. The user task with the given key was not found.
  * **errors.UnassignUserTaskConflict** – If the response status code is 409. The user task with the given key is in the wrong state currently. More details are provided in the response body.
  * **errors.UnassignUserTaskInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnassignUserTaskServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### Examples

**Unassign a user task:**

```python
def unassign_user_task_example() -> None:
    client = CamundaClient()

    client.unassign_user_task(user_task_key=UserTaskKey("123456"))
```

### update_authorization()

```python
async def update_authorization(authorization_key, , data, \*\*kwargs)
```

Update authorization

> Update the authorization with the given key.
* **Parameters:**
  * **authorization_key** (*str*) – System-generated key for an authorization. Example:
    2251799813684332.
  * **body** (*AuthorizationIdBasedRequest* *|* *AuthorizationPropertyBasedRequest*)
  * **data** (*AuthorizationIdBasedRequest* *|* *AuthorizationPropertyBasedRequest*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.UpdateAuthorizationUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.UpdateAuthorizationNotFound** – If the response status code is 404. The authorization with the authorizationKey was not found.
  * **errors.UpdateAuthorizationInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UpdateAuthorizationServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### update_global_cluster_variable()

```python
async def update_global_cluster_variable(name, , data, \*\*kwargs)
```

Update a global-scoped cluster variable

> Updates the value of an existing global cluster variable.

The variable must exist, otherwise a 404 error is returned.

* **Parameters:**
  * **name** (*str*)
  * **body** (*UpdateClusterVariableRequest*)
  * **data** (*UpdateClusterVariableRequest*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.UpdateGlobalClusterVariableBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.UpdateGlobalClusterVariableUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.UpdateGlobalClusterVariableForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.UpdateGlobalClusterVariableNotFound** – If the response status code is 404. Cluster variable not found
  * **errors.UpdateGlobalClusterVariableInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  ClusterVariableResult
* **Return type:**
  ClusterVariableResult

### update_group()

```python
async def update_group(group_id, , data, \*\*kwargs)
```

Update group

> Update a group with the given ID.
* **Parameters:**
  * **group_id** (*str*)
  * **body** (*GroupUpdateRequest*)
  * **data** (*GroupUpdateRequest*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.UpdateGroupBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.UpdateGroupUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.UpdateGroupNotFound** – If the response status code is 404. The group with the given ID was not found.
  * **errors.UpdateGroupInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UpdateGroupServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  GroupUpdateResult
* **Return type:**
  GroupUpdateResult

### update_job()

```python
async def update_job(job_key, , data, \*\*kwargs)
```

Update job

> Update a job with the given key.
* **Parameters:**
  * **job_key** (*str*) – System-generated key for a job. Example: 2251799813653498.
  * **body** (*JobUpdateRequest*)
  * **data** (*JobUpdateRequest*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.UpdateJobBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.UpdateJobNotFound** – If the response status code is 404. The job with the jobKey is not found.
  * **errors.UpdateJobConflict** – If the response status code is 409. The job with the given key is in the wrong state currently. More details are provided in the response body.
  * **errors.UpdateJobInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UpdateJobServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### update_mapping_rule()

```python
async def update_mapping_rule(mapping_rule_id, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Update mapping rule

> Update a mapping rule.
* **Parameters:**
  * **mapping_rule_id** (*str*)
  * **body** (*MappingRuleUpdateRequest* *|* *Unset*)
  * **data** (*MappingRuleUpdateRequest* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.UpdateMappingRuleBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.UpdateMappingRuleForbidden** – If the response status code is 403. The request to update a mapping rule was denied. More details are provided in the response body.
  * **errors.UpdateMappingRuleNotFound** – If the response status code is 404. The request to update a mapping rule was denied.
  * **errors.UpdateMappingRuleInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UpdateMappingRuleServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  MappingRuleUpdateResult
* **Return type:**
  MappingRuleUpdateResult

### update_role()

```python
async def update_role(role_id, , data, \*\*kwargs)
```

Update role

> Update a role with the given ID.
* **Parameters:**
  * **role_id** (*str*)
  * **body** (*RoleUpdateRequest*)
  * **data** (*RoleUpdateRequest*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.UpdateRoleBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.UpdateRoleUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.UpdateRoleNotFound** – If the response status code is 404. The role with the ID is not found.
  * **errors.UpdateRoleInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UpdateRoleServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  RoleUpdateResult
* **Return type:**
  RoleUpdateResult

### update_tenant()

```python
async def update_tenant(tenant_id, , data, \*\*kwargs)
```

Update tenant

> Updates an existing tenant.
* **Parameters:**
  * **tenant_id** (*str*) – The unique identifier of the tenant. Example: customer-service.
  * **body** (*TenantUpdateRequest*)
  * **data** (*TenantUpdateRequest*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.UpdateTenantBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.UpdateTenantForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.UpdateTenantNotFound** – If the response status code is 404. Not found. The tenant was not found.
  * **errors.UpdateTenantInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UpdateTenantServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  TenantUpdateResult
* **Return type:**
  TenantUpdateResult

### update_tenant_cluster_variable()

```python
async def update_tenant_cluster_variable(tenant_id, name, , data, \*\*kwargs)
```

Update a tenant-scoped cluster variable

> Updates the value of an existing tenant-scoped cluster variable.

The variable must exist, otherwise a 404 error is returned.

* **Parameters:**
  * **tenant_id** (*str*) – The unique identifier of the tenant. Example: customer-service.
  * **name** (*str*)
  * **body** (*UpdateClusterVariableRequest*)
  * **data** (*UpdateClusterVariableRequest*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.UpdateTenantClusterVariableBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.UpdateTenantClusterVariableUnauthorized** – If the response status code is 401. The request lacks valid authentication credentials.
  * **errors.UpdateTenantClusterVariableForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.UpdateTenantClusterVariableNotFound** – If the response status code is 404. Cluster variable not found
  * **errors.UpdateTenantClusterVariableInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  ClusterVariableResult
* **Return type:**
  ClusterVariableResult

### update_user()

```python
async def update_user(username, , data, \*\*kwargs)
```

Update user

> Updates a user.
* **Parameters:**
  * **username** (*str*) – The unique name of a user. Example: swillis.
  * **body** (*UserUpdateRequest*)
  * **data** (*UserUpdateRequest*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.UpdateUserBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.UpdateUserForbidden** – If the response status code is 403. Forbidden. The request is not allowed.
  * **errors.UpdateUserNotFound** – If the response status code is 404. The user was not found.
  * **errors.UpdateUserInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UpdateUserServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  UserResult
* **Return type:**
  UserResult

### update_user_task()

```python
async def update_user_task(user_task_key, \*, data=<camunda_orchestration_sdk.types.Unset object>, \*\*kwargs)
```

Update user task

> Update a user task with the given key.
* **Parameters:**
  * **user_task_key** (*str*) – System-generated key for a user task.
  * **body** (*UserTaskUpdateRequest* *|* *Unset*)
  * **data** (*UserTaskUpdateRequest* *|* *Unset*)
  * **kwargs** (*Any*)
* **Raises:**
  * **errors.UpdateUserTaskBadRequest** – If the response status code is 400. The provided data is not valid.
  * **errors.UpdateUserTaskNotFound** – If the response status code is 404. The user task with the given key was not found.
  * **errors.UpdateUserTaskConflict** – If the response status code is 409. The user task with the given key is in the wrong state currently. More details are provided in the response body.
  * **errors.UpdateUserTaskInternalServerError** – If the response status code is 500. An internal error occurred while processing the request.
  * **errors.UpdateUserTaskServiceUnavailable** – If the response status code is 503. The service is currently unavailable. This may happen only on some requests where the system creates backpressure to prevent the server’s compute resources from being exhausted, avoiding more severe failures. In this case, the title of the error object contains RESOURCE_EXHAUSTED. Clients are recommended to eventually retry those requests after a backoff period. You can learn more about the backpressure mechanism here: [internal processing](../../../components/zeebe/technical-concepts/internal-processing.md#handling-backpressure) .
  * **errors.UnexpectedStatus** – If the response status code is not documented.
  * **httpx.TimeoutException** – If the request takes longer than Client.timeout.
* **Returns:**
  None
* **Return type:**
  None

### Examples

**Update a user task:**

```python
def update_user_task_example() -> None:
    client = CamundaClient()

    client.update_user_task(
        user_task_key=UserTaskKey("123456"),
        data=UserTaskUpdateRequest(
            changeset=ChangesetType0(
                due_date=datetime.datetime(2025, 12, 31, 23, 59, 59),
            ),
        ),
    )
```
