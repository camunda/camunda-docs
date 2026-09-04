---
id: plugins
title: Plugins
description: "Plugins allow you to change the appearance and behavior of Desktop Modeler and add new features."
---

:::note
The Camunda Modeler plugins API is not stable and might change in the future.
:::

Plugins allow you to change the appearance and behavior of Camunda Modeler and add new features.

## Plugging into Camunda Modeler

You can plug into the modeler to change its appearance, add new menu entries, extend the modeling tools for [BPMN](https://github.com/bpmn-io/bpmn-js) and [DMN](https://github.com/bpmn-io/dmn-js), or even slot React.js components into the Camunda Modeler UI.

To add a plugin, put it into the `resources/plugins` directory relative to your [`{APP_DATA_DIRECTORY}`](../search-paths#app-data-directory) or [`{USER_DATA_DIRECTORY}`](../search-paths#user-data-directory) directory.

Camunda Modeler searches for available plugin entry points via the `resources/plugins/*/index.js` pattern. This means that each plugin must reside in it's own folder which is a direct child of the `plugins` directory.

:::note
If you download and extract plugins from GitHub, the extracted directory contains the actual plugin, so make sure to copy the plugin, not its parent directory.
:::

## Overview of your possibilities as a plugin developer

There are many ways for a developer to extend Camunda Modeler and its modeling tools. The following table shows an overview:

| Plugin type            | Functionality                                                                                                              | Example                                                                                                                                 |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Menu Entries           | Add new entries to the menu bar - useful to interact with your plugins, link to external pages, add settings, etc.         | [Menu Example](https://github.com/camunda/camunda-modeler-plugins/tree/master/menu-plugin-example)                                      |
| Custom Styles          | Change the look and feel of Camunda Modeler by adding stylesheets.                                                         | [Styles Example](https://github.com/camunda/camunda-modeler-plugins/tree/master/style-plugin-example)                                   |
| React Components       | Embed custom React.js components into specific anchor points of Camunda Modeler.                                           | [React Plugin Example](https://github.com/pinussilvestrus/camunda-modeler-autosave-plugin)                                              |
| bpmn-js Modules        | Extend our BPMN editor by injecting your own custom [bpmn-js](https://github.com/bpmn-io/bpmn-js) modules.                 | [bpmn-js Module Example](https://github.com/camunda/camunda-modeler-plugins/tree/master/bpmn-js-plugin-example)                         |
| bpmn-moddle Extensions | Extend the BPMN language model by injecting your own custom [bpmn-moddle](https://github.com/bpmn-io/bpmn-moddle) modules. | [bpmn-moddle Extension Example](https://github.com/camunda/camunda-modeler-plugins/tree/master/bpmn-js-plugin-moddle-extension-example) |
| dmn-js Modules         | Extend our DMN editor by injecting your own custom [dmn-js](https://github.com/bpmn-io/dmn-js) modules.                    | [dmn-js Module Example](https://github.com/camunda/camunda-modeler-plugins/tree/master/dmn-js-plugin-example)                           |
| dmn-moddle Extensions  | Extend the DMN language model by injecting your own custom [dmn-moddle](https://github.com/bpmn-io/dmn-moddle) modules     | n/a                                                                                                                                     |
| bpmnlint Plugins       | Add custom lint rules through [bpmnlint](https://github.com/bpmn-io/bpmnlint) plugins                                      | [Custom lint rules](../custom-lint-rules)                                                                                               |

## Getting started with development

### Plugin entry point

Regardless of the type of your plugin, you have to export a [Node.js module](https://nodejs.org/api/modules.html) named `index.js` that acts as a plugin entry point. The following shows an example of such entry point:

```javascript
module.exports = {
  name: "My Awesome Plugin", // the name of your plugin
  style: "./style.css", // changing the appearance of the modeler
  menu: "./menu.js", // adding menu entries to the modeler
  script: "./script.js", // extending the modeler, and its BPMN and DMN components
};
```

The modeler will automatically load your plugins on startup.

### Changing the appearance of the modeler

You can change the appearance of the modeler using CSS.

Your stylesheet might look like this:

```css
body {
  background: linear-gradient(0deg, #52b415, #eee);
}
```

Plug it into the modeler like this:

```javascript
module.exports = {
  style: "./style.css",
};
```

### Adding menu entries to the modeler

You can add new menu entries to the modeler's menu.

Describe your menu entries like this:

```javascript
module.exports = function (electronApp, menuState) {
  return [
    {
      label: "Open BPMN Reference",
      accelerator: "CommandOrControl+[",
      enabled: function () {
        // only enabled for BPMN diagrams
        return menuState.bpmn;
      },
      action: function () {
        var shell = require("electron").shell;
        shell.openExternal("https://camunda.org/bpmn/reference/");
      },
    },
  ];
};
```

Plug them into the modeler like this:

```javascript
module.exports = {
  menu: "./menu-entries",
};
```

:::note
The code within the menu entries executes on [the main process](https://www.electronjs.org/docs/latest/tutorial/process-model) of Electron. This comes with the advantage of allowing you to use [Node.js](https://nodejs.org/en/) modules, but you need to consider that you cannot debug the respective code in Chromium. For more information regarding main process debugging, refer to the [official Electron documentation](https://www.electronjs.org/docs/latest/tutorial/debugging-main-process).
:::

For more information on how the modeler's menu works, take a look at its [implementation](https://github.com/camunda/camunda-modeler/blob/master/app/lib/menu/menu-builder.js).

### Extend the modeler and its BPMN and DMN components

You can extend the modeling tools for [BPMN](https://github.com/bpmn-io/bpmn-js) and [DMN](https://github.com/bpmn-io/dmn-js) with your own modules, as well as embedding React.js components into certain sections of Camunda Modeler.

Since the client of the modeler uses [Chromium](https://www.chromium.org/Home), you can't use Node.js modules to extend the modeling tools. You need to bundle your plugin first. The easiest way to get started with client-side plugins is through [this example project](https://github.com/camunda/camunda-modeler-plugin-example).

> In this example, we are building a bpmn-js plugin, but this basic structure applies to all extensions besides menu entries and style. The modules themselves will be different however, so refer to our [examples](https://github.com/camunda/camunda-modeler-plugins) for more information on how to build different kinds.

Take the following steps:

1. Clone or fork the repository:

```
git clone https://github.com/camunda/camunda-modeler-plugin-example.git
```

The plugin starter project comes with a menu and style folder which are referenced in the plugin entry point. If you do not need those, you can remove them from the entry point and delete the respective folder.

2. Install the dependencies:

```
npm install
```

3. Create your module:

```javascript
function LoggingPlugin(eventBus) {
  eventBus.on("shape.added", function () {
    console.log("A shape was added to the diagram!");
  });
}

module.exports = {
  __init__: ["loggingPlugin"],
  loggingPlugin: ["type", LoggingPlugin],
};
```

4. Require your file in `client.js` and register it via our [helper functions](https://github.com/camunda/camunda-modeler-plugin-helpers):

```javascript
var registerBpmnJSPlugin =
  require("camunda-modeler-plugin-helpers").registerBpmnJSPlugin;
var plugin = require("./LoggingPlugin");

registerBpmnJSPlugin(plugin);
```

5. You may want to create a plugin which specifically targets Camunda 7 or Camunda 8. To do this, use the appropriate variations of the registration helper function for your plugin type.

```javascript
registerPlatformBpmnJSPlugin(plugin); // Register plugin for Camunda 7 BPMN diagrams only
registerCloudBpmnJSPlugin(plugin); // Register plugin for Camunda 8 BPMN diagrams only
registerBpmnJSPlugin(plugin); // Register plugin for Camunda 7 and 8 BPMN diagrams
```

6. You can use the globally available functions `getModelerDirectory` and `getPluginsDirectory` to load additional resources:

```javascript
function LoggingPlugin(eventBus, canvas) {
  var img = document.createElement(img);
  img.src = getPluginsDirectory + "/logging-plugin/image.png";

  canvas.getContainer().appendChild(img);
}
```

7. Bundle your plugin:

```
npm run build
```

8. Put the folder into the `resources/plugins` directory relative to your Camunda Modeler installation directory. You can now use your plugin!

### Development workflow

When creating a plugin, you can place the directory containing your plugin in the aforementioned `resources/plugins` directory.

Plugins will be loaded on application startup (menu plugins) or reload (style and modeling tool plugins). To reload the application, press `F12` to open the developer tools, and press `Ctrl+R` or `Cmd+R`. This will clear all unsaved diagrams.

## Additional resources

- [Example Plugins](https://github.com/camunda/camunda-modeler-plugins)
- [Plugin Starter Project](https://github.com/camunda/camunda-modeler-plugin-example)
