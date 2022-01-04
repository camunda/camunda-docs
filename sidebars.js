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
