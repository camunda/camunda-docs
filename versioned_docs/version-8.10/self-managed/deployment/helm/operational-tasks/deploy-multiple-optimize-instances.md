---
id: deploy-multiple-optimize-instances
sidebar_label: Deploy multiple Optimize instances
title: Deploy multiple Optimize instances with Helm
description: Deploy two Optimize instances against one Camunda 8.10 orchestration cluster by using two Helm releases.
---

Use two Helm releases to run two independent Optimize instances against one Camunda 8.10 orchestration cluster.

The platform release runs the full Camunda deployment and the first Optimize instance. The second release runs only Optimize and connects to the platform topology's shared services.

:::warning Temporary deployment pattern
Use this pattern as a stopgap when separate Optimize dashboards, configuration, client credentials, or index lifecycles are required. Native Optimize multi-tenancy is the long-term solution and is expected to replace this pattern.

This pattern doesn't provide per-team authorization or process-data isolation. Both Optimize instances import the same orchestration data, and both use the `optimize-api` audience and `Optimize` role.
:::

## Understand the release boundaries

Camunda 8.10 doesn't bundle Elasticsearch, OpenSearch, Keycloak, or PostgreSQL in the Camunda chart. Deploy and manage these dependencies separately.

| Boundary                    | Platform release (`platform`)       | Optimize-only release (`optimize-team-b`)   |
| --------------------------- | ----------------------------------- | ------------------------------------------- |
| Orchestration Cluster       | Runs                                | Doesn't run                                 |
| Management Identity         | Runs as service `platform-identity` | Uses `http://platform-identity:80/identity` |
| Optimize                    | Runs at `/optimize-team-a`          | Runs at `/optimize-team-b`                  |
| Elasticsearch or OpenSearch | Uses the external shared service    | Uses the same external shared service       |
| Keycloak or OIDC provider   | Uses the external shared provider   | Uses the same provider and realm            |
| OIDC client                 | `optimize-team-a`                   | `optimize-team-b`                           |
| Optimize-owned indices      | Prefix `optimize-team-a`            | Prefix `optimize-team-b`                    |
| Other Camunda components    | Run                                 | Explicitly disabled                         |

Both releases must use the same Camunda 8.10 chart and application version. Install them in the same namespace when you use the service names and shared Kubernetes Secrets shown in this guide.

## Check the prerequisites

Before you install the releases, prepare the following:

