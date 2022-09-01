function docsComponentsLink(label, href) {
  return {
    type: "link",
    label: label,
    href: `/docs/next/${href}`,
  };
}

module.exports = {
  Components: [
    docsComponentsLink("Overview Components", "components/"),

    {
      Concepts: [
        docsComponentsLink(
          "What is Camunda Platform 8?",
          "components/concepts/what-is-camunda-platform-8/"
        ),
        docsComponentsLink("Processes", "components/concepts/processes/"),
        docsComponentsLink("Job workers", "components/concepts/job-workers/"),
        docsComponentsLink(
          "Process instance creation",
          "components/concepts/process-instance-creation/"
        ),
        docsComponentsLink("Messages", "components/concepts/messages/"),
        docsComponentsLink("Incidents", "components/concepts/incidents/"),
        docsComponentsLink("Variables", "components/concepts/variables/"),
        docsComponentsLink("Expressions", "components/concepts/expressions/"),
        docsComponentsLink(
          "Workflow patterns",
          "components/concepts/workflow-patterns/"
        ),
      ],
    },

    {
      Console: [
        docsComponentsLink(
          "Introduction to Camunda Platform Console",
          "components/console/introduction-to-console/"
        ),

        {
          "Manage your organization": [
            docsComponentsLink(
              "Organization management",
              "components/console/manage-organization/organization-settings/"
            ),
            docsComponentsLink(
              "Manage users of your organization",
              "components/console/manage-organization/manage-users/"
            ),
            docsComponentsLink(
              "View organization activity",
              "components/console/manage-organization/view-organization-activity/"
            ),
            docsComponentsLink(
              "Usage history",
              "components/console/manage-organization/usage-history/"
            ),
            docsComponentsLink(
              "Update billing reservations",
              "components/console/manage-organization/update-billing-reservations/"
            ),
            docsComponentsLink(
              "Switch organization",
              "components/console/manage-organization/switch-organization/"
            ),
          ],
        },

        {
          "Manage clusters": [
            docsComponentsLink(
              "Create a cluster",
              "components/console/manage-clusters/create-cluster/"
            ),
            docsComponentsLink(
              "Rename your cluster",
              "components/console/manage-clusters/rename-cluster/"
            ),
            docsComponentsLink(
              "Delete your cluster",
              "components/console/manage-clusters/delete-cluster/"
            ),
            docsComponentsLink(
              "Manage API clients",
              "components/console/manage-clusters/manage-api-clients/"
            ),
            docsComponentsLink(
              "Manage alerts",
              "components/console/manage-clusters/manage-alerts/"
            ),
            docsComponentsLink(
              "Manage IP Whitelists",
              "components/console/manage-clusters/manage-ip-whitelists/"
            ),
            docsComponentsLink(
              "Manage secrets",
              "components/console/manage-clusters/manage-secrets/"
            ),
          ],
        },

        {
          "Manage your plan": [
            docsComponentsLink(
              "Available plans",
              "components/console/manage-plan/available-plans/"
            ),
            docsComponentsLink(
              "Upgrade to a Professional Plan",
              "components/console/manage-plan/upgrade-to-professional-plan/"
            ),
          ],
        },

        {
          Troubleshooting: [
            docsComponentsLink(
              "Common pitfalls",
              "components/console/console-troubleshooting/common-pitfalls/"
            ),
            docsComponentsLink(
              "Feedback and support",
              "components/console/console-troubleshooting/feedback-and-support/"
            ),
          ],
        },
      ],
    },

    {
      Modeler: [
        docsComponentsLink(
          "About Modeler",
          "components/modeler/about-modeler/"
        ),

        {
          "Web Modeler": [
            docsComponentsLink(
              "New Web Modeler",
              "components/modeler/web-modeler/new-web-modeler/"
            ),
            docsComponentsLink(
              "Launch Web Modeler",
              "components/modeler/web-modeler/launch-cloud-modeler/"
            ),
            docsComponentsLink(
              "Model your first diagram",
              "components/modeler/web-modeler/model-your-first-diagram/"
            ),
            docsComponentsLink(
              "Import diagram",
              "components/modeler/web-modeler/import-diagram/"
            ),
            docsComponentsLink(
              "Fix problems in your diagram",
              "components/modeler/web-modeler/fix-problems-in-your-diagram/"
            ),
            docsComponentsLink(
              "Save and deploy your diagram",
              "components/modeler/web-modeler/save-and-deploy/"
            ),
            docsComponentsLink(
              "Start a new process instance",
              "components/modeler/web-modeler/start-instance/"
            ),
            docsComponentsLink(
              "Collaboration",
              "components/modeler/web-modeler/collaboration/"
            ),
            docsComponentsLink(
              "Milestones",
              "components/modeler/web-modeler/milestones/"
            ),
            docsComponentsLink(
              "Token simulation",
              "components/modeler/web-modeler/token-simulation/"
            ),

            {
              "Advanced modeling": [
                docsComponentsLink(
                  "Call activity linking",
                  "components/modeler/web-modeler/advanced-modeling/call-activity-linking/"
                ),
              ],
            },
          ],
        },

        {
          "Desktop Modeler": [
            docsComponentsLink(
              "Install the Modeler",
              "components/modeler/desktop-modeler/install-the-modeler/"
            ),
            docsComponentsLink(
              "Model your first diagram",
              "components/modeler/desktop-modeler/model-your-first-diagram/"
            ),
            docsComponentsLink(
              "Deploy your first diagram",
              "components/modeler/desktop-modeler/connect-to-camunda-cloud/"
            ),
            docsComponentsLink(
              "Start a new process instance",
              "components/modeler/desktop-modeler/start-instance/"
            ),

            {
              "Element templates": [
                docsComponentsLink(
                  "About element templates",
                  "components/modeler/desktop-modeler/element-templates/about-templates/"
                ),
                docsComponentsLink(
                  "Configuring templates",
                  "components/modeler/desktop-modeler/element-templates/configuring-templates/"
                ),
                docsComponentsLink(
                  "Using templates",
                  "components/modeler/desktop-modeler/element-templates/using-templates/"
                ),
                docsComponentsLink(
                  "Defining templates",
                  "components/modeler/desktop-modeler/element-templates/defining-templates/"
                ),
                docsComponentsLink(
                  "Additional resources",
                  "components/modeler/desktop-modeler/element-templates/additional-resources/"
                ),
              ],
            },

            {
              "Additional configuration": [
                docsComponentsLink(
                  "Flags",
                  "components/modeler/desktop-modeler/flags/"
                ),
                docsComponentsLink(
                  "Plugins",
                  "components/modeler/desktop-modeler/plugins/"
                ),
                docsComponentsLink(
                  "Search paths",
                  "components/modeler/desktop-modeler/search-paths/"
                ),
                docsComponentsLink(
                  "Telemetry",
                  "components/modeler/desktop-modeler/telemetry/"
                ),
              ],
            },
          ],
        },

        {
          BPMN: [
            docsComponentsLink("BPMN in Modeler", "components/modeler/bpmn/"),
            docsComponentsLink(
              "BPMN primer",
              "components/modeler/bpmn/bpmn-primer/"
            ),
            docsComponentsLink(
              "BPMN coverage",
              "components/modeler/bpmn/bpmn-coverage/"
            ),
            docsComponentsLink(
              "Data flow",
              "components/modeler/bpmn/data-flow/"
            ),

            {
              Tasks: [
                docsComponentsLink(
                  "Overview",
                  "components/modeler/bpmn/tasks/"
                ),
                docsComponentsLink(
                  "Service tasks",
                  "components/modeler/bpmn/service-tasks/"
                ),
                docsComponentsLink(
                  "User tasks",
                  "components/modeler/bpmn/user-tasks/"
                ),
                docsComponentsLink(
                  "Receive tasks",
                  "components/modeler/bpmn/receive-tasks/"
                ),
                docsComponentsLink(
                  "Business rule tasks",
                  "components/modeler/bpmn/business-rule-tasks/"
                ),
                docsComponentsLink(
                  "Script tasks",
                  "components/modeler/bpmn/script-tasks/"
                ),
                docsComponentsLink(
                  "Send tasks",
                  "components/modeler/bpmn/send-tasks/"
                ),
                docsComponentsLink(
                  "Manual tasks",
                  "components/modeler/bpmn/manual-tasks/"
                ),
              ],
            },

            {
              Gateways: [
                docsComponentsLink(
                  "Overview",
                  "components/modeler/bpmn/gateways/"
                ),
                docsComponentsLink(
                  "Exclusive gateway",
                  "components/modeler/bpmn/exclusive-gateways/"
                ),
                docsComponentsLink(
                  "Parallel gateway",
                  "components/modeler/bpmn/parallel-gateways/"
                ),
                docsComponentsLink(
                  "Event-based gateway",
                  "components/modeler/bpmn/event-based-gateways/"
                ),
              ],
            },

            {
              Events: [
                docsComponentsLink(
                  "Overview",
                  "components/modeler/bpmn/events/"
                ),
                docsComponentsLink(
                  "None events",
                  "components/modeler/bpmn/none-events/"
                ),
                docsComponentsLink(
                  "Message events",
                  "components/modeler/bpmn/message-events/"
                ),
                docsComponentsLink(
                  "Timer events",
                  "components/modeler/bpmn/timer-events/"
                ),
                docsComponentsLink(
                  "Error events",
                  "components/modeler/bpmn/error-events/"
                ),
              ],
            },

            {
              Subprocesses: [
                docsComponentsLink(
                  "Overview",
                  "components/modeler/bpmn/subprocesses/"
                ),
                docsComponentsLink(
                  "Embedded subprocess",
                  "components/modeler/bpmn/embedded-subprocesses/"
                ),
                docsComponentsLink(
                  "Call activities",
                  "components/modeler/bpmn/call-activities/"
                ),
                docsComponentsLink(
                  "Event subprocess",
                  "components/modeler/bpmn/event-subprocesses/"
                ),
              ],
            },

            {
              Markers: [
                docsComponentsLink(
                  "Overview",
                  "components/modeler/bpmn/markers/"
                ),
                docsComponentsLink(
                  "Multi-instance",
                  "components/modeler/bpmn/multi-instance/"
                ),
              ],
            },
          ],
        },

        {
          DMN: [
            docsComponentsLink("DMN in Modeler", "components/modeler/dmn/"),
            docsComponentsLink(
              "Decision requirements graph",
              "components/modeler/dmn/decision-requirements-graph/"
            ),

            {
              "Decision table": [
                docsComponentsLink(
                  "Overview",
                  "components/modeler/dmn/decision-table/"
                ),
                docsComponentsLink(
                  "Input",
                  "components/modeler/dmn/decision-table-input/"
                ),
                docsComponentsLink(
                  "Output",
                  "components/modeler/dmn/decision-table-output/"
                ),
                docsComponentsLink(
                  "Rule",
                  "components/modeler/dmn/decision-table-rule/"
                ),
                docsComponentsLink(
                  "Hit policy",
                  "components/modeler/dmn/decision-table-hit-policy/"
                ),
              ],
            },

            docsComponentsLink(
              "Decision literal expression",
              "components/modeler/dmn/decision-literal-expression/"
            ),
            docsComponentsLink(
              "Data types",
              "components/modeler/dmn/dmn-data-types/"
            ),
          ],
        },

        {
          "FEEL expressions": [
            docsComponentsLink(
              "What is FEEL?",
              "components/modeler/feel/what-is-feel/"
            ),
            docsComponentsLink(
              "Data types",
              "components/modeler/feel/language-guide/feel-data-types/"
            ),
            docsComponentsLink(
              "Unary-tests",
              "components/modeler/feel/language-guide/feel-unary-tests/"
            ),

            {
              Expressions: [
                docsComponentsLink(
                  "Introduction",
                  "components/modeler/feel/language-guide/feel-expressions-introduction/"
                ),
                docsComponentsLink(
                  "Boolean expressions",
                  "components/modeler/feel/language-guide/feel-boolean-expressions/"
                ),
                docsComponentsLink(
                  "String expressions",
                  "components/modeler/feel/language-guide/feel-string-expressions/"
                ),
                docsComponentsLink(
                  "Numeric expressions",
                  "components/modeler/feel/language-guide/feel-numeric-expressions/"
                ),
                docsComponentsLink(
                  "List expressions",
                  "components/modeler/feel/language-guide/feel-list-expressions/"
                ),
                docsComponentsLink(
                  "Context expressions",
                  "components/modeler/feel/language-guide/feel-context-expressions/"
                ),
                docsComponentsLink(
                  "Temporal expressions",
                  "components/modeler/feel/language-guide/feel-temporal-expressions/"
                ),
                docsComponentsLink(
                  "Variables",
                  "components/modeler/feel/language-guide/feel-variables/"
                ),
                docsComponentsLink(
                  "Control flow",
                  "components/modeler/feel/language-guide/feel-control-flow/"
                ),
                docsComponentsLink(
                  "Functions",
                  "components/modeler/feel/language-guide/feel-functions/"
                ),
              ],
            },

            {
              "Built-in Functions": [
                docsComponentsLink(
                  "Introduction",
                  "components/modeler/feel/builtin-functions/feel-built-in-functions-introduction/"
                ),
                docsComponentsLink(
                  "Conversion functions",
                  "components/modeler/feel/builtin-functions/feel-built-in-functions-conversion/"
                ),
                docsComponentsLink(
                  "Boolean functions",
                  "components/modeler/feel/builtin-functions/feel-built-in-functions-boolean/"
                ),
                docsComponentsLink(
                  "String functions",
                  "components/modeler/feel/builtin-functions/feel-built-in-functions-string/"
                ),
                docsComponentsLink(
                  "Numeric functions",
                  "components/modeler/feel/builtin-functions/feel-built-in-functions-numeric/"
                ),
                docsComponentsLink(
                  "List functions",
                  "components/modeler/feel/builtin-functions/feel-built-in-functions-list/"
                ),
                docsComponentsLink(
                  "Context functions",
                  "components/modeler/feel/builtin-functions/feel-built-in-functions-context/"
                ),
                docsComponentsLink(
                  "Temporal functions",
                  "components/modeler/feel/builtin-functions/feel-built-in-functions-temporal/"
                ),
                docsComponentsLink(
                  "Range functions",
                  "components/modeler/feel/builtin-functions/feel-built-in-functions-range/"
                ),
              ],
            },
          ],
        },

        {
          Forms: [
            docsComponentsLink(
              "Camunda Forms reference",
              "components/modeler/forms/camunda-forms-reference/"
            ),
          ],
        },
      ],
    },

    {
      Zeebe: [
        docsComponentsLink("Introduction", "components/zeebe/zeebe-overview/"),

        {
          "Technical concepts": [
            docsComponentsLink(
              "Overview",
              "components/zeebe/technical-concepts/technical-concepts-overview/"
            ),
            docsComponentsLink(
              "Architecture",
              "components/zeebe/technical-concepts/architecture/"
            ),
            docsComponentsLink(
              "Clustering",
              "components/zeebe/technical-concepts/clustering/"
            ),
            docsComponentsLink(
              "Partitions",
              "components/zeebe/technical-concepts/partitions/"
            ),
            docsComponentsLink(
              "Internal processing",
              "components/zeebe/technical-concepts/internal-processing/"
            ),
            docsComponentsLink(
              "Process lifecycles",
              "components/zeebe/technical-concepts/process-lifecycles/"
            ),
            docsComponentsLink(
              "Protocols",
              "components/zeebe/technical-concepts/protocols/"
            ),
          ],
        },

        {
          "Open source community": [
            docsComponentsLink(
              "Community contributions",
              "components/zeebe/open-source/community-contributions/"
            ),
            docsComponentsLink(
              "Get help and get involved",
              "components/zeebe/open-source/get-help-get-involved/"
            ),
          ],
        },
      ],
    },

    {
      Operate: [
        docsComponentsLink(
          "Introduction",
          "components/operate/operate-introduction/"
        ),

        {
          "User guide": [
            docsComponentsLink(
              "Getting familiar with Operate",
              "components/operate/userguide/basic-operate-navigation/"
            ),
            docsComponentsLink(
              "Variables and incidents",
              "components/operate/userguide/resolve-incidents-update-variables/"
            ),
            docsComponentsLink(
              "Selections and operations",
              "components/operate/userguide/selections-operations/"
            ),
            docsComponentsLink(
              "Delete finished instances",
              "components/operate/userguide/delete-finished-instances/"
            ),
            docsComponentsLink(
              "Giving feedback and asking questions",
              "components/operate/userguide/operate-feedback-and-questions/"
            ),
          ],
        },
      ],
    },

    {
      Optimize: [
        "what-is-optimize",

        {
          "User guide": [
            "userguide/collections-dashboards-reports",
            "userguide/data-sources",

            {
              Dashboards: [
                "userguide/creating-dashboards",
                "userguide/edit-mode",
                "userguide/view-mode",
              ],
            },
            "userguide/creating-reports",
            "userguide/combined-process-reports",
            "userguide/processes",

            {
              "Process analysis": [
                "userguide/process-analysis/process-analysis-overview",
                "userguide/process-analysis/outlier-analysis",
                "userguide/process-analysis/branch-analysis",
                {
                  "Report analysis": [
                    "userguide/process-analysis/report-analysis/overview",
                    {
                      "Edit mode": [
                        "userguide/process-analysis/report-analysis/edit-mode",
                        "userguide/process-analysis/report-analysis/select-process-definitions",
                        "userguide/process-analysis/report-analysis/define-reports",
                        "userguide/process-analysis/report-analysis/measures",
                        "userguide/process-analysis/report-analysis/compare-target-values",
                        "userguide/process-analysis/report-analysis/process-instance-parts",
                        "userguide/process-analysis/report-analysis/configure-reports",
                      ],
                    },

                    "userguide/process-analysis/report-analysis/view-mode",
                  ],
                },

                {
                  Filters: [
                    "userguide/process-analysis/filters",
                    "userguide/process-analysis/metadata-filters",
                    "userguide/process-analysis/instance-state-filters",
                    "userguide/process-analysis/flow-node-filters",
                    "userguide/process-analysis/process-instance-filters",
                    "userguide/process-analysis/variable-filters",
                  ],
                },
              ],
            },

            {
              "Decision analysis": [
                "userguide/decision-analysis/decision-analysis-overview",
                "userguide/decision-analysis/decision-report",
                "userguide/decision-analysis/decision-filter",
              ],
            },

            {
              "Additional features": [
                "userguide/additional-features/alerts",
                "userguide/additional-features/event-based-processes",
                "userguide/additional-features/export-import",
                "userguide/additional-features/footer",
                "userguide/additional-features/variable-labeling",
              ],
            },
          ],
        },
      ],
    },

    {
      Tasklist: [
        docsComponentsLink(
          "Introduction",
          "components/tasklist/introduction-to-tasklist/"
        ),

        {
          "User guide": [
            docsComponentsLink(
              "Overview and example use case",
              "components/tasklist/userguide/using-tasklist/"
            ),
            docsComponentsLink(
              "Updating Tasklist",
              "components/tasklist/userguide/updating-tasklist-cloud/"
            ),
          ],
        },
      ],
    },

    {
      "Integration Framework": [
        docsComponentsLink(
          "Introduction",
          "components/integration-framework/introduction-to-connectors/"
        ),

        {
          Connectors: [
            docsComponentsLink(
              "Use Connectors",
              "components/integration-framework/connectors/use-connectors/"
            ),

            {
              "Out-of-the-box Connectors": [
                docsComponentsLink(
                  "Overview",
                  "components/integration-framework/connectors/out-of-the-box-connectors/available-connectors-overview/"
                ),
                docsComponentsLink(
                  "REST Connector",
                  "components/integration-framework/connectors/out-of-the-box-connectors/rest/"
                ),
                docsComponentsLink(
                  "SendGrid Connector",
                  "components/integration-framework/connectors/out-of-the-box-connectors/sendgrid/"
                ),
                docsComponentsLink(
                  "Slack Connector",
                  "components/integration-framework/connectors/out-of-the-box-connectors/slack/"
                ),
              ],
            },

            {
              "Custom-built Connectors": [
                docsComponentsLink(
                  "Connector templates",
                  "components/integration-framework/connectors/custom-built-connectors/connector-templates/"
                ),
                docsComponentsLink(
                  "Connector SDK",
                  "components/integration-framework/connectors/custom-built-connectors/connector-sdk/"
                ),
              ],
            },
          ],
        },
      ],
    },

    {
      "Best Practices": [
        docsComponentsLink(
          "Overview",
          "components/best-practices/best-practices-overview/"
        ),

        {
          "Project management": [
            docsComponentsLink(
              "Following the customer success path",
              "components/best-practices/management/following-the-customer-success-path/"
            ),
            docsComponentsLink(
              "Doing a proper POC",
              "components/best-practices/management/doing-a-proper-poc/"
            ),
          ],
        },

        {
          Architecture: [
            docsComponentsLink(
              "Deciding about your stack",
              "components/best-practices/architecture/deciding-about-your-stack/"
            ),
            docsComponentsLink(
              "Sizing your environment",
              "components/best-practices/architecture/sizing-your-environment/"
            ),
            docsComponentsLink(
              "Understanding human task management",
              "components/best-practices/architecture/understanding-human-tasks-management/"
            ),
          ],
        },

        {
          Development: [
            docsComponentsLink(
              "Connecting the workflow engine with your world",
              "components/best-practices/development/connecting-the-workflow-engine-with-your-world/"
            ),
            docsComponentsLink(
              "Service integration patterns with BPMN",
              "components/best-practices/development/service-integration-patterns/"
            ),
            docsComponentsLink(
              "Writing good workers",
              "components/best-practices/development/writing-good-workers/"
            ),
            docsComponentsLink(
              "Dealing with problems and exceptions",
              "components/best-practices/development/dealing-with-problems-and-exceptions/"
            ),
            docsComponentsLink(
              "Handling data in processes",
              "components/best-practices/development/handling-data-in-processes/"
            ),
            docsComponentsLink(
              "Routing events to processes",
              "components/best-practices/development/routing-events-to-processes/"
            ),
            docsComponentsLink(
              "Testing process definitions",
              "components/best-practices/development/testing-process-definitions/"
            ),
          ],
        },

        {
          Modeling: [
            docsComponentsLink(
              "Creating readable process models",
              "components/best-practices/modeling/creating-readable-process-models/"
            ),
            docsComponentsLink(
              "Naming BPMN elements",
              "components/best-practices/modeling/naming-bpmn-elements/"
            ),
            docsComponentsLink(
              "Naming technically relevant IDs",
              "components/best-practices/modeling/naming-technically-relevant-ids/"
            ),
            docsComponentsLink(
              "Modeling beyond the happy path",
              "components/best-practices/modeling/modeling-beyond-the-happy-path/"
            ),
            docsComponentsLink(
              "Modeling with situation patterns",
              "components/best-practices/modeling/modeling-with-situation-patterns/"
            ),
            docsComponentsLink(
              "Building flexibility into BPMN models",
              "components/best-practices/modeling/building-flexibility-into-bpmn-models/"
            ),
            docsComponentsLink(
              "Choosing the DMN hit policy",
              "components/best-practices/modeling/choosing-the-dmn-hit-policy/"
            ),
          ],
        },

        {
          Operations: [
            docsComponentsLink(
              "Versioning process definitions",
              "components/best-practices/operations/versioning-process-definitions/"
            ),
            docsComponentsLink(
              "Reporting about processes",
              "components/best-practices/operations/reporting-about-processes/"
            ),
          ],
        },

        {
          "Camunda 7 specific": [
            docsComponentsLink(
              "Deciding about your Camunda 7 stack",
              "components/best-practices/architecture/deciding-about-your-stack-c7/"
            ),
            docsComponentsLink(
              "Sizing your Camunda 7 environment",
              "components/best-practices/architecture/sizing-your-environment-c7/"
            ),
            docsComponentsLink(
              "Invoking services from a Camunda 7 process",
              "components/best-practices/development/invoking-services-from-the-process-c7/"
            ),
            docsComponentsLink(
              "Understanding Camunda 7 transaction handling",
              "components/best-practices/development/understanding-transaction-handling-c7/"
            ),
            docsComponentsLink(
              "Operating Camunda 7",
              "components/best-practices/operations/operating-camunda-c7/"
            ),
            docsComponentsLink(
              "Performance tuning Camunda 7",
              "components/best-practices/operations/performance-tuning-camunda-c7/"
            ),
            docsComponentsLink(
              "Securing Camunda 7",
              "components/best-practices/operations/securing-camunda-c7/"
            ),
            docsComponentsLink(
              "Extending human task management in Camunda 7",
              "components/best-practices/architecture/extending-human-task-management-c7/"
            ),
          ],
        },
      ],
    },
  ],
};
