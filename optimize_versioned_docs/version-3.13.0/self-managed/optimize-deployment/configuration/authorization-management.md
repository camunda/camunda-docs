---
id: authorization-management
title: "Authorization management"
description: "Define which data users are authorized to see."
---

<span class="badge badge--platform">Camunda 7 only</span>

User authorization management differs depending on whether the entities to manage the authorizations for are originating from adjacent systems like imported data from connected Camunda-BPM engines such as process instances, or whether the entities are fully managed by Camunda Optimize, such as [event-based processes and instances](components/userguide/additional-features/event-based-processes.md) or [collections](components/userguide/collections-dashboards-reports.md). For entities originating from adjacent systems authorizations are managed in the Camunda 7 via Camunda Admin, for the latter the authorizations are managed in Camunda Optimize.

## Camunda 7 data authorizations

The authorization to process or decision data, as well as tenants and user data imported from any connected Camunda REST-API, is not managed in Optimize itself but needs to be configured in the Camunda 7 and can be achieved on different levels with different options.

If you do not know how authorization in Camunda works, visit the [authorization service documentation](https://docs.camunda.org/manual/latest/user-guide/process-engine/authorization-service/). This has the advantage that you don't need to define the authorizations several times.

### Process or decision definition related authorizations

You can specify which user has access to certain process or decision definitions, including data related to that definition. By that we mean the user can only see, create, edit, and delete reports to definitions they are authorized to.

When defining an authorization to grant or deny access to certain definitions, the most important aspect is that you grant access on the resource type "process definition" and "decision definition". You can then relate to a specific definition by providing the definition key as resource ID or use "\*" as resource ID if you want to grant the access to all definitions. To grant access to a definition, you need to set either `ALL` or `READ_HISTORY` as permission. Both permission settings are treated equally in Optimize, so there is no difference between them.

As an example, have a look how adding authorizations for process definitions could be done in Camunda Admin:

![Grant Optimize Access in Admin](img/Admin-GrantDefinitionAuthorizations.png)

1. The first option grants global read access for the process definition `invoice`. With this setting all users are allowed to see, update, create, and delete reports related to the process definition `invoice` in Optimize.
2. The second option defines an authorization for a single user. The user `Kermit` can now see, update, create, and delete reports related to the process definition `invoice` in Optimize.
3. The third option provides access on group level. All users belonging to the group `optimize-users` can see, update, create, and delete reports related to the process definition `invoice` in Optimize.

It is also possible to revoke the definition authorization for specific users or groups. For instance, you can define access for all process definitions on a global scale, but exclude the `engineers` group from access reports related to the `invoice` process:

![Revoke Optimize Access for group 'engineers' in Admin](img/Admin-RevokeDefinitionAuthorization.png)

Decision definitions are managed in the same manner in the `Authorizations -> Decision Definition` section of the Authorizations Management of the Camunda 7.

### User and Group related Authorizations

To allow logged-in users to see other users and groups in Optimize (for example, to add them to a collection), they have to be granted **read** permissions for the resource type **User** as well as the resource type **Group**. Access can be granted or denied either for all users/groups or for specific user/group IDs only. This can be done in Camunda Admin as illustrated in the definitions authorization example above.

## Optimize entity authorization

There are entities that only exist in Camunda Optimize and authorizations to these are not managed via Camunda Admin but within Optimize.

### Collections

[Collections](components/userguide/collections-dashboards-reports.md) are the only way to share Camunda Optimize reports and dashboards with other users. Access to them is directly managed via the UI of collections; see the corresponding user guide section on [Collection - User Permissions](components/userguide/collections-dashboards-reports.md#user-permissions).

### Event-based processes

<span class="badge badge--platform">Camunda 7 only</span>

Although [event-based processes](components/userguide/additional-features/event-based-processes.md) may include data originating from adjacent systems like the Camunda Engine when using [Camunda Activity Event Sources](components/userguide/additional-features/event-based-processes.md#event-sources), they do not enforce any authorizations from Camunda Admin. The reason for that is that multiple sources can get combined in a single [event-based process](components/userguide/additional-features/event-based-processes.md) that may contain conflicting authorizations. It is thus required to authorize users or groups to [event-based processes](components/userguide/additional-features/event-based-processes.md) either directly when [publishing](components/userguide/additional-features/event-based-processes.md#publishing-an-event-based-process) them or later on via the [event-based process - Edit Access](components/userguide/additional-features/event-based-processes.md#event-based-process-list---edit-access) option.
