---
applyTo: "**/*.md"
---

**When to use:** Any content editing, documentation writing, or Markdown file changes. This is a condensed summary of the full style guide at `/howtos/technical-writing-styleguide.md`. Use these rules for routine work. Only consult the full style guide if you encounter a style question not covered here.

## 1. Language and grammar

- Default to **American English** (US spelling: "analyze" not "analyse", "color" not "colour", "capitalize" not "capitalise").
- Write umlauted letters in full: "ue", "ae", "oe" instead of ü, ä, ö (for example, "Bernd Ruecker" not "Bernd Rücker").
- Use **second person** ("you", "your") and **active voice** throughout. Avoid "I", "me", "my".
- Use **common contractions** (you'll, don't, it's, we're) to maintain a natural, conversational tone.
- Write whole numbers **one through nine** in full; use numerals for **10 and above**.
- Write large numbers as numerals with a unit (for example, "1 million" not "1,000,000").
- Write percentages as numerals with % (for example, 10%).
- Avoid Latin abbreviations (e.g., i.e.); write "for example" or "that is" instead.
- Use **gender-neutral language**: use "they" for a user, not "he/she".
- Avoid unclear pronoun references. Replace vague "it", "this", "that" with the specific noun when the referent is ambiguous.
- Avoid overuse of "that" — remove it when the sentence reads correctly without it.
- Use **empowering language** centered on the user: "With `<feature>`, you can…" rather than "`<feature>` allows you to…".
- Do not use "please" in instructional steps or numbered lists.
- Prefer "if" over "whether or not" where possible; omit "or not" when it adds nothing.
- Use one space after a period, not two.

## 2. Punctuation

- Use the **Oxford comma** in all lists (for example, "GitHub, Google Analytics, and Slack").
- Default to **American punctuation** rules.
- Use **em dashes** (—) for parenthetical information; **en dashes** (–) for date and time ranges; **hyphens** (-) only for compound adjectives.
- Do **not** use quotation marks for UI elements, button names, or section names. Use **bold** instead.
- Use double quotation marks only for direct speech or quoted text.
- Omit hyphens in prefixed words (reactivate, undo, deactivate, unhappy) unless the result looks incorrect.

## 3. Formatting and structure

- Use **sentence case** for all titles and headers: capitalize only the first word and proper nouns. Do not use title case.
- Do not include a colon at the end of a Markdown header.
- Make titles and headers **descriptive and action-oriented** (for example, "Modify process instances" not "Process instance modification"). Avoid bare "Overview" titles.
- **Bold** UI element names and button labels (for example, `Click **Save**`). Do not use italics or quotation marks for them.
- Use the `>` arrow to separate sequential UI navigation steps (for example, `**File > New > BPMN Diagram**`).
- Use **italics** only for emphasis on a specific word, not for UI elements or filenames.
- Place **filenames** and **code identifiers** inside inline code backticks (for example, `values.yaml`, `taskId`).
- Use **fenced code blocks** with a language identifier for multi-line code.
- Keep paragraphs to a maximum of **four to five sentences**. Keep sentences short and clear.
- Use **bulleted lists** (with dashes `-`, not asterisks `*`) for unordered items (three or more). Capitalize the first word of each item.
- Use **numbered lists** for sequential steps. You may use `1.` for every item — Markdown auto-numbers.
- Mark optional steps as `(Optional) Do the thing.`
- Use **admonitions** sparingly. Limit to `:::warning`, `:::note`, and `:::tip`. Never stack multiple admonitions in a row. Never place required steps or critical information inside an admonition.
- Use `<details>` elements only for optional or supplementary content (reference material, code examples), never for required steps.
- GIFs are strongly discouraged. All images must include descriptive alt text. Crop personal information from screenshots; use "My organization" if a username must be shown.

## 4. Links

- Internal links must include the `.md` extension.
- Use **relative paths** for files in the same subtree; **absolute paths** (starting with `/`) for files in a different subtree.
- Do **not** prefix internal links with `/docs/` — this routes to the `/next/` version only. Use `/path/file.md` instead of `/docs/path/file.md`.
- Link directly to the most relevant **section anchor**, not just the top of a page.
- Use **descriptive link text** — never use "click here", "here", or bare URLs as link text.
- Prefer using existing sentence text as the link. Only use "Learn more about …" when no suitable sentence text is available.
- External links should open in a new tab.
- When linking to GitHub repositories, link to the relevant file or anchor, not to the repo root or a branch.

## 5. Product terminology

- Use **"process"** instead of "workflow" in most contexts. Exceptions: "workflow engine", "sequence flow", and "process flow".
- Use **"process automation"** and **"process instance"** — not "workflow automation" or "workflow instance".
- Use **"upgrade"** for version changes (for example, 8.8 to 8.9). Use **"update"** for in-place changes within the same version (configuration files, values, license). Use "switch to" or "move from" for edition changes.
- Use **"sub-process"** (hyphenated) in running text. Use `subProcess`, `AdHocSubProcess`, or `subprocess` only when directly quoting BPMN XML, code, or API identifiers.
- Spell out acronyms on first use for general audiences. For technical audiences, standard industry acronyms (BPMN, DMN) are acceptable without expansion. For new or less-common acronyms, always spell out on first use.
- Do **not** capitalize file extensions (.pdf, .doc, .yaml).
- Semantic versioning: use **X** (uppercase) for all patch releases since a minor release (for example, "8.4.X"); use a specific patch number followed by **+** to indicate a minimum patch release (for example, "8.4.10+"). Do not combine X with + (avoid "8.4.X+").
- Do not capitalize general terms like "cluster", "process instance", or "task" unless they start a sentence.
- Write "Elasticsearch" as one word (not "ElasticSearch" or "Elastic search").
- Write "GitHub" with a capital H (not "Github").
