# Diagrams

Architecture and reference diagrams in this repository are authored in [Excalidraw](https://excalidraw.com). Every diagram ships an editable `.excalidraw` source next to the image it produces, so you can change a diagram without tracking down whoever drew it.

## Where the files live

Each diagram is three or four files in the same directory, sharing one base name:

| File              | Purpose                                                                  | Committed |
| ----------------- | ------------------------------------------------------------------------ | --------- |
| `name.excalidraw` | The editable source. This is the file you change.                        | Yes       |
| `name.svg`        | The export the page embeds.                                              | Yes       |
| `name.pdf`        | A print-resolution companion, only for diagrams whose page links to one. | If linked |

Place them beside the page that uses them, in that page's `img/` or `assets/` directory. Don't put diagram sources in `static/`.

## Change an existing diagram

1. Open [excalidraw.com](https://excalidraw.com) and use **Open** to load the `.excalidraw` file.
1. Make your change.
1. Export to SVG with **Export image**, with **Background** on and **Embed scene** off. Save over the existing `.svg`.
1. If a `.pdf` sits next to the diagram, regenerate it too. The page links to it, so a stale PDF shows the old drawing.
1. Commit the `.excalidraw` and the `.svg` together, plus the `.pdf` if there is one. A source that disagrees with its export is worse than no source at all.

## Add a new diagram

Load `howtos/camunda-diagrams.excalidrawlib` into Excalidraw once, through **Library > Load from file**. It holds the building blocks the existing diagrams are made of, already carrying the correct colors, stroke weights, and type sizes:

- Region, network, and availability zone shells
- Public and private subnets
- The Orchestration Cluster card and its component chips
- The Elasticsearch database box and the worker nodes band
- Failure markers and security group shields
- The user and client/worker actors

Drag what you need onto the canvas instead of drawing it yourself. That's the point of the library: a diagram built from these blocks matches the rest of the set without anyone having to check it.

Vendor icons for AWS, Kubernetes, and OpenShift aren't in the library, because an Excalidraw library can't carry embedded images. Copy the one you need from a diagram that already uses it.

## Style tokens

Stay on these values. They're what the existing diagrams use, and drifting off them is what makes a set of diagrams look unrelated.

### Color

An accent color needs a different contrast ratio depending on what it draws. [WCAG 2.1](https://www.w3.org/TR/WCAG21/) asks 4.5:1 of text against its background, and only 3:1 of a shape that carries meaning. That's why several accents have a darker text variant: the shell outline stays bright, and the label drawn in the same accent goes darker so it stays readable.

Every ratio below is measured against the white export background.

| Token                | Shape     | Ratio  | Text      | Ratio  | Use                                               |
| -------------------- | --------- | ------ | --------- | ------ | ------------------------------------------------- |
| Ink                  | `#1a1a1a` | 17.4:1 | `#1a1a1a` | 17.4:1 | Text, shape outlines, arrows                      |
| Muted                | `#5a5a5a` | 6.9:1  | `#5a5a5a` | 6.9:1  | Secondary text such as CIDR ranges                |
| Camunda orange       | `#fc5d0d` | 3.1:1  | `#b75d14` | 4.6:1  | Orchestration Cluster and Camunda components      |
| Component green      | `#1d9e4b` | 3.5:1  | `#1d9e4b` | 3.5:1  | Component chips such as Zeebe, Operate, Tasklist  |
| Region teal          | `#00a19b` | 3.2:1  | `#00847f` | 4.6:1  | Cloud region and availability zone shells         |
| Network purple       | `#7e3ff2` | 5.4:1  | `#7e3ff2` | 5.4:1  | VPC, private network, routers, and load balancers |
| Subnet olive         | `#7a8b1e` | 3.9:1  | `#7a8b1e` | 3.9:1  | Public subnets                                    |
| Kubernetes blue      | `#1e88e5` | 3.7:1  | `#1a79cb` | 4.5:1  | Kubernetes resources and security groups          |
| Cluster orange       | `#e57419` | 3.1:1  | `#b75d14` | 4.6:1  | Worker node bands and managed cluster icons       |
| Stretch cluster blue | `#5999d2` | 3.0:1  | `#477aa8` | 4.6:1  | Zeebe stretch cluster shells                      |
| Failure violet       | `#9b7ede` | 3.3:1  | `#1a1a1a` | 17.4:1 | Failure and interruption markers                  |

Camunda orange is `#fc5d0d`, the `orange-munda` value the site's own theme is built from in `src/css/custom.css`. Use that one rather than picking a near neighbor.

Vendor product colors, such as Amazon Aurora magenta or Docker blue, sit outside this list on purpose. Match the vendor, not the palette.

Decorative detail is exempt from the 3:1 rule, and deliberately so: the drop shadow behind the Orchestration Cluster card and the pale interior fills inside small glyphs carry no meaning on their own. Anything a reader has to distinguish to follow the diagram is not decorative.

### Stroke width

| Width | Use                                    |
| ----- | -------------------------------------- |
| `1`   | Icon detail                            |
| `2`   | Default outlines, arrows, dashed bands |
| `3`   | Container shells and emphasis          |
| `4`   | The Orchestration Cluster card border  |

### Type scale

Use `11`, `13`, `15`, `18`, `20`, `22`, `26`, or `30`. Picking sizes in between is what produced 23 different text sizes across the set before it was normalized.

### Canvas width decides whether anyone can read it

A docs page renders an image into a column about 820px wide, and an SVG is scaled to fit. The font size you set is not the size a reader sees. The size a reader sees is:

```
rendered size = font size x (820 / canvas width)
```

That multiplier is unforgiving on a wide diagram:

| Canvas width | Scale | `11px` text renders at | Readable inline |
| ------------ | ----- | ---------------------- | --------------- |
| 900px        | 0.91x | 10.0px                 | Yes             |
| 1900px       | 0.43x | 4.7px                  | Barely          |
| 4100px       | 0.20x | 2.2px                  | No              |

Keep a diagram under about 2000px wide if the reader is meant to read it on the page. Past that, no font size rescues it: getting `11px` up to a legible `9px` on a 4100px canvas means setting it to `45px`, which wrecks the layout instead.

When a diagram genuinely needs that much width, such as two regions side by side, give it a PDF companion and link the image to it:

```markdown
[![Dual-region deployment](./assets/foo.svg)](./assets/foo.pdf)
```

The inline SVG then works as a map of the shape of the thing, and the PDF is where the detail is legible. Say what the diagram shows in the surrounding prose too, so a reader who never opens the PDF still gets the point.

### Sloppiness and fill

Set **Sloppiness** to architect, the leftmost option, and **Fill** to solid. Use dashed strokes for logical groupings such as a stretch cluster, and dotted strokes for network paths.

### Never let a line run through a label

A connector drawn straight through its own caption is the fastest way to make a diagram unreadable, and it happens constantly because the caption belongs near the line it describes.

Give the label an opaque patch so the line reads as passing behind it: draw a rectangle the size of the text plus a few pixels, fill it with whatever is behind the label, set its stroke to transparent, then send it just behind the text and bring both to the front. This is what every diagramming tool does with edge labels.

Fill the patch with the color actually behind the label, not white by reflex. A white label sitting on a filled banner needs a patch in the banner's color, or it disappears.

### Land arrows on what they point at

An arrow that stops in open space, or that drifts past its target onto whatever happens to sit nearby, makes a reader guess. Anchor the head on the shape you mean, even when that costs a dogleg. A bend that arrives in the right place reads better than a straight line that arrives in the wrong one.

## Build failures to expect

### An SVG imported into Markdown is a component, not a URL

The Docusaurus SVGR plugin matches `.md` as well as `.mdx`, so `import Foo from './foo.svg'` hands you a React component. Passing it to `<img src={Foo}>` breaks the build. Embed it as plain Markdown:

```markdown
![Dual-region deployment with an active and a standby region](./img/foo.svg)
```

If you need to pass props, render the component instead:

```jsx
import Foo from "./img/foo.svg";

<Foo title="Dual-region deployment" width="800" />;
```

### A stale cache reports a file you already replaced

After you swap a raster for an SVG and delete the raster, the build can still fail with `Module not found: ./foo.jpg`, because the compiled MDX in `.docusaurus` still holds the old reference. Clear it and rebuild:

```bash
rm -rf .docusaurus node_modules/.cache build && npm run build
```

## Versioned diagrams

The same diagram often appears in `docs/` and in one or more `versioned_docs/version-*/` directories. Those copies are independent, so changing one doesn't change the others.

Check whether the versions actually differ before you copy a change across. Several diagrams here diverge on purpose, showing components that only exist in that release. Backporting is the PR author's decision, so only update the versions your change applies to.

## Accessibility

Give every diagram alt text that says what it shows, not what it is. `![Dual-region Kubernetes deployment with an active and a standby region](./img/foo.svg)` is useful, and `![Architecture diagram](./img/foo.svg)` isn't.

Never leave critical information available only inside a diagram. Any value a reader has to act on, such as a port number or a setting name, belongs in the surrounding text as well.

Staying on the color tokens keeps a diagram at WCAG 2.1 AA without you having to think about it, because the ratios are already checked. If you reach for a color that isn't in the table, measure it first with any contrast checker: 4.5:1 for text, and 3:1 for a shape a reader has to be able to tell apart.

Don't let color be the only thing carrying a distinction. The diagrams pair it with shape and label, so a dashed shell reads as a logical grouping and a dotted line reads as a network path whether or not the reader can separate teal from purple.
