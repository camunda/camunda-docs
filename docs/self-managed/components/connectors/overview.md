---
id: overview
title: Overview
description: "The concept of a Connector consists of two parts: - The business logic is implemented by a connector function and executed by a Connector runtime environment."
---

The concept of a [Connector](/components/connectors/introduction.md) consists of two parts:

- The business logic is implemented by a connector function and executed by a [Connector runtime environment](/components/connectors/custom-built-connectors/connector-sdk.md#runtime-environments).
- The user interface during modeling is provided using a [Connector template](/components/connectors/custom-built-connectors/connector-templates.md).

In a [Self-Managed](/self-managed/about-self-managed.md) environment, you manage the execution environment for connectors yourself.
Using our [Connector runtime environments](/components/connectors/custom-built-connectors/connector-sdk.md#runtime-environments), you can consume any set of connectors,
including the [out-of-the-box connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md) and custom connectors developed using the **[Connector SDK](/components/connectors/custom-built-connectors/connector-sdk.md)** and [Connector templates](/components/connectors/custom-built-connectors/connector-templates.md).

You can find connectors developed by Camunda, partners, and the community in [Camunda Marketplace](https://marketplace.camunda.com/en-US/home).

:::note
Some out-of-the-box connectors are licensed under the [Camunda Self-Managed Free Edition license](https://camunda.com/legal/terms/cloud-terms-and-conditions/camunda-cloud-self-managed-free-edition-terms/).
:::

## Connector runtime

The connector runtime environment can be installed using the supported [deployment options](/self-managed/setup/overview.md#deployment-options).

Currently, we support an installation of connectors with [Docker](/self-managed/deployment/docker/docker.md#connectors),
[Docker Compose](/self-managed/quickstart/developer-quickstart/docker-compose.md), [Helm charts](/self-managed/setup/overview.md), and the [manual setup](/self-managed/deployment/manual/install.md#connectors-1).

## Connector templates

For using connectors in the Web or Desktop Modeler, you need to [provide connector templates](/components/connectors/custom-built-connectors/connector-templates.md#providing-and-using-connector-templates).

For the [out-of-the-box connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md) provided by Camunda,
the Connectors release provides a set of all connector templates related to one [release version](https://github.com/camunda/connectors/releases).
If you use the [Docker Compose](/self-managed/quickstart/developer-quickstart/docker-compose.md) installation, you can thus fetch all connector templates that match the versions of the connectors used in the backend.

Alternatively, you can fetch the JSON templates from the respective connector's releases in the respective connectors folder in the [repository](https://github.com/camunda/connectors)
at `connectors/{connector name}/element-templates`.

You can use the connector templates as provided or modify them to your needs as described in our [Connector templates guide](/components/connectors/custom-built-connectors/connector-templates.md).

Review our [Connectors Awesome List](https://github.com/camunda-community-hub/camunda-8-connectors/tree/main) to find more connectors.
