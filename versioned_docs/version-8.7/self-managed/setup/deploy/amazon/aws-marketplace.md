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

```shell
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

```yaml
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig

metadata:
  name: $CLUSTER_NAME
  region: $REGION
  version: "$CLUSTER_VERSION"

managedNodeGroups:
  - name: ng-1
    instanceType: $MACHINE_TYPE
    desiredCapacity: $DESIRED_SIZE
    minSize: $MIN_SIZE
    maxSize: $MAX_SIZE
    volumeSize:
    privateNetworking: true
    iam:
      attachPolicy:
        Version: "2012-10-17"
        Statement:
          - Effect: Allow
            Action:
              - "license-manager:CheckoutLicense"
            Resource: "*"

availabilityZones: ["us-east-1a", "us-east-1b"]
```

2. The `availabilityZones` section needs to be manually replaced with your availability zones. Replace the variables marked with `$` or use the following command to replace the variables for you:

```shell
envsubst < cluster_template.yaml > cluster.yaml
```

This file is then run with the following command:

```shell
eksctl create cluster -f cluster.yaml
```

Expect this command to take around 20 minutes.

## Creating the SSD StorageClass and setting default storage class

The following `storageclass` is recommended for increased stability and write-speeds with Camunda. Save the following to a file named `ssd-storage-class-aws.yaml`:

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: ssd
provisioner: ebs.csi.aws.com
reclaimPolicy: Delete
volumeBindingMode: WaitForFirstConsumer
```

Then, run the following:

```shell
kubectl apply -f ssd-storage-class-aws.yaml
```

The next command will set the `ssd storageclass` as the default storage class for the cluster. When PVC's are created without using a specific storage class, it is assigned to whichever class has the `is-default-class true` annotation.

To set the default storage class to the `ssd storageclass`:

```shell
kubectl patch storageclass ssd -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
kubectl patch storageclass gp2 -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"false"}}}'
```

Next, we want to build an EBS CSI trust policy so the EKS cluster has the permissions to create `PersistentVolumes` with the new storage class:

```shell
export AWS_ACCOUNT_ID=$(aws sts get-caller-identity | grep Account | cut -d ':' -f 2 | tr -d ',' | grep -o "[0-9]*")
export AWS_OIDC_ID=$(aws eks describe-cluster --name $CLUSTER_NAME --query "cluster.identity.oidc.issuer" --output text | cut -d '/' -f 5)
```

Save this file as `ebs-csi-driver-trust-policy-template.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::${AWS_ACCOUNT_ID}:oidc-provider/oidc.eks.${REGION}.amazonaws.com/id/${AWS_OIDC_ID}"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "oidc.eks.$REGION.amazonaws.com/id/$AWS_OIDC_ID:aud": "sts.amazonaws.com",
          "oidc.eks.$REGION.amazonaws.com/id/$AWS_OIDC_ID:sub": "system:serviceaccount:kube-system:ebs-csi-controller-sa"
        }
      }
    }
  ]
}
```

Run the following to replace your OIDC ID and your AWS account ID with the environment variables:

```shell
envsubst < ebs-csi-driver-trust-policy-template.json > ebs-csi-driver-trust-policy.json
```

This command will create a role that permits your cluster to create persistent volumes:

```shell
aws iam create-role \
  --role-name AmazonEKS_EBS_CSI_DriverRole_Cluster_$CLUSTER_NAME \
  --assume-role-policy-document file://"ebs-csi-driver-trust-policy.json";
```

Wait for 20 seconds:

```shell
sleep 20
```

Now, attach a policy with those permissions to the role you just created:

```shell
aws iam attach-role-policy \
  --policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy \
  --role-name AmazonEKS_EBS_CSI_DriverRole_Cluster_$CLUSTER_NAME
```

Create the AWS add-on for the EBS Driver and add it to the cluster:

```shell
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

```shell
kubectl rollout restart deployment ebs-csi-controller -n kube-system
```

By default, the IAM OIDC Provider is not enabled. The following command will enable it. This allows the CSI driver to create volumes. See [this eksctl documentation](https://eksctl.io/usage/iamserviceaccounts/) for more information.

```shell
eksctl utils associate-iam-oidc-provider --cluster $CLUSTER_NAME --approve --region $REGION
```

## Install ingress-nginx controller

```shell
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install ingress-nginx ingress-nginx/ingress-nginx
```

## Setting up Helm values.yaml files

Save the following as `values_template.yaml`:

```yaml
# Chart values for the Camunda 8 Helm chart.
# This file deliberately contains only the values that differ from the defaults.
# For changes and documentation, use your favorite diff tool to compare it with:
# https://artifacthub.io/packages/helm/camunda/camunda-platform#parameters

