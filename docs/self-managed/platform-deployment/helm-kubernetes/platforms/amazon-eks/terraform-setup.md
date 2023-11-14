---
id: eks-terraform
title: "EKS Terraform Setup"
description: "Preconfigured Terraform module for quick C8 setup."
---

Terraform is a popular Infrastructure as Code (IaC) tooling that allows to manage your infrastructure with reproduceable configuration files rather than manually setting things up. We'll take advantage of this fact and provide a basic infrastructure setup for Camunda to quick-start your journey on AWS EKS.

:::tip

If you are complelty new to Terraform and the idea of IaC, it makes sense to have a read through the [Terraform IaC documentation](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/infrastructure-as-code) and give their [interactive quick start](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/infrastructure-as-code#quick-start) a try to get a basic understanding.

:::

## Prerequisites

- an [AWS account](https://docs.aws.amazon.com/accounts/latest/reference/accounts-welcome.html) is required to create any resources within AWS.
- [Terraform](https://developer.hashicorp.com/terraform/downloads) has to be installed on your system.
- [Kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) to interact with the cluster.

## Considerations

The following does not reflect a production ready setup but is a good quick-start to get going with Camunda on AWS EKS utilizing [IaC tooling](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/infrastructure-as-code).

For the simplicity of this tutorial we'll be using non best practices but refer to further documents to allow you to delve deeper into the topic.

:::warning
Please note that following the guide provided will incur costs on your cloud provider account.
:::

## Outcome

Following this tutorial and steps, will result in

- an AWS EKS 1.28 Kubernetes Cluster with 4 nodes and the possibility to scale up further.
- the [EBS CSI driver](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html) is installed and configured, which is used by Camunda 8 applications to spawn [persistent volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).
- a [managed Aurora PostgreSQL 15.4](https://aws.amazon.com/rds/postgresql/) instance that will be used by the Camunda 8 applications.

This basic cluster setup is required to continue with the Helm setup as described in our [AWS Helm Guide](#). <!-- TODO: reference future guide -->

## Usage

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

3. Setup the authentication for the `AWS` provider

It's recommend to use a different backend than `local`, more information can be found in the [documentation of Terraform](https://developer.hashicorp.com/terraform/language/settings/backends/configuration).

Additionally, we're requiring the [AWS Terraform Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) that allows us to create resources in AWS.

Lastly we're configuring the `AWS` provider to allow us using it. Here one can adjust the region to the one you'd typically use and various ways of [authentication](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#authentication-and-configuration).

It's strongly recommended not to have any secrets in your configuration files!

There are several ways to configure the usage.

1. Environment variables `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`, where the key and id can be retrieved from the [AWS Console](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).
2. Use the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) to configure access. Terraform will automatically default to those if they're present.

General advice, the user creating the resources will be the owner of those and always linked to those. Meaning the user will always have admin access on Kubernetes, except you delete it. Therefore, it can make sense to create an extra [IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) that's solely used for Terraform purposes.

### Cluster Module

In the first steps, we've created the basic layout that allows us AWS access and configures Terraform.

The following will make use of [Terraform Modules](https://developer.hashicorp.com/terraform/language/modules), which allow to abstract resources into a reusable way. In this case, it allows Camunda to create a basic setup that others can rely on.

The [Camunda provided module](https://github.com/camunda/camunda-tf-eks-module) is public and can be inspected further before using it.

1. In the folder where your `config.tf` relies, create an additional `cluster.tf`
2. Paste the following contents in there to make use of the provided module

```hcl
module "eks_cluster" {
  source = "github.com/camunda/camunda-tf-eks-module"

  region  = "eu-central-1" # change to your AWS region
  name    = "cluster-name" # change to name of your choosing

  # Set CIDR ranges or use the defaults
  cluster_service_ipv4_cidr = "10.190.0.0/16"
  cluster_node_ipv4_cidr    = "10.192.0.0/16"

  # Please supply your own secret values
  postgresql_username = "secret_user"
  postgresql_password = "secretvalue%23"
}
```

There are various other input options to customize the cluster setup further.
Those can be read up further in the [module documentation](https://github.com/camunda/camunda-tf-eks-module).

In regards to secret management in Terraform, we recommend [injecting those via Vault](https://developer.hashicorp.com/terraform/tutorials/secrets/secrets-vault).

### Execution

1. Open a console in the created Terraform folder where `config.tf` and `cluster.tf` are
2. Initialize the working directory

```hcl
terraform init
```

3. Apply the configuration files

```hcl
terraform apply
```

4. After checking the plan you can type `yes` to confirm the apply

This will result in the creation of the EKS cluster and required configurations. This may take 20-30 minutes to be fully done.

## IAM Access management

The default access is that the user creating the EKS cluster has admin access. To allow others to access as well, we have to adjust the
`aws-auth` configmap. This can either be done manually via `kubectl` or alternatively via `terraform`.

Users can generate access to the EKS cluster via the `AWS CLI`.

```shell
aws eks --region <region> update-kubeconfig --name <clusterName>
```

### terraform

For `terraform` you can create an iam user to Kubernetes role mapping via the following variable.

```hcl
# this is targeting IAM roles
aws_auth_roles = [{
    rolearn  = "<arn>"
    username = "<username>"
    groups   = ["system:masters"]
  }]

# this is targeting IAM users
aws_auth_users = [{
    userarn  = "<arn>"
    username = "<username>"
    groups   = ["system:masters"]
  }]
```

Where `arn` is the `arn` of your user or the role. The `group` is the Kubernetes rule, where `system:masters` is equivalent to an admin role. Lastly `username` is either the username itself or the role name, which is used for logs.

### kubectl

The same can also be achieved by using `kubectl` and manually adding the mapping as part of the `mapRoles` or `mapUsers` section. This requires you to already have access to the Kubernetes cluster. We do recommend using Terraform to configure the cluster access.

```shell
kubectl edit configmap aws-auth -n kube-system
```

For detailed examples, check out the [documentation](https://docs.aws.amazon.com/eks/latest/userguide/add-user-role.html) provided by AWS.
