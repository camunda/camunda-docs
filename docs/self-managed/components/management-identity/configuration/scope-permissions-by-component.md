---
id: scope-permissions-by-component
title: "Scope permissions by component"
sidebar_label: Scope permissions by component
description: "Return each component only the permissions its own resource server defines when components share an OIDC audience."
---

With the `scope-permissions-by-component` flag, Management Identity returns each component only its own permissions when components share an audience.

Without the flag, Management Identity returns every permission on the audience that a component asks with. With the flag, it returns only the permissions that the component's own resource server defines.

The flag corrects permission mix-ups caused by a shared audience. It isn't an access-control boundary. See [known limitations](#known-limitations).

The flag is off by default, and it only takes effect once components send a component ID. It applies when Management Identity connects to a generic OIDC provider or Microsoft Entra ID (the `oidc` Spring profile). It has no effect with the default Keycloak setup. Read [check what the flag would change](#check-what-the-flag-would-change) before you enable it.

## Decide if components share an audience

Management Identity identifies a permission by its audience and its definition, for example `write:*`. When each component has an audience of its own, the audience is enough to tell components apart.

Some identity providers allow only one audience across all clients. When components share an audience, Management Identity can't tell which component a permission belongs to. A user who has only the `Optimize` role then receives Optimize's permissions in Camunda Hub, and a user who has only Camunda Hub permissions receives them in Optimize.

Enable the flag only where components share an audience. With a distinct audience per component, the flag changes nothing.

## Set the component ID

For the flag to change anything, each component must name itself when it asks Management Identity for a user's permissions. Without a component ID, a component receives every permission on its audience, as it does when the flag is off.

Components that support scoping ship with their component ID already set, so you don't need to configure it. To override the default, set the following on the component that asks for permissions:

| Environment variable           | Application property            | Description                                                      |
| :----------------------------- | :------------------------------ | :--------------------------------------------------------------- |
| `CAMUNDA_IDENTITY_COMPONENTID` | `camunda.identity.component-id` | The component name, or the client ID of one of its applications. |

The component ID is not inferred from the client ID. A component that sends no ID, or sends one Management Identity doesn't recognize, is treated as if it sent no component ID.

If you override the ID, use one of the following values. Matching ignores case and surrounding spaces.

| Component           | Component ID                                       |
| :------------------ | :------------------------------------------------- |
| Optimize            | `optimize`                                         |
| Camunda Hub         | `webmodeler`                                       |
| Management Identity | `identity` (set by Management Identity for itself) |

Camunda Hub's client ID is `web-modeler`, which isn't the same string as its component ID `webmodeler`. Both are accepted.

## Check what the flag would change

While the flag is off, Management Identity doesn't withhold anything. It does log, once for each permission, what it would stop returning to a component that names itself. Use this to check a real deployment before any access changes.

1. Leave the flag off, and make sure the components that share the audience send their component IDs.
2. Let users sign in and use the components, so each component fetches permissions at least once. Management Identity logs a warning only when a permission is requested.
3. Read the Management Identity log and compare each warning with the log messages in this section.
4. If any permission named in a warning is one a component actually needs, don't enable the flag yet.

Management Identity logs each warning once per process, up to 1,000 warnings for each distinct log message. Restart Management Identity to see them again.

| Log message                                                                                                                                                                                                                           | Meaning                                                                                                                                                            | What to do                                                                                        |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| `Role '<role>' grants '<permission>' on audience '<audience>', which belongs to another component, so it would not be returned to '<component>' once identity.flags.scope-permissions-by-component is enabled. Returning it for now.` | The named component receives this permission today, but another component owns it. Enabling the flag stops returning it to the named component.                    | If the component needs the permission, don't enable the flag. If it doesn't, no action is needed. |
| `Permissions were requested for component '<name>', which no component preset declares as a client id or a preset key. Returning every permission on the audience, as for a caller that names no component at all.`                   | The component sent an ID that Management Identity doesn't recognize, so scoping doesn't apply to it.                                                               | Set the component ID to one of the [values in the component ID table](#set-the-component-id).     |
| `Role '<role>' grants '<permission>' on audience '<audience>', which no component preset describes, so it cannot be attributed to a component and is returned to every caller.`                                                       | A role or permission created at runtime, for example through `/api/roles`, isn't described by any component. It stays visible to every component with the flag on. | No action is needed. See [known limitations](#known-limitations).                                 |

## Enable the flag

Set the following environment variable on the Management Identity deployment, and restart Management Identity:

```shell
SCOPE_PERMISSIONS_BY_COMPONENT=true
```

If you deploy with Helm, no chart change is needed. The chart exposes `identity.env` and `identity.envFrom` for Management Identity, so set the variable there:

```yaml
identity:
  env:
    - name: SCOPE_PERMISSIONS_BY_COMPONENT
      value: "true"
```

## Roll back

Set `SCOPE_PERMISSIONS_BY_COMPONENT` back to `false`, or remove it, and restart Management Identity. You don't need to redeploy any component. Components keep sending their component IDs, and Management Identity returns to logging what it would withhold.

## Known limitations

- Roles and permissions you create or edit at runtime through `/api/roles` aren't scoped. Management Identity attributes permissions from its configuration, not from the database, so it can't attribute these to a component and returns them to every component. No component gains access it doesn't have without the flag.
- A permission that several components define is returned to each of them. When a role grants a permission that the granting component doesn't define itself, and several other components do, all of those components receive it. The result is narrower than before, never broader.
- The component ID isn't authenticated. A component names itself in its request, and Management Identity can't verify the name. The flag corrects misconfiguration. It doesn't protect against a caller that deliberately names another component.
