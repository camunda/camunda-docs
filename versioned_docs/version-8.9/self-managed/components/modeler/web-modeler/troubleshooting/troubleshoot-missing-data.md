---
id: troubleshoot-missing-data
title: "Troubleshoot missing data"
sidebar_label: "Missing data"
description: "Troubleshooting guide for when all your previous data appears to be missing after logging in to Web Modeler."
---

Troubleshoot and resolve your Web Modeler missing data issues.

## Issue

When logged in to Web Modeler, all your previous data appears to be missing.

## Cause

You must ensure the externally managed user ID does not change.

Web Modeler uses the value of the `sub` (subject) claim in the JSON Web Token (JWT) issued by the configured OIDC provider (default Keycloak) to identify users and correlate them with their data created in Web Modeler.

It is important that this value does not change over time, for example when the user is deleted and recreated in Keycloak, reimported from an external user directory, or when reinstalling/updating/switching Keycloak instances.

- If the `sub` claim value changes for an existing user, Web Modeler creates a new user record for this user in the database the next time the user logs in.
- In this case, the user no longer sees any of the projects they previously had access to, because the project permissions are still assigned to the old user record.

:::note
The missing/orphaned projects and all contained files remain in the Web Modeler database.
:::

## Resolution

To restore project access for the affected users, Web Modeler admins can use the [super-user mode](../../../../../components/modeler/web-modeler/collaboration/collaboration.md#super-user-mode) to reassign collaborators to orphaned projects.

<!-- TODO: user feedback (2026-09-02) on the #cause anchor said "This Migration Plan is not an option." No "Migration Plan" text exists anywhere in this page's current or historical content. Confirm with the reporter or product team whether this refers to a UI element outside this doc, or whether the super-user-mode/admin requirement above is the actual blocker for users who lack it (in which case this Resolution needs a fallback path). -->
