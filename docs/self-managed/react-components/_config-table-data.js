export const configs = [
  /*   {
    name: "camunda.system.cpu-thread-count",
    legacy: [
      "zeebe.broker.threads.cpuThreadCount",
      "broker.threads.cpuThreadCount",
    ],
    types: ["1-to-1"],
  }, */
  {
    name: "camunda.system.cpu-thread-count",
    legacy: ["zeebe.broker.threads.cpuThreadCount"],
    types: ["1-to-1"],
  },
  {
    name: "data.secondary-storage.type: 'elasticsearch'",
    legacy: [
      "camunda.database.type",
      "camunda.operate.database",
      "camunda.tasklist.database",
      "zeebe.broker.exporters.camundaexporter.args.connect.type",
    ],
    types: ["Double-configuration"],
  },
];
