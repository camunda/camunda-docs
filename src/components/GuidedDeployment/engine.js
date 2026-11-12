// @ts-check
/**
 * The rules engine of the guided deployment. It has no React and no browser
 * code, so it runs in the build, in the browser, and in the unit tests.
 *
 * Choices are a plain object from question id to option id, such as
 * `{ regions: "2", compute: "ecs" }`. Only what the reader picked is stored.
 * `resolve()` turns choices into the state of every question: which options
 * are enabled and why not, which answer applies (picked, default, or the only
 * one left), and which picked answers no longer hold.
 */

const model = require("./model");

/**
 * @typedef {import("./model").Condition} Condition
 * @typedef {import("./model").Option} Option
 * @typedef {import("./model").Question} Question
 * @typedef {Record<string, string>} Choices
 * @typedef {{ option: Option, enabled: boolean, reasons: string[] }} OptionState
 * @typedef {"chosen" | "default" | "only" | "unset" | "not-applicable"} Source
 * @typedef {object} QuestionState
 * @property {Question} question
 * @property {boolean} applicable
 * @property {OptionState[]} options
 * @property {string | undefined} value The answer that applies, if any.
 * @property {Source} source
 * @typedef {{ question: string, option: string, reason: string }} Dropped
 * @typedef {object} Resolution
 * @property {Record<string, QuestionState>} questions
 * @property {Record<string, string>} values Answers that apply, defaults included.
 * @property {Choices} chosen Picked answers that still hold.
 * @property {Dropped[]} dropped Picked answers that no longer hold, and why.
 */

/**
 * Returns the option of a question, or undefined.
 *
 * @param {string} questionId
 * @param {string | undefined} optionId
 */
function findOption(questionId, optionId) {
  const question = model.questionsById[questionId];
  return question?.options.find((o) => o.id === optionId);
}

/**
 * Whether a condition holds. An unknown answer counts as `unknown`: the
 * caller decides whether that passes (`lenient`) or fails (`strict`).
 *
 * @param {Condition | undefined} condition
 * @param {Record<string, string | undefined>} values
 * @param {"lenient" | "strict"} mode
 */
function holds(condition, values, mode) {
  if (!condition) return true;
  return Object.entries(condition).every(([questionId, allowed]) => {
    const value = values[questionId];
    if (value === undefined) return mode === "lenient";
    return allowed.includes(value);
  });
}

/**
 * Lists the labels of the options that a condition allows: "Amazon EKS or
 * Amazon ECS with Fargate".
 *
 * @param {Condition} condition
 */
function describeCondition(condition) {
  return Object.entries(condition)
    .map(([questionId, allowed]) =>
      allowed.map((id) => findOption(questionId, id)?.label ?? id).join(" or ")
    )
    .join(", and ");
}

/**
 * Why an option is disabled, given the answers to the questions before it.
 * An empty list means the option is enabled.
 *
 * @param {Question} question
 * @param {Option} option
 * @param {Record<string, string>} earlier Answers that apply to earlier questions.
 */
function disabledReasons(question, option, earlier) {
  /** @type {string[]} */
  const reasons = [];
  if (option.unavailable) reasons.push(option.unavailable);
  for (const requirement of option.requires ?? []) {
    if (!holds(requirement.when, earlier, "strict")) continue;
    if (!holds(requirement.needs, earlier, "lenient")) {
      reasons.push(
        requirement.reason ?? `Requires ${describeCondition(requirement.needs)}`
      );
    }
  }
  for (const [questionId, value] of Object.entries(earlier)) {
    const chosen = findOption(questionId, value);
    if (chosen?.excludes?.[question.id]?.includes(option.id)) {
      reasons.push(`Not available with ${chosen.label}`);
    }
  }
  return reasons;
}

/**
 * Resolves choices into the state of every question, in the order of the
 * guide. Each question only sees the answers to the questions before it.
 *
 * @param {Choices} choices
 * @returns {Resolution}
 */
