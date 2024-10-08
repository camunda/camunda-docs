---
id: eks-terraform
title: "Deploy an EKS cluster with Terraform"
description: "Deploy an Amazon Kubernetes Cluster (EKS) with a Terraform module for a quick Camunda 8 setup."
---

This guide offers a detailed tutorial for deploying an Amazon Web Services (AWS) Elastic Kubernetes Service (EKS) cluster, tailored explicitly for deploying Camunda 8 and using Terraform, a popular Infrastructure as Code (IaC) tool.

This is designed to help leverage the power of IaC to streamline and reproduce a Cloud infrastructure setup. By walking through the essentials of setting up an Amazon EKS cluster, configuring AWS IAM permissions, and integrating a PostgreSQL database and an OpenSearch domain (alternative to ElasticSearch), this guide explains the process of using Terraform with AWS, making it accessible even to those new to Terraform or IaC concepts.

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

:::warning Cost management
Following this guide will incur costs on your Cloud provider account, namely for the managed Kubernetes service, running Kubernetes nodes in EC2, Elastic Block Storage (EBS), and Route53. More information can be found on [AWS](https://aws.amazon.com/eks/pricing/) and their [pricing calculator](https://calculator.aws/#/) as the total cost varies per region.
:::

<!--- TODO : add architecture diagram --->

## Outcome

Following this tutorial and steps will result in:

- An Amazon EKS Kubernetes cluster running the latest Kubernetes version with four nodes ready for Camunda 8 installation.
- The [EBS CSI driver](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html) is installed and configured, which is used by the Camunda 8 Helm chart to create [persistent volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).
- A [managed Aurora PostgreSQL 15.8](https://aws.amazon.com/rds/postgresql/) instance to be used by the Camunda 8 components.
- An OpenSearch domain created and configured for use with the Camunda 8 platform, leveraging the capabilities of [AWS OpenSearch Service](https://aws.amazon.com/opensearch-service/).

## Provisioning the Complete Infrastructure for Camunda 8 on AWS

### Terraform Prerequisites

To manage the infrastructure for Camunda 8 on AWS using Terraform, we need to set up Terraform's backend to store the state file remotely in an S3 bucket. This ensures secure and persistent storage of the state file.

#### 0. Set Up AWS Authentication

The [AWS Terraform provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) is required to create resources in AWS. Before you can use the provider, you must authenticate it using your AWS credentials.
You can further change the region and other preferences and explore different [authentication](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#authentication-and-configuration) methods.
Here are a few options to authenticate:

- **(Recommended)** Use the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html). If you have configured your AWS CLI, Terraform will automatically detect and use those credentials.

  To configure the AWS CLI:

  ```bash
  aws configure
  ```

  Enter your `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, region, and output format which can be retrieved from the [AWS Console](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).

:::caution

A user who creates resources in AWS will always retain administrative access to those resources, including any Kubernetes clusters created. It is recommended to create a dedicated [AWS IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) for Terraform purposes, ensuring that the resources are managed and owned by that user.

:::

#### 1. Create an S3 Bucket for Terraform State Management

Before setting up Terraform, you need to create an S3 bucket that will store the state file. This is important for collaboration and to prevent issues like state file corruption.

You can optionally set the region as an environment variable upfront to avoid repeating it in each command:

```bash
export AWS_REGION=<your-region>
```

Replace `<your-region>` with your chosen AWS region (e.g., `eu-central-1`).

Now, follow these steps to create the S3 bucket with versioning enabled:

1. **Open your terminal** and ensure the AWS CLI is installed and configured.

2. **Run the following command** to create the S3 bucket, using the previously set `AWS_REGION` environment variable:

   ```bash
   aws s3api create-bucket --bucket my-eks-tf-state --region $AWS_REGION \
     --create-bucket-configuration LocationConstraint=$AWS_REGION
   ```

3. **Enable versioning** on the S3 bucket to track changes and protect the state file from accidental deletions or overwrites:

   ```bash
   aws s3api put-bucket-versioning --bucket my-eks-tf-state --versioning-configuration Status=Enabled --region $AWS_REGION
   ```

4. **Secure the bucket** by blocking public access:

   ```bash
   aws s3api put-public-access-block --bucket my-eks-tf-state --public-access-block-configuration \
     "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true" --region $AWS_REGION
   ```

5. **Verify versioning** is enabled on the bucket:

   ```bash
   aws s3api get-bucket-versioning --bucket my-eks-tf-state --region $AWS_REGION
   ```

This S3 bucket will now securely store your Terraform state files with versioning enabled.

#### 2. Create a `config.tf` with the Following Setup

Once the S3 bucket is created, configure your `config.tf` file to use the S3 backend for managing the Terraform state:

```hcl
terraform {
  required_version = ">= 1.0"

  backend "s3" {
    bucket         = "my-eks-tf-state"
    key            = "camunda-terraform/terraform.tfstate"
    encrypt        = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.69"
    }
  }
}

provider "aws" {}
```

#### 3. Initialize Terraform

Once your `config.tf` and authentication are set up, you can initialize your Terraform project. This will configure the backend and download the necessary provider plugins:

```bash
terraform init
```

Terraform will connect to the S3 bucket to manage the state file, ensuring remote and persistent storage.

### EKS Cluster Module Setup

This module establishes the foundational configuration for AWS access and Terraform.

We will utilize [Terraform modules](https://developer.hashicorp.com/terraform/language/modules), which allow us to abstract resources into reusable components, streamlining our infrastructure management.

The [Camunda-provided module](https://github.com/camunda/camunda-tf-eks-module) is publicly available and offers a robust starting point for deploying an EKS cluster. It is highly recommended to review this module prior to implementation to understand its structure and capabilities.

#### Steps to Set Up the EKS Cluster Module:

1. **Create a `cluster.tf` file** in the same directory as your `config.tf` file.
2. **Add the following content** to your newly created `cluster.tf` file to utilize the provided module:

   ```hcl
   module "eks_cluster" {
     source = "git::https://github.com/camunda/camunda-tf-eks-module//modules/eks-cluster?ref=2.6.0"

     region  = "eu-central-1" # Change this to your desired AWS region
     name    = "cluster-name"  # Change this to a name of your choice

     # Set CIDR ranges or use the defaults
     cluster_service_ipv4_cidr = "10.190.0.0/16"
     cluster_node_ipv4_cidr    = "10.192.0.0/16"
   }
   ```

3. **Customize the Cluster Setup:**

   The module offers various input options that allow you to further customize the cluster configuration. For a comprehensive list of available options and detailed usage instructions, please refer to the [EKS module documentation](https://github.com/camunda/camunda-tf-eks-module/blob/2.6.0/modules/eks-cluster/README.md).

### PostgreSQL Module Setup

The default PostgreSQL instance and database (`camunda`) created by this module is primarily intended for use with Keycloak. After the instance is set up, you may manually add additional databases for Identity multi-tenancy if needed, though this guide will not cover those steps, as the default configuration disables multi-tenancy.

We separated the cluster and PostgreSQL modules to offer you more customization options.

#### Step 1: Create a Configuration File for the Database

1. In the directory where your `config.tf` file resides, create a new file named `db.tf`.
2. Add the following content to `db.tf` to use the provided PostgreSQL module:

```hcl
locals {
  aurora_cluster_name                 = "cluster-name-postgresql"  # Replace "cluster-name" with your cluster's name
}

module "postgresql" {
  source                     = "git::https://github.com/camunda/camunda-tf-eks-module//modules/aurora?ref=2.6.0"
  engine_version             = "15.8"
  auto_minor_version_upgrade = false
  cluster_name               = "${locals.aurora_cluster_name}"
  default_database_name      = "camunda"

  # Supply your own secret values for username and password
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

#### Step 2: Configuring IAM Role for Aurora and IRSA (Optional)

In addition to using standard username and password authentication, you can opt to use **IRSA (IAM Roles for Service Accounts)** for secure, role-based access to your Aurora database. This method allows your EKS workloads to assume IAM roles without needing to manage AWS credentials directly.

**Note**: Using IRSA is optional. If preferred, you can continue using traditional password-based authentication for database access.

If you choose to use IRSA, you’ll need to take note of the **IAM role** created for Aurora and the **AWS Account ID**, as these will be used later to annotate the Kubernetes service account.

<details>
  <summary>Click to expand for IRSA Configuration details</summary>

##### Aurora IRSA Role and Policy

The Aurora module uses outputs from the EKS cluster module to configure the IRSA role and policy. Below are the required parameters:

Here’s how to define the IAM role trust policy and access policy for Aurora:

```hcl
# Previous configuration...

locals {
  camunda_namespace                   = "camunda"                  # Replace with your Kubernetes namespace that will host C8 Platform
  aurora_irsa_username                = "secret_user_irsa"         # This is the username that will be used for IRSA connection to the DB
  camunda_webmodeler_service_account  = "webmodeler-sa"            # Replace with your Kubernetes ServiceAcccount that will be created for WebModeler
  camunda_identity_service_account    = "identity-sa"              # Replace with your Kubernetes ServiceAcccount that will be created for Identity
  camunda_keycloak_service_account    = "keycloak-sa"              # Replace with your Kubernetes ServiceAcccount that will be created for Keycloak
}

module "postgresql" {
  iam_aurora_role_name   = "AuroraRole-${locals.aurora_cluster_name}"  # Ensure this name is unique
  iam_create_aurora_role = true
  iam_auth_enabled       = true

  iam_aurora_access_policy = <<EOF
            {
              "Version": "2012-10-17",
              "Statement": [
                {
                  "Effect": "Allow",
                  "Action": [
                    "rds-db:connect"
                  ],
                  "Resource": "arn:aws:rds-db:${module.eks_cluster.region}:${module.eks_cluster.aws_caller_identity_account_id}:dbuser:${locals.aurora_cluster_name}/${locals.aurora_irsa_username}"
                }
              ]
            }
EOF

  iam_role_trust_policy = <<EOF
          {
            "Version": "2012-10-17",
            "Statement": [
              {
                "Effect": "Allow",
                "Principal": {
                  "Federated": "${module.eks_cluster.oidc_provider_arn}"
                },
                "Action": "sts:AssumeRoleWithWebIdentity",
                "Condition": {
                  "StringEquals": {
                    "${module.eks_cluster.oidc_provider_id}:sub": "system:serviceaccount:${locals.aurora_namespace}:${locals.camunda_webmodeler_service_account}",
                    "${module.eks_cluster.oidc_provider_id}:sub": "system:serviceaccount:${locals.aurora_namespace}:${locals.camunda_identity_service_account}",
                    "${module.eks_cluster.oidc_provider_id}:sub": "system:serviceaccount:${locals.aurora_namespace}:${locals.camunda_keycloak_service_account}"
                  }
                }
              }
            ]
          }
EOF
}
```

Once the IRSA configuration is complete, make sure to **record the IAM role name** (from the `iam_aurora_role_name` configuration) and the **AWS Account ID** (from `module.eks_cluster.aws_caller_identity_account_id`), as these will be required to annotate the Kubernetes service accounts during the helm configuration.

<!-- TODO: for IRSA postgres, adjust with the creation of a database -->

</details>

#### Step 3: Additional Customization

You can further customize the Aurora cluster setup through various input options. Refer to the [Aurora module documentation](https://github.com/camunda/camunda-tf-eks-module/blob/2.6.0/modules/aurora/README.md) for more details on other customization options.

### OpenSearch Module Setup

The OpenSearch module creates an OpenSearch domain intended to be used by the Camunda platform. OpenSearch is a powerful alternative to ElasticSearch. For more information on how to use OpenSearch with Camunda, refer to the [Camunda documentation](./self-managed/setup/guides/using-existing-opensearch/).

#### Step 1: Create a Configuration File for OpenSearch

1. In the folder where your `config.tf` file resides, create a new file named `opensearch.tf`.
2. Add the following content to `opensearch.tf` to make use of the provided OpenSearch module:

```hcl
locals {
  opensearch_domain_name     = "domain-name-opensearch"  # Replace "domain-name" with your domain name
}

module "opensearch" {
  source                     = "git::https://github.com/camunda/camunda-tf-eks-module//modules/opensearch?ref=2.6.0"
  domain_name                = "${locals.opensearch_domain_name}"
  engine_version             = "2.15"

  instance_type   = "t3.medium.search"
  instance_count  = 3
  ebs_volume_size = 50

  subnet_ids         = module.eks_cluster.private_subnet_ids
  security_group_ids = module.eks_cluster.security_group_ids
  vpc_id             = module.eks_cluster.vpc_id
  cidr_blocks        = concat(module.eks_cluster.private_vpc_cidr_blocks, module.eks_cluster.public_vpc_cidr_blocks)

  advanced_security_enabled                     = true
  advanced_security_internal_user_database_enabled = true

  # Supply your own secret values
  advanced_security_master_user_name     = "secret_user"
  advanced_security_master_user_password = "secretvalue%23"

  depends_on = [module.eks_cluster]
}
```

This configuration will deploy an OpenSearch domain with advanced security enabled. You must provide your own username (`advanced_security_master_user_name`) and password for the master user (`advanced_security_master_user_password`).

#### Step 2: Configuring IAM Role for OpenSearch and IRSA (Optional)

In addition to traditional username and password authentication, you can also use **IRSA (IAM Roles for Service Accounts)** to securely connect to OpenSearch. IRSA enables your Kubernetes workloads to assume IAM roles without managing AWS credentials directly.

**Note**: Using IRSA is optional. If you prefer, you can continue using password-based access to your OpenSearch domain.

If you choose to use IRSA, you’ll need to take note of the **IAM role name** created for OpenSearch and the **AWS Account ID**, as these will be required later to annotate the Kubernetes service account.

<details>
  <summary>Click to expand for IRSA Configuration details</summary>

##### OpenSearch IRSA Role and Policy

To configure IRSA for OpenSearch, the OpenSearch module uses outputs from the EKS cluster module to define the necessary IAM role and policies.

Here's an example of how to define the IAM role trust policy and access policy for OpenSearch:

```hcl
locals {
  camunda_namespace                         = "camunda"               # Replace with your Kubernetes namespace that will host C8 Platform
  camunda_zeebe_service_account             = "zeebe-sa"              # Replace with your Kubernetes ServiceAcccount that will be created for Zeebe
  camunda_zeebe_gateway_service_account     = "zeebegateway-sa"       # Replace with your Kubernetes ServiceAcccount that will be created for ZeebeGateway
  camunda_operate_service_account           = "operate-sa"            # Replace with your Kubernetes ServiceAcccount that will be created for Operate
  camunda_identity_service_account          = "identity-sa"           # Replace with your Kubernetes ServiceAcccount that will be created for Identity
  camunda_tasklist_service_account          = "tasklist-sa"           # Replace with your Kubernetes ServiceAcccount that will be created for TaskList
  camunda_webmodeler_service_account        = "webmodeler-sa"         # Replace with your Kubernetes ServiceAcccount that will be created for WebModeler
  camunda_connectors_service_account        = "connectors-sa"         # Replace with your Kubernetes ServiceAcccount that will be created for Connectors
}


module "opensearch_domain" {
  # Previous configuration...

  iam_create_opensearch_role = true
  iam_opensearch_role_name = "OpenSearchRole-${locals.opensearch_domain_name}" # Ensure uniqueness

  iam_opensearch_access_policy = <<EOF
            {
              "Version": "2012-10-17",
              "Statement": [
                {
                  "Effect": "Allow",
                  "Action": [
                    "es:ESHttpGet",
                    "es:ESHttpPut",
                    "es:ESHttpPost"
                  ],
                  "Resource": "arn:aws:es:${module.eks_cluster.region}:${module.eks_cluster.aws_caller_identity_account_id}:domain/${var.opensearch_domain_name}/*"
                }
              ]
            }
EOF

  iam_role_trust_policy = <<EOF
          {
            "Version": "2012-10-17",
            "Statement": [
              {
                "Effect": "Allow",
                "Principal": {
                  "Federated": "${module.eks_cluster.oidc_provider_arn}"
                },
                "Action": "sts:AssumeRoleWithWebIdentity",
                "Condition": {
                  "StringEquals": {
                    "${module.eks_cluster.oidc_provider_id}:sub": "system:serviceaccount:${locals.camunda_namespace}:${locals.camunda_zeebe_service_account}",
                    "${module.eks_cluster.oidc_provider_id}:sub": "system:serviceaccount:${locals.camunda_namespace}:${locals.camunda_zeebe_gateway_service_account}",
                    "${module.eks_cluster.oidc_provider_id}:sub": "system:serviceaccount:${locals.camunda_namespace}:${locals.camunda_operate_service_account}",
                    "${module.eks_cluster.oidc_provider_id}:sub": "system:serviceaccount:${locals.camunda_namespace}:${locals.camunda_identity_service_account}",
                    "${module.eks_cluster.oidc_provider_id}:sub": "system:serviceaccount:${locals.camunda_namespace}:${locals.camunda_tasklist_service_account}",
                    "${module.eks_cluster.oidc_provider_id}:sub": "system:serviceaccount:${locals.camunda_namespace}:${locals.camunda_webmodeler_service_account}",
                    "${module.eks_cluster.oidc_provider_id}:sub": "system:serviceaccount:${locals.camunda_namespace}:${locals.camunda_connectors_service_account}"
                  }
                }
              }
            ]
          }
EOF
}
```

Once the IRSA configuration is complete, ensure you **record the IAM role name** (from the `iam_opensearch_role_name` configuration) and the **AWS Account ID** (from `module.eks_cluster.aws_caller_identity_account_id`). You will need these to annotate the Kubernetes service account in the next step.

</details>

#### Step 3: Additional Customization

You can further customize the OpenSearch cluster setup using various input options. For a full list of available parameters, see the [OpenSearch module documentation](https://github.com/camunda/camunda-tf-eks-module/blob/2.6.0/modules/opensearch/README.md).

### Execution

:::note Secret Management

We strongly recommend managing sensitive information such as the OpenSearch, Aurora username and password using a secure secrets management solution like HashiCorp Vault. For details on how to inject secrets directly into Terraform via Vault, see the [Terraform Vault Secrets Injection Guide](https://developer.hashicorp.com/terraform/tutorials/secrets/secrets-vault).

:::

1. Open a terminal in the created Terraform folder where `config.tf` and other `.tf` files are.
2. Initialize the working directory:

```hcl
terraform init
```

3. Apply the configuration files:

```hcl
terraform plan -out cluster.plan # describe what will be created
terraform apply cluster.plan     # apply the creation
```

4. After reviewing the plan, you can confirm and apply the changes.

At this point, Terraform will create the Amazon EKS cluster with all the necessary configurations. The completion of this process may require approximately 20-30 minutes for each component.

## (Optional) AWS IAM access management for EKS

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

**Terraform** allows you to define outputs, which make it easier to retrieve important values generated during execution, such as database endpoints and other necessary configurations for Helm setup.

1. In the directory containing your `config.tf` file, create an additional file named `output.tf`.
2. Paste the following content into `output.tf` to expose the necessary variables:

```hcl
output "cert_manager_arn" {
  value       = module.eks_cluster.cert_manager_arn
  description = "The Amazon Resource Name (ARN) of the AWS IAM Roles for Service Account mapping for the cert-manager"
}

output "external_dns_arn" {
  value       = module.eks_cluster.external_dns_arn
  description = "The Amazon Resource Name (ARN) of the AWS IAM Roles for Service Account mapping for the external-dns"
}

output "postgres_endpoint" {
  value       = module.postgresql.aurora_endpoint
  description = "The Postgres endpoint URL"
}

output "opensearch_endpoint" {
  value       = module.opensearch.opensearch_domain_endpoint
  description = "The OpenSearch endpoint URL"
}
```

These outputs will allow you to easily reference the **cert-manager** ARN, **external-dns** ARN, and the endpoints for both **PostgreSQL** and **OpenSearch** in subsequent steps or scripts, streamlining your deployment process.

## Next Steps: Using Terraform and Exporting Values

After configuring and deploying your infrastructure with Terraform, follow these instructions to export key values for use in Helm charts to deploy [Camunda 8 on Kubernetes](./eks-helm.md).

### Apply Terraform and Export Values

Run the following command to apply your Terraform configuration and retrieve the outputs:

```bash
terraform apply
```

Once completed, use the following commands to export the required outputs as environment variables. These values will be necessary for deploying Camunda services with Helm charts:

#### Export Values for Helm Charts

```bash
export CERT_MANAGER_IRSA_ARN=$(terraform output -raw cert_manager_arn)
export EXTERNAL_DNS_IRSA_ARN=$(terraform output -raw external_dns_arn)
export DB_HOST=$(terraform output -raw postgres_endpoint)
export OPENSEARCH_HOST=$(terraform output -raw opensearch_endpoint)
```

These values include the **PostgreSQL** and **OpenSearch** endpoints, as well as the necessary IRSA ARNs if you're using IAM roles for service accounts.

### Export Required Values for PostgreSQL and OpenSearch

For deploying **Camunda 8 on Kubernetes**, you'll need to export values for both **PostgreSQL** and **OpenSearch**. These are essential for Helm chart configurations:

```bash
# PostgreSQL Credentials (replace with your own values)
export PG_USERNAME="secret_user"
export PG_PASSWORD="secretvalue%23"
export DEFAULT_DB_NAME="camunda"

# OpenSearch Credentials (replace with your own values)
export OPENSEARCH_MASTER_USER="secret_user"
export OPENSEARCH_MASTER_PASSWORD="secretvalue%23"
```

Ensure that you use the actual values you passed to the Terraform module during the setup of PostgreSQL and OpenSearch.

:::note IRSA Users

If you're using **IRSA** (IAM Roles for Service Accounts) to authenticate and authorize access to PostgreSQL and OpenSearch, **you do not need to export the PostgreSQL or OpenSearch passwords**.
In this case, IRSA will handle the authentication, and the exported variables for `PG_PASSWORD` and `OPENSEARCH_MASTER_PASSWORD` are not required.

**However**, you will still need to export the relevant usernames and other settings to Helm, such as the database name and OpenSearch master user.

:::

<!-- TODO: add a copy of the global reference file that we can also use internally for testing this procedure -->

## Install Camunda 8 using the Helm Chart

Now that you've exported the necessary values, you can proceed with installing Camunda 8 using Helm charts. Follow the guide [Camunda 8 on Kubernetes](./eks-helm.md) for detailed instructions on deploying the platform to your Kubernetes cluster.
