---
id: secondary-storage
title: "Secondary storage"
sidebar_label: "Secondary storage"
description: "Choose between relational and document-store secondary storage for the Orchestration Cluster on AWS, and create the Aurora PostgreSQL stage."
---

The Orchestration Cluster stores the data that its web applications and APIs query in secondary storage. In the guided deployment, the secondary storage stage creates an Aurora PostgreSQL cluster, seeds its database users, and publishes the connection settings that the Camunda stage reads.

## Choose a storage family

Choose one family for each deployment. You can't migrate between families in place.

| Topic                | Aurora PostgreSQL (RDBMS)                                                     | Amazon OpenSearch Service or Elasticsearch                |
| -------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------- |
| Best fit             | Teams that prefer relational operations and moderate query workloads          | Search-heavy, filter-heavy, and analytics-heavy workloads |
| Optimize             | Not available on its own: Optimize still requires Elasticsearch or OpenSearch | Required by Optimize                                      |
| Second region        | Aurora Global Database, with the writer in the first region                   | One document store for each region                        |
| Guided storage stage | Available                                                                     | Not part of the guided Terraform yet                      |

Choose a document store if you need Optimize or heavy search workloads. Choose Aurora PostgreSQL otherwise. If you need Optimize with relational storage, plan for both backends. See [compare Elasticsearch/OpenSearch and RDBMS](/self-managed/reference-architecture/reference-architecture.md#compare-elasticsearchopensearch-and-rdbms) and the [secondary storage overview](/self-managed/concepts/secondary-storage/index.md).

## Choose the instance class before you grow

The stage runs one Aurora instance by default. The instance class decides whether the cluster can join an Aurora Global Database later.

| Instance class                    | Global Database support | Use                                        |
| --------------------------------- | ----------------------- | ------------------------------------------ |
| `db.t3.medium` (default)          | No                      | A demonstration in one region              |
| `db.r6g.large` or another r-class | Yes                     | A deployment that grows to a second region |
| `db.serverless`                   | Yes                     | A deployment with a varying load           |

Aurora Global Databases don't support `db.t3` or `db.t4g` instances. If you start on `db.t3.medium` and later need a second region, set `db_instance_class` to an r-class instance first. The resize is in place, and search is unavailable for a few minutes while the single instance restarts. See [grow to two regions](./grow/single-to-dual-region.md).

## Understand what the stage creates

- An Aurora PostgreSQL cluster in your private subnets, encrypted with its own KMS key. The security group allows the VPC CIDR block, plus any block you pass in `additional_cidr_blocks`.
- The administrator password, generated unless you supply one, stored in AWS Secrets Manager and encrypted with the secrets key of the compute stage. A read policy is attached to the task execution role.
- IAM database authentication, which is required. Camunda connects through the AWS JDBC wrapper with the `iam` plugin, so no database password reaches the task.
- A one-time seed task on your ECS cluster. It creates the database users that authenticate through IAM and grants them access. It needs the AWS CLI where Terraform runs, and every statement is idempotent.
- One `rds-db:connect` policy for each IAM database user. The Camunda stage attaches the policy for the `camunda` user to its task role.

## Create the secondary storage stage

1. Set the variables of the stage in `storage.tfvars`:

   ```hcl
   prefix = "camunda-demo"

   # Use an r-class instance if you plan to add a second region.
   # db_instance_class = "db.r6g.large"
   ```

1. Apply the stages in order. The helper script passes the outputs of the network and compute stages to the storage stage:

   ```bash
   export TF_STATE_BUCKET=my-state-bucket TF_STATE_REGION=eu-west-1
   ./procedure/compose.sh apply examples/greenfield
   ```

1. Read the outputs of the stage:

   ```bash
   terraform -chdir=terraform/storage output -json secondary_storage
   ```

## Add databases for the management plane

The OIDC provider, Management Identity, and Camunda Hub each need a database of their own. Declare them in `databases`, and the stage creates the role and the database for each, on the same cluster or on the cluster of the management plane:

```hcl
databases = {
  oidc_provider = {
    database_name = "oidc_provider"
    username      = "oidc_provider"
    auth          = "password"
  }
  camunda_hub = {
    database_name = "camunda_hub"
    username      = "camunda_hub"
  }
}
```

| `auth`     | What the stage creates                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------ |
| `iam`      | A role that signs in with an IAM token, and a policy to attach to the task role. This is the default.              |
| `password` | A role with a generated password, stored in Secrets Manager. For components that don't support IAM authentication. |

Names use lowercase letters, digits, and underscores, and start with a letter, because they appear in SQL statements. The `databases` output gives each component its JDBC URL, role, and secret or policy. See [deploy an identity provider](./management-plane/identity-provider.md).

## Use the stage inputs and outputs

| Input                                                 | Source        | Purpose                                                               |
| ----------------------------------------------------- | ------------- | --------------------------------------------------------------------- |
| `vpc_id`, `vpc_cidr`                                  | Network stage | Where the cluster runs and which CIDR block can reach it              |
| `private_subnet_ids`                                  | Network stage | Subnets of the cluster. The availability zones come from the subnets. |
| `ecs_cluster_arn`                                     | Compute stage | Cluster that runs the seed task                                       |
| `task_execution_role_arn`, `task_execution_role_name` | Compute stage | Role that reads the administrator secret                              |
| `secrets_kms_key_arn`                                 | Compute stage | Key that encrypts the administrator secret                            |
| `seed_security_group_ids`                             | Compute stage | Security groups of the seed task                                      |

| Output                                                     | Used by                                                                                     |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `secondary_storage`                                        | Camunda stage: type, host, port, database name, JDBC URL, driver class, and the IAM setting |
| `rds_db_connect_policy_arns`                               | Camunda stage: policy for each IAM database user                                            |
| `security_group_id`                                        | Rules that allow other VPCs to reach the database                                           |
| `cluster_identifier`, `cluster_arn`, `cluster_resource_id` | The global database, when you grow to a second region                                       |
| `db_seed_done`                                             | Camunda stage: orders the deployment after the database users exist                         |

## Troubleshoot the secondary storage stage

### database_name and username must be lowercase letters, digits, and underscores, starting with a letter: they are used in SQL statements.

A database in `databases` has a name with other characters. Rename it.

### auth must be iam or password.

A database in `databases` has another value for `auth`. Use `iam` or `password`.

### db_iam_auth_enabled must be true: the Camunda stage connects with wrapperPlugins=iam.

You set `db_iam_auth_enabled = false`. Every task connects through the AWS JDBC wrapper with the `iam` plugin, which needs IAM authentication on the cluster. Leave the variable at `true`. Password authentication is a code change in the Camunda stage, not a flag.

### Aurora Global Databases do not support db.t3 and db.t4g instance classes.

You passed a `db.t3` or `db.t4g` class as `secondary_instance_class` of the `global-database` root. Use an r-class instance such as `db.r6g.large`. The primary cluster must also run on an r-class or serverless instance before the global cluster can be created.

### DB seed task failed with exit code

The seed task couldn't create the database users. Open the CloudWatch log group `/ecs/<prefix>-db-seed` for the statement that failed, and check that the security groups in `seed_security_group_ids` allow port 5432 to the cluster. Apply the stage again to re-run the seed.

## Next steps

- [Object storage](./object-storage.md)
- [Orchestration Cluster](./orchestration-cluster/overview.md)
