---
id: modelers-interoperability
title: Modelers interoperability
description: "Understand the implications of using Web Modeler and Desktop Modeler for modeling process diagrams."
---

If your team is using both [Web Modeler](/components/modeler/web-modeler/launch-web-modeler.md) and [Desktop Modeler](/components/modeler/desktop-modeler/index.md) to develop [process application](components/concepts/process-applications.md) using [gitsync](/components/modeler/web-modeler/git-sync.md), there are a few things to take into account to make both modelers work together transparently.

## Process application

A [process application in Desktop Modeler](components/modeler/desktop-modeler/process-applications.md) is represented as a folder that has a `.process-application` file. In Web Modeler it is [a type folder](/components/modeler/web-modeler/process-applications.md).

Using a single folder to represent process applications can help using both tools.

## Element templates

Templates are discovered differently in each tool, but there are things we can do to make keep them in sync.

### Templates per file

Desktop Modeler can load multiple element templates from a single file that contains a list of element templates. But WebModeler can only load a single template for each file.

To make be able to work with the same files in both modelers, avoid defining multiple templates in a single file.

### Shared element templates

In Desktop Modeler, these templates can be installed as [global templates](/components/modeler/desktop-modeler/element-templates/configuring-templates.md#global-templates). In Web Modeler, these templates are [published to the organization](/components/connectors/manage-connector-templates.md#manage-published-connector-templates) so they can be used in multiple projects.

We recommend using a separate VCS repository to store these templates.

For local development using Desktop Modeler these templates can be manually copied into your global directory, while for Web Modeler we recommend using a CICD pipeline to keep your WebModeler templates and your repository in sync using the [Web Modeler API](/apis-tools/web-modeler-api/index.md).

### Project element templates

The Desktop Modeler can discover templates from multiple directories as long as it finds the `.process-application`. If the folder is not a process application, it only checks the `.camunda/element-templates` directory for local templates. You need to have a `.process-application` file for it to load templates in the root directory. Web Modeler on the other hand, only process files in a single folder. If you are working with a project and not a process application, the templates need to be published first to use them.

If you are starting in Desktop Modeler, considering using a single folder for your process application to make the project element templates work in a transparent way in both Modeler with no extra work.

If you are starting in Web Modeler, you will need to manually create the `.process-application` file after cloning the repository, for it to be handled correctly by the Desktop Modeler.

### Handling element templates with multiple versions

Web Modeler and Desktop Modeler handle element templates versions differently.

Desktop Modeler suggests versions based on the element templates it loads. To allow it to detect multiple versions of the same element template you will need to have 2 different files with different versions. For example, a file named `element-template-v1.json` and another named `element-template-v2.json` with the same element ID. Otherwise, when you open a process using such template, it will show the template as [missing](/components/modeler/desktop-modeler/element-templates/using-templates.md#missing-templates).

Web Modeler does not have this limitation, and you can just evolve a single file an [publish](/components/connectors/manage-connector-templates.md#manage-published-connector-templates) the versions.
