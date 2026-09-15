---
id: installation
title: Install app integrations
sidebar_label: Install
description: "Install and configure the App Integrations backend for Microsoft Teams and Slack in a Self-Managed environment."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Install and configure the App Integrations backend for a Self-Managed environment using Docker.

:::note
No installation is needed for SaaS environments. The Camunda app for each platform is already available from the Microsoft Teams app store and the Slack Marketplace, and can be used by all users with a Camunda SaaS subscription. See [get started](./app-integrations.md#get-started) for details.
:::

## About

App Integrations is one backend serving Microsoft Teams, Slack, or both. Install it once, then register the app for each platform you want, and skip the rest. An administrator rolling out Slack only can follow this page top to bottom without touching a Microsoft Teams instruction, and the reverse.

## Prerequisites

Before you begin, ensure the following are available.

Shared, regardless of which platforms you register:

- A running Camunda Self-Managed distribution (for example, `camunda.your-domain.com`) with Identity (Keycloak or Microsoft Entra).
- Docker installed on the system hosting the App Integrations backend.
- A PostgreSQL database accessible from the Docker container.
- Node.js 20 or later, for the app integration CLI.
- A DNS name for the App Integrations backend (for example, `app-integrations.camunda.your-domain.com`).

If you are registering Microsoft Teams:

- Microsoft Teams with admin permissions to add apps.

If you are registering Slack:

- A Slack workspace.
- The backend DNS name must be reachable from the internet over **HTTPS**. Slack calls the backend directly, and there is no socket mode.

## Step 1: Create applications in Camunda Identity

Before writing the configuration file, register two OAuth 2.0 applications in your identity provider.

1. Access the Identity management in your Camunda Self-Managed distribution.
2. Create the following two applications.

### App Integrations M2M (Machine-to-Machine)

| Field          | Value                        |
| :------------- | :--------------------------- |
| Type           | `m2m`                        |
| Access to APIs | Orchestration API (`read:*`) |

Note down the generated `clientId` and `clientSecret`. You will need them for `auth.m2m` in the configuration file.

### App Integrations SPA (Single Page Application)

| Field         | Value                         |
| :------------ | :---------------------------- |
| Type          | `Confidential`                |
| Redirect URIs | `https://<your-public-url>/*` |

Note down the generated `clientId` and `clientSecret`. You will need them for `auth.spa` in the configuration file.

### Grant offline access role

<Tabs groupId="identity-provider" defaultValue="keycloak" values={[
{ label: 'Keycloak', value: 'keycloak' },
{ label: 'Entra', value: 'entra' },
]}>

<TabItem value="keycloak">

In your Keycloak admin console, ensure that users who will use the app integrations have the `offline_access` role assigned. This is required so the application can refresh tokens and act on behalf of users when sending proactive notifications.

You can assign `offline_access` at the realm level (**Realm Roles** → `offline_access`) or via a group/client scope, depending on your setup.

</TabItem>

<TabItem value="entra">

For Entra-based setups, offline/refresh token access is configured via the App Registration's API permissions in the Azure portal.

You must ensure the SPA App Registration has the `offline_access` permission granted under **API permissions** → **Microsoft Graph** → **Delegated permissions**.

</TabItem>

</Tabs>

## Step 2: Register the chat app

Complete only the tabs for the platforms you are registering. Registering Microsoft Teams does not require Slack, and registering Slack does not require Microsoft Teams.

Both platforms are set up with `@camunda/app-integration-cli`, version 2, which provides two binaries: `c8-teams` and `c8-slack`. You run only the binary for the platform you are registering, and both expose the same four commands: `create`, `build`, `deploy`, and `show-config`.

:::note
The superseded v1 package, `@camunda/teams-app-integration-cli`, still exists as a deprecated alias with the `c8teams` binary. A project created with v1 migrates automatically on first load with the v2 CLI, and `c8-slack migrate` runs the migration explicitly.
:::

<Tabs groupId="platform" defaultValue="teams" values={[
{ label: 'Microsoft Teams', value: 'teams' },
{ label: 'Slack', value: 'slack' },
]}>

<TabItem value="teams">

Skip this tab if you are not registering Microsoft Teams.

Install the CLI:

```bash
npm install -g @camunda/app-integration-cli
```

Create a new Teams app project:

```bash
c8-teams create my-teams-app
```

The CLI prompts you for:

- A project/package name.
- The application display name.
- Your App Integrations backend URL.
- Whether to create a new Teams app and Entra (Azure AD) app or use existing ones.

Build and deploy:

```bash
cd my-teams-app
pnpm install
c8-teams build
```

The `build` command compiles the app package from the template and deploys it. You can also deploy separately as follows:

```bash
c8-teams deploy
```

This provisions the app in your Microsoft Teams tenant and publishes it to the Teams Admin Portal for approval. After a successful deployment, the CLI automatically prints the `teams` configuration snippet (including `clientId`, `appId`, `appPassword`, `tenantId`, and `tabEndpoint`) ready to paste into your `config.yaml`.

Save this output for [Step 4](#step-4-create-the-configuration-file).

:::tip
If you need to retrieve the configuration snippet again later, run:

```bash
c8-teams show-config
```

:::

</TabItem>

<TabItem value="slack">

Skip this tab if you are not registering Slack.

Install the CLI:

```bash
npm install -g @camunda/app-integration-cli
```

Create a new Slack app project:

```bash
c8-slack create my-slack-app
```

The CLI prompts you for:

| Question          | Default                                 | Constraint                                                   |
| :---------------- | :-------------------------------------- | :----------------------------------------------------------- |
| App name          | `Camunda`                               | 1 to 35 characters                                           |
| Bot display name  | The app name                            | 1 to 80 characters                                           |
| Short description | `Your perfect integration with Camunda` | 140 characters or fewer                                      |
| Background color  | `#000000`                               | `#rgb` or `#rrggbb`                                          |
| Slash command     | `/camunda`                              | 32 characters or fewer, no spaces or slashes after the first |
| Slack app         | Create a new one                        | Or supply an existing Slack app ID and workspace ID          |
| Backend URL       | None                                    | **Must be `https`.** The CLI rejects `http`                  |

You are not asked for any Slack request URLs. All of them are derived as `<backend>/api/slack/events`.

Build and deploy:

```bash
cd my-slack-app
pnpm install
c8-slack build
c8-slack deploy
```

`c8-slack deploy` publishes the manifest, installs the app, uploads the icon, stores the credentials, and prints the config. Keep these points in mind, since each one otherwise costs an administrator an afternoon:

1. The backend URL must be `https`. The CLI rejects `http` at the prompt.
2. `deploy` needs a Slack app configuration token, resolved in this order: `--token`, then the `SLACK_CONFIG_TOKEN` environment variable, then an interactive sign-in. A non-interactive run with neither fails with "No Slack configuration token available. Set SLACK_CONFIG_TOKEN or pass --token."
3. `show-config` prints secret values only to a terminal. Redirected output withholds them.

If the workspace requires admin approval, deployment stops and points at `https://api.slack.com/apps/<appId>/install-on-team`.

:::tip
If you need to retrieve the configuration snippet again later, run:

```bash
c8-slack show-config
```

:::

### Slack app permissions

The manifest the CLI deploys requests these bot scopes:

| Scope               | Used for                                                    |
| :------------------ | :---------------------------------------------------------- |
| `app_mentions:read` | Channel mentions reaching a process                         |
| `assistant:write`   | Thread status in the Camunda direct message                 |
| `channels:join`     | Joining a channel after subscribe or `/camunda chat`        |
| `channels:manage`   | Creating a public channel from the connector                |
| `channels:read`     | Reading channel metadata                                    |
| `chat:write`        | Posting messages                                            |
| `commands`          | The slash command                                           |
| `groups:read`       | Reading private channel metadata                            |
| `groups:write`      | Creating a private channel from the connector               |
| `im:history`        | Reading the Camunda direct message                          |
| `im:write`          | Opening a direct message to deliver a personal notification |

And these bot events: `app_home_opened`, `app_mention`, `app_uninstalled`, `channel_archive`, `channel_deleted`, `channel_left`, `group_left`, and `message.im`.

The slash command, event subscriptions, interactivity, and options load all point at the same request URL: `<backend>/api/slack/events`. There is no OAuth redirect URL and no Slack OAuth callback in the backend.

:::warning
Slack does not grant a new permission to an already installed app. If a release adds a scope, an event, or a request URL, every workspace must reinstall the app before the new behaviour works. The app does not fail, it silently does less.
:::

</TabItem>

</Tabs>

## Step 3: Configure the App Integrations exporter

The App Integrations backend requires a Zeebe exporter to be configured in your Camunda orchestration cluster. This exporter streams process data to the App Integrations backend.

Add the following configuration to your orchestration cluster Helm chart values:

```yaml
orchestration:
  exporters:
    appIntegrations:
      apiKey:
        secret:
          existingSecret: app-integrations-secret
          existingSecretKey: apiKey
  extraConfiguration:
    - file: application.app-int.yaml
      content: |
        zeebe:
          broker:
            exporters:
              appIntegrations:
                className: "io.camunda.exporter.appint.AppIntegrationsExporter"
                args:
                  url: <your-app-integrations-url>/api/event/exporter/batch
```

- Replace `<your-app-integrations-url>` with the base URL of your App Integrations backend. The URL must point to the `/api/event/exporter/batch` endpoint (for example, `https://app-integrations.camunda.your-domain.com/api/event/exporter/batch`).

- The `args.url` must include the full path `/api/event/exporter/batch`. This is the batch event ingestion endpoint of the App Integrations backend. The exporter will POST batches of process events to this endpoint.

- The `existingSecret` references a Kubernetes Secret containing the API key. Create this secret in your cluster before deploying:

  ```bash
  kubectl create secret generic app-integrations-secret --from-literal=apiKey=<your-exporter-api-key>
  ```

:::note
The same API key must be set in the `exporter.apiKey` field of the App Integrations [configuration file](#step-4-create-the-configuration-file) so that the backend can authenticate with the exporter endpoint.
:::

## Step 4: Create the configuration file

Create a `config.yaml` file with your configuration settings. This file will be mounted into the Docker container.

### Auth configuration

The `auth` block must be configured to match the identity provider used in your environment. The `auth.kind` field selects the provider variant, which determines how OIDC discovery, token endpoints, and audience/issuer values are resolved.

Audiences are configured under `auth.audiences`. On Self-Managed, set `auth.audiences.zeebe` to the audience of your Orchestration Cluster API; App Integrations also uses it as the identity audience when requesting tokens. `auth.audiences.global` applies to SaaS only and should be omitted.

:::warning
The singular `auth.audience` field was removed. A configuration that still uses it is rejected at startup with `auth.audience has been removed; use auth.audiences.{global,zeebe,app_integrations}`.
:::

<Tabs groupId="identity-provider" defaultValue="keycloak" values={[
{ label: 'Keycloak', value: 'keycloak' },
{ label: 'Entra', value: 'entra' },
]}>

<TabItem value="keycloak">

Set `auth.kind` to `"keycloak"` for Keycloak-based Camunda Self-Managed installations.

| Field                             | Required | Description                                                                                                                            |
| :-------------------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `auth.kind`                       | Yes      | Set to `keycloak`.                                                                                                                     |
| `auth.issuer`                     | Yes      | The Keycloak realm URL. For example, `https://<your-camunda-host>/auth/realms/camunda-platform`.                                       |
| `auth.audiences.zeebe`            | Yes      | The audience of the Orchestration Cluster API. Typically `camunda-platform`.                                                           |
| `auth.audiences.app_integrations` | No       | The audience App Integrations accepts on its own inbound API. Required if the exporter authenticates with OAuth instead of an API key. |
| `auth.m2m.clientId`               | Yes      | M2M client ID from [Step 1](#step-1-create-applications-in-camunda-identity).                                                          |
| `auth.m2m.clientSecret`           | Yes      | M2M client secret from [Step 1](#step-1-create-applications-in-camunda-identity).                                                      |
| `auth.spa.clientId`               | Yes      | SPA client ID from [Step 1](#step-1-create-applications-in-camunda-identity).                                                          |
| `auth.spa.clientSecret`           | Yes      | SPA client secret from [Step 1](#step-1-create-applications-in-camunda-identity).                                                      |

Example:

```yaml
auth:
  kind: keycloak
  m2m:
    clientId: <your-m2m-client-id>
    clientSecret: <your-m2m-client-secret>
  spa:
    clientId: <your-spa-client-id>
    clientSecret: <your-spa-client-secret>
  issuer: https://<your-camunda-host>/auth/realms/camunda-platform
  audiences:
    zeebe: camunda-platform
```

</TabItem>

<TabItem value="entra">

Set `auth.kind` to `"entra"` for Microsoft Entra ID (formerly Azure AD) based setups.

| Field                             | Required | Description                                                                                                                            |
| :-------------------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `auth.kind`                       | Yes      | Set to `entra`.                                                                                                                        |
| `auth.issuer`                     | No       | Derived automatically as `https://login.microsoftonline.com/<tenantId>/v2.0`. Override only if using a custom authority.               |
| `auth.audiences.zeebe`            | Yes      | The audience of the Orchestration Cluster API. In Entra setups this is usually the Application ID URI of the M2M app registration.     |
| `auth.audiences.app_integrations` | No       | The audience App Integrations accepts on its own inbound API. Required if the exporter authenticates with OAuth instead of an API key. |
| `auth.m2m.clientId`               | Yes      | Entra App Registration client ID for the M2M application.                                                                              |
| `auth.m2m.clientSecret`           | Yes      | Entra App Registration client secret for the M2M application.                                                                          |
| `auth.spa.clientId`               | Yes      | Entra App Registration client ID for the SPA application.                                                                              |
| `auth.spa.clientSecret`           | Yes      | Entra App Registration client secret for the SPA application.                                                                          |
| `auth.entra.tenantId`             | Yes      | The Entra tenant ID.                                                                                                                   |
| `auth.entra.tokenUrl`             | No       | Defaults to `https://login.microsoftonline.com/<tenantId>/oauth2/v2.0/token`.                                                          |
| `auth.entra.jwksUrl`              | No       | Defaults to `https://login.microsoftonline.com/<tenantId>/discovery/v2.0/keys`.                                                        |
| `auth.entra.scope`                | No       | Defaults to `openid profile offline_access <auth.audiences.zeebe>/.default`.                                                           |
| `auth.entra.usernameClaim`        | No       | The ID token claim used to resolve the user's email. Default: `preferred_username`.                                                    |

Example:

```yaml
auth:
  kind: entra
  m2m:
    clientId: <your-entra-m2m-client-id>
    clientSecret: <your-entra-m2m-client-secret>
  spa:
    clientId: <your-entra-spa-client-id>
    clientSecret: <your-entra-spa-client-secret>
  audiences:
    zeebe: <your-orchestration-cluster-audience>
  entra:
    tenantId: <your-entra-tenant-id>
```

:::note
Most parameters in the `auth.entra` block are automatically inferred from the required `tenantId` parameter. You only need to override them if your environment uses non-standard Entra endpoints.
:::

</TabItem>

</Tabs>

### Secret management

The configuration file supports referencing environment variables for any value.

:::note
This is strongly recommended for sensitive fields such as passwords, client secrets, and encryption keys.
:::

Instead of hardcoding a secret in `config.yaml`, use the `${{ ENV_VAR_NAME }}` syntax:

```yaml
auth:
  m2m:
    clientId: ${{ AUTH_M2M_CLIENT_ID }}
    clientSecret: ${{ AUTH_M2M_CLIENT_SECRET }}
db:
  password: ${{ DB_PASSWORD }}
  encryptionKey: ${{ DB_ENCRYPTION_KEY }}
teams:
  appPassword: ${{ TEAMS_APP_PASSWORD }}
slack:
  botToken: ${{ SLACK_BOT_TOKEN }}
  signingSecret: ${{ SLACK_BOT_SIGNING_SECRET }}
session:
  secret: ${{ SESSION_SECRET }}
```

You can also use the shorthand `$ENV_VAR_NAME` without braces.

In your deployment, mount the secrets as environment variables on the container (for example, via Kubernetes Secrets, Docker `--env-file`, or your CI/CD pipeline's secret store) rather than storing them in plain text in the config file.

### Example configuration file

Replace the placeholder values with your actual settings. `teams` and `slack` are both optional blocks; include only the ones for the platforms you registered in [Step 2](#step-2-register-the-chat-app), and delete the other.

- Use the credentials from [Step 1](#step-1-create-applications-in-camunda-identity), the Teams configuration from [Step 2](#step-2-register-the-chat-app), and the Slack `command` value you chose there.
- The `exporter.apiKey` must match the API key configured in the Orchestration Cluster Helm chart in [Step 3](#step-3-configure-the-app-integrations-exporter).
- For production deployments, replace sensitive values with environment variable references as described in [Secret management](#secret-management).
- See [Auth configuration](#auth-configuration) for the full `auth` block reference.

```yaml
serverPort: 8080
stage: prod

# See "Auth configuration" above for Keycloak and Entra variants.
auth:
  kind: keycloak
  m2m:
    clientId: <your-m2m-client-id>
    clientSecret: <your-m2m-client-secret>
  spa:
    clientId: <your-spa-client-id>
    clientSecret: <your-spa-client-secret>
  issuer: https://<your-camunda-host>/auth/realms/camunda-platform
  audiences:
    zeebe: camunda-platform

db:
  username: <your-postgres-username>
  password: <your-postgres-password>
  database: <your-database-name>
  host: <your-postgres-host>
  loginType: password
  encryptionKey: "<your-32-character-encryption-key>"

# Include this block only if you registered Microsoft Teams in Step 2.
# Paste the output of `c8-teams show-config` here:
teams:
  clientId: <your-azure-ad-client-id>
  appId: <your-teams-app-id>
  appPassword: <your-azure-ad-app-password>
  tenantId: <your-azure-ad-tenant-id>
  tabEndpoint: https://<your-public-url>/ms-teams-app

# Include this block only if you registered Slack in Step 2.
slack:
  botToken: <your-slack-bot-token>
  signingSecret: <your-slack-signing-secret>
  command: /camunda

session:
  secure: true
  secret: <your-random-session-secret>

frontendUrl: https://<your-public-url>
backendUrl: https://<your-public-url>

flavor: self-managed

organisation:
  name: <your-organization-name>

clusters:
  - uuid: <unique-cluster-uuid>
    name: <cluster-display-name>
    urls:
      orchestration: https://<your-camunda-host>/orchestration
      tasklist: https://<your-camunda-host>/tasklist
      # Extended format (object with base and task):
      # tasklist:
      #   base: https://<your-camunda-host>/tasklist
      #   task: https://<your-camunda-host>/tasklist/tasks/:userTaskKey/view
      operate: https://<your-camunda-host>/operate
    exporter:
      apiKey: <your-exporter-api-key>

subscriptions: {}
```

:::note
The `urls.tasklist` field supports two formats:

- **Simple (legacy) format**: a plain URL string (for example, `https://<your-camunda-host>/tasklist`). Deep links to tasks fall back to `{tasklist-url}/tasklist/{userTaskKey}`.
- **Extended format**: an object with `base` and `task` fields. The `task` field is a URL template containing a `:userTaskKey` placeholder (for example, `https://<your-camunda-host>/tasklist/tasks/:userTaskKey/view`). When the app generates deep links to tasks (for example, in a notification card), it replaces `:userTaskKey` with the actual task key. This allows customization of the task URL pattern for environments where the default path does not match.

:::

:::note
On Camunda 8.10, a cluster can host several [Physical Tenants](/self-managed/concepts/physical-tenants/index.md). To serve them from one App Integrations deployment, add a `physicalTenants` array to the cluster. See [App Integrations and Physical Tenants](/self-managed/concepts/physical-tenants/app-integrations.md).
:::

### Stage values

The `stage` field controls the environment label.

| Value   | Description                                     |
| :------ | :---------------------------------------------- |
| `prod`  | Production environment (recommended default).   |
| `int`   | Integration / staging environment.              |
| `dev`   | Development environment.                        |
| `local` | Local development (not for deployed instances). |

Use `prod` for production deployment.

## Step 5: Start the application

### Configure your PostgreSQL connection

Ensure your `config.yaml` has the correct PostgreSQL database settings. The `host` should be the hostname or IP address of your PostgreSQL server as reachable from within the Docker container.

### Configure your Camunda Self-Managed host

Update your `config.yaml` to point to your Camunda Self-Managed distribution:

- Set `auth.kind` and the corresponding auth fields for your identity provider (see [Auth configuration](#auth-configuration)).
- Set each entry in `clusters[].urls` to the correct Camunda service URLs.
- Set `frontendUrl` and `backendUrl` to your public deployment URL.

### Start the backend

Run the App Integrations backend container with the configuration file mounted:

```bash
docker run -d \
  --name app-integrations \
  -p 8080:8080 \
  -e CONFIG=config/app-integrations.yaml \
  -e NODE_ENV=production \
  -v ./config.yaml:/app/apps/backend/config/app-integrations.yaml \
  --restart unless-stopped \
  camunda/app-integrations:SNAPSHOT
```

:::note

- **`CONFIG` environment variable**: Must be set to `config/app-integrations.yaml` to point to the mounted configuration file.
- **`NODE_ENV` environment variable**: Set to `production` for deployed environments.
- **Volume mount**: The `config.yaml` file is mounted to `/app/apps/backend/config/app-integrations.yaml` inside the container.

:::

A healthy start logs "Slack integration initialized" if the `slack` block is configured. A blank `slack.botToken` or `slack.signingSecret` disables Slack: every request to `/api/slack/*` then answers `503` with `{"error": "slack_disabled"}`, and the backend logs "Slack integration disabled (no Slack bot token / signing secret configured)".

## Configuration reference

Below is a reference of each section in the `config.yaml` file.

| Section           | Field                               | Description                                                                                                                                                     |
| :---------------- | :---------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `serverPort`      | —                                   | The port the backend server listens on inside the container (default: `8080`).                                                                                  |
| `stage`           | —                                   | Environment stage: `local`, `dev`, `int`, or `prod`.                                                                                                            |
| **auth**          |                                     | Authentication configuration for connecting to your Camunda platform. See [Auth configuration](#auth-configuration).                                            |
|                   | `kind`                              | Identity provider variant: `keycloak` (default) or `entra`. Determines how OIDC endpoints are resolved.                                                         |
|                   | `m2m.clientId` / `m2m.clientSecret` | Machine-to-machine OAuth2 credentials for backend services.                                                                                                     |
|                   | `spa.clientId` / `spa.clientSecret` | Single Page Application OAuth2 credentials for frontend.                                                                                                        |
|                   | `issuer`                            | The OAuth2/OIDC issuer URL. Required for Keycloak; auto-derived for Entra.                                                                                      |
|                   | `audiences.zeebe`                   | _(Required)_ The audience of the Orchestration Cluster API. Typically `camunda-platform` on Keycloak.                                                           |
|                   | `audiences.app_integrations`        | _(Optional)_ The audience App Integrations accepts on its own inbound API, used when the exporter authenticates with OAuth instead of an API key.               |
|                   | `entra.tenantId`                    | _(Entra only, required)_ The Entra tenant ID.                                                                                                                   |
|                   | `entra.tokenUrl`                    | _(Entra only, optional)_ Token endpoint. Defaults to `https://login.microsoftonline.com/<tenantId>/oauth2/v2.0/token`.                                          |
|                   | `entra.jwksUrl`                     | _(Entra only, optional)_ JWKS endpoint. Defaults to `https://login.microsoftonline.com/<tenantId>/discovery/v2.0/keys`.                                         |
|                   | `entra.scope`                       | _(Entra only, optional)_ OAuth2 scope. Defaults to `openid profile offline_access <auth.audiences.zeebe>/.default`.                                             |
|                   | `entra.usernameClaim`               | _(Entra only, optional)_ ID token claim for the user's email. Default: `preferred_username`.                                                                    |
| **db**            |                                     | PostgreSQL database connection settings.                                                                                                                        |
|                   | `username`                          | Database username.                                                                                                                                              |
|                   | `password`                          | Database password.                                                                                                                                              |
|                   | `database`                          | Database name.                                                                                                                                                  |
|                   | `host`                              | Database hostname (as reachable from the container).                                                                                                            |
|                   | `loginType`                         | Authentication type (`password` for username/password auth).                                                                                                    |
|                   | `encryptionKey`                     | 32-character key used for encrypting sensitive data.                                                                                                            |
| **teams**         |                                     | Microsoft Teams integration settings. _(Required only if you registered Microsoft Teams.)_                                                                      |
|                   | `clientId`                          | Azure AD app client ID.                                                                                                                                         |
|                   | `appId`                             | Teams app ID.                                                                                                                                                   |
|                   | `appPassword`                       | Azure AD app password (client secret).                                                                                                                          |
|                   | `tenantId`                          | Azure AD tenant ID.                                                                                                                                             |
|                   | `tabEndpoint`                       | Public URL endpoint for the Teams tab.                                                                                                                          |
|                   | `multitenant`                       | Enable multi-tenant mode (default: `true`). See [note on multitenant](#notes).                                                                                  |
|                   | `serviceUrl`                        | Bot Framework service URL (default: `https://smba.trafficmanager.net/teams`). See [note on serviceUrl](#notes).                                                 |
| **slack**         |                                     | Slack integration settings. _(Required only if you registered Slack.)_                                                                                          |
|                   | `botToken`                          | Slack bot token from [Step 2](#step-2-register-the-chat-app). A blank value disables Slack.                                                                     |
|                   | `signingSecret`                     | Slack signing secret from [Step 2](#step-2-register-the-chat-app). A blank value disables Slack.                                                                |
|                   | `command`                           | The slash command, must start with `/`. Defaults to `/camunda`. Must match the slash command configured in the Slack app manifest.                              |
| **session**       |                                     | Session management configuration.                                                                                                                               |
|                   | `secure`                            | Set to `true` for HTTPS environments.                                                                                                                           |
|                   | `secret`                            | A random secret string for signing session cookies.                                                                                                             |
| **frontendUrl**   | —                                   | Public URL where the frontend is accessible.                                                                                                                    |
| **backendUrl**    | —                                   | Public URL where the backend is accessible.                                                                                                                     |
| **flavor**        | —                                   | Deployment flavor (must be `self-managed`).                                                                                                                     |
| **organisation**  | `name`                              | Display name for your organization.                                                                                                                             |
| **clusters**      | —                                   | Array of Camunda cluster configurations.                                                                                                                        |
|                   | `uuid`                              | Unique identifier for the cluster.                                                                                                                              |
|                   | `name`                              | Display name for the cluster.                                                                                                                                   |
|                   | `urls.orchestration`                | Zeebe/Orchestration API URL.                                                                                                                                    |
|                   | `urls.tasklist`                     | Tasklist URL (string) or object with `base` and `task`. See note below.                                                                                         |
|                   | `urls.tasklist.base`                | _(Object format only)_ Root Tasklist URL.                                                                                                                       |
|                   | `urls.tasklist.task`                | _(Object format only)_ URL template for deep-linking to a specific task. Must contain `:userTaskKey` placeholder.                                               |
|                   | `urls.operate`                      | Operate URL.                                                                                                                                                    |
|                   | `exporter.apiKey`                   | API key for the exporter. Must match the key configured in the [orchestration cluster Helm chart](#step-3-configure-the-app-integrations-exporter).             |
|                   | `connector.apiKey`                  | _(Optional)_ Separate API key for the App Integrations connector endpoints. Rotates independently of `exporter.apiKey`.                                         |
|                   | `auth.audiences.zeebe`              | _(Optional)_ Overrides the deployment-wide `auth.audiences.zeebe` for this cluster.                                                                             |
|                   | `physicalTenants`                   | _(Optional)_ Physical Tenants hosted on this cluster. See [App Integrations and Physical Tenants](/self-managed/concepts/physical-tenants/app-integrations.md). |
|                   | `exposeDefaultTenant`               | _(Optional)_ Offer the `default` tenant alongside the configured Physical Tenants (default: `false`). No effect unless `physicalTenants` is set.                |
| **subscriptions** | —                                   | Subscription configuration (empty object `{}` for Self-Managed).                                                                                                |

### Notes

- **`teams.multitenant`:** Multi-tenant support is no longer available for newly created Azure Bot registrations. Only set `multitenant` to `true` if you have an existing Teams application that was already registered with multi-tenant support enabled. For all new installations, leave this at the default (the CLI creates single-tenant apps) or explicitly set it to `false`.

- **`teams.serviceUrl`:** The default value (`https://smba.trafficmanager.net/teams`) works for most deployments. Only override it if your environment requires a different Bot Framework service endpoint. If you are unsure, keep the default value.
