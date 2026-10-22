---
id: hosting-template-sources
title: Host an element template source
description: "Learn how to host a remote source of element templates for Desktop Modeler."
---

Desktop Modeler can load element templates from a remote source over HTTP or HTTPS. A source consists of a JSON index that lists template identifiers, versions, and URLs for the template files.

## Create a source index

The index is a JSON object whose keys are template identifiers. Each value is an array of available versions for that template. Each version entry includes a nonnegative integer `version` and an absolute `ref` URL to a JSON element template file. The index key must match the referenced template's `id`, and the index version must match the template's `version`. You can optionally include an `engine` object with a `camunda` semantic version range to limit which Camunda versions can use the template. The template itself uses an `engines` object to describe compatible engines.

```json
{
  "com.example.my-template": [
    {
      "version": 1,
      "ref": "https://templates.example.com/my-template-1.json",
      "engine": {
        "camunda": ">=8.0.0"
      }
    }
  ]
}
```

Desktop Modeler uses the index entry's `engine.camunda` version range to filter templates for the active Camunda execution platform version. If you omit `engine`, the template is not filtered by this range. For details about the template's `id`, `version`, and `engines` fields, see [defining templates](../../element-templates/defining-templates.md).

## How Desktop Modeler loads sources

Desktop Modeler checks enabled sources when an editor imports a diagram or its execution platform profile changes. It considers the template versions compatible with the active Camunda version. When no new templates are available, Desktop Modeler does not show a notification. Desktop Modeler warns you when it cannot retrieve or process a source or template.

## Host the index and template files

Host the index and every template file referenced by `ref` at HTTP or HTTPS URLs accessible from Desktop Modeler. The endpoint does not need to be accessible from the public internet, so you can host it on an internal network. Desktop Modeler does not support authentication when retrieving a source or its template files.

Templates with the same identifier and version collide. Desktop Modeler reports a warning and one template overrides the other on the client, but which one is not defined. Avoid duplicate identifier and version pairs across sources.

Desktop Modeler caches retrieved templates on disk by identifier, version, and reference URL. It does not need to download a template again when those values have not changed. Publish immutable, versioned template files and increment the template version when you change a template so Desktop Modeler can retrieve and identify the updated file.

If you remove an entry from the index while its source remains enabled, Desktop Modeler retains the cached template and continues to load it. If you disable a source, Desktop Modeler retains its cache on disk but excludes its templates from loading after restart. If you remove a source or edit its URL, Desktop Modeler deletes its cache on the next startup.

A failure to retrieve or process one template does not necessarily prevent Desktop Modeler from processing other templates in the source. Cached templates remain available.

For a local example, see the [element template registry](https://github.com/camunda/camunda-modeler/tree/develop/resources/element-template-registry) in the Camunda Modeler repository.
