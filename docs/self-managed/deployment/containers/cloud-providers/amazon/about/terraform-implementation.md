---
id: terraform-implementation
title: "Terraform implementation"
description: "Learn about the Terraform implementation for the ECS single-region (Fargate) reference architecture."
---

Learn about the Terraform implementation for the ECS single-region (Fargate) reference architecture.

:::note Terraform infrastructure example
Camunda doesn't recommend using the following Terraform-based infrastructure as a module, since we cannot guarantee compatibility.

Instead, we suggest [reusing or extending components of the Terraform example](#terraform-implementation.md) to ensure alignment with your environment.
:::

:::note Secret management
Camunda strongly recommends managing sensitive information using a secure secrets management tool such as HashiCorp Vault. For guidance on injecting secrets into Terraform via Vault, refer to the [Terraform Vault Secrets Injection Guide](https://developer.hashicorp.com/terraform/tutorials/secrets/secrets-vault).
:::

## Root workspace

The root workspace houses the overall implementation to keep things configurable and interchangeable as needed.

While each Camunda component is kept as a separate module to abstract the need of each component as it's required with their base setup.

If wanting to deploy multiple Camunda 8 setups, it may make sense to abstract the root workspace to a common module as well to allow easier scaling.

If not otherwise indicated, the `.tf` file is corresponding to the [root workspace path](https://github.com/camunda/camunda-deployment-references/tree/main/aws/containers/ecs-single-region-fargate/terraform/cluster).

## Elastic Container Service

`ecs.tf` contains the ECS cluster, which is just a logical component to group ECS resources.

`../../modules/ecs/fargate/orchestration-cluster` is the main component `Orchestration Cluster` of Camunda and contains the definitions for:

- ECS Service and task definition
  - Defines the base setup for the Orchestration Cluster, including the node ID provider, EFS configuration, and initial cluster endpoints.
  - Automatically sets the Zeebe cluster size based on the task count.
  - Resolves initial contact points using DNS with multiple A records instead of requiring explicit Zeebe broker addresses.

- Task-specific IAM role
  - Grants access to AWS services required by this component, such as the S3 bucket and Aurora PostgreSQL.

- S3 bucket
  - Used by the ECS-specific node ID provider.

- CloudWatch log group
  - Used for Orchestration Cluster logs.
  - Can be shared with other Camunda components that have a one-to-one relationship with the Orchestration Cluster, such as Connectors.

- Networking configuration
  - Integrates with ECS Service Connect and Amazon Route 53 to enable access from within the VPC, including from resources outside the ECS cluster (for example, EC2 instances or Kubernetes clusters).

- Load balancer configuration
  - Adds listener rules to a shared load balancer for the Orchestration Cluster and Connectors.

- EFS file system

The base terraform documentation for this module can be found [alongside the repository](https://github.com/camunda/camunda-deployment-references/tree/main/aws/modules/ecs/fargate/orchestration-cluster).

`../../modules/ecs/fargate/connectors` is a secondary component `Connectors` and contains the definitions for:

- ECS Service and Task definition
- Task specific IAM role to allow access to AWS services isolated to this component
- Load Balancer related configurations to add listener rules to a shared Load Balancer between Orchestration Cluster and Connectors

The base terraform documentation for this module can be found [alongside the repository](https://github.com/camunda/camunda-deployment-references/tree/main/aws/modules/ecs/fargate/connectors).

`camunda.tf` contains the module invocations with an example base configuration for the Orchestration Cluster and Connectors:

- Aurora PostgreSQL configuration with the [AWS JDBC Wrapper](https://github.com/aws/aws-advanced-jdbc-wrapper) that comes as part of the Camunda distribution
- Basic auth Identity setup
  - Admin user with random password
  - Connectors user with random password configured and pre-configured for Connectors to consume to connect to the Orchestration Cluster

In `camunda.tf` you can pass in any configuration adjustment required for the component or increase the resources. A few configuration options as mentioned above are kept as part of the modules to ensure the user can't interfere with the base setup. If you need to adjust those, then you have to adjust those in your copy of the modules.

## Aurora PostgreSQL

`postgres.tf` provisions an Aurora PostgreSQL cluster with a pre-created `camunda` database and admin credentials saved in the AWS Secrets Manager. This Aurora PostgreSQL cluster is used as secondary storage for the Orchestration Cluster.

`postgres_seed.tf` provisions a temporary ECS task to pre-seed the database for IAM authentication to work. The Aurora PostgreSQL cluster is not easily accessible from the outside as we don't expose it, therefore a workaround is required to do the initial user creation for the IAM authentication to work instead of using hard-coded username/password combinations.

## Miscellaneous Resources

`registry-auth.tf` contains the basics to create a secret via the AWS Secrets Manager for any kind of registry to access the Camunda images or bypass rate limitations.

`lb.tf` contains the creation of the main Network Load Balancer (NLB) and the Application Load Balancer (ALB).

`iam.tf` contains various IAM roles and policies.

`secrets.tf` contains the creation of random passwords and storage in AWS Secrets Manager.

## Advanced Topics

### Camunda components configuration

The Terraform implementation does not abstract any configuration and anything you need to configure for the Camunda components can be found within their own documentation.

Camunda components can be configured for example via environment variables or an application YAML.

#### Environment Variables

The base configuration is done via environment variables and defined directly as is in the invocation of the module.

Example:

```bash title="orchestration-cluster-env"
KEY=VALUE
KEY2=VALUE2
KEY3=${template}
```

The file `orchestration-cluster-env` could then be loaded in Terraform via:

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

This can then be passed to the module invocation

```hcl
environment_variables = local.env_kv_pairs # or mixed with the concat function
```

#### Application YAML

Pull application YAML on startup via init container from external store or integrate in Terraform

Example:

```hcl
init_container_enabled = true
init_container_image   = "public.ecr.aws/amazonlinux/amazonlinux:minimal"
init_container_command = ["sh", "-c", "curl -fsSL https://example.com/additional-properties.yaml -o /config/additional-properties.yaml"]
```

Add this as part of your module environment usages to let Spring know to load the additional file.

```hcl
{
  name  = "SPRING_CONFIG_IMPORT"
  value = "file:./config/additional-properties.yaml"
}
```

`/config` is a shared ephemeral volume between the init container and the running container.

### Terraform Configuration

The base terraform documentation for the Orchestration can be found [alongside the repository](https://github.com/camunda/camunda-deployment-references/tree/main/aws/modules/ecs/fargate/orchestration-cluster) as well as for [Connectors](https://github.com/camunda/camunda-deployment-references/tree/main/aws/modules/ecs/fargate/connectors).

Some common topics to potentially change:

#### Resources

```hcl
# both modules

task_cpu              = 4096
task_cpu_architecture = "X86_64"
task_memory           = 8192

# Orchestration Cluster

efs_provisioned_throughput_in_mibps = 50
```

#### Camunda

##### Image

```hcl
# both modules

image = "camunda/camunda:VERSION" # "camunda/connectors-bundle:VERSION"
```

You could supply your custom registry and version this way like:

```hcl
image = "ghcr.io/NAMESPACE/IMAGE_NAME:VERSION"
```

##### Sizing

```hcl
# both modules

task_desired_count = X
# in case of Orchestration Cluster automatically changes the `camunda.cluster.size`
```

##### Wait for ready

This flag ensures that Terraform waits until the ECS service is successfully deployed.

It is useful when other components, such as Connectors, depend on the Orchestration Cluster, because it prevents them from being deployed before the cluster is ready.

If you disable this flag, Terraform deploys all resources at once without waiting for service readiness.

```hcl
# both modules
wait_for_steady_state = true
```

### Aurora PostgreSQL initial user seeding

When wanting to use IAM authentication to simplify the authentication between Orchestration Cluster and Aurora PostgreSQL cluster then an initial seeding of the database is required to have a passwordless user with the `rds_iam` role assigned. More information about IAM authentication with Aurora can be found in the [AWS documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.DBAccounts.html#UsingWithRDS.IAMDBAuth.DBAccounts.PostgreSQL).

Terraform itself can't do this initial seeding as the Aurora PostgreSQL is not publicly exposed, so a workaround is needed. In our reference architecture to keep things simple and working ideally immediately, a local execution was used that triggers a one time seeding job to do the required steps as the ECS has access to Aurora PostgreSQL cluster.

It was implemented as a `local exec` with an ECS task since we wanted to provide a fully working reference end-to-end while still relying on something like IAM authentication.

### Rolling deployments

The Orchestration Cluster is stateful and overprovisioning will not help the deployment to reach a ready state quicker as we're limited by the Zeebe node-ids and brokers only becoming ready when successfully joining a cluster. Therefore, the Orchestration Cluster does a deployment of maximum `100%` of tasks and minimum `66%` to ensure quorum is kept. If using smaller task sizes, you may have to consider using `service_force_new_deployment = true` to force a new deployment as otherwise the minimum and maximum task size will block a successful update.

For the Connectors task, it's kept at a maximum of `200%` and minimum of `50%` as the application is stateless and can therefore scale above the initial target during upgrades.
