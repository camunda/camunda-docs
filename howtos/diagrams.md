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

| Token           | Value     | Use                                                          |
| --------------- | --------- | ------------------------------------------------------------ |
| Ink             | `#1a1a1a` | Text, shape outlines, arrows                                 |
| Muted           | `#5a5a5a` | Secondary text such as CIDR ranges and captions              |
| Camunda orange  | `#f4511e` | Orchestration Cluster and Camunda-owned components           |
| Component green | `#22c55e` | Camunda component chips such as Zeebe, Operate, and Tasklist |
| Region teal     | `#00a19b` | Cloud region and availability zone shells                    |
| Network purple  | `#7e3ff2` | VPC, private network, routers, and load balancers            |
| Subnet olive    | `#7a8b1e` | Public subnets                                               |
| Kubernetes blue | `#1e88e5` | Kubernetes resources and security groups                     |
| Failure violet  | `#9b7ede` | Failure and interruption markers                             |

Vendor product colors, such as Amazon Aurora magenta or Docker blue, sit outside this list on purpose. Match the vendor, not the palette.

### Stroke width

| Width | Use                                    |
| ----- | -------------------------------------- |
| `1`   | Icon detail                            |
| `2`   | Default outlines, arrows, dashed bands |
| `3`   | Container shells and emphasis          |
| `4`   | The Orchestration Cluster card border  |

### Type scale

Use `11`, `13`, `15`, `18`, `20`, `22`, `26`, or `30`. Picking sizes in between is what produced 23 different text sizes across the set before it was normalized.

### Sloppiness and fill

Set **Sloppiness** to architect, the leftmost option, and **Fill** to solid. Use dashed strokes for logical groupings such as a stretch cluster, and dotted strokes for network paths.

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
