### Bearer token

Select **Bearer token** in the **Type** dropdown in the **Authentication** section and enter your bearer token value. Use [Camunda secrets](/components/console/manage-clusters/manage-secrets.md) to avoid exposing sensitive credentials.

:::note
Bearer tokens expire after **60–90 minutes**. The connector cannot refresh them automatically, so you must provide a new valid access token before expiry.
:::

#### Options to obtain an access token

- Via the Graph Explorer:
  1. Visit [developer.microsoft.com/graph/graph-explorer](https://developer.microsoft.com/graph/graph-explorer).
  2. Log in with your Microsoft account.
  3. Click the **Access Token** tab and copy the bearer token.

- Register your app with the Microsoft identity platform and send a POST request to the `/token` identity platform endpoint to acquire an access token:
  - [How to register your app](https://learn.microsoft.com/en-us/graph/auth-register-app-v2)
  - [How to get access on behalf of a user](https://learn.microsoft.com/en-us/graph/auth-v2-user)

### Client credentials

Select **Client credentials** in the **Type** dropdown in the **Authentication** section and provide the following fields:

- **Tenant ID**: Your Microsoft Entra tenant ID (also called "Directory ID"). Learn more about [how to find a tenant ID](https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-how-to-find-tenant).
- **Client ID**: The application ID that the [Azure app registration portal](https://go.microsoft.com/fwlink/?linkid=2083908) assigned to your app.
- **Client Secret**: The client secret you created in the app registration portal for your app.

#### Create a client secret

1. In the [Azure app registration portal](https://go.microsoft.com/fwlink/?linkid=2083908), navigate to your registered application.
2. Go to **Certificates & secrets**.
3. Click **New client secret**.
4. Enter a description (for example, `Camunda Connector Secret`).
5. Select an expiration period. You will need to rotate the secret before it expires.
6. Click **Add**.
7. Copy the secret value immediately. This value is only displayed once and cannot be retrieved later.

Store your credentials securely using [Camunda secrets](/components/console/manage-clusters/manage-secrets.md).

### Refresh token

Select **Refresh token** in the **Type** dropdown in the **Authentication** section and provide the following fields:

- **Refresh Token**: Your refresh token value. Learn more about [how to get a refresh token](https://learn.microsoft.com/en-us/graph/auth-v2-user).
- **Tenant ID**: Your Microsoft Entra tenant ID (also called "Directory ID"). Learn more about [how to find a tenant ID](https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-how-to-find-tenant).
- **Client ID**: The application ID that the [Azure app registration portal](https://go.microsoft.com/fwlink/?linkid=2083908) assigned to your app.
- **Client Secret** (optional): The client secret for your app. Required for confidential clients, not required for public clients.

:::note
Refresh tokens expire after **90 days** by default. The connector cannot persist updated refresh tokens when stored as a secret or hardcoded value, so the originally configured token will expire regardless of usage. You must obtain and configure a new refresh token before the 90-day expiry.

See [Microsoft's documentation on refresh token lifetimes](https://learn.microsoft.com/en-us/entra/identity-platform/refresh-tokens#token-lifetime) for details.
:::
