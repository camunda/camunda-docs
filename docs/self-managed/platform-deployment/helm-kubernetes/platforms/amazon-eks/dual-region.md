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

- Two Amazon EKS Kubernetes clusters in two different geographic regions with each four nodes ready for the Camunda 8 installation.
- The [EBS CSI driver](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html) installed and configured, which is used by the Camunda 8 Helm chart to create [persistent volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).
- A [VPC peering](https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html) between the two EKS clusters, allowing cross-cluster communication between different regions.
- An [Amazon Simple Storage Service](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) (S3) bucket for [Elasticsearch backups](https://www.elastic.co/guide/en/elasticsearch/reference/current/repository-s3.html).

## Environment prerequisites

To streamline the execution of the subsequent commands, it is recommended to export multiple environment variables.

The following are the required environment variables with some example values:

Feel free to adjust the region and cluster names to your needs.

```bash
# The AWS regions of your cluster 0 and 1
export REGION_0=eu-west-2
export REGION_1=eu-west-3

# The cluster_name of your cluster 0 and 1
# default based on the tutorial is the following
export CLUSTER_0=cluster-london
export CLUSTER_1=cluster-paris

# The namespaces for each region where Camunda 8 should be running and the failover namespaces
export CAMUNDA_NAMESPACE_0=camunda-london
export CAMUNDA_NAMESPACE_0_FAILOVER=camunda-london-failover
export CAMUNDA_NAMESPACE_1=camunda-paris
export CAMUNDA_NAMESPACE_1_FAILOVER=camunda-paris-failover
```

## Installing Amazon EKS clusters with Terraform

<Tabs queryString="tf-installation">
<TabItem value="terraform-prerequsites" label="Terraform prerequsites" default>

1. Create an empty folder to place your Terraform files in.
2. Create a `config.tf` with the following setup:

<details>
  <summary>config.tf</summary>
  <summary>

```hcl reference title="config.tf"
https://github.com/camunda/c8-multi-region/blob/aws-operational/test/resources/aws/2-region/terraform/config.tf
```

  </summary>
</details>

The important part of `config.tf` is the initialization of two AWS providers, as you need one per region and this is a limitation by AWS given everything is scoped to a region.

Set up the authentication for the `AWS` provider. In the example, an AWS profile is used and provided as a Terraform variable that is defined on execution.

:::note

It's recommended to use a different backend than `local`. Find more information in the [Terraform documentation](https://developer.hashicorp.com/terraform/language/settings/backends/configuration).

:::

:::note

The [AWS Terraform provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) is required to create resources in AWS. You must configure the provider with the proper credentials before using it. You can further change the region and other preferences and explore different [authentication](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#authentication-and-configuration) methods.

There are several ways to authenticate the `AWS` provider.

- (Recommended) Use the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) to configure access. Terraform will automatically default to AWS CLI configuration when present.
- Set environment variables `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`, which can be retrieved from the [AWS Console](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).

:::

:::warning

Do not store sensitive information (credentials) in your Terraform files.

:::

:::warning

A user who creates resources in AWS, will be their owner. In this particular case, the user will always have admin access to the Kubernetes cluster until the cluster is deleted.

Therefore, it can make sense to create an extra [AWS IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) which credentials are used for Terraform purposes.

:::

</TabItem>
<TabItem value="cluster-module" label="Cluster module">

This module creates the basic layout that configures AWS access and Terraform.

The following will use [Terraform modules](https://developer.hashicorp.com/terraform/language/modules), which allows abstracting resources into reusable components.

The [Camunda provided module](https://github.com/camunda/camunda-tf-eks-module) is publicly available. It's advisable to review this module before usage.

1. In the folder where your `config.tf` resides, create a file called `cluster.tf`.
2. Paste the following content into the created `cluster.tf` file to make use of the provided module:

<details>
  <summary>cluster.tf</summary>
  <summary>

```hcl reference title="cluster.tf"
https://github.com/camunda/c8-multi-region/blob/aws-operational/test/resources/aws/2-region/terraform/clusters.tf
```

  </summary>
</details>

There are various other input options to customize the cluster setup further. See the [module documentation](https://github.com/camunda/camunda-tf-eks-module) for additional details.

It is important to define the provider for the remote cluster. Otherwise, Terraform will fall back to the default AWS provider and create everything within the same region.

3. Create a file called `variables.tf` within the same folder.
4. Paste the following content into the created `variables.tf` file to define the required variables. You may set [a default value](https://developer.hashicorp.com/terraform/language/values/variables#default-values) for successive runs to not have to always define those variables on execution. Additionally, you may remove the `aws_profile` if you provide the AWS access differently:

```hcl reference title="variables.tf"
https://github.com/camunda/c8-multi-region/blob/aws-operational/test/resources/aws/2-region/terraform/variables.tf
```

5. The naming of owner and acceptor stems from the VPC peering. However, we will examine this more closely in this tutorial. You may adjust the local values to fit your configuration. For example, different region or CIDR blocks.

</TabItem>
<TabItem value="vpc-peering" label="VPC peering">

For a multi-region setup, you need to have the [virtual private cloud (VPC)](https://aws.amazon.com/vpc/) peered to route traffic between them using private IPv4 addresses and not publicly route the traffic and expose it. For more information, review the [AWS documentation on VPC peering](https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html).

VPC peering is preferred over [transit gateways](https://aws.amazon.com/transit-gateway/). VPC peering has no bandwidth limit and a lower latency than a transit gateway. For a complete comparison, review the [AWS documentation](https://docs.aws.amazon.com/whitepapers/latest/building-scalable-secure-multi-vpc-network-infrastructure/transit-vpc-solution.html#peering-vs).

1. In the folder where your `config.tf` resides, create an additional `vpc-peering.tf` file.
2. Paste the following content into the created `vpc-peering.tf` file to peer your created clusters:

<details>
  <summary>vpc-peering.tf</summary>
  <summary>

```hcl reference title="vpc-peering.tf"
https://github.com/camunda/c8-multi-region/blob/main/test/resources/aws/2-region/terraform/vpc-peering.tf
```

  </summary>
</details>

This will create a VPC peering between the two VPCs that were previously created as part of the [cluster module](#cluster-module) usage and allow any traffic between those two by adjusting each cluster's security groups.

</TabItem>
<TabItem value="elastic-repository" label="Elasticsearch S3 repository">

For Elasticsearch, an S3 bucket is required to allow [creating and restoring snapshots](https://www.elastic.co/guide/en/elasticsearch/reference/current/repository-s3.html).

1. In the folder where your `config.tf` resides, create an additional `s3.tf` file
2. Paste the following content into the newly created `s3.tf` file to create an S3 bucket and dedicated service account with access policy.

<details>
  <summary>s3.tf</summary>
  <summary>

```hcl reference title="s3.tf"
https://github.com/camunda/c8-multi-region/blob/aws-operational/test/resources/aws/2-region/terraform/s3.tf
```

  </summary>
</details>

The result will be an S3 bucket to use for the backups. Additionally, a service account with access to use within the Kubernetes cluster to configure Elasticsearch to access the S3 bucket.

</TabItem>
<TabItem value="tf-outputs" label="Outputs">

[Terraform outputs](https://developer.hashicorp.com/terraform/language/values/outputs) allow you to reuse generated values in future steps. For example, the access keys of the service account with S3 access.

1. In the folder where your `config.tf` resides, create an additional `output.tf` file.
2. Paste the following content into the newly created `output.tf` file to create Terraform outputs:

```hcl reference title="output.tf"
https://github.com/camunda/c8-multi-region/blob/aws-operational/test/resources/aws/2-region/terraform/output.tf
```

</TabItem>
<TabItem value="tf-execution" label="Execution">

1. Open a terminal in the created Terraform folder where your Terraform files reside.
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

</TabItem>
</Tabs>

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

This allows for easier communication between the two clusters by forwarding DNS queries from the region 1 cluster to the region 2 cluster and vice versa.

<CoreDNSKubeDNS />

You are configuring the CoreDNS from the cluster in **Region 1** to resolve certain namespaces via **Region 2** instead of using the in-cluster DNS server. Camunda applications (e.g. Zeebe brokers) to resolve DNS record names of Camunda applications running in another cluster.

1. Expose `kube-dns`, the in-cluster DNS resolver via an internal load-balancer in each cluster.

```yaml reference title="internal-dns-lb.yml"
https://github.com/camunda/c8-multi-region/blob/aws-operational/test/resources/aws/2-region/kubernetes/internal-dns-lb.yml
```

```bash
kubectl --context $CLUSTER_0 apply -f https://github.com/camunda/c8-multi-region/blob/aws-operational/test/resources/aws/2-region/kubernetes/internal-dns-lb.yml
kubectl --context $CLUSTER_1 apply -f https://github.com/camunda/c8-multi-region/blob/aws-operational/test/resources/aws/2-region/kubernetes/internal-dns-lb.yml
```

2. Retrieve the hostnames of the load-balancer and get their internal IP addresses.

```bash
# execute on cluster-london
HOST1=$(kubectl --context $CLUSTER_0 -n kube-system get svc across-cluster-dns-tcp -o jsonpath="{.status.loadBalancer.ingress[0].hostname}" | cut -d - -f 1)

# execute on cluster-paris
HOST2=$(kubectl --context $CLUSTER_1 -n kube-system get svc across-cluster-dns-tcp -o jsonpath="{.status.loadBalancer.ingress[0].hostname}" | cut -d - -f 1)
```

The following will print the IP addresses of the internal load-balancer in each cluster, which you will use to configure the opposite cluster for DNS resolving:

```bash
# gives you the IPs from region London that need to be configured in Paris
aws ec2 describe-network-interfaces --region $REGION_0 --filters Name=description,Values="ELB net/${HOST1}*" --query  'NetworkInterfaces[*].PrivateIpAddress' --output text
# Output example
# 10.190.114.39   10.190.172.21   10.190.134.196

# gives you the IPs from region Paris that need to be configured in London
aws ec2 describe-network-interfaces --region $REGION_1 --filters Name=description,Values="ELB net/${HOST2}*" --query  'NetworkInterfaces[*].PrivateIpAddress' --output text
# Output example
# 10.202.30.193   10.202.46.72   10.202.65.75
```

Configure CoreDNS to forward DNS queries for specific namespaces to the other cluster.
You have to choose unique namespaces for Camunda 8 installations. The namespace for Camunda 8 installation in the cluster of region 1, needs to have a different name from the namespace for Camunda 8 installation in the cluster of region 2. This is required for proper traffic routing between the clusters.

For example, you can install Camunda 8 into the `camunda-london` namespace in the `cluster-london` cluster, and `camunda-paris` namespace on the `cluster-paris` cluster.
Using the same namespace on both clusters won't work as CoreDNS won't be able to distinguish between traffic targeted at the local and remote cluster.

Besides the main namespaces, add `failover` namespaces, in both clusters, in case of a total region loss. This is for completeness, so you don't forget to add the mapping on region recovery. The operational procedure is handled in a different [document](#). <!-- TOOD: add reference -->

3. Configure CoreDNS with the namespace to DNS resolver mapping:

```bash
kubectl --context $CLUSTER_0 edit -n kube-system configmap coredns
```

And at the bottom of the `Corefile` the namespace mapping to the remote DNS resolver:

<!-- yaml is always reformated wrongly -->

:::info
Make sure to change the namespaces `camunda-paris` and `camunda-paris-failover` according to your chosen namespaces. Additionally, make sure to change the IP addresses to the ones you've previously retrieved via the AWS CLI.

The following are just example values and will not work in your setup!
:::

```bash
# Example - You are configuring the CoreDNS of the london cluster
# to redirect any DNS requests for camunda-paris to the paris cluster
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

4. Repeat **Step 3** for the Paris cluster to configure the CoreDNS of Paris to redirect any DNS requests to the London DNS resolver for your chosen namespace, like `camunda-london`.

5. Check that CoreDNS has reloaded for the changes to take effect before continuing. Make sure it contains `Reloading complete`:

```bash
kubectl --context $CLUSTER_0 logs -f deployment/coredns -n kube-system
kubectl --context $CLUSTER_1 logs -f deployment/coredns -n kube-system
```

</TabItem>
<TabItem value="test-dns-chaining" label="(optional) Test DNS chaining">

A setup to test that the DNS chaining is working by using nginx pods and services to ping each other.

1. Deploy the following nginx pod and service to each cluster within the `camunda-london` and `camunda-paris` namespaces:

```yaml reference title="nginx.yml"
https://github.com/camunda/c8-multi-region/blob/main/test/resources/aws/2-region/kubernetes/nginx.yml
```

```bash
kubectl --context $CLUSTER_0 apply -f https://github.com/camunda/c8-multi-region/blob/main/test/resources/aws/2-region/kubernetes/nginx.yml -n $CAMUNDA_NAMESPACE_0
kubectl --context $CLUSTER_1 apply -f https://github.com/camunda/c8-multi-region/blob/main/test/resources/aws/2-region/kubernetes/nginx.yml -n $CAMUNDA_NAMESPACE_1
```

2. Try to curl each other from within the other pod:

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

Elasticsearch will use S3 as a backup and restore bucket. For this, configure a Kubernetes secret to not expose those in cleartext.

You can pull the data from Terraform since you exposed those via the `output.tf`.

1. From the Terraform code location, execute the following to export the access keys to environment variables. This will allow an easier creation of the Kubernetes secret via the command line:

```bash
export ACCESS_KEY=$(terraform output -raw s3_aws_access_key_id)
export SECRET_ACCESS_KEY=$(terraform output -raw s3_aws_secret_access_key)
```

2. Pre-create the Camunda namespaces in each cluster. This is required before using the Helm chart to have the secret required for Elasticsearch.

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
unset SECRET_ACCESS_KEYv
```

</TabItem>
<TabItem value="helm-chart" label="Camunda 8 Helm chart prerequisites">

Our recommendation is to work with layered helm values files:

- have a base `value.yml` that is generally applicable for both Camunda installations
- two overlays that are for region 1 and region 2 installations

#### Base values.yml

The following is an example `values.yml` that forms the base and can be further extended.

:::note
Note the `global.multiregion.regions` directive to be two for two regions. Disable Identity and Optimize as these are currently not supported within this setup and will break when enabled. Please see the [limitations section](#) <!-- TODO: fill link -->.
:::

Adjust the `placeholder` for `ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS` to reflect your current setup. These are the contact points for the brokers to know how to form the cluster. Find more information on what the variable means in [setting up a cluster](../../../../zeebe-deployment/operations/setting-up-a-cluster.md).

In our example, the `placeholder` is replaced with the following:

```yaml
-name: ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS
 value: "camunda-zeebe-0.camunda-zeebe.camunda-london.svc.cluster.local:26502,camunda-zeebe-1.camunda-zeebe.camunda-london.svc.cluster.local:26502,camunda-zeebe-2.camunda-zeebe.camunda-london.svc.cluster.local:26502,camunda-zeebe-3.camunda-zeebe.camunda-london.svc.cluster.local:26502,camunda-zeebe-0.camunda-zeebe.camunda-paris.svc.cluster.local:26502,camunda-zeebe-1.camunda-zeebe.camunda-paris.svc.cluster.local:26502,camunda-zeebe-2.camunda-zeebe.camunda-paris.svc.cluster.local:26502,camunda-zeebe-3.camunda-zeebe.camunda-paris.svc.cluster.local:26502"
```

The Zeebe cluster size is eight in a dual-region setup, resulting in four brokers per region.

The address forms as follows:

```bash
$pod.$service.$namespace.svc.cluster.local:26502
```

- `$pod` = `$release`-zeebe-`$number`
  - `$release` is the Helm release name you use. In our case, we use `camunda`.
  - `$number` stems from Zeebe being a statefulset, so it starts from 0 to 3 due to four replicas per region.
  - Resulting in `camunda-zeebe-(0-4)`
- `$service` = `$release-zeebe`
  - `$release` is the Helm release name you use. In our case, we use `camunda`.
  - Resulting in `camunda-release`
- `$namespace` is the previously created namespace, in our case `camunda-london` and `camunda-paris`.
- `26502` is the port for the initial contact at Zeebe.

If you use a different Helm release name than `camunda`, you must adjust the URLs for the Elasticsearch exporters `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_URL` and `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION1_ARGS_URL`. Here, replace `camunda` with the release name you have chosen:

<details>
  <summary>base-values.yml</summary>
  <summary>

```yml reference title="base-values.yml"
https://github.com/camunda/c8-multi-region/blob/aws-operational/test/resources/aws/2-region/kubernetes/camunda-values.yml
```

  </summary>
</details>

#### Region 0 values.yml

The vital part of the overlay is that the `regionId` is set to 0. The rest is handled in the base layer:

```yaml reference title="region0-values.yml"
https://github.com/camunda/c8-multi-region/blob/aws-operational/test/resources/aws/2-region/kubernetes/region0/camunda-values.yml
```

#### Region 1 values.yml

The vital part of the overlay is that the `regionId` is set to 1. The rest is handled in the base layer:

```yaml reference title="region1-values.yml"
https://github.com/camunda/c8-multi-region/blob/aws-operational/test/resources/aws/2-region/kubernetes/region1/camunda-values.yml
```

</TabItem>
<TabItem value="deploy" label="Deploy Camunda 8">

The last step is to deploy Camunda 8 to both its regions, for which we chose London as `Region 0` and Paris as `Region 1`. As mentioned, you may choose a different release name and should ensure you have adjusted your `base-values.yml` to consider this:

```bash
helm install camunda camunda/camunda-platform \
  --version 9.2.0 \
  --kube-context $CLUSTER_0 \
  --namespace $CAMUNDA_NAMESPACE_0 \
  -f base-values.yml \
  -f region0-values.yml

helm install camunda camunda/camunda-platform \
  --version 9.2.0 \
  --kube-context $CLUSTER_1 \
  --namespace $CAMUNDA_NAMESPACE_1 \
  -f base-values.yml \
  -f region1-values.yml
```

</TabItem>
</Tabs>
