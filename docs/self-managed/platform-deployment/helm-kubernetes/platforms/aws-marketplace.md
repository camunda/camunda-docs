# AWS Marketplace Install Guide

Estimated time: 3 hours

Required Permissions

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

### Mention of community helm profiles

These instructions were based off of the helm profiles located here
https://github.com/camunda-community-hub/camunda-8-helm-profiles/blob/main/aws/README.md#ebs-csi-driver-addon

The workflow for these helm profiles is to edit the top of these makefiles.

```
region ?= us-east-1
zones ?= ['us-east-1a', 'us-east-1b']
clusterName ?= YOUR_CLUSTER_NAME
clusterVersion ?= 1.25

machineType ?= c6i.4xlarge
# desiredSize is used as the starting size of the cluster
desiredSize ?= 3
minSize ?= 1
maxSize ?= 6
```

And then run the following command

```
make kube && make
```

Makefiles are difficult to read and execute a lot of steps without much description on what's happening, so I will attempt to transform them into a step-by-step explanation of what's going on.

### Create a cluster

Similar to the makefile variables listed above, lets start with exporting some environment variables that are similar:

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

We will be using these variables for the rest of these instructions, so please use the same terminal from start to finish, and if you close your terminal, make sure you export those environment variables again before executing any commands.

The first step in this process is to create an EKS cluster. Save the following template to a file named `cluster_template.yaml`. You may fill in your desired values into this template manually or follow along to prefill some of these values with the environment variables set above.

```
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

availabilityZones: ['us-east-1a', 'us-east-1b']
```

The availabilityZones section needs to be manually replaced with your availability zones.

Replace the variables marked with `$` or use the following command to replace the variables for you:

```
envsubst < cluster_template.yaml > cluster.yaml
```

This file is then ran with the following command:

```
eksctl create cluster -f cluster.yaml
```

Expect this command to take around 20 minutes.

### Creating the SSD StorageClass and setting default storage class

The following storageclass is recommended due to it's better stability and write-speeds with camunda. Save the following off to a file named ssd-storage-class-aws.yaml:

```
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: ssd
provisioner: ebs.csi.aws.com
reclaimPolicy: Delete
volumeBindingMode: WaitForFirstConsumer
```

And then run:

```
kubectl apply -f ssd-storage-class-aws.yaml
```

The next command will set the ssd storage class as the default storage class for the cluster. When PVC's are created without using a specific storage class, it will be assigned to whichever class has the is-default-class true annotation.

To set the default storage class to the ssd storageclass:

```
kubectl patch storageclass ssd -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
kubectl patch storageclass gp2 -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"false"}}}'
```

Next we want to build an ebs csi trust policy so that the EKS cluster has the permissions to create PersistentVolumes with the new storage class.

```
export AWS_ACCOUNT_ID=$(aws sts get-caller-identity | grep Account | cut -d ':' -f 2 | tr -d ',' | grep -o "[0-9]*")
export AWS_OIDC_ID=$(aws eks describe-cluster --name $CLUSTER_NAME --query "cluster.identity.oidc.issuer" --output text | cut -d '/' -f 5)
```

Save this file as ebs-csi-driver-trust-policy-template.json:

```
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

```
envsubst < ebs-csi-driver-trust-policy-template.json > ebs-csi-driver-trust-policy.json
```

This command will create a role that will permit your cluster to create persistent volumes

```
aws iam create-role \
  --role-name AmazonEKS_EBS_CSI_DriverRole_Cluster_$CLUSTER_NAME \
  --assume-role-policy-document file://"ebs-csi-driver-trust-policy.json";
```

Wait 20 seconds

```
sleep 20
```

Now we need to attach a policy with those permissions to that role we just created.

```
aws iam attach-role-policy \
  --policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy \
  --role-name AmazonEKS_EBS_CSI_DriverRole_Cluster_$CLUSTER_NAME
```

We need to create the AWS AddOn for the EBS Driver and add it to the cluster.

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

Restart the EBS CSI Controller so that it refreshes the serviceaccount

```
kubectl rollout restart deployment ebs-csi-controller -n kube-system
```

By default, the IAM OIDC Provider is not enabled. The following command will enable it. This will allow the CSI driver to create volumes. See this for more information: https://eksctl.io/usage/iamserviceaccounts/

```
eksctl utils associate-iam-oidc-provider --cluster $CLUSTER_NAME --approve --region $REGION
```

### Install ingress-nginx controller

```
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
```

### Setting up helm values.yaml files

Save the following as values_template.yaml

```
# Chart values for the Camunda Platform 8 Helm chart.
# This file deliberately contains only the values that differ from the defaults.
# For changes and documentation, use your favorite diff tool to compare it with:
# https://github.com/camunda/camunda-platform-helm/blob/main/charts/camunda-platform/values.yaml

