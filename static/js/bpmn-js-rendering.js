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

async function renderBpmn(index, element) {
  var bpmnFilePath = element.attr("bpmn");

  // create div element with a unique id (created from the src)
  var bpmnId = "bpmn-" + (index + 1) + "-screen";

  if ($("#" + bpmnId).length) {
    // element was already rendered (this method is sometimes called twice if you click on page-internal links)
    return;
  }

  var bpmnDiv = element
    .append("<div id='" + bpmnId + "'></div>")
    .find("#" + bpmnId);

  /* create the thumbs div
    var thumbs = element.attr("thumbs");
    if (thumbs) {
      // TODO: Do we want to link somewhere?
      bpmnDiv.append("<a href='#thumbs' class='icon thumbs'><i class='fa fa-thumbs-" + thumbs + "'></a>")
    }
    */

  // render the svg
  var viewer =
    /**
     *
     * @param {*} url
     * @returns
     */
    new window.BpmnJS({ container: "#" + bpmnId });

  bpmnFilePath = prefixFilePath(bpmnFilePath);

  $.ajax({
    url: bpmnFilePath,
    dataType: "text",
    success: async function (bpmnDiagram) {
      try {
        await viewer.importXML(bpmnDiagram);

        // adjust the size of the view box
        var canvas = viewer.get("canvas");
        adjustBox(canvas.viewbox(), canvas.viewbox().outer.width);
        bpmnDiv.attr(
          "style",
          "height: " + canvas.viewbox().outer.height + "px; overflow: visible"
        );
        bpmnDiv.attr("class", "bpmn-model");
        if (element.attr("thumbs") == "down") {
          bpmnDiv.attr("class", "thumbs-down-example");
          bpmnDiv.prepend("<i class='thumbs-down'>&#x1F44E;</i>");
        }

        // create callout overlays
        var overlays = viewer.get("overlays");
        if (element.attr("callouts")) {
          var callouts = element.attr("callouts").split(",");
          for (var i = 0; i < callouts.length; ++i) {
            if (i in callouts) {
              addOverlay(overlays, callouts[i].trim(), i + 1);
            }
          }
        }
        canvas.zoom("fit-viewport");
        /*
        thumbs = thumbs ? " " + thumbs : "";
        bpmnDiv.attr("class", "bjs-asciidoc" + thumbs);
        */
        scrollToHash();
      } catch (err) {
        console.log(
          "Error while rendering " + element.attr("bpmn") + ": ",
          err
        );
      }
    },
  });
}

function addOverlay(overlays, bpmnElementId, text) {
  try {
    overlays.add(bpmnElementId, {
      html: '<span class="callout">' + text + "</span>",
      position: {
        right: 1,
        top: -12,
      },
      show: {
        minZoom: 0,
      },
    });
  } catch (err) {
    console.log(
      "Could not add overlay for element '" + bpmnElementId + "'",
      err
    );
  }
}

function renderDmn(index, element) {
  // create unique id for div holding the dmn
  var dmnId = "dmn-" + (index + 1);
  // create the div
  var dmnDiv = element
    .append("<div id='" + dmnId + "'></div>")
    .find("#" + dmnId);
  /*/ create the thumbs div
    var thumbs = element.attr("thumbs");
    if (thumbs) {
      dmnDiv.append("<a href='../using-our-best-practices/#thumbs' class='icon thumbs'><i class='fa fa-thumbs-" + thumbs + "'></a>")
    }
    */
  // render the table
  var hideDetails = element.attr("hideDetails") !== "false";
  var viewer = new window.DmnJS({
    container: "#" + dmnId,
    hideDetails: hideDetails,
  });

  var dmnFilePath = prefixFilePath(element.attr("dmn"));

  $.ajax({
    url: dmnFilePath,
    dataType: "text",
    success: async function (dmnDiagram) {
      try {
        await viewer.importXML(dmnDiagram);
        if (element.attr("callouts")) {
          // prepare a small array of callout objects
          var callouts = [];
          element
            .attr("callouts")
            .split(",")
            .forEach(function (entry) {
              var ent = {
                col: entry.split(":")[0],
                row: entry.split(":")[1],
              };
              callouts.push(ent);
            });

          var i = 1;
          callouts.forEach((callout) => {
            addOverlayToDmn(dmnId, callout, i);
            i = i + 1;
          });
        }

        /*/enable thumbs
          thumbs = thumbs ? " " + thumbs : "";
          dmnDiv.attr("class", "tjs-asciidoc" + thumbs);
          */
        scrollToHash();
      } catch (err) {
        console.log("Error while rendering " + element.attr("dmn") + ": ", err);
      }
    },
  });
}

