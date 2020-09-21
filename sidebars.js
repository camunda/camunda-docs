module.exports = {
  camundaCloud: {
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
      "guides/operating-the-camunda-cloud-stack-on-kubernetes",
    ],
    "Product Manuals": [
      "product-manuals/overview",
      {
        Clients: [
          {
            NodeJS: [
              "product-manuals/clients/nodejs/install-the-nodejs-client",
            ],
          },
        ],
        "Cloud Console": [
          "product-manuals/cloud-console/overview",
          {
            "Manage your Cloud Account": [
              "product-manuals/cloud-console/manage-cloud-account/create-camunda-cloud-account",
              "product-manuals/cloud-console/manage-cloud-account/administrate-account",
            ],
          },
          {
            "Manage Clusters": [
              "product-manuals/cloud-console/manage-clusters/create-cluster",
              "product-manuals/cloud-console/manage-clusters/manage-client-connections",
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
          "product-manuals/zeebe/zeebe-the-workflow-engine-for-the-cloud-age",
        ],
        Operate: ["product-manuals/operate/overview"],
        Tasklist: ["product-manuals/tasklist/overview"],
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
  },
};
