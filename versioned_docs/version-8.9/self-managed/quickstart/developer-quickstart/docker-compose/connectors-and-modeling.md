---
title: Use connectors and deploy processes with Docker Compose
sidebar_label: Connectors and modeling
description: Configure connector secrets, add custom connectors, and deploy processes with Desktop Modeler or Web Modeler in Docker Compose.
---

Use this page to work with connectors and local modeling tools in the Docker Compose quickstart.

## Use connectors

Both the lightweight and full Docker Compose configurations include built-in connectors for integrating with external systems. The connector runtime executes outbound connectors called from BPMN processes, and inbound connectors that trigger process instances from external events.

For connector overviews and installation details, see:

- [Available connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md)
- [Connector installation guide](/self-managed/components/connectors/overview.md)

### Connector secrets

When you run Camunda locally with Docker Compose, some [connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md) require credentials or API keys to connect with external services such as Slack, SendGrid, or AWS. Store those values as secrets instead of hardcoding them in your process models.

You can add secrets to the connector runtime with the included `connector-secrets.txt` file:

1. Open `connector-secrets.txt` in the extracted directory.
1. Add secrets in the format `NAME=VALUE`, one per line:

   ```text
   SLACK_TOKEN=xoxb-your-token-here
   SENDGRID_API_KEY=SG.your-api-key
   ```

1. Save the file. The secrets become available in connector configurations with the syntax `{{secrets.NAME}}`. For example, `{{secrets.SLACK_TOKEN}}`.

:::warning
Do not commit `connector-secrets.txt` to version control with real credentials. Use placeholder values in the repository and configure actual secrets in each environment.
:::

For more details, see [configure connector secrets](/self-managed/components/connectors/connectors-configuration.md).

### Custom connectors

In addition to the built-in connectors, you can add custom connectors.

To include custom connectors:

- Create a new Docker image that bundles your connectors, as described in the [Connectors repository](https://github.com/camunda/connectors).
- Mount the connector JARs as volumes into the `/opt/app` directory in the Docker Compose file.

Each connector JAR must include all required dependencies inside the JAR.

## Deploy and execute processes

You can deploy and execute processes with either Desktop Modeler or Web Modeler.

### Deploy with Desktop Modeler

[Desktop Modeler](https://camunda.com/download/modeler/) is a free, open-source desktop application for modeling BPMN, DMN, and Camunda Forms.

#### Lightweight configuration

To deploy from Desktop Modeler to the lightweight configuration:

1. Open Desktop Modeler and click the deployment icon.
1. Select **Camunda 8 Self-Managed**.
1. Configure the connection:
   - **Cluster endpoint:** `http://localhost:8088/v2`
   - **Authentication:** **None**
1. Click **Deploy**.

For more details, see [deploy to Self-Managed from Desktop Modeler](/self-managed/components/modeler/desktop-modeler/deploy-to-self-managed.md).

#### Full configuration

To deploy from Desktop Modeler to the full configuration:

1. Open Desktop Modeler and click the deployment icon.
1. Select **Camunda 8 Self-Managed**.
1. Configure the connection:
   - **Cluster endpoint:** `http://localhost:8088/v2`
   - **Authentication:** **OAuth**
   - **OAuth URL:** `http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token`
   - **Client ID:** `orchestration`
   - **Client secret:** `secret`
   - **Audience:** `orchestration-api`
1. Click **Deploy**.

:::tip
The full configuration uses Keycloak for OIDC authentication. The client credentials are preconfigured in the `.env` file and admin configuration.
:::

### Deploy with Web Modeler

:::note
Non-production installations of Web Modeler are limited to five collaborators per project. See [Licensing](/reference/licenses.md).
:::

[Web Modeler](/components/modeler/web-modeler/launch-web-modeler.md) provides a browser-based interface for creating and deploying BPMN, DMN, and form diagrams. It is included in the full configuration by default, and can also run as a standalone setup.

#### Standalone setup

To start Web Modeler and its dependencies independently, run:

```shell
docker compose -f docker-compose-web-modeler.yaml up -d
```

To stop Web Modeler and remove all data and volumes, run:

```shell
docker compose -f docker-compose-web-modeler.yaml down -v
```

#### Deploy or execute a process

When you use the full configuration, Web Modeler connects automatically to the local Orchestration Cluster started by `docker-compose-full.yaml`. You can deploy and run processes directly from the Web Modeler interface.

1. Log in to Web Modeler at [http://localhost:8070](http://localhost:8070) with `demo` / `demo`.
1. [Create a new project](/components/modeler/web-modeler/launch-web-modeler.md) or open an existing BPMN diagram.
1. Use the visual modeler to [design your BPMN process](/components/modeler/bpmn/bpmn.md).
1. Click **Deploy** to deploy the diagram to the preconfigured Orchestration Cluster.
1. After deployment, you can [create process instances](/components/concepts/process-instance-creation.md) and monitor them in [Operate](http://localhost:8080/operate).

Web Modeler uses the `BEARER_TOKEN` authentication method to communicate with the Orchestration Cluster. The user's authentication token from Management Identity is used automatically for deployment.

:::note
Web Modeler is not included in the lightweight configuration. To use Web Modeler with the lightweight configuration:

1. Run Web Modeler separately with `docker-compose-web-modeler.yaml`.
1. Manually configure the cluster connection in Web Modeler.
1. Use `NONE` or `BASIC` authentication for the lightweight Orchestration Cluster.

For details, see [configure Web Modeler clusters](/self-managed/components/modeler/web-modeler/configuration/configuration.md#clusters).
:::

#### Emails

The Docker Compose setup includes [Mailpit](https://github.com/axllent/mailpit) as a test SMTP server. Mailpit captures all emails sent by Web Modeler, but does not forward them to actual recipients.

You can access emails in Mailpit at [http://localhost:8075](http://localhost:8075).

## Next steps

- Follow the [getting started guide](/guides/getting-started-example.md) to create a Java project and connect to your local cluster.
- Learn [BPMN fundamentals](/components/modeler/bpmn/bpmn-primer.md) and [best practices](/components/best-practices/best-practices-overview.md).
- Explore the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) and [client libraries](/apis-tools/working-with-apis-tools.md).
