// Compilable usage examples for client construction and topology.
// These examples are type-checked during build to guard against API regressions.
using Camunda.Orchestration.Sdk;

public static class ClientExamples
{
    #region CreateClient
    // <CreateClient>
    public static async Task CreateClientExample()
    {
        using var client = CamundaClient.Create();

        var topology = await client.GetTopologyAsync();
        Console.WriteLine($"Cluster size: {topology.ClusterSize}");
    }
    // </CreateClient>
    #endregion CreateClient

    #region GetTopology

    // <GetTopology>
    public static async Task GetTopologyExample()
    {
        using var client = CamundaClient.Create();

        var topology = await client.GetTopologyAsync();
        Console.WriteLine($"Cluster size: {topology.ClusterSize}");
    }
    // </GetTopology>
    #endregion GetTopology

    #region ChangeClusterMode

    // <ChangeClusterMode>
    public static async Task ChangeClusterModeExample()
    {
        using var client = CamundaClient.Create();

        // Pass dryRun: true to validate the request and inspect the resulting plan
        // without applying it. Omit it (or set it to false) to trigger the transition.
        var change = await client.ChangeClusterModeAsync(Mode.RECOVERING, dryRun: true);

        // Operations are grouped by physical tenant; a null tenant means the operation
        // is not scoped to one, such as a broker lifecycle operation.
        Console.WriteLine($"Cluster change {change.ChangeId}:");
        foreach (var group in change.PlannedChanges)
        {
            var tenant = group.PhysicalTenantId is null ? "cluster-wide" : group.PhysicalTenantId;
            Console.WriteLine($"  {tenant}:");
            foreach (var operation in group.Operations)
            {
                var suffix = operation.Mode is null ? "" : $" -> {operation.Mode}";
                Console.WriteLine($"    {operation.Operation}{suffix}");
            }
        }
    }
    // </ChangeClusterMode>
    #endregion ChangeClusterMode

    #region ChangeClusterModeAsClusterAdmin

    // <ChangeClusterModeAsClusterAdmin>
    public static async Task ChangeClusterModeAsClusterAdminExample()
    {
        using var client = CamundaClient.Create();

        // The cluster-admin variant can target a single physical tenant. Omit
        // physicalTenantId to apply the change to every physical tenant.
        var change = await client.ChangeClusterModeAsClusterAdminAsync(
            Mode.RECOVERING, physicalTenantId: "default", dryRun: true);

        Console.WriteLine($"Cluster change {change.ChangeId}:");
        foreach (var group in change.PlannedChanges)
        {
            var tenant = group.PhysicalTenantId is null ? "cluster-wide" : group.PhysicalTenantId;
            Console.WriteLine($"  {tenant}:");
            foreach (var operation in group.Operations)
            {
                var suffix = operation.Mode is null ? "" : $" -> {operation.Mode}";
                Console.WriteLine($"    {operation.Operation}{suffix}");
            }
        }
    }
    // </ChangeClusterModeAsClusterAdmin>
    #endregion ChangeClusterModeAsClusterAdmin

    #region GetClusterStatus

    // <GetClusterStatus>
    public static async Task GetClusterStatusExample()
    {
        using var client = CamundaClient.Create();

        var status = await client.GetClusterStatusAsync();

        Console.WriteLine($"Cluster status: {status.Status}");
    }
    // </GetClusterStatus>
    #endregion GetClusterStatus

    #region GetRestoreStatus

    // <GetRestoreStatus>
    public static async Task GetRestoreStatusExample()
    {
        using var client = CamundaClient.Create();

        // Poll this endpoint while the cluster is in recovery mode to track progress.
        var status = await client.GetRestoreStatusAsync();

        Console.WriteLine($"Restore {status.ChangeId}: {status.Status}");
    }
    // </GetRestoreStatus>
    #endregion GetRestoreStatus

    #region Restore

    // <Restore>
    public static async Task RestoreExample()
    {
        using var client = CamundaClient.Create();

        // The cluster must be in recovery mode before a restore is accepted.
        // Provide either a list of backup IDs (one per partition) or a time
        // range (From/To) that selects the backups to restore, but not both.
        var change = await client.RestoreAsync(new RestoreRequest
        {
            BackupIds = new List<long> { 100, 101 },
        });

        Console.WriteLine($"Cluster change {change.ChangeId}:");
        foreach (var group in change.PlannedChanges)
        {
            var tenant = group.PhysicalTenantId is null ? "cluster-wide" : group.PhysicalTenantId;
            Console.WriteLine($"  {tenant}: {group.Operations.Count} operation(s)");
        }
    }
    // </Restore>
    #endregion Restore

