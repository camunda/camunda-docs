// Cluster operations: topology and readiness.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
	openapi "github.com/camunda/orchestration-cluster-api-go/client"
)

func getTopologyExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetTopology
	topology, err := client.GetTopology(ctx)
	if err != nil {
		return err
	}
	fmt.Printf("gateway %s — %d broker(s), %d partition(s)\n",
		topology.GetGatewayVersion(), len(topology.GetBrokers()), topology.GetPartitionsCount())
	// endregion GetTopology
	return nil
}

func getStatusExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetStatus
	// Readiness probe: returns a non-nil error when the cluster is not ready.
	if err := client.GetStatus(ctx); err != nil {
		return err
	}
	fmt.Println("cluster is ready")
	// endregion GetStatus
	return nil
}

func getClusterStatusExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetClusterStatus
	// Aggregated over every physical tenant: HEALTHY, DEGRADED, or DOWN.
	status, err := client.GetClusterStatus(ctx)
	if err != nil {
		return err
	}
	fmt.Printf("cluster status: %s\n", status.GetStatus())
	// endregion GetClusterStatus
	return nil
}

func getClusterTopologyExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetClusterTopology
	// Returns the topology of all brokers across every physical tenant.
	// Requires cluster-admin credentials (a separate cluster-admin security chain) —
	// calling this with standard Orchestration credentials will fail authorization.
	topology, err := client.GetClusterTopology(ctx)
	if err != nil {
		return err
	}
	fmt.Printf("cluster %s — %d broker(s), %d physical tenant(s)\n",
		topology.GetClusterId(), len(topology.GetBrokers()), len(topology.GetPhysicalTenants()))
	// endregion GetClusterTopology
	return nil
}

func getClusterUpgradeStatusExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetClusterUpgradeStatus
	// One overall status folded over every physical tenant and condition:
	// MIGRATED, MIGRATION_IN_PROGRESS, or UNKNOWN before anything has been reported yet.
	status, err := client.GetClusterUpgradeStatus(ctx)
	if err != nil {
		return err
	}
	fmt.Printf("cluster upgrade status: %s\n", status.GetStatus())
	// endregion GetClusterUpgradeStatus
	return nil
}

func triggerClusterRebalanceExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region TriggerClusterRebalance
	// Starts a cluster rebalance, redistributing partition leadership to the preferred nodes.
	// Requires cluster-admin credentials (a separate cluster-admin security chain) —
	// calling this with standard Orchestration credentials will fail authorization.
	req := openapi.NewClusterRebalanceRequest()
	req.SetReplicationLagThreshold(1024 * 1024) // 1 MiB max lag for leader transfer

	balance, err := client.TriggerClusterRebalance(ctx, *req)
	if err != nil {
		return err
	}
	fmt.Printf("cluster balance state: %s, %d partition(s)\n", balance.GetState(), len(balance.GetPartitions()))
	// endregion TriggerClusterRebalance
	return nil
}

func getClusterRebalanceExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region GetClusterRebalance
	// Requires cluster-admin credentials (a separate cluster-admin security chain) —
	// calling this with standard Orchestration credentials will fail authorization.
	balance, err := client.GetClusterRebalance(ctx)
	if err != nil {
		return err
	}
	fmt.Printf("cluster balance state: %s, %d partition(s)\n", balance.GetState(), len(balance.GetPartitions()))
	if running, ok := balance.GetRunningRebalanceOk(); ok && running != nil {
		fmt.Printf("rebalance in progress: %v\n", running)
	}
	// endregion GetClusterRebalance
	return nil
}

func cancelClusterRebalanceExample(ctx context.Context, client *camunda.CamundaClient) error {
	// region CancelClusterRebalance
	// Requires cluster-admin credentials (a separate cluster-admin security chain) —
	// calling this with standard Orchestration credentials will fail authorization.
	resp, err := client.CancelClusterRebalance(ctx)
	if err != nil {
		return err
	}
	if resp.GetWasRunning() {
		fmt.Println("rebalance cancelled")
	} else {
		fmt.Println("no rebalance was running")
	}
	// endregion CancelClusterRebalance
	return nil
}
