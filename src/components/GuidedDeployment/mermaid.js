// @ts-check
/**
 * Generates Mermaid flowcharts from the model of the guided deployment:
 *
 * - `architectureDiagram(choices)`: the architecture that the choices
 *   describe, composed from the diagram contributions of the base and of every
 *   answer that applies.
 * - `allOptionsDiagram()`: every step, question, and option, with the rules
 *   between them.
 *
 * Both are plain strings, so they can be tested without a browser and shown
 * with `@theme/Mermaid`.
 */

const model = require("./model");
const engine = require("./engine");

const REGION_NAMES = ["A", "B", "C"];

/**
 * @typedef {import("./model").DiagramContribution} DiagramContribution
 * @typedef {import("./model").NodeContribution} NodeContribution
 * @typedef {import("./model").EdgeContribution} EdgeContribution
 * @typedef {import("./model").Condition} Condition
 * @typedef {{ when?: Condition, unless?: Condition }} Guarded
 */

/**
 * Escapes a label for a quoted Mermaid string.
 *
 * @param {string} text
 */
function quote(text) {
  return `"${text.replace(/"/g, "#quot;")}"`;
}

/**
 * Makes an identifier safe for Mermaid.
 *
 * @param {string} text
 */
function safeId(text) {
  return text.replace(/[^A-Za-z0-9_]/g, "_");
}

/**
 * Whether a contribution applies to the answers.
 *
 * @param {Guarded} item
 * @param {Record<string, string>} values
 */
function active(item, values) {
  return (
    engine.holds(item.when, values, "strict") &&
    (!item.unless || !engine.holds(item.unless, values, "strict"))
  );
}

/**
 * The contributions of the base and of every answer that applies, in the
 * order of the guide.
 *
 * @param {Record<string, string>} values
 * @returns {DiagramContribution[]}
 */
function contributions(values) {
  const fromAnswers = model.questionOrder
    .map((id) => engine.findOption(id, values[id])?.diagram)
    .filter(Boolean);
  return /** @type {DiagramContribution[]} */ ([
    model.base.diagram,
    ...fromAnswers,
  ]);
}

/**
 * Builds the architecture diagram of a set of choices.
 *
 * @param {import("./engine").Choices} choices
 * @returns {string}
 */
