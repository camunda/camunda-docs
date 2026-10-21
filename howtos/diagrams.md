# Create and maintain architecture diagrams

Use this guide for Excalidraw-authored Self-Managed reference architecture diagrams. It defines a shared visual style and a source-to-export workflow. Mermaid diagrams, screenshots, and product UI designs are outside its scope.

These conventions build on the diagram workflow proposed in [#10011](https://github.com/camunda/camunda-docs/pull/10011) and the visual review of [#10384](https://github.com/camunda/camunda-docs/pull/10384#issuecomment-6263981463). Apply them when creating or revising a diagram; existing diagrams can adopt them incrementally.

## Keep editable sources with their exports

Store `name.excalidraw` and `name.svg` together in the consuming page's `img/` or `assets/` directory. Embed the SVG and add a source pointer beside it:

```markdown
<!-- Editable source: ./img/example.excalidraw -->

![Describe the components and relationships shown.](./img/example.svg)
```

Change the source first, regenerate the SVG, and commit both together. Regenerate a PDF companion if the page links to one. Versioned sources are independent: update only the releases in scope, and check for architectural differences before copying a diagram across versions.

## Establish the meaning before choosing the style

- Decide what each box represents: a browser, deployed application, internal function, or infrastructure dependency. Use labels that make that distinction clear.
- Check component responsibilities and protocols against the docs. For example, Optimize imports records from Elasticsearch/OpenSearch; the exporters run in Zeebe brokers.
- Distinguish Identity API calls from OIDC protocol requests. A permission lookup is not an OIDC request merely because it involves an identity service.
- Distinguish request direction from data movement. An application can request records from storage even though the returned data moves toward the application.
- Show deployment alternatives as alternatives, with a caption such as "Choose one Identity configuration" beside the branch. Name the configurations and state their conditions.

## Use a consistent layout

- Use straight, square-cornered rectangles with solid outlines. Set Excalidraw **Sloppiness** to **Architect** (`roughness: 0`) and **Fill** to **Solid**.
- Use stroke width `2` for boxes, connection lines, and legend samples. Check their visibility after the image is scaled into the page.
- Align related boxes and use consistent internal padding. Start with 24 canvas units for application cards.
- Center short titles and subtitles within a shared content area. Center short explanatory text in alternative-configuration cards, and use deliberate line breaks. Avoid positioning every line independently.
- Place the main request path in a clear reading order, usually top to bottom. Keep supporting services beside or below it.
- Use offset cards to depict replicas. Give rear cards a Spacecraft fill (`#F7F7F7`) and the same outline color as the front card. Avoid saturated rear-card fills. State a replica count separately if a specific number matters.
- Prefer labels over icons. Add a symbol only when it communicates information that the label and grouping do not already convey.

## Define connection types and direction

Use filled triangle arrowheads. Bind endpoints to their intended shapes, keep lines clear of text, and use bends when needed to reach the correct component.

In request-oriented diagrams, arrows point from the caller to the service it calls. Do not add a reverse arrowhead merely because the service returns a response. Put this note in the legend:

> Arrows show request direction. Responses return on the same connection.

For diagrams that instead show data flow, topology, or dependencies, define that meaning explicitly. Deployment topology diagrams use solid neutral-gray (`#434343`) arrows labeled `Deployment relationship`, with the note "Arrows show deployment relationships, not network requests." These arrows do not specify a network protocol. Do not mix meanings without labeling the distinction.

| Connection category              | Color             | Pattern | Legend wording                                             |
| -------------------------------- | ----------------- | ------- | ---------------------------------------------------------- |
| HTTP or HTTPS                    | Black (`#000000`) | Solid   | `HTTP(S)`                                                  |
| gRPC                             | Navy (`#1F2A44`)  | Dashed  | `gRPC`                                                     |
| Identity or authentication calls | Pink (`#C629CD`)  | Dotted  | `Identity API (HTTP(S))` or `OIDC requests`, as applicable |

Use dotted pink for Identity API and OIDC requests even though they use HTTP(S). Keep labels specific to the request type: an Identity API permission lookup is not an OIDC request. Ordinary browser or ingress HTTP(S) traffic uses solid black, including requests to the Management Identity web UI.

Use solid black for database connections too, and retain accurate protocol labels. If a storage box represents several backend families, identify the connection accordingly, for example `HTTP(S) / database protocol`. Do not label Optimize's Elasticsearch/OpenSearch connection as a separate generic TCP interface: it uses HTTP(S).

Place a separate legend in unused space, preferably at the top right, with a bold **Connections** heading. Match each sample's color, pattern, width, and arrowhead to its connections. Include only categories present in that diagram. Leave enough space that samples cannot be mistaken for connections from a nearby box, without widening the canvas unnecessarily.

## Apply the brand palette by role

Follow [Camunda Brand Guidelines v3.5](https://docs.google.com/presentation/d/1tJBLBW0jQdWwN1kjKvWXLhZ_mksT9Nj62WskQivtjrs) and the contrast grid linked from its **Color Guidance** slide. Use black text on a white background for these text-heavy diagrams. Backgrounds should primarily be white, black, or neutrals. The roles below are conventions for this diagram set, not official product color assignments.

| Role                                      | Brand color    | Hex       |
| ----------------------------------------- | -------------- | --------- |
| Orchestration Cluster                     | Orangemunda    | `#FC5D0D` |
| Optimize                                  | Greenmunda     | `#26D07C` |
| Management Identity                       | Bernd's Hoodie | `#0072CE` |
| Connectors                                | Sardinia       | `#A2191F` |
| Infrastructure and neutral internal boxes | Heat Shield    | `#434343` |
| HTTP(S) and database connections          | Black          | `#000000` |
| gRPC connections                          | Look Up        | `#1F2A44` |
| Identity and authentication connections   | Purple Wool    | `#C629CD` |
| Deployment relationships                  | Heat Shield    | `#434343` |
| Replica-card fill                         | Spacecraft     | `#F7F7F7` |
| Text                                      | Black          | `#000000` |
| Canvas and front-card fill                | White          | `#FFFFFF` |

Keep role colors consistent across related diagrams. Connection patterns and labels must convey meaning without relying on color alone. Avoid adding a new color for every internal function.

### Optional and reserved v3.5 colors

These additional colors are optional, not replacements for existing semantic categories.

| Color          | Hex       |
| -------------- | --------- |
| Neptune        | `#002D9C` |
| Industry       | `#0043CE` |
| True Blue      | `#0F62FE` |
| Advance        | `#78A9FF` |
| Oasis          | `#82CFFF` |
| Agentic Purple | `#6967FF` |
| Wave           | `#280892` |
| Freundly       | `#FFF56F` |

Do not use optional colors for protocol meanings or assign them to a component type without documenting a stable semantic role. Reserve Agentic Purple for an explicitly agentic component or workflow if such a role is introduced; it must not replace Purple Wool for Identity API or OIDC connections. Before using any optional color for meaningful text, boundaries, or connectors, validate the actual foreground/background combination against the v3.5 contrast grid and the WCAG requirements below.

### Check contrast separately from brand membership

A brand color is not automatically accessible in every use. Follow [WCAG text contrast](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html), [non-text contrast](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html), and [use of color](https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html):

- Use at least 4.5:1 contrast for ordinary text against its background.
- Use at least 3:1 contrast against adjacent colors for graphical parts required to understand the diagram.
- Check the actual background, including tinted replica cards. Ratios measured against white do not establish contrast against other backgrounds.
- Review thin lines at rendered size. Scaling and antialiasing can weaken their appearance even when the source color passes a numerical check.

The reviewed palette retains one known limitation on white: Greenmunda is approximately **2.02:1**. Its selection during visual review does not establish WCAG conformance. Patterns and labels address color-only distinctions, but do not increase contrast ratios. Solid black HTTP(S) connections replace the previously reviewed Icemunda connections, which were below the 3:1 graphical contrast target.

Use Greenmunda as a decorative accent alongside a sufficiently contrasting boundary when that boundary carries meaning. Review these choices with the author before changing an established diagram's palette. Track unresolved contrast limitations in the PR rather than describing the whole set as WCAG compliant.

## Make text readable at page width

Use a consistent sans-serif font. The reviewed diagrams use Excalidraw's Helvetica family (`fontFamily: 2`), with this starting scale:

| Use                                               | Canvas font size | Weight                                      |
| ------------------------------------------------- | ---------------- | ------------------------------------------- |
| Main component title                              | `26`             | Bold                                        |
| Legend heading                                    | `24`             | Bold                                        |
| Subtitle, connection label, or internal component | `20`             | Regular; bold for internal component titles |
| Explanatory note                                  | `18`             | Regular                                     |

These are canvas sizes, not guaranteed reading sizes. Estimate the rendered size as `canvas font size × rendered image width / exported SVG width`. Review the actual docs page; aim for body-sized labels where practical. Split an overcrowded diagram rather than shrinking all its text. An enlarged view can supplement the inline image, but essential information must also appear in prose.

### Preserve bold titles during export

Excalidraw 0.18.0 does not have a native font-weight property. The reviewed sources record intended bold text using this custom metadata on text elements:

```json
{
  "customData": {
    "svgFontWeight": 700
  }
}
```

This metadata does not make text bold in the standard editor. A plain export loses the visual weight unless you reapply it to the SVG. Keep the metadata in the source and use the following post-export step for the simple, unframed text diagrams in this set. It checks the source/export text sequence before modifying the file, so repeated labels do not accidentally inherit another element's weight.

After exporting the SVG, run this from the repository root, substituting the source and SVG paths:

```bash
python3 - path/to/name.excalidraw path/to/name.svg <<'PY'
import json
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

source_path, svg_path = map(Path, sys.argv[1:])
scene = json.loads(source_path.read_text())
tree = ET.parse(svg_path)
namespace = "http://www.w3.org/2000/svg"
ET.register_namespace("", namespace)
ET.register_namespace("xlink", "http://www.w3.org/1999/xlink")
expected = [
    (line, element.get("customData", {}).get("svgFontWeight"))
    for element in scene["elements"]
    if element["type"] == "text" and not element.get("isDeleted", False)
    for line in element["text"].split("\n")
]
nodes = list(tree.getroot().iter(f"{{{namespace}}}text"))
actual = ["".join(node.itertext()) for node in nodes]
if actual != [line for line, _ in expected]:
    raise SystemExit("Source/export text mismatch; re-export and inspect before applying weights.")
for node, (_, weight) in zip(nodes, expected):
    if weight == 700:
        node.set("font-weight", "700")
tree.write(svg_path, encoding="unicode")
PY
```

Review the result for clipping and overlap: bold text can be wider than the editor's regular-weight measurements. If a different exporter changes text order, stop and adapt the mapping rather than applying weights by label alone.

## Review locally before publishing

1. Open the repository's `.excalidraw` file in Excalidraw and save edits back to that file. Browser-only drafts are not visible to an agent reading the repository.
1. Export SVG with **Background** enabled, dark-mode export disabled, and **Embed scene** disabled. Preserve the white background and apply the font-weight step if the source contains that metadata.
1. Preview one diagram at a time in the docs page. Check desktop and narrow-screen rendering, image loading, overflow, labels, arrow targets, and legend separation. Use the [local setup instructions](./setup.md#local-development); bind the server to localhost.
1. Reopen the source after agent edits. Do not overwrite newer repository changes with a stale browser draft. If using a custom editor, key saved drafts by diagram and source revision.
1. Check that the source and export agree, including labels, colors, patterns, and bold-title metadata. Format only changed files and run `git diff --check`. Follow the [repository validation instructions](../.github/instructions/repo.instructions.md#5-build-and-validation) for build triggers.
1. Stop local preview/editor servers when the review session ends. Keep them running while the author is actively validating changes.

Give every diagram descriptive alt text. Explain essential architecture, configuration conditions, and actionable values in surrounding prose so they are available without interpreting the image. Avoid duplicating a legend's wording in the prose when it adds no information.