- A production-ready Kubernetes cluster and a Helm CLI version supported by the Camunda 8.10 chart.
- A single-region Camunda deployment. This pattern relies on Management Identity, which [dual-region deployments don't support](/self-managed/concepts/multi-region/dual-region.md#limitations) — Optimize itself isn't supported there either.
- A namespace with enough capacity for the platform and a second Optimize Deployment.
- An external Elasticsearch or OpenSearch cluster configured for the platform release. Follow the [Elasticsearch](/self-managed/deployment/helm/configure/database/elasticsearch/using-external-elasticsearch.md) or [OpenSearch](/self-managed/deployment/helm/configure/database/using-external-opensearch.md) guide.
- An external Keycloak or supported OIDC provider and a Management Identity configuration. The reference files use the [external Keycloak setup](/self-managed/deployment/helm/configure/authentication-and-authorization/external-keycloak.md).
- An `ingress-nginx` controller, one DNS host, and a TLS Secret for the host. The example relies on `ingress-nginx` merging paths from two Ingress objects with the same host and Ingress class.
- A production values file for the full platform, including external PostgreSQL, datastore authentication and TLS, image pull credentials, and component resources. Follow the [production installation guide](/self-managed/deployment/helm/install/production/index.md).
- Existing Kubernetes Secrets for every credential referenced by the values files. Follow the [secret management guide](/self-managed/deployment/helm/configure/secret-management.md#method-2-external-kubernetes-secrets-recommended-for-all-versions).

The examples use Elasticsearch service `elasticsearch-master` and Keycloak service `keycloak` in the Camunda namespace. Use fully qualified service names when a dependency runs in another namespace.

## Prepare the reference values

The Helm repository contains two values files that are rendered in chart tests:

- `values-platform.yaml` enables the platform and registers both Optimize clients.
- `values-optimize-only.yaml` enables only the second Optimize instance.

Set the chart version you will install, then download both files from the matching release tag. Camunda chart release tags use the format `camunda-platform-8.10-<chart-version>`.

```bash
export CHART_VERSION="<15.x chart version for Camunda 8.10>"
export HELM_SOURCE_REF="camunda-platform-8.10-$CHART_VERSION"
export HELM_VALUES_BASE_URL="https://raw.githubusercontent.com/camunda/camunda-platform-helm/$HELM_SOURCE_REF/charts/camunda-platform-8.10/test/integration/scenarios/chart-full-setup/values/features/multi-optimize"

curl -fsSLo values-platform.yaml \
  "$HELM_VALUES_BASE_URL/values-platform.yaml"
curl -fsSLo values-optimize-only.yaml \
  "$HELM_VALUES_BASE_URL/values-optimize-only.yaml"
```

Update these values in both files before installation:

| Value                                                    | Required change                                                     |
| -------------------------------------------------------- | ------------------------------------------------------------------- |
| `global.host`                                            | Set the shared browser-facing host.                                 |
| `global.ingress.className`                               | Set the `ingress-nginx` class used by both releases.                |
| `global.ingress.tls.secretName`                          | Set the existing TLS Secret for the shared host.                    |
| `global.identity.keycloak.*`                             | Set the in-cluster Keycloak service, port, context path, and realm. |
| `global.identity.auth.publicIssuerUrl`                   | Set the issuer URL reachable from a user's browser.                 |
| `global.identity.auth.issuerBackendUrl`                  | Set the issuer URL reachable from Camunda pods.                     |
| `global.identity.auth.camundaHub.redirectUrl`            | Set the browser-facing Camunda Hub URL in `values-platform.yaml`.   |
| `global.identity.auth.optimize.redirectUrl`              | Set each Optimize instance's browser-facing root URL.               |
| `identity.clients[].rootUrl` for `optimize-team-b`       | Set the second Optimize client's browser-facing root URL.           |
| `orchestration.security.authentication.oidc.redirectUrl` | Set the browser-facing Orchestration Cluster URL.                   |
| `optimize.database.elasticsearch.url.*`                  | Set the shared Elasticsearch endpoint.                              |
| `orchestration.data.secondaryStorage.elasticsearch.url`  | Set the same Elasticsearch endpoint in `values-platform.yaml`.      |
| Every `existingSecret` and `existingSecretKey`           | Match the Secrets managed in your namespace.                        |

The files assume the release names in this guide. If you change `platform`, also change `global.identity.service.url` in `values-optimize-only.yaml` to the generated Management Identity service name.

### Use an external OIDC provider instead of Keycloak

The reference files use Keycloak, where Management Identity reads `identity.clients` and provisions `optimize-team-b`. A generic external OIDC provider doesn't use this automatic provisioning path.

To use another OIDC provider:

1. Follow the [external OIDC provider guide](/self-managed/deployment/helm/configure/authentication-and-authorization/external-oidc-provider.md) for the provider endpoints, claims, and existing-secret values.
1. Register `optimize-team-a` and `optimize-team-b` as separate confidential clients in the provider before installing either release.
1. Configure these callback URLs:

- `https://<host>/optimize-team-a/api/authentication/callback`
- `https://<host>/optimize-team-b/api/authentication/callback`

1. Configure both clients for the `optimize-api` audience and the claims required by your Camunda authorization mapping.
1. Remove the Keycloak-specific `identity.clients` entry and `global.identity.keycloak` configuration from the reference files.
1. Keep the distinct client IDs, existing-secret references, context paths, and Optimize index prefixes.

### Use OpenSearch instead of Elasticsearch

The reference files use Elasticsearch. For OpenSearch, make all of the following changes in both files:

- Disable `optimize.database.elasticsearch` and enable `optimize.database.opensearch`.
- Configure `optimize.database.opensearch.url`, authentication, and TLS by following the [Optimize OpenSearch guide](/self-managed/deployment/helm/configure/database/optimize/using-external-opensearch.md).
- In `values-platform.yaml`, set `orchestration.data.secondaryStorage.type: opensearch` and configure the same OpenSearch endpoint.
- Replace `CAMUNDA_OPTIMIZE_ELASTICSEARCH_SETTINGS_INDEX_PREFIX` with `CAMUNDA_OPTIMIZE_OPENSEARCH_SETTINGS_INDEX_PREFIX` for both Optimize instances and their migration containers.

## Create the credentials Secret

The reference files don't contain plaintext credentials. They read all credentials from a Secret named `multi-optimize-credentials`.

Create the following keys through your secret-management system:

| Secret key                      | Consumer                                   |
| ------------------------------- | ------------------------------------------ |
| `keycloak-admin-password`       | Management Identity setup against Keycloak |
| `identity-first-user-password`  | Initial Management Identity user           |
| `optimize-team-a-client-secret` | First Optimize OIDC client                 |
| `optimize-team-b-client-secret` | Second Optimize OIDC client                |
| `connectors-client-secret`      | Connectors OIDC client                     |
| `orchestration-client-secret`   | Orchestration Cluster OIDC client          |
| `web-modeler-pusher-app-key`    | Web Modeler web app and WebSocket service  |
| `web-modeler-pusher-app-secret` | Web Modeler REST API and WebSocket service |

The two Optimize client secrets must be different. The `optimize-team-b-client-secret` value must be identical for these two references:

- `identity.clients[].secret` in `values-platform.yaml`.
- `global.identity.auth.optimize.secret` in `values-optimize-only.yaml`.

For a disposable test environment, you can create the Secret from environment variables populated by your secret manager:

```bash
kubectl -n "$NAMESPACE" create secret generic multi-optimize-credentials \
  --from-literal=keycloak-admin-password="$KEYCLOAK_ADMIN_PASSWORD" \
  --from-literal=identity-first-user-password="$IDENTITY_FIRST_USER_PASSWORD" \
  --from-literal=optimize-team-a-client-secret="$OPTIMIZE_TEAM_A_CLIENT_SECRET" \
  --from-literal=optimize-team-b-client-secret="$OPTIMIZE_TEAM_B_CLIENT_SECRET" \
  --from-literal=connectors-client-secret="$CONNECTORS_CLIENT_SECRET" \
  --from-literal=orchestration-client-secret="$ORCHESTRATION_CLIENT_SECRET" \
  --from-literal=web-modeler-pusher-app-key="$WEB_MODELER_PUSHER_APP_KEY" \
  --from-literal=web-modeler-pusher-app-secret="$WEB_MODELER_PUSHER_APP_SECRET"
```

Don't store the environment variables or generated Secret manifest in source control.

## Install the platform release

Install the platform release before the Optimize-only release so Management Identity can create the second client.

```bash
export NAMESPACE=camunda
export CAMUNDA_HOST=camunda.example.com

helm repo add camunda https://helm.camunda.io
helm repo update

helm install platform camunda/camunda-platform \
  --namespace "$NAMESPACE" \
  --version "$CHART_VERSION" \
  --values values-production.yaml \
  --values values-platform.yaml \
  --wait
```

The last values file takes precedence. Confirm that your production values don't override the client IDs, context paths, shared service endpoints, or index prefixes from `values-platform.yaml`.

Check the release and its services:

```bash
helm status platform --namespace "$NAMESPACE"
kubectl get pods,services,ingresses --namespace "$NAMESPACE" \
  --selector app.kubernetes.io/instance=platform
```

## Verify the Identity client and assign access

Management Identity creates the `optimize-team-b` confidential client from `identity.clients` when the platform release starts.

1. Open the Keycloak Admin Console for the `camunda-platform` realm.
1. Open **Clients > optimize-team-b**.
1. Confirm the valid redirect URI is `https://<host>/optimize-team-b/api/authentication/callback`.
1. Confirm the client is confidential and uses the expected client secret.
1. Open Management Identity at `https://<host>/identity`.
1. For each user who needs Optimize access, open **Users > user > Assigned roles > Assign roles**, and assign the **Optimize** role. For details, see [assign a role to a user](/self-managed/components/management-identity/application-user-group-role-management/manage-roles.md#assign-a-role-to-a-user).

:::warning Authorization limitation
The distinct client IDs and secrets separate the two applications' OIDC registrations, but they don't separate user authorization. Both clients request the `optimize-api` audience, and the single `Optimize` role grants access to that audience.

Any user with the `Optimize` role can authenticate to both Optimize instances. Don't use this pattern when Team A must be prevented from accessing Team B's Optimize instance.
:::

## Install the Optimize-only release

Install the second release with the exact chart version used by the platform release:

```bash
helm install optimize-team-b camunda/camunda-platform \
  --namespace "$NAMESPACE" \
  --version "$CHART_VERSION" \
  --values values-optimize-only.yaml \
  --wait
```

The second values file explicitly disables Management Identity, Camunda Hub, Web Modeler, Connectors, and the Orchestration Cluster. The release creates one Optimize Deployment plus its Service, ConfigMaps, ServiceAccount, and Ingress.

Verify that only the Optimize workload was created:

```bash
kubectl get deployments,statefulsets --namespace "$NAMESPACE" \
  --selector app.kubernetes.io/instance=optimize-team-b
```

The output must contain only the `optimize-team-b` Deployment and no StatefulSet.

## Verify Ingress and authentication

The two releases create separate Ingress objects with the same host and different paths. `ingress-nginx` merges these rules into one virtual host:

| Release           | Path               | Callback URL                                                 |
| ----------------- | ------------------ | ------------------------------------------------------------ |
| `platform`        | `/optimize-team-a` | `https://<host>/optimize-team-a/api/authentication/callback` |
| `optimize-team-b` | `/optimize-team-b` | `https://<host>/optimize-team-b/api/authentication/callback` |

Check the generated rules:

```bash
kubectl get ingress --namespace "$NAMESPACE" \
  --selector app.kubernetes.io/part-of=camunda-platform
kubectl describe ingress --namespace "$NAMESPACE" \
  --selector app.kubernetes.io/instance=platform
kubectl describe ingress --namespace "$NAMESPACE" \
  --selector app.kubernetes.io/instance=optimize-team-b
```

Check each authentication redirect:

```bash
curl --silent --show-error --dump-header - --output /dev/null \
  --location --max-redirs 5 \
  "https://$CAMUNDA_HOST/optimize-team-a" \
  | tr -d '\r' | grep -i '^location:.*client_id=optimize-team-a'

curl --silent --show-error --dump-header - --output /dev/null \
  --location --max-redirs 5 \
  "https://$CAMUNDA_HOST/optimize-team-b" \
  | tr -d '\r' | grep -i '^location:.*client_id=optimize-team-b'
```

Both commands must print a redirect to the configured OIDC provider with the intended `client_id`. Complete a browser login to both URLs with a user assigned the `Optimize` role.

Using the same host for multiple Ingress objects is controller-specific. This guide supports `ingress-nginx`. If your controller doesn't merge same-host rules, use separate hosts and update `global.host`, each Optimize `redirectUrl`, the custom client's `rootUrl`, and the Keycloak callback URI.

## Verify process data and index isolation

Both Optimize instances read the same `zeebe-record` indices produced by the Orchestration Cluster. The 8.10 chart automatically enables the legacy Zeebe exporter when Optimize and its Elasticsearch or OpenSearch connection are enabled. This pattern applies to single-region deployments only — [dual-region deployments don't support Optimize](/self-managed/concepts/multi-region/dual-region.md#limitations).

1. Deploy a test process to the shared Orchestration Cluster.
1. Start and complete at least one process instance.
1. Open both Optimize URLs and confirm the process is available in each instance after import completes.
1. Query the shared datastore and confirm each Optimize instance writes its own indices.

For an unauthenticated in-cluster Elasticsearch test service, port-forward the service:

```bash
kubectl port-forward --namespace "$NAMESPACE" service/elasticsearch-master 9200:9200
```

In another terminal, list the source and Optimize-owned indices:

```bash
curl --fail --silent 'http://localhost:9200/_cat/indices?h=index&s=index' \
  | grep -E '^(zeebe-record|optimize-team-a|optimize-team-b)'
```

The result must include the shared `zeebe-record` source indices and two non-overlapping Optimize index families. Use the authentication and TLS options required by your datastore instead of the unauthenticated port-forward example in production.

The `CAMUNDA_OPTIMIZE_ELASTICSEARCH_SETTINGS_INDEX_PREFIX` values isolate Optimize-owned indices only. They don't filter the process records each Optimize imports. For all index-prefix rules and the OpenSearch equivalent, see [configure Elasticsearch and OpenSearch index prefixes](/self-managed/deployment/helm/configure/database/elasticsearch/configure-elasticsearch-prefix-indices.md#optimize-specific-configuration).

## Plan resource capacity

The second release is a complete additional Optimize runtime. Account for the following capacity:

- Set `optimize.resources` and `optimize.migration.resources` independently for each release.
- Reserve compute and memory for two importers, query workloads, and migration init containers.
- Size Elasticsearch or OpenSearch for both Optimize-owned index families and concurrent reads from the shared `zeebe-record` indices.
- Expect the shared datastore and OIDC provider to remain common failure and performance boundaries.
- Test backup, retention, and upgrades for each Optimize index prefix. Helm uninstall doesn't remove datastore indices.

Review the [shared Elasticsearch/OpenSearch guidance](/self-managed/components/optimize/configuration/shared-elasticsearch-cluster.md) before using this topology in production.

## Troubleshoot the deployment

Use these commands to inspect both releases:

```bash
helm get values platform --namespace "$NAMESPACE"
helm get values optimize-team-b --namespace "$NAMESPACE"
kubectl get pods,services,ingresses --namespace "$NAMESPACE"
kubectl logs --namespace "$NAMESPACE" deployment/platform-optimize
kubectl logs --namespace "$NAMESPACE" deployment/optimize-team-b
```

| Symptom                                                 | Check                                                                                                                                              |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| The second Optimize pod can't reach Management Identity | Confirm `global.identity.service.url` resolves to `http://platform-identity:80/identity` and the platform Identity endpoints are ready.            |
| Login returns an invalid redirect URI                   | Compare `optimize.contextPath`, `global.identity.auth.optimize.redirectUrl`, the custom client's `rootUrl`, and the Keycloak callback URI.         |
| Both URLs use the same client ID                        | Confirm each release received the intended values file and inspect `application-ccsm.yaml` in its Optimize ConfigMap.                              |
| One path returns 404                                    | Confirm both Ingress objects use the same host and Ingress class, have distinct paths, and are reconciled by `ingress-nginx`.                      |
| The second release creates unrelated workloads          | Confirm `values-optimize-only.yaml` is the final values layer and that no later file enables components.                                           |
| Optimize starts but doesn't show process data           | Confirm both releases use the same datastore and `zeebe-record` prefix, and check the legacy exporter and Optimize importer logs.                  |
| Optimize-owned indices overlap                          | Confirm the two `CAMUNDA_OPTIMIZE_ELASTICSEARCH_SETTINGS_INDEX_PREFIX` or OpenSearch prefix values are distinct and weren't changed after startup. |

Don't add hand-written Deployments, Services, Ingresses, or `global.extraManifests` to repair a mismatch. Correct the supported chart values and run `helm upgrade` for the affected release.

## Clean up the releases

Remove the Optimize-only release before the platform release:

```bash
helm uninstall optimize-team-b --namespace "$NAMESPACE"
helm uninstall platform --namespace "$NAMESPACE"
```

If the Secret and namespace were created only for this deployment, remove them after both releases are gone:

```bash
kubectl delete secret multi-optimize-credentials --namespace "$NAMESPACE"
kubectl delete namespace "$NAMESPACE"
```

Helm doesn't delete indices from an external Elasticsearch or OpenSearch cluster. Retain, back up, or delete the `optimize-team-a*` and `optimize-team-b*` index families according to your datastore lifecycle policy.
