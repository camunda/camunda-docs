---
id: aws-marketplace
title: "Install AWS Marketplace"
description: "Learn how to Install the AWS Marketplace."
---

You can subscribe to Camunda directly from the AWS Marketplace. You then have the convenience of viewing your Camunda subscription as part of your AWS bill, and you do not have to supply any additional billing information to Camunda.

Estimated time to deploy: 3 hours

Required permissions:

```
eks:CreateCluster
eks:DeleteCluster
eks:DescribeCluster
eks:ListClusters
eks:TagResource
eks:AccessKubernetesApi
eks:ListNodegroups
eks:CreateNodegroup
eks:DescribeNodegroup
eks:DeleteNodegroup
eks:CreateAddon
eks:ListAddons

```

## Create a cluster

Lets start with exporting some environment variables:

```
export REGION=
export CLUSTER_NAME=
export CLUSTER_VERSION=
export MACHINE_TYPE=
export DESIRED_SIZE=
export MIN_SIZE=
export MAX_SIZE=
export CAMUNDA_HOSTNAME=
```

:::note
We will use these variables for the rest of this guide, so use the same terminal from start to finish. If you close your terminal, make sure you export those environment variables again before executing any commands.
:::

1. Create an EKS cluster. Save the following template to a file named `cluster_template.yaml`. You may fill out your desired values in this template manually or follow along to prefill some of these values with the environment variables set above.

```yaml reference title="cluster_template.yaml"
https://github.com/jessesimpson36/valuestest/blob/main/cluster_template.yaml
```

2. The `availabilityZones` section needs to be manually replaced with your availability zones. Replace the variables marked with `$` or use the following command to replace the variables for you:

```
envsubst < cluster_template.yaml > cluster.yaml
```

This file is then run with the following command:

```
eksctl create cluster -f cluster.yaml
```

Expect this command to take around 20 minutes.

## Creating the SSD StorageClass and setting default storage class

The following `storageclass` is recommended for increased stability and write-speeds with Camunda. Save the following to a file named `ssd-storage-class-aws.yaml`:

```yaml reference title="ssd-storage-class-aws.yaml"
https://github.com/jessesimpson36/valuestest/blob/main/ssd-storage-class-aws.yaml
```

Then, run the following:

```
kubectl apply -f ssd-storage-class-aws.yaml
```

The next command will set the `ssd storageclass` as the default storage class for the cluster. When PVC's are created without using a specific storage class, it is assigned to whichever class has the `is-default-class true` annotation.

To set the default storage class to the `ssd storageclass`:

```
kubectl patch storageclass ssd -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
kubectl patch storageclass gp2 -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"false"}}}'
```

Next, we want to build an EBS CSI trust policy so the EKS cluster has the permissions to create `PersistentVolumes` with the new storage class:

```
export AWS_ACCOUNT_ID=$(aws sts get-caller-identity | grep Account | cut -d ':' -f 2 | tr -d ',' | grep -o "[0-9]*")
export AWS_OIDC_ID=$(aws eks describe-cluster --name $CLUSTER_NAME --query "cluster.identity.oidc.issuer" --output text | cut -d '/' -f 5)
```

Save this file as `ebs-csi-driver-trust-policy-template.json`:

```yaml reference title="ebs-csi-driver-trust-policy-template.json"
https://github.com/jessesimpson36/valuestest/blob/main/ebs-csi-driver-trust-policy-template.json
```

Run the following to replace your OIDC ID and your AWS account ID with the environment variables:

```
envsubst < ebs-csi-driver-trust-policy-template.json > ebs-csi-driver-trust-policy.json
```

This command will create a role that permits your cluster to create persistent volumes:

```
aws iam create-role \
  --role-name AmazonEKS_EBS_CSI_DriverRole_Cluster_$CLUSTER_NAME \
  --assume-role-policy-document file://"ebs-csi-driver-trust-policy.json";
```

