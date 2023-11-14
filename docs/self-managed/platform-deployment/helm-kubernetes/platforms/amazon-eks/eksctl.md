---
id: eks-eksctl
title: "Set up EKS and PostgreSQL with eksctl"
description: "Eksctl setup instructions for a quick C8 setup."
---

[eksctl](https://eksctl.io/) is a common CLI tool for easily creating and managing your EKS clusters and is [officially endorsed](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html) by Amazon.

## Prerequisites

- an [AWS account](https://docs.aws.amazon.com/accounts/latest/reference/accounts-welcome.html) is required to create any resources within AWS.
- [AWS CLI (2.11.15)](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) is a CLI tool for creating AWS resources.
- [eksctl (0.163.0)](https://eksctl.io/installation/) is a CLI tool for creating and managing EKS clusters.
- [kubectl (1.28.x)](https://kubernetes.io/docs/tasks/tools/#kubectl) to interact with the cluster.

The guide was initially created using the mentioned versions, but it should also be compatible with newer versions.

## Considerations

The following does not reflect a production ready setup but is a good quick-start to get going with Camunda on AWS EKS.

This is a simple guide suitable for non-production setups. However, it provides links to additional documentation to assist you with more advanced configuration.

While the guide is primarily tailored for UNIX systems, it can be easily modified to suit Windows operating systems as well.

:::warning
Please note that following the guide will incur costs on your cloud provider account.
:::

## Outcome

Following this guide will result in

- an AWS EKS 1.28 Kubernetes Cluster with 4 nodes and the possibility to scale up further.
- the [EBS CSI driver](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html) is installed and configured, which is used by Camunda 8 applications to spawn [persistent volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).
- a [managed Aurora PostgreSQL 15.4](https://aws.amazon.com/rds/aurora/) instance that will be used by the Camunda 8 applications.

This basic cluster setup is required to continue with the Helm setup as described in our [AWS Helm Guide](#). <!-- TODO: reference future guide -->

## Usage

The `eksctl` tool allows creating clusters via a single command, but this doesn't support all configuration options. Therefore, we're supplying a YAML file that can be used with the CLI to create the cluster preconfigured with various settings.

### `eksctl` Prerequisites

Set up authentication to allow interacting with AWS via the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html) to configure access.

A user creating AWS resources will be the owner of those and will always be linked to them. This means that the user will always have admin access on Kubernetes, unless you delete it.

Therefore, it is a good practice to create a separate [IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) that will be solely used for the `eksctl` command. [Create access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) for the new IAM user via the console and export them as `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` variable to use with the AWS CLI and `eksctl`.

### Environment Prerequisites

In order to streamline the execution of the subsequent commands, it is recommended to export multiple environment variables.

The following are the required environment variables with some example values. Please make sure to define your own secure password for the Postgres database.

```shell
# The name used for the Kubernetes Cluster
export CLUSTER_NAME=camunda-cluster
# Your standard region that you host AWS resources in
export REGION=eu-central-1
# Multi Region Zones, derived from the region
export ZONES="eu-central-1a eu-central-1b eu-central-1c"
# CIDR range used for the VPC subnets
export CIDR=10.192.0.0/16
# Name for the Postgres DB cluster and instance
export RDS_NAME=camunda-postgres
# Postgres DB admin username
export PG_USERNAME=camunda
# Postgres DB password of the admin user
export PG_PASSWORD=camundarocks123
# The default database name created within Postgres. Can directly be consumed by the Helm chart
export DEFAULT_DB_NAME=camunda

# Optional
# Default node type for the K8s cluster
export NODE_TYPE=m5.xlarge
# Initial node count to create the cluster with
export NODE_COUNT=4
```

### Kubernetes Secret Encryption

The following will enable [envelope encryption](https://aws.amazon.com/about-aws/whats-new/2020/03/amazon-eks-adds-envelope-encryption-for-secrets-with-aws-kms/) to add another layer of protection to your Kubernetes secrets.

We recommend this as a first step to make use of the KMS encryption during cluster creation as enabling it afterwards can take up to 45 minutes. The value will be needed in the [eksctl Cluster YAML](#eksctl-cluster-yaml).

1. Create AWS KMS Key via the aws-cli. For additional settings conduct the [documentation](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/kms/create-key.html)

```shell
export KMS_ARN=$(aws kms create-key \
  --description "Kubernetes Encryption Key" \
  --query "KeyMetadata.Arn" \
  --output text)
```

2. The variable `KMS_ARN` will contain the required output. It should look something like this: `arn:aws:kms:eu-central-1:1234567890:key/aaaaaaa-bbbb-cccc-dddd-eeeeeeee`

For more information concerning the KMS encryption, refer to the [eksctl documentation](https://eksctl.io/usage/kms-encryption/).

### eksctl Cluster YAML

Execute the following script, which will create a file called `cluster.yaml` with the following contents:

```shell
cat <<EOF >./cluster.yaml
---
apiVersion: eksctl.io/v1alpha5
metadata:
  name: ${CLUSTER_NAME:-camunda-cluster} # e.g. camunda-cluster
  region: ${REGION:-eu-central-1} # e.g. eu-central-1
  version: "1.28"
availabilityZones:
  - ${REGION:-eu-central-1}c # e.g. eu-central-1c
  - ${REGION:-eu-central-1}b
  - ${REGION:-eu-central-1}a
cloudWatch:
  clusterLogging: {}
iam:
  vpcResourceControllerPolicy: true
  withOIDC: true # enables and configures OIDC for IRSA
addons:
  - name: vpc-cni
    resolveConflicts: overwrite
    version: latest
  - name: kube-proxy
    resolveConflicts: overwrite
    version: latest
  - name: aws-ebs-csi-driver # automatically configures IRSA
    resolveConflicts: overwrite
    version: latest
  - name: coredns
    resolveConflicts: overwrite
    version: latest
kind: ClusterConfig
kubernetesNetworkConfig:
  ipFamily: IPv4
managedNodeGroups:
  - amiFamily: AmazonLinux2
    desiredCapacity: ${NODE_COUNT:-4} # number of default nodes spawned if no cluster autoscaler is used
    disableIMDSv1: true
    disablePodIMDS: true
    instanceSelector: {}
    instanceTypes:
      - ${NODE_TYPE:-m5.xlarge} # node type that is selected as default
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
  keyARN: ${KMS_KEY}
EOF
```

```shell
eksctl create cluster --config-file cluster.yaml
```

### IAM Access Management

By default, the user creating the EKS cluster has admin access. To allow other users to access it as well, we have to adjust the
`aws-auth` configmap. This can either be done manually via `kubectl` or via `eksctl`. In the following sections we explain how to do that.

#### eksctl

With `eksctl`, you can create an IAM user to Kubernetes role mapping via the following command:

```shell
eksctl create iamidentitymapping \
  --cluster=$CLUSTER_NAME --region=$REGION \
  --arn arn:aws:iam::<organizationId>:role/<roleName> \
  --group system:masters \
  --username admin
```

Where `arn` is the ARN of your user or the role. The `group` is the Kubernetes role, where `system:masters` is a Kubernetes group for the admin role. Lastly, `username` is either the username itself or the role name, but can also be any other a arbitrary value. It's used for e.g. the audit logs to identify who did which operation.

More information about usage and other configuration options can be found in the [eksctl documentation](https://eksctl.io/usage/iam-identity-mappings/).

#### kubectl

The same can also be achieved by using `kubectl` and manually adding the mapping as part of the `mapRoles` or `mapUsers` section.

```shell
kubectl edit configmap aws-auth -n kube-system
```

For detailed examples, check out the [documentation](https://docs.aws.amazon.com/eks/latest/userguide/add-user-role.html) provided by AWS.

## Postgres Database

Creating a Postgres Database can be solved in various ways, one of those utilizing the UI or the AWS CLI.
For the purposes of this guide, we're trying to provide you with a reproducible setup, therefore aiming for the CLI. Using the UI may be easier and can be followed by [conducting the AWS documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.PostgreSQL.html).

1. Figure out the VPC that is associated with the cluster
   - Either via the [AWS UI](https://console.aws.amazon.com/eks/home)
   - Or CLI
   ```shell
   export VPC_ID=$(aws ec2 describe-vpcs \
     --query "Vpcs[?Tags[?Key=='alpha.eksctl.io/cluster-name']|[?Value=='$CLUSTER_NAME']].VpcId" \
     --output text)
   ```
2. The variable `VPC_ID` contains the output value required for the next step (it should look like this: `vpc-1234567890`)
3. Create a security group within the VPC for connection to the Aurora PostgreSQL instance

```shell
export GROUP_ID=$(aws ec2 create-security-group \
  --group-name aurora-postgres-sg \
  --description "Security Group to allow the k8s cluster to connect to aurora postgres" \
  --vpc-id $VPC_ID \
  --output text)
```

4. The variable `GROUP_ID` will contain the output (it should look like this: `sg-1234567890`)
5. Create security ingress rule to allow access to postgres

```shell
aws ec2 authorize-security-group-ingress \
  --group-id $GROUP_ID \
  --protocol tcp \
  --port 5432 \
  --cidr $CIDR
  # the CIDR range should be exactly the same value as in the `cluster.yaml`
```

6. Retrieve subnets of the VPC to create database subnet group

```shell
export SUBNET_IDS=$(aws ec2 describe-subnets \
  --filter Name=vpc-id,Values=$VPC_ID \
  --query "Subnets[?Tags[?Key=='aws:cloudformation:logical-id']|[?contains(Value, 'Private')]].SubnetId" \
  --output text | expand -t 1)
```

7. The variable `SUBNET_IDS` contains the output values of the private subnets (it should look like this: `subnet-0123456789 subnet-1234567890 subnet-9876543210`)

8. Create a database subnet group to associate RDS within the existing VPC

```shell
aws rds create-db-subnet-group \
    --db-subnet-group-name camunda-postgres \
    --db-subnet-group-description "Subnet for Camunda Postgres" \
    --subnet-ids $(echo $SUBNET_IDS)
```

9. Create an RDS cluster within a private subnet of the VPC.

For the latest supported Postgres engine-version, conduct our [documentation concerning supported environments](../../../../../reference/supported-environments.md#camunda-8-self-managed).

```shell
aws rds create-db-cluster \
    --db-cluster-identifier $RDS_NAME \
    --engine aurora-postgresql \
    --engine-version 15.4 \
    --master-username $PG_USERNAME \
    --master-user-password $PG_PASSWORD \
    --vpc-security-group-ids $GROUP_ID \
    --availability-zones $(echo $ZONES) \
    --database-name $DEFAULT_DB_NAME \
    --db-subnet-group-name camunda-postgres
```

More configuration options can be found in the [AWS documentation](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/rds/create-db-cluster.html).

10. Wait for RDS cluster to be ready

```shell
aws rds wait db-cluster-available \
    --db-cluster-identifier $RDS_NAME
```

11. Create a database instance within the cluster.

The `engine-version` is required to be the same as the one of the previously created RDS cluster.

```shell
aws rds create-db-instance \
    --db-instance-identifier $RDS_NAME \
    --db-cluster-identifier $RDS_NAME \
    --engine aurora-postgresql \
    --engine-version 15.4 \
    --no-publicly-accessible \
    --db-instance-class db.t3.medium
```

More configuration options can be found in the [AWS documentation](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/rds/create-db-instance.html).

12. Wait for instance to be ready

```shell
aws rds wait db-instance-available \
    --db-instance-identifier $RDS_NAME
```

### Verifying connectivity between the EKS cluster and the Database

1. Retrieve Writer endpoint of the RDS to check against

```shell
export DB_HOST=$(aws rds describe-db-cluster-endpoints \
  --db-cluster-identifier $RDS_NAME \
  --query "DBClusterEndpoints[?EndpointType=='WRITER'].Endpoint" \
  --output text)
```

2. Create a Kubernetes pod to check the in-cluster access:

```shell
kubectl run ubuntu --rm -i --tty --image ubuntu --env="DB_HOST=$DB_HOST" --env="PG_USERNAME=$PG_USERNAME" -- bash
```

3. Install required dependencies

```shell
apt update && apt install -y postgresql-client
```

4. Connect to Postgresql DB

```shell
psql \
  --host=$DB_HOST \
  --username=$PG_USERNAME \
  --port=5432 \
  --dbname=postgres
```

## IAM Setup

### external-dns

The following is taken from the [external-dns](https://github.com/kubernetes-sigs/external-dns/blob/master/docs/tutorials/aws.md) guide concerning the AWS setup.

The following IAM policy document allows external-dns to update Route53 resource record sets and hosted zones. You'll want to create this policy in IAM first. In our example, we'll call the policy `AllowExternalDNSUpdates`.

If you prefer, you may fine-tune the policy to permit updates only to explicit Hosted Zone IDs.

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

Via the AWS CLI, you can run the following to create the above policy in IAM.

```shell
aws iam create-policy --policy-name "AllowExternalDNSUpdates" --policy-document file://policy-dns.json

# example: arn:aws:iam::XXXXXXXXXXXX:policy/AllowExternalDNSUpdates
export EXTERNAL_DNS_POLICY_ARN=$(aws iam list-policies \
 --query 'Policies[?PolicyName==`AllowExternalDNSUpdates`].Arn' \
 --output text)
```

The `EXTERNAL_DNS_POLICY_ARN` will be used in the next step to create a role mapping between Kubernetes Service Account and IAM Service Account.

Using `eksctl` allows us to create the required role mapping for external-dns.

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
```

The variable `EXTERNAL_DNS_IRSA_ARN` will contain the `arn` (it should look like this: `arn:aws:iam::XXXXXXXXXXXX:role/external-dns-irsa`).

Alternatively, one can first deploy the Helm chart and afterwards use eksctl with the option `--override-existing-serviceaccounts` instead of `--role-only` to reconfigure the created service account.

### cert-manager

The following is taken from the [cert-manager](https://cert-manager.io/docs/configuration/acme/dns01/route53/) guide concerning the AWS setup.

The following IAM policy document allows cert-manager to update Route53 resource record sets and hosted zones. You'll want to create this policy in IAM first. In our example, we'll call the policy `AllowCertManagerUpdates`.

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

Via the AWS CLI, you can run the following to create the above policy in IAM.

```shell
aws iam create-policy --policy-name "AllowCertManagerUpdates" --policy-document file://policy-cert.json

# example: arn:aws:iam::XXXXXXXXXXXX:policy/AllowCertManagerUpdates
export CERT_MANAGER_POLICY_ARN=$(aws iam list-policies \
 --query 'Policies[?PolicyName==`AllowCertManagerUpdates`].Arn' \
 --output text)
```

The `CERT_MANAGER_POLICY_ARN` will be used in the next step to create a role mapping between Kubernetes Service Account and IAM Service Account.

Using `eksctl` allows us to create the required role mapping for cert-manager.

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
```

The variable `CERT_MANAGER_IRSA_ARN` will contain the `arn` (it should look like this: `arn:aws:iam::XXXXXXXXXXXX:role/cert-manager-irsa`).

Alternatively, one can first deploy the Helm chart and afterwards use eksctl with the option `--override-existing-serviceaccounts` instead of `--role-only` to reconfigure the created service account.

## C8 Helm Chart Prerequisites

### StorageClass

To align with [Camunda's recommendation](http://localhost:3000/docs/next/self-managed/platform-deployment/helm-kubernetes/platforms/amazon-eks/#volume-performance) of using gp3 volumes, it is necessary to create the StorageClass as the default configuration only includes `gp2`. For detailed information, please refer to the [AWS documentation](https://aws.amazon.com/ebs/general-purpose/).

The following steps will create the `gp3` StorageClass.

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

This patches the `gp2` StorageClass to not be used as the default storage type anymore.

```shell
kubectl patch storageclass gp2 -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"false"}}}'
```
