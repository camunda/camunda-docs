---
id: setup-and-configuration
title: Setup & configuration
description: "Install the Camunda Spoke in ServiceNow, configure connectors in Camunda, and set up secure credentials to enable bi-directional communication between both systems."
---

The setup and configuration process connects your ServiceNow instance with Camunda so that workflows can securely exchange data and trigger actions in both directions. This involves installing and configuring the Camunda Spoke on your ServiceNow instance, setting up the ServiceNow connectors in Camunda, and establishing secure credentials for communication. Once configured, you can interact with ServiceNow tables and flows directly from BPMN processes and start or control Camunda processes from ServiceNow—enabling true end-to-end orchestration.

> 💡 **Before you begin**  
> Ensure the following prerequisites are in place:
>
> - ✅ **Administrator access** to both Camunda and ServiceNow instances.
> - ✅ Your ServiceNow instance meets all [prerequisites](./prerequisites.md), including required plugins and user permissions.
> - ✅ Network connectivity between Camunda and ServiceNow is allowed by your organization's security settings.

## Configuration instructions

### Camunda

1. Configure a [**Camunda API credential**](../guides/setup-client-connection-credentials/) for ServiceNow connectivity.
2. Add the out-of-the-box **ServiceNow connector templates** to your Camunda processes, just like any other connector template.

### ServiceNow

1. **Install the Camunda Spoke**
   - Log in to your ServiceNow instance as an administrator.
   - Navigate to **All → Application Manager**.
   - Search for the **Camunda Spoke** application and click **Install**.

2. **Verify installation**
   - **Spoke**: In the Application Navigator, filter for "Camunda Spoke" to confirm the application menu appears.
   - **Connection alias**: Go to **Connections & Credentials → Connection & Credential Aliases** and verify that the **Camunda alias** exists and is associated with the Camunda Spoke application.

3. **Create an OAuth profile**
   - Navigate to **System OAuth → Application Registry** and click **New**.
   - Select **Connect to a third-party OAuth Provider**.
   - Fill in the form:
     - **Name**: `Camunda OAuth`
     - **Client ID**: Paste the `Client ID` created in Camunda
     - **Client Secret**: Paste the `Client Secret` created in Camunda
     - **OAuth API Script**: `OAuthCamundaUtil`
     - **Default Grant Type**: `Client Credentials`
     - **Token URL**: `https://login.cloud.camunda.io/oauth/token`
     - **Refresh Token Lifespan**: Default `8,640,000`
   - Click **Submit**.

4. **Create a credential record**
   - Navigate to **Connections & Credentials → Credentials** and click **New**.
   - Select **OAuth 2.0 Credentials**.
   - Fill in the form:
     - **Name**: `Camunda Connection`
     - **OAuth Entity Profile**: Choose `Camunda OAuth default_profile`
   - Click **Submit**.

5. **Create a connection record and link to alias**
   - Navigate to **Connections & Credentials → Connection & Credential Aliases** and open the **Camunda alias** (_ensure you are editing a record in the Camunda Spoke application_).
   - In the **Connections** tab, click **New**.
   - Fill in the form:
     - **Name**: `Camunda API Connection`
     - **Credential**: Choose `Camunda Connection` (created previously)
     - **Domain**: `Global`
     - **Connection alias ID**: `x_camun_camunda.Camunda` (pre-populated)
     - **URL Builder**: `Enabled`
     - **Host**: `regionId.zeebe.camunda.io` (Camunda cluster Region ID, e.g., `lhr-1.zeebe.camunda.io`)
     - **Protocol**: `https`
     - **Base path**: `/Camunda-ClusterId` (e.g., `/6b6b3969-a65c-4bdd-905e-c29102eebded`)
   - Click **Submit**.

6. **Optional: Configure Flow Starter**
   - To start a ServiceNow flow from Camunda asynchronously, you will need:
     - **ServiceNow Integration Hub Enterprise Pack**
     - **ServiceNow Integration Hub Flow Trigger – REST** plugin
   - See [Requesting and activating Integration Hub](https://www.servicenow.com/docs/bundle/yokohama-integrate-applications/page/administer/flow-designer/concept/request-ih-overview.html) for details.
