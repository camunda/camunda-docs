---
id: install
sidebar_label: Install
title: Helm chart installation
description: "Camunda provides continuously improved Helm charts, of which are not cloud provider-specific so you can choose your Kubernetes provider."
---

import ZeebeGrid from '../../../components/zeebe/react-components/\_zeebe-card';
import { overviewCards } from './assets/\_install-card-data';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide walks through how to perform a basic installation of Camunda 8 Self-Managed by installing the orchestration cluster and optionally the management cluster.

We recommend using managed services for PostgreSQL, Elasticsearch, and Keycloak when available. This page also includes an optional deployment of these dependencies via operators for cases where managed services are not available.

<!-- TODO: add links to explain the orchestration cluster and management cluster -->

## Installation overview

<ZeebeGrid zeebe={overviewCards} />

## Infrastructure prerequisites

When deploying Camunda 8 Self-Managed, you have two options for infrastructure dependencies:

**Recommended approach**: Use managed services for:

- **PostgreSQL**: For Keycloak, Camunda Identity, and Web Modeler databases
- **Elasticsearch**: For storing Zeebe and Camunda data (orchestration cluster)
- **Keycloak**: For authentication and identity management

**Alternative approach**: If managed services are not available, you can deploy these dependencies using Kubernetes operators as documented in this guide.

### Prerequisites

- **Kubernetes cluster**: A functioning Kubernetes cluster with kubectl access and block storage persistent volumes for stateful components
- **Helm**: Make sure the Helm CLI is installed
- **kubectl**: Configured to access your cluster
- **ClusterAdmin privileges**: Required to install operators (if using the operator-based approach)
- **OpenSSL**: For generating random passwords
- **envsubst command**: Part of `gettext` package for environment variable substitution in manifests

### Environment setup

Before starting the installation, set up the required environment variables:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/operator-playground/generic/kubernetes/operator-based/set-environment.sh
```

These variables will be used throughout the installation process:
- `CAMUNDA_NAMESPACE`: Target namespace for the Camunda Platform deployment
- `CAMUNDA_DOMAIN`: The domain where Camunda will be deployed
- `CAMUNDA_PROTOCOL`: The protocol to use for Camunda URLs (http/https)

### Setting up infrastructure with operators

If you don't have access to managed services, you can use our reference deployment with Kubernetes operators. This deployment provides production-ready infrastructure components that integrate seamlessly with the Camunda Helm chart.

The provided reference architecture repository allows you to directly reuse and extend the existing example base. This sample implementation is flexible to extend to your own needs without the potential limitations of a solution maintained by a third party.

<Tabs groupId="env">
<TabItem value="standard" label="Standard" default>

First, clone the deployment references repository and navigate to the operator-based directory:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/operator-playground/generic/kubernetes/operator-based/get-your-copy.sh
```

Once in the repository directory, navigate to the operator-based folder:

```bash
cd generic/kubernetes/operator-based
```

Set the required environment variables:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/operator-playground/generic/kubernetes/operator-based/set-environment.sh
```

Deploy all infrastructure components:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/operator-playground/generic/kubernetes/operator-based/deploy-all-reqs.sh
```

Create Identity secrets for Camunda Platform:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/operator-playground/generic/kubernetes/operator-based/04-camunda-create-identity-secret.sh
```

Deploy Camunda Platform:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/operator-playground/generic/kubernetes/operator-based/04-camunda-deploy.sh
```

Verify the complete deployment:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/operator-playground/generic/kubernetes/operator-based/verify-all-reqs.sh
```

</TabItem>
</Tabs>

<details>
<summary>Manual step-by-step infrastructure installation</summary>

If you prefer to install components individually, these operators run on both Kubernetes and OpenShift; however, we recommend reviewing each operator's documentation to ensure all prerequisites are met.

**Infrastructure Deployment:**
- Use `--skip-postgresql`, `--skip-elasticsearch`, or `--skip-keycloak` flags to skip specific components
- Infrastructure components are optional if you already use managed services

### 1. PostgreSQL Installation

PostgreSQL uses [CloudNativePG, a CNCF component under Apache 2.0 license](https://landscape.cncf.io/?item=app-definition-and-development--database--cloudnativepg).

This setup provisions three PostgreSQL clusters—one each for Keycloak, Camunda Identity, and Web Modeler. All clusters target PostgreSQL 15, selected as the common denominator across current Camunda components.

**Files:**
- `01-postgresql-install-operator.sh` - Installs the CloudNativePG operator
- `01-postgresql-create-secrets.sh` - Creates authentication secrets to access the databases
- `01-postgresql-clusters.yml` - PostgreSQL cluster definitions
- `01-postgresql-wait-ready.sh` - Waits for clusters to become healthy

**Commands:**
```bash
# Install operator
./01-postgresql-install-operator.sh

