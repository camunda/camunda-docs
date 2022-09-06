// Set this prefix based on which version of docs you're viewing
//   when generating the Optimize sidebars.
//   It will be removed from all generated URLs, so that the version can be
//   prepended in one place instead of every single link.
const docsAndVersionUrlPrefix = "/docs/next/";

// From an anchor in the sidebar, generates a call to a helper function
//   based on the link text and path. See optimize_sidebars.js for what
//   this helper function is and how it's used.
function mapToDocsLink(a) {
  return `docsComponentsLink("${a.innerText}", "${a.pathname.replace(
    docsAndVersionUrlPrefix,
    ""
  )}"),`;
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
    Components: [
      ${mappedItems.join("\n")}
    ]
  }
  `;
}

// Copies the generated sidebar definitions to the clipboard.
copy(buildSidebars());
