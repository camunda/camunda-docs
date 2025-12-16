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
            "guides/migrating-from-camunda-7/data-migrator/install",
            "guides/migrating-from-camunda-7/data-migrator/runtime",
            "guides/migrating-from-camunda-7/data-migrator/history",
            "guides/migrating-from-camunda-7/data-migrator/identity",
            "guides/migrating-from-camunda-7/data-migrator/variables",
            "guides/migrating-from-camunda-7/data-migrator/cockpit-plugin",
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
        "guides/migrating-from-camunda-7/data-migrator/version-compatibility",
        "guides/migrating-from-camunda-7/data-migrator/update-guide",
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
            "components/concepts/multi-tenancy",
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
              items: [
                "components/concepts/global-user-task-listeners",
                "components/concepts/listen-to-user-tasks",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Messages",
          link: {
            type: "doc",
            id: "components/concepts/messages",
          },
          items: ["components/concepts/message-aggregation"],
        },
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
            id: "components/agentic-orchestration/agentic-orchestration-overview",
          },
          items: [
            "components/agentic-orchestration/ai-agents",
            "components/agentic-orchestration/ao-design",
            "components/agentic-orchestration/choose-right-model-agentic",
            "components/agentic-orchestration/model-recommendations-agentic",
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
                "components/camunda-integrations/sap/prerequisites",
                // {
                //   "Feature documentation": [
                //     "components/camunda-integrations/sap/feature/sap-demo-blueprint",
                //     "components/camunda-integrations/sap/feature/manage-sap-records",
                //     "components/camunda-integrations/sap/feature/connector-principal-propagation",
                //     "components/camunda-integrations/sap/feature/sap-advanced-mesh-events",
                //     "components/camunda-integrations/sap/feature/sap-task-center-mvp",
                //   ],
                // },
                {
                  "Integration modules": [
                    "components/camunda-integrations/sap/odata-connector",
                    "components/camunda-integrations/sap/rfc-connector",
                    "components/camunda-integrations/sap/btp-plugin",
                    "components/camunda-integrations/sap/eventing",
                    "components/camunda-integrations/sap/csap-cli",
                  ],
                },
                // {
                //   "Cross-cutting concerns": [
                //     "components/camunda-integrations/sap/cross-cutting/security",
                //     "components/camunda-integrations/sap/cross-cutting/logging-monitoring",
                //     "components/camunda-integrations/sap/cross-cutting/error-handling",
                //     "components/camunda-integrations/sap/cross-cutting/compliance",
                //   ],
                // },
                // {
                //   "Examples & templates": [
                //     "components/camunda-integrations/sap/examples/bpmn-templates",
                //     "components/camunda-integrations/sap/examples/sample-config",
                //     "components/camunda-integrations/sap/examples/test-data",
                //   ],
                // },
                // {
                //   "Troubleshooting & FAQs": [
                //     "components/camunda-integrations/sap/troubleshooting/troubleshooting",
                //     "components/camunda-integrations/sap/troubleshooting/pitfalls",
                //     "components/camunda-integrations/sap/troubleshooting/limitations",
                //   ],
                // },
              ],
            },
            {
              type: "category",
              label: "ServiceNow",
              link: {
                type: "doc",
                id: "components/camunda-integrations/servicenow/servicenow-integration",
              },
              items: [
                "components/camunda-integrations/servicenow/prerequisites",
                "components/camunda-integrations/servicenow/setup-and-configuration",
                {
                  type: "category",
                  label: "Connectors",
                  items: [
                    "components/camunda-integrations/servicenow/connectors/outbound-connector",
                    "components/camunda-integrations/servicenow/connectors/incident-handler",
                    "components/camunda-integrations/servicenow/connectors/flow-starter",
                  ],
                },
                "components/camunda-integrations/servicenow/blueprints",
                "components/camunda-integrations/servicenow/best-practices",
                "components/camunda-integrations/servicenow/troubleshooting",
                "components/camunda-integrations/servicenow/glossary",
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
                "components/early-access/alpha/bpmn-copilot/bpmn-copilot",
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
                {
                  type: "category",
                  label: "A2A Client",
                  link: {
                    type: "doc",
                    id: "components/early-access/alpha/a2a-client/a2a-client",
                  },
                  items: [
                    "components/early-access/alpha/a2a-client/a2a-client-connector",
                    "components/early-access/alpha/a2a-client/a2a-client-polling-connector",
                    "components/early-access/alpha/a2a-client/a2a-client-webhook-connector",
                    "components/early-access/alpha/a2a-client/a2a-client-usage-patterns",
                  ],
                },
                "components/early-access/alpha/ms-teams/ms-teams",
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
          type: "category",
          label: "Web Modeler",
          link: {
            type: "doc",
            id: "components/modeler/web-modeler/index",
          },
          items: [
            "components/modeler/web-modeler/launch-web-modeler",
            {
              Modeling: [
                "components/modeler/web-modeler/modeling/model-your-first-diagram",
                "components/modeler/web-modeler/modeling/context-pad",
                "components/modeler/web-modeler/modeling/fix-problems-in-your-diagram",
                "components/modeler/web-modeler/modeling/versions",
                "components/modeler/web-modeler/modeling/file-download",
                "components/modeler/web-modeler/modeling/import-diagram",
                "components/modeler/web-modeler/modeling/camunda-marketplace",
                {
                  type: "category",
                  label: "Process applications",
                  link: {
                    type: "doc",
                    id: "components/modeler/web-modeler/process-applications/process-applications",
                  },
                  items: [
                    {
                      type: "doc",
                      label: "Lifecycle",
                      id: "components/modeler/web-modeler/process-applications/process-application-pipeline",
                    },
                    {
                      type: "doc",
                      label: "Creation",
                      id: "components/modeler/web-modeler/process-applications/create-a-process-application",
                    },
                    {
                      type: "doc",
                      label: "Deployment",
                      id: "components/modeler/web-modeler/process-applications/deploy-process-application",
                    },
                    {
                      type: "doc",
                      label: "Versioning",
                      id: "components/modeler/web-modeler/process-applications/process-application-versioning",
                    },
                    {
                      type: "doc",
                      label: "Git Sync",
                      id: "components/modeler/web-modeler/process-applications/git-sync",
                    },
                  ],
                },
                {
                  type: "category",
                  label: "Element templates",
                  link: {
                    type: "doc",
                    id: "components/modeler/web-modeler/element-templates/manage-element-templates",
                  },
                  items: [
                    "components/modeler/web-modeler/element-templates/element-template-generator",
                    "components/modeler/web-modeler/element-templates/using-templates-in-web-modeler",
                    "components/modeler/web-modeler/element-templates/save-as-element-templates",
                    "components/modeler/web-modeler/element-templates/best-practices",
                  ],
                },
                {
                  "AI features": [
                    "components/modeler/web-modeler/modeling/advanced-modeling/camunda-docs-ai",
                  ],
                },
                {
                  "Advanced modeling": [
                    "components/modeler/web-modeler/modeling/advanced-modeling/business-rule-task-linking",
                    "components/modeler/web-modeler/modeling/advanced-modeling/call-activity-linking",
                    "components/modeler/web-modeler/modeling/advanced-modeling/form-linking",
                    "components/modeler/web-modeler/modeling/advanced-modeling/publish-public-processes",
                    "components/modeler/web-modeler/modeling/advanced-modeling/process-documentation-with-readme-files",
                  ],
                },
              ],
            },
            {
              type: "category",
              label: "Collaboration",
              link: {
                type: "doc",
                id: "components/modeler/web-modeler/collaboration/collaboration",
              },
              items: [
                "components/modeler/web-modeler/collaboration/collaborate-with-modes",
                "components/modeler/web-modeler/collaboration/design-your-process",
                "components/modeler/web-modeler/collaboration/implement-your-process",
                "components/modeler/web-modeler/collaboration/use-shared-project-for-organization-wide-collaboration",
              ],
            },
            {
              Validation: [
                "components/modeler/web-modeler/validation/play-your-process",
                "components/modeler/web-modeler/validation/test-scenario-files",
                "components/modeler/web-modeler/validation/token-simulation",
              ],
            },
            "components/modeler/web-modeler/run-or-publish-your-process",
            "components/modeler/web-modeler/process-landscape-visualization",
            {
              type: "doc",
              id: "components/modeler/web-modeler/web-modeler-settings",
              label: "Settings",
            },
            "components/modeler/web-modeler/integrate-web-modeler-in-ci-cd",
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
            "components/modeler/desktop-modeler/task-testing",
            "components/modeler/desktop-modeler/troubleshooting",
          ],
        },
        require("./docs/components/modeler/forms/sidebar-schema"),
        require("./docs/components/modeler/element-templates/sidebar-schema"),
        "components/modeler/data-handling",
        "components/modeler/using-web-and-desktop-modeler-together",
        "components/modeler/task-testing",
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
            "components/operate/userguide/access-control",
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
            "components/tasklist/userguide/access-control",
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
            "components/identity/access-control",
            "components/identity/user",
            "components/identity/group",
            "components/identity/role",
            "components/identity/authorization",
            "components/identity/client",
            "components/identity/mapping-rules",
            "components/identity/tenant",
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
          label: "Built-in connectors",
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
                    {
                      type: "category",
                      label: "AI Agent Sub-process",
                      link: {
                        type: "doc",
                        id: "components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-subprocess",
                      },
                      items: [
                        "components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-subprocess-example",
                      ],
                    },
                    {
                      type: "category",
                      label: "AI Agent Task",
                      link: {
                        type: "doc",
                        id: "components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-task",
                      },
                      items: [
                        "components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-task-example",
                      ],
                    },
                    "components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions",
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
            "components/connectors/out-of-the-box-connectors/message-send",
            {
              Microsoft: [
                "components/connectors/out-of-the-box-connectors/azure-open-ai",
                "components/connectors/out-of-the-box-connectors/azure-blob-storage",
                "components/connectors/out-of-the-box-connectors/microsoft-teams",
                "components/connectors/out-of-the-box-connectors/microsoft-o365-mail",
              ],
            },
            "components/connectors/out-of-the-box-connectors/openai",
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
          label: "Build custom connectors",
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
                "components/connectors/manage-connector-templates",
                "components/connectors/custom-built-connectors/create-connector-from-rest",
              ],
            },
            "components/connectors/custom-built-connectors/connector-sdk",
            "components/connectors/custom-built-connectors/host-custom-connectors",
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
        "components/saas/data-locations",
        {
          type: "category",
          label: "Encryption",
          link: {
            type: "doc",
            id: "components/saas/byok/overview",
          },
          items: [
            "components/saas/encryption-at-rest",
            "components/saas/byok/aws-external-encryption-setup",
            "components/saas/byok/key-rotation-audit-logging",
            "components/saas/byok/faq-and-troubleshooting",
          ],
        },
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
        {
          type: "category",
          label: "TypeScript SDK",
          link: {
            type: "doc",
            id: "apis-tools/typescript/typescript-sdk",
          },
          items: [
            "apis-tools/typescript/camunda8-sdk",
            "apis-tools/typescript/oca-client",
            "apis-tools/typescript/migrating-to-oca",
            "apis-tools/typescript/backpressure",
            "apis-tools/typescript/eventual-consistency",
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
          label: "8.9",
          link: {
            type: "doc",
            id: "reference/announcements-release-notes/890/890-announcements",
          },
          items: [
            "reference/announcements-release-notes/890/whats-new-in-89",
            "reference/announcements-release-notes/890/890-announcements",
            "reference/announcements-release-notes/890/890-release-notes",
          ],
        },
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
    "reference/legal",
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
            {
              type: "category",
              label: "Camunda 8 Run",
              link: {
                type: "doc",
                id: "self-managed/quickstart/developer-quickstart/c8run",
              },
              items: [
                "self-managed/quickstart/developer-quickstart/c8run-troubleshooting",
              ],
            },
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
      label: "Deploy and manage",
      link: {
        type: "doc",
        id: "self-managed/deployment/index",
      },
      items: [
        //production readiness
        {
          type: "category",
          label: "Kubernetes with Helm",
          link: {
            type: "doc",
            id: "self-managed/deployment/helm/index",
          },
          items: [
            {
              type: "category",
              label: "Install",
              link: {
                type: "doc",
                id: "self-managed/deployment/helm/install/index",
              },
              items: [
                "self-managed/deployment/helm/install/quick-install",
                "self-managed/deployment/helm/install/production/index",
              ],
            },
            "self-managed/deployment/helm/chart-parameters",
            //production guide
            {
              type: "category",
              label: "Configure",
              link: {
                type: "doc",
                id: "self-managed/deployment/helm/configure/index",
              },
              items: [
                // {
                //   type: "category",
                //   label: "Authentication",
                //   link: {
                //     type: "doc",
                //     id: "self-managed/deployment/helm/configure/authentication/index",
                //   },
                //   items: [
                //     "self-managed/deployment/helm/configure/authentication/oidc",
                //     "self-managed/deployment/helm/configure/authentication/using-existing-keycloak",
                //     "self-managed/deployment/helm/configure/authentication/basic",
                //   ],
                // },
                "self-managed/deployment/helm/configure/application-configs",
                "self-managed/deployment/helm/configure/vendor-supported-infrastructure",
                "self-managed/deployment/helm/configure/enable-additional-components",
                "self-managed/deployment/helm/configure/data-retention",
                {
                  type: "category",
                  label: "Registry and images",
                  link: {
                    type: "doc",
                    id: "self-managed/deployment/helm/configure/registry-and-images/index",
                  },
                  items: [
                    "self-managed/deployment/helm/configure/registry-and-images/air-gapped-installation",
                    "self-managed/deployment/helm/configure/registry-and-images/install-bitnami-enterprise-images",
                  ],
                },
                {
                  type: "category",
                  label: "Database",
                  link: {
                    type: "doc",
                    id: "self-managed/deployment/helm/configure/database/index",
                  },
                  items: [
                    {
                      Elasticsearch: [
                        "self-managed/deployment/helm/configure/database/elasticsearch/using-external-elasticsearch",
                        "self-managed/deployment/helm/configure/database/elasticsearch/prefix-elasticsearch-indices",
                      ],
                    },
                    "self-managed/deployment/helm/configure/database/using-external-opensearch",
                    "self-managed/deployment/helm/configure/database/using-existing-postgres",
                    "self-managed/deployment/helm/configure/database/configure-db-custom-headers",
                    "self-managed/deployment/helm/configure/database/rdbms",
                    "self-managed/deployment/helm/configure/database/access-sql-liquibase-scripts",
                    {
                      Troubleshooting: [
                        "self-managed/deployment/helm/configure/database/all-shards-failed",
                      ],
                    },
                  ],
                },
                {
                  type: "category",
                  label: "Ingress",
                  link: {
                    type: "doc",
                    id: "self-managed/deployment/helm/configure/ingress/index",
                  },
                  items: [
                    "self-managed/deployment/helm/configure/ingress/ingress-setup",
                    "self-managed/deployment/helm/configure/ingress/accessing-components-without-ingress",
                  ],
                },
                {
                  type: "category",
                  label: "Authentication and authorization",
                  link: {
                    type: "doc",
                    id: "self-managed/deployment/helm/configure/authentication-and-authorization/index",
                  },
                  items: [
                    "self-managed/deployment/helm/configure/authentication-and-authorization/basic-authentication",
                    "self-managed/deployment/helm/configure/authentication-and-authorization/custom-users-and-clients",
                    "self-managed/deployment/helm/configure/authentication-and-authorization/internal-keycloak",
                    {
                      type: "category",
                      label: "External OIDC provider",
                      link: {
                        type: "doc",
                        id: "self-managed/deployment/helm/configure/authentication-and-authorization/external-oidc-provider",
                      },
                      items: [
                        "self-managed/deployment/helm/configure/authentication-and-authorization/external-keycloak",
                        "self-managed/deployment/helm/configure/authentication-and-authorization/microsoft-entra",
                        "self-managed/deployment/helm/configure/authentication-and-authorization/generic-oidc-provider",
                        "self-managed/deployment/helm/configure/authentication-and-authorization/external-idp-via-internal-keycloak",
                        "self-managed/deployment/helm/configure/authentication-and-authorization/troubleshooting-oidc",
                      ],
                    },
                  ],
                },
                "self-managed/deployment/helm/configure/secret-management",
                "self-managed/deployment/helm/configure/running-custom-connectors",
                "self-managed/deployment/helm/configure/add-extra-manifests",
                "self-managed/deployment/helm/configure/license-key",
                "self-managed/deployment/helm/configure/configure-multi-tenancy",
              ],
            },
            {
              type: "category",
              label: "Upgrade",
              link: {
                type: "doc",
                id: "self-managed/deployment/helm/upgrade/index",
              },
              items: [
                "self-managed/deployment/helm/upgrade/upgrade-hc-880-890",
                {
                  type: "category",
                  label: "Upgrade 8.7 to 8.8",
                  link: {
                    type: "doc",
                    id: "self-managed/deployment/helm/upgrade/upgrade-hc-870-880",
                  },
                  items: [
                    "self-managed/deployment/helm/upgrade/upgrade-hc-870-880-dual-region",
                  ],
                },
                "self-managed/deployment/helm/upgrade/upgrade-hc-860-870",
                "self-managed/deployment/helm/upgrade/upgrade-hc-850-860",
                "self-managed/deployment/helm/upgrade/upgrade-hc-840-850",
                "self-managed/deployment/helm/upgrade/upgrade-hc-830-840",
                "self-managed/deployment/helm/upgrade/upgrade-hc-820-830",
              ],
            },
            {
              type: "category",
              label: "Operational tasks",
              link: {
                type: "doc",
                id: "self-managed/deployment/helm/operational-tasks/index",
              },
              items: [
                "self-managed/deployment/helm/operational-tasks/diagnostics",
                "self-managed/deployment/helm/operational-tasks/dual-region-operational-procedure",
              ],
            },
            {
              type: "category",
              label: "Cloud providers",
              link: {
                type: "doc",
                id: "self-managed/deployment/helm/cloud-providers/index",
              },
              items: [
                {
                  type: "category",
                  label: "Amazon",
                  link: {
                    type: "doc",
                    id: "self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/amazon-eks",
                  },
                  items: [
                    {
                      type: "category",
                      label: "Amazon EKS",
                      link: {
                        type: "doc",
                        id: "self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/amazon-eks",
                      },
                      items: [
                        {
                          Quickstart: [
                            "self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/eks-eksctl",
                          ],
                        },
                        "self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/eks-terraform",
                        "self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/eks-helm",
                        "self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/dual-region",
                        {
                          Troubleshooting: [
                            "self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/irsa",
                          ],
                        },
                      ],
                    },
                    {
                      type: "category",
                      label: "ROSA",
                      link: {
                        type: "doc",
                        id: "self-managed/deployment/helm/cloud-providers/amazon/openshift/terraform-setup",
                      },
                      items: [
                        "self-managed/deployment/helm/cloud-providers/amazon/openshift/terraform-setup",
                        "self-managed/deployment/helm/cloud-providers/amazon/openshift/terraform-setup-dual-region",
                      ],
                    },
                  ],
                },
                "self-managed/deployment/helm/cloud-providers/gcp/google-gke",
                {
                  type: "category",
                  label: "Microsoft",
                  link: {
                    type: "doc",
                    id: "self-managed/deployment/helm/cloud-providers/azure/microsoft-aks/microsoft-aks",
                  },
                  items: [
                    "self-managed/deployment/helm/cloud-providers/azure/microsoft-aks/aks-terraform",
                    "self-managed/deployment/helm/cloud-providers/azure/microsoft-aks/aks-helm",
                  ],
                },
                {
                  type: "category",
                  label: "Red Hat OpenShift",
                  items: [
                    {
                      type: "doc",
                      label: "Single Region",
                      id: "self-managed/deployment/helm/cloud-providers/openshift/redhat-openshift",
                    },
                    {
                      type: "doc",
                      label: "Dual Region",
                      id: "self-managed/deployment/helm/cloud-providers/openshift/redhat-openshift-dual-region",
                    },
                  ],
                },
              ],
            },
          ],
        },
        "self-managed/deployment/docker/docker",
        {
          type: "category",
          label: "Manual",
          items: [
            "self-managed/deployment/manual/install",
            "self-managed/deployment/manual/upgrade",
            {
              type: "category",
              label: "Cloud providers",
              items: [
                {
                  type: "category",
                  label: "Amazon",
                  items: [
                    "self-managed/deployment/manual/cloud-providers/amazon/aws-ec2",
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
          Authentication: [
            "self-managed/concepts/authentication/authentication-to-orchestration-cluster",
            "self-managed/concepts/authentication/authentication-to-management-components",
          ],
        },
        {
          type: "category",
          label: "Secondary storage",
          link: {
            type: "doc",
            id: "self-managed/concepts/secondary-storage/index",
          },
          items: [
            {
              type: "category",
              label: "Configure",
              link: {
                type: "doc",
                id: "self-managed/concepts/secondary-storage/configuring-secondary-storage",
              },
              items: [
                "self-managed/concepts/secondary-storage/no-secondary-storage",
              ],
            },
            "self-managed/concepts/secondary-storage/managing-secondary-storage",
          ],
        },
        {
          type: "category",
          label: "Databases",
          link: {
            type: "doc",
            id: "self-managed/concepts/databases/overview",
          },
          items: [
            {
              Elasticsearch: [
                {
                  Privileges: [
                    "self-managed/concepts/databases/elasticsearch/elasticsearch-privileges",
                    "self-managed/concepts/databases/elasticsearch/elasticsearch-without-cluster-privileges",
                    "self-managed/concepts/databases/elasticsearch/opensearch-privileges",
                  ],
                },
              ],
            },
            {
              "Relational databases": [
                "self-managed/concepts/databases/relational-db/rdbms-support-policy",
                "self-managed/concepts/databases/relational-db/database-configuration",
              ],
            },
          ],
        },
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
        "self-managed/operational-guides/data-purge",
        {
          Troubleshooting: ["self-managed/operational-guides/troubleshooting"],
        },
      ],
    },
    {
      Components: [
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
                    "self-managed/components/orchestration-cluster/core-settings/configuration/configuration-mapping",
                    "self-managed/components/orchestration-cluster/core-settings/configuration/csrf-protection",
                    "self-managed/components/orchestration-cluster/core-settings/configuration/licensing",
                    "self-managed/components/orchestration-cluster/core-settings/configuration/webserver",
                    "self-managed/components/orchestration-cluster/core-settings/configuration/logging",
                    "self-managed/components/orchestration-cluster/core-settings/configuration/identity-as-code",
                  ],
                },
                {
                  Concepts: [
                    "self-managed/components/orchestration-cluster/core-settings/concepts/elasticsearch-and-opensearch",
                    "self-managed/components/orchestration-cluster/core-settings/concepts/monitoring",
                    "self-managed/components/orchestration-cluster/core-settings/concepts/backups",
                    "self-managed/components/orchestration-cluster/core-settings/concepts/data-retention",
                    "self-managed/components/orchestration-cluster/core-settings/concepts/usage-metrics",
                    "self-managed/components/orchestration-cluster/core-settings/concepts/schema-and-migration",
                    "self-managed/components/orchestration-cluster/core-settings/concepts/version-compatibility",
                  ],
                },
              ],
            },
            {
              Zeebe: [
                "self-managed/components/orchestration-cluster/zeebe/overview",
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
                    "self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter-indices",
                    "self-managed/components/orchestration-cluster/zeebe/exporters/elasticsearch-exporter",
                    "self-managed/components/orchestration-cluster/zeebe/exporters/opensearch-exporter",
                  ],
                },
              ],
              Operate: [
                "self-managed/components/orchestration-cluster/operate/operate-configuration",
              ],
              Tasklist: [
                "self-managed/components/orchestration-cluster/tasklist/tasklist-configuration",
                "self-managed/components/orchestration-cluster/tasklist/tasklist-custom-styling",
                "self-managed/components/orchestration-cluster/tasklist/user-task-access-restrictions",
              ],
            },
            {
              Identity: [
                "self-managed/components/orchestration-cluster/identity/overview",
                "self-managed/components/orchestration-cluster/identity/connect-external-identity-provider",
                "self-managed/components/orchestration-cluster/identity/debugging-authentication",
                "self-managed/components/orchestration-cluster/identity/special-oidc-cases",
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
              type: "category",
              label: "Web Modeler",
              link: {
                type: "doc",
                id: "self-managed/components/modeler/web-modeler/overview",
              },
              items: [
                {
                  type: "category",
                  label: "Configuration",
                  link: {
                    type: "doc",
                    id: "self-managed/components/modeler/web-modeler/configuration/configuration",
                  },
                  items: [
                    "self-managed/components/modeler/web-modeler/configuration/database",
                    "self-managed/components/modeler/web-modeler/configuration/identity",
                    "self-managed/components/modeler/web-modeler/configuration/logging",
                    "self-managed/components/modeler/web-modeler/configuration/ssl",
                    "self-managed/components/modeler/web-modeler/configuration/copilot",
                  ],
                },
                {
                  type: "category",
                  label: "Troubleshooting",
                  items: [
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
            "self-managed/components/connectors/performance",
          ],
        },
        {
          type: "category",
          label: "Management Identity",
          link: {
            type: "doc",
            id: "self-managed/components/management-identity/overview",
          },
          items: [
            "self-managed/components/management-identity/get-started",
            {
              type: "category",
              label: "Configuration",
              link: {
                type: "doc",
                id: "self-managed/components/management-identity/configuration/identity-configuration-overview",
              },
              items: [
                "self-managed/components/management-identity/configuration/connect-to-an-oidc-provider",
                "self-managed/components/management-identity/configuration/connect-to-an-existing-keycloak",
                "self-managed/components/management-identity/configuration/configure-external-identity-provider",
                "self-managed/components/management-identity/configuration/alternative-db",
              ],
            },
            "self-managed/components/management-identity/authentication",
            {
              type: "category",
              label: "Management",
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
                "self-managed/components/management-identity/mapping-rules",
                "self-managed/components/management-identity/manage-tenants",
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
                "self-managed/components/optimize/migration-update/camunda-8/8.7-to-8.8",
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
        {
          type: "category",
          label: "Components upgrade",
          link: {
            type: "doc",
            id: "self-managed/components/components-upgrade/introduction",
          },
          items: [
            "self-managed/components/components-upgrade/880-to-890",
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
      ],
    },
    {
      type: "category",
      label: "Upgrade to Camunda 8.9",
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
