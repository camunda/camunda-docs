export const configs = [
  {
    name: "camunda.system.cpu-thread-count",
    legacy: [
      "zeebe.broker.threads.cpuThreadCount",
      "broker.threads.cpuThreadCount",
    ],
    types: ["1-to-1"],
  },
  {
    name: "camunda.example.conflict-flag",
    legacy: ["zeebe.example.conflictFlag"],
    types: ["Double-configuration", "Unsupported"], // multiple types
  },
];
