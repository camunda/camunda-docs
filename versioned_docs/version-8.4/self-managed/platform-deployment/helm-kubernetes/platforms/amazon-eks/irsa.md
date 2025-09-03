---
id: irsa
title: "IAM roles for service accounts"
description: "Learn how to configure IAM roles for service accounts (IRSA) within AWS to authenticate workloads."
---

IAM roles for service accounts (IRSA) is a way within AWS to authenticate workloads in Amazon EKS (Kubernetes), for example, to execute signed requests against AWS services. This is a replacement for basic auth and is generally considered a [best practice by AWS](https://aws.github.io/aws-eks-best-practices/security/docs/iam/).

The following considers the managed services by AWS and provided examples are in Terraform syntax.

## Aurora PostgreSQL

[Aurora PostgreSQL](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.AuroraPostgreSQL.html) is a managed AWS PostgreSQL–compatible service.

### Setup

When using the Terraform provider of [AWS](https://registry.terraform.io/providers/hashicorp/aws/latest) with the resource [aws_rds_cluster](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/rds_cluster) to create a new rational database (RDS) or Aurora cluster, supply the argument `iam_database_authentication_enabled = true` to enable the IAM roles functionality. See the [AWS documentation](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.html) for availability and limitations.

#### AWS policy

An AWS policy (later assigned to a role) is required to allow assuming a database user within a managed database. See the [AWS documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.IAMPolicy.html) for policy details.

Create the policy via Terraform using the [aws_iam_policy](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_policy).

```json
resource "aws_iam_policy" "rds_policy" {
  name = "rds-policy"

  policy = jsonencode({
   "Version": "2012-10-17",
   "Statement": [
      {
         "Effect": "Allow",
         "Action": [
             "rds-db:connect"
         ],
         "Resource": [
             "arn:aws:rds-db:region:account-id:dbuser:DbiResourceId/db-user-name"
         ]
      }
   ]
})
}
```

#### IAM to Kubernetes mapping

To assign the policy to a role for the IAM role to service account mapping in Amazon EKS, a Terraform module like [iam-role-for-service-accounts-eks](https://registry.terraform.io/modules/terraform-aws-modules/iam/aws/latest/submodules/iam-role-for-service-accounts-eks) is helpful.

```json
module "aurora_role" {
  source    = "terraform-aws-modules/iam/aws//modules/iam-role-for-service-accounts-eks"
  role_name = "aurora-role"

  role_policy_arns = {
    policy = aws_iam_policy.rds_policy.arn
  }

  oidc_providers = {
    main = {
      provider_arn               = "arn:aws:iam::account-id:oidc-provider/oidc.eks.region.amazonaws.com/id/eks-id"
      namespace_service_accounts = ["aurora-namespace:aurora-serviceaccount"]
    }
  }
}
```

These two Terraform snippets allow the service account `aurora-serviceaccount` within the `aurora-namespace` to assume the user `db-user-name` within the database `DbiResourceId`.
The output of the module `aurora_role` has the output `iam_role_arn` to annotate a service account to make use of the mapping.

Annotate the service account with the `iam_role_arn` output of the `aurora_role`.

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::account-id:role/role-name
  name: aurora-serviceaccount
  namespace: aurora-namespace
```

#### Database configuration

The setup required on the Aurora PostgreSQL side is to create the user and assign the required permissions to it. The following is an example when connected to the PostgreSQL database, and can also be realized by using a [Terraform PostgreSQL Provider](https://registry.terraform.io/providers/cyrilgdn/postgresql/latest/docs). See the [AWS documentation](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.DBAccounts.html#UsingWithRDS.IAMDBAuth.DBAccounts.PostgreSQL) for reference concerning Aurora specific configurations.

```SQL
# create user and grant rds_iam role, which requires the user to login via IAM authentication over password
CREATE USER "db-user-name";
GRANT rds_iam TO "db-user-name";

# create some database and grant the user all privileges to it
CREATE DATABASE "some-db";
GRANT ALL privileges on database "some-db" to "db-user-name";
```

### Keycloak

:::caution
IAM Roles for Service Accounts can only be implemented with Keycloak 21 onwards. This may require you to adjust the version used in the Camunda Helm Chart.
:::

From Keycloak versions 21+, the default JDBC driver can be overwritten, allowing use of a custom wrapper like the [aws-advanced-jdbc-wrapper](https://github.com/awslabs/aws-advanced-jdbc-wrapper) to utilize the features of IRSA. This is a wrapper around the default JDBC driver, but takes care of signing the requests.

Furthermore, the [official Keycloak documentation](https://www.keycloak.org/server/db#preparing-keycloak-for-amazon-aurora-postgresql) also provides detailed instructions for utilizing Amazon Aurora PostgreSQL.

A custom Keycloak container image containing necessary configurations is conveniently accessible on Docker Hub at [camunda/keycloak](https://hub.docker.com/r/camunda/keycloak). This image, built upon the base image [bitnami/keycloak](https://hub.docker.com/r/bitnamilegacy/keycloak), incorporates the required wrapper for seamless integration.

#### Container image sources

The sources of the [Camunda Keycloak images](https://hub.docker.com/r/camunda/keycloak) can be found on [GitHub](https://github.com/camunda/keycloak). In this repository, the [aws-advanced-jdbc-wrapper](https://github.com/awslabs/aws-advanced-jdbc-wrapper) is assembled in the `Dockerfile`.

Maintenance of these images is based on the upstream [Bitnami Keycloak images](https://hub.docker.com/r/bitnamilegacy/keycloak), ensuring they are always up-to-date with the latest Keycloak releases. The lifecycle details for Keycloak can be found on [endoflife.date](https://endoflife.date/keycloak).

#### Keycloak image configuration

Bitnami Keycloak container image configuration is available at [hub.docker.com/bitnami/keycloak](https://hub.docker.com/r/bitnamilegacy/keycloak).

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
identity:
  keycloak:
    postgresql:
      enabled: false
    image: docker.io/camunda/keycloak:23 # use a supported and updated version listed at https://hub.docker.com/r/camunda/keycloak/tags
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
For additional details, refer to the [Camunda 8 Helm deployment documentation](../../../deploy/).
:::

### Web Modeler

As the Web Modeler REST API uses PostgreSQL, configure the `restapi` to use IRSA with Amazon Aurora PostgreSQL. Check the [Web Modeler database configuration](../../../../modeler/web-modeler/configuration/database.md#running-web-modeler-on-amazon-aurora-postgresql) for more details.
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

## OpenSearch

[AWS OpenSearch](https://aws.amazon.com/opensearch-service/) is a managed OpenSearch service provided by AWS, which is a distributed search and analytics engine built on Apache Lucene.

:::note
As of the 8.4 release, Zeebe, Operate, and Tasklist are now compatible with [Amazon OpenSearch](https://aws.amazon.com/de/opensearch-service/) 2.5.x. Note that using Amazon OpenSearch requires [setting up a new Camunda installation](/self-managed/platform-deployment/overview.md). A migration from previous versions or Elasticsearch environments is currently not supported.
:::

### Setup

For OpenSearch, the most common use case is the use of `fine-grained access control`.

When using the Terraform provider of [AWS](https://registry.terraform.io/providers/hashicorp/aws/latest) with the resource [opensearch_domain](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/opensearch_domain) to create a new OpenSearch cluster, supply the arguments:

- `advanced_security_options.enabled = true`
- `advanced_security_options.anonymous_auth_enabled = false` to activate `fine-grained access control`.

Without `fine-grained access control`, anonymous access is enabled and would be sufficient to supply an IAM role with the right policy to allow access. In our case, we'll have a look at `fine-grained access control` and the use without it can be derived from this more complex example.

#### AWS Policy

An AWS policy, which later is assigned to a role, is required to allow general access to OpenSearch. See the [AWS documentation](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/ac.html) for the explanation of the policy.

Create the policy via Terraform using the [aws_iam_policy](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_policy).

```json
resource "aws_iam_policy" "opensearch_policy" {
  name = "opensearch_policy"

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Action" : [
        "es:DescribeElasticsearchDomains",
        "es:DescribeElasticsearchInstanceTypeLimits",
        "es:DescribeReservedElasticsearchInstanceOfferings",
        "es:DescribeReservedElasticsearchInstances",
        "es:GetCompatibleElasticsearchVersions",
        "es:ListDomainNames",
        "es:ListElasticsearchInstanceTypes",
        "es:ListElasticsearchVersions",
        "es:DescribeElasticsearchDomain",
        "es:DescribeElasticsearchDomainConfig",
        "es:ESHttpGet",
        "es:ESHttpHead",
        "es:GetUpgradeHistory",
        "es:GetUpgradeStatus",
        "es:ListTags",
        "es:AddTags",
        "es:RemoveTags",
        "es:ESHttpDelete",
        "es:ESHttpPost",
        "es:ESHttpPut"
        ],
        "Resource" : [
            "arn:aws:es:region:account-id:domain/test-domain/*"
        ]
    }
    ]
  })
}
```

#### IAM to Kubernetes mapping

To assign the policy to a role for the IAM role to service account mapping in Amazon EKS, a Terraform module like [iam-role-for-service-accounts-eks](https://registry.terraform.io/modules/terraform-aws-modules/iam/aws/latest/submodules/iam-role-for-service-accounts-eks) is helpful:

```json
module "opensearch_role" {
  source    = "terraform-aws-modules/iam/aws//modules/iam-role-for-service-accounts-eks"
  role_name = "opensearch-role"

