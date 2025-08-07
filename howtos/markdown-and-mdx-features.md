# Markdown and MDX features

The Docusaurus documentation provides a detailed explanation of the Markdown features at [https://v2.docusaurus.io/docs/markdown-features](https://v2.docusaurus.io/docs/markdown-features).

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
<ReactPlayer playing loop playsInline height="200px" src="./video.mp4" />
```

## Code references

The docs support the ability to embed code blocks from external sources. This is useful for embedding code that changes outside the release cadence of the product.

Code references should only point at source files from a Camunda-owned GitHub repository.

To use a code reference, add a code block that specifies the `reference` attribute, the code source URL, and optionally a `title`:

```yaml reference title="a description"
https://github.com/camunda/some-project/some-file.yaml
```

This functionality is provided by [a plugin](https://github.com/saucelabs/docusaurus-theme-github-codeblock). See [the plugin documentation](https://docs.saucelabs.com/contributing/style-guide/#code-references) for more details.

## Code blocks / selector

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
{ label: 'Node.js', value: 'nodejs', },
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

## Source files for images and videos

Source files for images and videos can be put in:

`./media-src/[subfolder according to do structure]/`

Files that are used to produce these source files (e.g. BPMN files used to produce process images) can be stored in:

`./media-pre-src/`
