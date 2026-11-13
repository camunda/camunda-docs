// @ts-check
/**
 * The model of the guided deployment on AWS: every step, every decision, every
 * option, the rules between them, and what each option adds to the diagram of
 * the reader's architecture.
 *
 * This file is the single source of truth. The choice panels, the conditional
 * content, the progress indicator, the "Your architecture" diagram, and the
 * "All options" diagram are all generated from it. The options, rules, and
 * labels come from the guided pages in
 * `docs/self-managed/reference-architecture/guided/`: change a page, change
 * this model with it.
 *
 * Vocabulary
 * ----------
 * - A **step** is a band of the guide, such as Network. It has a page and asks
 *   zero or more questions, in order.
 * - A **question** is one decision, such as "Where does the VPC come from?".
 *   Its id is also the query string key of a shareable link (`?vpc=existing`).
 * - An **option** is one answer. Its id is the query string value.
 * - A **condition** maps question ids to the option ids that satisfy it:
 *   `{ compute: ["eks", "ecs"] }` means "compute is Amazon EKS or Amazon ECS".
 *   Several keys must all hold.
 *
 * Rules
 * -----
 * Rules only look backwards: a question can depend on the questions before it
 * in `questionOrder`, never on later ones. The engine resolves the questions in
 * order, so changing an early choice can disable a later one, which is then
 * cleared and reported. A test enforces the direction.
 *
 * - `question.appliesWhen`: the question is asked only when the condition holds.
 *   Otherwise it's shown as not applicable, with `notApplicableReason`.
 * - `option.requires`: a list of requirements. Each has `needs` (a condition),
 *   an optional `when` (the requirement holds only when that condition holds),
 *   and an optional `reason`. The default reason is "Requires <option labels>".
 * - `option.excludes`: a condition on later questions. While this option is
 *   selected, the options it names are disabled with "Not available with <this
 *   option>".
 * - `option.unavailable`: a fixed reason why the option can't be chosen in the
 *   guided deployment at all. It's still shown, greyed out.
 * - `option.default`: the answer that applies until the reader chooses. If a
 *   question has no usable default and only one option is left, that option
 *   applies.
 *
 * Unanswered questions never disable anything: the default view of a page
 * shows every option and all content.
 *
 * Diagram contributions
 * ---------------------
 * `base.diagram` and `option.diagram` contribute `groups` (labels for the
 * containers in `groups` below), `nodes`, and `edges`. Each entry can carry
 * `when` (a condition that must hold) and `unless` (a condition that must not
 * hold), evaluated on the resolved answers, defaults included.
 *
 * - Nodes and groups inside a per-region group (region, VPC, compute,
 *   Orchestration Cluster) repeat in every region. `regions: "first"` or
 *   `"others"` limits them.
 * - Edges between two per-region items connect them inside each region. When
 *   one end exists in a single region, such as the backup bucket, every
 *   instance of the other end connects to it. With `cross: "mesh"`, an edge
 *   connects every pair of regions instead, and with `cross: "fromFirst"` the
 *   first region to each of the others.
 * - Labels can use `{region}` (A, B, C), `{zone}` (zone-a), `{brokers}`, and
 *   `{brokerRange}` (zone-a_0 to zone-a_2), taken from the zone layout.
 * - Node shapes: `box` (default), `db` (cylinder), `external` (outside AWS,
 *   dashed), and `bucket`.
 */

