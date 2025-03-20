---
id: user
title: User management
description: "Learn how to manage users in your Self-Managed Orchestration cluster."
---

:::note
User management in Identity is only supported by Self-Managed deployments. For SaaS, see how to [connect your identity provider](http://localhost:3000/docs/next/components/console/manage-organization/external-sso/).
:::

User management is the process of creating, updating, and deleting users in your Orchestration cluster. Users can be assigned roles and permissions to access applications and perform actions on resources.

### Create a user

1. Log in to Identity in your cluster.
2. Click on the `Users` tab.
3. Click on the `Create user` button.
4. Enter the user details:
   - **Username**: The username for the user.
   - **Name**: The name of the user.
   - **Email**: The email address of the user.
   - **Password**: The password for the user.
5. Click on the `Create user` button.
6. The user is created and can now log in to the Camunda 8 web application.

![identity-create-user-tab](./img/create-user-tab.png)

### Update a user

1. Log in to Identity in your cluster.
2. Click on the `Users` tab.
3. Select the user you want to update.
4. Click on the `Edit` button next to the user.
5. Update the user details:
   - **Name**: The name of the user.
   - **Email**: The email address of the user.
   - **Password**: The password for the user.
6. Click on the `Save` button.
7. The user details are updated.

![identity-update-user-tab](./img/update-user-tab.png)

### Delete a user

1. Log in to Identity in your cluster.
2. Click on the `Users` tab.
3. Select the user you want to delete.
4. Click on the `Delete` button next to the user.
5. Confirm the deletion by clicking on the `Delete` button in the confirmation dialog.
6. The user is deleted and can no longer log in to the Camunda 8 web application.

### Assign authorizations to a user

Please refer to the [authorization](./authorization.md) section to learn how to create authorizations for users.
