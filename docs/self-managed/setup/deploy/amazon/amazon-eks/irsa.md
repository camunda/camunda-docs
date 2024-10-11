---
id: irsa
title: "IAM roles for service accounts"
description: "Learn how to configure IAM roles for service accounts (IRSA) within AWS to authenticate workloads."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

#### IAM to Kubernetes mapping

Annotate the service account with the `iam_role_arn`:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::<ACCOUNT-ID>:role/aurora-role
  name: <AURORA-SERVICEACCOUNT>
  namespace: <AURORA-NAMESPACE>
```

Replace `<ACCOUNT-ID>`, `<REGION>`, `<EKS-ID>`, `<AURORA-NAMESPACE>`, `<AURORA-SERVICEACCOUNT>`, and `<DB-USERNAME>` with the appropriate values for your AWS environment.

### Keycloak

:::caution
IAM Roles for Service Accounts can only be implemented with Keycloak 21 onwards. This may require you to adjust the version used in the Camunda Helm Chart.
:::

From Keycloak versions 21+, the default JDBC driver can be overwritten, allowing use of a custom wrapper like the [aws-advanced-jdbc-wrapper](https://github.com/awslabs/aws-advanced-jdbc-wrapper) to utilize the features of IRSA. This is a wrapper around the default JDBC driver, but takes care of signing the requests.

Furthermore, the [official Keycloak documentation](https://www.keycloak.org/server/db#preparing-keycloak-for-amazon-aurora-postgresql) also provides detailed instructions for utilizing Amazon Aurora PostgreSQL.

A custom Keycloak container image containing necessary configurations is conveniently accessible on Docker Hub at [camunda/keycloak](https://hub.docker.com/r/camunda/keycloak). This image, built upon the base image [bitnami/keycloak](https://hub.docker.com/r/bitnami/keycloak), incorporates the required wrapper for seamless integration.

#### Container image sources

The sources of the [Camunda Keycloak images](https://hub.docker.com/r/camunda/keycloak) can be found on [GitHub](https://github.com/camunda/keycloak). In this repository, the [aws-advanced-jdbc-wrapper](https://github.com/awslabs/aws-advanced-jdbc-wrapper) is assembled in the `Dockerfile`.

Maintenance of these images is based on the upstream [Bitnami Keycloak images](https://hub.docker.com/r/bitnami/keycloak), ensuring they are always up-to-date with the latest Keycloak releases. The lifecycle details for Keycloak can be found on [endoflife.date](https://endoflife.date/keycloak).

#### Keycloak image configuration

Bitnami Keycloak container image configuration is available at [hub.docker.com/bitnami/keycloak](https://hub.docker.com/r/bitnami/keycloak).

#### Kubernetes configuration

As an example, configure the following environment variables to enable IRSA:

```yaml
# The AWS wrapper is not capable of XA transactions
- name: KEYCLOAK_EXTRA_ARGS
  value: "--db-driver=software.amazon.jdbc.Driver --transaction-xa-enabled=false --log-level=INFO,software.amazon.jdbc:INFO"

# Enable the AWS IAM plugin
- name: KEYCLOAK_JDBC_PARAMS
  value: "wrapperPlugins=iam"
- name: KEYCLOAK_JDBC_DRIVER
  value: "aws-wrapper:postgresql"

# Configure database
- name: KEYCLOAK_DATABASE_USER
  value: db-user-name
- name: KEYCLOAK_DATABASE_NAME
  value: db-name
- name: KEYCLOAK_DATABASE_HOST
  value: db-host
- name: KEYCLOAK_DATABASE_PORT
  value: 5432

# Ref: https://www.keycloak.org/server/configuration-metrics
- name: KEYCLOAK_ENABLE_STATISTICS
  value: "true"

# Needed to see if Keycloak is healthy: https://www.keycloak.org/server/health
- name: KEYCLOAK_ENABLE_HEALTH_ENDPOINTS
  value: "true"