/**
 * @typedef {Record<string, string[]>} Condition
 * @typedef {{ needs: Condition, when?: Condition, reason?: string }} Requirement
 * @typedef {{ id: string, label?: string, parent?: string, regions?: "first" | "others", when?: Condition, unless?: Condition }} GroupContribution
 * @typedef {{ id: string, label: string, in?: string, shape?: "box" | "db" | "external" | "bucket", regions?: "first" | "others", when?: Condition, unless?: Condition }} NodeContribution
 * @typedef {{ from: string, to: string, label?: string, style?: "solid" | "dashed", twoWay?: boolean, cross?: "mesh" | "fromFirst", when?: Condition, unless?: Condition }} EdgeContribution
 * @typedef {{ groups?: GroupContribution[], nodes?: NodeContribution[], edges?: EdgeContribution[] }} DiagramContribution
 * @typedef {{ step: string, text: string, when?: Condition, unless?: Condition }} BomNote
 * @typedef {object} Option
 * @property {string} id
 * @property {string} label
 * @property {string=} description
 * @property {boolean=} default
 * @property {string=} unavailable
 * @property {Requirement[]=} requires
 * @property {Condition=} excludes
 * @property {DiagramContribution=} diagram
 * @property {BomNote[]=} bom
 * @property {number=} regionCount Only for the regions question.
 * @property {number[]=} zoneLayout Only for the zones question: brokers (and replicas) for each zone.
 * @property {string=} zoneLabel Only for the zones question.
 * @typedef {object} Question
 * @property {string} id
 * @property {string} step
 * @property {string} label
 * @property {string} page The page that holds the choice panel of the question.
 * @property {Condition=} appliesWhen
 * @property {string=} notApplicableReason
 * @property {Option[]} options
 * @typedef {object} Step
 * @property {string} id
 * @property {string} title
 * @property {string} page
 * @property {string[]} questions
 * @typedef {object} Page
 * @property {string} id
 * @property {string} path Path below `reference-architecture/guided/`, without the extension.
 * @property {string} title
 * @property {string=} step
 * @property {Condition=} shownWhen The flow skips the page unless the condition holds.
 */

/** @type {Step[]} */
const steps = [
  {
    id: "cloud-provider",
    title: "Cloud provider",
    page: "cloud-provider",
    questions: ["cloud", "regions"],
  },
  {
    id: "network",
    title: "Network",
    page: "network",
    questions: ["vpc", "link"],
  },
  {
    id: "compute",
    title: "Compute",
    page: "compute",
    questions: ["compute"],
  },
  {
    id: "secondary-storage",
    title: "Secondary storage",
    page: "secondary-storage",
    questions: ["storage", "dbClass"],
  },
  {
    id: "object-storage",
    title: "Object storage",
    page: "object-storage",
    questions: ["backup"],
  },
  {
    id: "exposure",
    title: "Exposure",
    page: "exposure",
    questions: ["tls", "raftNlb"],
  },
  {
    id: "orchestration-cluster",
    title: "Orchestration Cluster",
    page: "orchestration-cluster",
    questions: ["zones"],
  },
  {
    id: "management-plane",
    title: "Management plane",
    page: "management-plane",
    questions: ["managementPlane", "idp"],
  },
  {
    id: "identity",
    title: "Identity",
    page: "identity",
    questions: ["auth"],
  },
];

/**
 * The pages of the guide, in reading order. "Next" follows this order and skips
 * pages whose `shownWhen` doesn't hold. The grow pages aren't part of the flow.
 *
 * @type {Page[]}
 */
const pages = [
  { id: "overview", path: "guided-deployment", title: "Guided deployment" },
  {
    id: "cloud-provider",
    path: "cloud-provider",
    title: "Cloud provider",
    step: "cloud-provider",
  },
  { id: "network", path: "network", title: "Network", step: "network" },
  { id: "compute", path: "compute", title: "Compute", step: "compute" },
  {
    id: "secondary-storage",
    path: "secondary-storage",
    title: "Secondary storage",
    step: "secondary-storage",
  },
  {
    id: "object-storage",
    path: "object-storage",
    title: "Object storage",
    step: "object-storage",
  },
  { id: "exposure", path: "exposure", title: "Exposure", step: "exposure" },
  {
    id: "orchestration-cluster",
    path: "orchestration-cluster/overview",
    title: "Orchestration Cluster",
    step: "orchestration-cluster",
  },
  {
    id: "oc-zones",
    path: "orchestration-cluster/zones-and-brokers",
    title: "Zones and brokers",
    step: "orchestration-cluster",
  },
  {
    id: "management-plane",
    path: "management-plane/overview",
    title: "Management plane",
    step: "management-plane",
  },
  {
    id: "identity-provider",
    path: "management-plane/identity-provider",
    title: "Identity provider",
    step: "management-plane",
    shownWhen: { managementPlane: ["deploy"], idp: ["guide"] },
  },
  {
    id: "management-identity",
    path: "management-plane/management-identity",
    title: "Management Identity",
    step: "management-plane",
    shownWhen: { managementPlane: ["deploy"] },
  },
  {
    id: "camunda-hub",
    path: "management-plane/camunda-hub",
    title: "Camunda Hub",
    step: "management-plane",
    shownWhen: { managementPlane: ["deploy"] },
  },
  { id: "identity", path: "identity", title: "Identity", step: "identity" },
  {
    id: "your-architecture",
    path: "your-architecture",
    title: "Your architecture",
  },
];

