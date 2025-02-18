---
id: eks-terraform
title: "Deploy an EKS cluster with Terraform"
description: "Deploy an Amazon Kubernetes Cluster (EKS) with a Terraform module for a quick Camunda 8 setup."
---

This guide offers a detailed tutorial for deploying an Amazon Web Services (AWS) Elastic Kubernetes Service (EKS) cluster, tailored explicitly for deploying Camunda 8 and using Terraform, a popular Infrastructure as Code (IaC) tool.

This is designed to help leverage the power of IaC to streamline and reproduce a Cloud infrastructure setup. By walking through the essentials of setting up an Amazon EKS cluster, configuring AWS IAM permissions, and integrating a PostgreSQL database, this guide explains the process of using Terraform with AWS, making it accessible even to those new to Terraform or IaC concepts.

:::tip

If you are completely new to Terraform and the idea of IaC, read through the [Terraform IaC documentation](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/infrastructure-as-code) and give their [interactive quick start](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/infrastructure-as-code#quick-start) a try for a basic understanding.

:::

## Prerequisites

- An [AWS account](https://docs.aws.amazon.com/accounts/latest/reference/accounts-welcome.html) to create any resources within AWS.
- [Terraform (1.9+)](https://developer.hashicorp.com/terraform/downloads)
- [Kubectl (1.30+)](https://kubernetes.io/docs/tasks/tools/#kubectl) to interact with the cluster.
- [IAM Roles for Service Accounts](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) (IRSA) configured.
  - This simplifies the setup by not relying on explicit credentials and instead creating a mapping between IAM roles and Kubernetes service account based on a trust relationship. A [blog post](https://aws.amazon.com/blogs/containers/diving-into-iam-roles-for-service-accounts/) by AWS visualizes this on a technical level.
  - This allows a Kubernetes service account to temporarily impersonate an AWS IAM role to interact with AWS services like S3, RDS, or Route53 without having to supply explicit credentials.

## Considerations

This setup provides an essential foundation for beginning with Camunda 8, though it's not tailored for optimal performance. It's a good initial step for preparing a production environment by incorporating [IaC tooling](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/infrastructure-as-code).

Terraform can be opaque in the beginning. If you solely want to get an understanding for what is happening, you may try out the [eksctl guide](./eksctl.md) to understand what resources are created and how they interact with each other.

To try out Camunda 8 or develop against it, consider signing up for our [SaaS offering](https://camunda.com/platform/). If you already have an Amazon EKS cluster, consider skipping to the [Helm guide](./eks-helm.md).

For the simplicity of this guide, certain best practices will be provided with links to additional documents, enabling you to explore the topic in more detail.

:::danger
Following this guide will incur costs on your Cloud provider account, namely for the managed Kubernetes service, running Kubernetes nodes in EC2, Elastic Block Storage (EBS), and Route53. More information can be found on [AWS](https://aws.amazon.com/eks/pricing/) and their [pricing calculator](https://calculator.aws/#/) as the total cost varies per region.
:::

## Outcome

Following this tutorial and steps will result in:

- An Amazon EKS Kubernetes cluster running the latest Kubernetes version with four nodes ready for Camunda 8 installation.
- The [EBS CSI driver](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html) is installed and configured, which is used by the Camunda 8 Helm chart to create [persistent volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).
- A [managed Aurora PostgreSQL 15.8](https://aws.amazon.com/rds/postgresql/) instance to be used by the Camunda 8 components.

## Installing Amazon EKS cluster with Terraform

### Terraform prerequsites

1. Create an empty folder to place your Terraform files in.
2. Create a `config.tf` with the following setup:

```hcl
terraform {
  backend "local" {
    path = "terraform.tfstate"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.69"
    }
  }
}

provider "aws" {
  region     = "eu-central-1"
}
```

3. Set up the authentication for the `AWS` provider.

:::note

It's recommended to use a different backend than `local`. More information can be found in the [Terraform documentation](https://developer.hashicorp.com/terraform/language/backend).

:::

:::note

The [AWS Terraform provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) is required to create resources in AWS. You must configure the provider with the proper credentials before using it. You can further change the region and other preferences and explore different [authentication](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#authentication-and-configuration) methods.

There are several ways to authenticate the `AWS` provider.

- (Recommended) Use the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) to configure access. Terraform will automatically default to AWS CLI configuration when present.
- Set environment variables `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`, which can be retrieved from the [AWS Console](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).

:::

:::danger

Do not store sensitive information (credentials) in your Terraform files.

:::

:::danger

A user who creates resources in AWS will therefore own these resources. In this particular case, the user will always have admin access to the Kubernetes cluster until the cluster is deleted.

Therefore, it can make sense to create an extra [AWS IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) which credentials are used for Terraform purposes.

:::

### Cluster module

This module creates the basic layout that configures AWS access and Terraform.

The following will use [Terraform modules](https://developer.hashicorp.com/terraform/language/modules), which allows abstracting resources into reusable components.

The [Camunda provided module](https://github.com/camunda/camunda-tf-eks-module/tree/2.5.0/modules/eks-cluster) is publicly available. It's advisable to review this module before usage.

1. In the folder where your `config.tf` resides, create an additional `cluster.tf`.
2. Paste the following content into the newly created `cluster.tf` file to make use of the provided module:

```hcl
module "eks_cluster" {
  source = "git::https://github.com/camunda/camunda-tf-eks-module//modules/eks-cluster?ref=2.5.0"

  region  = "eu-central-1" # change to your AWS region
  name    = "cluster-name" # change to name of your choosing

  # Set CIDR ranges or use the defaults
  cluster_service_ipv4_cidr = "10.190.0.0/16"
  cluster_node_ipv4_cidr    = "10.192.0.0/16"
}
```

There are various other input options to customize the cluster setup further; see the [module documentation](https://github.com/camunda/camunda-tf-eks-module/tree/2.5.0/modules/eks-cluster).

### PostgreSQL module

The resulting PostgreSQL instance and default database `camunda` is intended to be used with Keycloak. You may manually add extra databases after creation for Identity with multi-tenancy.
This will not be covered in this guide as the Identity default for multi-tenancy is to be disabled.

We separated the cluster and PostgreSQL modules from each other to allow more customization options to the user.

1. In the folder where your `config.tf` resides, create an additional `db.tf` file.
2. Paste the following contents into `db.tf` to make use of the provided module:

```hcl
module "postgresql" {
  source                     = "git::https://github.com/camunda/camunda-tf-eks-module//modules/aurora?ref=2.5.0"
  engine_version             = "15.8"
  auto_minor_version_upgrade = false
  cluster_name               = "cluster-name-postgresql" # change "cluster-name" to your name
  default_database_name      = "camunda"

  # Please supply your own secret values
  username         = "secret_user"
  password         = "secretvalue%23"
  vpc_id           = module.eks_cluster.vpc_id
  subnet_ids       = module.eks_cluster.private_subnet_ids
  cidr_blocks      = concat(module.eks_cluster.private_vpc_cidr_blocks, module.eks_cluster.public_vpc_cidr_blocks)
  instance_class   = "db.t3.medium"
  iam_auth_enabled = true

  depends_on = [module.eks_cluster]
}
```

To manage secrets in Terraform, we recommend [injecting those via Vault](https://developer.hashicorp.com/terraform/tutorials/secrets/secrets-vault).

### Execution

1. Open a terminal in the created Terraform folder where `config.tf` and `cluster.tf` are.
2. Initialize the working directory:

```hcl
terraform init
```

3. Apply the configuration files:

```hcl
terraform apply
```

4. After reviewing the plan, you can type `yes` to confirm and apply the changes.

At this point, Terraform will create the Amazon EKS cluster with all the necessary configurations. The completion of this process may require approximately 20-30 minutes.

## (Optional) AWS IAM access management

Kubernetes access is divided into two distinct layers. The first involves AWS IAM permissions, which enable basic Amazon EKS functionalities such as using the Amazon EKS UI and generating Amazon EKS access through the AWS CLI. The second layer provides access within the cluster itself, determining the user's permissions within the Kubernetes cluster.

As a result, we must initially grant the user adequate AWS IAM permissions and subsequently assign them a specific role within the Kubernetes cluster for proper access management.

### AWS IAM permissions

A minimum set of permissions is required to access an Amazon EKS cluster to allow a user to execute `aws eks update-kubeconfig` to update the local `kubeconfig` with cluster access to the Amazon EKS cluster.

The policy should look as follows and can be restricted to specific Amazon EKS clusters if required:

```json
cat <<EOF >./policy-eks.json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "eks:DescribeCluster",
                "eks:ListClusters"
            ],
            "Resource": "*"
        }
    ]
}
EOF
```

Via the AWS CLI, you can run the following to create the above policy in AWS IAM.

```shell
aws iam create-policy --policy-name "BasicEKSPermissions" --policy-document file://policy-eks.json
```

The created policy `BasicEKSPermissions` has to be assigned to a group, a role, or a user to work. Consult the [AWS documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage-attach-detach.html#add-policy-cli) to find the correct approach for you.

Users can generate access to the Amazon EKS cluster via the `AWS CLI`.

```shell
aws eks --region <region> update-kubeconfig --name <clusterName>
```

### Terraform AWS IAM permissions

The user creating the Amazon EKS cluster has admin access by default.
To manage user access use the `access_entries` configuration introduced in module version [2.0.0](https://github.com/camunda/camunda-tf-eks-module/releases/tag/2.0.0):

```hcl
access_entries = {
  example = {
    kubernetes_groups = []
    principal_arn     = "<arn>"

    policy_associations = {
      example = {
        policy_arn   = "arn:aws:eks::aws:cluster-access-policy/AmazonEKSViewPolicy"
        access_scope = {
          namespaces = ["default"]
          type       = "namespace"
        }
      }
    }
  }
}
```

In this updated configuration:

- `principal_arn` should be replaced with the ARN of the IAM user or role.
- `policy_associations` allow you to associate policies for fine-grained access control.

For a list of policies, please visit the [AWS EKS Access Policies documentation](https://docs.aws.amazon.com/eks/latest/userguide/access-policies.html).

:::info

Please note that the version 2.x.x of this module no longer supports direct mappings via `aws_auth_roles` and `aws_auth_users`. If you are upgrading from version [1.x.x](https://github.com/camunda/camunda-tf-eks-module/releases/tag/1.0.3), fork the module repository and follow the official AWS instructions for managing the `aws-auth` ConfigMap.
For more details, refer to the [official upgrade guide](https://github.com/terraform-aws-modules/terraform-aws-eks/blob/master/docs/UPGRADE-20.0.md).

:::

## Outputs

Terraform can define outputs to make the retrieval of values generated as part of the execution easier; for example, DB endpoints or values required for the Helm setup.

1. In the folder where your `config.tf` resides, create an additional `output.tf`.
2. Paste the following content to expose those variables:

```hcl
output "cert_manager_arn" {
  value = module.eks_cluster.cert_manager_arn
  description = "The Amazon Resource Name (ARN) of the AWS IAM Roles for Service Account mapping for the cert-manager"
}

output "external_dns_arn" {
  value = module.eks_cluster.external_dns_arn
  description = "The Amazon Resource Name (ARN) of the AWS IAM Roles for Service Account mapping for the external-dns"
}

output "postgres_endpoint" {
  value = module.postgresql.aurora_endpoint
  description = "The Postgres endpoint URL"
}
```

3. Run `terraform apply` again to print the outputs in the terraform state.

We can now export those values to environment variables to be used by Helm charts:

```shell
export CERT_MANAGER_IRSA_ARN=$(terraform output -raw cert_manager_arn)

export EXTERNAL_DNS_IRSA_ARN=$(terraform output -raw external_dns_arn)

export DB_HOST=$(terraform output -raw postgres_endpoint)
```

4. Export required values for the [Camunda 8 on Kubernetes](./eks-helm.md) guide. The values will likely differ based on your definitions in the [PostgreSQL setup](#postgresql-module), so ensure you use the values passed to the Terraform module.

```shell
# Example guide values, ensure you use the values you pass to the Terraform module
export PG_USERNAME="secret_user"
export PG_PASSWORD="secretvalue%23"
export DEFAULT_DB_NAME="camunda"
```

## Next steps

Install Camunda 8 using Helm charts by following our installation guide [Camunda 8 on Kubernetes](./eks-helm.md).
