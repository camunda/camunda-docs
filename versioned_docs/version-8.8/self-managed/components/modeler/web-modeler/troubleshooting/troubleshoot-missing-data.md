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

To restore project access for the affected users, Web Modeler admins can use the [super-user mode](/components/modeler/web-modeler/collaboration.md#super-user-mode) to reassign collaborators to orphaned projects.
