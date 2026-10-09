import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "apis-tools/management-api/specifications/backups/backup-management-api",
    },
    {
      type: "category",
      label: "UNTAGGED",
      items: [
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/backups/takes-a-backup-of-runtime-data",
          label: "Takes a backup of runtime data",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/backups/lists-all-available-runtime-backups",
          label: "Lists all available runtime backups",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/backups/get-information-of-a-runtime-backup",
          label: "Get information of a runtime backup",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/backups/delete-a-runtime-backup",
          label: "Delete a runtime backup",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/backups/get-information-about-the-current-checkpoint-and-backup-state-of-the-cluster",
          label:
            "Get information about the current checkpoint and backup state of the cluster",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/backups/reset-the-internal-backup-runtime-state",
          label: "Reset the internal backup runtime state",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/backups/force-write-backup-metadata-for-all-partitions",
          label: "Force-write backup metadata for all partitions",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/backups/takes-a-backup-of-history-data",
          label: "Takes a backup of history data",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/backups/lists-all-available-historic-backups",
          label: "Lists all available historic backups",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/backups/get-information-of-a-historic-backup",
          label: "Get information of a historic backup",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "apis-tools/management-api/specifications/backups/delete-a-historic-backup",
          label: "Delete a historic backup",
          className: "api-method delete",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
