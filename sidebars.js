module.exports = {
  Guides: [
    "guides/introcution-to-camunda-cloud",
    {
      "Getting started with Camunda Cloud": [
        "guides/getting-started/create-camunda-cloud-account",
        "guides/getting-started/create-cluster",
        "guides/getting-started/setup-client-connection-credentials",
        "guides/getting-started/connect-to-your-cluster",
        "guides/getting-started/model-your-first-process",
        "guides/getting-started/deploy-your-process-and-start-process-instance",
        "guides/getting-started/implement-service-task",
        "guides/getting-started/implement-decision-gateway",
        "guides/getting-started/involve-humans",
        "guides/getting-started/monitor-your-process-in-operate",
      ],
    },
    "guides/setting-up-development-project",
  ],
  "Product Manuals": [
    "product-manuals/overview",
    {
      Clients: [
        {
          NodeJS: ["product-manuals/clients/nodejs/install-the-nodejs-client"],
        },
        "product-manuals/clients/build-your-own-client",
      ],
      "Cloud Console": [
        "product-manuals/cloud-console/overview",
        {
          "Manage your Cloud Account": [
            "guides/getting-started/create-camunda-cloud-account",
            "product-manuals/cloud-console/manage-cloud-account/administrate-account",
          ],
        },
        {
          "Manage Clusters": [
            "product-manuals/cloud-console/manage-clusters/create-cluster",
            "product-manuals/cloud-console/manage-clusters/manage-client-connections",
            "reference/cloud-console-api/cloud-console-api-reference",
          ],
        },
        {
          "Manage your Plan": [
            "product-manuals/cloud-console/manage-plan/available-plans",
            "product-manuals/cloud-console/manage-plan/trial-plan",
            "product-manuals/cloud-console/manage-plan/professional-plan",
          ],
        },
      ],
      Modeler: ["product-manuals/modeler/install-the-modeler"],
      "Zeebe Engine": [
        "product-manuals/zeebe/zeebe-overview",
        {
          Introduction: [
            "product-manuals/zeebe/introduction/index",
            "product-manuals/zeebe/introduction/what-is-zeebe",
            "product-manuals/zeebe/introduction/install",
            "product-manuals/zeebe/introduction/quickstart",
            "product-manuals/zeebe/introduction/community-contributions",
            "product-manuals/zeebe/introduction/get-help-get-involved",
            "product-manuals/zeebe/introduction/release-cycle",
          ],
        },
        {
          Basics: [
            "product-manuals/zeebe/basics/index",
            "product-manuals/zeebe/basics/architecture",
            "product-manuals/zeebe/basics/workflows",
            "product-manuals/zeebe/basics/job-workers",
            "product-manuals/zeebe/basics/partitions",
            "product-manuals/zeebe/basics/protocols",
            "product-manuals/zeebe/basics/internal-processing",
            "product-manuals/zeebe/basics/exporters",
            "product-manuals/zeebe/basics/clustering",
          ],
        },
        {
          "Getting Started Tutorial": [
            "product-manuals/zeebe/getting-started/index",
            "product-manuals/zeebe/getting-started/tutorial-setup",
            "product-manuals/zeebe/getting-started/create-a-workflow",
            "product-manuals/zeebe/getting-started/deploy-a-workflow",
            "product-manuals/zeebe/getting-started/create-workflow-instance",
            "product-manuals/zeebe/getting-started/next-steps-resources",
          ],
        },
        {
          "BPMN Workflow": [
            "product-manuals/zeebe/bpmn-workflows/bpmn-primer",
            "product-manuals/zeebe/bpmn-workflows/bpmn-coverage",
            "product-manuals/zeebe/bpmn-workflows/data-flow",
            {
              Tasks: [
                "product-manuals/zeebe/bpmn-workflows/tasks",
                "product-manuals/zeebe/bpmn-workflows/service-tasks/service-tasks",
                "product-manuals/zeebe/bpmn-workflows/receive-tasks/receive-tasks",
              ],
            },
            {
              Gateways: [
                "product-manuals/zeebe/bpmn-workflows/gateways",
                "product-manuals/zeebe/bpmn-workflows/exclusive-gateways/exclusive-gateways",
                "product-manuals/zeebe/bpmn-workflows/parallel-gateways/parallel-gateways",
                "product-manuals/zeebe/bpmn-workflows/event-based-gateways/event-based-gateways",
              ],
            },
            {
              Events: [
                "product-manuals/zeebe/bpmn-workflows/events",
                "product-manuals/zeebe/bpmn-workflows/none-events/none-events",
                "product-manuals/zeebe/bpmn-workflows/message-events/message-events",
                "product-manuals/zeebe/bpmn-workflows/timer-events/timer-events",
                "product-manuals/zeebe/bpmn-workflows/error-events/error-events",
              ],
            },
            {
              Subprocesses: [
                "product-manuals/zeebe/bpmn-workflows/subprocesses",
                "product-manuals/zeebe/bpmn-workflows/embedded-subprocesses/embedded-subprocesses",
                "product-manuals/zeebe/bpmn-workflows/call-activities/call-activities",
                "product-manuals/zeebe/bpmn-workflows/event-subprocesses/event-subprocesses",
              ],
            },
            {
              Markers: [
                "product-manuals/zeebe/bpmn-workflows/markers",
                "product-manuals/zeebe/bpmn-workflows/multi-instance/multi-instance",
              ],
            },
          ],
        },
        {
          "YAML Workflows": [
            "product-manuals/zeebe/yaml-workflows/index",
            "product-manuals/zeebe/yaml-workflows/tasks",
            "product-manuals/zeebe/yaml-workflows/control-flow",
            "product-manuals/zeebe/yaml-workflows/data-flow",
          ],
        },
        {
          Reference: [
            "product-manuals/zeebe/reference/index",
            "product-manuals/zeebe/reference/workflow-instance-creation",
            "product-manuals/zeebe/reference/workflow-lifecycles",
            "product-manuals/zeebe/reference/variables",
            "product-manuals/zeebe/reference/expressions",
            "product-manuals/zeebe/reference/message-correlation/message-correlation",
            "product-manuals/zeebe/reference/incidents",
            "product-manuals/zeebe/reference/grpc",
            "product-manuals/zeebe/reference/exporters",
          ],
        },
        {
          "Zeebe Client Libraries": [
            "product-manuals/zeebe/clients/index",
            {
              "Zeebe Java Client": [
                "product-manuals/zeebe/clients/java-client/index",
                "product-manuals/zeebe/clients/java-client/setup",
                "product-manuals/zeebe/clients/java-client/get-started",
                "product-manuals/zeebe/clients/java-client/logging",
                "product-manuals/zeebe/clients/java-client/testing",
                {
                  "Example Code using the Zeebe Java Client": [
                    "product-manuals/zeebe/clients/java-client-examples/index",
                    "product-manuals/zeebe/clients/java-client-examples/workflow-deploy",
                    "product-manuals/zeebe/clients/java-client-examples/workflow-instance-create",
                    "product-manuals/zeebe/clients/java-client-examples/workflow-instance-create-nonblocking",
                    "product-manuals/zeebe/clients/java-client-examples/workflow-instance-create-with-result",
                    "product-manuals/zeebe/clients/java-client-examples/job-worker-open",
                    "product-manuals/zeebe/clients/java-client-examples/data-pojo",
                    "product-manuals/zeebe/clients/java-client-examples/cluster-topology-request",
                  ],
                },
              ],
            },
            {
              "Zeebe Go Client": [
                "product-manuals/zeebe/clients/go-client/index",
                "product-manuals/zeebe/clients/go-client/get-started",
              ],
            },
            {
              "Community Supported Clients": [
                "product-manuals/zeebe/clients/other-clients/index",
                "product-manuals/zeebe/clients/other-clients/c-sharp",
                "product-manuals/zeebe/clients/other-clients/javascript",
                "product-manuals/zeebe/clients/other-clients/python",
                "product-manuals/zeebe/clients/other-clients/ruby",
                "product-manuals/zeebe/clients/other-clients/rust",
              ],
            },
          ],
        },
        {
          "Zeebe Operations": [
            "product-manuals/zeebe/operations/index",
            "product-manuals/zeebe/operations/configuration",
            "product-manuals/zeebe/operations/resource-planning",
            "product-manuals/zeebe/operations/network-ports",
            "product-manuals/zeebe/operations/setting-up-a-cluster",
            "product-manuals/zeebe/operations/metrics",
            "product-manuals/zeebe/operations/kubernetes",
            {
              Security: [
                "product-manuals/zeebe/operations/security",
                "product-manuals/zeebe/operations/authentication",
                "product-manuals/zeebe/operations/authorization",
              ],
            },
            "product-manuals/zeebe/operations/health",
            "product-manuals/zeebe/operations/backpressure",
            "product-manuals/zeebe/operations/disk-space",
            "product-manuals/zeebe/operations/upgrade-zeebe",
          ],
        },
        {
          "Zeebe on Kubernetes": [
            "product-manuals/zeebe/kubernetes/index",
            "product-manuals/zeebe/kubernetes/prerequisites",
            "product-manuals/zeebe/kubernetes/installing-helm",
            "product-manuals/zeebe/kubernetes/accessing-operate",
            "product-manuals/zeebe/kubernetes/zeebe-operator",
          ],
        },
        {
          Appendix: [
            "product-manuals/zeebe/appendix/glossary",
            "product-manuals/zeebe/appendix/broker-config-template",
            "product-manuals/zeebe/appendix/gateway-config-template",
            "product-manuals/zeebe/appendix/gateway-health-probes",
            "product-manuals/zeebe/appendix/environment-variables",
            "product-manuals/zeebe/appendix/deprecated-features",
          ],
        },
      ],
      Operate: [
        {
          "Deployment Guide": [
            "product-manuals/operate/deployment/configuration",
            "product-manuals/operate/deployment/data-retention",
            "product-manuals/operate/deployment/schema-and-migration",
            "product-manuals/operate/deployment/importer-and-archiver",
            "product-manuals/operate/deployment/authentication",
          ],
          "User Guide": [
            "product-manuals/operate/userguide/index",
            "product-manuals/operate/userguide/install-and-start",
            "product-manuals/operate/userguide/basic-operate-navigation",
            "product-manuals/operate/userguide/resolve-incidents-update-variables",
            "product-manuals/operate/userguide/selections-batch-operations",
            "product-manuals/operate/userguide/operate-feedback-and-questions",
          ],
        },
      ],
      Tasklist: [
        {
          "Deployment Guide": [
            "product-manuals/tasklist/deployment/configuration",
            "product-manuals/tasklist/deployment/authentication",
          ],
          "User Guide": [],
        },
      ],
    },
  ],
  Reference: [
    "reference/overview",
    {
      "Console API": [
        "reference/cloud-console-api/cloud-console-api-clients",
        "reference/cloud-console-api/cloud-console-api-reference",
      ],
    },
  ],
  Samples: ["samples/overview"],
};