    #region RestoreAsClusterAdmin

    // <RestoreAsClusterAdmin>
    public static async Task RestoreAsClusterAdminExample()
    {
        using var client = CamundaClient.Create();

        // The cluster must be in recovery mode before a restore is accepted.
        // Use physicalTenantId to restore a single physical tenant; omit it to
        // restore every physical tenant. Pass dryRun: true to validate the
        // request and inspect the plan without applying it.
        // Provide either a list of backup IDs (one per partition) or a time
        // range (From/To), but not both.
        var change = await client.RestoreAsClusterAdminAsync(
            new ClusterRestoreRequest
            {
                BackupIds = new List<long> { 100, 101 },
            },
            physicalTenantId: "default",
            dryRun: true);

        Console.WriteLine($"Cluster change {change.ChangeId}:");
        foreach (var group in change.PlannedChanges)
        {
            var tenant = group.PhysicalTenantId is null ? "cluster-wide" : group.PhysicalTenantId;
            Console.WriteLine($"  {tenant}: {group.Operations.Count} operation(s)");
        }
    }
    // </RestoreAsClusterAdmin>
    #endregion RestoreAsClusterAdmin

    #region GetClusterTopology

    // <GetClusterTopology>
    public static async Task GetClusterTopologyExample()
    {
        using var client = CamundaClient.Create();

        // Returns the topology of the whole cluster aggregated over all physical
        // tenants. Requires cluster-admin credentials, not Orchestration Cluster
        // user credentials. Use GetTopologyAsync for single-tenant topology.
        var topology = await client.GetClusterTopologyAsync();

        Console.WriteLine($"Cluster {topology.ClusterId}: {topology.ClusterSize} broker(s), gateway {topology.GatewayVersion}");
        foreach (var tenant in topology.PhysicalTenants)
        {
            Console.WriteLine($"  Tenant {tenant.PhysicalTenantId}: {tenant.PartitionsCount} partition(s), replication {tenant.ReplicationFactor}");
        }
    }
    // </GetClusterTopology>
    #endregion GetClusterTopology

    #region TriggerClusterRebalance

    // <TriggerClusterRebalance>
    public static async Task TriggerClusterRebalanceExample()
    {
        using var client = CamundaClient.Create();

        // Transfers leadership of every partition towards its highest-priority replica,
        // one at a time. Requires cluster-admin credentials, not Orchestration Cluster
        // user credentials. Poll GetClusterRebalanceAsync to monitor progress.
        var result = await client.TriggerClusterRebalanceAsync(
            new ClusterRebalanceRequest
            {
                ReplicationLagThreshold = 1_000_000,
                MaxTransferAttempts = 3,
            });

        Console.WriteLine($"Rebalance state: {result.State}");
        foreach (var partition in result.Partitions)
        {
            Console.WriteLine($"  Partition {partition.PartitionId}: leader={partition.CurrentLeader}");
        }
    }
    // </TriggerClusterRebalance>
    #endregion TriggerClusterRebalance

    #region GetClusterRebalance

    // <GetClusterRebalance>
    public static async Task GetClusterRebalanceExample()
    {
        using var client = CamundaClient.Create();

        // Reports whether the cluster is currently balanced and the current leadership
        // state of each partition. Requires cluster-admin credentials.
        var result = await client.GetClusterRebalanceAsync();

        Console.WriteLine($"Balance state: {result.State}");
        foreach (var partition in result.Partitions)
        {
            Console.WriteLine($"  Partition {partition.PartitionId}: leader={partition.CurrentLeader}");
        }

        if (result.RunningRebalance is not null)
        {
            Console.WriteLine($"Rebalance in progress: started {result.RunningRebalance.StartedAt}");
        }
    }
    // </GetClusterRebalance>
    #endregion GetClusterRebalance

    #region CancelClusterRebalance

    // <CancelClusterRebalance>
    public static async Task CancelClusterRebalanceExample()
    {
        using var client = CamundaClient.Create();

        // Asks the running rebalance to stop once the in-flight transfer finishes.
        // Cancellation is idempotent. Requires cluster-admin credentials.
        var result = await client.CancelClusterRebalanceAsync();

        if (result.WasRunning)
        {
            Console.WriteLine("Cancellation requested; rebalance will stop after the in-flight transfer finishes.");
        }
        else
        {
            Console.WriteLine("No rebalance was running.");
        }
    }
    // </CancelClusterRebalance>
    #endregion CancelClusterRebalance
}