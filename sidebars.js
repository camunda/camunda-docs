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
    "guides/setting-up-development-project",
    "guides/message-correlation",
    {
      "Update Guide": [
        "guides/update-guide/introduction",
        "guides/update-guide/026-to-100",
        "guides/update-guide/100-to-110",
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
      Clients: [
        "components/clients/overview",
        {
          "Java client": [
            "components/clients/java-client/index",
            "components/clients/java-client/job-worker",
            "components/clients/java-client/logging",
            "components/clients/java-client/testing",
            {
              Examples: [
                "components/clients/java-client-examples/index",
                "components/clients/java-client-examples/process-deploy",
                "components/clients/java-client-examples/process-instance-create",
                "components/clients/java-client-examples/process-instance-create-nonblocking",
                "components/clients/java-client-examples/process-instance-create-with-result",
                "components/clients/java-client-examples/job-worker-open",
                "components/clients/java-client-examples/data-pojo",
                "components/clients/java-client-examples/cluster-topology-request",
              ],
            },
          ],
        },
        {
          "Go client": [
            "components/clients/go-client/index",
            "components/clients/go-client/get-started",
          ],
        },
        {
          "CLI client": [
            "components/clients/cli-client/index",
            "components/clients/cli-client/get-started",
          ],
        },
        {
          "Community clients": [
            "components/clients/other-clients/index",
            "components/clients/other-clients/c-sharp",
            "components/clients/other-clients/javascript",
            "components/clients/other-clients/python",
            "components/clients/other-clients/ruby",
            "components/clients/other-clients/rust",
          ],
        },
        "components/clients/build-your-own-client",
      ],
      "Cloud Console": [
        "components/cloud-console/introduction",
        {
          "Manage your organization": [
            "components/cloud-console/manage-organization/organization-settings",
            "components/cloud-console/manage-organization/manage-users",
            "components/cloud-console/manage-organization/view-organization-activity",
            "components/cloud-console/manage-organization/manage-cloud-management-api-clients",
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
        "components/modeler/overview",
        {
          "Cloud Modeler": [
            "components/modeler/cloud-modeler/launch-cloud-modeler",
            "components/modeler/cloud-modeler/model-your-first-diagram",
            "components/modeler/cloud-modeler/import-diagram",
            "components/modeler/cloud-modeler/save-and-deploy",
            "components/modeler/cloud-modeler/start-instance",
            "components/modeler/cloud-modeler/model-overview",
          ],
          "Camunda Modeler": [
            "components/modeler/camunda-modeler/install-the-modeler",
            "components/modeler/camunda-modeler/model-your-first-diagram",
            "components/modeler/camunda-modeler/connect-to-camunda-cloud",
            "components/modeler/camunda-modeler/deploy-to-cloud",
            "components/modeler/camunda-modeler/start-instance",
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
          "Deployment guide": [
            "components/zeebe/deployment-guide/index",
            {
              "Local installation": [
                "components/zeebe/deployment-guide/local/install",
                "components/zeebe/deployment-guide/local/quickstart",
              ],
            },
            "components/zeebe/deployment-guide/docker/install",
            {
              "Kubernetes deployment": [
                "components/zeebe/deployment-guide/kubernetes/index",
                {
                  "Helm charts": [
                    "components/zeebe/deployment-guide/kubernetes/helm/index",
                    "components/zeebe/deployment-guide/kubernetes/helm/prerequisites",
                    "components/zeebe/deployment-guide/kubernetes/helm/installing-helm",
                    "components/zeebe/deployment-guide/kubernetes/helm/accessing-operate",
                  ],
                },
                "components/zeebe/deployment-guide/kubernetes/operator/zeebe-operator",
              ],
            },
            {
              "Getting started tutorial": [
                "components/zeebe/deployment-guide/getting-started/index",
                "components/zeebe/deployment-guide/getting-started/tutorial-setup",
                "components/zeebe/deployment-guide/getting-started/create-a-process",
                "components/zeebe/deployment-guide/getting-started/deploy-a-process",
                "components/zeebe/deployment-guide/getting-started/create-process-instance",
                "components/zeebe/deployment-guide/getting-started/next-steps-resources",
              ],
            },
            {
              Configuration: [
                "components/zeebe/deployment-guide/configuration/configuration",
                "components/zeebe/deployment-guide/configuration/logging",
                "components/zeebe/deployment-guide/configuration/gateway-health-probes",
                "components/zeebe/deployment-guide/configuration/environment-variables",
              ],
            },
            {
              Security: [
                "components/zeebe/deployment-guide/security/security",
                "components/zeebe/deployment-guide/security/authentication",
                "components/zeebe/deployment-guide/security/authorization",
              ],
            },
            {
              Operation: [
                "components/zeebe/deployment-guide/operations/index",
                "components/zeebe/deployment-guide/operations/resource-planning",
                "components/zeebe/deployment-guide/operations/network-ports",
                "components/zeebe/deployment-guide/operations/setting-up-a-cluster",
                "components/zeebe/deployment-guide/operations/metrics",
                "components/zeebe/deployment-guide/operations/health",
                "components/zeebe/deployment-guide/operations/backpressure",
                "components/zeebe/deployment-guide/operations/disk-space",
                "components/zeebe/deployment-guide/operations/update-zeebe",
              ],
            },
          ],
        },
        {
          "Open Source community": [
            "components/zeebe/open-source/community-contributions",
            "components/zeebe/open-source/get-help-get-involved",
          ],
        },
        {
          "Third-Party Libraries": [
            "components/zeebe/third-party-libraries/zeebe-dependencies",
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
          "Deployment guide": [
            "components/operate/deployment/install-and-start",
            "components/operate/deployment/configuration",
            "components/operate/deployment/data-retention",
            "components/operate/deployment/schema-and-migration",
            "components/operate/deployment/importer-and-archiver",
            "components/operate/deployment/authentication",
          ],
          "Third-Party Libraries": [
            "components/operate/third-party-libraries/operate-backend-dependencies",
            "components/operate/third-party-libraries/operate-frontend-dependencies",
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
                "components/tasklist/userguide/user-interface/camunda-forms",
              ],
            },
          ],
          "Deployment guide": [
            "components/tasklist/deployment/install-and-start",
            "components/tasklist/deployment/configuration",
            "components/tasklist/deployment/authentication",
          ],
          "Third-Party Libraries": [
            "components/tasklist/third-party-libraries/tasklist-backend-dependencies",
            "components/tasklist/third-party-libraries/tasklist-frontend-dependencies",
          ],
        },
      ],
      IAM: [
        "components/iam/what-is-iam",
          {
            "Getting started": [
              {
                "Running IAM with Docker": [
                  "components/iam/getting-started/docker/setup-environment",
                  "components/iam/getting-started/docker/start-iam",
                  "components/iam/getting-started/docker/accessing-the-ui",
                ]
              }
            ],
          }, {
            "Deployment": [
              "components/iam/deployment/configuration-variables",
            ],
          }, {
          "Third-Party Libraries": [
            "components/iam/third-party-libraries/backend-third-party-libraries",
            "components/iam/third-party-libraries/frontend-third-party-libraries",
          ],
        },
      ],
    },
    "components/best-practices",
  ],
  Reference: [
    "reference/overview",
    "reference/public-api",
    "reference/cloud-console-api-clients",
    "reference/cloud-console-api-reference",
    "reference/grpc",
    require("./docs/reference/tasklist-api/sidebar-schema"),
    {
      "BPMN processes": [
        "reference/bpmn-processes/bpmn-primer",
        "reference/bpmn-processes/bpmn-coverage",
        "reference/bpmn-processes/data-flow",
        {
          Tasks: [
            "reference/bpmn-processes/tasks",
            "reference/bpmn-processes/service-tasks/service-tasks",
            "reference/bpmn-processes/user-tasks/user-tasks",
            "reference/bpmn-processes/receive-tasks/receive-tasks",
            "reference/bpmn-processes/business-rule-tasks/business-rule-tasks",
            "reference/bpmn-processes/script-tasks/script-tasks",
            "reference/bpmn-processes/send-tasks/send-tasks",
            "reference/bpmn-processes/manual-tasks/manual-tasks",
          ],
        },
        {
          Gateways: [
            "reference/bpmn-processes/gateways",
            "reference/bpmn-processes/exclusive-gateways/exclusive-gateways",
            "reference/bpmn-processes/parallel-gateways/parallel-gateways",
            "reference/bpmn-processes/event-based-gateways/event-based-gateways",
          ],
        },
        {
          Events: [
            "reference/bpmn-processes/events",
            "reference/bpmn-processes/none-events/none-events",
            "reference/bpmn-processes/message-events/message-events",
            "reference/bpmn-processes/timer-events/timer-events",
            "reference/bpmn-processes/error-events/error-events",
          ],
        },
        {
          Subprocesses: [
            "reference/bpmn-processes/subprocesses",
            "reference/bpmn-processes/embedded-subprocesses/embedded-subprocesses",
            "reference/bpmn-processes/call-activities/call-activities",
            "reference/bpmn-processes/event-subprocesses/event-subprocesses",
          ],
        },
        {
          Markers: [
            "reference/bpmn-processes/markers",
            "reference/bpmn-processes/multi-instance/multi-instance",
          ],
        },
      ],
    },
    require("./docs/reference/feel/sidebar-schema"),
    "reference/glossary",
    "reference/announcements",
    "reference/licenses",
    "reference/notices",
    "reference/release-policy",
    "reference/supported-environments",
  ],
};