/**
 * Containers of the architecture diagram, from the outside in. A group appears
 * only when the base or an option gives it a label and it holds something.
 * Without a label, its content moves up to the parent.
 *
 * @type {Record<string, { parent: string | null, perRegion: boolean }>}
 */
const groups = {
  aws: { parent: null, perRegion: false },
  region: { parent: "aws", perRegion: true },
  vpc: { parent: "region", perRegion: true },
  compute: { parent: "vpc", perRegion: true },
  oc: { parent: "compute", perRegion: true },
  mp: { parent: "region", perRegion: true },
};

/**
 * What every architecture has, whatever the choices.
 *
 * @type {{ diagram: DiagramContribution, bom: BomNote[] }}
 */
const base = {
  diagram: {
    groups: [
      { id: "aws", label: "AWS" },
      { id: "region", label: "Region {region}" },
      { id: "oc", label: "Orchestration Cluster, {zone}" },
    ],
    nodes: [
      { id: "users", label: "Users and clients", shape: "external" },
      {
        id: "brokers",
        label: "Zeebe brokers {brokerRange}",
        in: "oc",
      },
      { id: "webapps", label: "Operate, Tasklist, and Admin", in: "oc" },
      { id: "connectors", label: "Connectors", in: "oc" },
      {
        id: "web",
        label: "Load balancer",
        in: "vpc",
        unless: { compute: ["eks", "ecs", "ec2"] },
      },
    ],
    edges: [
      {
        from: "web",
        to: "oc",
        label: "REST, gRPC, web applications",
        unless: { compute: ["eks", "ecs", "ec2"] },
      },
    ],
  },
  bom: [],
};