```

:::note
Don't forget to set the `serviceAccountName` of the deployment/statefulset to the created service account with the IRSA annotation.
:::

##### Helm chart

For a Helm-based deployment, you can directly configure these settings using Helm values. Below is an example of how you can incorporate these settings into your Helm chart deployment:

```yaml
identityKeycloak:
  postgresql:
    enabled: false
  image: docker.io/camunda/keycloak:25 # use a supported and updated version listed at https://hub.docker.com/r/camunda/keycloak/tags
  extraEnvVars:
    - name: KEYCLOAK_EXTRA_ARGS
      value: "--db-driver=software.amazon.jdbc.Driver --transaction-xa-enabled=false --log-level=INFO,software.amazon.jdbc:INFO"
    - name: KEYCLOAK_JDBC_PARAMS
      value: "wrapperPlugins=iam"
    - name: KEYCLOAK_JDBC_DRIVER
      value: "aws-wrapper:postgresql"
  externalDatabase:
    host: "aurora.rds.your.domain"
    port: 5432
    user: keycloak
    database: keycloak
```

:::note
For additional details, refer to the [Camunda 8 Helm deployment documentation](/self-managed/setup/install.md).
:::

### Web Modeler

Since Web Modeler RestAPI uses PostgreSQL, configure the `restapi` to use IRSA with Amazon Aurora PostgreSQL. Check the [Web Modeler database configuration](../../../../modeler/web-modeler/configuration/database.md#running-web-modeler-on-amazon-aurora-postgresql) for more details.
Web Modeler already comes fitted with the [aws-advanced-jdbc-wrapper](https://github.com/awslabs/aws-advanced-jdbc-wrapper) within the Docker image.

#### Kubernetes configuration

As an example, configure the following environment variables

```yaml
- name: SPRING_DATASOURCE_DRIVER_CLASS_NAME
  value: software.amazon.jdbc.Driver
- name: SPRING_DATASOURCE_URL
  value: jdbc:aws-wrapper:postgresql://[DB_HOST]:[DB_PORT]/[DB_NAME]?wrapperPlugins=iam
- name: SPRING_DATASOURCE_USERNAME
  value: db-user-name
```

:::note
Don't forget to set the `serviceAccountName` of the deployment/statefulset to the created service account with the IRSA annotation.
:::

### Identity

Since Identity uses PostgreSQL, configure `identity` to use IRSA with Amazon Aurora PostgreSQL. Check the [Identity database configuration](../../../../identity/deployment/configuration-variables.md#running-identity-on-amazon-aurora-postgresql) for more details.
Identity already comes fitted with the [aws-advanced-jdbc-wrapper](https://github.com/awslabs/aws-advanced-jdbc-wrapper) within the Docker image.

#### Kubernetes configuration

As an example, configure the following environment variables

```yaml
- name: SPRING_DATASOURCE_DRIVER_CLASS_NAME
  value: software.amazon.jdbc.Driver
- name: SPRING_DATASOURCE_URL
  value: jdbc:aws-wrapper:postgresql://[DB_HOST]:[DB_PORT]/[DB_NAME]?wrapperPlugins=iam
- name: SPRING_DATASOURCE_USERNAME
  value: db-user-name
```

:::note
Don't forget to set the `serviceAccountName` of the deployment/statefulset to the created service account with the IRSA annotation.
:::

## Amazon OpenSearch Service

### Setup

For Amazon OpenSearch Service, the most common use case is the use of `fine-grained access control`.

Annotate the service account with the `iam_role_arn`:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::<ACCOUNT-ID>:role/opensearch-role
  name: <SERVICE-ACCOUNT>
  namespace: <NAMESPACE>
```

Replace `<ACCOUNT-ID>`, `<REGION>`, `<NAMESPACE>`, and `<SERVICE-ACCOUNT>` with the appropriate values for your Amazon OpenSearch Service and EKS setup.

This step is required to be repeated for Tasklist and Zeebe, to grant their service accounts access to OpenSearch.

#### Database configuration