  role_policy_arns = {
    policy = aws_iam_policy.opensearch_policy.arn
  }

  oidc_providers = {
    main = {
      provider_arn               = "arn:aws:iam::account-id:oidc-provider/oidc.eks.region.amazonaws.com/id/eks-id"
      namespace_service_accounts = ["opensearch-namespace:opensearch-serviceaccount"]
    }
  }
}
```

These two Terraform snippets will allow the service account `opensearch-serviceaccount` within the `opensearch-namespace` to generally access the AWS OpenSearch service for the `test-domain` cluster.

The output of the module `opensearch_role` has the output `iam_role_arn` to annotate a service account to use the mapping.

Annotate the service account with the `iam_role_arn` output of the `opensearch_role`.

```
apiVersion: v1
kind: ServiceAccount
metadata:
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::account-id:role/role-name
  name: opensearch-serviceaccount
  namespace: opensearch-namespace
```

This step is required to be repeated for Tasklist and Zeebe, to grant their service accounts access to OpenSearch.

#### Database configuration

This setup is sufficient for OpenSearch clusters without `fine-grained access control`.

`Fine-grained access control` adds another layer of security to OpenSearch, requiring you to add a mapping between the IAM role and the internal OpenSearch role. Visit the [AWS documentation](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/fgac.html) on `fine-grained access control`.

There are different ways to configure the mapping within OpenSearch:

- Via a [Terraform module](https://registry.terraform.io/modules/idealo/opensearch/aws/latest) in case your OpenSearch instance is exposed.
- Via the [OpenSearch dashboard](https://opensearch.org/docs/latest/security/access-control/users-roles/).
- Via the REST API.

The important part is assigning the `iam_role_arn` of the previously created `opensearch_role` to an internal role within OpenSearch. For example, `all_access` on the OpenSearch side is a good candidate, or if required, extra roles can be created with more restrictive access.

### Operate

Configure Operate to use the feature set of IRSA for the OpenSearch Exporter. Check the [Operate OpenSearch configuration](../../../../operate-deployment/operate-configuration.md#elasticsearch-or-opensearch).

#### Kubernetes configuration

As an example, configure the following environment variables:

```
- name: CAMUNDA_OPERATE_OPENSEARCH_URL
  value: https://test-domain.region.es.amazonaws.com
