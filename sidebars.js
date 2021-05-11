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
    {
        "Update Guide": [
            "guides/update-guide/introduction",
            "guides/update-guide/026-to-100",
        ]
	}
  ],
  "Product Manuals": [
    "product-manuals/overview",
    {
      Concepts: [
        "product-manuals/concepts/what-is-camunda-cloud",
        "product-manuals/concepts/processes",
        "product-manuals/concepts/job-workers",
        "product-manuals/concepts/process-instance-creation",
        "product-manuals/concepts/messages",
        "product-manuals/concepts/incidents",
        "product-manuals/concepts/variables",
        "product-manuals/concepts/expressions",
      ],
      Clients: [
        "product-manuals/clients/overview",
        {
          "Java client": [
            "product-manuals/clients/java-client/index",
            "product-manuals/clients/java-client/logging",
            "product-manuals/clients/java-client/testing",
            {
              "Examples": [
                "product-manuals/clients/java-client-examples/index",
                "product-manuals/clients/java-client-examples/process-deploy",
                "product-manuals/clients/java-client-examples/process-instance-create",
                "product-manuals/clients/java-client-examples/process-instance-create-nonblocking",
                "product-manuals/clients/java-client-examples/process-instance-create-with-result",
                "product-manuals/clients/java-client-examples/job-worker-open",
                "product-manuals/clients/java-client-examples/data-pojo",
                "product-manuals/clients/java-client-examples/cluster-topology-request",
              ],
            },
          ],
        },
        {
          "Go client": [
            "product-manuals/clients/go-client/index",
            "product-manuals/clients/go-client/get-started",
          ]
        },
        {
          "CLI client": [
            "product-manuals/clients/cli-client/index",
            "product-manuals/clients/cli-client/get-started"
          ]
        },
        {
          "Community clients": [
            "product-manuals/clients/other-clients/index",
            "product-manuals/clients/other-clients/c-sharp",
            "product-manuals/clients/other-clients/javascript",
            "product-manuals/clients/other-clients/python",
            "product-manuals/clients/other-clients/ruby",
            "product-manuals/clients/other-clients/rust",
          ],
        },
        "product-manuals/clients/build-your-own-client",
      ],
      "Cloud Console": [
        "product-manuals/cloud-console/introduction",
        {
          "Manage your organization": [
            "product-manuals/cloud-console/manage-organization/organization-settings",
            "product-manuals/cloud-console/manage-organization/manage-users",
            "product-manuals/cloud-console/manage-organization/view-organization-activity",
            "product-manuals/cloud-console/manage-organization/manage-cloud-management-api-clients",
            "product-manuals/cloud-console/manage-organization/update-billing-reservations",
            "product-manuals/cloud-console/manage-organization/switch-organization",
          ],
        },
        {
          "Manage clusters": [
            "product-manuals/cloud-console/manage-clusters/create-cluster",
            "product-manuals/cloud-console/manage-clusters/rename-cluster",
            "product-manuals/cloud-console/manage-clusters/delete-cluster",
            "product-manuals/cloud-console/manage-clusters/manage-api-clients",
            "product-manuals/cloud-console/manage-clusters/manage-alerts",
          ],
        },
        {
          "Manage your plan": [
            "product-manuals/cloud-console/manage-plan/available-plans",
            "product-manuals/cloud-console/manage-plan/upgrade-to-professional-plan",
          ],
        },
        {
          Troubleshooting: [
            "product-manuals/cloud-console/troubleshooting/common-pitfalls",
            "product-manuals/cloud-console/troubleshooting/feedback-and-support",
          ],
        },
      ],
      Modeler: [
        "product-manuals/modeler/overview",
        {
          "Cloud Modeler": [
            "product-manuals/modeler/cloud-modeler/launch-cloud-modeler",
            "product-manuals/modeler/cloud-modeler/model-your-first-diagram",
            "product-manuals/modeler/cloud-modeler/import-diagram",
            "product-manuals/modeler/cloud-modeler/save-and-deploy",
            "product-manuals/modeler/cloud-modeler/start-instance",
            "product-manuals/modeler/cloud-modeler/model-overview",
          ],
          "Camunda Modeler": [
            "product-manuals/modeler/camunda-modeler/install-the-modeler",
            "product-manuals/modeler/camunda-modeler/model-your-first-diagram",
            "product-manuals/modeler/camunda-modeler/connect-to-camunda-cloud",
            "product-manuals/modeler/camunda-modeler/deploy-to-cloud",
            "product-manuals/modeler/camunda-modeler/start-instance",
          ],
        },
      ],
      Zeebe: [
        "product-manuals/zeebe/zeebe-overview",
        {
          "Technical concepts": [
            "product-manuals/zeebe/technical-concepts/index",
            "product-manuals/zeebe/technical-concepts/architecture",
            "product-manuals/zeebe/technical-concepts/clustering",
            "product-manuals/zeebe/technical-concepts/partitions",
            "product-manuals/zeebe/technical-concepts/internal-processing",
            "product-manuals/zeebe/technical-concepts/process-lifecycles",
            "product-manuals/zeebe/technical-concepts/protocols",
            "product-manuals/zeebe/technical-concepts/exporters",
          ],
        },
        {
          "Deployment guide": [
            "product-manuals/zeebe/deployment-guide/index",
            {
              "Local installation": [
                "product-manuals/zeebe/deployment-guide/local/install",
                "product-manuals/zeebe/deployment-guide/local/quickstart",
              ]
            },
            "product-manuals/zeebe/deployment-guide/docker/install",
            {
              "Kubernetes deployment": [
                "product-manuals/zeebe/deployment-guide/kubernetes/index",
                {
                  "Helm charts": [
                    "product-manuals/zeebe/deployment-guide/kubernetes/helm/index",
                    "product-manuals/zeebe/deployment-guide/kubernetes/helm/prerequisites",
                    "product-manuals/zeebe/deployment-guide/kubernetes/helm/installing-helm",
                    "product-manuals/zeebe/deployment-guide/kubernetes/helm/accessing-operate",
                  ]
                },
                "product-manuals/zeebe/deployment-guide/kubernetes/operator/zeebe-operator",
              ],
            },
            {
              "Getting started tutorial": [
                "product-manuals/zeebe/deployment-guide/getting-started/index",
                "product-manuals/zeebe/deployment-guide/getting-started/tutorial-setup",
                "product-manuals/zeebe/deployment-guide/getting-started/create-a-process",
                "product-manuals/zeebe/deployment-guide/getting-started/deploy-a-process",
                "product-manuals/zeebe/deployment-guide/getting-started/create-process-instance",
                "product-manuals/zeebe/deployment-guide/getting-started/next-steps-resources",
              ],
            },
            {
              Configuration: [
                "product-manuals/zeebe/deployment-guide/configuration/configuration",
                "product-manuals/zeebe/deployment-guide/configuration/logging",
                "product-manuals/zeebe/deployment-guide/configuration/gateway-health-probes",
                "product-manuals/zeebe/deployment-guide/configuration/environment-variables",
              ]
            },
            {
              Security: [
                "product-manuals/zeebe/deployment-guide/security/security",
                "product-manuals/zeebe/deployment-guide/security/authentication",
                "product-manuals/zeebe/deployment-guide/security/authorization",
              ],
            },
            {
              Operation: [
                "product-manuals/zeebe/deployment-guide/operations/index",
                "product-manuals/zeebe/deployment-guide/operations/resource-planning",
                "product-manuals/zeebe/deployment-guide/operations/network-ports",
                "product-manuals/zeebe/deployment-guide/operations/setting-up-a-cluster",
                "product-manuals/zeebe/deployment-guide/operations/metrics",
                "product-manuals/zeebe/deployment-guide/operations/health",
                "product-manuals/zeebe/deployment-guide/operations/backpressure",
                "product-manuals/zeebe/deployment-guide/operations/disk-space",
                "product-manuals/zeebe/deployment-guide/operations/update-zeebe",
              ],
            },
          ]
        },
        {
          "Open Source community": [
            "product-manuals/zeebe/open-source/community-contributions",
            "product-manuals/zeebe/open-source/get-help-get-involved",
          ]
        },
        {
            "Third-Party Libraries": [
               "product-manuals/zeebe/third-party-libraries/zeebe-dependencies",
            ]
        },
        {
          Appendix: [

          ],
        },
      ],
      Operate: [
         "product-manuals/operate/index",{
            "User guide":[
              "product-manuals/operate/userguide/basic-operate-navigation",
              "product-manuals/operate/userguide/resolve-incidents-update-variables",
              "product-manuals/operate/userguide/selections-operations",
              "product-manuals/operate/userguide/operate-feedback-and-questions"
            ],
            "Deployment guide": [
               "product-manuals/operate/deployment/install-and-start",
               "product-manuals/operate/deployment/configuration",
               "product-manuals/operate/deployment/data-retention",
               "product-manuals/operate/deployment/schema-and-migration",
               "product-manuals/operate/deployment/importer-and-archiver",
               "product-manuals/operate/deployment/authentication"
            ],
            "Third-Party Libraries": [
               "product-manuals/operate/third-party-libraries/operate-backend-dependencies",
               "product-manuals/operate/third-party-libraries/operate-frontend-dependencies"
            ],
         }
      ],
      Tasklist: [
      "product-manuals/tasklist/introduction",{
          "User guide": [
            "product-manuals/tasklist/userguide/overview",
            "product-manuals/tasklist/userguide/camunda-forms",
          ],
          "Deployment guide": [
            "product-manuals/tasklist/deployment/install-and-start",
            "product-manuals/tasklist/deployment/configuration",
            "product-manuals/tasklist/deployment/authentication",
            "product-manuals/tasklist/deployment/api-client",
          ],
          "Third-Party Libraries": [
            "product-manuals/tasklist/third-party-libraries/tasklist-backend-dependencies",
            "product-manuals/tasklist/third-party-libraries/tasklist-frontend-dependencies"
          ],
        },
      ],
    },
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
  ]
};