function resolve(choices) {
  /** @type {Record<string, string>} */
  const values = {};
  /** @type {Choices} */
  const chosen = {};
  /** @type {Dropped[]} */
  const dropped = [];
  /** @type {Record<string, QuestionState>} */
  const questions = {};

  for (const questionId of model.questionOrder) {
    const question = model.questionsById[questionId];
    const picked = choices[questionId];
    const applicable = holds(question.appliesWhen, values, "lenient");

    if (!applicable) {
      questions[questionId] = {
        question,
        applicable,
        options: question.options.map((option) => ({
          option,
          enabled: false,
          reasons: [],
        })),
        value: undefined,
        source: "not-applicable",
      };
      if (picked !== undefined) {
        dropped.push({
          question: questionId,
          option: picked,
          reason: question.notApplicableReason ?? "No longer applies",
        });
      }
      continue;
    }

    const options = question.options.map((option) => {
      const reasons = disabledReasons(question, option, values);
      return { option, enabled: reasons.length === 0, reasons };
    });
    const enabled = options.filter((o) => o.enabled);

    /** @type {string | undefined} */
    let value;
    /** @type {Source} */
    let source = "unset";

    if (picked !== undefined) {
      const state = options.find((o) => o.option.id === picked);
      if (state?.enabled) {
        value = picked;
        source = "chosen";
        chosen[questionId] = picked;
      } else {
        dropped.push({
          question: questionId,
          option: picked,
          reason: state ? state.reasons.join(". ") : "Unknown option",
        });
      }
    }
    if (value === undefined) {
      const fallback = enabled.find((o) => o.option.default);
      if (fallback) {
        value = fallback.option.id;
        source = "default";
      } else if (enabled.length === 1) {
        value = enabled[0].option.id;
        source = "only";
      }
    }
    if (value !== undefined) values[questionId] = value;
    questions[questionId] = { question, applicable, options, value, source };
  }

  return { questions, values, chosen, dropped };
}

/**
 * Sets one answer and clears the later answers that it invalidates. Passing
 * `undefined` clears the answer.
 *
 * @param {Choices} choices
 * @param {string} questionId
 * @param {string | undefined} optionId
 * @returns {{ choices: Choices, cleared: Dropped[] }}
 */
function choose(choices, questionId, optionId) {
  const next = { ...choices };
  if (optionId === undefined) delete next[questionId];
  else next[questionId] = optionId;
  const resolution = resolve(next);
  return {
    choices: resolution.chosen,
    cleared: resolution.dropped.filter((d) => d.question !== questionId),
  };
}

/**
 * Turns a cleared answer into a sentence for the reader.
 *
 * @param {Dropped} dropped
 */
function describeCleared(dropped) {
  const question = model.questionsById[dropped.question];
  const step = question ? model.stepsById[question.step] : undefined;
  const option = findOption(dropped.question, dropped.option);
  return `${step?.title ?? dropped.question}: "${
    option?.label ?? dropped.option
  }" was cleared. ${dropped.reason}.`;
}

/**
 * Encodes choices as query string parameters, in the order of the guide.
 *
 * @param {Choices} choices
 */
function encodeChoices(choices) {
  const params = new URLSearchParams();
  for (const questionId of model.questionOrder) {
    if (choices[questionId] !== undefined) {
      params.set(questionId, choices[questionId]);
    }
  }
  return params.toString();
}

/**
 * Reads choices from a query string. Unknown keys and values are ignored, and
 * the result is resolved, so a hand-edited link can't select a combination
 * that the rules forbid. Returns `undefined` when the query string has no
 * choices at all.
 *
 * @param {string} search
 * @returns {Choices | undefined}
 */
function decodeChoices(search) {
  const params = new URLSearchParams(search);
  /** @type {Choices} */
  const choices = {};
  let found = false;
  for (const questionId of model.questionOrder) {
    const value = params.get(questionId);
    if (value === null) continue;
    found = true;
    if (findOption(questionId, value)) choices[questionId] = value;
  }
  if (!found) return undefined;
  return resolve(choices).chosen;
}

/**
 * Removes the choice parameters from a query string and keeps the others.
 *
 * @param {string} search
 */
function withoutChoices(search) {
  const params = new URLSearchParams(search);
  for (const questionId of model.questionOrder) params.delete(questionId);
  return params.toString();
}

