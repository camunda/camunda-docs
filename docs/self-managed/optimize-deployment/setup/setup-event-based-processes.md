---
id: setup-event-based-processes
title: "Event Based Processes"
description: "Read everything about how to configure Event Based Processes in Optimize."
---

<span class="badge badge--platform">Camunda Platform 7 only</span>

Event Based Processes are BPMN processes that can be created inside Optimize which are based on events originating from external systems.
Event ingestion is the process of sending event data from external systems to Camunda Optimize to support business processes that are not fully automated with Camunda Platform yet.
Based on this data it is possible to create process models inside Optimize - called Event Based Processes - that can be used in reports. 

To enable this feature please refer to [Event Based Process Configuration](#event-based-process-configuration).

## Event Based Process Configuration

In order to make use of ingested events and create event based process mappings for them, the event based process feature needs to be enabled in the [Optimize configuration](../configuration/#event-based-process-configuration).
This also includes authorizing particular users by their userId or user groups by their groupId to be able to create so called Event Based Processes that can be used by other users of Optimize once published.

A full configuration example authorizing the user `demo` and all members of the `sales` user group to manage Event Based Processes, enabling the event based process import as well as configuring a [Public API](../configuration/#public-api) accessToken with the value `secret`, would look like the following:

    api:
      accessToken: secret
    
    eventBasedProcess:
      authorizedUserIds: ['demo']
      authorizedGroupIds: ['sales']
      eventImport:
      	enabled: true

## Use Camunda Activity Event Sources for Event Based Processes

:::note Authorization to Event Based Processes
Please note that when Camunda Activity Events are used in Event Based Processes, Camunda Admin Authorizations are not inherited for the Event Based Process. The Authorization to use an Event Based Process is solely managed via the access management of Event Based Processes when [publishing an Event Based Process](./../../../components/optimize/userguide/additional-features/event-based-processes.md/#publishing-an-event-based-process) or at any time via the [Edit Access Option](./../../../components/optimize/userguide/additional-features/event-based-processes.md/#event-based-process-list---edit-access) in the Event Based Process List.

Please checkout [Authorization Management - Event Based Process](./authorization-management.md/#event-based-processes) for the reasoning behind this behavior.
:::

In order to be able to publish event based processes that include [Camunda Event Sources](./../../../components/optimize/userguide/additional-features/event-based-processes.md/#camunda-events) it is required to set [`engines.${engineAlias}.eventImportEnabled`](../configuration/#connection-to-camunda-platform) to `true` for the connected engine the Camunda Process originates from.

:::note Heads Up!
You need to [reimport data](./../migration-update/instructions.md/#force-reimport-of-engine-data-in-optimize) from this engine to have all historic Camunda events available for Event Based Processes. Otherwise only new events will be included.
:::

As an example, in order to be able to create event processes based on Camunda events from the configured engine named `camunda-bpm`, the configuration of that engine needs to have the `importEnabled` configuration property as well as the `eventImportEnabled` set to `true`:

    engines:
      'camunda-bpm':
        importEnabled: true
        eventImportEnabled: true