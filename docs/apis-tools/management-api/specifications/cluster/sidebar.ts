import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "apis-tools/management-api/specifications/cluster/cluster-topology-management-api",
    },
    {
      type: "category",
      label: "UNTAGGED",
      items: [
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/cluster/add-a-broker-to-the-cluster",
          label: "Add a broker to the cluster",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/cluster/remove-a-broker-from-the-cluster",
          label: "Remove a broker from the cluster.",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/cluster/add-a-broker-to-a-partitions-replication-group-or-change-its-priority",
          label:
            "Add a broker to a partition's replication group, or change its priority",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/cluster/remove-a-broker-from-a-partitions-replication-group",
          label: "Remove a broker from a partition's replication group",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/cluster/reconfigure-the-cluster-with-the-given-brokers",
          label: "Reconfigure the cluster with the given brokers.",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/cluster/purge-data-from-the-cluster",
          label: "Purge data from the cluster",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/cluster/get-current-topology",
          label: "Get current topology",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/cluster/get-a-configuration-change",
          label: "Get a configuration change",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/cluster/list-configuration-changes",
          label: "List configuration changes",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/cluster/reconfigure-cluster",
          label: "Reconfigure cluster",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/cluster/update-the-routing-state",
          label: "Update the routing state",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/cluster/update-the-partition-distribution-configuration",
          label: "Update the partition distribution configuration",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/cluster/remove-a-zone",
          label: "Remove a zone",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/cluster/add-back-a-previously-removed-zone",
          label: "Add back a previously removed zone",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/cluster/migrate-a-zone-to-a-zone-aware-topology",
          label: "Migrate a zone to a zone-aware topology",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/cluster/remove-a-disabled-physical-tenant",
          label: "Remove a disabled physical tenant",
          className: "api-method delete",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
