module.exports = {
  Guides: [
    {
      type: "category",
      label: "Get started",
      link: {
        type: "doc",
        id: "guides/introduction-to-camunda",
      },
      items: [
        "guides/getting-started-example",
        "guides/getting-started-agentic-orchestration",
        "guides/orchestrate-human-tasks",
        "guides/orchestrate-apis",
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

        {
          type: "category",
          label: "Data Migrator",
          link: {
            type: "doc",
            id: "guides/migrating-from-camunda-7/data-migrator/index",
          },
          items: [
            "guides/migrating-from-camunda-7/data-migrator/version-compatibility",
            "guides/migrating-from-camunda-7/data-migrator/install",
            "guides/migrating-from-camunda-7/data-migrator/runtime",
            "guides/migrating-from-camunda-7/data-migrator/history",
            "guides/migrating-from-camunda-7/data-migrator/variables",
            "guides/migrating-from-camunda-7/data-migrator/limitations",
            {
              type: "category",
              label: "Configuration & reference",
              items: [
                "guides/migrating-from-camunda-7/data-migrator/database",
                "guides/migrating-from-camunda-7/data-migrator/config-examples",
                "guides/migrating-from-camunda-7/data-migrator/config-properties",
              ],
            },
            "guides/migrating-from-camunda-7/data-migrator/troubleshooting",
          ],
        },
        "guides/migrating-from-camunda-7/code-conversion",
        "guides/migrating-from-camunda-7/migration-readiness",
      ],
    },
  ],
  Components: [
    "components/components-overview",
    {
      type: "category",
      label: "Introduction to Camunda 8",
      link: {
        type: "doc",
        id: "components/concepts/concepts-overview",
      },
      items: [
        {
          type: "category",
          label: "Processes",
          link: {
            type: "doc",
            id: "components/concepts/processes",
          },
          items: [
            "components/concepts/process-instance-creation",
            "components/concepts/process-instance-modification",
            "components/concepts/process-instance-migration",
            "components/concepts/incidents",
          ],
        },
        "components/concepts/process-applications",
        "components/concepts/workflow-patterns",
        {
          type: "category",
          label: "Identity and access management",
          link: {
            type: "doc",
            id: "components/concepts/access-control/access-control-overview",
          },
          items: [
            "components/concepts/access-control/authorizations",
            "components/concepts/access-control/connect-to-identity-provider",
            "components/concepts/access-control/mapping-rules",
          ],
        },
        "components/concepts/job-workers",
        "components/concepts/outbound-connectors-job-workers",
        "components/concepts/element-templates",
        {
          Listeners: [
            "components/concepts/execution-listeners",
            {
              type: "category",
              label: "User task listeners",
              link: {
                type: "doc",
                id: "components/concepts/user-task-listeners",
              },
              items: ["components/concepts/listen-to-user-tasks"],
            },
          ],
        },
        "components/concepts/messages",
        "components/concepts/signals",
        "components/concepts/variables",
        "components/concepts/expressions",
        "components/concepts/resource-deletion",
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
            "components/best-practices/development/local-development-with-element-templates",
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
          "CI/CD guidelines": [
            "components/best-practices/cicd-guidelines/element-templates-at-scale",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Features and integrations",
      link: {
        type: "doc",
        id: "components/features-integrations/features-integrations",
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
                "components/modeler/web-modeler/idp/idp-unstructured-extraction",
                "components/modeler/web-modeler/idp/idp-structured-extraction",
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
                {
                  type: "category",
                  label: "MCP Client",
                  link: {
                    type: "doc",
                    id: "components/early-access/alpha/mcp-client/mcp-client",
                  },
                  items: [
                    "components/early-access/alpha/mcp-client/mcp-remote-client-connector",
                    "components/early-access/alpha/mcp-client/mcp-client-connector",
                  ],
                },
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
            "components/modeler/web-modeler/use-shared-project-for-organization-wide-collaboration",
            "components/modeler/web-modeler/context-pad",
            "components/modeler/web-modeler/git-sync",
            "components/modeler/web-modeler/import-diagram",
            "components/modeler/web-modeler/fix-problems-in-your-diagram",
            "components/modeler/web-modeler/run-or-publish-your-process",
            "components/modeler/web-modeler/integrate-web-modeler-in-ci-cd",
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
            {
              "Element templates": [
                "components/modeler/web-modeler/element-templates/manage-element-templates",
                "components/modeler/web-modeler/element-templates/using-templates-in-web-modeler",
                "components/modeler/web-modeler/element-templates/save-as-element-templates",
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
                "components/modeler/web-modeler/advanced-modeling/test-scenario-files",
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
              "Element templates": [
                "components/modeler/desktop-modeler/element-templates/configuring-templates",
                "components/modeler/desktop-modeler/element-templates/using-templates",
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
        require("./docs/components/modeler/element-templates/sidebar-schema"),
        "components/modeler/data-handling",
        "components/modeler/using-web-and-desktop-modeler-together",
        require("./docs/components/modeler/reference/sidebar-schema"),
      ],
    },
    {
      type: "category",
      label: "BPMN, DMN, and FEEL",
      link: {
        type: "doc",
        id: "components/concepts/bpmn-dmn-feel", // create this doc
      },
      items: [
        {
          BPMN: [
            "components/modeler/bpmn/modeler-bpmn",
            "components/modeler/bpmn/automating-a-process-using-bpmn",
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
      label: "Orchestration Cluster",
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
            "components/zeebe/technical-concepts/batch-operations",
            "components/zeebe/technical-concepts/clustering",
            "components/zeebe/technical-concepts/health",
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
            "components/tasklist/api-versions",
            "components/tasklist/userguide/managing-tasks",
            "components/tasklist/userguide/using-filters",
            "components/tasklist/userguide/defining-task-priorities",
            "components/tasklist/userguide/starting-processes",
            "components/tasklist/user-task-access-restrictions",
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
            "components/identity/user",
            "components/identity/group",
            "components/identity/role",
            "components/identity/authorization",
            "components/identity/client",
            {
              "Mapping rules": [
                "components/identity/mapping-rules/manage-mapping-rules",
                "components/identity/mapping-rules/mapping-rule-authorizations",
                "components/identity/mapping-rules/assign-mapping-rules-to-tenants",
              ],
            },
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
            "components/connectors/use-connectors/configuring-out-of-the-box-connectors",
            "components/connectors/connector-types",
            "components/connectors/use-connectors/inbound",
            "components/connectors/use-connectors/outbound",
            "components/connectors/use-connectors/intrinsic-functions",
            "components/connectors/use-connectors-in-hybrid-mode",
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
                    "components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-customization",
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
            "components/connectors/out-of-the-box-connectors/csv",
            "components/connectors/out-of-the-box-connectors/easy-post",
            "components/connectors/out-of-the-box-connectors/email",
            "components/connectors/out-of-the-box-connectors/github",
            "components/connectors/out-of-the-box-connectors/gitlab",
            {
              Google: [
                "components/connectors/out-of-the-box-connectors/google-cloud-storage",
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
            "components/connectors/custom-built-connectors/host-custom-connectors",
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
        "components/optimize/improve-processes-with-optimize",
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
            "components/console/manage-organization/manage-user-groups",
            "components/console/manage-organization/external-sso",
            "components/console/manage-organization/view-organization-activity",
            "components/console/manage-organization/enable-alpha-features",
            "components/console/manage-organization/usage-history",
            "components/console/manage-organization/usage-alerts",
            "components/console/manage-organization/advanced-search",
            "components/console/manage-organization/switch-organization",
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
            "components/console/manage-plan/create-account",
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
      label: "Camunda 8 SaaS",
      link: {
        type: "doc",
        id: "components/saas/saas",
      },
      items: [
        "components/concepts/clusters",
        "components/saas/regions",
        "components/saas/encryption-at-rest",
        "components/saas/backups",
        "components/saas/auto-updates",
        "components/saas/data-retention",
        "components/saas/camunda-help-center",
        "components/saas/status",
        "components/saas/saas-ip-addresses",
      ],
    },

    "reference/glossary",
  ],
  "APIs & Tools": [
    "apis-tools/working-with-apis-tools",
    {
      APIs: [
        require("./docs/apis-tools/orchestration-cluster-api-rest/sidebar-schema"),
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
      "API Clients": [
        {
          "Java client": [
            "apis-tools/java-client/getting-started",
            "apis-tools/java-client/job-worker",
            "apis-tools/java-client/logging",
          ],
        },
        {
          "Camunda Spring Boot Starter": [
            "apis-tools/camunda-spring-boot-starter/getting-started",
            "apis-tools/camunda-spring-boot-starter/configuration",
            "apis-tools/camunda-spring-boot-starter/properties-reference",
          ],
        },
        "apis-tools/node-js-sdk",
        {
          "Community clients": [
            "apis-tools/community-clients/index",
            "apis-tools/build-your-own-client",
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
            "apis-tools/testing/configuration",
            "apis-tools/testing/assertions",
            "apis-tools/testing/utilities",
            "apis-tools/testing/connectors",
          ],
        },
        {
          Deprecated: ["apis-tools/testing/zeebe-process-test"],
        },
      ],
    },
    {
      type: "category",
      label: "Upgrade to Camunda 8.8",
      link: {
        type: "doc",
        id: "apis-tools/migration-manuals/index",
      },
      items: [
        "apis-tools/migration-manuals/migrate-to-camunda-api",
        "apis-tools/migration-manuals/migrate-component-apis",
        "apis-tools/migration-manuals/migrate-to-camunda-java-client",
        "apis-tools/migration-manuals/migrate-to-camunda-user-tasks",
        "apis-tools/migration-manuals/migrate-to-camunda-spring-boot-starter",
        "apis-tools/migration-manuals/migrate-to-camunda-process-test",
        "apis-tools/migration-manuals/migrate-from-grpc-to-orchestration-cluster-api",
      ],
    },
  ],
  Reference: [
    "reference/overview",
    {
      type: "category",
      label: "Release announcements and release notes",
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
            id: "reference/announcements-release-notes/880/whats-new-in-88",
          },
          items: [
            "reference/announcements-release-notes/880/whats-new-in-88",
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
    "reference/notices",
    "reference/licenses",
    "reference/public-api",
    "reference/supported-environments",
    "reference/dependencies",
    {
      type: "category",
      label: "Data collection",
      link: {
        type: "doc",
        id: "reference/data-collection/data-collection",
      },
      items: ["reference/data-collection/usage-metrics"],
    },

    "reference/contact",
  ],
  "Self-Managed": [
    "self-managed/about-self-managed",
    {
      type: "category",
      label: "Quickstart",
      link: {
        type: "doc",
        id: "self-managed/quickstart/overview",
      },
      items: [
        {
          type: "category",
          label: "For Developers",
          link: {
            type: "doc",
            id: "self-managed/quickstart/developer-quickstart",
          },
          items: [
            "self-managed/quickstart/developer-quickstart/c8run",
            "self-managed/quickstart/developer-quickstart/docker-compose",
          ],
        },
        "self-managed/quickstart/administrator-quickstart",
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
        "self-managed/reference-architecture/kubernetes",
        "self-managed/reference-architecture/manual",
      ],
    },
    {
      type: "category",
      label: "Installation methods",
      link: {
        type: "doc",
        id: "self-managed/installation-methods/index",
      },
      items: [
        //production readiness
        {
          type: "category",
          label: "Kubernetes with Helm",
          link: {
            type: "doc",
            id: "self-managed/installation-methods/helm/index",
          },
          items: [
            "self-managed/installation-methods/helm/install",
            "self-managed/installation-methods/helm/chart-parameters",
            //production guide
            {
              type: "category",
              label: "Configure",
              link: {
                type: "doc",
                id: "self-managed/installation-methods/helm/configure/index",
              },
              items: [
                // {
                //   type: "category",
                //   label: "Authentication",
                //   link: {
                //     type: "doc",
                //     id: "self-managed/installation-methods/helm/configure/authentication/index",
                //   },
                //   items: [
                //     "self-managed/installation-methods/helm/configure/authentication/oidc",
                //     "self-managed/installation-methods/helm/configure/authentication/using-existing-keycloak",
                //     "self-managed/installation-methods/helm/configure/authentication/basic",
                //   ],
                // },
                "self-managed/installation-methods/helm/configure/air-gapped-installation",
                "self-managed/installation-methods/helm/configure/application-configs",
                "self-managed/installation-methods/helm/configure/running-custom-connectors",
                "self-managed/installation-methods/helm/configure/add-extra-manifests",
                "self-managed/installation-methods/helm/configure/registry-and-images",
                "self-managed/installation-methods/helm/configure/license-key",
                "self-managed/installation-methods/helm/configure/web-modeler-console-connectors",
                {
                  Database: [
                    {
                      Elasticsearch: [
                        "self-managed/installation-methods/helm/configure/database/elasticsearch/using-existing-elasticsearch",
                        "self-managed/installation-methods/helm/configure/database/elasticsearch/prefix-elasticsearch-indices",
                      ],
                    },
                    "self-managed/installation-methods/helm/configure/database/using-existing-opensearch",
                    "self-managed/installation-methods/helm/configure/database/using-existing-postgres",
                    "self-managed/installation-methods/helm/configure/database/configure-db-custom-headers",
                    {
                      Troubleshooting: [
                        "self-managed/installation-methods/helm/configure/database/all-shards-failed",
                      ],
                    },
                  ],
                },
                "self-managed/installation-methods/helm/configure/using-existing-keycloak",
                {
                  Ingress: [
                    "self-managed/installation-methods/helm/configure/ingress-setup",
                    "self-managed/installation-methods/helm/configure/accessing-components-without-ingress",
                  ],
                },
                "self-managed/installation-methods/helm/configure/configure-multi-tenancy",
                "self-managed/installation-methods/helm/configure/multi-namespace-deployment",
                "self-managed/installation-methods/helm/configure/secret-management",
                //license key
                //image registry to include air gapped below and enterprise images
              ],
            },
            {
              type: "category",
              label: "Upgrade",
              link: {
                type: "doc",
                id: "self-managed/installation-methods/helm/upgrade/index",
              },
              items: [
                "self-managed/installation-methods/helm/upgrade/upgrade-hc-870-880",
                "self-managed/installation-methods/helm/upgrade/upgrade-hc-860-870",
                "self-managed/installation-methods/helm/upgrade/upgrade-hc-850-860",
                "self-managed/installation-methods/helm/upgrade/upgrade-hc-840-850",
                "self-managed/installation-methods/helm/upgrade/upgrade-hc-830-840",
                "self-managed/installation-methods/helm/upgrade/upgrade-hc-820-830",
              ],
            },
            {
              "Operational tasks": [
                "self-managed/installation-methods/helm/operational-tasks/diagnostics",
                "self-managed/installation-methods/helm/operational-tasks/dual-region-operational-procedure",
              ],
              //also to include backup and restore, and scaling
            },
            {
              type: "category",
              label: "Cloud providers",
              link: {
                type: "doc",
                id: "self-managed/installation-methods/helm/cloud-providers/index",
              },
              items: [
                {
                  type: "category",
                  label: "Amazon",
                  link: {
                    type: "doc",
                    id: "self-managed/installation-methods/helm/cloud-providers/amazon/amazon-eks/amazon-eks",
                  },
                  items: [
                    {
                      type: "category",
                      label: "Amazon EKS",
                      link: {
                        type: "doc",
                        id: "self-managed/installation-methods/helm/cloud-providers/amazon/amazon-eks/amazon-eks",
                      },
                      items: [
                        {
                          Quickstart: [
                            "self-managed/installation-methods/helm/cloud-providers/amazon/amazon-eks/eks-eksctl",
                          ],
                        },
                        "self-managed/installation-methods/helm/cloud-providers/amazon/amazon-eks/eks-terraform",
                        "self-managed/installation-methods/helm/cloud-providers/amazon/amazon-eks/eks-helm",
                        "self-managed/installation-methods/helm/cloud-providers/amazon/amazon-eks/dual-region",
                        {
                          Troubleshooting: [
                            "self-managed/installation-methods/helm/cloud-providers/amazon/amazon-eks/irsa",
                          ],
                        },
                      ],
                    },
                    {
                      type: "category",
                      label: "ROSA",
                      link: {
                        type: "doc",
                        id: "self-managed/installation-methods/helm/cloud-providers/amazon/openshift/terraform-setup",
                      },
                      items: [
                        "self-managed/installation-methods/helm/cloud-providers/amazon/openshift/terraform-setup",
                        "self-managed/installation-methods/helm/cloud-providers/amazon/openshift/terraform-setup-dual-region",
                      ],
                    },
                  ],
                },
                "self-managed/installation-methods/helm/cloud-providers/gcp/google-gke",
                {
                  type: "category",
                  label: "Microsoft",
                  link: {
                    type: "doc",
                    id: "self-managed/installation-methods/helm/cloud-providers/azure/microsoft-aks/microsoft-aks",
                  },
                  items: [
                    "self-managed/installation-methods/helm/cloud-providers/azure/microsoft-aks/aks-terraform",
                    "self-managed/installation-methods/helm/cloud-providers/azure/microsoft-aks/aks-helm",
                  ],
                },
                {
                  type: "category",
                  label: "Red Hat OpenShift",
                  link: {
                    type: "doc",
                    id: "self-managed/installation-methods/helm/cloud-providers/openshift/redhat-openshift",
                  },
                  items: [
                    "self-managed/installation-methods/helm/cloud-providers/openshift/redhat-openshift-dual-region",
                  ],
                },
              ],
            },
          ],
        },
        "self-managed/installation-methods/docker/docker",
        {
          type: "category",
          label: "Manual",
          items: [
            "self-managed/installation-methods/manual/install",
            "self-managed/installation-methods/manual/upgrade",
            {
              type: "category",
              label: "Cloud providers",
              items: [
                {
                  type: "category",
                  label: "Amazon",
                  items: [
                    "self-managed/installation-methods/manual/cloud-providers/amazon/aws-ec2",
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      Concepts: [
        {
          type: "category",
          label: "Back up and restore",
          link: {
            type: "doc",
            id: "self-managed/operational-guides/backup-restore/backup-and-restore",
          },
          items: [
            "self-managed/operational-guides/backup-restore/backup",
            "self-managed/operational-guides/backup-restore/restore",
            {
              "Backup Management API": [
                "self-managed/operational-guides/backup-restore/optimize-backup",
                "self-managed/operational-guides/backup-restore/webapps-backup",
                "self-managed/operational-guides/backup-restore/zeebe-backup-and-restore",
              ],
            },
          ],
        },
        "self-managed/operational-guides/data-purge",
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
                id: "self-managed/concepts/document-handling/configuration/index",
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
        "self-managed/operational-guides/configure-flow-control/configure-flow-control",
        {
          Monitoring: [
            "self-managed/operational-guides/monitoring/log-levels",
            "self-managed/operational-guides/monitoring/metrics",
          ],
        },
        {
          "Multi-region": ["self-managed/concepts/multi-region/dual-region"],
        },
        "self-managed/concepts/multi-tenancy",
        {
          Privileges: [
            "self-managed/concepts/elasticsearch-privileges",
            "self-managed/concepts/elasticsearch-without-cluster-privileges",
            "self-managed/concepts/opensearch-privileges",
          ],
        },
        {
          Troubleshooting: ["self-managed/operational-guides/troubleshooting"],
        },
        "self-managed/concepts/no-secondary-storage",
      ],
    },
    {
      Components: [
        {
          type: "category",
          label: "Components upgrade",
          link: {
            type: "doc",
            id: "self-managed/components/components-upgrade/introduction",
          },
          items: [
            "self-managed/components/components-upgrade/870-to-880",
            "self-managed/components/components-upgrade/860-to-870",
            "self-managed/components/components-upgrade/850-to-860",
            "self-managed/components/components-upgrade/840-to-850",
            "self-managed/components/components-upgrade/830-to-840",
            {
              Elasticsearch: [
                "self-managed/components/components-upgrade/elasticsearch/7-to-8",
              ],
            },
            {
              Keycloak: [
                "self-managed/components/components-upgrade/keycloak/keycloak-update",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Orchestration Cluster",
          link: {
            type: "doc",
            id: "self-managed/components/orchestration-cluster/overview",
          },
          items: [
            {
              type: "category",
              label: "Core settings and features",
              link: {
                type: "doc",
                id: "self-managed/components/orchestration-cluster/core-settings/overview",
              },
              items: [
                {
                  Configuration: [
                    "self-managed/components/orchestration-cluster/core-settings/configuration/properties",
                    "self-managed/components/orchestration-cluster/core-settings/configuration/csrf-protection",
                    "self-managed/components/orchestration-cluster/core-settings/configuration/licensing",
                    "self-managed/components/orchestration-cluster/core-settings/configuration/webserver",
                    "self-managed/components/orchestration-cluster/core-settings/configuration/logging",
                  ],
                },
                // {
                //   Concepts: [],
                // },
                // {
                //   Migration: [],
                // },
              ],
            },
            {
              Zeebe: [
                {
                  "Zeebe Gateway": [
                    "self-managed/components/orchestration-cluster/zeebe/zeebe-gateway/overview",
                    "self-managed/components/orchestration-cluster/zeebe/zeebe-gateway/interceptors",
                    "self-managed/components/orchestration-cluster/zeebe/zeebe-gateway/filters",
                    "self-managed/components/orchestration-cluster/zeebe/zeebe-gateway/job-streaming",
                  ],
                },
                {
                  Configuration: [
                    "self-managed/components/orchestration-cluster/zeebe/configuration/configuration",
                    "self-managed/components/orchestration-cluster/zeebe/configuration/gateway-health-probes",
                    "self-managed/components/orchestration-cluster/zeebe/configuration/environment-variables",
                    "self-managed/components/orchestration-cluster/zeebe/configuration/fixed-partitioning",
                    "self-managed/components/orchestration-cluster/zeebe/configuration/priority-election",
                    "self-managed/components/orchestration-cluster/zeebe/configuration/broker-config",
                    "self-managed/components/orchestration-cluster/zeebe/configuration/gateway-config",
                  ],
                },
                {
                  Security: [
                    "self-managed/components/orchestration-cluster/zeebe/security/security",
                    "self-managed/components/orchestration-cluster/zeebe/security/client-authorization",
                    "self-managed/components/orchestration-cluster/zeebe/security/secure-client-communication",
                    "self-managed/components/orchestration-cluster/zeebe/security/secure-cluster-communication",
                  ],
                },
                {
                  Operation: [
                    "self-managed/components/orchestration-cluster/zeebe/operations/zeebe-in-production",
                    "self-managed/components/orchestration-cluster/zeebe/operations/resource-planning",
                    "self-managed/components/orchestration-cluster/zeebe/operations/network-ports",
                    "self-managed/components/orchestration-cluster/zeebe/operations/setting-up-a-cluster",
                    "self-managed/components/orchestration-cluster/zeebe/operations/health",
                    "self-managed/components/orchestration-cluster/zeebe/operations/backpressure",
                    "self-managed/components/orchestration-cluster/zeebe/operations/disk-space",
                    "self-managed/components/orchestration-cluster/zeebe/operations/update-zeebe",
                    "self-managed/components/orchestration-cluster/zeebe/operations/rebalancing",
                    "self-managed/components/orchestration-cluster/zeebe/operations/management-api",
                    "self-managed/components/orchestration-cluster/zeebe/operations/backups",
                    "self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling",
                  ],
                },
                {
                  type: "category",
                  label: "Exporters",
                  link: {
                    type: "doc",
                    id: "self-managed/components/orchestration-cluster/zeebe/exporters/exporters",
                  },
                  items: [
                    "self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter",
                    {
                      type: "category",
                      label: "Camunda Exporter indices",
                      link: {
                        type: "doc",
                        id: "self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter-indices",
                      },
                      items: [
                        "self-managed/components/orchestration-cluster/zeebe/exporters/index-diagrams/camunda-exporter-indices-identity",
                        "self-managed/components/orchestration-cluster/zeebe/exporters/index-diagrams/camunda-exporter-indices-operate",
                        "self-managed/components/orchestration-cluster/zeebe/exporters/index-diagrams/camunda-exporter-indices-tasklist",
                      ],
                    },
                    "self-managed/components/orchestration-cluster/zeebe/exporters/elasticsearch-exporter",
                    "self-managed/components/orchestration-cluster/zeebe/exporters/opensearch-exporter",
                  ],
                },
              ],
              Operate: [
                "self-managed/components/orchestration-cluster/operate/operate-configuration",
                "self-managed/components/orchestration-cluster/operate/data-retention",
                "self-managed/components/orchestration-cluster/operate/schema-and-migration",
                "self-managed/components/orchestration-cluster/operate/operate-authentication",
                "self-managed/components/orchestration-cluster/operate/usage-metrics",
              ],
              Tasklist: [
                "self-managed/components/orchestration-cluster/tasklist/tasklist-configuration",
                "self-managed/components/orchestration-cluster/tasklist/tasklist-custom-styling",
                "self-managed/components/orchestration-cluster/tasklist/data-retention",
                "self-managed/components/orchestration-cluster/tasklist/tasklist-authentication",
                "self-managed/components/orchestration-cluster/tasklist/usage-metrics",
                "self-managed/components/orchestration-cluster/tasklist/user-task-access-restrictions",
              ],
            },
            {
              type: "category",
              label: "Identity",
              link: {
                type: "doc",
                id: "self-managed/components/orchestration-cluster/identity/overview",
              },
              items: [
                "self-managed/components/orchestration-cluster/identity/overview",
                "self-managed/components/orchestration-cluster/identity/connect-external-identity-provider",
                "self-managed/components/orchestration-cluster/identity/manage-tenants",
              ],
            },
          ],
        },
        {
          Console: [
            "self-managed/components/console/overview",
            {
              Configuration: [
                "self-managed/components/console/configuration/configuration",
                "self-managed/components/console/configuration/ssl",
              ],
            },
            "self-managed/components/console/usage-metrics",
            "self-managed/components/console/telemetry",
          ],
        },
        {
          Modeler: [
            {
              "Web Modeler": [
                "self-managed/components/modeler/web-modeler/overview",
                {
                  Configuration: [
                    "self-managed/components/modeler/web-modeler/configuration/configuration",
                    "self-managed/components/modeler/web-modeler/configuration/database",
                    "self-managed/components/modeler/web-modeler/configuration/identity",
                    "self-managed/components/modeler/web-modeler/configuration/logging",
                    "self-managed/components/modeler/web-modeler/configuration/ssl",
                  ],
                  Troubleshooting: [
                    "self-managed/components/modeler/web-modeler/troubleshooting/troubleshoot-database-connection",
                    "self-managed/components/modeler/web-modeler/troubleshooting/troubleshoot-zeebe-connection",
                    "self-managed/components/modeler/web-modeler/troubleshooting/troubleshoot-missing-data",
                    "self-managed/components/modeler/web-modeler/troubleshooting/troubleshoot-proxy-configuration",
                    "self-managed/components/modeler/web-modeler/troubleshooting/troubleshoot-other-problems",
                  ],
                },
              ],
            },
            {
              "Desktop Modeler": [
                "self-managed/components/modeler/desktop-modeler/deploy-to-self-managed",
              ],
            },
          ],
        },
        {
          Connectors: [
            "self-managed/components/connectors/overview",
            "self-managed/components/connectors/connectors-configuration",
          ],
        },
        {
          type: "category",
          label: "Management Identity",
          link: {
            type: "doc",
            id: "self-managed/components/management-identity/what-is-identity",
          },
          items: [
            "self-managed/components/management-identity/identity-first-steps",
            {
              type: "category",
              label: "Configuration",
              link: {
                type: "doc",
                id: "self-managed/components/management-identity/configuration/identity-configuration-overview",
              },
              items: [
                "self-managed/components/management-identity/configuration/configure-external-identity-provider",
                "self-managed/components/management-identity/configuration/connect-to-an-existing-keycloak",
                "self-managed/components/management-identity/configuration/connect-to-an-oidc-provider",
                "self-managed/components/management-identity/configuration/alternative-db",
              ],
            },
            "self-managed/components/management-identity/authentication",
            {
              type: "category",
              label: "Manage Identity",
              items: [
                {
                  type: "category",
                  label: "Users, groups, roles, and applications",
                  link: {
                    type: "doc",
                    id: "self-managed/components/management-identity/application-user-group-role-management/identity-application-user-group-role-management-overview",
                  },
                  items: [
                    "self-managed/components/management-identity/application-user-group-role-management/manage-groups",
                    "self-managed/components/management-identity/application-user-group-role-management/manage-roles",
                    "self-managed/components/management-identity/application-user-group-role-management/applications",
                  ],
                },
                {
                  type: "category",
                  label: "Access and permissions",
                  link: {
                    type: "doc",
                    id: "self-managed/components/management-identity/access-management/access-management-overview",
                  },
                  items: [
                    "self-managed/components/management-identity/access-management/manage-permissions",
                  ],
                },
                "self-managed/components/management-identity/managing-tenants",
                "self-managed/components/management-identity/mapping-rules",
              ],
            },
            {
              Reference: [
                "self-managed/components/management-identity/miscellaneous/application-monitoring",
                "self-managed/components/management-identity/miscellaneous/configuration-variables",
                "self-managed/components/management-identity/miscellaneous/configure-logging",
                "self-managed/components/management-identity/miscellaneous/making-identity-production-ready",
                "self-managed/components/management-identity/miscellaneous/resource-management",
                "self-managed/components/management-identity/miscellaneous/starting-configuration",
                "self-managed/components/management-identity/miscellaneous/troubleshoot-identity",
              ],
            },
          ],
        },
        {
          Optimize: [
            "self-managed/components/optimize/overview",
            {
              Configuration: [
                {
                  "System configuration": [
                    "self-managed/components/optimize/configuration/system-configuration",
                    "self-managed/components/optimize/configuration/system-configuration-platform-8",
                  ],
                },
                "self-managed/components/optimize/configuration/logging",
                "self-managed/components/optimize/configuration/security-instructions",
                "self-managed/components/optimize/configuration/shared-elasticsearch-cluster",
                "self-managed/components/optimize/configuration/history-cleanup",
                "self-managed/components/optimize/configuration/localization",
                "self-managed/components/optimize/configuration/object-variables",
                "self-managed/components/optimize/configuration/variable-import",
                "self-managed/components/optimize/configuration/multi-tenancy",
              ],
            },
            {
              "Migration & update": [
                "self-managed/components/optimize/migration-update/camunda-8/instructions",
                "self-managed/components/optimize/migration-update/camunda-8/8.6-to-8.7",
                "self-managed/components/optimize/migration-update/camunda-8/3.13_8.5-to-8.6",
                "self-managed/components/optimize/migration-update/camunda-8/3.12_8.4-to-3.13_8.5",
                "self-managed/components/optimize/migration-update/camunda-8/3.11_8.3-to-3.12_8.4",
                "self-managed/components/optimize/migration-update/camunda-8/3.10-to-3.11_8.3",
                "self-managed/components/optimize/migration-update/camunda-8/3.9-to-3.10",
                "self-managed/components/optimize/migration-update/camunda-8/3.9-preview-1-to-3.9",
                "self-managed/components/optimize/migration-update/camunda-8/3.8-to-3.9-preview-1",
                "self-managed/components/optimize/migration-update/camunda-8/3.7-to-3.8",
              ],
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Upgrade to Camunda 8.8",
      link: {
        type: "doc",
        id: "self-managed/update/administrators/admin-upgrade-overview",
      },
      items: [
        "self-managed/update/administrators/prepare-for-admin-upgrade",
        "self-managed/update/administrators/run-admin-upgrade",
      ],
    },
  ],
};
