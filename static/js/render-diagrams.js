/**
 * Adjust the file path for BPMN and DMN files. All BPMN and DMN files are
 * stored in the `bpmn` directory.
 *
 * @todo Remove this function once paths are fixed in the .md files.
 *
 * @param {string} path
 *
 * @returns {string}
 */
function prefixFilePath(filePath) {
  return "/bpmn/" + filePath;
}

/**
 * Renders a BPMN diagram in the given element and adds overlays if specified.
 *
 * @param {HTMLElement} element
 *
 * @returns {Promise<void>}
 */
async function renderBpmn(element) {
  const bpmnFilePath = prefixFilePath(element.getAttribute("bpmn"));

  const containerId = `bpmn-io-example-${bpmnFilePath.replace(/[^a-zA-Z0-9]/g, "-")}`;

  if (document.getElementById(containerId) !== null) {
    return;
  }

  const container = document.createElement("div");

  container.setAttribute("id", containerId);
  container.classList.add("bpmn-io-example");

  if (element.getAttribute("thumbs") === "up") {
    container.classList.add("bpmn-io-example-thumbs-up");

    const icon = document.createElement("span");

    icon.textContent = "👍";

    container.appendChild(icon);
  }

  if (element.getAttribute("thumbs") === "down") {
    container.classList.add("bpmn-io-example-thumbs-down");

    const icon = document.createElement("span");

    icon.textContent = "👎";

    container.appendChild(icon);
  }

  element.appendChild(container);

  const viewer = new window.BpmnJS({ container });

  const response = await fetch(bpmnFilePath);

  const xml = await response.text();

  await viewer.importXML(xml);

  // TODO: adjust the size of the container based on the diagram size

  viewer.get("canvas").zoom("fit-viewport");

  let callouts = element.getAttribute("callouts");

  if (callouts) {
    callouts = callouts.split(",");

    const overlays = viewer.get("overlays");

    for (const callout of callouts) {
      const elementId = callout.trim();

      if (elementId) {
        overlays.add(elementId, {
          html: `<span class="callout">${callouts.indexOf(callout) + 1}</span>`,
          position: {
            right: -5,
            top: -5,
          },
          scale: false,
        });
      }
    }
  }
}

async function renderDmn(element) {
  const dmnFilePath = prefixFilePath(element.getAttribute("dmn"));

  const containerId = `bpmn-io-example-${dmnFilePath.replace(/[^a-zA-Z0-9]/g, "-")}`;

  if (document.getElementById(containerId) !== null) {
    return;
  }

  const container = document.createElement("div");

  container.setAttribute("id", containerId);
  container.classList.add("bpmn-io-example");

  if (element.getAttribute("thumbs") === "up") {
    container.classList.add("bpmn-io-example-thumbs-up");

    const icon = document.createElement("span");

    icon.textContent = "👍";

    container.appendChild(icon);
  }

  if (element.getAttribute("thumbs") === "down") {
    container.classList.add("bpmn-io-example-thumbs-down");

    const icon = document.createElement("span");

    icon.textContent = "👎";

    container.appendChild(icon);
  }

  element.appendChild(container);

  const hideDetails = element.getAttribute("hideDetails") !== "false";

  const viewer = new window.DmnJS({
    container,
    hideDetails,
  });

  const response = await fetch(dmnFilePath);

  const xml = await response.text();

  await viewer.importXML(xml);

  let callouts = element.getAttribute("callouts");

  if (callouts) {
    callouts = callouts.split(",");

    for (const callout of callouts) {
      const [col, row] = callout.trim().split(":");

      if (col && row) {
        const span = document.createElement("span");

        span.classList.add("callout");

        span.textContent = `${callouts.indexOf(callout) + 1}`;

        let cell;

        if (col === "header") {
          if (row === "hitPolicy") {
            cell = document.querySelector(`#${containerId} div.hit-policy`);
          } else if (row === "decisionTable") {
            cell = document.querySelector(
              `#${containerId} div.decision-table-name`
            );
          } else {
            cell =
              findElementWithTextContent(`#${containerId} .input-label`, row) ||
              findElementWithTextContent(`#${containerId} .output-label`, row);
          }

          cell?.appendChild(span);
        } else if (col === "rowHeader") {
          cell = document.querySelector(
            `#${containerId} td.rule-index[data-element-id="${row}"]`
          );

          if (cell && cell.firstChild) {
            cell.insertBefore(span, cell.firstChild);
          }
        } else {
          cell = document.querySelector(
            `#${containerId} td[data-col-id="${col}"][data-row-id="${row}"]`
          );

          cell?.appendChild(span);
        }
      } else {
        console.error(
          `Error adding callout: Invalid format for "${callout}". Expected "col:row".`
        );
      }
    }
  }
}

function findElementWithTextContent(selector, text) {
  return Array.from(document.querySelectorAll(selector)).find((element) =>
    element.textContent.trim().includes(text)
  );
}

/**
 * Adds a stylesheet to the document if it is not already present.
 *
 * @param {url} source
 */
function addStylesheet(source) {
  let link = document.querySelector(`link[href="${source}"]`);

  if (!link) {
    link = document.createElement("link");

    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = source;

    document.head.appendChild(link);
  }
}

/**
 * Scrolls to the element with the current hash in the URL.
 * If the element is not found, it scrolls to the top of the page.
 */
function scrollToHash() {
  if (location.hash) {
    const element = document.querySelector(location.hash);

    const y = element
      ? element.getBoundingClientRect().top + window.pageYOffset - 80
      : 0;

    window.scrollTo(0, y);
  }
}

async function renderDiagrams() {
  const diagramElements = [
    ...Array.from(document.querySelectorAll("div[bpmn]")),
    ...Array.from(document.querySelectorAll("div[dmn]")),
  ];

  Promise.all(
    diagramElements.map(async (element) => {
      try {
        if (element.hasAttribute("bpmn")) {
          await renderBpmn(element);
        } else if (element.hasAttribute("dmn")) {
          await renderDmn(element);
        }
      } catch (error) {
        console.error(
          `Error rendering diagram in element ${element.id}:`,
          error
        );
      }
    })
  ).then(() => {
    scrollToHash();
  });
}

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    addStylesheet("https://unpkg.com/bpmn-js/dist/assets/diagram-js.css");
    addStylesheet("https://unpkg.com/bpmn-js/dist/assets/bpmn-js.css");
    addStylesheet(
      "https://unpkg.com/bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css"
    );
    addStylesheet("https://unpkg.com/dmn-js/dist/assets/dmn-js-shared.css");
    addStylesheet(
      "https://unpkg.com/dmn-js/dist/assets/dmn-js-decision-table.css"
    );
    addStylesheet("https://unpkg.com/dmn-js/dist/assets/dmn-font/css/dmn.css");

    console.log("Rendering BPMN/DMN diagrams...");

    // Timeout is necessary because Docusaurus uses React for rendering
    requestAnimationFrame(() => {
      renderDiagrams();
    });
  }
});
