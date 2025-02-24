---
id: eks-eksctl
title: "Deploy an EKS cluster with eksctl (quickstart)"
description: "Deploy an Amazon Kubernetes cluster (EKS) with eksctl with step-by-step guidance."
---

This guide explores the streamlined process of deploying Camunda 8 Self-Managed on Amazon Elastic Kubernetes Service (EKS) using the `eksctl` command-line tool.

[Eksctl](https://eksctl.io/) is a common CLI tool for quickly creating and managing your Amazon EKS clusters and is [officially endorsed](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html) by Amazon.

While this guide is suitable for testing purposes, building a robust, scalable, and reproducible infrastructure is better achieved using Infrastructure as Code (IaC) tools like those described in the [Terraform guide](./terraform-setup.md), which offers more flexibility and control over your cloud environment.

This guide provides a user-friendly approach for setting up and managing Amazon EKS clusters. It covers everything from the prerequisites, such as AWS IAM role configuration, to creating a fully functional Amazon EKS cluster and a managed Aurora PostgreSQL instance. Ideal for those seeking a practical and efficient method to deploy Camunda 8 on AWS, this guide provides detailed instructions for setting up the necessary environment and AWS IAM configurations.

## Prerequisites

- An [AWS account](https://docs.aws.amazon.com/accounts/latest/reference/accounts-welcome.html) is required to create resources within AWS.
- [kubectl (1.30+)](https://kubernetes.io/docs/tasks/tools/#kubectl), a CLI tool to interact with the cluster.
- [AWS CLI (2.17+)](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html), a CLI tool for creating AWS resources.
- [eksctl (0.193+)](https://eksctl.io/getting-started/), a CLI tool for creating and managing Amazon EKS clusters.
- This guide uses GNU/Bash for all the shell commands listed.

### Considerations

This is a basic setup to get started with Camunda 8 but does not reflect a high performance setup. For a better starting point towards production, we recommend utilizing [Infrastructure as Code tooling](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/infrastructure-as-code) and following our [Terraform guide](./terraform-setup.md).

We refer to this architecture as the **standard installation**, which can be set up with or without a **domain** ([Ingress](https://docs.aws.amazon.com/eks/latest/userguide/alb-ingress.html)).
The standard installation utilizes a username and password connection for the Camunda components (or simply relies on network isolation for certain components). This option is straightforward and easier to implement, making it ideal for environments where simplicity and rapid deployment are priorities, or where network isolation provides sufficient security.

To try out Camunda 8 or develop against it, consider signing up for our [SaaS offering](https://camunda.com/platform/), or if you already have an Amazon EKS cluster, consider skipping to the [Helm guide](./eks-helm.md).

While the guide is primarily tailored for UNIX systems, it can also be run under Windows by utilizing the [Windows Subsystem for Linux](https://learn.microsoft.com/windows/wsl/about).

:::danger Cost management

Following this guide will incur costs on your Cloud provider account, namely for the managed Kubernetes service, running Kubernetes nodes in EC2, Elastic Block Storage (EBS), and Route53. More information can be found on [AWS](https://aws.amazon.com/eks/pricing/) and their [pricing calculator](https://calculator.aws/#/) as the total cost varies per region.

:::

### Outcome

<!-- TODO : add architecture diagram (https://github.com/camunda/team-infrastructure-experience/issues/409) --->

This guide results in the following:

- An Amazon EKS Kubernetes cluster running the latest Kubernetes version with four nodes ready for Camunda 8 installation.
- Installed and configured [EBS CSI driver](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html), which is used by the Camunda 8 Helm chart to create [persistent volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).
- A [managed Aurora PostgreSQL 15.x](https://aws.amazon.com/rds/aurora/) instance that will be used by the Camunda 8 components.
- A [managed OpenSearch domain](https://aws.amazon.com/opensearch-service/) created and configured for use with the Camunda platform..
- [IAM Roles for Service Accounts](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) (IRSA) configured and [Pod Identities](https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html).
  - This simplifies the setup by not relying on explicit credentials, but instead allows creating a mapping between IAM roles and Kubernetes service accounts based on a trust relationship. A [blog post](https://aws.amazon.com/blogs/containers/diving-into-iam-roles-for-service-accounts/) by AWS visualizes this on a technical level.
  - This allows a Kubernetes service account to temporarily impersonate an AWS IAM role to interact with AWS services like S3, RDS, or Route53 without supplying explicit credentials.
- [AWS Quotas](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html)
  - Ensure at least **3 Elastic IPs** (one per availability zone).
  - Verify quotas for **VPCs, EC2 instances, and storage**.
  - Request increases if needed via the AWS console ([guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-resource-limits.html)), costs are only for resources used.

This basic cluster setup is required to continue with the Helm set up as described in our [AWS Helm guide](./eks-helm.md).

## 1. Configure AWS and eksctl

### Set up AWS authentication

Use the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) to run the following commands:

```bash
# set your region
export AWS_REGION="eu-central-1"

aws configure
```

Enter your `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, and output format. These can be retrieved from the [AWS Console](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).

:::caution Ownership of the created resources

A user who creates resources in AWS will always retain administrative access to those resources, including any Kubernetes clusters. It is recommended to create a dedicated [AWS IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) to ensure that the resources are managed and owned by that specific user.
This ensures that the user maintains admin access to Kubernetes and associated resources unless those resources are explicitly deleted.

[Create access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) for the new IAM user via the console and export them as `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` variables to use with the AWS CLI and `eksctl`.

:::

### Set up eksctl

[eksctl](https://eksctl.io/) is a tool that allows the creation of clusters via a single command, but does not support all configuration options. This setup supplies a YAML file that can be used with the CLI to create the cluster preconfigured with various settings.

Review the [installation guide](https://eksctl.io/installation/) for additional details.

### Configure your infrastructure

In this guide, we will set up multiple environment variables to configure the components.
Each component starts with a section that configures the different variables according to your needs.

## 2. EKS cluster

### Configuration

```shell
##### Kubernetes parameters

# The name used for the Kubernetes cluster
export CLUSTER_NAME=camunda-cluster
# Your standard region that you host AWS resources in
export REGION="$AWS_REGION"
# Multi-region zones, derived from the region
export ZONES="${REGION}a ${REGION}b ${REGION}c"
# The AWS Account ID
export AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
# CIDR range used for the VPC subnets
export CIDR=10.192.0.0/16

# Optional
# Default node type for the Kubernetes cluster
export NODE_TYPE=m6i.xlarge
# Initial node count to create the cluster with
export NODE_COUNT=4
```

### Kubernetes secret encryption

The following enables [envelope encryption](https://aws.amazon.com/about-aws/whats-new/2020/03/amazon-eks-adds-envelope-encryption-for-secrets-with-aws-kms/) to add another layer of protection to your Kubernetes secrets.

We recommend enabling KMS encryption as a first step in creating the cluster. Enabling this configuration afterward can take up to 45 minutes. The KMS key is required in the [eksctl cluster YAML](#eksctl-cluster-yaml).

Create AWS KMS Key via the aws-cli. For additional settings, visit the [documentation](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/kms/create-key.html).

```shell
export KMS_ARN=$(aws kms create-key \
  --description "Kubernetes Encryption Key" \
  --query "KeyMetadata.Arn" \
  --output text)
```

The variable `KMS_ARN` contains the required output. It should look something like this: `arn:aws:kms:eu-central-1:1234567890:key/aaaaaaa-bbbb-cccc-dddd-eeeeeeee`.

For more information concerning the KMS encryption, refer to the [eksctl documentation](https://eksctl.io/usage/kms-encryption/).

### Create the cluster using eksctl

Execute the following script, which creates a file called `cluster.yaml` with the following contents:

```shell
cat <<EOF >./cluster.yaml
---
apiVersion: eksctl.io/v1alpha5
metadata:
  name: ${CLUSTER_NAME:-camunda-cluster} # e.g. camunda-cluster
  region: ${REGION:-eu-central-1} # e.g. eu-central-1
  version: "1.31"
availabilityZones:
  - ${REGION:-eu-central-1}c # e.g. eu-central-1c, the minimal is two distinct Availability Zones (AZs) within the region
  - ${REGION:-eu-central-1}b
  - ${REGION:-eu-central-1}a
cloudWatch:
  clusterLogging: {}
iam:
  vpcResourceControllerPolicy: true
addons:
  - name: vpc-cni
    resolveConflicts: overwrite
    version: latest
    useDefaultPodIdentityAssociations: true

  - name: kube-proxy
    resolveConflicts: overwrite
    version: latest
    useDefaultPodIdentityAssociations: true

  - name: aws-ebs-csi-driver
    resolveConflicts: overwrite
    version: latest
    useDefaultPodIdentityAssociations: true

  - name: coredns
    resolveConflicts: overwrite
    version: latest
    useDefaultPodIdentityAssociations: true

  - name: eks-pod-identity-agent
    version: latest

kind: ClusterConfig
kubernetesNetworkConfig:
  ipFamily: IPv4
managedNodeGroups:
  - amiFamily: AmazonLinux2
    desiredCapacity: ${NODE_COUNT:-4} # number of default nodes spawned if no cluster autoscaler is used
    disableIMDSv1: true
    iam:
      withAddonPolicies:
        albIngress: true
        autoScaler: true
        cloudWatch: true
        ebs: true
        awsLoadBalancerController: true
    instanceSelector: {}
    instanceTypes:
      - ${NODE_TYPE:-m6i.xlarge} # node type that is selected as default
    labels:
      alpha.eksctl.io/cluster-name: ${CLUSTER_NAME:-camunda-cluster} # e.g. camunda-cluster
      alpha.eksctl.io/nodegroup-name: services
    maxSize: 10 # maximum node pool size for cluster autoscaler
    minSize: 1 # minimum node pool size for cluster autoscaler
    name: services
    privateNetworking: true
    releaseVersion: ""
    securityGroups:
      withLocal: null
      withShared: null
    ssh:
      allow: false
      publicKeyPath: ""
    tags:
      alpha.eksctl.io/nodegroup-name: services
      alpha.eksctl.io/nodegroup-type: managed
    volumeIOPS: 3000
    volumeSize: 80
    volumeThroughput: 125
    volumeType: gp3
privateCluster:
  enabled: false
  skipEndpointCreation: false
vpc:
  autoAllocateIPv6: false
  cidr: ${CIDR:-10.192.0.0/16}
  clusterEndpoints:
    privateAccess: false
    publicAccess: true
  manageSharedNodeSecurityGroupRules: true
  nat:
    gateway: HighlyAvailable
secretsEncryption:
  keyARN: ${KMS_ARN}
EOF
```

With eksctl you can execute the previously created file as follows and takes 25-30 minutes.

```shell
cat cluster.yaml

eksctl create cluster --config-file cluster.yaml
```

### (Optional) IAM access management

Kubernetes access is divided into two distinct layers. The **first layer** involves **AWS IAM permissions**, which enable basic Amazon EKS functionalities such as using the Amazon EKS UI and generating Amazon EKS access through the AWS CLI. The **second layer** provides **cluster access**, determining the user's permissions within the Kubernetes cluster.

As a result, we must initially grant the user adequate AWS IAM permissions and subsequently assign them a specific role within the Kubernetes cluster for proper access management.

<!-- Multiline code not supported in raw HTML. Classes are automatically injected by Docusaurus) -->
<details>
  <summary>First Layer: IAM Permissions</summary>
  <p>

A minimum set of permissions is required to gain access to an Amazon EKS cluster. These two permissions allow a user to execute `aws eks update-kubeconfig` to update the local `kubeconfig` with cluster access to the Amazon EKS cluster.

The policy should look as follows and can be restricted further to specific Amazon EKS clusters if required:

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

Via the AWS CLI, you can run the following to create the policy above in IAM.

```shell
aws iam create-policy --policy-name "BasicEKSPermissions" --policy-document file://policy-eks.json
```

The created policy `BasicEKSPermissions` has to be assigned to a group, a role, or a user to work. Consult the [AWS documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage-attach-detach.html#add-policy-cli) to find the correct approach for you.

  </p>
</details>

<!-- Multiline code not supported in raw HTML. Classes are automatically injected by Docusaurus) -->
<details>
  <summary>Second Layer: Cluster Access</summary>
  <p>

By default, the user creating the Amazon EKS cluster has admin access. To allow other users to access it, we have to adjust the `aws-auth` configmap. This can either be done manually via `kubectl` or via `eksctl`. In the following sections, we explain how to do this.

#### eksctl

With `eksctl`, you can create an AWS IAM user to Kubernetes role mapping with the following command:

```shell
eksctl create iamidentitymapping \
  --cluster=$CLUSTER_NAME \
  --region=$REGION \
  --arn arn:aws:iam::0123456789:user/ops-admin \
  --group system:masters \
  --username admin
```

- `arn` is the identifier of your user.
- `group` is the Kubernetes role and as an example `system:masters` is a Kubernetes group for the admin role.
- `username` is either the username itself or the role name. It can also be any arbitrary value as it is used for the audit logs to identify the operation owner.

Example:

```shell
eksctl create iamidentitymapping \
  --cluster=$CLUSTER_NAME \
  --region=$REGION \
  --arn arn:aws:iam::0123456789:user/ops-admin \
  --group system:masters \
  --username admin
```

More information about usage and other configuration options can be found in the [eksctl documentation](https://eksctl.io/usage/iam-identity-mappings/).

#### kubectl

The same can also be achieved by using `kubectl` and manually adding the mapping as part of the `mapRoles` or `mapUsers` section.

```shell
kubectl edit configmap aws-auth -n kube-system
```

For detailed examples, review the [documentation provided by AWS](https://docs.aws.amazon.com/eks/latest/userguide/auth-configmap.html).

  </p>
</details>

### Access the created EKS cluster

Access the Amazon EKS cluster via the `AWS CLI` using the following command:

```shell
aws eks --region "$REGION" update-kubeconfig --name "$CLUSTER_NAME" --alias "$CLUSTER_NAME"
```

After updating the kubeconfig, verify your connection to the cluster with `kubectl`:

```shell
kubectl get nodes
```

Create a namespace for Camunda:

```shell
kubectl create namespace camunda
```

In the remainder of the guide, we reference the `camunda` namespace to create some required resources in the Kubernetes cluster, such as secrets or one-time setup jobs.

### Check existing StorageClasses

We recommend using **gp3** volumes with Camunda 8 (see [volume performance](./amazon-eks.md#volume-performance)). It may be necessary to create the `gp3` StorageClass, as the default configuration only includes **gp2**. For detailed information, refer to the [AWS documentation](https://aws.amazon.com/ebs/general-purpose/).

To see the available StorageClasses in your Kubernetes cluster, including which one is set as default, use the following command:

```bash
kubectl describe storageclass
```

To check if `gp3` is set as the default StorageClass, look for the annotation `storageclass.kubernetes.io/is-default-class: "true"` in the output of the previous command.

If `gp3` is not installed, or is not set as the default StorageClass, complete the following steps to install it and set it as default:

1. Create the `gp3` StorageClass:

   ```shell
   cat << EOF | kubectl apply -f -
   ---
   apiVersion: storage.k8s.io/v1
   kind: StorageClass
   metadata:
     name: ebs-sc
     annotations:
       storageclass.kubernetes.io/is-default-class: "true"
   provisioner: ebs.csi.aws.com
   parameters:
     type: gp3
   reclaimPolicy: Retain
   volumeBindingMode: WaitForFirstConsumer
   EOF
   ```

   This manifest defines an `ebs-sc` StorageClass to be created. This StorageClass uses the `ebs.csi.aws.com` provisioner, which is supplied by the **aws-ebs-csi-driver** addon installed during cluster creation. For more information, refer to the [official AWS documentation](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html).

2. Modify the `gp2` StorageClass to mark it as a non-default StorageClass:

   ```shell
   kubectl patch storageclass gp2 -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"false"}}}'
   ```

3. Verify the changes by running the `kubectl get storageclass` command.

After executing these commands, you will have a `gp3` StorageClass set as the default and the `gp2` StorageClass marked as non-default, provided that **gp2** was already present.

### Domain deployment requirements

If you plan to deploy Camunda using an external domain associated with an external certificate, you will need to set up some IAM policies to allow both **external-dns** and **cert-manager** to interact with Route 53, which controls the DNS.

By default, the cluster uses **Pod Identity** to manage IAM roles for your applications. This means that service accounts are associated with IAM roles, allowing your pods to securely access AWS resources without hardcoding credentials. For more information on configuring Pod Identity, refer to the [AWS documentation](https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html).

#### Enable OIDC and IAM roles for Service Accounts (IRSA)

To [enable OpenID Connect (OIDC) and IAM Roles for Service Accounts (IRSA)](https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html) on your cluster, complete the following steps:

1. Determine the OIDC issuer ID for your cluster.

   First, ensure that your EKS cluster is set up with an OIDC provider. The following command should show you the OIDC issuer:

   ```bash
   export oidc_id=$(aws eks describe-cluster --name "$CLUSTER_NAME" --query "cluster.identity.oidc.issuer" --output text | cut -d '/' -f 5)
   echo "$oidc_id"
   ```

   Determine whether an IAM OIDC provider with your cluster’s issuer ID is already in your account:

   ```bash
   aws iam list-open-id-connect-providers | grep $oidc_id | cut -d "/" -f4
   ```

   If output is returned, an IAM OIDC provider is already set up for your cluster, so you can skip the next step. If no output is returned, you will need to set up an IAM OIDC provider for your cluster.

1. Create an IAM OIDC identity provider for your cluster with the following command:

   ```bash
   eksctl utils associate-iam-oidc-provider --region "$REGION" --cluster "$CLUSTER_NAME" --approve
   ```

#### Policy for external-dns

The following instructions are based on the [external-dns](https://github.com/kubernetes-sigs/external-dns/blob/master/docs/tutorials/aws.md) guide concerning the AWS setup and only covers the required IAM setup. The Helm chart will be installed in the [follow-up guide](./eks-helm.md).

The following relies on the previously mentioned feature around IAM Roles for Service Accounts (IRSA) to simplify the external-dns setup.

The IAM policy document below allows external-dns to update Route53 resource record sets and hosted zones. You need to create this policy in AWS IAM first. In our example, we will call the policy `AllowExternalDNSUpdates`.

You may fine-tune the policy to permit updates only to explicit Hosted Zone IDs.

```shell
cat <<EOF >./policy-dns.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["route53:ChangeResourceRecordSets"],
      "Resource": ["arn:aws:route53:::hostedzone/*"]
    },
    {
      "Effect": "Allow",
      "Action": [
        "route53:ListHostedZones",
        "route53:ListResourceRecordSets",
        "route53:ListTagsForResource"
      ],
      "Resource": ["*"]
    }
  ]
}
EOF
```

Create AWS IAM policy with the AWS CLI:

```shell
aws iam create-policy --policy-name "AllowExternalDNSUpdates" --policy-document file://policy-dns.json

# example: arn:aws:iam::XXXXXXXXXXXX:policy/AllowExternalDNSUpdates
export EXTERNAL_DNS_POLICY_ARN=$(aws iam list-policies \
 --query 'Policies[?PolicyName==`AllowExternalDNSUpdates`].Arn' \
 --output text)

echo "EXTERNAL_DNS_POLICY_ARN=$EXTERNAL_DNS_POLICY_ARN"
```

The `EXTERNAL_DNS_POLICY_ARN` will be used in the next step to create a role mapping between the Kubernetes Service Account and AWS IAM Service Account.

Use `eksctl` to create the required role mapping for external-dns:

```shell
eksctl create iamserviceaccount \
  --cluster $CLUSTER_NAME \
  --name "external-dns" \
  --namespace "external-dns" \
  --attach-policy-arn $EXTERNAL_DNS_POLICY_ARN \
  --role-name="external-dns-irsa" \
  --role-only \
  --approve
```

```shell
export EXTERNAL_DNS_IRSA_ARN=$(aws iam list-roles \
  --query "Roles[?RoleName=='external-dns-irsa'].Arn" \
  --output text)

echo "EXTERNAL_DNS_IRSA_ARN=$EXTERNAL_DNS_IRSA_ARN"
```

The variable `EXTERNAL_DNS_IRSA_ARN` contains the `arn` (it should look like this: `arn:aws:iam::XXXXXXXXXXXX:role/external-dns-irsa`).

Alternatively, you can deploy the Helm chart first and then use `eksctl` with the option `--override-existing-serviceaccounts` instead of `--role-only` to reconfigure the created service account.

#### Policy for cert-manager

The following instructions are taken from the [cert-manager](https://cert-manager.io/docs/configuration/acme/dns01/route53/) guide concerning the AWS setup and only covers the required IAM setup. The Helm chart will be installed in the [follow-up guide](./eks-helm.md).

The following relies on the previously mentioned feature around IAM Roles for Service Accounts (IRSA) to simplify the cert-manager setup.

The IAM policy document below allows cert-manager to update Route53 resource record sets and hosted zones. You need to create this policy in AWS IAM first. In our example, we call the policy `AllowCertManagerUpdates`.

If you prefer, you may fine-tune the policy to permit updates only to explicit Hosted Zone IDs.

```shell
cat <<EOF >./policy-cert.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "route53:GetChange",
      "Resource": "arn:aws:route53:::change/*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "route53:ChangeResourceRecordSets",
        "route53:ListResourceRecordSets"
      ],
      "Resource": "arn:aws:route53:::hostedzone/*"
    },
    {
      "Effect": "Allow",
      "Action": "route53:ListHostedZonesByName",
      "Resource": "*"
    }
  ]
}
EOF
```

Create AWS IAM policy with the AWS CLI:

```shell
aws iam create-policy --policy-name "AllowCertManagerUpdates" --policy-document file://policy-cert.json

# example: arn:aws:iam::XXXXXXXXXXXX:policy/AllowCertManagerUpdates
export CERT_MANAGER_POLICY_ARN=$(aws iam list-policies \
 --query 'Policies[?PolicyName==`AllowCertManagerUpdates`].Arn' \
 --output text)

echo "CERT_MANAGER_POLICY_ARN=$CERT_MANAGER_POLICY_ARN"
```

The `CERT_MANAGER_POLICY_ARN` is used in the next step to create a role mapping between the Amazon EKS Service Account and the AWS IAM Service Account.

Use `eksctl` to create the required role mapping for cert-manager:

```shell
eksctl create iamserviceaccount \
  --cluster=$CLUSTER_NAME \
  --name="cert-manager" \
  --namespace="cert-manager" \
  --attach-policy-arn=$CERT_MANAGER_POLICY_ARN \
  --role-name="cert-manager-irsa" \
  --role-only \
  --approve
```

```shell
export CERT_MANAGER_IRSA_ARN=$(aws iam list-roles \
  --query "Roles[?RoleName=='cert-manager-irsa'].Arn" \
  --output text)

echo "CERT_MANAGER_IRSA_ARN=$CERT_MANAGER_IRSA_ARN"
```

The variable `CERT_MANAGER_IRSA_ARN` will contain the `arn` (it should look like this: `arn:aws:iam::XXXXXXXXXXXX:role/cert-manager-irsa`).

Alternatively, you can deploy the Helm chart first and then use `eksctl` with the option `--override-existing-serviceaccounts` instead of `--role-only` to reconfigure the created service account.

## 3. PostgreSQL database

Creating a PostgreSQL database can be accomplished through various methods, such as using the AWS Management Console or the AWS CLI. This guide focuses on providing a reproducible setup using the CLI. For information on creating PostgreSQL using the UI, refer to the [AWS documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.PostgreSQL.html).

:::info Optional service

If you don't want to use the Amazon RDS Aurora managed service for PostgreSQL, you can skip this section.
However, note that you may need to adjust the following instructions to remove references to it.

If you choose not to use this service, you'll need to either provide a managed PostgreSQL service or use the internal deployment by the Camunda Helm chart in Kubernetes.

:::

The following components use the PostgreSQL database:

- Keycloak
- Identity
- Web Modeler

### Configuration

```shell
##### Postgres parameters

# Name for the Postgres DB cluster and instance
export RDS_NAME=camunda-postgres
# Postgres DB admin username
export AURORA_USERNAME=secret_user
# Postgres DB password of the admin user
export AURORA_PASSWORD=camundarocks123
# The PostgreSQL version
export POSTGRESQL_VERSION=15.8

# For each database, we need to generate a username, password and database name
export DB_KEYCLOAK_NAME="keycloak_db"
export DB_KEYCLOAK_USERNAME="keycloak-pg"
export DB_KEYCLOAK_PASSWORD="CHANGE-ME-PLEASE"

export DB_IDENTITY_NAME="identity_db"
export DB_IDENTITY_USERNAME="identity-pg"
export DB_IDENTITY_PASSWORD="CHANGE-ME-PLEASE"

export DB_WEBMODELER_NAME="webmodeler_db"
export DB_WEBMODELER_USERNAME="webmodeler-pg"
export DB_WEBMODELER_PASSWORD="CHANGE-ME-PLEASE"
```

### Step-by-step setup

1. Identify the VPC associated with the Amazon EKS cluster:

   ```shell
   export VPC_ID=$(aws ec2 describe-vpcs \
     --query "Vpcs[?Tags[?Key=='alpha.eksctl.io/cluster-name']|[?Value=='$CLUSTER_NAME']].VpcId" \
     --output text)

   echo "VPC_ID=$VPC_ID"
   ```

   The variable `VPC_ID` contains the output value required for the next step (the value should look like this: `vpc-1234567890`).

2. Create a security group within the VPC to allow connections to the Aurora PostgreSQL instance:

   ```shell
   export GROUP_ID_AURORA=$(aws ec2 create-security-group \
     --group-name aurora-postgres-sg \
     --description "Security Group to allow the Amazon EKS cluster $CLUSTER_NAME to connect to Aurora PostgreSQL $RDS_NAME" \
     --vpc-id $VPC_ID \
     --output text)

   echo "GROUP_ID_AURORA=$GROUP_ID_AURORA"
   ```

   The variable `GROUP_ID_AURORA` contains the output (the value should look like this: `sg-1234567890`).

3. Create a security ingress rule to allow access to PostgreSQL:

   ```shell
   aws ec2 authorize-security-group-ingress \
     --group-id $GROUP_ID_AURORA \
     --protocol tcp \
     --port 5432 \
     --cidr $CIDR
     # The CIDR range should match the value in the `cluster.yaml`
   ```

4. Retrieve subnets of the VPC to create a database subnet group:

   ```shell
   export SUBNET_IDS=$(aws ec2 describe-subnets \
     --filter Name=vpc-id,Values=$VPC_ID \
     --query "Subnets[?Tags[?Key=='aws:cloudformation:logical-id']|[?contains(Value, 'Private')]].SubnetId" \
     --output text | expand -t 1)

   echo "SUBNET_IDS=$SUBNET_IDS"
   ```

   The variable `SUBNET_IDS` contains the output values of the private subnets (the value should look like this: `subnet-0123456789 subnet-1234567890 subnet-9876543210`).

5. Create a database subnet group to associate PostgreSQL within the existing VPC:

   ```shell
   aws rds create-db-subnet-group \
       --db-subnet-group-name camunda-postgres \
       --db-subnet-group-description "Subnet for Camunda PostgreSQL $RDS_NAME" \
       --subnet-ids $(echo "$SUBNET_IDS")
   ```

6. Create a PostgreSQL cluster within a private subnet of the VPC:

   For the latest Camunda-supported PostgreSQL engine version, check our [documentation](../../../../../reference/supported-environments.md#camunda-8-self-managed).

   ```shell
   aws rds create-db-cluster \
       --db-cluster-identifier $RDS_NAME \
       --engine aurora-postgresql \
       --engine-version $POSTGRESQL_VERSION \
       --master-username $AURORA_USERNAME \
       --master-user-password $AURORA_PASSWORD \
       --vpc-security-group-ids $GROUP_ID_AURORA \
       --availability-zones $(echo $ZONES) \
       --db-subnet-group-name camunda-postgres
   ```

   More configuration options can be found in the [AWS documentation](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/rds/create-db-cluster.html).

7. Wait for the PostgreSQL cluster to be ready:

   ```shell
   aws rds wait db-cluster-available \
       --db-cluster-identifier $RDS_NAME
   ```

8. Create a database instance within the DB cluster:

   Ensure that the `engine-version` matches the previously created PostgreSQL cluster.

   ```shell
   aws rds create-db-instance \
       --db-instance-identifier $RDS_NAME \
       --db-cluster-identifier $RDS_NAME \
       --engine aurora-postgresql \
       --engine-version $POSTGRESQL_VERSION \
       --no-publicly-accessible \
       --db-instance-class db.t3.medium
   ```

   More configuration options can be found in the [AWS documentation](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/rds/create-db-instance.html).

9. Wait for changes to be applied:

   ```shell
   aws rds wait db-instance-available \
       --db-instance-identifier $RDS_NAME
   ```

   This command will wait until the instance is ready.

### Create the databases

Now that you have a database, you need to create dedicated databases for each Camunda component along with associated users that have configured access.

We will also use this step to verify connectivity to the database from the created EKS cluster. The creation of the databases will be performed by spawning a pod job in the Kubernetes cluster, using the main user to create the different databases.

1. Retrieve the writer endpoint of the DB cluster:

   ```shell
   export DB_HOST=$(aws rds describe-db-cluster-endpoints \
     --db-cluster-identifier $RDS_NAME \
     --query "DBClusterEndpoints[?EndpointType=='WRITER'].Endpoint" \
     --output text)

   echo "DB_HOST=$DB_HOST"
   ```

2. Create a secret that references the environment variables:

   ```bash
   kubectl create secret generic setup-db-secret --namespace camunda \
     --from-literal=AURORA_ENDPOINT="$DB_HOST" \
     --from-literal=AURORA_PORT="5432" \
     --from-literal=AURORA_DB_NAME="postgres" \
     --from-literal=AURORA_USERNAME="$AURORA_USERNAME" \
     --from-literal=AURORA_PASSWORD="$AURORA_PASSWORD" \
     --from-literal=DB_KEYCLOAK_NAME="$DB_KEYCLOAK_NAME" \
     --from-literal=DB_KEYCLOAK_USERNAME="$DB_KEYCLOAK_USERNAME" \
     --from-literal=DB_KEYCLOAK_PASSWORD="$DB_KEYCLOAK_PASSWORD" \
     --from-literal=DB_IDENTITY_NAME="$DB_IDENTITY_NAME" \
     --from-literal=DB_IDENTITY_USERNAME="$DB_IDENTITY_USERNAME" \
     --from-literal=DB_IDENTITY_PASSWORD="$DB_IDENTITY_PASSWORD" \
     --from-literal=DB_WEBMODELER_NAME="$DB_WEBMODELER_NAME" \
     --from-literal=DB_WEBMODELER_USERNAME="$DB_WEBMODELER_USERNAME" \
     --from-literal=DB_WEBMODELER_PASSWORD="$DB_WEBMODELER_PASSWORD"
   ```

   This command creates a secret named `setup-db-secret` and dynamically populates it with the values from your environment variables.

   After running the above command, you can verify that the secret was created successfully by using:

   ```bash
   kubectl get secret setup-db-secret -o yaml --namespace camunda
   ```

   This should display the secret with the base64 encoded values.

3. Save the following manifest to a file, for example, `setup-postgres-create-db.yml`:

   ```yaml reference
   https://github.com/camunda/camunda-tf-eks-module/blob/main/examples/camunda-8.7/setup-postgres-create-db.yml
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

7. Cleanup the resources:

   ```bash
   kubectl delete job create-setup-user-db --namespace camunda
   kubectl delete secret setup-db-secret --namespace camunda
   ```

   Running these commands will clean up both the job and the secret, ensuring that no unnecessary resources remain in the cluster.

## 4. OpenSearch domain

Creating an OpenSearch domain can be accomplished through various methods, such as using the AWS Management Console or the AWS CLI. This guide focuses on providing a reproducible setup using the CLI. For information on creating an OpenSearch domain using the UI, refer to the [AWS OpenSearch documentation](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/create-managed-domain.html).

The resulting OpenSearch domain is intended for use with the Camunda platform, the following components utilize OpenSearch:

- Operate
- Optimize
- Tasklist
- Zeebe

:::info Optional service

If you don't want to use the Amazon OpenSearch managed service for OpenSearch, you can skip this section.
However, note that you may need to adjust the following instructions to remove references to it.

If you choose not to use this service, you'll need to either provide a managed OpenSearch or Elasticsearch service or use the internal deployment by the Camunda Helm chart in Kubernetes.

:::

:::note Migration to OpenSearch is not supported

Using Amazon OpenSearch Service requires [setting up a new Camunda installation](/self-managed/setup/overview.md). Migration from previous Camunda versions or Elasticsearch environments is currently not supported. Switching between Elasticsearch and OpenSearch, in either direction, is also not supported.

:::

### Configuration

```shell
##### OpenSearch parameters

# Name for the OpenSearch domain
export OPENSEARCH_NAME=camunda-opensearch
```

:::caution Network based security

The standard deployment for OpenSearch relies on the first layer of security, which is the Network.
While this setup allows easy access, it may expose sensitive data. To enhance security, consider implementing IAM Roles for Service Accounts (IRSA) to restrict access to the OpenSearch cluster, providing a more secure environment.
For more information, see the [Amazon OpenSearch Service fine-grained access control documentation](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/fgac.html#fgac-access-policies).

:::

### Step-by-step setup

1. Identify the VPC associated with the Amazon EKS cluster:

   ```shell
   export VPC_ID=$(aws ec2 describe-vpcs \
     --query "Vpcs[?Tags[?Key=='alpha.eksctl.io/cluster-name']|[?Value=='$CLUSTER_NAME']].VpcId" \
     --output text)

   echo "VPC_ID=$VPC_ID"
   ```

   The variable `VPC_ID` contains the output value required for the next steps (the value should look like this: `vpc-1234567890`).

2. Create a security group within the VPC to allow connections to the OpenSearch domain:

   ```shell
   export GROUP_ID_OPENSEARCH=$(aws ec2 create-security-group \
     --group-name opensearch-sg \
     --description "Security Group to allow internal connections From EKS $CLUSTER_NAME to OpenSearch $OPENSEARCH_NAME" \
     --vpc-id $VPC_ID \
     --output text)

   echo "GROUP_ID_OPENSEARCH=$GROUP_ID_OPENSEARCH"
   ```

   The variable `GROUP_ID_OPENSEARCH` contains the output (the value should look like this: `sg-1234567890`).

3. Create a security ingress rule to allow access to OpenSearch over HTTPS (port 443) from within the VPC:

   ```shell
   aws ec2 authorize-security-group-ingress \
     --group-id $GROUP_ID_OPENSEARCH \
     --protocol tcp \
     --port 443 \
     --cidr $CIDR  # Replace with the CIDR range of your EKS cluster, e.g., <EKS_CIDR_BLOCK>
   ```

   Ensure that the CIDR range is appropriate for your environment. OpenSearch uses `443` as the https transport port.

4. Retrieve the private subnets of the VPC:

   ```shell
   export SUBNET_IDS=$(aws ec2 describe-subnets \
     --filter Name=vpc-id,Values=$VPC_ID \
     --query "Subnets[?Tags[?Key=='aws:cloudformation:logical-id']|[?contains(Value, 'Private')]].SubnetId" \
     --output text | expand -t 1)

   # format it with coma
   export SUBNET_IDS=$(echo "$SUBNET_IDS" | sed 's/ /,/g')

   echo "SUBNET_IDS=$SUBNET_IDS"
   ```

   The variable `SUBNET_IDS` now contains the output values of the private subnets (the value should look like this: `subnet-0123456789 subnet-1234567890`).

5. Create the OpenSearch domain:

   ```shell
   aws opensearch create-domain --domain-name $OPENSEARCH_NAME \
     --engine-version OpenSearch_2.15 \
     --cluster-config  "InstanceType=m7i.large.search,InstanceCount=3,ZoneAwarenessEnabled=true,ZoneAwarenessConfig={AvailabilityZoneCount=3}" \
     --node-to-node-encryption-options Enabled=true \
     --ebs-options "EBSEnabled=true,VolumeType=gp3,VolumeSize=50,Iops=3000,Throughput=125" \
     --encryption-at-rest-options Enabled=true \
     --access-policies "{ \"Version\": \"2012-10-17\", \"Statement\": [{\"Effect\": \"Allow\", \"Principal\": { \"AWS\": \"*\" }, \"Action\": \"es:*\", \"Resource\": \"arn:aws:es:$REGION:*:domain/$OPENSEARCH_NAME/*\" }]}" \
     --vpc-options "SubnetIds=${SUBNET_IDS},SecurityGroupIds=${GROUP_ID_OPENSEARCH}"
   ```

   - **Domain Name**: `$OPENSEARCH_NAME` is the name of the OpenSearch domain being created.
   - **Engine Version**: Uses OpenSearch version `2.15`.
   - **Cluster Configuration**:
     - `InstanceType=m7i.large.search` specifies the instance type for the domain.
     - `InstanceCount=3` creates a cluster with 3 instances.
     - `ZoneAwarenessEnabled=true` and `ZoneAwarenessConfig={AvailabilityZoneCount=3}` enable zone awareness and spread the instances across 3 availability zones to improve fault tolerance.
   - **Node-to-Node Encryption**: Encryption for traffic between nodes in the OpenSearch cluster is enabled (`Enabled=true`).
   - **EBS Options**:
     - `EBSEnabled=true` enables Elastic Block Store (EBS) for storage.
     - `VolumeType=gp3` specifies the volume type as `gp3` with 50 GiB of storage.
     - `Iops=3000` and `Throughput=125` set the IOPS and throughput for the storage.
   - **Encryption at Rest**: Data stored in the domain is encrypted at rest (`Enabled=true`).
   - **Access Policies**: The default access policy allows all actions (`es:*`) on resources within the domain for any AWS account (`"Principal": { "AWS": "*" }`). This is scoped to the OpenSearch domain resources using the `arn:aws:es:$REGION:*:domain/$OPENSEARCH_NAME/*` resource ARN.
   - **VPC Options**: The domain is deployed within the specified VPC, restricted to the provided subnets (`SubnetIds=${SUBNET_IDS}`) and associated security group (`SecurityGroupIds=${GROUP_ID_OPENSEARCH}`).

   This configuration creates a secure OpenSearch domain with encryption both in transit (between nodes) and at rest, zonal fault tolerance, and sufficient storage performance using `gp3` volumes. The access is restricted to resources in the VPC of the EKS cluster and is governed by the specified security group.

:::tip

The instance type `m7i.large.search` in the above example is a suggestion, and can be changed depending on your needs.

:::

6. Wait for the OpenSearch domain to be active:

   ```shell
   while [ "$(aws opensearch describe-domain --domain-name $OPENSEARCH_NAME --query 'DomainStatus.Processing' --output text)" != "False" ]; do echo "Waiting for OpenSearch domain to become availablen this can up to take 20-30 minutes..."; sleep 30; done && echo "OpenSearch domain is now available\!"
   ```

7. Retrieve the endpoint of the OpenSearch domain:

   ```shell
   export OPENSEARCH_HOST=$(aws opensearch describe-domains --domain-names $OPENSEARCH_NAME --query "DomainStatusList[0].Endpoints.vpc" --output text)

   echo "OPENSEARCH_HOST=$OPENSEARCH_HOST"
   ```

   This endpoint will be used to connect to your OpenSearch domain.

### Verify connectivity from within the EKS cluster

To verify that the OpenSearch domain is accessible from within your Amazon EKS cluster, follow these steps:

1. Deploy a temporary pod to test connectivity:

   Create a temporary pod using the `amazonlinux` image in the `camunda` namespace, install `curl`, and test the connection to OpenSearch—all in a single command:

   ```bash
   kubectl run amazonlinux-opensearch -n camunda --rm -i --tty --image amazonlinux -- sh -c "curl -XGET https://$OPENSEARCH_HOST/_cluster/health"
   ```

2. Verify the response:

   If everything is set up correctly, you should receive a response from the OpenSearch service indicating its health status.

You have successfully set up an OpenSearch domain that is accessible from within your Amazon EKS cluster. For further details, refer to the [OpenSearch documentation](https://opensearch.org/docs/latest/index/).

## 5. Install Camunda 8 using the Helm chart

Now that you've exported the necessary values, you can proceed with installing Camunda 8 using Helm charts. Follow the guide [Camunda 8 on Kubernetes](./eks-helm.md) for detailed instructions on deploying the platform to your Kubernetes cluster.
