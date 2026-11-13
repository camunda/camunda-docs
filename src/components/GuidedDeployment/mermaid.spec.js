// @ts-check

const { architectureDiagram, allOptionsDiagram } = require("./mermaid");

/** @param {string} diagram */
const lines = (diagram) => diagram.split("\n").map((line) => line.trim());

describe("architecture diagram", () => {
  it("draws EKS in a single region", () => {
    const diagram = architectureDiagram({
      regions: "1",
      vpc: "create",
      compute: "eks",
      storage: "opensearch",
      tls: "https",
      auth: "basic",
    });
    const all = lines(diagram);
    expect(all[0]).toBe("flowchart TB");
    expect(all).toContain('subgraph region_a["Region A"]');
    expect(all).not.toContain('subgraph region_b["Region B"]');
    expect(all).toContain('subgraph compute_a["Amazon EKS cluster"]');
    expect(all).toContain('web_a["Ingress (load balancer)"]');
    expect(all).toContain('db_a[("Elasticsearch or OpenSearch")]');
    expect(all).toContain('optimize_a["Optimize"]');
    expect(all).toContain('users -->|"HTTPS 443"| web_a');
    expect(all).toContain('cert_a -.->|"TLS"| web_a');
    // Nothing of Amazon ECS.
    expect(diagram).not.toMatch(/ECS|lease|Internal Network Load Balancer/);
    expect(diagram).toMatchSnapshot();
  });

  it("draws ECS in a single region", () => {
    const diagram = architectureDiagram({
      regions: "1",
      compute: "ecs",
      storage: "aurora",
      tls: "http",
      raftNlb: "yes",
      auth: "basic",
    });
    const all = lines(diagram);
    expect(all).toContain('subgraph compute_a["Amazon ECS cluster (Fargate)"]');
    expect(all).toContain('db_a[("Aurora PostgreSQL")]');
    expect(all).toContain('lease_a[("S3 lease bucket, zone-a")]');
    expect(all).toContain('brokers_a["Zeebe brokers zone-a_0 to zone-a_2"]');
    expect(all).toContain('users -->|"HTTP 80"| web_a');
    expect(all).toContain('users -->|"gRPC 26500"| grpc_a');
    expect(all).toContain('raft_a -->|"Raft"| brokers_a');
    // Nothing of Kubernetes or of a second region.
    expect(diagram).not.toMatch(/EKS|Ingress|Helm|region_b|peering/i);
    expect(diagram).toMatchSnapshot();
  });

  it("draws EKS in two regions with the management plane", () => {
    const diagram = architectureDiagram({
      regions: "2",
      link: "peering",
      compute: "eks",
      storage: "aurora",
      dbClass: "r6g",
      tls: "https",
      auth: "oidc",
      zones: "3-3",
      managementPlane: "deploy",
      idp: "guide",
    });
    const all = lines(diagram);
    expect(all).toContain('subgraph region_b["Region B"]');
    expect(all).toContain('vpc_a <-->|"VPC peering"| vpc_b');
    expect(all).toContain('db_a[("Aurora PostgreSQL, primary (writer)")]');
    expect(all).toContain('db_b[("Aurora PostgreSQL, secondary")]');
    expect(all).toContain(
      'db_a -.->|"Aurora Global Database replication"| db_b'
    );
    expect(all).toContain('subgraph oc_b["Orchestration Cluster, zone-b"]');
    // The management plane runs once, in the first region, and reaches both clusters.
    expect(all).toContain('subgraph mp_a["Management plane"]');
    expect(all).not.toContain('subgraph mp_b["Management plane"]');
    expect(all).toContain('hub_a -->|"REST, gRPC, health"| oc_a');
    expect(all).toContain('hub_a -->|"REST, gRPC, health"| oc_b');
    expect(all).toContain('oc_b -.->|"OIDC sign-in"| idp_a');
    // One backup bucket for the whole cluster.
    expect(all).toContain('oc_b -.->|"Backups"| backup_a');
    expect(diagram).not.toMatch(/backup_b/);
    expect(diagram).toMatchSnapshot();
  });

  it("draws ECS in three regions with a transit gateway and a 3-3-1 layout", () => {
    const diagram = architectureDiagram({
      regions: "3",
      compute: "ecs",
      storage: "aurora",
      dbClass: "r6g",
      zones: "3-3-1",
    });
    const all = lines(diagram);
    expect(all).toContain('brokers_c["Zeebe brokers zone-c_0"]');
    expect(all).toContain('tgw_a <-->|"Peering attachment"| tgw_c');
    expect(all).toContain('tgw_b <-->|"Peering attachment"| tgw_c');
    expect(all).toContain('raft_a <-->|"Broker traffic 26502"| raft_b');
    expect(all).toContain('lease_c[("S3 lease bucket, zone-c")]');
    expect(diagram).not.toMatch(/peering"\| vpc/);
  });

  it("draws the backup bucket only when the reader keeps it", () => {
    expect(architectureDiagram({ compute: "eks" })).toMatch(/backup_a/);
    const without = architectureDiagram({ compute: "ecs", backup: "none" });
    expect(without).not.toMatch(/backup/);
    // The lease bucket stays: Amazon ECS requires it.
    expect(without).toMatch(/lease_a/);
  });

  it("draws your own OIDC provider outside AWS", () => {
    const all = lines(architectureDiagram({ compute: "ecs", auth: "oidc" }));
    expect(all).toContain('idp(["Your OIDC provider"]):::external');
    expect(all).toContain('oc_a -.->|"OIDC sign-in"| idp');
  });

  it("draws a sensible default without choices", () => {
    const all = lines(architectureDiagram({}));
    expect(all).toContain('web_a["Load balancer"]');
    expect(all).toContain('users -->|"HTTP 80"| web_a');
    expect(all.filter((line) => line.startsWith("subgraph"))).toHaveLength(4);
  });

  it("never leaves a subgraph unbalanced", () => {
    for (const choices of [
      {},
      { regions: "3", compute: "eks" },
      { compute: "ec2", storage: "opensearch", tls: "https" },
    ]) {
      const all = lines(architectureDiagram(choices));
      expect(all.filter((l) => l.startsWith("subgraph")).length).toBe(
        all.filter((l) => l === "end").length
      );
    }
  });
});

describe("all options diagram", () => {
  const diagram = allOptionsDiagram();
  const all = lines(diagram);

  it("has a subgraph for every step and question", () => {
    expect(all).toContain('subgraph step_compute["Compute"]');
    expect(all).toContain(
      'subgraph q_compute["Where does the Orchestration Cluster run?"]'
    );
    expect(all).toContain('compute__eks["Amazon EKS"]');
    expect(all).toContain('cloud__azure["Microsoft Azure"]:::unavailable');
  });

  it("keeps the steps in the order of the guide", () => {
    expect(all[0]).toBe("flowchart TB");
    expect(all).toContain(
      "step_cloud_provider ~~~ step_network ~~~ step_compute ~~~ step_secondary_storage ~~~ step_object_storage ~~~ step_exposure ~~~ step_orchestration_cluster ~~~ step_management_plane ~~~ step_identity"
    );
  });

  it("draws the rules", () => {
    expect(all).toContain('compute__ec2 -. "requires" .-> regions__1');
    expect(all).toContain('compute__ecs -- "excludes" --x storage__opensearch');
    expect(all).toContain('storage__aurora -. "asks" .-> q_dbClass');
    expect(all).toContain(
      'managementPlane__deploy -. "with Amazon ECS with Fargate, requires" .-> regions__1'
    );
    expect(all).toContain(
      'storage__opensearch -. "requires one of" .-> regions__2'
    );
  });
});