/** @type {Question[]} */
const questions = [
  // Cloud provider
  {
    id: "cloud",
    step: "cloud-provider",
    page: "cloud-provider",
    label: "Which cloud provider do you deploy to?",
    options: [
      { id: "aws", label: "Amazon Web Services (AWS)", default: true },
      {
        id: "openshift",
        label: "Red Hat OpenShift on AWS",
        unavailable: "Not part of the guided deployment",
      },
      {
        id: "azure",
        label: "Microsoft Azure",
        unavailable: "Not part of the guided deployment",
      },
      {
        id: "gcp",
        label: "Google Cloud",
        unavailable: "Not part of the guided deployment",
      },
    ],
  },
  {
    id: "regions",
    step: "cloud-provider",
    page: "cloud-provider",
    label: "How many regions do you need?",
    options: [
      {
        id: "1",
        label: "One region",
        description:
          "Three availability zones. Survives the loss of a zone; restore from backups after the loss of a region.",
        default: true,
        regionCount: 1,
      },
      {
        id: "2",
        label: "Two regions",
        description:
          "Recovery in about 15 minutes after a region loss, with a manual failover.",
        regionCount: 2,
      },
      {
        id: "3",
        label: "Three or more regions",
        description:
          "Processing continues through the loss of a region. Requires relational secondary storage, which excludes Optimize.",
        regionCount: 3,
      },
    ],
  },

  // Network
  {
    id: "vpc",
    step: "network",
    page: "network",
    label: "Where does the VPC come from?",
    options: [
      {
        id: "create",
        label: "Create a VPC",
        description: "You have no network yet, or you're evaluating.",
        default: true,
        diagram: {
          groups: [{ id: "vpc", label: "New VPC, three availability zones" }],
        },
      },
      {
        id: "existing",
        label: "Use an existing VPC",
        description:
          "You deploy into an existing AWS landing zone, with its own address plan, routing, and egress.",
        diagram: { groups: [{ id: "vpc", label: "Your existing VPC" }] },
      },
    ],
  },
  {
    id: "link",
    step: "network",
    page: "network",
    label: "How do the regions connect?",
    appliesWhen: { regions: ["2", "3"] },
    notApplicableReason: "Only with two or more regions",
    options: [
      {
        id: "peering",
        label: "VPC peering",
        description:
          "Two regions, and no cross-region network in place yet. Simpler to manage.",
        default: true,
        requires: [
          {
            needs: { regions: ["2"] },
            reason: "Requires two regions: three regions use a transit gateway",
          },
        ],
        diagram: {
          edges: [
            {
              from: "vpc",
              to: "vpc",
              label: "VPC peering",
              cross: "mesh",
              twoWay: true,
            },
          ],
        },
      },
      {
        id: "tgw",
        label: "Transit gateway",
        description:
          "Three or more regions, an existing transit gateway, or a hub-and-spoke topology. Hourly and per-GB charges.",
        diagram: {
          nodes: [{ id: "tgw", label: "Transit gateway", in: "region" }],
          edges: [
            {
              from: "tgw",
              to: "tgw",
              label: "Peering attachment",
              cross: "mesh",
              twoWay: true,
            },
            { from: "tgw", to: "vpc", twoWay: true },
          ],
        },
      },
    ],
  },

  // Compute
  {
    id: "compute",
    step: "compute",
    page: "compute",
    label: "Where does the Orchestration Cluster run?",
    options: [
      {
        id: "eks",
        label: "Amazon EKS",
        description:
          "Kubernetes and the Helm chart, with the full platform. Block storage for each broker.",
        diagram: {
          groups: [{ id: "compute", label: "Amazon EKS cluster" }],
          nodes: [
            { id: "web", label: "Ingress (load balancer)", in: "vpc" },
            {
              id: "ebs",
              label: "Amazon EBS volume for each broker",
              in: "vpc",
              shape: "db",
            },
          ],
          edges: [
            { from: "brokers", to: "ebs", label: "Broker data" },
            { from: "web", to: "oc", label: "REST, gRPC, web applications" },
          ],
        },
      },
      {
        id: "ecs",
        label: "Amazon ECS with Fargate",
        description:
          "Containers without operating Kubernetes. Shared Amazon EFS storage for the brokers, manual scaling.",
        excludes: { storage: ["opensearch"] },
        diagram: {
          groups: [{ id: "compute", label: "Amazon ECS cluster (Fargate)" }],
          nodes: [
            {
              id: "efs",
              label: "Amazon EFS (broker data)",
              in: "vpc",
              shape: "db",
            },
            {
              id: "lease",
              label: "S3 lease bucket, {zone}",
              in: "region",
              shape: "bucket",
            },
            { id: "web", label: "Application Load Balancer", in: "vpc" },
            {
              id: "grpc",
              label: "Network Load Balancer, gRPC 26500",
              in: "vpc",
            },
          ],
          edges: [
            { from: "brokers", to: "efs", label: "Broker data" },
            {
              from: "brokers",
              to: "lease",
              label: "Node ID lease",
              style: "dashed",
            },
            { from: "web", to: "oc", label: "REST, web applications" },
            { from: "grpc", to: "brokers", label: "gRPC" },
            { from: "users", to: "grpc", label: "gRPC 26500" },
          ],
        },
        bom: [
          {
            step: "object-storage",
            text: "Required with Amazon ECS: one node ID lease bucket for each zone, in the region of the zone",
          },
        ],
      },
      {
        id: "ec2",
        label: "Amazon EC2",
        description:
          "The Camunda single application on virtual machines. One instance in each of three availability zones.",
        requires: [
          {
            needs: { regions: ["1"] },
            reason: "Requires a single region",
          },
        ],
        excludes: { storage: ["aurora"] },
        diagram: {
          groups: [
            {
              id: "compute",
              label: "Amazon EC2 instances, one for each availability zone",
            },
          ],
          nodes: [
            { id: "web", label: "Application Load Balancer", in: "vpc" },
            {
              id: "grpc",
              label: "Network Load Balancer, gRPC 26500",
              in: "vpc",
            },
          ],
          edges: [
            { from: "web", to: "oc", label: "REST, web applications" },
            { from: "grpc", to: "brokers", label: "gRPC" },
            { from: "users", to: "grpc", label: "gRPC 26500" },
          ],
        },
      },
    ],
  },

  // Secondary storage
  {
    id: "storage",
    step: "secondary-storage",
    page: "secondary-storage",
    label: "Which secondary storage does the cluster use?",
    options: [
      {
        id: "aurora",
        label: "Aurora PostgreSQL (RDBMS)",
        description:
          "Relational operations and moderate query workloads. The guided storage stage creates it.",
        diagram: {
          nodes: [
            {
              id: "db",
              label: "Aurora PostgreSQL",
              in: "vpc",
              shape: "db",
              when: { regions: ["1"] },
            },
            {
              id: "db",
              label: "Aurora PostgreSQL, primary (writer)",
              in: "vpc",
              shape: "db",
              regions: "first",
              unless: { regions: ["1"] },
            },
            {
              id: "db",
              label: "Aurora PostgreSQL, secondary",
              in: "vpc",
              shape: "db",
              regions: "others",
              unless: { regions: ["1"] },
            },
          ],
          edges: [
            { from: "oc", to: "db", label: "Secondary storage" },
            {
              from: "db",
              to: "db",
              label: "Aurora Global Database replication",
              cross: "fromFirst",
              style: "dashed",
            },
          ],
        },
      },
      {
        id: "opensearch",
        label: "Amazon OpenSearch Service or Elasticsearch",
        description:
          "Search-heavy, filter-heavy, and analytics-heavy workloads. Required by Optimize.",
        requires: [
          {
            needs: { regions: ["1", "2"] },
            reason:
              "Requires one or two regions: three regions use relational secondary storage",
          },
        ],
        diagram: {
          nodes: [
            {
              id: "db",
              label: "Amazon OpenSearch Service domain",
              in: "vpc",
              shape: "db",
              when: { compute: ["ec2"] },
            },
            {
              id: "db",
              label: "Elasticsearch or OpenSearch",
              in: "vpc",
              shape: "db",
              unless: { compute: ["ec2"] },
            },
            {
              id: "optimize",
              label: "Optimize",
              in: "compute",
              when: { compute: ["eks"] },
            },
          ],
          edges: [
            { from: "oc", to: "db", label: "Secondary storage" },
            { from: "optimize", to: "db" },
          ],
        },
      },
    ],
  },
  {
    id: "dbClass",
    step: "secondary-storage",
    page: "secondary-storage",
    label: "Which Aurora instance class do you start with?",
    appliesWhen: { storage: ["aurora"] },
    notApplicableReason: "Only with Aurora PostgreSQL",
    options: [
      {
        id: "t3",
        label: "db.t3.medium",
        description: "A demonstration in one region. No Global Database.",
        default: true,
        requires: [
          {
            needs: { regions: ["1"] },
            reason:
              "Requires a single region: Aurora Global Databases don't support db.t3",
          },
        ],
      },
      {
        id: "r6g",
        label: "db.r6g.large or another r-class",
        description: "A deployment that grows to a second region.",
      },
      {
        id: "serverless",
        label: "db.serverless",
        description: "A deployment with a varying load.",
      },
    ],
  },

  // Object storage
  {
    id: "backup",
    step: "object-storage",
    page: "object-storage",
    label: "Do you create a backup bucket?",
    options: [
      {
        id: "create",
        label: "Create a backup bucket (recommended)",
        description:
          "One bucket for the whole cluster, in the first region. Camunda writes its backups here and restores from here.",
        default: true,
        diagram: {
          nodes: [
            {
              id: "backup",
              label: "S3 backup bucket",
              in: "region",
              shape: "bucket",
              regions: "first",
            },
          ],
          edges: [
            { from: "oc", to: "backup", label: "Backups", style: "dashed" },
          ],
        },
      },
      {
        id: "none",
        label: "No backup bucket",
        description:
          "Camunda runs without backups, so you can't restore after losing data or a region.",
      },
    ],
  },

  // Exposure
  {
    id: "tls",
    step: "exposure",
    page: "exposure",
    label: "How do users reach the web applications?",
    options: [
      {
        id: "http",
        label: "Plain HTTP on port 80",
        description: "Open to the internet. Suited to a demonstration.",
        default: true,
        diagram: {
          edges: [{ from: "users", to: "web", label: "HTTP 80" }],
        },
      },
      {
        id: "https",
        label: "HTTPS with your certificate and DNS name",
        description:
          "A certificate in AWS Certificate Manager and a DNS name that you control. Port 80 redirects to 443.",
        diagram: {
          nodes: [
            {
              id: "dns",
              label: "Your DNS record, camunda.example.com",
              shape: "external",
            },
            {
              id: "cert",
              label: "ACM certificate",
              in: "region",
            },
          ],
          edges: [
            { from: "users", to: "dns", label: "Resolves" },
            {
              from: "dns",
              to: "web",
              label: "Alias or CNAME",
              style: "dashed",
            },
            { from: "users", to: "web", label: "HTTPS 443" },
            { from: "cert", to: "web", label: "TLS", style: "dashed" },
          ],
        },
      },
    ],
  },
  {
    id: "raftNlb",
    step: "exposure",
    page: "exposure",
    label: "Do you create the internal load balancer for broker traffic?",
    appliesWhen: { compute: ["ecs"] },
    notApplicableReason: "Only with Amazon ECS",
    options: [
      {
        id: "yes",
        label: "Create it from the start",
        description:
          "Brokers of another region join through it. Adding it later can replace the ECS service.",
        default: true,
        diagram: {
          nodes: [
            {
              id: "raft",
              label: "Internal Network Load Balancer, brokers 26502",
              in: "vpc",
              when: { compute: ["ecs"] },
            },
          ],
          edges: [
            { from: "raft", to: "brokers", label: "Raft" },
            {
              from: "raft",
              to: "raft",
              label: "Broker traffic 26502",
              cross: "mesh",
              twoWay: true,
            },
          ],
        },
      },
      {
        id: "no",
        label: "Not now",
        description: "A single region that you don't plan to grow.",
        requires: [
          {
            needs: { regions: ["1"] },
            reason:
              "Requires a single region: brokers of the other regions join through it",
          },
        ],
      },
    ],
  },

  // Orchestration Cluster
  {
    id: "auth",
    step: "identity",
    page: "identity",
    label: "How do users and clients sign in?",
    options: [
      {
        id: "basic",
        label: "Basic: built-in users",
        description:
          "A standalone cluster, or an evaluation. Passwords are generated and stored in Secrets Manager.",
        default: true,
        requires: [
          {
            needs: { managementPlane: ["none"] },
            reason: "Camunda Hub and Management Identity need an OIDC provider",
          },
        ],
        diagram: {
          nodes: [
            {
              id: "secrets",
              label: "Secrets Manager, generated passwords",
              in: "region",
              regions: "first",
              when: { compute: ["ecs"] },
            },
          ],
          edges: [{ from: "oc", to: "secrets", style: "dashed" }],
        },
      },
      {
        id: "oidc",
        label: "OIDC: an identity provider",
        description:
          "Your own provider, or the identity provider of the management plane. Required by Camunda Hub.",
        diagram: {
          nodes: [
            {
              id: "idp",
              label: "Your OIDC provider",
              shape: "external",
              unless: { idp: ["guide"] },
            },
          ],
          edges: [
            {
              from: "oc",
              to: "idp",
              label: "OIDC sign-in",
              style: "dashed",
            },
          ],
        },
      },
    ],
  },
  {
    id: "zones",
    step: "orchestration-cluster",
    page: "oc-zones",
    label: "How are brokers and replicas laid out over zones?",
    options: [
      {
        id: "1-zone",
        label: "One zone: three brokers, three replicas",
        description: "A single region. Replication factor 3.",
        zoneLayout: [3],
        zoneLabel: "3",
        requires: [
          { needs: { regions: ["1"] }, reason: "Requires one region" },
        ],
      },
      {
        id: "3-3",
        label: "Two zones: 3-3",
        description:
          "Each region holds a full copy. Replication factor 6. Losing a region stops processing until you remove the failed zone.",
        zoneLayout: [3, 3],
        zoneLabel: "3-3",
        requires: [
          { needs: { regions: ["2"] }, reason: "Requires two regions" },
        ],
      },
      {
        id: "3-3-1",
        label: "Three zones: 3-3-1",
        description:
          "Replication factor 7. Processing continues when one region fails. A small third region carries a vote.",
        zoneLayout: [3, 3, 1],
        zoneLabel: "3-3-1",
        requires: [
          { needs: { regions: ["3"] }, reason: "Requires three regions" },
        ],
      },
      {
        id: "2-2-1",
        label: "Three zones: 2-2-1",
        description:
          "Replication factor 5. Follows the same rule: no zone holds half of the replicas.",
        zoneLayout: [2, 2, 1],
        zoneLabel: "2-2-1",
        requires: [
          { needs: { regions: ["3"] }, reason: "Requires three regions" },
        ],
      },
    ],
  },

  // Management plane
  {
    id: "managementPlane",
    step: "management-plane",
    page: "management-plane",
    label: "Do you deploy Camunda Hub and Management Identity?",
    options: [
      {
        id: "none",
        label: "No management plane",
        description: "The Orchestration Cluster and Connectors only.",
        default: true,
      },
      {
        id: "deploy",
        label: "Deploy the management plane",
        description:
          "Camunda Hub and Management Identity, once for several Orchestration Clusters, each with its own database. Sign-in then uses OIDC.",
        requires: [
          {
            needs: { compute: ["eks", "ecs"] },
            reason: "Camunda Hub isn't supported on Amazon EC2",
          },
          {
            when: { compute: ["ecs"] },
            needs: { regions: ["1"] },
            reason: "With Amazon ECS, requires a single region",
          },
        ],
        diagram: {
          groups: [
            {
              id: "mp",
              label: "Management plane",
              parent: "compute",
              regions: "first",
              when: { compute: ["eks"] },
            },
            {
              id: "mp",
              label: "Management plane, with its own stages",
              regions: "first",
              unless: { compute: ["eks"] },
            },
          ],
          nodes: [
            { id: "hub", label: "Camunda Hub", in: "mp" },
            { id: "mi", label: "Management Identity", in: "mp" },
            {
              id: "mpdb",
              label: "Databases of the management plane",
              in: "mp",
              shape: "db",
            },
          ],
          edges: [
            { from: "users", to: "hub", label: "Design and manage" },
            { from: "hub", to: "mi", label: "Roles" },
            { from: "hub", to: "oc", label: "REST, gRPC, health" },
            { from: "hub", to: "mpdb" },
            { from: "mi", to: "mpdb" },
            { from: "hub", to: "idp", label: "Sign-in", style: "dashed" },
            { from: "mi", to: "idp", label: "Sign-in", style: "dashed" },
          ],
        },
      },
    ],
  },
  {
    id: "idp",
    step: "management-plane",
    page: "identity-provider",
    label: "Which OIDC provider do the management plane and the clusters use?",
    appliesWhen: { managementPlane: ["deploy"] },
    notApplicableReason: "Only with the management plane",
    options: [
      {
        id: "guide",
        label: "Deploy the identity provider of this guide",
        description:
          "An OIDC provider in the management plane, with a client for each cluster and component.",
        default: true,
        diagram: {
          nodes: [
            { id: "idp", label: "OIDC provider", in: "mp", regions: "first" },
          ],
        },
      },
      {
        id: "own",
        label: "Use your own provider",
        description: "Such as Microsoft Entra ID or Okta.",
      },
    ],
  },
];

/**
 * Quick lookups and the global order of the questions, which is the order of
 * the steps and, inside a step, the order of its questions.
 */
const questionOrder = steps.flatMap((step) => step.questions);

/** @type {Record<string, Question>} */
const questionsById = Object.fromEntries(questions.map((q) => [q.id, q]));

/** @type {Record<string, Step>} */
const stepsById = Object.fromEntries(steps.map((s) => [s.id, s]));

/** @type {Record<string, Page>} */
const pagesById = Object.fromEntries(pages.map((p) => [p.id, p]));

module.exports = {
  steps,
  pages,
  groups,
  base,
  questions,
  questionOrder,
  questionsById,
  stepsById,
  pagesById,
};
