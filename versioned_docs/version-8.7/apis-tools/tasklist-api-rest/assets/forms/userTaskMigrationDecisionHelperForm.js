export default {
  executionPlatform: "Camunda Cloud",
  executionPlatformVersion: "8.4.0",
  exporter: {
    name: "Camunda Web Modeler",
    version: "e3305dc",
  },
  schemaVersion: 15,
  id: "Form_UserTaskDecisionHelper",
  components: [
    {
      components: [
        {
          content:
            '<style>\n.decision-item {\n  font-size: 16px;\n}\n\n.info-text {\n  font-size: 12px;\n  margin-top: 4px;\n  color: #2e2e2;\n}\n</style>\n\n<div class="decision-item">\n  Do you use user tasks in any of your processes?\n</div>\n<div class="info-text">\n  <a target="_blank" href="https://docs.camunda.io/docs/next/components/modeler/bpmn/user-tasks/">User tasks</a> are used to model human work in your processes, and often require user input in a form.\n</div>',
          label: "HTML",
          type: "html",
          layout: {
            row: "Row_1cyppoh",
            columns: null,
          },
          id: "Field_1uy4yu5",
        },
        {
          content:
            '<style>\n    .progress-container {\n      display: flex;\n      flex-align: end;\n    }\n\n    .progress-item {\n      width: 20px;\n      height: 20px;\n      border-radius: 50%;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      border: 2px solid #3498db;\n      color: #3498db;\n      font-weight: bold;\n      background: white;\n      margin-left: auto;\n    }\n\n    .progress-item:after {\n      content: "?";\n    }\n\n    .progress-item.answered {\n      background-color: #3498db;\n      color: transparent;\n      position: relative;\n    }\n\n    .progress-item.answered:after {\n      content: "✔";\n      color: white;\n      position: absolute;\n      left: 2px;\n    }\n\n    .progress-item.final-stage {\n      width: 30px;\n      height: 30px;\n    }\n  </style>\n\n<div class="progress-container">\n  <div class="progress-item {{if conditions.useUserTasks != null then "answered" else ""}}"></div>\n\n</div>',
          label: "HTML",
          type: "html",
          layout: {
            row: "Row_1cyppoh",
            columns: 2,
          },
          id: "Field_0eeoooz",
        },
        {
          values: [
            {
              label: "Yes - We use user tasks in our processes",
              value: "yes",
            },
            {
              label: "Not sure - I am not sure (other teams might use them)",
              value: "notSure",
            },
            {
              label: "No - We do not use user tasks",
              value: "no",
            },
          ],
          label: "",
          type: "radio",
          layout: {
            row: "Row_08kslrg",
            columns: null,
          },
          id: "Field_1eiaaym",
          key: "conditions.useUserTasks",
        },
      ],
      showOutline: true,
      label: "",
      type: "group",
      layout: {
        row: "Row_0u6geff",
        columns: null,
      },
      id: "Field_0b0bvwo",
    },
    {
      components: [
        {
          content:
            '<style>\n.decision-item {\n  font-size: 16px;\n}\n\n.info-text {\n  font-size: 12px;\n  margin-top: 4px;\n  color: #2e2e2;\n}\n</style>\n\n<div class="decision-item">\n  Do you run on SaaS or self-managed?\n</div>\n<div class="info-text">\nLearn more about the distributions <a target="_blank" href="https://docs.camunda.io/docs/next/self-managed/about-self-managed/">here</a>. \n</div>',
          label: "HTML",
          type: "html",
          layout: {
            row: "Row_0p33f8h",
            columns: null,
          },
          id: "Field_0zj6jd9",
        },
        {
          content:
            '<style>\n    .progress-container {\n      display: flex;\n      flex-align: end;\n    }\n\n    .progress-item {\n      width: 20px;\n      height: 20px;\n      border-radius: 50%;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      border: 2px solid #3498db;\n      color: #3498db;\n      font-weight: bold;\n      background: white;\n      margin-left: auto;\n    }\n\n    .progress-item:after {\n      content: "?";\n    }\n\n    .progress-item.answered {\n      background-color: #3498db;\n      color: transparent;\n      position: relative;\n    }\n\n    .progress-item.answered:after {\n      content: "✔";\n      color: white;\n      position: absolute;\n      left: 2px;\n    }\n\n    .progress-item.final-stage {\n      width: 30px;\n      height: 30px;\n    }\n  </style>\n\n<div class="progress-container">\n  <div class="progress-item {{if conditions.distribution != null then "answered" else ""}}"></div>\n\n</div>',
          label: "HTML",
          type: "html",
          layout: {
            row: "Row_0p33f8h",
            columns: 2,
          },
          id: "Field_0ehynek",
        },
        {
          values: [
            {
              label: "SaaS",
              value: "saas",
            },
            {
              label: "Self-Managed",
              value: "sm",
            },
          ],
          label: "",
          type: "radio",
          layout: {
            row: "Row_1gdr5w5",
            columns: null,
          },
          id: "Field_0beuh20",
          key: "conditions.distribution",
        },
      ],
      showOutline: true,
      label: "",
      type: "group",
      layout: {
        row: "Row_1qgwwqr",
        columns: null,
      },
      id: "Field_1o3f7m7",
      conditional: {
        hide: '=conditions.useUserTasks = null or conditions.useUserTasks = "no"',
      },
    },
    {
      components: [
        {
          content:
            '<style>\n.decision-item {\n  font-size: 16px; \n  margin-top: 0px;\n}\n\n.info-text {\n  font-size: 12px;\n  margin-top: 4px;\n  color: #2e2e2;\n}\n</style>\n\n<div class="decision-item">\n  Do you run or develop a custom task application, or plan to do so?\n</div>\n<div class="info-text">\nA custom task application means you are using the <a href="https://docs.camunda.io/docs/apis-tools/tasklist-api-rest/tasklist-api-rest-overview/">Tasklist API</a> (REST or GraphQL) or <a href="https://docs.camunda.io/docs/next/self-managed/concepts/exporters/">custom exporters</a> to manage user tasks.\n</div>',
          label: "HTML",
          type: "html",
          layout: {
            row: "Row_1t8ben5",
            columns: null,
          },
          id: "Field_094d1fj",
        },
        {
          content:
            '<style>\n    .progress-container {\n      display: flex;\n      flex-align: end;\n    }\n\n    .progress-item {\n      width: 20px;\n      height: 20px;\n      border-radius: 50%;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      border: 2px solid #3498db;\n      color: #3498db;\n      font-weight: bold;\n      background: white;\n      margin-left: auto;\n    }\n\n    .progress-item:after {\n      content: "?";\n    }\n\n    .progress-item.answered {\n      background-color: #3498db;\n      color: transparent;\n      position: relative;\n    }\n\n    .progress-item.answered:after {\n      content: "✔";\n      color: white;\n      position: absolute;\n      left: 2px;\n    }\n\n    .progress-item.final-stage {\n      width: 30px;\n      height: 30px;\n    }\n  </style>\n\n<div class="progress-container">\n  <div class="progress-item {{if conditions.runCustomTaskApp != null then "answered" else ""}}"></div>\n\n</div>',
          label: "HTML",
          type: "html",
          layout: {
            row: "Row_1t8ben5",
            columns: 2,
          },
          id: "Field_19uiodp",
        },
        {
          values: [
            {
              label: "Yes - We run a custom task application",
              value: "yes",
            },
            {
              label: "Not yet - We plan to build a custom task application",
              value: "notYet",
            },
            {
              label:
                "No - We run the Camunda Tasklist UI only, or no task application at all",
              value: "no",
            },
          ],
          label: "",
          type: "radio",
          layout: {
            row: "Row_0fl02np",
            columns: null,
          },
          id: "Field_1wk7nzz",
          key: "conditions.runCustomTaskApp",
        },
      ],
      showOutline: true,
      label: "",
      type: "group",
      layout: {
        row: "Row_0netqg0",
        columns: null,
      },
      id: "Field_03237bv",
      conditional: {
        hide: '=conditions.useUserTasks = null or conditions.useUserTasks = "no" or conditions.distribution = null',
      },
    },
    {
      components: [
        {
          content:
            '<style>\n.decision-item {\n  font-size: 16px;\n}\n\n.info-text {\n  font-size: 12px;\n  margin-top: 4px;\n  color: #2e2e2;\n}\n</style>\n\n<div class="decision-item">\n  Do you run the Camunda Tasklist UI?\n</div>\n<div class="info-text">\nLearn more about the Camunda Tasklist UI <a href="https://docs.camunda.io/docs/next/components/tasklist/userguide/using-tasklist/">here</a>. \n</div>',
          label: "HTML",
          type: "html",
          layout: {
            row: "Row_0ukpji8",
            columns: null,
          },
          id: "Field_1b9b7il",
        },
        {
          content:
            '<style>\n    .progress-container {\n      display: flex;\n      flex-align: end;\n    }\n\n    .progress-item {\n      width: 20px;\n      height: 20px;\n      border-radius: 50%;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      border: 2px solid #3498db;\n      color: #3498db;\n      font-weight: bold;\n      background: white;\n      margin-left: auto;\n    }\n\n    .progress-item:after {\n      content: "?";\n    }\n\n    .progress-item.answered {\n      background-color: #3498db;\n      color: transparent;\n      position: relative;\n    }\n\n    .progress-item.answered:after {\n      content: "✔";\n      color: white;\n      position: absolute;\n      left: 2px;\n    }\n\n    .progress-item.final-stage {\n      width: 30px;\n      height: 30px;\n    }\n  </style>\n\n<div class="progress-container">\n  <div class="progress-item {{if conditions.runTasklistUI != null then "answered" else ""}}"></div>\n\n</div>',
          label: "HTML",
          type: "html",
          layout: {
            row: "Row_0ukpji8",
            columns: 2,
          },
          id: "Field_0c8gupg",
        },
        {
          values: [
            {
              label: "Yes - We run the Camunda Tasklist UI",
              value: "yes",
            },
            {
              label: "No - We do not run the Camunda Tasklist UI",
              value: "no",
            },
          ],
          label: "",
          type: "radio",
          layout: {
            row: "Row_01eva6h",
            columns: null,
          },
          id: "Field_185sc2c",
          key: "conditions.runTasklistUI",
        },
      ],
      showOutline: true,
      label: "",
      type: "group",
      layout: {
        row: "Row_1abyhbx",
        columns: null,
      },
      id: "Field_0aego0v",
      conditional: {
        hide: '=not(conditions.runCustomTaskApp = "no" or conditions.runCustomTaskApp = "notYet")',
      },
    },
    {
      components: [
        {
          content:
            '<style>\n.decision-item {\n  font-size: 16px;\n}\n\n.info-text {\n  font-size: 12px;\n  margin-top: 4px;\n  color: #2e2e2;\n}\n</style>\n\n<div class="decision-item">\n  Do you require a user task lifecycle?\n</div>\n<div class="info-text">\n The user task lifecycle includes lifecycle states such as created, assigned, or completed, provides an API to perform these operations, and interfaces to listen to lifecycle state changes.<br/>\n With 8.6, the task listener interface will be added, which in also allows to hook into these lifecycles, e.g. to run a custom assignment logic, or to enrich tasks with business data.</br>\n Additionally, it provides ways to emit custom actions happening on tasks, e.g. to track + report on task performance.\n</div>',
          label: "HTML",
          type: "html",
          layout: {
            row: "Row_0c10a3g",
            columns: null,
          },
          id: "Field_07m2w9x",
        },
        {
          content:
            '<style>\n    .progress-container {\n      display: flex;\n      flex-align: end;\n    }\n\n    .progress-item {\n      width: 20px;\n      height: 20px;\n      border-radius: 50%;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      border: 2px solid #3498db;\n      color: #3498db;\n      font-weight: bold;\n      background: white;\n      margin-left: auto;\n    }\n\n    .progress-item:after {\n      content: "?";\n    }\n\n    .progress-item.answered {\n      background-color: #3498db;\n      color: transparent;\n      position: relative;\n    }\n\n    .progress-item.answered:after {\n      content: "✔";\n      color: white;\n      position: absolute;\n      left: 2px;\n    }\n\n    .progress-item.final-stage {\n      width: 30px;\n      height: 30px;\n    }\n  </style>\n\n<div class="progress-container">\n  <div class="progress-item {{if conditions.requireLifecycle != null then "answered" else ""}}"></div>\n\n</div>',
          label: "HTML",
          type: "html",
          layout: {
            row: "Row_0c10a3g",
            columns: 2,
          },
          id: "Field_1lscsj2",
        },
        {
          values: [
            {
              label:
                "Yes - We want to use one or more of the mentioned features",
              value: "yes",
            },
            {
              label: "No - We do not plan to use these features yet",
              value: "no",
            },
          ],
          label: "",
          type: "radio",
          layout: {
            row: "Row_1edhmtm",
            columns: null,
          },
          id: "Field_1g711m6",
          key: "conditions.requireLifecycle",
        },
      ],
      showOutline: true,
      label: "",
      type: "group",
      layout: {
        row: "Row_0pd7w50",
        columns: null,
      },
      id: "Field_1k3anu9",
      conditional: {
        hide: '=not(conditions.runCustomTaskApp = "yes" or conditions.runTasklistUI = "yes")',
      },
    },
    {
      content:
        '<style>\n    .info-box {\n        background-color: #0f62fe0f;\n        border: 1px solid #0f62fe;\n        border-radius: 0px;\n        padding: 20px;\n        color: #333;\n        margin: 0 -14px;\n    }\n\n    .info-box b {\n        font-size: 14px;\n    }\n\n    .info-box ol {\n        padding: 0;\n    }\n\n    .info-box li {\n        padding: 2px;\n    }\n\n    .info-box:empty {\n        display: none;\n    }\n</style>\n\n\n{{#if conditions.useUserTasks = "no" or (conditions.runCustomTaskApp = "no" and conditions.runTasklistUI = "no") }}\n<div class="info-box">\n<b>Nothing to do for you!</b><br/>\nSince you do not use user tasks, you do not have to worry about migrating them.<br/>\nHowever, if you plan to introduce them at any point in time, you can refer to this decision helper again.\n</div>\n{{/if}}\n\n{{#if conditions.runCustomTaskApp = "notYet" and conditions.runTasklistUI = "yes" and conditions.requireLifecycle != null }}\n<div class="info-box">\n<b>Use Camunda user tasks</b><br/>\nAs you plan to introduce a custom task application, \nuse "Camunda user tasks" as the implementation type for your user tasks.\n<br/><br/>\nFirst switch the implementation type of all your user tasks to "Camunda user tasks",\nbefore you start developing your custom task application. \nJob-based user tasks are not supported in the Zeebe API for user tasks.<br/><br/>\nYou can safely migrate your existing user tasks to the new task type,\nsince the Camunda Tasklist UI supports both task types.\n</div>\n{{/if}}\n\n{{#if conditions.runCustomTaskApp = "notYet" and conditions.runTasklistUI = "no" }}\n<div class="info-box">\n<b>Use Camunda user tasks</b><br/>\nAs you plan to introduce a custom task application, \nuse "Camunda user tasks" as the implementation type for your user tasks.\n</div>\n{{/if}}\n\n{{#if conditions.requireLifecycle = "no" and conditions.runCustomTaskApp != "notYet"}}\n<div class="info-box">\n<b>No immediate action needed</b><br/>\nSince you do not plan to use task lifecycle features, there is no urgent need for you to migrate.<br/>\n{{#if conditions.runTasklistUI = "yes"}}\nThe Camunda Tasklist UI works with both job-based or Zeebe-based <a href="https://docs.camunda.io/docs/next/components/modeler/bpmn/user-tasks/">user tasks</a>.\nIt does not require any technical migration from your side.<br/>\n{{/if}}\nHowever, we still recommend to consider a migration as it might ease a future adoption of those features. \n</div>\n{{/if}}\n\n\n{{#if conditions.useUserTasks != "no" and conditions.runTasklistUI = "yes" and conditions.runCustomTaskApp = "no" and conditions.requireLifecycle = "yes"}}\n<div class="info-box">\n<b>Use Camunda user tasks</b><br/>\nTo use task lifecycle features, change the implementation type of your user tasks to Camunda user tasks.<br/><br/>\nWhile the Camunda Tasklist UI works with both job-based or Zeebe-based <a href="https://docs.camunda.io/docs/next/components/modeler/bpmn/user-tasks/">user tasks</a>,\nonly Zeebe-based user tasks support lifecycle features.<br/>\n{{#if conditions.distribution = "sm"}}\n<br/>\nIn addition, to use the task lifecycle events and metrics,\nconsider to implement a <a href="https://docs.camunda.io/docs/next/self-managed/concepts/exporters/">custom exporter</a>.\n{{/if}}\n</div>\n{{/if}}\n\n{{#if conditions.useUserTasks != "no" and conditions.runCustomTaskApp = "yes" and conditions.requireLifecycle = "yes"}}\n<div class="info-box">\n<b>Use Camunda user tasks</b><br/>\nTo use task lifecycle features, change the implementation type of your user tasks to Camunda user tasks.<br/><br/>\nThis requires you to migrate your custom task application(s) first to use the new Zeebe API for user tasks.<br/>\nWe recommend you to either<br/>\n<ul>\n<li>Upgrade your dev cluster to 8.5, migrate your task application(s) on dev, and migrate your processes step-by-step on dev. \n Once done and tested, move over to production. Recommended for small to mid-size projects.</li>\n<li>Upgrade your dev and prod cluster to 8.5 and write an adapter layer that routes task operation calls to the respective API\n(existing job-based tasks to the Tasklist API, and Zeebe-based tasks to the Zeebe Task API). The Tasklist query API returns the task implementation type\nrequired for the routing. Using this approach, you can migrate each process step-by-step to production, and operate both types at the same. \nThis approach is recommended for larger projects and ensures smoothest migration without interrupting operations and continous delivery.</li>\n</ul>\n{{#if conditions.distribution = "sm"}}\nIn addition, to use the task lifecycle events and metrics,\nconsider to implement a <a href="https://docs.camunda.io/docs/next/self-managed/concepts/exporters/">custom exporter</a>.\n{{/if}}\n</div>\n{{/if}}\n\n\n{{#if false}}\nWe recommend to migrate to...\nYou can find learning material here...\nFor reference the following comparison table...\n{{/if}}\n\n{{#if false}}\n<div class="further-readings">\n<h4>Read more</h4>\nTODO\n</div>\n{{/if}}\n',
      label: "HTML",
      type: "html",
      layout: {
        row: "Row_1tx9ci3",
        columns: null,
      },
      id: "Field_0hm8i4l",
    },
  ],
  type: "default",
};
