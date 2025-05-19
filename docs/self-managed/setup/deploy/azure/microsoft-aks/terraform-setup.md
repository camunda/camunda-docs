---
id: aks-terraform
title: "Deploy an AKS cluster with Terraform (advanced)"
description: "Deploy an Azure Kubernetes Service (AKS) cluster with a Terraform module for a quick Camunda 8 setup."
---

This guide provides a detailed tutorial for deploying an Azure Kubernetes Service (AKS) cluster, tailored specifically for deploying Camunda 8 using Terraform, a popular Infrastructure as Code (IaC) tool.

This guide is designed to help you leverage the power of Infrastructure as Code (IaC) to streamline and reproduce your cloud infrastructure setup. By walking through the essentials of setting up an AKS cluster, and provisioning managed Azure resources such as Azure Database for PostgreSQL, this guide demonstrates how to use Terraform with Azure. It makes the process accessible even to those new to Terraform or IaC concepts. It utilizes Azure-managed services where available, offering these as optional components for added convenience and maintainability.

:::tip

If you are completely new to Terraform and the concept of IaC, consider reading the [Terraform IaC documentation](https://developer.hashicorp.com/terraform/tutorials/azure-get-started/infrastructure-as-code) and trying the [interactive quick start](https://developer.hashicorp.com/terraform/tutorials/azure-get-started/infrastructure-as-code#quick-start) for a basic understanding.

:::

## Requirements

- An [Azure subscription](https://azure.microsoft.com/free/) and the necessary permissions to create any resource within Azure.
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli), a CLI tool for creating and managing Azure resources.
- [Terraform](https://developer.hashicorp.com/terraform/downloads) for provisioning infrastructure as code.
- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) to interact with your AKS cluster.
- [jq](https://stedolan.github.io/jq/download/) to parse and manipulate JSON (e.g. Terraform outputs).
- **Azure service quotas**
  - Check your quotas for **Virtual Networks**, **vCPU cores**, and **Storage Accounts** in the target region: [Azure subscription and service limits](https://learn.microsoft.com/azure/azure-resource-manager/management/azure-subscription-service-limits).
  - If you reach a limit, you can request an increase through the Azure portal: [Request a quota increase](https://learn.microsoft.com/en-us/azure/extended-zones/request-quota-increase).
  - This guide uses **GNU Bash** for all shell commands.

For the exact tool versions we’ve tested against, see the [.tool-versions](https://github.com/camunda/camunda-deployment-references/blob/main/.tool-versions) file in the repository.

### Considerations

This setup provides a basic foundation for getting started with Camunda 8 on AKS, but it is not fully optimized for performance. It serves as a good starting point for building out a production-ready environment by incorporating [IaC tooling](https://developer.hashicorp.com/terraform/tutorials/azure-get-started/infrastructure-as-code).

To try out Camunda 8 or for development purposes, consider signing up for our [SaaS offering](https://camunda.com/platform/). If you already have an AKS cluster, you can skip ahead to the [Helm guide](./aks-helm.md).

To keep this guide simple and focused, certain best practices are referenced via links to additional documentation, allowing you to explore each area in more detail when you're ready.

:::warning

Reference architectures are not intended to be consumed exactly as described. The examples provided in this guide are not packaged as a reusable Terraform module. It is recommended that you clone the repository and make any necessary modifications locally.

This approach allows you to extend and customize the codebase according to your specific needs. However, please note that maintaining the infrastructure is your responsibility. Camunda will continue to update and improve the reference architecture, and these updates may not be backward compatible. You may incorporate updates into your customized codebase as needed.

:::

:::danger Cost management

Following this guide will incur costs on your Azure account, including charges for Azure Kubernetes Service (AKS), the compute (virtual machine instances) for the underlying nodes, Azure Managed Disks for persistent volumes, and Azure DNS zones for domain resolution. For more information, refer to the [AKS pricing page](https://azure.microsoft.com/pricing/details/kubernetes-service/) and the [Azure pricing calculator](https://azure.microsoft.com/pricing/calculator/), as costs depend on region and configuration choices.

:::

#### Security

The following security considerations were relaxed to streamline adoption and development. These should be reassessed and hardened before deploying to production. The following items were identified using [Trivy](https://trivy.dev/) and can be looked up in the [Aqua vulnerability database](https://avd.aquasec.com/).

These concessions are intentional in this reference infrastructure to simplify onboarding, allow internal-only access, and minimize friction during evaluation. They are not appropriate for production and must be revisited.

This section explains common security findings in Azure deployments and provides guidance on how to address them.

<details>
<summary><strong>AVD-AZU-0047 (CRITICAL): Security group rule allows unrestricted ingress from any IP address</strong></summary>

#### Reasoning

This rule permits inbound traffic from `0.0.0.0/0`, meaning any external source can reach the AKS subnet. It may expose workloads or future public IPs to unsolicited access, increasing the risk of compromise—especially if internal services are misconfigured.

#### Potential Resolution

1. Restrict incoming traffic to specific IP addresses or CIDR ranges that need access
2. For management access, limit SSH/RDP to your company's IP ranges
3. Use just-in-time access for administrative purposes
4. Implement a bastion host/jump box for secure access
5. Consider using [Azure Private Link](https://learn.microsoft.com/en-us/azure/private-link/private-link-overview) for private connectivity.

> **Note:** This doesn't affect the AKS control plane directly, but still weakens the overall network boundary.

</details>

<details>
<summary><strong>AVD-AZU-0041 (CRITICAL): Cluster does not limit API access to specific IP addresses</strong></summary>

#### Reasoning

This finding shows that your Kubernetes cluster's API server is accessible from any IP address. The API server is the control plane for Kubernetes and unrestricted access increases the risk of unauthorized access and potential attacks.

#### Potential Resolution

1. Configure `authorized_ip_ranges` in `api_server_access_profile` to restrict API server access. ([docs](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/kubernetes_cluster#api_server_access_profile))
2. Enable private cluster mode with `private_cluster_enabled = true`. ([docs](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/kubernetes_cluster#private_cluster_enabled))
3. Create an `azurerm_private_endpoint` for the AKS Private Link service. ([docs](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/private_endpoint))
4. Enable Azure AD–based RBAC via `role_based_access_control { azure_active_directory { ... } }`. ([docs](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/kubernetes_cluster#role_based_access_control))
5. Use `azurerm_network_security_group` and `azurerm_network_security_rule` to restrict access to the control-plane subnet. ([NSG](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/network_security_group), [rule](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/network_security_rule))

> **Note:** While open API access simplifies testing and development, production clusters should always restrict API server access to known IP ranges.

</details>

<details>
<summary><strong>AVD-AZU-0013 (CRITICAL): Vault network ACL does not block access by default</strong></summary>

#### Reasoning

This finding indicates that your Azure Key Vault network access controls are not configured to deny access by default. This means that unless specifically restricted, traffic can reach your Key Vault from any source.

#### Potential Resolution

1. Enable the ["Deny" default action](https://learn.microsoft.com/en-us/azure/key-vault/general/how-to-azure-key-vault-network-security) for network ACLs
2. Allow [specific IP ranges or virtual networks](https://learn.microsoft.com/en-us/azure/key-vault/general/how-to-azure-key-vault-network-security)
3. Use a [Private Endpoint](https://learn.microsoft.com/en-us/azure/key-vault/general/private-link-service) for Key Vault access
4. Use [service endpoints](https://learn.microsoft.com/en-us/azure/key-vault/general/overview-vnet-service-endpoints) to limit Azure service access
5. Enable [Soft Delete](https://learn.microsoft.com/en-us/azure/key-vault/general/soft-delete-overview) and [Purge Protection](https://learn.microsoft.com/en-us/azure/key-vault/general/soft-delete-overview) for recovery and data safety

> **Note:** Default deny configurations provide better security posture but may complicate initial setup and testing. For automated testing environments, clearly document these exceptions.

</details>

<details>
<summary><strong>AVD-AZU-0042 (HIGH): RBAC is not enabled on cluster</strong></summary>

#### Reasoning

This finding indicates that Role-Based Access Control (RBAC) is not enabled on your Kubernetes cluster. Without RBAC, you cannot properly control who has what permissions in your cluster, potentially leading to privilege escalation or unauthorized access.

#### Potential Resolution

1. Enable [RBAC](https://learn.microsoft.com/en-us/azure/aks/manage-azure-rbac) when creating new clusters (this is now the default in AKS)
2. For existing clusters, [upgrade to a version](https://learn.microsoft.com/en-us/azure/aks/upgrade-cluster) that supports RBAC
3. Implement [Azure AD integration with RBAC](https://learn.microsoft.com/en-us/azure/aks/managed-aad)
4. [Create and assign roles](https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-portal) to users and service principals
5. Follow the [principle of least privilege](https://learn.microsoft.com/en-us/security/zero-trust/deploy-least-privilege) when assigning permissions

> **Note:** While disabling RBAC simplifies testing by reducing permission barriers, this significantly reduces security and should never be done in production. For testing purposes, consider using dedicated test users with appropriate RBAC roles instead.

</details>

<details>
<summary><strong>AVD-AZU-0040 (MEDIUM): Cluster does not have logging enabled via OMS Agent</strong></summary>

#### Reasoning

This finding indicates that comprehensive logging is not enabled on your Kubernetes cluster using the OMS (Operations Management Suite) Agent. Without proper logging, you have limited visibility into cluster operations, making it difficult to detect and respond to security incidents.

#### Potential Resolution

1. Enable [Azure Monitor for containers](https://learn.microsoft.com/en-us/azure/azure-monitor/containers/container-insights-overview) on your AKS cluster
2. Configure the [OMS Agent](https://learn.microsoft.com/en-us/azure/azure-monitor/containers/container-insights-onboard#enable-using-azure-resource-manager-template-or-terraforms) to collect container logs and metrics
3. Set up a [Log Analytics workspace](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-analytics-workspace-overview) for centralized log storage
4. Create [custom queries and alerts](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-analytics-tutorial) based on collected logs
5. Consider implementing [Microsoft Defender for Cloud](https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-containers-introduction) (formerly Azure Security Center) for enhanced monitoring and threat detection

> **Note:** While disabling logging simplifies testing environments and reduces costs, production environments should always have comprehensive logging enabled. For testing purposes, consider using a shared Log Analytics workspace with appropriate retention policies.

</details>

### Outcome

_Infrastructure diagram for a single-region AKS setup (click on the image to open the PDF version)_
[![Infrastructure Diagram AKS Single-Region](./assets/aks-single-region.jpg)](./assets/aks-single-region.pdf)

:::caution

The vnet and the subnets are sized according to standard Azure recommendations by default.
Due to Azure CNI, every pod will get assigned a real internal IP. While the defaults are more than sufficient for this guide, if you expect a large number of pods in a single subnet, consider using a larger subnet for AKS like /23 or /22.

:::

## 1. Configure Azure and initialize Terraform

### Obtain a copy of the reference architecture

The first step is to download a copy of the reference architecture of the [GitHub repository](https://github.com/camunda/camunda-deployment-references/blob/main/azure/kubernetes/aks-single-region/). This material will be used throughout the rest of this documentation. The reference architectures are versioned using the same Camunda versions (`stable/8.x`).

The provided reference architecture repository allows you to directly reuse and extend the existing Terraform example base. This sample implementation is flexible to extend to your own needs without the potential limitations of a Terraform module maintained by a third party.

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/azure/kubernetes/aks-single-region/procedure/get-your-copy.sh
```

With the reference architecture copied, you can proceed with the remaining steps outlined in this documentation. Ensure that you are in the correct directory before continuing with further instructions.

### Terraform prerequisites

To manage the infrastructure for Camunda 8 on Azure using Terraform, we need to set up Terraform's backend to store the state file remotely in an Azure Storage Account. This ensures secure and persistent storage of the state file.

:::note
Advanced users may want to handle this part differently and use a different backend. The backend setup provided is an example for new users.
:::

#### Set up Azure authentication

The [Azure Terraform provider](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs) is required to create resources in Azure. Before you can use the provider, you must authenticate it using your Azure credentials.

:::tip

Terraform should run under a dedicated service principal or managed identity with only the minimum RBAC roles it needs; access to Azure resources—including AKS cluster-admin credentials—is governed entirely by those RBAC assignments, not by who originally created the resources.

:::

You can further change the region and other preferences and explore different [authentication methods](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/guides/azure_cli):

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

Note that the `appId` will be needed as a value for `terraform_sp_app_id` in `terraform.tfvars` [in a later step.](#creating-terraformtfvars).

:::warning

Microsoft Accounts (MSA) such as those ending in `@outlook.com` or `@gmail.com` cannot be granted Key Vault permissions because they lack an Entra ID object ID. In such cases, you must use a service principal to authenticate Terraform.

:::

#### Create an Azure Storage Account for Terraform state management

Before setting up Terraform, you should create an Azure Storage Account and container to store the state file. This is important for collaboration and to prevent issues like state file corruption. This should be in a separate resource group from the main infrastructure.

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

2. Run the following script to create a storage account and container for storing your Terraform state. Make sure that you have chosen a globally unique name for the storage account before:

   ```bash reference
   https://github.com/camunda/camunda-deployment-references/blob/azure-docs-adjustments/azure/common/procedure/storage-account/storage-account-creation.sh
   ```

3. Enable blob versioning to track changes and protect the state file from accidental deletions or overwrites:

   ```bash reference
   https://github.com/camunda/camunda-deployment-references/blob/azure-docs-adjustments/azure/common/procedure/storage-account/storage-account-versioning.sh
   ```

4. Verify versioning is enabled on the blob container:

   ```bash reference
   https://github.com/camunda/camunda-deployment-references/blob/azure-docs-adjustments/azure/common/procedure/storage-account/storage-account-verify.sh
   ```

This Azure Storage Account will now securely store your Terraform state files with versioning enabled.

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

It is essential to ensure this ID is correct, as Terraform will use it to determine where resources are provisioned.

##### terraform_sp_app_id

This is the Application (client) ID of the Azure Service Principal that Terraform uses for authentication. It **is required** to configure access policies in services such as Key Vault, particularly when using customer-managed keys (CMK) with AKS.

If you created a Service Principal manually, you can retrieve its application ID with the following command:

```shell
az ad sp list --display-name "<your-service-principal-name>" --query "[0].appId" -o tsv
```

If you're already using a Service Principal to authenticate (for example, with `az login --service-principal`), this value corresponds to the `appId` you supplied during login.

When using a user account, you'll need the user's object ID rather than an application ID. You can retrieve this with:

```shell
az ad user show --id user@example.com --query id -o tsv
```

The key considerations when using a user account instead of a Service Principal are:

The user must have sufficient permissions in Azure to perform the Terraform operations
Authentication will be tied to the user's credentials rather than service principal credentials
For automation scenarios, a Service Principal is still recommended as it doesn't rely on personal credentials

This value is critical because Terraform uses it to assign the necessary permissions for interacting with encryption keys and other protected resources. If the ID is incorrect or omitted, key-related configurations may fail, and AKS will be unable to use CMK for securing cluster secrets.

#### Initialize Terraform

Once your authentication is set up, you can initialize your Terraform project. The [previous steps](#create-an-azure-storage-account-for-terraform-state-management) configured a dedicated Azure Storage Account and container (`AZURE_STORAGE_ACCOUNT_NAME`, `AZURE_STORAGE_CONTAINER_NAME`) to store your state...

Configure the backend and download the necessary provider plugins:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/azure-docs-adjustments/azure/common/procedure/storage-account/storage-account-tf-init.sh
```

Terraform will connect to the Azure storage container to manage the state file, ensuring remote and persistent storage.

### Terraform setup

This reference architecture uses [Terraform modules](https://developer.hashicorp.com/terraform/language/modules) to deploy all required Azure infrastructure for running Camunda 8 in a production-grade AKS environment. It includes:

- A Virtual Network (VNet) and three subnets (AKS, database, private endpoint)
- Network Security Group (NSG) for AKS
- Azure Kubernetes Service (AKS) cluster with system and user node pools across 3 AZs
- Azure PostgreSQL Flexible Server with high availability and private endpoint
- Azure Key Vault with encryption key and a user-assigned managed identity for AKS secrets (KMS)

#### 1. Main configuration

The main deployment logic is defined in [`main.tf`](https://github.com/camunda/camunda-deployment-references/blob/main/azure/kubernetes/aks-single-region/main.tf). It instantiates all modules and exposes several **customizable values** via the `locals` block:

```hcl reference
https://github.com/camunda/camunda-deployment-references/blob/main/azure/kubernetes/aks-single-region/main.tf
```

The modules deployed are:

- `network`: Virtual network, AKS subnet, DB subnet, and private endpoint subnet
- `kms`: Key Vault, encryption key, and UAMI for AKS secret encryption
- `aks`: Cluster deployment with system and user node pools across AZs
- `postgres_db`: High-availability PostgreSQL Flexible Server, private DNS, and endpoint

#### 2. PostgreSQL module

This module exposes several **customizable values** via the `locals` block:

```hcl reference
https://github.com/camunda/camunda-deployment-references/blob/main/azure/kubernetes/aks-single-region/db.tf#L1-L18
```

These values control database user setup, naming, and passwords. Sensitive values are used by downstream provisioning jobs and Helm secrets.

This module is **enabled by default**. To opt out, you must:

- Remove the `db.tf` file from the root
- Manually provide credentials and PostgreSQL endpoints for the Helm chart

### Execution

:::note Secret management

We strongly recommend managing sensitive information such as the PostgreSQL username and password using a secure secrets management solution like HashiCorp Vault. For details on how to inject secrets directly into Terraform via Vault, see the [Terraform Vault Secrets Injection Guide](https://developer.hashicorp.com/terraform/tutorials/secrets/secrets-vault).

:::

1. Open a terminal in the chosen reference folder where `config.tf` and other `.tf` files are located.

2. Perform a final initialization for anything changed throughout the guide:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/azure-docs-adjustments/azure/common/procedure/storage-account/storage-account-tf-init.sh#L11-L15
```

3. Plan the configuration files:

```bash
terraform plan -out cluster.plan # describe what will be created
```

4. After reviewing the plan, you can confirm and apply the changes:

```bash
terraform apply cluster.plan     # apply the creation
```

Terraform will now create the AKS cluster with all the necessary configurations. The completion of this process may require approximately 20–30 minutes.

## 2. Preparation for Camunda 8 installation

### Access the created AKS cluster

You can gain access to the AKS cluster using the `Azure CLI` with the following command:

```bash
# Extract values from terraform output
RESOURCE_GROUP=$(terraform output -raw resource_group_name)
CLUSTER_NAME=$(terraform output -raw aks_cluster_name)

# Get credentials using Azure CLI
az aks get-credentials \
  --resource-group "$RESOURCE_GROUP" \
  --name "$CLUSTER_NAME" \
  --overwrite-existing
```

Replace `<your-resource-group>` and `<your-cluster-name>` with the actual values you have input in the root main.tf. `<your-cluster-name>` will be `<your-resource-prefix>-aks`.

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

Due to the tight NSG rules in this example, the only way to access the database is through the AKS cluster.

1. In your terminal, set the necessary environment variables that will be substituted in the setup manifest:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/azure/kubernetes/aks-single-region/procedure/vars-create-db.sh
```

A **Kubernetes job** will connect to the database and create the necessary users with the required privileges. The script installs the necessary dependencies and runs SQL commands to create the users and assign them the correct roles and privileges.

2. Create a secret that references the environment variables:

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/azure/kubernetes/aks-single-region/procedure/create-setup-db-secret.sh
```

This command creates a secret named `setup-db-secret` and dynamically populates it with the values from your environment variables.

After running the above command, you can verify that the secret was created successfully by using:

```bash
kubectl get secret setup-db-secret -o yaml --namespace camunda
```

This should display the secret with the base64 encoded values.

3. Save the following manifest to a file, for example, `setup-postgres-create-db.yml`.

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/azure/kubernetes/aks-single-region/manifests/setup-postgres-create-db.yml
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

### Configure a high-performance StorageClass

Camunda 8 requires high IOPS for performance-critical components like **Zeebe**, so it is important to use Azure **PremiumV2** disks rather than the default `Standard_LRS`.

This step defines a custom `StorageClass` that:

- Uses **PremiumV2_LRS** Azure Managed Disks
- Sets a **`Retain`** reclaim policy
- Uses `WaitForFirstConsumer` volume binding
- Becomes the default StorageClass for the cluster

#### Apply the StorageClass

Save the following as `storage-class.yml`:

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/azure/kubernetes/aks-single-region/manifests/storage-class.yml
```

Apply it using:

```bash
kubectl apply -f storage-class.yml
```

Then remove the default attribute from the original StorageClass:

```bash
kubectl patch storageclass managed-csi \
  -p '{"metadata":{"annotations":{"storageclass.kubernetes.io/is-default-class":"false"}}}'
```

This must be applied **before installing the Camunda Helm chart** so that PersistentVolumeClaims (PVCs) are provisioned with the correct performance characteristics.

## 2. Install Camunda 8 using the Helm chart

Now that you've exported the necessary values, you can proceed with installing Camunda 8 using Helm charts. Follow the guide [Camunda 8 on Kubernetes](./aks-helm.md) for detailed instructions on deploying the platform to your Kubernetes cluster.
