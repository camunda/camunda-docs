---
id: eks-terraform
title: "Deploying an AWS Kubernetes Cluster (EKS) with Terraform"
description: "The guide to deploying an AWS EKS cluster with a Terraform module for a quick Camunda 8 setup."
---

This guide offers a detailed, step-by-step tutorial for deploying an Amazon Web Services (AWS) Elastic Kubernetes Service (EKS) cluster, tailored explicitly for deploying Camunda 8, using Terraform, a widespread Infrastructure as Code (IaC) tool. It is designed to help leverage the power of Infrastructure as Code (IaC) to streamline and reproduce a Cloud infrastructure setup. By walking through the essentials of setting up an EKS cluster, configuring AWS IAM permissions, and integrating a PostgreSQL database, this guide explains the process of using Terraform with AWS, making it accessible even to those new to Terraform or IaC concepts.

:::tip

If you are completely new to Terraform and the idea of IaC, it makes sense to read through the [Terraform IaC documentation](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/infrastructure-as-code) and give their [interactive quick start](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/infrastructure-as-code#quick-start) a try to get a basic understanding.

:::

## Prerequisites

- an [AWS account](https://docs.aws.amazon.com/accounts/latest/reference/accounts-welcome.html) is required to create any resources within AWS.
- [Terraform (1.6.x)](https://developer.hashicorp.com/terraform/downloads) has to be installed on your system.
- [Kubectl (1.28.x)](https://kubernetes.io/docs/tasks/tools/#kubectl) to interact with the cluster.

## Considerations

This is a basic setup to get started with Camunda 8 but does not reflect a high performance setup. It's a good starting point to get ready for production by utilizing [IaC tooling](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/infrastructure-as-code).

Terraform can be opaque in the beginning and if you solely want to get a feeling and understanding for what is happening, you may try out the [eksctl guide](./eksctl.md) to get a feeling on what resources are created and how they interact with each other.

If you just want to try out Camunda 8 or develop against it, consider having a look at our [SaaS offering](https://camunda.com/platform/) or if you already have an AWS EKS cluster, consider skipping to the [Helm guide](./eks-helm.md).

For the simplicity of this guide, certain best practices will be provided with links to additional documents, enabling you to explore the topic in more detail.

:::warning
Please note that following the guide will incur costs on your Cloud provider account.
:::

## Outcome

Following this tutorial and steps will result in:

- an AWS EKS 1.28 Kubernetes Cluster with 4 nodes ready for Camunda 8 installation.
- the [EBS CSI driver](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html) is installed and configured, which is used by Camunda 8 to create [persistent volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).
- a [managed Aurora PostgreSQL 15.4](https://aws.amazon.com/rds/postgresql/) instance to be used by the Camunda 8 components.

## Installing AWS EKS Cluster with Terraform

### Terraform Prerequsites

1. Create an empty folder somewhere where your Terraform files should be placed in.
2. Create a `config.tf` with the following setup.

```hcl
terraform {
  backend "local" {
    path = "terraform.tfstate"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.22.0"
    }
  }
}

provider "aws" {
  region     = "eu-central-1"
}
```

3. Setup the authentication for the `AWS` provider.

:::note

It's recommended to use a different backend than `local`. More information can be found in the [documentation of Terraform](https://developer.hashicorp.com/terraform/language/settings/backends/configuration).

:::

:::note

The [AWS Terraform Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) is required to create resources in AWS. You must configure the provider with the proper credentials before using it. You can further change the Region and other preferences and explore different [authentication](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#authentication-and-configuration) methods.

There are several ways to authenticate the `AWS` provider.

- (Recommended) Use the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) to configure access. Terraform will automatically default to AWS CLI configuration when present.
- Set environment variables `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`, where the `key` and `id` can be retrieved from the [AWS Console](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).

:::

:::warning

Do not use secrets in your configuration files!

:::

:::warning

General advice: the user who created the resources will always be the owner. This means the user will always have admin access to the Kubernetes cluster until you delete it. Therefore, it can make sense to create an extra [AWS IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) that's solely used for Terraform purposes.

:::

### Cluster Module

This module creates the basic layout that configures AWS access and Terraform.

The following will use [Terraform Modules](https://developer.hashicorp.com/terraform/language/modules), which allows abstracting resources into reusable components.

The [Camunda provided module](https://github.com/camunda/camunda-tf-eks-module) is publicly available. It's advisable to review this module before its use.

1. In the folder where your `config.tf` rezides, create an additional `cluster.tf`
2. Paste the following content into the newly created `cluster.tf` file to make use of the provided module

```hcl
module "eks_cluster" {
  source = "github.com/camunda/camunda-tf-eks-module"

  region  = "eu-central-1" # change to your AWS region
  name    = "cluster-name" # change to name of your choosing

  # Set CIDR ranges or use the defaults
  cluster_service_ipv4_cidr = "10.190.0.0/16"
  cluster_node_ipv4_cidr    = "10.192.0.0/16"
}
```

There are various other input options to customize the cluster setup further. Please see the [module documentation](https://github.com/camunda/camunda-tf-eks-module).

### PostgreSQL Module

We separated the Cluster and PostgreSQL modules from each other to allow more customization options to the user.

1. In the folder where your `config.tf` rezides, create an additional `db.tf` file.
2. Paste the following contents into `db.tf` to make use of the provided module

```hcl
module "postgresql" {
  source                     = "github.com/camunda/camunda-tf-eks-module/modules/aurora"
  engine_version             = "15.4"
  auto_minor_version_upgrade = false
  cluster_name               = "cluster-name-postgresql" # change "cluster-name" to your name

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

1. Open a terminal in the created Terraform folder where `config.tf` and `cluster.tf` are
2. Initialize the working directory

```hcl
terraform init
```

3. Apply the configuration files

```hcl
terraform apply
```

4. After reviewing the plan, you can type `yes` to confirm and apply the changes.

At this point, Terraform will create the AWS EKS cluster with all the necessary configurations. The completion of this process may require approximately 20-30 minutes.

## AWS IAM Access management

Kubernetes access is divided into two distinct layers. The first involves AWS IAM permissions, which enable basic AWS EKS functionalities such as using the AWS EKS UI and generating AWS EKS access through the AWS CLI. The second layer provides access within the cluster itself, determining the user's permissions within the Kubernetes cluster.

As a result, we must initially grant the user adequate AWS IAM permissions and then subsequently assign them a specific role within the Kubernetes cluster for proper access management.

### AWS IAM Permissions

A minimum set of permissions is required to access an AWS EKS cluster to allow a user to execute `aws eks update-kubeconfig` to update the local `kubeconfig` with cluster access to the AWS EKS cluster.

The policy should look as follows and can be restricted to specific AWS EKS clusters if required.

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

The created policy `BasicEKSPermissions` has to be assigned to a group, a role, or a user to work. Please conduct the [AWS documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage-attach-detach.html#add-policy-cli) to find the correct approach for you.

Users can generate access to the AWS EKS cluster via the `AWS CLI`.

```shell
aws eks --region <region> update-kubeconfig --name <clusterName>
```

### Terraform AWS IAM permissions

The user creating the AWS EKS cluster has admin access. To allow other users to access this cluster as well, we have to adjust the `aws-auth` configmap.

With Terraform, you can create an AWS IAM user to Kubernetes role mapping via the following variable.

```hcl
# AWS IAM roles mapping
aws_auth_roles = [{
    rolearn  = "<arn>"
    username = "<username>"
    groups   = ["system:masters"]
  }]

# AWS IAM users mapping
aws_auth_users = [{
    userarn  = "<arn>"
    username = "<username>"
    groups   = ["system:masters"]
  }]
```

Where `arn` is the `arn` of your user or the role. The `group` is the Kubernetes rule, where `system:masters` is equivalent to an admin role. Lastly `username` is either the username itself or the role name, which is used for logs.

## Outputs

Terraform can define outputs to make the retrieval of values generated as part of the execution easier. Those can be, for example, DB endpoints or values required for the Helm setup.

1. In the folder where your `config.tf` relies, create an additional `output.tf`
2. Paste the following content to expose those variables

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

3. Run `terraform apply` again to print the outputs in the terraform state

We can now export those values to environment variables to be used by HELM charts.

```shell
export CERT_MANAGER_IRSA_ARN=$(terraform output -raw cert_manager_arn)

export EXTERNAL_DNS_IRSA_ARN=$(terraform output -raw external_dns_arn)

export DB_HOST=$(terraform output -raw postgres_endpoint)
```

# Next steps

Install Camunda 8 using HELM charts by following our installation guide [Camunda 8 on Kubernetes](./eks-helm.md).
