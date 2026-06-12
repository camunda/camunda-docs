# AI-ready content guidelines

AI assistants are now a primary audience for Camunda docs alongside human readers. This page explains the delivery infrastructure, how agents consume content, and where to find the writing rules that support it.

## The delivery layer

The Camunda docs site publishes machine-readable artifacts that handle the delivery of content to agents:

- [`/llms.txt`](https://docs.camunda.io/llms.txt) and [`/llms-full.txt`](https://docs.camunda.io/llms-full.txt): machine-readable indexes auto-generated from this site, following the [llms.txt specification](https://llmstxt.org/).
- [Kapa.ai](https://docs.kapa.ai/improving/writing-best-practices): the chatbot integrated into Camunda Docs, powered by RAG over this site's content.

These handle the **delivery** layer — getting content to the agent. The remaining gap is at the **page level**.

## How agents consume pages

When an agent fetches a page, it:

1. **Walks headings** to recover document structure. Vague headings ("Configuration", "Overview") break that recovery.
2. **Reads the first sentence after each heading** — this is what gets cited and indexed. An opening sentence that buries the key concept makes the section unreliable for extraction.
3. **Converts tables to structured data** — agents can parse tables directly, but not equivalent information buried in prose.
4. **Cannot perform OCR** — values shown only in screenshots are invisible to agents.

These constraints are the same ones that govern human skimmability. The writing rules that make docs work for agents are documented in the [Camunda style guide](technical-writing-styleguide.md):

- **Headings, hierarchy, and opening sentences**: [Formatting, organization and structure for conceptual pieces](technical-writing-styleguide.md#formatting-organization-and-structure-for-conceptual-pieces) → "Titles, headers, and sidebars"
- **Self-contained sections**: same table → "Separated paragraphs"
- **Tables over prose for structured data**: [Formatting, organization and structure for implementation steps](technical-writing-styleguide.md#formatting-organization-and-structure-for-implementation-steps) → "Visuals"
- **Critical information as text, not only images**: same table → "Images"
- **Complete, self-contained code blocks**: same table → "Code blocks"

## References

- [Agent-Friendly Documentation Spec](https://agentdocsspec.com/): defines the 23 checks behind the Camunda Agent Score benchmark.
- [Camunda's Agent Score](https://buildwithfern.com/agent-score/company/camunda): current public score and per-check breakdown.
- [Kapa.ai: Writing documentation for AI](https://docs.kapa.ai/improving/writing-best-practices): guidance from the team behind the Camunda Docs chatbot.
- [What an Agent Score Can Tell You (Dachary Carey)](https://dacharycarey.com/2026/04/18/what-agent-score-can-tell-you/): practical analysis of what moves the score.
- [llmstxt.org](https://llmstxt.org/): the `llms.txt` specification.
- [Camunda's `llms.txt`](https://docs.camunda.io/llms.txt) and [`llms-full.txt`](https://docs.camunda.io/llms-full.txt): the machine-readable indexes auto-generated from this site.
