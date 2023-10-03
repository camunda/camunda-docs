# Markdown and MDX Features

The Docusaurus documentation provides a detailed explanation of the Markdown features at [https://v2.docusaurus.io/docs/markdown-features](https://v2.docusaurus.io/docs/markdown-features).

## Versioned links

The custom [versionedLinks](https://github.com/camunda/camunda-docs/blob/930a0c384b48be27d0bc66216015404f67716f61/src/mdx/versionedLinks.js) MDX plugin allows us to link documentation [across instances](./documentation-guidelines.md#docs-vs-optimize) without having to declare version numbers in every link.

The plugin will expand tokens (e.g. `$optimize$`) into a prefix for the correct version, based on the location of the source file. For example, if a file in `versioned_docs/version-8.0` links to `$optimize$/some-path`, it will expand to the correct URL for Optimize version 3.8.0.

See [the expandVersionedUrl source](https://github.com/camunda/camunda-docs/blob/930a0c384b48be27d0bc66216015404f67716f61/src/mdx/expandVersionedUrl.js#L1-L23) for mappings of versions across instances.

## Images

- Static images can be placed into [`static/img/`](./static/img/).
- Images that will change with a new version have to be placed into `docs`. Best practice: add an `img` directory to each directory where it is needed.
- All images should include alt text that describes the image.
- Images should not replace text.

## Videos

_At this time, we are not encouraging the use of motion graphics (videos, GIFs, etc) due to accessibility concerns._

- The regular `video` does not work in MDX.
- Use the [react-video](https://www.npmjs.com/package/react-player) component in the following way:

Import the component into corresponding Markdown file:

```js
import ReactPlayer from "react-player";
```

Embed a video with the `react-video` component:

```html
<ReactPlayer playing loop playsinline height="200px" url={[ {src: './video.mp4',
type: 'video/mp4'} ]} />
```

## Code Blocks / Selector

Docusaurus supports [MDX](https://mdxjs.com/) that makes it easily possible to use code selectors for our docs. Two things need to be done:

Import the needed libraries to the markdown file:

```js
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
```

Define code blocks:

```html
<Tabs groupId="language" defaultValue="cli" values={[ { label: 'CLI', value: 'cli', }, ] }>

<TabItem value="cli">
code
</TabItem>

</Tabs>
```

Hint: `groupId="language"` sets the decision documentation-wide. Can also be used for other use cases like different Tabs for different operating systems.

Template:

```html
<Tabs groupId="language" defaultValue="csharp" values={
[
{ label: 'C# / ASP.NET Core 3', value: 'csharp', },
{ label: 'Go', value: 'go', },
{ label: 'Java', value: 'java', },
{ label: 'Java + Spring', value: 'javaspring', },
{ label: 'Kotlin + Spring', value: 'kotlin', },
{ label: 'NodeJS', value: 'nodejs', },
] }>

<TabItem value="csharp">
</TabItem>

<TabItem value="go">
</TabItem>

<TabItem value="java">
</TabItem>

<TabItem value="javaspring">
</TabItem>

<TabItem value="kotlin">
</TabItem>

<TabItem value="nodejs">
</TabItem>

</Tabs>
```

## Source Files for Images and Videos

Source files for images and videos can be put in:

`./media-src/[subfolder according to do structure]/`

Files that are used to produce these source files (e.g. BPMN files used to produce process images) can be stored in:

`./media-pre-src/`
