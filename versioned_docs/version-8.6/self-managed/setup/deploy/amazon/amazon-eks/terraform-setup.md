---
id: eks-terraform
title: "Deploy an EKS cluster with Terraform (advanced)"
description: "Deploy an Amazon Kubernetes Cluster (EKS) with a Terraform module for a quick Camunda 8 setup."
---

<!-- (!) Note: Please ensure that this guide maintains a consistent structure and presentation style throughout, as with docs/self-managed/setup/deploy/amazon/amazon-eks/terraform-setup.md. The user should have a similar experience when reading both guides. -->

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This guide offers a detailed tutorial for deploying an Amazon Web Services (AWS) Elastic Kubernetes Service (EKS) cluster, tailored explicitly for deploying Camunda 8 and using Terraform, a popular Infrastructure as Code (IaC) tool.

It is recommended to use this guide for building a robust and sustainable infrastructure over time. However, for a quicker trial or proof of concept, using the [eksctl](./eksctl.md) method may suffice.

This guide is designed to help leverage the power of Infrastructure as Code (IaC) to streamline and reproduce a cloud infrastructure setup. By walking through the essentials of setting up an Amazon EKS cluster, configuring AWS IAM permissions, and integrating a PostgreSQL database and an OpenSearch domain (as an alternative to Elasticsearch), this guide explains how to use Terraform with AWS, making it accessible even to those new to Terraform or IaC concepts. It utilizes AWS-managed services when available, providing these as an optional convenience that you can choose to use or not.

:::tip

