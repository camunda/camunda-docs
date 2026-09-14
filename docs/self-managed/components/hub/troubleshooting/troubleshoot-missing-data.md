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

To restore workspace access for the affected users, users with the **Hub Admin** role already have the [access](/components/hub/organization/manage-users/index.md#elevated-workspace-access) needed to reassign members to projects that have no members.

<!-- TODO: user feedback (2026-09-02) on the #cause anchor said "This Migration Plan is not an option." No "Migration Plan" text exists anywhere in this page's current or historical content. Confirm with the reporter or product team whether this refers to a UI element outside this doc, or whether the Hub Admin role requirement above is the actual blocker for users who lack it (in which case this Resolution needs a fallback path). -->