This setup is sufficient for Amazon OpenSearch Service clusters without `fine-grained access control`.

`Fine-grained access control` adds another layer of security to OpenSearch, requiring you to add a mapping between the IAM role and the internal OpenSearch role. Visit the [AWS documentation](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/fgac.html) on `fine-grained access control`.

There are different ways to configure the mapping within Amazon OpenSearch Service:

- Via a [Terraform module](https://registry.terraform.io/modules/idealo/opensearch/aws/latest) in case your OpenSearch instance is exposed.
- Via the [OpenSearch dashboard](https://opensearch.org/docs/latest/security/access-control/users-roles/).

<details>

<summary>Via the REST API</summary>

To authorize the IAM role in OpenSearch for access, follow these steps:

**_Note that this example uses basic authentication (username and password), which may not be the best practice for all scenarios, especially if fine-grained access control is enabled._** The endpoint used in this example is not exposed by default, so consult your OpenSearch documentation for specifics on enabling and securing this endpoint.

Use the following `curl` command to update the OpenSearch internal database and authorize the IAM role for access. Replace placeholders with your specific values:

```bash
curl -sS -u "<OS_DOMAIN_USER>:<OS_DOMAIN_PASSWORD>" \
    -X PATCH \
    "https://<OS_ENDPOINT>/_opendistro/_security/api/rolesmapping/all_access?pretty" \
    -H 'Content-Type: application/json' \
    -d'
[
  {
    "op": "add",
    "path": "/backend_roles",
    "value": ["<ROLE_NAME>"]
  }
]
'
```

- Replace `<OS_DOMAIN_USER>` and `<OS_DOMAIN_PASSWORD>` with your OpenSearch domain admin credentials.
- Replace `<OS_ENDPOINT>` with your OpenSearch endpoint URL.
- Replace `<ROLE_NAME>` with the IAM role name created by Terraform, which is output by the `opensearch_role` module.

</details>

The important part is assigning the `iam_role_arn` of the previously created `opensearch_role` to an internal role within Amazon OpenSearch Service. For example, `all_access` on the Amazon OpenSearch Service side is a good candidate, or if required, extra roles can be created with more restrictive access.

### Camunda 8 Self-Managed Helm chart configuration

The following is an example configuration that can be used to configure the Camunda 8 Self-Managed Helm chart to use the feature set of IRSA for the Amazon OpenSearch Service Exporter:

```yaml
global:
  elasticsearch:
    enabled: false
  opensearch:
    enabled: true
    aws:
      enabled: true
    url:
      protocol: https
      host: aws.opensearch.example.com
      port: 443

elasticsearch:
  enabled: false

optimize:
  enabled: false
```

:::note
Amazon OpenSearch Service listens on port 443 opposed to the usual port 9200.
:::

:::note
Don't forget to set the `serviceAccountName` of the deployment/statefulset to the created service account with the IRSA annotation.
:::

## Troubleshooting

### Instance Metadata Service (IMDS)

[Instance Metadata Service](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html) is a default fallback for the AWS SDK due to the [default credentials provider chain](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials-chain.html). Within the context of Amazon EKS, it means a pod will automatically assume the role of a node. This can hide many problems, including whether IRSA was set up correctly or not, since it will fall back to IMDS in case of failure and hide the actual error.

Thus, if nothing within your cluster relies on the implicit node role, we recommend disabling it by defining in Terraform the `http_put_response_hop_limit`, for example.

Using a Terraform module like the [Amazon EKS module](https://registry.terraform.io/modules/terraform-aws-modules/eks/aws/latest), one can define the following to decrease the default value of two to one, which results in pods not being allowed to assume the role of the node anymore.

```json
eks_managed_node_group_defaults {
    metadata_options = {
        http_put_response_hop_limit = 1
    }
}
```

Overall, this will disable the role assumption of the node for the Kubernetes pod. Depending on the resulting error within Operate, Zeebe, and Web-Modeler, you'll get a clearer error, which is helpful to debug the error more easily.
