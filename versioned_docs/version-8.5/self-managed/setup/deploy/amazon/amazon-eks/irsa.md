---
id: irsa
title: "IAM roles for service accounts"
description: "Learn how to configure IAM roles for service accounts (IRSA) within AWS to authenticate workloads."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

IAM roles for service accounts (IRSA) is a way within AWS to authenticate workloads in Amazon EKS (Kubernetes), for example, to execute signed requests against AWS services. This is a replacement for basic auth and is generally considered a [best practice by AWS](https://aws.github.io/aws-eks-best-practices/security/docs/iam/).

The following considers the managed services by AWS and provided examples are in Terraform syntax.

## Aurora PostgreSQL

[Aurora PostgreSQL](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.AuroraPostgreSQL.html) is a managed AWS PostgreSQL–compatible service.

### Setup

When using the Terraform provider of [AWS](https://registry.terraform.io/providers/hashicorp/aws/latest) with the resource [aws_rds_cluster](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/rds_cluster) to create a new rational database (RDS) or Aurora cluster, supply the argument `iam_database_authentication_enabled = true` to enable the IAM roles functionality. See the [AWS documentation](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.html) for availability and limitations.

#### AWS policy

An AWS policy (later assigned to a role) is required to allow assuming a database user within a managed database. See the [AWS documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.IAMPolicy.html) for policy details.

<Tabs>
  <TabItem value="terraform" label="Terraform" default>

To create the AWS policy using Terraform, you can define it with the [aws_iam_policy](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_policy) resource. Here’s an example configuration:

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
          "arn:aws:rds-db:<REGION>:<ACCOUNT-ID>:dbuser:<DB-RESOURCE-ID>/<DB-USERNAME>"
        ]
      }
    ]
  })
}
```

Replace `<REGION>`, `<ACCOUNT-ID>`, `<DB-RESOURCE-ID>`, and `<DB-USERNAME>` with the appropriate values for your AWS environment.

  </TabItem>
  
  <TabItem value="aws-cli" label="AWS CLI">

To create the AWS policy using the AWS CLI, use the `aws iam create-policy` command:

```bash
aws iam create-policy \
  --policy-name rds-policy \
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "rds-db:connect"
        ],
        "Resource": [
          "arn:aws:rds-db:<REGION>:<ACCOUNT-ID>:dbuser:<DB-RESOURCE-ID>/<DB-USERNAME>"
        ]
      }
    ]
  }'
```

Replace `<REGION>`, `<ACCOUNT-ID>`, `<DB-RESOURCE-ID>`, and `<DB-USERNAME>` with the appropriate values for your AWS environment.

  </TabItem>
</Tabs>

#### IAM to Kubernetes mapping

<Tabs>
  <TabItem value="terraform" label="Terraform" default>

To assign the policy to a role for IAM role to service account mapping in Amazon EKS, use a Terraform module like [iam-role-for-service-accounts-eks](https://registry.terraform.io/modules/terraform-aws-modules/iam/aws/latest/submodules/iam-role-for-service-accounts-eks):

```json
module "aurora_role" {
  source    = "terraform-aws-modules/iam/aws//modules/iam-role-for-service-accounts-eks"
  role_name = "aurora-role"

  role_policy_arns = {
    policy = aws_iam_policy.rds_policy.arn
  }

  oidc_providers = {
    main = {
      provider_arn               = "arn:aws:iam::<ACCOUNT-ID>:oidc-provider/oidc.eks.<REGION>.amazonaws.com/id/<EKS-ID>"
      namespace_service_accounts = ["<AURORA-NAMESPACE>:<AURORA-SERVICEACCOUNT>"]
    }
  }
}
```

This Terraform snippet creates a role that allows the service account `<AURORA-SERVICEACCOUNT>` within the `<AURORA-NAMESPACE>` to assume the user `<DB-USERNAME>` within the database `<DB-RESOURCE-ID>`. The output of the `aurora_role` module includes the `iam_role_arn`, which you need to annotate the service account.

  </TabItem>

  <TabItem value="aws-cli" label="AWS CLI">

To assign the policy to a role using the AWS CLI, follow these steps:

1. **Create the IAM role**:

```bash
aws iam create-role \
  --role-name aurora-role \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "Federated": "arn:aws:iam::<ACCOUNT-ID>:oidc-provider/oidc.eks.<REGION>.amazonaws.com/id/<EKS-ID>"
        },
        "Action": "sts:AssumeRoleWithWebIdentity",
        "Condition": {
          "StringEquals": {
            "oidc.eks.<REGION>.amazonaws.com/id/<EKS-ID>:sub": "system:serviceaccount:<AURORA-NAMESPACE>:<AURORA-SERVICEACCOUNT>"
          }
        }
      }
    ]
  }'
```

2. **Attach the policy to the role**:

```bash
aws iam attach-role-policy \
  --role-name aurora-role \
  --policy-arn arn:aws:iam::<ACCOUNT-ID>:policy/rds-policy
