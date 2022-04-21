module.exports = {
  Guides: [
    "guides/introduction-to-camunda-cloud",
    {
      "Getting started with Camunda Platform": [
        "guides/getting-started/create-camunda-cloud-account",
        "guides/getting-started/create-your-cluster",
        "guides/getting-started/setup-client-connection-credentials",
        "guides/getting-started/connect-to-your-cluster",
        "guides/getting-started/model-your-first-process",
        "guides/getting-started/deploy-your-process-and-start-process-instance",
        "guides/getting-started/implement-service-task",
        "guides/getting-started/implement-decision-gateway",
        // "guides/getting-started/involve-humans",
        "guides/getting-started/monitor-your-process-in-operate",
      ],
    },
    "guides/getting-started-orchestrate-human-tasks",
    "guides/getting-started-orchestrate-microservices",
    "guides/setting-up-development-project",
    "guides/automating-a-process-using-bpmn",
    "guides/create-decision-tables-using-dmn",
    "guides/utilizing-forms",
    "guides/improve-processes-with-optimize",
    "guides/message-correlation",
    {
      "Update Guide": [
        "guides/update-guide/introduction",
        "guides/update-guide/130-to-800",
        "guides/update-guide/120-to-130",
        "guides/update-guide/110-to-120",
        "guides/update-guide/100-to-110",
        "guides/update-guide/026-to-100",
      ],
    },
    "guides/migrating-from-camunda-platform-7",
  ],
  Components: [
    "components/overview",
    {
      Concepts: [
        "components/concepts/what-is-camunda-platform-8",
        "components/concepts/processes",
        "components/concepts/job-workers",
        "components/concepts/process-instance-creation",
        "components/concepts/messages",
        "components/concepts/incidents",
        "components/concepts/variables",
        "components/concepts/expressions",
      ],
      "Console": [
        "components/console/introduction",
        {
          "Manage your organization": [
            "components/console/manage-organization/organization-settings",
            "components/console/manage-organization/manage-users",
            "components/console/manage-organization/view-organization-activity",
            "components/console/manage-organization/usage-history",
            "components/console/manage-organization/update-billing-reservations",
            "components/console/manage-organization/switch-organization",
          ],
        },
        {
          "Manage clusters": [
            "components/console/manage-clusters/create-cluster",
            "components/console/manage-clusters/rename-cluster",
            "components/console/manage-clusters/delete-cluster",
            "components/console/manage-clusters/manage-api-clients",
            "components/console/manage-clusters/manage-alerts",
            "components/console/manage-clusters/manage-ip-whitelists",
            "components/console/manage-clusters/manage-secrets",

          ],
        },
        {
          "Manage your plan": [
            "components/console/manage-plan/available-plans",
            "components/console/manage-plan/upgrade-to-professional-plan",
          ],
        },
        {
          Troubleshooting: [
            "components/console/troubleshooting/common-pitfalls",
            "components/console/troubleshooting/feedback-and-support",
          ],
        },
      ],
      Modeler: [
        "components/modeler/about-modeler",
        {
          "Web Modeler": [
            "components/modeler/web-modeler/new-web-modeler",
            "components/modeler/web-modeler/launch-cloud-modeler",
            "components/modeler/web-modeler/model-your-first-diagram",
            "components/modeler/web-modeler/import-diagram",
            "components/modeler/web-modeler/save-and-deploy",
            "components/modeler/web-modeler/start-instance",
            "components/modeler/web-modeler/collaboration",
            "components/modeler/web-modeler/milestones",
            "components/modeler/web-modeler/token-simulation",
            {
              "Connectors": [
                "components/modeler/web-modeler/connectors/index",
                "components/modeler/web-modeler/connectors/use-connectors",
                {
                  "Available Connectors": [
                    "components/modeler/web-modeler/connectors/available-connectors/index",
                    "components/modeler/web-modeler/connectors/available-connectors/rest",
                    "components/modeler/web-modeler/connectors/available-connectors/sendgrid",
                  ]
                }
              ]
            }
          ],
        },
        {
          "Desktop Modeler": [
            "components/modeler/desktop-modeler/install-the-modeler",
            "components/modeler/desktop-modeler/model-your-first-diagram",
            "components/modeler/desktop-modeler/connect-to-camunda-cloud",
            "components/modeler/desktop-modeler/start-instance",
            {
              "Element templates": [
                "components/modeler/desktop-modeler/element-templates/about-templates",
                "components/modeler/desktop-modeler/element-templates/configuring-templates",
                "components/modeler/desktop-modeler/element-templates/using-templates",
                "components/modeler/desktop-modeler/element-templates/defining-templates",
                "components/modeler/desktop-modeler/element-templates/additional-resources"
              ],
            },
            {
              "Additional configuration": [
                "components/modeler/desktop-modeler/flags/flags",
                "components/modeler/desktop-modeler/plugins/plugins",
                "components/modeler/desktop-modeler/search-paths/search-paths",
                "components/modeler/desktop-modeler/telemetry/telemetry"
              ],
            }
          ],
        },
        {
          "BPMN": [
            "components/modeler/bpmn/modeler-bpmn",
            "components/modeler/bpmn/bpmn-primer",
            "components/modeler/bpmn/bpmn-coverage",
            "components/modeler/bpmn/data-flow",
            {
              "Tasks": [
                "components/modeler/bpmn/tasks",
                "components/modeler/bpmn/service-tasks/service-tasks",
                "components/modeler/bpmn/user-tasks/user-tasks",
                "components/modeler/bpmn/receive-tasks/receive-tasks",
                "components/modeler/bpmn/business-rule-tasks/business-rule-tasks",
                "components/modeler/bpmn/script-tasks/script-tasks",
                "components/modeler/bpmn/send-tasks/send-tasks",
                "components/modeler/bpmn/manual-tasks/manual-tasks",
              ],
            },
            {
              "Gateways": [
                "components/modeler/bpmn/gateways",
                "components/modeler/bpmn/exclusive-gateways/exclusive-gateways",
                "components/modeler/bpmn/parallel-gateways/parallel-gateways",
                "components/modeler/bpmn/event-based-gateways/event-based-gateways",
              ],
            },
            {
              "Events": [
                "components/modeler/bpmn/events",
                "components/modeler/bpmn/none-events/none-events",
                "components/modeler/bpmn/message-events/message-events",
                "components/modeler/bpmn/timer-events/timer-events",
                "components/modeler/bpmn/error-events/error-events",
              ],
            },
            {
              "Subprocesses": [
                "components/modeler/bpmn/subprocesses",
                "components/modeler/bpmn/embedded-subprocesses/embedded-subprocesses",
                "components/modeler/bpmn/call-activities/call-activities",
                "components/modeler/bpmn/event-subprocesses/event-subprocesses",
              ],
            },
            {
              "Markers": [
                "components/modeler/bpmn/markers",
                "components/modeler/bpmn/multi-instance/multi-instance",
              ],
            },
          ],
        },
        require("./docs/components/modeler/dmn/sidebar-schema"),
        require("./docs/components/modeler/feel/sidebar-schema"),
        {
          "Forms": [
            "components/modeler/forms/camunda-forms-reference",
          ],
        },
      ],
      Zeebe: [
        "components/zeebe/zeebe-overview",
        {
          "Technical concepts": [
            "components/zeebe/technical-concepts/index",
            "components/zeebe/technical-concepts/architecture",
            "components/zeebe/technical-concepts/clustering",
            "components/zeebe/technical-concepts/partitions",
            "components/zeebe/technical-concepts/internal-processing",
            "components/zeebe/technical-concepts/process-lifecycles",
            "components/zeebe/technical-concepts/protocols",
          ],
        },
        {
          "Open Source community": [
            "components/zeebe/open-source/community-contributions",
            "components/zeebe/open-source/get-help-get-involved",
          ],
        },
        {
          Appendix: [],
        },
      ],
      Operate: [
        "components/operate/index",
        {
          "User guide": [
            "components/operate/userguide/basic-operate-navigation",
            "components/operate/userguide/resolve-incidents-update-variables",
            "components/operate/userguide/selections-operations",
            "components/operate/userguide/delete-finished-instances",
            "components/operate/userguide/operate-feedback-and-questions",
          ],
        },
      ],
      Optimize: [
        "components/optimize/what-is-optimize",
        {
          "User guide": [
            "components/optimize/userguide/collections-dashboards-reports",
            "components/optimize/userguide/data-sources",
            "components/optimize/userguide/creating-dashboards",
            "components/optimize/userguide/creating-reports",
            "components/optimize/userguide/combined-reports",
            {
              "Process analysis": [
                "components/optimize/userguide/process-analysis/overview",
                "components/optimize/userguide/process-analysis/outlier-analysis",
                "components/optimize/userguide/process-analysis/branch-analysis",
                {
                  "Report analysis": [
                    "components/optimize/userguide/process-analysis/report-analysis/overview",
                    "components/optimize/userguide/process-analysis/report-analysis/edit-mode",
                    "components/optimize/userguide/process-analysis/report-analysis/view-mode",
                  ],
                },
              ],
            },
            {
              "Decision analysis": [
                "components/optimize/userguide/decision-analysis/overview",
                "components/optimize/userguide/decision-analysis/decision-report",
                "components/optimize/userguide/decision-analysis/decision-filter",
              ],
            },
            {
              "Additional features": [
                "components/optimize/userguide/additional-features/alerts",
                "components/optimize/userguide/additional-features/event-based-processes",
                "components/optimize/userguide/additional-features/export-import",
                "components/optimize/userguide/additional-features/filters",
                "components/optimize/userguide/additional-features/footer",
                "components/optimize/userguide/additional-features/variable-labeling",
              ],
            },
          ],
        },
      ],
      Tasklist: [
        "components/tasklist/introduction",
        {
          "User guide": [
            "components/tasklist/userguide/overview",
            "components/tasklist/userguide/updating-tasklist-cloud",
          ],
        },
      ],
      "Best Practices": [
        "components/best-practices/overview",
        {
          "Project Management": [
            "components/best-practices/management/following-the-customer-success-path",
            "components/best-practices/management/doing-a-proper-poc",
          ],
          "Architecture": [
            "components/best-practices/architecture/deciding-about-your-stack",
            "components/best-practices/architecture/sizing-your-environment",
            "components/best-practices/architecture/understanding-human-tasks-management",
          ],
          "Development": [
            "components/best-practices/development/connecting-the-workflow-engine-with-your-world",
            "components/best-practices/development/service-integration-patterns",
            "components/best-practices/development/writing-good-workers",
            "components/best-practices/development/dealing-with-problems-and-exceptions",
            "components/best-practices/development/handling-data-in-processes",
            "components/best-practices/development/routing-events-to-processes",
            "components/best-practices/development/testing-process-definitions",
          ],
          "Modeling": [
            "components/best-practices/modeling/creating-readable-process-models",
            "components/best-practices/modeling/naming-bpmn-elements",
            "components/best-practices/modeling/naming-technically-relevant-ids",
            "components/best-practices/modeling/modeling-beyond-the-happy-path",
            "components/best-practices/modeling/modeling-with-situation-patterns",
            "components/best-practices/modeling/building-flexibility-into-bpmn-models",
            "components/best-practices/modeling/choosing-the-dmn-hit-policy",
          ],
          "Operations": [
            "components/best-practices/operations/versioning-process-definitions",
            "components/best-practices/operations/reporting-about-processes",
          ],
          "Camunda 7 specific": [
            "components/best-practices/architecture/deciding-about-your-stack-c7",
            "components/best-practices/architecture/sizing-your-environment-c7",
            "components/best-practices/development/invoking-services-from-the-process-c7",
            "components/best-practices/development/understanding-transaction-handling-c7",
            "components/best-practices/operations/operating-camunda-c7",
            "components/best-practices/operations/performance-tuning-camunda-c7",
            "components/best-practices/operations/securing-camunda-c7",
            "components/best-practices/architecture/extending-human-task-management-c7",
          ],
    },
      ],
    },
  ],
  "APIs & Clients": [
    "apis-clients/overview",
    {
      "APIs": [
        "apis-clients/public-api",
        "apis-clients/grpc",
        "apis-clients/operate-api/index",
        require("./docs/apis-clients/tasklist-api/sidebar-schema"),
        "apis-clients/console-api-reference",
      ],
    },
    {
      "Clients": [
        {
          "Java client": [
            "apis-clients/java-client/index",
            "apis-clients/java-client/job-worker",
            "apis-clients/java-client/logging",
            "apis-clients/java-client/zeebe-process-test",
              {
                Examples: [
                  "apis-clients/java-client-examples/index",
                  "apis-clients/java-client-examples/process-deploy",
                  "apis-clients/java-client-examples/process-instance-create",
                  "apis-clients/java-client-examples/process-instance-create-nonblocking",
                  "apis-clients/java-client-examples/process-instance-create-with-result",
                  "apis-clients/java-client-examples/job-worker-open",
                  "apis-clients/java-client-examples/data-pojo",
                  "apis-clients/java-client-examples/cluster-topology-request",
                  ],
              },
            ],
          },
        {
          "Go client": [
            "apis-clients/go-client/index",
            "apis-clients/go-client/get-started",
          ],
        },
        {
          "CLI client": [
            "apis-clients/cli-client/index",
            "apis-clients/cli-client/get-started",
          ],
        },
        {
          "Community clients": [
            "apis-clients/community-clients/index",
            "apis-clients/community-clients/c-sharp",
            "apis-clients/community-clients/javascript",
            "apis-clients/community-clients/micronaut",
            "apis-clients/community-clients/python",
            "apis-clients/community-clients/ruby",
            "apis-clients/community-clients/rust",
            "apis-clients/community-clients/spring",
          ],
        },
        "apis-clients/build-your-own-client",
      ],
    },
  ],

  Reference: [
    "reference/overview",
    "reference/glossary",
    "reference/announcements",
    "reference/licenses",
    "reference/notices",
    "reference/release-policy",
    "reference/supported-environments",
    "reference/dependencies",
  ],
  "Self-Managed": [
    "self-managed/overview",
    {
      "Installation": [
        "self-managed/platform-deployment/index",
        {
          "Kubernetes": [
            "self-managed/platform-deployment/kubernetes",
            "self-managed/platform-deployment/kubernetes-helm",
          ],
        },
        "self-managed/platform-deployment/docker",
        "self-managed/platform-deployment/local",
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
          ]
        },
        "self-managed/concepts/exporters",
      ],
    },
    {
      "Zeebe": [
        "self-managed/zeebe-deployment/index",
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
            "self-managed/zeebe-deployment/security/secure-cluster-communication"
          ],
        },
        {
          Operation: [
            "self-managed/zeebe-deployment/operations/index",
            "self-managed/zeebe-deployment/operations/resource-planning",
            "self-managed/zeebe-deployment/operations/network-ports",
            "self-managed/zeebe-deployment/operations/setting-up-a-cluster",
            "self-managed/zeebe-deployment/operations/metrics",
            "self-managed/zeebe-deployment/operations/health",
            "self-managed/zeebe-deployment/operations/backpressure",
            "self-managed/zeebe-deployment/operations/disk-space",
            "self-managed/zeebe-deployment/operations/update-zeebe",
            "self-managed/zeebe-deployment/operations/rebalancing",
            "self-managed/zeebe-deployment/operations/backups"
          ],
        },
      ],
      "Operate": [
        "self-managed/operate-deployment/install-and-start",
        "self-managed/operate-deployment/configuration",
        "self-managed/operate-deployment/data-retention",
        "self-managed/operate-deployment/schema-and-migration",
        "self-managed/operate-deployment/importer-and-archiver",
        "self-managed/operate-deployment/authentication",
        "self-managed/operate-deployment/usage-metrics",
      ],
      "Tasklist": [
        "self-managed/tasklist-deployment/install-and-start",
        "self-managed/tasklist-deployment/configuration",
        "self-managed/tasklist-deployment/authentication",
        "self-managed/tasklist-deployment/usage-metrics",
      ],
      "Optimize": [
        "self-managed/optimize-deployment/install-and-start",
        {
          Configuration: [
            "self-managed/optimize-deployment/configuration/system-configuration",
            "self-managed/optimize-deployment/configuration/logging",
            "self-managed/optimize-deployment/configuration/optimize-license",
            "self-managed/optimize-deployment/configuration/security-instructions",
            "self-managed/optimize-deployment/configuration/shared-elasticsearch-cluster",
            "self-managed/optimize-deployment/configuration/history-cleanup",
            "self-managed/optimize-deployment/configuration/localization",
            "self-managed/optimize-deployment/configuration/object-variables",
            "self-managed/optimize-deployment/configuration/clustering",
            "self-managed/optimize-deployment/configuration/webhooks",
            "self-managed/optimize-deployment/configuration/authorization-management",
            "self-managed/optimize-deployment/configuration/user-management",
            "self-managed/optimize-deployment/configuration/multi-tenancy",
            "self-managed/optimize-deployment/configuration/multiple-engines",
            "self-managed/optimize-deployment/configuration/setup-event-based-processes",
            "self-managed/optimize-deployment/configuration/telemetry",
            "self-managed/optimize-deployment/configuration/common-problems",
          ],
        },
        {
          Plugins: [
            "self-managed/optimize-deployment/plugins/plugin-system",
            "self-managed/optimize-deployment/plugins/businesskey-import-plugin",
            "self-managed/optimize-deployment/plugins/decision-import-plugin",
            "self-managed/optimize-deployment/plugins/elasticsearch-header",
            "self-managed/optimize-deployment/plugins/engine-rest-filter-plugin",
            "self-managed/optimize-deployment/plugins/single-sign-on",
            "self-managed/optimize-deployment/plugins/variable-import-plugin",
          ],
        },
        {
          "REST API": [
            "self-managed/optimize-deployment/rest-api/authorization",
            {
              "Configuration": [
                "self-managed/optimize-deployment/rest-api/configuration/enable-sharing",
                "self-managed/optimize-deployment/rest-api/configuration/disable-sharing",
              ],
            },
            {
              "Dashboard": [
                "self-managed/optimize-deployment/rest-api/dashboard/get-dashboard-ids",
                "self-managed/optimize-deployment/rest-api/dashboard/delete-dashboard",
                "self-managed/optimize-deployment/rest-api/dashboard/export-dashboard-definitions",
              ],
            },
            {
              "Report": [
                "self-managed/optimize-deployment/rest-api/report/get-report-ids",
                "self-managed/optimize-deployment/rest-api/report/delete-report",
                "self-managed/optimize-deployment/rest-api/report/export-report-definitions",
                "self-managed/optimize-deployment/rest-api/report/get-data-export",
              ],
            },
            "self-managed/optimize-deployment/rest-api/event-ingestion",
            "self-managed/optimize-deployment/rest-api/external-variable-ingestion",
            "self-managed/optimize-deployment/rest-api/health-readiness",
            "self-managed/optimize-deployment/rest-api/import-entities",
            "self-managed/optimize-deployment/rest-api/variable-labeling",
          ],
        },
        "self-managed/optimize-deployment/reimport",
        {
          "Migration & Update": [
            "self-managed/optimize-deployment/migration-update/instructions",
            "self-managed/optimize-deployment/migration-update/3.7-to-3.8",
            "self-managed/optimize-deployment/migration-update/3.6-to-3.7",
            "self-managed/optimize-deployment/migration-update/3.5-to-3.6",
            "self-managed/optimize-deployment/migration-update/3.4-to-3.5",
            "self-managed/optimize-deployment/migration-update/3.3-to-3.4",
            "self-managed/optimize-deployment/migration-update/3.2-to-3.3",
            "self-managed/optimize-deployment/migration-update/3.1-to-3.2",
            "self-managed/optimize-deployment/migration-update/3.0-to-3.1",
            "self-managed/optimize-deployment/migration-update/2.7-to-3.0",
            "self-managed/optimize-deployment/migration-update/2.6-to-2.7",
            "self-managed/optimize-deployment/migration-update/2.5-to-2.6",
            "self-managed/optimize-deployment/migration-update/2.4-to-2.5",
            "self-managed/optimize-deployment/migration-update/2.3-to-2.4",
            "self-managed/optimize-deployment/migration-update/2.2-to-2.3",
            "self-managed/optimize-deployment/migration-update/2.1-to-2.2",
          ],
        },
        {
          "Optimize Explained": [
            "self-managed/optimize-deployment/optimize-explained/engine-data-deletion",
            "self-managed/optimize-deployment/optimize-explained/import-guide",
          ],
        },


      ],
      "Identity": [
        "self-managed/identity/what-is-identity",
        "self-managed/identity/getting-started/index",
        {
          "User guide": [
            "self-managed/identity/user-guide/adding-an-application",
            "self-managed/identity/user-guide/adding-an-api",
            "self-managed/identity/user-guide/adding-a-permission",
            "self-managed/identity/user-guide/adding-a-role",
            "self-managed/identity/user-guide/assigning-a-permission-to-a-role",
            "self-managed/identity/user-guide/assigning-a-role-to-a-user",
            "self-managed/identity/user-guide/configure-external-identity-provider",
            "self-managed/identity/user-guide/making-identity-production-ready",
          ],
        }, {
          "Deployment": [
            "self-managed/identity/deployment/configuration-variables",
            "self-managed/identity/deployment/application-monitoring",
          ],
        },
      ],
    }, {
      Troubleshooting: [
        "self-managed/troubleshooting/log-levels",
      ]
    },
  ],
};