global:
  ingress:
    enabled: true
    className: nginx
    host: "$CAMUNDA_HOSTNAME"
    tls:
      enabled: true
      secretName: "tls-secret"
  image:
    tag: latest
    # pullPolicy: Always
  identity:
    keycloak:
      url:
        protocol: https
        host: $CAMUNDA_HOSTNAME
        port: 443
        contextPath: /auth
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

  keycloak:
    extraEnvVars:
      - name: KEYCLOAK_PROXY_ADDRESS_FORWARDING
        value: "true"
      - name: KEYCLOAK_FRONTEND_URL
        value: "https://$CAMUNDA_HOSTNAME/auth"

zeebe-gateway:
  ingress:
    enabled: true
    className: nginx
    host: "$CAMUNDA_HOSTNAME"
  replicas: 1
  resources:
    requests:
      memory: "512Mi"
      cpu: "250m"
    limits:
      memory: "2048Mi"
      cpu: "1000m"

zeebe:
  clusterSize: 1
  partitionCount: 1
  replicationFactor: 1
  pvcSize: 1Gi

  resources:
    requests:
      cpu: "100m"
      memory: "512M"
    limits:
      cpu: "512m"
      memory: "2Gi"

elasticsearch:
  enabled: true
  master:
    replicaCount: 1
  resources:
    requests:
      cpu: "100m"
      memory: "512M"
    limits:
      cpu: "1000m"
      memory: "2Gi"
```

Then run the following command to replace the template with the environment variables specified:

```
envsubst < values_template.yaml > values.yaml
```

Then save this file as `values-aws.yaml`. This will ensure all of the images are referencing the ones hosted in AWS and do not require any extra credentials to access.

```
global:
  image:
    tag: 8.2.13

zeebe:
  image:
    repository: 709825985650.dkr.ecr.us-east-1.amazonaws.com/camunda/zeebe

zeebe-gateway:
  image:
    repository: 709825985650.dkr.ecr.us-east-1.amazonaws.com/camunda/zeebe

operate:
  image:
    repository: 709825985650.dkr.ecr.us-east-1.amazonaws.com/camunda/operate

tasklist:
  image:
    repository: 709825985650.dkr.ecr.us-east-1.amazonaws.com/camunda/tasklist

optimize:
  image:
    repository: 709825985650.dkr.ecr.us-east-1.amazonaws.com/camunda/optimize
    tag: 3.10.4

identity:
  firstUser:
    enabled: true
    username: admin
  image:
    repository: 709825985650.dkr.ecr.us-east-1.amazonaws.com/camunda/identity
    tag: 19.0.3

  keycloak:
    postgresql:
      image:
        repository: 709825985650.dkr.ecr.us-east-1.amazonaws.com/camunda/postgresql
        tag: 15.4.0

    image:
      repository: 709825985650.dkr.ecr.us-east-1.amazonaws.com/camunda/keycloak

webModeler:
  image:
    registry: 709825985650.dkr.ecr.us-east-1.amazonaws.com
    tag: 3.10.4
  restapi:
    image:
      repository: camunda/modeler-restapi
  webapp:
    image:
      repository: camunda/modeler-webapp
  websockets:
    image:
      repository: camunda/modeler-websockets

connectors:
  image:
    repository: 709825985650.dkr.ecr.us-east-1.amazonaws.com/camunda/connectors-bundle
    tag: 0.23.2


console:
  image:
    repository: 709825985650.dkr.ecr.us-east-1.amazonaws.com/camunda/console-sm

elasticsearch:
  image:
    registry: 709825985650.dkr.ecr.us-east-1.amazonaws.com/
    repository: camunda/elasticsearch
    tag: 8.8.2
```

### Create a namespace

Create a namespace to put this deployment into, and set the current context into that namespace

```
kubectl create namespace camunda
kubectl config set-context --current --namespace=camunda
```

### Login to AWS ECR from command line

Log into the AWS ECR

```
aws ecr get-login-password \
    --region us-east-1 | helm registry login \
    --username AWS \
    --password-stdin 709825985650.dkr.ecr.us-east-1.amazonaws.com
```

### Create a TLS certificate

Now would be a good time to create a trusted TLS certificate and upload it into the k8s cluster. If you have a certificate ready, you can create a secret named "tls-secret" from it with the following command:

```
kubectl create secret tls tls-secret --cert=<certificate> --key=<private-key>
```

The values.yaml in the previous steps are configured to use a secret named "tls-secret". If you decide to call it something else, make sure you modify the values.yaml file from the previous steps.

### Pull and run the helm chart

Pull the helm chart

```
mkdir awsmp-chart && cd awsmp-chart
helm pull oci://709825985650.dkr.ecr.us-east-1.amazonaws.com/camunda/camunda-platform --version 8.2.13

tar xf $(pwd)/* && find $(pwd) -maxdepth 1 -type f -delete
```

Run the helm chart

```
helm install camunda \
    --namespace camunda \
    -f ../values.yaml \
    -f ../values-aws.yaml \
    --skip-crds \
    ./*
```

The application is now deployed. If you want to modify any part of the values.yaml further, follow the helm upgrade guide listed here: https://docs.camunda.io/docs/self-managed/platform-deployment/helm-kubernetes/upgrade/

### Create a DNS record to point to the AWS LoadBalancer

Create a DNS record to point to the AWS LoadBalancer. To get the ip address of the LoadBalancer