/**
 * Builds a query string from other parameters and the choices.
 *
 * @param {string} search The current query string, which may hold other parameters.
 * @param {Choices} choices
 */
function searchWithChoices(search, choices) {
  const others = withoutChoices(search);
  const encoded = encodeChoices(choices);
  const joined = [others, encoded].filter(Boolean).join("&");
  return joined ? `?${joined}` : "";
}

/**
 * Whether a page belongs to the flow for the answers that apply. Unanswered
 * questions keep a page in the flow.
 *
 * @param {import("./model").Page} page
 * @param {Record<string, string>} chosen
 */
function pageInFlow(page, chosen) {
  return holds(page.shownWhen, chosen, "lenient");
}

/**
 * The next page of the flow after a page, skipping the pages that the
 * choices rule out.
 *
 * @param {string} pageId
 * @param {Choices} chosen
 */
function nextPage(pageId, chosen) {
  const index = model.pages.findIndex((p) => p.id === pageId);
  if (index < 0) return undefined;
  return model.pages.slice(index + 1).find((p) => pageInFlow(p, chosen));
}

/**
 * The previous page of the flow before a page.
 *
 * @param {string} pageId
 * @param {Choices} chosen
 */
function previousPage(pageId, chosen) {
  const index = model.pages.findIndex((p) => p.id === pageId);
  if (index <= 0) return undefined;
  return model.pages
    .slice(0, index)
    .reverse()
    .find((p) => pageInFlow(p, chosen));
}

/**
 * The progress of every step: done when every question that applies has an
 * answer that the reader picked or that is the only one left, open otherwise.
 * A step without questions is informational.
 *
 * @param {Resolution} resolution
 */
function progress(resolution) {
  return model.steps.map((step) => {
    const states = step.questions.map((id) => resolution.questions[id]);
    const asked = states.filter((s) => s.applicable);
    /** @type {"done" | "open" | "info"} */
    let status;
    if (step.questions.length === 0) status = "info";
    else
      status = asked.every((s) => s.source === "chosen" || s.source === "only")
        ? "done"
        : "open";
    const selections = asked
      .filter((s) => s.value !== undefined)
      .map((s) => ({
        question: s.question.id,
        label: findOption(s.question.id, s.value)?.label ?? String(s.value),
        source: s.source,
      }));
    return { step, status, selections };
  });
}

/**
 * Whether content applies to the reader's choices. Used by the conditional
 * content of the pages: an unanswered question shows the content, so the
 * default view, and the static build, show everything.
 *
 * @param {Condition} condition
 * @param {Choices} chosen
 */
function contentApplies(condition, chosen) {
  return holds(condition, chosen, "lenient");
}

/**
 * The bill of materials: one row for each question that applies, with the
 * answer and where it comes from, plus the notes that the answers add to a
 * step, such as the buckets of object storage.
 *
 * @param {Resolution} resolution
 */
function billOfMaterials(resolution) {
  return model.steps.map((step) => {
    const rows = step.questions
      .map((id) => resolution.questions[id])
      .filter((s) => s.applicable)
      .map((s) => ({
        question: s.question,
        option:
          s.value === undefined
            ? undefined
            : findOption(s.question.id, s.value),
        source: s.source,
      }));
    const notes = [
      ...model.base.bom,
      ...model.questions.flatMap((q) =>
        resolution.values[q.id] === undefined
          ? []
          : (findOption(q.id, resolution.values[q.id])?.bom ?? [])
      ),
    ]
      .filter((note) => note.step === step.id)
      .filter(
        (note) =>
          holds(note.when, resolution.values, "strict") &&
          (!note.unless || !holds(note.unless, resolution.values, "strict"))
      )
      .map((note) => note.text);
    return { step, rows, notes };
  });
}

module.exports = {
  holds,
  findOption,
  resolve,
  choose,
  describeCleared,
  encodeChoices,
  decodeChoices,
  searchWithChoices,
  withoutChoices,
  nextPage,
  previousPage,
  pageInFlow,
  progress,
  contentApplies,
  billOfMaterials,
};
