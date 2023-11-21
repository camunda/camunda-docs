---
id: forms-element-library-iframe
title: iFrame
description: Learn about the iFrame form element to embed external content.
---

An element allowing the user to embed external content via an iFrame.

Note that every iFrame component is a sandbox. This means that the content of the iFrame is not able to access the parent page, cookies, browser storage, and others. Learn more about sandbox iFrames [in this documentation](https://www.w3schools.com/tags/att_iframe_sandbox.asp).

![Form iFrame Symbol](/img/form-icons/form-iframe.svg)

## Configurable properties

- **Title**: Label displayed on top of the iFrame and as the accessible title. Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md).
- **URL**: Enter a HTTPS URL to a source. Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md). Please make sure that the URL is safe as it might impose security risks. Not all external sources can be displayed in the iFrame. Read more about it in [the X-FRAME-OPTIONS documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options).
- **Height**: Defines the height of the iFrame. Defined as number of pixels.
- **Hide if**: [Expression](../../feel/language-guide/feel-expressions-introduction.md) to hide the iFrame.
- **Columns**: Space the field will use inside its row. **Auto** means it will automatically adjust to available space in the row. Read more about the underlying grid layout in the [Carbon Grid documentation](https://carbondesignsystem.com/guidelines/2x-grid/overview).
