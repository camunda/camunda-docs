// @ts-check

const fs = require("fs");
const path = require("path");
const model = require("./model");

const GUIDED = path.join(
  __dirname,
  "../../../docs/self-managed/reference-architecture/guided"
);

/** @param {string} pagePath */
const read = (pagePath) =>
  fs.readFileSync(path.join(GUIDED, `${pagePath}.md`), "utf8");

describe("guided pages", () => {
  it("ask every question on exactly one page, the one the model names", () => {
    /** @type {Record<string, string[]>} */
    const askedOn = {};
    for (const page of model.pages) {
      const source = read(page.path);
      for (const [, kind, id] of source.matchAll(
        /<ChoicePanel (step|question)="([^"]+)"/g
      )) {
        const ids = kind === "step" ? model.stepsById[id].questions : [id];
        for (const q of ids) askedOn[q] = [...(askedOn[q] ?? []), page.id];
      }
    }
    for (const question of model.questions) {
      expect([question.id, askedOn[question.id]]).toEqual([
        question.id,
        [question.page],
      ]);
    }
  });

  it("replace the sidebar pagination with the guided flow", () => {
    for (const page of model.pages) {
      const source = read(page.path);
      expect([page.id, source.includes("<GuidedNext />")]).toEqual([
        page.id,
        true,
      ]);
      const frontMatter = source.split("\n---\n")[0];
      expect(frontMatter).toContain("pagination_prev: null");
      expect(frontMatter).toContain("pagination_next: null");
    }
  });
});