function addOverlayToDmn(dmnId, callout, text) {
  var cellElement;
  if (callout.col == "header") {
    if (callout.row == "hitPolicy") {
      cellElement = $("#" + dmnId + " div.hit-policy");
    } else if (callout.row == "decisionTable") {
      cellElement = $("#" + dmnId + " div.decision-table-name");
    } else {
      //cellElement = $('[data-col-id="'+callout.row+'"]').not('[data-row-id]').find('div.input-label');
      cellElement = $(
        "#" + dmnId + ' div.input-label:contains("' + callout.row + '")'
      );
      if (cellElement.length == 0) {
        cellElement = $(
          "#" + dmnId + ' div.output-label:contains("' + callout.row + '")'
        );
      }
    }
  } else if (callout.col == "rowHeader") {
    cellElement = $(
      "#" + dmnId + ' td.rule-index[data-element-id="' + callout.row + '"]'
    );
  } else {
    cellElement = $(
      "#" +
        dmnId +
        ' [data-col-id="' +
        callout.col +
        '"][data-row-id="' +
        callout.row +
        '"]'
    );
  }
  if (cellElement) {
    cellElement.append(' <span class="callout">' + text + "</span");
  }
}

var locationHash = location.hash;
var bpmnDivsCount = 0;
var bpmnDivsAll = 0;

function scrollToHash() {
  if (bpmnDivsCount === bpmnDivsAll && location.hash) {
    var top = $(location.hash).offset().top - 80;
    window.scrollTo(0, top);
  }
  bpmnDivsCount++;
}

function addStylesheet(source) {
  $(
    '<link type="text/css" rel="stylesheet" href="' + source + '" />'
  ).insertBefore('head > link[href="/styles.css"]');
}

function renderAllBpmnJs() {
  /* Doesn't work for me
    if (document.querySelectorAll('div[bpmn]').length>0) {
      //There exists at least one element for BPMN.io, only then load JQuery and BPMN Viewer libraries
      addScript("https://code.jquery.com/jquery-3.6.0.min.js");
      addScript("https://unpkg.com/bpmn-js/dist/bpmn-viewer.production.min.js");
    }*/

  addStylesheet(
    "https://unpkg.com/dmn-js@11.0.2/dist/assets/dmn-js-shared.css"
  );
  addStylesheet(
    "https://unpkg.com/dmn-js@11.0.2/dist/assets/dmn-js-decision-table.css"
  );
  addStylesheet(
    "https://unpkg.com/dmn-js@11.0.2/dist/assets/dmn-font/css/dmn.css"
  );

  // iterate over all divs with a bpmn attribute
  var bpmnDivs = $("div[bpmn]");
  bpmnDivsAll += bpmnDivs.length;
  bpmnDivs.each(function (index) {
    window.setTimeout(renderBpmn, index * 100, index, $(this), false);
  });

  // iterate over all divs with a dmn attribute
  var dmnDivs = $("div[dmn]");
  bpmnDivsAll += dmnDivs.length;
  // iterate over all divs with a dmn attribute
  dmnDivs.each(function (index) {
    window.setTimeout(renderDmn, index * 100, index, $(this), false);
  });

  window.setTimeout(scrollToHash, 100);
}

function adjustBox(box, width) {
  var factor = box.inner.width > width ? (1 / box.inner.width) * width : 1.0;
  box.outer.height = Math.max(Math.ceil(box.inner.height * factor), 115);
}

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    renderAllBpmnJs();
  }
});
