---
id: update-zeebe
title: "Update Zeebe"
description: "This section describes how to update Zeebe to a new version."
---

Zeebe versions can be updated:

- From any patch version to a newer patch of the same minor version
- To any patch of the next minor version.

It is recommended but not required to first update to the latest patch of the current minor version before updating to the next minor version. In other words, Zeebe can always be updated to a higher version but skipping minor versions is not allowed. For example, an update from `8.5.0` to `8.5.3` or from `8.5.3` to `8.6.1` is possible.

Since Zeebe 8.5, updates to a newer version can be rolling or offline. Zeebe 8.4 and older don't contain necessary safety checks that make rolling updates safe, and we recommend offline updates instead to ensure processing behaves correctly.

Refer to the [update guide](/self-managed/operational-guides/update-guide/introduction.md) to check if there are known issues for the specific update you are planning.

## Rolling update

A **rolling update** ensures the Zeebe cluster stays available by updating brokers and gateways one by one instead of all at once.

There are three parts to a rolling update: the Zeebe Broker, Zeebe Gateway, and clients.

We recommend updating brokers first, then gateways, and finally clients. This ensures clients don't use new APIs that are not yet supported by the brokers or gateways.

Because Zeebe is backwards compatible with the previous minor version, updating gateways and clients is not strictly necessary and can happen any time after updating the brokers.

While updating brokers, leadership for partitions will rotate which may cause brief unavailability or loss of performance on the affected partitions.

The procedure to do a rolling update of Zeebe brokers is the following:

1. Pick the broker with the highest ID that runs the old version.
2. Shut down the broker.
3. Update the broker software to the new version.
4. Start the broker and wait for it to become ready and healthy.
5. Repeat until all brokers are updated.

Gateways are updated with the same procedure, updating each replica one by one.

Clients can be updated according to your requirements and environment, for example by simply deploying a new version of your worker applications.

For disaster recovery, you may want to take [backups](/self-managed/operational-guides/backup-restore/backup-and-restore.md) before the update.

