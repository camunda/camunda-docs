---
id: environments
title: Environments and Physical Tenants
sidebar_label: Environments
description: "Configure how Camunda Hub Self-Managed creates environments from your clusters and Physical Tenants, and how it determines their status."
---

Camunda Hub creates the [environments](/components/concepts/environments.md) of your organization from the clusters in its configuration. An environment appears only if its cluster is in your configuration. For how an environment maps to a cluster or to a Physical Tenant, and how Camunda Hub names it, see [how an environment maps to infrastructure](/components/concepts/environments.md#how-an-environment-maps-to-infrastructure).

Camunda Hub reads the cluster configuration once at startup on every instance, so after you change it, perform a rolling restart.

## Physical Tenants

Declare the [Physical Tenants](/self-managed/concepts/multi-tenancy/physical-tenants.md) of your clusters with `physical-tenants` in the cluster configuration. Camunda Hub surfaces each declared Physical Tenant, and the `default` Physical Tenant of every cluster, as an environment. If you declare `physical-tenants` on a cluster earlier than 8.10, Camunda Hub ignores them and logs a warning.

If you deploy with the Helm chart, see [Physical Tenants in the Helm topology](/self-managed/deployment/helm/install/topology/physical-tenants.md) for how the chart maps them. Physical Tenants require OIDC authentication. They don't support Basic authentication.

### Declare Physical Tenants

Declare each additional Physical Tenant of a cluster with `physical-tenants`. See [how an environment maps to infrastructure](/components/concepts/environments.md#how-an-environment-maps-to-infrastructure) for how Camunda Hub names the environment of a tenant.

| Property                                                 | Description                                                                                                                             | Required |
| :------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- | :------- |
| `camunda.hub.clusters[0].physical-tenants[0].id`         | The ID of the Physical Tenant. Camunda Hub shows it as the environment name.                                                            | Yes      |
| `camunda.hub.clusters[0].physical-tenants[0].name`       | Reserved. Camunda Hub accepts the key, but doesn't use it yet. The name of the environment is the ID of the Physical Tenant.            | No       |
| `camunda.hub.clusters[0].physical-tenants[0].components` | The [components](properties.md#components) that differ from the cluster for this tenant. Each component needs a `type` and a `version`. | No       |

Example configuration:

```yaml
camunda:
  hub:
    clusters:
      - id: camunda-platform
        # other fields...
        physical-tenants:
          - id: paymentsprod
          - id: lendingprod
```

Each Physical Tenant of a cluster shows the same [tags](properties.md#clusters) as the cluster. The tenant inherits the web application addresses of the cluster, and Camunda Hub adds the `/physical-tenants/<tenant ID>` path for the tenants other than `default`.

### Override components for a Physical Tenant

Use `components` on a Physical Tenant to point it at its own component instances. This is a partial override:

- Only the component types you list are replaced for the tenant. A listed component replaces the cluster entry completely, so set every address the tenant needs, such as `urls.webapp` and `urls.readiness`.
- Every other component keeps using the configuration of the cluster, and follows later changes to it.
- A tenant other than `default` never inherits Optimize from the cluster, because Optimize needs its own instance for each Physical Tenant. Add an `optimize` component to the tenant to show Optimize.
- If you remove the override and restart Camunda Hub, the component uses the configuration of the cluster again.

Example configuration that overrides only Optimize for the `paymentsprod` tenant. The other components still come from the cluster:

```yaml
camunda:
  hub:
    clusters:
      - id: camunda-platform
        # other fields...
        physical-tenants:
          - id: paymentsprod
            components:
              - type: optimize
                version: 8.10.0
                urls:
                  webapp: https://optimize-payments-prod.example.com
                  readiness: https://optimize-payments-prod.example.com/api/readyz
```

If a cluster earlier than 8.10 declares `components` on a tenant, Camunda Hub fails to start with the message `must not declare physical tenant 'components' if 'version' is lower than the minimum physical tenant version`.

## Environment status

Camunda Hub sends an HTTP request to the `urls.readiness` address of each component of an environment to determine its status. The status of the environment is the worst result of its components. From worst to best, the order is **Unhealthy**, **Unknown**, **Healthy**. One **Unhealthy** component makes the environment **Unhealthy**, even if other components are **Unknown**. An environment is **Healthy** only if all of its components are Healthy.

| Component response                                                                                      | Status    |
| :------------------------------------------------------------------------------------------------------ | :-------- |
| A successful response, with no body or with a `status` of `up` or `ready`                               | Healthy   |
| An error response, or any other `status`                                                                | Unhealthy |
| No `readiness` address, no response within five seconds, a redirect, or a body without a `status` field | Unknown   |

A cluster that you configure with `url` instead of `components` has no readiness address, so its environments always have the status **Unknown**.

With the Helm chart, the `readiness` address of the Optimize component of a Physical Tenant is set only if you set `readinessUrl` for that component. Without it, the component has no readiness address, and the environment of the tenant has the status **Unknown**.

## Not reported environments

If you remove a cluster or Physical Tenant from the configuration, but its environment is still assigned to a workspace, the environment stays in Camunda Hub with the status **Not reported**. It shows no live data, and you can't select it for a deployment. Remove the assignment from the workspace when you no longer need it.