If you are completely new to Terraform and the idea of IaC, read through the [Terraform IaC documentation](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/infrastructure-as-code) and give their [interactive quick start](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/infrastructure-as-code#quick-start) a try for a basic understanding.

:::

## Requirements

- An [AWS account](https://docs.aws.amazon.com/accounts/latest/reference/accounts-welcome.html) to create any resources within AWS.
- [AWS CLI (2.17+)](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html), a CLI tool for creating AWS resources.
- [Terraform (1.9+)](https://developer.hashicorp.com/terraform/downloads)
- [kubectl (1.30+)](https://kubernetes.io/docs/tasks/tools/#kubectl) to interact with the cluster.
- [jq (1.7+)](https://jqlang.github.io/jq/download/) to interact with some Terraform variables.
- [IAM Roles for Service Accounts](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) (IRSA) configured.
  - This simplifies the setup by not relying on explicit credentials and instead creating a mapping between IAM roles and Kubernetes service account based on a trust relationship. A [blog post](https://aws.amazon.com/blogs/containers/diving-into-iam-roles-for-service-accounts/) by AWS visualizes this on a technical level.
  - This allows a Kubernetes service account to temporarily impersonate an AWS IAM role to interact with AWS services like S3, RDS, or Route53 without having to supply explicit credentials.
  - IRSA is recommended as an [EKS best practice](https://aws.github.io/aws-eks-best-practices/security/docs/iam/).
- [AWS Quotas](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html)
  - Ensure at least **3 Elastic IPs** (one per availability zone).
  - Verify quotas for **VPCs, EC2 instances, and storage**.
  - Request increases if needed via the AWS console ([guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-resource-limits.html)), costs are only for resources used.
- This guide uses GNU/Bash for all the shell commands listed.

### Considerations

This setup provides an essential foundation for beginning with Camunda 8, though it's not tailored for optimal performance. It's a good initial step for preparing a production environment by incorporating [IaC tooling](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/infrastructure-as-code).

Terraform can be opaque in the beginning. If you solely want to get an understanding for what is happening, you may try out the [eksctl guide](./eksctl.md) to understand what resources are created and how they interact with each other.

To try out Camunda 8 or develop against it, consider signing up for our [SaaS offering](https://camunda.com/platform/). If you already have an Amazon EKS cluster, consider skipping to the [Helm guide](./eks-helm.md).

For the simplicity of this guide, certain best practices will be provided with links to additional documents, enabling you to explore the topic in more detail.

:::info Module update notice (November 2024)

Modules referenced in this guide have been updated recently from **v2** to **v3**. For more information, refer to our [migration guide from v2 to v3](https://github.com/camunda/camunda-tf-eks-module/blob/main/guides/MIGRATION_GUIDE_v2_to_v3.md).

:::

:::danger Cost management

Following this guide will incur costs on your Cloud provider account, namely for the managed Kubernetes service, running Kubernetes nodes in EC2, Elastic Block Storage (EBS), and Route53. More information can be found on [AWS](https://aws.amazon.com/eks/pricing/) and their [pricing calculator](https://calculator.aws/#/) as the total cost varies per region.

:::

### Variants

We support two variants of this architecture:

- The first, **standard installation**, utilizes a username and password connection for the Camunda components (or simply relies on network isolation for certain components). This option is straightforward and easier to implement, making it ideal for environments where simplicity and rapid deployment are priorities, or where network isolation provides sufficient security.

- The second variant, **IRSA** (IAM Roles for Service Accounts), uses service accounts to perform authentication with IAM policies. This approach offers stronger security and better integration with AWS services, as it eliminates the need to manage credentials manually. It is especially beneficial in environments with strict security requirements, where fine-grained access control and dynamic role-based access are essential.

#### How to choose

- If you prefer a simpler setup with basic authentication or network isolation, and your security needs are moderate, the **standard installation** is a suitable choice.
- If you require enhanced security, dynamic role-based access management, and want to leverage AWS’s identity services for fine-grained control, the **IRSA** variant is the better option.

Both can be set up with or without a **Domain** ([ingress](https://docs.aws.amazon.com/eks/latest/userguide/alb-ingress.html)).

### Outcome

<!-- TODO : add architecture diagram (https://github.com/camunda/team-infrastructure-experience/issues/409) --->

Following this tutorial and steps will result in:

- An Amazon EKS Kubernetes cluster running the latest Kubernetes version with four nodes ready for Camunda 8 installation.
- The [EBS CSI driver](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html) is installed and configured, which is used by the Camunda 8 Helm chart to create [persistent volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).
- A [managed Aurora PostgreSQL 15.x](https://aws.amazon.com/rds/postgresql/) instance to be used by the Camunda platform.
- A [managed OpenSearch domain](https://aws.amazon.com/opensearch-service/) created and configured for use with the Camunda platform.
- (optional) [IAM Roles for Service Accounts](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) (IRSA) configured.
  - This simplifies the setup by not relying on explicit credentials, but instead allows creating a mapping between IAM roles and Kubernetes service accounts based on a trust relationship. A [blog post](https://aws.amazon.com/blogs/containers/diving-into-iam-roles-for-service-accounts/) by AWS visualizes this on a technical level.
  - This allows a Kubernetes service account to temporarily impersonate an AWS IAM role to interact with AWS services like S3, RDS, or Route53 without supplying explicit credentials.

## 1. Configure AWS and initialize Terraform

### Terraform prerequisites

To manage the infrastructure for Camunda 8 on AWS using Terraform, we need to set up Terraform's backend to store the state file remotely in an S3 bucket. This ensures secure and persistent storage of the state file.

:::note
Advanced users may want to handle this part differently and use a different backend. The backend setup provided is an example for new users.
:::

#### Set up AWS authentication

The [AWS Terraform provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) is required to create resources in AWS. Before you can use the provider, you must authenticate it using your AWS credentials.

:::caution Ownership of the created resources

A user who creates resources in AWS will always retain administrative access to those resources, including any Kubernetes clusters created. It is recommended to create a dedicated [AWS IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) for Terraform purposes, ensuring that the resources are managed and owned by that user.

:::

You can further change the region and other preferences and explore different [authentication](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#authentication-and-configuration) methods:

- For development or testing purposes you can use the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html). If you have configured your AWS CLI, Terraform will automatically detect and use those credentials.
  To configure the AWS CLI:

  ```bash
  aws configure
  ```

  Enter your `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, region, and output format. These can be retrieved from the [AWS Console](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).

- For production environments, we recommend the use of a dedicated IAM user and [create access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) for the new IAM user via the console and export them as `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.

#### Create an S3 bucket for Terraform state management

Before setting up Terraform, you need to create an S3 bucket that will store the state file. This is important for collaboration and to prevent issues like state file corruption.

To start, set the region as an environment variable upfront to avoid repeating it in each command:

```bash
export AWS_REGION=<your-region>
```

Replace `<your-region>` with your chosen AWS region (for example, `eu-central-1`).

Now, follow these steps to create the S3 bucket with versioning enabled:

1. Open your terminal and ensure the AWS CLI is installed and configured.

2. Run the following command to create an S3 bucket for storing your Terraform state. Make sure to use a unique bucket name and set the `AWS_REGION` environment variable beforehand:

   ```bash
   # Replace "my-eks-tf-state" with your unique bucket name
   export S3_TF_BUCKET_NAME="my-eks-tf-state"

   aws s3api create-bucket --bucket "$S3_TF_BUCKET_NAME" --region "$AWS_REGION" \
     --create-bucket-configuration LocationConstraint="$AWS_REGION"
   ```

3. Enable versioning on the S3 bucket to track changes and protect the state file from accidental deletions or overwrites:

   ```bash
   aws s3api put-bucket-versioning --bucket "$S3_TF_BUCKET_NAME" --versioning-configuration Status=Enabled --region "$AWS_REGION"
   ```

4. Secure the bucket by blocking public access:

   ```bash
   aws s3api put-public-access-block --bucket "$S3_TF_BUCKET_NAME" --public-access-block-configuration \
     "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true" --region "$AWS_REGION"
   ```

5. Verify versioning is enabled on the bucket:

   ```bash
   aws s3api get-bucket-versioning --bucket "$S3_TF_BUCKET_NAME" --region "$AWS_REGION"
   ```

This S3 bucket will now securely store your Terraform state files with versioning enabled.

#### Create a `config.tf` with the following setup

Once the S3 bucket is created, configure your `config.tf` file to use the S3 backend for managing the Terraform state:

<Tabs groupId="env">
<TabItem value="standard" label="Standard" default>

```hcl reference
https://github.com/camunda/camunda-tf-eks-module/blob/main/examples/camunda-8.6/config.tf
```

</TabItem>
<TabItem value="irsa" label="IRSA">

```hcl reference
https://github.com/camunda/camunda-tf-eks-module/blob/main/examples/camunda-8.6-irsa/config.tf
```

</TabItem>
</Tabs>

#### Initialize Terraform

Once your `config.tf` and authentication are set up, you can initialize your Terraform project. The previous steps configured a dedicated S3 Bucket (`S3_TF_BUCKET_NAME`) to store your state, and the following creates a bucket key that will be used by your configuration.

Configure the backend and download the necessary provider plugins:

```bash
export S3_TF_BUCKET_KEY="camunda-terraform/terraform.tfstate"

echo "Storing terraform state in s3://$S3_TF_BUCKET_NAME/$S3_TF_BUCKET_KEY"

terraform init -backend-config="bucket=$S3_TF_BUCKET_NAME" -backend-config="key=$S3_TF_BUCKET_KEY"
```

Terraform will connect to the S3 bucket to manage the state file, ensuring remote and persistent storage.

### EKS cluster module setup

This module establishes the foundational configuration for AWS access and Terraform.

We will utilize [Terraform modules](https://developer.hashicorp.com/terraform/language/modules), which allow us to abstract resources into reusable components, streamlining our infrastructure management.

The [Camunda-provided module](https://github.com/camunda/camunda-tf-eks-module) is publicly available and offers a robust starting point for deploying an EKS cluster. It is highly recommended to review this module prior to implementation to understand its structure and capabilities.

#### Set up the EKS cluster module

1. Create a `cluster.tf` file in the same directory as your `config.tf` file.
2. Add the following content to your newly created `cluster.tf` file to utilize the provided module:

   <Tabs groupId="env">
   <TabItem value="standard" label="Standard" default>

   ```hcl reference
   https://github.com/camunda/camunda-tf-eks-module/blob/main/examples/camunda-8.6/cluster.tf
   ```

   </TabItem>
   <TabItem value="irsa" label="IRSA">

   ```hcl reference
   https://github.com/camunda/camunda-tf-eks-module/blob/main/examples/camunda-8.6-irsa/cluster.tf
   ```

   </TabItem>
   </Tabs>

3. [Initialize](#initialize-terraform) Terraform for this module using the following Terraform command:

   ```bash
   terraform init -backend-config="bucket=$S3_TF_BUCKET_NAME" -backend-config="key=$S3_TF_BUCKET_KEY"
   ```

4. Configure user access to the cluster. By default, the user who creates the Amazon EKS cluster has administrative access.

   <details>
     <summary>Grant cluster access to other users</summary>
     <p>

   If you want to grant access to other users, you can configure this by using the `access_entries` input.

   Amazon EKS access management is divided into two distinct layers:

   - The **first layer** involves **AWS IAM permissions**, which allow basic Amazon EKS functionalities such as interacting with the Amazon EKS UI and generating EKS access through the AWS CLI. The module handles this part for you by creating the necessary IAM roles and policies.

   - The **second layer** controls **cluster access** within Kubernetes, defining the user's permissions inside the cluster (for example, policy association). This can be configured directly through the module's `access_entries` input.

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

   :::info Module deprecation notice
   Starting from version 2.x.x of this module, direct mappings through `aws_auth_roles` and `aws_auth_users` are no longer supported. If you are upgrading from version [1.x.x](https://github.com/camunda/camunda-tf-eks-module/releases/tag/1.0.3), you will need to fork the module and follow AWS's official instructions for managing the `aws-auth` ConfigMap.

   For more details, refer to the [official upgrade guide](https://github.com/terraform-aws-modules/terraform-aws-eks/blob/master/docs/UPGRADE-20.0.md).
   :::

   </p>
   </details>

5. Customize the cluster setup. The module offers various input options that allow you to further customize the cluster configuration. For a comprehensive list of available options and detailed usage instructions, refer to the [EKS module documentation](https://github.com/camunda/camunda-tf-eks-module/blob/2.6.0/modules/eks-cluster/README.md).

### PostgreSQL module setup

:::info Optional module

If you don't want to use this module, you can skip this section. However, you may need to adjust the remaining instructions to remove references to this module.

If you choose not to use this module, you must either provide a managed PostgreSQL service or use the internal deployment by the Camunda Helm chart in Kubernetes.
:::

We separated the cluster and PostgreSQL modules to offer you more customization options.

#### Set up the Aurora PostgreSQL module

1. Create a `db.tf` file in the same directory as your `config.tf` file.
2. Add the following content to your newly created `db.tf` file to utilize the provided module:

   <Tabs groupId="env">
     <TabItem value="standard" label="Standard" default>

   ```hcl reference
   https://github.com/camunda/camunda-tf-eks-module/blob/main/examples/camunda-8.6/db.tf
   ```

     </TabItem>
     <TabItem value="irsa" label="IRSA">

   In addition to using standard username and password authentication, you can opt to use [**IRSA (IAM Roles for Service Accounts)**](https://aws.amazon.com/blogs/opensource/introducing-fine-grained-iam-roles-service-accounts/) for secure, role-based access to your Aurora database. This method allows your EKS workloads to assume IAM roles without needing to manage AWS credentials directly.

   :::note
   Using IRSA is optional. If preferred, you can continue using traditional password-based authentication for database access.
   :::

   If you choose to use IRSA, you’ll need to take note of the **IAM role** created for Aurora and the **AWS Account ID**, as these will be used later to annotate the Kubernetes service account.

   ##### Aurora IRSA role and policy

   The Aurora module uses outputs from the EKS cluster module to configure the IRSA role and policy. Below are the required parameters:

   Here’s how to define the IAM role trust policy and access policy for Aurora:

   ```hcl reference
   https://github.com/camunda/camunda-tf-eks-module/blob/main/examples/camunda-8.6-irsa/db.tf
   ```

   Once the IRSA configuration is complete, ensure you **record the IAM role name** (from the `iam_aurora_role_name` configuration), it is required to annotate the Kubernetes service account in the next step.

   </TabItem>
   </Tabs>

3. [Initialize](#initialize-terraform) Terraform for this module using the following Terraform command:

   ```bash
   terraform init -backend-config="bucket=$S3_TF_BUCKET_NAME" -backend-config="key=$S3_TF_BUCKET_KEY"
   ```

4. Customize the Aurora cluster setup through various input options. Refer to the [Aurora module documentation](https://github.com/camunda/camunda-tf-eks-module/blob/2.6.0/modules/aurora/README.md) for more details on other customization options.

### OpenSearch module setup

:::info Optional module

If you don't want to use this module, you can skip this section. However, you may need to adjust the remaining instructions to remove references to this module.

If you choose not to use this module, you'll need to either provide a managed Elasticsearch or OpenSearch service or use the internal deployment by the Camunda Helm chart in Kubernetes.
:::

The OpenSearch module creates an OpenSearch domain intended for Camunda platform. OpenSearch is a powerful alternative to Elasticsearch. For more information on using OpenSearch with Camunda, refer to the [Camunda documentation](/self-managed/setup/guides/using-existing-opensearch.md).

:::note Migration to OpenSearch is not supported

Using Amazon OpenSearch Service requires [setting up a new Camunda installation](/self-managed/setup/overview.md). Migration from previous Camunda versions or Elasticsearch environments is currently not supported. Switching between Elasticsearch and OpenSearch, in either direction, is also not supported.

:::

#### Set up the OpenSearch domain module

1. Create a `opensearch.tf` file in the same directory as your `config.tf` file.
1. Add the following content to your newly created `opensearch.tf` file to utilize the provided module:

   <Tabs groupId="env">
     <TabItem value="standard" label="Standard" default>

   :::caution Network based security
   The standard deployment for OpenSearch relies on the first layer of security, which is the Network.
   While this setup allows easy access, it may expose sensitive data. To enhance security, consider implementing IAM Roles for Service Accounts (IRSA) to restrict access to the OpenSearch cluster, providing a more secure environment.
   For more information, see the [Amazon OpenSearch Service Fine-Grained Access Control documentation](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/fgac.html#fgac-access-policies).
   :::

   ```hcl reference
   https://github.com/camunda/camunda-tf-eks-module/blob/main/examples/camunda-8.6/opensearch.tf
   ```

     </TabItem>
     
     <TabItem value="irsa" label="IRSA">

   In addition to standard authentication, which uses anonymous users and relies on the network for access control, you can also use [**IRSA (IAM Roles for Service Accounts)**](https://aws.amazon.com/blogs/opensource/introducing-fine-grained-iam-roles-service-accounts/) to securely connect to OpenSearch. IRSA enables your Kubernetes workloads to assume IAM roles without managing AWS credentials directly.

   :::note
   Using IRSA is optional. If you prefer, you can continue using password-based access to your OpenSearch domain.
   :::

   If you choose to use IRSA, you’ll need to take note of the **IAM role name** created for OpenSearch and the **AWS Account ID**, as these will be required later to annotate the Kubernetes service account.

   ##### OpenSearch IRSA role and policy

   To configure IRSA for OpenSearch, the OpenSearch module uses outputs from the EKS cluster module to define the necessary IAM role and policies.

   Here's an example of how to define the IAM role trust policy and access policy for OpenSearch, this configuration will deploy an OpenSearch domain with advanced security enabled:

   ```hcl reference
   https://github.com/camunda/camunda-tf-eks-module/blob/main/examples/camunda-8.6-irsa/opensearch.tf
   ```

   Once the IRSA configuration is complete, ensure you **record the IAM role name** (from the `iam_opensearch_role_name` configuration), it is required to annotate the Kubernetes service account in the next step.

   As the OpenSearch domain has advanced security enabled and [fine-grained access control](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/fgac.html), we will later use your provided master username (`advanced_security_master_user_name`) and password (`advanced_security_master_user_password`) to perform the initial setup of the security component, allowing the created IRSA role to access the domain.

   </TabItem>
   </Tabs>

1. [Initialize](#initialize-terraform) Terraform for this module using the following Terraform command:

   ```bash
   terraform init -backend-config="bucket=$S3_TF_BUCKET_NAME" -backend-config="key=$S3_TF_BUCKET_KEY"
   ```

1. Customize the cluster setup using various input options. For a full list of available parameters, see the [OpenSearch module documentation](https://github.com/camunda/camunda-tf-eks-module/blob/2.6.0/modules/opensearch/README.md).

:::tip

The instance type `m7i.large.search` in the above example is a suggestion, and can be changed depending on your needs.

:::

### Define outputs

**Terraform** allows you to define outputs, which make it easier to retrieve important values generated during execution, such as database endpoints and other necessary configurations for Helm setup.

Each module that you have previously set up contains an output definition at the end of the file. You can adjust them to your needs.

Outputs allow you to easily reference the **cert-manager** ARN, **external-dns** ARN, and the endpoints for both **PostgreSQL** and **OpenSearch** in subsequent steps or scripts, streamlining your deployment process.

### Execution

:::note Secret management

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

Terraform will now create the Amazon EKS cluster with all the necessary configurations. The completion of this process may require approximately 20-30 minutes for each component.

### Reference files

Depending on the installation path you have chosen, you can find the reference files used on this page:

- **Standard installation:** [Reference Files](https://github.com/camunda/camunda-tf-eks-module/blob/main/examples/camunda-8.6/)
- **IRSA Installation:** [Reference Files](https://github.com/camunda/camunda-tf-eks-module/blob/main/examples/camunda-8.6-irsa/)

## 2. Preparation for Camunda 8 installation

### Access the created EKS cluster

You can gain access to the Amazon EKS cluster via the `AWS CLI` using the following command:

```shell
export CLUSTER_NAME="$(terraform console <<<local.eks_cluster_name | jq -r)"

aws eks --region "$AWS_REGION" update-kubeconfig --name "$CLUSTER_NAME" --alias "$CLUSTER_NAME"
```

After updating the kubeconfig, you can verify your connection to the cluster with `kubectl`:

```shell
kubectl get nodes
```

Create a namespace for Camunda:

```shell
kubectl create namespace camunda
```

In the remainder of the guide, we reference the `camunda` namespace to create some required resources in the Kubernetes cluster, such as secrets or one-time setup jobs.

### Export values for the Helm chart

After configuring and deploying your infrastructure with Terraform, follow these instructions to export key values for use in Helm charts to deploy [Camunda 8 on Kubernetes](./eks-helm.md).

The following commands will export the required outputs as environment variables. You may need to omit some if you have chosen not to use certain modules. These values will be necessary for deploying Camunda 8 with Helm charts:

<Tabs groupId="env">
  <TabItem value="standard" label="Standard" default>

```bash reference
https://github.com/camunda/camunda-tf-eks-module/blob/main/examples/camunda-8.6/procedure/export-helm-values.sh
```

  </TabItem>
  
  <TabItem value="irsa" label="IRSA">

```bash reference
https://github.com/camunda/camunda-tf-eks-module/blob/main/examples/camunda-8.6-irsa/procedure/export-helm-values.sh
```

:::note IRSA users

To authenticate and authorize access to PostgreSQL and OpenSearch, **you do not need to export the PostgreSQL or OpenSearch passwords**, IRSA will handle the authentication.

**However**, you will still need to export the relevant usernames and other settings to Helm.

:::

  </TabItem>
</Tabs>

Ensure that you use the actual values you passed to the Terraform module during the setup of PostgreSQL and OpenSearch.

### Configure the database and associated access

As you now have a database, you need to create dedicated databases for each Camunda component and an associated user that have a configured access. Follow these steps to create the database users and configure access.

You can access the created database in two ways:

1. **Bastion host:** Set up a bastion host within the same network to securely access the database.
2. **Pod within the EKS cluster:** Deploy a pod in your EKS cluster equipped with the necessary tools to connect to the database.

The choice depends on your infrastructure setup and security preferences. In this guide, we'll use a pod within the EKS cluster to configure the database.

1. In your terminal, set the necessary environment variables that will be substituted in the setup manifest:

   ```bash reference
   https://github.com/camunda/camunda-tf-eks-module/blob/main/examples/camunda-8.6/procedure/vars-create-db.sh
   ```

   A **Kubernetes job** will connect to the database and create the necessary users with the required privileges. The script installs the necessary dependencies and runs SQL commands to create the IRSA user and assign it the correct roles and privileges.

2. Create a secret that references the environment variables:

   <Tabs groupId="env">
     <TabItem value="standard" label="Standard" default>

   ```bash reference
   https://github.com/camunda/camunda-tf-eks-module/blob/main/examples/camunda-8.6/procedure/create-setup-db-secret.sh
   ```

   This command creates a secret named `setup-db-secret` and dynamically populates it with the values from your environment variables.

   After running the above command, you can verify that the secret was created successfully by using:

   ```bash
   kubectl get secret setup-db-secret -o yaml --namespace camunda
   ```

   This should display the secret with the base64 encoded values.

   </TabItem>

   <TabItem value="irsa" label="IRSA">

   ```bash reference
   https://github.com/camunda/camunda-tf-eks-module/blob/main/examples/camunda-8.6-irsa/procedure/create-setup-db-secret.sh
   ```

   This command creates a secret named `setup-db-secret` and dynamically populates it with the values from your environment variables.

   After running the above command, you can verify that the secret was created successfully by using:

   ```bash
   kubectl get secret setup-db-secret -o yaml --namespace camunda
   ```

   This should display the secret with the base64 encoded values.

   </TabItem>
   </Tabs>

3. Save the following manifest to a file, for example, `setup-postgres-create-db.yml`.

   <Tabs groupId="env" queryString values={
   [
   {label: 'Standard', value: 'standard' },
   {label: 'IRSA', value: 'irsa' },
   ]}>
   <TabItem value="standard">

   ```yaml reference
   https://github.com/camunda/camunda-tf-eks-module/blob/main/examples/camunda-8.6/setup-postgres-create-db.yml
   ```

   </TabItem>
   <TabItem value="irsa">

   ```yaml reference
   https://github.com/camunda/camunda-tf-eks-module/blob/main/examples/camunda-8.6-irsa/setup-postgres-create-db.yml
   ```

   </TabItem>
   </Tabs>

4. Apply the manifest:

   ```bash
   kubectl apply -f setup-postgres-create-db.yml --namespace camunda
   ```

   Once the secret is created, the **Job** manifest from the previous step can consume this secret to securely access the database credentials.

5. Once the job is created, monitor its progress using:

   ```bash
   kubectl get job/create-setup-user-db --namespace camunda --watch
   ```

   Once the job shows as `Completed`, the users and databases will have been successfully created.

6. View the logs of the job to confirm that the users were created and privileges were granted successfully:

   ```bash
   kubectl logs job/create-setup-user-db --namespace camunda
   ```

7. Clean up the resources:

   ```bash
   kubectl delete job create-setup-user-db --namespace camunda
   kubectl delete secret setup-db-secret --namespace camunda
   ```

Running these commands cleans up both the job and the secret, ensuring that no unnecessary resources remain in the cluster.

### Configure OpenSearch fine grained access control

As you now have an OpenSearch domain, you need to configure the related access for each Camunda component.

You can access the created OpenSearch domain in two ways:

1. **Bastion host:** Set up a bastion host within the same network to securely access the OpenSearch domain.
2. **Pod within the EKS cluster:** Alternatively, deploy a pod in your EKS cluster equipped with the necessary tools to connect to the OpenSearch domain.

The choice depends on your infrastructure setup and security preferences. In this tutorial, we'll use a pod within the EKS cluster to configure the domain.

<Tabs groupId="env">
  <TabItem value="standard" label="Standard" default>

The standard installation comes already pre-configured, and no additional steps are required.

  </TabItem>
  <TabItem value="irsa" label="IRSA">

1. In your terminal, set the necessary environment variables that will be substituted in the setup manifest:

   ```bash reference
   https://github.com/camunda/camunda-tf-eks-module/blob/main/examples/camunda-8.6-irsa/procedure/vars-create-os.sh
   ```

   A **Kubernetes job** will connect to the OpenSearch dommain and configure it.

1. Create a secret that references the environment variables:

   ```bash reference
   https://github.com/camunda/camunda-tf-eks-module/blob/main/examples/camunda-8.6-irsa/procedure/create-setup-os-secret.sh
   ```

   This command creates a secret named `setup-os-secret` and dynamically populates it with the values from your environment variables.

   After running the above command, you can verify that the secret was created successfully by using:

   ```bash
   kubectl get secret setup-os-secret -o yaml --namespace camunda
   ```

   This should display the secret with the base64 encoded values.

1. Save the following manifest to a file, for example, `setup-opensearch-fgac.yml`.

   ```yaml reference
   https://github.com/camunda/camunda-tf-eks-module/blob/main/examples/camunda-8.6-irsa/setup-opensearch-fgac.yml
   ```

1. Apply the manifest:

   ```bash
   kubectl apply -f setup-opensearch-fgac.yml --namespace camunda
   ```

   Once the secret is created, the **Job** manifest from the previous step can consume this secret to securely access the OpenSearch domain credentials.

1. Once the job is created, monitor its progress using:

   ```bash
   kubectl get job/setup-opensearch-fgac --namespace camunda --watch
   ```

   Once the job shows as `Completed`, the OpenSearch domain is configured correctly for fine grained access control.

1. View the logs of the job to confirm that the privileges were granted successfully:

   ```bash
   kubectl logs job/setup-opensearch-fgac --namespace camunda
   ```

1. Clean up the resources:

   ```bash
   kubectl delete job setup-opensearch-fgac --namespace camunda
   kubectl delete secret setup-os-secret --namespace camunda
   ```

Running these commands will clean up both the job and the secret, ensuring that no unnecessary resources remain in the cluster.

</TabItem>
</Tabs>

## 3. Install Camunda 8 using the Helm chart

Now that you've exported the necessary values, you can proceed with installing Camunda 8 using Helm charts. Follow the guide [Camunda 8 on Kubernetes](./eks-helm.md) for detailed instructions on deploying the platform to your Kubernetes cluster.
