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

    icon.classList.add("bpmn-io-example-thumbs-icon");

    icon.innerHTML = `<svg class="guideline-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <path fill="green" d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2ZM14,21.5908l-5-5L10.5906,15,14,18.4092,21.41,11l1.5957,1.5859Z"></path>
  <polygon fill="white" points="14 21.591 9 16.591 10.591 15 14 18.409 21.41 11 23.005 12.585 14 21.591"></polygon>
</svg>`;

    container.appendChild(icon);
  }

  if (element.getAttribute("thumbs") === "down") {
    container.classList.add("bpmn-io-example-thumbs-down");

    const icon = document.createElement("span");

    icon.classList.add("bpmn-io-example-thumbs-icon");

    icon.innerHTML = `<svg class="guideline-mark" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm2.7 10.5L8 8.8l-2.7 2.7-.8-.8L7.2 8 4.5 5.3l.8-.8L8 7.2l2.7-2.7.8.8L8.8 8l2.7 2.7-.8.8z" fill="#DA1E28"></path>
</svg>`;

    container.appendChild(icon);
  }

  element.appendChild(container);

  const viewer = new window.BpmnJS({ container });

  const response = await fetch(bpmnFilePath);

  const xml = await response.text();

  await viewer.importXML(xml);

  // Adjust the container size based on the diagram size, outer viewbox is the
  // visible part of the diagram, inner viewbox is the actual size of the
  // diagram
  const viewbox = viewer.get("canvas").viewbox();

  const { outer, inner } = viewbox;

  let scale = 1;

  if (inner.width > outer.width) {
    // We need to scale down the diagram to fit the container width
    scale = outer.width / inner.width;
  }

  const needsHeightAdjustment = inner.height * scale > outer.height;

  if (needsHeightAdjustment) {
    const adjustedHeight = inner.height * scale;

    container.style.height = `${adjustedHeight}px`;

    viewer.get("canvas").resized();
  }

  viewer.get("canvas").zoom("fit-viewport", {
    x: inner.x + inner.width / 2,
    y: inner.y + inner.height / 2,
  });

  const newViewbox = viewer.get("canvas").viewbox();

  const padding = 5;

  newViewbox.height += padding * 2;
  newViewbox.width += padding * 2;
  newViewbox.x -= padding;
  newViewbox.y -= padding;

  viewer.get("canvas").viewbox(newViewbox);

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

    icon.classList.add("bpmn-io-example-thumbs-icon");

    icon.innerHTML = `<svg class="guideline-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <path fill="green" d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2ZM14,21.5908l-5-5L10.5906,15,14,18.4092,21.41,11l1.5957,1.5859Z"></path>
  <polygon fill="white" points="14 21.591 9 16.591 10.591 15 14 18.409 21.41 11 23.005 12.585 14 21.591"></polygon>
</svg>`;

    container.appendChild(icon);
  }

  if (element.getAttribute("thumbs") === "down") {
    container.classList.add("bpmn-io-example-thumbs-down");

    const icon = document.createElement("span");

    icon.classList.add("bpmn-io-example-thumbs-icon");

    icon.innerHTML = `<svg class="guideline-mark" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm2.7 10.5L8 8.8l-2.7 2.7-.8-.8L7.2 8 4.5 5.3l.8-.8L8 7.2l2.7-2.7.8.8L8.8 8l2.7 2.7-.8.8z" fill="#DA1E28"></path>
</svg>`;

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
    // Timeout is necessary because Docusaurus uses React for rendering
    requestAnimationFrame(() => {
      renderDiagrams();
    });
  }
});
