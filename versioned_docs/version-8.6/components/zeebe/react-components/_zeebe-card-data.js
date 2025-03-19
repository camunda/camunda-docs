import IconWorkflow from "../../zeebe/technical-concepts/assets/icon-workflow-engine.png";
import IconArrow from "../../zeebe/technical-concepts/assets/icon-arrow.png";
import IconBlackbox from "../../zeebe/technical-concepts/assets/icon-blackbox.png";
import IconPartition from "../../zeebe/technical-concepts/assets/icon-partition.png";
import IconEnd from "../../zeebe/technical-concepts/assets/icon-end-to-end.png";
import IconProtocol from "../../zeebe/technical-concepts/assets/icon-protocol.png";

// Getting started cards on Zeebe introduction page
export const gettingStartedCards = [
  {
    link: "../technical-concepts/architecture",
    title: "Architecture",
    image: IconWorkflow,
    description:
      "Learn about the four main components in Zeebe's architecture: clients, gateways, brokers, and exporters.",
  },
  {
    link: "../technical-concepts/clustering",
    title: "Clustering",
    image: IconArrow,
    description:
      "Learn how Zeebe can operate as a cluster of brokers, forming a peer-to-peer network.",
  },
  {
    link: "../technical-concepts/partitions",
    title: "Partitions",
    image: IconPartition,
    description:
      "Learn about partitions, which are persistent streams of process-related events.",
  },
  {
    link: "../technical-concepts/internal-processing",
    title: "Internal processing",
    image: IconBlackbox,
    description:
      "Understand state machines, events and commands, stateful stream processing, driving the engine, and handling backpressure within Zeebe.",
  },
  {
    link: "../technical-concepts/process-lifecycles",
    title: "Process lifecycles",
    image: IconEnd,
    description:
      "In Zeebe, the process execution is represented internally by events of type ProcessInstance.",
  },
  {
    link: "../technical-concepts/protocols",
    title: "Protocols",
    image: IconProtocol,
    description: "Let's discuss gRPC and supported clients.",
  },
];