```

  </TabItem>
</Tabs>

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

#### Database configuration

The setup required on the Aurora PostgreSQL side is to create the user and assign the required permissions to it. The following is an example when connected to the PostgreSQL database, and can also be realized by using a [Terraform PostgreSQL Provider](https://registry.terraform.io/providers/cyrilgdn/postgresql/latest/docs). See the [AWS documentation](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.DBAccounts.html#UsingWithRDS.IAMDBAuth.DBAccounts.PostgreSQL) for reference concerning Aurora specific configurations.

```SQL
# create user and grant rds_iam role, which requires the user to login via IAM authentication over password
CREATE USER "<DB-USERNAME>";
GRANT rds_iam TO "<DB-USERNAME>";

# create some database and grant the user all privileges to it
CREATE DATABASE "some-db";
GRANT ALL privileges on database "some-db" to "<DB-USERNAME>";
```

### Keycloak

:::caution
IAM Roles for Service Accounts can only be implemented with Keycloak 21 onwards. This may require you to adjust the version used in the Camunda Helm chart.
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
For additional details, refer to the [Camunda 8 Helm deployment documentation](/self-managed/setup/install.md).
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

Since Identity uses PostgreSQL, configure `identity` to use IRSA with Amazon Aurora PostgreSQL. Check the [Identity database configuration](/self-managed/identity/miscellaneous/configuration-variables.md#running-identity-on-amazon-aurora-postgresql) for more details.
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

[Amazon OpenSearch Service](https://aws.amazon.com/opensearch-service/) is a managed OpenSearch service provided by AWS, which is a distributed search and analytics engine built on Apache Lucene.

:::note
As of the 8.4 release, Zeebe, Operate, and Tasklist are now compatible with [Amazon OpenSearch Service](https://aws.amazon.com/de/opensearch-service/) 2.5.x. Note that using Amazon OpenSearch Service requires [setting up a new Camunda installation](/self-managed/setup/overview.md). A migration from previous versions or Elasticsearch environments is currently not supported.
:::

:::caution

Optimize is not supported using the IRSA method. However, Optimize can be utilized by supplying a username and password. The migration step must also be disabled. For more information, refer to [using Amazon OpenSearch Service](/self-managed/setup/guides/using-existing-opensearch.md).

:::

### Setup

For Amazon OpenSearch Service, the most common use case is the use of `fine-grained access control`.

When using the Terraform provider of [AWS](https://registry.terraform.io/providers/hashicorp/aws/latest) with the resource [opensearch_domain](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/opensearch_domain) to create a new Amazon OpenSearch Service cluster, supply the arguments:

- `advanced_security_options.enabled = true`
- `advanced_security_options.anonymous_auth_enabled = false` to activate `fine-grained access control`.

Without `fine-grained access control`, anonymous access is enabled and would be sufficient to supply an IAM role with the right policy to allow access. In our case, we'll have a look at `fine-grained access control` and the use without it can be derived from this more complex example.

#### AWS Policy

An AWS policy, which later is assigned to a role, is required to allow general access to Amazon OpenSearch Service. See the [AWS documentation](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/ac.html) for the explanation of the policy.

<Tabs>
  <TabItem value="terraform" label="Terraform" default>

To create an AWS policy for Amazon OpenSearch Service using Terraform, you can use the [aws_iam_policy](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_policy) resource. Here’s an example configuration:

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
          "arn:aws:es:<REGION>:<ACCOUNT-ID>:domain/<DOMAIN-NAME>/*"
        ]
      }
    ]
  })
}
```

Replace `<REGION>`, `<ACCOUNT-ID>`, and `<DOMAIN-NAME>` with the appropriate values for your Amazon OpenSearch Service domain.

  </TabItem>

  <TabItem value="aws-cli" label="AWS CLI">

To create an AWS policy for Amazon OpenSearch Service using the AWS CLI, use the `aws iam create-policy` command:

```bash
aws iam create-policy \
  --policy-name opensearch_policy \
  --policy-document '{
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
          "arn:aws:es:<REGION>:<ACCOUNT-ID>:domain/<DOMAIN-NAME>/*"
        ]
      }
    ]
  }'
```

Replace `<REGION>`, `<ACCOUNT-ID>`, and `<DOMAIN-NAME>` with the appropriate values for your Amazon OpenSearch Service domain.

  </TabItem>
</Tabs>

#### IAM to Kubernetes mapping

To assign the policy to a role for the IAM role to service account mapping in Amazon EKS:

<Tabs>
  <TabItem value="terraform" label="Terraform" default>

