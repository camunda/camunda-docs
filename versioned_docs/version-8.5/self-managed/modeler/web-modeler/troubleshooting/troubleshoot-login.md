---
id: troubleshoot-login
title: "Troubleshooting login issues"
sidebar_label: "Login issues"
---

:::note
Web Modeler Self-Managed is available to [enterprise customers](/reference/licenses.md#web-modeler) only.
:::

Logging in to Web Modeler doesn't work as expected and shows an error or a blank page when accessing the application.

To further debug this issue, check the [log output](/self-managed/modeler/web-modeler/configuration/logging.md) of the `modeler-restapi` and `modeler-webapp` services for errors and warnings.

## Unique constraint violation

When you try to log in to Web Modeler using Keycloak as an OIDC provider, you see an error message in the `modeler-restapi` logs similar to this:

```
org.postgresql.util.PSQLException: ERROR: duplicate key value violates unique constraint "users_email_key"
    Detail: Key (email)=(***************) already exists.
```

### Ensure the Keycloak-managed user id didn't change

Web Modeler uses the value of the `sub` (subject) claim in the JSON Web Token (JWT) issued by the configured OIDC provider (by default Keycloak) to identify users and correlate them with their data created in Web Modeler.
It is important that this value doesn't change over time, for example when the user is deleted and re-created in Keycloak or re-imported from an external user directory, or when reinstalling/updating/switching Keycloak instances.

If the `sub` claim value changes for an existing user, Web Modeler will try to create a new user record in its database for the user, which will lead to the error above when the user tries to log in.

As a workaround, you can manually update the user ID in the Web Modeler database:

1. Export the users from the **Keycloak database** to a CSV file. The following query can be used to select the relevant data:
   ```sql
    SELECT id, email
    FROM user_entity
    WHERE realm_id = 'camunda-platform' AND email IS NOT NULL;
   ```
2. Create a new table in the **Web Modeler database**:
   ```sql
   CREATE TABLE keycloak_users (
       id    varchar(255),
       email varchar(255)
   );
   ```
3. Import the CSV file from **Step 1** into the new `keycloak_users` table.
4. Update the user IDs by running the following query in the **Web Modeler database**:
   ```sql
   UPDATE users u
   SET iam_id = k.id
   FROM keycloak_users k
   WHERE k.email = u.email;
   ```
5. Verify that the login is working again.
6. Delete the `keycloak_users` table:
   ```sql
   DROP TABLE keycloak_users;
   ```
