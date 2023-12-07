---
id: setup-event-based-processes
title: "Event-based processes"
description: "Read everything about how to configure event-based processes in Optimize."
---

<span class="badge badge--platform">Camunda Platform 7 only</span>

Event-based processes are BPMN processes that can be created inside Optimize which are based on events originating from external systems.

Event ingestion is the process of sending event data from external systems to Camunda Optimize to support business processes that are not fully automated with Camunda Platform yet.
Based on this data, it is possible to create process models inside Optimize - called event-based processes - that can be used in reports.

To enable this feature, refer to [event-based process configuration](#event-based-process-configuration).

## Event based process configuration

To make use of ingested events and create event-based process mappings for them, the event-based process feature needs to be enabled in the [Optimize configuration](../configuration/#event-based-process-configuration).

This also includes authorizing particular users by their userId or user groups by their groupId to be able to create so-called event-based processes that can be used by other users of Optimize once published.

A full configuration example authorizing the user `demo` and all members of the `sales` user group to manage event-based processes, enabling the event-based process import as well as configuring a [Public API](../configuration/#public-api) accessToken with the value `secret`, would look like the following:

    api:
      accessToken: secret
    
    eventBasedProcess:
      authorizedUserIds: ['demo']
      authorizedGroupIds: ['sales']
      eventImport:
      	enabled: true

## Use Camunda activity event sources for event based processes

:::note Authorization to event-based processes
When Camunda activity events are used in event-based processes, Camunda Admin Authorizations are not inherited for the event-based process. The authorization to use an event-based process is solely managed via the access management of event-based processes when [publishing an event-based process](../../../components/userguide/additional-features/event-based-processes.md#publishing-an-event-based-process) or at any time via the [Edit Access Option](../../../components/userguide/additional-features/event-based-processes.md#event-based-process-list---edit-access) in the event-based process List.

Visit [Authorization Management - event-based process](./authorization-management.md#event-based-processes) for the reasoning behind this behavior.
:::

To publish event-based processes that include [Camunda Event Sources](../../../components/userguide/additional-features/event-based-processes.md#camunda-events), it is required to set [`engines.${engineAlias}.eventImportEnabled`](../configuration/#connection-to-camunda-platform) to `true` for the connected engine the Camunda process originates from.

:::note Heads Up!
You need to [reimport data](./../migration-update/instructions.md#force-reimport-of-engine-data-in-optimize) from this engine to have all historic Camunda events available for event-based processes. Otherwise, only new events will be included.
:::

As an example, in order to be able to create event processes based on Camunda events from the configured engine named `camunda-bpm`, the configuration of that engine needs to have the `importEnabled` configuration property as well as the `eventImportEnabled` set to `true`:

    engines:
      'camunda-bpm':
        importEnabled: true
        eventImportEnabled: true
