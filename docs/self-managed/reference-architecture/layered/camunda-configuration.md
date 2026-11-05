---
id: camunda-configuration
title: "Configure the Orchestration Cluster"
sidebar_label: "Camunda configuration"
description: "Set the zones, brokers, replication factor, and partitions of a Camunda 8 Orchestration Cluster on Amazon ECS, and deploy it with the Camunda layer."
---

The Camunda layer runs the Orchestration Cluster and Connectors on Amazon ECS. It creates no network, storage, load balancer, or identity provider: they arrive as variables from the layers before it. This page covers the settings that decide how the cluster is shaped.

## Start with zone-aware brokers

The layer runs zone-aware brokers from the first deployment. Each broker belongs to a zone, and its ID is `<zone>_<index>`, for example `zone-a_0`. A single region has one zone with three brokers.

Growing to a second region then adds a zone to the running cluster. The brokers that run keep their names, and the engine doesn't renumber them. A cluster that starts with numbered brokers needs an irreversible [migration](/self-managed/deployment/helm/operational-tasks/zone-aware-migration.md) before it can grow this way, so don't start with numbered brokers if you might add a region.

See [zone-aware clusters](/self-managed/components/orchestration-cluster/zeebe/configuration/zone-aware-clusters.md) for the concepts.

## Set zones, brokers, and replicas

| Variable          | Default                                                       | Meaning                                                                                    |
| ----------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `zone`            | `zone-a`                                                      | The zone of this deployment. It must be one of the names in `zones`.                       |
| `zones`           | One zone, `zone-a`, with 3 brokers, 3 replicas, priority 1000 | Every zone of the cluster, with `number_of_brokers`, `number_of_replicas`, and `priority`. |
| `partition_count` | `3`                                                           | The number of partitions. Adding a zone doesn't change it.                                 |

The layer derives the rest from the zone list:

| Setting                | Value                                          |
| ---------------------- | ---------------------------------------------- |
| Cluster size           | The sum of `number_of_brokers` over the zones  |
| Replication factor     | The sum of `number_of_replicas` over the zones |
| Brokers in this region | `number_of_brokers` of the zone in `zone`      |

The priority decides where the leaders concentrate. Zeebe puts leaders in the zone with the highest priority, and moves them to the next zone when it fails.

### Plan for growth

- You can increase the number of brokers later. You can't reduce it without losing data.
- Each zone holds `number_of_replicas` replicas of every partition. With one zone of three brokers and three replicas, every partition has three replicas in the region. When you add a zone with three replicas, each region holds a full copy and the replication factor becomes six.
- Choose the layout before you add the second zone. With two zones, losing a region leaves half of the replicas and processing stops until you remove the failed zone. With three zones, no single zone should hold half of the replicas. See [grow from two regions to three](./evolve-dual-to-three-regions.md).
- List only zones whose brokers run. A zone in the list receives replicas even if its brokers don't run.

## Choose the authentication mode

| Mode            | When to use                              | Secrets                                                                                                  |
| --------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Basic (default) | Evaluation, or when you have no provider | The layer generates passwords for the `admin` and `connectors` users and stores them in Secrets Manager. |
| OIDC            | You have an OIDC provider                | You pass the `oidc` output of the identity layer. The layer creates no passwords.                        |

In basic mode, the users exist in the cluster, not in each region. A second region must receive the passwords of the first: read `admin_user_password` and `connectors_user_password` from the outputs of the first region's Camunda layer and pass them to the second region. A different password makes Connectors fail to authenticate.

## Understand the secondary storage settings

The layer builds these settings from the `secondary_storage` output of the storage layer:

| Setting                                        | Value                                                              |
| ---------------------------------------------- | ------------------------------------------------------------------ |
| `CAMUNDA_DATA_SECONDARYSTORAGE_TYPE`           | `rdbms`                                                            |
| `CAMUNDA_DATA_SECONDARYSTORAGE_RDBMS_URL`      | The JDBC URL of the storage layer, which uses the AWS JDBC wrapper |
| `CAMUNDA_DATA_SECONDARYSTORAGE_RDBMS_USERNAME` | `camunda`, authenticated by an IAM token                           |
| `CAMUNDA_DATA_BACKUP_STORE`                    | `S3`, with the backup bucket of the object storage layer           |
| `CAMUNDA_CLUSTER_NODEIDPROVIDER_S3_BUCKETNAME` | The lease bucket of this zone                                      |

## Deploy the Camunda layer

1. Set the variables of the layer in `camunda.tfvars`:

   ```hcl
   prefix = "camunda-demo"

   # Register the brokers on the internal load balancer of the exposure layer.
   enable_raft_listener = true

   zone = "zone-a"
   zones = [
     { name = "zone-a", number_of_brokers = 3, number_of_replicas = 3, priority = 1000 },
   ]
   ```

1. Apply the layers in order. The helper script passes the outputs of every layer to the Camunda layer:

   ```bash
   ./procedure/compose.sh apply examples/greenfield
   ```

1. Read the admin password:

   ```bash
   terraform -chdir=terraform/camunda output -raw admin_user_password
   ```

1. Open `public_base_url` of the exposure layer and sign in as `admin`.

## Use the layer inputs and outputs

| Input                                                                                                                                          | Source               | Purpose                                     |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------- |
| `vpc_id`, `private_subnet_ids`                                                                                                                 | Network layer        | Where the tasks run                         |
| `ecs_cluster_id`, `task_execution_role_arn`, `task_execution_role_name`, `secrets_kms_key_arn`, `registry_credentials_arn`, security group IDs | Compute layer        | The cluster and what every service shares   |
| `backup_bucket_name`, `backup_access_policy_arn`, `lease_bucket`                                                                               | Object storage layer | Backups and node ID leases                  |
| `secondary_storage`, `rds_db_connect_policy_arn`, `db_seed_done`                                                                               | Storage layer        | The database and access to it               |
| `alb_listener_http_webapp_arn`, `alb_listener_http_management_arn`, `nlb_grpc_arn`                                                             | Exposure layer       | Listeners that the services attach rules to |
| `oidc`                                                                                                                                         | Identity layer       | `null` selects basic authentication         |

| Output                                            | Purpose                                              |
| ------------------------------------------------- | ---------------------------------------------------- |
| `grpc_service_connect`, `rest_service_connect`    | Names that other services in the ECS cluster use     |
| `lease_bucket_name`, `log_group_name`             | The lease bucket in use and the CloudWatch log group |
| `admin_user_password`, `connectors_user_password` | Basic authentication passwords, empty with OIDC      |

## Troubleshoot the Camunda layer

### zone must be one of the names in zones.

The value of `zone` isn't in the `zones` list. A broker looks its zone up in the list at startup and fails if it's missing. Add the zone to the list, or correct the name.

### zone must be set when zones is set.

You passed a zone list without saying which zone this deployment is. Set `zone`.

### cluster size (cluster_size, or task_desired_count when 0) must equal the sum of number_of_brokers over zones.

The number of brokers that the tasks start doesn't match the zone list. The Camunda layer derives both from `zones`. If you call the orchestration cluster module yourself, set `cluster_size` to the sum of `number_of_brokers`.

### zone must be at most 63 characters of [A-Za-z0-9-], starting with an alphanumeric.

The zone name is too long or has an unsupported character. Use letters, digits, and hyphens.

### This layer supports RDBMS secondary storage with IAM authentication.

The `secondary_storage` input isn't an RDBMS with IAM authentication. Pass the output of the storage layer, or the output of the global database root.

## Next steps

- [Expose the cluster](./exposure.md)
- [Grow from one region to two](./evolve-single-to-dual-region.md)
