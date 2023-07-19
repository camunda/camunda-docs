---
id: irsa
title: "IAM Roles for Service Accounts"
description: "IAM Roles configuration"
---

IAM Roles for Service Accounts (IRSA) is a way within AWS to authenticate workloads in e.g. EKS (Kubernetes) to execute signed requests against AWS services. This is a replacement for basic auth and is generally considered more secure.

The following considers the managed services by AWS and provided examples are in Terraform syntax.

## Aurora Postgres

When using the Terraform provider of [AWS](https://registry.terraform.io/providers/hashicorp/aws/latest) with the resource [aws_rds_cluster](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/rds_cluster) to create a new rds / aurora cluster, one has to supply the argument `iam_database_authentication_enabled = true` to enable the IAM roles functionality. Please see [AWS Documentation](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.html) for availability and limitations.

An AWS policy, which later is assigned to a role, is required to allow assuming a database user within a managed database. See the [AWS documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.IAMPolicy.html) for the explanation of the policy.

Create the policy via Terraform by using the [aws_iam_policy](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_policy).

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

To assign the policy to a role for the IAM Role to Service Account mapping in EKS, a Terraform module like [the following](https://registry.terraform.io/modules/terraform-aws-modules/iam/aws/latest/submodules/iam-role-for-service-accounts-eks) is helpful.

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

These two Terraform snippets will allow the service account `aurora-serviceaccount` within the `aurora-namespace` to assume the user `db-user-name` within the database `DbiResourceId`.
The output of the module `aurora_role` has the output `iam_role_arn` to annotate a service account to make use of the mapping.

Annotate the service account with the `iam_role_arn` output of the `aurora_role`.

```
apiVersion: v1
kind: ServiceAccount
metadata:
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::account-id:role/role-name
  name: aurora-serviceaccount
  namespace: aurora-namespace
```

The setup required on the Aurora Postgres side is to actually create the user and assign the required permissions to it. The following is an example when connected to the postgres database, it can also be realized differently. See [AWS documentation](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.DBAccounts.html#UsingWithRDS.IAMDBAuth.DBAccounts.PostgreSQL) as reference.

```SQL
# create user and grant rds_iam role, which requires the user to login via IAM authentication over password
CREATE USER "db-user-name";
GRANT rds_iam TO "db-user-name";

# create some database and grant the user all privileges to it
CREATE DATABASE "some-db";
GRANT ALL privileges on database "some-db" to "db-user-name";
```

### KeyCloak

From KeyCloak v21 forwards, the default JDBC driver can be overwritten, allowing to use a custom wrapper like [aws-advanced-jdbc-wrapper](https://github.com/awslabs/aws-advanced-jdbc-wrapper) to utilize the features of IRSA. It's a wrapper around the default JDBC driver but takes care of signing the requests.

The following example uses the mentioned `aws-advanced-jdbc-wrapper`. Also see the [documentation](https://www.keycloak.org/server/db#_overriding_the_default_jdbc_driver) within KeyCloak on overwriting the default JDBC driver.

A custom docker image is required since there's currently no upstream image with all the configurations required.

Required are the following artifacts for the `aws-advanced-jdbc-wrapper` to work.

- https://mvnrepository.com/artifact/software.amazon.awssdk/regions
- https://mvnrepository.com/artifact/software.amazon.awssdk/rds
- https://mvnrepository.com/artifact/software.amazon.awssdk/aws-core
- https://mvnrepository.com/artifact/software.amazon.awssdk/sdk-core
- https://mvnrepository.com/artifact/software.amazon.awssdk/sts
- https://mvnrepository.com/artifact/software.amazon.awssdk/auth
- https://mvnrepository.com/artifact/software.amazon.awssdk/http-client-spi
- https://mvnrepository.com/artifact/software.amazon.awssdk/profiles
- https://mvnrepository.com/artifact/software.amazon.awssdk/endpoints-spi
- https://mvnrepository.com/artifact/software.amazon.awssdk/protocol-core
- https://mvnrepository.com/artifact/software.amazon.awssdk/aws-json-protocol
- https://mvnrepository.com/artifact/software.amazon.awssdk/json-utils
- https://mvnrepository.com/artifact/software.amazon.awssdk/aws-query-protocol
- https://mvnrepository.com/artifact/software.amazon.awssdk/metrics-spi
- https://mvnrepository.com/artifact/software.amazon.awssdk/third-party-jackson-core
- https://mvnrepository.com/artifact/software.amazon.awssdk/utils

Lastly, the wrapper itself is available from [here](https://github.com/awslabs/aws-advanced-jdbc-wrapper/releases).

Example Dockerfile:

```
FROM keycloak/keycloak:21.1 as builder

# Configure a database vendor
ENV KC_DB=postgres

# A local folder that contains all the artifacts
COPY ./providers /opt/keycloak/providers

WORKDIR /opt/keycloak

RUN /opt/keycloak/bin/kc.sh build

FROM keycloak/keycloak:21.1

COPY --from=builder /opt/keycloak/ /opt/keycloak/

ENV KC_DB=postgres

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
```

As an example, configure the following environment variables

```
- name: KC_DB_DRIVER
  value: software.amazon.jdbc.Driver
- name: KC_DB_URL
  value: jdbc:aws-wrapper:postgresql://[DB_HOST]:[DB_PORT]/[DB_NAME]?wrapperPlugins=iam
- name: KC_DB_USERNAME
  value: db-user-name
# The AWS wrapper is not capable of XA transactions
- name: KC_TRANSACTION_XA_ENABLED
  value: false
```

Don't forget to set the `serviceAccountName` of the deployment / statefulset to the created service account with the IRSA annotation.

### Web Modeler

Configure the `restapi` component of the `Web Modeler` to use the feature set of IRSA. The configuration reference is [here](../../../../modeler/web-modeler/configuration/database.md#running-web-modeler-on-amazon-aurora-postgresql).

The `Web Modeler` already comes fitted with the [aws-advanced-jdbc-wrapper](https://github.com/awslabs/aws-advanced-jdbc-wrapper) within the Docker image.

As an example, configure the following environment variables

```
- name: SPRING_DATASOURCE_DRIVER_CLASS_NAME
  value: software.amazon.jdbc.Driver
- name: SPRING_DATASOURCE_URL
  value: jdbc:aws-wrapper:postgresql://[DB_HOST]:[DB_PORT]/[DB_NAME]?wrapperPlugins=iam
- name: SPRING_DATASOURCE_USERNAME
  value: db-user-name
```

Don't forget to set the `serviceAccountName` of the deployment / statefulset to the created service account with the IRSA annotation.

## OpenSearch

For OpenSearch the most common use case is the use of `fine-grained access control`.

When using the Terraform provider of [AWS](https://registry.terraform.io/providers/hashicorp/aws/latest) with the resource [opensearch_domain](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/opensearch_domain) to create a new OpenSearch cluster, one has to supply the argument `advanced_security_options.enabled = true` and set `advanced_security_options.anonymous_auth_enabled = false` to activate `fine-grained access control`.

Without `fine-grained access control` anonymous access is enabled and it would be sufficient to just supply a IAM role with the right policy to allow access. In our case, we'll have a look at `fine-grained access control` and the use without it can be derived from this more complex example.

An AWS policy, which later is assigned to a role, is required to allow general access to OpenSearch. See the [AWS documentation](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/ac.html) for the explanation of the policy.

Create the policy via Terraform by using the [aws_iam_policy](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_policy).

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

To assign the policy to a role for the IAM Role to Service Account mapping in EKS, a Terraform module like [the following](https://registry.terraform.io/modules/terraform-aws-modules/iam/aws/latest/submodules/iam-role-for-service-accounts-eks) is helpful.

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

This setup is sufficient for OpenSearch clusters without `fine-grained access control`.

`Fine-grained access control` adds another layer of security to OpenSearch, requiring you to add a mapping between the IAM role arn and the internal OpenSearch role. Please have a look at the [AWS documentation](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/fgac.html) on `fine-grained access control`.

There are different ways to configure the mapping within OpenSearch.

1. Via a [Terraform module](https://registry.terraform.io/modules/idealo/opensearch/aws/latest) in case your OpenSearch instance is exposed
2. Via the [OpenSearch dashboard](https://opensearch.org/docs/latest/security/access-control/users-roles/)
3. Via the REST API

The important part is assigning the `iam_role_arn` of the previously created `opensearch_role` to an internal role within OpenSearch.
E.g. `all_access` on the OpenSearch side is a good candidate or if required, extra roles can be created with more restrictive access.

### Operate

Configure Operate to use the feature set of IRSA for the OpenSearch Exporter. The configuration reference is [here](../../../../operate-deployment/operate-configuration.md#elasticsearch-or-opensearch).

As an example, configure the following environment variables

```
- name: CAMUNDA_OPERATE_ELASTICSEARCH_URL
  value: https://test-domain.region.es.amazonaws.com
- name: CAMUNDA_OPERATE_ZEEBEELASTICSEARCH_URL
  value: https://test-domain.region.es.amazonaws.com
```

Where the value is whatever the endpoint of your OpenSearch cluster is.
Important to note: AWS OpenSearch runs generally on port 443.

### Zeebe

Configure Zeebe to use the feature set of IRSA for the OpenSearch Exporter. The configuration reference is [here](../../../../zeebe-deployment/configuration/broker.md#zeebebrokerexportersopensearch-opensearch-exporter).

As an example, configure the following environment variables

```
- name: ZEEBE_BROKER_EXPORTERS_OPENSEARCH_ARGS_AWS_ENABLED
  value: true
- name: ZEEBE_BROKER_EXPORTERS_OPENSEARCH_CLASSNAME
  value: io.camunda.zeebe.exporter.opensearch.OpensearchExporter
- name: ZEEBE_BROKER_EXPORTERS_OPENSEARCH_ARGS_URL
  value: https://test-domain.region.es.amazonaws.com
```

## Troubleshooting

### Instance Metadata Service (IMDS)

[IMDS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html) is a default fallback for the AWS SDK. Within the context of EKS it means that a pod will automatically assume the role of a node. This can hide many problems, including whether IRSA was setup correctly or not, since it will fallback to IMDS in case of failure and hide the actual error.
Thus, if nothing within your cluster relies on the implicit node role, we recommend disabling it by e.g., defining in Terraform the `http_put_response_hop_limit`.

Using a Terraform module like the [EKS module](https://registry.terraform.io/modules/terraform-aws-modules/eks/aws/latest), one can define the following to decrease the default value of two to one, which results in pods not being allowed to assume the role of the node anymore.

```
eks_managed_node_group_defaults {
    metadata_options = {
        http_put_response_hop_limit = 1
    }
}
```
