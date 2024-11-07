---
id: deploy-to-self-managed
title: Deploy diagram
description: "Desktop Modeler can directly deploy diagrams and start process instances in Camunda 8 Self-Managed."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Desktop Modeler can directly deploy diagrams and start process instances in Camunda 8 Self-Managed. Follow the steps below to deploy a diagram:

1. Click the rocket-shaped deployment icon:

   ![deployment icon](./img/deploy-icon.png)

2. Click **Camunda 8 Self-Managed**:

   ![deployment configuration](./img/deploy-empty.png)

3. Input the `Cluster endpoint`:

   :::note
   You can connect to Camunda 8 both securely and insecurely through the `https` and `http` protocols.

   Secured connections to a remote endpoint will only be established if the remote server certificate is trusted by the app. Ensure that signing trusted roots and intermediate certificates [are known to the app](/components/modeler/desktop-modeler/flags/flags.md#zeebe-ssl-certificate).
   :::

   :::caution

   Multi-tenancy is only available with authentication enabled [through Identity](/self-managed/identity/what-is-identity.md), and [enabled in all required components](/self-managed/concepts/multi-tenancy.md).

   :::

   ![deployment via Camunda 8](./img/deploy-endpoint.png)

4. Select your authentication method, and input the required credentials:

<Tabs groupId="auth" defaultValue="basic" queryString values={
[
{label: 'Basic', value: 'basic' },
{label: 'OAuth', value: 'oauth' }
]}>

<TabItem value='basic'>

For **basic authentication**, input your username and password:

![basic auth configuration](./img/deploy-with-basic-auth.png)

</TabItem>

<TabItem value='oauth'>

For **OAuth**, input the credentials for your OAuth provider, as configured in your Zeebe [environment variables](/self-managed/zeebe-deployment/security/client-authorization.md#oauthcredentialsprovider):

:::note
The OAuth URL needs to contain the full path to the token endpoint, i.e. `https://<keycloak base url>/auth/realms/camunda-platform/protocol/openid-connect/token`.
:::

![oauth configuration](./img/deploy-with-oauth.png)

</TabItem>
</Tabs>

1. Select the **Remember** checkbox if you want to locally store the connection information.

2. Click **Deploy** to perform the deployment.

![deployment successful](./img/deploy-success.png)
