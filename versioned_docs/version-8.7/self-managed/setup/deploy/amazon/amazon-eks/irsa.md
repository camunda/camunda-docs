---
id: irsa
title: "Troubleshooting IAM Roles for Service Accounts (IRSA)"
description: "Learn how to configure IAM roles for service accounts (IRSA) within AWS to authenticate workloads."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## IRSA configuration validation of a Camunda 8 helm deployment

The [c8-sm-checks](/self-managed/operational-guides/troubleshooting/troubleshooting.md#anomaly-detection-scripts) utility is designed to validate IAM Roles for Service Accounts ([IRSA](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html)) configuration in EKS Kubernetes clusters on AWS. It ensures that key components in a Camunda 8 deployment, such as PostgreSQL and OpenSearch, are properly configured to securely interact with AWS resources via the appropriate IAM roles.

### IRSA check script

The `/checks/kube/aws-irsa.sh` script verifies IRSA setup in your AWS Kubernetes environment by performing two types of checks:

1. **Configuration Verification**: Ensures key IRSA configurations are correctly set, using specific checks on IAM roles, policies, and mappings to service accounts.
2. **Namespace Commands and Job Execution**: Runs commands within the specified namespace using Kubernetes jobs (if necessary) to verify network and access configurations.

This utility is non-intrusive and will not alter any deployment settings.
If the `-s` flag is provided, the script skips spawning debugging pods for network flow verification, which can be helpful if pod creation is restricted or not required for troubleshooting.

:::info Compatibility with Helm Deployments

The script relies on Helm chart values and is compatible only with deployments installed or updated through standard Helm commands. It will not work with other deployment methods, such as those using `helm template` (e.g., [ArgoCD](https://argo-cd.readthedocs.io/en/latest/faq/#after-deploying-my-helm-application-with-argo-cd-i-cannot-see-it-with-helm-ls-and-other-helm-commands)).

Compatibility is confirmed for [Camunda Helm chart releases version 11 and above](https://artifacthub.io/packages/helm/camunda/camunda-platform).

:::

#### Key features

- **Helm values retrieval**: Extracts deployment values using Helm to ensure all required configurations are set.
- **EKS and OIDC configuration check**: Confirms that EKS is configured with IAM and OIDC, matching the minimum required version for IRSA compatibility.
- **Service account role validation**: For each specified component, verifies that the service account exists and has the correct IAM role annotations.
- **Network access verification**: Ensures that PostgreSQL (Aurora) or OpenSearch instances are accessible from within the cluster. This step involves an `nmap` scan through a Kubernetes job. Use the `-s` option to skip this step if network flow verification is unnecessary.
- **IRSA value check**: Validates that the Helm deployment values are correctly configured to use IRSA for secure service interactions with AWS.
- **Aurora PostgreSQL and OpenSearch IAM configuration**: Confirms that these services support IAM login, ensuring secure access configurations.
- **Access and Trust Policy verification**: Checks that access and trust policies are correctly set. Note that the script performs basic checks; if issues arise with these policies, further manual verification may be needed.
- **Service Account Role association test**: Tests that the IAM role association with the service account is functioning as expected by spawning a job with the specified service account and validating the resulting ARN. This step can also be skipped using the `-s` option.
- **OpenSearch Access Policy check**: Validates that the OpenSearch access policy is configured correctly to support secure connections from the cluster.

#### Example usage

You can find the complete usage details in the [c8-sm-checks repository](https://github.com/camunda/c8-sm-checks). Below is a quick reference for common usage options:

```bash
Usage: ./checks/kube/aws-irsa.sh [-h] [-n NAMESPACE] [-e EXCLUDE_COMPONENTS] [-p] [-l] [-s]
Options:
  -h                              Display this help message
  -n NAMESPACE                    Specify the namespace to use (required)
  -e EXCLUDE_COMPONENTS           Comma-separated list of Components to exclude from the check (reference of the component is the root key used in the chart)
  -p                              Comma-separated list of Components to check IRSA for PostgreSQL (overrides default list: identityKeycloak,identity,webModeler)
  -l                              Comma-separated list of Components to check IRSA for OpenSearch (overrides default list: zeebe,operate,tasklist,optimize)
  -s                              Disable pod spawn for IRSA and connectivity verification.
                                  By default, the script spawns jobs in the specified namespace to perform
                                  IRSA checks and network connectivity tests. These jobs use the amazonlinux:latest
                                  image and scan with nmap to verify connectivity.
```

**Example Command:**

```bash
./checks/kube/aws-irsa.sh -n camunda-primary -p "identity,webModeler" -l "zeebe,operate"
```

In this example, the script will check **`identity`** and **`webModeler`** components (references of the component name in the helm chart) for Aurora PostgreSQL access and **`zeebe`** and **`operate`** components for OpenSearch access in the `camunda-primary` namespace.

#### Script output overview

The script offers detailed output to confirm that each component is properly configured for IRSA. Below is an outline of the checks it performs and the expected output format:

**Example Output:**

```
[OK] AWS CLI version 2.15.20 is compatible and user is logged in.
[OK] AWS environment detected. Proceeding with the script.
[INFO] Chart camunda-platform is deployed in namespace camunda-primary.
[INFO] Retrieved values for Helm deployment: camunda-platform-11.0.1.
[FAIL] The service account keycloak-sa does not have a valid eks.amazonaws.com/role-arn annotation. You must add it in the chart, see https://docs.camunda.io/docs/self-managed/setup/deploy/amazon/amazon-eks/eks-helm/
[FAIL] RoleArn name for component 'identityKeycloak' is empty. Skipping verification.
```

The script highlights errors with the `[FAIL]` prefix, and these are directed to `stderr` for easier filtering. We recommend capturing `stderr` output to quickly identify failed configurations.

If the script returns a false positive—indicating success when issues are actually present—manually review each output line to ensure reported configuration details (like Role ARNs or annotations) are accurate. For example, ensure that each service account has the correct Role ARN and associated permissions to avoid undetected issues.

### Advanced troubleshooting for IRSA configuration

The troubleshooting script provides essential checks but may not capture all potential issues, particularly those related to IAM policies and configurations. If IRSA is not functioning as expected and no errors are flagged by the script, follow the steps below for deeper troubleshooting.

#### Spawn a debug pod to simulate the pod environment

To troubleshoot in an environment identical to your pod, deploy a debug pod with the necessary service account. Here are examples of debug manifests you can customize for your needs:

- [OpenSearch client pod](https://github.com/camunda/camunda-tf-eks-module/blob/main/modules/fixtures/opensearch-client.yml)
- [PostgreSQL client pod](https://github.com/camunda/camunda-tf-eks-module/blob/main/modules/fixtures/postgres-client.yml)

1. Adapt the manifests to use the specific `serviceAccountName` (e.g., `aurora-access-sa`) you want to test.
2. Insert a sleep timer in the command to allow time to exec into the pod for live debugging.
3. Create the pod with the `kubectl apply` command:
   ```bash
   kubectl apply -f debug-client.yaml
   ```
4. Once the pod is running, connect to it with a bash shell (make sure to adjust the app label with your value):
   ```bash
   kubectl exec -it $(kubectl get pods -l app=REPLACE-WITH-LABEL -o jsonpath='{.items[0].metadata.name}') -- /bin/bash
   ```
5. Inside the pod, display all environment variables to check for IAM and AWS configurations:
   ```bash
   env
   ```
   This command will print out all environment variables, including those related to IRSA.
   Inside the pod, validate that key environment variables are correctly injected:
   - `AWS_WEB_IDENTITY_TOKEN_FILE`: Path to the token (JWT) file for WebIdentity.
   - `AWS_ROLE_ARN`: ARN of the associated IAM role.
   - `AWS_REGION`, `AWS_STS_REGIONAL_ENDPOINTS`, and other AWS configuration variables.

To ensure that IRSA and role associations are functioning:

- Check that the expected `AWS_ROLE_ARN` and token are present.
- Decode the JWT token to validate the correct trust relationship with the service account and namespace.

#### Verify OpenSearch fine-grained access control (fgac) configuration

For OpenSearch clusters, ensure [fine-grained access control](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/fgac.html) is set up to allow the role’s access to the cluster. If you deployed OpenSearch with the [terraform reference architecture implementation for EKS](terraform-setup.md), fgac should already be configured. For manual deployments, follow the process outlined in the [OpenSearch configuration guide](terraform-setup.md#configure-opensearch-fine-grained-access-control) to apply similar controls.

#### Confirm PostgreSQL IAM role access

Verify that PostgreSQL roles are correctly configured to support IAM-based authentication. The database user should have the `rds_iam` role to allow IAM authentication. If the setup was automated with the [terraform reference architecture implementation for EKS](terraform-setup.md), the necessary access configuration should already be in place. For manual configurations, refer to [PostgreSQL configuration instructions](terraform-setup.md#configure-the-database-and-associated-access).

To test connectivity:

- Run a manual connection test using the [PostgreSQL client manifest](https://raw.githubusercontent.com/camunda/camunda-tf-eks-module/refs/heads/main/modules/fixtures/postgres-client.yml).
- Use `psql` within the pod to verify the correct roles are assigned. Run:
  ```bash
  SELECT * FROM pg_roles WHERE rolname='<your-username>';
  ```
  Confirm that `rds_iam` is listed among the assigned roles.

#### Validate IAM Policies for each role

Both trust and permission policies are crucial in configuring IAM Roles for Service Accounts (IRSA) in AWS. Each IAM role should have policies that precisely permit necessary actions and correctly trust the relevant Kubernetes service accounts associated with your components.

##### AssumeRole policies

In AWS, [AssumeRole](https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html) allows a user or service to assume a role and temporarily gain permissions to execute specific actions. Each role needs an **AssumeRole policy** that precisely matches AWS requirements for the specific services and actions your components perform.

For each IAM role, ensure the **trust policy** includes:

1. The correct `Service` field, allowing the pod’s service account to assume the role.
2. An `Action` for `sts:AssumeRoleWithWebIdentity`, as IRSA uses WebIdentity to enable IAM role assumption.

Verify that the policy is configured according to [AWS’s role trust policy guidelines](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_principal.html) for Kubernetes IRSA.

##### Trust policies

For each role, verify that the [trust policy syntax is correct](https://aws.amazon.com/fr/blogs/security/how-to-use-trust-policies-with-iam-roles/), allowing the appropriate service accounts to assume the role. Refer to AWS’s [trust policy validation tool](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_policy-validator.html) for [accurate syntax and configuration](https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-reference-policy-checks.html).

##### Permission policies

Each IAM role should also have appropriate permission policies attached. These policies define what actions the role can perform on AWS resources. Verify that permission policies:

- Are configured correctly to allow the necessary operations for your resources (e.g., read and write access to S3 buckets or access to RDS).
- Align with your security model by only granting the minimum required permissions.

The AWS’s [policy simulator](https://policysim.aws.amazon.com/) is a valuable tool for testing how permissions are applied and for spotting misconfigurations.

#### If issues persist

If issues remain unresolved, compare your configuration with Camunda’s [reference architecture](terraform-setup.md) deployed with Terraform. This setup has been validated to work with IRSA and contains the correct permissions. By comparing it to your setup, you may identify discrepancies that are causing your issues.

## Instance Metadata Service (IMDS)

[Instance Metadata Service](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html) is a default fallback for the AWS SDK due to the [default credentials provider chain](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials-chain.html). Within the context of Amazon EKS, it means a pod will automatically assume the role of a node. This can hide many problems, including whether IRSA was set up correctly or not, since it will fall back to IMDS in case of failure and hide the actual error.

Thus, if nothing within your cluster relies on the implicit node role, we recommend disabling it by defining in Terraform the `http_put_response_hop_limit`, for example.

Using a Terraform module like the [Amazon EKS module](https://registry.terraform.io/modules/terraform-aws-modules/eks/aws/latest), one can define the following to decrease the default value of two to one, which results in pods not being allowed to assume the role of the node anymore.

```json
eks_managed_node_group_defaults {
    metadata_options = {
        http_put_response_hop_limit = 1
    }
}
```

Overall, this will disable the role assumption of the node for the Kubernetes pod. Depending on the resulting error within Operate, Zeebe, and Web-Modeler, you'll get a clearer error, which is helpful to debug the error more easily.

:::note Enabled by default in the terraform reference architecture of EKS

In the [reference architecture with terraform](terraform-setup.md), this setting is configured like that by default.

:::
