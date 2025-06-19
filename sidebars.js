module.exports = {
  Guides: [
    "guides/introduction-to-camunda",
    {
      "Get started": [
        "guides/getting-started-java-spring",
        "guides/model-your-first-process",
        {
          "Orchestration use cases": [
            "guides/orchestrate-human-tasks",
            "guides/orchestrate-apis",
            "guides/orchestrate-microservices",
          ],
        },
      ],
    },
    {
      Design: [
        "guides/automating-a-process-using-bpmn",
        "guides/create-decision-tables-using-dmn",
        "guides/utilizing-forms",
      ],
      Automate: [
        "guides/create-cluster",
        "guides/setting-up-development-project",
        "guides/setup-client-connection-credentials",
        "guides/configuring-out-of-the-box-connectors",
        "guides/use-connectors-in-hybrid-mode",
        "guides/host-custom-connectors",
      ],
      Improve: [
        "guides/improve-processes-with-optimize",
        {
          "DevOps lifecycle": [
            "guides/devops-lifecycle/integrate-web-modeler-in-ci-cd",
          ],
        },
        "guides/use-shared-project-for-organization-wide-collaboration",
      ],
    },
    {
      type: "category",
      label: "Migrate from Camunda 7",
      link: {
        type: "doc",
        id: "guides/migrating-from-camunda-7/index",
      },
      items: [
        "guides/migrating-from-camunda-7/migration-journey",
        "guides/migrating-from-camunda-7/conceptual-differences",
        "guides/migrating-from-camunda-7/migration-tooling",
        "guides/migrating-from-camunda-7/code-conversion",
        "guides/migrating-from-camunda-7/migration-readiness",
        "guides/migrating-from-camunda-7/technical-details",
      ],
    },
  ],
  Components: [
    {
      type: "category",
      label: "Using Camunda",
      link: {
        type: "doc",
        id: "components/components-overview",
      },
      items: [
        {
          type: "doc",
          id: "components/concepts/dummy-overview", // document ID
          label: "Overview", // sidebar label
        },
        {
          type: "doc",
          id: "components/concepts/dummy-setting-up", // document ID
          label: "Set up Camunda", // sidebar label
        },
        {
          type: "category",
          label: "Processes",
          link: {
            type: "doc",
            id: "components/concepts/processes",
          },
          items: [
            "components/concepts/process-applications",
            "components/concepts/job-workers",
            "components/concepts/execution-listeners",
            "components/concepts/user-task-listeners",
            "components/concepts/process-instance-creation",
            "components/concepts/messages",
            "components/concepts/signals",
            "components/concepts/incidents",
            "components/concepts/variables",
            "components/concepts/expressions",
            "components/concepts/workflow-patterns",
            "components/concepts/process-instance-modification",
            "components/concepts/process-instance-migration",
          ],
        },
        {
          type: "doc",
          id: "components/concepts/dummy-develop", // document ID
          label: "Develop with Camunda", // sidebar label
        },
        {
          type: "category",
          label: "Connect and integrate",
          link: {
            type: "doc",
            id: "components/concepts/dummy-connect",
          },
          items: ["components/concepts/outbound-connectors-job-workers"],
        },
        {
          type: "doc",
          id: "components/concepts/dummy-production", // document ID
          label: "Prepare for production", // sidebar label
        },
        {
          type: "category",
          label: "Camunda SaaS",
          link: {
            type: "doc",
            id: "components/concepts/dummy-saas",
          },
          items: [
            "components/concepts/clusters",
            "components/concepts/data-retention",
            "components/concepts/encryption-at-rest",
            "components/concepts/backups",
            "components/concepts/resource-deletion",
            "components/concepts/resource-authorizations",
            {
              "Access control": [
                "components/concepts/access-control/user-groups",
                "components/concepts/access-control/user-task-access-restrictions",
              ],
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Features and integrations",
      link: {
        type: "doc",
        id: "components/concepts/dummy-features",
      },
      items: [
        {
          type: "category",
          label: "Agentic orchestration",
          link: {
            type: "doc",
            id: "components/agentic-orchestration/agentic-orchestration",
          },
          items: [
            "components/agentic-orchestration/ao-design",
            "components/agentic-orchestration/ai-agents",
          ],
        },
        {
          type: "category",
          label: "Document handling",
          link: {
            type: "doc",
            id: "components/document-handling/getting-started",
          },
          items: [
            "components/document-handling/use-cases",
            "components/document-handling/upload-document-to-bpmn-process",
            "components/document-handling/display-and-download-document",
            "components/document-handling/send-document-to-external-system-via-connector",
          ],
        },
        {
          type: "category",
          label: "Intelligent document processing (IDP)",
          link: {
            type: "doc",
            id: "components/modeler/web-modeler/idp",
          },
          items: [
            "components/modeler/web-modeler/idp/idp-configuration",
            "components/modeler/web-modeler/idp/idp-applications",
            {
              type: "category",
              label: "Document extraction",
              link: {
                type: "doc",
                id: "components/modeler/web-modeler/idp/idp-document-extraction",
              },
              items: [
                // "components/modeler/web-modeler/idp/idp-structured-extraction",
                "components/modeler/web-modeler/idp/idp-unstructured-extraction",
              ],
            },
            // "components/modeler/web-modeler/idp/idp-document-automation",
            {
              type: "category",
              label: "Integrate IDP into your processes",
              link: {
                type: "doc",
                id: "components/modeler/web-modeler/idp/idp-integrate",
              },
              items: ["components/modeler/web-modeler/idp/idp-example"],
            },
            "components/modeler/web-modeler/idp/idp-key-concepts",
            "components/modeler/web-modeler/idp/idp-reference",
          ],
        },
        {
          type: "category",
          label: "Robotic Process Automation (RPA)",
          link: {
            type: "doc",
            id: "components/rpa/overview",
          },
          items: [
            "components/rpa/getting-started",
            "components/rpa/production",
            {
              type: "link",
              label: "RPA library specifications",
              href: "https://camunda.github.io/rpa-python-libraries/",
            },
          ],
        },
        {
          type: "category",
          label: "Camunda integrations",
          link: {
            type: "doc",
            id: "components/camunda-integrations/overview",
          },
          items: [
            {
              type: "category",
              label: "SAP",
              link: {
                type: "doc",
                id: "components/camunda-integrations/sap/sap-integration",
              },
              items: [
                "components/camunda-integrations/sap/odata-connector",
                "components/camunda-integrations/sap/rfc-connector",
                "components/camunda-integrations/sap/btp-plugin",
                "components/camunda-integrations/sap/csap-cli",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Early access",
          link: {
            type: "doc",
            id: "components/early-access/overview",
          },
          items: [
            {
              type: "category",
              label: "Alpha features",
              link: {
                type: "doc",
                id: "components/early-access/alpha/alpha-features",
              },
              items: [
                {
                  type: "category",
                  label: "BPMN Copilot",
                  link: {
                    type: "doc",
                    id: "components/early-access/alpha/bpmn-copilot/bpmn-copilot",
                  },
                  items: [
                    "components/early-access/alpha/bpmn-copilot/bpmn-copilot",
                  ],
                },
                "components/early-access/alpha/feel-copilot/feel-copilot",
              ],
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Modeler",
      link: {
        type: "doc",
        id: "components/modeler/about-modeler",
      },
      items: [
        {
          "Web Modeler": [
            "components/modeler/web-modeler/launch-web-modeler",
            "components/modeler/web-modeler/model-your-first-diagram",
            "components/modeler/web-modeler/context-pad",
            "components/modeler/web-modeler/git-sync",
            "components/modeler/web-modeler/import-diagram",
            "components/modeler/web-modeler/fix-problems-in-your-diagram",
            "components/modeler/web-modeler/run-or-publish-your-process",
            {
              type: "category",
              label: "Process applications",
              link: {
                type: "doc",
                id: "components/modeler/web-modeler/process-applications",
              },
              items: [
                "components/modeler/web-modeler/process-application-pipeline",
                "components/modeler/web-modeler/create-a-process-application",
                "components/modeler/web-modeler/deploy-process-application",
                "components/modeler/web-modeler/process-application-versioning",
              ],
            },
            {
              Collaboration: [
                "components/modeler/web-modeler/collaboration",
                "components/modeler/web-modeler/collaborate-with-modes",
                "components/modeler/web-modeler/design-your-process",
                "components/modeler/web-modeler/implement-your-process",
                "components/modeler/web-modeler/play-your-process",
              ],
            },
            "components/modeler/web-modeler/camunda-marketplace",
            "components/modeler/web-modeler/versions",
            "components/modeler/web-modeler/token-simulation",
            {
              "Advanced modeling": [
                "components/modeler/web-modeler/advanced-modeling/business-rule-task-linking",
                "components/modeler/web-modeler/advanced-modeling/call-activity-linking",
                "components/modeler/web-modeler/advanced-modeling/form-linking",
                "components/modeler/web-modeler/advanced-modeling/publish-public-processes",
                "components/modeler/web-modeler/advanced-modeling/process-documentation-with-readme-files",
                {
                  "AI features": [
                    "components/modeler/web-modeler/advanced-modeling/refactoring-suggestions",
                    "components/modeler/web-modeler/advanced-modeling/camunda-docs-ai",
                  ],
                },
              ],
            },
            "components/modeler/web-modeler/file-download",
            "components/modeler/web-modeler/web-modeler-settings",
            "components/modeler/web-modeler/process-landscape-visualization",
          ],
        },
        {
          type: "category",
          label: "Desktop Modeler",
          link: {
            type: "doc",
            id: "components/modeler/desktop-modeler/index",
          },
          items: [
            "components/modeler/desktop-modeler/install-the-modeler",
            "components/modeler/desktop-modeler/model-your-first-diagram",
            "components/modeler/desktop-modeler/connect-to-camunda-8",
            "components/modeler/desktop-modeler/start-instance",
            "components/modeler/desktop-modeler/process-applications",
            "components/modeler/desktop-modeler/use-connectors",
            "components/modeler/desktop-modeler/variables",
            {
              type: "category",
              label: "Element templates",
              link: {
                type: "doc",
                id: "components/modeler/desktop-modeler/element-templates/about-templates",
              },
              items: [
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
                "components/modeler/desktop-modeler/custom-lint-rules/custom-lint-rules",
                "components/modeler/desktop-modeler/search-paths/search-paths",
                "components/modeler/desktop-modeler/telemetry/telemetry",
              ],
            },
            "components/modeler/desktop-modeler/settings/settings",
            "components/modeler/desktop-modeler/troubleshooting",
          ],
        },
        require("./docs/components/modeler/forms/sidebar-schema"),
        "components/modeler/data-handling",
        require("./docs/components/modeler/reference/sidebar-schema"),
      ],
    },
    {
      type: "category",
      label: "BPMN, DMN, and FEEL",
      link: {
        type: "doc",
        id: "components/concepts/dummy-bpmnfeeldmn",
      },
      items: [
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
                "components/modeler/bpmn/undefined-tasks/undefined-tasks",
              ],
            },
            {
              Gateways: [
                "components/modeler/bpmn/gateways",
                "components/modeler/bpmn/exclusive-gateways/exclusive-gateways",
                "components/modeler/bpmn/parallel-gateways/parallel-gateways",
                "components/modeler/bpmn/event-based-gateways/event-based-gateways",
                "components/modeler/bpmn/inclusive-gateways/inclusive-gateways",
              ],
            },
            {
              Events: [
                "components/modeler/bpmn/events",
                "components/modeler/bpmn/none-events/none-events",
                "components/modeler/bpmn/message-events/message-events",
                "components/modeler/bpmn/signal-events/signal-events",
                "components/modeler/bpmn/timer-events/timer-events",
                "components/modeler/bpmn/error-events/error-events",
                "components/modeler/bpmn/escalation-events/escalation-events",
                "components/modeler/bpmn/terminate-events/terminate-events",
                "components/modeler/bpmn/link-events/link-events",
                "components/modeler/bpmn/compensation-events/compensation-events",
              ],
            },
            {
              Subprocesses: [
                "components/modeler/bpmn/subprocesses",
                "components/modeler/bpmn/embedded-subprocesses/embedded-subprocesses",
                "components/modeler/bpmn/call-activities/call-activities",
                "components/modeler/bpmn/event-subprocesses/event-subprocesses",
                "components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses",
              ],
            },
            {
              Markers: [
                "components/modeler/bpmn/markers",
                "components/modeler/bpmn/multi-instance/multi-instance",
                "components/modeler/bpmn/compensation-handler/compensation-handler",
              ],
            },
          ],
        },
        require("./docs/components/modeler/dmn/sidebar-schema"),
        require("./docs/components/modeler/feel/sidebar-schema"),
      ],
    },
    {
      type: "category",
      label: "Orchestration cluster",
      link: {
        type: "doc",
        id: "components/orchestration-cluster",
      },
      items: [
        {
          type: "category",
          label: "Zeebe",
          link: {
            type: "doc",
            id: "components/zeebe/zeebe-overview",
          },
          items: [
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
          type: "category",
          label: "Operate",
          link: {
            type: "doc",
            id: "components/operate/operate-introduction",
          },
          items: [
            "components/operate/userguide/basic-operate-navigation",
            "components/operate/userguide/resolve-incidents-update-variables",
            "components/operate/userguide/selections-operations",
            "components/operate/userguide/delete-finished-instances",
            "components/operate/userguide/delete-resources",
            {
              "Process instance modification": [
                "components/operate/userguide/process-instance-modification",
                "components/operate/userguide/process-instance-batch-modification",
              ],
            },
            "components/operate/userguide/process-instance-migration",
            "components/operate/userguide/monitor-operation-status",
          ],
        },
        {
          type: "category",
          label: "Tasklist",
          link: {
            type: "doc",
            id: "components/tasklist/introduction-to-tasklist",
          },
          items: [
            "components/tasklist/userguide/using-tasklist",
            "components/tasklist/userguide/managing-tasks",
            "components/tasklist/userguide/using-filters",
            "components/tasklist/userguide/defining-task-priorities",
            "components/tasklist/userguide/starting-processes",
            "components/tasklist/userguide/tasklist-localization",
          ],
        },
        {
          type: "category",
          label: "Identity",
          link: {
            type: "doc",
            id: "components/identity/identity-introduction",
          },
          items: [
            "components/identity/authorization",
            "components/identity/user",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Connectors",
      link: {
        type: "doc",
        id: "components/connectors/introduction-to-connectors",
      },
      items: [
        {
          type: "category",
          label: "How to use connectors",
          link: {
            type: "doc",
            id: "components/connectors/use-connectors/index",
          },
          items: [
            "components/connectors/connector-types",
            "components/connectors/use-connectors/inbound",
            "components/connectors/use-connectors/outbound",
            "components/connectors/use-connectors/intrinsic-functions",
          ],
        },
        {
          type: "category",
          label: "Camunda connectors",
          link: {
            type: "doc",
            id: "components/connectors/out-of-the-box-connectors/available-connectors-overview",
          },
          items: [
            {
              "Agentic AI": [
                {
                  type: "category",
                  label: "AI Agent",
                  link: {
                    type: "doc",
                    id: "components/connectors/out-of-the-box-connectors/agentic-ai-aiagent",
                  },
                  items: [
                    "components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-example",
                  ],
                },
                "components/connectors/out-of-the-box-connectors/agentic-ai-ad-hoc-tools-schema-resolver",
              ],
            },
            {
              "Amazon AWS": [
                "components/connectors/out-of-the-box-connectors/amazon-bedrock",
                "components/connectors/out-of-the-box-connectors/amazon-comprehend",
                "components/connectors/out-of-the-box-connectors/amazon-dynamodb",
                "components/connectors/out-of-the-box-connectors/amazon-eventbridge",
                "components/connectors/out-of-the-box-connectors/aws-lambda",
                "components/connectors/out-of-the-box-connectors/amazon-sagemaker",
                "components/connectors/out-of-the-box-connectors/amazon-sns",
                "components/connectors/out-of-the-box-connectors/amazon-sqs",
                "components/connectors/out-of-the-box-connectors/amazon-s3",
                "components/connectors/out-of-the-box-connectors/amazon-textract",
              ],
            },
            "components/connectors/out-of-the-box-connectors/asana",
            "components/connectors/out-of-the-box-connectors/automation-anywhere",
            "components/connectors/out-of-the-box-connectors/blueprism",
            "components/connectors/out-of-the-box-connectors/box",
            "components/connectors/out-of-the-box-connectors/easy-post",
            "components/connectors/out-of-the-box-connectors/email",
            "components/connectors/out-of-the-box-connectors/github",
            "components/connectors/out-of-the-box-connectors/gitlab",
            {
              Google: [
                "components/connectors/out-of-the-box-connectors/googledrive",
                "components/connectors/out-of-the-box-connectors/google-maps-platform",
                "components/connectors/out-of-the-box-connectors/google-sheets",
                "components/connectors/out-of-the-box-connectors/google-gemini",
              ],
            },
            "components/connectors/protocol/graphql",
            "components/connectors/protocol/http-webhook",
            "components/connectors/out-of-the-box-connectors/hubspot",
            "components/connectors/out-of-the-box-connectors/hugging-face",
            "components/connectors/out-of-the-box-connectors/kafka",
            {
              Microsoft: [
                "components/connectors/out-of-the-box-connectors/azure-open-ai",
                "components/connectors/out-of-the-box-connectors/azure-blob-storage",
                "components/connectors/out-of-the-box-connectors/microsoft-teams",
                "components/connectors/out-of-the-box-connectors/microsoft-o365-mail",
              ],
            },
            "components/connectors/out-of-the-box-connectors/openai",
            "components/connectors/out-of-the-box-connectors/operate",
            "components/connectors/protocol/polling",
            "components/connectors/out-of-the-box-connectors/rabbitmq",
            "components/connectors/protocol/rest",
            "components/connectors/out-of-the-box-connectors/salesforce",
            "components/connectors/out-of-the-box-connectors/sendgrid",
            "components/connectors/out-of-the-box-connectors/slack",
            "components/connectors/protocol/soap",
            "components/connectors/out-of-the-box-connectors/sql",
            "components/connectors/out-of-the-box-connectors/twilio",
            "components/connectors/out-of-the-box-connectors/uipath",
            "components/connectors/out-of-the-box-connectors/embeddings-vector-db",
            "components/connectors/out-of-the-box-connectors/whatsapp",
          ],
        },
        {
          type: "category",
          label: "Custom connectors",
          link: {
            type: "doc",
            id: "components/connectors/custom-built-connectors/build-connector",
          },
          items: [
            {
              type: "category",
              label: "Connector templates",
              link: {
                type: "doc",
                id: "components/connectors/custom-built-connectors/connector-templates",
              },
              items: [
                "components/connectors/custom-built-connectors/connector-template-generator",
                "components/connectors/manage-connector-templates",
                "components/connectors/custom-built-connectors/create-connector-from-rest",
              ],
            },
            "components/connectors/custom-built-connectors/connector-sdk",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Optimize",
      link: {
        type: "doc",
        id: "components/optimize/what-is-optimize",
      },
      items: [
        "components/optimize/userguide/collections-dashboards-reports",
        "components/optimize/userguide/user-permissions",
        "components/optimize/userguide/data-sources",
        {
          Dashboards: [
            "components/optimize/userguide/creating-dashboards",
            "components/optimize/userguide/edit-mode",
            "components/optimize/userguide/view-mode",
          ],
        },
        {
          "Dashboards maintained by Camunda": [
            "components/optimize/userguide/process-dashboards",
            "components/optimize/userguide/instant-process-dashboards",
          ],
        },
        "components/optimize/userguide/creating-reports",
        "components/optimize/userguide/process-KPIs",

        {
          "Process analysis": [
            "components/optimize/userguide/process-analysis/process-analysis-overview",
            "components/optimize/userguide/process-analysis/task-analysis",
            "components/optimize/userguide/process-analysis/branch-analysis",
            "components/optimize/userguide/process-analysis/user-task-analytics",
            {
              "Report analysis": [
                "components/optimize/userguide/process-analysis/report-analysis/overview",
                {
                  "Edit mode": [
                    "components/optimize/userguide/process-analysis/report-analysis/edit-mode",
                    "components/optimize/userguide/process-analysis/report-analysis/select-process-definitions",
                    "components/optimize/userguide/process-analysis/report-analysis/define-reports",
                    "components/optimize/userguide/process-analysis/report-analysis/measures",
                    "components/optimize/userguide/process-analysis/report-analysis/compare-target-values",
                    "components/optimize/userguide/process-analysis/report-analysis/process-instance-parts",
                    "components/optimize/userguide/process-analysis/report-analysis/configure-reports",
                  ],
                },

                "components/optimize/userguide/process-analysis/report-analysis/view-mode",
              ],
            },

            {
              Filters: [
                "components/optimize/userguide/process-analysis/filters",
                "components/optimize/userguide/process-analysis/metadata-filters",
                "components/optimize/userguide/process-analysis/instance-state-filters",
                "components/optimize/userguide/process-analysis/flow-node-filters",
                "components/optimize/userguide/process-analysis/process-instance-filters",
                "components/optimize/userguide/process-analysis/variable-filters",
              ],
            },
          ],
        },

        {
          "Additional features": [
            "components/optimize/userguide/additional-features/alerts",
            "components/optimize/userguide/additional-features/export-import",
            "components/optimize/userguide/additional-features/variable-labeling",
            "components/optimize/userguide/additional-features/process-variants-comparison",
            "components/optimize/userguide/additional-features/ml-dataset",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Console",
      link: {
        type: "doc",
        id: "components/console/introduction-to-console",
      },
      items: [
        {
          "Manage your organization": [
            "components/console/manage-organization/organization-settings",
            "components/console/manage-organization/manage-users",
            "components/console/manage-organization/view-organization-activity",
            "components/console/manage-organization/enable-alpha-features",
            "components/console/manage-organization/usage-history",
            "components/console/manage-organization/usage-alerts",
            "components/console/manage-organization/advanced-search",
            "components/console/manage-organization/switch-organization",
            "components/console/manage-organization/external-sso",
            "components/console/manage-organization/delete-account",
          ],
        },
        {
          "Manage clusters": [
            "components/console/manage-clusters/create-cluster",
            "components/console/manage-clusters/manage-cluster",
            "components/console/manage-clusters/cluster-connectors",
            "components/console/manage-clusters/manage-api-clients",
            "components/console/manage-clusters/manage-secrets",
            "components/console/manage-clusters/manage-alerts",
            "components/console/manage-clusters/manage-ip-allowlists",
            "components/console/manage-clusters/create-backups",
            "components/console/manage-clusters/settings",
            "components/console/manage-clusters/cluster-capacity",
          ],
        },
        {
          "Manage your plan": [
            "components/console/manage-plan/available-plans",
            "components/console/manage-plan/upgrade-to-enterprise-plan",
            "components/console/manage-plan/update-billing-reservations",
            "components/console/manage-plan/update-creditcard",
            "components/console/manage-plan/retrieve-invoices-or-update-billing-info",
            "components/console/manage-plan/cancel-starter-subscription",
          ],
        },
        {
          Troubleshooting: [
            "components/console/console-troubleshooting/common-pitfalls",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Best Practices",
      link: {
        type: "doc",
        id: "components/best-practices/best-practices-overview",
      },
      items: [
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
            "components/best-practices/modeling/choosing-the-resource-binding-type",
          ],
          Operations: [
            "components/best-practices/operations/versioning-process-definitions",
            "components/best-practices/operations/reporting-about-processes",
          ],
        },
      ],
    },
  ],
  "APIs & Tools": [
    "apis-tools/working-with-apis-tools",
    {
      APIs: [
        require("./docs/apis-tools/camunda-api-rest/sidebar-schema"),
        require("./docs/apis-tools/administration-api/sidebar-schema"),
        require("./docs/apis-tools/administration-sm-api/sidebar-schema"),
        {
          "Optimize API": [
            "apis-tools/optimize-api/overview",
            "apis-tools/optimize-api/optimize-api-authentication",
            "apis-tools/optimize-api/optimize-api-tutorial",
            {
              Configuration: [
                "apis-tools/optimize-api/configuration/enable-sharing",
                "apis-tools/optimize-api/configuration/disable-sharing",
              ],
            },

            {
              Dashboard: [
                "apis-tools/optimize-api/dashboard/get-dashboard-ids",
                "apis-tools/optimize-api/dashboard/delete-dashboard",
                "apis-tools/optimize-api/dashboard/export-dashboard-definitions",
              ],
            },

            {
              Report: [
                "apis-tools/optimize-api/report/get-report-ids",
                "apis-tools/optimize-api/report/delete-report",
                "apis-tools/optimize-api/report/export-report-definitions",
                "apis-tools/optimize-api/report/get-data-export",
              ],
            },
            "apis-tools/optimize-api/external-variable-ingestion",
            "apis-tools/optimize-api/health-readiness",
            "apis-tools/optimize-api/import-entities",
            "apis-tools/optimize-api/variable-labeling",
          ],
        },
        require("./docs/apis-tools/web-modeler-api/sidebar-schema"),
        require("./docs/apis-tools/zeebe-api/sidebar-schema"),
        {
          Deprecated: [
            require("./docs/apis-tools/operate-api/sidebar-schema"),
            require("./docs/apis-tools/tasklist-api-rest/sidebar-schema"),
            {
              "Zeebe API (REST)": [
                "apis-tools/zeebe-api-rest/zeebe-api-rest-overview",
                "apis-tools/zeebe-api-rest/zeebe-api-rest-authentication",
                "apis-tools/zeebe-api-rest/zeebe-api-tutorial",
                {
                  Specifications: [
                    {
                      type: "doc",
                      id: "apis-tools/zeebe-api-rest/specifications/zeebe-rest-api",
                    },
                    {
                      type: "category",
                      label: "Cluster",
                      items: [
                        {
                          type: "doc",
                          id: "apis-tools/zeebe-api-rest/specifications/get-cluster-topology",
                          label: "Get cluster topology",
                          className: "api-method get",
                        },
                      ],
                    },
                    {
                      type: "category",
                      label: "User task",
                      items: [
                        {
                          type: "doc",
                          id: "apis-tools/zeebe-api-rest/specifications/complete-a-user-task",
                          label: "Complete a user task",
                          className: "api-method post",
                        },
                        {
                          type: "doc",
                          id: "apis-tools/zeebe-api-rest/specifications/assign-a-user-task",
                          label: "Assign a user task",
                          className: "api-method post",
                        },
                        {
                          type: "doc",
                          id: "apis-tools/zeebe-api-rest/specifications/update-a-user-task",
                          label: "Update a user task",
                          className: "api-method patch",
                        },
                        {
                          type: "doc",
                          id: "apis-tools/zeebe-api-rest/specifications/unassign-a-user-task",
                          label: "Unassign a user task",
                          className: "api-method delete",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      "Clients & SDKs": [
        {
          SDKs: [
            "apis-tools/node-js-sdk",
            {
              "Camunda Spring Boot": [
                "apis-tools/spring-zeebe-sdk/getting-started",
                "apis-tools/spring-zeebe-sdk/configuration",
              ],
            },
          ],
        },
        {
          Clients: [
            {
              "Java client": [
                "apis-tools/java-client/index",
                "apis-tools/java-client/authentication",
                "apis-tools/java-client/job-worker",
                "apis-tools/java-client/logging",
                "apis-tools/java-client/zeebe-process-test",
                {
                  Examples: [
                    "apis-tools/java-client-examples/index",
                    "apis-tools/java-client-examples/process-deploy",
                    "apis-tools/java-client-examples/process-instance-create",
                    "apis-tools/java-client-examples/process-instance-create-nonblocking",
                    "apis-tools/java-client-examples/process-instance-create-with-result",
                    "apis-tools/java-client-examples/decision-evaluate",
                    "apis-tools/java-client-examples/job-worker-open",
                    "apis-tools/java-client-examples/data-pojo",
                    "apis-tools/java-client-examples/cluster-topology-request",
                  ],
                },
              ],
            },
            {
              "Community clients": [
                "apis-tools/community-clients/index",
                "apis-tools/build-your-own-client",
              ],
            },
          ],
        },
      ],
    },
    require("./docs/apis-tools/frontend-development/sidebar-schema"),
    {
      Testing: [
        {
          "Camunda Process Test": [
            "apis-tools/testing/getting-started",
            "apis-tools/testing/assertions",
            "apis-tools/testing/utilities",
            "apis-tools/testing/connectors",
          ],
        },
      ],
    },
    {
      "Migration manuals": [
        "apis-tools/migration-manuals/migrate-to-camunda-user-tasks",
        "apis-tools/migration-manuals/migrate-to-camunda-api",
      ],
    },
  ],
  Reference: [
    "reference/overview",
    {
      type: "category",
      label: "Announcements and release notes",
      link: {
        type: "doc",
        id: "reference/announcements-release-notes/overview",
      },
      items: [
        {
          type: "category",
          label: "8.8",
          link: {
            type: "doc",
            id: "reference/announcements-release-notes/880/880-announcements",
          },
          items: [
            "reference/announcements-release-notes/880/880-announcements",
            "reference/announcements-release-notes/880/880-release-notes",
          ],
        },
        {
          type: "category",
          label: "8.7",
          link: {
            type: "doc",
            id: "reference/announcements-release-notes/870/870-announcements",
          },
          items: [
            "reference/announcements-release-notes/870/870-announcements",
            "reference/announcements-release-notes/870/870-release-notes",
          ],
        },
        {
          type: "category",
          label: "8.6",
          link: {
            type: "doc",
            id: "reference/announcements-release-notes/860/860-announcements",
          },
          items: [
            "reference/announcements-release-notes/860/860-announcements",
            "reference/announcements-release-notes/860/860-release-notes",
          ],
        },
        {
          type: "category",
          label: "8.5",
          link: {
            type: "doc",
            id: "reference/announcements-release-notes/850/850-announcements",
          },
          items: [
            "reference/announcements-release-notes/850/850-announcements",
            "reference/announcements-release-notes/850/850-release-notes",
          ],
        },
        "reference/announcements-release-notes/release-policy",
      ],
    },
    "reference/supported-environments",
    "reference/contact",
    "reference/dependencies",
    "reference/camunda-help-center",
    "reference/auto-updates",
    "reference/status",
    "reference/licenses",
    "reference/notices",
    "reference/regions",
    {
      type: "category",
      label: "Data collection",
      link: {
        type: "doc",
        id: "reference/data-collection/data-collection",
      },
      items: ["reference/data-collection/usage-metrics"],
    },
    "reference/glossary",
  ],
  "Self-Managed": [
    "self-managed/about-self-managed",
    {
      type: "category",
      label: "Run locally",
      link: {
        type: "doc",
        id: "self-managed/run-locally/index",
      },
      items: [
        "self-managed/setup/deploy/local/c8run",
        "self-managed/setup/deploy/local/docker-compose",
        "self-managed/setup/deploy/local/local-kubernetes-cluster",
      ],
    },
    {
      type: "category",
      label: "Production installation",
      link: {
        type: "doc",
        id: "self-managed/setup/overview",
      },
      items: [
        {
          type: "doc",
          label: "Helm",
          id: "self-managed/setup/install",
        },
        "self-managed/setup/deploy/other/docker",
        "self-managed/setup/deploy/local/manual",
      ],
    },
    {
      type: "category",
      label: "Reference architecture",
      link: {
        type: "doc",
        id: "self-managed/reference-architecture/reference-architecture",
      },
      items: [
        {
          type: "category",
          label: "Kubernetes",
          link: {
            type: "doc",
            id: "self-managed/reference-architecture/kubernetes",
          },
          items: [
            {
              "Amazon EKS": [
                "self-managed/setup/deploy/amazon/amazon-eks/eks-terraform",
                "self-managed/setup/deploy/amazon/amazon-eks/eks-helm",
                "self-managed/setup/deploy/amazon/amazon-eks/dual-region",
              ],
            },
            {
              "Microsoft AKS": [
                "self-managed/setup/deploy/azure/microsoft-aks/aks-terraform",
                "self-managed/setup/deploy/azure/microsoft-aks/aks-helm",
              ],
            },
            {
              Openshift: [
                "self-managed/setup/deploy/amazon/openshift/terraform-setup",
                "self-managed/setup/deploy/openshift/redhat-openshift",
                "self-managed/setup/deploy/amazon/openshift/terraform-setup-dual-region",
                "self-managed/setup/deploy/openshift/redhat-openshift-dual-region",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Manual JAR",
          link: {
            type: "doc",
            id: "self-managed/reference-architecture/manual",
          },
          items: ["self-managed/setup/deploy/amazon/aws-ec2"],
        },
        {
          "Amazon (AWS)": [
            {
              type: "category",
              label: "Amazon EKS",
              link: {
                type: "doc",
                id: "self-managed/setup/deploy/amazon/amazon-eks/amazon-eks",
              },
              items: [
                "self-managed/setup/deploy/amazon/amazon-eks/eks-eksctl",
                "self-managed/setup/deploy/amazon/amazon-eks/eks-terraform",
                "self-managed/setup/deploy/amazon/amazon-eks/eks-helm",
                "self-managed/setup/deploy/amazon/amazon-eks/dual-region",
                "self-managed/setup/deploy/amazon/amazon-eks/irsa",
              ],
            },
            {
              type: "category",
              label: "ROSA",
              link: {
                type: "doc",
                id: "self-managed/setup/deploy/amazon/openshift/terraform-setup",
              },
              items: [
                "self-managed/setup/deploy/amazon/openshift/terraform-setup",
                "self-managed/setup/deploy/amazon/openshift/terraform-setup-dual-region",
              ],
            },
            {
              type: "category",
              label: "Amazon Marketplace",
              link: {
                type: "doc",
                id: "self-managed/setup/deploy/amazon/aws-marketplace",
              },
              items: [],
            },
            "self-managed/setup/deploy/amazon/aws-ec2",
          ],
          "Microsoft (Azure)": [
            {
              type: "category",
              label: "Microsoft AKS",
              link: {
                type: "doc",
                id: "self-managed/setup/deploy/azure/microsoft-aks/microsoft-aks",
              },
              items: [
                "self-managed/setup/deploy/azure/microsoft-aks/aks-terraform",
                "self-managed/setup/deploy/azure/microsoft-aks/aks-helm",
              ],
            },
          ],
          "Google (GCP)": ["self-managed/setup/deploy/gcp/google-gke"],
          "Red Hat (OpenShift)": [
            "self-managed/setup/deploy/openshift/redhat-openshift",
            "self-managed/setup/deploy/openshift/redhat-openshift-dual-region",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Update",
      link: {
        type: "doc",
        id: "self-managed/update/index",
      },
      items: [
        "self-managed/setup/upgrade",
        {
          type: "category",
          label: "Update by version",
          link: {
            type: "doc",
            id: "self-managed/operational-guides/update-guide/introduction",
          },
          items: [
            "self-managed/operational-guides/update-guide/870-to-880",
            "self-managed/operational-guides/update-guide/860-to-870",
            "self-managed/operational-guides/update-guide/850-to-860",
            "self-managed/operational-guides/update-guide/840-to-850",
            "self-managed/operational-guides/update-guide/830-to-840",
            {
              Elasticsearch: [
                "self-managed/operational-guides/update-guide/elasticsearch/7-to-8",
              ],
            },
            {
              Keycloak: [
                "self-managed/operational-guides/update-guide/keycloak/keycloak-update",
              ],
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Configure",
      link: {
        type: "doc",
        id: "self-managed/setup/guides/guides",
      },
      items: [
        "self-managed/setup/guides/accessing-components-without-ingress",
        "self-managed/setup/guides/ingress-setup",
        "self-managed/setup/guides/using-existing-elasticsearch",
        "self-managed/setup/guides/using-existing-opensearch",
        "self-managed/setup/guides/configure-db-custom-headers",
        "self-managed/setup/guides/air-gapped-installation",
        "self-managed/setup/guides/running-custom-connectors",
        "self-managed/setup/guides/multi-namespace-deployment",
        "self-managed/setup/guides/installing-payment-app-example",
        "self-managed/setup/guides/add-extra-manifests",
        "self-managed/setup/guides/prefix-elasticsearch-indices",
        "self-managed/setup/guides/secret-management",
      ],
    },
    {
      "Operational guides": [
        "self-managed/operational-guides/configure-multi-tenancy",
        {
          type: "category",
          label: "Backup and restore",
          link: {
            type: "doc",
            id: "self-managed/operational-guides/backup-restore/backup-and-restore",
          },
          items: [
            "self-managed/operational-guides/backup-restore/optimize-backup",
            "self-managed/operational-guides/backup-restore/webapps-backup",
            "self-managed/operational-guides/backup-restore/zeebe-backup-and-restore",
            "self-managed/operational-guides/backup-restore/modeler-backup-and-restore",
          ],
        },
        "self-managed/operational-guides/data-purge",
        {
          type: "doc",
          label: "Configure components",
          id: "self-managed/operational-guides/application-configs",
        },
        {
          type: "doc",
          label: "Configure flow control",
          id: "self-managed/operational-guides/configure-flow-control/configure-flow-control",
        },
        {
          "Multi-region": [
            "self-managed/operational-guides/multi-region/dual-region-operational-procedure",
          ],
        },
        {
          Monitoring: [
            "self-managed/operational-guides/monitoring/log-levels",
            "self-managed/operational-guides/monitoring/metrics",
          ],
        },
        {
          Troubleshooting: [
            "self-managed/operational-guides/troubleshooting/troubleshooting",
            "self-managed/operational-guides/troubleshooting/diagnostics",
          ],
        },
      ],
    },
    {
      Concepts: [
        {
          type: "category",
          label: "Document handling",
          link: {
            type: "doc",
            id: "self-managed/concepts/document-handling/getting-started",
          },
          items: [
            {
              type: "category",
              label: "Configuration",
              link: {
                type: "doc",
                id: "self-managed/concepts/document-handling/configuration/overview",
              },
              items: [
                "self-managed/concepts/document-handling/configuration/camunda-8-run",
                "self-managed/concepts/document-handling/configuration/docker",
                "self-managed/concepts/document-handling/configuration/helm",
              ],
            },
          ],
        },
        "self-managed/concepts/exporters",
        {
          "Multi-region": ["self-managed/concepts/multi-region/dual-region"],
        },
        "self-managed/concepts/multi-tenancy",
        "self-managed/concepts/mapping-rules",
        "self-managed/concepts/elasticsearch-privileges",
        "self-managed/concepts/opensearch-privileges",
      ],
    },
    {
      Components: [
        {
          Modeler: [
            {
              "Web Modeler": [
                "self-managed/modeler/web-modeler/installation",
                {
                  Configuration: [
                    "self-managed/modeler/web-modeler/configuration/configuration",
                    "self-managed/modeler/web-modeler/configuration/database",
                    "self-managed/modeler/web-modeler/configuration/identity",
                    "self-managed/modeler/web-modeler/configuration/logging",
                    "self-managed/modeler/web-modeler/configuration/ssl",
                  ],
                  Troubleshooting: [
                    "self-managed/modeler/web-modeler/troubleshooting/troubleshoot-database-connection",
                    "self-managed/modeler/web-modeler/troubleshooting/troubleshoot-zeebe-connection",
                    "self-managed/modeler/web-modeler/troubleshooting/troubleshoot-missing-data",
                    "self-managed/modeler/web-modeler/troubleshooting/troubleshoot-proxy-configuration",
                    "self-managed/modeler/web-modeler/troubleshooting/troubleshoot-other-problems",
                  ],
                },
              ],
            },
            {
              "Desktop Modeler": [
                "self-managed/modeler/desktop-modeler/deploy-to-self-managed",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Orchestration cluster",
          link: {
            type: "doc",
            id: "self-managed/orchestration-cluster/sm-orchestration-cluster",
          },
          items: [
            {
              Zeebe: [
                "self-managed/zeebe-deployment/zeebe-installation",
                {
                  "Zeebe Gateway": [
                    "self-managed/zeebe-deployment/zeebe-gateway/overview",
                    "self-managed/zeebe-deployment/zeebe-gateway/interceptors",
                    "self-managed/zeebe-deployment/zeebe-gateway/filters",
                    "self-managed/zeebe-deployment/zeebe-gateway/job-streaming",
                  ],
                },
                {
                  Configuration: [
                    "self-managed/zeebe-deployment/configuration/configuration",
                    "self-managed/zeebe-deployment/configuration/logging",
                    "self-managed/zeebe-deployment/configuration/gateway-health-probes",
                    "self-managed/zeebe-deployment/configuration/environment-variables",
                    "self-managed/zeebe-deployment/configuration/fixed-partitioning",
                    "self-managed/zeebe-deployment/configuration/priority-election",
                    "self-managed/zeebe-deployment/configuration/broker-config",
                    "self-managed/zeebe-deployment/configuration/gateway-config",
                  ],
                },
                {
                  Security: [
                    "self-managed/zeebe-deployment/security/security",
                    "self-managed/zeebe-deployment/security/client-authorization",
                    "self-managed/zeebe-deployment/security/secure-client-communication",
                    "self-managed/zeebe-deployment/security/secure-cluster-communication",
                  ],
                },
                {
                  Operation: [
                    "self-managed/zeebe-deployment/operations/zeebe-in-production",
                    "self-managed/zeebe-deployment/operations/resource-planning",
                    "self-managed/zeebe-deployment/operations/network-ports",
                    "self-managed/zeebe-deployment/operations/setting-up-a-cluster",
                    "self-managed/zeebe-deployment/operations/health",
                    "self-managed/zeebe-deployment/operations/backpressure",
                    "self-managed/zeebe-deployment/operations/disk-space",
                    "self-managed/zeebe-deployment/operations/update-zeebe",
                    "self-managed/zeebe-deployment/operations/rebalancing",
                    "self-managed/zeebe-deployment/operations/management-api",
                    "self-managed/zeebe-deployment/operations/backups",
                    "self-managed/zeebe-deployment/operations/cluster-scaling",
                  ],
                },
                {
                  type: "category",
                  label: "Exporters",
                  link: {
                    type: "doc",
                    id: "self-managed/zeebe-deployment/exporters/exporters",
                  },
                  items: [
                    "self-managed/zeebe-deployment/exporters/install-zeebe-exporters",
                    "self-managed/zeebe-deployment/exporters/camunda-exporter",
                    "self-managed/zeebe-deployment/exporters/elasticsearch-exporter",
                    "self-managed/zeebe-deployment/exporters/opensearch-exporter",
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
                "self-managed/tasklist-deployment/tasklist-custom-styling",
                "self-managed/tasklist-deployment/data-retention",
                "self-managed/tasklist-deployment/importer-and-archiver",
                "self-managed/tasklist-deployment/tasklist-authentication",
                "self-managed/tasklist-deployment/usage-metrics",
                "self-managed/tasklist-deployment/user-task-access-restrictions",
              ],
            },
            {
              type: "category",
              label: "Identity",
              link: {
                type: "doc",
                id: "self-managed/orchestration-identity/orchestration-identity",
              },
              items: [
                "self-managed/orchestration-identity/installation",
                "self-managed/orchestration-identity/configuration",
                {
                  "Mapping rules": [
                    "self-managed/orchestration-identity/mapping-rules/managing-mapping-rules",
                    "self-managed/orchestration-identity/mapping-rules/mapping-rule-authorizations",
                    "self-managed/orchestration-identity/mapping-rules/assign-mappings-to-tenants",
                  ],
                },
              ],
            },
          ],
        },
        {
          Connectors: [
            "self-managed/connectors-deployment/install-and-start",
            "self-managed/connectors-deployment/connectors-configuration",
          ],
          Optimize: [
            "self-managed/optimize-deployment/install-and-start",
            {
              Configuration: [
                "self-managed/optimize-deployment/configuration/getting-started",
                {
                  "System configuration": [
                    "self-managed/optimize-deployment/configuration/system-configuration",
                    "self-managed/optimize-deployment/configuration/system-configuration-platform-8",
                  ],
                },
                "self-managed/optimize-deployment/configuration/logging",
                "self-managed/optimize-deployment/configuration/security-instructions",
                "self-managed/optimize-deployment/configuration/shared-elasticsearch-cluster",
                "self-managed/optimize-deployment/configuration/history-cleanup",
                "self-managed/optimize-deployment/configuration/localization",
                "self-managed/optimize-deployment/configuration/object-variables",
                "self-managed/optimize-deployment/configuration/multi-tenancy",
              ],
            },
            {
              "Migration & update": [
                "self-managed/optimize-deployment/migration-update/camunda-8/instructions",
                "self-managed/optimize-deployment/migration-update/camunda-8/8.6-to-8.7",
                "self-managed/optimize-deployment/migration-update/camunda-8/3.13_8.5-to-8.6",
                "self-managed/optimize-deployment/migration-update/camunda-8/3.12_8.4-to-3.13_8.5",
                "self-managed/optimize-deployment/migration-update/camunda-8/3.11_8.3-to-3.12_8.4",
                "self-managed/optimize-deployment/migration-update/camunda-8/3.10-to-3.11_8.3",
                "self-managed/optimize-deployment/migration-update/camunda-8/3.9-to-3.10",
                "self-managed/optimize-deployment/migration-update/camunda-8/3.9-preview-1-to-3.9",
                "self-managed/optimize-deployment/migration-update/camunda-8/3.8-to-3.9-preview-1",
                "self-managed/optimize-deployment/migration-update/camunda-8/3.7-to-3.8",
              ],
            },
          ],
          Console: [
            "self-managed/console-deployment/overview",
            "self-managed/console-deployment/installation",
            {
              Configuration: [
                "self-managed/console-deployment/configuration/configuration",
                "self-managed/console-deployment/configuration/ssl",
              ],
            },
            "self-managed/console-deployment/usage-metrics",
            "self-managed/console-deployment/telemetry",
          ],
        },
        {
          type: "category",
          label: "Management Identity",
          link: {
            type: "doc",
            id: "self-managed/identity/what-is-identity",
          },
          items: [
            "self-managed/identity/identity-first-steps",
            {
              type: "category",
              label: "Configuration",
              link: {
                type: "doc",
                id: "self-managed/identity/configuration/identity-configuration-overview",
              },
              items: [
                "self-managed/identity/configuration/configure-external-identity-provider",
                "self-managed/identity/configuration/connect-to-an-existing-keycloak",
                "self-managed/identity/configuration/connect-to-an-oidc-provider",
                "self-managed/identity/configuration/alternative-db",
              ],
            },
            "self-managed/identity/authentication",
            {
              type: "category",
              label: "Manage Identity",
              items: [
                {
                  type: "category",
                  label: "Users, groups, roles, and applications",
                  link: {
                    type: "doc",
                    id: "self-managed/identity/application-user-group-role-management/identity-application-user-group-role-management-overview",
                  },
                  items: [
                    "self-managed/identity/application-user-group-role-management/manage-groups",
                    "self-managed/identity/application-user-group-role-management/manage-roles",
                    "self-managed/identity/application-user-group-role-management/applications",
                  ],
                },
                {
                  type: "category",
                  label: "Access and permissions",
                  link: {
                    type: "doc",
                    id: "self-managed/identity/access-management/access-management-overview",
                  },
                  items: [
                    "self-managed/identity/access-management/manage-permissions",
                    "self-managed/identity/access-management/resource-authorizations",
                  ],
                },
                "self-managed/identity/managing-tenants",
                "self-managed/identity/mapping-rules",
              ],
            },
            {
              Reference: [
                "self-managed/identity/miscellaneous/application-monitoring",
                "self-managed/identity/miscellaneous/configuration-variables",
                "self-managed/identity/miscellaneous/configure-logging",
                "self-managed/identity/miscellaneous/making-identity-production-ready",
                "self-managed/identity/miscellaneous/resource-management",
                "self-managed/identity/miscellaneous/starting-configuration",
                "self-managed/identity/miscellaneous/troubleshoot-identity",
              ],
            },
          ],
        },
      ],
    },
  ],
};
