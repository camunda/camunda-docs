const config = {
  // Set this value based on whether you want to generate a .json file or .js file.
  //   .js files are better, because we can reduce the number of places we reference the version's base URL,
  //   but .js is only supported for the "next" version. Docusaurus does not support .js files
  //   for older/current version sidebars files, so those must use .json.
  generateJSONOrJS: "JSON", // or "JS"

  // Set this prefix based on which version of docs you're viewing
  //   when generating the Optimize sidebars.
  //   It will be removed from all generated URLs, so that the version can be
  //   prepended in one place instead of every single link.
  //   NOTE: this only has an effect when generating .js files.
  docsAndVersionUrlPrefix: "/docs/next/",
};

// From an anchor in the sidebar, generates a call to a helper function
//   based on the link text and path. See optimize_sidebars.js for what
//   this helper function is and how it's used.
//   This version is only usable for generating the "next" version,
//   because Docusaurus does not support .js files for older/current version sidebars files.
function mapToDocsLinkJs(a) {
  return `docsComponentsLink("${a.innerText}", "${a.pathname.replace(
    config.docsAndVersionUrlPrefix,
    ""
  )}"),`;
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
    config.generateJSONOrJS === "JSON" ? mapToDocsLinkJson : mapToDocsLinkJs;

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

// The root of the sidebar menu.
const root = document.querySelector(".theme-doc-sidebar-menu");

// Generates the sidebar definitions for the entire menu.
function buildSidebars() {
  const items = Array.from(root.querySelectorAll(":scope > li"));

  const mappedItems = items.map(buildLi);

  return `{
    "Components": [
      ${mappedItems.join("\n")}
    ]
  }
  `;
}

// Copies the generated sidebar definitions to the clipboard.
copy(buildSidebars());
