The Restore Application supports restoring multiple Physical Tenants, allowing you to restore one or more tenants without affecting the others on the node. It still must run on all brokers while the cluster is offline. By default, the `default` tenant is always selected as a restore target unless explicitly overridden.

To specify a single tenant to restore, use the `ZEEBE_RESTORE_TENANT_ID` environment variable or the corresponding CLI argument, `--tenantId`. Provide the rest of the restore options as you would for a normal restore.

To perform a cluster-wide restore among all Physical Tenants simultaneously, use the `ZEEBE_RESTORE_ALL_TENANTS` environment variable or the corresponding CLI argument, `--allTenants`. Provide the rest of the restore options as you would for a normal restore.

During a cluster-wide restore, you can provide argument overrides for individual tenants. With Helm values, supply the overrides through `extraConfiguration` and include the overrides file in the Spring additional locations by setting the `spring.config.additional-location` property to point to the `restore-overrides.yaml` file.
