---
id: eks-terraform
title: "Deploy an EKS cluster with Terraform (stable)"
description: "Deploy an Amazon Kubernetes Cluster (EKS) with a Terraform module for a quick Camunda 8 setup."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This guide offers a detailed tutorial for deploying an Amazon Web Services (AWS) Elastic Kubernetes Service (EKS) cluster, tailored explicitly for deploying Camunda 8 and using Terraform, a popular Infrastructure as Code (IaC) tool.

It is recommended to use this guide for building a robust and sustainable infrastructure over time. However, for a quicker trial or proof of concept, using the [eksctl](./eksctl.md) method may suffice.

This is designed to help leverage the power of IaC to streamline and reproduce a Cloud infrastructure setup. By walking through the essentials of setting up an Amazon EKS cluster, configuring AWS IAM permissions, and integrating a PostgreSQL database and an OpenSearch domain (alternative to ElasticSearch), this guide explains the process of using Terraform with AWS, making it accessible even to those new to Terraform or IaC concepts.

:::tip

If you are completely new to Terraform and the idea of IaC, read through the [Terraform IaC documentation](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/infrastructure-as-code) and give their [interactive quick start](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/infrastructure-as-code#quick-start) a try for a basic understanding.

:::

## 0. Prerequisites

- An [AWS account](https://docs.aws.amazon.com/accounts/latest/reference/accounts-welcome.html) to create any resources within AWS.
- [Terraform (1.9+)](https://developer.hashicorp.com/terraform/downloads)
- [Kubectl (1.30+)](https://kubernetes.io/docs/tasks/tools/#kubectl) to interact with the cluster.
- [IAM Roles for Service Accounts](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) (IRSA) configured.
  - This simplifies the setup by not relying on explicit credentials and instead creating a mapping between IAM roles and Kubernetes service account based on a trust relationship. A [blog post](https://aws.amazon.com/blogs/containers/diving-into-iam-roles-for-service-accounts/) by AWS visualizes this on a technical level.
  - This allows a Kubernetes service account to temporarily impersonate an AWS IAM role to interact with AWS services like S3, RDS, or Route53 without having to supply explicit credentials.
    Voici la correction du texte :
  - Usage of IRSA is recommended to use as it's an [EKS best practice](https://aws.github.io/aws-eks-best-practices/security/docs/iam/).

### Considerations

This setup provides an essential foundation for beginning with Camunda 8, though it's not tailored for optimal performance. It's a good initial step for preparing a production environment by incorporating [IaC tooling](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/infrastructure-as-code).

Terraform can be opaque in the beginning. If you solely want to get an understanding for what is happening, you may try out the [eksctl guide](./eksctl.md) to understand what resources are created and how they interact with each other.

To try out Camunda 8 or develop against it, consider signing up for our [SaaS offering](https://camunda.com/platform/). If you already have an Amazon EKS cluster, consider skipping to the [Helm guide](./eks-helm.md).

For the simplicity of this guide, certain best practices will be provided with links to additional documents, enabling you to explore the topic in more detail.

:::warning Cost management
Following this guide will incur costs on your Cloud provider account, namely for the managed Kubernetes service, running Kubernetes nodes in EC2, Elastic Block Storage (EBS), and Route53. More information can be found on [AWS](https://aws.amazon.com/eks/pricing/) and their [pricing calculator](https://calculator.aws/#/) as the total cost varies per region.
:::

<!-- TODO : add architecture diagram --->

### Outcome

Following this tutorial and steps will result in:

- An Amazon EKS Kubernetes cluster running the latest Kubernetes version with four nodes ready for Camunda 8 installation.
- The [EBS CSI driver](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html) is installed and configured, which is used by the Camunda 8 Helm chart to create [persistent volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).
- A [managed Aurora PostgreSQL 15.8](https://aws.amazon.com/rds/postgresql/) instance to be used by the Camunda 8 components.
- An OpenSearch domain created and configured for use with the Camunda 8 platform, leveraging the capabilities of [AWS OpenSearch Service](https://aws.amazon.com/opensearch-service/).

## 1. Provisioning the Complete Infrastructure for Camunda 8 on AWS

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

<Tabs>
  <TabItem value="standard" label="Standard" default>

```hcl reference
https://github.com/camunda/camunda-tf-eks-module/blob/feature/opensearch-doc/examples/camunda-8.6/config.tf
```

  </TabItem>
  <TabItem value="irsa" label="IRSA" default>

```hcl reference
https://github.com/camunda/camunda-tf-eks-module/blob/feature/opensearch-doc/examples/camunda-8.6-irsa/config.tf
```

  </TabItem>
</Tabs>

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

```hcl reference
https://github.com/camunda/camunda-tf-eks-module/blob/feature/opensearch-doc/examples/camunda-8.6/cluster.tf
```

3. **Configure User Access to the Cluster**

By default, the user who creates the Amazon EKS cluster has administrative access.

<details>
   <summary>Grant cluster access to other users</summary>
   <p>

If you want to grant access to other users, you can configure this by using the `access_entries` input.

Amazon EKS access management is divided into two distinct layers:

- The **first layer** involves **AWS IAM permissions**, which allow basic Amazon EKS functionalities such as interacting with the Amazon EKS UI and generating EKS access through the AWS CLI. The module handles this part for you by creating the necessary IAM roles and policies.

- The **second layer** controls **cluster access** within Kubernetes, defining the user's permissions inside the cluster (e.g., policy association). This can be configured directly through the module's `access_entries` input.

To manage user access, use the `access_entries` configuration, introduced in module version [2.0.0](https://github.com/camunda/camunda-tf-eks-module/releases/tag/2.0.0):

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

In this configuration:

- Replace `principal_arn` with the ARN of the IAM user or role.
- Use `policy_associations` to define policies for fine-grained access control.

For a full list of available policies, refer to the [AWS EKS Access Policies documentation](https://docs.aws.amazon.com/eks/latest/userguide/access-policies.html).

:::info
Please note that starting from version 2.x.x of this module, direct mappings through `aws_auth_roles` and `aws_auth_users` are no longer supported. If you are upgrading from version [1.x.x](https://github.com/camunda/camunda-tf-eks-module/releases/tag/1.0.3), you will need to fork the module and follow AWS's official instructions for managing the `aws-auth` ConfigMap.

For more details, refer to the [official upgrade guide](https://github.com/terraform-aws-modules/terraform-aws-eks/blob/master/docs/UPGRADE-20.0.md).
:::

</p>
</details>

4. **Customize the Cluster Setup:**

   The module offers various input options that allow you to further customize the cluster configuration. For a comprehensive list of available options and detailed usage instructions, please refer to the [EKS module documentation](https://github.com/camunda/camunda-tf-eks-module/blob/2.6.0/modules/eks-cluster/README.md).

### PostgreSQL Module Setup

The default PostgreSQL instance and database (`camunda`) created by this module is primarily intended for use with Keycloak. After the instance is set up, you may manually add additional databases for Identity multi-tenancy if needed, though this guide will not cover those steps, as the default configuration disables multi-tenancy.

We separated the cluster and PostgreSQL modules to offer you more customization options.

#### Step 1: Create a Configuration File for the Database

1. In the directory where your `config.tf` file resides, create a new file named `db.tf`.
2. Add the following content to `db.tf` to use the provided PostgreSQL module:

<Tabs>
  <TabItem value="standard" label="Standard" default>

```hcl reference
https://github.com/camunda/camunda-tf-eks-module/blob/feature/opensearch-doc/examples/camunda-8.6/db.tf
```

  </TabItem>
  <TabItem value="irsa" label="IRSA" default>

In addition to using standard username and password authentication, you can opt to use [**IRSA (IAM Roles for Service Accounts)**](https://aws.amazon.com/blogs/opensource/introducing-fine-grained-iam-roles-service-accounts/) for secure, role-based access to your Aurora database. This method allows your EKS workloads to assume IAM roles without needing to manage AWS credentials directly.

**Note**: Using IRSA is optional. If preferred, you can continue using traditional password-based authentication for database access.

If you choose to use IRSA, you’ll need to take note of the **IAM role** created for Aurora and the **AWS Account ID**, as these will be used later to annotate the Kubernetes service account.

##### Aurora IRSA Role and Policy

The Aurora module uses outputs from the EKS cluster module to configure the IRSA role and policy. Below are the required parameters:

Here’s how to define the IAM role trust policy and access policy for Aurora:

```hcl reference
https://github.com/camunda/camunda-tf-eks-module/blob/feature/opensearch-doc/examples/camunda-8.6-irsa/db.tf
```

Once the IRSA configuration is complete, make sure to **record the IAM role name** (from the `iam_aurora_role_name` configuration) and the **AWS Account ID** (from `module.eks_cluster.aws_caller_identity_account_id`), as these will be required to annotate the Kubernetes service accounts during the helm configuration.

</TabItem>
</Tabs>

#### Step 3: Additional Customization

You can further customize the Aurora cluster setup through various input options. Refer to the [Aurora module documentation](https://github.com/camunda/camunda-tf-eks-module/blob/2.6.0/modules/aurora/README.md) for more details on other customization options.

### OpenSearch Module Setup

The OpenSearch module creates an OpenSearch domain intended to be used by the Camunda platform. OpenSearch is a powerful alternative to ElasticSearch. For more information on how to use OpenSearch with Camunda, refer to the [Camunda documentation](./self-managed/setup/guides/using-existing-opensearch/).

:::note Available since Camunda 8.4

As of the 8.4 release, Zeebe, Operate, and Tasklist are now compatible with [Amazon OpenSearch Service](https://aws.amazon.com/de/opensearch-service/) 2.5.x. Note that using Amazon OpenSearch Service requires [setting up a new Camunda installation](/self-managed/setup/overview.md). A migration from previous versions or Elasticsearch environments is currently not supported.

:::

#### Step 1: Create a Configuration File for OpenSearch

1. In the folder where your `config.tf` file resides, create a new file named `opensearch.tf`.
2. Add the following content to `opensearch.tf` to make use of the provided OpenSearch module:

<Tabs>
  <TabItem value="standard" label="Standard" default>

:::caution Optimize compatibility with OpenSearch

**Migration:** The migration step will be disabled during the installation. For more information, refer to [using Amazon OpenSearch Service](/self-managed/setup/guides/using-existing-opensearch.md).
:::

```hcl reference
https://github.com/camunda/camunda-tf-eks-module/blob/feature/opensearch-doc/examples/camunda-8.6/opensearch.tf
```

  </TabItem>
  
  <TabItem value="irsa" label="IRSA" default>

:::caution Optimize compatibility with OpenSearch

**Authentification:** Optimize does not work with the IRSA method, it will use standard basic auth (username and password).

**Migration:** The migration step will be disabled during the installation. For more information, refer to [using Amazon OpenSearch Service](/self-managed/setup/guides/using-existing-opensearch.md).
:::

In addition to traditional username and password authentication, you can also use [**IRSA (IAM Roles for Service Accounts)**](https://aws.amazon.com/blogs/opensource/introducing-fine-grained-iam-roles-service-accounts/) to securely connect to OpenSearch. IRSA enables your Kubernetes workloads to assume IAM roles without managing AWS credentials directly.

**Note**: Using IRSA is optional. If you prefer, you can continue using password-based access to your OpenSearch domain.

If you choose to use IRSA, you’ll need to take note of the **IAM role name** created for OpenSearch and the **AWS Account ID**, as these will be required later to annotate the Kubernetes service account.

##### OpenSearch IRSA Role and Policy

To configure IRSA for OpenSearch, the OpenSearch module uses outputs from the EKS cluster module to define the necessary IAM role and policies.

Here's an example of how to define the IAM role trust policy and access policy for OpenSearch:

```hcl reference
https://github.com/camunda/camunda-tf-eks-module/blob/feature/opensearch-doc/examples/camunda-8.6-irsa/opensearch.tf
```

Once the IRSA configuration is complete, ensure you **record the IAM role name** (from the `iam_opensearch_role_name` configuration) and the **AWS Account ID** (from `module.eks_cluster.aws_caller_identity_account_id`). You will need these to annotate the Kubernetes service account in the next step.

</TabItem>
</Tabs>

This configuration will deploy an OpenSearch domain with advanced security enabled. You must provide your own username (`advanced_security_master_user_name`) and password for the master user (`advanced_security_master_user_password`).

#### Step 2: Additional Customization

You can further customize the OpenSearch cluster setup using various input options. For a full list of available parameters, see the [OpenSearch module documentation](https://github.com/camunda/camunda-tf-eks-module/blob/2.6.0/modules/opensearch/README.md).

### Outputs

**Terraform** allows you to define outputs, which make it easier to retrieve important values generated during execution, such as database endpoints and other necessary configurations for Helm setup.

1. In the directory containing your `config.tf` file, create an additional file named `output.tf`.
2. Paste the following content into `output.tf` to expose the necessary variables:

```hcl reference
https://github.com/camunda/camunda-tf-eks-module/blob/feature/opensearch-doc/examples/camunda-8.6/output.tf
```

These outputs will allow you to easily reference the **cert-manager** ARN, **external-dns** ARN, and the endpoints for both **PostgreSQL** and **OpenSearch** in subsequent steps or scripts, streamlining your deployment process.

### Execution

:::note Secret Management

We strongly recommend managing sensitive information such as the OpenSearch, Aurora username and password using a secure secrets management solution like HashiCorp Vault. For details on how to inject secrets directly into Terraform via Vault, see the [Terraform Vault Secrets Injection Guide](https://developer.hashicorp.com/terraform/tutorials/secrets/secrets-vault).

:::

1. Open a terminal in the created Terraform folder where `config.tf` and other `.tf` files are.

2. Plan the configuration files:

```bash
terraform plan -out cluster.plan # describe what will be created
```

3. After reviewing the plan, you can confirm and apply the changes.

```bash
terraform apply cluster.plan     # apply the creation
```

At this point, Terraform will create the Amazon EKS cluster with all the necessary configurations. The completion of this process may require approximately 20-30 minutes for each component.

### Reference Files

Depending on the installation path you have chosen, you can find the reference files used on this page:

- **Standard Installation:** [Reference Files](https://github.com/camunda/camunda-tf-eks-module/blob/feature/opensearch-doc/examples/camunda-8.6/)
- **IRSA Installation:** [Reference Files](https://github.com/camunda/camunda-tf-eks-module/blob/feature/opensearch-doc/examples/camunda-8.6-irsa/)

## 2. Preparation for Camunda 8 Installation

### Access the Created EKS Cluster

You can gain access to the Amazon EKS cluster via the `AWS CLI` using the following command:

```shell
aws eks --region "$AWS_REGION" update-kubeconfig --name <clusterName>
```

After updating the kubeconfig, you can verify your connection to the cluster with kubectl:

```shell
kubectl get nodes
```

### Export Values for the Helm Chart

After configuring and deploying your infrastructure with Terraform, follow these instructions to export key values for use in Helm charts to deploy [Camunda 8 on Kubernetes](./eks-helm.md).

The following commands will export the required outputs as environment variables. These values will be necessary for deploying Camunda services with Helm charts:

<Tabs>
  <TabItem value="standard" label="Standard" default>

```bash
# PostgreSQL Credentials (replace with your own values)
export PG_USERNAME="<your username set in the postgres module>"
export PG_PASSWORD="<your password set in the postgres module>"
export DEFAULT_DB_NAME="camunda"

# OpenSearch Credentials (replace with your own values)
export OPENSEARCH_MASTER_USER="<your opensearch user set in the module>"
export OPENSEARCH_MASTER_PASSWORD="<your opensearch password set in the module>"

# Retrieve outputs from modules
export CERT_MANAGER_IRSA_ARN=$(terraform output -raw cert_manager_arn)
export EXTERNAL_DNS_IRSA_ARN=$(terraform output -raw external_dns_arn)

export DB_HOST=$(terraform output -raw postgres_endpoint)

export OPENSEARCH_HOST=$(terraform output -raw opensearch_endpoint)
```

  </TabItem>
  
  <TabItem value="irsa" label="IRSA" default>

```bash
# PostgreSQL Credentials (replace with your own values)
export DB_IRSA_USERNAME="replace with the value of locals.aurora_irsa_username"
export DEFAULT_DB_NAME="camunda"

# Retrieve outputs from modules
export CERT_MANAGER_IRSA_ARN=$(terraform output -raw cert_manager_arn)
export EXTERNAL_DNS_IRSA_ARN=$(terraform output -raw external_dns_arn)

export DB_HOST=$(terraform output -raw postgres_endpoint)
export DB_ROLE_ARN=$(terraform output -raw aurora_role_arn)

export OPENSEARCH_HOST=$(terraform output -raw opensearch_endpoint)
export OPENSEARCH_ROLE_ARN=$(terraform output -raw opensearch_role_arn)
```

:::note IRSA Users

To authenticate and authorize access to PostgreSQL and OpenSearch, **you do not need to export the PostgreSQL or OpenSearch passwords**, IRSA will handle the authentication.

**However**, you will still need to export the relevant usernames and other settings to Helm.

:::

  </TabItem>
</Tabs>

Ensure that you use the actual values you passed to the Terraform module during the setup of PostgreSQL and OpenSearch.

### Create the Database and associated access

<Tabs>
  <TabItem value="standard" label="Standard" default>

For a standard installation, it is **not necessary to create a database manually**, as it is created by default. However, you need to ensure that access to the database happens within the **same network**. This is critical for security and performance. For administrative operations, you have two options:

1. **Bastion Host**: You can set up a bastion host in the same network to access the database securely.
2. **Access Pod within EKS Cluster**: Alternatively, you can create a pod in your EKS cluster with the necessary tools to access the database.

This choice is up to you, depending on your infrastructure and security preferences.

  </TabItem>
  <TabItem value="irsa" label="IRSA" default>

When using **IAM Roles for Service Accounts (IRSA)**, you need to create a dedicated database user for IRSA access. Follow these steps to create the database user and configure access.

This is a **Kubernetes Job** that connects to the database and creates the necessary user with the required privileges. The script installs the necessary dependencies and runs SQL commands to create the IRSA user and assign it the correct roles and privileges.

Here is the manifest file and instructions for applying it.

```yaml reference
https://github.com/camunda/camunda-tf-eks-module/blob/feature/opensearch-doc/examples/camunda-8.6-irsa/irsa-postgres-create-db.yml
```

Before applying the manifest, you need to replace the placeholders in the manifest with the actual values.

1. **Create a copy of the manifest**: Save the above manifest to a file, for example, `irsa-postgres-create-db.yml`.

2. **Set the environment variables**: In your terminal, set the necessary environment variables that will be substituted in the manifest.

```bash
export AURORA_ENDPOINT=$(terraform output -raw postgres_endpoint)
export AURORA_PORT=5432
export AURORA_DB_NAME="$DB_NAME"

# PostgreSQL Credentials (replace with your own values from the #postgresql-module-setup step)
export AURORA_USERNAME="<your username set in the module>"
export AURORA_PASSWORD="<your password set in the module>"

export AURORA_USERNAME_IRSA="<your irsa user set by aurora_irsa_username>"
```

2. **Create the Secret Using Environment Variables**:

```bash
kubectl create secret generic irsa-db-secret \
  --from-literal=AURORA_ENDPOINT="$AURORA_ENDPOINT" \
  --from-literal=AURORA_PORT="$AURORA_PORT" \
  --from-literal=AURORA_DB_NAME="$AURORA_DB_NAME" \
  --from-literal=AURORA_USERNAME="$AURORA_USERNAME" \
  --from-literal=AURORA_PASSWORD="$AURORA_PASSWORD" \
  --from-literal=AURORA_USERNAME_IRSA="$AURORA_USERNAME_IRSA"
```

This command creates a secret named `irsa-db-secret` and dynamically populates it with the values from your environment variables.

After running the above command, you can verify that the secret was created successfully by using:

```bash
kubectl get secret irsa-db-secret -o yaml
```

This should display the secret with the base64 encoded values.

3. **Apply the manifest**: Once the secret is created, the **Job** manifest from the previous step can consume this secret to securely access the database credentials.

```bash
kubectl apply -f irsa-postgres-create-db.yml
```

4. **Verify the Job's completion**: Once the job is created, you can monitor its progress using:

```bash
kubectl get jobs
```

Once the job shows as `Completed`, the IRSA user will have been successfully created.

5. **Check logs for confirmation**: You can view the logs of the job to confirm that the user was created and privileges were granted successfully:

```bash
kubectl logs job/postgres-client
```

6. **Cleanup the resources:**

```bash
kubectl delete job postgres-client
kubectl delete secret irsa-db-secret
```

By running these commands, you will clean up both the job and the secret, ensuring that no unnecessary resources remain in the cluster.

  </TabItem>
</Tabs>

## 3. Install Camunda 8 using the Helm Chart

Now that you've exported the necessary values, you can proceed with installing Camunda 8 using Helm charts. Follow the guide [Camunda 8 on Kubernetes](./eks-helm.md) for detailed instructions on deploying the platform to your Kubernetes cluster.
