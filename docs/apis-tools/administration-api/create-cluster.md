---
id: administration-api-create-cluster
title: Create a cluster
slug: /apis-tools/administration-api/create-cluster
sidebar_position: 4
description: "Create a Camunda 8 SaaS cluster with the Administration API. Get the IDs of the plan type, channel, generation, and region, and learn which values each field of POST /clusters accepts."
---

Use the [Administration API](/apis-tools/administration-api/administration-api-reference.md) to create a Camunda 8 SaaS cluster. The `POST /clusters` request takes IDs, such as the plan type and the region. You get these IDs from the `GET /clusters/parameters` endpoint.

## Prerequisites

- You have an Administration API client with the **Cluster** scope **Create**. Both `POST /clusters` and `GET /clusters/parameters` require this scope. See [client credentials and scopes](/apis-tools/administration-api/authentication.md#client-credentials-and-scopes).
- You have an access token in the `TOKEN` environment variable. See [generate a token](/apis-tools/administration-api/authentication.md#generate-a-token).

## Step 1: Get the values for your cluster

Request the options available to your organization:

```bash
curl --header "Authorization: Bearer ${TOKEN}" \
     https://api.cloud.camunda.io/clusters/parameters
```

The response looks like this:

```json
{
  "clusterPlanTypes": [{ "uuid": "<plan-type-uuid>", "name": "Production" }],
  "channels": [
    {
      "uuid": "<channel-uuid>",
      "name": "Stable",
      "defaultGeneration": {
        "uuid": "<generation-uuid>",
        "name": "Camunda 8.10+gen1"
      },
      "allowedGenerations": [
        { "uuid": "<generation-uuid>", "name": "Camunda 8.10+gen1" }
      ]
    }
  ],
  "regions": [
    {
      "uuid": "<region-uuid>",
      "name": "Europe West 1",
      "provider": "GCP",
      "backups": [
        {
          "uuid": "<backup-region-uuid>",
          "regions": [{ "id": "<id>", "label": "<label>" }]
        }
      ]
    }
  ]
}
```

The names and IDs in this sample are examples. Your response lists the options of your organization. Copy each ID from the list in this table:

| Field of `POST /clusters` | Value from the response                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------------------- |
| `planTypeId`              | `clusterPlanTypes[].uuid`                                                                               |
| `channelId`               | `channels[].uuid`                                                                                       |
| `generationId`            | `channels[].allowedGenerations[].uuid` of the channel you chose. `defaultGeneration` is the default one |
| `regionId`                | `regions[].uuid`                                                                                        |
| `backupRegionId`          | `regions[].backups[].uuid` of the region you chose                                                      |

## Step 2: Create the cluster

Send the required fields in the request body:

```bash
curl --request POST https://api.cloud.camunda.io/clusters \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "Content-Type: application/json" \
     --data '{
       "name": "my-cluster",
       "planTypeId": "<plan-type-uuid>",
       "channelId": "<channel-uuid>",
       "generationId": "<generation-uuid>",
       "regionId": "<region-uuid>"
     }'
```

The response contains the ID of the new cluster:

```json
{ "clusterId": "<cluster-id>" }
```

### Request fields

| Field                          | Required | Default    | Description                                                                                                                                                                                                                                          |
| ------------------------------ | -------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                         | Yes      |            | The name of the cluster. It can have at most 50 characters.                                                                                                                                                                                          |
| `planTypeId`                   | Yes      |            | The plan type (hardware specification). Use a `clusterPlanTypes[].uuid` value.                                                                                                                                                                       |
| `channelId`                    | Yes      |            | The channel (software specification). Use a `channels[].uuid` value.                                                                                                                                                                                 |
| `generationId`                 | Yes      |            | The generation (software version). It must be one of the allowed generations of the channel.                                                                                                                                                         |
| `regionId`                     | Yes      |            | The region (data center). Use a `regions[].uuid` value.                                                                                                                                                                                              |
| `description`                  | No       |            | A description of the cluster. It can have at most 150 characters.                                                                                                                                                                                    |
| `backupRegionId`               | No       |            | The backup region for a dual-region cluster. Use a `uuid` from the `backups` of the region you chose. Your plan must include backups, which are available for Enterprise plans.                                                                      |
| `autoUpdate`                   | No       | `true`     | Whether Camunda updates the cluster to new generations automatically. It has an effect only on clusters in the **Stable** channel.                                                                                                                   |
| `stageLabel`                   | No       | No label   | A label for the stage of the cluster. The allowed values are `dev`, `test`, `stage`, and `prod`.                                                                                                                                                     |
| `encryption`                   | No       | `Provider` | The encryption key type: `Provider`, `Software`, `Hardware`, or `External`. Any value other than `Provider` requires an Enterprise plan. `External` also requires a region on AWS. See [bring your own key](/components/saas/byok/aws-kms-setup.md). |
| `hardwarePackages`             | No       | `1`        | The number of hardware packages for the cluster. A value higher than `1` is available on request, and only for plan types of the Advanced offering.                                                                                                  |
| `identityBackendChecksEnabled` | No       | `false`    | Whether the identity backend checks are enabled for the cluster.                                                                                                                                                                                     |

For `encryption` set to `External`, see [Configure external encryption with the Administration API](/components/saas/byok/aws-kms-setup.md#configure-external-encryption-with-the-administration-api) to associate your key after you create the cluster.

## Step 3: Check that the cluster is created

Get the cluster with the ID from the response of Step 2:

```bash
curl --header "Authorization: Bearer ${TOKEN}" \
     https://api.cloud.camunda.io/clusters/<cluster-id>
```

The response describes the cluster and its status. This request requires the **Cluster** scope **Get**. Repeat the request to follow the creation of the cluster.

## Errors

| Status            | Cause                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `400 Bad Request` | A value is not valid. For example, the request body does not match the schema, the name is longer than 50 characters, the description is longer than 150 characters, an ID is unknown, the generation is not part of the channel, or the `backupRegionId` does not exist for the region or your plan has no backups. It is also returned when you have no reservation left for the plan type, or when `hardwarePackages` is higher than `1` for a plan type that does not allow it. |
| `403 Forbidden`   | The API client has no **Cluster** scope **Create**. The `encryption` value is not `Provider` and your organization has no Enterprise plan, or `External` is set and the region is not on AWS. The organization is not activated, or its trial expired.                                                                                                                                                                                                                              |
| `409 Conflict`    | Your organization is not on an Enterprise plan and reached the global cluster limit.                                                                                                                                                                                                                                                                                                                                                                                                |
