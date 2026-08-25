---
id: manage-projects
title: Projects
description: In Camunda Hub, a project is a type of folder that contains a set of related files you can work on and deploy as a single bundle.
---

import DocsIcon from "@site/docs/components/assets/icon-docs.png";
import AoGrid from '../../../react-components/\_ao-card';
import FileListImg from './img/file-list.png'

In Camunda Hub, a [project](/components/concepts/process-applications.md) contains a set of related files you work on as a single bundle.

## About

A project can contain:

- [BPMN diagrams](/components/modeler/bpmn/bpmn.md)
- [DMN diagrams](/components/modeler/dmn/dmn.md)
- [Forms](/components/modeler/forms/utilizing-forms.md)
- [RPA scripts](/components/rpa/overview.md)
- [Element templates](../modeler/element-templates/manage-element-templates.md)
- [READMEs](../modeler/modeling/advanced-modeling/process-documentation-with-readme-files.md)
- Folders

For example, a project for a consumer loan application might consist of a BPMN diagram as an entry point and a number of additional supporting files, such as DMN diagrams and forms.

<p><img src={FileListImg} alt="Project file list" /></p>

## Project development lifecycle

In Camunda Hub, you can quickly develop project releases through the stages of a typical [project development lifecycle](project-pipeline.md)

<AoGrid ao={[
{
link: "./create-a-project",
title: "Set up a new project",
image: DocsIcon,
description: "Get started by setting up a new project.",
},
{
link: "./deploy-project",
title: "Validate and deploy your project",
image: DocsIcon,
description: "Validate your project in development before deploying it to testing, staging, or production.",
},
{
link: "./project-versioning",
title: "Project versioning",
image: DocsIcon,
description: "Use versioning to save a single snapshot of all the project files in one action.",
},
]} columns={3}/>

## Known limitations

You should be aware of the following limitations when working with projects.

### General limitations

- Self-Managed does not support defining cluster stages, identifying clusters by tags, or cluster promotion.

### Deployment limitations

- Projects can only be deployed to a Zeebe cluster in version 8.4.0 or higher.
- The overall size of the deployment bundle is limited due to a maximum [record](/components/zeebe/technical-concepts/internal-processing.md) size of 4 MB in Zeebe.
  - The limit is effectively between 2 and 3 MB, as Zeebe writes more data to the log stream than just the raw deployment.
  - If you exceed the limit, you are shown an [error message](deploy-project.md#deployment-errors):<br/>
    `Command 'CREATE' rejected with code 'EXCEEDED_BATCH_RECORD_SIZE'`.
