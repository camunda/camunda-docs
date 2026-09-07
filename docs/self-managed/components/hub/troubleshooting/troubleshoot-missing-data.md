---
id: troubleshoot-missing-data
title: "Troubleshoot missing data"
sidebar_label: "Missing data"
description: "Troubleshooting guide for when all your previous data appears to be missing after logging in to Camunda Hub."
---

Troubleshoot and resolve your Camunda Hub missing data issues.

## Issue

When logged in to Camunda Hub, all your previous data appears to be missing.

## Cause

You must ensure the externally managed user ID does not change.

Camunda Hub uses the value of the `sub` (subject) claim in the JSON Web Token (JWT) issued by the configured OIDC provider (default Keycloak) to identify users and correlate them with their data created in Camunda Hub.

It is important that this value does not change over time, for example when the user is deleted and recreated in Keycloak, reimported from an external user directory, or when reinstalling/updating/switching Keycloak instances.

- If the `sub` claim value changes for an existing user, Camunda Hub creates a new user record for this user in the database the next time the user logs in.
- In this case, the user no longer sees any of the projects they previously had access to, because the project permissions are still assigned to the old user record.

:::note
The missing/orphaned projects and all contained files remain in the Camunda Hub database.
:::

## Resolution

To restore workspace access for the affected users, users with the **Hub Admin** role already have the [access](/components/hub/organization/manage-users/manage-users.md#elevated-workspace-access) needed to reassign members to projects that have no members.
