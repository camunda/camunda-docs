module.exports = {
  Guides: [
    "guides/introduction-to-camunda-cloud",
    {
      "Getting started with Camunda Cloud": [
        "guides/getting-started/create-camunda-cloud-account",
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
    "guides/getting-started-orchestrate-microservices",
    "guides/setting-up-development-project",
    "guides/automating-a-process-using-bpmn",
    "guides/utilizing-forms",
    "guides/integrating-optimize",
    "guides/message-correlation",
    {
      "Update Guide": [
        "guides/update-guide/introduction",
        "guides/update-guide/026-to-100",
        "guides/update-guide/100-to-110",
        "guides/update-guide/110-to-120",
      ],
    },
    "guides/migrating-from-Camunda-Platform",
  ],
  Components: [
    "components/overview",
    {
      Concepts: [
        "components/concepts/what-is-camunda-cloud",
        "components/concepts/processes",
        "components/concepts/job-workers",
        "components/concepts/process-instance-creation",
        "components/concepts/messages",
        "components/concepts/incidents",
        "components/concepts/variables",
        "components/concepts/expressions",
      ],
      "Cloud Console": [
        "components/cloud-console/introduction",
        {
          "Manage your organization": [
            "components/cloud-console/manage-organization/organization-settings",
            "components/cloud-console/manage-organization/manage-users",
            "components/cloud-console/manage-organization/view-organization-activity",
            "components/cloud-console/manage-organization/update-billing-reservations",
            "components/cloud-console/manage-organization/switch-organization",
          ],
        },
        {
          "Manage clusters": [
            "components/cloud-console/manage-clusters/create-cluster",
            "components/cloud-console/manage-clusters/rename-cluster",
            "components/cloud-console/manage-clusters/delete-cluster",
            "components/cloud-console/manage-clusters/manage-api-clients",
            "components/cloud-console/manage-clusters/manage-alerts",
            "components/cloud-console/manage-clusters/manage-ip-whitelists",
          ],
        },
        {
          "Manage your plan": [
            "components/cloud-console/manage-plan/available-plans",
            "components/cloud-console/manage-plan/upgrade-to-professional-plan",
          ],
        },
        {
          Troubleshooting: [
            "components/cloud-console/troubleshooting/common-pitfalls",
            "components/cloud-console/troubleshooting/feedback-and-support",
          ],
        },
      ],
      Modeler: [
        "components/modeler/about-modeler",
        {
          "Cloud Modeler": [
            "components/modeler/cloud-modeler/launch-cloud-modeler",
            "components/modeler/cloud-modeler/model-your-first-diagram",
            "components/modeler/cloud-modeler/import-diagram",
            "components/modeler/cloud-modeler/save-and-deploy",
            "components/modeler/cloud-modeler/start-instance",
            "components/modeler/cloud-modeler/model-overview",
          ],
          },
          {
          "Camunda Modeler": [
            "components/modeler/camunda-modeler/install-the-modeler",
            "components/modeler/camunda-modeler/model-your-first-diagram",
            "components/modeler/camunda-modeler/connect-to-camunda-cloud",
            "components/modeler/camunda-modeler/deploy-to-cloud",
            "components/modeler/camunda-modeler/start-instance",
            "components/modeler/camunda-modeler/element-templates/camunda-modeler-element-templates",
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
          {
          "DMN": [
            "components/modeler/dmn/camunda-modeler-dmn",
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
            "components/zeebe/technical-concepts/exporters",
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
          {
          "Process analysis": [
            "components/optimize/userguide/process-analysis/overview",
            "components/optimize/userguide/process-analysis/outlier-analysis",
            "components/optimize/userguide/process-analysis/branch-analysis",
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
          ],
          },
          ],
        },
      ],
      Tasklist: [
        "components/tasklist/introduction",
        {
          "User guide": [
            {
              "API mode": [
                "components/tasklist/userguide/api/overview",
                "components/tasklist/userguide/api/tutorial",
              ],
              "User interface mode": [
                "components/tasklist/userguide/user-interface/overview",
              ],
            },
          ],
        },
        "components/tasklist/faq",
      ],
    },
    "components/best-practices",
  ],

  "APIs & Clients": [
    "apis-clients/overview",
    {
      "APIs": [
        "apis-clients/public-api",
        "apis-clients/grpc",
        require("./docs/apis-clients/tasklist-api/sidebar-schema"),
        "apis-clients/cloud-console-api-reference",
      ],
    },
    {
      "Clients": [
        {
          "Java client": [
            "apis-clients/java-client/index",
            "apis-clients/java-client/job-worker",
            "apis-clients/java-client/logging",
            "apis-clients/java-client/testing",
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
            "apis-clients/community-clients/spring",
            "apis-clients/community-clients/javascript",
            "apis-clients/community-clients/c-sharp",
            "apis-clients/community-clients/python",
            "apis-clients/community-clients/ruby",
            "apis-clients/community-clients/rust",
          ],
        },
        "apis-clients/build-your-own-client",
      ],
    },
  ],
 
  Reference: [
    "reference/overview",
    require("./docs/reference/feel/sidebar-schema"),
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
      "Zeebe": [
        "self-managed/zeebe-deployment/index",
        {
          "Local installation": [
            "self-managed/zeebe-deployment/local/install",
            "self-managed/zeebe-deployment/local/quickstart",
          ],
        },
        "self-managed/zeebe-deployment/docker/install",
        {
          "Kubernetes deployment": [
            "self-managed/zeebe-deployment/kubernetes/index",
            {
              "Helm charts": [
                "self-managed/zeebe-deployment/kubernetes/helm/index",
                "self-managed/zeebe-deployment/kubernetes/helm/prerequisites",
                "self-managed/zeebe-deployment/kubernetes/helm/installing-helm",
                "self-managed/zeebe-deployment/kubernetes/helm/accessing-operate",
              ],
            },
          ],
        },
        {
          Configuration: [
            "self-managed/zeebe-deployment/configuration/configuration",
            "self-managed/zeebe-deployment/configuration/logging",
            "self-managed/zeebe-deployment/configuration/gateway-health-probes",
            "self-managed/zeebe-deployment/configuration/environment-variables",
          ],
        },
        {
          Security: [
            "self-managed/zeebe-deployment/security/security",
            "self-managed/zeebe-deployment/security/authentication",
            "self-managed/zeebe-deployment/security/authorization",
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
      ],
      "Tasklist": [
        "self-managed/tasklist-deployment/install-and-start",
        "self-managed/tasklist-deployment/configuration",
        "self-managed/tasklist-deployment/authentication",
      ],
      "Optimize":[
        {
          Setup: [
        "self-managed/optimize-deployment/setup/installation",
        "self-managed/optimize-deployment/setup/security-instructions",
        "self-managed/optimize-deployment/setup/configuration",
        "self-managed/optimize-deployment/setup/user-management",
        "self-managed/optimize-deployment/setup/authorization-management",
        "self-managed/optimize-deployment/setup/secure-elasticsearch",
        "self-managed/optimize-deployment/setup/shared-elasticsearch-cluster",
        "self-managed/optimize-deployment/setup/history-cleanup",
        "self-managed/optimize-deployment/setup/localization",
        "self-managed/optimize-deployment/setup/multi-tenancy",
        "self-managed/optimize-deployment/setup/multiple-engines",
        "self-managed/optimize-deployment/setup/clustering",
        "self-managed/optimize-deployment/setup/webhooks",
        "self-managed/optimize-deployment/setup/setup-event-based-processes",
        "self-managed/optimize-deployment/setup/telemetry",
        "self-managed/optimize-deployment/setup/common-problems",
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
        "self-managed/optimize-deployment/rest-api/event-ingestion",
        "self-managed/optimize-deployment/rest-api/external-variable-ingestion",
        "self-managed/optimize-deployment/rest-api/health-readiness",

          ],
        },
        "self-managed/optimize-deployment/reimport",
        {
          "Migration & Update": [
        "self-managed/optimize-deployment/migration-update/instructions",
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
      IAM: [
        "self-managed/iam/what-is-iam",
          {
            "Getting started": [
              {
                "Running IAM with Docker": [
                  "self-managed/iam/getting-started/docker/setup-environment",
                  "self-managed/iam/getting-started/docker/start-iam",
                  "self-managed/iam/getting-started/docker/accessing-the-ui",
                ]
              }
            ],
          }, {
            "Deployment": [
              "self-managed/iam/deployment/configuration-variables",
              "self-managed/iam/deployment/making-iam-production-ready",
            ],
          },
      ],
    },{
      Troubleshooting: [
        "self-managed/troubleshooting/log-levels",
      ]
    },
  ],
};
