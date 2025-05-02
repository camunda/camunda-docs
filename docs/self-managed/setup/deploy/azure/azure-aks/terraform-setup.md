---
id: aks-terraform
title: "Deploy an AKS cluster with Terraform (advanced)"
description: "Deploy an Azure Kubernetes Service (AKS) cluster with a Terraform module for a quick Camunda 8 setup."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This guide provides a detailed tutorial for deploying a Microsoft Azure Kubernetes Service (AKS) cluster, tailored specifically for deploying Camunda 8 using Terraform, a popular Infrastructure as Code (IaC) tool.

This guide is designed to help you leverage the power of Infrastructure as Code (IaC) to streamline and reproduce your cloud infrastructure setup. By walking through the essentials of setting up an AKS cluster, and provisioning managed Azure resources such as Azure Database for PostgreSQL, this guide demonstrates how to use Terraform with Azure. It makes the process accessible even to those new to Terraform or IaC concepts. It utilizes Azure-managed services where available, offering these as optional components for added convenience and maintainability.

:::tip

If you are completely new to Terraform and the concept of IaC, consider reading the [Terraform IaC documentation](https://developer.hashicorp.com/terraform/tutorials/azure-get-started/infrastructure-as-code) and trying the [interactive quick start](https://developer.hashicorp.com/terraform/tutorials/azure-get-started/infrastructure-as-code#quick-start) for a basic understanding.

:::

## Requirements

- An [Azure subscription](https://azure.microsoft.com/free/) to create any resources within Azure.
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli), a CLI tool for creating and managing Azure resources.
- [Terraform](https://developer.hashicorp.com/terraform/downloads) for provisioning infrastructure as code.
- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) to interact with your AKS cluster.
- [jq](https://stedolan.github.io/jq/download/) to parse and manipulate JSON (e.g. Terraform outputs).
- **Azure service quotas**
  - Ensure you have at least **3 Public IP addresses** (one per Availability Zone in the region you choose).
  - Check your quotas for **Virtual Networks**, **vCPU cores**, and **Storage Accounts** in the target region: [Azure subscription and service limits](https://learn.microsoft.com/azure/azure-resource-manager/management/azure-subscription-service-limits).
  - If you hit a limit, request an increase via the Azure portal: [Request a quota increase](https://learn.microsoft.com/azure/azure-resource-manager/management/subscribe-quota-increase-request).
- This guide uses **GNU Bash** for all shell commands.

For the exact tool versions we’ve tested against, see the [.tool-versions](https://github.com/camunda/camunda-deployment-references/blob/main/.tool-versions) file in the repository.

For the tool versions used, check the [.tool-versions](https://github.com/camunda/camunda-deployment-references/blob/main/.tool-versions) file in the repository. It contains an up-to-date list of versions that we also use for testing.

### Considerations

This setup provides a basic foundation for getting started with Camunda 8 on Azure AKS, but it is not optimized for performance or resilience. It serves as a good starting point for building out a production-ready environment by incorporating [IaC tooling](https://developer.hashicorp.com/terraform/tutorials/azure-get-started/infrastructure-as-code).

To try out Camunda 8 or for development purposes, consider signing up for our [SaaS offering](https://camunda.com/platform/). If you already have an Azure AKS cluster, you can skip ahead to the [Helm guide](./aks-helm.md).

To keep this guide simple and focused, certain best practices are referenced via links to additional documentation, allowing you to explore each area in more detail when you're ready.

The following security considerations were relaxed to streamline adoption and development. These should be reassessed and hardened before deploying to production. The following items were identified using [Trivy](https://trivy.dev/) and can be looked up in the [Aqua vulnerability database](https://avd.aquasec.com/).

```
AVD-AZU-0047 #(CRITICAL): Security group rule allows unrestricted ingress from any IP address.
AVD-AZU-0041 #(CRITICAL): Cluster does not limit API access to specific IP addresses.
AVD-AZU-0013 #(CRITICAL): Vault network ACL does not block access by default.

AVD-AZU-0042 #(HIGH): RBAC is not enabled on cluster

AVD-AZU-0040 #(MEDIUM): Cluster does not have logging enabled via OMS Agent.
```

:::warning

Reference architectures are not intended to be consumed exactly as described. The examples provided in this guide are not packaged as a reusable Terraform module. It is recommended that you clone the repository and make any necessary modifications locally.

This approach allows you to extend and customize the codebase according to your specific needs. However, please note that maintaining the infrastructure is your responsibility. Camunda will continue to update and improve the reference architecture, and these updates may not be backward compatible. You may incorporate updates into your customized codebase as needed.

:::

:::danger Cost management

Following this guide will incur costs on your Azure account, including charges for Azure Kubernetes Service (AKS) node pools (virtual machine instances), Azure Managed Disks for persistent volumes, and Azure DNS zones for domain resolution. For more information, refer to the [Azure AKS pricing page](https://azure.microsoft.com/pricing/details/kubernetes-service/) and the [Azure pricing calculator](https://azure.microsoft.com/pricing/calculator/), as costs depend on region and configuration choices.

:::

### Outcome

<!-- Replace the diagram assets with AKS equivalents exported as image and PDF -->
<!-- To export: click on the frame > "Export Image" > as PDF and as JPG (low res), then save it in the ./assets/ folder -->

<!-- No OpenSearch equivalent is provisioned in this setup. -->
<!-- Azure Entra ID integration and managed identity support will be added later. -->

_Infrastructure diagram for a single-region AKS setup (click on the image to open the PDF version)_
[![Infrastructure Diagram AKS Single-Region](./assets/aks-single-region.jpg)](./assets/aks-single-region.pdf)

Following this tutorial will result in:

- An Azure Kubernetes Service (AKS) cluster with node pools provisioned and ready for Camunda 8 installation.
- The [Azure Disk CSI driver](https://learn.microsoft.com/azure/aks/csi-storage-drivers) is installed and configured, used by the Camunda 8 Helm chart to create [persistent volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).
- An [Azure Database for PostgreSQL - Flexible Server](https://learn.microsoft.com/azure/postgresql/flexible-server/overview) instance provisioned to be used by the Camunda platform.

## 1. Configure Azure and initialize Terraform

### Obtain a copy of the reference architecture

The first step is to download a copy of the reference architecture from the [GitHub repository](https://github.com/camunda/camunda-deployment-references/blob/main/azure/common/). This material will be used throughout the rest of this documentation. The reference architectures are versioned using the same Camunda versions (`stable/8.x`).

The provided reference architecture repository allows you to directly reuse and extend the existing Terraform example base. This sample implementation is flexible to extend to your own needs without the potential limitations of a Terraform module maintained by a third party.

```bash
curl -sSL https://raw.githubusercontent.com/camunda/camunda-deployment-references/main/azure/common/procedure/get-your-copy.sh | bash
```

With the reference architecture copied, you can proceed with the remaining steps outlined in this documentation. Ensure that you are in the correct directory before continuing with further instructions.

### Terraform prerequisites

To manage the infrastructure for Camunda 8 on Azure using Terraform, we need to set up Terraform's backend to store the state file remotely in an Azure Storage Account. This ensures secure and persistent storage of the state file.

:::note
Advanced users may want to handle this part differently and use a different backend. The backend setup provided is an example for new users.
:::

#### Set up Azure authentication

The [Azure Terraform provider](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs) is required to create resources in Azure. Before you can use the provider, you must authenticate it using your Azure credentials.

:::caution Ownership of the created resources

A user who creates resources in Azure will always retain administrative access to those resources, including any Kubernetes clusters created. It is recommended to create a dedicated Azure user or service principal for Terraform purposes, ensuring that the resources are managed and owned by that identity.

:::

You can further change the region and other preferences and explore different [authentication](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs#authenticating-via-the-azure-cli) methods:

- For development or testing purposes, you can use the [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli). If you have configured your Azure CLI, Terraform will automatically detect and use those credentials.
  To configure the Azure CLI:

  ```bash
  az login
  ```

  This command will open a browser window for interactive login, or use device code login in headless environments.

- For production environments, we recommend using a dedicated Azure AD user or service principal. You can create one and assign appropriate roles via the [Azure Portal](https://portal.azure.com/) or with the Azure CLI.

To create a new service principal and assign it the necessary permissions:

```bash
az ad sp create-for-rbac \
  --name "camunda-tf-sp" \
  --role Contributor \
  --scopes /subscriptions/<your-subscription-id>
```

This will return a JSON object with `appId`, `password`, and `tenant`. These values are required for login using the service principal:

```bash
az login --service-principal \
  -u <appId> \
  -p <password> \
  --tenant <tenant-id>
```

Use the `appId` as the value for `terraform_sp_app_id` in your `terraform.tfvars`.

:::warning

Microsoft Accounts (MSA) such as those ending in `@outlook.com` or `@gmail.com` cannot be granted Key Vault permissions because they lack an Entra ID object ID. In such cases, you must use a service principal to authenticate Terraform.

:::

#### Create an Azure Storage Account for Terraform state management

Before setting up Terraform, you need to create an Azure Storage Account and container to store the state file. This is important for collaboration and to prevent issues like state file corruption.

To start, set the required values as environment variables upfront to avoid repeating them in each command:

```bash
export AZURE_LOCATION=<your-region>                             # e.g. westeurope
export RESOURCE_GROUP_NAME="camunda-tf-rg"
export AZURE_STORAGE_ACCOUNT_NAME="camundatfstate$RANDOM"       # must be globally unique
export AZURE_STORAGE_CONTAINER_NAME="tfstate"
export AZURE_TF_KEY="camunda-terraform/terraform.tfstate"
```

Replace `<your-region>` with your chosen Azure region (for example, `westeurope`).

Now, follow these steps to create the storage account with versioning enabled:

1. Open your terminal and ensure the Azure CLI is installed and you're logged in.

2. Run the following script to create a storage account and container for storing your Terraform state. Make sure to use a globally unique name for the storage account:

   ```bash reference
   https://github.com/camunda/camunda-deployment-references/blob/main/azure/common/procedure/storage-account/storage-account-creation.sh
   ```

3. Enable blob versioning to track changes and protect the state file from accidental deletions or overwrites:

   ```bash reference
   https://github.com/camunda/camunda-deployment-references/blob/main/azure/common/procedure/storage-account/storage-account-versioning.sh
   ```

4. Verify versioning is enabled on the blob container:

   ```bash reference
   https://github.com/camunda/camunda-deployment-references/blob/main/azure/common/procedure/storage-account/storage-account-verify.sh
   ```

This Azure Storage Account will now securely store your Terraform state files with versioning enabled.

Great — here’s how you can clearly explain the purpose and impact of each variable in a `terraform.tfvars` file, along with guidance on how to find the values.

#### Creating terraform.tfvars

To configure your deployment, create a `terraform.tfvars` file in the root of the `aks-single-region` folder. This file defines critical environment-specific settings like your Azure subscription and the Service Principal used for authentication.

Example:

```hcl
subscription_id     = "00000000-0000-0000-0000-000000000000"
terraform_sp_app_id = "00000000-0000-0000-0000-000000000000"
```

##### subscription_id

This value specifies the Azure Subscription ID in which all infrastructure will be deployed, including the AKS cluster, PostgreSQL Flexible Server, and Key Vault. To retrieve your current subscription ID, you can run the following command:

```shell
az account show --query "id" -o tsv
```

It is essential to ensure this ID is correct, as Terraform will use it to determine where resources are provisioned. Providing an incorrect subscription ID can result in resources being created in the wrong environment or permission-related failures during deployment.

##### terraform_sp_app_id

This is the Application (client) ID of the Azure Service Principal that Terraform uses for authentication. It is required to configure access policies in services such as Key Vault, particularly when using customer-managed keys (CMK) with AKS.

If you created a Service Principal manually, you can retrieve its application ID with the following command:

```shell
az ad sp list --display-name "<your-service-principal-name>" --query "[0].appId" -o tsv
```

If you're already using a Service Principal to authenticate (for example, with `az login --service-principal`), this value corresponds to the `appId` you supplied during login.

This value is critical because Terraform uses it to assign the necessary permissions for interacting with encryption keys and other protected resources. If the ID is incorrect or omitted, key-related configurations may fail, and AKS will be unable to use CMK for securing cluster secrets.

#### Initialize Terraform

Once your authentication is set up, you can initialize your Terraform project. The previous steps configured a dedicated Azure Storage Account and container (`AZURE_STORAGE_ACCOUNT_NAME`, `AZURE_STORAGE_CONTAINER_NAME`) to store your state, and the following creates a backend key that will be used by your configuration.

Configure the backend and download the necessary provider plugins:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/azure/common/procedure/storage-account/storage-account-tf-init.sh
```

Terraform will connect to the Azure storage container to manage the state file, ensuring remote and persistent storage.

### AKS cluster module setup

This module establishes the foundational configuration for Azure access and Terraform.

We will utilize [Terraform modules](https://developer.hashicorp.com/terraform/language/modules), which allow us to abstract resources into reusable components, streamlining our infrastructure management and following Terraform best practices.

The reference architecture comes with an example module implementation of the [AKS cluster](https://github.com/camunda/camunda-deployment-references/blob/main/azure/modules/aks-cluster/) and offers a robust starting point for deploying an AKS cluster. It is highly recommended to review this module prior to implementation to understand its structure and capabilities.

The module will be locally sourced, meaning within your cloned repository you can make adjustments to the AKS module directly, and the changes will immediately apply to your setup.

#### Set up the AKS cluster module

1. The `cluster.tf` in your chosen reference contains a basic setup referencing a local Terraform module with the cluster configuration. The following shows said file, which you can adjust within your cloned setup to suit your needs.

```hcl reference
https://github.com/camunda/camunda-deployment-references/blob/main/azure/modules/aks/cluster.tf
```

2. Configure user access to the cluster. By default, the identity that creates the Azure AKS cluster has administrative access via role-based access control (RBAC).

<details>
  <summary>Grant cluster access to other users</summary>
  <p>

To grant other users access to the cluster, you can assign them Azure roles using Azure Active Directory (Entra ID) integration and Kubernetes RBAC.

This architecture does not currently enable Entra ID integration, but you can manage Kubernetes access through the `az role assignment` and `kubectl` tools:

1. Ensure the user has access to the Azure resource group or subscription, typically via the `Azure Kubernetes Service RBAC Cluster Admin` or `Contributor` role.

2. Then, apply Kubernetes RoleBindings or ClusterRoleBindings to control in-cluster permissions:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: reader-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: view
subjects:
  - kind: User
    name: "<user-object-id>"
    apiGroup: rbac.authorization.k8s.io
```

Replace `<user-object-id>` with the Azure AD object ID of the user.

For more detailed instructions, refer to the [AKS access control documentation](https://learn.microsoft.com/azure/aks/manage-azure-rbac).

  </p>
</details>

3. Customize the cluster setup. The module offers various input options that allow you to further customize the cluster configuration. For a comprehensive list of available options and detailed usage instructions, refer to the [AKS module documentation](https://github.com/camunda/camunda-deployment-references/blob/main/azure/modules/aks-cluster/README.md).

### PostgreSQL module setup

:::info Optional module

If you don't want to use this module, you can skip this section. However, you may need to adjust the remaining instructions to remove references to this module.

If you choose not to use this module, you must either provide a managed PostgreSQL service or use the internal deployment by the Camunda Helm chart in Kubernetes.

Additionally, you must delete the `db.tf` file within your chosen reference as it will otherwise create the resources.
:::

We separated the cluster and PostgreSQL modules to offer you more customization options.

#### Set up the Azure PostgreSQL module

1. The `db.tf` in your chosen reference contains a basic Azure Database for PostgreSQL setup referencing a local Terraform module. The following shows said file, which you can adjust within your cloned setup to suit your needs.

```hcl reference
https://github.com/camunda/camunda-deployment-references/blob/main/azure/modules/postgres-db/db.tf
```

2. Customize the PostgreSQL setup through various input options. Refer to the [Azure PostgreSQL module documentation](https://github.com/camunda/camunda-deployment-references/blob/main/azure/modules/postgresql/README.md) for more details on other customization options.

### Define outputs

**Terraform** allows you to define outputs, which make it easier to retrieve important values generated during execution, such as database endpoints and other necessary configurations for Helm setup.

Each module definition set up in the reference contains an output definition at the end of the file. You can adjust them to your needs.

Outputs allow you to easily reference values like the **PostgreSQL** endpoint and other configuration data needed in subsequent steps or scripts, streamlining your deployment process.

### Execution

:::note Secret management

We strongly recommend managing sensitive information such as the PostgreSQL username and password using a secure secrets management solution like HashiCorp Vault. For details on how to inject secrets directly into Terraform via Vault, see the [Terraform Vault Secrets Injection Guide](https://developer.hashicorp.com/terraform/tutorials/secrets/secrets-vault).

:::

1. Open a terminal in the chosen reference folder where `config.tf` and other `.tf` files are located.

2. Perform a final initialization for anything changed throughout the guide:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/azure/common/procedure/storage-account/storage-account-tf-init.sh#L7
```

3. Plan the configuration files:

```bash
terraform plan -out cluster.plan # describe what will be created
```

4. After reviewing the plan, you can confirm and apply the changes:

```bash
terraform apply cluster.plan     # apply the creation
```

Terraform will now create the Azure AKS cluster with all the necessary configurations. The completion of this process may require approximately 20–30 minutes for each component.

## 2. Preparation for Camunda 8 installation

### Access the created AKS cluster

You can gain access to the Azure AKS cluster using the `Azure CLI` with the following command:

```bash
az aks get-credentials --resource-group <your-resource-group> --name <your-cluster-name> --overwrite-existing
```

Replace `<your-resource-group>` and `<your-cluster-name>` with the actual values from your setup.

After updating the kubeconfig, you can verify your connection to the cluster with `kubectl`:

```bash
kubectl get nodes
```

Create a namespace for Camunda:

```bash
kubectl create namespace camunda
```

In the remainder of the guide, we reference the `camunda` namespace to create some required resources in the Kubernetes cluster, such as secrets or one-time setup jobs.

### Configure the database and associated access

As you now have a database, you need to create dedicated databases for each Camunda component and an associated user that has configured access. Follow these steps to create the database users and configure access.

You can access the created database in two ways:

1. **Bastion host:** Set up a bastion host within the same virtual network to securely access the database.
2. **Pod within the AKS cluster:** Deploy a pod in your AKS cluster equipped with the necessary tools to connect to the database.

The choice depends on your infrastructure setup and security preferences. In this guide, we'll use a pod within the AKS cluster to configure the database.

1. In your terminal, set the necessary environment variables that will be substituted in the setup manifest:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/azure/common/procedure/vars-create-db.sh
```

A **Kubernetes job** will connect to the database and create the necessary users with the required privileges. The script installs the necessary dependencies and runs SQL commands to create the users and assign them the correct roles and privileges.

2. Create a secret that references the environment variables:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/azure/common/procedure/create-setup-db-secret.sh
```

This command creates a secret named `setup-db-secret` and dynamically populates it with the values from your environment variables.

After running the above command, you can verify that the secret was created successfully by using:

```bash
kubectl get secret setup-db-secret -o yaml --namespace camunda
```

This should display the secret with the base64 encoded values.

3. Save the following manifest to a file, for example, `setup-postgres-create-db.yml`.

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/azure/common/manifests/setup-postgres-create-db.yml
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

## 2. Install Camunda 8 using the Helm chart

Now that you've exported the necessary values, you can proceed with installing Camunda 8 using Helm charts. Follow the guide [Camunda 8 on Kubernetes](./aks-helm.md) for detailed instructions on deploying the platform to your Kubernetes cluster.