# Create secrets (generates random passwords)
./01-postgresql-create-secrets.sh $CAMUNDA_NAMESPACE

# Deploy clusters
kubectl apply -n $CAMUNDA_NAMESPACE -f 01-postgresql-clusters.yml

# Wait for readiness
./01-postgresql-wait-ready.sh $CAMUNDA_NAMESPACE
```

**Verification:**
```bash
./01-postgresql-verify.sh $CAMUNDA_NAMESPACE
```

The deployment creates three PostgreSQL clusters:
- `pg-identity` - For Camunda Identity
- `pg-keycloak` - For Keycloak
- `pg-webmodeler` - For Web Modeler

### 2. Elasticsearch Installation

Elasticsearch uses ECK (Elastic Cloud on Kubernetes), the official operator from Elastic under the Elastic license.

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/operator-playground/generic/kubernetes/operator-based/02-elasticsearch-install-operator.sh
```

Deploy Elasticsearch cluster:

```bash
kubectl apply -n camunda -f 02-elasticsearch-cluster.yml
```

Wait for cluster to be ready:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/operator-playground/generic/kubernetes/operator-based/02-elasticsearch-wait-ready.sh
```

#### Keycloak Installation

Keycloak uses the official [Keycloak Operator under Apache 2.0 license](https://landscape.cncf.io/?item=provisioning--security-compliance--keycloak).

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/operator-playground/generic/kubernetes/operator-based/03-keycloak-install-operator.sh
```

Deploy Keycloak instance:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/operator-playground/generic/kubernetes/operator-based/03-keycloak-deploy.sh
```

Wait for Keycloak to be ready:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/operator-playground/generic/kubernetes/operator-based/03-keycloak-wait-ready.sh
```

</details>

## Installing the orchestration cluster

Once your infrastructure is ready (either managed services or operator-based), you can deploy the Camunda Platform.

### Add the Camunda Helm repository

First, add the Camunda Helm repository:

```bash
helm repo add camunda https://helm.camunda.io
helm repo update
```

### Create namespace

Create a namespace to install the platform on Kubernetes:

```bash
kubectl create namespace camunda
```

### Deploy Camunda Platform

<Tabs groupId="infrastructure">
<TabItem value="operator" label="With Operators" default>

If you deployed infrastructure using operators, use the provided deployment script:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/operator-playground/generic/kubernetes/operator-based/04-camunda-deploy.sh
```

Wait for all components to be ready:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/operator-playground/generic/kubernetes/operator-based/04-camunda-wait-ready.sh
```

Verify the deployment:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/feature/operator-playground/generic/kubernetes/operator-based/04-camunda-verify.sh
```

</TabItem>
<TabItem value="managed" label="With Managed Services">

If you're using managed services, create a custom values file and install:

```bash
helm install camunda camunda/camunda-platform -n camunda -f your-values.yaml
```

Replace `your-values.yaml` with your custom configuration file that points to your managed services.

</TabItem>
<TabItem value="basic" label="Basic Installation">

For a basic installation with default embedded databases (not recommended for production):

```bash
helm install camunda camunda/camunda-platform -n camunda
```

</TabItem>
</Tabs>

### Accessing the orchestration cluster

Run the following command to locally port-forward the orchestration cluster pod to access the UI:

```bash
kubectl port-forward svc/camunda-core 8080:8080 -n camunda
```

Use the following URLs to access the orchestration cluster UIs:

```bash
http://localhost:8080/identity
http://localhost:8080/operate
http://localhost:8080/tasklist
```

**For operator-based deployments**: Use the Keycloak credentials provided during setup.

**For basic installations**: Use the default credentials:

```
username: demo
password: demo
```

## Advanced configuration

The operator-based deployment automatically configures all Camunda components with proper authentication via Keycloak. For custom configurations or manual deployments, you may need additional setup.

<details>
<summary>Manual Keycloak configuration example</summary>

The following components require advanced authentication configuration:

- Optimize
- Web Modeler
- Console
- Management Identity
- Keycloak

These components are enabled by default in the operator-based deployment. For manual configurations, you can create a [values.yaml](https://helm.sh/docs/chart_template_guide/values_files/) file to modify the default configuration.

Example configuration for enabling components with Keycloak:

```yaml
global:
  identity:
    auth:
      enabled: true
      publicIssuerUrl: "http://camunda-keycloak/auth/realms/camunda-platform"
      admin:
        enabled: true
        existingSecret:
          name: "integration-test-credentials"
      webModeler:
        redirectUrl: "http://camunda-modeler"
      console:
        redirectUrl: "http://camunda-console"
        existingSecret:
          name: "integration-test-credentials"
      optimize:
        redirectUrl: "http://camunda-optimize"
        existingSecret:
          name: "integration-test-credentials"
      core:
        redirectUrl: "http://camunda-core:8080"
        existingSecret:
          name: "integration-test-credentials"
      connectors:
        existingSecret:
          name: "integration-test-credentials"
  security:
    authentication:
      method: oidc

