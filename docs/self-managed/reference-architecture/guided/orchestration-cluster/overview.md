---
id: overview
title: "Orchestration Cluster"
sidebar_label: "Overview"
description: "Deploy the Camunda 8 Orchestration Cluster and Connectors on Amazon ECS from the outputs of the earlier steps, and configure how it connects to storage and sign-in."
---

The Orchestration Cluster step runs the Orchestration Cluster and Connectors on Amazon ECS. It creates no network, storage, load balancer, or identity provider: they arrive as variables from the steps before it. Configure the cluster in these pages:

| Page                                        | What you decide                                                       |
| ------------------------------------------- | --------------------------------------------------------------------- |
| [Identity](./identity.md)                   | Built-in users or an OIDC provider, and how to describe your provider |
| [Zones and brokers](./zones-and-brokers.md) | How many brokers, which zones, which replication factor, how to grow  |

## Choose the authentication mode

| Mode            | When to use                              | Secrets                                                                                                  |
| --------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Basic (default) | Evaluation, or when you have no provider | The stage generates passwords for the `admin` and `connectors` users and stores them in Secrets Manager. |
| OIDC            | You have an OIDC provider                | You pass the `oidc` output of the identity stage. The stage creates no passwords.                        |

In basic mode, the users exist in the cluster, not in each region. A second region must receive the passwords of the first: read `admin_user_password` and `connectors_user_password` from the outputs of the first region's Camunda stage and pass them to the second region. A different password makes Connectors fail to authenticate.

## Understand the secondary storage settings

The stage builds these settings from the `secondary_storage` output of the storage stage:

| Setting                                        | Value                                                              |
| ---------------------------------------------- | ------------------------------------------------------------------ |
| `CAMUNDA_DATA_SECONDARYSTORAGE_TYPE`           | `rdbms`                                                            |
| `CAMUNDA_DATA_SECONDARYSTORAGE_RDBMS_URL`      | The JDBC URL of the storage stage, which uses the AWS JDBC wrapper |
| `CAMUNDA_DATA_SECONDARYSTORAGE_RDBMS_USERNAME` | `camunda`, authenticated by an IAM token                           |
| `CAMUNDA_DATA_BACKUP_STORE`                    | `S3`, with the backup bucket of the object storage stage           |
| `CAMUNDA_CLUSTER_NODEIDPROVIDER_S3_BUCKETNAME` | The lease bucket of this zone                                      |

## Deploy the Orchestration Cluster stage

1. Set the variables of the stage in `camunda.tfvars`:

   ```hcl
   prefix = "camunda-demo"

   # Register the brokers on the internal load balancer of the exposure stage.
   enable_raft_listener = true

   zone = "zone-a"
   zones = [
     { name = "zone-a", number_of_brokers = 3, number_of_replicas = 3, priority = 1000 },
   ]
   ```

1. Apply the stages in order. The helper script passes the outputs of every stage to the Camunda stage:

   ```bash
   ./procedure/compose.sh apply examples/greenfield
   ```

1. Read the admin password:

   ```bash
   terraform -chdir=terraform/camunda output -raw admin_user_password
   ```

1. Open `public_base_url` of the exposure stage and sign in as `admin`.

## Use the stage inputs and outputs

| Input                                                                                                                                          | Source               | Purpose                                     |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------- |
| `vpc_id`, `private_subnet_ids`                                                                                                                 | Network stage        | Where the tasks run                         |
| `ecs_cluster_id`, `task_execution_role_arn`, `task_execution_role_name`, `secrets_kms_key_arn`, `registry_credentials_arn`, security group IDs | Compute stage        | The cluster and what every service shares   |
| `backup_bucket_name`, `backup_access_policy_arn`, `lease_bucket`                                                                               | Object storage stage | Backups and node ID leases                  |
| `secondary_storage`, `rds_db_connect_policy_arn`, `db_seed_done`                                                                               | Storage stage        | The database and access to it               |
| `alb_listener_http_webapp_arn`, `alb_listener_http_management_arn`, `nlb_grpc_arn`                                                             | Exposure stage       | Listeners that the services attach rules to |
| `oidc`                                                                                                                                         | Identity stage       | `null` selects Basic authentication         |

| Output                                            | Purpose                                              |
| ------------------------------------------------- | ---------------------------------------------------- |
| `grpc_service_connect`, `rest_service_connect`    | Names that other services in the ECS cluster use     |
| `lease_bucket_name`, `log_group_name`             | The lease bucket in use and the CloudWatch log group |
| `admin_user_password`, `connectors_user_password` | Basic authentication passwords, empty with OIDC      |

## Troubleshoot the Orchestration Cluster stage

### This stage supports RDBMS secondary storage with IAM authentication.

The `secondary_storage` input isn't an RDBMS with IAM authentication. Pass the output of the storage stage, or the output of the global database root.

## Next steps

- [Set up identity](./identity.md)
- [Set zones and brokers](./zones-and-brokers.md)
- [Deploy the management plane](../management-plane/overview.md)
