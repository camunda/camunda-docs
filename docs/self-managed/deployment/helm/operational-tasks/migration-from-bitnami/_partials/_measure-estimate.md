You can measure the actual cutover duration on your environment **without causing any downtime**:

```bash
# After completing Phases 1 and 2:
./3-cutover.sh --estimate
```

This runs the real PG backup/restore and ES reindex operations against the target infrastructure but **skips** freezing the application and the Helm upgrade. The application remains fully operational throughout.

Use this to:

- **Measure real timing** with your actual data volumes before scheduling a maintenance window.
- **Validate ES reindex throughput** on your cluster hardware (storage, network, CPU).
- **Compare standard vs. warm reindex** — run Phase 2 once without `ES_WARM_REINDEX`, estimate with `./3-cutover.sh --estimate`, then enable `ES_WARM_REINDEX=true`, rerun Phase 2, and estimate again.

The estimate does not mark Phase 3 as complete, so you can run the real cutover afterwards with `./3-cutover.sh`.

:::note
The estimate restores data to the target backends (CNPG, ECK, or managed services). This is harmless — the real cutover will overwrite with the final consistent backup taken after freezing the application.
:::