function architectureDiagram(choices) {
  const { values } = engine.resolve(choices);
  const regionCount =
    engine.findOption("regions", values.regions)?.regionCount ?? 1;
  const layout = engine.findOption("zones", values.zones)?.zoneLayout;
  const regionIndexes = [...Array(regionCount).keys()];

  /** @param {number} i */
  const zoneOf = (i) => `zone-${String.fromCharCode(97 + i)}`;
  /** @param {number} i */
  const brokersOf = (i) => (layout ? layout[i] : 3);
  /**
   * @param {string} label
   * @param {number | null} i
   */
  const fill = (label, i) => {
    if (i === null) return label;
    const zone = zoneOf(i);
    const brokers = brokersOf(i);
    const range =
      brokers === 1 ? `${zone}_0` : `${zone}_0 to ${zone}_${brokers - 1}`;
    return label
      .replace(/\{region\}/g, REGION_NAMES[i] ?? String(i + 1))
      .replace(/\{zone\}/g, zone)
      .replace(/\{brokers\}/g, String(brokers))
      .replace(/\{brokerRange\}/g, range);
  };

  const parts = contributions(values);

  // Labels, parents, and region limits of the groups. Later answers win.
  /** @type {Record<string, { label: string, parent: string | null, regions?: "first" | "others" }>} */
  const groups = {};
  for (const part of parts) {
    for (const g of part.groups ?? []) {
      if (!active(g, values)) continue;
      groups[g.id] = {
        label: g.label ?? groups[g.id]?.label ?? g.id,
        parent: g.parent ?? model.groups[g.id].parent,
        regions: g.regions,
      };
    }
  }

  /**
   * The chain of groups from a container up to the root, as defined.
   *
   * @param {string | null | undefined} groupId
   */
  const chain = (groupId) => {
    /** @type {string[]} */
    const result = [];
    let current = groupId ?? null;
    while (current) {
      result.push(current);
      current =
        groups[current]?.parent ?? model.groups[current]?.parent ?? null;
    }
    return result;
  };

  /**
   * Regions where something placed in a group exists: all of them when the
   * chain has a per-region group, limited by `regions` of the item and of
   * its groups. `[null]` means a single instance outside the regions.
   *
   * @param {string | null | undefined} groupId
   * @param {"first" | "others" | undefined} regions
   * @returns {(number | null)[]}
   */
  const instancesOf = (groupId, regions) => {
    const path = chain(groupId);
    if (!path.some((g) => model.groups[g]?.perRegion)) return [null];
    const limits = [regions, ...path.map((g) => groups[g]?.regions)];
    return regionIndexes.filter((i) =>
      limits.every(
        (limit) =>
          !limit ||
          (limit === "first" && i === 0) ||
          (limit === "others" && i > 0)
      )
    );
  };

  /**
   * @param {string} id
   * @param {number | null} i
   */
  const instanceId = (id, i) =>
    safeId(i === null ? id : `${id}_${String.fromCharCode(97 + i)}`);

  /**
   * The nearest group in the chain that is drawn, for an instance.
   *
   * @param {string | null | undefined} groupId
   * @param {number | null} i
   * @returns {string | null}
   */
  const containerOf = (groupId, i) => {
    for (const g of chain(groupId)) {
      if (!groups[g]) continue;
      return instanceId(g, model.groups[g].perRegion ? i : null);
    }
    return null;
  };

  // Nodes, with the container that each instance lands in.
  /** @type {{ id: string, label: string, shape: string, container: string | null, external: boolean }[]} */
  const nodes = [];
  /** @type {Record<string, (number | null)[]>} */
  const nodeInstances = {};
  for (const part of parts) {
    for (const n of part.nodes ?? []) {
      if (!active(n, values)) continue;
      const instances = instancesOf(n.in, n.regions);
      nodeInstances[n.id] = [...(nodeInstances[n.id] ?? []), ...instances];
      for (const i of instances) {
        nodes.push({
          id: instanceId(n.id, i),
          label: fill(n.label, i),
          shape: n.shape ?? "box",
          container: containerOf(n.in, i),
          external: n.shape === "external",
        });
      }
    }
  }

  // Group instances, and which of them hold something.
  /** @type {{ id: string, label: string, container: string | null }[]} */
  const groupInstances = [];
  /** @type {Record<string, (number | null)[]>} */
  const groupInstanceIndexes = {};
  for (const groupId of Object.keys(model.groups)) {
    if (!groups[groupId]) continue;
    const perRegion = model.groups[groupId].perRegion;
    const instances = perRegion
      ? instancesOf(groupId, undefined)
      : /** @type {(number | null)[]} */ ([null]);
    groupInstanceIndexes[groupId] = instances;
    for (const i of instances) {
      groupInstances.push({
        id: instanceId(groupId, i),
        label: fill(groups[groupId].label, i),
        container: containerOf(groups[groupId].parent, i),
      });
    }
  }
  /** @type {Set<string>} */
  const filled = new Set();
  for (const node of nodes) {
    let container = node.container;
    while (container && !filled.has(container)) {
      filled.add(container);
      container =
        groupInstances.find((g) => g.id === container)?.container ?? null;
    }
  }
  const drawnGroups = groupInstances.filter((g) => filled.has(g.id));
  const drawn = new Set([...nodes.map((n) => n.id), ...filled]);

  // Edges.
  /** @type {string[]} */
  const edgeLines = [];
  /** @type {Set<string>} */
  const seen = new Set();
  /**
   * @param {string} id
   * @returns {(number | null)[]}
   */
  const endpoints = (id) =>
    (nodeInstances[id] ?? groupInstanceIndexes[id] ?? []).filter((i) =>
      drawn.has(instanceId(id, i))
    );
  for (const part of parts) {
    for (const e of part.edges ?? []) {
      if (!active(e, values)) continue;
      const from = endpoints(e.from);
      const to = endpoints(e.to);
      /** @type {[number | null, number | null][]} */
      let pairs = [];
      if (e.cross === "mesh") {
        for (const a of from)
          for (const b of to)
            if (a !== null && b !== null && a < b) pairs.push([a, b]);
      } else if (e.cross === "fromFirst") {
        pairs = to.filter((b) => b !== null && b > 0).map((b) => [0, b]);
        pairs = pairs.filter(([a]) => from.includes(a));
      } else {
        const fan = from.length === 1 || to.length === 1;
        for (const a of from)
          for (const b of to)
            if (fan || a === null || b === null || a === b) pairs.push([a, b]);
      }
      const arrow =
        e.style === "dashed"
          ? e.twoWay
            ? "<-.->"
            : "-.->"
          : e.twoWay
            ? "<-->"
            : "-->";
      for (const [a, b] of pairs) {
        const line = `${instanceId(e.from, a)} ${arrow}${
          e.label ? `|${quote(e.label)}|` : ""
        } ${instanceId(e.to, b)}`;
        if (seen.has(line)) continue;
        seen.add(line);
        edgeLines.push(line);
      }
    }
  }

  // Output, nested from the root.
  /** @type {string[]} */
  const lines = ["flowchart TB", "  classDef external stroke-dasharray: 5 5"];
  /**
   * @param {{ id: string, label: string, shape: string, external: boolean }} node
   */
  const nodeLine = (node) => {
    const label = quote(node.label);
    switch (node.shape) {
      case "db":
      case "bucket":
        return `${node.id}[(${label})]`;
      case "external":
        return `${node.id}([${label}]):::external`;
      default:
        return `${node.id}[${label}]`;
    }
  };
  /**
   * @param {string | null} container
   * @param {string} indent
   */
  const emit = (container, indent) => {
    for (const node of nodes.filter((n) => n.container === container)) {
      lines.push(`${indent}${nodeLine(node)}`);
    }
    for (const group of drawnGroups.filter((g) => g.container === container)) {
      lines.push(`${indent}subgraph ${group.id}[${quote(group.label)}]`);
      emit(group.id, `${indent}  `);
      lines.push(`${indent}end`);
    }
  };
  emit(null, "  ");
  for (const line of edgeLines) lines.push(`  ${line}`);
  return lines.join("\n");
}

