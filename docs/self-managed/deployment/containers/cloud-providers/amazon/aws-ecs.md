---
id: aws-ecs
title: "Deploy the Orchestration Cluster to Amazon ECS"
description: "Install the Camunda 8 Orchestration Cluster on AWS Elastic Container Service using Fargate and Aurora PostgreSQL."
---

Install the [Camunda 8 Orchestration Cluster](/reference/glossary.md#orchestration-cluster) on AWS Elastic Container Service (ECS) using Fargate and Aurora
PostgreSQL.

## About

In this guide, you:

- Deploy a Self-Managed Camunda 8 environment using AWS managed services.
- Verify all required components and connections are working.

To learn more about the resulting infrastructure, read [ECS Architecture](./about/ecs-architecture.md).

## Considerations

- **Running this guide incurs costs on your AWS account**, primarily for ECS and Aurora. Use the AWS [pricing calculator](https://calculator.aws/#/) to estimate costs for your region. If you want a simpler setup, consider using [Camunda 8 SaaS](https://accounts.camunda.io/signup).
- This guide is based on an experimental release, beginning with Camunda 8.9.0-alpha3. **Content and results may change before the final 8.9.0 release.**
- Only the Orchestration Cluster and Connectors are included. Web Modeler, Optimize, and Console are out-of-scope for this guide.
- Unlike our other guides, which usually separate infrastructure setup from the deployment of Camunda 8, this is not the case with ECS. Since the infrastructure is largely managed by AWS, deploying Camunda 8 and provisioning the required AWS resources happen in a single step.
- Scaling is a manual process as it requires invoking the [cluster scaling API](../../../../components/orchestration-cluster/zeebe/operations/cluster-scaling.md) for joining and removing a Zeebe broker. Autoscaling may not have effects as the brokers have to be explicitly joined into the Zeebe Cluster or when removed result in partitions or data becoming inaccessible.
- An extra developed node-id provider is integrated into Zeebe that assigns an available node-id based on Zeebe cluster information, whereas this is typically provided statically.

:::note
With this guide, you'll deploy the Orchestration Cluster and Connectors to ECS using a particular terraform example implementation. There are many changes you can make to the example implementation or deployment steps to meet your needs. To learn more, read [Terraform implementation for Amazon ECS](./about/terraform-implementation.md).
:::

## Prerequisites

- An AWS account to provision resources.
  - This requires read and write permissions for: `ecs`, `iam`, `elasticloadbalancing`, `elasticfilesystem`, `secretsmanager`, `servicediscovery`, `servicequotas`, `ec2`, `kms`, `logs`, `s3`, and `rds` services. Refer to this [example policy](https://github.com/camunda/camunda-deployment-references/tree/main/aws/containers/ecs-single-region-fargate/example/policy.json) for details.
  - The user who creates AWS resources retains administrative access to them. Therefore, to ensure the resources are properly managed and owned by a single identity, Camunda recommends you use a dedicated AWS IAM user for Terraform to ensure better control and security.
- [Terraform](https://developer.hashicorp.com/terraform/install) (v1.7 or later) for managing infrastructure as code.
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) to manage AWS resources.
- [AWS Quotas](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html):
  - Ensure at least **3 Elastic IPs** (one per availability zone).
  - Verify quotas for **VPCs, EC2 instances, and storage**.
  - Request increases, if needed, via the [AWS console](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-resource-limits.html). Costs apply only for resources you provision and use.

Refer to [.tool-versions](https://github.com/camunda/camunda-deployment-references/blob/main/.tool-versions) for the exact tool versions used during testing.

## Set AWS credentials

1. Create [access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) for your Terraform user via the AWS console.

2. Set the AWS credentials:

   ```bash
   export AWS_ACCESS_KEY_ID=<your-access-key-id>
   export AWS_SECRET_ACCESS_KEY=<your-secret-access-key>
   ```

   Both the AWS CLI and Terraform will use these credentials.

3. Ensure your credentials are correct:

   ```bash
   aws sts get-caller-identity
   ```

## Create an S3 bucket

Create an S3 bucket for storing the Terraform state file. This is essential for collaborative work and helps prevent issues such as state file corruption.

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

With the reference architecture, you can reuse and extend the provided Terraform examples. This flexible implementation avoids the constraints of relying on Terraform modules maintained by third-party developers.

## Initialize Terraform

1. Change to the `terraform/cluster` directory:

   ```bash
   cd terraform/cluster
   ```

2. Initialize and configure Terraform's backend to store the state file remotely in your S3 bucket:

   ```bash reference
   https://github.com/camunda/camunda-deployment-references/blob/main/aws/common/procedure/s3-bucket/s3-bucket-tf-init.sh
   ```

Terraform will now use the S3 bucket to manage the state file, ensuring secure and persistent storage.

## Create resources

1. Plan the configuration files:

   ```bash
   terraform plan -out cluster.plan # describe what will be created
   ```

2. After reviewing the plan, confirm and apply the changes:

   ```bash
   terraform apply cluster.plan     # apply the creation
   ```

Terraform provisions:

- VPC and related resources, including IAM roles.
- Aurora PostgreSQL Cluster within the VPC. This includes [seeding the database](./about/terraform-implementation.md#initial-user-seeding).
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

## Troubleshooting

For general troubleshooting assistance, consult the [operational guides troubleshooting documentation](../../../../operational-guides/troubleshooting.md).

### Access tasks or management API

ECS tasks are not easily accessible without workarounds, some options are the following:

- EC2 / ECS debug instance / task within the same VPC to try to ping and use the [management API](../../../../components/orchestration-cluster/zeebe/operations/management-api.md)
- AWS VPN connected to the VPC
- Lambda functions
- Step functions
- Temporarily exposing the management API
- Temporarily set `task_enable_execute_command` to `true` and redeploy to allow accessing the running container

```sh
aws ecs execute-command \
  --cluster $ECS_CLUSTER \
  --task $ECS_TASK_ID \
  --container orchestration-cluster \
  --command "/bin/sh" \
  --interactive
```

You can find more information about `AWS ECS Exec` within the [AWS documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec-run.html).

## Backup and restore

The general [backup and restore procedure](../../../../operational-guides/backup-restore/backup-and-restore.md) applies.

The backup process, itself, doesn't require changes.

Restoring, however, introduces additional complexity because each broker's data directory (persistent volume) must be restored in a coordinated manner. To support this, an init container is introduced as part of the Orchestration Cluster, responsible for restoring the data directory for the broker running in that task. This mechanism corresponds to the step of [restoring the Zeebe Cluster](../../../../operational-guides/backup-restore/backup-and-restore.md).

This approach is implemented in the example module. Provide the `restore_backup_id` parameter to enable it.

On startup, the init container leverages the node-id provider to determine its broker ID in alignment with the other tasks. It restores the partitions associated with that broker, then blocks execution until all brokers have completed their restore operations. Afterward, the init container exits, allowing the Orchestration Cluster container to start.

You must configure the init container and the Orchestration Cluster container identically. If you use environment variables, this requirement is automatically satisfied. If configuration is distributed through other mechanisms, those must also be explicitly applied to the init container.

As long as the `restore_backup_id` parameter remains set, the init container remains part of the task definition. After the backup has been successfully restored, subsequent executions will effectively be no-ops until the parameter is removed.

## Next steps

Now that you've set up your cluster, consider these next steps:

- [Connect to an identity provider](/self-managed/components/orchestration-cluster/identity/connect-external-identity-provider.md) – integrate with an external identity system for authentication.
- [Add TLS](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html) and configure a [custom domain](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/application-load-balancers.html#dns-name) for the Application Load Balancer (ALB).
