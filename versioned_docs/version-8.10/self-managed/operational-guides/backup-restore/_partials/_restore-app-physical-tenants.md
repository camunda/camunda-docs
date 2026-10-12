The Restore Application supports restoring multiple Physical Tenants, allowing you to restore one or more tenants without affecting the others on the node. It still must run on all brokers while the cluster is offline. By default, the `default` tenant is always selected as a restore target unless explicitly overridden.

To specify a single tenant to restore, use the `ZEEBE_RESTORE_TENANT_ID` environment variable or the corresponding CLI argument, `--tenantId`. Provide the rest of the restore options as you would for a normal restore.

:::warning
If restoring a single tenant, ensure that only the data directory for that tenant is cleared before starting the restore.
:::

To perform a cluster-wide restore among all Physical Tenants simultaneously, use the `ZEEBE_RESTORE_ALL_TENANTS` environment variable or the corresponding CLI argument, `--allTenants`. Provide the rest of the restore options as you would for a normal restore.

During a cluster-wide restore, you can provide argument overrides for individual tenants. With Helm values, supply the overrides through `extraConfiguration`. The Helm chart [imports each `extraConfiguration` file into the Spring configuration](/self-managed/deployment/helm/configure/application-configs.md#spring-boot-components) automatically, so you don't need to set `spring.config.additional-location` for the `restore-overrides.yaml` file.