/**
 * Builds the diagram of every option and rule of the model.
 *
 * @returns {string}
 */
function allOptionsDiagram() {
  /** @param {string} q @param {string} o */
  const optionId = (q, o) => safeId(`${q}__${o}`);
  /** @type {string[]} */
  const lines = [
    "flowchart TB",
    "  classDef unavailable stroke-dasharray: 5 5,opacity:0.6",
  ];
  /** @type {string[]} */
  const edges = [];

  /**
   * One edge from an option to every option a condition names.
   *
   * @param {string} from
   * @param {Condition} condition
   * @param {string} label
   * @param {"requires" | "excludes" | "asks"} kind
   */
  const conditionEdges = (from, condition, label, kind) => {
    for (const [q, allowed] of Object.entries(condition)) {
      const text =
        allowed.length > 1 && kind === "requires" ? `${label} one of` : label;
      for (const o of allowed) {
        const target = optionId(q, o);
        if (kind === "excludes")
          edges.push(`  ${from} -- ${quote(text)} --x ${target}`);
        else if (kind === "asks")
          edges.push(`  ${target} -. ${quote(text)} .-> ${from}`);
        else edges.push(`  ${from} -. ${quote(text)} .-> ${target}`);
      }
    }
  };

  for (const step of model.steps) {
    lines.push(`  subgraph step_${safeId(step.id)}[${quote(step.title)}]`);
    if (step.questions.length === 0) {
      lines.push(
        `    step_${safeId(step.id)}_info[${quote("No decision: follows from the choices above")}]`
      );
    }
    for (const questionId of step.questions) {
      const question = model.questionsById[questionId];
      const groupId = `q_${safeId(questionId)}`;
      lines.push(`    subgraph ${groupId}[${quote(question.label)}]`);
      for (const option of question.options) {
        const id = optionId(questionId, option.id);
        lines.push(
          `      ${id}[${quote(option.label)}]${option.unavailable ? ":::unavailable" : ""}`
        );
        for (const requirement of option.requires ?? []) {
          const when = requirement.when
            ? Object.entries(requirement.when)
                .flatMap(([q, os]) =>
                  os.map((o) => engine.findOption(q, o)?.label ?? o)
                )
                .join(" or ")
            : "";
          conditionEdges(
            id,
            requirement.needs,
            when ? `with ${when}, requires` : "requires",
            "requires"
          );
        }
        if (option.excludes) {
          conditionEdges(id, option.excludes, "excludes", "excludes");
        }
      }
      lines.push("    end");
      if (question.appliesWhen) {
        conditionEdges(groupId, question.appliesWhen, "asks", "asks");
      }
    }
    lines.push("  end");
  }
  // Invisible links keep the steps in the order of the guide, top to bottom,
  // although the rules point back at earlier steps.
  const order = `  ${model.steps.map((s) => `step_${safeId(s.id)}`).join(" ~~~ ")}`;
  return [...lines, order, ...edges].join("\n");
}

module.exports = { architectureDiagram, allOptionsDiagram };