global:
  ingress:
    enabled: true
    className: nginx
    host: "$CAMUNDA_HOSTNAME"
    tls:
      enabled: true
      secretName: "tls-secret"
  identity:
    auth:
      publicIssuerUrl: "https://$CAMUNDA_HOSTNAME/auth/realms/camunda-platform"
      operate:
        redirectUrl: "https://$CAMUNDA_HOSTNAME/operate"
      tasklist:
        redirectUrl: "https://$CAMUNDA_HOSTNAME/tasklist"
      optimize:
        redirectUrl: "https://$CAMUNDA_HOSTNAME/optimize"
      connectors:
        redirectUrl: "https://$CAMUNDA_HOSTNAME/connectors"
      webModeler:
        redirectUrl: "https://$CAMUNDA_HOSTNAME/modeler"

operate:
  contextPath: "/operate"

tasklist:
  contextPath: "/tasklist"

optimize:
  contextPath: "/optimize"

connectors:
  enabled: true
  inbound:
    mode: oauth
  contextPath: "/connectors"

webModeler:
  enabled: true
  contextPath: "/modeler"
  image:
    pullSecrets:
      - name: camunda-docker-registry
  restapi:
    mail:
      fromAddress: YOUR_EMAIL

postgresql:
  enabled: true

identity:
  contextPath: "/identity"
  fullURL: "https://$CAMUNDA_HOSTNAME/identity"

zeebeGateway:
  contextPath: "/zeebe"
  ingress:
    grpc:
      enabled: true
      host: "$CAMUNDA_HOSTNAME"
```

Then, run the following command to replace the template with the environment variables specified:

```shell
envsubst < values_template.yaml > values.yaml
```

Save this file as `values-aws.yaml`. This will ensure all images reference the ones hosted in AWS and do not require any extra credentials to access.

```yaml
global:
  image:
    registry: 709825985650.dkr.ecr.us-east-1.amazonaws.com
    tag: 8.3.3

zeebe:
  image:
    repository: camunda/camunda8/zeebe

zeebeGateway:
  image:
    repository: camunda/camunda8/zeebe

operate:
  image:
    repository: camunda/camunda8/operate

tasklist:
  image:
    repository: camunda/camunda8/tasklist

optimize:
  image:
    repository: camunda/camunda8/optimize
    tag: 8.3.3

identity:
  firstUser:
    enabled: true
    username: admin
  image:
    repository: camunda/camunda8/identity

  identityKeycloak:
    postgresql:
      image:
        registry: 709825985650.dkr.ecr.us-east-1.amazonaws.com
        repository: camunda/camunda8/postgresql
        tag: 15.5.0
    image:
      registry: 709825985650.dkr.ecr.us-east-1.amazonaws.com
      repository: camunda/camunda8/keycloak

webModeler:
  image:
    tag: 8.3.1
  restapi:
    image:
      registry: 709825985650.dkr.ecr.us-east-1.amazonaws.com
      repository: camunda/camunda8/modeler-restapi
  webapp:
    image:
      registry: 709825985650.dkr.ecr.us-east-1.amazonaws.com
      repository: camunda/camunda8/modeler-webapp
  websockets:
    image:
      registry: 709825985650.dkr.ecr.us-east-1.amazonaws.com
      repository: camunda/camunda8/modeler-websockets

connectors:
  image:
    repository: camunda/camunda8/connectors-bundle
    tag: 8.3.1

elasticsearch:
  image:
    registry: 709825985650.dkr.ecr.us-east-1.amazonaws.com
    repository: camunda/camunda8/elasticsearch
    tag: 8.8.2
```

## Create a namespace

Create a namespace to put this deployment into, and set the current context into that namespace

```shell
kubectl create namespace camunda
kubectl config set-context --current --namespace=camunda
```

## Log in to AWS ECR from command line

Log into the AWS ECR:

```shell
aws ecr get-login-password \
    --region us-east-1 | helm registry login \
    --username AWS \
    --password-stdin 709825985650.dkr.ecr.us-east-1.amazonaws.com
```

## Create a TLS certificate

Now would be a good time to create a trusted TLS certificate and upload it into the Kubernetes cluster. If you have a certificate ready, you can create a secret named `tls-secret` from it with the following command:

```shell
kubectl create secret tls tls-secret --cert=<certificate> --key=<private-key>
```

The `values.yaml` in the previous steps are configured to use a secret named `tls-secret`. If you decide to call it something else, make sure you modify the `values.yaml` file from the previous steps.

## Pull and run the Helm chart

Pull the Helm chart:

```shell
mkdir awsmp-chart && cd awsmp-chart
helm pull oci://709825985650.dkr.ecr.us-east-1.amazonaws.com/camunda/camunda8/camunda-platform

tar xf $(pwd)/* && find $(pwd) -maxdepth 1 -type f -delete
```

Run the Helm chart:

```shell
helm install camunda \
    --namespace camunda \
    -f ../values.yaml \
    -f ../values-aws.yaml \
    --skip-crds \
    ./*
```

The application is now deployed. If you want to modify any part of the `values.yaml` further, follow the [Helm upgrade guide](/self-managed/setup/upgrade.md).

## Create a DNS record to point to the AWS LoadBalancer

Create a DNS record to point to the AWS LoadBalancer.

Refer to the [AWS Route53 documentation](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-creating.html) for more details.
