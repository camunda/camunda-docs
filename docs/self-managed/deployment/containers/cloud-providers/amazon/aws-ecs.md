---
id: aws-ecs
title: "Amazon ECS"
description: "Learn how to install Camunda 8 on AWS ECS."
---

This guide provides a detailed walkthrough for installing the [Camunda 8 Orchestration Cluster](/reference/glossary.md#orchestration-cluster) on AWS Elastic Container Service (ECS) using Fargate and Aurora PostgreSQL. It leverages AWS managed services, using ECS as the platform and Fargate as the runtime. Finally, you will verify that your Self-Managed Camunda 8 environment is deployed correctly and that all required connections are functioning as expected.

This guide focuses on setting up the [Orchestration Cluster](/self-managed/reference-architecture/reference-architecture.md#orchestration-cluster-vs-web-modeler-and-console) and Connectors for Camunda 8. Web Modeler, Optimize, and Console are currently not covered.

:::tip New to AWS ECS?
If you are new to AWS ECS or Terraform, consider reviewing the [AWS ECS documentation](https://docs.aws.amazon.com/ecs/) and [Terraform documentation](https://developer.hashicorp.com/terraform/docs) before proceeding with this guide.
:::

:::note Using other cloud providers
The concepts described in this guide can be applied to other cloud providers; however, you are responsible for the implementation and maintenance, and compatibility or correct behavior is not guaranteed. Certain implementations like the node-id provider are currently limited to S3.
:::

## Considerations

:::warning 8.9-alpha3 subject to changes
This is currently in active development and released as part of the 8.9-alpha3 release. Contents of the documentation and resulting work may still change till the final 8.9 release.
:::

:::danger Cost management
This guide will result in costs on your cloud provider account—primarily for ECS and AWS Aurora. Visit AWS and their [pricing calculator](https://calculator.aws/#/) for detailed cost estimates, as pricing varies by region.
:::

:::tip Looking for a simpler setup?
Consider using [Camunda 8 SaaS](https://accounts.camunda.io/signup).
:::

- Unlike our other guides, which usually separate infrastructure setup from the deployment of Camunda 8, this is not the case with ECS. Since the infrastructure is largely managed by AWS, deploying Camunda 8 and provisioning the required AWS resources happens in a single step.
- This work focuses on AWS ECS with Fargate but can work with managed instances for more predictable performance. You can find more information about how to migrate from Fargate to managed instances from the [AWS migration guide](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/migrate-fargate-to-managed-instances.html).
- This work relies on a shared [multi-AZ replicated](https://docs.aws.amazon.com/efs/latest/ug/efs-replication.html) EFS network disk
  - Cost and performance may differ from a related Kubernetes setup with block storage
  - The EFS volume is shared among all brokers to support the native ECS Service capabilities
- AWS does not support block storage options in combination with ECS Services and Fargate. For a detailed overview, have a look at the [AWS documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_data_volumes.html).
- Scaling is a manual process as it requires invoking the [cluster scaling API](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md) for joining and removing a Zeebe broker. Autoscaling may not have effects as the brokers have to be explicitly joined into the Zeebe Cluster or when removed result in partitions or data becoming inaccessible.
- An extra developed node-id provider is integrated into Zeebe that assigns an available node-id based on Zeebe cluster information, whereas this is typically provided statically.
- This guide focuses on Aurora PostgreSQL for the secondary datastorage as it's a newly supported offering by Camunda 8 and potentially more familiar for customers.
  - You may still use Elasticsearch / OpenSearch but need to adjust the required configuration. More information about the configuration can be found in [our documentation](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#data---secondary-storage).
  - Examples for how to deploy AWS OpenSearch can be found in other existing reference architectures for AWS.

## Outcome

The result is a fully functioning Camunda Orchestration Cluster deployed in a high-availability setup using AWS ECS with Fargate and a managed Aurora PostgreSQL instance using IAM authentication. All ECS tasks share a single EFS volume dedicated to Camunda.

### Architecture

The architecture outlined below describes a standard Zeebe three-node deployment, distributed across three [availability zones](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/) within a single AWS region. It includes a managed Aurora PostgreSQL instance deployed under the same conditions. This approach ensures high availability and redundancy in case of a zone failure.

<!-- The following diagram should be exported as an image and as a PDF from the sources https://miro.com/app/board/uXjVL-6SrPc=/ -->
<!-- To export: click on the frame > "Export Image" > as PDF and as JPG (low res), then save it in the ./assets/ folder -->

_Infrastructure diagram for a 3 Zeebe Broker ECS architecture (click the image to view the PDF version)_

[![AWS ECS Architecture](./assets/architecture.jpg)](./assets/architecture.pdf)

After completing this guide, you will have:

- A [Virtual Private Cloud](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html) (VPC), which is a logically isolated virtual network.
  - _For simplification the private and public were not visualized in the diagram above._
  - A [Private Subnet](https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html), which does not have direct internet access.
  - [Elastic Container Service (ECS) Cluster](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/clusters.html)
    - ECS Services for the Orchestration Cluster and Connectors
      - These spawn ECS tasks running on [Fargate](https://aws.amazon.com/fargate/)
    - [Elastic File System (EFS)](https://aws.amazon.com/efs/) as primary datastore for the Zeebe cluster
    - [Aurora PostgreSQL](https://aws.amazon.com/rds/aurora/) as secondary datastore
  - A [Public Subnet](https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html), which has internet access via an [Internet Gateway](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html).
    - (Optional) An [Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html) (ALB) to expose web interfaces such as Operate, Tasklist, Connectors, and the Orchestration Cluster REST API. This uses sticky sessions, as requests are otherwise distributed round-robin across ECS instances.
    - (Optional) A [Network Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html) (NLB) to expose the gRPC endpoint of the Zeebe Gateway, if external applications need to connect.
- [Security Groups](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html) to control network traffic to and from the ECS instances.
- An [Internet Gateway](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html) to route traffic between the VPC and the internet.
- A [S3 bucket](https://aws.amazon.com/s3/) used by the Orchestration Cluster’s ECS-specific node-id provider.
- [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/) for application credentials and optional container registry credentials.
- [AWS CloudWatch](https://aws.amazon.com/cloudwatch/) for logs.
- [ECS Service Connect](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-connect.html) to connect ECS services directly with each other.
- [IAM authentication](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.html) to connect the Orchestration Cluster with the Aurora PostgreSQL cluster.

Both subnet types are distributed across three availability zones in a single AWS region, supporting a high-availability architecture.

:::note
You can also run this setup scaled via the ECS Service to a single resulting task. However, in the event of a zone failure, the entire environment would become unreachable.
:::

## Prerequisites

- **AWS account** – An AWS account to provision resources with permissions for **ecs**, **iam**, **elasticloadbalancing**, **kms**, **logs**, and **rds** services.
  - For detailed permissions, refer to this [example policy](https://github.com/camunda/camunda-deployment-references/tree/main/aws/containers/ecs-single-region-fargate/example/policy.json).
- **Terraform** – Infrastructure as code tool (v1.7 or later). [Install Terraform](https://developer.hashicorp.com/terraform/install).
- **AWS CLI** – Command-line tool to manage AWS resources, used for `local-exec` to trigger the initial Aurora PostgreSQL user seeding. [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

For the exact tool versions used during testing, refer to the repository's [.tool-versions](https://github.com/camunda/camunda-deployment-references/blob/main/.tool-versions) file.

## 1. Configure AWS and initialize Terraform

:::note Terraform infrastructure example
We do not recommend using the following Terraform-based infrastructure as a module, since we cannot guarantee compatibility.

Instead, we suggest reusing or extending components of the Terraform example to ensure alignment with your environment.
:::

### Obtain a copy of the reference architecture

Start by downloading a copy of the reference architecture from the GitHub repository. This content will be used throughout the rest of the guide. The reference architectures are versioned according to Camunda releases (e.g., stable/8.x).

The reference architecture repository allows you to reuse and extend the provided Terraform examples. This flexible implementation avoids the constraints of relying on third-party-maintained Terraform modules:

```bash reference
https://github.com/camunda/camunda-deployment-references/tree/main/aws/containers/ecs-single-region-fargate/procedure/get-your-copy.sh
```

With the reference architecture in place, you can proceed with the remaining steps in this documentation. Make sure you're in the correct directory before continuing with the instructions.

### Terraform prerequisites

To manage Camunda 8 infrastructure on AWS using Terraform, you need to configure Terraform's backend to store the state file remotely in an S3 bucket. This provides secure, persistent primary storage for your infrastructure.

:::note
Advanced users may choose to configure a different backend. The setup described here is a recommended starting point for new users.
:::

#### Set up AWS authentication

The [AWS Terraform provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) is required to provision resources in AWS. Before using the provider, you must authenticate it with your AWS credentials.

:::caution Ownership of the created resources

Any user who creates AWS resources retains administrative access to them. For better control and security, it is recommended to create a dedicated [AWS IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html) specifically for Terraform. This ensures the resources are properly managed and owned by a single identity.

:::

You can customize the region and authentication settings as needed. Terraform supports multiple [authentication methods](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#authentication-and-configuration), including:

- For development or testing, you can use the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html). If your AWS CLI is already configured, Terraform will automatically detect and use those credentials.

To configure the AWS CLI:

```bash
aws configure
```

Enter your `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, region, and output format. These can be retrieved from the [AWS Console](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).

- For production environments, it is recommended to use a dedicated IAM user. Create [access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) for that user via the AWS console, and export them as environment variables: `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`.

#### Create an S3 bucket for Terraform state management

Before initializing Terraform, you must create an S3 bucket to store the state file. This is essential for collaborative work and helps prevent issues such as state file corruption.

Begin by setting your preferred AWS region as an environment variable to avoid repeating it in every command:

```bash
export AWS_REGION=<your-region>
```

Replace `<your-region>` with your chosen AWS region (e.g., `eu-central-1`).

Next, follow these steps to create an S3 bucket with versioning enabled:

1. Open your terminal and ensure that the AWS CLI is installed and properly configured.

2. Run the following command to create an S3 bucket for storing your Terraform state. Be sure to choose a unique bucket name, and ensure that the `AWS_REGION` environment variable is already set:

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

The S3 bucket is now ready to securely store your Terraform state files, with versioning enabled for added protection.

#### Initialize Terraform

Once authentication is configured, you can initialize your Terraform project. Earlier, you created a dedicated S3 bucket (`S3_TF_BUCKET_NAME`) for storing the state file. In this step, Terraform will use that bucket along with a specific key to manage your infrastructure state.

Initialize the backend and download the required provider plugins:

:::note
Make sure you are in the `terraform` subfolder: `camunda-deployment-references/aws/containers/ecs-single-region-fargate/terraform`.
:::

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/aws/common/procedure/s3-bucket/s3-bucket-tf-init.sh
```

Terraform will now use the S3 bucket to manage the state file, ensuring remote and persistent storage.

## 2. Terraform setup

The root workspace houses the overall implementation to keep things configurable and interchangeable as needed.

While each Camunda component is kept as a separate module to abstract the need of each component as it's required with their base setup.

If wanting to deploy multiple Camunda 8 setups, it may make sense to abstract the root workspace to a common module as well to allow easier scaling.

If not otherwise indicated, the `.tf` file is corresponding to the [root workspace path](https://github.com/camunda/camunda-deployment-references/tree/main/aws/containers/ecs-single-region-fargate/terraform).

### Elastic Container Service

`ecs.tf` contains the ECS cluster, which is just a logical component to group ECS resources.

`../modules/ecs/fargate/orchestration-cluster` is the main component `Orchestration Cluster` of Camunda and contains the definitions for:

- ECS Service and Task definition
  - the task definition contains the base setup for the Orchestration Cluster concerning the node-id provider and the EFS configuration as well as initial cluster endpoint. Zeebe Cluster size is automatically set to the task size.
  - Camunda 8 supports for the initial contact points to resolve a DNS name with multi A records instead of having to define every single exact Zeebe broker address.
- Task specific IAM role to allow access to AWS services isolated to this component
  - e.g. S3 bucket or Aurora PostgreSQL access
- S3 bucket for the node-id provider functionality
- CloudWatch group as the Orchestration Cluster is the main component to be run
  - can be shared with other Camunda components that have a 1:1 relationship to an Orchestration Cluster like Connectors
- DNS related topics for ECS Service Connect as well as Route53 to allow easier access from within the VPC that are not part of the ECS cluster like EC2 instances or Kubernetes clusters
- Load Balancer related configurations to add listener rules to a shared Load Balancer between Orchestration Cluster and Connectors
- EFS Disk

The base terraform documentation for this module can be found [alongside the repository](https://github.com/camunda/camunda-deployment-references/tree/main/aws/modules/ecs/fargate/orchestration-cluster).

`../modules/ecs/fargate/connectors` is a secondary component `Connectors` and contains the definitions for:

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

### Aurora PostgreSQL

:::info Optional module

If you do not want to use this module, you can skip this section. However, you will need to adjust the remaining steps to remove any references to it.

If you choose not to use this module, you must provide your own PostgreSQL, Elasticsearch or OpenSearch instance and make required config adjustments.

Additionally, be sure to delete the `postgres.tf` and `postgres_seed.tf` file in your reference copy—otherwise, the resources defined in it will still be created. Additionally, remove the references for the IAM access in `iam.tf` following the `RDS IAM Auth Support` section.
:::

`postgres.tf` provisions an Aurora PostgreSQL cluster with a pre-created `camunda` database and admin credentials saved in the AWS Secrets Manager. This Aurora PostgreSQL cluster is used as secondary storage for the Orchestration Cluster.

`postgres_seed.tf` provisions a temporary ECS task to pre-seed the database for IAM authentication to work. The Aurora PostgreSQL cluster is not easily accessible from the outside as we don't expose it, therefore a workaround is required to do the initial user creation for the IAM authentication to work instead of using hard-coded username/password combinations.

If you're fine with username/password, you can remove the `postgres_seed.tf` and reuse the admin user that was created on creation to configure the Orchestration Cluster to consume said user.

### Miscellaneous Resources

`registry-auth.tf` contains the basics to create a secret via the AWS Secrets Manager for any kind of registry to access the Camunda images or bypass rate limitations.

`lb.tf` contains the creation of the main Network Load Balancer (NLB) and the Application Load Balancer (ALB).

`iam.tf` contains various IAM roles and policies.

`secrets.tf` contains the creation of random passwords and storage in AWS Secrets Manager.

### Advanced Topics

#### Camunda Configuration

The Terraform implementation does not abstract any configuration and anything you need to configure for the Camunda components can be found within their own documentation.

Camunda components can be configured for example via environment variables or an application yaml.

##### Environment Variables

The base configuration is done via environment variables and defined directly as is in the invocation of the module.

An alternative approach, still with environment variables, could be to load them from an external file.

Example:

```yaml title="orchestration-cluster-env"
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

This can than be passed to the module invocation

```hcl
environment_variables = local.env_kv_pairs # or mixed with the concat function
```

##### Application YAML

    1. This can either be baked into a custom image permanently by you
    2. Pull application YAML on startup via init container from external store or integrate in Terraform

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

#### Terraform Configuration

The base terraform documentation for the Orchestration can be found [alongside the repository](https://github.com/camunda/camunda-deployment-references/tree/main/aws/modules/ecs/fargate/orchestration-cluster) as well as for [Connectors](https://github.com/camunda/camunda-deployment-references/tree/main/aws/modules/ecs/fargate/connectors).

Some common topics to potentially change:

##### Resources

```hcl
# both modules

task_cpu              = 4096
task_cpu_architecture = "X86_64"
task_memory           = 8192

# Orchestration Cluster

efs_provisioned_throughput_in_mibps = 50
```

##### Camunda

###### Image

```hcl
# both modules

image = "camunda/camunda:VERSION" # "camunda/connectors-bundle:VERSION"
```

You could supply your custom registry and version this way like:

```hcl
image = "ghcr.io/NAMESPACE/IMAGE_NAME:VERSION"
```

###### Sizing

```hcl
# both modules

task_desired_count = X
# in case of Orchestration Cluster automatically changes the `camunda.cluster.size`
```

###### Wait for ready

This flag will ensure that Terraform waits for a successful deployment of the ECS service. It's also useful for dependencies like the Connectors depending on the Orchestration Cluster, so they're not deployed before it avoid crashes.

Disabling it will allow a `fire and forget` approach as everything will be deployed at once.

```hcl
# both modules
wait_for_steady_state = true
```

#### Aurora PostgreSQL initial user seeding

When wanting to use IAM authentication to simplify the authentication between Orchestration Cluster and Aurora PostgreSQL cluster then an initial seeding of the database is required to have a passwordless user with the `rds_iam` role assigned. More information about IAM authentication with Aurora can be found in the [AWS documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.DBAccounts.html#UsingWithRDS.IAMDBAuth.DBAccounts.PostgreSQL).

Terraform itself can't do this initial seeding as the Aurora PostgreSQL is not publicly exposed, so a workaround is needed. In our reference architecture to keep things simple and working ideally immediately, a local execution was used that triggers a one time seeding job to do the required steps as the ECS has access to Aurora PostgreSQL cluster.

As previously mentioned, if you don't want to do this local execution, you can delete the `postgres_seed.tf` and remove the `depends_on` in `camunda.tf`.

Alternatives are for example:

- Externally supplied PostgreSQL
- Rely on username / password of e.g. admin user
- Manual seeding via an EC2 instance or ECS task in the same VPC or a connected VPN
- Temporarily exposing the Aurora PostgreSQL cluster (not recommended)
- AWS Lambda function that does the seeding
- AWS Step function that does the seeding

It was implemented as a `local exec` with an ECS task since we wanted to provide a fully working reference end-to-end while still relying on something like IAM authentication.

#### Rolling deployments

The Orchestration Cluster is stateful and overprovisioning will not help the deployment to reach a ready state quicker as we're limited by the Zeebe node-ids and brokers only becoming ready when successfully joining a cluster. Therefore, the Orchestration Cluster does a deployment of maximum `100%` of tasks and minimum `66%` to ensure quorum is kept. If using smaller task sizes, you may have to consider using `service_force_new_deployment = true` to force a new deployment as otherwise the minimum and maximum task size will block a successful update.

For the Connectors task, it's kept at a maximum of `200%` and minimum of `50%` as the application is stateless and can therefore scale above the initial target during upgrades.

## 3. Execution

:::note Secret management

We strongly recommend managing sensitive information using a secure secrets management tool such as HashiCorp Vault. For guidance on injecting secrets into Terraform via Vault, refer to the [Terraform Vault Secrets Injection Guide](https://developer.hashicorp.com/terraform/tutorials/secrets/secrets-vault).
:::

:::info Terraform Flow
Due to the `postgres_seed.tf` it is required that the machine executing it has the `AWS CLI` installed and configured to be able to start and wait for the seeding task to have finished.

If that is not wanted or can't be done then please either execute it as two steps with manual seeding, fallback to username/password or supply a pre-configured secondary storage as previously mentioned.
:::

1. Open a terminal in the reference directory containing `config.tf` and the other `.tf` files.

2. Perform a final initialization to apply any changes made throughout this guide:

   ```bash reference
   https://github.com/camunda/camunda-deployment-references/blob/main/aws/common/procedure/s3-bucket/s3-bucket-tf-init.sh#L7
   ```

3. Plan the configuration files:

   ```bash
   terraform plan -out cluster.plan # describe what will be created
   ```

4. After reviewing the plan, you can confirm and apply the changes:

   ```bash
   terraform apply cluster.plan     # apply the creation
   ```

Terraform will now provision the Amazon ECS resources and the Aurora PostgreSQL cluster with all necessary configurations. This process may take approximately 20–30 minutes to complete.

The Terraform flow is as follows:

- Creation of the VPC and related resources, among that IAM roles
- Creation of the Aurora Postgres Cluster within the VPC
- Creation of the temporary Aurora Postgres seeding task and wait for it to finish
- Creation of the Orchestration Cluster and wait for it to be ready
- Creation of the Connectors and wait for it to be ready

## 4. Verify connectivity to Camunda 8

Using Terraform, you can obtain the HTTP endpoint of the Application Load Balancer and interact with Camunda through the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).

:::info HTTPS

To keep dependencies minimal and non-blocking for a quick start, this reference architecture omits a custom domain and TLS configuration.

You can easily add TLS by attaching an AWS Certificate Manager (ACM) certificate to the Application Load Balancer (ALB). For details, see the AWS documentation on [creating an HTTPS listener](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html).

Information on configuring a custom domain and understanding the ALB DNS name is available in the [Application Load Balancer documentation](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/application-load-balancers.html#dns-name).

:::

1. Navigate to the Terraform folder:

```sh
cd camunda-deployment-references-main/aws/containers/ecs-single-region-fargate/terraform
```

2. Retrieve the Application Load Balancer output:

```sh
terraform output -raw alb_endpoint
```

The ALB exposes both the Orchestration and Connectors through the same port and uses listener rules with weights to determine the path they're on.

- ALB:80
  - `/*` routes to the Orchestration Cluster UI/REST API
  - `/connectors*` routes to the Connectors
- ALB:9600 (optional - not recommended to be exposed publicly)
  - `/*` routes to the Orchestration Cluster
  - Connectors has the management port with the web server combined by default
- NLB:26500 (TCP)
  - Exposes the Orchestration Cluster - Zeebe Gateway with gRPC

3. Access the URL of `alb_endpoint` which should present you a login screen.

   The admin user name as pre-configured in `camunda.tf` is `admin` and the password is randomly generated and can be retrieved via:

   ```sh
   terraform output -raw admin_user_password
   ```

4. Use the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) to communicate with Camunda:

   Follow the example in the [Orchestration Cluster REST API documentation](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md) to authenticate and retrieve the cluster topology.

## Troubleshooting

### Logs

Logs are by default exported to CloudWatch unless configured otherwise by you. Those are both visible in the CloudWatch dashboard and the ECS Service alongside each task.

### Accessing task or management API

ECS tasks are not easily accessible without workarounds, some options are the following:

- EC2 / ECS debug instance / task within the same VPC to try to ping and use the [management API](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md)
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

For general troubleshooting assistance, consult the [operational guides troubleshooting documentation](/self-managed/operational-guides/troubleshooting.md).

## Next steps

After setting up your cluster, many users typically do the following:

- [Connect to an identity provider](/self-managed/components/orchestration-cluster/identity/connect-external-identity-provider.md) – integrate with an external identity system for authentication.
- [Adding TLS](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html) and [custom domain](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/application-load-balancers.html#dns-name) Route53 record to the Application Load Balancer (ALB)
