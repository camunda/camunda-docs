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
        // "guides/getting-started/involve-humans",
        "guides/getting-started/monitor-your-process-in-operate",
      ],
    },
    "guides/setting-up-development-project",
  ],
  "Product Manuals": [
    "product-manuals/overview",
    {
      Concepts: [
        "product-manuals/concepts/what-is-camunda-cloud",
        "product-manuals/concepts/workflows",              
        "product-manuals/concepts/workflow-instance-creation",
        "product-manuals/concepts/variables",
        "product-manuals/concepts/expressions",
        "product-manuals/concepts/messages",
        "product-manuals/concepts/incidents",            
      ],
      Clients: [
        "product-manuals/clients/overview",
        {
          "Java": [
            "product-manuals/clients/java-client/index",
            "product-manuals/clients/java-client/setup",
            "product-manuals/clients/java-client/get-started",
            "product-manuals/clients/java-client/logging",
            "product-manuals/clients/java-client/testing",
            {
              "Examples": [
                "product-manuals/clients/java-client-examples/index",
                "product-manuals/clients/java-client-examples/workflow-deploy",
                "product-manuals/clients/java-client-examples/workflow-instance-create",
                "product-manuals/clients/java-client-examples/workflow-instance-create-nonblocking",
                "product-manuals/clients/java-client-examples/workflow-instance-create-with-result",
                "product-manuals/clients/java-client-examples/job-worker-open",
                "product-manuals/clients/java-client-examples/data-pojo",
                "product-manuals/clients/java-client-examples/cluster-topology-request",
              ],
            },
          ],
        },          
        "product-manuals/clients/go-client/get-started",        
        "product-manuals/clients/cli-client",
        {
          "Community Clients": [
            "product-manuals/clients/other-clients/index",
            "product-manuals/clients/other-clients/c-sharp",
            "product-manuals/clients/other-clients/javascript",
            "product-manuals/clients/other-clients/node-js",
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
          "Manage your Organization": [
            "product-manuals/cloud-console/manage-organization/organization-settings",
            "product-manuals/cloud-console/manage-organization/manage-users",
            "product-manuals/cloud-console/manage-organization/view-organization-activity",
            "product-manuals/cloud-console/manage-organization/manage-cloud-management-api-clients",
            "product-manuals/cloud-console/manage-organization/update-billing-reservations",
            "product-manuals/cloud-console/manage-organization/switch-organization",
          ],
        },
        {
          "Manage Clusters": [
            "product-manuals/cloud-console/manage-clusters/create-cluster",
            "product-manuals/cloud-console/manage-clusters/rename-cluster",
            "product-manuals/cloud-console/manage-clusters/delete-cluster",
            "product-manuals/cloud-console/manage-clusters/manage-api-clients",
          ],
        },
        {
          "Manage your Plan": [
            "product-manuals/cloud-console/manage-plan/available-plans",
            "product-manuals/cloud-console/manage-plan/trial-plan",
            {
              "Professional Plan": [
                "product-manuals/cloud-console/manage-plan/professional-plan/overview",
                "product-manuals/cloud-console/manage-plan/professional-plan/upgrade-to-professional-plan",
                "product-manuals/cloud-console/manage-plan/professional-plan/billing-parameters",
              ],
            },
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
          ],
          "Zeebe Modeler": [
            "product-manuals/modeler/zeebe-modeler/install-the-zeebe-modeler",
            "product-manuals/modeler/zeebe-modeler/model-your-first-diagram",
            "product-manuals/modeler/zeebe-modeler/connect-to-camunda-cloud",
            "product-manuals/modeler/zeebe-modeler/deploy-to-cloud",
            "product-manuals/modeler/zeebe-modeler/start-instance",
          ],
        },
      ],
      "Zeebe Engine": [
        "product-manuals/zeebe/zeebe-overview",
        {
          Introduction: [
            "product-manuals/zeebe/introduction/index",            
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
          Reference: [
            "product-manuals/zeebe/reference/index",
            "product-manuals/zeebe/reference/workflow-lifecycles",
            "product-manuals/zeebe/reference/exporters",
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
    "reference/cloud-console-api-clients",
    "reference/cloud-console-api-reference",
    "reference/grpc",
    {
      "BPMN Workflow": [
        "reference/bpmn-workflows/bpmn-primer",
        "reference/bpmn-workflows/bpmn-coverage",
        "reference/bpmn-workflows/data-flow",
        {
          Tasks: [
            "reference/bpmn-workflows/tasks",
            "reference/bpmn-workflows/service-tasks/service-tasks",
            "reference/bpmn-workflows/receive-tasks/receive-tasks",
          ],
        },
        {
          Gateways: [
            "reference/bpmn-workflows/gateways",
            "reference/bpmn-workflows/exclusive-gateways/exclusive-gateways",
            "reference/bpmn-workflows/parallel-gateways/parallel-gateways",
            "reference/bpmn-workflows/event-based-gateways/event-based-gateways",
          ],
        },
        {
          Events: [
            "reference/bpmn-workflows/events",
            "reference/bpmn-workflows/none-events/none-events",
            "reference/bpmn-workflows/message-events/message-events",
            "reference/bpmn-workflows/timer-events/timer-events",
            "reference/bpmn-workflows/error-events/error-events",
          ],
        },
        {
          Subprocesses: [
            "reference/bpmn-workflows/subprocesses",
            "reference/bpmn-workflows/embedded-subprocesses/embedded-subprocesses",
            "reference/bpmn-workflows/call-activities/call-activities",
            "reference/bpmn-workflows/event-subprocesses/event-subprocesses",
          ],
        },
        {
          Markers: [
            "reference/bpmn-workflows/markers",
            "reference/bpmn-workflows/multi-instance/multi-instance",
          ],
        },
      ],
    },
    "reference/glossary",
  ],
  Samples: ["samples/overview"],
};