Wait for 20 seconds:

```
sleep 20
```

Now, attach a policy with those permissions to the role you just created:

```
aws iam attach-role-policy \
  --policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy \
  --role-name AmazonEKS_EBS_CSI_DriverRole_Cluster_$CLUSTER_NAME
```

Create the AWS add-on for the EBS Driver and add it to the cluster:

```
aws eks create-addon --cluster-name $CLUSTER_NAME --addon-name aws-ebs-csi-driver \
  --service-account-role-arn arn:aws:iam::${AWS_ACCOUNT_ID}:role/AmazonEKS_EBS_CSI_DriverRole_Cluster_${CLUSTER_NAME}
```

```
kubectl annotate serviceaccount ebs-csi-controller-sa \
    -n kube-system \
    eks.amazonaws.com/role-arn=arn:aws:iam::${AWS_ACCOUNT_ID}:role/AmazonEKS_EBS_CSI_DriverRole_Cluster_${CLUSTER_NAME} \
    --overwrite
```

Restart the EBS CSI Controller so it refreshes the `serviceaccount`.

```
kubectl rollout restart deployment ebs-csi-controller -n kube-system
```

By default, the IAM OIDC Provider is not enabled. The following command will enable it. This allows the CSI driver to create volumes. See [this eksctl documentation](https://eksctl.io/usage/iamserviceaccounts/) for more information.

```
eksctl utils associate-iam-oidc-provider --cluster $CLUSTER_NAME --approve --region $REGION
```

## Install ingress-nginx controller

```
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
```

## Setting up Helm values.yaml files

Save the following as `values_template.yaml`:

```yaml reference title="values_template.yaml"
https://github.com/jessesimpson36/valuestest/blob/main/aws-marketplace.yaml
```

Then, run the following command to replace the template with the environment variables specified:

```
envsubst < values_template.yaml > values.yaml
```

Save this file as `values-aws.yaml`. This will ensure all images reference the ones hosted in AWS and do not require any extra credentials to access.

```yaml reference title="values-aws.yaml"
https://github.com/jessesimpson36/valuestest/blob/main/app-versions.yaml
```

## Create a namespace

Create a namespace to put this deployment into, and set the current context into that namespace

```
kubectl create namespace camunda
kubectl config set-context --current --namespace=camunda
```

## Log in to AWS ECR from command line

Log into the AWS ECR:

```
aws ecr get-login-password \
    --region us-east-1 | helm registry login \
    --username AWS \
    --password-stdin 709825985650.dkr.ecr.us-east-1.amazonaws.com
```

## Create a TLS certificate

Now would be a good time to create a trusted TLS certificate and upload it into the Kubernetes cluster. If you have a certificate ready, you can create a secret named `tls-secret` from it with the following command:

```
kubectl create secret tls tls-secret --cert=<certificate> --key=<private-key>
```

The `values.yaml` in the previous steps are configured to use a secret named `tls-secret`. If you decide to call it something else, make sure you modify the `values.yaml` file from the previous steps.

## Pull and run the Helm chart

Pull the Helm chart:

```
mkdir awsmp-chart && cd awsmp-chart
helm pull oci://709825985650.dkr.ecr.us-east-1.amazonaws.com/camunda/camunda8/camunda-platform

tar xf $(pwd)/* && find $(pwd) -maxdepth 1 -type f -delete
```

Run the Helm chart:

```
helm install camunda \
    --namespace camunda \
    -f ../values.yaml \
    -f ../values-aws.yaml \
    --skip-crds \
    ./*
```

The application is now deployed. If you want to modify any part of the `values.yaml` further, follow the [Helm upgrade guide](/self-managed/platform-deployment/helm-kubernetes/upgrade.md).

## Create a DNS record to point to the AWS LoadBalancer

Create a DNS record to point to the AWS LoadBalancer.

Refer to the [AWS Route53 documentation](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-creating.html) for more details.