You can use a Terraform module like [iam-role-for-service-accounts-eks](https://registry.terraform.io/modules/terraform-aws-modules/iam/aws/latest/submodules/iam-role-for-service-accounts-eks):

```json
module "opensearch_role" {
  source    = "terraform-aws-modules/iam/aws//modules/iam-role-for-service-accounts-eks"
  role_name = "opensearch-role"

  role_policy_arns = {
    policy = aws_iam_policy.opensearch_policy.arn
  }

  oidc_providers = {
    main = {
      provider_arn               = "arn:aws:iam::<ACCOUNT-ID>:oidc-provider/oidc.eks.<REGION>.amazonaws.com/id/<EKS-ID>"
      namespace_service_accounts = ["<NAMESPACE>:<SERVICE-ACCOUNT>"]
    }
  }
}
```

This Terraform configuration allows the service account `<SERVICE-ACCOUNT>` within the namespace `<NAMESPACE>` to access the Amazon OpenSearch Service for the cluster `<DOMAIN-NAME>`. The output of the `opensearch_role` module includes the `iam_role_arn` needed to annotate the service account.

Annotate the service account with the `iam_role_arn` output.

  </TabItem>

  <TabItem value="aws-cli" label="AWS CLI">

To assign the policy to a role using the AWS CLI, follow these steps:

1. **Create the IAM role**:

```bash
aws iam create-role \
  --role-name opensearch-role \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "Federated": "arn:aws:iam::<ACCOUNT-ID>:oidc-provider/oidc.eks.<REGION>.amazonaws.com/id/<EKS-ID>"
        },
        "Action": "sts:AssumeRoleWithWebIdentity",
        "Condition": {
          "StringEquals": {
            "oidc.eks.<REGION>.amazonaws.com/id/<EKS-ID>:sub": "system:serviceaccount:<NAMESPACE>:<SERVICE-ACCOUNT>"
          }
        }
      }
    ]
  }'
```

2. **Attach the policy to the role**:

```bash
aws iam attach-role-policy \
  --role-name opensearch-role \
  --policy-arn arn:aws:iam::<ACCOUNT-ID>:policy/opensearch_policy
```

  </TabItem>
</Tabs>

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

:::note Security of basic auth usage

**This example uses basic authentication (username and password), which may not be the best practice for all scenarios, especially if fine-grained access control is enabled.** The endpoint used in this example is not exposed by default, so consult your OpenSearch documentation for specifics on enabling and securing this endpoint.

:::

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

## Backup-related

When implementing [backup and restore procedures](/self-managed/operational-guides/backup-restore/backup-and-restore.md) for **Elasticsearch** in your **Camunda** deployment, you can leverage **AWS IAM Roles for Service Accounts (IRSA)** to securely access **S3 buckets**.

### Bitnami Elasticsearch chart configuration

Camunda’s Helm chart uses the [Bitnami Elasticsearch chart](https://artifacthub.io/packages/helm/bitnami/elasticsearch) as a sub-chart. If you're using this setup, IRSA can be integrated for backup operations.

Following the [AWS IRSA documentation](https://docs.aws.amazon.com/eks/latest/userguide/associate-service-account-role.html), create an IAM role mapped to a Kubernetes service account with the required permissions for S3, as detailed in the [Elasticsearch documentation](https://www.elastic.co/docs/deploy-manage/tools/snapshot-and-restore/s3-repository#repository-s3-permissions).

Additionally, ensure Elasticsearch is configured to recognize the IRSA token. The [Elasticsearch documentation](https://www.elastic.co/docs/deploy-manage/tools/snapshot-and-restore/s3-repository#iam-kubernetes-service-accounts) outlines this requirement for official Elasticsearch images.

Once the IRSA setup is complete, configure the Bitnami Elasticsearch chart in your Camunda Helm chart like the following adjusting your `values.yaml`:

```yaml
elasticsearch:
  master:
    serviceAccount:
      create: true
      annotations:
        eks.amazonaws.com/role-arn: arn:aws:iam::<account-id>:role/<iam-role-arn>
  initScripts:
    irsa_access_init_script.sh: |
      #!/bin/sh
      mkdir -p "/opt/bitnami/elasticsearch/config/repository-s3"
      ln -s $AWS_WEB_IDENTITY_TOKEN_FILE "/opt/bitnami/elasticsearch/config/repository-s3/aws-web-identity-token-file"
  extraVolumeMounts:
    - name: empty-dir
      mountPath: /bitnami/elasticsearch
      subPath: app-volume-dir
  volumes:
    - name: empty-dir
      emptyDir: {}
```

The values `<account-id>` and `<iam-role-arn>` would be based on the [AWS IRSA documentation](https://docs.aws.amazon.com/eks/latest/userguide/associate-service-account-role.html).

The init script remains consistent across environments, as the Elasticsearch S3 plugin expects the credentials at the fixed path `repository-s3`. This path is **not configurable**.

> ℹ️ `$AWS_WEB_IDENTITY_TOKEN_FILE` is automatically injected into the pod by EKS when the pod is using a service account annotated with a valid `eks.amazonaws.com/role-arn`.
