import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Before starting, choose between the **standard** migration and the **warm reindex** strategy. This choice affects how Elasticsearch data is transferred and, therefore, how long the downtime window lasts.

<Tabs groupId="migration-strategy" queryString="strategy">
<TabItem value="standard" label="Standard" default>

The standard migration performs all Elasticsearch data transfer during the cutover (Phase 3). Downtime scales linearly with Elasticsearch data volume, typically **5–40 minutes**.

This is the simplest option and is recommended when:

- Your Elasticsearch data volume is small (< 1 GB) or moderate (< 10 GB).
- You can tolerate a longer maintenance window.
- You want the fewest moving parts.

| Phase                         | Description                                                    | Downtime                   |
| ----------------------------- | -------------------------------------------------------------- | -------------------------- |
| **Phase 1** – Deploy targets  | Install operators and create target clusters alongside Bitnami | No                         |
| **Phase 2** – Initial backup  | Back up all data while the application is still running        | No                         |
| **Phase 3** – Cutover         | Freeze → final backup → full ES reindex → Helm upgrade         | **Yes** (5–40 min typical) |
| **Phase 4** – Validate        | Verify all components are healthy on the new infrastructure    | No                         |
| **Phase 5** – Cleanup Bitnami | Remove old Bitnami resources and re-verify                     | No                         |

</TabItem>
<TabItem value="warm-reindex" label="Reduced downtime (warm reindex)">

The warm reindex strategy pre-copies Elasticsearch data to the target during Phase 2, while the application is still running. At cutover, only a fast **delta reindex** is needed to sync changes written since Phase 2, significantly reducing the downtime window.

Choose this option when:

- Your Elasticsearch data volume is large (> 10 GB).
- You need to minimize the maintenance window.
- You can accept the additional complexity of a two-step ES migration.

To enable, set `ES_WARM_REINDEX=true` in `env.sh`.

| Phase                         | Description                                                       | Downtime          |
| ----------------------------- | ----------------------------------------------------------------- | ----------------- |
| **Phase 1** – Deploy targets  | Install operators and create target clusters alongside Bitnami    | No                |
| **Phase 2** – Initial backup  | Back up all data **+ full ES reindex to target** (while app runs) | No                |
| **Phase 3** – Cutover         | Freeze → final backup → **delta ES reindex** → Helm upgrade       | **Yes** (reduced) |
| **Phase 4** – Validate        | Verify all components are healthy on the new infrastructure       | No                |
| **Phase 5** – Cleanup Bitnami | Remove old Bitnami resources and re-verify                        | No                |

</TabItem>
</Tabs>
