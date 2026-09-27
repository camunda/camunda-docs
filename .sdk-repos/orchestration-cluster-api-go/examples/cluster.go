// Cluster operations: topology and readiness.
package examples

import (
	"context"
	"fmt"

	camunda "github.com/camunda/orchestration-cluster-api-go"
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
