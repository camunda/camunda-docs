---
id: limitations
title: Limitations
sidebar_label: Limitations
description: "Data Migrator limitations."
---

An overview of the current limitations of the Camunda 7 to Camunda 8 Data Migrator, covering general limitations as well as specific limitations related to variables and BPMN elements.

## Identity

The following requirements and limitations apply:

- Identity migration only includes the migration of:
  - Tenants and their associated memberships.
  - Supported authorizations (detailed in the [Authorizations](identity.md#authorizations) section).
- Users, groups and group memberships are not automatically migrated since they are usually retrieved from an IdP.
- Once migration has been triggered, it's strongly recommended not to create new identity data on Camunda 7. Even if migration is attempted again, the new data might not be migrated.
- In order for authorizations to work correctly after migration, process definitions, forms, DRD and decision definitions need to have the same IDs in Camunda 8 as in Camunda 7. This should be the case if you have already migrated runtime and history data.
- Tenant memberships are migrated as part of their respective tenants and not tracked individually. This means that if a tenant is migrated, all its memberships are migrated as well, and if a tenant is skipped, so will be its memberships. For this reason, if the migration of an individual tenant membership fails (for example, due to a missing user), it cannot be retried.

### Supported entities

| Identity type      | Migration supported |
| ------------------ | ------------------- |
| Users              | Retrieved from IdP. |
| Groups             | Retrieved from IdP. |
| Group Memberships  | Retrieved from IdP. |
| Tenants            | Yes                 |
| Tenant Memberships | Yes                 |

## Runtime

The runtime migration has the following limitations.

### General limitations

- To migrate running process instances, the historic process instance must exist.
  - You cannot migrate running instances when you have configured history level to `NONE` or a custom history level that doesn't create historic process instances.
  - The minimum supported history level is `ACTIVITY`.
- You must add an execution listener of type `migrator` to all your start events.
- Migration of users, groups, or tenants as well as authorizations is currently not supported.
  - You must ensure that the users, groups, and authorizations are already migrated to Camunda 8 before migrating process instances.
  - See https://github.com/camunda/camunda-bpm-platform/issues/5175
- Data changed via user operations
  - Data set via user operations like setting a due date to a user task cannot be migrated currently.
  - See https://github.com/camunda/camunda-bpm-platform/issues/5182

### Variables

- [Unsupported Camunda 7 types](../variables#unsupported-types).
- [Camunda 8 variable name restrictions](/components/concepts/variables.md#variable-values).
  - Variables that do not follow the restrictions will cause issues in FEEL expression evaluation.
- Variables set into the scope of embedded sub-processes are not supported yet and will be ignored.
  - See https://github.com/camunda/camunda-bpm-platform/issues/5235

:::info
To learn more about variable migration, see [variables](../variables).
:::

### Incidents

Due to the [limitation regarding async before/after wait states](#async-beforeafter-wait-states), incident data from instances currently waiting due to failed jobs causing active incidents will not be migrated during runtime migration. We recommend to resolve incidents prior to runtime migration.

### BPMN elements

Some BPMN elements and configurations supported in Camunda 7 are not supported in Camunda 8 or have specific limitations during migration. Below is an overview of these limitations and recommendations to address them.

#### Elements supported in Camunda 7 but not supported in Camunda 8

Some BPMN elements available in Camunda 7 are not supported in Camunda 8. Processes using these elements cannot be migrated and must be adjusted before migration:

- **Conditional events**: Conditional intermediate catch events, conditional boundary events, and conditional start events are not supported in Camunda 8. Remove or replace these with supported event types (such as message events or timer events) before migration.
- **Cancel events**: Cancel boundary events and cancel end events (used with transactions) are not supported.
- **Multiple and multiple parallel events**: All variants of multiple and multiple parallel events are not supported.
- **Compensation event subprocess**: Event subprocesses with compensation start events are not supported. Note that compensation boundary events, throw events, and end events ARE supported.
- **Other unsupported elements**: See the [BPMN coverage documentation](/components/modeler/bpmn/bpmn.md#bpmn-coverage/) for a complete list of unsupported elements.

#### Start events

- It is required that a process instance contains a single process level None Start Event to run the data migrator.
- If a process definition only has event-based start events (for example, Message, Timer), it is required to add a temporary None Start Event. This change must be reverted after the data migration is completed.
- Example adding a None Start Event:

```diff
  <bpmn:process id="Process_1fcbsv3" isExecutable="true">
    <bpmn:startEvent id="StartEvent_1">
      <bpmn:outgoing>Flow_FromEventStartEvent</bpmn:outgoing>
      <bpmn:messageEventDefinition id="MessageEventDefinition_1yknqqn" />
    </bpmn:startEvent>
    <bpmn:sequenceFlow id="Flow_FromEventStartEvent" sourceRef="StartEvent_1" targetRef="ActivityId" />
+   <bpmn:startEvent id="NoneStartEvent">
+     <bpmn:outgoing>Flow_FromNoneStartEvent</bpmn:outgoing>
+   </bpmn:startEvent>
+   <bpmn:sequenceFlow id="Flow_FromNoneStartEvent" sourceRef="NoneStartEvent" targetRef="ActivityId" />
    <bpmn:task id="ActivityId">
      <bpmn:incoming>Flow_FromEventStartEvent</bpmn:incoming>
      <bpmn:incoming>Flow_FromNoneStartEvent</bpmn:incoming>
      <bpmn:outgoing>Flow_1o2i34a</bpmn:outgoing>
    </bpmn:task>
    <bpmn:endEvent id="EndEvent">
      <bpmn:incoming>Flow_1o2i34a</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_1o2i34a" sourceRef="ActivityId" targetRef="EndEvent" />
  </bpmn:process>
```

#### Async before/after wait states

Camunda 8 does not support [asynchronous continuation before or after](https://docs.camunda.org/manual/latest/user-guide/process-engine/transactions-in-processes/#asynchronous-continuations) any kind of wait state. Service-task-like activities are executed asynchronously by default in Camunda 8 - so for example a service task waiting for asynchronous continuation before will be correctly migrated. But if you need to migrate an instance currently waiting asynchronously at other elements in a Camunda 7 model, such as a gateway for example, this instance would just continue without waiting in the equivalent Camunda 8 model. You might need to adjust your model's logic accordingly prior to migration.

#### Message events

- Only message catch and throw events are supported for migration.
- Depending on your implementation, you may need to add [a correlation variable](/components/modeler/bpmn/message-events/message-events.md#messages) to the instance pre-migration.

#### Message and signal start events

- If your process starts with a message/signal start event, no token exists until the message/signal is received and hence no migration is possible until that moment.
- Once the message/signal is received, the token is created and moved down the execution flow and may be waiting at a migratable element inside the process. However, due to how the migration logic is implemented, at the moment the data migrator only supports processes that start with a normal start event.

#### Triggered boundary events

- Camunda 7 boundary events do not have a natural wait state.
- If the process instance to be migrated is currently at a triggered boundary event in Camunda 7, there may still be a job associated with that event, either waiting to be executed or currently running. In this state, the token is considered to be at the element where the job is created: typically the first activity of the boundary event’s handler flow, or technically the point after the boundary event if asyncAfter is used.
- During migration to Camunda 8, the token will be mapped to the corresponding target element. However, if that element expects input data that is normally produced by the boundary event’s job (for example, setting variables), this data may be missing in the migrated instance.
- Recommendation: To ensure a consistent migration, allow boundary event executions to complete before initiating the migration.

#### Call activity

To migrate a subprocess that is started from a call activity, the migrator must set the `legacyId` variable for the subprocess. This requires propagating the parent variables. This can be achieved by updating the Camunda 8 call activity in one of the following ways:

- Set `propagateAllParentVariables` to `true` (this is the default) in the `zeebe:calledElement` extension element.
- Or, if `propagateAllParentVariables` is set to `false`, provide an explicit input mapping:

```xml
<zeebe:ioMapping>
  <zeebe:input source="=legacyId" target="legacyId" />
</zeebe:ioMapping>
```

#### Multi-instance

Processes with active multi-instance elements can currently not be migrated. We recommend to finish the execution of any multi-instance elements prior to migration.

#### Parallel gateways

Process instances with active joining parallel gateways cannot currently be migrated. The migrator will skip these instances during migration.

- This limitation occurs when some execution paths have completed and reached the joining parallel gateway, but other paths are still waiting at activities before the gateway.
- Recommendation: Ensure no token waits in a joining parallel gateway.
- See https://github.com/camunda/camunda-bpm-platform/issues/5461

#### Timer events

- Timer start events: prior to migration, you must ensure that your process has at least one [none start event](/components/modeler/bpmn/none-events/none-events.md#none-start-events). Processes that only have a timer start event cannot be migrated.
- If your model contains timer events (start and other), you must ensure that no timers fire during the migration process.
  - Timers with [date](/components/modeler/bpmn/timer-events/timer-events.md#time-date): ensure the date lies outside the migration time frame.
  - Timers with [durations](/components/modeler/bpmn/timer-events/timer-events.md#time-duration): ensure the duration is significantly longer than the migration time frame.
  - Timers with [cycles](/components/modeler/bpmn/timer-events/timer-events.md#time-cycle)): ensure the cycle is significantly longer than the migration time frame and/or use a start time that lies outside the migration time frame.
- Note that during deployment and/or migration, the timers may be restarted. If business logic requires you to avoid resetting timer cycles/duration, you need to apply a workaround:
  - Timers with cycles:
    - Add a start time to your cycle definition that is equal to the moment in time when the currently running Camunda 7 timer is next due.
    - You must still ensure that the start time lies outside the migration time frame.
  - Timers with durations:
    - Non-interrupting timer boundary events:
      - Switch to cycle definition with a start time that is equal to the moment in time when the currently running Camunda 7 timer is next due and add a "repeat once" configuration.
      - This way, for the first post migration run, the timer will trigger at the start time.
      - For all subsequent runs, the defined cycle duration will trigger the timer. The "repeat once" instruction ensures it only fires once, similar to a duration timer.
      - You must still ensure that the start time lies outside the migration time frame.
    - Interrupting boundary and intermediate catching events:
      - Add a variable to your Camunda 7 instance that contains the leftover duration until the next timer is due.
      - In your Camunda 8 model, adjust the timer duration definition to use an expression: if the variable is set, the value of this variable should be used for the duration. If the variable is not set or does not exist, you may configure a default duration.
      - This way, for the first post migration run the variable will exist and the timer will set its duration accordingly.
      - For all subsequent runs, the variable will not exist and the default duration will be used.
      - Again, you must ensure the leftover duration for the first post migration run lies outside the migration time frame.

#### Event subprocesses

- Event subprocesses with interrupting start events can cause unexpected behavior during migration if triggered at the wrong moment. This includes timer, message, and signal start events.
- What can go wrong:
  - A task that already ran in Camunda 7 might run again in Camunda 8.
  - The process might end up in the wrong state after migration — for example, being one step behind what you see in Camunda 7.
- When could it happen:
  - This can occur when a process instance is already inside an event subprocess in Camunda 7, and the start event of that same subprocess is accidentally triggered again in Camunda 8 during migration.
- How to prevent it:
  - Don't correlate messages or send signals during migration.
  - Temporarily adjust timer start events in event subprocesses to ensure they do not trigger during migration (see the section on timer events for more details).
  - If above suggestions are not feasible in your use case make sure service tasks are idempotent — so repeating them does not cause issues.

## History

The history migration has the following limitations.

### General

- All migrated data is assigned `partitionId=1` so that the RDBMS exporter on partition 1 can perform history cleanup for migrated data.
- Migrated data has partition ID 4095 encoded in their keys to avoid key collisions with Zeebe produced data.
  - Due to this, migrated process instances cannot be deleted via C8 API or in Operate since Zeebe cannot delegate the operation to a partition.
    - See https://github.com/camunda/camunda/issues/47927
  - Please use [RDBMS History Cleanup](/self-managed/concepts/databases/relational-db/configuration.md#history-cleanup-1) to delete the migrated data.
- To avoid collisions between definitions (process/decision/form), each definition migrated from Camunda 7 to 8 has its ID prefixed with `c7-legacy-`.
  - Do not deploy new definitions in Camunda 8 with IDs starting with this prefix to avoid conflicts.
- Avoid manipulating Camunda 7 data in between History Data Migrator runs to ensure data consistency unless there is a specific migration issue to fix (e.g. moving instances out of states that are not migratable). See [Auto-cancellation of active instances](history.md#auto-cancellation-of-active-instances) for details.
- During migration, some entities may be skipped due to unresolved dependencies (for example, when a parent entity has not yet been migrated).
  - After the initial migration completes, the migrator automatically retries skipped entities to resolve cross-entity dependencies.
  - Automatic retries run in multiple passes until no further progress can be made.
  - Entities that remain skipped after all automatic retries are logged as warnings, along with their skip reasons.
  - After fixing underlying issues, you can manually retry remaining skipped entities using the `--retry-skipped` flag.
  - Examples of temporary skip reasons include:
    - Flow node instances whose parent flow node (scope) has not yet been migrated.
    - Child process instances called from parent call activities, where the parent flow node has not yet been migrated.
- The History Data Migrator does not support the following Camunda 7 entity types:
  - **CMMN entities**: CMMN user tasks and CMMN variables are not supported and are skipped during migration.
  - **Standalone user tasks**: User tasks that are not associated with a process instance are not supported and are skipped during migration.
- Camunda 7 does not store audit data of asyncBefore wait state for flow nodes. Migration of flow nodes is executed in all other cases.
- The History Data Migrator does not support the following Camunda 8 entities or properties:
  - Sequence flow: Sequence flows cannot be highlighted in Operate.
  - Message subscription and correlated message subscription: These entities are not available in Camunda 7.
  - Batch operation entity and batch operation item: Camunda 7 does not retain sufficient information about processed instances.
  - User metrics: Not available in Camunda 7.
  - Exporter position: This entity does not exist in Camunda 7.
- Please note that if any Camunda 7 process instances progress in their state in between multiple runs of the History Data Migrator, data consistency might be affected: for example, if a process instance is completed in Camunda 7 after the first run but before the second run, the History Data Migrator would migrate it as canceled in the first and as completed in the second run. As a result, in Operate you may see that a process instance was canceled in a Flow Node that chronologically precedes the end event in your model, where the instance will be marked as completed. To avoid such situations, ensure that Camunda 7 data remains unchanged between History Data Migrator runs.

### DMN

The History Data Migrator supports migration of DMN entities, but with the following limitations:

- DMN models version 1.1 are not supported by Operate, decision definition data will be migrated but the decision model itself will not be visible in Operate.

### Forms

The History Data Migrator supports migration of Camunda Forms, but with the following limitations:

- Only [Camunda Forms](https://docs.camunda.org/manual/latest/user-guide/task-forms/#camunda-forms) are migrated. Other form types are not supported:
  - Embedded forms (HTML/JSF)
  - External forms (URL-based forms)
  - Generated forms (from form data definitions)
- Supported form bindings:
  - `deployment` - Form version deployed together with the process definition
  - `latest` - Latest version of the form definition
  - `version` - Specific version of the form definition
- Unsupported form bindings:
  - Expression-based bindings (for example, `${formKey}`)

### Jobs

The History Data Migrator migrates only jobs of type [asynchronous continuation](https://docs.camunda.org/manual/7.24/user-guide/process-engine/transactions-in-processes/#configure-asynchronous-continuations).

### Incidents

The History Data Migrator supports migration of DMN entities, but with the following limitations:

- The incidents are migrated in `resolved` state. Operate does not visualize resolved incidents,
  therefore incidents of migrated process instances will not be visible in Operate.
  Audit data related to incidents can be observed by querying APIs.
- When there's a failing start timer in Camunda 7, the incident cannot be migrated (as there's no process instance history) and will be skipped.

### Audit logs

The following limitations apply:

- Audit log entries are migrated only for user tasks, process definitions, process instances, variables, decisions, users, groups, and authorizations.
- Audit log entries are not migrated for batch operations, identity links, attachments, job definitions, jobs, external tasks, metrics, operation logs, filters, comments, and properties.

### Data coverage

For a detailed overview of which Camunda 8 entities and properties are migrated by the History Data Migrator, see the [History migration coverage](history-coverage.md) page.

## Cockpit plugin

The [Cockpit plugin](/guides/migrating-from-camunda-7/migration-tooling/data-migrator/cockpit-plugin.md) has the following limitations:

- The migration schema has no authorization mechanism. Anyone with authenticated access to the Camunda 7 Cockpit can see the Cockpit Plugin and read the migration schema.
- If the migration of a process instance or any other entity is skipped for multiple reasons, only one reason is stored and displayed.
  - See https://github.com/camunda/camunda-bpm-platform/issues/5389
- For historic data migration the skip reason is currently only stored for the initial migration attempt. If migration fails again after retry, the skip reason is not updated.
  - See https://github.com/camunda/camunda-bpm-platform/issues/5390
- There are currently some UI inconsistencies. See:
  - https://github.com/camunda/camunda-bpm-platform/issues/5422
  - https://github.com/camunda/camunda-bpm-platform/issues/5423
  - https://github.com/camunda/camunda-bpm-platform/issues/5424
- The Cockpit plugin doesn't have extensive test coverage yet so we cannot guarantee a high level of stability and therefore don't claim it to be production-ready.
  - See https://github.com/camunda/camunda-bpm-platform/issues/5404
