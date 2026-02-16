---
id: terraform-implementation
title: "Terraform implementation for Amazon ECS"
description: "Learn about the Terraform implementation for the ECS single-region (Fargate) reference architecture."
---

Learn about the example Terraform implementation for deploying the Orchestration Cluster to Amazon ECS single-region.

## About

In [Deploy the Orchestration Cluster to Amazon ECS](../aws-ecs.md), you use an [example Terraform implementation](https://github.com/camunda/camunda-deployment-references/tree/main/aws/containers/ecs-single-region-fargate/terraform/cluster). In this document, you'll learn about its implementation details.

## Considerations

- When deploying the Orchestration Cluster to Amazon ECS, Camunda recommends not treating the published example Terraform implementation as a reusable Terraform module. We can't guarantee its compatibility over time. Instead, reuse or extend components of the example to align with your environment.
- Camunda strongly recommends managing sensitive information using a secure secrets management tool such as HashiCorp Vault. For guidance on injecting secrets into Terraform via Vault, refer to the [Terraform Vault Secrets Injection Guide](https://developer.hashicorp.com/terraform/tutorials/secrets/secrets-vault).

## Root workspace

The root workspace houses the overall implementation. It's designed to be configurable, and its resources are interchangeable.

Each Camunda component is implemented as its own Terraform module. Each module encapsulates the resources and configuration the component requires, isolating them from the rest of your infrastructure code. With this modular approach, you have the flexibility to compose and adjust your Camunda deployment to match your environment.

:::tip
If you plan to deploy multiple Camunda 8 setups, you may want to refactor your local root workspace into an internal Terraform module to allow easier scaling.
:::

In the next sections, you'll learn more about selected Terraform modules.

## Elastic Container Service

### Amazon ECS cluster

[`ecs.tf`](https://github.com/camunda/camunda-deployment-references/blob/main/aws/containers/ecs-single-region-fargate/terraform/cluster/ecs.tf) contains the Amazon ECS cluster. This is a logical component to group ECS resources.

### Orchestration Cluster in Amazon ECS

[`/aws/modules/ecs/fargate/orchestration-cluster`](https://github.com/camunda/camunda-deployment-references/tree/main/aws/modules/ecs/fargate/orchestration-cluster) is the main component of Camunda, the Orchestration Cluster.

It defines the following:

- **ECS Service and task definition**
  - The base setup for the Orchestration Cluster, including the node ID provider, EFS configuration, and initial cluster endpoints.
  - Automatically sets the Zeebe cluster size based on the task count.
  - Resolves initial contact points using DNS with multiple A records instead of requiring explicit Zeebe broker addresses.
- **Task-specific IAM role**
  - Grants access to AWS services required by this component, such as the S3 bucket and Aurora PostgreSQL.
- **S3 bucket**
  - Used by the ECS-specific node ID provider.
- **CloudWatch log group**
  - Used for Orchestration Cluster logs.
  - Can be shared with other Camunda components that have a one-to-one relationship with the Orchestration Cluster, such as Connectors.
  - Logs are also visible in the ECS Service alongside each task.
- **Networking configuration**
  - Integrates with ECS Service Connect and Amazon Route 53 to enable access from within the VPC, including from resources outside the ECS cluster (for example, EC2 instances or Kubernetes clusters).
- **Load balancer configuration**
  - Adds listener rules to a shared load balancer for the Orchestration Cluster and Connectors.
- **EFS file system**
  - This infrastructure relies on a shared [multi-AZ replicated](https://docs.aws.amazon.com/efs/latest/ug/efs-replication.html) EFS network disk. Sharing a single EFS volume across brokers enables native ECS Service features.

:::note Additional resource
Learn more in the module's [README](https://github.com/camunda/camunda-deployment-references/blob/main/aws/modules/ecs/fargate/orchestration-cluster/README.md).
:::

## Connectors

[`/aws/modules/ecs/fargate/connectors`](https://github.com/camunda/camunda-deployment-references/tree/main/aws/modules/ecs/fargate/connectors) is a secondary component, Connectors.

It defines the following:

- **ECS Service and task definition**
- **Task-specific IAM role**
  - Grants access to AWS services isolated to this component.
- **Load balancer-related configurations**
  - Add listener rules to a shared load balancer between the Orchestration Cluster and Connectors.

:::note Additional resource
Learn more in the module's [README](https://github.com/camunda/camunda-deployment-references/blob/main/aws/modules/ecs/fargate/connectors/README.md).
:::

## Orchestration Cluster and Connectors

[`camunda.tf`](https://github.com/camunda/camunda-deployment-references/blob/main/aws/containers/ecs-single-region-fargate/terraform/cluster/camunda.tf) contains the module invocations with an example base configuration for the Orchestration Cluster and Connectors:

- **Aurora PostgreSQL configuration**
  - Includes the [AWS JDBC Wrapper](https://github.com/aws/aws-advanced-jdbc-wrapper) that comes as part of the Camunda distribution.
- **Basic authentication Identity setup**
  - The admin username is preconfigured as `admin`.
  - The admin password is randomly generated.
  - A user with a random password preconfigured for Connectors to use to connect to the Orchestration Cluster.

In `camunda.tf`, you can increase the resources or pass in any configuration adjustment required for the component. A few configuration options as mentioned above are kept as part of the modules to ensure the user can't interfere with the base setup. If you need to adjust those, you must do so in your copy of the modules.

## Rolling deployments

The Orchestration Cluster is stateful and over-provisioning won't help the deployment reach a ready state quicker as it's limited by the Zeebe node-ids and brokers only becoming ready when successfully joining a cluster. Therefore, the Orchestration Cluster does a deployment of maximum 100% of tasks and minimum 66% to ensure quorum is kept. If using smaller task sizes, you may have to consider using `service_force_new_deployment = true` to force a new deployment as otherwise the minimum and maximum task size will block a successful update.

For the Connectors task, it's kept at a maximum of 200% and minimum of 50% as the application is stateless and can, therefore, scale above the initial target during upgrades.

## Aurora PostgreSQL

### Aurora Cluster

[`postgres.tf`](https://github.com/camunda/camunda-deployment-references/blob/main/aws/containers/ecs-single-region-fargate/terraform/cluster/postgres.tf) provisions an Aurora PostgreSQL cluster with a pre-created `camunda` database and admin credentials saved in the AWS Secrets Manager. This Aurora PostgreSQL cluster is used as secondary storage for the Orchestration Cluster.

### Initial user seeding

When using IAM authentication to simplify the authentication between the Orchestration Cluster and Aurora PostgreSQL cluster, an initial seeding of the database is required to create a password-less user with the `rds_iam` role assigned.

:::note Additional resource
Read more about IAM authentication with Aurora in the [AWS documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.DBAccounts.html#UsingWithRDS.IAMDBAuth.DBAccounts.PostgreSQL).
:::

Terraform, itself, can't do this initial seeding as the Aurora PostgreSQL is not publicly exposed, so a workaround is needed. [`postgres_seed.tf`](https://github.com/camunda/camunda-deployment-references/blob/main/aws/containers/ecs-single-region-fargate/terraform/cluster/postgres_seed.tf) provisions a temporary ECS task to pre-seed the database for IAM authentication to work. The Aurora PostgreSQL cluster is not easily accessible from the outside as we don't expose it, therefore a workaround is required to do the initial user creation for the IAM authentication to work instead of using hard-coded username/password combinations.

It was implemented as a `local exec` with an ECS task since we wanted to provide a fully working reference end-to-end while still relying on something like IAM authentication.

## Load balancers

[`lb.tf`](https://github.com/camunda/camunda-deployment-references/blob/main/aws/modules/ecs/fargate/orchestration-cluster/lb.tf) contains the creation of the main Network Load Balancer (NLB) and the Application Load Balancer (ALB). The ALB exposes both the Orchestration and Connectors through the same port and uses listener rules with weights to determine the path they're on.

- ALB:80
  - `/*` routes to the Orchestration Cluster UI/REST API
  - `/connectors*` routes to the Connectors
- ALB:9600 (Optional. Not recommended to be exposed publicly)
  - `/*` routes to the Orchestration Cluster
  - Connectors has the management port with the web server combined by default
- NLB:26500 (TCP)
  - Exposes the Orchestration Cluster–Zeebe Gateway with gRPC

## Miscellaneous Resources

- [`registry-auth.tf`](https://github.com/camunda/camunda-deployment-references/blob/main/aws/containers/ecs-single-region-fargate/terraform/cluster/registry-auth.tf): The basics to create a secret via the AWS Secrets Manager for any kind of registry to access the Camunda images or bypass rate limitations.
- [`iam.tf`](https://github.com/camunda/camunda-deployment-references/blob/main/aws/containers/ecs-single-region-fargate/terraform/cluster/iam.tf): IAM roles and policies.
- [`secrets.tf`](https://github.com/camunda/camunda-deployment-references/blob/main/aws/containers/ecs-single-region-fargate/terraform/cluster/secrets.tf): Random passwords and storage in AWS Secrets Manager.
- [`s3.tf`](https://github.com/camunda/camunda-deployment-references/blob/main/aws/containers/ecs-single-region-fargate/terraform/cluster/s3.tf): A bucket for backup purposes with versioning and encryption enabled. Access is handled through IAM role policies.

## Variables

You can find the base terraform documentation for the [Orchestration Cluster](https://github.com/camunda/camunda-deployment-references/tree/main/aws/modules/ecs/fargate/orchestration-cluster) or [Connectors](https://github.com/camunda/camunda-deployment-references/tree/main/aws/modules/ecs/fargate/connectors) in the repository.

Here are examples of variables you might need to change to match your needs:

### Resources

```hcl
# Both modules

task_cpu              = 4096
task_cpu_architecture = "X86_64"
task_memory           = 8192

# Orchestration Cluster

efs_provisioned_throughput_in_mibps = 50
```

### Image

```hcl
# Both modules

image = "camunda/camunda:VERSION" # "camunda/connectors-bundle:VERSION"
```

You can also use a custom registry and version:

```hcl
image = "ghcr.io/NAMESPACE/IMAGE_NAME:VERSION"
```

### Sizing

```hcl
# Both modules

task_desired_count = X  # When changed for the Orchestration Cluster module, this changes the `camunda.cluster.size`
```

### Wait for ready

```hcl
# both modules
wait_for_steady_state = true
```

This flag ensures that Terraform waits until the ECS service is successfully deployed. It's useful when other components, such as Connectors, depend on the Orchestration Cluster, because it prevents them from being deployed before the cluster is ready.

If you disable this flag, Terraform deploys all resources at once without waiting for service readiness.

## Camunda components configuration

The Terraform implementation does not abstract any configuration, and you can find anything you need to configure the Camunda components in their own documentation.

You can configure Camunda components, for example, with environment variables or an application YAML.

### Environment Variables

The base configuration is done with environment variables and defined directly in the module invocation:

```bash title="orchestration-cluster-env"
KEY=VALUE
KEY2=VALUE2
KEY3=${template}
```

Then, the file `orchestration-cluster-env` can be loaded in Terraform:

```hcl
locals {
  # Combine with templatefile to replace dynamic values derived from Terraform
  env_lines = split("\n", templatefile("orchestration-cluster-env", {
    template = "SOME_TF_VALUE"
  }))

  # Splits KEY=VALUE into expected JSON
  env_kv_pairs = [
    for line in local.env_lines : {
      name  = trim(split("=", line)[0], " ")
      value = trim(join("=", slice(split("=", line), 1, length(split("=", line)))), " ")
    }
    if length(split("=", line)) > 1  # Filter out lines without '='
  ]
}
```

Finally, this can be passed to the module invocation:

```hcl
environment_variables = local.env_kv_pairs # or mixed with the concat function
```

### Application YAML

Pull application YAML on startup via init container from external store or integrate in Terraform:

```hcl
init_container_enabled = true
init_container_image   = "public.ecr.aws/amazonlinux/amazonlinux:minimal"
init_container_command = ["sh", "-c", "curl -fsSL https://example.com/additional-properties.yaml -o /config/additional-properties.yaml"]
```

Add this as part of your module environment to let Spring know to load the additional file:

```hcl
{
  name  = "SPRING_CONFIG_IMPORT"
  value = "file:./config/additional-properties.yaml"
}
```

`/config` is a shared ephemeral volume between the init container and the running container.

## Explore further resources

- [Deploy the Orchestration Cluster to Amazon ECS](../aws-ecs.md)
- [Learn about the ECS single-region (Fargate) reference architecture](./ecs-architecture.md).
