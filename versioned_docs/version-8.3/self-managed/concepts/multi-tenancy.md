---
id: multi-tenancy
title: "Multi-tenancy"
sidebar_label: "Multi-tenancy"
description: "Multi-tenancy allows you to re-use your Camunda installation."
---

:::caution

Multi-tenancy is disabled by default and can be enabled by the use of environment variables. This feature should be
enabled in all required components, see:

- [Identity feature flags](../../../self-managed/identity/deployment/configuration-variables/#feature-flags)
- [Zeebe multi-tenancy](../../../self-managed/zeebe-deployment/configuration/gateway-config/#zeebegatewaymultitenancy)
- [Operate multi-tenancy](../../../self-managed/operate-deployment/operate-configuration/#multi-tenancy)
- [Tasklist multi-tenancy](../../../self-managed/tasklist-deployment/tasklist-configuration/#multi-tenancy)
- [Optimize multi-tenancy]($optimize$/self-managed/optimize-deployment/configuration/multi-tenancy/)
- [Connectors multi-tenancy](../../../self-managed/connectors-deployment/connectors-configuration/#multi-tenancy)

When using Helm Charts, you can enable multi-tenancy globally with the flag `global.multitenancy.enabled`.
Visit [the Helm chart configuration](https://github.com/camunda/camunda-platform-helm/blob/main/charts/camunda-platform/README.md#global-parameters) for additional details.

:::

:::caution

Multi-tenancy is currently only available for Camunda 8 Self-Managed with authentication enabled [through Identity](../../../self-managed/identity/what-is-identity/).
See list of [additional limitations](#unsupported-features) below.

:::

## Multi-tenancy in Camunda 8

Multi-tenancy in the context of Camunda 8 refers to the ability of the Camunda 8 platform to serve multiple distinct
tenants or clients within a single installation. Multi-tenancy in Camunda 8 extends these capabilities to cater to the
needs of different departments, teams, or even external clients, all within a shared Camunda environment. Here's a closer
look at what multi-tenancy is in Camunda 8:

### Isolation of Data and Processes

In a multi-tenant Camunda 8 installation, each tenant's data and processes are logically isolated from one another.
This means that one tenant's workflows, data models, and process configurations do not interfere with or impact the
operations of other tenants. Each tenant operates in a separate and secure space within the same Camunda 8 instance.

### Resource Sharing

Despite the isolation, multi-tenancy in Camunda 8 allows for efficient resource sharing. Tenants can leverage the same
Camunda 8 software installation, reducing infrastructure costs and resource overhead. This shared model optimizes
resource utilization and ensures that the platform remains cost-effective.

### Efficient Administration

Administrators can manage all tenants from a centralized administration console. This simplifies the process of
monitoring and maintaining different tenant environments, making administrative tasks more efficient and reducing
overhead.

### Security

Security is a paramount concern in multi-tenant Camunda 8 installations. Robust access control mechanisms ensure that
tenants cannot access each other's data or processes. Security measures are in place to maintain the privacy and
integrity of each tenant's information.

### Cost-Effective

Multi-tenancy in Camunda 8 is particularly beneficial for organizations that want to offer BPM and workflow automation
capabilities to different departments or clients without the need for separate Camunda installations. This
cost-effective approach minimizes infrastructure and maintenance costs.

## How does it work?

Camunda 8 implements multi-tenancy by relying on tenant identifiers in a single Camunda 8 installation. The data of
all tenants is stored in a single data warehouse. Isolation is provided by appending a tenant identifier to each data
entry (ex. process definition, process instance, job, etc.)

### The tenant identifier

The Camunda 8 tenant identifier will be set as a property to any data produced by Camunda 8. When multi-tenancy is
disabled, all data is mapped to the `<default>` tenant identifier.

:::note
The `<default>` tenant identifier is a reserved identifier and it can't be modified by users.
:::

Organizations can add additional tenants and their identifiers may have the following:

- Alphanumeric characters
- Dashes (`-`)
- Underscores (`_`)
- Dots (`.`)
- A maximum length of 31 characters.

### Inherited tenant ownership

Tenant ownership in Camunda 8 is hierarchical. A user may only deploy resources to an authorized tenant and any
Camunda 8 data produced from these resources will belong to the same tenant. The following diagram provides a nice
example on how tenant ownership is inherited.

![Tenant ownership inheritance diagram](img/multi-tenancy.png)

## Unsupported features

In Camunda 8.3, multi-tenancy only works for Self-Managed installations with authentication enabled [through Identity](../../../self-managed/identity/what-is-identity/).

The following features only work when multi-tenancy is disabled, or only with the `default` tenant
when multi-tenancy is enabled:

- [Signal](../../components/concepts/signals.md) broadcasting
- [Resource deletion](../../apis-tools/grpc.md#deleteresource-rpc)

Furthermore, the following Camunda-maintained clients don't support multi-tenancy, and can only be used when
multi-tenancy is disabled:

- [Zeebe Go client](../../apis-tools/go-client/go-get-started.md)
- [Zeebe CLI client](../../apis-tools/cli-client/cli-get-started.md)
