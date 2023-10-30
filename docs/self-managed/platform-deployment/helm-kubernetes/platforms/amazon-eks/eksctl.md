---
id: eks-eksctl
title: "EKS Eksctl Setup"
description: "Eksctl setup instructions for a quick C8 setup."
---

[Eksctl](https://eksctl.io/) is a common CLI tool for easily creating and managing your EKS clusters and is [officially endorsed](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html) by Amazon.

## Prerequisites

- an [AWS account](https://docs.aws.amazon.com/accounts/latest/reference/accounts-welcome.html) is required to create any resources within AWS.
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) is a CLI tool for creating AWS resources.
- [eksctl](https://eksctl.io/installation/) is a CLI tool for creating and managing EKS clusters.
- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) to interact with the cluster.

## Considerations

The following does not reflect a production ready setup but is a good quick-start to get going with Camunda on AWS EKS.

For the simplicity of this guide we'll be using non best practices but refer to further documents to allow you to delve deeper into the topic.

## Outcome

Following this guide will result in

- an AWS EKS Kubernetes Cluster with 4 nodes and the possibility to scale up further.
- the [EBS CSI driver](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html) is installed and configured.
- a [managed PostgreSQL](https://aws.amazon.com/rds/postgresql/) instance is spawned that will be used by the Camunda applications.

This basic cluster setup is required to continue with the Helm setup as described in our [AWS Helm Guide](#). <!-- TODO: reference future guide -->

## Usage

The eksctl tool allows creating clusters via a single command but this doesn't support all configuration options. Therefore, we're supplying a `yaml` file that can be used with the CLI to create the cluster preconfigured with various settings.

### Eksctl Prerequisites

Setup authentication to allow interacting with `AWS` via the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) to configure access.

General advice, the user creating the resources will be the owner of those and always linked to those. Meaning the user will always have admin access on Kubernetes, except you delete it. Therefore, it can make sense to create an extra [IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) that's solely used for the EKSCTL purposes.

<!--
```shell
eksctl create cluster --name test-cluster --region eu-central-1 --with-oidc --version 1.28 --nodegroup-name services --instance-types m5.xlarge --nodes 4 --nodes-min 1 --nodes-max 10 --node-private-networking --disable-pod-imds --vpc-cidr 10.192.0.0/16 --vpc-nat-mode HighlyAvailable --dry-run
```
-->

### Eksctl Cluster yaml

The following `yaml` has to be copied to a file on your system and can be executed with.

```shell
eksctl create cluster --config-file cluster.yaml
```

Where `cluster.yaml` contains the following contents.
Before applying, please adjust the `<region>` and `<zone>` and rename the cluster name with the placeholder `<clusterName>` to your liking.

```yaml
apiVersion: eksctl.io/v1alpha5
availabilityZones:
  - <zone>c # e.g. eu-central-1c
  - <zone>b
  - <zone>a
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
  - name: aws-ebs-csi-driver # automatically configures irsa
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
    desiredCapacity: 4
    disableIMDSv1: true
    disablePodIMDS: true
    instanceSelector: {}
    instanceTypes:
      - m5.xlarge
    labels:
      alpha.eksctl.io/cluster-name: <clusterName>
      alpha.eksctl.io/nodegroup-name: services
    maxSize: 10
    minSize: 1
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
metadata:
  name: <clusterName> # e.g. eu-central-1
  region: <region>
  version: "1.28"
privateCluster:
  enabled: false
  skipEndpointCreation: false
vpc:
  autoAllocateIPv6: false
  cidr: 10.192.0.0/16
  clusterEndpoints:
    privateAccess: false
    publicAccess: true
  manageSharedNodeSecurityGroupRules: true
  nat:
    gateway: HighlyAvailable
```

### Kubernetes Secret Encryption

The following will enable [envelope encryption](https://aws.amazon.com/about-aws/whats-new/2020/03/amazon-eks-adds-envelope-encryption-for-secrets-with-aws-kms/) to add another layer of protection to your Kubernetes secrets.

1. Create AWS KMS Key via the aws-cli. For additional settings conduct the [documentation](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/kms/create-key.html)

```shell
aws kms create-key \
    --description "Kubernetes Encryption Key"
```

2. Copy the `arn` from the Output
3. Use eksctl to enable secret encryption

```shell
eksctl utils enable-secrets-encryption --cluster=<clusterName> --key-arn=<arnKey> --region=<region>
```

For more information conduct the [eksctl documentation](https://eksctl.io/usage/kms-encryption/).

### IAM Access management

The default access is that the user creating the EKS cluster has admin access. To allow others to access as well, we have to adjust the
`aws-auth` configmap. This can either be done manually via `kubectl` or alternatively via `eksctl`.

#### eksctl

For `eksctl` you can create an iam user to Kubernetes role mapping via the following command.

```shell
 eksctl create iamidentitymapping --cluster  <clusterName> --region=<region> --arn arn:aws:iam::123456:role/testing --group system:masters --username admin
```

Where `arn` is the `arn` of your user or the role. The `group` is the Kubernetes rule, where `system:masters` is equivalent to an admin role. Lastly `username` is either the username itself or the role name, which is used for logs.

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
   - Or CLI - `aws ec2 describe-vpcs` and look for the VPC that contains the tag
   ```yaml
   {
       "Key": "alpha.eksctl.io/cluster-name",
       "Value": "<clusterName>"
   },
   ```
2. Copy the `vpcId` to use for the next step
3. Create security group within the VPC for the aurora postgres connection

```shell
aws ec2 create-security-group \
  --group-name aurora-postgres-sg \
  --description "Security Group to allow the k8s cluster to connect to aurora postgres" \
  --vpc-id <vpcId>
```

4. Copy the resulting output of the `groupId`
5. Create security ingress rule to allow access to postgres

```shell
aws ec2 authorize-security-group-ingress \
  --group-id <groupId \
  --protocol tcp \
  --port 5432 \
  --cidr 10.192.0.0/16
```

5. Create db subnet group to associate RDS with within the existing VPC

```shell
aws rds create-db-subnet-group \
    --db-subnet-group-name camunda-postgres \
    --db-subnet-group-description "Subnet for Camunda Postgres" \
    --subnet-ids subnet-0659823f3a8fa383c subnet-0f435ed77e62a13be subnet-06de5f9aa67849b1c
```

6. Create RDS cluster within private subnet of the VPC. More configuration options can be found in the [AWS documentation](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/rds/create-db-cluster.html).

```shell
aws rds create-db-cluster \
    --db-cluster-identifier <dbCluster> \
    --engine aurora-postgresql \
    --engine-version 15.2 \
    --master-username <username> \
    --master-user-password <password> \
    --vpc-security-group-ids sg-004e773e9ac8369a9 \
    --availability-zones <zones> \ # eu-central-1a eu-central-1b
    --database-name <dbName> \
    --db-subnet-group-name camunda-postgres
```

7. Wait for RDS cluster to be ready

```shell
aws rds wait db-cluster-available \
    --db-cluster-identifier <dbCluster>
```

8. Create database instance within the cluster. More configuration options can be found in the [AWS documentation](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/rds/create-db-instance.html).

```shell
aws rds create-db-instance \
    --db-instance-identifier <dbInstance> \
    --db-cluster-identifier <dbCluster> \
    --engine aurora-postgresql \
    --engine-version 15.2 \
    --no-publicly-accessible \
    --db-instance-class db.t3.medium
```

9. Wait for instance to be ready

```shell
aws rds wait db-instance-available \
    --db-instance-identifier test-instance
```

### Connection debugging

1. Create Kubernetes pod to check the in-cluster access

```shell
kubectl run ubuntu --rm -i --tty --image ubuntu -- bash
```

2. Install required dependencies
   Install

```shell
apt update && apt install -y postgresql-client
```

3. Connect to Postgresql DB

```shell
psql \
  --host=<dbHost> \
  --username=<username> \
  --port=5432 \
  --dbname=postgres
```