- name: CAMUNDA_OPERATE_ZEEBEOPENSEARCH_URL
  value: https://test-domain.region.es.amazonaws.com
- name: CAMUNDA_OPERATE_DATABASE
  value: opensearch
```

Where the value is whatever the endpoint of your OpenSearch cluster is.

:::note
AWS OpenSearch listens on port 443 opposed to the usual port 9200.
:::

:::note
Don't forget to set the `serviceAccountName` of the deployment/statefulset to the created service account with the IRSA annotation.
:::

### Tasklist

Configure Tasklist to use the feature set of IRSA for the OpenSearch Exporter. Check the [Tasklist OpenSearch configuration](../../../../tasklist-deployment/tasklist-configuration.md#elasticsearch-or-opensearch).

#### Kubernetes configuration

As an example, configure the following environment variables:

```
- name: CAMUNDA_TASKLIST_OPENSEARCH_URL
  value: https://test-domain.region.es.amazonaws.com
- name: CAMUNDA_TASKLIST_ZEEBEOPENSEARCH_URL
  value: https://test-domain.region.es.amazonaws.com
- name: CAMUNDA_TASKLIST_DATABASE
  value: opensearch
```

Where the value is whatever the endpoint of your OpenSearch cluster is.

:::note
AWS OpenSearch listens on port 443 opposed to the usual port 9200.
:::

:::note
Don't forget to set the `serviceAccountName` of the deployment/statefulset to the created service account with the IRSA annotation.
:::

### Zeebe

Configure Zeebe to use the feature set of IRSA for the OpenSearch Exporter. Check the [Zeebe OpenSearch exporter configuration](../../../../zeebe-deployment/configuration/broker.md#zeebebrokerexportersopensearch-opensearch-exporter).

#### Kubernetes configuration

As an example, configure the following environment variables:

```yaml
- name: ZEEBE_BROKER_EXPORTERS_OPENSEARCH_ARGS_AWS_ENABLED
  value: "true"
- name: ZEEBE_BROKER_EXPORTERS_OPENSEARCH_CLASSNAME
  value: io.camunda.zeebe.exporter.opensearch.OpensearchExporter
- name: ZEEBE_BROKER_EXPORTERS_OPENSEARCH_ARGS_URL
  value: https://test-domain.region.es.amazonaws.com
- name: ZEEBE_BROKER_EXPORTERS_OPENSEARCH_ARGS_BULK_SIZE
  value: "1"
- name: ZEEBE_BROKER_EXPORTERS_OPENSEARCH_ARGS_INDEX_PROCESSMESSAGESUBSCRIPTION
  value: "true"
```

:::note
AWS OpenSearch listens on port 443 opposed to the usual port 9200.
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
