---
title: "Managing Data in Secondary Storage"
tags:
  - Database
  - Secondary Storage
description: "Best practices for configuring and managing the data in secondary storage."
---

When working with secondary storage, it is important to follow best practices to ensure data integrity and optimal performance. Here are some guidelines to consider:

## Modifying Data in Secondary Storage

To ensure the reliability, security, and proper functioning of your Camunda system, it is essential to follow strict guidelines when considering any changes to data stored in secondary storage.

We advise that you do **not** modify any data in secondary storage unless you have received explicit instructions from the Camunda Support Team during an active support case.

Making changes to secondary storage data without proper guidance exposes your business to several risks:

- **Data Loss**: Unintended or manual modifications can result in missing, overwritten, or deleted information that cannot be recovered without backups.
- **Data Corruption** : Changing data structures or values may leave the system in an inconsistent or corrupted state, possibly leading to application errors or downtime.
- **Unsupported System States**: When data is changed outside prescribed processes, your system may enter a state that is no longer supported by Camunda or compatible with upgrades, patches, or new features.
- **Troubleshooting Challenges**: Untracked modifications make it difficult or impossible for support engineers to identify and resolve issues. This can lead to extended downtime and unresolved problems.
- **Security Vulnerabilities**: Unauthorized changes may inadvertently expose sensitive data, weaken access controls, or create exploitable system weaknesses.
- **Compliance Issues**: Many organizations operate under strict regulatory requirements for data integrity. Unauthorized edits may violate internal or external compliance standards.

## Configuring Shards and Replicas

Proper configuration of shards and replicas in Elasticsearch/OpenSearch is essential for the reliability, performance, and resilience of your Camunda system. Understanding when and how to deploy these features helps ensure you gain the intended benefits, such as fault tolerance and scalability, while avoiding common pitfalls.

While there is no one-size-fits-all approach, here are some general guidelines to consider:

### Shards

The number of primary shards should be determined based on your data size and anticipated growth. A common starting point is to use 1-5 primary shards per index. Partitioning data into multiple shards can improve scalability. However, increasing shard count should be based on system throughput needs and underlying hardware capabilities. Avoid over-sharding, as unnecessary complexity may arise and degrade performance.

### Replicas

- **Single Node Cluster**: Do not configure replicas when your Camunda system is running on a single node cluster. Replicas provide redundancy only when distributed across multiple nodes. On a single node, they do not offer additional protection and simply consume extra resources, in some cases preventing your node ever reporting as healthy.
- **Multiple Node Cluster**: In a multi-node cluster, it is advisable to configure at least one replica for each index. This ensures that if one node fails, the data remains accessible from another node, enhancing fault tolerance and availability.

## Backups

Regular backups of your secondary storage data are crucial for disaster recovery and data integrity. Here are some best practices for managing backups:

- Always follow the official Camunda backup procedure, step-by-step, without omission or variation.
- Regularly schedule backups according to your business needs and system volume.
- Periodically test restoration from backups to ensure your procedures are effective and reliable.

## Index Templates

Camunda uses index templates to define settings and mappings for indices. To ensure that your indices are created with the correct configurations, it is important to avoid:

- Using custom index templates that may conflict with Camunda's default templates. Templates with a higher priority than those set by Camunda can lead to unexpected behavior, such as creating indices with incorrect mappings.
- Deleting or altering existing index templates without guidance from Camunda Support.