identity:
  enabled: true
  firstUser:
    existingSecret: "integration-test-credentials"

identityKeycloak:
  enabled: true
  postgresql:
    auth:
      existingSecret: "integration-test-credentials"
      secretKeys:
        adminPasswordKey: "identity-keycloak-postgresql-admin-password"
        userPasswordKey: "identity-keycloak-postgresql-user-password"
  auth:
    existingSecret: "integration-test-credentials"
    passwordSecretKey: "identity-keycloak-admin-password"

optimize:
  enabled: true

connectors:
  inbound:
    mode: oauth

webModeler:
  enabled: true
  restapi:
    mail:
      fromAddress: noreply@example.com

webModelerPostgresql:
  enabled: true
  auth:
    existingSecret: "integration-test-credentials"
    secretKeys:
      adminPasswordKey: "webmodeler-postgresql-admin-password"
      userPasswordKey: "webmodeler-postgresql-user-password"

core:
  enabled: true
  clusterSize: "1"
  partitionCount: "1"
  replicationFactor: "1"
  env:
    - name: CAMUNDA_SECURITY_INITIALIZATION_MAPPINGS_0_MAPPINGID
      value: "demo-user-mapping"
    - name: CAMUNDA_SECURITY_INITIALIZATION_MAPPINGS_0_CLAIMNAME
      value: "preferred_username"
    - name: CAMUNDA_SECURITY_INITIALIZATION_MAPPINGS_0_CLAIMVALUE
      value: "demo"
    - name: CAMUNDA_SECURITY_INITIALIZATION_MAPPINGS_1_MAPPINGID
      value: "connectors-client-mapping"
    - name: CAMUNDA_SECURITY_INITIALIZATION_MAPPINGS_1_CLAIMNAME
      value: "client_id"
    - name: CAMUNDA_SECURITY_INITIALIZATION_MAPPINGS_1_CLAIMVALUE
      value: "connectors"
    - name: CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_ADMIN_MAPPINGS_0
      value: "demo-user-mapping"
    - name: CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_ADMIN_MAPPINGS_1
      value: "connectors-client-mapping"

console:
  enabled: true
```

</details>

### Next steps

After successful deployment, you can:

1. **Configure monitoring**: Set up Prometheus and Grafana for observability
2. **Set up TLS**: Configure HTTPS for production deployments
3. **Configure backups**: Implement backup strategies for your data
4. **Scale components**: Adjust resource allocation based on your workload

### Cleanup

<details>
<summary>Cleanup instructions</summary>

To remove all components:

```bash
# Remove Camunda Platform
helm uninstall camunda -n camunda

# Remove infrastructure (if using operators)
kubectl delete namespace camunda
kubectl delete namespace cnpg-system
kubectl delete namespace elastic-system
```

**Note:** This will delete all data. For production, ensure proper backup procedures.

</details>

## Additional resources

- [Camunda deployment references repository](https://github.com/camunda/camunda-deployment-references)
- [Helm chart configuration options](/self-managed/installation-methods/helm/)
- [CloudNativePG documentation](https://cloudnative-pg.io/documentation/)
- [Elastic Cloud on Kubernetes (ECK) documentation](https://www.elastic.co/docs/deploy-manage/deploy/cloud-on-k8s)
- [Keycloak Operator documentation](https://www.keycloak.org/operator/installation)

<!-- TODO: Add links to the following:
- Basic auth guide
- Enable Keycloak guide
- Enable OIDC guide
- Explanation of management/orchestration cluster -->

<!--## Next steps

If you would like to further customize the Camunda 8 Self-Managed Helm chart, please proceed to the following section:-->
