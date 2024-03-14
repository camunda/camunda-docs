---
id: dual-region
title: "Dual-region setup"
description: "Deploy two Amazon Kubernetes (EKS) clusters with Terraform for a peered setup allowing dual-region communication."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import CoreDNSKubeDNS from "./assets/core-dns-kube-dns.svg"

:::warning
Review our [dual-region concept documentation](#) <!-- TOOD: link reference --> before continuing to understand the current limitations and restrictions of this setup, as well as the disclaimer concerning support from Camunda.
:::

This guide offers a detailed tutorial for deploying two Amazon Web Services (AWS) Elastic Kubernetes Service (EKS) clusters, tailored explicitly for deploying Camunda 8 and using Terraform, a popular Infrastructure as Code (IaC) tool.

:::note
This guide requires you to have previously completed or reviewed the steps taken in [deploying an EKS cluster with Terraform](./terraform-setup.md). If you have no experience with Terraform and Amazon EKS, review this content for the essentials of setting up an Amazon EKS cluster and configuring AWS IAM permissions. This content explains the process of using Terraform with AWS, making it accessible even to those new to Terraform or IaC concepts.
:::

## Prerequisites

- An [AWS account](https://docs.aws.amazon.com/accounts/latest/reference/accounts-welcome.html) to create resources within AWS.
- [Terraform (1.7.x)](https://developer.hashicorp.com/terraform/downloads)
- [Kubectl (1.28.x)](https://kubernetes.io/docs/tasks/tools/#kubectl) to interact with the cluster.

## Considerations

This setup provides an essential foundation for setting up Camunda 8 in a dual-region setup. Though it's not tailored for optimal performance, it's a good initial step for preparing a production environment by incorporating [IaC tooling](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/infrastructure-as-code).

To try out Camunda 8 or develop against it, consider signing up for our [SaaS offering](https://camunda.com/platform/). If you already have two Amazon EKS clusters (peered together) and an S3 bucket, consider skipping to [deploy Camunda 8 to the clusters](#deploy-camunda-8-to-the-clusters).

For the simplicity of this guide, certain best practices will be provided with links to additional resources, enabling you to explore the topic in more detail.

:::warning
Following this guide will incur costs on your Cloud provider account, namely for the managed Kubernetes service, running Kubernetes nodes in EC2, Elastic Block Storage (EBS), traffic between regions, and S3. More information can be found on [AWS](https://aws.amazon.com/eks/pricing/) and their [pricing calculator](https://calculator.aws/#/) as the total cost varies per region.
:::

## Outcome

Completion of this tutorial will result in:

- Two Amazon EKS Kubernetes clusters in two different geographic regions with each four nodes ready for the Camunda 8 dual-region installation.
- The [EBS CSI driver](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html) installed and configured, which is used by the Camunda 8 Helm chart to create [persistent volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).
- A [VPC peering](https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html) between the two EKS clusters, allowing cross-cluster communication between different regions.
- An [Amazon Simple Storage Service](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) (S3) bucket for [Elasticsearch backups](https://www.elastic.co/guide/en/elasticsearch/reference/current/repository-s3.html).

## Environment Prerequisites

There are two regions (`REGION_0` and `REGION_1`), each with its own Kubernetes cluster (`CLUSTER_0` and `CLUSTER_1`).

To streamline the execution of the subsequent commands, it is recommended to export multiple environment variables within your terminal.

The following are the required environment variables with some example values:

Please adjust these environment variable values to your needs when exporting those within your terminal.

```bash
# The AWS regions of your Kubernetes cluster 0 and 1
export REGION_0=eu-west-2
export REGION_1=eu-west-3

# The names of your Kubernetes clusters in regions 0 and 1
# default based on the tutorial is the following
export CLUSTER_0=cluster-london
export CLUSTER_1=cluster-paris

# The Kubernetes namespaces for each region where Camunda 8 should be running and the failover namespaces
# Namespace names must be unique to route the traffic
export CAMUNDA_NAMESPACE_0=camunda-london
export CAMUNDA_NAMESPACE_0_FAILOVER=camunda-london-failover
export CAMUNDA_NAMESPACE_1=camunda-paris
export CAMUNDA_NAMESPACE_1_FAILOVER=camunda-paris-failover
```

## Installing Amazon EKS clusters with Terraform

<!-- TODO: Adjust branches / path references -->

### Prerequisites

1. Git clone or fork the repository [c8-multi-region](https://github.com/camunda/c8-multi-region)

```bash
git clone https://github.com/camunda/c8-multi-region.git
```

2. Navigate to `test/resources/aws/2-region/terraform`. This contains the Terraform base configuration for the dual-region setup.

### Contents elaboration

#### config.tf

This file contains the [backend](https://developer.hashicorp.com/terraform/language/settings/backends/configuration) and [provider](https://developer.hashicorp.com/terraform/language/providers/configuration) configuration.

Meaning where to store the [Terraform state](https://developer.hashicorp.com/terraform/language/state) and which providers to use, their versions, and potential credentials.

The important part of `config.tf` is the initialization of two AWS providers, as you need one per region and this is a limitation by AWS given everything is scoped to a region.

:::note

It's recommended to use a different backend than `local`. Find more information in the [Terraform documentation](https://developer.hashicorp.com/terraform/language/settings/backends/configuration).

:::

:::warning

Do not store sensitive information (credentials) in your Terraform files.

:::

#### clusters.tf

This file is using [Terraform modules](https://developer.hashicorp.com/terraform/language/modules), which allows abstracting resources into reusable components.

The [Camunda provided module](https://github.com/camunda/camunda-tf-eks-module) is publicly available. It's advisable to review this module before usage.

There are various other input options to customize the cluster setup further. See the [module documentation](https://github.com/camunda/camunda-tf-eks-module) for additional details.

It contains the declaration of the two clusters. One of them has an explicit provider declaration as otherwise everything is deployed to the default AWS provider, which is limited to a single region.

#### vpc-peering.tf

For a multi-region setup, you need to have the [virtual private cloud (VPC)](https://aws.amazon.com/vpc/) peered to route traffic between them using private IPv4 addresses and not publicly route the traffic and expose it. For more information, review the [AWS documentation on VPC peering](https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html).

VPC peering is preferred over [transit gateways](https://aws.amazon.com/transit-gateway/). VPC peering has no bandwidth limit and a lower latency than a transit gateway. For a complete comparison, review the [AWS documentation](https://docs.aws.amazon.com/whitepapers/latest/building-scalable-secure-multi-vpc-network-infrastructure/transit-vpc-solution.html#peering-vs).

The previously mentioned [Camunda module](https://github.com/camunda/camunda-tf-eks-module) will automatically create a VPC per cluster.

This file covers the VPC peering between the two VPCs and allow any traffic between those two by adjusting each cluster's security groups.

#### s3.tf

For Elasticsearch, an S3 bucket is required to allow [creating and restoring snapshots](https://www.elastic.co/guide/en/elasticsearch/reference/current/repository-s3.html). There are [alternative ways](https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshot-restore.html) but since this is focused on AWS, it makes sense to remain within the same cloud environment.

This file covers the declaration of an S3 bucket to use for the backups. Additionally, a service account with access to use within the Kubernetes cluster to configure Elasticsearch to access the S3 bucket.

#### output.tf

[Terraform outputs](https://developer.hashicorp.com/terraform/language/values/outputs) allow you to reuse generated values in future steps. For example, the access keys of the service account with S3 access.

#### variables.tf

This file contains various variable definitions for both [local](https://developer.hashicorp.com/terraform/language/values/locals) and [input](https://developer.hashicorp.com/terraform/language/values/variables) types. The difference is that input variables require you to define the value on execution. While local variables are permanently defined, they are namely for code duplication purposes and readability.

### Preparation

1. Adjust any values in the `variables.tf` to your liking. For example, the target regions and their name or CIDR blocks of each cluster.
2. Make sure that any adjustments are reflected in your [environment prerequisites](#environment-prerequisites) to ease the [in-cluster setup](#in-cluster-setup).
3. Set up the authentication for the `AWS` provider.

:::note

The [AWS Terraform provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) is required to create resources in AWS. You must configure the provider with the proper credentials before using it. You can further change the region and other preferences and explore different [authentication](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#authentication-and-configuration) methods.

There are several ways to authenticate the `AWS` provider.

- (Recommended) Use the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) to configure access. Terraform will automatically default to AWS CLI configuration when present.
- Set environment variables `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`, which can be retrieved from the [AWS Console](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).

:::

### Execution

:::warning

A user who creates resources in AWS, will be their owner. In this particular case, the user will always have admin access to the Kubernetes cluster until the cluster is deleted.

Therefore, it can make sense to create an extra [AWS IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) which credentials are used for Terraform purposes.

:::

1. Open a terminal and navigate to `test/resources/aws/2-region/terraform`.
2. Initialize the working directory:

```hcl
terraform init -upgrade
```

3. Apply the configuration files:

```hcl
terraform apply
```

If you have not set a default value for `cluster_name`, you will be asked to provide a suitable name.

4. After reviewing the plan, you can type `yes` to confirm and apply the changes.

At this point, Terraform will create the Amazon EKS clusters with all the necessary configurations. The completion of this process may require approximately 20-30 minutes.

## In-cluster setup

Now that you have created two Kubernetes clusters with Terraform, you will still have to configure various things to make the dual-region work.

<Tabs queryString="cluster-setup">
<TabItem value="cluster-access" label="Cluster access" default>

To ease working with two clusters, create or update your local `kubeconfig` to contain those new contexts. Using an alias for those new clusters allows you to directly use kubectl and Helm with a particular cluster.

Update or create your kubeconfig via the [AWS CLI](https://docs.aws.amazon.com/eks/latest/userguide/create-kubeconfig.html):

```bash
# the alias allows for easier context switching in kubectl
aws eks --region $REGION_0 update-kubeconfig --name $CLUSTER_0 --alias $CLUSTER_0
aws eks --region $REGION_1 update-kubeconfig --name $CLUSTER_1 --alias $CLUSTER_1
```

The region and name must align with the values you have defined in Terraform.

</TabItem>
<TabItem value="dns-chaining" label="DNS chaining">

This allows for easier communication between the two clusters by forwarding DNS queries from the region 0 cluster to the region 1 cluster and vice versa.

<CoreDNSKubeDNS />

You are configuring the CoreDNS from the cluster in **Region 0** to resolve certain namespaces via **Region 1** instead of using the in-cluster DNS server. Camunda applications (e.g. Zeebe brokers) to resolve DNS record names of Camunda applications running in another cluster.

#### Internal load-balancer

1. Expose `kube-dns`, the in-cluster DNS resolver via an internal load-balancer in each cluster.

```bash
kubectl --context $CLUSTER_0 apply -f https://github.com/camunda/c8-multi-region/blob/aws-operational/test/resources/aws/2-region/kubernetes/internal-dns-lb.yml
kubectl --context $CLUSTER_1 apply -f https://github.com/camunda/c8-multi-region/blob/aws-operational/test/resources/aws/2-region/kubernetes/internal-dns-lb.yml
```

2. Retrieve the hostnames of the load-balancer and get their internal IP addresses.

```bash
# will be executed in CLUSTER_0
HOST_0=$(kubectl --context $CLUSTER_0 -n kube-system get svc across-cluster-dns-tcp -o jsonpath="{.status.loadBalancer.ingress[0].hostname}" | cut -d - -f 1)

# will be executed in CLUSTER_1
HOST_1=$(kubectl --context $CLUSTER_1 -n kube-system get svc across-cluster-dns-tcp -o jsonpath="{.status.loadBalancer.ingress[0].hostname}" | cut -d - -f 1)
```

Run the following command to print the IP addresses of the internal load balancers in each cluster, which you will use to configure the other cluster for DNS resolving:

```bash
# gives you the IPs from region REGION_0 that need to be used in the following steps to configure REGION_1
aws ec2 describe-network-interfaces --region $REGION_0 --filters Name=description,Values="ELB net/${HOST_0}*" --query  'NetworkInterfaces[*].PrivateIpAddress' --output text
# Output example
# 10.190.114.39   10.190.172.21   10.190.134.196

# gives you the IPs from region REGION_1 that need to be used in the following steps to configure REGION_0
aws ec2 describe-network-interfaces --region $REGION_1 --filters Name=description,Values="ELB net/${HOST_1}*" --query  'NetworkInterfaces[*].PrivateIpAddress' --output text
# Output example
# 10.202.30.193   10.202.46.72   10.202.65.75
```

#### CoreDNS configuration

In the next part, you will configure CoreDNS to forward DNS queries for specific namespaces to the other cluster.

:::warning

You have to choose unique namespaces for Camunda 8 installations. The namespace for Camunda 8 installation in the cluster of region 0 (`CAMUNDA_NAMESPACE_0`), needs to have a different name from the namespace for Camunda 8 installation in the cluster of region 1 (`CAMUNDA_NAMESPACE_1`). This is required for proper traffic routing between the clusters.

:::

For example, you can install Camunda 8 into the `CAMUNDA_NAMESPACE_0` namespace in the `CLUSTER_0` cluster, and `CAMUNDA_NAMESPACE_1` namespace on the `CLUSTER_1` cluster, where `CAMUNDA_NAMESPACE_0` != `CAMUNDA_NAMESPACE_1`.
Using the same namespace names on both clusters won't work as CoreDNS won't be able to distinguish between traffic targeted at the local and remote cluster.

In addition to namespaces for Camunda installations, you need to create the namespaces for failover (`CAMUNDA_NAMESPACE_0_FAILOVER` in `CLUSTER_0` and `CAMUNDA_NAMESPACE_1_FAILOVER` in `CLUSTER_1`), for the case of a total region loss. This is for completeness, so you don't forget to add the mapping on region recovery. The operational procedure is handled in a different [document](#). <!-- TODO: add reference -->

1. Configure CoreDNS to send requests for certain namespaces to the remote DNS resolver.

```bash
kubectl --context $CLUSTER_0 edit -n kube-system configmap coredns
```

At the bottom of the `Corefile`, add the namespace mapping to the remote DNS resolver:

<!-- yaml is always reformated wrongly -->

:::info
Make sure to change the namespaces `CAMUNDA_NAMESPACE_1` and `CAMUNDA_NAMESPACE_1_FAILOVER` according to your chosen namespaces. Additionally, make sure to change the IP addresses to the ones you've previously retrieved via the AWS CLI.

The following are just example values and will not work in your setup!
:::

```bash
# Example based on our chosen values
# You are configuring the CoreDNS of the CLUSTER_0 cluster to redirect
# any DNS requests for CAMUNDA_NAMESPACE_1 to the CLUSTER_1 cluster
camunda-paris.svc.cluster.local:53 {
  errors
  cache 30
  forward . 10.202.30.193 10.202.46.72 10.202.65.75 {
    force_tcp
  }
}
camunda-paris-failover.svc.cluster.local:53 {
  errors
  cache 30
  forward . 10.202.30.193 10.202.46.72 10.202.65.75 {
    force_tcp
  }
}
```

<details>
  <summary>Full example</summary>
  <summary>

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  labels:
    eks.amazonaws.com/component: coredns
    k8s-app: kube-dns
  name: coredns
  namespace: kube-system
data:
  Corefile: |
    .:53 {
        errors
        health {
            lameduck 5s
          }
        ready
        kubernetes cluster.local in-addr.arpa ip6.arpa {
          pods insecure
          fallthrough in-addr.arpa ip6.arpa
        }
        prometheus :9153
        forward . /etc/resolv.conf
        cache 30
        loop
        reload
        loadbalance
    }
    camunda-paris.svc.cluster.local:53 {
        errors
        cache 30
        forward . 10.202.30.193 10.202.46.72 10.202.65.75 {
            force_tcp
        }
    }
    camunda-paris-failover.svc.cluster.local:53 {
        errors
        cache 30
        forward . 10.202.30.193 10.202.46.72 10.202.65.75 {
            force_tcp
        }
    }
```

  </summary>
</details>

2. Repeat **Step 1** for the `CLUSTER_1` cluster to configure the CoreDNS of `CLUSTER_1` to redirect any DNS requests to the `CLUSTER_0` DNS resolver for your chosen namespace `CAMUNDA_NAMESPACE_0`.

3. Check that CoreDNS has reloaded for the changes to take effect before continuing. Make sure it contains `Reloading complete`:

```bash
kubectl --context $CLUSTER_0 logs -f deployment/coredns -n kube-system
kubectl --context $CLUSTER_1 logs -f deployment/coredns -n kube-system
```

</TabItem>
<TabItem value="test-dns-chaining" label="Test DNS chaining">

A setup to test that the DNS chaining is working by using nginx pods and services to ping each other.

1. Deploy the following nginx pod and service to each Kubernetes cluster within the `CAMUNDA_NAMESPACE_0` and `CAMUNDA_NAMESPACE_1` namespaces:

```bash
kubectl --context $CLUSTER_0 apply -f https://github.com/camunda/c8-multi-region/blob/main/test/resources/aws/2-region/kubernetes/nginx.yml -n $CAMUNDA_NAMESPACE_0
kubectl --context $CLUSTER_1 apply -f https://github.com/camunda/c8-multi-region/blob/main/test/resources/aws/2-region/kubernetes/nginx.yml -n $CAMUNDA_NAMESPACE_1
```

2. Try to `curl` each other from within the other pod:

```bash
kubectl --context $CLUSTER_0 exec -n $CAMUNDA_NAMESPACE_0 -it sample-nginx -- curl http://sample-nginx.sample-nginx-peer.$CAMUNDA_NAMESPACE_0.svc.cluster.local

kubectl --context $CLUSTER_1 exec -n $CAMUNDA_NAMESPACE_1 -it sample-nginx -- curl http://sample-nginx.sample-nginx-peer.$CAMUNDA_NAMESPACE_1.svc.cluster.local
```

3. After a successful retrieval of the remote nginx start page, you can remove this temporary setup.

```bash
kubectl --context $CLUSTER_0 delete -f https://github.com/camunda/c8-multi-region/blob/main/test/resources/aws/2-region/kubernetes/nginx.yml -n $CAMUNDA_NAMESPACE_0
kubectl --context $CLUSTER_1 delete -f https://github.com/camunda/c8-multi-region/blob/main/test/resources/aws/2-region/kubernetes/nginx.yml -n $CAMUNDA_NAMESPACE_1
```

</TabItem>
</Tabs>

## Deploy Camunda 8 to the clusters

<Tabs queryString="deploy">
<TabItem value="elastic-secret" label="Create the secret for Elasticsearch">

Elasticsearch will need an S3 bucket for data backup and restore procedure, required during a regional failover. For this, you will need to configure a Kubernetes secret to not expose those in cleartext:

You can pull the data from Terraform since you exposed those via the `output.tf`.

1. From the Terraform code location `test/resources/aws/2-region/terraform`, execute the following to export the access keys to environment variables. This will allow an easier creation of the Kubernetes secret via the command line:

```bash
export ACCESS_KEY=$(terraform output -raw s3_aws_access_key_id)
export SECRET_ACCESS_KEY=$(terraform output -raw s3_aws_secret_access_key)
```

2. Pre-create the Camunda namespaces in each cluster. This is required to have the secrets available for Elasticsearch before installing the Helm chart.

```bash
kubectl --context $CLUSTER_0 create namespace $CAMUNDA_NAMESPACE_0
kubectl --context $CLUSTER_0 create namespace $CAMUNDA_NAMESPACE_0_FAILOVER

kubectl --context $CLUSTER_1 create namespace $CAMUNDA_NAMESPACE_1
kubectl --context $CLUSTER_1 create namespace $CAMUNDA_NAMESPACE_1_FAILOVER
```

3. Create the Kubernetes secrets in each of the clusters, where Camunda will be installed, including those of the failover

```bash
kubectl --context $CLUSTER_0 -n $CAMUNDA_NAMESPACE_0 create secret generic elasticsearch-env-secret \
    --from-literal=S3_ACCESS_KEY=$ACCESS_KEY \
    --from-literal=S3_SECRET_KEY=$SECRET_ACCESS_KEY

kubectl --context $CLUSTER_0 -n $CAMUNDA_NAMESPACE_0_FAILOVER create secret generic elasticsearch-env-secret \
    --from-literal=S3_ACCESS_KEY=$ACCESS_KEY \
    --from-literal=S3_SECRET_KEY=$SECRET_ACCESS_KEY

kubectl --context $CLUSTER_1 -n $CAMUNDA_NAMESPACE_1 create secret generic elasticsearch-env-secret \
    --from-literal=S3_ACCESS_KEY=$ACCESS_KEY \
    --from-literal=S3_SECRET_KEY=$SECRET_ACCESS_KEY

kubectl --context $CLUSTER_1 -n $CAMUNDA_NAMESPACE_1_FAILOVER create secret generic elasticsearch-env-secret \
    --from-literal=S3_ACCESS_KEY=$ACCESS_KEY \
    --from-literal=S3_SECRET_KEY=$SECRET_ACCESS_KEY
```

3. Unset environment variables to reduce the risk of potential exposure.

```bash
unset ACCESS_KEY
unset SECRET_ACCESS_KEY
```

</TabItem>
<TabItem value="helm-chart" label="Camunda 8 Helm chart prerequisites">

1. Within the cloned repository, navigate to `test/resources/aws/2-region/kubernetes`. This contains a dual-region example setup.

#### Content Elaboration

Our approach is to work with layered helm values files:

- have a base `camunda-values.yml` that is generally applicable for both Camunda installations
- two overlays that are for region 0 and region 1 installations

##### camunda-values.yml

This forms the base layer that contains the basic required setup, which is applicable to both regions.

:::note
Note the `global.multiregion.regions` directive indicates the use for two regions. Disable Identity and Optimize as these are currently not supported within this setup and will break when enabled. Please see the [limitations section](#) <!-- TODO: fill link -->.
:::

##### region0/camunda-values.yml

This overlay contains the multi region identification for the cluster in region 0.

##### region1/camunda-values.yml

This overlay contains the multi region identification for the cluster in region 1.

#### Preparation

The base `camunda-values.yml` requires some adjustments before installing the Helm chart.

1. Adjust the `placeholder` for `ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS` to reflect your current setup. These are the contact points for the brokers to know how to form the cluster. Find more information on what the variable means in [setting up a cluster](../../../../zeebe-deployment/operations/setting-up-a-cluster.md).

**Use the python script in the root of the repository `generate_zeebe_initial_contact.py` to generate the replacement string.**

```bash
python3 generate_zeebe_initial_contact.py

# It will ask you to provide the following values
# Enter a namespace for cluster in region 0:
## in our case camunda-london
# Enter a namespace for cluster in region 1:
## in our case camunda-paris
# Enter Helm release name:
## the way you'll call the Helm release, for example camunda
# Enter Zeebe cluster size:
## for a dual-region setup we recommend 8
```

The following example is just for illustration purposes and won't work in your setup!
Based on the generated script output, the `placeholder` is replaced with the following:

```yaml
camunda-zeebe-0.camunda-zeebe.camunda-london.svc.cluster.local:26502,camunda-zeebe-1.camunda-zeebe.camunda-london.svc.cluster.local:26502,camunda-zeebe-2.camunda-zeebe.camunda-london.svc.cluster.local:26502,camunda-zeebe-3.camunda-zeebe.camunda-london.svc.cluster.local:26502,camunda-zeebe-0.camunda-zeebe.camunda-paris.svc.cluster.local:26502,camunda-zeebe-1.camunda-zeebe.camunda-paris.svc.cluster.local:26502,camunda-zeebe-2.camunda-zeebe.camunda-paris.svc.cluster.local:26502,camunda-zeebe-3.camunda-zeebe.camunda-paris.svc.cluster.local:26502
```

The Zeebe cluster size is eight in a dual-region setup, resulting in four brokers per region.

2. In case the Helm release name differs from `camunda` and your chosen namespaces differ from those in the [environment prerequisites](#environment-prerequisites), you must adjust the `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_URL` and `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION1_ARGS_URL` values within the base `camunda-values.yml`

They are constructed as follows:

```bash
http://${HELM_RELASE_NAME}-elasticsearch-master-hl.${CAMUNDA_NAMESPACE}.svc.cluster.local:9200
# Where HELM_RELEASE_NAME is your chosen helm release name
# Where CAMUNDA_NAMESPACE is your previously defined CAMUNDA_NAMESPACE_0 and CAMUNDA_NAMESPACE_1
# Where ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_URL requires you to use CAMUNDA_NAMESPACE_0
# Where ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION1_ARGS_URL requires you to use CAMUNDA_NAMESPACE_1
```

Example illustration based on our values defined in [environment prerequisites](#environment-prerequisites) and the Helm chart release name `camunda`:

```bash
- name: ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_URL
  value: http://camunda-elasticsearch-master-hl.camunda-london.svc.cluster.local:9200
- name: ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION1_ARGS_URL
  value: http://camunda-elasticsearch-master-hl.camunda-paris.svc.cluster.local:9200
```

</TabItem>
<TabItem value="deploy" label="Deploy Camunda 8">

The last step is to deploy Camunda 8 to both Kubernetes clusters `CLUSTER_0` and `CLUSTER_1`. As mentioned, you may choose a different Helm release name than `camunda` and should ensure that the following values have been adjusted in your base `camunda-values.yml`:

- `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_URL`
- `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION1_ARGS_URL`
- `ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS`

If you've followed every step until now, those should have been adjusted by you already. If not, please have a look at the [preparation step](#preparation) again. <!-- TODO: fix link as in tab setup doesn't work -->

1. From the terminal context of `test/resources/aws/2-region/kubernetes` execute

```bash
helm install camunda camunda/camunda-platform \
  --version 9.3.0 \
  --kube-context $CLUSTER_0 \
  --namespace $CAMUNDA_NAMESPACE_0 \
  -f camunda-values.yml \
  -f region0/values.yml

helm install camunda camunda/camunda-platform \
  --version 9.3.0 \
  --kube-context $CLUSTER_1 \
  --namespace $CAMUNDA_NAMESPACE_1 \
  -f camunda-values.yml \
  -f region1/values.yml
```

</TabItem>
</Tabs>
