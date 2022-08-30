function optimizeLink(label, href) {
  return {
    type: "link",
    label: label,
    href: `/optimize/${href}`,
  };
}

module.exports = {
  Guides: [
    {
      "Getting started": [
        "guides/introduction-to-camunda",
        "guides/create-account",
        "guides/model-your-first-process",
        "guides/orchestrate-human-tasks",
        "guides/orchestrate-api-endpoints",
        "guides/orchestrate-microservices",
      ],
    },
    {
      "Next steps": [
        "guides/create-cluster",
        "guides/setting-up-development-project",
        "guides/setup-client-connection-credentials",
        "guides/automating-a-process-using-bpmn",
        "guides/configuring-out-of-the-box-connectors",
        "guides/create-decision-tables-using-dmn",
        "guides/utilizing-forms",
        "guides/improve-processes-with-optimize",
        "guides/message-correlation",
      ],
    },
    {
      "Update guide": [
        "guides/update-guide/introduction",
        "guides/update-guide/800-to-810",
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
    "components/components-overview",
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
        "components/concepts/workflow-patterns",
      ],
      Console: [
        "components/console/introduction-to-console",
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
            "components/console/console-troubleshooting/common-pitfalls",
            "components/console/console-troubleshooting/feedback-and-support",
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
            "components/modeler/web-modeler/fix-problems-in-your-diagram",
            "components/modeler/web-modeler/save-and-deploy",
            "components/modeler/web-modeler/start-instance",
            "components/modeler/web-modeler/collaboration",
            "components/modeler/web-modeler/milestones",
            "components/modeler/web-modeler/token-simulation",
            {
              "Advanced modeling": [
                "components/modeler/web-modeler/advanced-modeling/call-activity-linking",
                "components/modeler/web-modeler/advanced-modeling/manage-connector-templates",
              ],
            },
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
                "components/modeler/desktop-modeler/element-templates/additional-resources",
              ],
            },
            {
              "Additional configuration": [
                "components/modeler/desktop-modeler/flags/flags",
                "components/modeler/desktop-modeler/plugins/plugins",
                "components/modeler/desktop-modeler/search-paths/search-paths",
                "components/modeler/desktop-modeler/telemetry/telemetry",
              ],
            },
          ],
        },
        {
          BPMN: [
            "components/modeler/bpmn/modeler-bpmn",
            "components/modeler/bpmn/bpmn-primer",
            "components/modeler/bpmn/bpmn-coverage",
            "components/modeler/bpmn/data-flow",
            {
              Tasks: [
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
              Gateways: [
                "components/modeler/bpmn/gateways",
                "components/modeler/bpmn/exclusive-gateways/exclusive-gateways",
                "components/modeler/bpmn/parallel-gateways/parallel-gateways",
                "components/modeler/bpmn/event-based-gateways/event-based-gateways",
              ],
            },
            {
              Events: [
                "components/modeler/bpmn/events",
                "components/modeler/bpmn/none-events/none-events",
                "components/modeler/bpmn/message-events/message-events",
                "components/modeler/bpmn/timer-events/timer-events",
                "components/modeler/bpmn/error-events/error-events",
              ],
            },
            {
              Subprocesses: [
                "components/modeler/bpmn/subprocesses",
                "components/modeler/bpmn/embedded-subprocesses/embedded-subprocesses",
                "components/modeler/bpmn/call-activities/call-activities",
                "components/modeler/bpmn/event-subprocesses/event-subprocesses",
              ],
            },
            {
              Markers: [
                "components/modeler/bpmn/markers",
                "components/modeler/bpmn/multi-instance/multi-instance",
              ],
            },
          ],
        },
        require("./docs/components/modeler/dmn/sidebar-schema"),
        require("./docs/components/modeler/feel/sidebar-schema"),
        {
          Forms: ["components/modeler/forms/camunda-forms-reference"],
        },
      ],
      "Integration Framework": [
        "components/integration-framework/introduction-to-connectors",
        {
          Connectors: [
            "components/integration-framework/connectors/use-connectors",
            {
              "Out-of-the-box Connectors": [
                "components/integration-framework/connectors/out-of-the-box-connectors/available-connectors-overview",
                "components/integration-framework/connectors/out-of-the-box-connectors/rest",
                "components/integration-framework/connectors/out-of-the-box-connectors/sendgrid",
                "components/integration-framework/connectors/out-of-the-box-connectors/slack",
              ],
              "Custom-built Connectors": [
                "components/integration-framework/connectors/custom-built-connectors/connector-templates",
                "components/integration-framework/connectors/custom-built-connectors/connector-sdk",
              ],
            },
          ],
        },
      ],
      Zeebe: [
        "components/zeebe/zeebe-overview",
        {
          "Technical concepts": [
            "components/zeebe/technical-concepts/technical-concepts-overview",
            "components/zeebe/technical-concepts/architecture",
            "components/zeebe/technical-concepts/clustering",
            "components/zeebe/technical-concepts/partitions",
            "components/zeebe/technical-concepts/internal-processing",
            "components/zeebe/technical-concepts/process-lifecycles",
            "components/zeebe/technical-concepts/protocols",
          ],
        },
        {
          "Open source community": [
            "components/zeebe/open-source/community-contributions",
            "components/zeebe/open-source/get-help-get-involved",
          ],
        },
      ],
      Operate: [
        "components/operate/operate-introduction",
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
        optimizeLink("What is Optimize?", "what-is-optimize"),
        {
          "User guide": [
            optimizeLink(
              "Collections, dashboards, and reports",
              "userguide/collections-dashboards-reports/"
            ),
            optimizeLink("Data sources", "userguide/data-sources/"),
            {
              Dashboards: [
                optimizeLink(
                  "Creating dashboards",
                  "userguide/creating-dashboards/"
                ),
                optimizeLink("Edit mode", "userguide/edit-mode"),
                optimizeLink("View mode", "userguide/view-mode"),
              ],
            },
            optimizeLink("Creating reports", "userguide/creating-reports/"),
            optimizeLink(
              "Combined process reports",
              "userguide/combined-process-reports/"
            ),
            optimizeLink("Processes", "userguide/processes/"),
            {
              "Process analysis": [
                optimizeLink(
                  "Overview",
                  "userguide/process-analysis/process-analysis-overview/"
                ),
                optimizeLink(
                  "Outlier analysis",
                  "userguide/process-analysis/outlier-analysis/"
                ),
                optimizeLink(
                  "Branch analysis",
                  "userguide/process-analysis/branch-analysis/"
                ),
                {
                  "Report analysis": [
                    optimizeLink(
                      "Report process analysis",
                      "userguide/process-analysis/report-analysis/overview/"
                    ),
                    {
                      "Edit mode": [
                        optimizeLink(
                          "Overview",
                          "userguide/process-analysis/report-analysis/edit-mode/"
                        ),
                        optimizeLink(
                          "Select process definitions",
                          "userguide/process-analysis/report-analysis/select-process-definitions/"
                        ),
                        optimizeLink(
                          "Define reports",
                          "userguide/process-analysis/report-analysis/define-reports/"
                        ),
                        optimizeLink(
                          "Measures",
                          "userguide/process-analysis/report-analysis/measures/"
                        ),
                        optimizeLink(
                          "Compare target values",
                          "userguide/process-analysis/report-analysis/compare-target-values/"
                        ),
                        optimizeLink(
                          "Process instance parts",
                          "userguide/process-analysis/report-analysis/process-instance-parts/"
                        ),
                        optimizeLink(
                          "Configure reports",
                          "userguide/process-analysis/report-analysis/configure-reports/"
                        ),
                      ],
                    },
                    optimizeLink(
                      "View mode",
                      "userguide/process-analysis/report-analysis/view-mode/"
                    ),
                  ],
                },
                {
                  Filters: [
                    optimizeLink(
                      "Overview",
                      "userguide/process-analysis/filters/"
                    ),
                    optimizeLink(
                      "Metadata filters",
                      "userguide/process-analysis/metadata-filters/"
                    ),
                    optimizeLink(
                      "Instance state filters",
                      "userguide/process-analysis/instance-state-filters/"
                    ),
                    optimizeLink(
                      "Flow node filters",
                      "userguide/process-analysis/flow-node-filters/"
                    ),
                    optimizeLink(
                      "Process instance filters",
                      "userguide/process-analysis/process-instance-filters/"
                    ),
                    optimizeLink(
                      "Variable filters",
                      "userguide/process-analysis/variable-filters/"
                    ),
                  ],
                },
              ],
            },
            {
              "Decision analysis": [
                optimizeLink(
                  "Overview",
                  "userguide/decision-analysis/decision-analysis-overview/"
                ),
                optimizeLink(
                  "Single report",
                  "userguide/decision-analysis/decision-report/"
                ),
                optimizeLink(
                  "Filters",
                  "userguide/decision-analysis/decision-filter/"
                ),
              ],
            },
            {
              "Additional features": [
                optimizeLink("Alerts", "userguide/additional-features/alerts/"),
                optimizeLink(
                  "Event-based processes",
                  "userguide/additional-features/event-based-processes/"
                ),
                optimizeLink(
                  "Export and import",
                  "userguide/additional-features/export-import/"
                ),
                optimizeLink("Footer", "userguide/additional-features/footer/"),
                optimizeLink(
                  "Variable labeling",
                  "userguide/additional-features/variable-labeling/"
                ),
              ],
            },
          ],
        },
      ],
      Tasklist: [
        "components/tasklist/introduction-to-tasklist",
        {
          "User guide": [
            "components/tasklist/userguide/using-tasklist",
            "components/tasklist/userguide/updating-tasklist-cloud",
          ],
        },
      ],
      "Best Practices": [
        "components/best-practices/best-practices-overview",
        {
          "Project management": [
            "components/best-practices/management/following-the-customer-success-path",
            "components/best-practices/management/doing-a-proper-poc",
          ],
          Architecture: [
            "components/best-practices/architecture/deciding-about-your-stack",
            "components/best-practices/architecture/sizing-your-environment",
            "components/best-practices/architecture/understanding-human-tasks-management",
          ],
          Development: [
            "components/best-practices/development/connecting-the-workflow-engine-with-your-world",
            "components/best-practices/development/service-integration-patterns",
            "components/best-practices/development/writing-good-workers",
            "components/best-practices/development/dealing-with-problems-and-exceptions",
            "components/best-practices/development/handling-data-in-processes",
            "components/best-practices/development/routing-events-to-processes",
            "components/best-practices/development/testing-process-definitions",
          ],
          Modeling: [
            "components/best-practices/modeling/creating-readable-process-models",
            "components/best-practices/modeling/naming-bpmn-elements",
            "components/best-practices/modeling/naming-technically-relevant-ids",
            "components/best-practices/modeling/modeling-beyond-the-happy-path",
            "components/best-practices/modeling/modeling-with-situation-patterns",
            "components/best-practices/modeling/building-flexibility-into-bpmn-models",
            "components/best-practices/modeling/choosing-the-dmn-hit-policy",
          ],
          Operations: [
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
    "apis-clients/working-with-apis-clients",
    {
      APIs: [
        "apis-clients/public-api",
        "apis-clients/grpc",
        "apis-clients/operate-api/index",
        require("./docs/apis-clients/tasklist-api/sidebar-schema"),
        "apis-clients/console-api-reference",
        {
          "Optimize API (REST)": [
            "apis-clients/optimize-api/optimize-api-authorization",
            {
              Configuration: [
                "apis-clients/optimize-api/configuration/enable-sharing",
                "apis-clients/optimize-api/configuration/disable-sharing",
              ],
            },
            {
              Dashboard: [
                "apis-clients/optimize-api/dashboard/get-dashboard-ids",
                "apis-clients/optimize-api/dashboard/delete-dashboard",
                "apis-clients/optimize-api/dashboard/export-dashboard-definitions",
              ],
            },
            {
              Report: [
                "apis-clients/optimize-api/report/get-report-ids",
                "apis-clients/optimize-api/report/delete-report",
                "apis-clients/optimize-api/report/export-report-definitions",
                "apis-clients/optimize-api/report/get-data-export",
              ],
            },
            "apis-clients/optimize-api/event-ingestion",
            "apis-clients/optimize-api/external-variable-ingestion",
            "apis-clients/optimize-api/health-readiness",
            "apis-clients/optimize-api/import-entities",
            "apis-clients/optimize-api/variable-labeling",
          ],
        },
      ],
    },
    {
      Clients: [
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
            "apis-clients/go-client/go-get-started",
          ],
        },
        {
          "CLI client": [
            "apis-clients/cli-client/index",
            "apis-clients/cli-client/cli-get-started",
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
    "self-managed/about-self-managed",
    {
      Installation: [
        "self-managed/platform-deployment/platform-8-deployment",
        {
          Kubernetes: [
            "self-managed/platform-deployment/kubernetes",
            "self-managed/platform-deployment/kubernetes-helm",
            "self-managed/platform-deployment/amazon-eks",
          ],
          OpenShift: [
            "self-managed/platform-deployment/openshift",
            "self-managed/platform-deployment/openshift-helm",
          ],
        },
        "self-managed/platform-deployment/docker",
        "self-managed/platform-deployment/local",
        "self-managed/platform-deployment/troubleshooting",
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
      Optimize: [
        "self-managed/optimize-deployment/install-and-start",
        "self-managed/optimize-deployment/version-policy",
        {
          Configuration: [
            "self-managed/optimize-deployment/configuration/getting-started",
            {
              "System configuration": [
                "self-managed/optimize-deployment/configuration/system-configuration",
                "self-managed/optimize-deployment/configuration/system-configuration-platform-8",
                "self-managed/optimize-deployment/configuration/system-configuration-platform-7",
                "self-managed/optimize-deployment/configuration/event-based-process-configuration",
              ],
            },
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
        "self-managed/optimize-deployment/reimport",
        {
          "Migration & update": [
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
          "Advanced features": [
            "self-managed/optimize-deployment/advanced-features/engine-data-deletion",
            "self-managed/optimize-deployment/advanced-features/import-guide",
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
          ],
        },
        {
          Deployment: [
            "self-managed/identity/deployment/configuration-variables",
            "self-managed/identity/deployment/application-monitoring",
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
      Troubleshooting: ["self-managed/troubleshooting/log-levels"],
    },
  ],
};
