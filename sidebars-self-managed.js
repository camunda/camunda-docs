const { optimizeLink } = require("./sidebars-lib.js");

const SELF_MANAGED = [
  "self-managed/about-self-managed",
  {
    Architecture: ["self-managed/platform-architecture/overview"],
    Installation: [
      "self-managed/platform-deployment/overview",
      {
        "Helm/Kubernetes": [
          "self-managed/platform-deployment/helm-kubernetes/overview",
          "self-managed/platform-deployment/helm-kubernetes/deploy",
          "self-managed/platform-deployment/helm-kubernetes/upgrade",
          {
            Platforms: [
              "self-managed/platform-deployment/helm-kubernetes/platforms/amazon-eks",
              "self-managed/platform-deployment/helm-kubernetes/platforms/microsoft-aks",
              "self-managed/platform-deployment/helm-kubernetes/platforms/redhat-openshift",
            ],
            Guides: [
              "self-managed/platform-deployment/helm-kubernetes/guides/local-kubernetes-cluster",
              "self-managed/platform-deployment/helm-kubernetes/guides/accessing-components-without-ingress",
              "self-managed/platform-deployment/helm-kubernetes/guides/ingress-setup",
              "self-managed/platform-deployment/helm-kubernetes/guides/air-gapped-installation",
            ],
          },
          "self-managed/platform-deployment/troubleshooting",
        ],
      },
      "self-managed/platform-deployment/docker",
      "self-managed/platform-deployment/manual",
    ],
  },
  {
    Concepts: [
      {
        "Access control": [
          "self-managed/concepts/access-control/applications",
          "self-managed/concepts/access-control/apis",
          "self-managed/concepts/access-control/permissions",
          "self-managed/concepts/access-control/roles",
          "self-managed/concepts/access-control/users",
        ],
        Authentication: ["self-managed/concepts/authentication/m2m-tokens"],
      },
      "self-managed/concepts/exporters",
    ],
  },
  {
    Zeebe: [
      "self-managed/zeebe-deployment/zeebe-installation",
      {
        Configuration: [
          "self-managed/zeebe-deployment/configuration/configuration",
          "self-managed/zeebe-deployment/configuration/logging",
          "self-managed/zeebe-deployment/configuration/gateway-health-probes",
          "self-managed/zeebe-deployment/configuration/environment-variables",
          "self-managed/zeebe-deployment/configuration/fixed-partitioning",
          "self-managed/zeebe-deployment/configuration/priority-election",
        ],
      },
      {
        Security: [
          "self-managed/zeebe-deployment/security/security",
          "self-managed/zeebe-deployment/security/secure-client-communication",
          "self-managed/zeebe-deployment/security/client-authorization",
          "self-managed/zeebe-deployment/security/secure-cluster-communication",
        ],
      },
      {
        Operation: [
          "self-managed/zeebe-deployment/operations/zeebe-in-production",
          "self-managed/zeebe-deployment/operations/resource-planning",
          "self-managed/zeebe-deployment/operations/network-ports",
          "self-managed/zeebe-deployment/operations/setting-up-a-cluster",
          "self-managed/zeebe-deployment/operations/metrics",
          "self-managed/zeebe-deployment/operations/health",
          "self-managed/zeebe-deployment/operations/backpressure",
          "self-managed/zeebe-deployment/operations/disk-space",
          "self-managed/zeebe-deployment/operations/update-zeebe",
          "self-managed/zeebe-deployment/operations/rebalancing",
          "self-managed/zeebe-deployment/operations/management-api",
          "self-managed/zeebe-deployment/operations/backups",
        ],
      },
    ],
    Operate: [
      "self-managed/operate-deployment/install-and-start",
      "self-managed/operate-deployment/operate-configuration",
      "self-managed/operate-deployment/data-retention",
      "self-managed/operate-deployment/schema-and-migration",
      "self-managed/operate-deployment/importer-and-archiver",
      "self-managed/operate-deployment/operate-authentication",
      "self-managed/operate-deployment/usage-metrics",
    ],
    Tasklist: [
      "self-managed/tasklist-deployment/install-and-start",
      "self-managed/tasklist-deployment/tasklist-configuration",
      "self-managed/tasklist-deployment/tasklist-authentication",
      "self-managed/tasklist-deployment/usage-metrics",
    ],
    Connectors: [
      "self-managed/connectors-deployment/install-and-start",
      "self-managed/connectors-deployment/connectors-configuration",
    ],

    Optimize: [
      optimizeLink(
        "Installation",
        "self-managed/optimize-deployment/install-and-start/"
      ),
      optimizeLink(
        "Version policy",
        "self-managed/optimize-deployment/version-policy/"
      ),
      {
        Configuration: [
          optimizeLink(
            "Getting started",
            "self-managed/optimize-deployment/configuration/getting-started/"
          ),
          {
            "System configuration": [
              optimizeLink(
                "Overview",
                "self-managed/optimize-deployment/configuration/system-configuration/"
              ),
              optimizeLink(
                "Camunda Platform 8 system configuration",
                "self-managed/optimize-deployment/configuration/system-configuration-platform-8/"
              ),
              optimizeLink(
                "Camunda Platform 7 system configuration",
                "self-managed/optimize-deployment/configuration/system-configuration-platform-7/"
              ),
              optimizeLink(
                "Event-based process system configuration",
                "self-managed/optimize-deployment/configuration/event-based-process-configuration/"
              ),
            ],
          },
          optimizeLink(
            "Logging",
            "self-managed/optimize-deployment/configuration/logging/"
          ),
          optimizeLink(
            "Optimize license key",
            "self-managed/optimize-deployment/configuration/optimize-license/"
          ),
          optimizeLink(
            "Security instructions",
            "self-managed/optimize-deployment/configuration/security-instructions/"
          ),
          optimizeLink(
            "Shared Elasticsearch cluster",
            "self-managed/optimize-deployment/configuration/shared-elasticsearch-cluster/"
          ),
          optimizeLink(
            "History cleanup",
            "self-managed/optimize-deployment/configuration/history-cleanup/"
          ),
          optimizeLink(
            "Localization",
            "self-managed/optimize-deployment/configuration/localization/"
          ),
          optimizeLink(
            "Object and list variable support",
            "self-managed/optimize-deployment/configuration/object-variables/"
          ),
          optimizeLink(
            "Clustering",
            "self-managed/optimize-deployment/configuration/clustering/"
          ),
          optimizeLink(
            "Webhooks",
            "self-managed/optimize-deployment/configuration/webhooks/"
          ),
          optimizeLink(
            "Authorization management",
            "self-managed/optimize-deployment/configuration/authorization-management/"
          ),
          optimizeLink(
            "User access management",
            "self-managed/optimize-deployment/configuration/user-management/"
          ),
          optimizeLink(
            "Multi-tenancy",
            "self-managed/optimize-deployment/configuration/multi-tenancy/"
          ),
          optimizeLink(
            "Multiple process engines",
            "self-managed/optimize-deployment/configuration/multiple-engines/"
          ),
          optimizeLink(
            "Event-based processes",
            "self-managed/optimize-deployment/configuration/setup-event-based-processes/"
          ),
          optimizeLink(
            "Telemetry",
            "self-managed/optimize-deployment/configuration/telemetry/"
          ),
          optimizeLink(
            "Common problems",
            "self-managed/optimize-deployment/configuration/common-problems/"
          ),
        ],
      },
      {
        Plugins: [
          optimizeLink(
            "Optimize plugin system",
            "self-managed/optimize-deployment/plugins/plugin-system/"
          ),
          optimizeLink(
            "Business key import customization",
            "self-managed/optimize-deployment/plugins/businesskey-import-plugin/"
          ),
          optimizeLink(
            "Decision inputs and outputs import customization",
            "self-managed/optimize-deployment/plugins/decision-import-plugin/"
          ),
          optimizeLink(
            "Elasticsearch header",
            "self-managed/optimize-deployment/plugins/elasticsearch-header/"
          ),
          optimizeLink(
            "Engine REST filter",
            "self-managed/optimize-deployment/plugins/engine-rest-filter-plugin/"
          ),
          optimizeLink(
            "Single sign on",
            "self-managed/optimize-deployment/plugins/single-sign-on/"
          ),
          optimizeLink(
            "Variable import customization",
            "self-managed/optimize-deployment/plugins/variable-import-plugin/"
          ),
        ],
      },
      optimizeLink(
        "Camunda engine data reimport",
        "self-managed/optimize-deployment/reimport/"
      ),
      {
        "Migration & update": [
          optimizeLink(
            "Instructions",
            "self-managed/optimize-deployment/migration-update/instructions/"
          ),
          optimizeLink(
            "Update notes (3.9.x-preview-x to 3.9.x)",
            "self-managed/optimize-deployment/migration-update/3.9-preview-1-to-3.9/"
          ),
          optimizeLink(
            "Update notes (3.8.x to 3.9.x-preview-1)",
            "self-managed/optimize-deployment/migration-update/3.8-to-3.9-preview-1/"
          ),
          optimizeLink(
            "Update notes (3.7.x to 3.8.x)",
            "self-managed/optimize-deployment/migration-update/3.7-to-3.8/"
          ),
          optimizeLink(
            "Update notes (3.6 to 3.7.x)",
            "self-managed/optimize-deployment/migration-update/3.6-to-3.7/"
          ),
          optimizeLink(
            "Update notes (3.5 to 3.6)",
            "self-managed/optimize-deployment/migration-update/3.5-to-3.6/"
          ),
          optimizeLink(
            "Update notes (3.4 to 3.5)",
            "self-managed/optimize-deployment/migration-update/3.4-to-3.5/"
          ),
          optimizeLink(
            "Update notes (3.3 to 3.4)",
            "self-managed/optimize-deployment/migration-update/3.3-to-3.4/"
          ),
          optimizeLink(
            "Update notes (3.2 to 3.3)",
            "self-managed/optimize-deployment/migration-update/3.2-to-3.3/"
          ),
          optimizeLink(
            "Update notes (3.1 to 3.2)",
            "self-managed/optimize-deployment/migration-update/3.1-to-3.2/"
          ),
          optimizeLink(
            "Update notes (3.0 to 3.1)",
            "self-managed/optimize-deployment/migration-update/3.0-to-3.1/"
          ),
          optimizeLink(
            "Update notes (2.7 to 3.0)",
            "self-managed/optimize-deployment/migration-update/2.7-to-3.0/"
          ),
          optimizeLink(
            "Update notes (2.6 to 2.7)",
            "self-managed/optimize-deployment/migration-update/2.6-to-2.7/"
          ),
          optimizeLink(
            "Update notes (2.5 to 2.6)",
            "self-managed/optimize-deployment/migration-update/2.5-to-2.6/"
          ),
          optimizeLink(
            "Update notes (2.4 to 2.5)",
            "self-managed/optimize-deployment/migration-update/2.4-to-2.5/"
          ),
          optimizeLink(
            "Update notes (2.3 to 2.4)",
            "self-managed/optimize-deployment/migration-update/2.3-to-2.4/"
          ),
          optimizeLink(
            "Update notes (2.2 to 2.3)",
            "self-managed/optimize-deployment/migration-update/2.2-to-2.3/"
          ),
          optimizeLink(
            "Update notes (2.1 to 2.2)",
            "self-managed/optimize-deployment/migration-update/2.1-to-2.2/"
          ),
        ],
      },
      {
        "Advanced features": [
          optimizeLink(
            "Engine data deletion",
            "self-managed/optimize-deployment/advanced-features/engine-data-deletion/"
          ),
          optimizeLink(
            "Data import",
            "self-managed/optimize-deployment/advanced-features/import-guide/"
          ),
        ],
      },
    ],

    Identity: [
      "self-managed/identity/what-is-identity",
      "self-managed/identity/getting-started/install-identity",
      {
        "User guide": [
          "self-managed/identity/user-guide/adding-an-application",
          "self-managed/identity/user-guide/adding-an-api",
          "self-managed/identity/user-guide/adding-a-permission",
          "self-managed/identity/user-guide/assigning-a-permission-to-an-application",
          "self-managed/identity/user-guide/adding-a-role",
          "self-managed/identity/user-guide/assigning-a-permission-to-a-role",
          "self-managed/identity/user-guide/assigning-a-role-to-a-user",
          "self-managed/identity/user-guide/configure-external-identity-provider",
          "self-managed/identity/user-guide/configure-logging",
          "self-managed/identity/user-guide/making-identity-production-ready",
          "self-managed/identity/user-guide/generating-m2m-tokens",
          "self-managed/identity/user-guide/managing-user-access",
          "self-managed/identity/user-guide/connect-to-an-existing-keycloak",
        ],
      },
      {
        Deployment: [
          "self-managed/identity/deployment/configuration-variables",
          "self-managed/identity/deployment/application-monitoring",
          "self-managed/identity/deployment/starting-configuration-for-identity",
        ],
        Troubleshooting: [
          "self-managed/identity/troubleshooting/troubleshoot-identity",
          "self-managed/identity/troubleshooting/common-problems",
        ],
      },
    ],
  },
  {
    "Zeebe Gateway": ["self-managed/zeebe-gateway-deployment/zeebe-gateway"],
  },
  {
    Modeler: [
      {
        "Web Modeler (Beta)": ["self-managed/modeler/web-modeler/installation"],
      },
      {
        "Desktop Modeler": [
          "self-managed/modeler/desktop-modeler/deploy-to-self-managed",
        ],
      },
    ],
  },
  {
    "Backup and restore": [
      "self-managed/backup-restore/backup-and-restore",
      "self-managed/backup-restore/optimize-backup",
      "self-managed/backup-restore/operate-tasklist-backup",
      "self-managed/backup-restore/zeebe-backup-and-restore",
    ],
  },
  {
    Troubleshooting: ["self-managed/troubleshooting/log-levels"],
  },
];

module.exports = { SELF_MANAGED };