If you plan to immediately update again, wait to give all brokers a chance to take new snapshots.
The snapshot period is five minutes by default but is [configurable via `snapshotPeriod`](../configuration/broker.md#zeebebrokerdata).

### Using Helm

If your Zeebe deployment is managed by our [Helm charts](/self-managed/setup/install.md), the rolling update procedure is already automated.

:::note
Zeebe brokers are managed by a [`StatefulSet`](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/#update-strategies). Zeebe Gateways are managed by a [`Deployment`](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#updating-a-deployment).
:::

#### Updating brokers

Ensure the `StatefulSet` for brokers is ready to do a rolling update by checking that:

- The update strategy is `RollingUpdate`.
- All replicas are ready.
- The version is at least 8.5.0.

The following is an example how to verify these properties.
Depending on your environment, you may have to adjust these commands slightly.

```
$ kubectl get statefulsets -l app.kubernetes.io/component=zeebe-broker -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.spec.updateStrategy.type}{"\n"}{end}'
camunda-platform-zeebe  RollingUpdate
$ kubectl rollout status statefulset -l app.kubernetes.io/component=zeebe-broker
statefulset rolling update complete 3 pods at revision camunda-platform-zeebe-d69689fbc...
$ kubectl get services -l app.kubernetes.io/component=zeebe-gateway
NAME                             TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)                       AGE
camunda-platform-zeebe-gateway   ClusterIP   10.96.227.153   <none>        9600/TCP,26500/TCP,8080/TCP   21m
$ kubectl port-forward services/camunda-platform-zeebe-gateway -p 8080:8080 &
$ curl localhost:8080/api/v1/topology | jq .brokers[].version && kill %1
8.5.0
8.5.0
8.5.0
```

To start the rolling update, update the Helm deployment to use a new version of Zeebe.
Set `$NEW_ZEEBE_VERSION` to the version you want to update to, for example `8.5.2`.
Remember to read the [update guide](/self-managed/operational-guides/update-guide/introduction.md) to check for known issues.
Then, start the rolling update with `helm upgrade`.

```
$ export $NEW_ZEEBE_VERSION=8.5.2
$ helm upgrade camunda-platform camunda/camunda-platform --reuse-values --set zeebe.image.tag=$NEW_ZEEBE_VERSION
```

Then, wait for the rolling update to complete:

```
$ kubectl rollout status statefulset -l app.kubernetes.io/component=zeebe-broker
Waiting for 3 pods to be ready...
Waiting for 2 pods to be ready...
Waiting for 1 pods to be ready...
statefulset rolling update complete 3 pods at revision camunda-platform-zeebe-5b7f7d6477...
```

When the command finishes, all Zeebe brokers are updated to the new version and should be ready.
We can verify this by running the command to check versions again:

```shell
$ kubectl port-forward services/camunda-platform-zeebe-gateway -p 8080:8080 &
$ curl localhost:8080/api/v1/topology | jq .brokers[].version && kill %1
8.5.2
8.5.2
8.5.2
```

#### Updating gateways

Ensure the deployment of gateways is ready to do a rolling update by checking that:

- All replicas are ready.
- The version is at least 8.5.

You can use the following command to verify this:

```
$ kubectl rollout status statefulset -l app.kubernetes.io/component=zeebe-gateway
NAME                             READY   UP-TO-DATE   AVAILABLE   AGE
camunda-platform-zeebe-gateway   2/2     2            2           4h25m
```

Then, update the version via Helm:

```
$ helm upgrade camunda-platform camunda/camunda-platform --reuse-values --set zeebe-gateway.image.tag=$NEW_ZEEBE_VERSION
```

Wait for the update to complete:

```
$ kubectl rollout status -l app.kubernetes.io/component=zeebe-gateway
```

At this point, both brokers and gateways are updated.
Your client applications are ready to be updated as well and can start using features added in the new version.

### Troubleshooting

#### Rolling update is not completing

A rolling update can become stuck due to outside interference such as failing Kubernetes pods.

To recover from this, the update can be forced by not waiting on each broker to become ready and instead directly updating all brokers at once.
Assuming you use our Helm charts, this can be done via the following command:

```
$ kubectl delete pod -l app.kubernetes.io/component=zeebe-broker
```

This will recreate all broker pods from scratch, running the new version.
Because the update is no longer rolling and all brokers are shut down at the same time, a short downtime is to be expected.

#### Failed to install partition

If updated brokers log the error message `Failed to install partition` and do not become healthy, look for more details to understand if this is caused by the rolling update.

If the error is caused by `Cannot upgrade to or from a pre-release version`, Zeebe detected that either the version you started from or the version you updated to is a pre-release version.

This is not permitted because pre-release versions such as alpha releases are considered unstable and do not guarantee compatibility with any other version.

:::note
If you attempted to update from a minor release to a pre-release or alpha version, it is possible to roll back to the previous version of Zeebe. Note that version rollbacks are not supported in most other instances.
:::

If the log message includes `Snapshot is not compatible with current version`, the rolling update failed and manual recovery is required.

:::note
This message can also be logged by not yet updated brokers, in which case it should resolve itself automatically as soon as the [rolling update completes](#rolling-update-is-not-completing).
:::

The exact scenario is further described in the log message and can be one of the following:

##### Snapshot is not compatible with current version: `SkippedMinorVersion`

This normally occurs when attempting an update from one minor version to a newer one while skipping minor versions in between. For example, updating from 8.5 to 8.7 directly without first updating to 8.6.

This is not supported and Zeebe refuses to run when detecting this. To recover, you may be able to roll back to the previous version and then update to the next minor version first.

Another much more unlikely cause may be that you updated multiple times before Zeebe brokers could take snapshots.

For example, if you first update from 8.5 to 8.6 and then immediately to 8.7, the updated brokers running 8.7 may find snapshots taken by 8.5 and refuse to run. You can recover from this manually.

##### Snapshot is not compatible with current version: `PatchDowngrade` or `MinorDowngrade`

These indicate a deliberate version downgrade which Zeebe does not support.
If you mistakenly tried to downgrade either the patch or minor version, you can restore by switching to the original version again.

:::note
This message may show up during a rolling update on not yet updated broker.
In that case, it is caused by updated brokers sharing snapshots with not yet updated brokers.
This should resolve automatically once the broker is updated.
:::

If this persists, you can [force the update](#rolling-update-is-not-completing). Alternatively, it is possible to restart Zeebe with the "skipped" minor version. Note that version rollbacks are not supported in most other instances.

## Offline update

See the [update guide](/self-managed/operational-guides/update-guide/introduction.md) for specific instructions per Zeebe version.

To update a Zeebe cluster, take the following steps:

1. Shut down all Zeebe brokers and other components of the system.
1. Take a [backup](./backups.md) of your Zeebe brokers and Elasticsearch `data` folder if used.
1. Update all Zeebe brokers and gateways to the new version.
1. Restart the system components.

## Partitions admin endpoint

This endpoint allows querying the status of the partitions and performing operations to prepare an update.

The endpoint is available under `http://{zeebe-broker}:{zeebe.broker.network.monitoringApi.port}/actuator/partitions` (default port: `9600`).

It is enabled by default. It can be disabled in the configuration by setting:

```
management.endpoint.partitions.enabled=false
```

### Query the partition status

The status of the partitions can be queried with a `GET` request:

```
/actuator/partitions
```

The response contains all partitions of the broker mapped to the partition-id.

<details>
  <summary>Full Response</summary>
  <p>

```
{
    "1":{
        "role":"LEADER",
        "snapshotId":"399-1-1601275126554-490-490",
        "processedPosition":490,
        "processedPositionInSnapshot":490,
        "streamProcessorPhase":"PROCESSING"
    }
}
```

  </p>
</details>
