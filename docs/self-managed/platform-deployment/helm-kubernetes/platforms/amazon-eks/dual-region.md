---
id: dual-region
title: "Deploy two EKS clusters with Terraform for a dual-region setup"
description: "Deploy two Amazon Kubernetes cluster (EKS) with terraform for a peered setup allowing dual-region communication."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import CoreDNSKubeDNS from "./assets/core-dns-kube-dns.svg"

This guide offers a detailed tutorial for deploying an Amazon Web Services (AWS) Elastic Kubernetes Service (EKS) cluster, tailored explicitly for deploying Camunda 8 and using Terraform, a popular Infrastructure as Code (IaC) tool.

It requires you to have previously completed or at least understood the steps taken in "[Deploy an EKS cluster with Terraform](./terraform-setup.md)" as it builds on top of it.

:::tip

If you have no experience with Terraform and Amazon EKS, please have a look at our guide on "[Deploy an EKS cluster with Terraform](./terraform-setup.md)". By walking through the essentials of setting up an Amazon EKS cluster, configuring AWS IAM permissions, and integrating a PostgreSQL database, this guide explains the process of using Terraform with AWS, making it accessible even to those new to Terraform or IaC concepts.

:::

## Prerequisites

- An [AWS account](https://docs.aws.amazon.com/accounts/latest/reference/accounts-welcome.html) to create any resources within AWS.
- [Terraform (1.6.x)](https://developer.hashicorp.com/terraform/downloads)
- [Kubectl (1.28.x)](https://kubernetes.io/docs/tasks/tools/#kubectl) to interact with the cluster.

## Considerations

This setup provides an essential foundation for beginning with Camunda 8, though it's not tailored for optimal performance. It's a good initial step for preparing a production environment by incorporating [IaC tooling](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/infrastructure-as-code).

Terraform can be opaque in the beginning. If you solely want to get an understanding for what is happening, you may try out the [eksctl guide](./eksctl.md) to understand what resources are created and how they interact with each other.

To try out Camunda 8 or develop against it, consider signing up for our [SaaS offering](https://camunda.com/platform/). If you already have an Amazon EKS cluster, consider skipping to the [Helm guide](./eks-helm.md).

For the simplicity of this guide, certain best practices will be provided with links to additional documents, enabling you to explore the topic in more detail.

:::warning
Following this guide will incur costs on your Cloud provider account, namely for the managed Kubernetes service, running Kubernetes nodes in EC2, Elastic Block Storage (EBS), and Route53. More information can be found on [AWS](https://aws.amazon.com/eks/pricing/) and their [pricing calculator](https://calculator.aws/#/) as the total cost varies per region.
:::

## Outcome

Following this tutorial and steps will result in:

- Two Amazon EKS Kubernetes clusters running the latest Kubernetes version with four nodes ready for Camunda 8 installation.
- The [EBS CSI driver](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html) is installed and configured, which is used by the Camunda 8 Helm chart to create [persistent volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).
- A VPC peering between the two EKS clusters, allowing cross-cluster communication between different regions.

## Installing Amazon EKS clusters with Terraform

<Tabs queryString="tf-installation">
<TabItem value="terraform-prerequsites" label="Terraform prerequsites" default>

1. Create an empty folder to place your Terraform files in.
2. Create a `config.tf` with the following setup:

<details>
  <summary>config.tf</summary>
  <summary>

```hcl reference title="config.tf"
https://github.com/camunda/c8-multi-region/blob/main/test/resources/aws/2-region/terraform/config.tf#L5-L51
```

  </summary>
</details>

The important part here is the initialization of two AWS providers since you need one per region as this is a limitation by AWS since everything is scoped to a region.

Additionally, the naming of owner and acceptor stems from the VPC peering but we will have a look at that in more detail at a later stage.

3. Feel free to adjust the local values to fit your configuration. E.g. different region or cidr blocks.
4. Set up the authentication for the `AWS` provider. In the example, an AWS profile is used and provided as a terraform variable that is defined on execution.

:::note

It's recommended to use a different backend than `local`. More information can be found in the [Terraform documentation](https://developer.hashicorp.com/terraform/language/settings/backends/configuration).

:::

:::note

The [AWS Terraform provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) is required to create resources in AWS. You must configure the provider with the proper credentials before using it. You can further change the region and other preferences and explore different [authentication](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#authentication-and-configuration) methods.

There are several ways to authenticate the `AWS` provider.

- (Recommended) Use the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) to configure access. Terraform will automatically default to AWS CLI configuration when present.
- Set environment variables `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`, where the `key` and `id` can be retrieved from the [AWS Console](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).

:::

:::warning

Do not use secrets in your configuration files.

:::

:::warning

The user who creates the resources will always be the owner. This means the user will always have admin access to the Kubernetes cluster until you delete it. Therefore, it can make sense to create an extra [AWS IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) that's solely used for Terraform purposes.

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
https://github.com/camunda/c8-multi-region/blob/main/test/resources/aws/2-region/terraform/config.tf#L57-L86
```

  </summary>
</details>

There are various other input options to customize the cluster setup further; see the [module documentation](https://github.com/camunda/camunda-tf-eks-module).

It is important to define the provider for the remote cluster since otherwise terraform will fall back to the default AWS provider and create everything within the same region.

4. Create a file called `variables.tf` within the same folder.
5. Paste the following content into the created `variables.tf` file to define the required variables. You may set a default value for successive runs to not have to always define those variables on execution. Additionally, you may remove the `aws_profile` if you provide the AWS access differently.

```hcl reference
https://github.com/camunda/c8-multi-region/blob/main/test/resources/aws/2-region/terraform/variables.tf
```

</TabItem>
<TabItem value="vpc-peering" label="VPC peering">

For a multi-region setup, you need to have the [virtual private cloud (VPC)](https://aws.amazon.com/vpc/) peered to route traffic between them using private IPv4 addresses and not publicly route the traffic and expose it. For further information, please conduct the [AWS documentation on VPC peering](https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html).

1. In the folder where your `config.tf` resides, create an additional `vpc-peering.tf` file.
2. Paste the following content into the created `vpc-peering.tf` file to peer your created clusters.

<details>
  <summary>vpc-peering.tf</summary>
  <summary>

```hcl reference title="vpc-peering.tf"
https://github.com/camunda/c8-multi-region/blob/main/test/resources/aws/2-region/terraform/vpc-peering.tf
```

  </summary>
</details>

This will create a VPC peering between the two VPCs that were previously created as part of the [cluster module](#cluster-module) usage and allow any traffic between those two.

</TabItem>
<TabItem value="elastic-repository" label="ElasticSearch S3 repository">

For ElasticSearch a S3 bucket is created to allow [creating and restoring snapshots](https://www.elastic.co/guide/en/elasticsearch/reference/current/repository-s3.html).

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

</TabItem>
<TabItem value="tf-outputs" label="Outputs">

Terraform outputs allow you to reuse generated values in future steps. E.g. the access keys of the service account with S3 access.

1. In the folder where your `config.tf` resides, create an additional `output.tf` file.
2. Paste the following content into the newly created `output.tf` file to create terraform outputs.

```hcl reference
https://github.com/camunda/c8-multi-region/blob/aws-operational/test/resources/aws/2-region/terraform/output.tf
```

</TabItem>
<TabItem value="tf-execution" label="Execution">

1. Open a terminal in the created Terraform folder where your terraform files reside.
2. Initialize the working directory:

```hcl
terraform init
```

3. Apply the configuration files:

```hcl
terraform apply
```

4. After reviewing the plan, you can type `yes` to confirm and apply the changes.

At this point, Terraform will create the Amazon EKS clusters with all the necessary configurations. The completion of this process may require approximately 20-30 minutes.

</TabItem>
</Tabs>

## In-Cluster setup

Now that you have created two Kubernetes clusters with Terraform, you will still have to configure various things to make the dual-region work.

<Tabs queryString="cluster-setup">
<TabItem value="cluster-access" label="Cluster Access" default>

To ease working with two clusters, you will have to create or update your local kubeconfig to contain those new contexts. Using an alias for those new clusters allows to directly use kubectl and helm with a particular cluster.

1. Update or create your kubeconfig via the [AWS CLI](https://docs.aws.amazon.com/eks/latest/userguide/create-kubeconfig.html)

```bash
# the alias allows for easier context switching in kubectl
aws eks --region eu-west-2 update-kubeconfig --name cluster-london --alias cluster-london
aws eks --region eu-west-3 update-kubeconfig --name cluster-paris --alias cluster-paris
```

</TabItem>
<TabItem value="dns-chaining" label="DNS Chaining">

This allows for easier communication between the two clusters by forwarding DNS queries from cluster A to cluster B and vice versa.

<CoreDNSKubeDNS />

You are configuring the Core-DNS from cluster A to resolve certain namespaces via cluster B instead of using the in-cluster DNS server. This allows e.g. zeebe brokers to resolve other brokers from the remote cluster.

1. Expose `kube-dns`, the in-cluster DNS resolver via an internal load-balancer in each cluster.

```yaml reference
https://github.com/camunda/c8-multi-region/blob/aws-operational/test/resources/aws/2-region/kubernetes/internal-dns-lb.yml
```

```bash
kubectl --context cluster-london apply -f https://github.com/camunda/c8-multi-region/blob/aws-operational/test/resources/aws/2-region/kubernetes/internal-dns-lb.yml
kubectl --context cluster-paris apply -f https://github.com/camunda/c8-multi-region/blob/aws-operational/test/resources/aws/2-region/kubernetes/internal-dns-lb.yml
```

2. Retrieve the hostnames of the load-balancer and get their internal IP addresses, required for the next steps.

```bash
# execute on cluster-london
HOST1=$(kubectl --context cluster-london -n kube-system get svc across-cluster-dns-tcp -o jsonpath="{.status.loadBalancer.ingress[0].hostname}" | cut -d - -f 1)

# execute on cluster-paris
HOST2=$(kubectl --context cluster-paris -n kube-system get svc across-cluster-dns-tcp -o jsonpath="{.status.loadBalancer.ingress[0].hostname}" | cut -d - -f 1)
```

The following will print the IP addresses of the internal load-balancer in each cluster, which you will use to configure the opposite cluster for DNS resolving.

```bash
# gives you the IPs from region London that need to be configured in Paris
aws ec2 describe-network-interfaces --region eu-west-2 --filters Name=description,Values="ELB net/${HOST1}*" --query  'NetworkInterfaces[*].PrivateIpAddress' --output text
# Output example
# 10.190.114.39   10.190.172.21   10.190.134.196

# gives you the IPs from region Paris that need to be configured in London
aws ec2 describe-network-interfaces --region eu-west-3 --filters Name=description,Values="ELB net/${HOST2}*" --query  'NetworkInterfaces[*].PrivateIpAddress' --output text
# Output example
# 10.202.30.193   10.202.46.72   10.202.65.75
```

Configure CoreDNS to forward DNS queries for specific namespaces to the other cluster.
You have to choose unique namespaces for the Camunda Platform that only exist once in each cluster to direct the traffic.

e.g. `camunda-london` on the `cluster-london` and `camunda-paris` on the `cluster-paris`.
Using the same namespace on both clusters won't work since CoreDNS won't be able to distinguish between traffic targeted at the local and remote cluster.

Besides the main namespaces, you will have to add `failover` namespaces for the unfortunate event of a total region loss. This is for completeness, so you don't forget to add the mapping on region recovery.

3. You need to configure CoreDNS with the namespace to DNS resolver mapping.

```bash
kubectl --context cluster-london edit -n kube-system configmap coredns
```

Add at the bottom of the `Corefile` the namespace mapping to the remote DNS resolver.

```yaml
# You are configuring the CoreDNS of the london cluster
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

4. Repeat step 3 for the Paris cluster to configure the CoreDNS of Paris to redirect any DNS requests to the London DNS resolver for your chosen namespace, e.g. `camunda-london`.

5. Check that CoreDNS has reloaded for the changes to take effect before continuing. Make sure it contains `Reloading complete`.

```bash
kubectl --context cluster-london logs -f deployment/coredns -n kube-system
kubectl --context cluster-paris logs -f deployment/coredns -n kube-system
```

</TabItem>
<TabItem value="test-dns-chaining" label="(optional) Test DNS chaining">

A simple setup to test that the DNS chaining is working by using nginx pods and services to ping each other.

1. Deploy the following nginx pod and service to each cluster within the `camunda-london` and `camunda-paris` namespaces.

```yaml reference
https://github.com/camunda/c8-multi-region/blob/main/test/resources/aws/2-region/kubernetes/nginx.yml
```

```bash
kubectl --context cluster-london apply -f https://github.com/camunda/c8-multi-region/blob/main/test/resources/aws/2-region/kubernetes/nginx.yml -n camunda-london
kubectl --context cluster-paris apply -f https://github.com/camunda/c8-multi-region/blob/main/test/resources/aws/2-region/kubernetes/nginx.yml -n camunda-paris
```

2. Try to curl each other from within the other pod.

```bash
kubectl --context cluster-london exec -n camunda-london -it sample-nginx -- curl http://sample-nginx.sample-nginx-peer.camunda-paris.svc.cluster.local

kubectl --context cluster-paris exec -n camunda-paris -it sample-nginx -- curl http://sample-nginx.sample-nginx-peer.camunda-london.svc.cluster.local

# http://sample-nginx.sample-nginx-peer.camunda-london.svc.cluster.local
# http://$pod.$service.$namespace.svc.cluster.local
```

3. After a successful retrieval of the remote nginx start page, you can remove this temporary setup.

```bash
kubectl --context cluster-london delete -f https://github.com/camunda/c8-multi-region/blob/main/test/resources/aws/2-region/kubernetes/nginx.yml -n camunda-london
kubectl --context cluster-paris delete -f https://github.com/camunda/c8-multi-region/blob/main/test/resources/aws/2-region/kubernetes/nginx.yml -n camunda-paris
```

</TabItem>
</Tabs>

## Deploy Camunda Platform to the Clusters

<Tabs queryString="deploy">
<TabItem value="elastic-secret" label="Create the secret for ElasticSearch">

ElasticSearch will use S3 as a backup and restore bucket and for that, you need to configure a Kubernetes secret to not expose those in cleartext.

You can pull the data from Terraform since you exposed those via the `output.tf`.

1. Where your `config.tf` and `output.tf` live, execute the following to export the access keys to environment variables. This will allow an easier creation of the Kubernetes secret via the command line.

```bash
export ACCESS_KEY=$(terraform output -raw s3_aws_access_key_id)
export SECRET_ACCESS_KEY=$(terraform output -raw s3_aws_secret_access_key)
```

2. Create the Kubernetes secret within the `camunda-london` and `camunda-paris` namespace on each respective cluster.

```bash
kubectl --context cluster-london -n camunda-london create secret generic elasticsearch-env-secret \
    --from-literal=S3_ACCESS_KEY=$ACCESS_KEY \
    --from-literal=S3_SECRET_KEY=$SECRET_ACCESS_KEY

kubectl --context cluster-paris -n camunda-paris create secret generic elasticsearch-env-secret \
    --from-literal=S3_ACCESS_KEY=$ACCESS_KEY \
    --from-literal=S3_SECRET_KEY=$SECRET_ACCESS_KEY
```

</TabItem>
<TabItem value="helm-chart" label="Camunda 8 Helm Chart prerequisites">

Our recommendation is to work with layered helm values files since you will want to have a base `value.yml` that is generally applicable and then two overlays that are for `region0` and `region1`.

#### Base values.yml

The following is an example `values.yml` that forms the base and ca be further extended.

Especially important within this is the `global.multiregion.regions` directive to be two for two regions. Additionally, to disable identity and optimize since those are currently not working within the setup.

You need to adjust the `placeholder` for `ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS` to reflect your current setup. These are the contact points for the brokers to know how to form the cluster. More information on what the variable means in the [setting up a cluster documentation](../../../../zeebe-deployment/operations/setting-up-a-cluster.md).

In our example, the `placeholder` would is being replaced with:

```yaml
-name: ZEEBE_BROKER_CLUSTER_INITIALCONTACTPOINTS
 value: "camunda-zeebe-0.camunda-zeebe.camunda-london.svc.cluster.local:26502,camunda-zeebe-1.camunda-zeebe.camunda-london.svc.cluster.local:26502,camunda-zeebe-2.camunda-zeebe.camunda-london.svc.cluster.local:26502,camunda-zeebe-3.camunda-zeebe.camunda-london.svc.cluster.local:26502,camunda-zeebe-0.camunda-zeebe.camunda-paris.svc.cluster.local:26502,camunda-zeebe-1.camunda-zeebe.camunda-paris.svc.cluster.local:26502,camunda-zeebe-2.camunda-zeebe.camunda-paris.svc.cluster.local:26502,camunda-zeebe-3.camunda-zeebe.camunda-paris.svc.cluster.local:26502"
```

The zeebe cluster size is 8 with a dual-region setup, resulting in 4 brokers per region.

The address forms as follows:

```bash
$pod.$service.$namespace.svc.cluster.local:26502
```

- `$pod` = `$release`-zeebe-`$number`
  - `$release` is the helm release name that you use. In our case, we're going with `camunda`.
  - `$number` stems from zeebe being a statefulset, so it starts from 0 to 3 due to 4 replicas per region.
  - resulting in `camunda-zeebe-(0-4)`
- `$service` = `$release-zeebe`
  - `$release` is the helm release name that you use. In our case, we're going with `camunda`.
  - resulting in `camunda-release`
- `$namespace` is the previously created namespace, in our case `camunda-london` and `camunda-paris`.
- 26502 is the port for the initial contact at zeebe.

In case you are going with a different helm release name than `camunda`, you must adjust the URLs for the ElasticSearch exporters `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION0_ARGS_URL` and `ZEEBE_BROKER_EXPORTERS_ELASTICSEARCHREGION1_ARGS_URL`. Where `camunda` must be replaced with the release name that you have chosen.

<details>
  <summary>base-values.yml</summary>
  <summary>

```yml reference title="base-values.yml"
https://github.com/camunda/c8-multi-region/blob/aws-operational/test/resources/aws/2-region/kubernetes/camunda-values.yml
```

  </summary>
</details>

#### Region0 values.yml

The vital part of the overlay is that the `regionId` is set to 0. The rest is being handled in the base layer.

```yaml reference title="region0-values.yml"
https://github.com/camunda/c8-multi-region/blob/aws-operational/test/resources/aws/2-region/kubernetes/region0/camunda-values.yml
```

#### Region1 values.yml

The vital part of the overlay is that the `regionId` is set to 1. The rest is being handled in the base layer.

```yaml reference title="region1-values.yml"
https://github.com/camunda/c8-multi-region/blob/aws-operational/test/resources/aws/2-region/kubernetes/region1/camunda-values.yml
```

</TabItem>
<TabItem value="deploy" label="Deploy Camunda 8">

The last step is to deploy Camunda 8 to both its regions, for which we chose London as region 0 and Paris as region 1. As mentioned, you may choose a different release name and should ensure you have adjusted your `base-values.yml` to consider this.

```bash
helm install camunda camunda/camunda-platform \
  --kube-context cluster-london \
  --namespace camunda-london \
  -f base-values.yml \
  -f region0-values.yml

helm install camunda camunda/camunda-platform \
  --kube-context cluster-paris \
  --namespace camunda-paris \
  -f base-values.yml \
  -f region1-values.yml
```

</TabItem>
</Tabs>

## Troubleshooting
