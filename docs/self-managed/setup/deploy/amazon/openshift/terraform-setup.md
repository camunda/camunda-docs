---
id: terraform-setup
title: "Deploy a ROSA HCP Cluster with Terraform"
description: "Deploy Red Hat OpenShift on AWS using a Terraform module for a quick Camunda 8 setup."
---

<!-- (!) Note: Please ensure consistency between this page and ../amazon-eks/terraform-setup.md -->

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This guide provides a detailed tutorial for deploying a [Red Hat OpenShift on AWS (ROSA) cluster with Hosted Control Plane (HCP)](https://docs.redhat.com/en/documentation/red_hat_openshift_service_on_aws/4/html-single/architecture/index#architecture-overview) capabilities. It is specifically tailored for deploying Camunda 8 using Terraform, a widely-used Infrastructure as Code (IaC) tool.

We recommend this guide for building a robust and sustainable infrastructure. However, if you are looking for a quicker trial or proof of concept, or if your needs aren't fully met by our module, consider following the official [ROSA Quickstart Guide](https://docs.redhat.com/en/documentation/red_hat_openshift_service_on_aws/4/html/getting_started/rosa-quickstart-guide-ui#rosa-quickstart-guide-ui).

This guide aims to help you leverage IaC to streamline and reproduce your cloud infrastructure setup. While it covers the essentials for deploying an ROSA HCP cluster, for more advanced use cases, please refer to the official [Red Hat OpenShift on AWS Documentation](https://docs.redhat.com/en/documentation_red_hat_openshift_service_on_aws/4/).

:::tip

If you are completely new to Terraform and the idea of IaC, read through the [Terraform IaC documentation](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/infrastructure-as-code) and give their [interactive quick start](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/infrastructure-as-code#quick-start) a try for a basic understanding.

:::

## Requirements

- A [Red Hat Account](https://www.redhat.com/) to create the Red Hat OpenShift cluster.
- An [AWS account](https://docs.aws.amazon.com/accounts/latest/reference/accounts-welcome.html) to create any resources within AWS.
- [AWS CLI (2.17+)](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html), a CLI tool for creating AWS resources.
- [Terraform (1.9+)](https://developer.hashicorp.com/terraform/downloads)
- [kubectl (1.30+)](https://kubernetes.io/docs/tasks/tools/#kubectl) to interact with the cluster.
- [ROSA CLI (1.30+)](https://docs.redhat.com/en/documentation/red_hat_openshift_service_on_aws/4/html/getting_started/rosa-quickstart-guide-ui#rosa-getting-started-environment-setup_rosa-quickstart-guide-ui) to interact with the cluster.
- [jq (1.7+)](https://jqlang.github.io/jq/download/) to interact with some Terraform variables.
- This guide uses GNU/Bash for all the shell commands listed.

### Considerations

This setup provides a foundational starting point for working with Camunda 8, though it is not optimized for peak performance. It serves as a solid initial step in preparing a production environment by leveraging [Infrastructure as Code (IaC) tools](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/infrastructure-as-code).

Terraform can seem complex at first. If you're interested in understanding what each component does, consider trying out the [Red Hat OpenShift on AWS UI-based tutorial](https://docs.redhat.com/en/documentation_red_hat_openshift_service_on_aws/4/html/getting_started/rosa-quickstart-guide-ui#rosa-quickstart-creating-a-cluster). This guide will show you what resources are created and how they interact with each other.

Certain resources, such as the PostgreSQL database and OpenSearch, use the same definitions as described in the [EKS setup with Terraform](../amazon-eks/terraform-setup.md) guide.

For testing Camunda 8 or developing against it, you might consider signing up for our [SaaS offering](https://camunda.com/platform/). If you already have a Red Hat OpenShift cluster on AWS, you can skip ahead to the [Helm setup guide](./openshift-helm.md).

To keep this guide concise, we provide links to additional documentation covering best practices, allowing you to explore each topic in greater depth.

:::warning Cost management

Here’s the corrected version:

Following this guide will incur costs on your cloud provider account and your Red Hat account, specifically for the managed OpenShift service, OpenShift worker nodes running in EC2, the hosted control plane, Elastic Block Storage (EBS), and Route 53. For more details, refer to [ROSA AWS pricing](https://aws.amazon.com/rosa/pricing/) and the [AWS Pricing Calculator](https://calculator.aws/#/) as total costs vary by region.

:::

### Variants

Unlike the [EKS Terraform setup](../amazon-eks/terraform-setup.md), we currently support only one main variant of this setup:

- The **standard installation** uses a username and password connection for Camunda components (or relies solely on network isolation for certain components). This option is straightforward and easier to implement, making it ideal for environments where simplicity and rapid deployment are priorities, or where network isolation provides adequate security.

- The second variant, **IRSA** (IAM Roles for Service Accounts), may work but has not been tested. If you’re interested in setting it up, please refer to the EKS guide as a foundational resource.

### Outcome

<!-- TODO : add architecture diagram --->

Following this tutorial and steps will result in:

- A [Red Hat OpenShift with Hosted Control Plane](https://www.redhat.com/en/topics/containers/what-are-hosted-control-planes#rosa-with-hcp) cluster running the latest ROSA version with three nodes ready for Camunda 8 installation.
- The [EBS CSI driver](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html) is installed and configured, which is used by the Camunda 8 Helm chart to create [persistent volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).
- A [managed Aurora PostgreSQL 15.x](https://aws.amazon.com/rds/postgresql/) instance to be used by the Camunda platform.
- A [managed OpenSearch domain](https://aws.amazon.com/opensearch-service/) created and configured for use with the Camunda platform.

## 1. Configure AWS and initialize Terraform

### Terraform prerequisites

To manage the infrastructure for Camunda 8 on AWS using Terraform, we need to set up Terraform's backend to store the state file remotely in an S3 bucket. This ensures secure and persistent storage of the state file.

:::note
Advanced users may want to handle this part differently and use a different backend. The backend setup provided is an example for new users.
:::

#### Set up AWS authentication

The [AWS Terraform provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) is required to create resources in AWS. Before you can use the provider, you must authenticate it using your AWS credentials.
You can further change the region and other preferences and explore different [authentication](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#authentication-and-configuration) methods.

We recommend using the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html). If you have configured your AWS CLI, Terraform will automatically detect and use those credentials.

To configure the AWS CLI:

```bash
aws configure
```

Enter your `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, region, and output format. These can be retrieved from the [AWS Console](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).

:::caution Ownership of the created resources

A user who creates resources in AWS will always retain administrative access to those resources, including any Kubernetes clusters created. It is recommended to create a dedicated [AWS IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) for Terraform purposes, ensuring that the resources are managed and owned by that user.

[Create access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) for the new IAM user via the console and export them as `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` variables to use with the AWS CLI and `rosa`

:::

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
   # Replace "my-rosa-tf-state" with your unique bucket name
   export S3_TF_BUCKET_NAME="my-rosa-tf-state"

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

```hcl reference
https://github.com/camunda/camunda-deployment-references/blob/feature/openshift-ra-standard/aws/rosa-hcp/camunda-versions/8.7/config.tf
```

#### Initialize Terraform

Once your `config.tf` and authentication are set up, you can initialize your Terraform project. The previous steps configured a dedicated S3 Bucket (`S3_TF_BUCKET_NAME`) to store your state, and the following creates a bucket key that will be used by your configuration.

Configure the backend and download the necessary provider plugins:

```bash
export S3_TF_BUCKET_KEY="camunda-terraform/terraform.tfstate"

echo "Storing terraform state in s3://$S3_TF_BUCKET_NAME/$S3_TF_BUCKET_KEY"

terraform init -backend-config="bucket=$S3_TF_BUCKET_NAME" -backend-config="key=$S3_TF_BUCKET_KEY"
```

Terraform will connect to the S3 bucket to manage the state file, ensuring remote and persistent storage.

### OpenShift cluster module setup

This module establishes the foundational configuration for AWS access and Terraform.

We will utilize [Terraform modules](https://developer.hashicorp.com/terraform/language/modules), which allow us to abstract resources into reusable components, streamlining our infrastructure management.

The [Camunda-provided module](https://github.com/camunda/camunda-tf-rosa) is publicly available and offers a robust starting point for deploying an Red Hat OpenShift cluster on AWS with Hosted Control Plane. It is highly recommended to review this module prior to implementation to understand its structure and capabilities.

#### Set up the ROSA cluster module

1. Create a `cluster.tf` file in the same directory as your `config.tf` file.
2. Add the following content to your newly created `cluster.tf` file to utilize the provided module:

   ```hcl reference
   https://github.com/camunda/camunda-deployment-references/blob/feature/openshift-ra-standard/aws/rosa-hcp/camunda-versions/8.7/cluster.tf
   ```

3. [Initialize](#initialize-terraform) Terraform for this module using the following Terraform command:

   ```bash
   terraform init -backend-config="bucket=$S3_TF_BUCKET_NAME" -backend-config="key=$S3_TF_BUCKET_KEY"
   ```

4. Configure user access to the cluster. By default, the user who creates the OpenShift cluster has administrative access, if you want to grant access to other users, please follow the [Red Hat documentation for granting admin rights to users](https://docs.openshift.com/rosa/cloud_experts_tutorials/cloud-experts-getting-started/cloud-experts-getting-started-admin-rights.html).

5. Customize the cluster setup. The module offers various input options that allow you to further customize the cluster configuration. For a comprehensive list of available options and detailed usage instructions, refer to the [ROSA module documentation](https://github.com/camunda/camunda-tf-rosa/blob/v1.3.0/modules/rosa-hcp/README.md).

### PostgreSQL module setup

:::info Optional module

If you don't want to use this module, you can skip this section. However, you may need to adjust the remaining instructions to remove references to this module.

If you choose not to use this module, you must either provide a managed PostgreSQL service or use the internal deployment by the Camunda Helm chart in Kubernetes.
:::

We separated the cluster and PostgreSQL modules to offer you more customization options.

#### Set up the Aurora PostgreSQL module

1. Create a `db.tf` file in the same directory as your `config.tf` file.
2. Add the following content to your newly created `db.tf` file to utilize the provided module:

   ```hcl reference
   https://github.com/camunda/camunda-tf-eks-module/blob/main/examples/camunda-8.7/db.tf
   ```

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

   :::caution Network based security
   The standard deployment for OpenSearch relies on the first layer of security, which is the Network.
   While this setup allows easy access, it may expose sensitive data. To enhance security, consider implementing IAM Roles for Service Accounts (IRSA) to restrict access to the OpenSearch cluster, providing a more secure environment.
   For more information, see the [Amazon OpenSearch Service Fine-Grained Access Control documentation](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/fgac.html#fgac-access-policies).
   :::

   ```hcl reference
   https://github.com/camunda/camunda-tf-eks-module/blob/main/examples/camunda-8.7/opensearch.tf
   ```

1. [Initialize](#initialize-terraform) Terraform for this module using the following Terraform command:

   ```bash
   terraform init -backend-config="bucket=$S3_TF_BUCKET_NAME" -backend-config="key=$S3_TF_BUCKET_KEY"
   ```

1. Customize the cluster setup using various input options. For a full list of available parameters, see the [OpenSearch module documentation](https://github.com/camunda/camunda-tf-eks-module/blob/2.6.0/modules/opensearch/README.md).

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

Terraform will now create the OpenShift cluster with all the necessary configurations. The completion of this process may require approximately 20-30 minutes for each component.

### Reference files

Depending on the installation path you have chosen, you can find the reference files used on this page:

- **Standard installation:** [Reference Files](https://github.com/camunda/camunda-deployment-references/tree/feature/openshift-ra-standard/aws/rosa-hcp/camunda-versions/8.7)

## 2. Preparation for Camunda 8 installation

### Access the created OpenShift cluster

<!--  TODO: adapt this part of OpenShift -->

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

After configuring and deploying your infrastructure with Terraform, follow these instructions to export key values for use in Helm charts to deploy [Camunda 8 on Kubernetes](#).

The following commands will export the required outputs as environment variables. You may need to omit some if you have chosen not to use certain modules. These values will be necessary for deploying Camunda 8 with Helm charts:

```bash reference
https://github.com/camunda/camunda-tf-eks-module/blob/main/examples/camunda-8.6/procedure/export-helm-values.sh
```

Ensure that you use the actual values you passed to the Terraform module during the setup of PostgreSQL and OpenSearch.

### Configure the database and associated access

As you now have a database, you need to create dedicated databases for each Camunda component and an associated user that have a configured access. Follow these steps to create the database users and configure access.

You can access the created database in two ways:

1. **Bastion host:** Set up a bastion host within the same network to securely access the database.
2. **Pod within the OpenShift cluster:** Deploy a pod in your OpenShift cluster equipped with the necessary tools to connect to the database.

The choice depends on your infrastructure setup and security preferences. In this guide, we'll use a pod within the OpenShift cluster to configure the database.

1. In your terminal, set the necessary environment variables that will be substituted in the setup manifest:

   ```bash reference
   https://github.com/camunda/camunda-tf-eks-module/blob/main/examples/camunda-8.6/procedure/vars-create-db.sh
   ```

   A **Kubernetes job** will connect to the database and create the necessary users with the required privileges. The script installs the necessary dependencies and runs SQL commands to create the IRSA user and assign it the correct roles and privileges.

2. Create a secret that references the environment variables:

   ```bash reference
   https://github.com/camunda/camunda-tf-eks-module/blob/main/examples/camunda-8.6/procedure/create-setup-db-secret.sh
   ```

   This command creates a secret named `setup-db-secret` and dynamically populates it with the values from your environment variables.

   After running the above command, you can verify that the secret was created successfully by using:

   ```bash
   kubectl get secret setup-db-secret -o yaml --namespace camunda
   ```

   This should display the secret with the base64 encoded values.

3. Save the following manifest to a file, for example, `setup-postgres-create-db.yml`.

   ```yaml reference
   https://github.com/camunda/camunda-tf-eks-module/blob/main/examples/camunda-8.6/setup-postgres-create-db.yml
   ```

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
2. **Pod within the OpenShift cluster:** Alternatively, deploy a pod in your OpenShift cluster equipped with the necessary tools to connect to the OpenSearch domain.

The choice depends on your infrastructure setup and security preferences.

## 3. Install Camunda 8 using the Helm chart

Now that you've exported the necessary values, you can proceed with installing Camunda 8 using Helm charts. Follow the guide [Camunda 8 on OpenShift](./openshift-helm.md) for detailed instructions on deploying the platform to your OpenShift cluster.
