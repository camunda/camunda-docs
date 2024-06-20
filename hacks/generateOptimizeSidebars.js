// @ts-check

// Note: these type definitions are only checked within an editor.
/**
 * @typedef {object} Strategy
 * @property {"JSON" | "JS"} generateJSONOrJS
 * @property {string} [jsLinkFunctionName]
 * @property {string} [docsAndVersionUrlPrefix]
 */

// test concurency
// The strategy for generating the sidebars can be inferred from your current URL.
/** @type { Record<string, Strategy> } */
const strategies = {
  "/docs/next/": {
    generateJSONOrJS: "JS",
    jsLinkFunctionName: "docsLink",
    docsAndVersionUrlPrefix: "/docs/next/",
  },
  "/optimize/next/": {
    generateJSONOrJS: "JS",
    jsLinkFunctionName: "optimizeLink",
    docsAndVersionUrlPrefix: "/optimize/next/",
  },
  "/docs/": { generateJSONOrJS: "JSON" },
  "/optimize/": { generateJSONOrJS: "JSON" },
};

// Defining this globally, to avoid passing it into basically every function.
/** @type Strategy */
let strategy;

// From an anchor in the sidebar, generates a call to a helper function
//   based on the link text and path. See optimize_sidebars.js for what
//   this helper function is and how it's used.
//   This version is only usable for generating the "next" version,
//   because Docusaurus does not support .js files for older/current version sidebars files.
function mapToDocsLinkJs(a) {
  return `${strategy.jsLinkFunctionName}("${
    a.innerText
  }", "${a.pathname.replace(strategy.docsAndVersionUrlPrefix, "")}"),`;
}

// From an anchor in the sidebar, generates a sidebar item JSON object,
//   based on the link text and path. This is necessary for all _numbered_ versions,
//   because Docusaurus does not support .js files for older/current version sidebars files.
function mapToDocsLinkJson(a) {
  return `{
      "type": "link",
      "label": "${a.innerText}",
      "href": "${a.pathname}"
    },`;
}

// From a category in the sidebar, generates sidebar definitions for it and its children.
function buildCategory(li) {
  const title = li.querySelector(
    ":scope > div > .menu__link--sublist"
  ).innerText;

  const children = Array.from(li.querySelectorAll(":scope > .menu__list > li"));
  const childrenMapped = children.map(buildLi);

  return `
    {
      "${title}": [
        ${childrenMapped.join("\n")}
      ],
    },
  `;
}

// From an individual page in the sidebar, generates a sidebar definition.
function buildLink(li) {
  const mapToDocsLink =
    strategy.generateJSONOrJS === "JSON" ? mapToDocsLinkJson : mapToDocsLinkJs;

  const anchor = li.querySelector(":scope > .menu__link");
  return mapToDocsLink(anchor);
}

// From an item in the sidebar, generates the appropriate definitions.
function buildLi(li) {
  if (li.classList.contains("theme-doc-sidebar-item-link")) {
    return buildLink(li);
  }

  if (li.classList.contains("theme-doc-sidebar-item-category")) {
    return buildCategory(li);
  }
}

// Generates the sidebar definitions for the entire menu.
function buildSidebars() {
  // The root of the sidebar menu.
  const root = document.querySelector(".theme-doc-sidebar-menu");
  if (root === null) {
    throw new Error("Unable to find sidebar menu root.");
  }

  const items = Array.from(root.querySelectorAll(":scope > li"));

  const mappedItems = items.map(buildLi);

  return `[
      ${mappedItems.join("\n")}
    ]`;
}

// Identifies configuration strategy based on current URL.
function identifyStrategyFromPath() {
  const path = window.location.pathname;
  const strategyKey = Object.keys(strategies).find((strategyPath) =>
    path.startsWith(strategyPath)
  );

  if (strategyKey === undefined) {
    throw new Error(
      "I'm not sure how to generate sidebars for this URL. Are you sure you're on the correct page?"
    );
  }
  strategy = strategies[strategyKey];
}

// Expands all sidebar items (so that we can walk them all in the DOM).
async function expandAllSidebarItems() {
  const count = () =>
    document.querySelectorAll(".menu__link--sublist[aria-expanded=false]")
      .length;
  const expand = () =>
    document
      .querySelectorAll(".menu__link--sublist[aria-expanded=false]")
      /** @ts-ignore */
      .forEach((x) => x.click());
  async function expandAll() {
    while (count() > 0) {
      expand();
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  await expandAll();
}

// Store a reference to the copy function globally, because sometimes it's not available from within a promise.
//   Also note that `copy` is only available in chromium-based browsers, hence the `ts-ignore`.
/** @ts-ignore */
const copyToClipboard = copy;

// This is the mainline function for generating the sidebar definitions.
async function generateSidebarDefinition() {
  identifyStrategyFromPath();

  await expandAllSidebarItems();

  const sidebarDefinition = buildSidebars();

  copyToClipboard(sidebarDefinition);

  console.log("Copied to clipboard!");
}
