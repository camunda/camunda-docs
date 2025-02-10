---
id: forms-element-library-iframe
title: iframe
description: Learn about the iframe form element to embed external content.
---

This is an element allowing the user to embed external content via an iframe.

:::note

Every iframe component is a sandbox. This means that the content of the iframe is not able to access the parent page, cookies, browser storage, and others. [Learn more about sandbox iframes](https://www.w3schools.com/tags/att_iframe_sandbox.asp).

:::

<img src="/img/form-icons/form-iframe.svg" alt="Form iframe Symbol" />

## Configurable properties

- **Title**: Label displayed on top of the iframe and as the accessible title. Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md).
- **URL**: Enter an HTTPS URL to a source. Can either be an [expression](../../feel/language-guide/feel-expressions-introduction.md), plain text, or [templating syntax](../configuration/forms-config-templating-syntax.md). Ensure the URL is safe as it might impose security risks. Not all external sources can be displayed in the iframe. Read more about it in [the X-FRAME-OPTIONS documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options).
- **Height**: Defines the height of the iframe. Defined as number of pixels.
- **Security attributes**: Allow the iframe's sandbox more access to various functionality of the browser, at the cost of security.
  - **Script execution**: Enables script running, essential for interactive websites.
  - **Allow same origin**: Controls the same-origin policy for the iframe, impacting access to data like cookies, local storage, and DOM storage.
  - **Open in fullscreen**: Allows the content of the iframe to request fullscreen mode.
  - **Geolocation**: Grants or denies access to geolocation services.
  - **Camera/Microphone access**: Required for functionality which makes use of the camera/microphone. You may need to allow it through a browser prompt as well.
  - **Forms submission**: Enables the submission of forms within the iframe.
  - **Open modal windows/popups**: Permits the iframe to open modal windows/popups.
  - **Top level navigation**: Gives the iframe permission to change the URL of the parent page, navigating away entirely from it.
  - **Storage access by user**: Controls access of local storage based on user interactions, may be expected in addition to allow same origin on certain browsers for functionality depending on storage.
- **Hide if**: [Expression](../../feel/language-guide/feel-expressions-introduction.md) to hide the iframe.
- **Columns**: Space the field will use inside its row. **Auto** means it will automatically adjust to available space in the row. Read more about the underlying grid layout in the [Carbon Grid documentation](https://carbondesignsystem.com/elements/2x-grid/overview/).

## Security advisory

When configuring iframes, it's essential to understand the security implications, especially if you are not certain of what you'll be rendering ahead of time.

- **URL Caution**: Be very careful with the URLs loaded into the iframe. This isn't much of a concern if you just statically define a site, but if you are using links from say, some data a user submitted earlier in your process, it is critical that those are validated prior to being rendered in the iframe.

- **Script Execution**: Enabling script execution can expose users to cross-site scripting (XSS) attacks if the content source is not secure. Limit this functionality to trusted, verified sources.

- **Allow Same Origin**: This allows the iframe to access cookies, local storage, and DOM storage. Enabling this for an untrusted source can lead to data leaks or other security breaches.

- **Camera/Microphone Access and Geolocation**: These features should only be enabled for sites where they are absolutely necessary and trusted. Unauthorized access to these can severely compromise user privacy.

- **Top-Level Navigation**: This allows the iframe to redirect the parent page. Be cautious, as malicious sites can abuse this to redirect users to harmful websites.

- **Modal Windows/Popups**: While useful, these can be exploited for phishing attacks or unwanted advertising. Only enable for trusted content.

You should adopt a allowlisting approach to iframe configuration. This means **only enabling the bare minimum functionality** that you need for your use-case, which ensures the attack surface is kept as low as possible.

Additionally, if you are rendering an external link you don't have control over, ensure that you specify what that link should look like and **validate it** somewhere in your process prior to rendering it. If the link could be anything, then you should not render it in this component.
