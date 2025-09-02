export const configs = [
  /*   {
    name: "camunda.system.cpu-thread-count",
    legacy: [
      "zeebe.broker.threads.cpuThreadCount",
      "broker.threads.cpuThreadCount",
    ],
    types: ["1-to-1"],
  }, 
    {
    name: "data.secondary-storage.type",
    legacy: [
      "camunda.database.type",
      "camunda.operate.database",
      "camunda.tasklist.database",
      "zeebe.broker.exporters.camundaexporter.args.connect.type",
    ],
    types: ["Double-configuration"],
  },

  */

  {
    name: "camunda.system.cpu-thread-count",
    legacy: ["zeebe.broker.threads.cpuThreadCount"],
    types: ["1-to-1"],
  },
  {
    name: "camunda.system.io-thread-count",
    legacy: ["zeebe.broker.threads.ioThreadCount"],
    types: ["1-to-1"],
  },
  {
    name: "camunda.system.clock-controlled",
    legacy: ["zeebe.clock.controlled"],
    types: ["1-to-1"],
  },
  {
    name: "camunda.system.actor.idle.max-spins",
    legacy: ["zeebe.actor.idle.maxSpins"],
    types: ["1-to-1"],
  },
  {
    name: "camunda.system.actor.idle.max-yields",
    legacy: ["zeebe.actor.idle.maxYields"],
    types: ["1-to-1"],
  },
  {
    name: "camunda.system.actor.idle.max-park-period",
    legacy: ["zeebe.actor.idle.maxParkPeriod"],
    types: ["1-to-1"],
  },
  {
    name: "camunda.system.upgrade.enable-version-check",
    legacy: ["zeebe.broker.experimental.versionCheckRestrictionEnabled"],
    types: ["1-to-1"],
  },

  {
    name: "api.grpc.address",
    legacy: ["zeebe.gateway.network.host", "zeebe.broker.gateway.network.host"],
    types: ["1-to-1"],
  },
  {
    name: "api.grpc.port",
    legacy: ["zeebe.gateway.network.port", "zeebe.broker.gateway.network.port"],
    types: ["1-to-1"],
  },
  {
    name: "api.grpc.min-keep-alive-interval",
    legacy: [
      "zeebe.gateway.network.minKeepAliveInterval",
      "zeebe.broker.gateway.network.minKeepAliveInterval",
    ],
    types: ["1-to-1"],
  },
  {
    name: "api.grpc.max-message-size",
    legacy: [
      "zeebe.gateway.network.maxMessageSize",
      "zeebe.broker.gateway.network.maxMessageSize",
    ],
    types: ["1-to-1"],
  },
  {
    name: "api.grpc.ssl.enabled",
    legacy: [
      "zeebe.gateway.security.enabled",
      "zeebe.broker.gateway.security.enabled",
    ],
    types: ["1-to-1"],
  },
  {
    name: "api.grpc.ssl.certificate",
    legacy: [
      "zeebe.gateway.security.certificateChainPath",
      "zeebe.broker.gateway.security.certificateChainPath",
    ],
    types: ["1-to-1"],
  },
  {
    name: "api.grpc.ssl.certificate-private-key",
    legacy: [
      "zeebe.gateway.security.privateKeyPath",
      "zeebe.broker.gateway.security.privateKeyPath",
    ],
    types: ["1-to-1"],
  },
  {
    name: "api.grpc.ssl.key-store.file-path",
    legacy: [
      "zeebe.gateway.security.keyStore.filePath",
      "zeebe.broker.gateway.security.keyStore.filePath",
    ],
    types: ["1-to-1"],
  },
  {
    name: "api.grpc.ssl.key-store.password",
    legacy: [
      "zeebe.gateway.security.keyStore.password",
      "zeebe.broker.gateway.security.keyStore.password",
    ],
    types: ["1-to-1"],
  },
  {
    name: "api.grpc.interceptors.id",
    legacy: [
      "zeebe.gateway.interceptors.[x].id",
      "zeebe.broker.gateway.interceptors.[x].id",
    ],
    types: ["1-to-1"],
  },
  {
    name: "api.grpc.interceptors.jar-path",
    legacy: [
      "zeebe.gateway.interceptors.[x].jarPath",
      "zeebe.broker.gateway.interceptors.[x].jarPath",
    ],
    types: ["1-to-1"],
  },
];
