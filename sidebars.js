module.exports = {
  Guides: [
    {
      "Getting started": [
        "guides/introduction-to-camunda-cloud",
        "guides/create-account",
      ],
    },
    {
      "Next steps": [
        "guides/setting-up-development-project",
        "guides/setup-client-connection-credentials",
      ],
    },
  ],
  Components: [
    "components/overview",
    {
      Concepts: [
        "components/concepts/what-is-camunda-platform-8",
        "components/concepts/processes",
      ],
      Console: [
        "components/console/introduction",
        {
          "Manage your organization": [
            "components/console/manage-organization/organization-settings",
            "components/console/manage-organization/manage-users",
          ],
        },
      ],
      Modeler: [
        "components/modeler/about-modeler",
        {
          "Web Modeler": [
            "components/modeler/web-modeler/new-web-modeler",
            "components/modeler/web-modeler/launch-cloud-modeler",
          ],
        },
      ],
      Zeebe: [
        "components/zeebe/zeebe-overview",
        {
          "Technical concepts": [
            "components/zeebe/technical-concepts/index",
            "components/zeebe/technical-concepts/architecture",
          ],
        },
      ],
      Operate: [
        "components/operate/index",
        {
          "User guide": [
            "components/operate/userguide/basic-operate-navigation",
            "components/operate/userguide/resolve-incidents-update-variables",
          ],
        },
      ],
      Optimize: [
        "components/optimize/what-is-optimize",
        {
          "User guide": [
            "components/optimize/userguide/collections-dashboards-reports",
            "components/optimize/userguide/data-sources",
            {
              "Process analysis": [
                "components/optimize/userguide/process-analysis/overview",
                "components/optimize/userguide/process-analysis/outlier-analysis",
              ],
            },
          ],
        },
      ],
      Tasklist: [
        "components/tasklist/introduction",
        {
          "User guide": [
            "components/tasklist/userguide/overview",
            "components/tasklist/userguide/updating-tasklist-cloud",
          ],
        },
      ],
      "Best Practices": [
        "components/best-practices/overview",
        {
          "Project Management": [
            "components/best-practices/management/following-the-customer-success-path",
            "components/best-practices/management/doing-a-proper-poc",
          ],
          Architecture: [
            "components/best-practices/architecture/deciding-about-your-stack",
            "components/best-practices/architecture/sizing-your-environment",
          ],
        },
      ],
    },
  ],
  "APIs & Clients": [
    "apis-clients/overview",
    {
      APIs: ["apis-clients/public-api", "apis-clients/grpc"],
    },
  ],

  Reference: ["reference/overview", "reference/glossary"],
  "Self-Managed": [
    "self-managed/overview",
    {
      Installation: [
        "self-managed/platform-deployment/index",
        "self-managed/platform-deployment/local",
      ],
    },
  ],
};
