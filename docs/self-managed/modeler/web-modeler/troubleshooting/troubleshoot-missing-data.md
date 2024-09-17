---
id: troubleshoot-missing-data
title: "Troubleshooting issues with missing data"
sidebar_label: "Missing data"
---

After you have logged in to Web Modeler, all of your previous data appears to be gone.

### Ensure the externally managed user id didn't change

Web Modeler uses the value of the `sub` (subject) claim in the JSON Web Token (JWT) issued by the configured OIDC provider (by default Keycloak) to identify users and correlate them with their data created in Web Modeler.
It is important that this value doesn't change over time, for example when the user is deleted and re-created in Keycloak or re-imported from an external user directory, or when reinstalling/updating/switching Keycloak instances.

If the `sub` claim value changes for an existing user, Web Modeler will create a new user record for this user in its database the next time the user logs in.
In this case, the user will no longer see any of the projects they previously had access to, because the project permissions are still tied to the old user record.

:::note
Rest assured that the missing projects and all contained files are still present in Web Modeler's database.
:::

To restore project access for the affected users, Web Modeler admins can use the [super-user mode](/components/modeler/web-modeler/collaboration.md#super-user-mode) which allows to reassign collaborators to orphaned projects.
