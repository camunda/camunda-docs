# TODO: split "Remove a zone" into happy-path vs. force-remove

Doc in progress: `docs/self-managed/components/orchestration-cluster/zeebe/operations/add-remove-zone.md`
PR: https://github.com/camunda/camunda-docs/pull/9879 (draft)

## Verified facts (monorepo source)

- **`DELETE actuator/cluster/zones/{zoneId}` (force-remove)** — `ForceRemoveZoneTransformer`
  (`zeebe/dynamic-config/src/main/java/io/camunda/zeebe/dynamic/config/api/ForceRemoveZoneTransformer.java`),
  wired via `ClusterEndpoint.java:517-527` → `requestSender.forceRemoveZone(...)`.
  - Delegates to `ForceScaleDownRequestTransformer`, emits `PartitionForceReconfigureOperation` /
    `MemberRemoveOperation`.
  - **No leader handoff, no `PARTITION_LEAVE`, no graceful drain.** `isForced()` returns `true`.
  - Javadoc: "Force-evicts a failed zone's brokers from the member set (no data movement, since the
    zone is down) and drops the zone from the persisted config, in one atomic change."
  - Only safe/intended for a down/unreachable zone. Git history: renamed `RemoveZone` →
    `ForceRemoveZone` in commit `01576668f140` ("refactor: rename RemoveZone to ForceRemoveZone",
    authored by carlo.sana@camunda.com) specifically to disambiguate from graceful removal.

- **`PUT actuator/cluster/partition-distribution` (graceful path)** — `UpdatePartitionDistributionTransformer`
  (`zeebe/dynamic-config/src/main/java/io/camunda/zeebe/dynamic/config/api/UpdatePartitionDistributionTransformer.java`).
  - Builds member set from `currentConfiguration.members().keySet()` + `extraMembers` — **never**
    drops members whose zone was omitted from `config.zones`.
  - Emits `UpdatePartitionDistributorConfigOperation` + whatever `PartitionReassignRequestTransformer`
    produces (`PARTITION_JOIN`/`PARTITION_BOOTSTRAP`/`PARTITION_LEAVE`/`PARTITION_RECONFIGURE_PRIORITY`).
  - **Does NOT remove broker cluster membership.** A broker whose zone is dropped just ends up with
    zero partitions — it's still a registered cluster member.
  - Confirms current doc's step 3 (separate scale-down via Reconfiguration/Scale API `brokers.remove`)
    is required and correct.

## Conclusion / next edit

Split the "Remove a zone" section in `add-remove-zone.md` into two clearly separated procedures:

1. **Remove a healthy zone** (happy path, graceful):
   - Step 1: `PUT actuator/cluster/partition-distribution` omitting the zone → drains partitions/leaders.
   - Step 2: monitor via `changeId`, confirm zone's brokers host zero partitions.
   - Step 3: separately remove the brokers from cluster membership via Reconfiguration/Scale API
     (`brokers.remove`) — [cluster-scaling.md#scale-down](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md#scale-down) — then shut down the zone's brokers/StatefulSet.

2. **Remove a down/unreachable zone** (force path):
   - Single step: `DELETE actuator/cluster/zones/{zoneId}` — atomically evicts members + drops zone
     from persisted config, no drain (zone is already down, nothing to drain).
   - Link to `management-api.md#force-remove-a-zone`; keep the existing caution callout.

Also keep in mind: existing TODO already logged as an inline PR review comment
(https://github.com/camunda/camunda-docs/pull/9879#discussion_r3970458552) about needing a
separate "migrate bare/partially-zoned cluster to zone-aware" guide — unrelated to this split,
don't conflate the two.

## Open question for tomorrow

Confirm whether the "Remove a healthy zone" happy path should recommend `DELETE /zones/{zoneId}`
at all after scale-down (to fully purge the zone from persisted config), or whether omitting the
zone from `config.zones` in step 1 already fully removes it from the persisted config (it does —
`UpdatePartitionDistributorConfigOperation` persists the new config with the zone list already
excluding it, so no further DELETE call is needed in the happy path).
