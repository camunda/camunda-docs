---
id: object-storage
title: "Decide how many S3 buckets you need"
sidebar_label: "Object storage"
description: "Create the S3 buckets of a Camunda 8 deployment on AWS: one backup bucket for the cluster and one node ID lease bucket for each zone."
---

A layered deployment on Amazon ECS needs two kinds of S3 buckets: one backup bucket for the whole cluster, and one node ID lease bucket for each zone. The object storage layer creates them, and the Camunda layer reads their names.

## Understand why there are two kinds

| Bucket        | Count                | Purpose                                                                                        | Versioning |
| ------------- | -------------------- | ---------------------------------------------------------------------------------------------- | ---------- |
| Backup        | One for each cluster | Camunda writes its backups here and restores from here.                                        | On         |
| Node ID lease | One for each zone    | Each broker leases its node index from this bucket, because ECS tasks have no stable identity. | Off        |

Both kinds are private, block public access, and are encrypted with a KMS key. The layer creates a key for each bucket unless you pass an existing one to the `s3-bucket` module.

### Keep one lease bucket for each zone

A broker acquires its node index by writing a lease object to the bucket with S3 conditional writes. The lease is scoped to the bucket, and the bucket must not be shared with other Zeebe clusters. Each zone numbers its brokers from zero and leases those indexes from its own bucket, so create one lease bucket for each zone, and never point two zones at the same bucket.

The lease bucket isn't versioned: the lease object changes on every renewal, so versions would only pile up.

### Share the backup bucket

All zones of a cluster write backups to one bucket, so a restore finds everything in one place, whichever region is active. Create it once, in the first region.

## Create the object storage layer

1. Set the variables of the layer in `object-storage.tfvars`. Name every zone that the cluster has now. For a single region, that's one zone:

   ```hcl
   prefix     = "camunda-demo"
   aws_region = "eu-west-1"
   zones      = ["zone-a"]

   # Dev and test only: lets terraform destroy remove buckets that contain objects.
   force_destroy = true
   ```

1. Apply the layer:

   ```bash
   ./procedure/compose.sh apply examples/greenfield
   ```

1. Read the outputs. The lease buckets come as a map from the zone name to the bucket and its policy:

   ```bash
   terraform -chdir=terraform/object-storage output -json lease_buckets
   ```

Bucket names are global, so the layer builds them from the prefix and the account ID: `<prefix>-<account-id>-backup` and `<prefix>-<account-id>-lease-<zone>`. Keep the prefix short enough for the 63 characters that S3 allows.

Leave `force_destroy` at `false` for anything that holds data you need. With `true`, destroying the layer deletes the buckets and their objects, including backups.

## Use the layer inputs and outputs

| Input           | Purpose                                                                    |
| --------------- | -------------------------------------------------------------------------- |
| `prefix`        | Name prefix of the buckets                                                 |
| `aws_region`    | Region of the buckets. The access policy denies S3 calls to other regions. |
| `zones`         | Zone names. One lease bucket is created for each.                          |
| `force_destroy` | Delete the buckets even if they contain objects                            |

| Output                     | Used by                                                                          |
| -------------------------- | -------------------------------------------------------------------------------- |
| `backup_bucket_name`       | Camunda layer: backup store and repository name                                  |
| `backup_access_policy_arn` | Camunda layer: attached to the task role                                         |
| `lease_buckets`            | Camunda layer: `lease_buckets[<zone>]` has `bucket_name` and `access_policy_arn` |

The Camunda layer takes the entry of its own zone as `lease_bucket`. A second region runs this layer again with its own zone name.

## Troubleshoot the object storage layer

### zones needs at least one name made of alphanumerics and hyphens, starting with an alphanumeric.

A zone name has an unsupported character, such as an underscore, or is empty. Use letters, digits, and hyphens, start with a letter or a digit, and keep it to 63 characters. The broker ID is `<zone>_<index>`, and the underscore is the separator.

### purpose must be "backup" or "node-id-lease".

You called the `s3-bucket` module with another purpose. Use `backup` for backups and `node-id-lease` for leases.

### lease_access_policy_arn is required when lease_bucket_name is set.

You passed an existing lease bucket to the orchestration cluster module without the policy that grants access to it. Pass the `access_policy_arn` of the same `lease_buckets` entry.

## Next steps

- [Expose the cluster](./exposure.md)
- [Configure Camunda](./camunda-configuration.md)
