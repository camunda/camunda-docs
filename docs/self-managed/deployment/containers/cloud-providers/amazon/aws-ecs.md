---
id: aws-ecs
title: "Amazon ECS on AWS"
description: "Learn how to install Camunda 8 on AWS ECS."
---

Install the [Camunda 8 Orchestration Cluster](/reference/glossary.md#orchestration-cluster) on AWS Elastic Container Service (ECS) using Fargate and Aurora
PostgreSQL.

## About

You deploy a Self-Managed Camunda 8 environment using AWS managed services and then verify that all required components and connections are working.

This guide focuses on setting up the [Orchestration Cluster](/self-managed/reference-architecture/reference-architecture.md#orchestration-cluster-vs-web-modeler-and-console) and Connectors for Camunda 8. Web Modeler, Optimize, and Console are currently not covered.

## Considerations

:::warning Experimental release (8.9.0-alpha3)
This guide is based on an experimental release. Content and results may change before the final 8.9.0 release.
:::

Running this guide incurs costs on your AWS account, primarily for ECS and Aurora. Use the AWS [pricing calculator](https://calculator.aws/#/) to estimate costs for your region.

If you want a simpler setup, consider using [Camunda 8 SaaS](https://accounts.camunda.io/signup).

## Outcome

The result is a fully functioning Camunda Orchestration Cluster deployed in a high-availability setup using AWS ECS with Fargate and a managed Aurora PostgreSQL instance using IAM authentication. All ECS tasks share a single EFS volume dedicated to Camunda.

## Prerequisites

- **AWS account** – An AWS account to provision resources with permissions for **ecs**, **iam**, **elasticloadbalancing**, **kms**, **logs**, and **rds** services.
  - The user who creates AWS resources retains administrative access to them. Therefore, to ensure the resources are properly managed and owned by a single identity, Camunda recommends you use a dedicated AWS IAM user for Terraform to ensure better control and security.
  - For detailed permissions, refer to this [example policy](https://github.com/camunda/camunda-deployment-references/tree/main/aws/containers/ecs-single-region-fargate/example/policy.json).
- **Terraform** – Infrastructure as code tool (v1.7 or later). [Install Terraform](https://developer.hashicorp.com/terraform/install).
- **AWS CLI** – Command-line tool to manage AWS resources, used for `local-exec` to trigger the initial Aurora PostgreSQL user seeding. [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

For the exact tool versions used during testing, refer to the repository's [.tool-versions](https://github.com/camunda/camunda-deployment-references/blob/main/.tool-versions) file.

## Set AWS credentials

1. Create [access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) for your Terraform user via the AWS console.
2. Set the [AWS credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html):

   ```bash
   export AWS_ACCESS_KEY_ID=<your-access-key-id>
   export AWS_SECRET_ACCESS_KEY=<your-secret-access-key>
   ```

   Both the AWS CLI and Terraform will use those credentials.

3. Ensure your credentials are correct:

   ```bash
   aws sts get-caller-identity
   ```

## Create an S3 bucket

Create an S3 bucket to store the Terraform state file. This is essential for collaborative work and helps prevent issues such as state file corruption.

1. Set your preferred AWS region as an environment variable:

   ```bash
   export AWS_REGION=<your-region>  # For example: eu-central-1
   ```

2. Create an S3 bucket:

   ```bash reference
   https://github.com/camunda/camunda-deployment-references/blob/main/aws/common/procedure/s3-bucket/s3-bucket-creation.sh
   ```

3. Enable versioning on the S3 bucket to track changes and protect the state file from accidental deletions or overwrites:

   ```bash reference
   https://github.com/camunda/camunda-deployment-references/blob/main/aws/common/procedure/s3-bucket/s3-bucket-versioning.sh
   ```

4. Secure the bucket by blocking public access:

   ```bash reference
   https://github.com/camunda/camunda-deployment-references/blob/main/aws/common/procedure/s3-bucket/s3-bucket-private.sh
   ```

5. Verify versioning is enabled on the bucket:

   ```bash reference
   https://github.com/camunda/camunda-deployment-references/blob/main/aws/common/procedure/s3-bucket/s3-bucket-verify.sh
   ```

The S3 bucket is now ready to securely store your Terraform state files.

## Clone the reference architecture

```bash reference
https://github.com/camunda/camunda-deployment-references/tree/main/aws/containers/ecs-single-region-fargate/procedure/get-your-copy.sh
```

To use another version of the reference architecture, change the branch. For example, `BRANCH="stable/8.8"`.

With the reference architecture, you can reuse and extend the provided Terraform examples. This flexible implementation avoids the constraints of relying on Terraform modules maintained by third-party developers.

## Initialize Terraform

1. Change to the `terraform/cluster` subfolder:

   ```bash
   cd terraform/cluster
   ```

2. Initialize the backend and configure Terraform's backend to store the state file remotely in your S3 bucket:

   ```bash reference
   https://github.com/camunda/camunda-deployment-references/blob/main/aws/common/procedure/s3-bucket/s3-bucket-tf-init.sh
   ```

Terraform will now use the S3 bucket to manage the state file, ensuring secure and persistent storage.

## Create resources

1. Plan the configuration files:

   ```bash
   terraform plan -out cluster.plan # describe what will be created
   ```

2. After reviewing the plan, you can confirm and apply the changes:

   ```bash
   terraform apply cluster.plan     # apply the creation
   ```

With this, Terraform provisions:

- VPC and related resources, including IAM roles.
- Aurora Postgres Cluster within the VPC. This includes [seeding the database](./about/terraform-implementation.md#aurora-postgresql-initial-user-seeding).
- Orchestration Cluster.
- Connectors.

This process may take 20–30 minutes to complete.

## Connect to Camunda 8

1. Extract the Application Load Balancer (ALB) endpoint from the state file, and access it in your browser:

   ```sh
   terraform output -raw alb_endpoint
   ```

2. Log in with these credentials:
   - **Username:** `admin`
   - **Password:** Extract the randomly-generated password from the state file:

   ```sh
   terraform output -raw admin_user_password
   ```

3. Use the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) to communicate with Camunda.

## Next steps

After setting up your cluster, many users typically do the following:

- [Connect to an identity provider](/self-managed/components/orchestration-cluster/identity/connect-external-identity-provider.md) – integrate with an external identity system for authentication.
- [Add TLS](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html) and configure a [custom domain](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/application-load-balancers.html#dns-name) for the Application Load Balancer (ALB).
