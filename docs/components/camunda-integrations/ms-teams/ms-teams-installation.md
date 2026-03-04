---
id: ms-teams-installation
title: Install Camunda for Microsoft Teams
sidebar_label: Install
description: "Install and configure Camunda for Microsoft Teams in a Self-Managed environment using Docker."
---

Install and configure Camunda for Microsoft Teams in a Self-Managed environment using Docker.

:::note
No installation is needed for SaaS environments. The Camunda app is already available in the Microsoft Teams app store and can be used by all users with a Camunda SaaS subscription. See the [Get started](./ms-teams.md#get-started) section for details.
:::

## About

Camunda for Microsoft Teams requires a backend service called **App Integrations** to connect Microsoft Teams to your Camunda Self-Managed distribution. This guide walks you through setting up the backend, registering the Teams app, and configuring the connection.

## Prerequisites

Before you begin, ensure the following are available:

- A running Camunda Self-Managed distribution (for example, `camunda.your-domain.com`) with Identity (Keycloak).
- Docker installed on the system hosting the App Integrations backend.
- A PostgreSQL database accessible from the Docker container.
- Node.js 20 or later for the Teams app integration CLI.
- Microsoft Teams with admin permissions to add apps.
- A DNS name for the App Integrations backend (for example, `app-integrations.camunda.your-domain.com`).

## Step 1: Create applications in Camunda Identity

Before writing the configuration file, register two OAuth 2.0 applications in your Camunda Self-Managed Identity service.

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

### Grant offline access in Keycloak

In your Keycloak admin console, ensure that users who will use the Teams integration have the `offline_access` role assigned. This is required so the application can refresh tokens and act on behalf of users when sending proactive notifications.

You can assign `offline_access` at the realm level (**Realm Roles** → `offline_access`) or via a group/client scope, depending on your setup.

## Step 2: Set up the Microsoft Teams Camunda App using CLI

The `@camunda/teams-app-integration-cli` (command: `c8teams`) automates the creation, build, and deployment of the Teams app package, as well as generating the `teams` section of the backend configuration.

### Install the CLI

```bash
npm install -g @camunda/teams-app-integration-cli
```

### Create a new Teams app project

```bash
c8teams create my-teams-app
```

The CLI prompts you for:

- A project/package name.
- The application display name.
- Your App Integrations backend URL.
- Whether to create a new Teams app and Entra (Azure AD) app or use existing ones.

### Build and deploy

```bash
cd my-teams-app
pnpm install
c8teams build
```

The `build` command compiles the app package from the template and deploys it. You can also deploy separately as follows:

```bash
c8teams deploy
```

This provisions the app in your Microsoft Teams tenant and publishes it to the Teams Admin Portal for approval. After a successful deployment, the CLI automatically prints the `teams` configuration snippet (including `clientId`, `appId`, `appPassword`, `tenantId`, and `tabEndpoint`) ready to paste into your `config.yaml`.

Save this output for [Step 4](#step-4-create-the-configuration-file).

:::tip
If you need to retrieve the configuration snippet again later, run:

```bash
c8teams show-config
```

:::

## Step 3: Configure the App Integrations exporter

The App Integrations backend requires a Zeebe exporter to be configured in your Camunda orchestration cluster. This exporter streams process data to the App Integrations backend.

Add the following configuration to your orchestration cluster Helm chart values:

```yaml
orchestration:
  exporters:
    appIntegrations:
      apiKey:
        secret:
          existingSecret: apiKey-secret
          existingSecretKey: apiKey
  extraConfiguration:
    - file: application.yaml
      content: |
        zeebe:
          broker:
            exporters:
              appIntegrations:
                className: "io.camunda.exporter.appint.AppIntegrationsExporter"
                args:
                  url: <your-public-url>
```

Replace `<your-public-url>` with the public URL of your App Integrations backend (for example, `https://app-integrations.camunda.your-domain.com`).

The `existingSecret` references a Kubernetes Secret that contains the API key. Create this secret in your cluster before deploying:

```bash
kubectl create secret generic apiKey-secret --from-literal=apiKey=<your-exporter-api-key>
```

:::note
The same API key must be set in the `exporter.apiKey` field of the App Integrations [configuration file](#step-4-create-the-configuration-file) so that the backend can authenticate with the exporter endpoint.
:::

## Step 4: Create the configuration file

Create a `config.yaml` file with your configuration settings. This file will be mounted into the Docker container.

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
session:
  secret: ${{ SESSION_SECRET }}
```

You can also use the shorthand `$ENV_VAR_NAME` without braces.

In your deployment, mount the secrets as environment variables on the container (for example, via Kubernetes Secrets, Docker `--env-file`, or your CI/CD pipeline's secret store) rather than storing them in plain text in the config file.

### Example configuration file

Replace the placeholder values with your actual settings. Use the credentials from [Step 1](#step-1-create-applications-in-camunda-identity) and the Teams configuration from [Step 2](#step-2-set-up-the-microsoft-teams-app-cli). The `exporter.apiKey` must match the API key configured in the orchestration cluster Helm chart in [Step 3](#step-3-configure-the-app-integrations-exporter). For production deployments, replace sensitive values with environment variable references as described in [Secret management](#secret-management).

```yaml
serverPort: 8080
stage: prod

auth:
  m2m:
    clientId: <your-m2m-client-id>
    clientSecret: <your-m2m-client-secret>
  spa:
    clientId: <your-spa-client-id>
    clientSecret: <your-spa-client-secret>
  issuer: https://<your-camunda-host>/auth/realms/camunda-platform
  audience: camunda-platform

db:
  username: <your-postgres-username>
  password: <your-postgres-password>
  database: <your-database-name>
  host: <your-postgres-host>
  loginType: password
  encryptionKey: "<your-32-character-encryption-key>"

# Paste the output of `c8teams show-config` here:
teams:
  clientId: <your-azure-ad-client-id>
  appId: <your-teams-app-id>
  appPassword: <your-azure-ad-app-password>
  tenantId: <your-azure-ad-tenant-id>
  tabEndpoint: https://<your-public-url>/ms-teams-app

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
      operate: https://<your-camunda-host>/operate
    exporter:
      apiKey: <your-exporter-api-key>

subscriptions: {}
```

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

- Set `auth.issuer` to your Keycloak realm URL.
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

## Configuration reference

Below is a reference of each section in the `config.yaml` file.

| Section           | Field                               | Description                                                                                                                                         |
| :---------------- | :---------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `serverPort`      | —                                   | The port the backend server listens on inside the container (default: `8080`).                                                                      |
| `stage`           | —                                   | Environment stage: `local`, `dev`, `int`, or `prod`.                                                                                                |
| **auth**          |                                     | Authentication configuration for connecting to your Camunda platform.                                                                               |
|                   | `m2m.clientId` / `m2m.clientSecret` | Machine-to-machine OAuth2 credentials for backend services.                                                                                         |
|                   | `spa.clientId` / `spa.clientSecret` | Single Page Application OAuth2 credentials for frontend.                                                                                            |
|                   | `issuer`                            | The OAuth2/OIDC issuer URL (your Keycloak realm URL).                                                                                               |
|                   | `audience`                          | The OAuth2 audience (typically `camunda-platform`).                                                                                                 |
| **db**            |                                     | PostgreSQL database connection settings.                                                                                                            |
|                   | `username`                          | Database username.                                                                                                                                  |
|                   | `password`                          | Database password.                                                                                                                                  |
|                   | `database`                          | Database name.                                                                                                                                      |
|                   | `host`                              | Database hostname (as reachable from the container).                                                                                                |
|                   | `loginType`                         | Authentication type (`password` for username/password auth).                                                                                        |
|                   | `encryptionKey`                     | 32-character key used for encrypting sensitive data.                                                                                                |
| **teams**         |                                     | Microsoft Teams integration settings.                                                                                                               |
|                   | `clientId`                          | Azure AD app client ID.                                                                                                                             |
|                   | `appId`                             | Teams app ID.                                                                                                                                       |
|                   | `appPassword`                       | Azure AD app password (client secret).                                                                                                              |
|                   | `tenantId`                          | Azure AD tenant ID.                                                                                                                                 |
|                   | `tabEndpoint`                       | Public URL endpoint for the Teams tab.                                                                                                              |
|                   | `multitenant`                       | Enable multi-tenant mode (default: `true`). See [note on multitenant](#notes).                                                                      |
|                   | `serviceUrl`                        | Bot Framework service URL (default: `https://smba.trafficmanager.net/teams`). See [note on serviceUrl](#notes).                                     |
| **session**       |                                     | Session management configuration.                                                                                                                   |
|                   | `secure`                            | Set to `true` for HTTPS environments.                                                                                                               |
|                   | `secret`                            | A random secret string for signing session cookies.                                                                                                 |
| **frontendUrl**   | —                                   | Public URL where the frontend is accessible.                                                                                                        |
| **backendUrl**    | —                                   | Public URL where the backend is accessible.                                                                                                         |
| **flavor**        | —                                   | Deployment flavor (must be `self-managed`).                                                                                                         |
| **organisation**  | `name`                              | Display name for your organization.                                                                                                                 |
| **clusters**      | —                                   | Array of Camunda cluster configurations.                                                                                                            |
|                   | `uuid`                              | Unique identifier for the cluster.                                                                                                                  |
|                   | `name`                              | Display name for the cluster.                                                                                                                       |
|                   | `urls.orchestration`                | Zeebe/Orchestration API URL.                                                                                                                        |
|                   | `urls.tasklist`                     | Tasklist URL.                                                                                                                                       |
|                   | `urls.operate`                      | Operate URL.                                                                                                                                        |
|                   | `exporter.apiKey`                   | API key for the exporter. Must match the key configured in the [orchestration cluster Helm chart](#step-3-configure-the-app-integrations-exporter). |
| **subscriptions** | —                                   | Subscription configuration (empty object `{}` for Self-Managed).                                                                                    |

### Notes

- **`teams.multitenant`:** Multi-tenant support is no longer available for newly created Azure Bot registrations. Only set `multitenant` to `true` if you have an existing Teams application that was already registered with multi-tenant support enabled. For all new installations, leave this at the default (the CLI creates single-tenant apps) or explicitly set it to `false`.

- **`teams.serviceUrl`:** The default value (`https://smba.trafficmanager.net/teams`) works for most deployments. Only override it if your environment requires a different Bot Framework service endpoint. If you are unsure, keep the default value.
